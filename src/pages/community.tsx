import React from 'react';
import Layout from '@theme/Layout';
import {ArrowRight, BookOpen, MessageCircle, ShieldCheck, Users} from 'lucide-react';
import SeoHead from '@site/src/components/SeoHead';
import styles from './community.module.css';

type CommunityAction = {
  icon: React.ComponentType<{size?: number; strokeWidth?: number}>;
  title: string;
  description: string;
  linkLabel: string;
  href: string;
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
  },
];

const repositories = [
  {
    name: 'CoreGrid System',
    description: 'ASP.NET Core API, PostgreSQL data layer, and the React management application.',
    repository: 'https://github.com/CoreGrid-org/CoreGrid',
    guide: 'https://github.com/CoreGrid-org/CoreGrid/blob/main/CONTRIBUTING.md',
    guideLabel: 'System contribution guide',
  },
  {
    name: 'CoreGrid Mobile',
    description: 'Flutter field-operations application for asset lookup, verification, and maintenance workflows.',
    repository: 'https://github.com/CoreGrid-org/coregrid-mobile',
    guide: 'https://github.com/CoreGrid-org/coregrid-mobile/blob/main/CONTRIBUTING.md',
    guideLabel: 'Mobile contribution guide',
  },
];

const contributors = [
  {username: 'HasithaErandika', name: 'Hasitha Erandika'},
  {username: 'jguruge', name: 'Jayashan Guruge'},
  {username: 'seneja', name: 'Seneja Thehansi'},
  {username: 'NipunaBhanuka18', name: 'Nipuna Bhanuka Samarasinghe'},
];

export default function CommunityPage(): React.ReactElement {
  return (
    <Layout
      title="Community"
      description="Get involved with the CoreGrid open-source asset lifecycle platform.">
      <SeoHead
        path="/community"
        title="CoreGrid Community"
        description="Contribute to CoreGrid, ask questions, report issues, and meet the people building the platform."
      />

      <main className={styles.page}>
        <header className="cg-page-header">
          <div className="cg-container">
            <div className={styles.hero}>
              <span className="cg-eyebrow">Built in the open</span>
              <h1 className="cg-heading">Get involved</h1>
              <p className="cg-lead">
                CoreGrid is developed in public across its system and mobile repositories. Help improve accountable
                asset management by contributing code, sharing feedback, or reporting a problem.
              </p>
              <a
                className="cg-btn cg-btn--primary"
                href="https://github.com/CoreGrid-org/CoreGrid"
                target="_blank"
                rel="noreferrer noopener">
                Explore CoreGrid on GitHub
                <ArrowRight size={17} strokeWidth={2} />
              </a>
            </div>
          </div>
        </header>

        <section className="cg-section cg-section--tight">
          <div className="cg-container">
            <div className={styles.sectionIntro}>
              <span className="cg-eyebrow">Ways to participate</span>
              <h2 className="cg-heading">Choose where to start</h2>
            </div>
            <div className={styles.actionGrid}>
              {actions.map((action) => {
                const Icon = action.icon;
                return (
                  <article key={action.title} className={styles.actionItem}>
                    <span className={styles.actionIcon}>
                      <Icon size={21} strokeWidth={1.8} />
                    </span>
                    <h3>{action.title}</h3>
                    <p>{action.description}</p>
                    <a href={action.href} target="_blank" rel="noreferrer noopener">
                      {action.linkLabel}
                      <ArrowRight size={15} strokeWidth={2} />
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="cg-section cg-section--alt">
          <div className="cg-container">
            <div className={styles.sectionIntro}>
              <span className="cg-eyebrow">Project repositories</span>
              <h2 className="cg-heading">Two repositories, one platform</h2>
              <p>Choose the part of CoreGrid you want to explore or contribute to.</p>
            </div>
            <div className={styles.repositoryGrid}>
              {repositories.map((repository) => (
                <article key={repository.name} className={styles.repositoryItem}>
                  <div>
                    <h3>{repository.name}</h3>
                    <p>{repository.description}</p>
                  </div>
                  <div className={styles.repositoryLinks}>
                    <a href={repository.repository} target="_blank" rel="noreferrer noopener">
                      View repository
                      <ArrowRight size={15} strokeWidth={2} />
                    </a>
                    <a href={repository.guide} target="_blank" rel="noreferrer noopener">
                      {repository.guideLabel}
                      <ArrowRight size={15} strokeWidth={2} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cg-section">
          <div className="cg-container">
            <div className={styles.maintainersHeader}>
              <div>
                <span className="cg-eyebrow">Maintainers</span>
                <h2 className="cg-heading">Started and maintained by contributors</h2>
                <p>CoreGrid grows through the work of people contributing across the system and mobile projects.</p>
              </div>
              <a
                className={styles.contributorGraphLink}
                href="https://github.com/CoreGrid-org/CoreGrid/graphs/contributors"
                target="_blank"
                rel="noreferrer noopener">
                <Users size={17} strokeWidth={1.8} />
                Contributor graph
                <ArrowRight size={15} strokeWidth={2} />
              </a>
            </div>
            <div className={styles.contributors}>
              {contributors.map((contributor) => (
                <a
                  key={contributor.username}
                  className={styles.contributor}
                  href={`https://github.com/${contributor.username}`}
                  target="_blank"
                  rel="noreferrer noopener">
                  <img
                    src={`https://github.com/${contributor.username}.png?size=112`}
                    alt={`${contributor.name} GitHub profile`}
                    loading="lazy"
                    decoding="async"
                  />
                  <span>{contributor.name}</span>
                  <ArrowRight size={14} strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
