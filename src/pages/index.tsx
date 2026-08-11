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
  Building2,
} from 'lucide-react';

import Reveal from '@site/src/components/Reveal';

import DynamicIcon, {
  type IconName,
} from '@site/src/components/DynamicIcon';

import SeoHead from '@site/src/components/SeoHead';

import styles from './index.module.css';


/* =========================================================
   DEPARTMENT LOGOS
========================================================= */

const departmentLogos = [
  {
    name: 'Department of Industry Analyst',
    image: 'img/departments/Analyst.jpg',
  },
  {
    name: 'Ministry of Education',
    image: 'img/departments/edu.jpg',
  },
  {
    name: 'Excise Department of Sri Lanka',
    image: 'img/departments/excise-department-of-sri-lanka.jpg',
  },
  {
    name: 'Ministry of Health',
    image: 'img/departments/Health__Mass_Media.jpg',
  },
  {
    name: 'Industry News',
    image: 'img/departments/News.jpeg',
  },
  {
    name: 'Industry Printing Department',
    image: 'img/departments/SriLankaPrinting.jpg',
  },
];


/* =========================================================
   PLATFORM MODULES
========================================================= */

const modules: {
  icon: IconName;
  title: string;
  desc: string;
}[] = [
  {
    icon: 'QrCode',
    title: 'Asset Registry',
    desc:
      'Centralised asset registration with QR identification, geolocation tagging and full lifecycle records for every asset.',
  },
  {
    icon: 'Wrench',
    title: 'Maintenance Management',
    desc:
      'Schedule preventive maintenance, track work orders and manage asset maintenance activity from one platform.',
  },
  {
    icon: 'ArrowLeftRight',
    title: 'Transfers & Disposals',
    desc:
      'Manage controlled inter-department transfers and disposal workflows with approvals and complete audit trails.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Audit & Compliance',
    desc:
      'Maintain traceable audit records, asset verification workflows and role-based approval controls.',
  },
  {
    icon: 'Map',
    title: 'GIS Mapping',
    desc:
      'Visualise assets by geographic location and connect every physical asset with its registered location.',
  },
  {
    icon: 'BarChart3',
    title: 'Analytics & Reporting',
    desc:
      'Operational dashboards and exportable reports provide a complete view across the asset portfolio.',
  },
];


/* =========================================================
   DEPARTMENTS
========================================================= */

