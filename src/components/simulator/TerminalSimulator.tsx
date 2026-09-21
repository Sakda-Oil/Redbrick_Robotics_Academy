"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Terminal, Maximize2, Minimize2, RotateCcw, Copy, Check } from "lucide-react";
import { VirtualFileSystem } from "@/lib/simulator/virtualFileSystem";
import { ROS2Simulator } from "@/lib/simulator/ros2Simulator";
import { TerminalHistoryItem } from "@/types/terminal";
import { getCompletions } from "@/lib/simulator/completion/completionEngine";

interface TerminalSimulatorProps {
  initialCommand?: string;
  quickCommands?: string[];
  title?: string;
  heightClass?: string;
  flush?: boolean;
  onExecute?: (command: string, output: string) => void;
  fileSystem?: VirtualFileSystem;
  rosSimulator?: ROS2Simulator;
  runTrigger?: { command: string; timestamp: number; sourceCode?: string };
}

export function TerminalSimulator({
  initialCommand,
  quickCommands = ["pwd", "ls -l", "cd ~/ros2_ws", "ros2 node list", "ros2 topic list", "ros2 topic echo /scan"],
  title = "Redbrick Ubuntu 24.04 Terminal Simulator",
  heightClass = "h-80 sm:h-96",
  flush = false,
  onExecute,
  fileSystem,
  rosSimulator,
  runTrigger,
}: TerminalSimulatorProps) {
  const [fs] = useState(() => fileSystem || new VirtualFileSystem());
  const [ros] = useState(() => rosSimulator || new ROS2Simulator());

  const [history, setHistory] = useState<TerminalHistoryItem[]>([
    {
      id: "init-1",
      command: "",
      output: `Welcome to Redbrick Robotics Linux & ROS 2 Sandbox!\nUbuntu 24.04 LTS (Noble Numbat) — ROS 2 Jazzy Jalisco.\nType 'help' or click quick commands below to test.`,
      cwd: "/home/redbrick",
      timestamp: Date.now(),
    },
  ]);

  const [currentInput, setCurrentInput] = useState(initialCommand || "");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentCwd, setCurrentCwd] = useState("/home/redbrick");
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastTabRef = useRef<{ input: string; time: number } | null>(null);
  const currentCwdRef = useRef(currentCwd);
  const onExecuteRef = useRef(onExecute);

  useEffect(() => {
    onExecuteRef.current = onExecute;
  }, [onExecute]);

  // Auto-scroll to bottom on new output
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const formatPromptCwd = (cwd: string) => {
    if (cwd === "/home/redbrick") return "~";
    if (cwd.startsWith("/home/redbrick/")) return "~" + cwd.slice("/home/redbrick".length);
    return cwd;
  };

  const executeCommand = useCallback((cmdStr: string, sourceCode?: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;
    const commandCwd = currentCwdRef.current;

    let output = "";
    let isError = false;

    // Check ROS2 simulator first
    const rosResult = sourceCode ? ros.executeProgram(trimmed, sourceCode) : ros.execute(trimmed);
    if (rosResult !== null) {
      output = rosResult.output;
      isError = rosResult.exitCode !== 0;
    } else {
      // Standard Virtual File System command
      const fsResult = fs.execute(trimmed);
      output = fsResult.output;
      isError = fsResult.exitCode !== 0;
      if (fsResult.newCwd) {
        currentCwdRef.current = fsResult.newCwd;
        setCurrentCwd(fsResult.newCwd);
      }
    }

    if (output === "\x1bc") {
      setHistory([]);
    } else {
      setHistory((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          command: trimmed,
          output,
          cwd: commandCwd,
          timestamp: Date.now(),
          isError,
        },
      ]);
    }

    setCmdHistory((prev) => [trimmed, ...prev]);
    setHistoryIndex(-1);
    setCurrentInput("");

    if (onExecuteRef.current) {
      onExecuteRef.current(trimmed, output);
    }
  }, [fs, ros]);

  useEffect(() => {
    if (runTrigger && runTrigger.command) {
      executeCommand(runTrigger.command, runTrigger.sourceCode);
    }
  }, [runTrigger, executeCommand]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      lastTabRef.current = null;
      executeCommand(currentInput);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0 && historyIndex < cmdHistory.length - 1) {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setCurrentInput(cmdHistory[nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setCurrentInput(cmdHistory[nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();

      const cursorPos = inputRef.current?.selectionStart ?? currentInput.length;
      const result = getCompletions({
        input: currentInput,
        cursorPosition: cursorPos,
        cwd: currentCwd,
        vfs: fs,
      });

      if (result.matches.length === 0) {
        lastTabRef.current = null;
        return;
      }

      if (result.isCompleted) {
        // Single unique match found & completed
        setCurrentInput(result.replacement);
        lastTabRef.current = null;
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.selectionStart = result.newCursorPosition;
            inputRef.current.selectionEnd = result.newCursorPosition;
          }
        }, 0);
        return;
      }

      if (result.hasMultipleMatches) {
        // If common prefix expands the current input (e.g. 'cd D' -> 'cd Do')
        if (result.replacement !== currentInput) {
          setCurrentInput(result.replacement);
          lastTabRef.current = { input: result.replacement, time: Date.now() };
          setTimeout(() => {
            if (inputRef.current) {
              inputRef.current.selectionStart = result.newCursorPosition;
              inputRef.current.selectionEnd = result.newCursorPosition;
            }
          }, 0);
          return;
        }

        // Already at common prefix: check for double Tab (or repeat Tab press)
        const isDoubleTab =
          lastTabRef.current &&
          lastTabRef.current.input === currentInput &&
          Date.now() - lastTabRef.current.time < 3000;

        if (isDoubleTab) {
          // Display candidate matches like authentic bash
          const candidateList = result.matches.join("  ");
          setHistory((prev) => [
            ...prev,
            {
              id: Math.random().toString(),
              command: currentInput,
              output: candidateList,
              cwd: currentCwd,
              timestamp: Date.now(),
            },
          ]);
          lastTabRef.current = null;
        } else {
          lastTabRef.current = { input: currentInput, time: Date.now() };
        }
      }
      return;
    } else if (e.key === "ArrowUp") {
      lastTabRef.current = null;
      e.preventDefault();
      if (cmdHistory.length > 0 && historyIndex < cmdHistory.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setCurrentInput(cmdHistory[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      lastTabRef.current = null;
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setCurrentInput(cmdHistory[nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput("");
      }
    } else {
      // Any other key resets consecutive Tab state
      lastTabRef.current = null;
    }
  };

  const handleReset = () => {
    fs.reset();
    lastTabRef.current = null;
    setHistory([
      {
        id: Math.random().toString(),
        command: "",
        output: "Terminal session reset. Virtual file system reloaded.",
        cwd: "/home/redbrick",
        timestamp: Date.now(),
      },
    ]);
    setCurrentCwd("/home/redbrick");
  };

  const handleCopyTerminal = async () => {
    const text = history
      .map((h) => `${h.command ? `redbrick@ubuntu:${formatPromptCwd(h.cwd)}$ ${h.command}\n` : ""}${h.output}`)
      .join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`w-full ${flush ? "my-0" : "my-8"} rounded-2xl border border-charcoal-700 dark:border-charcoal-700 bg-charcoal-950 text-gray-200 overflow-hidden shadow-2xl flex flex-col font-mono transition-all ${
        isExpanded ? "fixed inset-4 z-50 h-auto" : heightClass
      }`}
    >
      {/* Terminal Title Bar */}
      <div className="px-5 py-3 bg-charcoal-900 border-b border-charcoal-800 flex items-center justify-between select-none">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/90 inline-block" />
            <span className="h-3 w-3 rounded-full bg-amber-500/90 inline-block" />
            <span className="h-3 w-3 rounded-full bg-green-500/90 inline-block" />
          </div>
          <span className="text-xs sm:text-sm text-gray-300 font-semibold pl-2 flex items-center gap-2">
            <Terminal className="h-4 w-4 text-redbrick-500" />
            {title}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopyTerminal}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-charcoal-800 transition-colors"
            title="Copy terminal session"
          >
            {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-charcoal-800 transition-colors"
            title="Reset Terminal session"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-charcoal-800 transition-colors"
            title={isExpanded ? "Minimize" : "Maximize"}
          >
            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Terminal Scroll Content Area */}
      <div
        ref={scrollRef}
        onClick={() => inputRef.current?.focus()}
        className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-3 text-sm sm:text-base lg:text-[16px] leading-relaxed cursor-text"
      >
        {history.map((item) => (
          <div key={item.id} className="space-y-1.5">
            {item.command && (
              <div className="flex items-center gap-2 font-mono">
                <span className="text-redbrick-400 font-bold select-none shrink-0">
                  redbrick@ubuntu:{formatPromptCwd(item.cwd)}$
                </span>
                <span className="text-white font-medium">{item.command}</span>
              </div>
            )}
            {item.output && (
              <pre
                className={`whitespace-pre-wrap font-mono leading-relaxed ${
                  item.isError ? "text-red-400" : "text-gray-300"
                }`}
              >
                {item.output}
              </pre>
            )}
          </div>
        ))}

        {/* Active Input Line */}
        <div className="flex items-center gap-2 pt-1 font-mono">
          <span className="text-redbrick-400 font-bold select-none shrink-0">
            redbrick@ubuntu:{formatPromptCwd(currentCwd)}$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-white outline-none border-none p-0 font-mono text-sm sm:text-base"
            spellCheck={false}
          />
        </div>
      </div>

      {/* Quick Suggestion Chips */}
      {quickCommands.length > 0 && (
        <div className="px-4 py-2.5 bg-charcoal-900 border-t border-charcoal-800 flex items-center gap-2 overflow-x-auto select-none">
          <span className="text-xs uppercase font-bold text-gray-400 shrink-0">Quick Run:</span>
          {quickCommands.map((q) => (
            <button
              key={q}
              onClick={() => executeCommand(q)}
              className="px-2.5 py-1 rounded-md bg-charcoal-800 hover:bg-redbrick-600 hover:text-white text-xs sm:text-sm text-gray-300 font-mono transition-colors shrink-0"
            >
              {q}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
