/**
 * Unified Safe Command Allowlist for Redbrick Robotics Simulator Sandbox.
 * Single source of truth for both Command Execution and Tab Auto-Completion.
 */
export const ALLOWED_COMMANDS: readonly string[] = [
  "pwd",
  "ls",
  "cd",
  "mkdir",
  "touch",
  "cat",
  "echo",
  "cp",
  "mv",
  "rm",
  "head",
  "tail",
  "grep",
  "find",
  "whoami",
  "uname",
  "date",
  "clear",
  "chmod",
  "hostname",
  "help",
  "ros2",
  "colcon",
  "source",
] as const;

/**
 * Checks if a command is within the safe sandbox allowlist.
 */
export function isCommandAllowed(command: string): boolean {
  return ALLOWED_COMMANDS.includes(command as typeof ALLOWED_COMMANDS[number]);
}
