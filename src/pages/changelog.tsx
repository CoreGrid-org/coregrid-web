import React, {useEffect, useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import clsx from 'clsx';
import {
  Calendar,
  ChevronDown,
  Download,
  ExternalLink,
  FileArchive,
  Layers,
  Monitor,
  Smartphone,
  Users,
} from 'lucide-react';
import SeoHead from '@site/src/components/SeoHead';
import PageHeader from '@site/src/components/PageHeader';
import {
  latestIds,
  owner,
  productById,
  products,
  releases,
  type ChangelogBlock,
  type ChangelogRelease,
} from '@site/src/data/changelog';
import styles from './changelog.module.css';

const productIcons: Record<string, typeof Monitor> = {platform: Monitor, mobile: Smartphone};

const dateFormat = new Intl.DateTimeFormat('en', {dateStyle: 'long', timeZone: 'UTC'});
const shortDateFormat = new Intl.DateTimeFormat('en', {month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC'});

function formatDate(iso: string, format = dateFormat): string {
  return iso ? format.format(new Date(iso)) : 'Date unavailable';
}

function formatSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB'];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value.toFixed(unit === 0 ? 0 : 1)} ${units[unit]}`;
}

/** Renders the inline markdown kept by the generator: **bold**, `code` and [links](url). */
function Inline({text}: {text: string}): React.ReactElement {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>;
        if (part.startsWith('`') && part.endsWith('`')) return <code key={index}>{part.slice(1, -1)}</code>;
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          return (
            <a key={index} href={link[2]} target="_blank" rel="noreferrer noopener">
              {link[1]}
            </a>
          );
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </>
  );
}

function Block({block}: {block: ChangelogBlock}): React.ReactElement {
  switch (block.type) {
    case 'heading':
      return <h4 className={styles.subheading}>{block.text}</h4>;
    case 'quote':
      return (
        <blockquote className={styles.quote}>
          <Inline text={block.text} />
        </blockquote>
      );
    case 'code':
      return (
        <pre className={styles.code}>
          <code>{block.code}</code>
        </pre>
      );
    case 'list': {
      const ListTag = block.ordered ? 'ol' : 'ul';
      return (
        <ListTag className={clsx(styles.list, block.ordered && styles.orderedList)} start={block.start}>
          {block.items.map((item, index) => (
            <li key={index}>
              <Inline text={item} />
            </li>
          ))}
        </ListTag>
      );
    }
    default:
      return (
        <p className={styles.paragraph}>
          <Inline text={block.text} />
        </p>
      );
  }
}

function ProductChip({productId}: {productId: string}): React.ReactElement {
  const Icon = productIcons[productId] ?? Layers;
  return (
    <span className={styles.productChip}>
      <Icon size={13} strokeWidth={2.2} aria-hidden="true" />
      {productById.get(productId)?.label ?? productId}
    </span>
  );
}

function ReleaseNotes({release}: {release: ChangelogRelease}): React.ReactElement {
  return (
    <div className={styles.sections}>
      {release.sections.map((section) => (
        <section key={section.heading} className={styles.section}>
          <h3 className={styles.sectionHeading}>{section.heading}</h3>
          {section.blocks.map((block, index) => (
            <Block key={index} block={block} />
          ))}
        </section>
      ))}
    </div>
  );
}

function ReleaseCard({release}: {release: ChangelogRelease}): React.ReactElement {
  const isLatest = latestIds.has(release.id);
  // Lets Docusaurus's broken-link check see these anchors (linked from /community).
  useBrokenLinks().collectAnchor(release.id);

  return (
    <article id={release.id} className={clsx(styles.release, isLatest && styles.releaseLatest)}>
      <span className={styles.timelineDot} aria-hidden="true" />

      <div className={styles.card}>
        <header className={styles.cardHeader}>
          <div className={styles.badges}>
            <ProductChip productId={release.product} />
            {isLatest && <span className={styles.latestBadge}>Latest</span>}
            {release.prerelease && <span className={styles.preBadge}>Pre-release</span>}
          </div>

          <div className={styles.titleRow}>
            <h2 className={styles.version}>{release.version}</h2>
            {release.tagline && <span className={styles.tagline}>{release.tagline}</span>}
          </div>

          <div className={styles.meta}>
            <span>
              <Calendar size={14} strokeWidth={2} aria-hidden="true" />
              <time dateTime={release.date}>{formatDate(release.date)}</time>
            </span>
            <span className={styles.metaName}>{release.name}</span>
          </div>
        </header>

        {release.summary.map((text, index) => (
          <p key={index} className={styles.summary}>
            <Inline text={text} />
          </p>
        ))}

        <div className={styles.actions}>
          <a href={release.githubUrl} target="_blank" rel="noreferrer noopener" className="cg-btn cg-btn--primary">
            View on GitHub
            <ExternalLink size={15} strokeWidth={2} aria-hidden="true" />
          </a>
          {release.assets.map((asset) => (
            <a key={asset.url} href={asset.url} className="cg-btn cg-btn--ghost">
              <Download size={15} strokeWidth={2} aria-hidden="true" />
              {asset.name}
              <span className={styles.assetSize}>{formatSize(asset.size)}</span>
            </a>
          ))}
          <a href={release.sourceUrl} className="cg-btn cg-btn--ghost">
            <FileArchive size={15} strokeWidth={2} aria-hidden="true" />
            Source code (.zip)
          </a>
        </div>

        {release.sections.length > 0 &&
          (isLatest ? (
            <ReleaseNotes release={release} />
          ) : (
            <details className={styles.details}>
              <summary>
                Full release notes
                <span className={styles.detailsCount}>{release.sections.length} sections</span>
                <ChevronDown size={16} strokeWidth={2} aria-hidden="true" className={styles.chevron} />
              </summary>
              <ReleaseNotes release={release} />
            </details>
          ))}

        {release.contributors.length > 0 && (
          <footer className={styles.contributors}>
            <span className={styles.contributorsLabel}>
              <Users size={14} strokeWidth={2} aria-hidden="true" />
              Contributors
            </span>
            <div className={styles.contributorList}>
              {release.contributors.map((login) => (
                <a
                  key={login}
                  href={`https://github.com/${encodeURIComponent(login)}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={styles.contributor}>
                  <img
                    src={`https://github.com/${encodeURIComponent(login)}.png?size=64`}
                    alt=""
                    width={24}
                    height={24}
                    loading="lazy"
                    decoding="async"
                  />
                  {login}
                </a>
              ))}
            </div>
          </footer>
        )}
      </div>
    </article>
  );
}

export default function ChangelogPage(): React.ReactElement {
  const [filter, setFilter] = useState('all');
  const [activeId, setActiveId] = useState(releases[0]?.id ?? '');

  const visible = useMemo(
    () => (filter === 'all' ? releases : releases.filter((release) => release.product === filter)),
    [filter],
  );

  // Highlight the release currently in view in the sidebar.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting);
        if (hit) setActiveId(hit.target.id);
      },
      {rootMargin: '-20% 0px -70% 0px'},
    );
    visible.forEach((release) => {
      const element = document.getElementById(release.id);
      if (element) observer.observe(element);
    });
    setActiveId(visible[0]?.id ?? '');
    return () => observer.disconnect();
  }, [visible]);

  const filters = [
    {id: 'all', label: 'All', count: releases.length},
    ...products.map((product) => ({id: product.id, label: product.label, count: product.releases.length})),
  ];

  return (
    <Layout title="Changelog" description="CoreGrid release history for the web platform and mobile app.">
      <SeoHead
        path="/changelog"
        title="Changelog"
        description="Release history and release notes for the CoreGrid web platform and mobile app."
      />

      <main className={styles.page}>
        <PageHeader
          eyebrow="Release history"
          title="Changelog"
          lead="Every CoreGrid release across the web platform and the mobile field app, straight from GitHub."
        />

        <div className={clsx('cg-container', styles.layout)}>
          <aside className={styles.sidebar} aria-label="Changelog navigation">
            <div className={styles.filters} role="tablist" aria-label="Filter by product">
              {filters.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={filter === item.id}
                  className={clsx(styles.filter, filter === item.id && styles.filterActive)}
                  onClick={() => setFilter(item.id)}>
                  {item.label}
                  <span className={styles.filterCount}>{item.count}</span>
                </button>
              ))}
            </div>

            <h2 className={styles.sidebarHeading}>Versions</h2>
            <nav className={styles.versionList}>
              {visible.map((release) => (
                <a
                  key={release.id}
                  href={`#${release.id}`}
                  className={clsx(styles.versionLink, activeId === release.id && styles.versionActive)}>
                  <span className={styles.versionLinkTop}>
                    {release.version}
                    {latestIds.has(release.id) && <span className={styles.versionLatest}>Latest</span>}
                  </span>
                  <span className={styles.versionLinkMeta}>
                    {productById.get(release.product)?.label} · {formatDate(release.date, shortDateFormat)}
                  </span>
                </a>
              ))}
            </nav>

            <div className={styles.repoLinks}>
              {products.map((product) => (
                <a
                  key={product.id}
                  href={`https://github.com/${owner}/${product.repo}/releases`}
                  target="_blank"
                  rel="noreferrer noopener">
                  {product.repo} releases
                  <ExternalLink size={13} strokeWidth={2} aria-hidden="true" />
                </a>
              ))}
            </div>
          </aside>

          <div className={styles.timeline}>
            {visible.length > 0 ? (
              visible.map((release) => <ReleaseCard key={release.id} release={release} />)
            ) : (
              <p className={styles.empty}>No releases published yet.</p>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
}
