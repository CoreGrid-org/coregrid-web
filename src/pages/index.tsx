import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {
  ArrowRight,
  BookOpen,
  Bug,
  GitBranch,
  Terminal,
  Truck,
  HeartPulse,
  Factory,
  GraduationCap,
  Zap,
  Warehouse,
  UtensilsCrossed,
  Wheat,
} from 'lucide-react';

import Reveal from '@site/src/components/Reveal';
import DynamicIcon, {type IconName} from '@site/src/components/DynamicIcon';
import SeoHead from '@site/src/components/SeoHead';
import TechLogos from '@site/src/components/TechLogos';
import {products} from '@site/src/data/changelog';

import styles from './index.module.css';

const GITHUB_URL = 'https://github.com/CoreGrid-org/CoreGrid';

function GithubIcon(): React.ReactElement {
  return (
    <svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
      />
    </svg>
  );
}

/* Customer logo strip stays disabled until there are confirmed, real customers to show -
   naming organisations without confirmed customer status would be a false endorsement. */

const latestPlatform = products.find((p) => p.id === 'platform')?.releases.find((r) => !r.prerelease);

const stats = [
  {value: '10', label: 'Platform modules'},
  {value: '4', label: 'Role-based access levels'},
  {value: 'Web + Android', label: 'Management and field apps'},
  ...(latestPlatform ? [{value: latestPlatform.version, label: 'Latest stable release'}] : []),
];

const badges = [
  {
    label: 'CI',
    href: `${GITHUB_URL}/actions/workflows/ci.yml`,
    src: `${GITHUB_URL}/actions/workflows/ci.yml/badge.svg`,
  },
  {
    label: 'Latest release',
    href: `${GITHUB_URL}/releases`,
    src: 'https://img.shields.io/github/v/release/CoreGrid-org/CoreGrid?color=e8601c',
  },
  {
    label: 'Apache 2.0 License',
    href: `${GITHUB_URL}/blob/main/LICENSE`,
    src: 'https://img.shields.io/badge/license-Apache%202.0-blue.svg',
  },
];

const QUICK_START = `git clone https://github.com/CoreGrid-org/CoreGrid.git
cd CoreGrid

./setup.sh    # one-time setup
make dev      # start the API + web app

# Web app:  http://localhost:5173
# API docs: http://localhost:5083/swagger`;

const modules: {icon: IconName; title: string; desc: string}[] = [
  {
    icon: 'ClipboardList',
    title: 'Asset Registry',
    desc: 'Configurable categories, types and custom attributes, unique asset codes and printable QR labels.',
  },
  {
    icon: 'Wrench',
    title: 'Maintenance Management',
    desc: 'Fault reports with photos, work orders, assignment and cost suggestions from past repairs.',
  },
  {
    icon: 'RefreshCw',
    title: 'Transfers & Disposals',
    desc: 'Approved transfers confirmed on receipt, plus condemnation and evidence-backed disposal.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Audit & Compliance',
    desc: 'Verification campaigns, automatic discrepancies and an append-only audit log of every change.',
  },
  {
    icon: 'BrainCircuit',
    title: 'AI Decision Support',
    desc: 'Four agents evaluate a single asset or a whole fleet; an Administrator makes high-impact calls.',
  },
  {
    icon: 'BarChart3',
    title: 'Analytics & Reporting',
    desc: 'Role-based dashboards and inventory, maintenance, disposal and audit reports in PDF and CSV.',
  },
];

const industries = [
  {name: 'Transportation & Fleet', icon: Truck},
  {name: 'Healthcare', icon: HeartPulse},
  {name: 'Manufacturing', icon: Factory},
  {name: 'Education', icon: GraduationCap},
  {name: 'Utilities & Facilities', icon: Zap},
  {name: 'Logistics & Warehousing', icon: Warehouse},
  {name: 'Hospitality', icon: UtensilsCrossed},
  {name: 'Agriculture', icon: Wheat},
];

const communityCards = [
  {
    icon: GitBranch,
    title: 'Contribute',
    desc: 'Read the setup walkthrough, conventions and pull request workflow, then send a change.',
    label: 'Contribution guide',
    href: `${GITHUB_URL}/blob/main/CONTRIBUTING.md`,
  },
  {
    icon: Bug,
    title: 'Report an issue',
    desc: 'Found a bug or have an idea? Open an issue and help make the platform better.',
    label: 'Open an issue',
    href: `${GITHUB_URL}/issues`,
  },
  {
    icon: BookOpen,
    title: 'Read the docs',
    desc: 'Architecture, data model, API reference and a user manual for every module.',
    label: 'Documentation',
    to: '/docs/intro',
  },
];

