import React from 'react';
import Layout from '@theme/Layout';
import styles from './pricing.module.css';

export default function Pricing(): React.ReactElement {
  return (
    <Layout
      title="Pricing"
      description="CoreGrid Pricing Plans">
      <header className={styles.hero}>
        <div className="cg-container">
          <div className={styles.heroContent}>
            <span className="cg-eyebrow">Simple Pricing</span>
            <h1 className={`cg-heading ${styles.heroTitle}`}>Choose the right plan for your organization</h1>
            <p className={`cg-lead ${styles.heroLead}`}>
              Flexible pricing that scales with your asset management needs.
            </p>
          </div>
        </div>
      </header>

      <section className="cg-section">
        <div className="cg-container">
          <div className={styles.pricingGrid}>
            {/* Basic Plan */}
            <div className={`cg-card ${styles.planCard}`}>
              <h3 className={styles.planName}>Basic</h3>
              <div className={styles.planPrice}>
                <span className={styles.amount}>Custom</span>
                <span className={styles.period}>Contact us</span>
              </div>
              <p className={styles.planDesc}>
                For small teams just getting started with asset management.
              </p>
              <ul className={styles.features}>
                <li>Asset Registry</li>
                <li>Basic Maintenance Tracking</li>
                <li>Up to 5 users</li>
                <li>Standard Support</li>
              </ul>
            </div>

            {/* Professional Plan */}
            <div className={`cg-card ${styles.planCard} ${styles.featured}`}>
              <div className={styles.badge}>Popular</div>
              <h3 className={styles.planName}>Professional</h3>
              <div className={styles.planPrice}>
                <span className={styles.amount}>Custom</span>
                <span className={styles.period}>Contact us</span>
              </div>
              <p className={styles.planDesc}>
                For growing organizations with comprehensive asset needs.
              </p>
              <ul className={styles.features}>
                <li>All Basic features</li>
                <li>AI Decision Support</li>
                <li>Advanced Analytics</li>
                <li>Unlimited users</li>
                <li>Priority Support</li>
              </ul>
            </div>

            {/* Enterprise Plan */}
            <div className={`cg-card ${styles.planCard}`}>
              <h3 className={styles.planName}>Enterprise</h3>
              <div className={styles.planPrice}>
                <span className={styles.amount}>Custom</span>
                <span className={styles.period}>Contact us</span>
              </div>
              <p className={styles.planDesc}>
                For large organizations with advanced compliance requirements.
              </p>
              <ul className={styles.features}>
                <li>All Professional features</li>
                <li>Self-hosted deployment</li>
                <li>Custom integrations</li>
                <li>Dedicated support</li>
                <li>SLA guarantee</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
