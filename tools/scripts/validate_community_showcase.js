#!/usr/bin/env node
"use strict";

/*
 * Validates community showcase submissions.
 *
 * Usage:
 *   node tools/scripts/validate_community_showcase.js [file.md ...] [options]
 *
 * Options:
 *   --schema <path>      Path to the showcase JSON Schema (default: docs/community/showcase-schema.json)
 *   --showcases-dir <p>  Enforce that every file lives under this directory (scope check)
 *   --skip-links         Do not resolve non-GitHub proof links
 *   --skip-proof         Do not run GitHub authorship-proof checks
 *   --json               Always print a JSON summary (recommended for CI)
 *
 * Exit code 0 when all files pass, 1 otherwise.
 */

const fs = require("node:fs");
const path = require("node:path");
const { verifyProof, isGithubUrl } = require("./community_proof");

const ROOT = path.resolve(__dirname, "..", "..");

function parseArgs(argv) {
  const files = [];
  const opts = {
    schema: "docs/community/showcase-schema.json",
    showcasesDir: null,
    skipLinks: false,
    skipProof: false,
    json: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--schema") opts.schema = argv[++i];
    else if (arg === "--showcases-dir") opts.showcasesDir = argv[++i];
    else if (arg === "--skip-links") opts.skipLinks = true;
    else if (arg === "--skip-proof") opts.skipProof = true;
    else if (arg === "--json") opts.json = true;
    else files.push(arg);
  }
  return { files, opts };
}

function stripQuotes(value) {
  const trimmed = value.trim();
  if (trimmed.length >= 2 && trimmed[0] === '"' && trimmed[trimmed.length - 1] === '"') {
    return trimmed.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\");
  }
  return trimmed;
}

