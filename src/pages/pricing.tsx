import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import {ArrowRight, Check, ChevronDown, ExternalLink, Minus} from 'lucide-react';
import Reveal from '@site/src/components/Reveal';
import PageHeader from '@site/src/components/PageHeader';
import SectionHeader from '@site/src/components/SectionHeader';
import SeoHead from '@site/src/components/SeoHead';
import styles from './pricing.module.css';

const GITHUB_URL = 'https://github.com/CoreGrid-org/CoreGrid';

const included = [
  'Asset registry & QR identification',
  'Maintenance management',
  'Transfers & disposals',
  'Audit & compliance',
  'AI decision support',
  'User & access management',
  'Analytics & reporting',
  'Android app for field operations',
  'In-app notifications',
];

type Tier = {
  eyebrow: string;
  name: string;
  price: string;
  priceNote: string;
  summary: string;
  features: string[];
  cta: {label: string; to?: string; href?: string; icon?: 'arrow' | 'external'};
  ctaVariant: 'primary' | 'ghost';
  featured?: boolean;
  badge?: string;
};

const tiers: Tier[] = [
  {
    eyebrow: 'Self-hosted',
    name: 'Community Edition',
    price: 'Free',
    priceNote: 'Apache License 2.0 — forever',
    summary:
      "The complete platform, source available, deployed on your own infrastructure. No feature gating, no seat limits, no licence fee - built for organisations whose data residency or procurement policy rules out a shared cloud service regardless of price.",
    features: [
      'Full source code, Apache License 2.0',
      'Every module - nothing held back for a paid tier',
      'Runs on your own cloud account, on-premises, or air-gapped',
      'Unlimited departments, users and assets',
      'Community support via GitHub',
    ],
    cta: {label: 'View on GitHub', href: GITHUB_URL, icon: 'external'},
    ctaVariant: 'ghost',
  },
  {
    eyebrow: 'Managed for you',
    name: 'Managed Hosting',
    price: 'Quoted',
    priceNote: 'Scoped to your deployment',
    summary:
      "Same Community edition codebase, running on your own cloud account, with our team handling deployment, upgrades, monitoring and support - for teams who want the control of self-hosting without operating the API, database, identity provider, web host and object storage themselves.",
    features: [
      'Everything in Community Edition',
      'Deployment, upgrades and monitoring by our team',
      'SLA-backed support retainer',
      'Data stays on your cloud account and billing',
      'Onboarding and data migration included',
    ],
    cta: {label: 'Get a quote', to: '/contact', icon: 'arrow'},
    ctaVariant: 'primary',
    featured: true,
    badge: 'Recommended',
  },
  {
    eyebrow: 'Cloud-hosted',
    name: 'CoreGrid Cloud',
    price: 'Coming soon',
    priceNote: 'Multi-tenant SaaS',
    summary:
      "A subscription, multi-tenant edition we host and operate entirely - everything in Community Edition, plus new capability only possible on shared infrastructure. For organisations without a data-residency constraint who want more than a self-hosted deployment can offer, not less.",
    features: [
      'Everything in Community Edition - nothing held back to sell this tier',
      'Planned: cross-organisation benchmarking & analytics',
      'Planned: additional AI agents - procurement, warranty, fleet optimisation',
      'Planned: offline field capture with deferred sync',
      'Managed backups, automatic scaling, zero-downtime upgrades',
    ],
    cta: {label: 'Join the waitlist', to: '/contact', icon: 'arrow'},
    ctaVariant: 'ghost',
  },
];

type Cell = boolean | string;

const comparison: {label: string; cells: [Cell, Cell, Cell]}[] = [
  {label: 'Every module, nothing held back', cells: [true, true, true]},
  {label: 'Source code under Apache License 2.0', cells: [true, true, true]},
  {label: 'Runs on infrastructure you control', cells: [true, true, false]},
  {label: 'Deployment, upgrades and monitoring', cells: ['You', 'Our team', 'Our team']},
  {label: 'Support', cells: ['GitHub community', 'SLA-backed retainer', 'To be announced']},
  {label: 'Cross-organisation analytics, extra agents, offline sync', cells: [false, false, 'Planned']},
];

const faqs = [
  {
    q: 'Is CoreGrid really free?',
    a: 'Yes. The Community Edition is the full platform - every module, no seat limits - released under the Apache License 2.0. You can download it, self-host it and run it in production at no licence cost.',
  },
  {
    q: 'What do you actually charge for?',
    a: "Deployment and support, not the software. You can self-host with a support retainer, or choose Managed Hosting so our team runs it on your cloud account. Neither is required to use the Community Edition - they're there for teams who'd rather not operate the infrastructure themselves.",
  },
  {
    q: 'Why open source, rather than a closed product?',
    a: 'Our primary buyer - government and institutional asset registers - frequently cannot use a shared multi-tenant cloud service at all, for data-residency or procurement reasons, independent of price. Open, self-hostable software is the only form factor that reaches that buyer.',
  },
  {
    q: 'Does CoreGrid Cloud remove anything from the Community Edition?',
    a: "No. Every module in Community stays there, free, permanently. CoreGrid Cloud adds capability that only makes sense on shared infrastructure - cross-organisation analytics, additional AI agents, offline sync - it never withholds something Community already has.",
  },
  {
    q: 'Is there a contract length or trial option for Managed Hosting?',
    a: "Tell us how you'd like to evaluate CoreGrid - a guided demo, a pilot with a subset of your assets, or a full deployment - and we'll shape the engagement around it.",
  },
];

