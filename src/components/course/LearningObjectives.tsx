"use client";

import React from "react";
import { Target, Check } from "lucide-react";
import { useProgressStore } from "@/lib/store/progressStore";
import { getTranslation } from "@/lib/i18n";

export function LearningObjectives({ objectives }: { objectives: string[] }) {
  const { locale } = useProgressStore();
  const t = getTranslation(locale);

  if (!objectives || objectives.length === 0) return null;

  return (
    <div className="w-full rounded-2xl border border-redbrick-600/25 bg-gradient-to-br from-redbrick-50/60 to-white dark:from-redbrick-950/25 dark:to-charcoal-900 p-6 sm:p-7 mb-10 shadow-sm font-sans">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-redbrick-600 text-white shadow-sm">
          <Target className="h-5 w-5" />
        </div>
        <h3 className="text-base sm:text-lg font-extrabold text-charcoal-900 dark:text-white uppercase tracking-wider font-heading">
          {t.course.learningObjectives}
        </h3>
      </div>
      <ul className="space-y-3 text-base sm:text-[17px] text-charcoal-800 dark:text-gray-200">
        {objectives.map((obj, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-redbrick-600/10 text-redbrick-600 dark:bg-redbrick-600/20 dark:text-redbrick-400">
              <Check className="h-3 w-3 stroke-[3]" />
            </span>
            <span className="leading-relaxed">{obj}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
