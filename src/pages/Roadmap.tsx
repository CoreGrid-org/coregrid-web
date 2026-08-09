import Container from "../components/layout/Container";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import { CheckCircle2, Clock, Sparkles, Network, ShoppingCart, WifiOff, ArrowRight } from "lucide-react";

export default function Roadmap() {
  const roadmapItems = [
    {
      version: "v1.0 Release",
      title: "Core Platform & 4-Agent LangGraph Engine",
      status: "COMPLETED",
      badgeVariant: "success" as const,
      date: "Q3 2026",
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
      features: [
        "ASP.NET Core REST API Gateway with OAuth 2.0 / OIDC Asgardeo middleware",
        "4-Agent stateful LangGraph workflow (Planner, Maintenance, Budget, Policy)",
        "PostgreSQL JSONB multi-domain schema engine for transport, healthcare, railway",
        "Append-only cryptographically hashed statutory audit trail",
        "Human-in-the-Loop (HITL) disposal sign-off interrupt protocol",
      ],
    },
    {
      version: "v1.1 Enhancement",
      title: "AI Predictive Maintenance Modeling (SRS §17.1)",
      status: "IN_DEVELOPMENT",
      badgeVariant: "warning" as const,
      date: "Q4 2026",
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      features: [
        "Time-series failure prediction using historical telemetry curves & MTBF data",
        "Automated workorder generation based on remaining useful life (RUL) threshold breaches",
        "Integration with IoT sensor gateways for real-time asset vibration & temperature tracking",
      ],
    },
    {
      version: "v1.2 Enhancement",
      title: "Cross-Agency Registry Synchronization (SRS §17.2)",
      status: "PLANNED",
      badgeVariant: "accent" as const,
      date: "Q1 2027",
      icon: <Network className="w-5 h-5 text-[var(--accent)]" />,
      features: [
        "Federated inter-ministry ledger sync protocol over secure gRPC channels",
        "Automated inter-agency asset transfer clearance with dual-signature statutory validation",
        "National public asset register reporting dashboard for central treasury compliance",
      ],
    },
    {
      version: "v1.3 Enhancement",
      title: "Automated Procurement & Auction Bridge (SRS §17.3)",
      status: "PLANNED",
      badgeVariant: "mono" as const,
      date: "Q2 2027",
      icon: <ShoppingCart className="w-5 h-5 text-[var(--text-muted)]" />,
      features: [
        "Direct integration with government e-procurement portals for replacement ordering",
        "Automated public auction dossier generation for approved asset disposals",
        "Salvage value bidding integration with statutory reserve price verification",
      ],
    },
    {
      version: "v2.0 Milestone",
      title: "Mobile Offline Cryptographic Sync (SRS §17.4)",
      status: "PROPOSED",
      badgeVariant: "mono" as const,
      date: "Q3 2027",
      icon: <WifiOff className="w-5 h-5 text-[var(--text-muted)]" />,
      features: [
        "Field mobile app (Flutter) offline QR audit scanning with zero-connectivity local SQLite storage",
        "Asymmetric key cryptographic signature chaining for offline inspection logs",
        "Conflict-free replicated data type (CRDT) merge protocol on reconnect",
      ],
    },
  ];

  return (
    <div className="py-12 md:py-20 bg-[var(--bg)]">
      <Container>
        {/* Page Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <Badge variant="accent">SRS §17 Project Roadmap</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.1]">
            Future Enhancements & Strategic Roadmap
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            Outlining planned milestone releases and functional enhancements specified in SRS §17 for future CoreGrid platform iterations.
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative border-l border-[var(--border)] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12 mb-20">
          {roadmapItems.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Bullet */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 p-1 rounded-full bg-[var(--surface)] border border-[var(--border)] shadow-xs">
                {item.icon}
              </div>

              {/* Card */}
              <Card className="bg-[var(--surface)] p-6 space-y-4 hover:border-[var(--text-muted)] transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--border)]">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-semibold text-[var(--accent)]">
                      {item.version}
                    </span>
                    <Badge variant={item.badgeVariant}>{item.status}</Badge>
                  </div>
                  <span className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Target: {item.date}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-[var(--text-primary)] tracking-tight">
                  {item.title}
                </h3>

                <ul className="space-y-2 text-xs text-[var(--text-secondary)] leading-relaxed">
                  {item.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <ArrowRight className="w-3.5 h-3.5 text-[var(--accent)] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
