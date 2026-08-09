import { Link } from "react-router-dom";
import Container from "../layout/Container";
import SectionHeading from "../ui/SectionHeading";
import SystemContextDiagram from "../diagrams/SystemContextDiagram";
import { ArrowRight } from "lucide-react";
import Button from "../ui/Button";

export default function ArchitectureDiagram() {
  return (
    <section className="py-20 md:py-28 border-b border-[var(--border)] bg-[var(--bg-subtle)]">
      <Container>
        <SectionHeading
          eyebrow="System Context"
          title="Decoupled 3-tier enterprise architecture built for high availability and zero vendor lock-in."
          description="Combining ASP.NET Core for high-performance REST APIs, Python/FastAPI for AI graph orchestration, and PostgreSQL for ACID-compliant JSONB asset storage."
        />

        <div className="mt-8">
          <SystemContextDiagram />
        </div>

        <div className="mt-8 flex justify-center">
          <Button to="/architecture" variant="outline" size="md">
            <span>Explore Full Architecture & State Machine Specs</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
