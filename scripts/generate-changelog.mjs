import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectDir = join(scriptDir, '..');
const dataDir = join(projectDir, 'src', 'data');
const generatedDir = join(dataDir, 'generated');
const cacheFile = join(dataDir, 'changelog-cache.json');
const outputFile = join(generatedDir, 'changelog.ts');
const owner = 'CoreGrid-org';
const repo = 'CoreGrid';

function stripMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .trim();
}

function parseGithubBody(body = '') {
  const leadingLines = [];
  const sections = [];
  let currentSection = null;
  let sawHeading = false;

  const addBlock = (blocks, block) => {
    const lastBlock = blocks.at(-1);
    if (block.type === 'list' && lastBlock?.type === 'list') {
      lastBlock.items.push(...block.items);
    } else {
      blocks.push(block);
    }
  };

  for (const rawLine of body.replace(/\r\n/g, '\n').split('\n')) {
    const line = rawLine.trim();
    if (line.startsWith('## ')) {
      sawHeading = true;
      currentSection = {heading: stripMarkdown(line.slice(3)), blocks: []};
      sections.push(currentSection);
    } else if (line.startsWith('# ')) {
      continue;
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      if (currentSection) {
        addBlock(currentSection.blocks, {type: 'list', items: [stripMarkdown(line.slice(2))]});
      }
    } else if (currentSection && line) {
      addBlock(currentSection.blocks, {type: 'paragraph', text: stripMarkdown(line)});
    } else if (!sawHeading && line) {
      leadingLines.push(stripMarkdown(line));
    }
  }

  const nonEmptySections = sections.filter((section) => section.blocks.length > 0);
  let summary = leadingLines.join(' ');
  let releaseSections = nonEmptySections;
  const firstSectionParagraphs = nonEmptySections[0]?.blocks.filter((block) => block.type === 'paragraph') ?? [];

  if (!summary && firstSectionParagraphs.length > 0) {
    summary = firstSectionParagraphs.map((block) => block.text).join(' ');
    releaseSections = nonEmptySections.slice(1);
  }

  releaseSections = releaseSections.filter(
    (section) => section.blocks.some((block) => block.type === 'list') && !/^contributors$/i.test(section.heading),
  );

  return {
    summary: summary.replace(/\s+/g, ' ').slice(0, 500),
    sections: releaseSections,
  };
}

async function fetchReleases() {
  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'coregrid-web-changelog-generator',
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases?per_page=100`, {headers});
  if (!response.ok) {
    throw new Error(`GitHub API responded with ${response.status} ${response.statusText}`);
  }

  const rawReleases = await response.json();
  return rawReleases
    .filter((release) => !release.draft)
    .map((release) => {
      const {summary, sections} = parseGithubBody(release.body ?? '');
      const mentions = [...(release.body ?? '').matchAll(/@([a-zA-Z0-9-]+)/g)].map((match) => match[1]);
      const contributors = [...new Set([release.author?.login, ...mentions].filter(Boolean))];
      const publishedAt = release.published_at || release.created_at;

      return {
        slug: release.tag_name,
        version: release.tag_name,
        name: release.name || release.tag_name,
        date: publishedAt ? publishedAt.slice(0, 10) : '',
        tag: release.tag_name,
        prerelease: Boolean(release.prerelease),
        githubUrl: release.html_url,
        summary,
        contributors,
        sections,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

async function generateChangelog() {
  let releases;
  try {
    releases = await fetchReleases();
    writeFileSync(cacheFile, `${JSON.stringify(releases, null, 2)}\n`);
    console.log(`Fetched ${releases.length} releases from GitHub (${owner}/${repo}); cache refreshed.`);
  } catch (error) {
    if (!existsSync(cacheFile)) {
      throw new Error(`Could not fetch releases and no cache exists at ${cacheFile}.`, {cause: error});
    }
    releases = JSON.parse(readFileSync(cacheFile, 'utf8'));
    console.warn(`Could not fetch releases (${error.message}); using local cache ${cacheFile}.`);
  }

  const banner = `// GENERATED FILE - do not edit directly.\n// Source: GitHub Releases API for ${owner}/${repo}; cached at src/data/changelog-cache.json.\n// Regenerate with \`npm run generate:changelog\`.\n\n`;
  const generatedModule = `${banner}export type ChangelogBlock =
  | {type: 'paragraph'; text: string}
  | {type: 'list'; items: string[]};

export type ChangelogSection = {
  heading: string;
  blocks: ChangelogBlock[];
};

export type ChangelogRelease = {
  slug: string;
  version: string;
  name: string;
  date: string;
  tag: string;
  prerelease: boolean;
  githubUrl: string;
  summary: string;
  contributors: string[];
  sections: ChangelogSection[];
};

const changelog: ChangelogRelease[] = ${JSON.stringify(releases, null, 2)};

export default changelog;\n`;

  writeFileSync(outputFile, generatedModule);
  console.log(`Generated ${outputFile} from ${releases.length} releases.`);
}

mkdirSync(generatedDir, {recursive: true});
await generateChangelog();
