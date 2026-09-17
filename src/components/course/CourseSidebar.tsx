"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  Terminal,
  Cpu,
  BookOpen,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { CourseData } from "@/types/course";
import { useProgressStore } from "@/lib/store/progressStore";
import { getTranslation } from "@/lib/i18n";

interface CourseSidebarProps {
  course: CourseData;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function CourseSidebar({
  course,
  isCollapsed = false,
  onToggleCollapse,
}: CourseSidebarProps) {
  const pathname = usePathname();
  const { completedLessons, locale } = useProgressStore();
  const t = getTranslation(locale);

  // Expand only active module by default, collapse others
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    let foundActive = false;
    course.modules.forEach((m, idx) => {
      const hasActive = m.lessons.some((l) => pathname === `/courses/${course.id}/${l.slug}`);
      if (hasActive) {
        map[m.id] = true;
        foundActive = true;
      } else {
        map[m.id] = false;
      }
    });
    if (!foundActive && course.modules.length > 0) {
      map[course.modules[0].id] = true;
    }
    return map;
  });

  // Auto-expand module containing active lesson on navigation
  React.useEffect(() => {
    course.modules.forEach((m) => {
      const hasActive = m.lessons.some((l) => pathname === `/courses/${course.id}/${l.slug}`);
      if (hasActive) {
        setExpandedModules((prev) => ({ ...prev, [m.id]: true }));
      }
    });
  }, [pathname, course]);

  const toggleModule = (modId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [modId]: !prev[modId],
    }));
  };

  const courseLessonIds = course.modules.flatMap((m) => m.lessons.map((l) => l.id));
  const completedInCourse = courseLessonIds.filter((id) => completedLessons.includes(id)).length;
  const progressPercent = courseLessonIds.length > 0
    ? Math.round((completedInCourse / courseLessonIds.length) * 100)
    : 0;

  if (isCollapsed) {
    return (
      <aside className="w-16 shrink-0 border-r border-gray-200 dark:border-charcoal-800 bg-gray-50/70 dark:bg-charcoal-900/70 p-2 flex flex-col items-center gap-4 transition-all">
        <button
          onClick={onToggleCollapse}
          className="p-2.5 rounded-xl text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-charcoal-800 transition-colors"
          title="Expand Sidebar"
        >
          <PanelLeftOpen className="h-5 w-5" />
        </button>
        <Link href="/" className="relative h-10 w-10 flex items-center justify-center" title="Redbrick Robotics">
          <Image
            src="/images/redbrick-logo-transparent.png"
            alt="Redbrick Robotics"
            width={40}
            height={40}
            className="object-contain"
          />
        </Link>
        <div className="w-9 h-9 rounded-full bg-redbrick-600/10 text-redbrick-600 flex items-center justify-center font-bold text-xs">
          {progressPercent}%
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-72 lg:w-80 shrink-0 border-r border-gray-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900/80 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto flex flex-col transition-all">
      {/* Brand Header with Transparent Logo */}
      <div className="p-4 border-b border-gray-100 dark:border-charcoal-800 bg-gray-50/80 dark:bg-charcoal-900/90">
        <div className="flex items-center justify-between gap-3 mb-3">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-11 w-11 shrink-0 flex items-center justify-center transition-transform group-hover:scale-105">
              <Image
                src="/images/redbrick-logo-transparent.png"
                alt="Redbrick Robotics Logo"
                width={44}
                height={44}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-sm tracking-tight text-charcoal-900 dark:text-white leading-tight font-heading truncate">
                REDBRICK <span className="text-redbrick-600 font-extrabold">ROBOTICS</span>
              </span>
              <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 truncate">
                {course.title}
              </span>
            </div>
          </Link>

          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-200/60 dark:hover:bg-charcoal-800 transition-colors shrink-0"
              title="Collapse Sidebar"
            >
              <PanelLeftClose className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-1">
            <span>{t.course.progress}: {completedInCourse} / {courseLessonIds.length} {t.course.lessonsCount}</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-200 dark:bg-charcoal-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-redbrick-600 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Module Tree */}
      <nav className="p-3 space-y-3 flex-1 overflow-y-auto">
        {course.modules.map((module) => {
          const isExpanded = !!expandedModules[module.id];
          return (
            <div key={module.id} className="space-y-1">
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full flex items-start justify-between px-2.5 py-2 rounded-lg text-xs sm:text-[13px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-charcoal-800/60 transition-colors text-left"
              >
                <span className="whitespace-normal break-words mr-2">
                  {module.number}. {module.title}
                </span>
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 shrink-0 text-gray-400 mt-0.5" />
                ) : (
                  <ChevronRight className="h-4 w-4 shrink-0 text-gray-400 mt-0.5" />
                )}
              </button>

              {isExpanded && (
                <div className="space-y-1 pl-2 border-l border-gray-100 dark:border-charcoal-800 ml-2 mt-1">
                  {module.lessons.map((lesson) => {
                    const href = `/courses/${course.id}/${lesson.slug}`;
                    const isActive = pathname === href;
                    const isDone = completedLessons.includes(lesson.id);

                    return (
                      <Link
                        key={lesson.id}
                        href={href}
                        className={`flex items-start justify-between px-3 py-2.5 rounded-lg text-sm sm:text-[15px] font-medium transition-colors group text-left ${
                          isActive
                            ? "bg-redbrick-600 text-white font-bold shadow-md"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-charcoal-800/80 hover:text-gray-900 dark:hover:text-white"
                        }`}
                      >
                        <span className="whitespace-normal break-words leading-relaxed mr-2 overflow-visible">{lesson.title}</span>
                        <div className="shrink-0 flex items-center mt-0.5">
                          {isDone ? (
                            <CheckCircle2
                              className={`h-4 w-4 ${
                                isActive
                                  ? "text-white"
                                  : "text-green-600 dark:text-green-400"
                              }`}
                            />
                          ) : (
                            <Circle
                              className={`h-3.5 w-3.5 opacity-30 ${
                                isActive ? "text-white" : "text-gray-400"
                              }`}
                            />
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
