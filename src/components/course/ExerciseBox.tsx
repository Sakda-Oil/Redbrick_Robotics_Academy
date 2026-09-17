"use client";

import React, { useState, useRef } from "react";
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, Terminal } from "lucide-react";
import { ExerciseItem } from "@/types/course";
import { useProgressStore } from "@/lib/store/progressStore";
import { getTranslation } from "@/lib/i18n";
import { VirtualFileSystem } from "@/lib/simulator/virtualFileSystem";
import { getCompletions } from "@/lib/simulator/completion/completionEngine";
import confetti from "canvas-confetti";

interface ExerciseBoxProps {
  exerciseId: string;
  exercise: ExerciseItem;
}

export function ExerciseBox({ exerciseId, exercise }: ExerciseBoxProps) {
  const [userInput, setUserInput] = useState(exercise.initialCommand || "");
  const [status, setStatus] = useState<"idle" | "correct" | "incorrect">("idle");
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const [fs] = useState(() => new VirtualFileSystem());
  const inputRef = useRef<HTMLInputElement>(null);

  const { completedExercises, markExerciseCompleted, teacherMode, locale } = useProgressStore();
  const t = getTranslation(locale);
  const isDone = completedExercises.includes(exerciseId);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const cursorPos = inputRef.current?.selectionStart ?? userInput.length;
      const result = getCompletions({
        input: userInput,
        cursorPosition: cursorPos,
        cwd: "/home/redbrick",
        vfs: fs,
      });

      if (result.matches.length > 0 && result.replacement !== userInput) {
        setUserInput(result.replacement);
        if (status !== "idle") setStatus("idle");
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.selectionStart = result.newCursorPosition;
            inputRef.current.selectionEnd = result.newCursorPosition;
          }
        }, 0);
      }
    }
  };

  const checkAnswer = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanInput = userInput.trim().replace(/\s+/g, " ");

    const targets = Array.isArray(exercise.targetCommand)
      ? exercise.targetCommand
      : [exercise.targetCommand];

    const isMatch = targets.some((t) => {
      const cleanTarget = t.trim().replace(/\s+/g, " ");
      if (cleanInput === cleanTarget) return true;
      // Allow directory commands with or without trailing slash (e.g. cd Documents/ vs cd Documents)
      const inputNoSlash = cleanInput.replace(/\/$/, "");
      const targetNoSlash = cleanTarget.replace(/\/$/, "");
      return inputNoSlash === targetNoSlash;
    });

    if (isMatch) {
      setStatus("correct");
      markExerciseCompleted(exerciseId);
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.8 },
        });
      } catch (err) {
        // Fallback
      }
    } else {
      setStatus("incorrect");
    }
  };

  const primaryTarget = Array.isArray(exercise.targetCommand)
    ? exercise.targetCommand[0]
    : exercise.targetCommand;

  return (
    <div className="w-full my-8 rounded-2xl border-2 border-charcoal-700 dark:border-charcoal-700 bg-charcoal-900 text-white overflow-hidden shadow-xl font-sans">
      {/* Header */}
      <div className="px-5 py-3.5 bg-charcoal-950 border-b border-charcoal-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-redbrick-600 text-white">
            <Terminal className="h-4 w-4" />
          </div>
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-300 font-heading">
            {t.course.exercise}
          </span>
        </div>
        {(isDone || status === "correct") && (
          <span className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-green-400 bg-green-950/50 px-3 py-1 rounded-full border border-green-500/30">
            <CheckCircle2 className="h-4 w-4" />
            {t.common.completed}
          </span>
        )}
      </div>

      <div className="p-6 sm:p-7">
        {/* Instruction */}
        <p className="text-base sm:text-lg lg:text-[18px] text-gray-100 mb-5 font-medium leading-relaxed">
          {exercise.instruction}
        </p>

        {/* Terminal Input Box */}
        <form onSubmit={checkAnswer} className="space-y-4">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-black/70 border border-charcoal-700 focus-within:border-redbrick-500 transition-colors font-mono text-sm sm:text-base lg:text-[17px]">
            <span className="text-redbrick-400 select-none shrink-0 font-bold">
              redbrick@robot:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => {
                setUserInput(e.target.value);
                if (status !== "idle") setStatus("idle");
              }}
              onKeyDown={handleKeyDown}
              placeholder={locale === "th" ? "พิมพ์คำสั่งของคุณที่นี่..." : "Type your command here..."}
              className="flex-1 bg-transparent text-white outline-none placeholder-gray-600 font-medium"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-redbrick-600 hover:bg-redbrick-500 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-md shadow-redbrick-600/25 hover:scale-[1.02]"
              >
                <span>{t.common.submitCommand}</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="px-4 py-2.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-gray-300 text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5"
              >
                <HelpCircle className="h-4 w-4 text-amber-400" />
                <span>{showHint ? t.common.hideHint : t.common.needHint}</span>
              </button>
            </div>

            {(teacherMode || showSolution) && (
              <span className="text-xs sm:text-sm font-mono bg-charcoal-800 text-amber-300 px-3 py-1.5 rounded-lg border border-amber-500/30">
                {t.common.answer}: <code className="text-white font-bold">{primaryTarget}</code>
              </span>
            )}
          </div>
        </form>

        {/* Feedback Area */}
        {status === "correct" && (
          <div className="mt-4 p-3.5 rounded-lg bg-green-950/40 border border-green-500/40 text-green-300 text-xs sm:text-sm flex items-start gap-2.5 animate-fadeIn">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-green-400 mt-0.5" />
            <div>
              <div className="font-bold text-green-300">✓ {t.common.correct}</div>
              <p className="mt-1 text-gray-300 leading-relaxed">{exercise.explanation}</p>
            </div>
          </div>
        )}

        {status === "incorrect" && (
          <div className="mt-4 p-3.5 rounded-lg bg-red-950/40 border border-red-500/40 text-red-300 text-xs sm:text-sm flex items-start gap-2.5 animate-fadeIn">
            <XCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
            <div>
              <div className="font-bold text-red-300">✗ {t.common.incorrect}</div>
              <p className="mt-1 text-gray-300 leading-relaxed">
                {locale === "th"
                  ? "ตรวจสอบ flag และการเว้นวรรคของคำสั่ง คลิก \"ขอคำใบ้\" หากต้องการแนวทาง"
                  : "Check command flags and spacing. Click \"Need Hint?\" if you need guidance."}
              </p>
            </div>
          </div>
        )}

        {/* Hint Box */}
        {showHint && (
          <div className="mt-3 p-3 rounded-lg bg-amber-950/30 border border-amber-500/30 text-amber-200 text-xs sm:text-sm flex items-start gap-2">
            <HelpCircle className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
            <div>
              <span className="font-bold">{t.common.hint}: </span>
              <span>{exercise.hint}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
