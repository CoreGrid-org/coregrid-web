import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {ArrowRight, Check} from 'lucide-react';
import Reveal from '@site/src/components/Reveal';
import PageHeader from '@site/src/components/PageHeader';
import IconCard from '@site/src/components/IconCard';
import {type IconName} from '@site/src/components/DynamicIcon';
import SeoHead from '@site/src/components/SeoHead';
import styles from './features.module.css';

const modules: {icon: IconName; title: string; items: string[]}[] = [
  {
    icon: 'QrCode',
    title: 'Asset Registry',
    items: [
      'Guided onboarding with category-specific fields',
      'Unique QR code and barcode per asset',
      'GPS location capture at registration',
      'Photo and document attachments',
      'Department and officer assignment',
    ],
  },
  {
    icon: 'Wrench',
    title: 'Maintenance Management',
    items: [
      'Preventive maintenance scheduling',
      'Requests and work-order management',
      'Field officer and technician assignment',
      'Status and progress tracking',
      'Complete maintenance history per asset',
    ],
  },
  {
    icon: 'ArrowLeftRight',
    title: 'Transfers & Disposals',
    items: [
      'Inter-department transfer requests',
      'Controlled approval workflows',
      'Transfer status tracking',
      'Receiving-department confirmation',
      'Structured disposal workflow',
    ],
  },
  {
    icon: 'ShieldCheck',
    title: 'Audit & Compliance',
    items: [
      'Traceable audit history',
      'Asset verification workflows',
      'Role-based approval for controlled actions',
      'Lifecycle activity records',
      'Reporting support for compliance review',
    ],
  },
  {
    icon: 'Map',
    title: 'GIS Mapping',
    items: [
      'View assets by geographic location',
      'Location linked to every asset record',
      'GPS-supported field updates',
      'Visualise by department or category',
      'Location-based verification support',
    ],
  },
  {
    icon: 'Sparkles',
    title: 'AI Decision Support',
    items: [
      'Analyse condition and lifecycle data',
      'Generate structured recommendations',
      'Evaluate repair, transfer and disposal',
      'Present evidence for authorised review',
      'Human approval before high-impact actions',
    ],
  },
  {
    icon: 'KeyRound',
    title: 'User & Access Management',
    items: [
      'Role-based access control',
      'Department-scoped user access',
      'Distinct permission levels per role',
      'Controlled access to sensitive data',
      'User activity and access tracking',
    ],
  },
  {
    icon: 'BarChart3',
    title: 'Analytics & Reporting',
    items: [
      'Asset summary dashboards',
      'Department-level reporting',
      'Asset condition analysis',
      'Maintenance activity reporting',
      'Exportable operational reports',
    ],
  },
  {
    icon: 'Smartphone',
    title: 'Mobile App',
    items: [
      'Field-operations mobile access',
      'QR code scanning for asset lookup',
      'Condition updates from the field',
      'Photo capture as supporting evidence',
      'Maintenance and verification on the go',
    ],
  },
  {
    icon: 'Bell',
    title: 'Notifications & Alerts',
    items: [
      'Maintenance reminders',
      'Approval and workflow notifications',
      'Asset status alerts',
      'Decision-support notifications',
      'User-specific delivery',
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

      <PageHeader
        eyebrow="Capabilities"
        title="Ten modules. One asset management platform."
        lead="Every aspect of asset lifecycle management in one integrated platform - from registration and
              maintenance through AI-assisted decisions, reporting and full lifecycle accountability."
      />

      <section className="cg-section cg-section--tight">
        <div className="cg-container">
          <Reveal>
            <div className="cg-grid cg-grid--3">
              {modules.map((module) => (
                <IconCard key={module.title} icon={module.icon} title={module.title}>
                  <ul className={styles.featureList}>
                    {module.items.map((item) => (
                      <li key={item}>
                        <Check className={styles.checkMark} size={15} strokeWidth={2.5} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </IconCard>
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
              <p className={styles.ctaText}>See how every module fits together on the Modules page.</p>
            </div>
            <Link className="cg-btn cg-btn--primary" to="/modules">
              View modules
              <ArrowRight size={17} strokeWidth={2.25} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