export default function Pricing(): React.ReactElement {
  return (
    <Layout
      title="Pricing"
      description="CoreGrid Community Edition is free and open source under Apache License 2.0. Managed Hosting and a hosted SaaS edition are available for teams who'd rather not run it themselves.">
      <SeoHead
        path="/pricing"
        title="Pricing"
        description="CoreGrid Community Edition is free and open source under Apache License 2.0. Managed Hosting and a hosted SaaS edition are available for teams who'd rather not run it themselves."
      />

      <PageHeader
        eyebrow="Pricing"
        title="Open source at the core. Paid, if you'd rather we ran it."
        lead="CoreGrid Community Edition is free and yours to self-host under the Apache License 2.0. If you'd rather we deployed and operated it for you, Managed Hosting is available, and a fully hosted plan is on the way."
      />

      <section className={styles.tiersSection}>
        <div className="cg-container">
          <Reveal>
            <div className={styles.tierGrid}>
              {tiers.map((tier) => (
                <article key={tier.name} className={clsx(styles.tierCard, tier.featured && styles.tierFeatured)}>
                  <div className={styles.tierHead}>
                    <span className={styles.tierEyebrow}>{tier.eyebrow}</span>
                    {tier.badge && <span className={styles.tierBadge}>{tier.badge}</span>}
                  </div>
                  <h2 className={styles.tierName}>{tier.name}</h2>
                  <div className={styles.tierPrice}>{tier.price}</div>
                  <span className={styles.tierPriceNote}>{tier.priceNote}</span>
                  <p className={styles.tierSummary}>{tier.summary}</p>
                  <Link
                    className={clsx('cg-btn', `cg-btn--${tier.ctaVariant}`, styles.tierCta)}
                    to={tier.cta.to}
                    href={tier.cta.href}>
                    {tier.cta.icon === 'external' && <ExternalLink size={16} strokeWidth={2.25} />}
                    {tier.cta.label}
                    {tier.cta.icon === 'arrow' && <ArrowRight size={16} strokeWidth={2.25} />}
                  </Link>
                  <ul className={styles.tierFeatures}>
                    {tier.features.map((feature) => {
                      const planned = feature.startsWith('Planned: ');
                      return (
                        <li key={feature} className={clsx(planned && styles.planned)}>
                          <Check size={15} strokeWidth={2.5} aria-hidden="true" />
                          <span>
                            {planned && <span className={styles.plannedTag}>Planned</span>}
                            {feature.replace('Planned: ', '')}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cg-section cg-section--alt">
        <div className="cg-container">
          <Reveal>
            <SectionHeader align="left" eyebrow="Compare" title="What changes between plans" description="The software is the same everywhere. The plans differ in who runs it and how it is supported." />
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col"><span className={styles.srOnly}>Feature</span></th>
                    {tiers.map((tier) => (
                      <th key={tier.name} scope="col" className={clsx(tier.featured && styles.colFeatured)}>{tier.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row) => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      {row.cells.map((cell, index) => (
                        <td key={index} className={clsx(tiers[index].featured && styles.colFeatured)}>
                          {cell === true ? (
                            <Check size={17} strokeWidth={2.5} className={styles.yes} aria-label="Included" />
                          ) : cell === false ? (
                            <Minus size={17} strokeWidth={2} className={styles.no} aria-label="Not included" />
                          ) : (
                            cell
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cg-section">
        <div className={clsx('cg-container', styles.split)}>
          <Reveal>
            <SectionHeader
              align="left"
              eyebrow="What's included"
              title="The full platform, in every plan"
              description="Nothing below is held back to sell a paid plan. CoreGrid Cloud will add capability on top of this; it never subtracts from it."
            />
            <p className={styles.docsLink}>
              See every module in detail on the <Link to="/features">features page</Link>.
            </p>
          </Reveal>
          <Reveal>
            <ul className={styles.includedGrid}>
              {included.map((item) => (
                <li key={item}>
                  <Check size={15} strokeWidth={2.5} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="cg-section cg-section--alt">
        <div className={clsx('cg-container', styles.split)}>
          <Reveal>
            <SectionHeader align="left" eyebrow="Questions" title="Pricing, answered" />
          </Reveal>
          <Reveal>
            <div className={styles.faqList}>
              {faqs.map((item, index) => (
                <details key={item.q} className={styles.faq} open={index === 0}>
                  <summary>
                    {item.q}
                    <ChevronDown size={18} strokeWidth={2} aria-hidden="true" className={styles.chevron} />
                  </summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cg-section">
        <div className="cg-container">
          <div className={styles.cta}>
            <div>
              <h2>Ready to get started?</h2>
              <p>Clone the Community Edition today, or tell us about your organisation for a Managed Hosting proposal.</p>
            </div>
            <div className={styles.ctaActions}>
              <Link className="cg-btn cg-btn--ghost" href={GITHUB_URL}>
                <ExternalLink size={16} strokeWidth={2.25} />
                View on GitHub
              </Link>
              <Link className="cg-btn cg-btn--primary" to="/contact">
                Contact us
                <ArrowRight size={16} strokeWidth={2.25} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
