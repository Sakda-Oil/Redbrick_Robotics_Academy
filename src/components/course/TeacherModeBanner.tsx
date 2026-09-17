"use client";

import React from "react";
import { GraduationCap, Lightbulb, AlertCircle, CheckSquare, MessageSquare } from "lucide-react";
import { useProgressStore } from "@/lib/store/progressStore";
import { LessonContent } from "@/types/course";

export function TeacherModeBanner({ lesson }: { lesson: LessonContent }) {
  const { teacherMode, locale } = useProgressStore();

  if (!teacherMode || !lesson.teacherNotes) return null;

  const notes = lesson.teacherNotes;

  return (
    <div className="my-8 rounded-xl border-2 border-amber-500/50 bg-amber-50/70 dark:bg-amber-950/20 p-5 shadow-sm font-sans">
      {/* Badge */}
      <div className="flex items-center justify-between border-b border-amber-500/20 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-amber-500 text-white">
            <GraduationCap className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider font-heading">
              {locale === "th" ? "คำแนะนำสำหรับผู้สอน (Teacher Mode)" : "Instructor Guide & Teacher Mode"}
            </h3>
            <p className="text-xs text-amber-700 dark:text-amber-400">
              {locale === "th"
                ? "แสดงเฉพาะเมื่อเปิด Teacher Mode เพื่อเป็นแนวทางการสอนและเฉลยคำตอบ"
                : "Only visible when Teacher Mode is enabled. Includes pedagogical notes and expected answers."}
            </p>
          </div>
        </div>
        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold">
          {locale === "th" ? "เฉพาะผู้สอน" : "TEACHER ONLY"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Pedagogical Goal */}
        <div className="p-3 rounded-lg bg-white/70 dark:bg-charcoal-900/60 border border-amber-500/20">
          <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-400 mb-1">
            <Lightbulb className="h-3.5 w-3.5" />
            <span>{locale === "th" ? "เป้าหมายการเรียนการสอน" : "Pedagogical Objective"}</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {notes.pedagogicalGoal}
          </p>
        </div>

        {/* Key Points */}
        <div className="p-3 rounded-lg bg-white/70 dark:bg-charcoal-900/60 border border-amber-500/20">
          <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-400 mb-1">
            <CheckSquare className="h-3.5 w-3.5" />
            <span>{locale === "th" ? "หัวข้อสำคัญที่ต้องเน้นย้ำ" : "Key Concepts to Check"}</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 leading-relaxed">
            {notes.keyPointsToEmphasize.map((pt, idx) => (
              <li key={idx}>{pt}</li>
            ))}
          </ul>
        </div>

        {/* Common Misconceptions */}
        <div className="p-3 rounded-lg bg-white/70 dark:bg-charcoal-900/60 border border-amber-500/20">
          <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-400 mb-1">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>{locale === "th" ? "ข้อผิดพลาดที่ผู้เรียนมักสับสน" : "Common Student Errors"}</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 leading-relaxed">
            {notes.commonStudentConfusions.map((c, idx) => (
              <li key={idx}>{c}</li>
            ))}
          </ul>
        </div>

        {/* Discussion Question */}
        <div className="p-3 rounded-lg bg-white/70 dark:bg-charcoal-900/60 border border-amber-500/20">
          <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-400 mb-1">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>{locale === "th" ? "คำถามชวนคิดในชั้นเรียน" : "Classroom Discussion Prompt"}</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">
            &ldquo;{notes.suggestedDiscussionPrompt}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