const departments = [
  'Finance Ministry',
  'Provincial Councils',
  'Municipal Authorities',
  'Health Sector',
  'Education Sector',
  'Defense Assets',
  'Transportation',
  'Agriculture',
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
   KNOWLEDGE HUB
========================================================= */

const knowledgeCards = [
  {
    image: 'img/Knowledge_Hub/webinars.jpg',
    title: 'Webinars',
    description:
      'Explore informative sessions covering modern asset management, compliance, technology and digital transformation.',
    button: 'View Webinars',
  },
  {
    image: 'img/Knowledge_Hub/thought-leadership.jpg',
    title: 'Thought Leadership',
    description:
      'Discover perspectives on asset strategy, lifecycle planning, governance and responsible digital innovation.',
    button: 'View Resources',
  },
  {
    image: 'img/Knowledge_Hub/articles.jpg',
    title: 'Articles',
    description:
      'Read practical information about asset registration, maintenance, auditing, reporting and AI decision support.',
    button: 'View Articles',
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

  const circleViewSrc =
    `${baseUrl}img/circle-view.png`;

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
          DEPARTMENT LOGO SLIDER
      ===================================================== */}

      <section className={styles.logoSection}>

        <div className={styles.logoSectionHeading}>
          Trusted Across Sri Lanka&apos;s Industries
        </div>


        <div className={styles.logoSlider}>

          <div className={styles.logoFadeLeft} />
          <div className={styles.logoFadeRight} />


          <div className={styles.logoTrack}>

            {[...departmentLogos, ...departmentLogos].map(
              (department, index) => (

                <div
                  key={`${department.name}-${index}`}
                  className={styles.logoItem}
                >

                  <img
                    src={`${baseUrl}${department.image}`}
                    alt={department.name}
                  />

                </div>

              ),
            )}

          </div>

        </div>

      </section>


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

                <span className={styles.eyebrow}>
                  Unified Platform
                </span>

                <h2 className={styles.sectionTitle}>
                  Asset Management Software That Integrates
                </h2>


                <p className={styles.sectionDescription}>
                  One platform connecting every department, every asset and
                  every decision — designed around the complete asset lifecycle.
                </p>


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
          PLATFORM MODULES
      ===================================================== */}

      <section className={styles.modulesSection}>

        <div className={styles.pageContainer}>

          <Reveal>

            <div className={styles.sectionHeader}>

              <span className={styles.eyebrow}>
                Platform Capabilities
              </span>

              <h2 className={styles.sectionTitle}>
                Integrated Asset Management Suite
              </h2>

              <p className={styles.sectionDescription}>
                Every module is interconnected. Data flows between registry,
                maintenance, compliance and analytics without unnecessary
                duplication.
              </p>

            </div>


            <div className={styles.moduleGrid}>

              {modules.map((module, index) => (

                <div
                  key={module.title}
                  className={styles.moduleCard}
                >

                  <div className={styles.cardGlow} />


                  <span className={styles.moduleNumber}>
                    {String(index + 1).padStart(2, '0')}
                  </span>


                  <div className={styles.moduleIcon}>

                    <DynamicIcon
                      name={module.icon}
                      size={28}
                      strokeWidth={1.8}
                    />

                  </div>


                  <h3>
                    {module.title}
                  </h3>


                  <p>
                    {module.desc}
                  </p>


                  <div className={styles.bottomAccent} />

                </div>

              ))}

            </div>

          </Reveal>

        </div>

      </section>


      {/* =====================================================
          DEPARTMENTS
      ===================================================== */}

      <section className={styles.departmentsSection}>

        <div className={styles.pageContainer}>

          <Reveal>

            <div className={styles.sectionHeader}>

              <span className={styles.eyebrow}>
                Departments & Sectors
              </span>

              <h2 className={styles.sectionTitle}>
                Supporting Different Asset Environments
              </h2>

              <p className={styles.sectionDescription}>
                CoreGrid is designed around configurable asset records and
                reusable lifecycle workflows that can support different
                organisational environments.
              </p>

            </div>


            <div className={styles.departmentGrid}>

              {departments.map((name, index) => (

                <div
                  key={name}
                  className={styles.departmentCard}
                >

                  <span className={styles.departmentNumber}>
                    {String(index + 1).padStart(2, '0')}
                  </span>


                  <div className={styles.departmentIcon}>
                    <Building2
                      size={28}
                      strokeWidth={1.8}
                    />
                  </div>


                  <h3>
                    {name}
                  </h3>


                  <div className={styles.departmentLine} />

                  <div className={styles.bottomAccent} />

                </div>

              ))}

            </div>

          </Reveal>

        </div>

      </section>


      {/* =====================================================
          KNOWLEDGE HUB
      ===================================================== */}

      <section className={styles.knowledgeSection}>

        <div className={styles.pageContainer}>

          <Reveal>

            <div className={styles.sectionHeader}>

              <span className={styles.eyebrow}>
                Resources & Insights
              </span>

              <h2 className={styles.sectionTitle}>
                Knowledge Hub
              </h2>

              <p className={styles.sectionDescription}>
                Explore resources and practical information related to asset
                management, lifecycle governance and digital transformation.
              </p>

            </div>


            <div className={styles.knowledgeGrid}>

              {knowledgeCards.map((card) => (

                <div
                  key={card.title}
                  className={styles.knowledgeCard}
                >

                  <div className={styles.knowledgeImageWrapper}>

                    <img
                      src={`${baseUrl}${card.image}`}
                      alt={card.title}
                      className={styles.knowledgeImage}
                    />

                  </div>


                  <div className={styles.knowledgeContent}>

                    <h3>
                      {card.title}
                    </h3>

                    <p>
                      {card.description}
                    </p>

                    <Link
                      to="/docs/intro"
                      className={styles.knowledgeButton}
                    >
                      {card.button}
                    </Link>

                  </div>

                </div>

              ))}

            </div>

          </Reveal>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className={styles.ctaSection}>

        <div className={styles.pageContainer}>

          <Reveal>

            <div className={styles.ctaContent}>

              <div>

                <h2>
                  Ready to Explore CoreGrid?
                </h2>

                <p>
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
                </Link>

              </div>

            </div>

          </Reveal>

        </div>

      </section>

    </Layout>
  );
}
