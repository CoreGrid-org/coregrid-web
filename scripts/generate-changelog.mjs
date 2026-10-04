// Generates src/data/generated/changelog.json from the GitHub Releases of every CoreGrid repo.
//
// Runs automatically before `npm start` and `npm run build` (see package.json), or manually with
// `npm run generate:changelog`. Uses ETag conditional requests so unchanged repos cost nothing
// against the GitHub rate limit, fetches all repos in parallel, falls back to the committed data
// when offline, and only rewrites the output file when its content actually changed.
//
// Set GITHUB_TOKEN to raise the API rate limit (the deploy workflow does this automatically).

import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';

const projectDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const outputFile = join(projectDir, 'src', 'data', 'generated', 'changelog.json');
const owner = 'CoreGrid-org';
const requestTimeoutMs = 10_000;
// Bump when the parsed output shape changes so cached ETags are ignored and releases re-parsed.
const schemaVersion = 1;

const products = [
  {id: 'platform', label: 'Web Platform', repo: 'CoreGrid'},
  {id: 'mobile', label: 'Mobile App', repo: 'coregrid-mobile'},
];

// Release-note sections that are rendered elsewhere on the page (or not at all).
const skippedSections = /^(contributors?|full changelog)$/i;

const log = (message) => console.log(`[changelog] ${message}`);

// ---------------------------------------------------------------------------
// Markdown parsing
// ---------------------------------------------------------------------------

/**
 * Turns a GitHub release body into {tagline, summary, sections}. Inline markdown (bold, code,
 * links) is kept as-is and rendered by the page; block structure is converted into typed blocks.
 */
function parseReleaseBody(body = '') {
  const lines = body.replace(/\r\n/g, '\n').split('\n');

  // Headings deeper than the section level become sub-headings inside a section. When a body has
  // only one `##` (e.g. "## Initial Mobile Baseline" followed by `###` groups), the `###` level is
  // the real section level.
  const h2Count = lines.filter((line) => /^##\s/.test(line.trim())).length;
  const sectionLevel = h2Count > 1 ? 2 : 3;

  const sections = [];
  let current = {heading: '', blocks: []};
  sections.push(current);

  const push = (block) => {
    const last = current.blocks.at(-1);
    if (block.type === 'list' && last?.type === 'list' && last.ordered === block.ordered) {
      last.items.push(...block.items);
    } else if (block.type === 'paragraph' && last?.type === 'paragraph' && last.continues) {
      last.text += ` ${block.text}`;
    } else {
      current.blocks.push(block);
    }
  };

  for (let i = 0; i < lines.length; i += 1) {
    const raw = lines[i];
    const line = raw.trim();

    const fence = line.match(/^(`{3,}|~{3,})\s*([\w-]*)/);
    if (fence) {
      const code = [];
      const indent = raw.match(/^\s*/)[0].length;
      for (i += 1; i < lines.length && !/^(`{3,}|~{3,})\s*$/.test(lines[i].trim()); i += 1) {
        code.push(lines[i].slice(Math.min(indent, lines[i].match(/^\s*/)[0].length)));
      }
      push({type: 'code', lang: fence[2] || 'text', code: code.join('\n').trimEnd()});
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      const level = heading[1].length;
      const text = heading[2].replace(/#+$/, '').trim();
      if (level === 1) continue;
      if (level <= sectionLevel) {
        current = {heading: text, blocks: []};
        sections.push(current);
      } else {
        push({type: 'heading', text});
      }
      continue;
    }

    const bullet = line.match(/^[-*+]\s+(.*)$/);
    const numbered = line.match(/^(\d+)[.)]\s+(.*)$/);
    if (bullet) {
      push({type: 'list', ordered: false, items: [bullet[1].trim()]});
    } else if (numbered) {
      const last = current.blocks.at(-1);
      const start = Number(numbered[1]);
      // An ordered list interrupted by indented paragraphs/code resumes at the right number.
      if (last?.type === 'list' && last.ordered) {
        last.items.push(numbered[2].trim());
      } else {
        push({type: 'list', ordered: true, start, items: [numbered[2].trim()]});
      }
    } else if (/^(-{3,}|\*{3,}|_{3,})$/.test(line) || !line) {
      const last = current.blocks.at(-1);
      if (last?.type === 'paragraph') last.continues = false;
    } else if (line.startsWith('>')) {
      push({type: 'quote', text: line.replace(/^>\s?/, '')});
    } else {
      push({type: 'paragraph', text: line, continues: true});
    }
  }

  for (const section of sections) {
    for (const block of section.blocks) delete block.continues;
  }

  // Leading sections made only of paragraphs form the intro: "## First Stable Release" + text.
  let tagline = '';
  const summary = [];
  while (sections.length && sections[0].blocks.every((block) => block.type === 'paragraph')) {
    const intro = sections.shift();
    if (!tagline && intro.heading) tagline = intro.heading;
    summary.push(...intro.blocks.map((block) => block.text));
  }
  // A single intro section followed by sub-headings (mobile style) still yields a summary.
  if (!summary.length && sections[0] && !sections[0].heading) {
    const intro = sections.shift();
    summary.push(...intro.blocks.filter((block) => block.type === 'paragraph').map((block) => block.text));
  }

  return {
    tagline,
    summary,
    sections: sections.filter((section) => section.blocks.length && !skippedSections.test(section.heading)),
  };
}

