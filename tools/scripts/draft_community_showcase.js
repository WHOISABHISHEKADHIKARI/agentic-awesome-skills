#!/usr/bin/env node
"use strict";

/*
 * Drafts a community showcase pull request from a completed submission issue.
 *
 * The automation reads the staff-commented submission form answers from the
 * issue body. The submitter's GitHub handle is locked into `author.handle`; it
 * is never taken from user-provided text, so authorship stays bound to the
 * account that opened the issue. `--next` without `--issue` processes the
 * oldest open, not-yet-drafted `showcase-submission` issue.
 *
 * Usage:
 *   node tools/scripts/draft_community_showcase.js \
 *     --org <org> --repo <repo> --token <gh-token> \
 *     [--issue <number> | --next]
 */

const fs = require("node:fs");
const path = require("node:path");
const { parseFrontMatter, validateSchema } = require("./validate_community_showcase");

const ROOT = path.resolve(__dirname, "..", "..");
const SCHEMA = JSON.parse(fs.readFileSync(path.join(ROOT, "docs", "community", "showcase-schema.json"), "utf8"));
const SHOWCASES_DIR = path.join(ROOT, "docs", "community", "showcases");
const TEMPLATE_PATH = path.join(ROOT, "docs", "community", "SHOWCASE_TEMPLATE.md");
const ISSUE_FORM_ID = "showcase-submission";

const FORM_MARKERS = {
  "Showcase title": "title",
  "Publication date": "date",
  "Showcase type": "type",
  "Showcase summary": "summary",
  "Proof: repo": "proof_repo",
  "Proof: pull request": "proof_pull_request",
  "Proof: commit": "proof_commit",
  "Published URL": "published_url",
  "Related community skills": "related_skills",
  "Tags": "tags",
  "Your name": "author_name",
};

const TEMPLATE_PLACEHOLDERS = {
  title: "{{TITLE}}",
  date: "{{DATE}}",
  type: "{{TYPE}}",
  summary: "{{SUMMARY}}",
  proof: "{{PROOF}}",
  related_skills: "{{RELATED_SKILLS}}",
  tags: "{{TAGS}}",
  author_name: "{{AUTHOR_NAME}}",
  author_handle: "{{AUTHOR_HANDLE}}",
};

const TYPE_VALUES = new Set([
  "skill",
  "tutorial",
  "guide",
  "article",
  "template",
  "workflow",
  "integration",
  "bundle",
  "other",
]);

function die(message, code = 1) {
  process.stderr.write(`${message}\n`);
  process.exit(code);
}

function parseArgs(argv) {
  const options = {
    org: "",
    repo: "",
    token: process.env.GITHUB_TOKEN || "",
    issue: null,
    next: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--org") options.org = argv[++i];
    else if (arg === "--repo") options.repo = argv[++i];
    else if (arg === "--token") options.token = argv[++i];
    else if (arg === "--issue") options.issue = argv[++i];
    else if (arg === "--next") options.next = true;
  }
  if (options.repo.includes("/")) {
    const [org, repo] = options.repo.split("/");
    options.org = org;
    options.repo = repo;
  }
  return options;
}

function extractAnswer(body, marker) {
  const pattern = new RegExp(`###[ \\t]+${escapeRegExp(marker)}\\s*\\n([\\s\\S]*?)(?=\\n###[ \\t]+|\\n---|$)`, "i");
  const match = pattern.exec(body);
  if (!match) return "";
  return match[1]
    .split("\n")
    .filter((line) => line.trim() !== "" && !line.trim().startsWith("-") && !line.trim().startsWith(">"))
    .map((line) => line.trim())
    .join(" ");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeTags(value) {
  if (!value) return [];
  const seen = new Set();
  const tags = [];
  for (const raw of String(value).split(/[,;，]/)) {
    const tag =
      raw
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 24) || "";
    if (tag && !seen.has(tag)) {
      seen.add(tag);
      tags.push(tag);
    }
  }
  return tags.slice(0, 6);
}

function normalizeSkills(value) {
  if (!value) return [];
  const seen = new Set();
  const skills = [];
  for (const raw of String(value).split(/[,\s]+/)) {
    const id = raw
      .trim()
      .toLowerCase()
      .replace(/^@/, "")
      .replace(/[^a-z0-9-]/g, "-") || "";
    if (/^[a-z0-9-]{1,64}$/.test(id) && !seen.has(id)) {
      seen.add(id);
      skills.push(id);
    }
  }
  return skills.slice(0, 8);
}

function normalizePublished(value) {
  if (!value) return [];
  const seen = new Set();
  const urls = [];
  for (const raw of String(value).split(/[\s,;]+/)) {
    const url = raw.trim();
    if (!url || seen.has(url)) continue;
    try {
      const parsed = new URL(url);
      if (!/^https?:$/.test(parsed.protocol)) continue;
    } catch {
      continue;
    }
    seen.add(url);
    urls.push(url);
    if (urls.length === 6) break;
  }
  return urls;
}