export default function Home(): React.ReactElement {
  const heroImageSrc = useBaseUrl('img/circle-view.webp');

  return (
    <Layout
      title="CoreGrid"
      description="CoreGrid is an open-source, self-hosted platform that manages every physical asset from registration to disposal, with AI-assisted decisions that people approve.">
      <SeoHead
        path="/"
        title="Open-Source Asset Lifecycle Management"
        description="CoreGrid is an open-source, self-hosted platform that manages every physical asset from registration to disposal, with AI-assisted decisions that people approve."
      />

      <header className={styles.hero}>
        <div className="cg-container">
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <span className="cg-eyebrow">Open-source asset lifecycle management</span>
              <h1 className={`cg-heading ${styles.heroTitle}`}>Every asset, from registration to disposal</h1>
              <p className={`cg-lead ${styles.heroLead}`}>
                Register, maintain, transfer, verify and dispose of physical assets in one self-hosted platform -
                with AI-assisted decisions that accountable people approve.
              </p>
              <div className={styles.heroActions}>
                <Link className="cg-btn cg-btn--primary" to="/docs/intro">
                  Get started
                </Link>
                <a className="cg-btn cg-btn--ghost" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                  <GithubIcon />
                  View on GitHub
                </a>
              </div>
              <div className={styles.badgeRow}>
                {badges.map((badge) => (
                  <a
                    key={badge.label}
                    href={badge.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={badge.label}
                    className={styles.badgeLink}>
                    <img src={badge.src} alt={badge.label} className={styles.badgeImg} loading="lazy" decoding="async" />
                  </a>
                ))}
              </div>
            </div>

            <div className={styles.heroVisual}>
              <img
                src={heroImageSrc}
                alt="CoreGrid lifecycle: asset registry, maintenance management, transfers and disposals, and audit and compliance around a register, plan, execute and verify cycle"
                className={styles.heroImage}
                width={960}
                height={960}
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>

          <div className={styles.statBar}>
            {stats.map((stat) => (
              <div key={stat.label} className={styles.statItem}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className="cg-section cg-section--tight">
        <div className="cg-container">
          <Reveal>
            <div className={styles.quickstartGrid}>
              <div className={styles.quickstartCopy}>
                <span className="cg-eyebrow">
                  <Terminal size={14} strokeWidth={2.25} className={styles.eyebrowIcon} />
                  Quick start
                </span>
                <h2 className={`cg-heading ${styles.sectionTitle}`}>Running locally in two commands</h2>
                <p className={styles.sectionText}>
                  You need the .NET 10 SDK, Node 20+, Docker, make, curl and jq. The setup script prepares
                  ThunderID, PostgreSQL and test logins for every role; the guides cover AI keys and photo storage.
                </p>
                <a className="cg-btn cg-btn--primary" href={`${GITHUB_URL}#quick-start`} target="_blank" rel="noopener noreferrer">
                  Read the setup guide
                </a>
              </div>
              <div className={styles.quickstartCode}>
                <CodeBlock language="bash" title="Run CoreGrid locally">
                  {QUICK_START}
                </CodeBlock>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cg-section cg-section--alt">
        <div className="cg-container">
          <Reveal>
            <div className={styles.introGrid}>
              <div>
                <span className="cg-eyebrow">What CoreGrid manages</span>
                <h2 className={`cg-heading ${styles.sectionTitle}`}>The whole asset lifecycle, one platform</h2>
              </div>
              <p className={styles.sectionText}>
                From the day an asset is registered to the day it is disposed of, every action is permission-checked,
                recorded in its history and visible to the people accountable for it.
              </p>
            </div>

            <div className="cg-grid cg-grid--3">
              {modules.map((mod, index) => (
                <div key={mod.title} className={`cg-card ${styles.moduleCard}`}>
                  <div className={styles.moduleTop}>
                    <span className={styles.moduleIcon}>
                      <DynamicIcon name={mod.icon} size={20} strokeWidth={1.8} />
                    </span>
                    <span className={styles.moduleNumber}>{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className={styles.moduleTitle}>{mod.title}</h3>
                  <p className={styles.moduleDesc}>{mod.desc}</p>
                </div>
              ))}
            </div>

            <div className={styles.moreLink}>
              <Link to="/features">
                See all 10 modules and their features <ArrowRight size={15} strokeWidth={2.25} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cg-section cg-section--tight">
        <div className="cg-container">
          <Reveal>
            <span className={`cg-eyebrow ${styles.centerEyebrow}`}>Built on open standards</span>
            <TechLogos />
          </Reveal>
        </div>
      </section>

      <section className="cg-section cg-section--alt">
        <div className="cg-container">
          <Reveal>
            <div className={styles.introGrid}>
              <div>
                <span className="cg-eyebrow">Any asset domain</span>
                <h2 className={`cg-heading ${styles.sectionTitle}`}>Configured, not rebuilt, for your sector</h2>
              </div>
              <p className={styles.sectionText}>
                Asset types, custom attributes and policies are configuration, so one deployment fits fleets,
                hospitals, campuses or plants without new code.
              </p>
            </div>
            <ul className={styles.industryGrid}>
              {industries.map(({name, icon: Icon}) => (
                <li key={name}>
                  <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                  {name}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="cg-section">
        <div className="cg-container">
          <Reveal>
            <div className={styles.communityIntro}>
              <span className="cg-eyebrow">Join the community</span>
              <h2 className={`cg-heading ${styles.sectionTitle}`}>Built in the open, on GitHub</h2>
              <p className={styles.sectionText}>
                CoreGrid is open source under the Apache License 2.0. Contributions, questions and bug reports all
                happen on GitHub.
              </p>
            </div>

            <div className="cg-grid cg-grid--3">
              {communityCards.map(({icon: Icon, ...card}) => (
                <div key={card.title} className={`cg-card ${styles.communityCard}`}>
                  <span className={styles.moduleIcon}>
                    <Icon size={20} strokeWidth={1.8} />
                  </span>
                  <h3 className={styles.moduleTitle}>{card.title}</h3>
                  <p className={styles.moduleDesc}>{card.desc}</p>
                  {card.to ? (
                    <Link className={styles.cardLink} to={card.to}>
                      {card.label} <ArrowRight size={14} strokeWidth={2.25} />
                    </Link>
                  ) : (
                    <a className={styles.cardLink} href={card.href} target="_blank" rel="noopener noreferrer">
                      {card.label} <ArrowRight size={14} strokeWidth={2.25} />
                    </a>
                  )}
                </div>
              ))}
            </div>

            <div className={styles.moreLink}>
              <Link to="/community">
                See all the ways to get involved <ArrowRight size={15} strokeWidth={2.25} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
