import React, {useEffect, useState} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import {
  ArrowRight,
  BookOpen,
  ExternalLink,
  GitPullRequest,
  MessageCircle,
  Monitor,
  ShieldCheck,
  Smartphone,
  Tag,
  Users,
} from 'lucide-react';
import SeoHead from '@site/src/components/SeoHead';
import PageHeader from '@site/src/components/PageHeader';
import {productById} from '@site/src/data/changelog';
import styles from './community.module.css';

type CommunityAction = {
  icon: typeof BookOpen;
  title: string;
  description: string;
  linkLabel: string;
  href: string;
  badge?: string;
};

const actions: CommunityAction[] = [
  {
    icon: BookOpen,
    title: 'Contribute',
    description: 'Explore the setup walkthrough, coding conventions, and pull request workflow before making a change.',
    linkLabel: 'Read contribution guide',
    href: 'https://github.com/CoreGrid-org/CoreGrid/blob/main/CONTRIBUTING.md',
  },
  {
    icon: MessageCircle,
    title: 'Ask or report an issue',
    description: 'Ask a project question, suggest an improvement, or report a reproducible problem in the issue tracker.',
    linkLabel: 'Open CoreGrid issues',
    href: 'https://github.com/CoreGrid-org/CoreGrid/issues',
  },
  {
    icon: ShieldCheck,
    title: 'Report a security concern',
    description: 'Please use GitHub’s private vulnerability reporting flow instead of posting security details publicly.',
    linkLabel: 'Open private security report',
    href: 'https://github.com/CoreGrid-org/CoreGrid/security/advisories/new',
    badge: 'Private',
  },
];

const repositories = [
  {
    product: 'platform',
    icon: Monitor,
    name: 'CoreGrid System',
    description: 'ASP.NET Core API, PostgreSQL data layer, and the React management application.',
    repository: 'https://github.com/CoreGrid-org/CoreGrid',
    guide: 'https://github.com/CoreGrid-org/CoreGrid/blob/main/CONTRIBUTING.md',
  },
  {
    product: 'mobile',
    icon: Smartphone,
    name: 'CoreGrid Mobile',
    description: 'Flutter field-operations application for asset lookup, verification, and maintenance workflows.',
    repository: 'https://github.com/CoreGrid-org/coregrid-mobile',
    guide: 'https://github.com/CoreGrid-org/coregrid-mobile/blob/main/CONTRIBUTING.md',
  },
];

const contributors = [
  {username: 'HasithaErandika', name: 'Hasitha Erandika'},
  {username: 'jguruge', name: 'Jayashan Guruge'},
  {username: 'seneja', name: 'Seneja Thehansi'},
  {username: 'NipunaBhanuka18', name: 'Nipuna Bhanuka Samarasinghe'},
];

const sections = [
  {id: 'participate', label: 'Ways to participate'},
  {id: 'repositories', label: 'Repositories'},
  {id: 'maintainers', label: 'Maintainers'},
];

const dateFormat = new Intl.DateTimeFormat('en', {dateStyle: 'medium', timeZone: 'UTC'});

function SectionHeading({index, eyebrow, title, children}: {
  index: number;
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}): React.ReactElement {
  return (
    <header className={styles.sectionHeader}>
      <span className={styles.timelineDot} aria-hidden="true">{index}</span>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </header>
  );
}