function buildProofBlock(answers) {
  const lines = [];
  if (answers.proof_repo) lines.push(`  repo: "${answers.proof_repo}"`);
  if (answers.proof_pull_request) lines.push(`  pull_request: "${answers.proof_pull_request}"`);
  if (answers.proof_commit) lines.push(`  commit: "${answers.proof_commit}"`);
  const published = normalizePublished(answers.published_url);
  if (published.length > 0) {
    lines.push("  published:");
    for (const url of published) lines.push(`    - "${url}"`);
  }
  return lines.join("\n");
}

function slugifyTitle(title) {
  return (
    String(title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 64) || "untitled"
  );
}

function validateRealDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return "date: must match YYYY-MM-DD";
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
    return "date: is not a real calendar day";
  }
  return null;
}

async function loadFencedTemplate() {
  const source = fs.readFileSync(TEMPLATE_PATH, "utf8");
  const fence = /^```markdown\s*\n([\s\S]*?)\n```/m.exec(source);
  if (!fence) die("SHOWCASE_TEMPLATE.md is missing the fenced template block");
  return { template: fence[1], fenced: fence[0] };
}

async function findOpenPull(api, org, repo, token, slug) {
  const response = await fetch(
    `${api}/repos/${org}/${repo}/pulls?state=open&head=${encodeURIComponent(`${org}:showcases/${slug}`)}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
        accept: "application/vnd.github+json",
        "x-github-api-version": "2022-11-28",
      },
    },
  );
  if (!response.ok) return null;
  const pulls = await response.json();
  return (pulls && pulls[0]) || null;
}

async function ensureBranch(api, org, repo, token, headRef, baseBranch) {
  const existsResponse = await fetch(
    `${api}/repos/${org}/${repo}/branches/${encodeURIComponent(headRef)}`,
    { headers: { authorization: `Bearer ${token}`, accept: "application/vnd.github+json" } },
  );
  if (existsResponse.ok) return;
  const baseResponse = await fetch(`${api}/repos/${org}/${repo}/git/refs/heads/${encodeURIComponent(baseBranch)}`, {
    headers: { authorization: `Bearer ${token}`, accept: "application/vnd.github+json" },
  });
  if (!baseResponse.ok) die(`base branch ${baseBranch} not found`);
  const base = await baseResponse.json();
  const createResponse = await fetch(`${api}/repos/${org}/${repo}/git/refs`, {
    method: "POST",
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify({ ref: `refs/heads/${headRef}`, sha: base.object.sha }),
  });
  if (!createResponse.ok && createResponse.status !== 422) {
    die(`failed to create branch: ${await createResponse.text()}`);
  }
}

async function latestOpenIssue(api, org, repo, token) {
  const response = await fetch(
    `${api}/repos/${org}/${repo}/issues?state=open&labels=${ISSUE_FORM_ID}&per_page=30`,
    { headers: { authorization: `Bearer ${token}`, accept: "application/vnd.github+json" } },
  );
  if (!response.ok) die(`failed to list issues: ${await response.text()}`);
  const issues = await response.json();
  for (const issue of issues) {
    if (issue.pull_request) continue;
    const slug = extractSlug(issue.body || "");
    if (slug) {
      const existing = await findOpenPull(api, org, repo, token, slug);
      if (existing) continue;
    }
    return issue;
  }
  return null;
}

function extractSlug(body) {
  if (!body || body.includes("```")) return null;
  const answers = {};
  for (const [marker, key] of Object.entries(FORM_MARKERS)) {
    answers[key] = extractAnswer(body, marker).trim();
  }
  if (!answers.title || !answers.date) return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(answers.date)) return null;
  return `${answers.date}-${slugifyTitle(answers.title)}`;
}

