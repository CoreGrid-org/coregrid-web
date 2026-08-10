import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {ArrowRight} from 'lucide-react';
import Reveal from '@site/src/components/Reveal';
import SeoHead from '@site/src/components/SeoHead';
import styles from './ai-decision-support.module.css';

const agents = [
  {
    n: '01',
    title: 'Assessment Agent',
    role: 'Condition evaluator',
    description:
      "Analyses an asset's maintenance history, current condition, age relative to expected lifespan, and breakdown frequency. Produces a standardised 0–100 condition score.",
  },
  {
    n: '02',
    title: 'Recommendation Agent',
    role: 'Decision optimiser',
    description:
      'Calculates the total cost of ownership for repair, transfer or disposal, and recommends the option that maximises value — with a confidence level.',
  },
  {
    n: '03',
    title: 'Compliance Agent',
    role: 'Regulatory checker',
    description:
      "Cross-references the proposed action against your organisation's configured policies and flags any compliance risk before it reaches a human officer.",
  },
  {
    n: '04',
    title: 'Approval Router',
    role: 'Human-in-the-loop gateway',
    description:
      'Routes the consolidated recommendation to the authorised officer, tracks the approval SLA, and records the final human decision permanently.',
  },
];

const principles = [
  {
    title: 'Human always decides',
    description:
      'No recommendation is ever automatically executed. An authorised officer reviews, approves or rejects every one before any action is taken.',
  },
  {
    title: 'Explainable by design',
    description:
      'Every recommendation carries its full evidence trail — condition scores, cost calculations, compliance checks — so officers understand exactly why.',
  },
  {
    title: 'Continuously improving',
    description: 'Models are retrained on outcome data from approved decisions, becoming more accurate over time.',
  },
  {
    title: 'Bias-audited',
    description:
      'The system undergoes regular independent audits to ensure recommendations are not systematically biased by department, region or asset type.',
  },
];

export default function AIDecisionSupport(): React.ReactElement {
  return (
    <Layout
      title="AI Decision Support"
      description="Four specialised AI agents analyse every critical asset decision — then put the final choice in the hands of a qualified officer.">
      <SeoHead
        path="/ai-decision-support"
        title="AI Decision Support"
        description="Four specialised AI agents analyse every critical asset decision — then put the final choice in the hands of a qualified officer."
      />

      <header className="cg-page-header">
        <div className="cg-container">
          <div className={styles.introInner}>
            <span className="cg-eyebrow">AI Decision Support</span>
            <h1 className={`cg-heading ${styles.title}`}>Four AI agents. One human decision.</h1>
            <p className={`cg-lead ${styles.lead}`}>
              CoreGrid's decision-support engine analyses every critical asset decision from multiple angles
              — then puts the final choice firmly in the hands of a qualified officer.
            </p>
            <div className={styles.actions}>
              <Link className="cg-btn cg-btn--primary" to="/contact">
                Request a live demo
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="cg-section cg-section--tight">
        <div className="cg-container">
          <Reveal>
            <span className="cg-eyebrow">How It Works</span>
            <h2 className="cg-heading" style={{fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', marginBottom: '0.75rem'}}>
              The four agents
            </h2>
            <p style={{maxWidth: 640, marginBottom: '2rem'}}>
              Each agent specialises in one dimension of the decision. Together they produce a recommendation
              no single analysis could match.
            </p>
            <div className="cg-grid cg-grid--4">
              {agents.map((agent) => (
                <div key={agent.n} className={`cg-card ${styles.agentCard}`}>
                  <span className={styles.agentNumber}>{agent.n}</span>
                  <h3 className={styles.agentTitle}>{agent.title}</h3>
                  <p className={styles.agentRole}>{agent.role}</p>
                  <p className={styles.agentDesc}>{agent.description}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cg-section cg-section--alt">
        <div className="cg-container">
          <Reveal>
            <span className="cg-eyebrow">Our Principles</span>
            <h2 className="cg-heading" style={{fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', marginBottom: '0.75rem'}}>
              AI that assists, never replaces, judgement
            </h2>
            <p style={{maxWidth: 640, marginBottom: '2rem'}}>
              CoreGrid's AI is designed to support the people who are accountable for the decision — not to
              make it for them.
            </p>
            <div className="cg-grid cg-grid--4">
              {principles.map((item) => (
                <div key={item.title} className={`cg-card ${styles.principleCard}`}>
                  <h3 className={styles.principleTitle}>{item.title}</h3>
                  <p className={styles.principleDesc}>{item.description}</p>
                </div>
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
                See how the workflow is built
              </h2>
              <p className={styles.ctaText}>The full agent architecture, permission model and approval flow.</p>
            </div>
            <Link className="cg-btn cg-btn--primary" to="/docs/user-manual/features/ai-decision-support">
              Read the workflow guide
              <ArrowRight size={17} strokeWidth={2.25} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
