import React from 'react';
import styles from './styles.module.css';

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'center' | 'left';
};

export default function SectionHeader({eyebrow, title, description, align = 'center'}: Props): React.ReactElement {
  return (
    <div className={`${styles.header} ${align === 'left' ? styles.left : ''}`}>
      <span className="cg-eyebrow">{eyebrow}</span>
      <h2 className={`cg-heading ${styles.title}`}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}
