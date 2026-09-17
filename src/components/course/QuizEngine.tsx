"use client";

import React, { useState } from "react";
import { HelpCircle, CheckCircle2, XCircle, ChevronRight, RotateCcw } from "lucide-react";
import { QuizQuestion } from "@/types/course";
import { useProgressStore } from "@/lib/store/progressStore";
import { getTranslation } from "@/lib/i18n";
import confetti from "canvas-confetti";

interface QuizEngineProps {
  quizId: string;
  questions: QuizQuestion[];
}

export function QuizEngine({ quizId, questions }: QuizEngineProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string | string[]>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});
  const [fillInputs, setFillInputs] = useState<Record<number, string>>({});

  const { quizScores, setQuizScore, teacherMode, locale } = useProgressStore();
  const t = getTranslation(locale);

  const currentQ = questions[currentIdx];
  const isCurrentSubmitted = submitted[currentIdx];
  const currentAnswer = selectedAnswers[currentIdx];

  const handleSelectSingle = (optionId: string) => {
    if (isCurrentSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentIdx]: optionId }));
  };

  const handleToggleMultiple = (optionId: string) => {
    if (isCurrentSubmitted) return;
    const currentList = (selectedAnswers[currentIdx] as string[]) || [];
    const nextList = currentList.includes(optionId)
      ? currentList.filter((id) => id !== optionId)
      : [...currentList, optionId];
    setSelectedAnswers((prev) => ({ ...prev, [currentIdx]: nextList }));
  };

  const handleSubmitQuestion = () => {
    if (currentQ.type === "fill") {
      const input = (fillInputs[currentIdx] || "").trim();
      setSelectedAnswers((prev) => ({ ...prev, [currentIdx]: input }));
    }

    setSubmitted((prev) => ({ ...prev, [currentIdx]: true }));

    // Check if correct
    const ans = currentQ.type === "fill" ? (fillInputs[currentIdx] || "").trim() : selectedAnswers[currentIdx];
    let isCorrect = false;

    if (Array.isArray(currentQ.correctAnswer)) {
      if (Array.isArray(ans)) {
        isCorrect =
          ans.length === currentQ.correctAnswer.length &&
          ans.every((a) => (currentQ.correctAnswer as string[]).includes(a));
      }
    } else {
      isCorrect = ans === currentQ.correctAnswer;
    }

    if (isCorrect) {
      try {
        confetti({ particleCount: 35, spread: 50, origin: { y: 0.8 } });
      } catch (e) {}
    }

    // Update overall quiz score
    const totalCorrect = questions.filter((q, idx) => {
      const a = idx === currentIdx ? ans : selectedAnswers[idx];
      if (Array.isArray(q.correctAnswer)) {
        return (
          Array.isArray(a) &&
          a.length === q.correctAnswer.length &&
          a.every((item) => (q.correctAnswer as string[]).includes(item))
        );
      }
      return a === q.correctAnswer;
    }).length;

    setQuizScore(quizId, Math.round((totalCorrect / questions.length) * 100));
  };

  const isAnswerCorrect = (idx: number) => {
    const q = questions[idx];
    const a = selectedAnswers[idx];
    if (Array.isArray(q.correctAnswer)) {
      return (
        Array.isArray(a) &&
        a.length === q.correctAnswer.length &&
        a.every((item) => (q.correctAnswer as string[]).includes(item))
      );
    }
    return a === q.correctAnswer;
  };

  return (
    <div className="w-full my-8 rounded-2xl border border-gray-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-900 shadow-md overflow-hidden font-sans">
      {/* Quiz Top Header */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-charcoal-950 border-b border-gray-200 dark:border-charcoal-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-redbrick-600 text-white">
            <HelpCircle className="h-4 w-4" />
          </div>
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-charcoal-800 dark:text-gray-200 font-heading">
            {t.course.quiz}
          </span>
        </div>
        <div className="text-xs sm:text-sm font-semibold text-gray-500">
          {locale === "th" ? `คำถามที่ ${currentIdx + 1} จาก ${questions.length}` : `Question ${currentIdx + 1} of ${questions.length}`}
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {/* Question Text */}
        <h4 className="text-lg sm:text-xl lg:text-[22px] font-bold text-charcoal-900 dark:text-white mb-6 leading-relaxed font-heading">
          {currentQ.question}
        </h4>

        {/* Question Options / Input */}
        {currentQ.type === "fill" ? (
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 dark:bg-charcoal-800 border border-gray-300 dark:border-charcoal-600 font-mono text-sm sm:text-base">
              <span className="text-redbrick-600 dark:text-redbrick-400 font-bold select-none">
                redbrick@robot:~$
              </span>
              <input
                type="text"
                disabled={isCurrentSubmitted}
                value={fillInputs[currentIdx] || ""}
                onChange={(e) => setFillInputs({ ...fillInputs, [currentIdx]: e.target.value })}
                placeholder={locale === "th" ? "พิมพ์คำตอบของคำสั่ง..." : "Type command answer..."}
                className="flex-1 bg-transparent text-charcoal-900 dark:text-white outline-none font-medium"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-3 mb-6">
            {currentQ.options?.map((opt) => {
              const isSelected = Array.isArray(currentAnswer)
                ? currentAnswer.includes(opt.id)
                : currentAnswer === opt.id;

              const isThisCorrect = Array.isArray(currentQ.correctAnswer)
                ? currentQ.correctAnswer.includes(opt.id)
                : currentQ.correctAnswer === opt.id;

              let style =
                "border-gray-200 dark:border-charcoal-700 bg-gray-50/70 dark:bg-charcoal-800/60 text-charcoal-800 dark:text-gray-200 hover:border-redbrick-500/50";

              if (isSelected) {
                style =
                  "border-redbrick-600 bg-redbrick-50/60 dark:bg-redbrick-950/30 text-redbrick-900 dark:text-redbrick-200 font-medium";
              }

              if (isCurrentSubmitted) {
                if (isThisCorrect) {
                  style =
                    "border-green-600 bg-green-50 dark:bg-green-950/40 text-green-900 dark:text-green-200 font-bold";
                } else if (isSelected && !isThisCorrect) {
                  style =
                    "border-red-600 bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-200 line-through";
                }
              }

              return (
                <button
                  key={opt.id}
                  onClick={() =>
                    currentQ.type === "multiple"
                      ? handleToggleMultiple(opt.id)
                      : handleSelectSingle(opt.id)
                  }
                  disabled={isCurrentSubmitted}
                  className={`w-full text-left p-4 rounded-xl border text-sm sm:text-base lg:text-[17px] transition-all flex items-center justify-between shadow-sm ${style}`}
                >
                  <span className="leading-relaxed">{opt.text}</span>
                  {isCurrentSubmitted && isThisCorrect && (
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 ml-3" />
                  )}
                  {isCurrentSubmitted && isSelected && !isThisCorrect && (
                    <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0 ml-3" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Action Button & Explanations */}
        {!isCurrentSubmitted ? (
          <button
            onClick={handleSubmitQuestion}
            disabled={
              currentQ.type === "fill"
                ? !(fillInputs[currentIdx] || "").trim()
                : currentAnswer === undefined || (Array.isArray(currentAnswer) && currentAnswer.length === 0)
            }
            className="px-6 py-3 rounded-xl bg-redbrick-600 hover:bg-redbrick-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm sm:text-base font-bold transition-all shadow-md shadow-redbrick-600/20"
          >
            {t.common.checkAnswer}
          </button>
        ) : (
          <div className="space-y-4 pt-2">
            <div
              className={`p-5 rounded-xl border flex items-start gap-3.5 ${
                isAnswerCorrect(currentIdx)
                  ? "border-green-600/30 bg-green-50/50 dark:bg-green-950/30 text-green-900 dark:text-green-200"
                  : "border-red-600/30 bg-red-50/50 dark:bg-red-950/30 text-red-900 dark:text-red-200"
              }`}
            >
              {isAnswerCorrect(currentIdx) ? (
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
              )}
              <div className="text-sm sm:text-base space-y-1">
                <div className="font-bold">
                  {isAnswerCorrect(currentIdx) ? t.common.correct : t.common.incorrect}
                </div>
                <p className="leading-relaxed opacity-95">{currentQ.explanation}</p>
              </div>
            </div>

            {/* Next or Finish Button */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  setSubmitted((prev) => ({ ...prev, [currentIdx]: false }));
                }}
                className="text-xs text-gray-500 hover:text-redbrick-600 flex items-center gap-1"
              >
                <RotateCcw className="h-3 w-3" />
                <span>{t.common.retryQuestion}</span>
              </button>

              {currentIdx < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentIdx((i) => i + 1)}
                  className="px-4 py-2 rounded-lg bg-charcoal-900 dark:bg-white text-white dark:text-charcoal-900 font-bold text-xs flex items-center gap-1.5 hover:opacity-90 transition-opacity"
                >
                  <span>{t.common.nextQuestion}</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <div className="text-xs font-bold text-green-600 dark:text-green-400">
                  {locale === "th" ? "ทำแบบทดสอบครบแล้ว! บันทึกคะแนนสำเร็จ" : "Quiz Completed! Score saved."}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Teacher Mode Solution peek */}
        {teacherMode && (
          <div className="mt-4 pt-3 border-t border-amber-500/20 text-xs text-amber-700 dark:text-amber-400 font-mono">
            {locale === "th" ? "เฉลยสำหรับผู้สอน:" : "Teacher Key:"} <strong>{JSON.stringify(currentQ.correctAnswer)}</strong>
          </div>
        )}
      </div>
    </div>
  );
}
