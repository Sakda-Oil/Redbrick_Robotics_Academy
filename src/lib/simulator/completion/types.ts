import { VirtualFileSystem } from "../virtualFileSystem";

export type CompletionType = "command" | "path" | "none";

export interface CompletionContext {
  /** The entire current input line in the terminal */
  input: string;
  /** Cursor position in the input string (0-indexed). Defaults to input.length */
  cursorPosition?: number;
  /** Current working directory of the sandbox session (e.g. /home/redbrick) */
  cwd: string;
  /** The virtual filesystem instance representing student sandbox state */
  vfs: VirtualFileSystem;
  /** Custom allowed commands list (defaults to ALLOWED_COMMANDS) */
  allowedCommands?: readonly string[];
}

export interface CompletionResult {
  /** Type of completion determined by the engine */
  type: CompletionType;
  /** All candidates matching the token */
  matches: string[];
  /** The longest common prefix among all matches */
  commonPrefix: string;
  /** The updated full input line after completion */
  replacement: string;
  /** The new cursor position in the updated input */
  newCursorPosition: number;
  /** True if exactly 1 match was found and completed */
  isCompleted: boolean;
  /** True if 2 or more matches were found */
  hasMultipleMatches: boolean;
  /** The raw token that was targeted for completion */
  token: string;
}
