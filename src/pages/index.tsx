import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {ArrowRight, MessageCircle, BookOpen, Sparkles} from 'lucide-react';
import Reveal from '@site/src/components/Reveal';
import DynamicIcon, {type IconName} from '@site/src/components/DynamicIcon';
import SeoHead from '@site/src/components/SeoHead';
import TechLogos from '@site/src/components/TechLogos';
import styles from './index.module.css';

const stats = [
  {value: '9', label: 'Function Groups'},
  {value: '4', label: 'User Roles'},
  {value: '10', label: 'Planned Modules'},
  {value: '1', label: 'Unified Platform'},
];

const steps = [
  {
    title: 'Register & identify',
    text: 'Register assets with QR codes, serial numbers and geolocation, and assign them to a department.',
  },
  {
    title: 'Monitor & maintain',
    text: 'Track condition in real time, schedule preventive maintenance, and dispatch field teams.',
  },
  {
    title: 'Analyse & decide',
    text: 'AI agents analyse condition data and surface repair, transfer or disposal recommendations.',
  },
  {
    title: 'Execute & audit',
    text: 'Authorised officers approve every decision. Every action is logged and audit-ready.',
  },
];

const services: {icon: IconName; title: string; summary: string}[] = [
  {icon: 'QrCode', title: 'Asset Registry', summary: 'Registration, QR identification and lifecycle records for every asset.'},
  {icon: 'Wrench', title: 'Maintenance Management', summary: 'Preventive scheduling, work orders, and downtime reduction.'},
  {icon: 'ArrowLeftRight', title: 'Transfers & Disposals', summary: 'Controlled inter-department transfers with full audit trails.'},
  {icon: 'ShieldCheck', title: 'Audit & Compliance', summary: 'Verification campaigns, audit logs, and policy enforcement.'},
  {icon: 'Sparkles', title: 'AI Decision Support', summary: 'Four agents recommend repair, transfer or disposal - you decide.'},
  {icon: 'BarChart3', title: 'Analytics & Reporting', summary: 'Real-time dashboards and exportable reports.'},
];

const facts = [
  {value: 'One per customer', label: 'Self-hosted deployment model'},
  {value: 'Four', label: 'Architecture layers, cleanly separated'},
  {value: 'Configurable', label: 'Asset types and custom attributes'},
  {value: 'Human-approved', label: 'Every AI recommendation, always'},
];

type GetStartedCard = {
  icon: React.ComponentType<{size?: number; strokeWidth?: number}>;
  title: string;
  desc: string;
  linkLabel: string;
  linkTo: string;
};

const getStartedCards: GetStartedCard[] = [
  {
    icon: MessageCircle,
    title: 'Talk to our team',
    desc: 'Tell us about your organisation and how you manage assets today - we’ll show you how CoreGrid fits.',
    linkLabel: 'Contact us',
    linkTo: '/contact',
  },
  {
    icon: BookOpen,
    title: 'Read the documentation',
    desc: 'Architecture, project structure, and a full user manual covering every planned feature.',
    linkLabel: 'Browse the docs',
    linkTo: '/docs/intro',
  },
  {
    icon: Sparkles,
    title: 'See the AI workflow',
    desc: 'Four specialised agents analyse every asset decision - and a person always makes the final call.',
    linkLabel: 'AI Decision Support',
    linkTo: '/ai-decision-support',
  },
];

