import Container from "../layout/Container";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { Scale, Star, ArrowRight, Layers } from "lucide-react";
import GithubIcon from "../ui/GithubIcon";

export default function OpenSourceStats() {
  return (
    <section className="py-20 md:py-28 border-b border-[var(--border)] bg-[var(--bg-subtle)]">
      <Container>
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <Badge variant="mono">Open Source B2G Architecture</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              Built in the open under the Apache 2.0 License.
            </h2>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
              Public sector software must be transparent, audit-ready, and free of vendor lock-in. CoreGrid is released openly so government IT departments can inspect, self-host, and customize the source code.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-5 text-center bg-[var(--surface)]">
              <div className="text-xs font-mono text-[var(--text-muted)] uppercase mb-1">License</div>
              <div className="text-lg font-mono font-semibold text-[var(--text-primary)] flex items-center justify-center gap-1">
                <Scale className="w-4 h-4 text-[var(--accent)]" />
                <span>Apache 2.0</span>
              </div>
              <div className="text-[10px] font-mono text-[var(--text-muted)] mt-1">Permissive B2G</div>
            </Card>

            <Card className="p-5 text-center bg-[var(--surface)]">
              <div className="text-xs font-mono text-[var(--text-muted)] uppercase mb-1">Repository</div>
              <div className="text-lg font-mono font-semibold text-[var(--text-primary)] flex items-center justify-center gap-1.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>128 Stars</span>
              </div>
              <div className="text-[10px] font-mono text-[var(--text-muted)] mt-1">GitHub Stars</div>
            </Card>

            <Card className="p-5 text-center bg-[var(--surface)]">
              <div className="text-xs font-mono text-[var(--text-muted)] uppercase mb-1">Course Project</div>
              <div className="text-lg font-mono font-semibold text-[var(--text-primary)]">
                SE3090
              </div>
              <div className="text-[10px] font-mono text-[var(--text-muted)] mt-1">Software Engineering</div>
            </Card>

            <Card className="p-5 text-center bg-[var(--surface)]">
              <div className="text-xs font-mono text-[var(--text-muted)] uppercase mb-1">Architecture</div>
              <div className="text-lg font-mono font-semibold text-[var(--text-primary)]">
                Static SPA
              </div>
              <div className="text-[10px] font-mono text-[var(--text-muted)] mt-1">Vite + React + TS</div>
            </Card>
          </div>

          {/* Action Callout Box */}
          <div className="p-8 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="space-y-1 text-center md:text-left">
              <div className="font-semibold text-base text-[var(--text-primary)] font-mono">
                CoreGrid-org / coregrid-web
              </div>
              <p className="text-xs text-[var(--text-secondary)]">
                Explore technical documentation, system context specifications, and 4-agent graph contracts.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Button
                href="https://github.com/CoreGrid-org/coregrid-web"
                variant="primary"
                size="md"
              >
                <GithubIcon className="w-4 h-4" />
                <span>View on GitHub</span>
              </Button>
              <Button
                to="/architecture"
                variant="outline"
                size="md"
              >
                <span>Read Architecture</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
