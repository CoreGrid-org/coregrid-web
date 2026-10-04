import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import {ArrowRight, Check} from 'lucide-react';

import Reveal from '@site/src/components/Reveal';
import PageHeader from '@site/src/components/PageHeader';
import DynamicIcon, {type IconName} from '@site/src/components/DynamicIcon';
import SeoHead from '@site/src/components/SeoHead';

import styles from './features.module.css';

type ModuleItem = {
  icon: IconName;
  name: string;
  desc: string;
  docs: string;
  items: string[];
};

type Layer = {
  num: string;
  tag: string;
  title: string;
  desc: string;
  modules: ModuleItem[];
};

const layers: Layer[] = [
  {
    num: '01',
    tag: 'Foundation',
    title: 'The core of every asset record',
    desc: 'Every other capability depends on the data and structure this layer establishes.',
    modules: [
      {
        icon: 'ClipboardList',
        name: 'Asset Registry & QR Identification',
        desc: 'Configurable categories, types and custom attributes, unique asset codes, printable QR labels and an append-only lifecycle history for every asset.',
        docs: '/docs/user-manual/features/asset-registry',
        items: [
          "Configurable asset categories, types, and type-specific fields",
          "Organisation-scoped asset codes and printable QR labels",
          "QR scan and manual-code lookup from the field",
          "Department and location assignment",
          "Asset condition, depreciation, lifecycle status, and immutable history",
        ],
      },
      {
        icon: 'Settings2',
        name: 'Organisation Configuration',
        desc: 'Departments, locations, asset structures and policy thresholds, configured by the Administrator without a new build.',
        docs: '/docs/user-manual/organization-setup',
        items: [
          "Department and location management",
          "Configurable asset categories, types, and custom attribute definitions",
          "Organisation policy parameters for lifecycle and financial decisions",
          "Optional per-asset-type policy overrides",
          "Reusable configuration that supports different asset domains",
        ],
      },
      {
        icon: 'Users',
        name: 'User & Access Management',
        desc: 'Four roles with policy-based permissions and ThunderID sign-in. Staff see their own department; other roles work across the organisation.',
        docs: '/docs/user-manual/roles-permissions',
        items: [
          "ThunderID authentication and secure token-based access",
          "Four role levels: Administrator, Auditor, Inventory Officer, and Department Staff",
          "Role-based permissions and protected routes",
          "Department and organisation scope enforcement on data access",
          "User provisioning, role changes, activation, and deactivation from the administration console",
        ],
      },
      {
        icon: 'ShieldCheck',
        name: 'Audit & Compliance',
        desc: 'Verification campaigns, automatic and manual discrepancies, and an append-only audit log of every change.',
        docs: '/docs/user-manual/features/audit-compliance',
        items: [
          "Verification campaigns scoped by department, location, category, or asset type",
          "Mobile physical verification using QR scan, presence, location, and condition assertions",
          "Automatic and manually raised discrepancies",
          "Controlled discrepancy resolution with a complete audit trail",
          "Immutable audit logs and exportable campaign/compliance reports",
        ],
      },
    ],
  },
  {
    num: '02',
    tag: 'Asset Operations',
    title: 'Managing assets day to day',
    desc: 'The operational lifecycle of every asset during normal use and at key lifecycle events.',
    modules: [
      {
        icon: 'Wrench',
        name: 'Maintenance Management',
        desc: 'Fault reports with photo evidence, corrective and preventive work orders, assignment, cost suggestions from past repairs, and completion records.',
        docs: '/docs/user-manual/features/maintenance-management',
        items: [
          "Fault reporting with optional photograph",
          "Corrective and preventive maintenance records",
          "Assignment, estimated/actual cost capture, and suggested costs from past repairs with a confidence level",
          "Guarded progress flow: requested, approved, in progress, completed, or cancelled",
          "Per-asset maintenance history, repair count, and cumulative cost",
        ],
      },
      {
        icon: 'RefreshCw',
        name: 'Transfers & Disposals',
        desc: 'Transfers approved by an Administrator and confirmed on receipt, plus condemnation and evidence-backed disposal with precondition checks.',
        docs: '/docs/user-manual/features/transfers-disposals',
        items: [
          "Inter-department transfer requests with destination location and reason",
          "Administrator approval or rejection followed by physical receipt confirmation",
          "Transfer history with requester, approver, receiver, and timestamps",
          "Asset condemnation and evidence-backed disposal requests",
          "Controlled disposal preconditions, approval, revision, and final disposal recording",
        ],
      },
      /*
       * GIS Mapping is not built - GPS capture and map visualisation are out of scope for v1.0.0
       * (see the v0.1.0 release notes). Re-enable this card once the feature ships.
       *
      {
        icon: 'MapPin',
        name: 'GIS Mapping',
        desc: 'See every asset plotted on a geographic map, linked to its department, district and physical location record.',
        docs: '/docs/planned-features',
      },
      */
    ],
  },
  {
    num: '03',
    tag: 'Intelligence & Analytics',
    title: 'Turning asset data into decisions',
    desc: 'With a rich operational history from the first two layers, these modules surface insight and AI-assisted recommendations for authorised review.',
    modules: [
      {
        icon: 'BrainCircuit',
        name: 'AI Decision Support',
        desc: 'Four specialised agents evaluate a single asset or a whole asset type. High-impact recommendations wait for an Administrator’s decision.',
        docs: '/docs/user-manual/features/ai-decision-support',
        items: [
          "Four-stage lifecycle evaluation: Planner, Maintenance Analysis, Budget Analysis, and Policy Compliance",
          "Fleet-wide evaluation of a whole asset type, or a single asset, with a recommendation per asset",
          "Deterministic business-rule and policy validation",
          "Read-only, organisation-scoped agent tools",
          "Administrator approval with a recorded reason for every high-impact recommendation",
        ],
      },
      {
        icon: 'BarChart3',
        name: 'Analytics & Reporting',
        desc: 'Role-based dashboards and inventory, maintenance, disposal and audit reports with PDF and CSV export.',
        docs: '/docs/user-manual/features/analytics-reporting',
        items: [
          "Role-appropriate operational dashboards",
          "Asset, maintenance, disposal, and audit campaign reports",
          "Filters for dates, departments, categories, status, condition, and other criteria",
          "Asset-condition, department, and maintenance-cost visualisations",
          "PDF and CSV export where authorised",
        ],
      },
    ],
  },
  {
    num: '04',
    tag: 'Field & Engagement',
    title: 'Bringing CoreGrid into the field',
    desc: 'Extends CoreGrid to the people working with assets and keeps them informed.',
    modules: [
      {
        icon: 'Smartphone',
        name: 'Mobile Field Operations',
        desc: 'Android app for Inventory Officers and Staff: QR and manual asset lookup, verification, fault reporting with photos, and transfer receipt.',
        docs: '/docs/architecture/component-architecture#mobile-application',
        items: [
          "Flutter Android app for Department Staff and Inventory Officers",
          "QR scanning and manual-code fallback for asset lookup",
          "Asset details, physical verification, and fault reporting with photo evidence",
          "Maintenance task progress, transfer requests, and receipt confirmation for Inventory Officers",
          "Task-focused dashboards, workflow status, and in-app notifications",
        ],
      },
      {
        icon: 'Bell',
        name: 'Notifications & Alerts',
        desc: 'In-app notifications for approvals, assignments and status changes, each linked to the related record.',
        docs: '/docs/user-manual/features/analytics-reporting',
        items: [
          "User-specific in-app notification centre with unread status",
          "Maintenance assignment, cancellation, and status-change updates",
          "Transfer, disposal, verification, and agent-workflow events surfaced to relevant users",
          "Notifications linked to the related CoreGrid record",
          "Delivery remains separate from the business transaction so a notification failure does not undo a completed operation",
        ],
      },
    ],
  },
];

