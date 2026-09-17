export type FileType = "file" | "directory" | "device";

export interface FSNode {
  name: string;
  type: FileType;
  content?: string;
  children?: Record<string, FSNode>;
  permissions?: string;
  owner?: string;
  group?: string;
  size?: number;
  modifiedAt?: string;
}

export interface TerminalCommandResult {
  output: string;
  exitCode: number;
  newCwd?: string;
}

export interface TerminalHistoryItem {
  id: string;
  command: string;
  output: string;
  cwd: string;
  timestamp: number;
  isError?: boolean;
}
