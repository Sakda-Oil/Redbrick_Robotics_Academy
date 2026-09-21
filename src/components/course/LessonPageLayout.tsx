"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Lightbulb,
  BookOpen,
  CheckCircle2,
  Bot,
  Network,
} from "lucide-react";
import { CourseData, LessonContent } from "@/types/course";
import { useProgressStore } from "@/lib/store/progressStore";
import { getTranslation } from "@/lib/i18n";
import { getLinuxCourse, getLinuxLesson, getROS2Course, getROS2Lesson } from "@/content";
import { CourseSidebar } from "./CourseSidebar";
import { LessonHeader } from "./LessonHeader";
import { LearningObjectives } from "./LearningObjectives";
import { TeacherModeBanner } from "./TeacherModeBanner";
import { CodeBlock } from "./CodeBlock";
import { RoboticsTipBox } from "./Callouts";
import { ExerciseBox } from "./ExerciseBox";
import { QuizEngine } from "./QuizEngine";
import { LabStepViewer } from "./LabStepViewer";
import { TerminalSimulator } from "../simulator/TerminalSimulator";
import { ROSGraph } from "../simulator/ROSGraph";
import { MobileRobotSimulator } from "../simulator/MobileRobotSimulator";
import { MarkdownRenderer } from "../common/MarkdownRenderer";
import { ROS2InstallationLab } from "../simulator/ROS2InstallationLab";
import { LessonInteractiveLab } from "../simulator/LessonInteractiveLab";

interface LessonPageLayoutProps {
  course: CourseData;
  lesson: LessonContent;
}

