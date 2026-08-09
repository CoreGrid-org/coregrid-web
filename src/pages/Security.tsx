import Container from "../components/layout/Container";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import CodeBlock from "../components/ui/CodeBlock";
import Badge from "../components/ui/Badge";
import { KeyRound, ShieldCheck, FileLock, UserCheck, Lock, Check, X } from "lucide-react";

export default function Security() {
  const auditPayloadSample = `// CoreGrid Append-Only Audit Trail Ledger Record Structure

{
  "audit_event_id": "EVT-2026-0809-4921",
  "timestamp_utc": "2026-08-09T04:15:30.492Z",
  "asset_id": "AST-2026-8942",
  "tenant_org_id": "GOV-SL-MINISTRY-ROADS",
  "actor": {
    "user_id": "usr_94201_asgardeo",
    "role": "ASSET_OFFICER",
    "email": "h.erandika@roads.gov.lk",
    "ip_address": "192.248.12.44"
  },
  "event_type": "ASSET_STATE_TRANSITION",
  "transition": {
    "from_state": "IN_SERVICE",
    "to_state": "PROPOSED_DISPOSAL"
  },
  "agent_graph_execution": {
    "langgraph_run_id": "run_09214_disposal",
    "policy_agent_evaluation": "PASSED",
    "confidence_score": 0.984
  },
  "previous_event_hash": "sha256:8f92a1...",
  "event_hash": "sha256:4b20e9a11f84...",
  "signature": "RSA_2048_PUB_KEY_SIGNATURE_OK"
}`;

  const rbacMatrix = [
    {
      role: "System Administrator",
      scope: "admin:all",
      registerAsset: true,
      updateSchema: true,
      triggerEvaluation: true,
      approveDisposal: false,
      exportAuditLog: true,
    },
    {
      role: "Asset Officer",
      scope: "asset:write",
      registerAsset: true,
      updateSchema: false,
      triggerEvaluation: true,
      approveDisposal: false,
      exportAuditLog: true,
    },
    {
      role: "Board of Survey Officer",
      scope: "approval:execute",
      registerAsset: false,
      updateSchema: false,
      triggerEvaluation: false,
      approveDisposal: true,
      exportAuditLog: true,
    },
    {
      role: "Parliamentary Auditor",
      scope: "audit:read_only",
      registerAsset: false,
      updateSchema: false,
      triggerEvaluation: false,
      approveDisposal: false,
      exportAuditLog: true,
    },
  ];

  return (
    <div className="py-12 md:py-20 bg-[var(--bg)]">
      <Container>
        {/* Page Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <Badge variant="accent">Identity & Governance Posture</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.1]">
            Security, OIDC & Audit Architecture
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            Institutional asset registries mandate zero-trust identity authentication, strict separation of duties through granular RBAC, and cryptographically verified audit trails.
          </p>
        </div>

        {/* Section 1: Asgardeo OIDC Integration */}
        <div className="space-y-6 mb-20">
          <SectionHeading
            eyebrow="Identity Federation"
            title="Asgardeo & Enterprise OAuth 2.0 / OIDC Authentication"
            description="CoreGrid delegates user identity verification entirely to Asgardeo Identity Server or any OpenID Connect compliant identity provider."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-[var(--surface)] p-6 space-y-3">
              <KeyRound className="w-6 h-6 text-[var(--accent)]" />
              <h3 className="font-semibold text-base text-[var(--text-primary)]">
                PKCE OAuth Authorization
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Single Page Applications authenticate using Authorization Code Flow with Proof Key for Code Exchange (PKCE), eliminating exposed client secrets.
              </p>
            </Card>

            <Card className="bg-[var(--surface)] p-6 space-y-3">
              <ShieldCheck className="w-6 h-6 text-emerald-500" />
              <h3 className="font-semibold text-base text-[var(--text-primary)]">
                JWT Bearer Validation
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                ASP.NET Core API validates incoming OAuth 2.0 JWT access tokens via Asgardeo JWKS public key endpoints on every request.
              </p>
            </Card>

            <Card className="bg-[var(--surface)] p-6 space-y-3">
              <UserCheck className="w-6 h-6 text-[var(--accent)]" />
              <h3 className="font-semibold text-base text-[var(--text-primary)]">
                Role Claim Injection
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                User group memberships in Asgardeo map directly to ASP.NET Core authorization policies (`AssetOfficerOnly`, `AuditorReadOnly`).
              </p>
            </Card>
          </div>
        </div>

        {/* Section 2: RBAC Matrix */}
        <div className="space-y-6 mb-20 pt-10 border-t border-[var(--border)]">
          <SectionHeading
            eyebrow="Authorization Controls"
            title="Role-Based Access Control (RBAC) Permission Matrix"
            description="Strict separation of duties prevents single-user authorization override during asset disposal or transfer."
          />

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-[var(--border)] bg-[var(--surface)] rounded-lg text-xs font-mono">
              <thead>
                <tr className="bg-[var(--bg-subtle)] border-b border-[var(--border)] text-[var(--text-primary)]">
                  <th className="p-3 font-semibold">User Role</th>
                  <th className="p-3 font-semibold">OAuth Scope</th>
                  <th className="p-3 font-semibold text-center">Register Asset</th>
                  <th className="p-3 font-semibold text-center">Update Schema</th>
                  <th className="p-3 font-semibold text-center">Trigger AI Eval</th>
                  <th className="p-3 font-semibold text-center">Approve Disposal</th>
                  <th className="p-3 font-semibold text-center">Export Audit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)] text-[var(--text-secondary)]">
                {rbacMatrix.map((row) => (
                  <tr key={row.role} className="hover:bg-[var(--bg-subtle)]">
                    <td className="p-3 font-semibold text-[var(--text-primary)]">{row.role}</td>
                    <td className="p-3 text-[var(--accent)]">{row.scope}</td>
                    <td className="p-3 text-center">
                      {row.registerAsset ? <Check className="w-4 h-4 text-emerald-500 mx-auto" /> : <X className="w-4 h-4 text-gray-400 mx-auto" />}
                    </td>
                    <td className="p-3 text-center">
                      {row.updateSchema ? <Check className="w-4 h-4 text-emerald-500 mx-auto" /> : <X className="w-4 h-4 text-gray-400 mx-auto" />}
                    </td>
                    <td className="p-3 text-center">
                      {row.triggerEvaluation ? <Check className="w-4 h-4 text-emerald-500 mx-auto" /> : <X className="w-4 h-4 text-gray-400 mx-auto" />}
                    </td>
                    <td className="p-3 text-center">
                      {row.approveDisposal ? <Check className="w-4 h-4 text-emerald-500 mx-auto font-bold" /> : <X className="w-4 h-4 text-rose-500/70 mx-auto" />}
                    </td>
                    <td className="p-3 text-center">
                      {row.exportAuditLog ? <Check className="w-4 h-4 text-emerald-500 mx-auto" /> : <X className="w-4 h-4 text-gray-400 mx-auto" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Immutable Audit Log Structure */}
        <div className="space-y-6 pt-10 border-t border-[var(--border)]">
          <SectionHeading
            eyebrow="Audit Trail Spec"
            title="Tamper-Evident Immutable Audit Event Record"
            description="Every state change includes previous hash chaining, user identity claims, and cryptographic signatures."
          />
          <CodeBlock
            code={auditPayloadSample}
            language="json"
            filename="audit_event_record.json"
            showLineNumbers={true}
          />
        </div>
      </Container>
    </div>
  );
}
