import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {ArrowRight, CheckCircle2} from 'lucide-react';
import Reveal from '@site/src/components/Reveal';
import PageHeader from '@site/src/components/PageHeader';
import SectionHeader from '@site/src/components/SectionHeader';
import SeoHead from '@site/src/components/SeoHead';
import styles from './ai-decision-support.module.css';

const agents = [
  {
    n: '01',
    title: 'Planner Agent',
    role: 'Workflow planner and orchestrator',
    description:
      "Evaluates the officer's objective, checks feasibility, and produces an ordered execution plan of 4–6 typed steps. Rejects out-of-scope objectives before analysis and uses model inference with a deterministic fallback.",
  },
  {
    n: '02',
    title: 'Maintenance Analysis Agent',
    role: 'Reliability and maintenance evaluator',
    description:
      'Analyses the asset’s maintenance behaviour using recorded lifecycle data. Calculates factual indicators (repair count, cumulative cost, MTBF, failure trend) deterministically without model calls.',
  },
  {
    n: '03',
    title: 'Budget Analysis Agent',
    role: 'Financial comparison and recommendation support',
    description:
      'Compares the financial implications of keeping, repairing, transferring, or disposing of an asset. Computes depreciation, residual value, replacement estimates, and ranks options with deterministic fallbacks.',
  },
  {
    n: '04',
    title: 'Policy Compliance Agent',
    role: 'Deterministic policy and rule checker',
    description:
      'Validates whether the proposed recommendation complies with organisation policies and constraints. Returns PASS, FAIL, or NEEDS_REVISION using a deterministic rule engine—not a language model.',
  },
];

const humanApprovalPoints = [
  'Only an authorised Administrator can approve, reject, or request revision',
  'Approval requires a recorded decision reason',
  'The reviewer can see the objective, plan, agent outputs, tool results, recommendation, and rule-by-rule validation',
  'On approval, the ASP.NET Core API re-applies normal business rules and executes the authorised action through the standard service layer',
  'On rejection or revision, no unauthorised business change occurs',
];

const principles = [
  {
    title: 'People retain control',
    description:
      'No agent can directly write, update, or delete business data. High-impact recommendations pause for an authorised Administrator’s decision. Advisory outcomes are recorded as recommendations, not automatically applied changes.',
  },
  {
    title: 'Explainable and auditable by design',
    description:
      'Every workflow records the objective, plan, agent stages, controlled tool calls, validation result, recommendation, approval decision, timestamps, and final outcome. Reviewers can understand which evidence supported a result.',
  },
  {
    title: 'Deterministic where it matters',
    description:
      'Maintenance statistics, financial calculations, policy checks, authorisation, and business-rule validation are implemented as reproducible system logic. Language-model use is constrained to appropriate advisory tasks and never determines compliance or approval.',
  },
  {
    title: 'Safe failure over silent failure',
    description:
      'If a tool, provider, schema check, policy rule, or timeout fails, the workflow ends in a recorded safe state. It does not partially apply a lifecycle action or leave an asset in an unknown state.',
  },
  {
    title: 'Scoped and secure by default',
    description:
      'Agent tools are read-only, allow-listed per agent, and scoped to the workflow’s organisation. User-entered objectives are treated as data, not instructions that can change permissions, tools, or approval rules.',
  },
];

export default function AIDecisionSupport(): React.ReactElement {
  return (
    <Layout
      title="AI Decision Support"
      description="Four specialised AI agents analyse every critical asset decision - then put the final choice in the hands of a qualified officer.">
      <SeoHead
        path="/ai-decision-support"
        title="AI Decision Support"
        description="Four specialised AI agents analyse every critical asset decision - then put the final choice in the hands of a qualified officer."
      />

      <PageHeader
        eyebrow="AI Decision Support"
        title="Four AI agents. One human decision."
        lead="CoreGrid's decision-support engine analyses every critical asset decision from multiple angles
              - then puts the final choice firmly in the hands of a qualified officer.">
        <div className={styles.actions}>
          <Link className="cg-btn cg-btn--primary" to="/contact">
            Request a live demo
          </Link>
          <Link className="cg-btn cg-btn--secondary" to="/docs/user-manual/features/ai-decision-support">
            Read technical documentation
          </Link>
        </div>
      </PageHeader>

      <section className="cg-section cg-section--tight">
        <div className="cg-container">
          <Reveal>
            <SectionHeader
              align="left"
              eyebrow="How It Works"
              title="The four agents"
              description="Each agent specialises in one dimension of the decision. Together they produce an auditable recommendation governed by deterministic policy gates."
            />
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
            <SectionHeader
              align="left"
              eyebrow="Human Approval"
              title="Human-in-the-loop control point"
              description="Human approval is a protected workflow checkpoint, not an AI agent. When a recommendation involves a high-impact action, CoreGrid pauses the workflow and preserves the complete decision record for an Administrator to review."
            />

            <div className={styles.humanApprovalCard}>
              <div className={styles.humanApprovalGrid}>
                {humanApprovalPoints.map((point, index) => (
                  <div key={index} className={styles.humanApprovalItem}>
                    <CheckCircle2 size={18} className={styles.humanApprovalBullet} />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cg-section">
        <div className="cg-container">
          <Reveal>
            <SectionHeader
              align="left"
              eyebrow="Our Principles"
              title="AI that assists accountable people"
              description="CoreGrid’s AI supports lifecycle decisions; it does not replace the people accountable for them."
            />
            <div className="cg-grid cg-grid--3">
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

      <section className="cg-section cg-section--alt">
        <div className="cg-container">
          <div className={`cg-panel ${styles.ctaBanner}`}>
            <div>
              <h2 className="cg-heading" style={{marginBottom: '0.5rem'}}>
                See how the workflow is built
              </h2>
              <p className={styles.ctaText}>The full agent architecture, tool definitions, permission model, and approval flow.</p>
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