function toRelease(product, release) {
  const body = release.body ?? '';
  const {tagline, summary, sections} = parseReleaseBody(body);
  const seen = new Set();
  const contributors = [release.author?.login, ...[...body.matchAll(/@([a-zA-Z0-9-]+)/g)].map((m) => m[1])]
    .filter(Boolean)
    .filter((login) => !seen.has(login.toLowerCase()) && seen.add(login.toLowerCase()));
  const publishedAt = release.published_at || release.created_at || '';

  return {
    id: `${product.id}-${release.tag_name}`,
    product: product.id,
    version: release.tag_name,
    name: release.name || release.tag_name,
    tagline,
    date: publishedAt,
    prerelease: Boolean(release.prerelease),
    githubUrl: release.html_url,
    sourceUrl: `https://github.com/${owner}/${product.repo}/archive/refs/tags/${release.tag_name}.zip`,
    assets: (release.assets ?? []).map((asset) => ({
      name: asset.name,
      url: asset.browser_download_url,
      size: asset.size,
    })),
    summary,
    contributors,
    sections,
  };
}

// ---------------------------------------------------------------------------
// GitHub fetching
// ---------------------------------------------------------------------------

const baseHeaders = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': 'coregrid-web-changelog-generator',
  ...(process.env.GITHUB_TOKEN ? {Authorization: `Bearer ${process.env.GITHUB_TOKEN}`} : {}),
};

/** Returns {status: 'fresh', etag, releases} | {status: 'unchanged'}; throws on failure. */
async function fetchProductReleases(product, etag) {
  const releases = [];
  let url = `https://api.github.com/repos/${owner}/${product.repo}/releases?per_page=100`;
  let firstEtag = null;

  while (url) {
    const isFirstPage = !releases.length && !firstEtag;
    const response = await fetch(url, {
      headers: isFirstPage && etag ? {...baseHeaders, 'If-None-Match': etag} : baseHeaders,
      signal: AbortSignal.timeout(requestTimeoutMs),
    });
    if (response.status === 304) return {status: 'unchanged'};
    if (!response.ok) {
      const remaining = response.headers.get('x-ratelimit-remaining');
      const hint = remaining === '0' ? ' (rate limited - set GITHUB_TOKEN)' : '';
      throw new Error(`${response.status} ${response.statusText}${hint}`);
    }
    if (isFirstPage) firstEtag = response.headers.get('etag');
    releases.push(...(await response.json()));
    url = response.headers.get('link')?.match(/<([^>]+)>;\s*rel="next"/)?.[1] ?? null;
  }

  return {
    status: 'fresh',
    etag: firstEtag,
    releases: releases.filter((release) => !release.draft).map((release) => toRelease(product, release)),
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function readPrevious() {
  try {
    const data = JSON.parse(readFileSync(outputFile, 'utf8'));
    if (data.schemaVersion !== schemaVersion) {
      return {products: data.products.map(({etag, ...product}) => product)};
    }
    return data;
  } catch {
    return {products: []};
  }
}

const previous = readPrevious();
const previousById = new Map(previous.products.map((product) => [product.id, product]));
const offline = process.argv.includes('--offline') || process.env.CHANGELOG_OFFLINE === '1';

const results = await Promise.all(
  products.map(async (product) => {
    const cached = previousById.get(product.id);
    const keep = (reason) => {
      if (!cached) throw new Error(`${product.repo}: ${reason}, and no cached releases exist.`);
      log(`${product.repo}: ${reason}; using ${cached.releases.length} cached release(s).`);
      return cached;
    };

    if (offline) return keep('offline mode');
    try {
      const result = await fetchProductReleases(product, cached?.etag);
      if (result.status === 'unchanged') {
        log(`${product.repo}: up to date (${cached.releases.length} release(s)).`);
        return cached;
      }
      log(`${product.repo}: fetched ${result.releases.length} release(s).`);
      return {...product, etag: result.etag, releases: result.releases};
    } catch (error) {
      return keep(`fetch failed (${error.cause?.code ?? error.message})`);
    }
  }),
);

const output = `${JSON.stringify({schemaVersion, owner, products: results}, null, 2)}\n`;
const target = relative(projectDir, outputFile);

if (existsSync(outputFile) && readFileSync(outputFile, 'utf8') === output) {
  log(`${target} unchanged.`);
} else {
  mkdirSync(dirname(outputFile), {recursive: true});
  writeFileSync(outputFile, output);
  log(`wrote ${target}.`);
}