async function run() {
  const options = parseArgs(process.argv.slice(2));
  const org = options.org;
  const repo = options.repo;
  const token = options.token;
  if (!org || !repo || !token) die("--org, --repo, and --token (or GITHUB_TOKEN) are required");
  const api = "https://api.github.com";

  let issueNumber = options.issue;
  if (options.next && !issueNumber) {
    const issue = await latestOpenIssue(api, org, repo, token);
    if (!issue) die("no pending showcases to draft");
    issueNumber = issue.number;
  }
  if (!issueNumber) die("--issue <number> or --next is required");
  const issueNumberInt = Number(issueNumber);

  const repoInfo = await (await fetch(`${api}/repos/${org}/${repo}`, {
    headers: { authorization: `Bearer ${token}`, accept: "application/vnd.github+json" },
  })).json();
  const baseBranch = repoInfo.default_branch || "main";

  const issueResponse = await fetch(`${api}/repos/${org}/${repo}/issues/${issueNumberInt}`, {
    headers: { authorization: `Bearer ${token}`, accept: "application/vnd.github+json" },
  });
  if (!issueResponse.ok) die(`failed to fetch issue: ${await issueResponse.text()}`);
  const issue = await issueResponse.json();
  const submitter = (issue.user && issue.user.login) || "";
  if (!submitter) die("issue author not found");
  const issueBody = issue.body || "";
  if (!issueBody.includes("### Showcase title")) {
    die("issue does not look like a showcase submission form");
  }
  if (issueBody.includes("```")) {
    die("issue body must not contain code blocks");
  }

  const answers = {};
  for (const [marker, key] of Object.entries(FORM_MARKERS)) {
    answers[key] = extractAnswer(issueBody, marker).trim();
  }

  const titleData = answers.title || die("Showcase title is required");
  const dateData = answers.date || die("Publication date is required");
  const typeValue = answers.type || die("Showcase type is required");
  const summary = answers.summary || die("Showcase summary is required");
  const proofRepo = answers.proof_repo;
  const proofPullRequest = answers.proof_pull_request;
  const proofCommit = answers.proof_commit;
  const published = answers.published_url;
  const relatedSkills = normalizeSkills(answers.related_skills);
  const tags = normalizeTags(answers.tags);
  const authorName = answers.author_name;
  const handle = `@${submitter}`;

  if (!TYPE_VALUES.has(typeValue)) die(`unsupported type: ${typeValue}`);
  if (relatedSkills.length === 0) die("at least one related community skill is required");
  const dateError = validateRealDate(dateData);
  if (dateError) die(dateError);

  const proofLinksPresent = [proofRepo, proofPullRequest, proofCommit, published].some(
    (value) => value && value.trim() !== "",
  );
  if (!proofLinksPresent) die("at least one proof link is required");

  const { template } = await loadFencedTemplate();
  const replacements = {
    "{{TITLE}}": titleData,
    "{{DATE}}": dateData,
    "{{TYPE}}": typeValue,
    "{{SUMMARY}}": summary,
    "{{PROOF}}": buildProofBlock(answers),
    "{{RELATED_SKILLS}}": relatedSkills.join(", "),
    "{{TAGS}}": tags.join(", "),
    "{{AUTHOR_NAME}}": authorName,
    "{{AUTHOR_HANDLE}}": handle,
  };
  let filled = template;
  for (const [placeholder, value] of Object.entries(replacements)) {
    filled = filled.split(placeholder).join(value);
  }
  const remainingPlaceholders = Object.values(TEMPLATE_PLACEHOLDERS).filter((placeholder) =>
    filled.includes(placeholder),
  );
  if (remainingPlaceholders.length > 0) {
    die(`template left unfilled placeholders: ${remainingPlaceholders.join(", ")}`);
  }

  const parsed = parseFrontMatter(filled);
  if (!parsed.ok) die(`draft front matter invalid: ${parsed.error}`);
  const errors = validateSchema(SCHEMA, parsed.data, "front matter");
  if (errors.length > 0) die(`draft failed schema validation:\n${errors.join("\n")}`);

  const slug = `${dateData}-${slugifyTitle(titleData)}`;
  const basename = `${slug}.md`;
  const targetPath = path.join(SHOWCASES_DIR, basename);
  const existingPull = await findOpenPull(api, org, repo, token, slug);
  if (existingPull) {
    process.stdout.write(`${JSON.stringify({ status: "exists", pullNumber: existingPull.number })}\n`);
    return;
  }
  if (fs.existsSync(targetPath)) {
    die(`file already exists (no open PR): ${basename}`);
  }

  const headRef = `showcases/${slug}`;
  await ensureBranch(api, org, repo, token, headRef, baseBranch);

  const relativePath = path.relative(ROOT, targetPath);
  const blobResponse = await fetch(`${api}/repos/${org}/${repo}/contents/${encodeURIComponent(relativePath)}`, {
    method: "PUT",
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify({
      message: `feat: showcase ${slug}`,
      branch: headRef,
      content: Buffer.from(filled, "utf8").toString("base64"),
    }),
  });
  if (!blobResponse.ok && blobResponse.status !== 409) {
    die(`failed to create file: ${await blobResponse.text()}`);
  }

  const prBody = [
    "Part of the community showcase pipeline. The `validate-showcase` and `triage-showcase` checks on this PR decide next steps.",
    "",
    `Drafted from [issue #${issueNumberInt}](${issue.html_url || `https://github.com/${org}/${repo}/issues/${issueNumberInt}`}).`,
    "",
    "```text",
    "<!--auto-drafted-community-showcase-->",
    "```",
  ].join("\n");

  const prResponse = await fetch(`${api}/repos/${org}/${repo}/pulls`, {
    method: "POST",
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json", accept: "application/vnd.github+json" },
    body: JSON.stringify({
      title: `Showcase: ${titleData}`,
      head: headRef,
      base: baseBranch,
      body: prBody,
      maintainer_can_modify: true,
    }),
  });
  const payload = await prResponse.json();
  if (!prResponse.ok || payload.message) {
    die(`failed to create PR: ${JSON.stringify(payload).slice(0, 2000)}`);
  }

  process.stdout.write(
    `${JSON.stringify({
      status: "drafted",
      issue: issueNumberInt,
      pullNumber: payload.number,
      pullUrl: payload.html_url,
      branch: headRef,
      file: relativePath,
      handle,
    })}\n`,
  );
}

if (require.main === module) {
  run().catch((error) => {
    process.stderr.write(`${error.stack || error.message}\n`);
    process.stderr.write(`${JSON.stringify({ error: String(error) })}\n`);
    process.exit(1);
  });
}