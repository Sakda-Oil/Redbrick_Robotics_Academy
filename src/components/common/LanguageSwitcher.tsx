"use client";

import React from "react";
import { Globe } from "lucide-react";
import { useProgressStore, SupportedLocale } from "@/lib/store/progressStore";
import { getTranslation } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { locale, setLocale } = useProgressStore();
  const t = getTranslation(locale);

  return (
    <div
      className="flex items-center rounded-lg border border-gray-200 dark:border-charcoal-700 bg-gray-50/80 dark:bg-charcoal-800/80 p-0.5 shadow-sm text-xs font-semibold"
      role="group"
      aria-label={t.nav.language}
    >
      <div className="pl-1.5 pr-1 text-gray-400 select-none">
        <Globe className="h-3.5 w-3.5" />
      </div>

      <button
        onClick={() => setLocale("th")}
        className={`px-2 py-1 rounded-md transition-all focus:outline-none focus:ring-1 focus:ring-redbrick-500 ${
          locale === "th"
            ? "bg-redbrick-600 text-white shadow-sm font-bold"
            : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        }`}
        aria-pressed={locale === "th"}
        aria-label="เปลี่ยนเป็นภาษาไทย"
      >
        ไทย
      </button>

      <span className="text-gray-300 dark:text-charcoal-700 select-none">|</span>

      <button
        onClick={() => setLocale("en")}
        className={`px-2 py-1 rounded-md transition-all focus:outline-none focus:ring-1 focus:ring-redbrick-500 ${
          locale === "en"
            ? "bg-redbrick-600 text-white shadow-sm font-bold"
            : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        }`}
        aria-pressed={locale === "en"}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
}