export function LessonPageLayout({ course, lesson }: LessonPageLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [terminalRunSignal, setTerminalRunSignal] = useState<
    { command: string; timestamp: number } | undefined
  >();
  const [simTab, setSimTab] = useState<"robot" | "graph">("robot");
  const mainRef = useRef<HTMLElement>(null);

  const { locale, fontSize } = useProgressStore();
  const t = getTranslation(locale);

  // Reactively fetch localized version if locale switches, or fallback to props
  const activeCourse = (course.id === "linux" ? getLinuxCourse(locale) : getROS2Course(locale)) || course;
  const activeLesson = (course.id === "linux"
    ? getLinuxLesson(lesson.slug, locale)
    : getROS2Lesson(lesson.slug, locale)) || lesson;
  const activeModule = activeCourse.modules.find((module) =>
    module.lessons.some((item) => item.id === activeLesson.id)
  );
  const displayLesson = activeModule
    ? { ...activeLesson, moduleNumber: activeModule.number, moduleTitle: activeModule.title }
    : activeLesson;

  // Scroll restoration: Scroll to top on lesson change, or preserve anchor link if target hash is present
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }
      if (mainRef.current) {
        mainRef.current.scrollTop = 0;
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [activeLesson.slug, activeCourse.id]);

  const handleTryCode = (cmd: string) => {
    setTerminalRunSignal({ command: cmd, timestamp: Date.now() });
  };

  const supportsInlineRun =
    activeLesson.courseId === "linux" ||
    !["01-introduction", "02-installation", "11-gazebo-harmonic"].includes(activeLesson.slug);
  const isGuidedROS2Installation =
    activeLesson.courseId === "ros2-jazzy" && activeLesson.slug === "02-installation";

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-white dark:bg-charcoal-900 transition-colors">
      {/* Course Sidebar */}
      <CourseSidebar
        course={activeCourse}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content Area */}
      <main
        ref={mainRef}
        tabIndex={-1}
        className="flex-1 overflow-y-auto px-4 sm:px-8 lg:px-12 2xl:px-16 py-8 flex justify-center focus:outline-none"
      >
        <div className="w-full max-w-[1400px]">
          {/* Header with Breadcrumb, Title, FontSizeControl & Completed button */}
          <LessonHeader lesson={displayLesson} />

          {/* Teacher Mode Alert (if enabled) */}
          <TeacherModeBanner lesson={activeLesson} />

          {/* Learning Objectives */}
          <LearningObjectives objectives={activeLesson.learningObjectives} />

          {/* The guided installation lab already contains the official commands. */}
          {!isGuidedROS2Installation && (
            <section id="concept" className="mb-12">
              <h2 className="text-2xl sm:text-[26px] lg:text-[28px] font-extrabold text-charcoal-900 dark:text-white mb-5 border-b border-gray-100 dark:border-charcoal-800 pb-3 font-heading">
                {t.course.concept}
              </h2>
              <div className="font-sans">
                <MarkdownRenderer content={activeLesson.concept} fontSize={fontSize} />
              </div>
            </section>
          )}

          {/* Section: Syntax & Explanations */}
          {activeLesson.syntax && !isGuidedROS2Installation && (
            <section id="syntax" className="mb-12">
              <h2 className="text-2xl sm:text-[26px] lg:text-[28px] font-extrabold text-charcoal-900 dark:text-white mb-4 border-b border-gray-100 dark:border-charcoal-800 pb-3 font-heading">
                {t.course.syntax}
              </h2>
              <div className="p-4 sm:p-5 rounded-xl bg-gray-100 dark:bg-charcoal-950 font-mono text-sm sm:text-base lg:text-[17px] text-redbrick-600 dark:text-redbrick-400 font-bold border border-gray-200 dark:border-charcoal-800 overflow-x-auto shadow-inner">
                {activeLesson.syntax}
              </div>
              {activeLesson.syntaxExplanation && (
                <p className={`mt-3 text-gray-600 dark:text-gray-300 ${fontSize === "compact" ? "text-sm" : "text-base sm:text-[17px]"} leading-relaxed`}>
                  {activeLesson.syntaxExplanation}
                </p>
              )}
            </section>
          )}

          {/* Section: Interactive Examples & Try It Yourself */}
          {!isGuidedROS2Installation && <section id="examples" className="mb-12">
            <h2 className="text-2xl sm:text-[26px] lg:text-[28px] font-extrabold text-charcoal-900 dark:text-white mb-3 border-b border-gray-100 dark:border-charcoal-800 pb-3 font-heading">
              {t.course.examples}
            </h2>
            <p className={`text-gray-500 dark:text-gray-400 mb-5 ${fontSize === "compact" ? "text-sm" : "text-base sm:text-[17px]"} leading-relaxed`}>
              {locale === "th"
                ? "คลิกปุ่ม \"ลองทำด้วยตัวเอง\" เพื่อส่งคำสั่งไปรันบนระบบจำลอง Ubuntu 24.04 ด้านล่างได้ทันที"
                : "Click \"Try It Yourself\" on any command to run it in the simulated Ubuntu 24.04 environment below."}
            </p>

            {activeLesson.examples.map((ex, idx) => (
              <div key={idx} className="mb-8">
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-charcoal-800 dark:text-gray-100 mb-2 font-heading">
                  {locale === "th" ? `ตัวอย่างที่ ${idx + 1}:` : `Example ${idx + 1}:`} {ex.title}
                </h3>
                {ex.explanation && (
                  <p className={`text-gray-600 dark:text-gray-300 mb-3 leading-relaxed ${fontSize === "compact" ? "text-sm" : "text-base sm:text-[17px]"}`}>
                    {ex.explanation}
                  </p>
                )}
                <CodeBlock
                  code={ex.code}
                  language={ex.language}
                  output={ex.output}
                  allowTry={ex.language === "bash" && supportsInlineRun}
                  onTryCommand={handleTryCode}
                />
              </div>
            ))}
          </section>}

          {/* Section: Live Terminal Simulator (Linux only) */}
          {activeLesson.courseId !== "ros2-jazzy" && (
            <section id="terminal" className="mb-12">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-2xl sm:text-[26px] lg:text-[28px] font-extrabold text-charcoal-900 dark:text-white font-heading">
                  {t.course.terminalSandbox}
                </h2>
                <span className="text-xs font-mono text-green-600 dark:text-green-400 bg-green-500/10 px-3 py-1 rounded-full font-bold">
                  ● {t.common.liveSandbox}
                </span>
              </div>
              <p className={`text-gray-500 dark:text-gray-400 mb-4 ${fontSize === "compact" ? "text-sm" : "text-base sm:text-[17px]"} leading-relaxed`}>
                {t.course.terminalDesc}
              </p>

              <TerminalSimulator
                runTrigger={terminalRunSignal}
                title={`Redbrick Terminal Simulator — ${activeLesson.title}`}
                heightClass="h-96 sm:h-[420px] lg:h-[480px]"
              />
            </section>
          )}

          {/* Section: Context-Aware ROS 2 Interactive Lab (Progressive Tabbed Flow) */}
          {activeLesson.courseId === "ros2-jazzy" && (
            <section id="simulation" className="mb-12">
              <LessonInteractiveLab lesson={activeLesson} externalRunTrigger={terminalRunSignal} />
            </section>
          )}

          {/* Section: Practical Robotics Context */}
          {activeLesson.roboticsContext && (
            <section id="robotics-context" className="mb-12">
              <RoboticsTipBox title={activeLesson.roboticsContext.title}>
                <p className="mb-4 leading-relaxed">{activeLesson.roboticsContext.description}</p>
                {activeLesson.roboticsContext.diagram && (
                  <pre className="p-4 rounded-xl bg-black/60 text-green-400 font-mono text-xs sm:text-sm overflow-x-auto leading-normal">
                    {activeLesson.roboticsContext.diagram}
                  </pre>
                )}
                {activeLesson.roboticsContext.commandExample && (
                  <pre className="mt-3 p-3 rounded-lg bg-charcoal-900 text-gray-200 font-mono text-xs sm:text-sm overflow-x-auto">
                    {activeLesson.roboticsContext.commandExample}
                  </pre>
                )}
              </RoboticsTipBox>
            </section>
          )}

          {/* Section: Common Mistakes & Pitfalls */}
          {activeLesson.commonMistakes && activeLesson.commonMistakes.length > 0 && (
            <section id="common-mistakes" className="mb-12">
              <h2 className="text-2xl sm:text-[26px] lg:text-[28px] font-extrabold text-charcoal-900 dark:text-white mb-5 border-b border-gray-100 dark:border-charcoal-800 pb-3 flex items-center gap-2 font-heading">
                <AlertTriangle className="h-6 w-6 text-amber-500" />
                <span>{t.course.commonMistakes}</span>
              </h2>
              <div className="space-y-4">
                {activeLesson.commonMistakes.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-amber-500/30 bg-amber-50/40 dark:bg-charcoal-950 text-sm sm:text-base space-y-2.5 shadow-sm"
                  >
                    <div className="font-bold text-amber-900 dark:text-amber-400 flex items-center gap-2 text-base sm:text-[17px]">
                      <span className="text-red-500 font-extrabold">✗ {t.course.mistake}:</span> {m.mistake}
                    </div>
                    <div className="text-gray-700 dark:text-gray-300 pl-4 border-l-2 border-green-500 leading-relaxed text-sm sm:text-base">
                      <span className="font-bold text-green-600 dark:text-green-400">✓ {t.course.solution}: </span>
                      {m.solution}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section: Command Exercise */}
          {activeLesson.exercise && !isGuidedROS2Installation && (
            <section id="exercise" className="mb-12">
              <h2 className="text-2xl sm:text-[26px] lg:text-[28px] font-extrabold text-charcoal-900 dark:text-white mb-2 border-b border-gray-100 dark:border-charcoal-800 pb-3 font-heading">
                {t.course.exercise}
              </h2>
              <ExerciseBox exerciseId={activeLesson.id} exercise={activeLesson.exercise} />
            </section>
          )}

          {/* Section: Concept Quiz */}
          {activeLesson.quiz && activeLesson.quiz.length > 0 && (
            <section id="quiz" className="mb-12">
              <h2 className="text-2xl sm:text-[26px] lg:text-[28px] font-extrabold text-charcoal-900 dark:text-white mb-2 border-b border-gray-100 dark:border-charcoal-800 pb-3 font-heading">
                {t.course.quiz}
              </h2>
              <QuizEngine quizId={`quiz-${activeLesson.id}`} questions={activeLesson.quiz} />
            </section>
          )}

          {/* Section: Step-by-Step Lab (if applicable) */}
          {activeLesson.lab && (
            <section id="lab" className="mb-12">
              <h2 className="text-2xl sm:text-[26px] lg:text-[28px] font-extrabold text-charcoal-900 dark:text-white mb-2 border-b border-gray-100 dark:border-charcoal-800 pb-3 font-heading">
                {t.course.lab}
              </h2>
              <LabStepViewer lab={activeLesson.lab} />
            </section>
          )}

          {/* Lesson Navigation Footer */}
          <div className="mt-14 pt-8 border-t border-gray-200 dark:border-charcoal-800 flex items-center justify-between">
            {activeLesson.prevLesson ? (
              <Link
                href={`/courses/${activeLesson.courseId}/${activeLesson.prevLesson.slug}`}
                className="flex items-center gap-3 px-5 py-3 rounded-xl border border-gray-200 dark:border-charcoal-700 hover:border-redbrick-600 dark:hover:border-redbrick-500 text-sm sm:text-base font-semibold text-charcoal-800 dark:text-gray-200 transition-all hover:bg-gray-50 dark:hover:bg-charcoal-800 shadow-sm"
              >
                <ChevronLeft className="h-5 w-5" />
                <div className="text-left">
                  <div className="text-[11px] uppercase text-gray-400 font-bold tracking-wider">{t.common.previous}</div>
                  <span className="line-clamp-1 font-bold">{activeLesson.prevLesson.title}</span>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {activeLesson.nextLesson ? (
              <Link
                href={`/courses/${activeLesson.courseId}/${activeLesson.nextLesson.slug}`}
                className="flex items-center gap-3 px-6 py-3.5 rounded-xl bg-redbrick-600 hover:bg-redbrick-500 text-white text-sm sm:text-base font-bold transition-all shadow-lg shadow-redbrick-600/25 hover:scale-[1.02]"
              >
                <div className="text-right">
                  <div className="text-[11px] uppercase text-redbrick-200 font-bold tracking-wider">{t.common.next}</div>
                  <span className="line-clamp-1 font-bold">{activeLesson.nextLesson.title}</span>
                </div>
                <ChevronRight className="h-5 w-5" />
              </Link>
            ) : (
              <Link
                href={`/courses/${activeLesson.courseId}`}
                className="flex items-center gap-3 px-6 py-3.5 rounded-xl bg-green-600 hover:bg-green-500 text-white text-sm sm:text-base font-bold transition-all shadow-lg shadow-green-600/25"
              >
                <span>{t.common.completeCourse}</span>
                <CheckCircle2 className="h-5 w-5" />
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
