import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import {
  ArrowRight,
  Calculator,
  Check,
  ClipboardCheck,
  Compass,
  Gavel,
  ListChecks,
  Scale,
  ShieldCheck,
  Undo2,
  Wrench,
} from 'lucide-react';
import Reveal from '@site/src/components/Reveal';
import PageHeader from '@site/src/components/PageHeader';
import SeoHead from '@site/src/components/SeoHead';
import styles from './ai-decision-support.module.css';

const sections = [
  {id: 'agents', num: '01', label: 'The agents'},
  {id: 'outcomes', num: '02', label: 'Outcomes'},
  {id: 'approval', num: '03', label: 'Human approval'},
  {id: 'principles', num: '04', label: 'Principles'},
];

// Mirrors the v1.0.0 agent subsystem (backend/Features/Agents).
const agents = [
  {
    icon: Compass,
    step: 'Step 1',
    ai: 'Uses AI',
    title: 'Planner',
    desc: 'Checks that the request is in scope and plans the evaluation.',
    items: [
      'Validates the objective against the asset type or asset',
      'Builds an ordered plan of typed steps',
      'Out-of-scope requests end safely, with nothing changed',
      'Tools: IPlannerTools - asset type summary',
    ],
  },
  {
    icon: Wrench,
    step: 'Step 2',
    ai: 'No AI',
    title: 'Maintenance Analysis',
    desc: 'Turns the recorded maintenance history into reliability facts.',
    items: [
      'Repair count and mean time between failures',
      'Cost trend across past repairs',
      '12-month repair cost projection',
      'Tools: IMaintenanceTools - history, failure statistics',
    ],
  },
  {
    icon: Calculator,
    step: 'Step 3',
    ai: 'AI ranks only',
    title: 'Budget Analysis',
    desc: "Compares projected repair cost with each asset's remaining value.",
    items: [
      'Residual value, depreciation and repair-to-replace ratio',
      'Ranks the lifecycle options for each asset',
      'All numbers are calculated by the system; AI only re-scores',
      'Tools: IBudgetTools - financials, budget, depreciation',
    ],
  },
  {
    icon: Scale,
    step: 'Step 4',
    ai: 'No AI',
    title: 'Policy Compliance',
    desc: "Checks each recommendation against the organisation's policy rules.",
    items: [
      'Deterministic rule engine, rules PR-01 to PR-09',
      'Thresholds come from the organisation policies',
      'A blocked recommendation is replaced with the next allowed action',
      'Tools: IPolicyTools - compliance state, policies',
    ],
  },
];

const outcomes = [
  {
    tone: 'green',
    icon: Check,
    title: 'Completed advisory',
    desc: 'A low-impact result, stored as a recommendation.',
    items: ['Nothing in the register changes', 'Visible with its full trace in the web app'],
  },
  {
    tone: 'yellow',
    icon: Gavel,
    title: 'Awaiting approval',
    desc: 'A high-impact result, such as disposal or low confidence.',
    items: ['Waits for an Administrator', 'Disposal recommendations always land here'],
  },
  {
    tone: 'orange',
    icon: Undo2,
    title: 'Revision requested',
    desc: 'Sent back for rework by the gate or the reviewer.',
    items: ['Re-runs without the rejected action', 'At most two revisions'],
  },
  {
    tone: 'red',
    icon: ShieldCheck,
    title: 'Failed safe',
    desc: 'Out of scope, or a check could not pass.',
    items: ['The reason is recorded', 'Nothing is partially applied'],
  },
];

const approvalPoints = [
  'Only an Administrator can approve, reject or revise a workflow',
  'Every decision needs a reason of at least 10 characters',
  'Each approval stores the approver, the reason and a snapshot of the workflow',
  'The reviewer sees the plan, each agent’s output, the ranked options and every rule outcome',
];

const approvalLimits = [
  'Approval records the decision; it does not run the action',
  'A disposal is still completed through the disposal approval step, which requires an approved workflow',
  'Rejecting ends the workflow; nothing changes',
];

const principles = [
  {
    icon: ShieldCheck,
    title: 'Agents advise, the API decides',
    desc: 'Agents cannot change business records.',
    items: ['Each agent can only call its own read-only tools', 'Tools always use the workflow’s organisation'],
  },
  {
    icon: ListChecks,
    title: 'Deterministic where it matters',
    desc: 'Facts and rules are system logic, not model output.',
    items: ['Statistics, finance and policy are calculated in code', 'AI only plans and helps rank options'],
  },
  {
    icon: ClipboardCheck,
    title: 'Always finishes',
    desc: 'Evaluations complete even when a model is unavailable.',
    items: ['A fallback provider is tried if the primary fails', 'Otherwise agents use rule-based results'],
  },
  {
    icon: Check,
    title: 'Auditable by design',
    desc: 'Every run can be reconstructed afterwards.',
    items: ['Every agent step is saved with its result and timing', 'Approvals keep the reason and a snapshot'],
  },
];

function SectionHeader({tag, title, children}: {tag: string; title: string; children?: React.ReactNode}): React.ReactElement {
  return (
    <header className={styles.sectionHeader}>
      <span className={styles.sectionTag}>{tag}</span>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </header>
  );
}

