/**
 * Automated Unit Test Suite for Redbrick Robotics Terminal Completion Engine.
 * Run directly with: node scripts/test-completion.mjs
 */

import { VirtualFileSystem } from "../src/lib/simulator/virtualFileSystem.ts";
import { getCompletions, extractActiveToken } from "../src/lib/simulator/completion/completionEngine.ts";
import { ALLOWED_COMMANDS, isCommandAllowed } from "../src/lib/simulator/completion/commandAllowlist.ts";
import { findLongestCommonPrefix, completeCommand } from "../src/lib/simulator/completion/commandCompletion.ts";
import { completePath } from "../src/lib/simulator/completion/pathCompletion.ts";

let passedCount = 0;
let totalCount = 0;

function assert(condition, message) {
  totalCount++;
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  } else {
    passedCount++;
    console.log(`✅ PASS: ${message}`);
  }
}

console.log("===============================================================");
console.log("🚀 REDBRICK ROBOTICS TERMINAL TAB COMPLETION TEST SUITE");
console.log("===============================================================\n");

const vfs = new VirtualFileSystem();
const defaultCwd = "/home/redbrick";

// 1. Command Auto-completion (Single Match)
{
  const res = getCompletions({ input: "pw", cwd: defaultCwd, vfs });
  assert(res.type === "command", "1.1 Type is command");
  assert(res.isCompleted === true, "1.2 Single match is marked completed");
  assert(res.replacement === "pwd ", "1.3 'pw' completes to 'pwd ' with trailing space");
}

{
  const res = getCompletions({ input: "mk", cwd: defaultCwd, vfs });
  assert(res.isCompleted === true, "1.4 'mk' is marked completed");
  assert(res.replacement === "mkdir ", "1.5 'mk' completes to 'mkdir '");
}

{
  const res = getCompletions({ input: "who", cwd: defaultCwd, vfs });
  assert(res.replacement === "whoami ", "1.6 'who' completes to 'whoami '");
}

// 2. Command Multiple Matches & Longest Common Prefix
{
  const res = getCompletions({ input: "c", cwd: defaultCwd, vfs });
  assert(res.hasMultipleMatches === true, "2.1 'c' produces multiple matches");
  assert(res.matches.length >= 4, "2.2 Multiple matching commands found");
  assert(res.matches.includes("cat") && res.matches.includes("cd") && res.matches.includes("cp"), "2.3 Includes cat, cd, cp");
  assert(res.commonPrefix === "c", "2.4 Common prefix is 'c'");
  assert(res.replacement === "c", "2.5 Input remains 'c' on first tab without random choice");
}

// 3. Directory Completion (Must append / and NO trailing space)
{
  const res = getCompletions({ input: "cd Doc", cwd: defaultCwd, vfs });
  assert(res.type === "path", "3.1 Type is path");
  assert(res.isCompleted === true, "3.2 Single directory match is completed");
  assert(res.replacement === "cd Documents/", "3.3 'cd Doc' completes to 'cd Documents/' with trailing slash");
  assert(!res.replacement.endsWith(" "), "3.4 Directory completion has NO trailing space to allow path chaining");
}

// 4. File Completion (Must append trailing space)
{
  const res = getCompletions({ input: "cat lin", cwd: defaultCwd, vfs });
  assert(res.type === "path", "4.1 Type is path");
  assert(res.isCompleted === true, "4.2 Single file match is completed");
  assert(res.replacement === "cat linux.txt ", "4.3 'cat lin' completes to 'cat linux.txt ' with trailing space");
}

// 5. Nested Directory and File Completion
{
  const resDir = getCompletions({ input: "cd Projects/ro", cwd: defaultCwd, vfs });
  assert(resDir.isCompleted === true, "5.1 Nested directory is completed");
  assert(resDir.replacement === "cd Projects/robot/", "5.2 'cd Projects/ro' -> 'cd Projects/robot/'");

  const resFile = getCompletions({ input: "cat Documents/no", cwd: defaultCwd, vfs });
  assert(resFile.isCompleted === true, "5.3 Nested file is completed");
  assert(resFile.replacement === "cat Documents/notes.txt ", "5.4 'cat Documents/no' -> 'cat Documents/notes.txt '");
}

// 6. Multiple Path Matches & Longest Common Prefix (cd D -> cd Do)
{
  const res = getCompletions({ input: "cd D", cwd: defaultCwd, vfs });
  assert(res.hasMultipleMatches === true, "6.1 'cd D' has multiple matches");
  assert(res.matches.includes("Documents/") && res.matches.includes("Downloads/"), "6.2 Matches include Documents/ and Downloads/");
  assert(res.commonPrefix === "Do", "6.3 Common prefix is 'Do'");
  assert(res.replacement === "cd Do", "6.4 Completes to common prefix 'cd Do'");
}

// 7. Double Tab State (Input already at common prefix)
{
  const res = getCompletions({ input: "cd Do", cwd: defaultCwd, vfs });
  assert(res.hasMultipleMatches === true, "7.1 Has multiple matches");
  assert(res.replacement === "cd Do", "7.2 Replacement is unchanged so UI triggers double-tab candidate display");
}

