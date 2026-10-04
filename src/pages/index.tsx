import React from 'react';

import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';

import {
  ArrowRight,
  ShieldCheck,
  BarChart3,
  Layers,
  Cpu,
  BookOpen,
  ClipboardList,
  Milestone,
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
import SectionHeader from '@site/src/components/SectionHeader';
import IconCard from '@site/src/components/IconCard';

import SeoHead from '@site/src/components/SeoHead';

import styles from './index.module.css';


/* =========================================================
   CUSTOMER LOGO STRIP

   Disabled: not yet populated with confirmed, real customers.
   Add a `customerLogos` array here (name + image under
   static/img/customers/) and the matching JSX below once we
   have real logos to show - showing named organisations without
   confirmed customer status would be a false endorsement claim.
========================================================= */


/* =========================================================
   DEPARTMENTS
========================================================= */

const departments = [
  {name: 'Transportation & Fleet', icon: Truck},
  {name: 'Healthcare', icon: HeartPulse},
  {name: 'Manufacturing', icon: Factory},
  {name: 'Education', icon: GraduationCap},
  {name: 'Utilities & Facilities', icon: Zap},
  {name: 'Logistics & Warehousing', icon: Warehouse},
  {name: 'Hospitality', icon: UtensilsCrossed},
  {name: 'Agriculture', icon: Wheat},
];


/* =========================================================
   PLATFORM OVERVIEW FEATURES
========================================================= */

const overviewFeatures = [
  {
    icon: Layers,
    title: 'Purpose-Built Ecosystem',
    desc:
      'Scalable, secure and designed to share information seamlessly across every CoreGrid module.',
  },
  {
    icon: ShieldCheck,
    title: 'Reliable & Compliant',
    desc:
      'Replace fragmented paper and spreadsheet workflows with centralised records and traceable audit activity.',
  },
  {
    icon: BarChart3,
    title: 'Scalable Growth',
    desc:
      'Designed to support asset management from a single organisation through to large multi-department deployments.',
  },
  {
    icon: Cpu,
    title: 'Greater Flexibility',
    desc:
      'Web, mobile, API and AI components work together within one connected asset-management architecture.',
  },
];


/* =========================================================
   DOCUMENTATION
========================================================= */

const docsLinks = [
  {
    icon: BookOpen,
    title: 'Getting Started',
    desc: "How CoreGrid is provisioned for your organisation and what your Administrator sets up first.",
    href: '/docs/intro',
  },
  {
    icon: ClipboardList,
    title: 'User Manual',
    desc: 'Day-to-day guidance for organisation setup, roles and permissions, and every platform module.',
    href: '/docs/user-manual/organization-setup',
  },
  {
    icon: Milestone,
    title: 'Planned Features',
    desc: "What's live today versus what's coming next, tracked against the full platform roadmap.",
    href: '/docs/planned-features',
  },
];


/* =========================================================
   HOME PAGE
========================================================= */

export default function Home(): React.ReactElement {
  const baseUrl = useBaseUrl('/');

  const videoSrc =
    `${baseUrl}videos/HomePageVide.mp4`;

  const dashboardSrc =
    `${baseUrl}img/View.png`;

  return (
    <Layout
      title="CoreGrid"
      description="CoreGrid centralises every asset across every department - from registration to disposal - with AI-assisted decision support and full audit compliance."
    >
      <SeoHead
        path="/"
        title="Unified Asset Management Platform"
        description="CoreGrid centralises every asset across every department - from registration to disposal - with AI-assisted decision support and full audit compliance."
      />


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className={styles.hero}>

        {/* VIDEO */}
        <video
          className={styles.heroVideo}
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src={videoSrc}
            type="video/mp4"
          />
        </video>


        {/* OVERLAYS */}
        <div className={styles.heroOverlay} />
        <div className={styles.heroLeftGradient} />
        <div className={styles.heroBottomGradient} />


        <div className={styles.heroContainer}>

          <div className={styles.heroGrid}>

            {/* LEFT CONTENT */}
            <div className={styles.heroCopy}>

              <span className={styles.heroEyebrow}>
                Asset Lifecycle Management
              </span>

              <h1 className={styles.heroTitle}>
                The Unified Platform
                <br />

                for{' '}

                <span className={styles.highlight}>
                  Asset
                </span>

                <br />

                Management
              </h1>


              <p className={styles.heroLead}>
                CoreGrid centralises every asset across all departments —
                from registration to disposal — with AI-powered decision
                support, real-time monitoring and full lifecycle
                accountability.
              </p>


              <div className={styles.heroActions}>

                <Link
                  className={styles.primaryButton}
                  to="/contact"
                >
                  Get Started

                  <ArrowRight
                    size={18}
                    strokeWidth={2.3}
                  />
                </Link>


                <Link
                  className={styles.secondaryButton}
                  to="/features"
                >
                  Explore the Platform
                </Link>

              </div>


              <div className={styles.heroFeatures}>

                {[
                  'Open Source, Apache 2.0',
                  'Secure & Auditable',
                  'Human-Controlled AI',
                  'Multi-Department Ready',
                ].map((item) => (

                  <div
                    key={item}
                    className={styles.heroFeatureItem}
                  >

                    <span className={styles.featureBullet}>
                      <span />
                    </span>

                    {item}

                  </div>

                ))}

              </div>

            </div>


            {/* RIGHT DASHBOARD */}
            <div className={styles.heroVisual}>

              <div className={styles.heroImageGlow} />

              <img
                src={dashboardSrc}
                alt="CoreGrid platform dashboard"
                className={styles.heroVisualImg}
                decoding="async"
                fetchPriority="high"
              />

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CUSTOMER LOGO STRIP

          Disabled - see the CUSTOMER LOGO STRIP comment near the
          top of this file for how to bring this section back.
      ===================================================== */}


      {/* =====================================================
          PLATFORM OVERVIEW
      ===================================================== */}

      <section className={styles.overviewSection}>

        <div className={styles.pageContainer}>

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


              {/* RIGHT */}
              <div className={styles.overviewContent}>

                <SectionHeader
                  align="left"
                  eyebrow="Unified Platform"
                  title="Asset Management Software That Integrates"
                  description="One platform connecting every department, every asset and every decision - designed around the complete asset lifecycle."
                />

                <div className={styles.overviewFeatureList}>

                  {overviewFeatures.map(
                    ({icon: Icon, title, desc}) => (

                      <div
                        key={title}
                        className={styles.overviewFeature}
                      >

                        <div className={styles.overviewFeatureIcon}>
                          <Icon
                            size={20}
                            strokeWidth={1.8}
                          />
                        </div>


                        <div>

                          <h3>
                            {title}
                          </h3>

                          <p>
                            {desc}
                          </p>

                        </div>

                      </div>

                    ),
                  )}

                </div>

              </div>

            </div>

          </Reveal>

        </div>

      </section>


      {/* =====================================================
          DEPARTMENTS
      ===================================================== */}

      <section className="cg-section cg-section--alt">

        <div className="cg-container">

          <Reveal>

            <SectionHeader
              eyebrow="Departments & Sectors"
              title="Supporting Different Asset Environments"
              description="CoreGrid is designed around configurable asset records and reusable lifecycle workflows that can support different organisational environments."
            />

            <div className={styles.departmentGrid}>

              {departments.map((department, index) => (
                <IconCard
                  key={department.name}
                  icon={department.icon}
                  number={String(index + 1).padStart(2, '0')}
                  title={department.name}
                />
              ))}

            </div>

          </Reveal>

        </div>

      </section>


      {/* =====================================================
          DOCUMENTATION
      ===================================================== */}

      <section className="cg-section">

        <div className="cg-container">

          <Reveal>

            <SectionHeader
              eyebrow="Documentation"
              title="Everything You Need to Get Started"
              description="Product documentation covering setup, day-to-day use and what's on the roadmap."
            />

            <div className={styles.docsGrid}>

              {docsLinks.map((item) => (
                <Link key={item.title} to={item.href} className={styles.docsCardLink}>
                  <IconCard icon={item.icon} title={item.title} description={item.desc}>
                    <span className={styles.docsLinkLabel}>
                      Read more
                      <ArrowRight size={15} strokeWidth={2.25} />
                    </span>
                  </IconCard>
                </Link>
              ))}

            </div>

          </Reveal>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="cg-section">

        <div className="cg-container">

          <Reveal>

            <div className={styles.ctaSection}>

              <div className={styles.ctaContent}>

                <div>

                  <h2 className={styles.ctaTitle}>
                    Ready to Explore CoreGrid?
                  </h2>

                  <p className={styles.ctaText}>
                    Discover how the complete asset lifecycle can be managed
                    through one connected and accountable platform.
                  </p>

                </div>


                <div className={styles.ctaButtons}>

                  <Link
                    to="/contact"
                    className={styles.ctaPrimary}
                  >
                    Contact Us
                  </Link>


                  <Link
                    to="/docs/intro"
                    className={styles.ctaSecondary}
                  >
                    Read the Docs
                    <ArrowRight size={16} strokeWidth={2.25} />
                  </Link>

                </div>

              </div>

            </div>

          </Reveal>

        </div>

      </section>

    </Layout>
  );
}
