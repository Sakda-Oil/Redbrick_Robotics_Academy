import { ALLOWED_COMMANDS } from "./commandAllowlist";

export interface CommandCompletionMatch {
  matches: string[];
  commonPrefix: string;
  completedToken: string;
  isCompleted: boolean;
  hasMultipleMatches: boolean;
}

/**
 * Finds the longest common prefix among an array of strings.
 */
export function findLongestCommonPrefix(strings: string[]): string {
  if (strings.length === 0) return "";
  if (strings.length === 1) return strings[0];

  let prefix = strings[0];
  for (let i = 1; i < strings.length; i++) {
    while (!strings[i].startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      if (prefix === "") return "";
    }
  }
  return prefix;
}

/**
 * Completes a command prefix against the safe command allowlist.
 */
export function completeCommand(
  prefix: string,
  allowedCommands: readonly string[] = ALLOWED_COMMANDS
): CommandCompletionMatch {
  // Linux command completion is case-sensitive
  const matches = allowedCommands.filter((cmd) => cmd.startsWith(prefix));

  if (matches.length === 0) {
    return {
      matches: [],
      commonPrefix: prefix,
      completedToken: prefix,
      isCompleted: false,
      hasMultipleMatches: false,
    };
  }

  if (matches.length === 1) {
    // Unique match: add trailing space for smooth chaining
    return {
      matches,
      commonPrefix: matches[0],
      completedToken: matches[0] + " ",
      isCompleted: true,
      hasMultipleMatches: false,
    };
  }

  // Multiple matches: extend up to the longest common prefix
  const lcp = findLongestCommonPrefix(matches);
  return {
    matches,
    commonPrefix: lcp,
    completedToken: lcp,
    isCompleted: false,
    hasMultipleMatches: true,
  };
}
