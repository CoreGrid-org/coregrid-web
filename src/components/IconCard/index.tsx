import React from 'react';
import DynamicIcon, {type IconName} from '@site/src/components/DynamicIcon';
import styles from './styles.module.css';

type IconComponent = React.ComponentType<{size?: number; strokeWidth?: number}>;

type Props = {
  icon: IconName | IconComponent;
  title: string;
  description?: React.ReactNode;
  number?: string;
  className?: string;
  children?: React.ReactNode;
};

export default function IconCard({icon, title, description, number, className, children}: Props): React.ReactElement {
  return (
    <div className={`cg-card ${styles.card} ${className ?? ''}`}>
      {number && <span className={styles.number}>{number}</span>}
      <div className={styles.icon}>
        {typeof icon === 'string' ? (
          <DynamicIcon name={icon} size={22} strokeWidth={1.75} />
        ) : (
          React.createElement(icon, {size: 22, strokeWidth: 1.75})
        )}
      </div>
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}
      {children}
    </div>
  );
}
