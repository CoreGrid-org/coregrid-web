import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {ArrowRight, Check, ExternalLink} from 'lucide-react';
import Reveal from '@site/src/components/Reveal';
import PageHeader from '@site/src/components/PageHeader';
import SectionHeader from '@site/src/components/SectionHeader';
import SeoHead from '@site/src/components/SeoHead';
import styles from './pricing.module.css';

// TODO: replace with the real GitHub organisation URL once the repository is public.
const GITHUB_URL = 'https://github.com/CoreGrid-org/CoreGrid';

const included = [
  'Asset registry & QR identification',
  'Maintenance management',
  'Transfers & disposals',
  'Audit & compliance',
  'AI decision support',
  'User & access management',
  'Analytics & reporting',
  'Mobile app for field operations',
  'Notifications & alerts',
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
    eyebrow: 'Self-hosted, we operate it',
    name: 'Managed Hosting',
    price: 'Quoted',
    priceNote: 'Scoped to your deployment',
    summary:
      "Same Community edition codebase, running on your own cloud account, with our team handling deployment, upgrades, monitoring and support - for teams who want the control of self-hosting without operating five cooperating services themselves.",
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
    badge: 'Most organisations start here',
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
      'Cross-organisation benchmarking & analytics',
      'Additional AI agents - procurement, warranty, fleet optimisation',
      'Offline field capture with deferred sync',
      'Managed backups, automatic scaling, zero-downtime upgrades',
    ],
    cta: {label: 'Join the waitlist', to: '/contact', icon: 'arrow'},
    ctaVariant: 'ghost',
  },
];

const faqs = [
  {
    q: 'Is CoreGrid really free?',
    a: 'Yes. The Community Edition is the full platform - every module, no seat limits - released under the Apache License 2.0. You can download it, self-host it and run it in production at no licence cost.',
  },
  {
    q: 'What do you actually charge for?',
    a: "Deployment and support, not the software. Most organisations self-host with a support retainer, or choose Managed Hosting so our team runs it on their cloud account. Neither is required to use the Community Edition - they're there for teams who'd rather not operate the infrastructure themselves.",
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
        lead="CoreGrid Community Edition is free, source-available and yours to self-host under the Apache
              License 2.0. If you'd rather we deployed and operated it for you, Managed Hosting and a
              fully-hosted plan are also available.">
        <div className={styles.heroCtaRow}>
          <Link className={`cg-btn cg-btn--primary ${styles.heroCta}`} href={GITHUB_URL}>
            <ExternalLink size={17} strokeWidth={2.25} />
            View on GitHub
          </Link>
          <Link className={`cg-btn cg-btn--ghost ${styles.heroCta}`} to="/contact">
            Talk to us about Managed Hosting
            <ArrowRight size={17} strokeWidth={2.25} />
          </Link>
        </div>
      </PageHeader>

      <section className="cg-section cg-section--tight">
        <div className="cg-container">
          <Reveal>
            <div className={styles.tierGrid}>
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`cg-card ${styles.tierCard} ${tier.featured ? styles.tierFeatured : ''}`}>
                  {tier.badge && <span className={styles.tierBadge}>{tier.badge}</span>}
                  <span className={styles.tierEyebrow}>{tier.eyebrow}</span>
                  <h3 className={styles.tierName}>{tier.name}</h3>
                  <div className={styles.tierPriceRow}>
                    <span className={styles.tierPrice}>{tier.price}</span>
                  </div>
                  <span className={styles.tierPriceNote}>{tier.priceNote}</span>
                  <p className={styles.tierSummary}>{tier.summary}</p>
                  <ul className={styles.tierFeatures}>
                    {tier.features.map((feature) => (
                      <li key={feature}>
                        <Check className={styles.checkMark} size={15} strokeWidth={2.5} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    className={`cg-btn cg-btn--${tier.ctaVariant} ${styles.tierCta}`}
                    to={tier.cta.to}
                    href={tier.cta.href}>
                    {tier.cta.icon === 'external' && <ExternalLink size={17} strokeWidth={2.25} />}
                    {tier.cta.label}
                    {tier.cta.icon === 'arrow' && <ArrowRight size={17} strokeWidth={2.25} />}
                  </Link>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cg-section cg-section--alt">
        <div className="cg-container">
          <Reveal>
            <SectionHeader
              align="left"
              eyebrow="What's Included"
              title="The full platform, free, in every tier"
              description="Community, Managed Hosting and CoreGrid Cloud all include everything below - nothing here is held back to sell a paid tier. CoreGrid Cloud adds capability on top of this, it never subtracts from it."
            />
            <ul className={styles.includedGrid}>
              {included.map((item) => (
                <li key={item}>
                  <Check className={styles.checkMark} size={15} strokeWidth={2.5} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className={styles.docsLink}>
              See every module in detail on the <Link to="/features">features page</Link>.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="cg-section">
        <div className="cg-container">
          <Reveal>
            <SectionHeader align="left" eyebrow="Questions" title="Pricing, answered" />
            <div className={styles.faqList}>
              {faqs.map((item) => (
                <div key={item.q} className={`cg-card ${styles.faqCard}`}>
                  <h3 className={styles.faqQuestion}>{item.q}</h3>
                  <p className={styles.faqAnswer}>{item.a}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cg-section cg-section--alt">
        <div className="cg-container">
          <Reveal>
            <div className={`cg-panel ${styles.ctaBanner}`}>
              <div>
                <h2 className="cg-heading" style={{marginBottom: '0.5rem'}}>
                  Ready to get started?
                </h2>
                <p className={styles.ctaText}>
                  Clone the Community Edition today, or tell us about your organisation for a Managed Hosting
                  proposal.
                </p>
              </div>
              <div className={styles.ctaBannerActions}>
                <Link className="cg-btn cg-btn--ghost" href={GITHUB_URL}>
                  <ExternalLink size={17} strokeWidth={2.25} />
                  View on GitHub
                </Link>
                <Link className="cg-btn cg-btn--primary" to="/contact">
                  Contact us
                  <ArrowRight size={17} strokeWidth={2.25} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
