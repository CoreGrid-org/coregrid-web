import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {ArrowRight, BookOpen, Download, ShieldCheck, Sparkles} from 'lucide-react';
import SeoHead from '@site/src/components/SeoHead';
import changelogData from '@site/src/data/generated/changelog';
import styles from './changelog.module.css';

const featureGroups = [
  {
    title: 'Asset registry and identification',
    items: [
      'Configurable categories, types, and type-specific attributes',
      'Organisation-scoped registration and unique asset codes',
      'Printable QR labels, mobile QR scanning, and manual-code lookup',
      'Department and location assignment',
      'Condition tracking, depreciation, and immutable lifecycle history',
    ],
  },
  {
    title: 'Maintenance management',
    items: [
      'Fault reporting with observed condition and optional evidence',
      'Corrective and preventive maintenance records',
      'Assignment, cost capture, and work-completion detail',
      'Guarded status flow: requested, approved, in progress, completed, cancelled',
      'Per-asset history, repair count, cumulative cost, and latest repair date',
    ],
  },
  {
    title: 'Transfers and disposals',
    items: [
      'Inter-department transfer requests with controlled approval',
      'Receiving-department confirmation with scan support',
      'Transfer history with timestamps and accountable actors',
      'Condemnation and evidence-backed disposal requests',
      'Disposal precondition checks, revision requests, and final recording',
    ],
  },
  {
    title: 'Audit and compliance',
    items: [
      'Verification campaigns and officer task assignment',
      'Field verification of presence, location, and condition',
      'Automatic and manually raised discrepancies',
      'Controlled resolution and lifecycle history updates',
      'Append-only audit logs and reporting',
    ],
  },
  {
    title: 'AI decision support',
    items: [
      'Planner, maintenance analysis, budget analysis, and policy compliance stages',
      'Evidence-based recommendations for repair, retention, transfer, or disposal',
      'Deterministic validation of policy and business rules',
      'Persisted workflow state and read-only organisation-scoped tools',
      'Administrator approval before high-impact actions execute',
    ],
  },
  {
    title: 'Administration, reporting, and field operations',
    items: [
      'ThunderID authentication with organisation-scoped access control',
      'Asset, department, location, policy, and user administration',
      'Operational dashboards and authorised exportable reports',
      'Flutter field operations for department and inventory staff',
      'In-app notifications linked to related records',
    ],
  },
];

const technologies = [
  ['Backend', 'ASP.NET Core Web API on .NET 10 with Entity Framework Core'],
  ['Database', 'PostgreSQL with EF Core migrations, relational constraints, and scoped access'],
  ['Web application', 'React, Vite, React Router, and IBM Carbon Design System'],
  ['Mobile application', 'Flutter for Android field operations'],
  ['Authentication', 'ThunderID using OpenID Connect/OAuth 2.0 and PKCE'],
  ['Storage', 'Cloudflare R2 or another S3-compatible private object-storage provider'],
  ['AI decision support', 'In-process .NET workflow orchestration with provider-configured model access'],
];

const contributors = [
  {name: 'Jayashan Guruge', role: 'Asset Registry & QR Identification; Planner Agent'},
  {name: 'Seneja Ramanayaka', role: 'Maintenance Management; Maintenance Analysis Agent'},
  {name: 'Bhanuka Samarasinghe', role: 'Transfers & Disposal; Budget Analysis Agent'},
  {name: 'Hasitha Erandika', role: 'Audit & Compliance, organisation configuration, user administration; Policy Compliance Agent and human-approval checkpoint'},
];

const docs: [string, string][] = [
  ['Software Requirements Specification', 'https://github.com/CoreGrid-org/CoreGrid/blob/v0.1.0/srs/00-front-matter.md'],
  ['System Architecture', 'https://github.com/CoreGrid-org/CoreGrid/blob/v0.1.0/srs/03-system-architecture.md'],
  ['Functional Requirements', 'https://github.com/CoreGrid-org/CoreGrid/blob/v0.1.0/srs/06-functional-requirements.md'],
  ['Mobile Application Documentation', 'https://github.com/CoreGrid-org/CoreGrid/blob/v0.1.0/mobile/README.md'],
  ['Deployment and Operations', 'https://github.com/CoreGrid-org/CoreGrid/blob/v0.1.0/srs/14-deployment-and-operations.md'],
  ['Contribution History', 'https://github.com/CoreGrid-org/CoreGrid/blob/v0.1.0/contribution-history.md'],
];

const outOfScope = [
  'Barcode generation',
  'GPS coordinate capture and GIS/map visualisation',
  'Generic document attachments',
  'Offline mobile synchronisation and deferred submission',
  'Push notifications',
  'Predictive computer-vision condition assessment',
  'ERP/financial-system integration',
  'Shared multi-tenant SaaS billing and self-service organisation signup',
  'Native iOS release package',
];

