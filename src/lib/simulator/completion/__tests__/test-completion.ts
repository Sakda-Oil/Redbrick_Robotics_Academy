import { VirtualFileSystem } from "../../virtualFileSystem";
import { getCompletions } from "../completionEngine";
import { ALLOWED_COMMANDS, isCommandAllowed } from "../commandAllowlist";

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

function runTests() {
  console.log("=== Running Redbrick Robotics Terminal Completion Test Suite ===\n");

  const vfs = new VirtualFileSystem();
  const defaultCwd = "/home/redbrick";

  // Test 1: Command Completion (single match)
  {
    const res = getCompletions({ input: "pw", cwd: defaultCwd, vfs });
    assert(res.type === "command", "Test 1.1: Type is command");
    assert(res.isCompleted === true, "Test 1.2: pw is completed");
    assert(res.replacement === "pwd ", "Test 1.3: pw completed to 'pwd '");
  }

  // Test 2: Command Completion with mkdir
  {
    const res = getCompletions({ input: "mk", cwd: defaultCwd, vfs });
    assert(res.isCompleted === true, "Test 2.1: mk is completed");
    assert(res.replacement === "mkdir ", "Test 2.2: mk completed to 'mkdir '");
  }

  // Test 3: Command Multiple Matches (c -> cat, cd, chmod, clear, colcon, cp)
  {
    const res = getCompletions({ input: "c", cwd: defaultCwd, vfs });
    assert(res.hasMultipleMatches === true, "Test 3.1: c has multiple matches");
    assert(res.matches.includes("cat") && res.matches.includes("cd") && res.matches.includes("clear"), "Test 3.2: Contains cat, cd, clear");
    assert(res.commonPrefix === "c", "Test 3.3: Common prefix is 'c'");
    assert(res.replacement === "c", "Test 3.4: Replacement stays 'c'");
  }

  // Test 4: Directory Completion (Doc -> Documents/)
  {
    const res = getCompletions({ input: "cd Doc", cwd: defaultCwd, vfs });
    assert(res.type === "path", "Test 4.1: Type is path");
    assert(res.isCompleted === true, "Test 4.2: Doc is completed");
    assert(res.replacement === "cd Documents/", "Test 4.3: cd Doc -> cd Documents/ (directory with trailing slash, no space)");
  }

  // Test 5: File Completion (lin -> linux.txt )
  {
    const res = getCompletions({ input: "cat lin", cwd: defaultCwd, vfs });
    assert(res.type === "path", "Test 5.1: Type is path");
    assert(res.isCompleted === true, "Test 5.2: lin is completed");
    assert(res.replacement === "cat linux.txt ", "Test 5.3: cat lin -> cat linux.txt  (file with trailing space)");
  }

  // Test 6: Nested Path Completion (Projects/ro -> Projects/robot/)
  {
    const res = getCompletions({ input: "cd Projects/ro", cwd: defaultCwd, vfs });
    assert(res.isCompleted === true, "Test 6.1: Projects/ro is completed");
    assert(res.replacement === "cd Projects/robot/", "Test 6.2: cd Projects/ro -> cd Projects/robot/");
  }

  // Test 7: Nested File Completion (Documents/no -> Documents/notes.txt )
  {
    const res = getCompletions({ input: "cat Documents/no", cwd: defaultCwd, vfs });
    assert(res.isCompleted === true, "Test 7.1: Documents/no is completed");
    assert(res.replacement === "cat Documents/notes.txt ", "Test 7.2: cat Documents/no -> cat Documents/notes.txt ");
  }

  // Test 8: Multiple Matches & Longest Common Prefix (cd D -> cd Do)
  {
    const res = getCompletions({ input: "cd D", cwd: defaultCwd, vfs });
    assert(res.hasMultipleMatches === true, "Test 8.1: cd D has multiple matches");
    assert(res.matches.includes("Documents/") && res.matches.includes("Downloads/"), "Test 8.2: Matches include Documents/ and Downloads/");
    assert(res.commonPrefix === "Do", "Test 8.3: Common prefix is 'Do'");
    assert(res.replacement === "cd Do", "Test 8.4: Replacement expands to 'cd Do'");
  }

  // Test 9: Consecutive Tab on already expanded common prefix (cd Do)
  {
    const res = getCompletions({ input: "cd Do", cwd: defaultCwd, vfs });
    assert(res.hasMultipleMatches === true, "Test 9.1: cd Do has multiple matches");
    assert(res.replacement === "cd Do", "Test 9.2: Replacement unchanged at 'cd Do' (ready for double tab match display)");
  }

  // Test 10: Current Working Directory Awareness (cd Documents, then cat n -> notes.txt)
  {
    vfs.execute("cd Documents");
    assert(vfs.cwd === "/home/redbrick/Documents", "Test 10.1: CWD changed to /home/redbrick/Documents");
    const res = getCompletions({ input: "cat n", cwd: vfs.cwd, vfs });
    assert(res.isCompleted === true, "Test 10.2: Finds notes.txt inside current directory Documents");
    assert(res.replacement === "cat notes.txt ", "Test 10.3: cat n -> cat notes.txt ");
    vfs.execute("cd ~");
  }

  // Test 11: Hidden Files Filtering
  {
    // cat b should NOT complete .bashrc
    const res1 = getCompletions({ input: "cat b", cwd: defaultCwd, vfs });
    assert(!res1.matches.includes(".bashrc"), "Test 11.1: cat b does NOT match hidden file .bashrc");

    // cat . SHOULD complete .bashrc
    const res2 = getCompletions({ input: "cat .", cwd: defaultCwd, vfs });
    assert(res2.matches.includes(".bashrc"), "Test 11.2: cat . matches hidden file .bashrc");
  }

  // Test 12: Case Sensitivity
  {
    const res = getCompletions({ input: "cd doc", cwd: defaultCwd, vfs });
    assert(res.matches.length === 0, "Test 12.1: Case sensitive: 'doc' does NOT match 'Documents'");
  }

  // Test 13: Sandbox Security (Forbidden commands never completed)
  {
    const resSudo = getCompletions({ input: "su", cwd: defaultCwd, vfs });
    assert(resSudo.matches.length === 0, "Test 13.1: 'sudo' is NOT in allowlist");
    assert(!isCommandAllowed("sudo"), "Test 13.2: isCommandAllowed('sudo') is false");

    const resCurl = getCompletions({ input: "cu", cwd: defaultCwd, vfs });
    assert(resCurl.matches.length === 0, "Test 13.3: 'curl' is NOT in allowlist");

    const resShut = getCompletions({ input: "shut", cwd: defaultCwd, vfs });
    assert(resShut.matches.length === 0, "Test 13.4: 'shutdown' is NOT in allowlist");
  }

  // Test 14: Dynamic Filesystem Updates (touch & rm)
  {
    vfs.execute("touch test_sensor.py");
    const res1 = getCompletions({ input: "cat test_sen", cwd: defaultCwd, vfs });
    assert(res1.isCompleted === true, "Test 14.1: Dynamically added file test_sensor.py is completed");
    assert(res1.replacement === "cat test_sensor.py ", "Test 14.2: Replacement is 'cat test_sensor.py '");

    vfs.execute("rm test_sensor.py");
    const res2 = getCompletions({ input: "cat test_sen", cwd: defaultCwd, vfs });
    assert(res2.matches.length === 0, "Test 14.3: Removed file is no longer completed");
  }

  // Test 15: Reset Environment
  {
    vfs.execute("touch temporary.log");
    vfs.execute("cd /etc");
    assert(vfs.cwd === "/etc", "Test 15.1: CWD is /etc");
    vfs.reset();
    assert(vfs.cwd === "/home/redbrick", "Test 15.2: Reset restores CWD to /home/redbrick");
    const res = getCompletions({ input: "cat temp", cwd: vfs.cwd, vfs });
    assert(res.matches.length === 0, "Test 15.3: Reset clears temporary.log from sandbox");
  }

  // Test 16: Cursor in middle of command line
  {
    // input = "cat lin and more", cursor at index 7 (after "lin")
    const res = getCompletions({
      input: "cat lin and more",
      cursorPosition: 7,
      cwd: defaultCwd,
      vfs,
    });
    assert(res.isCompleted === true, "Test 16.1: Active token 'lin' completed with cursor in middle");
    assert(res.replacement === "cat linux.txt and more", "Test 16.2: Replacement preserves suffix 'and more'");
  }

  console.log("\n🎉 ALL 16 COMPLETION TEST SUITES PASSED SUCCESSFULLY!");
}

runTests();
