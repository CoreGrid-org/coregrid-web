import { ReactNode } from "react";

export interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "accent" | "success" | "warning" | "critical" | "mono";
  size?: "sm" | "md";
  className?: string;
}

export default function Badge({ children, variant = "default", size = "sm", className = "" }: BadgeProps) {
  const baseStyles = "inline-flex items-center font-mono font-medium rounded-full border transition-colors";
  
  const variants = {
    default: "bg-[var(--bg-subtle)] text-[var(--text-secondary)] border-[var(--border)]",
    accent: "bg-[var(--accent-soft)] text-[var(--accent)] border-[var(--accent)]/20 dark:text-blue-300",
    success: "bg-emerald-500/10 text-[var(--success)] border-emerald-500/20",
    warning: "bg-amber-500/10 text-[var(--warning)] border-amber-500/20",
    critical: "bg-rose-500/10 text-[var(--critical)] border-rose-500/20",
    mono: "bg-[var(--surface)] text-[var(--text-primary)] border-[var(--border)] font-mono",
  };

  const sizes = {
    sm: "px-2.5 py-0.5 text-xs",
    md: "px-3 py-1 text-xs",
  };

  return <span className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>{children}</span>;
}