export default function CommunityPage(): React.ReactElement {
  const [activeId, setActiveId] = useState(sections[0].id);

  // Highlight the section currently in view in the sidebar.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting);
        if (hit) setActiveId(hit.target.id);
      },
      {rootMargin: '-25% 0px -65% 0px'},
    );
    sections.forEach(({id}) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <Layout title="Community" description="Get involved with the CoreGrid open-source asset lifecycle platform.">
      <SeoHead
        path="/community"
        title="CoreGrid Community"
        description="Contribute to CoreGrid, ask questions, report issues, and meet the people building the platform."
      />

      <main className={styles.page}>
        <PageHeader
          eyebrow="Built in the open"
          title="Get involved"
          lead="CoreGrid is developed in public across its system and mobile repositories. Help improve accountable asset management by contributing code, sharing feedback, or reporting a problem.">
          <div className={styles.heroActions}>
            <a
              className="cg-btn cg-btn--primary"
              href="https://github.com/CoreGrid-org/CoreGrid"
              target="_blank"
              rel="noreferrer noopener">
              Explore CoreGrid on GitHub
              <ArrowRight size={17} strokeWidth={2} />
            </a>
            <Link className="cg-btn cg-btn--ghost" to="/changelog">
              See the changelog
            </Link>
          </div>
        </PageHeader>

        <div className={clsx('cg-container', styles.layout)}>
          <aside className={styles.sidebar} aria-label="Community navigation">
            <h2 className={styles.sidebarHeading}>On this page</h2>
            <nav className={styles.sectionList}>
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={clsx(styles.sectionLink, activeId === section.id && styles.sectionActive)}>
                  {section.label}
                </a>
              ))}
            </nav>
            <div className={styles.quickLinks}>
              <a href="https://github.com/CoreGrid-org" target="_blank" rel="noreferrer noopener">
                CoreGrid-org on GitHub
                <ExternalLink size={13} strokeWidth={2} aria-hidden="true" />
              </a>
              <a href="https://github.com/CoreGrid-org/CoreGrid/pulls" target="_blank" rel="noreferrer noopener">
                Open pull requests
                <ExternalLink size={13} strokeWidth={2} aria-hidden="true" />
              </a>
            </div>
          </aside>

          <div className={styles.timeline}>
            <section id="participate" className={styles.section}>
              <SectionHeading index={1} eyebrow="Ways to participate" title="Choose where to start" />
              <div className={clsx(styles.card, styles.cardAccent)}>
                {actions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <article key={action.title} className={styles.actionRow}>
                      <span className={styles.actionIcon}>
                        <Icon size={20} strokeWidth={1.9} aria-hidden="true" />
                      </span>
                      <div className={styles.actionBody}>
                        <h3>
                          {action.title}
                          {action.badge && <span className={styles.badge}>{action.badge}</span>}
                        </h3>
                        <p>{action.description}</p>
                      </div>
                      <a className={styles.actionLink} href={action.href} target="_blank" rel="noreferrer noopener">
                        {action.linkLabel}
                        <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
                      </a>
                    </article>
                  );
                })}
              </div>
            </section>

            <section id="repositories" className={styles.section}>
              <SectionHeading index={2} eyebrow="Project repositories" title="Two repositories, one platform">
                Choose the part of CoreGrid you want to explore or contribute to.
              </SectionHeading>
              <div className={styles.repoGrid}>
                {repositories.map((repository) => {
                  const Icon = repository.icon;
                  const product = productById.get(repository.product);
                  const latest = product?.releases.find((release) => !release.prerelease);
                  return (
                    <article key={repository.name} className={styles.card}>
                      <div className={styles.repoBadges}>
                        <span className={styles.productChip}>
                          <Icon size={13} strokeWidth={2.2} aria-hidden="true" />
                          {product?.label}
                        </span>
                        {latest && (
                          <Link to={`/changelog#${latest.id}`} className={styles.releaseChip}>
                            <Tag size={12} strokeWidth={2.2} aria-hidden="true" />
                            {latest.version} · {dateFormat.format(new Date(latest.date))}
                          </Link>
                        )}
                      </div>
                      <h3 className={styles.repoName}>{repository.name}</h3>
                      <p className={styles.repoDescription}>{repository.description}</p>
                      <div className={styles.repoActions}>
                        <a
                          className="cg-btn cg-btn--primary"
                          href={repository.repository}
                          target="_blank"
                          rel="noreferrer noopener">
                          View repository
                          <ExternalLink size={15} strokeWidth={2} aria-hidden="true" />
                        </a>
                        <a className="cg-btn cg-btn--ghost" href={repository.guide} target="_blank" rel="noreferrer noopener">
                          <GitPullRequest size={15} strokeWidth={2} aria-hidden="true" />
                          Contribution guide
                        </a>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            <section id="maintainers" className={styles.section}>
              <SectionHeading index={3} eyebrow="Maintainers" title="Started and maintained by contributors">
                CoreGrid grows through the work of people contributing across the system and mobile projects.
              </SectionHeading>
              <div className={styles.card}>
                <div className={styles.contributorGrid}>
                  {contributors.map((contributor) => (
                    <a
                      key={contributor.username}
                      className={styles.contributor}
                      href={`https://github.com/${contributor.username}`}
                      target="_blank"
                      rel="noreferrer noopener">
                      <img
                        src={`https://github.com/${contributor.username}.png?size=96`}
                        alt=""
                        width={44}
                        height={44}
                        loading="lazy"
                        decoding="async"
                      />
                      <span className={styles.contributorText}>
                        <span className={styles.contributorName}>{contributor.name}</span>
                        <span className={styles.contributorLogin}>@{contributor.username}</span>
                      </span>
                      <ArrowRight size={15} strokeWidth={2} aria-hidden="true" className={styles.contributorArrow} />
                    </a>
                  ))}
                </div>
                <footer className={styles.cardFooter}>
                  <a href="https://github.com/CoreGrid-org/CoreGrid/graphs/contributors" target="_blank" rel="noreferrer noopener">
                    <Users size={15} strokeWidth={2} aria-hidden="true" />
                    View the contributor graph
                    <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
                  </a>
                </footer>
              </div>
            </section>
          </div>
        </div>
      </main>
    </Layout>
  );
}
