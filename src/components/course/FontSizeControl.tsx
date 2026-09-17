"use client";

import React from "react";
import { useProgressStore, ContentFontSize } from "@/lib/store/progressStore";
import { getTranslation } from "@/lib/i18n";

export function FontSizeControl() {
  const { fontSize, setFontSize, locale } = useProgressStore();
  const t = getTranslation(locale);

  const options: { id: ContentFontSize; label: string; title: string }[] = [
    { id: "compact", label: "A-", title: t.typography.compact },
    { id: "normal", label: "A", title: t.typography.normal },
    { id: "large", label: "A+", title: t.typography.large },
  ];

  return (
    <div
      className="inline-flex items-center gap-0.5 p-1 rounded-lg border border-gray-200 dark:border-charcoal-700 bg-gray-50/70 dark:bg-charcoal-800/80 shadow-sm"
      role="group"
      aria-label={t.typography.fontSize}
    >
      <span className="sr-only">{t.typography.fontSize}</span>
      {options.map((opt) => {
        const isActive = fontSize === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => setFontSize(opt.id)}
            title={opt.title}
            aria-label={opt.title}
            aria-pressed={isActive}
            className={`px-2 py-1 rounded text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-redbrick-500 ${
              isActive
                ? "bg-redbrick-600 text-white shadow-sm"
                : "text-gray-500 hover:text-charcoal-900 dark:text-gray-400 dark:hover:text-white"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
