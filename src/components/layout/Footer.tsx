import { Link } from "react-router-dom";
import { Layers, Shield, Terminal } from "lucide-react";
import GithubIcon from "../ui/GithubIcon";
import Container from "./Container";
import Badge from "../ui/Badge";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--text-secondary)] text-xs pt-16 pb-12 transition-colors">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-[var(--border)]">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <img src="/CoreGrid.png" alt="CoreGrid Logo" className="w-6 h-6 object-contain" />
              <span className="font-semibold tracking-tight text-sm text-[var(--text-primary)] font-mono">
                CoreGrid
              </span>
              <Badge variant="accent" size="sm">
                Apache 2.0
              </Badge>
            </div>
            <p className="text-xs text-[var(--text-secondary)] max-w-sm leading-relaxed">
              An open-source, multi-tenant asset lifecycle management platform engineered for government agencies, state enterprises, and public institutions requiring deterministic policy verification and human-approved AI automation.
            </p>
            <div className="pt-2 text-[11px] font-mono text-[var(--text-muted)]">
              Built for <span className="text-[var(--text-primary)] font-medium">SE3090 — Public Sector Enterprise Architecture</span>
            </div>
          </div>

          {/* Col 1: Product */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--text-primary)] font-semibold">
              Product
            </h4>
            <ul className="space-y-2 font-medium">
              <li>
                <Link to="/" className="hover:text-[var(--text-primary)] transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link to="/platform" className="hover:text-[var(--text-primary)] transition-colors">
                  Configurable Schema
                </Link>
              </li>
              <li>
                <Link to="/agentic-ai" className="hover:text-[var(--text-primary)] transition-colors">
                  4-Agent Graph
                </Link>
              </li>
              <li>
                <Link to="/security" className="hover:text-[var(--text-primary)] transition-colors">
                  Identity & RBAC
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Architecture */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--text-primary)] font-semibold">
              Architecture
            </h4>
            <ul className="space-y-2 font-medium">
              <li>
                <Link to="/architecture" className="hover:text-[var(--text-primary)] transition-colors">
                  System Context
                </Link>
              </li>
              <li>
                <Link to="/architecture#state-machine" className="hover:text-[var(--text-primary)] transition-colors">
                  State Machine
                </Link>
              </li>
              <li>
                <Link to="/docs" className="hover:text-[var(--text-primary)] transition-colors">
                  API Specifications
                </Link>
              </li>
              <li>
                <Link to="/roadmap" className="hover:text-[var(--text-primary)] transition-colors">
                  Project Roadmap
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources & Repo */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--text-primary)] font-semibold">
              Open Source
            </h4>
            <ul className="space-y-2 font-medium">
              <li>
                <a
                  href="https://github.com/CoreGrid-org/coregrid-web"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-1.5"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              </li>
              <li>
                <Link to="/team" className="hover:text-[var(--text-primary)] transition-colors">
                  Contributors & Team
                </Link>
              </li>
              <li>
                <Link to="/docs" className="hover:text-[var(--text-primary)] transition-colors">
                  Documentation Hub
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[var(--text-muted)] font-mono">
          <div>
            © {new Date().getFullYear()} CoreGrid Platform Project. Released under Apache License 2.0.
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
              <span>Zero-Telemetry Architecture</span>
            </span>
            <span className="flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5 text-blue-500" />
              <span>B2G Ready</span>
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