function parseFrontMatter(markdown) {
  const lines = markdown.split(/\r?\n/);
  if (lines[0].trim() !== "---") {
    return { ok: false, error: "file must start with `---` front matter" };
  }
  let end = -1;
  for (let i = 1; i < lines.length; i += 1) {
    if (lines[i].trim() === "---") {
      end = i;
      break;
    }
  }
  if (end === -1) {
    return { ok: false, error: "missing closing `---` for front matter" };
  }
  const data = {};
  let currentSection = data;
  let pendingListKey = null;
  for (let i = 1; i < end; i += 1) {
    const line = lines[i];
    if (line.trim() === "" || line.trimStart().startsWith("#")) {
      continue;
    }
    const indent = line.length - line.trimStart().length;
    const trimmed = line.trim();
    const listItem = trimmed.match(/^-\s+(.+)$/);
    if (listItem) {
      if (pendingListKey && Array.isArray(currentSection[pendingListKey])) {
        currentSection[pendingListKey].push(stripQuotes(listItem[1]));
      }
      continue;
    }
    const colon = trimmed.indexOf(":");
    if (colon === -1) {
      continue;
    }
    const key = trimmed.slice(0, colon).trim();
    const rawValue = trimmed.slice(colon + 1).trim();
    if (indent >= 2 && currentSection !== data && currentSection !== data.proof) {
      currentSection[key] = stripQuotes(rawValue);
      continue;
    }
    if (indent >= 2 && currentSection === data.proof) {
      if (rawValue === "") {
        pendingListKey = key;
        data.proof[key] = [];
      } else {
        pendingListKey = null;
        data.proof[key] = stripQuotes(rawValue);
      }
      continue;
    }
    if (rawValue.startsWith("[")) {
      pendingListKey = null;
      currentSection = data;
      const inner = rawValue.slice(1, rawValue.lastIndexOf("]"));
      data[key] = inner
        .split(",")
        .map((part) => stripQuotes(part.replace(/^[ "'-]+|[ "'-]+$/g, "")))
        .filter(Boolean);
      continue;
    }
    if (rawValue === "") {
      if (["links", "author", "proof"].includes(key)) {
        pendingListKey = null;
        currentSection = {};
        data[key] = currentSection;
      } else {
        pendingListKey = key;
        currentSection = data;
        data[key] = [];
      }
      continue;
    }
    pendingListKey = null;
    if (currentSection === data.proof && rawValue !== "") {
      data.proof[data._proofKey || key] = stripQuotes(rawValue);
      continue;
    }
    currentSection = data;
    data[key] = stripQuotes(rawValue);
  }
  return { ok: true, data };
}

function validateDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return "must match YYYY-MM-DD";
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
    return "is not a real calendar day";
  }
  return null;
}

function validateSchema(schema, value, pointer) {
  const errors = [];
  const current = pointer || "#";
  if (!schema || typeof schema !== "object") return errors;
  if (schema.type === "object") {
    if (value === null || typeof value !== "object" || Array.isArray(value)) {
      errors.push(`${current}: expected object`);
      return errors;
    }
    for (const key of schema.required || []) {
      if (value[key] === undefined || value[key] === null || value[key] === "") {
        errors.push(`${current}.${key}: required`);
      }
    }
    if (schema.properties) {
      for (const [key, sub] of Object.entries(schema.properties)) {
        if (value[key] !== undefined && value[key] !== null && value[key] !== "") {
          errors.push(...validateSchema(sub, value[key], `${current}.${key}`));
        }
      }
    }
    if (schema.additionalProperties === false) {
      for (const key of Object.keys(value)) {
        if (!schema.properties || !Object.prototype.hasOwnProperty.call(schema.properties, key)) {
          errors.push(`${current}.${key}: unexpected property`);
        }
      }
    }
    return errors;
  }
  if (schema.type === "array") {
    if (!Array.isArray(value)) {
      errors.push(`${current}: expected array`);
      return errors;
    }
    if (typeof schema.minItems === "number" && value.length < schema.minItems) {
      errors.push(`${current}: at least ${schema.minItems} item(s) required`);
    }
    if (typeof schema.maxItems === "number" && value.length > schema.maxItems) {
      errors.push(`${current}: too many items (${value.length} > ${schema.maxItems})`);
    }
    if (schema.items && value.length > 0) {
      value.forEach((item, index) => {
        errors.push(...validateSchema(schema.items, item, `${current}[${index}]`));
      });
    }
    return errors;
  }
  if (schema.type === "string" || typeof value === "string") {
    if (typeof value !== "string") {
      errors.push(`${current}: expected string`);
      return errors;
    }
    if (typeof schema.minLength === "number" && value.length < schema.minLength) {
      errors.push(`${current}: too short (${value.length} < ${schema.minLength})`);
    }
    if (typeof schema.maxLength === "number" && value.length > schema.maxLength) {
      errors.push(`${current}: too long (${value.length} > ${schema.maxLength})`);
    }
    if (schema.enum && !schema.enum.includes(value)) {
      errors.push(`${current}: must be one of ${schema.enum.join(", ")}`);
    }
    if (schema.pattern) {
      const regex = new RegExp(schema.pattern);
      if (!regex.test(value)) {
        errors.push(`${current}: does not match ${schema.pattern}`);
      }
    }
    if (schema.format === "uri") {
      try {
        const url = new URL(value);
        if (!["http:", "https:"].includes(url.protocol)) {
          errors.push(`${current}: only http(s) URLs are allowed`);
        }
      } catch {
        errors.push(`${current}: is not a valid URL`);
      }
    }
    return errors;
  }
  return errors;
}

function hasNulByte(buffer) {
  const limit = Math.min(buffer.length, 1024);
  for (let i = 0; i < limit; i += 1) {
    if (buffer[i] === 0) return true;
  }
  return false;
}

async function resolveUrl(value) {
  const fetchOnce = async (method) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(value, {
        method,
        redirect: "follow",
        signal: controller.signal,
        headers: { "user-agent": "agentic-awesome-skills-showcase-check" },
      });
      return response.status;
    } finally {
      clearTimeout(timer);
    }
  };
  let status = await fetchOnce("HEAD");
  if (status === 405 || status === 403) status = await fetchOnce("GET");
  return status;
}

function relatedSkillsValid(list) {
  const invalid = [];
  for (const id of list || []) {
    const target = path.join("skills", id, "SKILL.md");
    if (!fs.existsSync(path.resolve(ROOT, target))) {
      invalid.push(id);
    }
  }
  return invalid;
}