function CheckList({items}: {items: string[]}): React.ReactElement {
  return (
    <ul className={styles.cardList}>
      {items.map((item) => (
        <li key={item}>
          <Check size={15} strokeWidth={2.5} aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function AIDecisionSupport(): React.ReactElement {
  return (
    <Layout
      title="AI Decision Support"
      description="Four specialised agents evaluate asset lifecycle decisions across a whole fleet - and an Administrator makes every high-impact call.">
      <SeoHead
        path="/ai-decision-support"
        title="AI Decision Support"
        description="Four specialised agents evaluate asset lifecycle decisions across a whole fleet - and an Administrator makes every high-impact call."
      />

      <PageHeader
        eyebrow="AI Decision Support"
        title="Four AI agents. One human decision."
        lead="CoreGrid evaluates repair, replace, transfer and disposal decisions for a single asset or a whole fleet, then leaves every high-impact call to an accountable Administrator.">
        <div className={styles.actions}>
          <Link className="cg-btn cg-btn--primary" to="/contact">
            Request a live demo
          </Link>
          <Link className="cg-btn cg-btn--ghost" to="/docs/user-manual/features/ai-decision-support">
            Read the documentation
          </Link>
        </div>
      </PageHeader>

      <nav className={styles.sectionBar} aria-label="Page sections">
        <div className={clsx('cg-container', styles.sectionBarInner)}>
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`} className={styles.sectionChip}>
              <span>{section.num}</span>
              {section.label}
            </a>
          ))}
        </div>
      </nav>

      <section id="agents" className={clsx('cg-section', styles.section)}>
        <div className="cg-container">
          <Reveal>
            <SectionHeader tag="01 · How it works" title="Four agents, one fixed order">
              An evaluation covers every asset of a type, or one asset. It runs inside the CoreGrid API, and each
              agent handles one dimension of the decision before a gate routes the result.
            </SectionHeader>
            <div className={styles.cardGrid}>
              {agents.map(({icon: Icon, ...agent}) => (
                <article key={agent.title} className={styles.card}>
                  <div className={styles.cardHead}>
                    <span className={styles.cardIcon}>
                      <Icon size={20} strokeWidth={1.8} />
                    </span>
                    <span className={styles.cardMeta}>
                      <span className={styles.cardStep}>{agent.step}</span>
                      <span className={clsx(styles.aiTag, agent.ai === 'No AI' && styles.aiTagMuted)}>{agent.ai}</span>
                    </span>
                  </div>
                  <h3 className={styles.cardTitle}>{agent.title}</h3>
                  <p className={styles.cardDesc}>{agent.desc}</p>
                  <CheckList items={agent.items} />
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="outcomes" className={clsx('cg-section cg-section--alt', styles.section)}>
        <div className="cg-container">
          <Reveal>
            <SectionHeader tag="02 · Decision gate" title="Where every evaluation ends">
              After the four agents, a deterministic gate puts each workflow into exactly one of four states, shown
              with the same colours in the web app.
            </SectionHeader>
            <div className={styles.cardGrid}>
              {outcomes.map(({icon: Icon, ...outcome}) => (
                <article key={outcome.title} className={clsx(styles.card, styles[outcome.tone])}>
                  <div className={styles.cardHead}>
                    <span className={styles.outcomeIcon}>
                      <Icon size={18} strokeWidth={2.2} />
                    </span>
                    <span className={styles.cardStep}>Outcome</span>
                  </div>
                  <h3 className={styles.cardTitle}>{outcome.title}</h3>
                  <p className={styles.cardDesc}>{outcome.desc}</p>
                  <CheckList items={outcome.items} />
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="approval" className={clsx('cg-section', styles.section)}>
        <div className="cg-container">
          <Reveal>
            <SectionHeader tag="03 · Human approval" title="A protected checkpoint, not an agent">
              When a recommendation is high-impact, the workflow pauses with its complete decision record so an
              Administrator can review the evidence, not just the conclusion.
            </SectionHeader>
            <div className={styles.cardGrid}>
              <article className={clsx(styles.card, styles.cardFeatured)}>
                <div className={styles.cardHead}>
                  <span className={styles.cardIcon}>
                    <Gavel size={20} strokeWidth={1.8} />
                  </span>
                  <span className={styles.cardStep}>What the reviewer gets</span>
                </div>
                <h3 className={styles.cardTitle}>Administrator review</h3>
                <p className={styles.cardDesc}>Approve, reject or revise - always with the evidence in front of you.</p>
                <CheckList items={approvalPoints} />
              </article>
              <article className={styles.card}>
                <div className={styles.cardHead}>
                  <span className={styles.cardIcon}>
                    <ShieldCheck size={20} strokeWidth={1.8} />
                  </span>
                  <span className={styles.cardStep}>What approval does not do</span>
                </div>
                <h3 className={styles.cardTitle}>No automatic actions</h3>
                <p className={styles.cardDesc}>A decision is recorded; business changes still go through normal workflows.</p>
                <CheckList items={approvalLimits} />
              </article>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="principles" className={clsx('cg-section cg-section--alt', styles.section)}>
        <div className="cg-container">
          <Reveal>
            <SectionHeader tag="04 · Principles" title="AI that assists accountable people">
              CoreGrid’s AI supports lifecycle decisions; it does not replace the people accountable for them.
            </SectionHeader>
            <div className={styles.cardGrid}>
              {principles.map(({icon: Icon, ...item}) => (
                <article key={item.title} className={styles.card}>
                  <div className={styles.cardHead}>
                    <span className={styles.cardIcon}>
                      <Icon size={20} strokeWidth={1.8} />
                    </span>
                  </div>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDesc}>{item.desc}</p>
                  <CheckList items={item.items} />
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cg-section">
        <div className="cg-container">
          <div className={styles.cta}>
            <div>
              <h2>See how the workflow is built</h2>
              <p>Agent architecture, tool interfaces, the workflow states and the approval flow.</p>
            </div>
            <Link className="cg-btn cg-btn--primary" to="/docs/architecture/component-architecture#ai-agent-subsystem">
              Read the architecture
              <ArrowRight size={17} strokeWidth={2.25} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
