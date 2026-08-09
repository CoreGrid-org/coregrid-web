import { ReactNode } from "react";

export interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  padded?: boolean;
}

export default function Card({ children, className = "", hoverable = false, padded = true }: CardProps) {
  const hoverStyles = hoverable
    ? "transition-all duration-150 hover:border-[var(--text-muted)] hover:shadow-xs"
    : "";
  const paddingStyles = padded ? "p-6" : "";

  return (
    <div
      className={`bg-[var(--surface)] border border-[var(--border)] rounded-lg ${paddingStyles} ${hoverStyles} ${className}`}
    >
      {children}
    </div>
  );
}
