import { ReactNode } from "react";
import Card from "./Card";

interface StatCardProps {
  label: string;
  value: string;
  description?: string;
  icon?: ReactNode;
}

export default function StatCard({ label, value, description, icon }: StatCardProps) {
  return (
    <Card className="flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between text-[var(--text-muted)] mb-3">
          <span className="text-xs uppercase tracking-wider font-mono font-medium">{label}</span>
          {icon && <div className="text-[var(--accent)]">{icon}</div>}
        </div>
        <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text-primary)] font-mono">
          {value}
        </div>
      </div>
      {description && (
        <p className="mt-3 text-xs text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border)] pt-3">
          {description}
        </p>
      )}
    </Card>
  );
}
