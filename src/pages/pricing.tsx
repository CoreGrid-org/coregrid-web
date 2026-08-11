import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {ArrowRight, Check} from 'lucide-react';
import Reveal from '@site/src/components/Reveal';
import DynamicIcon, {type IconName} from '@site/src/components/DynamicIcon';
import SeoHead from '@site/src/components/SeoHead';
import styles from './pricing.module.css';

const model: {icon: IconName; title: string; description: string}[] = [
  {
    icon: 'Server',
    title: 'A dedicated deployment',
    description:
      'Every customer gets their own instance - their own web application, database and identity provider. Nothing is shared, so cost reflects your deployment, not a shared multi-tenant bill.',
  },
  {
    icon: 'Layers',
    title: 'The full platform, included',
    description:
      'Asset registry, maintenance, transfers, disposals, audit, AI decision support, analytics - every module ships as one product. No feature gating, no paywalled tiers.',
  },
  {
    icon: 'Users',
    title: 'Scoped to your organisation',
    description:
      'Pricing is quoted against your organisation - departments, asset volume and users - not billed per seat. Invite as many Staff, Officers and Auditors as your operation needs.',
  },
  {
    icon: 'Headphones',
    title: 'Onboarding and support included',
    description:
      'Instance provisioning, your first Administrator account, and ongoing support and updates are part of every deployment, not an add-on.',
  },
];

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

const faqs = [
  {
    q: "Why isn't there a published price list?",
    a: "Because each deployment is dedicated infrastructure, cost scales with your organisation's size and asset volume rather than a flat per-seat rate. A short conversation gets you an accurate quote faster than a generic price list would.",
  },
  {
    q: 'What determines the quote?',
    a: 'Primarily the number of departments and users, and the scale of your asset register. The module set is the same for everyone - what changes is the size of the deployment behind it.',
  },
  {
    q: 'Is there a contract length or trial option?',
    a: "Tell us how you'd like to evaluate CoreGrid - a guided demo, a pilot with a subset of your assets, or a full deployment - and we'll shape the engagement around it.",
  },
];

export default function Pricing(): React.ReactElement {
  return (
    <Layout
      title="Pricing"
      description="CoreGrid is deployed once per organisation, with every module included. Talk to us for a quote scoped to your departments, users and asset volume.">
      <SeoHead
        path="/pricing"
        title="Pricing"
        description="CoreGrid is deployed once per organisation, with every module included. Talk to us for a quote scoped to your departments, users and asset volume."
      />

      <header className="cg-page-header">
        <div className="cg-container">
          <div className={styles.introInner}>
            <span className="cg-eyebrow">Pricing</span>
            <h1 className={`cg-heading ${styles.title}`}>Straightforward, per-organisation pricing</h1>
            <p className={`cg-lead ${styles.lead}`}>
              CoreGrid is deployed once per customer - your own instance, the full platform, no per-seat
              pricing tricks. Talk to us and we&apos;ll put together a quote scoped to your organisation.
            </p>
            <Link className={`cg-btn cg-btn--primary ${styles.heroCta}`} to="/contact">
              Get a quote
              <ArrowRight size={17} strokeWidth={2.25} />
            </Link>
          </div>
        </div>
      </header>

      <section className="cg-section cg-section--tight">
        <div className="cg-container">
          <Reveal>
            <div className="cg-grid cg-grid--4">
              {model.map((item) => (
                <div key={item.title} className={`cg-card ${styles.modelCard}`}>
                  <div className={styles.modelIcon}>
                    <DynamicIcon name={item.icon} size={22} strokeWidth={1.75} />
                  </div>
                  <h3 className={styles.modelTitle}>{item.title}</h3>
                  <p className={styles.modelDesc}>{item.description}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cg-section cg-section--alt">
        <div className="cg-container">
          <Reveal>
            <span className="cg-eyebrow">What&apos;s Included</span>
            <h2 className="cg-heading" style={{fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', marginBottom: '0.75rem'}}>
              Every module, every deployment
            </h2>
            <p style={{maxWidth: 640, marginBottom: '2rem'}}>
              There is one edition of CoreGrid. Whatever your organisation is quoted for, it includes the
              complete platform.
            </p>
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
            <span className="cg-eyebrow">Questions</span>
            <h2 className="cg-heading" style={{fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', marginBottom: '2rem'}}>
              Pricing, answered
            </h2>
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
                  Ready to see a quote?
                </h2>
                <p className={styles.ctaText}>
                  Tell us about your organisation and we&apos;ll put a proposal together.
                </p>
              </div>
              <Link className="cg-btn cg-btn--primary" to="/contact">
                Contact us
                <ArrowRight size={17} strokeWidth={2.25} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
