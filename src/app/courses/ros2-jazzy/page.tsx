"use client";

import React from "react";
import Link from "next/link";
import {
  Cpu,
  Clock,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Circle,
  Gauge,
  PlaySquare,
} from "lucide-react";
import { getROS2Course } from "@/content";
import { useProgressStore } from "@/lib/store/progressStore";
import { getTranslation } from "@/lib/i18n";

export default function ROS2CoursePage() {
  const { completedLessons, locale } = useProgressStore();
  const t = getTranslation(locale);
  const course = getROS2Course(locale);

  const allLessonIds = course.modules.flatMap((m) => m.lessons.map((l) => l.id));
  const completedCount = allLessonIds.filter((id) => completedLessons.includes(id)).length;
  const progressPercent = allLessonIds.length > 0
    ? Math.round((completedCount / allLessonIds.length) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-charcoal-950 py-10 sm:py-16 font-sans">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Course Banner */}
        <div className="rounded-3xl border border-gray-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900 p-8 sm:p-12 shadow-sm mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-redbrick-50 dark:bg-redbrick-950/40 text-redbrick-600 dark:text-redbrick-400 text-xs font-bold font-mono">
                <Cpu className="h-3.5 w-3.5" />
                <span>{course.badge}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-charcoal-900 dark:text-white font-heading">
                {course.title}
              </h1>

              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                {course.description}
              </p>

              {/* Course Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-500 pt-2">
                <span className="flex items-center gap-1.5 bg-gray-100 dark:bg-charcoal-800 px-3 py-1 rounded-lg">
                  <BookOpen className="h-3.5 w-3.5 text-redbrick-600" />
                  {course.totalModules} {t.course.modulesCount} • {allLessonIds.length} {t.course.lessonsCount}
                </span>
                <span className="flex items-center gap-1.5 bg-gray-100 dark:bg-charcoal-800 px-3 py-1 rounded-lg">
                  <Clock className="h-3.5 w-3.5 text-redbrick-600" />
                  ~{course.estimatedHours} {locale === "th" ? "ชั่วโมง" : "Hours"}
                </span>
                <span className="flex items-center gap-1.5 bg-gray-100 dark:bg-charcoal-800 px-3 py-1 rounded-lg">
                  <Gauge className="h-3.5 w-3.5 text-redbrick-600" />
                  {locale === "th" ? "ระดับปานกลางถึงระดับสูง" : "Intermediate to Advanced"}
                </span>
              </div>
            </div>

            {/* Progress & Start CTA Card */}
            <div className="shrink-0 p-6 rounded-2xl bg-gray-50 dark:bg-charcoal-950 border border-gray-200 dark:border-charcoal-800 flex flex-col items-center text-center space-y-4 min-w-[240px]">
              <div className="w-16 h-16 rounded-full bg-redbrick-600/10 text-redbrick-600 font-black text-lg flex items-center justify-center border-2 border-redbrick-600/30">
                {progressPercent}%
              </div>
              <div className="text-xs text-gray-500">
                <span className="font-bold text-charcoal-900 dark:text-white">
                  {completedCount}
                </span>{" "}
                {locale === "th" ? `จาก ${allLessonIds.length} บทเรียนที่เรียนแล้ว` : `of ${allLessonIds.length} Lessons Completed`}
              </div>

              <div className="w-full space-y-2">
                <Link
                  href="/courses/ros2-jazzy/01-introduction"
                  className="block w-full py-3 px-4 rounded-xl bg-redbrick-600 hover:bg-redbrick-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md shadow-redbrick-600/20 text-center"
                >
                  {completedCount === 0 ? t.common.startCourse : t.common.continueLearning}
                </Link>

                <Link
                  href="/playground/ros2"
                  className="flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-lg border border-gray-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:border-redbrick-500 transition-colors"
                >
                  <PlaySquare className="h-3.5 w-3.5 text-redbrick-600" />
                  <span>{locale === "th" ? "สนามทดลองจำลอง ROS Graph" : "Interactive Playground"}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Syllabus / Modules Breakdown */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-charcoal-900 dark:text-white font-heading">
              {t.course.curriculum}
            </h2>
            <span className="text-xs text-gray-400 font-mono">
              Ubuntu 24.04 Noble + ROS 2 Jazzy
            </span>
          </div>

          <div className="space-y-4">
            {course.modules.map((module) => (
              <div
                key={module.id}
                className="rounded-2xl border border-gray-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900 overflow-hidden shadow-sm"
              >
                <div className="px-6 py-4 bg-gray-50/70 dark:bg-charcoal-900/90 border-b border-gray-100 dark:border-charcoal-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono font-bold text-redbrick-600">
                      {locale === "th" ? "โมดูลที่" : "Module"} {module.number}
                    </span>
                    <h3 className="text-base font-bold text-charcoal-900 dark:text-white font-heading">
                      {module.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                      {module.description}
                    </p>
                  </div>
                </div>

                <div className="divide-y divide-gray-100 dark:divide-charcoal-800">
                  {module.lessons.map((lesson) => {
                    const isDone = completedLessons.includes(lesson.id);
                    return (
                      <Link
                        key={lesson.id}
                        href={`/courses/ros2-jazzy/${lesson.slug}`}
                        className="flex items-center justify-between px-6 py-3.5 hover:bg-gray-50 dark:hover:bg-charcoal-800/60 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          {isDone ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                          ) : (
                            <Circle className="h-4 w-4 text-gray-300 dark:text-charcoal-600 shrink-0" />
                          )}
                          <span className="text-sm font-medium text-charcoal-800 dark:text-gray-200 group-hover:text-redbrick-600 transition-colors">
                            {lesson.title}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-gray-400 font-mono">
                          <span>{lesson.durationMinutes} {locale === "th" ? "นาที" : "min"}</span>
                          <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-redbrick-600" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
