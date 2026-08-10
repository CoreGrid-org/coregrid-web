import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const LOGOS = [
  {key: 'react', label: 'React', src: 'img/tech/react.svg'},
  {key: 'flutter', label: 'Flutter', src: 'img/tech/flutter.svg'},
  {key: 'dotnet', label: '.NET', src: 'img/tech/dotnet.svg'},
  {key: 'postgresql', label: 'PostgreSQL', src: 'img/tech/postgresql.svg'},
  {key: 'langgraph', label: 'LangGraph', src: 'img/tech/langgraph.svg'},
];

// Repeated so the strip has enough items to loop seamlessly at any width.
const TRACK = [...LOGOS, ...LOGOS, ...LOGOS];

function LogoChip({label, src}: {label: string; src: string}): React.ReactElement {
  const resolvedSrc = useBaseUrl(src);
  return (
    <span className={styles.chip} title={label}>
      <img src={resolvedSrc} alt={label} className={styles.logoImg} loading="lazy" decoding="async" />
    </span>
  );
}

export default function TechLogos(): React.ReactElement {
  return (
    <div
      className={styles.marqueeViewport}
      role="list"
      aria-label="Built on: React, Flutter, .NET, PostgreSQL, and LangGraph">
      <div className={styles.marqueeTrack} aria-hidden="true">
        {TRACK.map((item, i) => (
          <LogoChip key={`${item.key}-${i}`} label={item.label} src={item.src} />
        ))}
      </div>
    </div>
  );
}
