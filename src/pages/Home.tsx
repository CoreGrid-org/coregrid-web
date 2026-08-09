import Hero from "../components/sections/Hero";
import ProblemStatement from "../components/sections/ProblemStatement";
import BentoFeatureGrid from "../components/sections/BentoFeatureGrid";
import AgenticWorkflowDiagram from "../components/sections/AgenticWorkflowDiagram";
import ArchitectureDiagram from "../components/sections/ArchitectureDiagram";
import ConfigurabilitySection from "../components/sections/ConfigurabilitySection";
import SecurityTrustRow from "../components/sections/SecurityTrustRow";
import OpenSourceStats from "../components/sections/OpenSourceStats";

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemStatement />
      <BentoFeatureGrid />
      <AgenticWorkflowDiagram />
      <ArchitectureDiagram />
      <ConfigurabilitySection />
      <SecurityTrustRow />
      <OpenSourceStats />
    </>
  );
}
