import React from 'react';
import styles from './styles.module.css';

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
};

export default function PageHeader({eyebrow, title, lead, children}: Props): React.ReactElement {
  return (
    <header className="cg-page-header">
      <div className="cg-container">
        <div className={styles.inner}>
          <span className="cg-eyebrow">{eyebrow}</span>
          <h1 className={`cg-heading ${styles.title}`}>{title}</h1>
          {lead && <p className={`cg-lead ${styles.lead}`}>{lead}</p>}
          {children}
        </div>
      </div>
    </header>
  );
}
