"use client";

import React, { useState } from "react";
import { CheckCircle2, Circle, ArrowRight, Terminal, Sparkles, HelpCircle } from "lucide-react";
import { Lab } from "@/types/course";
import { useProgressStore } from "@/lib/store/progressStore";
import { getTranslation } from "@/lib/i18n";
import confetti from "canvas-confetti";

interface LabStepViewerProps {
  lab: Lab;
  onRunInTerminal?: (cmd: string) => void;
}

export function LabStepViewer({ lab, onRunInTerminal }: LabStepViewerProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [stepInput, setStepInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showHint, setShowHint] = useState(false);

  const { labsCompleted, markLabCompleted, teacherMode, locale } = useProgressStore();
  const t = getTranslation(locale);
  const isLabFinished = labsCompleted.includes(lab.id) || completedSteps.length === lab.steps.length;

  const currentStepData = lab.steps[currentStep];

  const handleValidateStep = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentStepData) return;

    const input = stepInput.trim().replace(/\s+/g, " ");
    const valids = Array.isArray(currentStepData.validationCommand)
      ? currentStepData.validationCommand
      : [currentStepData.validationCommand];

    const isMatch = valids.some((v) => v.trim().replace(/\s+/g, " ") === input);

    if (isMatch) {
      setErrorMsg("");
      setStepInput("");
      setShowHint(false);

      if (onRunInTerminal) {
        onRunInTerminal(input);
      }

      const updated = [...completedSteps, currentStep];
      setCompletedSteps(updated);

      if (currentStep < lab.steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        markLabCompleted(lab.id);
        try {
          confetti({ particleCount: 60, spread: 80, origin: { y: 0.7 } });
        } catch (err) {}
      }
    } else {
      setErrorMsg(
        locale === "th"
          ? "คำสั่งยังไม่ถูกต้อง ลองใหม่อีกครั้งหรือตรวจสอบคำแนะนำในโจทย์"
          : "Incorrect command. Try again or check the task instructions."
      );
    }
  };

  return (
    <div className="my-10 rounded-xl border-2 border-redbrick-600/30 bg-charcoal-950 text-white overflow-hidden shadow-xl font-sans">
      {/* Lab Header */}
      <div className="px-5 py-4 bg-charcoal-900 border-b border-charcoal-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-redbrick-600 text-white">
            <Terminal className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-tight text-white font-heading">
              {lab.title}
            </h3>
            <p className="text-xs text-gray-400">{lab.description}</p>
          </div>
        </div>
        {isLabFinished && (
          <span className="flex items-center gap-1 text-xs font-bold text-green-400 bg-green-950/60 px-3 py-1 rounded-full border border-green-500/30">
            <CheckCircle2 className="h-4 w-4" />
            {locale === "th" ? "สำเร็จแล็บปฏิบัติการแล้ว!" : "Lab Completed!"}
          </span>
        )}
      </div>

      <div className="p-6">
        {/* Step Progression Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-6">
          {lab.steps.map((step, idx) => {
            const isDone = completedSteps.includes(idx);
            const isCurrent = idx === currentStep && !isLabFinished;

            return (
              <div
                key={step.step}
                onClick={() => setCurrentStep(idx)}
                className={`cursor-pointer p-2.5 rounded-lg border text-xs transition-all flex items-center gap-2 ${
                  isDone
                    ? "border-green-600/50 bg-green-950/20 text-green-300"
                    : isCurrent
                    ? "border-redbrick-500 bg-redbrick-950/40 text-white font-bold"
                    : "border-charcoal-800 bg-charcoal-900/40 text-gray-500"
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-400 shrink-0" />
                ) : (
                  <Circle className={`h-3.5 w-3.5 ${isCurrent ? "text-redbrick-400" : "text-gray-600"} shrink-0`} />
                )}
                <span className="truncate">
                  {locale === "th" ? `ขั้นตอนที่ ${step.step}:` : `Step ${step.step}:`} {step.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Current Active Task Card */}
        {currentStepData && !isLabFinished && (
          <div className="rounded-xl border border-charcoal-800 bg-charcoal-900/80 p-5 space-y-4">
            <div>
              <div className="text-[11px] uppercase font-bold text-redbrick-400 tracking-wider">
                {t.course.stepObjective} {currentStepData.step}
              </div>
              <h4 className="text-base font-bold text-white mt-0.5 font-heading">
                {currentStepData.instruction}
              </h4>
              <p className="text-xs sm:text-sm text-gray-300 mt-1 leading-relaxed">
                {currentStepData.task}
              </p>
            </div>

            {/* Command Input Form */}
            <form onSubmit={handleValidateStep} className="space-y-3">
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-black/80 border border-charcoal-700 focus-within:border-redbrick-500 font-mono text-xs sm:text-sm">
                <span className="text-redbrick-400 select-none font-semibold">
                  redbrick@robot:~$
                </span>
                <input
                  type="text"
                  value={stepInput}
                  onChange={(e) => {
                    setStepInput(e.target.value);
                    if (errorMsg) setErrorMsg("");
                  }}
                  placeholder={
                    locale === "th"
                      ? "พิมพ์คำสั่งที่ถูกต้องสำหรับขั้นตอนนี้..."
                      : "Enter the correct command for this step..."
                  }
                  className="flex-1 bg-transparent text-white outline-none"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-redbrick-600 hover:bg-redbrick-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <span>{t.common.executeStep}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowHint(!showHint)}
                    className="px-3 py-2 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 text-gray-300 text-xs font-medium transition-colors flex items-center gap-1"
                  >
                    <HelpCircle className="h-3.5 w-3.5 text-amber-400" />
                    <span>{showHint ? t.common.hideHint : t.common.hint}</span>
                  </button>
                </div>

                {teacherMode && (
                  <span className="text-xs font-mono text-amber-300 bg-charcoal-800 px-2 py-1 rounded">
                    Expected: {JSON.stringify(currentStepData.validationCommand)}
                  </span>
                )}
              </div>
            </form>

            {errorMsg && (
              <p className="text-xs text-red-400 font-medium">{errorMsg}</p>
            )}

            {showHint && (
              <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/30 text-xs sm:text-sm text-amber-200">
                <strong>{t.common.hint}: </strong> {currentStepData.hint}
              </div>
            )}
          </div>
        )}

        {/* Finished State */}
        {isLabFinished && (
          <div className="p-8 text-center bg-green-950/20 border border-green-500/30 rounded-xl space-y-3">
            <Sparkles className="h-10 w-10 text-green-400 mx-auto" />
            <h4 className="text-lg font-bold text-green-300 font-heading">
              {t.course.labCompleted}
            </h4>
            <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
              {t.course.labCompletedDesc}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
