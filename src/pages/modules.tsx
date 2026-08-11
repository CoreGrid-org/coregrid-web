import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {ArrowRight} from 'lucide-react';

import Reveal from '@site/src/components/Reveal';
import DynamicIcon, {
  type IconName,
} from '@site/src/components/DynamicIcon';
import SeoHead from '@site/src/components/SeoHead';

import styles from './modules.module.css';

type ModuleItem = {
  icon: IconName;
  name: string;
  id: string;
  desc: string;
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
    desc:
      'These three modules form the bedrock of CoreGrid. Every other capability depends on the data and structure that this layer establishes.',
    modules: [
      {
        icon: 'ClipboardList',
        name: 'Asset Registry',
        id: '01',
        desc:
          'The digital identity of every asset - registered, tagged and tracked from day one with QR codes, photos and structured records.',
      },
      {
        icon: 'Users',
        name: 'User & Access Management',
        id: '02',
        desc:
          'Role-based access control that ensures the right people see the right information, scoped to their department.',
      },
      {
        icon: 'ShieldCheck',
        name: 'Audit & Compliance',
        id: '03',
        desc:
          'A traceable history of every lifecycle action, with approval workflows that keep every important decision accountable.',
      },
    ],
  },
  {
    num: '02',
    tag: 'Asset Operations',
    title: 'Managing assets day to day',
    desc:
      'Built on top of the Foundation layer, these modules cover the operational lifecycle of every asset during normal use and key lifecycle events.',
    modules: [
      {
        icon: 'Wrench',
        name: 'Maintenance Management',
        id: '04',
        desc:
          'Schedule preventive maintenance, raise work orders, assign technicians and track every task through to completion.',
      },
      {
        icon: 'RefreshCw',
        name: 'Transfers & Disposals',
        id: '05',
        desc:
          'Controlled workflows for moving assets between departments or retiring them, with approval chains at every step.',
      },
      {
        icon: 'MapPin',
        name: 'GIS Mapping',
        id: '06',
        desc:
          'See every asset plotted on a geographic map, linked to its department, district and physical location record.',
      },
    ],
  },
  {
    num: '03',
    tag: 'Intelligence & Analytics',
    title: 'Turning asset data into decisions',
    desc:
      'With a rich operational history flowing from the first two layers, these modules surface insights and AI-assisted recommendations for authorised review.',
    modules: [
      {
        icon: 'BrainCircuit',
        name: 'AI Decision Support',
        id: '07',
        desc:
          'Four specialised agents analyse condition, cost and compliance to produce structured recommendations - always reviewed by a human officer before action.',
      },
      {
        icon: 'BarChart3',
        name: 'Analytics & Reporting',
        id: '08',
        desc:
          'Dashboards, condition summaries and exportable reports that give a complete operational picture across your entire asset portfolio.',
      },
    ],
  },
  {
    num: '04',
    tag: 'Field & Engagement',
    title: 'Bringing CoreGrid to every corner',
    desc:
      'The final layer extends CoreGrid to the field and keeps every stakeholder informed - wherever they are.',
    modules: [
      {
        icon: 'Smartphone',
        name: 'Mobile App',
        id: '09',
        desc:
          'QR code scanning, condition updates and maintenance activities - carried out from any field location on any device.',
      },
      {
        icon: 'Bell',
        name: 'Notifications & Alerts',
        id: '10',
        desc:
          'Timely reminders, approval requests and status updates delivered to the right person at the right time, through the right channel.',
      },
    ],
  },
];

