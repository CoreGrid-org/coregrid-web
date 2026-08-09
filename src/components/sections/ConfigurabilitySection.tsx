import { useState } from "react";
import Container from "../layout/Container";
import SectionHeading from "../ui/SectionHeading";
import Card from "../ui/Card";
import CodeBlock from "../ui/CodeBlock";
import Badge from "../ui/Badge";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Truck, Activity, TrainFront } from "lucide-react";

export default function ConfigurabilitySection() {
  const [activeDomain, setActiveDomain] = useState<"transport" | "healthcare" | "railway">("transport");

  const domainData = {
    transport: {
      name: "Public Transport Fleet",
      label: "Buses & Maintenance Vehicles",
      icon: <Truck className="w-4 h-4" />,
      attributes: ["engine_capacity_cc", "odometer_reading_km", "emissions_euro_rating", "next_inspection_date"],
      schemaSnippet: `{
  "domain": "transport_fleet",
  "asset_type": "heavy_bus",
  "custom_attributes": {
    "odometer_reading_km": { "type": "number", "required": true },
    "emissions_euro_rating": { "type": "string", "enum": ["EURO_5", "EURO_6"] },
    "chassis_number": { "type": "string", "pattern": "^[A-Z0-9]{17}$" }
  }
}`,
    },
    healthcare: {
      name: "Hospital Biomedical Equipment",
      label: "MRI, Ventilators & Dialysis",
      icon: <Activity className="w-4 h-4" />,
      attributes: ["calibration_due_date", "biosafety_level", "radiation_shield_status", "iso_cert_no"],
      schemaSnippet: `{
  "domain": "healthcare_biomedical",
  "asset_type": "mri_scanner",
  "custom_attributes": {
    "calibration_due_date": { "type": "date", "required": true },
    "helium_level_percent": { "type": "number", "min": 0, "max": 100 },
    "iso_cert_no": { "type": "string", "required": true }
  }
}`,
    },
    railway: {
      name: "Railway Rolling Stock",
      label: "Locomotives & Signals",
      icon: <TrainFront className="w-4 h-4" />,
      attributes: ["axle_load_tons", "gauge_type", "braking_system_type", "track_mileage_km"],
      schemaSnippet: `{
  "domain": "railway_infrastructure",
  "asset_type": "diesel_locomotive",
  "custom_attributes": {
    "axle_load_tons": { "type": "number", "required": true },
    "gauge_type": { "type": "string", "enum": ["BROAD", "STANDARD", "NARROW"] },
    "signaling_compatibility": { "type": "array", "items": "string" }
  }
}`,
    },
  };

  const current = domainData[activeDomain];

  return (
    <section className="py-20 md:py-28 border-b border-[var(--border)] bg-[var(--bg)]">
      <Container>
        <SectionHeading
          eyebrow="Configurable Platform Model"
          title="One core platform codebase. Unlimited public sector domain schemas."
          description="Adapt CoreGrid to any government authority without altering C# source code. Custom asset types, attributes, validation rules, and lifecycle thresholds are stored in PostgreSQL JSONB schema definition tables."
        />

        {/* Domain Selection Chips */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {(["transport", "healthcare", "railway"] as const).map((key) => (
            <button
              key={key}
              onClick={() => setActiveDomain(key)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border font-mono text-xs font-medium transition-all ${
                activeDomain === key
                  ? "bg-[var(--accent)] text-white border-[var(--accent)] shadow-xs"
                  : "bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--text-muted)]"
              }`}
            >
              {domainData[key].icon}
              <span>{domainData[key].label}</span>
            </button>
          ))}
        </div>

        {/* Schema Showcase Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Description */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <Badge variant="accent">{current.name}</Badge>
              <h3 className="text-2xl font-semibold text-[var(--text-primary)] tracking-tight">
                Dynamic Schema Injection
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Notice how the schema automatically injects domain-specific validation constraints (e.g. VIN regex, Euro emission standards, or bio-calibration dates) directly into the API payload validator.
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <span className="text-[var(--text-muted)] uppercase tracking-wider block text-[10px]">
                Injected Attribute Tokens
              </span>
              <div className="flex flex-wrap gap-2">
                {current.attributes.map((attr) => (
                  <span
                    key={attr}
                    className="px-2.5 py-1 rounded bg-[var(--bg-subtle)] border border-[var(--border)] text-[var(--text-primary)] flex items-center gap-1.5"
                  >
                    <Check className="w-3 h-3 text-emerald-500" />
                    <code>{attr}</code>
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border)]">
              <Link
                to="/platform"
                className="text-xs font-mono font-medium text-[var(--accent)] hover:underline flex items-center gap-1"
              >
                <span>Read Platform Schema Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right JSON Code View */}
          <div className="lg:col-span-7">
            <CodeBlock
              code={current.schemaSnippet}
              language="json"
              filename={`${activeDomain}_schema_definition.json`}
              showLineNumbers={true}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
