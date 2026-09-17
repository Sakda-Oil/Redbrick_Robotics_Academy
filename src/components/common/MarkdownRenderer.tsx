"use client";

import React from "react";

interface MarkdownRendererProps {
  content: string;
  fontSize?: "compact" | "normal" | "large";
  className?: string;
}

/**
 * Parses inline markdown: bold, italic, inline code, and links.
 */
function renderInline(text: string): React.ReactNode[] {
  // Regex matches:
  // 1. `code`
  // 2. **bold**
  // 3. *italic*
  // 4. [text](url)
  const regex = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(regex);

  return parts.map((part, idx) => {
    if (!part) return null;

    // Inline Code
    if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
      return (
        <code
          key={idx}
          className="px-1.5 py-0.5 mx-0.5 rounded bg-gray-100 dark:bg-charcoal-800 font-mono text-[0.88em] font-semibold text-redbrick-600 dark:text-redbrick-400 border border-gray-200 dark:border-charcoal-700"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    // Bold
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      return (
        <strong key={idx} className="font-bold text-charcoal-900 dark:text-white">
          {renderInline(part.slice(2, -2))}
        </strong>
      );
    }

    // Italic
    if (part.startsWith("*") && part.endsWith("*") && part.length >= 2) {
      return (
        <em key={idx} className="italic text-charcoal-800 dark:text-gray-200">
          {renderInline(part.slice(1, -1))}
        </em>
      );
    }

    // Markdown Link
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={idx}
          href={linkMatch[2]}
          target={linkMatch[2].startsWith("http") ? "_blank" : undefined}
          rel={linkMatch[2].startsWith("http") ? "noopener noreferrer" : undefined}
          className="text-redbrick-600 dark:text-redbrick-400 underline hover:text-redbrick-500 transition-colors font-medium"
        >
          {linkMatch[1]}
        </a>
      );
    }

    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

/**
 * Custom semantic MarkdownRenderer optimized for technical robotics education in Thai and English.
 * Automatically transforms numbered/bullet points into semantic <ol> and <ul> lists.
 */
export function MarkdownRenderer({
  content,
  fontSize = "normal",
  className = "",
}: MarkdownRendererProps) {
  if (!content) return null;

  // Font size configuration
  const fontStyles = {
    compact: "text-sm sm:text-base leading-[1.75]",
    normal: "text-base sm:text-lg lg:text-[18px] leading-[1.8]",
    large: "text-lg sm:text-xl lg:text-[20px] leading-[1.85]",
  }[fontSize];

  // Split content into blocks by double newlines or single newlines for list detection
  const lines = content.split("\n");
  const blocks: React.ReactNode[] = [];

  let currentList: { type: "ol" | "ul"; items: string[] } | null = null;
  let currentTable: string[] | null = null;
  let currentCodeBlock: { language: string; lines: string[] } | null = null;
  let currentParagraph: string[] = [];

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(" ").trim();
      if (text) {
        blocks.push(
          <p key={`p-${blocks.length}`} className="mb-5 leading-[1.8] text-gray-700 dark:text-gray-300">
            {renderInline(text)}
          </p>
        );
      }
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (currentList) {
      const { type, items } = currentList;
      if (type === "ol") {
        blocks.push(
          <ol
            key={`ol-${blocks.length}`}
            className="list-decimal pl-6 sm:pl-8 space-y-3.5 my-5 text-gray-700 dark:text-gray-300"
          >
            {items.map((item, idx) => (
              <li key={idx} className="leading-[1.8] pl-1.5">
                {renderInline(item)}
              </li>
            ))}
          </ol>
        );
      } else {
        blocks.push(
          <ul
            key={`ul-${blocks.length}`}
            className="list-disc pl-6 sm:pl-8 space-y-3 my-5 text-gray-700 dark:text-gray-300"
          >
            {items.map((item, idx) => (
              <li key={idx} className="leading-[1.8] pl-1.5">
                {renderInline(item)}
              </li>
            ))}
          </ul>
        );
      }
      currentList = null;
    }
  };

  const flushTable = () => {
    if (currentTable && currentTable.length > 0) {
      const rows = currentTable.map((row) =>
        row
          .split("|")
          .map((c) => c.trim())
          .filter((_, idx, arr) => idx !== 0 && idx !== arr.length - 1)
      );

      const headerRow = rows[0];
      const dataRows = rows.slice(2); // skip separator row (e.g. |:---|:---|)

      blocks.push(
        <div key={`table-${blocks.length}`} className="my-6 overflow-x-auto rounded-xl border border-gray-200 dark:border-charcoal-700 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-charcoal-800 text-sm sm:text-base">
            <thead className="bg-gray-50 dark:bg-charcoal-950">
              <tr>
                {headerRow.map((h, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 text-left font-bold text-charcoal-900 dark:text-white font-heading"
                  >
                    {renderInline(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-charcoal-800 bg-white dark:bg-charcoal-900">
              {dataRows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-gray-50/50 dark:hover:bg-charcoal-800/50 transition-colors">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-4 py-3 text-gray-700 dark:text-gray-300">
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      currentTable = null;
    }
  };

  const flushCodeBlock = () => {
    if (currentCodeBlock) {
      blocks.push(
        <pre
          key={`code-${blocks.length}`}
          className="p-4 sm:p-5 rounded-xl bg-charcoal-950 text-gray-100 font-mono text-xs sm:text-sm my-5 overflow-x-auto border border-charcoal-800"
        >
          <code>{currentCodeBlock.lines.join("\n")}</code>
        </pre>
      );
      currentCodeBlock = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // 1. Fenced Code Block
    if (trimmed.startsWith("```")) {
      if (currentCodeBlock) {
        flushCodeBlock();
      } else {
        flushParagraph();
        flushList();
        flushTable();
        const language = trimmed.slice(3).trim();
        currentCodeBlock = { language, lines: [] };
      }
      continue;
    }

    if (currentCodeBlock) {
      currentCodeBlock.lines.push(rawLine);
      continue;
    }

    // 2. Table row
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      flushParagraph();
      flushList();
      if (!currentTable) currentTable = [];
      currentTable.push(trimmed);
      continue;
    } else if (currentTable) {
      flushTable();
    }

    // 3. Headings
    if (trimmed.startsWith("### ")) {
      flushParagraph();
      flushList();
      blocks.push(
        <h3
          key={`h3-${blocks.length}`}
          className="text-xl sm:text-2xl font-bold text-charcoal-900 dark:text-white mt-8 mb-3 font-heading tracking-tight"
        >
          {renderInline(trimmed.slice(4))}
        </h3>
      );
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushParagraph();
      flushList();
      blocks.push(
        <h2
          key={`h2-${blocks.length}`}
          className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 dark:text-white mt-10 mb-4 pb-2 border-b border-gray-100 dark:border-charcoal-800 font-heading tracking-tight"
        >
          {renderInline(trimmed.slice(3))}
        </h2>
      );
      continue;
    }

    // 4. Blockquotes
    if (trimmed.startsWith("> ")) {
      flushParagraph();
      flushList();
      blocks.push(
        <blockquote
          key={`quote-${blocks.length}`}
          className="p-4 my-5 border-l-4 border-redbrick-600 bg-redbrick-50/40 dark:bg-charcoal-950 rounded-r-xl text-gray-700 dark:text-gray-300 italic"
        >
          {renderInline(trimmed.slice(2))}
        </blockquote>
      );
      continue;
    }

    // 5. Ordered List (e.g. "1. Item", "2. Item")
    const olMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (olMatch) {
      flushParagraph();
      if (!currentList || currentList.type !== "ol") {
        flushList();
        currentList = { type: "ol", items: [] };
      }
      currentList.items.push(olMatch[2]);
      continue;
    }

    // 6. Unordered List (e.g. "- Item", "* Item")
    const ulMatch = trimmed.match(/^[-*]\s+(.*)$/);
    if (ulMatch) {
      flushParagraph();
      if (!currentList || currentList.type !== "ul") {
        flushList();
        currentList = { type: "ul", items: [] };
      }
      currentList.items.push(ulMatch[1]);
      continue;
    }

    // 7. Empty line
    if (trimmed === "") {
      flushParagraph();
      flushList();
      continue;
    }

    // 8. Plain paragraph line
    if (currentList) {
      flushList();
    }
    currentParagraph.push(trimmed);
  }

  // Flush remaining buffers
  flushParagraph();
  flushList();
  flushTable();
  flushCodeBlock();

  return (
    <div className={`max-w-[900px] ${fontStyles} font-sans ${className}`}>
      {blocks}
    </div>
  );
}
