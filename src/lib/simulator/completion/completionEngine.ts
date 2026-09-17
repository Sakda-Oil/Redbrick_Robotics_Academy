import { CompletionContext, CompletionResult, CompletionType } from "./types";
import { ALLOWED_COMMANDS } from "./commandAllowlist";
import { completeCommand } from "./commandCompletion";
import { completePath } from "./pathCompletion";

/**
 * Parses the command line and cursor to find the active token boundaries.
 */
export function extractActiveToken(
  input: string,
  cursor: number
): {
  token: string;
  startIndex: number;
  endIndex: number;
  isFirstToken: boolean;
} {
  const safeCursor = Math.max(0, Math.min(cursor, input.length));

  // Find start of current token (scanning backwards from cursor)
  let startIndex = safeCursor;
  while (startIndex > 0 && !/\s/.test(input[startIndex - 1])) {
    startIndex--;
  }

  // Find end of current token (scanning forwards from cursor)
  let endIndex = safeCursor;
  while (endIndex < input.length && !/\s/.test(input[endIndex])) {
    endIndex++;
  }

  const token = input.slice(startIndex, endIndex);

  // Check if there are any non-whitespace tokens before this one
  const prefixBeforeToken = input.slice(0, startIndex).trim();
  const isFirstToken = prefixBeforeToken.length === 0;

  return { token, startIndex, endIndex, isFirstToken };
}

/**
 * ROS 2 CLI verb completions for enhanced robotics workflow
 */
const ROS2_VERBS = [
  "node",
  "topic",
  "service",
  "param",
  "action",
  "pkg",
  "run",
  "launch",
  "bag",
  "version",
] as const;

function mergeReplacement(
  prefix: string,
  completedToken: string,
  suffix: string
): { replacement: string; newCursorPosition: number } {
  let finalSuffix = suffix;
  if (completedToken.endsWith(" ") && finalSuffix.startsWith(" ")) {
    finalSuffix = finalSuffix.slice(1);
  }
  const replacement = `${prefix}${completedToken}${finalSuffix}`;
  const newCursorPosition = prefix.length + completedToken.length;
  return { replacement, newCursorPosition };
}

/**
 * Evaluates completion for the current input line and cursor position.
 */
export function getCompletions(context: CompletionContext): CompletionResult {
  const {
    input,
    cursorPosition = input.length,
    cwd,
    vfs,
    allowedCommands = ALLOWED_COMMANDS,
  } = context;

  const { token, startIndex, endIndex, isFirstToken } = extractActiveToken(
    input,
    cursorPosition
  );

  const prefixBeforeToken = input.slice(0, startIndex);
  const suffixAfterToken = input.slice(endIndex);

  // 1. First token -> Command Completion
  if (isFirstToken) {
    const cmdResult = completeCommand(token, allowedCommands);

    if (cmdResult.matches.length === 0) {
      return {
        type: "command",
        matches: [],
        commonPrefix: token,
        replacement: input,
        newCursorPosition: cursorPosition,
        isCompleted: false,
        hasMultipleMatches: false,
        token,
      };
    }

    const { replacement, newCursorPosition } = mergeReplacement(
      prefixBeforeToken,
      cmdResult.completedToken,
      suffixAfterToken
    );

    return {
      type: "command",
      matches: cmdResult.matches,
      commonPrefix: cmdResult.commonPrefix,
      replacement,
      newCursorPosition,
      isCompleted: cmdResult.isCompleted,
      hasMultipleMatches: cmdResult.hasMultipleMatches,
      token,
    };
  }

  // 2. Check if previous token was 'ros2' and this is the second token -> ROS 2 Verb Completion
  const trimmedPrefix = prefixBeforeToken.trim();
  if (trimmedPrefix === "ros2") {
    const verbResult = completeCommand(token, ROS2_VERBS);
    if (verbResult.matches.length > 0) {
      const { replacement, newCursorPosition } = mergeReplacement(
        prefixBeforeToken,
        verbResult.completedToken,
        suffixAfterToken
      );

      return {
        type: "command",
        matches: verbResult.matches,
        commonPrefix: verbResult.commonPrefix,
        replacement,
        newCursorPosition,
        isCompleted: verbResult.isCompleted,
        hasMultipleMatches: verbResult.hasMultipleMatches,
        token,
      };
    }
  }

  // 3. Subsequent tokens -> Path / File Completion in sandbox
  const pathResult = completePath(token, cwd, vfs);

  if (pathResult.matches.length === 0) {
    return {
      type: "path",
      matches: [],
      commonPrefix: token,
      replacement: input,
      newCursorPosition: cursorPosition,
      isCompleted: false,
      hasMultipleMatches: false,
      token,
    };
  }

  const { replacement, newCursorPosition } = mergeReplacement(
    prefixBeforeToken,
    pathResult.completedToken,
    suffixAfterToken
  );

  return {
    type: "path",
    matches: pathResult.matches,
    commonPrefix: pathResult.commonPrefix,
    replacement,
    newCursorPosition,
    isCompleted: pathResult.isCompleted,
    hasMultipleMatches: pathResult.hasMultipleMatches,
    token,
  };
}
