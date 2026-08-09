import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export default function CodeBlock({
  code,
  language = "typescript",
  filename,
  showLineNumbers = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split("\n");

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[#0D1117] text-gray-200 overflow-hidden font-mono text-xs sm:text-sm my-4 shadow-sm">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#161B22] border-b border-[var(--border)]/30 text-gray-400">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70 inline-block"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70 inline-block"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 inline-block"></span>
          {filename && <span className="ml-2 text-xs font-mono text-gray-300">{filename}</span>}
        </div>
        <div className="flex items-center gap-3">
          {language && (
            <span className="text-[11px] uppercase tracking-wider font-mono text-gray-400">
              {language}
            </span>
          )}
          <button
            onClick={copyToClipboard}
            className="p-1 rounded text-gray-400 hover:text-white transition-colors focus:outline-none"
            aria-label="Copy code"
            title="Copy code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="leading-relaxed">
          <code>
            {lines.map((line, index) => (
              <div key={index} className="table-row">
                {showLineNumbers && (
                  <span className="table-cell pr-4 text-right select-none text-gray-600 font-mono text-xs">
                    {index + 1}
                  </span>
                )}
                <span className="table-cell whitespace-pre">{line}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
