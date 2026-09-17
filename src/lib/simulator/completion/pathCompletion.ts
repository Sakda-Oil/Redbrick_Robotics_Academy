import { VirtualFileSystem } from "../virtualFileSystem";
import { FSNode } from "../../../types/terminal";
import { findLongestCommonPrefix } from "./commandCompletion";

export interface PathCompletionMatch {
  matches: string[];
  commonPrefix: string;
  completedToken: string;
  isCompleted: boolean;
  hasMultipleMatches: boolean;
}

/**
 * Completes file and directory paths based on the sandbox VirtualFileSystem state.
 * Strictly operates in-memory on the VirtualFileSystem with zero host filesystem access.
 */
export function completePath(
  rawToken: string,
  cwd: string,
  vfs: VirtualFileSystem
): PathCompletionMatch {
  // Split token into directory prefix and base prefix
  const lastSlashIndex = rawToken.lastIndexOf("/");
  let dirPart = "";
  let basePrefix = rawToken;

  if (lastSlashIndex !== -1) {
    dirPart = rawToken.slice(0, lastSlashIndex + 1);
    basePrefix = rawToken.slice(lastSlashIndex + 1);
  }

  // Resolve directory to search
  let searchDirPath = "";
  if (dirPart === "") {
    searchDirPath = cwd;
  } else if (dirPart === "~/") {
    searchDirPath = "/home/redbrick";
  } else if (dirPart.startsWith("~/")) {
    searchDirPath = vfs.resolvePath("/home/redbrick/" + dirPart.slice(2));
  } else if (dirPart.startsWith("/")) {
    searchDirPath = vfs.resolvePath(dirPart);
  } else {
    searchDirPath = vfs.resolvePath(dirPart);
  }

  // Get the directory node from VirtualFileSystem
  const dirNode = vfs.getNode(searchDirPath);
  if (!dirNode || dirNode.type !== "directory" || !dirNode.children) {
    return {
      matches: [],
      commonPrefix: basePrefix,
      completedToken: rawToken,
      isCompleted: false,
      hasMultipleMatches: false,
    };
  }

  const entries: FSNode[] = Object.values(dirNode.children);
  const isLookingForHidden = basePrefix.startsWith(".");

  // Filter entries:
  // 1. If basePrefix starts with '.', include hidden files matching prefix.
  // 2. Otherwise, exclude hidden files (starting with '.') and match prefix.
  // 3. Exact case sensitivity matching.
  const matchingEntries = entries.filter((entry) => {
    if (isLookingForHidden) {
      return entry.name.startsWith(basePrefix);
    } else {
      return !entry.name.startsWith(".") && entry.name.startsWith(basePrefix);
    }
  });

  if (matchingEntries.length === 0) {
    return {
      matches: [],
      commonPrefix: basePrefix,
      completedToken: rawToken,
      isCompleted: false,
      hasMultipleMatches: false,
    };
  }

  // Format matches with trailing slash for directories
  const candidateMatches = matchingEntries.map((entry) =>
    entry.type === "directory" ? `${entry.name}/` : entry.name
  );

  if (matchingEntries.length === 1) {
    const single = matchingEntries[0];
    const isDir = single.type === "directory";
    // For directories, append '/' without space so user can chain paths (e.g. cd Documents/)
    // For files, append a space (e.g. cat notes.txt )
    const completedToken = isDir
      ? `${dirPart}${single.name}/`
      : `${dirPart}${single.name} `;

    return {
      matches: candidateMatches,
      commonPrefix: candidateMatches[0],
      completedToken,
      isCompleted: true,
      hasMultipleMatches: false,
    };
  }

  // Multiple matches: find longest common prefix across the candidates
  const lcp = findLongestCommonPrefix(candidateMatches);
  const completedToken = `${dirPart}${lcp}`;

  return {
    matches: candidateMatches,
    commonPrefix: lcp,
    completedToken,
    isCompleted: false,
    hasMultipleMatches: true,
  };
}
