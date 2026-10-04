import React, {useEffect, useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useThemeConfig, type MultiColumnFooter} from '@docusaurus/theme-common';
import {ArrowUp} from 'lucide-react';
import styles from './styles.module.css';

function Footer(): ReactNode {
  const {footer} = useThemeConfig();
  // Hooks must run before any early return
  const logoSrc = useBaseUrl((footer as MultiColumnFooter | undefined)?.logo?.src ?? '');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // The site's single back-to-top button: hidden at the top, shown once the reader scrolls down.
  useEffect(() => {
    const update = () => setShowBackToTop(window.scrollY > 400);
    update();
    window.addEventListener('scroll', update, {passive: true});
    return () => window.removeEventListener('scroll', update);
  }, []);

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
      <div className={styles.mainSection}>
        <div style={{maxWidth: '1180px', margin: '0 auto', width: '100%', padding: '0 1.5rem'}}>
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
              <p className={styles.brandTagline}>Manage. Monitor. Maximize.</p>
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

      <button
        type="button"
        className={`${styles.backToTop} ${showBackToTop ? styles.backToTopVisible : ''}`}
        onClick={handleBackToTop}
        aria-label="Back to top"
        tabIndex={showBackToTop ? 0 : -1}
        aria-hidden={!showBackToTop}>
        <ArrowUp size={16} strokeWidth={2.4} />
      </button>
    </footer>
  );
}

export default React.memo(Footer);