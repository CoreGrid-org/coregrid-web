import { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto max-w-3xl" : "text-left max-w-3xl";

  return (
    <div className={`mb-12 ${alignment} ${className}`}>
      {eyebrow && (
        <span className="inline-block text-xs uppercase tracking-widest font-mono font-medium text-[var(--accent)] mb-3 dark:text-blue-400">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--text-primary)] leading-[1.15]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
