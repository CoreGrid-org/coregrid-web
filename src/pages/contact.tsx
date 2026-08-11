import React from 'react';
import Layout from '@theme/Layout';
import Reveal from '@site/src/components/Reveal';
import PageHeader from '@site/src/components/PageHeader';
import SeoHead from '@site/src/components/SeoHead';
import styles from './contact.module.css';

const details = [
  {label: 'Email', value: 'coregrid.project@gmail.com', href: 'mailto:coregrid.project@gmail.com'},
  {label: 'Phone', value: '+94 77 000 0000', href: 'tel:+94770000000'},
  {label: 'Availability', value: 'Mon – Fri, 9:00 AM – 5:00 PM (SLST)'},
  {label: 'Location', value: 'Western Province, Sri Lanka'},
];

export default function Contact(): React.ReactElement {
  return (
    <Layout
      title="Contact"
      description="Have a question about CoreGrid, the asset lifecycle, or a platform demonstration? Get in touch.">
      <SeoHead
        path="/contact"
        title="Contact"
        description="Have a question about CoreGrid, the asset lifecycle, or a platform demonstration? Get in touch."
      />

      <PageHeader
        eyebrow="Get In Touch"
        title="Let's talk about asset management"
        lead="Have a question about CoreGrid, the asset lifecycle, or a platform demonstration? Send us a
              message and we'll get back to you."
      />

      <section className="cg-section cg-section--tight">
        <div className="cg-container">
          <Reveal>
            <div className="cg-grid cg-grid--4">
              {details.map((item) => (
                <div key={item.label} className={`cg-card ${styles.detailCard}`}>
                  <span className={`cg-eyebrow ${styles.detailLabel}`}>{item.label}</span>
                  {item.href ? (
                    <a className={styles.detailValue} href={item.href}>
                      {item.value}
                    </a>
                  ) : (
                    <span className={styles.detailValue}>{item.value}</span>
                  )}
                </div>
              ))}
            </div>
            <div className={styles.emailCta}>
              <a className="cg-btn cg-btn--primary" href="mailto:coregrid.project@gmail.com?subject=CoreGrid%20Enquiry">
                Send us an email
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cg-section cg-section--alt">
        <div className="cg-container">
          <Reveal>
            <div className={styles.regionCard}>
              <span className="cg-eyebrow">Regional Support</span>
              <h2 className={styles.regionTitle}>Western Province, Sri Lanka</h2>
              <p>
                Regional project coordination and support for organisations located within Sri Lanka&apos;s
                Western Province.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