export default function Home(): React.ReactElement {
  const circleViewSrc = useBaseUrl('img/circle-view.png');

  return (
    <Layout
      title="CoreGrid"
      description="CoreGrid centralises every asset across every department - from registration to disposal - with AI-assisted decision support and full audit compliance.">
      <SeoHead
        path="/"
        title="Unified Asset Management Platform"
        description="CoreGrid centralises every asset across every department - from registration to disposal - with AI-assisted decision support and full audit compliance."
      />

      <header className={styles.hero}>
        <div className="cg-container">
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <span className="cg-eyebrow">Asset Lifecycle Management</span>
              <h1 className={`cg-heading ${styles.heroTitle}`}>The unified platform for asset management</h1>
              <p className={`cg-lead ${styles.heroLead}`}>
                CoreGrid centralises every asset across every department - from registration to disposal -
                with AI-assisted decision support and full audit compliance.
              </p>
              <div className={styles.heroActions}>
                <Link className="cg-btn cg-btn--primary" to="/contact">
                  Get in touch
                </Link>
                <Link className="cg-btn cg-btn--ghost" to="/features">
                  Explore the platform
                </Link>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <img
                src={circleViewSrc}
                alt="The CoreGrid asset lifecycle: register & identify, plan & schedule, execute & track, approve & verify"
                className={styles.heroVisualImg}
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </div>

          <div className={styles.statBar}>
            {stats.map((s) => (
              <div key={s.label} className={styles.statItem}>
                <div className={styles.statValue}>{s.value}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className="cg-section cg-section--tight">
        <div className="cg-container">
          <Reveal>
            <div className={styles.howGrid}>
              <div className={styles.howCopy}>
                <span className="cg-eyebrow">How It Works</span>
                <h2 className={`cg-heading ${styles.howTitle}`}>One lifecycle, from registration to disposal</h2>
                <p className={styles.howText}>
                  Every asset moves through the same four stages, whichever department it belongs to - so the
                  register stays consistent and every decision stays traceable.
                </p>
                <Link className="cg-btn cg-btn--primary" to="/docs/intro">
                  Read the docs
                </Link>
              </div>
              <div className={styles.stepsList}>
                {steps.map((step, i) => (
                  <div key={step.title} className={styles.stepItem}>
                    <span className={styles.stepNumber}>{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className={styles.stepTitle}>{step.title}</h3>
                      <p className={styles.stepText}>{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cg-section cg-section--alt">
        <div className="cg-container">
          <Reveal>
            <div className={styles.servicesIntro}>
              <span className="cg-eyebrow">Capabilities</span>
              <div className={styles.servicesIntroGrid}>
                <h2 className={`cg-heading ${styles.servicesTitle}`}>The integrated asset suite</h2>
                <p className={styles.servicesDesc}>
                  Every module shares one data model - nothing is duplicated between registry, maintenance,
                  compliance and analytics.
                </p>
              </div>
            </div>

            <div className="cg-grid cg-grid--3">
              {services.map((s, i) => (
                <div key={s.title} className={`cg-card ${styles.serviceCard}`}>
                  <span className={styles.serviceNumber}>{String(i + 1).padStart(2, '0')}</span>
                  <div className={styles.serviceIcon}>
                    <DynamicIcon name={s.icon} size={20} strokeWidth={1.75} />
                  </div>
                  <h3 className={styles.serviceTitle}>{s.title}</h3>
                  <p className={styles.serviceDesc}>{s.summary}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cg-section cg-section--tight">
        <div className="cg-container">
          <Reveal>
            <div className={styles.techIntro}>
              <span className="cg-eyebrow" style={{textAlign: 'center'}}>
                Built On
              </span>
            </div>
            <TechLogos />
          </Reveal>
        </div>
      </section>

      <section className="cg-section">
        <div className="cg-container">
          <Reveal>
            <div className={styles.aboutGrid}>
              <div className={styles.factGrid}>
                {facts.map((f) => (
                  <div key={f.label} className={styles.factTile}>
                    <div className={styles.factValue}>{f.value}</div>
                    <div className={styles.factLabel}>{f.label}</div>
                  </div>
                ))}
              </div>
              <div className={styles.aboutCopy}>
                <span className="cg-eyebrow">About CoreGrid</span>
                <h2 className={`cg-heading ${styles.aboutTitle}`}>A platform, not a single-domain application</h2>
                <p className={styles.aboutText}>
                  A transport department and a hospital hold entirely different asset attributes, but they
                  perform the same lifecycle operations - register, identify, maintain, transfer, verify,
                  condemn, dispose. CoreGrid fixes the lifecycle engine in code and expresses the domain in
                  configuration, so one deployment adapts to your organisation without a new build.
                </p>
                <Link className={styles.aboutLink} to="/about">
                  Learn more about CoreGrid
                  <ArrowRight size={16} strokeWidth={2.25} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cg-section cg-section--alt">
        <div className="cg-container">
          <Reveal>
            <div className={styles.getStartedIntro}>
              <span className="cg-eyebrow">Get Started</span>
              <h2 className={`cg-heading ${styles.getStartedTitle}`}>See it on your own data</h2>
              <p className={styles.getStartedDesc}>
                Whether you want the technical detail or a conversation first, here&apos;s where to start.
              </p>
            </div>

            <div className="cg-grid cg-grid--3">
              {getStartedCards.map((c) => (
                <div key={c.title} className={`cg-card ${styles.getStartedCard}`}>
                  <div className={styles.getStartedCardIcon}>
                    <c.icon size={20} strokeWidth={1.75} />
                  </div>
                  <h3 className={styles.getStartedCardTitle}>{c.title}</h3>
                  <p className={styles.getStartedCardDesc}>{c.desc}</p>
                  <Link className={styles.getStartedCardLink} to={c.linkTo}>
                    {c.linkLabel} <ArrowRight size={14} strokeWidth={2.25} />
                  </Link>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
