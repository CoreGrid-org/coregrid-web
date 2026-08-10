import React from 'react';
import Layout from '@theme/Layout';
import {Check} from 'lucide-react';
import Reveal from '@site/src/components/Reveal';
import SeoHead from '@site/src/components/SeoHead';
import styles from './about.module.css';

const challenge = [
  'Asset information spread across different records',
  'Limited visibility of asset location and condition',
  'Manual maintenance and transfer processes',
  'Difficulty maintaining complete audit histories',
  'Limited information available for timely decisions',
];

const approach = [
  'Centralised and configurable asset records',
  'QR-based asset identification and verification',
  'Maintenance, transfer and disposal workflows',
  'Role-based approvals and traceable audit records',
  'AI-assisted insights with authorised human control',
];

const principles = [
  {
    title: 'One integrated platform',
    description: 'Web, mobile, API, database and AI services work together around one consistent asset lifecycle.',
  },
  {
    title: 'Human in control',
    description: 'AI supports decisions rather than replacing officers. High-impact actions require human approval.',
  },
  {
    title: 'Accountability by design',
    description: 'Important actions and lifecycle changes are traceable and auditable by construction.',
  },
  {
    title: 'Configurable by design',
    description: 'Asset types, departments, locations and custom attributes adapt to different organisational needs.',
  },
];

const stack = [
  {tech: 'React', role: 'Management web application'},
  {tech: 'Flutter', role: 'Field operations application'},
  {tech: 'ASP.NET Core', role: 'REST API and business layer'},
  {tech: 'PostgreSQL', role: 'Central data platform'},
  {tech: 'LangGraph', role: 'AI decision-support workflow'},
];

export default function About(): React.ReactElement {
  return (
    <Layout
      title="About"
      description="A unified, accountable approach to asset lifecycle management.">
      <SeoHead
        path="/about"
        title="About CoreGrid"
        description="A unified, accountable approach to asset lifecycle management."
      />

      <header className="cg-page-header">
        <div className="cg-container">
          <div className={styles.introInner}>
            <span className="cg-eyebrow">About CoreGrid</span>
            <h1 className={`cg-heading ${styles.title}`}>A smarter approach to asset management</h1>
            <p className={`cg-lead ${styles.lead}`}>
              CoreGrid is an intelligent asset lifecycle platform designed for organisations that need one
              secure, configurable and accountable system for managing physical assets.
            </p>
          </div>
        </div>
      </header>

      <section className="cg-section cg-section--tight">
        <div className="cg-container">
          <Reveal>
            <div className={styles.introBody}>
              <span className="cg-eyebrow" style={{textAlign: 'center'}}>
                Why CoreGrid
              </span>
              <p>
                Managing large numbers of physical assets becomes difficult when information is spread
                across spreadsheets, paper records and separate departmental processes. CoreGrid takes a
                unified approach: assets are registered, identified, maintained, transferred, verified,
                audited and eventually disposed of through one controlled lifecycle — with AI-assisted
                analysis that keeps important decisions under human control.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cg-section cg-section--alt">
        <div className="cg-container">
          <Reveal>
            <span className="cg-eyebrow">Our Direction</span>
            <h2 className="cg-heading" style={{fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', marginBottom: '2rem'}}>
              Purpose behind the platform
            </h2>
            <div className={`cg-grid cg-grid--2`}>
              <div className="cg-card">
                <h3 className={styles.principleTitle}>Our mission</h3>
                <p className={styles.principleDesc}>
                  To provide an integrated asset management platform that improves visibility,
                  accountability and lifecycle coordination — demonstrating how modern web, mobile and AI
                  technologies can support asset operations at scale.
                </p>
              </div>
              <div className="cg-card">
                <h3 className={styles.principleTitle}>Our vision</h3>
                <p className={styles.principleDesc}>
                  A future where physical assets are managed through reliable digital records, transparent
                  workflows, field-based verification and responsible AI-assisted decision support.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cg-section">
        <div className="cg-container">
          <Reveal>
            <span className="cg-eyebrow">The Core Idea</span>
            <h2 className="cg-heading" style={{fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', marginBottom: '0.75rem'}}>
              Why CoreGrid was designed this way
            </h2>
            <p style={{maxWidth: 720, marginBottom: '2rem'}}>
              Asset management requires more than storing information. CoreGrid manages the complete asset
              lifecycle through one connected, transparent and accountable digital platform.
            </p>
            <div className={styles.twoCol}>
              <div className="cg-card">
                <h3 className={styles.principleTitle}>The challenge</h3>
                <ul className={styles.checklist}>
                  {challenge.map((item) => (
                    <li key={item}>
                      <Check className={styles.checkMark} size={15} strokeWidth={2.5} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="cg-card">
                <h3 className={styles.principleTitle}>Our approach</h3>
                <ul className={styles.checklist}>
                  {approach.map((item) => (
                    <li key={item}>
                      <Check className={styles.checkMark} size={15} strokeWidth={2.5} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cg-section cg-section--alt">
        <div className="cg-container">
          <Reveal>
            <span className="cg-eyebrow">Technology</span>
            <h2 className="cg-heading" style={{fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', marginBottom: '0.75rem'}}>
              Built as an integrated system
            </h2>
            <p style={{maxWidth: 720, marginBottom: '2rem'}}>
              The platform combines web, mobile, backend, data and AI technologies within a single
              architecture.
            </p>
            <div className={styles.techTableWrap}>
              <table className={styles.techTable}>
                <thead>
                  <tr>
                    <th>Technology</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {stack.map((row) => (
                    <tr key={row.tech}>
                      <td>{row.tech}</td>
                      <td>{row.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={styles.docsLink}>
              See the full <a href="/docs/architecture/technology-stack">technology stack</a> and{' '}
              <a href="/docs/architecture/overview">system architecture</a> in the documentation.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="cg-section">
        <div className="cg-container">
          <Reveal>
            <span className="cg-eyebrow">Principles</span>
            <h2 className="cg-heading" style={{fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', marginBottom: '2rem'}}>
              What guides the platform
            </h2>
            <div className="cg-grid cg-grid--4">
              {principles.map((item) => (
                <div key={item.title} className={`cg-card ${styles.principleCard}`}>
                  <h3 className={styles.principleTitle}>{item.title}</h3>
                  <p className={styles.principleDesc}>{item.description}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
