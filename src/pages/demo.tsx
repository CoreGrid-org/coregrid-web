import React from 'react';
import Layout from '@theme/Layout';
import {ArrowRight} from 'lucide-react';
import PageHeader from '@site/src/components/PageHeader';
import SeoHead from '@site/src/components/SeoHead';
import styles from './demo.module.css';

const DEMO_URL = 'https://demo-coregrid.vercel.app';
const DEMO_PASSWORD = 'Login@123456';

const accounts = [
  {email: 'admin@coregrid.test', role: 'Administrator', client: 'Web', tryThis: 'Users & roles, configuration, approving AI recommendations'},
  {email: 'officer@coregrid.test', role: 'Inventory Officer', client: 'Web and mobile', tryThis: 'Registering assets, maintenance, transfers, starting an AI evaluation'},
  {email: 'auditor@coregrid.test', role: 'Auditor', client: 'Web', tryThis: 'Verification campaigns, discrepancies, the audit log, reports'},
  {email: 'staff@coregrid.test', role: 'Department Staff', client: 'Mobile only', tryThis: 'Fault reports and verification tasks in the Flutter app'},
];

export default function Demo(): React.ReactElement {
  return (
    <Layout
      title="Live Demo"
      description="Try CoreGrid in your browser with a ready-made account for each role.">
      <SeoHead
        path="/demo"
        title="Live Demo"
        description="Try CoreGrid in your browser with a ready-made account for each role."
      />

      <PageHeader
        eyebrow="Live Demo"
        title="Try CoreGrid now"
        lead="A shared demo instance with one account per role. No sign-up and no request needed - open the app and sign in with any account below.">
        <div className={styles.actions}>
          <a className="cg-btn cg-btn--primary" href={DEMO_URL} target="_blank" rel="noopener noreferrer">
            Open the live demo
            <ArrowRight size={16} strokeWidth={2} />
          </a>
        </div>
      </PageHeader>

      <section className="cg-section cg-section--tight">
        <div className="cg-container">
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Account</th>
                  <th scope="col">Role</th>
                  <th scope="col">Use it on</th>
                  <th scope="col">Try</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account) => (
                  <tr key={account.email}>
                    <th scope="row"><code>{account.email}</code></th>
                    <td>{account.role}</td>
                    <td>{account.client}</td>
                    <td>{account.tryThis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={styles.password}>
            Password for every account: <code>{DEMO_PASSWORD}</code>
          </p>

          <ul className={styles.notes}>
            <li>The demo runs on free hosting that sleeps when idle. The first sign-in after a quiet spell can take about a minute.</li>
            <li>Everyone shares the same demo data, so please don&apos;t enter anything personal or confidential.</li>
            <li>The Staff account has no web access by design; it is for the Android app.</li>
          </ul>
        </div>
      </section>
    </Layout>
  );
}