const securityPoints = [
  'ThunderID JWT authentication, role-based authorisation, and organisation/department-scoped access control',
  'Server-side validation, structured API errors, and guarded lifecycle state transitions',
  'Append-only audit and asset-history records for state-changing operations',
  'Private photo storage with backend-authorised, short-lived access paths',
  'AI tools restricted to allow-listed, organisation-scoped, read-only operations',
  'Deterministic validation and human approval before high-impact AI recommendations can change business data',
];

export default function ChangelogPage(): React.ReactElement {
  return (
    <Layout
      title="Changelog"
      description="CoreGrid release history and changelog.">
      <SeoHead
        path="/changelog"
        title="Changelog"
        description="CoreGrid release history and changelog details for the v0.1.0 baseline release."
      />

      <main className={styles.page}>
        <header className="cg-page-header">
          <div className="cg-container">
            <div className={styles.hero}>
              <span className="cg-eyebrow">Release history</span>
              <h1 className="cg-heading">Changelog</h1>
              <p className="cg-lead">
                All notable changes to CoreGrid are documented here, from the first baseline release to future product updates.
              </p>
            </div>
          </div>
        </header>

        <div className={`cg-container ${styles.contentLayout}`}>
          <aside className={styles.versionSidebar} aria-label="Release versions">
            <h2 className={styles.sidebarHeading}>Versions</h2>
            <nav className={styles.versionList} aria-label="Changelog versions">
              {changelogData.length > 0 ? (
                changelogData.map((release, index) => (
                  <a
                    key={release.slug}
                    href={`#${release.slug}`}
                    className={`${styles.versionLink} ${index === 0 ? styles.selectedVersion : ''}`}>
                    <span>{release.version}</span>
                    {index === 0 && <span className={styles.latestBadge}>Latest</span>}
                  </a>
                ))
              ) : (
                <a href="#v0.1.0" className={`${styles.versionLink} ${styles.selectedVersion}`}>
                  v0.1.0
                </a>
              )}
            </nav>
            <a
              href="https://github.com/CoreGrid-org/CoreGrid/releases"
              target="_blank"
              rel="noreferrer noopener"
              className={styles.allReleasesLink}>
              View all on GitHub
              <ArrowRight size={17} strokeWidth={2} aria-hidden="true" />
            </a>
          </aside>

          {changelogData.length > 0 ? (
            changelogData.map((release) => (
              <article key={release.slug} id={release.slug} className={styles.releaseCard}>
                <div className={styles.releaseHeader}>
                  <div>
                    <div className={styles.version}>{release.version}</div>
                    <div className={styles.releaseDate}>
                      {release.name} · Released on{' '}
                      {release.date
                        ? new Intl.DateTimeFormat('en', {dateStyle: 'long', timeZone: 'UTC'}).format(
                            new Date(`${release.date}T00:00:00Z`),
                          )
                        : 'date unavailable'}
                    </div>
                  </div>
                  <a
                    href={release.githubUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={styles.primaryLink}>
                    <BookOpen size={14} strokeWidth={2} />
                    View release on GitHub
                    <ArrowRight size={14} strokeWidth={2} />
                  </a>
                </div>

                {release.summary && <p className={styles.introText}>{release.summary}</p>}

                <div className={styles.downloadRow}>
                  <a
                    href="https://github.com/CoreGrid-org/CoreGrid/archive/refs/heads/main.zip"
                    target="_blank"
                    rel="noreferrer noopener"
                    className={styles.secondaryLink}>
                    <Download size={15} strokeWidth={2} />
                    Web Source Code (.zip)
                  </a>
                  <a
                    href="https://github.com/CoreGrid-org/coregrid-mobile/archive/refs/heads/main.zip"
                    target="_blank"
                    rel="noreferrer noopener"
                    className={styles.secondaryLink}>
                    <Download size={15} strokeWidth={2} />
                    Mobile Source Code (.zip)
                  </a>
                </div>

                {release.sections.map((section) => (
                  <section key={section.heading} className={styles.sectionBlock}>
                    <div className={styles.sectionTitleRow}>
                      <Sparkles size={18} strokeWidth={2} />
                      <h2>{section.heading}</h2>
                    </div>
                    {section.blocks.map((block, blockIndex) =>
                      block.type === 'paragraph' ? (
                        <p key={`${section.heading}-${blockIndex}`} className={styles.bodyText}>
                          {block.text}
                        </p>
                      ) : (
                        <ul key={`${section.heading}-${blockIndex}`} className={styles.securityList}>
                          {block.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      ),
                    )}
                  </section>
                ))}

                {release.contributors.length > 0 && (
                  <section className={styles.sectionBlock}>
                    <div className={styles.sectionTitleRow}>
                      <BookOpen size={18} strokeWidth={2} />
                      <h2>Contributors ({release.contributors.length})</h2>
                    </div>
                    <div className={styles.contributorGrid}>
                      {release.contributors.map((contributor) => (
                        <a
                          key={contributor}
                          href={`https://github.com/${encodeURIComponent(contributor)}`}
                          target="_blank"
                          rel="noreferrer noopener"
                          className={styles.contributorCard}>
                          <img
                            src={`https://github.com/${encodeURIComponent(contributor)}.png?size=96`}
                            alt={`${contributor} GitHub profile`}
                            className={styles.contributorAvatar}
                            loading="lazy"
                            decoding="async"
                          />
                          <span>
                            {contributor}
                          </span>
                        </a>
                      ))}
                    </div>
                  </section>
                )}
              </article>
            ))
          ) : (
          <article id="v0.1.0" className={styles.releaseCard}>
            <div className={styles.releaseHeader}>
              <div>
                <div className={styles.version}>v0.1.0</div>
                <div className={styles.releaseDate}>Released on October 4, 2026</div>
              </div>
              <a
                href="https://github.com/CoreGrid-org/CoreGrid/tree/v0.1.0"
                target="_blank"
                rel="noreferrer noopener"
                className={styles.primaryLink}>
                <BookOpen size={14} strokeWidth={2} />
                View tag on GitHub
                <ArrowRight size={14} strokeWidth={2} />
              </a>
            </div>

            <p className={styles.introText}>
              CoreGrid v0.1.0 is the first baseline release of CoreGrid, a configurable, self-hosted asset lifecycle
              management platform for institutional and government assets. It replaces disconnected registers and manual
              processes with a role-controlled system for asset registration, field identification, maintenance,
              transfers, disposals, compliance, and controlled AI-assisted decisions.
            </p>

            <div className={styles.downloadRow}>
              <a
                href="https://github.com/CoreGrid-org/CoreGrid/archive/refs/heads/main.zip"
                target="_blank"
                rel="noreferrer noopener"
                className={styles.secondaryLink}>
                <Download size={15} strokeWidth={2} />
                Web Source Code (.zip)
              </a>
              <a
                href="https://github.com/CoreGrid-org/coregrid-mobile/archive/refs/heads/main.zip"
                target="_blank"
                rel="noreferrer noopener"
                className={styles.secondaryLink}>
                <Download size={15} strokeWidth={2} />
                Mobile Source Code (.zip)
              </a>
            </div>

            <p className={styles.bodyText}>
              CoreGrid is designed for self-hosted deployment. Clone the repository and follow the setup and operations
              documentation to configure the API, PostgreSQL, web application, mobile client, and ThunderID.
            </p>

            <section className={styles.sectionBlock}>
              <div className={styles.sectionTitleRow}>
                <Sparkles size={18} strokeWidth={2} />
                <h2>What&apos;s included</h2>
              </div>

              <div className={styles.featureGrid}>
                {featureGroups.map((group) => (
                  <div key={group.title} className={styles.featureCard}>
                    <h3>{group.title}</h3>
                    <ul>
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.sectionBlock}>
              <div className={styles.sectionTitleRow}>
                <ShieldCheck size={18} strokeWidth={2} />
                <h2>Built for accountable asset management</h2>
              </div>

              <div className={styles.infoGrid}>
                <div className={styles.infoCard}>
                  <p>
                    CoreGrid is built for organisations that need to know what assets they own, where those assets are,
                    who is responsible for them, what condition they are in, and how every lifecycle decision was made.
                  </p>
                </div>
                <div className={styles.infoCard}>
                  <ul>
                    <li>Configurable asset structures rather than one fixed asset schema</li>
                    <li>Department and organisation scoping to protect operational data</li>
                    <li>Clear separation between field operations and management approvals</li>
                    <li>Immutable history and audit records for lifecycle accountability</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className={styles.sectionBlock}>
              <div className={styles.sectionTitleRow}>
                <Sparkles size={18} strokeWidth={2} />
                <h2>Technology</h2>
              </div>

              <div className={styles.techList}>
                {technologies.map(([label, value]) => (
                  <div key={label} className={styles.techRow}>
                    <span className={styles.techLabel}>{label}</span>
                    <span className={styles.techValue}>{value}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.sectionBlock}>
              <div className={styles.sectionTitleRow}>
                <ShieldCheck size={18} strokeWidth={2} />
                <h2>Out of scope</h2>
              </div>

              <ul className={styles.outOfScopeList}>
                {outOfScope.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className={styles.sectionBlock}>
              <div className={styles.sectionTitleRow}>
                <BookOpen size={18} strokeWidth={2} />
                <h2>Contributors ({contributors.length})</h2>
              </div>

              <div className={styles.contributorGrid}>
                {contributors.map((person) => (
                  <div key={person.name} className={styles.contributorCard}>
                    <h3>{person.name}</h3>
                    <p>{person.role}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.sectionBlock}>
              <div className={styles.sectionTitleRow}>
                <ArrowRight size={18} strokeWidth={2} />
                <h2>Documentation</h2>
              </div>

              <ul className={styles.linkList}>
                {docs.map(([label, url]) => (
                  <li key={label}>
                    <a href={url} target="_blank" rel="noreferrer noopener">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.sectionBlock}>
              <div className={styles.sectionTitleRow}>
                <ShieldCheck size={18} strokeWidth={2} />
                <h2>Reliability and security</h2>
              </div>

              <ul className={styles.securityList}>
                {securityPoints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </article>
          )}
        </div>
      </main>
    </Layout>
  );
}
