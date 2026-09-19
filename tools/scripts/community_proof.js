#!/usr/bin/env node
"use strict";

/*
 * Shared authorship-proof verification for community showcase submissions.
 *
 * Showcase submissions must prove the submitter authored the shared content.
 * The showcase pipeline locks author.handle to the GitHub account that opened
 * the submission issue, then verifies any GitHub-hosted proof links against the
 * public GitHub API:
 *
 *   repo  URL          -> repository owner   must equal the handle
 *   pull request URL   -> PR author login    must equal the handle
 *   commit URL         -> commit author      must equal the handle
 *
 * Results are one of:
 *   ok             proof confirms the handle on GitHub
 *   contradiction  GitHub clearly shows a different owner/author (hard reject)
 *   unverifiable   rate-limited, missing, or non-GitHub content (human review)
 */

const GITHUB_APPROVED_HOSTS = new Set(["github.com", "api.github.com"]);

function stripGh(url) {
  return url.replace(/\/$/, "").replace(/#.*$/, "").split("?")[0];
}

function githubUrlParts(rawUrl) {
  const url = stripGh(String(rawUrl || ""));
  const parsed = new URL(url);
  if (!GITHUB_APPROVED_HOSTS.has(parsed.hostname)) {
    return null;
  }
  const segments = parsed.pathname.split("/").filter(Boolean);
  if (parsed.hostname === "api.github.com") {
    if (segments[0] === "repos" && segments.length >= 3) {
      return { owner: segments[1], repo: segments[2], kind: "repo" };
    }
    return null;
  }
  if (segments.length < 2) {
    return null;
  }
  const owner = segments[0];
  const repo = segments[1];
  const third = segments[2] || "";
  if ((third === "pulls" || third === "pull") && segments[3]) {
    return { owner, repo, kind: "pr", ref: segments[3] };
  }
  if (third === "commit" && segments[3]) {
    return { owner, repo, kind: "commit", ref: segments[3] };
  }
  if (third === "blob" || third === "blame" || third === "tree" || third === "raw") {
    return { owner, repo, kind: "repo" };
  }
  return { owner, repo, kind: "repo" };
}

async function apiJson(endpoint, apiBase, fetchImpl) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const headers = {
      accept: "application/vnd.github+json",
      "user-agent": "agentic-awesome-skills-showcase-proof",
      "x-github-api-version": "2022-11-28",
    };
    const token = process.env.GITHUB_TOKEN;
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
    const response = await fetchImpl(`${apiBase}${endpoint}`, {
      headers,
      signal: controller.signal,
    });
    if (response.status === 403) {
      return { rateLimited: true, body: null };
    }
    if (response.status === 404) {
      return { rateLimited: false, body: null };
    }
    if (!response.ok) {
      return { rateLimited: false, body: null };
    }
    const body = await response.json();
    return { rateLimited: false, body };
  } catch {
    return { rateLimited: false, body: null };
  } finally {
    clearTimeout(timer);
  }
}

function normalizeHandle(handle) {
  return String(handle || "").replace(/^@/, "").toLowerCase();
}

async function verifyProof(rawUrl, handle, options = {}) {
  const apiBase = options.apiBase || "https://api.github.com";
  const fetchImpl = options.fetchImpl || fetch;
  const expected = normalizeHandle(handle);
  const parts = githubUrlParts(rawUrl);
  if (!parts) {
    return {
      status: "unverifiable",
      message: "non-GitHub content requires a human to confirm authorship",
    };
  }
  if (!expected) {
    return {
      status: "unverifiable",
      message: "no author handle to verify against",
    };
  }
  let result;
  if (parts.kind === "pr") {
    result = await apiJson(`/repos/${parts.owner}/${parts.repo}/pulls/${parts.ref}`, apiBase, fetchImpl);
    if (result.rateLimited) {
      return { status: "unverifiable", message: "GitHub API rate-limited during proof check" };
    }
    if (!result.body) {
      return { status: "unverifiable", message: `GitHub PR ${parts.owner}/${parts.repo}#${parts.ref} could not be verified` };
    }
    const author = (result.body.user && result.body.user.login) || "";
    return matchResult(expected, author, "the pull request author");
  }
  if (parts.kind === "commit") {
    result = await apiJson(`/repos/${parts.owner}/${parts.repo}/commits/${parts.ref}`, apiBase, fetchImpl);
    if (result.rateLimited) {
      return { status: "unverifiable", message: "GitHub API rate-limited during proof check" };
    }
    if (!result.body) {
      return { status: "unverifiable", message: `GitHub commit ${parts.owner}/${parts.repo}@${parts.ref} could not be verified` };
    }
    const author =
      (result.body.author && result.body.author.login) ||
      (result.body.commit && result.body.commit.author && result.body.commit.author.name) ||
      "";
    return matchResult(expected, author, "the commit author");
  }
  result = await apiJson(`/repos/${parts.owner}/${parts.repo}`, apiBase, fetchImpl);
  if (result.rateLimited) {
    return { status: "unverifiable", message: "GitHub API rate-limited during proof check" };
  }
  if (!result.body) {
    return { status: "unverifiable", message: `GitHub repository ${parts.owner}/${parts.repo} could not be verified` };
  }
  const owner = (result.body.owner && result.body.owner.login) || "";
  return matchResult(expected, owner, "the repository owner");
}

function matchResult(expected, actual, what) {
  if (actual && normalizeHandle(actual) === expected) {
    return { status: "ok", message: `${what} matches the author handle` };
  }
  if (actual) {
    return {
      status: "contradiction",
      message: `${what} (${actual}) is not the author handle (@${expected})`,
    };
  }
  return { status: "unverifiable", message: `${what} could not be determined` };
}

function isGithubUrl(rawUrl) {
  try {
    return githubUrlParts(rawUrl) !== null;
  } catch {
    return false;
  }
}

module.exports = { githubUrlParts, isGithubUrl, normalizeHandle, verifyProof };