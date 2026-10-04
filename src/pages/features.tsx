import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {ArrowRight, Check} from 'lucide-react';
import Reveal from '@site/src/components/Reveal';
import DynamicIcon, {type IconName} from '@site/src/components/DynamicIcon';
import SeoHead from '@site/src/components/SeoHead';
import styles from './features.module.css';

const modules: {icon: IconName; title: string; items: string[]}[] = [
  {
    icon: 'QrCode',
    title: 'Asset Registry & QR Identification',
    items: [
      'Configurable asset categories, types, and type-specific fields',
      'Organisation-scoped asset codes and printable QR labels',
      'QR scan and manual-code lookup from the field',
      'Department and location assignment',
      'Asset condition, depreciation, lifecycle status, and immutable history',
    ],
  },
  {
    icon: 'Wrench',
    title: 'Maintenance Management',
    items: [
      'Fault reporting with optional photograph',
      'Corrective and preventive maintenance records',
      'Assignment, estimated/actual cost capture, and work-completion details',
      'Guarded progress flow: requested, approved, in progress, completed, or cancelled',
      'Per-asset maintenance history, repair count, and cumulative cost',
    ],
  },
  {
    icon: 'ArrowLeftRight',
    title: 'Transfers & Disposals',
    items: [
      'Inter-department transfer requests with destination location and reason',
      'Administrator approval or rejection followed by physical receipt confirmation',
      'Transfer history with requester, approver, receiver, and timestamps',
      'Asset condemnation and evidence-backed disposal requests',
      'Controlled disposal preconditions, approval, revision, and final disposal recording',
    ],
  },
  {
    icon: 'ShieldCheck',
    title: 'Audit & Compliance',
    items: [
      'Verification campaigns scoped by department, location, category, or asset type',
      'Mobile physical verification using QR scan, presence, location, and condition assertions',
      'Automatic and manually raised discrepancies',
      'Controlled discrepancy resolution with a complete audit trail',
      'Immutable audit logs and exportable campaign/compliance reports',
    ],
  },
  {
    icon: 'Settings2',
    title: 'Organisation Configuration',
    items: [
      'Department and location management',
      'Configurable asset categories, types, and custom attribute definitions',
      'Organisation policy parameters for lifecycle and financial decisions',
      'Reusable configuration that supports different asset domains',
      'No GPS or GIS mapping included in the current baseline',
    ],
  },
  {
    icon: 'Sparkles',
    title: 'AI Decision Support',
    items: [
      'Four-stage lifecycle evaluation: Planner, Maintenance Analysis, Budget Analysis, and Policy Compliance',
      'Structured, evidence-based recommendations for repair, retention, transfer, or disposal',
      'Deterministic business-rule and policy validation',
      'Read-only, organisation-scoped agent tools',
      'Authorised human approval before any high-impact action is executed',
    ],
  },
  {
    icon: 'KeyRound',
    title: 'User & Access Management',
    items: [
      'ThunderID authentication and secure token-based access',
      'Four role levels: Administrator, Auditor, Inventory Officer, and Department Staff',
      'Role-based permissions and protected routes',
      'Department and organisation scope enforcement on data access',
      'User provisioning, role changes, activation, and deactivation from the administration console',
    ],
  },
  {
    icon: 'BarChart3',
    title: 'Analytics & Reporting',
    items: [
      'Role-appropriate operational dashboards',
      'Asset, maintenance, disposal, and audit campaign reports',
      'Filters for dates, departments, categories, status, condition, and other criteria',
      'Asset-condition, department, and maintenance-cost visualisations',
      'PDF and CSV export where authorised',
    ],
  },
  {
    icon: 'Smartphone',
    title: 'Mobile Field Operations',
    items: [
      'Flutter mobile access for Department Staff and Inventory Officers',
      'QR scanning and manual-code fallback for asset lookup',
      'Condition updates, fault reporting, optional photo evidence, and verification workflows',
      'Maintenance task updates and transfer receipt confirmation for Inventory Officers',
      'Task-focused dashboards, workflow status, and in-app notifications',
    ],
  },
  {
    icon: 'Bell',
    title: 'Notifications & Lifecycle Alerts',
    items: [
      'User-specific in-app notification centre with unread status',
      'Maintenance assignment, cancellation, and status-change updates',
      'Transfer, disposal, verification, and agent-workflow events surfaced to relevant users',
      'Notifications linked to the related CoreGrid record',
      'Delivery remains separate from the business transaction so a notification failure does not undo a completed operation',
    ],
  },
];

export default function Features(): React.ReactElement {
  return (
    <Layout
      title="Features"
      description="Ten modules, one asset management platform - from registration and maintenance through AI-assisted decisions and full lifecycle accountability.">
      <SeoHead
        path="/features"
        title="Features"
        description="Ten modules, one asset management platform - from registration and maintenance through AI-assisted decisions and full lifecycle accountability."
      />

      <header className="cg-page-header">
        <div className="cg-container">
          <div className={styles.introInner}>
            <span className="cg-eyebrow">Capabilities</span>
            <h1 className={`cg-heading ${styles.title}`}>Ten modules. One integrated asset-management platform.</h1>
            <p className={`cg-lead ${styles.lead}`}>
              CoreGrid connects asset registration, field operations, maintenance, controlled lifecycle decisions,
              reporting, and audit accountability through one role-secured platform.
            </p>
          </div>
        </div>
      </header>

      <section className="cg-section cg-section--tight">
        <div className="cg-container">
          <Reveal>
            <div className="cg-grid cg-grid--3">
              {modules.map((module) => (
                <div key={module.title} className={`cg-card ${styles.featureCard}`}>
                  <div className={styles.featureIcon}>
                    <DynamicIcon name={module.icon} size={22} strokeWidth={1.75} />
                  </div>
                  <h3 className={styles.featureTitle}>{module.title}</h3>
                  <ul className={styles.featureList}>
                    {module.items.map((item) => (
                      <li key={item}>
                        <Check className={styles.checkMark} size={15} strokeWidth={2.5} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cg-section">
        <div className="cg-container">
          <div className={`cg-panel ${styles.ctaBanner}`}>
            <div>
              <h2 className="cg-heading" style={{marginBottom: '0.5rem'}}>
                Want the full technical picture?
              </h2>
              <p className={styles.ctaText}>Architecture, data model and build status for every module.</p>
            </div>
            <Link className="cg-btn cg-btn--primary" to="/docs/intro">
              Read the docs
              <ArrowRight size={17} strokeWidth={2.25} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