export default function Modules(): React.ReactElement {
  return (
    <Layout
      title="Modules"
      description="Ten modules across four layers - Foundation, Asset Operations, Intelligence & Analytics, and Field & Engagement - forming one asset management platform."
    >
      <SeoHead
        path="/modules"
        title="Platform Modules"
        description="Ten modules across four layers - Foundation, Asset Operations, Intelligence & Analytics, and Field & Engagement - forming one asset management platform."
      />

      {/* HERO SECTION */}
      <header className={`cg-page-header ${styles.heroSection}`}>
        <div className={styles.pageContainer}>
          <div className={styles.introInner}>
            <span className="cg-eyebrow">Platform Modules</span>

            <h1 className={`cg-heading ${styles.title}`}>
              10 Modules. One{' '}
              <span className={styles.highlight}>
                Asset
                <br />
                Management Platform.
              </span>
            </h1>

            <p className={`cg-lead ${styles.lead}`}>
              CoreGrid brings every aspect of asset lifecycle management into
              one integrated platform — from registration and maintenance
              through to AI-assisted decisions, reporting and full lifecycle
              accountability.
            </p>
          </div>
        </div>
      </header>

      {/* STACK INTRO */}
      <section className="cg-section cg-section--tight">
        <div className={styles.pageContainer}>
          <Reveal>
            <div className={styles.stackIntro}>
              <span className="cg-eyebrow">The Stack</span>

              <h2 className={`cg-heading ${styles.stackTitle}`}>
                Four layers. One unified platform.
              </h2>

              <p>
                Each layer provides the data and capabilities that the layers
                above it rely on. Remove any layer and the ones above cannot
                function correctly.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* LAYERS */}
      {layers.map((layer, layerIndex) => (
        <section
          key={layer.num}
          id={`layer-${layer.num}`}
          className={`cg-section ${
            layerIndex % 2 === 1 ? 'cg-section--alt' : ''
          }`}
        >
          <div className={styles.pageContainer}>
            <Reveal>
              <div className={styles.layerHeader}>
                <div className={styles.layerHeading}>
                  <div className={styles.layerBadgeRow}>
                    <span className={styles.layerBadge}>
                      {layer.num}
                    </span>

                    <span className={styles.layerTag}>
                      Layer {layer.num} · {layer.tag}
                    </span>
                  </div>

                  <h2
                    className={`cg-heading ${styles.layerTitle}`}
                  >
                    {layer.title}
                  </h2>
                </div>

                <div className={styles.layerDesc}>
                  <p>{layer.desc}</p>

                  <span className={styles.layerCount}>
                    {layer.modules.length}{' '}
                    {layer.modules.length === 1
                      ? 'module'
                      : 'modules'}{' '}
                    in this layer
                  </span>
                </div>
              </div>

              <div
                className={`${styles.moduleGrid} ${
                  layer.modules.length === 2
                    ? styles.moduleGridTwo
                    : styles.moduleGridThree
                }`}
              >
                {layer.modules.map((mod) => (
                  <div
                    key={mod.id}
                    className={`cg-card ${styles.moduleCard}`}
                  >
                    <span className={styles.moduleNumber}>
                      {mod.id}
                    </span>

                    <div className={styles.moduleIcon}>
                      <DynamicIcon
                        name={mod.icon}
                        size={22}
                        strokeWidth={1.75}
                      />
                    </div>

                    <h3 className={styles.moduleTitle}>
                      {mod.name}
                    </h3>

                    <p className={styles.moduleDesc}>
                      {mod.desc}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {layerIndex < layers.length - 1 && (
            <Reveal>
              <div className={styles.connector}>
                <div className={styles.connectorLine} />

                <span className={styles.connectorLabel}>
                  Builds on Layer {layer.num}
                </span>
              </div>
            </Reveal>
          )}
        </section>
      ))}

      {/* CTA */}
      <section className="cg-section">
        <div className={styles.pageContainer}>
          <Reveal>
            <div className={`cg-panel ${styles.ctaBanner}`}>
              <div className={styles.ctaContent}>
                <h2 className={`cg-heading ${styles.ctaTitle}`}>
                  Ready to explore the full feature set?
                </h2>

                <p className={styles.ctaText}>
                  Every module. Every capability. Detailed feature lists
                  for each of the 10 modules.
                </p>
              </div>

              <Link
                className="cg-btn cg-btn--primary"
                to="/features"
              >
                View all features

                <ArrowRight
                  size={17}
                  strokeWidth={2.25}
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}