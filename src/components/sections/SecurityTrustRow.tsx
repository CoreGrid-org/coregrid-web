import Container from "../layout/Container";
import SectionHeading from "../ui/SectionHeading";
import Card from "../ui/Card";
import { KeyRound, ShieldAlert, FileText, UserCheck, Scale, Lock } from "lucide-react";
import { Link } from "react-router-dom";

export default function SecurityTrustRow() {
  const securityItems = [
    {
      title: "OIDC / OAuth 2.0 Federation",
      desc: "Native integration with Asgardeo, Keycloak, or Government SSO. PKCE authorization flow with JWT bearer tokens.",
      icon: <KeyRound className="w-5 h-5 text-[var(--accent)]" />,
    },
    {
      title: "Role-Based Access Control",
      desc: "Granular RBAC scope authorization enforcing separation of duties between Asset Officers, Auditors, and Board Members.",
      icon: <ShieldAlert className="w-5 h-5 text-[var(--accent)]" />,
    },
    {
      title: "Immutable Audit Trail",
      desc: "Cryptographically bound, append-only ledger for all asset state changes, AI reasoning outputs, and user overrides.",
      icon: <FileText className="w-5 h-5 text-[var(--accent)]" />,
    },
    {
      title: "Human-in-the-Loop Safeguard",
      desc: "AI agents cannot execute state transitions independently; disposal and high-value transfers require officer signatures.",
      icon: <UserCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    },
    {
      title: "Deterministic Statutory Rules",
      desc: "Policy validation rules compiled into deterministic code assertions. Zero AI hallucination risk in statutory checks.",
      icon: <Scale className="w-5 h-5 text-[var(--accent)]" />,
    },
  ];

  return (
    <section className="py-20 md:py-28 border-b border-[var(--border)] bg-[var(--bg-subtle)]">
      <Container>
        <SectionHeading
          eyebrow="Security & Governance Posture"
          title="Designed for statutory audit scrutiny and institutional security standards."
          description="B2G evaluators and public sector CTOs mandate strict identity federation, tamper-evident audit logs, and zero autonomous disposal authority."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-12">
          {securityItems.map((item, i) => (
            <Card key={i} className="bg-[var(--surface)] p-5 flex flex-col justify-between hover:border-[var(--text-muted)] transition-all">
              <div className="space-y-3">
                <div className="w-9 h-9 rounded-md bg-[var(--bg-subtle)] border border-[var(--border)] flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-sm text-[var(--text-primary)] leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/security"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[var(--accent)] hover:underline"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Read Complete Security & Identity Posture Specification →</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
