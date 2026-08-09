import Container from "../layout/Container";
import Button from "../ui/Button";
import { ArrowRight } from "lucide-react";
import GithubIcon from "../ui/GithubIcon";

export default function CTABand() {
  return (
    <section className="py-20 md:py-24 bg-[var(--bg-subtle)] border-b border-[var(--border)]">
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
            Explore the CoreGrid architecture.
          </h2>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed">
            Review the technical specifications, statutory policy verification engine, and 4-agent graph state machine.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              href="https://github.com/CoreGrid-org/coregrid-web"
              variant="primary"
              size="lg"
            >
              <GithubIcon className="w-4 h-4" />
              <span>View on GitHub</span>
            </Button>
            <Button
              to="/architecture"
              variant="outline"
              size="lg"
            >
              <span>Read Architecture Deep-Dive</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
