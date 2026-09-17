"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Terminal,
  Cpu,
  Bot,
} from "lucide-react";
import { useProgressStore } from "@/lib/store/progressStore";
import { getTranslation } from "@/lib/i18n";

export default function AboutPage() {
  const { locale } = useProgressStore();
  const t = getTranslation(locale);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-charcoal-950 py-12 sm:py-20 font-sans">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Brand Showcase Header */}
        <div className="rounded-3xl border border-gray-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900 p-8 sm:p-12 shadow-sm text-center flex flex-col items-center">
          <div className="relative h-28 w-28 mb-6">
            <Image
              src="/images/redbrick-logo-transparent.png"
              alt="Redbrick Robotics Logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-charcoal-900 dark:text-white font-heading">
            REDBRICK <span className="text-redbrick-600 font-extrabold">ROBOTICS</span>
          </h1>
          <p className="text-xs uppercase font-mono font-bold tracking-widest text-redbrick-600 mt-2">
            {t.about.tag}
          </p>

          <p className="mt-6 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
            {t.about.desc}
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-gray-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900 p-6 space-y-3">
            <div className="p-2.5 w-fit rounded-xl bg-redbrick-600/10 text-redbrick-600">
              <Terminal className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-base text-charcoal-900 dark:text-white font-heading">
              {t.about.pillar1Title}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              {t.about.pillar1Desc}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900 p-6 space-y-3">
            <div className="p-2.5 w-fit rounded-xl bg-redbrick-600/10 text-redbrick-600">
              <Cpu className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-base text-charcoal-900 dark:text-white font-heading">
              {t.about.pillar2Title}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              {t.about.pillar2Desc}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900 p-6 space-y-3">
            <div className="p-2.5 w-fit rounded-xl bg-redbrick-600/10 text-redbrick-600">
              <Bot className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-base text-charcoal-900 dark:text-white font-heading">
              {t.about.pillar3Title}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              {t.about.pillar3Desc}
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div className="rounded-2xl border border-redbrick-600/30 bg-gradient-to-r from-redbrick-600 to-redbrick-700 p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-redbrick-600/20">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-bold font-heading">{t.about.ctaTitle}</h3>
            <p className="text-xs text-redbrick-100 leading-relaxed">
              {t.about.ctaDesc}
            </p>
          </div>
          <Link
            href="/courses/linux"
            className="shrink-0 px-6 py-3 rounded-xl bg-white text-redbrick-600 font-extrabold text-xs uppercase tracking-wider hover:bg-gray-100 transition-colors shadow-md"
          >
            {t.about.ctaBtn}
          </Link>
        </div>
      </div>
    </div>
  );
}