const moduleCount = layers.reduce((count, layer) => count + layer.modules.length, 0);

export default function Features(): React.ReactElement {
  return (
    <Layout
      title="Features"
      description={`${moduleCount} modules across four layers - Foundation, Asset Operations, Intelligence & Analytics, and Field & Engagement - forming one asset management platform.`}>
      <SeoHead
        path="/features"
        title="Features & Modules"
        description={`${moduleCount} modules across four layers - Foundation, Asset Operations, Intelligence & Analytics, and Field & Engagement - forming one asset management platform.`}
      />

      <PageHeader
        eyebrow="Features & Modules"
        title={`${moduleCount} modules. One asset management platform.`}
        lead="Every part of the asset lifecycle in one role-secured platform - from registration and field operations through maintenance, AI-assisted decisions, reporting and audit accountability."
      />

      <nav className={styles.layerBar} aria-label="Module layers">
        <div className={clsx('cg-container', styles.layerBarInner)}>
          {layers.map((layer) => (
            <a key={layer.num} href={`#layer-${layer.num}`} className={styles.layerChip}>
              <span>{layer.num}</span>
              {layer.tag}
            </a>
          ))}
        </div>
      </nav>

      {layers.map((layer, index) => (
        <section
          key={layer.num}
          id={`layer-${layer.num}`}
          className={clsx('cg-section', index % 2 === 1 && 'cg-section--alt', styles.layer)}>
          <div className="cg-container">
            <Reveal>
              <header className={styles.layerHeader}>
                <span className={styles.layerTag}>
                  Layer {layer.num} · {layer.tag}
                </span>
                <h2>{layer.title}</h2>
                <p>{layer.desc}</p>
              </header>
              <div className={styles.cardGrid}>
                {layer.modules.map((mod) => (
                  <article key={mod.name} className={styles.card}>
                    <div className={styles.cardHead}>
                      <span className={styles.cardIcon}>
                        <DynamicIcon name={mod.icon} size={20} strokeWidth={1.8} />
                      </span>
                      <span className={styles.cardLayer}>{layer.tag}</span>
                    </div>
                    <h3 className={styles.cardTitle}>{mod.name}</h3>
                    <p className={styles.cardDesc}>{mod.desc}</p>
                    <ul className={styles.cardList}>
                      {mod.items.map((item) => (
                        <li key={item}>
                          <Check size={15} strokeWidth={2.5} aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to={mod.docs} className={clsx('cg-btn', 'cg-btn--ghost', styles.cardCta)}>
                      Read the docs
                      <ArrowRight size={16} strokeWidth={2.25} />
                    </Link>
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      <section className="cg-section">
        <div className="cg-container">
          <div className={styles.cta}>
            <div>
              <h2>Want the full technical picture?</h2>
              <p>Architecture, data model, API reference and the user manual for every module.</p>
            </div>
            <Link className="cg-btn cg-btn--primary" to="/docs/intro">
              Read the documentation
              <ArrowRight size={17} strokeWidth={2.25} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
