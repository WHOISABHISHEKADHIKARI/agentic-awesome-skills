#!/usr/bin/env node
"use strict";

/*
 * Rule-based triage for community showcase pull requests.
 *
 * The bot that drafts a showcase PR labels it `ready-for-triage` only when the
 * showcase passes validation. This script then decides the human workflow:
 *
 *   reject     hard reject (misattribution, missing proof, spam indicators)
 *   review     route to a maintainer (unverifiable proof, published-only
 *              content, brand-new or ambiguous accounts)
 *   approve    eligibility to auto-approve (proof machine-verified)
 *
 * Usage:
 *   node tools/scripts/triage_community_showcase.js <markdown-file> \
 *     [--author <github-login>] [--account-age-days <n>]
 *
 * Exit code 1 when the verdict is `reject` or `review` (maintainer attention
 * required), 0 when `approve`.
 */

const fs = require("node:fs");
const { parseFrontMatter } = require("./validate_community_showcase");
const { verifyProof, isGithubUrl } = require("./community_proof");

const SHORTENER_DOMAINS = /(?:^|\.)(t\.co|bit\.ly|tinyurl\.com|goo\.gl|is\.gd|buff\.ly|ow\.ly|rebrand\.ly|cutt\.ly|short\.io)(\/|$)/i;
const SPAM_YEAST = /(?:click here|act (?:now|fast)|100% free|guaranteed|exclusive offer|limited time|winner|cash|prize|urgent)/i;

function parseArgs(argv) {
  const options = { author: "", accountAgeDays: null };
  const targets = [];
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--author") options.author = argv[++i];
    else if (arg === "--account-age-days") options.accountAgeDays = Number(argv[++i]);
    else targets.push(arg);
  }
  if (targets.length !== 1) {
    throw new Error("exactly one markdown file is required");
  }
  return { file: targets[0], options };
}

function globalsCheck(proof, summary) {
  const labels = [];
  const flags = [];
  const items = [];
  for (const [key, value] of Object.entries(proof || {})) {
    if (Array.isArray(value)) {
      for (const item of value) {
        if (item && String(item).trim() !== "") items.push([key, String(item).trim()]);
      }
    } else if (value && String(value).trim() !== "") {
      items.push([key, String(value).trim()]);
    }
  }
  for (const [key, url] of items) {
    if (SHORTENER_DOMAINS.test(url)) {
      flags.push(`shortener detected in proof.${key}`);
    }
    if (SPAM_YEAST.test(url)) {
      flags.push(`marketing language detected in proof.${key}`);
    }
  }
  if (SPAM_YEAST.test(summary || "") || SPAM_YEAST.test(JSON.stringify(proof || ""))) {
    flags.push("marketing language detected in content");
  }
  return { labels, flags };
}

async function decide(result, options, raw) {
  const data = result.data;
  const proof = data.proof && typeof data.proof === "object" ? data.proof : {};
  const proofLinks = [];
  for (const [key, value] of Object.entries(proof)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        if (item && String(item).trim() !== "") proofLinks.push([key, String(item).trim()]);
      }
    } else if (value && String(value).trim() !== "") {
      proofLinks.push([key, String(value).trim()]);
    }
  }
  const flags = [];
  const reasons = [];
  let verdict = "approve";

  if (proofLinks.length === 0) {
    return {
      verdict: "reject",
      reasons: ["no proof link; authorship cannot be established"],
      labels: ["showcase-reject"],
    };
  }

  const handle = (data.author && data.author.handle) || "";
  let githubOk = 0;
  let contradicted = 0;
  for (const [key, url] of proofLinks) {
    if (isGithubUrl(url)) {
      const check = await verifyProof(url, handle);
      if (check.status === "ok") githubOk += 1;
      else if (check.status === "contradiction") {
        contradicted += 1;
        reasons.push(`proof.${key}: ${check.message}`);
      } else {
        flags.push(`proof.${key} unverifiable: ${check.message}`);
      }
    }
  }

  if (contradicted > 0) verdict = "reject";
  else if (githubOk === 0) verdict = "review";

  if (String(data.summary || "").length > 900) {
    flags.push("summary is unusually long (> 900 chars)");
  }
  if (proofLinks.length > 3) {
    flags.push("more than 3 proof links");
  }
  if (typeof raw === "string" && /```|<\/?[a-z][^>]*>/i.test(raw)) {
    flags.push("content contains code fences or embedded HTML");
  }
  if (githubOk === 0 && proofLinks.some(([, url]) => !isGithubUrl(url))) {
    flags.push("proof relies on published pages only; a human must confirm authorship");
  }

  const accountAgeDays = Number(options.accountAgeDays);
  if (Number.isFinite(accountAgeDays) && accountAgeDays >= 0 && accountAgeDays < 14) {
    flags.push(`submitting account is ${accountAgeDays} day(s) old`);
  }
  if (options.author) {
    const normalized = String(options.author).replace(/^@/, "").toLowerCase();
    const claimed = String(handle).replace(/^@/, "").toLowerCase();
    if (normalized && claimed && normalized !== claimed) {
      reasons.push(`handle mismatch: issue author is @${normalized} but content claims @${claimed}`);
      verdict = "reject";
    }
  }

  const globals = globalsCheck(proof, data.summary);
  flags.push(...globals.flags);

  if (flags.length > 0) {
    if (verdict !== "reject") verdict = "review";
    reasons.push(...flags);
  }
  reasons.push(
    ...flags.length > 0
      ? []
      : [
          githubOk > 0
            ? "proof machine-verified against the author handle"
            : "proof is not machine-verifiable on GitHub",
        ],
  );

  const labels = ["showcase-submission"];
  if (verdict === "reject") labels.push("showcase-reject");
  else if (verdict === "review") labels.push("needs-human-review");
  else labels.push("auto-approve-eligible");

  return { verdict, reasons, labels };
}

async function run() {
  const { file, options } = parseArgs(process.argv.slice(2));
  const clean = file.startsWith("/") ? file : file;
  const source = fs.readFileSync(clean, "utf8");
  const parsed = parseFrontMatter(source);
  if (!parsed.ok) {
    throw new Error(parsed.error);
  }
  const verdict = await decide(parsed, options, source);
  process.stdout.write(`${JSON.stringify(verdict, null, 2)}\n`);
  process.exitCode = verdict.verdict === "approve" ? 0 : 1;
}

module.exports = { decide, globalsCheck };
if (require.main === module) {
  run().catch((error) => {
    process.stderr.write(`${error.stack || error.message}\n`);
    process.stderr.write(`${JSON.stringify({ error: String(error) })}\n`);
    process.exitCode = 1;
  });
}