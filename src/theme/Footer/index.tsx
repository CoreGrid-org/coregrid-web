import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useThemeConfig, type MultiColumnFooter} from '@docusaurus/theme-common';
import {ArrowUp, ArrowUpRight, Globe, Mail} from 'lucide-react';
import styles from './styles.module.css';

function Footer(): ReactNode {
  const {footer} = useThemeConfig();
  // Hooks must run before any early return
  const logoSrc = useBaseUrl((footer as MultiColumnFooter | undefined)?.logo?.src ?? '');

  if (!footer) {
    return null;
  }

  const {links, logo, copyright} = footer as MultiColumnFooter;
  const columns = links ?? [];

  const handleBackToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  return (
    <footer className={`footer footer--${footer.style} ${styles.footer}`}>
      {/* Section 1: brand, links, contact, copyright */}
      <div className={styles.mainSection}>
        <div className="cg-container">
          <div className={styles.top}>
            <div className={styles.brand}>
              <Link to="/" className={styles.brandRow}>
                {logo && (
                  <img
                    src={logoSrc}
                    alt=""
                    aria-hidden="true"
                    className={styles.brandLogo}
                    width={30}
                    height={30}
                  />
                )}
                <span className={styles.brandText}>
                  <span className={styles.brandName}>
                    <span className={styles.brandNameCore}>Core</span>
                    <span className={styles.brandNameGrid}>Grid</span>
                  </span>
                  <span className={styles.brandSub}>Asset management</span>
                </span>
              </Link>
              <p className={styles.brandTagline}>
                Asset lifecycle intelligence for modern organisations. One secure platform for registration,
                maintenance, verification, and governance.
              </p>
              <div className={styles.socials}>
                <a href="mailto:hello@coregrid.io" className={styles.socialButton} aria-label="Email CoreGrid">
                  <Mail size={15} strokeWidth={2} />
                </a>
                <a
                  href="https://www.coregrid.io"
                  className={styles.socialButton}
                  aria-label="CoreGrid website"
                  target="_blank"
                  rel="noreferrer noopener">
                  <Globe size={15} strokeWidth={2} />
                </a>
              </div>
            </div>

            {columns.map((col) => (
              <div key={col.title} className={styles.column}>
                <div className={styles.columnTitle}>{col.title}</div>
                <ul className={styles.columnList}>
                  {col.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        to={item.to}
                        href={item.href}
                        className={styles.columnLink}
                        target={item.href ? '_blank' : undefined}
                        rel={item.href ? 'noopener noreferrer' : undefined}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className={styles.contactPanel}>
              <div className={styles.columnTitle}>Get in touch</div>

              <div className={styles.contactGroup}>
                <span className={styles.contactLabel}>Email</span>
                <a href="mailto:hello@coregrid.io" className={styles.contactLink}>
                  hello@coregrid.io
                  <ArrowUpRight size={13} strokeWidth={2} />
                </a>
              </div>

              <div className={styles.contactGroup}>
                <span className={styles.contactLabel}>Website</span>
                <a
                  href="https://www.coregrid.io"
                  className={styles.contactLink}
                  target="_blank"
                  rel="noreferrer noopener">
                  coregrid.io
                  <ArrowUpRight size={13} strokeWidth={2} />
                </a>
              </div>
            </div>
          </div>

          <div className={styles.bottom}>
            <span className={styles.copyright}>{copyright}</span>
            <span className={styles.orgInfo}>
              In partnership with the CoreGrid platform team · Enterprise asset management
            </span>
          </div>
        </div>
      </div>

      {/* Section 2: watermark */}
      <div className={styles.watermarkSection} aria-hidden="true">
        <div className={styles.watermark}>CoreGrid</div>
      </div>

      <button type="button" className={styles.backToTop} onClick={handleBackToTop} aria-label="Back to top">
        <ArrowUp size={16} strokeWidth={2.4} />
      </button>
    </footer>
  );
}

export default React.memo(Footer);