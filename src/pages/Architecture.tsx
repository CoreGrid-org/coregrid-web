import Container from "../components/layout/Container";
import SectionHeading from "../components/ui/SectionHeading";
import SystemContextDiagram from "../components/diagrams/SystemContextDiagram";
import LifecycleStateDiagram from "../components/diagrams/LifecycleStateDiagram";
import Card from "../components/ui/Card";
import CodeBlock from "../components/ui/CodeBlock";
import Badge from "../components/ui/Badge";
import { Server, Database, ShieldCheck, Cpu, ArrowRight, Layers, FileCode2 } from "lucide-react";

export default function Architecture() {
  const apiEndpointSample = `// CoreGrid REST API Contracts (ASP.NET Core 8 Web API)

[Authorize(Policy = "AssetOfficerOnly")]
[HttpPost("api/v1/assets/{id}/evaluations")]
public async Task<IActionResult> EvaluateAssetDisposal(
    [FromRoute] string id,
    [FromBody] EvaluationRequestDto request)
{
    // 1. Fetch current asset state & audit log
    var asset = await _assetRepository.GetByIdAsync(id);
    if (asset.State != AssetLifecycleState.InService && 
        asset.State != AssetLifecycleState.UnderMaintenance)
    {
        return BadRequest(new { Error = "Asset must be InService to evaluate disposal." });
    }

    // 2. Invoke LangGraph 4-Agent Workflow Service
    var agentResult = await _agentServiceClient.RunDisposalGraphAsync(new AgentPayload {
        AssetId = asset.Id,
        Valuation = asset.CurrentValuation,
        MaintenanceCostTotal = asset.MaintenanceHistory.Sum(m => m.Cost),
        PolicyRuleSet = asset.DomainSchema.PolicyRules
    });

    // 3. Persist evaluation dossier & set state to PROPOSED_DISPOSAL
    asset.TransitionTo(AssetLifecycleState.ProposedDisposal, agentResult.AuditDossier);
    await _unitOfWork.SaveChangesAsync();

    return Ok(agentResult);
}`;

  return (
    <div className="py-12 md:py-20 bg-[var(--bg)]">
      <Container>
        {/* Page Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <Badge variant="accent">System Architecture Spec</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.1]">
            Decoupled 3-Tier Enterprise Architecture
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            CoreGrid is engineered as a clean, multi-tenant B2G platform separating core business domain rules (C# ASP.NET Core) from AI decision orchestration (Python LangGraph) and identity federation (Asgardeo OIDC).
          </p>
        </div>

        {/* Section 1: System Context Diagram */}
        <div className="space-y-6 mb-20">
          <SectionHeading
            eyebrow="Tier 1-3 Context"
            title="System Topology & Component Communication"
            description="All client requests interface through the ASP.NET Core REST API Gateway. AI graph execution is isolated in an asynchronous microservice."
          />
          <SystemContextDiagram />
        </div>

        {/* Section 2: Asset Lifecycle State Machine */}
        <div id="state-machine" className="space-y-6 mb-20 pt-10 border-t border-[var(--border)]">
          <SectionHeading
            eyebrow="State Machine Engine"
            title="Asset Lifecycle State Transitions"
            description="Strict state machine governing allowed operations and legal transitions. No asset can bypass intermediate compliance states."
          />
          <LifecycleStateDiagram />
        </div>

        {/* Section 3: Component Responsibilities Breakdown */}
        <div className="space-y-8 mb-20 pt-10 border-t border-[var(--border)]">
          <SectionHeading
            eyebrow="Responsibility Matrix"
            title="Core Service Responsibilities"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[var(--surface)] p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-base text-[var(--text-primary)]">
                    ASP.NET Core Web API
                  </h3>
                  <span className="text-xs font-mono text-[var(--text-muted)]">C# .NET 8 / EF Core</span>
                </div>
              </div>
              <ul className="space-y-2 text-xs text-[var(--text-secondary)] leading-relaxed list-disc list-inside">
                <li>Authoritative CRUD engine for asset registries and QR serial mappings</li>
                <li>State machine execution and transition lock enforcement</li>
                <li>RBAC permission authorization middleware using OAuth 2.0 JWT tokens</li>
                <li>Append-only audit log persistence with cryptographic hash chaining</li>
              </ul>
            </Card>

            <Card className="bg-[var(--surface)] p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-base text-[var(--text-primary)]">
                    LangGraph Agent Service
                  </h3>
                  <span className="text-xs font-mono text-[var(--text-muted)]">Python 3.11 / FastAPI</span>
                </div>
              </div>
              <ul className="space-y-2 text-xs text-[var(--text-secondary)] leading-relaxed list-disc list-inside">
                <li>4-Agent stateful graph execution (Planner, Maintenance, Budget, Policy)</li>
                <li>Human-in-the-loop state interrupts and sign-off payload assembly</li>
                <li>Deterministic policy assertion engine enforcing statutory thresholds</li>
                <li>Safe failure fallback handlers preventing unauthorized asset states</li>
              </ul>
            </Card>

            <Card className="bg-[var(--surface)] p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-base text-[var(--text-primary)]">
                    PostgreSQL JSONB Store
                  </h3>
                  <span className="text-xs font-mono text-[var(--text-muted)]">Relational + Schemaless JSON</span>
                </div>
              </div>
              <ul className="space-y-2 text-xs text-[var(--text-secondary)] leading-relaxed list-disc list-inside">
                <li>ACID-compliant storage for core asset ledger tables</li>
                <li>Dynamic JSONB columns for domain-specific custom attributes</li>
                <li>Partitioned audit log tables indexed for rapid compliance queries</li>
                <li>Row-level security (RLS) support for multi-agency tenant isolation</li>
              </ul>
            </Card>

            <Card className="bg-[var(--surface)] p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-base text-[var(--text-primary)]">
                    Asgardeo Identity Server
                  </h3>
                  <span className="text-xs font-mono text-[var(--text-muted)]">OpenID Connect / OAuth 2.0</span>
                </div>
              </div>
              <ul className="space-y-2 text-xs text-[var(--text-secondary)] leading-relaxed list-disc list-inside">
                <li>Enterprise Single Sign-On (SSO) and Multi-Factor Authentication (MFA)</li>
                <li>OpenID Connect discovery endpoint integration</li>
                <li>Token introspection and custom role claim mapping (Asset Officer, Auditor)</li>
                <li>Session revocation and centralized identity governance</li>
              </ul>
            </Card>
          </div>
        </div>

        {/* Section 4: API Contract Code Sample */}
        <div className="space-y-6 pt-10 border-t border-[var(--border)]">
          <SectionHeading
            eyebrow="REST API Specs"
            title="API Controller Implementation Sample"
            description="Exemplifying ASP.NET Core controller logic orchestrating the agentic evaluation microservice."
          />
          <CodeBlock
            code={apiEndpointSample}
            language="csharp"
            filename="AssetEvaluationController.cs"
            showLineNumbers={true}
          />
        </div>
      </Container>
    </div>
  );
}
