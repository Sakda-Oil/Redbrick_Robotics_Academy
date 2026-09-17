"use client";

import React, { useState } from "react";
import { Check, Copy, Play, Terminal } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: "bash" | "python" | "cpp" | "yaml" | "xml" | "text";
  title?: string;
  allowTry?: boolean;
  onTryCommand?: (command: string) => void;
  output?: string;
}

export function CodeBlock({
  code,
  language = "bash",
  title,
  allowTry = true,
  onTryCommand,
  output,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Failed to copy code", e);
    }
  };

  const handleTry = () => {
    if (onTryCommand) {
      // If code has multiple lines or comments, pick the primary command line
      const lines = code.split("\n").filter((l) => !l.startsWith("#") && l.trim().length > 0);
      const cmdToRun = lines[0] || code;
      onTryCommand(cmdToRun);
    }
  };

  const lines = code.trim().split("\n");

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-gray-200 dark:border-charcoal-700 bg-charcoal-950 shadow-md">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-charcoal-900 border-b border-charcoal-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/80 inline-block" />
          </div>
          <span className="font-mono text-gray-400 pl-2">
            {title || (language === "bash" ? "terminal" : language)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {allowTry && language === "bash" && (
            <button
              onClick={handleTry}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-redbrick-600 hover:bg-redbrick-500 text-white text-xs font-semibold transition-all shadow-sm"
              title="Execute in interactive simulator below"
            >
              <Play className="h-3 w-3 fill-current" />
              <span>Try It Yourself</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-charcoal-800 hover:bg-charcoal-700 text-gray-300 text-xs font-medium transition-colors"
            title="Copy to clipboard"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-green-400" />
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Display Area */}
      <div className="p-5 overflow-x-auto font-mono text-base sm:text-[17px] leading-relaxed text-gray-200">
        <pre className="grid grid-cols-1 gap-0.5">
          {lines.map((line, idx) => (
            <div key={idx} className="flex">
              <span className="select-none text-charcoal-600 pr-4 text-right w-9 shrink-0 inline-block">
                {idx + 1}
              </span>
              <span className="flex-1 whitespace-pre">
                {line.startsWith("#") ? (
                  <span className="text-gray-500 italic">{line}</span>
                ) : line.startsWith("redbrick@robot:~$ ") ? (
                  <>
                    <span className="text-redbrick-400 font-semibold">redbrick@robot:~$ </span>
                    <span className="text-white font-medium">
                      {line.replace("redbrick@robot:~$ ", "")}
                    </span>
                  </>
                ) : (
                  <span>{line}</span>
                )}
              </span>
            </div>
          ))}
        </pre>
      </div>

      {/* Sample Output (if provided) */}
      {output && (
        <div className="border-t border-charcoal-800 bg-charcoal-900/60 p-4">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5 text-redbrick-500" />
            <span>Expected Output:</span>
          </div>
          <pre className="font-mono text-sm sm:text-base text-gray-300 whitespace-pre overflow-x-auto leading-relaxed pl-5 border-l-2 border-charcoal-700">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