// 8. Session Working Directory (CWD) Tracking
{
  vfs.execute("cd Documents");
  assert(vfs.cwd === "/home/redbrick/Documents", "8.1 vfs.cwd changed to /home/redbrick/Documents");
  const res = getCompletions({ input: "cat n", cwd: vfs.cwd, vfs });
  assert(res.isCompleted === true, "8.2 Finds notes.txt inside /home/redbrick/Documents");
  assert(res.replacement === "cat notes.txt ", "8.3 'cat n' completes to 'cat notes.txt ' based on session CWD");
  vfs.execute("cd ~");
}

// 9. Hidden Files Rule (Only match if token starts with '.')
{
  const resNoDot = getCompletions({ input: "cat b", cwd: defaultCwd, vfs });
  assert(!resNoDot.matches.includes(".bashrc"), "9.1 Token without dot ('b') does NOT match hidden file .bashrc");

  const resDot = getCompletions({ input: "cat .", cwd: defaultCwd, vfs });
  assert(resDot.matches.includes(".bashrc"), "9.2 Token starting with dot ('.') matches hidden file .bashrc");
}

// 10. Case Sensitivity
{
  const res = getCompletions({ input: "cd doc", cwd: defaultCwd, vfs });
  assert(res.matches.length === 0, "10.1 Case-sensitive: lowercase 'doc' does NOT match 'Documents/'");
}

// 11. Security & Sandbox Isolation
{
  assert(!isCommandAllowed("sudo"), "11.1 'sudo' is not in allowlist");
  assert(!isCommandAllowed("curl"), "11.2 'curl' is not in allowlist");
  assert(!isCommandAllowed("shutdown"), "11.3 'shutdown' is not in allowlist");

  const resSudo = getCompletions({ input: "su", cwd: defaultCwd, vfs });
  assert(resSudo.matches.length === 0, "11.4 'su' does not complete 'sudo'");

  const resCurl = getCompletions({ input: "cu", cwd: defaultCwd, vfs });
  assert(resCurl.matches.length === 0, "11.5 'cu' does not complete 'curl'");
}

// 12. Dynamic Filesystem State (touch, rm)
{
  vfs.execute("touch dynamic_lidar.log");
  const resAdded = getCompletions({ input: "cat dynamic", cwd: defaultCwd, vfs });
  assert(resAdded.isCompleted === true, "12.1 Dynamic file is autocompleted after touch");
  assert(resAdded.replacement === "cat dynamic_lidar.log ", "12.2 'cat dynamic' -> 'cat dynamic_lidar.log '");

  vfs.execute("rm dynamic_lidar.log");
  const resRemoved = getCompletions({ input: "cat dynamic", cwd: defaultCwd, vfs });
  assert(resRemoved.matches.length === 0, "12.3 Deleted file is no longer autocompleted");
}

// 13. Reset Environment
{
  vfs.execute("mkdir -p my_temp_folder");
  vfs.execute("cd /etc");
  assert(vfs.cwd === "/etc", "13.1 CWD is /etc");
  vfs.reset();
  assert(vfs.cwd === "/home/redbrick", "13.2 vfs.reset() restores CWD to /home/redbrick");
  const resReset = getCompletions({ input: "cd my_temp", cwd: vfs.cwd, vfs });
  assert(resReset.matches.length === 0, "13.3 Reset removes user created folders");
}

// 14. Token Context & Flags
{
  const resWithFlag = getCompletions({ input: "ls -la Doc", cwd: defaultCwd, vfs });
  assert(resWithFlag.type === "path", "14.1 Knows 'Doc' is path token after flag '-la'");
  assert(resWithFlag.replacement === "ls -la Documents/", "14.2 Completes 'ls -la Documents/'");
}

// 15. ROS 2 Verbs Completion
{
  const resRos = getCompletions({ input: "ros2 no", cwd: defaultCwd, vfs });
  assert(resRos.replacement === "ros2 node ", "15.1 'ros2 no' completes to 'ros2 node '");

  const resTopic = getCompletions({ input: "ros2 top", cwd: defaultCwd, vfs });
  assert(resTopic.replacement === "ros2 topic ", "15.2 'ros2 top' completes to 'ros2 topic '");
}

// 16. Cursor in Middle of Line
{
  const input = "cat lin and other text";
  // cursor right after 'lin' (index 7)
  const res = getCompletions({ input, cursorPosition: 7, cwd: defaultCwd, vfs });
  assert(res.isCompleted === true, "16.1 Completes token under cursor in middle of input");
  assert(res.replacement === "cat linux.txt and other text", "16.2 Replaces only active token and preserves suffix");
}

// 17. No Match (Graceful, no error)
{
  const res = getCompletions({ input: "nonexistent_command_xyz", cwd: defaultCwd, vfs });
  assert(res.matches.length === 0, "17.1 No matches returns empty matches array");
  assert(res.replacement === "nonexistent_command_xyz", "17.2 Input is preserved intact without corruption");
}

console.log(`\n===============================================================`);
console.log(`🎉 ALL ${passedCount}/${totalCount} TESTS PASSED WITH 100% SUCCESS!`);
console.log(`===============================================================\n`);
