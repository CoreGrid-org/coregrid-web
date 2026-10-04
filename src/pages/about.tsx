import React from 'react';

import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';

import {
  Target,
  Eye,
  ShieldCheck,
  QrCode,
  Wrench,
  ArrowLeftRight,
  ClipboardCheck,
  BrainCircuit,
  Layers3,
} from 'lucide-react';

import Reveal from '@site/src/components/Reveal';
import SeoHead from '@site/src/components/SeoHead';

import styles from './about.module.css';


/* =========================================================
   DATA
========================================================= */

const capabilities = [
  {
    icon: QrCode,
    number: '01',
    title: 'Asset Registry & Identification',
    description:
      'Maintain structured records for physical assets with configurable asset types, custom attributes and QR-based identification.',
  },
  {
    icon: Wrench,
    number: '02',
    title: 'Maintenance Management',
    description:
      'Support fault reporting, maintenance records, assignments, progress tracking, cost capture and completion.',
  },
  {
    icon: ArrowLeftRight,
    number: '03',
    title: 'Transfer & Disposal',
    description:
      'Manage controlled asset transfers and disposal workflows with approval, evidence and lifecycle tracking.',
  },
  {
    icon: ClipboardCheck,
    number: '04',
    title: 'Audit & Verification',
    description:
      'Support physical verification campaigns, discrepancy management and traceable audit records.',
  },
  {
    icon: BrainCircuit,
    number: '05',
    title: 'AI-Assisted Decisions',
    description:
      'Analyse lifecycle information and provide structured recommendations while keeping authorised officers in control.',
  },
  {
    icon: ShieldCheck,
    number: '06',
    title: 'Controlled & Auditable',
    description:
      'Apply role-based access, deterministic validation and human approval before high-impact lifecycle decisions.',
  },
];


const challengeItems = [
  'Asset information spread across different records',
  'Limited visibility of asset location and condition',
  'Manual maintenance and transfer processes',
  'Difficulty maintaining complete audit histories',
  'Limited information available for timely decisions',
];


const approachItems = [
  'Centralised and configurable asset records',
  'QR-based asset identification and verification',
  'Maintenance, transfer and disposal workflows',
  'Role-based approvals and traceable audit records',
  'AI-assisted insights with authorised human control',
];


const technologies = [
  {
    logo: '/img/tech/react.svg',
    title: 'React',
    label: 'Management Web Application',
  },
  {
    logo: '/img/tech/flutter.svg',
    title: 'Flutter',
    label: 'Field Operations Application',
  },
  {
    logo: '/img/tech/dotnet.svg',
    title: 'ASP.NET Core',
    label: 'REST API & Business Layer',
  },
  {
    logo: '/img/tech/postgresql.svg',
    title: 'PostgreSQL',
    label: 'Central Data Platform',
  },
  {
    logo: '/img/tech/langgraph.svg',
    title: 'LangGraph',
    label: 'Agentic AI Workflow',
  },
];


/* =========================================================
   PAGE
========================================================= */

