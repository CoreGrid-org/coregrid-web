import Container from "../components/layout/Container";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import { Users, ShieldCheck, GraduationCap, Code2, Scale } from "lucide-react";
import GithubIcon from "../components/ui/GithubIcon";

export default function Team() {
  const teamMembers = [
    {
      name: "CoreGrid Engineering Team",
      role: "System Architecture & Core Development",
      affiliation: "SE3090 Enterprise Software Engineering",
      bio: "Engineered CoreGrid as a full-stack, multi-tenant asset lifecycle management platform with 4-agent LangGraph AI and statutory compliance verification.",
      github: "https://github.com/CoreGrid-org",
      tags: ["ASP.NET Core", "LangGraph", "React", "PostgreSQL"],
    },
    {
      name: "Public Sector Architecture Group",
      role: "Domain Schema & Statutory Policy Advisors",
      affiliation: "Institutional B2G Working Group",
      bio: "Contributed statutory policy rule specifications, Board of Survey workflow guidelines, and dynamic JSON schema requirements for public transport and healthcare domains.",
      github: "https://github.com/CoreGrid-org",
      tags: ["Policy Engine", "B2G Auditing", "JSON Schema"],
    },
  ];

  return (
    <div className="py-12 md:py-20 bg-[var(--bg)]">
      <Container>
        {/* Page Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <Badge variant="accent">Project Team & Governance</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.1]">
            Contributors & Project Governance
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            CoreGrid is built as an open-source project for public sector asset lifecycle management as part of the SE3090 Software Engineering specialization.
          </p>
        </div>

        {/* Course / Project Attribution Banner */}
        <Card className="bg-[var(--surface)] p-8 mb-16 border-[var(--accent)]/30 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                SE3090 — Software Engineering Showcase Project
              </h2>
              <p className="text-xs font-mono text-[var(--text-muted)]">
                Public Sector Enterprise Architecture & Agentic AI Systems
              </p>
            </div>
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            This repository (<code className="text-[var(--accent)] font-mono">coregrid-web</code>) serves as the official static showcase and technical documentation portal for the CoreGrid platform architecture.
          </p>
        </Card>

        {/* Team Members Grid */}
        <div className="space-y-6 mb-20">
          <SectionHeading
            eyebrow="Contributors"
            title="Maintainers & Engineering Roles"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamMembers.map((member, i) => (
              <Card key={i} className="bg-[var(--surface)] p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                      {member.name}
                    </h3>
                    <div className="text-xs font-mono text-[var(--accent)] mt-0.5">
                      {member.role}
                    </div>
                  </div>
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded bg-[var(--bg-subtle)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                </div>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {member.bio}
                </p>

                <div className="pt-3 border-t border-[var(--border)] flex flex-wrap gap-1.5 font-mono text-[10px]">
                  {member.tags.map((tg) => (
                    <span key={tg} className="px-2 py-0.5 rounded bg-[var(--bg-subtle)] border border-[var(--border)] text-[var(--text-muted)]">
                      {tg}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Governance & Open Source License */}
        <div className="space-y-6 pt-10 border-t border-[var(--border)]">
          <SectionHeading
            eyebrow="Open Source License"
            title="Apache License 2.0 Governance"
            description="CoreGrid is released permissively to allow public sector IT teams, research institutions, and enterprise integrators to self-host and extend the codebase."
          />

          <Card className="bg-[var(--surface)] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-3">
              <Scale className="w-5 h-5 text-[var(--accent)]" />
              <div>
                <div className="font-semibold text-[var(--text-primary)]">Apache License 2.0</div>
                <div className="text-[var(--text-muted)]">Commercial use, modification, distribution, and private use allowed.</div>
              </div>
            </div>
            <a
              href="https://github.com/CoreGrid-org/coregrid-web/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded bg-[var(--bg-subtle)] border border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--text-muted)] shrink-0"
            >
              View License File →
            </a>
          </Card>
        </div>
      </Container>
    </div>
  );
}