async function validateFile(filePath, opts, schema) {
  const result = { path: filePath, ok: true, errors: [], warnings: [] };
  const absolute = path.resolve(ROOT, filePath);
  if (opts.showcasesDir) {
    const resolvedDir = path.resolve(ROOT, opts.showcasesDir);
    if (!absolute.startsWith(`${resolvedDir}${path.sep}`)) {
      result.ok = false;
      result.errors.push(`outside allowed directory ${opts.showcasesDir}`);
      return result;
    }
  }
  let buffer;
  try {
    buffer = fs.readFileSync(absolute);
  } catch {
    result.ok = false;
    result.errors.push("file not found");
    return result;
  }
  if (hasNulByte(buffer)) {
    result.ok = false;
    result.errors.push("file is binary (contains NUL bytes); only markdown text is allowed");
    return result;
  }
  if (path.extname(filePath).toLowerCase() !== ".md") {
    result.ok = false;
    result.errors.push("only .md files are allowed");
    return result;
  }
  if (buffer.length > 256 * 1024) {
    result.ok = false;
    result.errors.push("file exceeds 256 KB");
    return result;
  }
  const parsed = parseFrontMatter(buffer.toString("utf8"));
  if (!parsed.ok) {
    result.ok = false;
    result.errors.push(parsed.error);
    return result;
  }
  const data = parsed.data;
  const dateError = data.date ? validateDate(String(data.date)) : "required";
  if (dateError === "required") result.errors.push("date: required");
  else if (dateError) result.errors.push(`date: ${dateError}`);

  const schemaErrors = validateSchema(schema, data, "front matter");
  result.errors.push(...schemaErrors.map((e) => `schema: ${e}`));

  const proof = data.proof && typeof data.proof === "object" ? data.proof : {};
  const proofEntries = [];
  for (const key of Object.keys(proof)) {
    const value = proof[key];
    if (Array.isArray(value)) {
      for (const item of value) {
        const url = String(item || "").trim();
        if (url) proofEntries.push({ key, url });
      }
    } else {
      const url = String(value || "").trim();
      if (url) proofEntries.push({ key, url });
    }
  }
  if (proofEntries.length === 0) {
    result.errors.push("proof: at least one proof link is required");
  }

  const handle = (data.author && data.author.handle) || "";
  for (const { key, url } of proofEntries) {
    if (isGithubUrl(url)) {
      if (opts.skipProof) continue;
      const verdict = await verifyProof(url, handle);
      if (verdict.status === "contradiction") {
        result.errors.push(`proof.${key}: authorship contradicted — ${verdict.message}`);
      } else if (verdict.status === "unverifiable") {
        result.warnings.push(`proof.${key}: ${verdict.message}`);
      }
    } else if (!opts.skipLinks) {
      let status = null;
      try {
        status = await resolveUrl(url);
      } catch {
        result.warnings.push(`proof.${key}: link check could not reach ${url}`);
      }
      if (status !== null && (status < 200 || status >= 400)) {
        result.errors.push(`proof.${key}: link did not resolve (HTTP ${status})`);
      }
      if (status !== null && status >= 200 && status < 400) {
        result.warnings.push(`proof.${key}: non-GitHub content — human must confirm authorship`);
      }
    }
  }

  const invalidSkills = relatedSkillsValid(data.related_skills);
  if (invalidSkills.length > 0) {
    result.errors.push(`related_skills: unknown community skills ${invalidSkills.join(", ")}`);
  }

  result.ok = result.errors.length === 0;
  return result;
}

async function run() {
  const { files, opts } = parseArgs(process.argv.slice(2));
  const schema = JSON.parse(fs.readFileSync(path.resolve(ROOT, opts.schema), "utf8"));
  const results = [];
  let ok = true;
  for (const file of files) {
    const result = await validateFile(file, opts, schema);
    results.push(result);
    if (!result.ok) ok = false;
  }
  const summary = { ok, schema: opts.schema, files: results };
  if (!opts.json) {
    for (const result of results) {
      process.stdout.write(`[${result.ok ? "PASS" : "FAIL"}] ${result.path}\n`);
      for (const warning of result.warnings) process.stdout.write(`  warning: ${warning}\n`);
      for (const error of result.errors) process.stdout.write(`  error:   ${error}\n`);
    }
  }
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
  process.exitCode = ok ? 0 : 1;
}

module.exports = { parseFrontMatter, stripQuotes, validateSchema, validateFile };
if (require.main === module) {
  run().catch((error) => {
    process.stderr.write(`${error.stack || error.message}\n`);
    process.stderr.write(`${JSON.stringify({ ok: false, error: String(error) })}\n`);
    process.exitCode = 1;
  });
}