export default function About(): React.ReactElement {
  const logo = useBaseUrl('/img/coregrid-logo.png');

  return (
    <Layout
      title="About"
      description="Learn about CoreGrid, an intelligent asset lifecycle management platform built for secure, accountable and integrated asset management."
    >
      <SeoHead
        path="/about"
        title="About CoreGrid"
        description="Learn about CoreGrid, an intelligent asset lifecycle management platform built for secure, accountable and integrated asset management."
      />


      {/* =====================================================
          HERO
      ===================================================== */}

      <header className="cg-page-header">
        <div className="cg-container">
          <div className={styles.heroContent}>
            <span className="cg-eyebrow">About CoreGrid</span>

            <h1 className={`cg-heading ${styles.heroTitle}`}>A Smarter Approach to Asset Management</h1>

            <p className={`cg-lead ${styles.heroLead}`}>
              CoreGrid is an intelligent asset lifecycle management platform
              built for organisations that manage large numbers of physical
              assets through one secure, configurable and accountable
              digital system.
            </p>
          </div>
        </div>
      </header>


      {/* =====================================================
          ABOUT PROJECT
      ===================================================== */}

      <section className="cg-section">
        <div className="cg-container">

          <Reveal>
            <div className={styles.projectGrid}>

              {/* LEFT */}
              <div className={styles.projectLeft}>

                <span className="cg-eyebrow">
                  The Project
                </span>

                <h2 className={`cg-heading ${styles.sectionTitle}`}>
                  Why CoreGrid?
                </h2>

                <div className={styles.logoWrapper}>
                  <img
                    src={logo}
                    alt="CoreGrid Sri Lanka"
                    className={styles.projectLogo}
                  />
                </div>

              </div>


              {/* RIGHT */}
              <div className={styles.projectRight}>

                <span className="cg-eyebrow">
                  Unified Asset Management
                </span>

                <h3 className={styles.projectHeading}>
                  Bringing the Complete Asset Lifecycle Into One Platform
                </h3>

                <p className={styles.projectText}>
                  Managing large numbers of physical assets can become difficult
                  when information is distributed across spreadsheets, paper
                  records and separate departmental processes.
                </p>

                <p className={styles.projectText}>
                  CoreGrid takes a unified digital approach: assets are
                  registered, identified, maintained, transferred, verified,
                  audited and eventually disposed of through a controlled
                  lifecycle. The platform also brings AI-assisted analysis
                  to that lifecycle, while keeping important decisions under
                  authorised human control.
                </p>


                <div className={styles.highlights}>

                  <div className={styles.highlightItem}>
                    <h4>Centralised</h4>
                    <p>One platform</p>
                  </div>

                  <div className={styles.highlightItem}>
                    <h4>Accountable</h4>
                    <p>Auditable actions</p>
                  </div>

                  <div className={styles.highlightItem}>
                    <h4>Intelligent</h4>
                    <p>AI-assisted</p>
                  </div>

                </div>

              </div>

            </div>
          </Reveal>

        </div>
      </section>


      {/* =====================================================
          MISSION / VISION
      ===================================================== */}

      <section className="cg-section cg-section--alt">
        <div className="cg-container">

          <Reveal>
            <div className={styles.sectionHeader}>

              <span className="cg-eyebrow">
                Our Direction
              </span>

              <h2 className={`cg-heading ${styles.sectionTitle}`}>
                Purpose Behind the Platform
              </h2>

            </div>
          </Reveal>


          <Reveal>
            <div className={styles.missionGrid}>

              <div className={`cg-card ${styles.directionCard}`}>

                <div className={styles.directionIcon}>
                  <Target size={25} />
                </div>

                <h3>Our Mission</h3>

                <p>
                  To provide an integrated asset management platform that
                  improves visibility, accountability and lifecycle
                  coordination, showing how modern web, mobile and AI
                  technologies can support asset operations at scale.
                </p>

              </div>


              <div className={`cg-card ${styles.directionCard}`}>

                <div className={styles.directionIcon}>
                  <Eye size={25} />
                </div>

                <h3>Our Vision</h3>

                <p>
                  A future where physical assets are managed through reliable
                  digital records, transparent workflows, field-based
                  verification and responsible AI-assisted decision support.
                </p>

              </div>

            </div>
          </Reveal>

        </div>
      </section>


      {/* =====================================================
          CORE IDEA
      ===================================================== */}

      <section className="cg-section">
        <div className="cg-container">

          <Reveal>
            <div className={styles.sectionHeader}>

              <span className="cg-eyebrow">
                The Core Idea
              </span>

              <h2 className={`cg-heading ${styles.sectionTitle}`}>
                Why CoreGrid Was Designed
              </h2>

              <p className={styles.sectionDescription}>
                Asset management requires more than simply storing
                information. CoreGrid manages the complete asset lifecycle
                through one connected, transparent and accountable digital
                platform.
              </p>

            </div>
          </Reveal>


          <Reveal>
            <div className={styles.approachGrid}>

              {/* CHALLENGE */}

              <div className={`cg-card ${styles.challengeCard}`}>

                <span className={styles.cardNumber}>
                  01
                </span>

                <div className={styles.cardIcon}>
                  <ClipboardCheck size={28} />
                </div>

                <span className="cg-eyebrow">
                  The Challenge
                </span>

                <h3>
                  Managing Assets Across Separate Processes
                </h3>


                <div className={styles.itemList}>

                  {challengeItems.map((item) => (
                    <div
                      className={styles.challengeItem}
                      key={item}
                    >
                      <span className={styles.dot} />

                      <p>{item}</p>
                    </div>
                  ))}

                </div>

              </div>


              {/* APPROACH */}

              <div className={styles.approachCard}>

                <div className={styles.approachGlow} />

                <span className={styles.darkCardNumber}>
                  02
                </span>

                <div className={styles.approachIcon}>
                  <Layers3 size={28} />
                </div>

                <span className="cg-eyebrow">
                  Our Approach
                </span>

                <h3>
                  One Connected Asset Lifecycle
                </h3>


                <div className={styles.itemList}>

                  {approachItems.map((item) => (
                    <div
                      className={styles.approachItem}
                      key={item}
                    >

                      <div className={styles.checkIcon}>
                        <ShieldCheck size={14} />
                      </div>

                      <p>{item}</p>

                    </div>
                  ))}

                </div>

              </div>

            </div>
          </Reveal>

        </div>
      </section>


      {/* =====================================================
          CAPABILITIES
      ===================================================== */}

      <section className="cg-section cg-section--alt">
        <div className="cg-container">

          <Reveal>
            <div className={styles.sectionHeader}>

              <span className="cg-eyebrow">
                Platform Capabilities
              </span>

              <h2 className={`cg-heading ${styles.sectionTitle}`}>
                Built Around the Complete Asset Lifecycle
              </h2>

            </div>
          </Reveal>


          <Reveal>
            <div className={styles.capabilityGrid}>

              {capabilities.map((capability) => {
                const Icon = capability.icon;

                return (
                  <div
                    className={`cg-card ${styles.capabilityCard}`}
                    key={capability.number}
                  >

                    <span className={styles.capabilityNumber}>
                      {capability.number}
                    </span>

                    <div className={styles.capabilityIcon}>
                      <Icon size={24} />
                    </div>

                    <h3>
                      {capability.title}
                    </h3>

                    <p>
                      {capability.description}
                    </p>

                  </div>
                );
              })}

            </div>
          </Reveal>

        </div>
      </section>


      {/* =====================================================
          TECHNOLOGY
      ===================================================== */}

      <section className={`cg-section cg-section--alt ${styles.technologySection}`}>

        <div className="cg-container">

          <Reveal>
            <div className={styles.sectionHeader}>

              <span className="cg-eyebrow">
                Technology
              </span>

              <h2 className={`cg-heading ${styles.sectionTitle}`}>
                Built as an Integrated System
              </h2>

              <p className={styles.sectionDescription}>
                The project combines web, mobile, backend, data, identity and
                AI technologies within a single architecture.
              </p>

            </div>
          </Reveal>

        </div>


        <Reveal>
          <div className={styles.technologyWindow}>

            <div className={styles.leftFade} />
            <div className={styles.rightFade} />


            <div className={styles.technologyTrack}>

              {[...technologies, ...technologies].map(
                (technology, index) => {

                  const technologyLogo = useBaseUrl(
                    technology.logo,
                  );

                  return (
                    <div
                      className={`cg-card ${styles.technologyCard}`}
                      key={`${technology.title}-${index}`}
                    >

                      <div className={styles.technologyLogo}>

                        <img
                          src={technologyLogo}
                          alt={`${technology.title} logo`}
                        />

                      </div>


                      <div>

                        <h3>
                          {technology.title}
                        </h3>

                        <p>
                          {technology.label}
                        </p>

                      </div>

                    </div>
                  );
                },
              )}

            </div>

          </div>
        </Reveal>

      </section>

    </Layout>
  );
}