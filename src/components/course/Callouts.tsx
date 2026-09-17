import React from "react";
import { Info, AlertTriangle, Lightbulb, Bot, ShieldAlert } from "lucide-react";

export function InfoBox({
  title = "Concept Note",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full my-6 rounded-2xl border border-blue-500/30 bg-blue-50/60 dark:bg-blue-950/25 p-5 sm:p-6 text-base sm:text-[17px] text-blue-950 dark:text-blue-200">
      <div className="flex items-center gap-2.5 font-bold mb-2 text-blue-700 dark:text-blue-300">
        <Info className="h-5 w-5 shrink-0" />
        <span className="font-heading">{title}</span>
      </div>
      <div className="leading-[1.8] pl-7">{children}</div>
    </div>
  );
}

export function WarningBox({
  title = "Caution",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full my-6 rounded-2xl border border-amber-500/40 bg-amber-50/60 dark:bg-amber-950/25 p-5 sm:p-6 text-base sm:text-[17px] text-amber-950 dark:text-amber-200">
      <div className="flex items-center gap-2.5 font-bold mb-2 text-amber-700 dark:text-amber-400">
        <AlertTriangle className="h-5 w-5 shrink-0" />
        <span className="font-heading">{title}</span>
      </div>
      <div className="leading-[1.8] pl-7">{children}</div>
    </div>
  );
}

export function RoboticsTipBox({
  title = "Practical Robotics Context",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full my-8 rounded-2xl border-2 border-redbrick-600/30 bg-gradient-to-r from-redbrick-500/10 via-transparent to-transparent dark:from-redbrick-950/40 p-6 sm:p-7 text-base sm:text-[17px]">
      <div className="flex items-center gap-2.5 font-bold mb-3 text-redbrick-700 dark:text-redbrick-400 uppercase text-xs sm:text-sm tracking-wider font-heading">
        <Bot className="h-5 w-5 shrink-0 text-redbrick-600" />
        <span>{title}</span>
      </div>
      <div className="leading-[1.8] text-charcoal-800 dark:text-gray-200 pl-7">
        {children}
      </div>
    </div>
  );
}

export function ConceptDiagram({
  title,
  diagram,
  caption,
}: {
  title?: string;
  diagram: string;
  caption?: string;
}) {
  return (
    <div className="w-full my-8 rounded-2xl border border-gray-200 dark:border-charcoal-700 bg-charcoal-900/90 p-5 sm:p-6">
      {title && (
        <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-300 mb-3 font-mono">
          {title}
        </div>
      )}
      <pre className="font-mono text-sm sm:text-base text-green-400 overflow-x-auto leading-relaxed p-4 rounded-xl bg-black/60 border border-charcoal-800">
        {diagram}
      </pre>
      {caption && (
        <p className="mt-3 text-xs sm:text-sm text-center text-gray-400 italic">
          {caption}
        </p>
      )}
    </div>
  );
}
