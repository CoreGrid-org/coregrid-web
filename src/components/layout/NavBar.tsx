import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Layers, Star } from "lucide-react";
import GithubIcon from "../ui/GithubIcon";
import ThemeToggle from "./ThemeToggle";
import Container from "./Container";

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Product", path: "/" },
    { name: "Architecture", path: "/architecture" },
    { name: "Agentic AI", path: "/agentic-ai" },
    { name: "Platform", path: "/platform" },
    { name: "Security", path: "/security" },
    { name: "Docs", path: "/docs" },
    { name: "Team", path: "/team" },
    { name: "Roadmap", path: "/roadmap" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 border-b ${
        scrolled
          ? "bg-[var(--bg)]/85 backdrop-blur-md border-[var(--border)] shadow-xs"
          : "bg-[var(--bg)] border-transparent"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-[var(--accent)] rounded-md p-1"
          >
            <img src="/CoreGrid.png" alt="CoreGrid Logo" className="w-8 h-8 rounded-md object-contain transition-transform group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="font-semibold tracking-tight text-base text-[var(--text-primary)] font-mono leading-none">
                CoreGrid
              </span>
              <span className="text-[10px] font-mono text-[var(--text-muted)] tracking-wider uppercase">
                Public Sector Platform
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    isActive
                      ? "text-[var(--accent)] bg-[var(--accent-soft)] font-semibold dark:text-blue-300"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Actions & Controls */}
          <div className="hidden lg:flex items-center gap-3">
            {/* GitHub Star Badge */}
            <a
              href="https://github.com/CoreGrid-org/coregrid-web"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[var(--border)] bg-[var(--surface)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-muted)] transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Star</span>
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[var(--bg-subtle)] border border-[var(--border)] text-[10px] text-[var(--text-muted)] font-semibold">
                <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                128
              </span>
            </a>

            <ThemeToggle />
          </div>

          {/* Mobile menu toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[var(--border)] bg-[var(--surface)] animate-in fade-in duration-150">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? "text-[var(--accent)] bg-[var(--accent-soft)] font-semibold dark:text-blue-300"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-3 mt-2 border-t border-[var(--border)] px-4">
                <a
                  href="https://github.com/CoreGrid-org/coregrid-web"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2 rounded-md border border-[var(--border)] bg-[var(--bg-subtle)] text-xs font-mono text-[var(--text-primary)]"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Star on GitHub (128 stars)</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
