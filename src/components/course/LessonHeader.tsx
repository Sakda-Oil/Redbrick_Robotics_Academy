"use client";

import React from "react";
import Link from "next/link";
import {
  ChevronRight,
  Clock,
  Gauge,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { LessonContent } from "@/types/course";
import { useProgressStore } from "@/lib/store/progressStore";
import { getTranslation } from "@/lib/i18n";
import { FontSizeControl } from "./FontSizeControl";
import confetti from "canvas-confetti";

export function LessonHeader({ lesson }: { lesson: LessonContent }) {
  const { completedLessons, toggleLessonCompleted, locale } = useProgressStore();
  const isCompleted = completedLessons.includes(lesson.id);
  const t = getTranslation(locale);

  const handleToggle = () => {
    toggleLessonCompleted(lesson.id);
    if (!isCompleted) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch (e) {
        // Confetti fallback
      }
    }
  };

  const difficultyText =
    lesson.difficulty === "Beginner"
      ? (locale === "th" ? "ระดับเริ่มต้น" : "Beginner")
      : lesson.difficulty === "Intermediate"
      ? (locale === "th" ? "ระดับปานกลาง" : "Intermediate")
      : (locale === "th" ? "ระดับสูง" : "Advanced");

  return (
    <div className="border-b border-gray-200 dark:border-charcoal-800 pb-6 mb-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-3 font-sans">
        <Link href="/" className="hover:text-redbrick-600 transition-colors">
          {t.nav.academy}
        </Link>
        <ChevronRight className="h-3 w-3 text-gray-400" />
        <Link
          href={`/courses/${lesson.courseId}`}
          className="hover:text-redbrick-600 transition-colors font-medium capitalize"
        >
          {lesson.courseId === "linux"
            ? (locale === "th" ? "Linux Fundamentals" : "Linux Fundamentals")
            : "ROS 2 Jazzy"}
        </Link>
        <ChevronRight className="h-3 w-3 text-gray-400" />
        <span className="text-gray-700 dark:text-gray-300 truncate max-w-xs">
          {locale === "th" ? "โมดูลที่" : "Module"} {lesson.moduleNumber}: {lesson.moduleTitle}
        </span>
      </nav>

      {/* Main Title & Complete Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] sm:text-[34px] lg:text-[40px] font-black tracking-tight text-charcoal-900 dark:text-white font-heading leading-tight">
            {lesson.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 mt-3 text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-gray-300">
              <Clock className="h-3.5 w-3.5 text-redbrick-600" />
              {lesson.durationMinutes} {locale === "th" ? "นาที" : "mins"}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${
                lesson.difficulty === "Beginner"
                  ? "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400"
                  : lesson.difficulty === "Intermediate"
                  ? "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
                  : "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400"
              }`}
            >
              <Gauge className="h-3.5 w-3.5" />
              {difficultyText}
            </span>
            <span className="text-gray-400 dark:text-charcoal-500">
              {locale === "th" ? "โมดูลที่" : "Module"} {lesson.moduleNumber}
            </span>
          </div>
        </div>

        {/* Action Controls: Font Size & Mark Completed */}
        <div className="flex items-center gap-2.5 self-start md:self-center">
          <FontSizeControl />

          <button
            onClick={handleToggle}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all shadow-sm ${
              isCompleted
                ? "bg-green-600 hover:bg-green-700 text-white shadow-green-600/20"
                : "border border-gray-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-gray-700 dark:text-gray-200 hover:border-redbrick-600 hover:text-redbrick-600"
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span>{t.common.completed}</span>
              </>
            ) : (
              <>
                <Circle className="h-4 w-4" />
                <span>{t.common.markCompleted}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
