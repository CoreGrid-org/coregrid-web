import { useState } from "react";
import Container from "../components/layout/Container";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import CodeBlock from "../components/ui/CodeBlock";
import Badge from "../components/ui/Badge";
import { Sliders, Database, Layers, Check, FileJson, ArrowRight, Truck, Activity, TrainFront, GraduationCap } from "lucide-react";

export default function Platform() {
  const [selectedDomain, setSelectedDomain] = useState<string>("transport");

  const domains = [
    {
      id: "transport",
      name: "Public Transport Authority",
      icon: <Truck className="w-5 h-5 text-[var(--accent)]" />,
      description: "Fleet asset management for heavy buses, electric shuttles, and depot maintenance equipment.",
      jsonSchema: `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "domain": "public_transport",
  "asset_types": {
    "electric_bus": {
      "display_name": "Electric Transit Bus",
      "custom_fields": {
        "battery_capacity_kwh": { "type": "number", "minimum": 50, "required": true },
        "charging_connector_standard": { "type": "string", "enum": ["CCS2", "GB/T", "Pantograph"] },
        "depot_assigned_id": { "type": "string", "pattern": "^DEP-[0-9]{3}$" }
      }
    }
  }
}`,
    },
    {
      id: "healthcare",
      name: "Ministry of Health & Biomedical",
      icon: <Activity className="w-5 h-5 text-[var(--accent)]" />,
      description: "Biomedical equipment tracking across national hospitals with strict ISO calibration schedules.",
      jsonSchema: `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "domain": "biomedical_healthcare",
  "asset_types": {
    "ventilator_icui": {
      "display_name": "ICU Mechanical Ventilator",
      "custom_fields": {
        "biosafety_level": { "type": "string", "enum": ["BSL-1", "BSL-2", "BSL-3"] },
        "last_calibration_date": { "type": "string", "format": "date", "required": true },
        "oxygen_sensor_hours": { "type": "number", "maximum": 5000 }
      }
    }
  }
}`,
    },
    {
      id: "railway",
      name: "National Railway Corporation",
      icon: <TrainFront className="w-5 h-5 text-[var(--accent)]" />,
      description: "Rolling stock locomotives, track maintenance machinery, and signaling relay units.",
      jsonSchema: `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "domain": "railway_infrastructure",
  "asset_types": {
    "diesel_locomotive": {
      "display_name": "Heavy Freight Locomotive",
      "custom_fields": {
        "axle_load_rating_tons": { "type": "number", "required": true },
        "bogie_inspection_due": { "type": "string", "format": "date" },
        "etcs_signaling_level": { "type": "string", "enum": ["LEVEL_1", "LEVEL_2", "LEVEL_3"] }
      }
    }
  }
}`,
    },
    {
      id: "education",
      name: "Department of Education & IT",
      icon: <GraduationCap className="w-5 h-5 text-[var(--accent)]" />,
      description: "School IT infrastructure, laboratory equipment, and digital learning devices.",
      jsonSchema: `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "domain": "education_technology",
  "asset_types": {
    "student_laptop_bundle": {
      "display_name": "Student Chromebook / Laptop",
      "custom_fields": {
        "mac_address": { "type": "string", "pattern": "^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$" },
        "os_version": { "type": "string" },
        "school_district_code": { "type": "string", "required": true }
      }
    }
  }
}`,
    },
  ];

  const active = domains.find((d) => d.id === selectedDomain) || domains[0];

  return (
    <div className="py-12 md:py-20 bg-[var(--bg)]">
      <Container>
        {/* Page Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <Badge variant="accent">Configurable Platform Engine</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.1]">
            Multi-Domain Schema Architecture
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            Public sector agencies operate vastly different physical assets. CoreGrid avoids rigid database columns by storing domain schemas in PostgreSQL JSONB tables, enabling instant customization without backend code modifications.
          </p>
        </div>

        {/* Domain Selector & Interactive Visualizer */}
        <div className="space-y-6 mb-20">
          <SectionHeading
            eyebrow="Schema Visualizer"
            title="Select a Domain Profile to Inspect Its Dynamic JSON Schema"
          />

          {/* Selector Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {domains.map((dom) => (
              <button
                key={dom.id}
                onClick={() => setSelectedDomain(dom.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedDomain === dom.id
                    ? "bg-[var(--accent-soft)] border-[var(--accent)] shadow-xs scale-102"
                    : "bg-[var(--surface)] border-[var(--border)] hover:border-[var(--text-muted)]"
                }`}
              >
                <div className="mb-3 p-2 rounded-md bg-[var(--bg-subtle)] border border-[var(--border)] w-fit">
                  {dom.icon}
                </div>
                <div className="font-semibold text-sm text-[var(--text-primary)] leading-tight">
                  {dom.name}
                </div>
                <div className="text-xs font-mono text-[var(--text-muted)] mt-1">
                  ID: {dom.id}
                </div>
              </button>
            ))}
          </div>

          {/* Active Domain Code & Details */}
          <Card className="bg-[var(--surface)] p-6 space-y-6 mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
              <div>
                <span className="text-xs font-mono text-[var(--accent)] uppercase font-semibold">Active Domain</span>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] flex items-center gap-2">
                  <span>{active.icon}</span>
                  <span>{active.name}</span>
                </h3>
              </div>
              <Badge variant="mono">PostgreSQL JSONB Engine</Badge>
            </div>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {active.description}
            </p>

            <CodeBlock
              code={active.jsonSchema}
              language="json"
              filename={`${active.id}_domain_schema.json`}
              showLineNumbers={true}
            />
          </Card>
        </div>

        {/* Architectural Principles */}
        <div className="space-y-6 pt-10 border-t border-[var(--border)]">
          <SectionHeading
            eyebrow="Configuration vs Code Mutation"
            title="Why Dynamic JSON Schemas Matter for B2G Procurement"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-[var(--surface)] p-6 space-y-3">
              <Sliders className="w-6 h-6 text-[var(--accent)]" />
              <h3 className="font-semibold text-base text-[var(--text-primary)]">
                Zero Code Re-compilation
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Add new asset types, attributes, or validation regexes via administrative REST APIs without redeploying the C# backend.
              </p>
            </Card>

            <Card className="bg-[var(--surface)] p-6 space-y-3">
              <Database className="w-6 h-6 text-[var(--accent)]" />
              <h3 className="font-semibold text-base text-[var(--text-primary)]">
                PostgreSQL GIN Indexing
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Custom attributes stored inside JSONB columns are indexed using PostgreSQL GIN indexes, ensuring sub-10ms query times over millions of records.
              </p>
            </Card>

            <Card className="bg-[var(--surface)] p-6 space-y-3">
              <Layers className="w-6 h-6 text-[var(--accent)]" />
              <h3 className="font-semibold text-base text-[var(--text-primary)]">
                Multi-Tenant Domain Isolation
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Each government ministry or municipal authority retains strict isolation over its asset schemas and custom statutory rule definitions.
              </p>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
