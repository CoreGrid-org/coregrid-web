import React from 'react';
import Layout from '@theme/Layout';
import {ArrowRight} from 'lucide-react';
import SeoHead from '@site/src/components/SeoHead';
import styles from './contact.module.css';

export default function Contact(): React.ReactElement {
  return (
    <Layout
      title="Contact"
      description="Connect with the CoreGrid team on GitHub.">
      <SeoHead
        path="/contact"
        title="Contact"
        description="Connect with the CoreGrid team on GitHub."
      />

      <header className="cg-page-header">
        <div className="cg-container">
          <div className={styles.introInner}>
            <span className="cg-eyebrow">Get In Touch</span>
            <h1 className={`cg-heading ${styles.title}`}>Contact with us on GitHub</h1>
            <p className={`cg-lead ${styles.lead}`}>
              Have a question about CoreGrid, need technical support, or want to discuss a deployment?
              Connect directly with our engineering team and maintainers on GitHub.
            </p>
            <div className={styles.heroCta}>
              <a
                className="cg-btn cg-btn--primary"
                href="https://github.com/CoreGrid-org/CoreGrid"
                target="_blank"
                rel="noreferrer noopener">
                Visit CoreGrid on GitHub
                <ArrowRight size={16} strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>
      </header>
    </Layout>
  );
}
