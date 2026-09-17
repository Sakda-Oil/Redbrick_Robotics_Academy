"use client";

import React from "react";
import Link from "next/link";
import {
  PlaySquare,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { useProgressStore } from "@/lib/store/progressStore";
import { getTranslation } from "@/lib/i18n";
import { ROS2InteractiveLab } from "@/components/simulator/ROS2InteractiveLab";

export default function ROS2PlaygroundPage() {
  const { locale } = useProgressStore();
  const t = getTranslation(locale);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-charcoal-950 py-6 sm:py-8 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-charcoal-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
              <Link href="/" className="hover:text-redbrick-600 transition-colors">
                {t.nav.academy}
              </Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/courses/ros2-jazzy" className="hover:text-redbrick-600 transition-colors">
                ROS 2 Jazzy
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-gray-700 dark:text-gray-300 font-semibold">
                {t.nav.playground}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-charcoal-900 dark:text-white flex items-center gap-2.5 font-heading">
              <PlaySquare className="h-7 w-7 text-redbrick-600" />
              <span>{t.playground.title}</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
              {t.playground.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/courses/ros2-jazzy/06-topics"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-redbrick-600 hover:bg-redbrick-500 text-white text-xs font-bold transition-colors shadow-sm"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>{t.playground.goToTopics}</span>
            </Link>
          </div>
        </div>

        {/* Full Comprehensive 4-Pane Developer Playground Sandbox */}
        <section>
          <ROS2InteractiveLab />
        </section>
      </div>
    </div>
  );
}
