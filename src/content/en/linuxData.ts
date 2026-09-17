import { CourseData, LessonContent } from "@/types/course";

export const LINUX_COURSE: CourseData = {
  id: "linux",
  title: "Linux Fundamentals for Robotics",
  tagline: "From command line zero to Ubuntu 24.04 robotics engineer",
  description:
    "Master the essential operating system underpinning modern robotics. Learn file hierarchies, process management, shell scripting, and device permissions for LiDAR, cameras, and microcontrollers.",
  targetAudience: "Students, Engineers, Robotics Developers & Makers",
  badge: "Ubuntu 24.04 LTS Compatible",
  iconName: "Terminal",
  accentColor: "#B5230E",
  totalModules: 10,
  totalLessons: 23,
  estimatedHours: 12,
  modules: [
    {
      id: "mod-1",
      number: 1,
      title: "Introduction & Architecture",
      description: "Linux kernel, Ubuntu 24.04 LTS, and why robotics relies on Linux.",
      lessons: [
        { id: "linux-01", slug: "01-introduction", title: "01. What is Linux & Ubuntu 24.04", durationMinutes: 15 },
        { id: "linux-02", slug: "02-terminal", title: "02. Terminal, Shell & Bash", durationMinutes: 15 },
      ],
    },
    {
      id: "mod-2",
      number: 2,
      title: "Navigation & File System",
      description: "Moving through directories and understanding robotics workspaces.",
      lessons: [
        { id: "linux-03", slug: "03-pwd", title: "03. pwd — Current Working Directory", durationMinutes: 10 },
        { id: "linux-04", slug: "04-ls", title: "04. ls — Listing Robot Files & Flags", durationMinutes: 20 },
        { id: "linux-05", slug: "05-cd", title: "05. cd — Navigating Directories & Paths", durationMinutes: 20 },
      ],
    },
    {
      id: "mod-3",
      number: 3,
      title: "File & Directory Management",
      description: "Creating workspaces, config files, and managing robot code.",
      lessons: [
        { id: "linux-06", slug: "06-mkdir", title: "06. mkdir — Building ROS Workspaces", durationMinutes: 15 },
        { id: "linux-07", slug: "07-touch", title: "07. touch — Creating Nodes & Scripts", durationMinutes: 10 },
        { id: "linux-08", slug: "08-cp-mv-rm", title: "08. cp, mv, rm — Safe File Operations", durationMinutes: 25 },
      ],
    },
    {
      id: "mod-4",
      number: 4,
      title: "Inspection, Search & Logs",
      description: "Inspecting sensor configs, grepping logs, and finding robot launch files.",
      lessons: [
        { id: "linux-09", slug: "09-cat-grep-find", title: "09. cat, grep & find in Robotics", durationMinutes: 20 },
      ],
    },
    {
      id: "mod-5",
      number: 5,
      title: "Robotics Hardware & Permissions",
      description: "Managing /dev/ttyUSB0, udev rules, sudo, and dialout permissions.",
      lessons: [
        { id: "linux-10", slug: "10-permissions-robotics", title: "10. chmod, sudo & Serial Ports", durationMinutes: 25 },
      ],
    },
  ],
};

export const LINUX_LESSONS: Record<string, LessonContent> = {
  "01-introduction": {
    id: "linux-01",
    slug: "01-introduction",
    title: "What is Linux & Why Robotics Runs on Ubuntu 24.04",
    courseId: "linux",
    moduleNumber: 1,
    moduleTitle: "Introduction & Architecture",
    order: 1,
    durationMinutes: 15,
    difficulty: "Beginner",
    learningObjectives: [
      "Understand what an operating system kernel and distribution are.",
      "Understand why Ubuntu 24.04 LTS (Noble Numbat) is the tier-1 platform for ROS 2 Jazzy.",
      "Learn the core Linux root file system layout (/etc, /dev, /home, /opt).",
    ],
    concept: `Linux is a free, open-source, POSIX-compliant operating system kernel created by Linus Torvalds in 1991.
In modern robotics, over 95% of industrial robots, autonomous mobile robots (AMRs), drones, and research platforms operate on Linux, primarily **Ubuntu Linux**.

Ubuntu 24.04 LTS (Noble Numbat) provides:
1. **Deterministic Hardware Access**: Direct low-overhead communication with microcontrollers (via USB serial, CAN bus, I2C, SPI).
2. **First-class ROS 2 Jazzy Jalisco Support**: Official pre-compiled binary packages and continuous integration.
3. **PREEMPT_RT Real-Time Capabilities**: Near real-time deterministic scheduling required for high-frequency motor control loops.
4. **Massive Robotics Ecosystem**: Native drivers for LiDAR (RPLiDAR, Velodyne, Livox), Depth Cameras (Intel RealSense, OAK-D), and IMUs.`,
    syntax: `uname -a\nlsb_release -a`,
    syntaxExplanation: `Run 'uname -a' to inspect kernel version and architecture (x86_64 or aarch64 on Raspberry Pi 5). Run 'lsb_release -a' to verify your Ubuntu release version.`,
    examples: [
      {
        title: "Check System Kernel & Architecture",
        language: "bash",
        code: `uname -a`,
        explanation: "Displays kernel name, hostname, kernel version, and CPU architecture (e.g. aarch64 on Raspberry Pi 5).",
        output: `Linux redbrick-robot 6.8.0-31-generic #31-Ubuntu SMP PREEMPT_DYNAMIC aarch64 GNU/Linux`,
      },
      {
        title: "Verify Ubuntu 24.04 LTS Codename",
        language: "bash",
        code: `cat /etc/os-release`,
        explanation: "Reads the OS release identification file confirming Ubuntu 24.04 LTS Noble Numbat.",
        output: `NAME="Ubuntu"\nVERSION="24.04 LTS (Noble Numbat)"\nID=ubuntu\nVERSION_ID="24.04"`,
      },
    ],
    roboticsContext: {
      title: "Why /dev and /opt are crucial for robotics",
      description: "Unlike Windows where hardware uses arbitrary COM ports, Linux represents hardware as files under /dev (e.g., /dev/ttyUSB0 for LiDAR or /dev/video0 for camera). ROS 2 itself is installed under /opt/ros/jazzy.",
      diagram: `/ (Root)
├── bin         (Core command binaries: bash, ls)
├── dev         (Robot hardware devices: ttyUSB0, video0, i2c)
├── etc         (System configs & udev rules)
├── home
│   └── redbrick (User workspace: ros2_ws, robot_ws)
└── opt
    └── ros
        └── jazzy (ROS 2 Jazzy Jalisco installation)`,
    },
    commonMistakes: [
      {
        mistake: "Assuming case-insensitive file paths like in Windows.",
        solution: "Linux is strictly case-sensitive. 'Ros2_ws', 'ros2_ws', and 'ROS2_WS' are three completely different directories.",
      },
      {
        mistake: "Working directly in the root directory '/' as root user.",
        solution: "Always work in your user home directory (/home/redbrick or ~) to avoid corrupting OS binaries.",
      },
    ],
    exercise: {
      instruction: "Check the OS release configuration file using the cat command on /etc/os-release.",
      initialCommand: "cat ",
      targetCommand: "cat /etc/os-release",
      hint: "Type 'cat /etc/os-release' to inspect the Ubuntu version.",
      explanation: "cat reads and prints the content of text files directly to your standard terminal output.",
    },
    quiz: [
      {
        id: "q1",
        type: "single",
        question: "Which Ubuntu version is the primary LTS tier-1 release for ROS 2 Jazzy Jalisco?",
        options: [
          { id: "a", text: "Ubuntu 20.04 LTS (Focal)" },
          { id: "b", text: "Ubuntu 22.04 LTS (Jammy)" },
          { id: "c", text: "Ubuntu 24.04 LTS (Noble Numbat)" },
          { id: "d", text: "Ubuntu 18.04 LTS (Bionic)" },
        ],
        correctAnswer: "c",
        explanation: "ROS 2 Jazzy Jalisco is specifically paired and officially supported on Ubuntu 24.04 LTS (Noble Numbat).",
      },
      {
        id: "q2",
        type: "single",
        question: "Where in the Linux file system are hardware devices like LiDAR and serial converters mapped?",
        options: [
          { id: "a", text: "/etc" },
          { id: "b", text: "/dev" },
          { id: "c", text: "/home" },
          { id: "d", text: "/var" },
        ],
        correctAnswer: "b",
        explanation: "The /dev (devices) directory exposes device nodes such as /dev/ttyUSB0 and /dev/ttyACM0 for microcontroller communication.",
      },
    ],
    teacherNotes: {
      pedagogicalGoal: "Dispel the fear of the command line and establish clear appreciation for why Linux is the universal standard for autonomous robots.",
      keyPointsToEmphasize: [
        "Case sensitivity in Linux vs Windows",
        "The concept of 'everything is a file' in UNIX",
        "Ubuntu 24.04 LTS stability and ROS 2 Jazzy release cycle (May 2024 - May 2029)",
      ],
      commonStudentConfusions: [
        "Students coming from Windows often look for C:\\ drive; explain the single root tree hierarchy.",
      ],
      suggestedDiscussionPrompt: "Why do you think automotive and AMR companies prefer Linux over proprietary desktop operating systems?",
    },
    nextLesson: { title: "02. Linux Terminal & Shell", slug: "02-terminal" },
  },

  "02-terminal": {
    id: "linux-02",
    slug: "02-terminal",
    title: "Linux Terminal, Shell & Bash Fundamentals",
    courseId: "linux",
    moduleNumber: 1,
    moduleTitle: "Introduction & Architecture",
    order: 2,
    durationMinutes: 15,
    difficulty: "Beginner",
    learningObjectives: [
      "Differentiate between Terminal Emulator, Shell, and Bash.",
      "Master crucial CLI keyboard shortcuts: Ctrl+C, Ctrl+L, Tab completion.",
      "Understand standard input, standard output, and standard error streams.",
    ],
    concept: `The **Terminal** is the text interface window, while the **Shell** is the command-line interpreter that reads your keystrokes and executes programs.
In Ubuntu 24.04, the default shell is **Bash** (Bourne-Again SHell).

Essential Shortcuts for Robotics Developers:
- **Tab**: Auto-completes file, package, and topic names. Double-Tab lists all matching candidates.
- **Ctrl + C**: Sends the \`SIGINT\` signal to gracefully stop a running robot node or launch file.
- **Ctrl + L**: Clears the visible terminal screen (equivalent to the \`clear\` command).
- **Up / Down Arrows**: Recalls previous command history so you don't have to retype long colcon or ros2 commands.`,
    syntax: `whoami\nhostname\nclear`,
    syntaxExplanation: `The prompt follows the pattern: username@hostname:current_directory$. The '$' symbol denotes a standard user, whereas '#' denotes the root superuser.`,
    examples: [
      {
        title: "Identify Active User",
        language: "bash",
        code: `whoami`,
        explanation: "Outputs the username of the currently logged-in account.",
        output: `redbrick`,
      },
      {
        title: "Identify Machine Hostname",
        language: "bash",
        code: `hostname`,
        explanation: "Prints the network name of the robot controller.",
        output: `redbrick-robot`,
      },
    ],
    roboticsContext: {
      title: "SSH and Headless Robot Control",
      description: "90% of the time, an autonomous robot does not have a screen, keyboard, or mouse attached. Engineers connect remotely via SSH into the robot's onboard computer (e.g. Raspberry Pi 5) through the terminal.",
    },
    commonMistakes: [
      {
        mistake: "Pressing Ctrl+Z instead of Ctrl+C to stop a robot node.",
        solution: "Ctrl+Z suspends the process in the background, keeping motors or serial ports locked. Always use Ctrl+C to send SIGINT.",
      },
    ],
    exercise: {
      instruction: "Run the command to determine which user you are currently logged in as.",
      initialCommand: "",
      targetCommand: "whoami",
      hint: "Use the command that asks 'who am i'.",
      explanation: "whoami returns the current user identity 'redbrick'.",
    },
    quiz: [
      {
        id: "q-term-1",
        type: "single",
        question: "What keyboard shortcut is used to safely interrupt and stop a running ROS 2 node in the terminal?",
        options: [
          { id: "a", text: "Ctrl + V" },
          { id: "b", text: "Ctrl + C" },
          { id: "c", text: "Ctrl + Z" },
          { id: "d", text: "Esc + Enter" },
        ],
        correctAnswer: "b",
        explanation: "Ctrl+C sends a SIGINT signal allowing ROS nodes to trigger shutdown hooks, release hardware locks, and safely stop motors.",
      },
    ],
    teacherNotes: {
      pedagogicalGoal: "Make students comfortable with prompt anatomy and terminal navigation mechanics.",
      keyPointsToEmphasize: ["Difference between terminal and shell", "Power of Tab completion in ROS 2 CLI"],
      commonStudentConfusions: ["Confusing Ctrl+C (interrupt in terminal) with Copy (Ctrl+Shift+C in Linux terminal)"],
      suggestedDiscussionPrompt: "Why is Tab completion especially vital when typing long ROS 2 message types like geometry_msgs/msg/PoseWithCovarianceStamped?",
    },
    prevLesson: { title: "01. Linux Introduction", slug: "01-introduction" },
    nextLesson: { title: "03. pwd Command", slug: "03-pwd" },
  },

  "03-pwd": {
    id: "linux-03",
    slug: "03-pwd",
    title: "Linux pwd Command — Print Working Directory",
    courseId: "linux",
    moduleNumber: 2,
    moduleTitle: "Navigation & File System",
    order: 3,
    durationMinutes: 10,
    difficulty: "Beginner",
    learningObjectives: [
      "Understand what the Current Working Directory (CWD) is.",
      "Execute 'pwd' to locate absolute file paths.",
      "Understand the difference between absolute paths (/home/redbrick) and relative paths.",
    ],
    concept: `In Linux, every terminal session has a **Current Working Directory (CWD)** — the directory in which the terminal is currently positioned.
Any command you run without specifying a full path operates relative to this directory.

The **\`pwd\`** (Print Working Directory) command prints the full absolute path from the root \`/\` to your current location.`,
    syntax: `pwd [OPTIONS]`,
    syntaxExplanation: `pwd prints the full pathname of the current working directory. The -P flag resolves any symbolic links to physical locations.`,
    examples: [
      {
        title: "Print Working Directory",
        language: "bash",
        code: `pwd`,
        explanation: "Displays your current path in the virtual file system.",
        output: `/home/redbrick`,
      },
    ],
    roboticsContext: {
      title: "Why absolute paths matter for robot launch files and rosbag recording",
      description: "When launching robot nodes or recording sensor logs with rosbag, using relative paths can cause files to be saved in unexpected directories. Knowing your absolute directory prevents data loss.",
    },
    commonMistakes: [
      {
        mistake: "Confusing the tilde symbol (~) with the root directory (/).",
        solution: "~ represents /home/username (e.g. /home/redbrick), whereas / is the root of the entire operating system.",
      },
    ],
    exercise: {
      instruction: "Print your current working directory to verify where you are located.",
      initialCommand: "",
      targetCommand: "pwd",
      hint: "Type 'pwd' and press Enter.",
      explanation: "pwd prints the current working directory /home/redbrick.",
    },
    quiz: [
      {
        id: "q-pwd-1",
        type: "single",
        question: "What does the 'pwd' command stand for?",
        options: [
          { id: "a", text: "Program Working Directory" },
          { id: "b", text: "Print Working Directory" },
          { id: "c", text: "Process Working Daemon" },
          { id: "d", text: "Password Directory" },
        ],
        correctAnswer: "b",
        explanation: "pwd stands for Print Working Directory.",
      },
    ],
    teacherNotes: {
      pedagogicalGoal: "Anchor students in the concept of absolute vs relative paths.",
      keyPointsToEmphasize: ["~ is an alias for /home/user", "Paths starting with / are absolute"],
      commonStudentConfusions: ["Thinking pwd changes directory (it only displays it)"],
      suggestedDiscussionPrompt: "How does CWD affect where 'colcon build' looks for packages?",
    },
    prevLesson: { title: "02. Linux Terminal & Shell", slug: "02-terminal" },
    nextLesson: { title: "04. ls Command", slug: "04-ls" },
  },

  "04-ls": {
    id: "linux-04",
    slug: "04-ls",
    title: "Linux ls Command — Inspecting Robotics Workspaces",
    courseId: "linux",
    moduleNumber: 2,
    moduleTitle: "Navigation & File System",
    order: 4,
    durationMinutes: 20,
    difficulty: "Beginner",
    learningObjectives: [
      "Use 'ls' to list files and directories.",
      "Master flags: -l (long format), -a (all/hidden files), -h (human-readable sizes).",
      "Combine flags into common developer idioms like 'ls -la' and 'ls -lh'.",
    ],
    concept: `The **\`ls\`** (list) command displays the contents of a directory. By default, it shows visible files in the current folder.
In robotics, you frequently use \`ls\` to verify package sources, launch scripts, and check if sensor hardware appears in \`/dev\`.

Key Options:
- **\`ls -l\`**: Displays long format listing file permissions, owner, group, file size, and modification timestamp.
- **\`ls -a\`**: Lists all files, including hidden files (those whose name starts with a dot \`.\`, such as \`.bashrc\`).
- **\`ls -lh\`**: Displays sizes in human-friendly units (KB, MB, GB).
- **\`ls -la\`**: Combines both to give complete visibility into any folder.`,
    syntax: `ls [OPTIONS] [FILE/DIRECTORY]`,
    syntaxExplanation: `Without arguments, ls lists the CWD. You can also supply a path like 'ls /dev' or 'ls ~/ros2_ws/src'.`,
    examples: [
      {
        title: "Standard Directory Listing",
        language: "bash",
        code: `ls`,
        explanation: "Lists visible directories in the user home.",
        output: `Documents/  Downloads/  robot_ws/  ros2_ws/`,
      },
      {
        title: "Detailed Long Listing",
        language: "bash",
        code: `ls -l`,
        explanation: "Shows permissions, ownership, and sizes of directories.",
        output: `total 16\ndrwxr-xr-x 1 redbrick redbrick   4096 Sep 14 2026 Documents/\ndrwxr-xr-x 1 redbrick redbrick   4096 Sep 14 2026 Downloads/\ndrwxr-xr-x 1 redbrick redbrick   4096 Sep 14 2026 robot_ws/\ndrwxr-xr-x 1 redbrick redbrick   4096 Sep 14 2026 ros2_ws/`,
      },
      {
        title: "Show Hidden Configuration Files",
        language: "bash",
        code: `ls -a`,
        explanation: "Reveals hidden configuration files like .bashrc where ROS 2 environment variables are stored.",
        output: `.bashrc  Documents/  Downloads/  robot_ws/  ros2_ws/`,
      },
    ],
    roboticsContext: {
      title: "Verifying Connected Microcontrollers and LiDAR",
      description: "When you plug an ESP32, Arduino, or RPLiDAR into the robot's USB port, run 'ls /dev/tty*' or 'ls /dev/ttyUSB*' to inspect the assigned device identifier.",
      commandExample: `ls -l /dev/ttyUSB0\n# Output: crw-rw---- 1 root dialout /dev/ttyUSB0`,
    },
    commonMistakes: [
      {
        mistake: "Assuming a missing file doesn't exist without checking hidden files.",
        solution: "Key configuration files like .bashrc, .profile, and .git directories are hidden. Always use 'ls -a' to inspect them.",
      },
    ],
    exercise: {
      instruction: "List all files in your home directory including hidden files using the -a flag.",
      initialCommand: "ls ",
      targetCommand: ["ls -a", "ls -la", "ls -al"],
      hint: "Add the -a flag to show all files.",
      explanation: "ls -a reveals hidden files like .bashrc where ROS 2 setup scripts are automatically loaded.",
    },
    quiz: [
      {
        id: "q-ls-1",
        type: "single",
        question: "Which command flag shows hidden files whose names start with a period (.)?",
        options: [
          { id: "a", text: "-h" },
          { id: "b", text: "-a" },
          { id: "c", text: "-l" },
          { id: "d", text: "-r" },
        ],
        correctAnswer: "b",
        explanation: "The -a (all) flag instructs ls to include entries starting with a dot, such as .bashrc.",
      },
      {
        id: "q-ls-2",
        type: "single",
        question: "What does the -l flag in 'ls -l' provide?",
        options: [
          { id: "a", text: "Low memory mode" },
          { id: "b", text: "Long listing format with permissions, ownership, and sizes" },
          { id: "c", text: "Loops endlessly" },
          { id: "d", text: "Lists only symbolic links" },
        ],
        correctAnswer: "b",
        explanation: "The -l flag produces a detailed table showing file permissions, owner, group, size, and timestamp.",
      },
    ],
    teacherNotes: {
      pedagogicalGoal: "Ensure learners can inspect any directory structure and understand what permissions and hidden dotfiles represent.",
      keyPointsToEmphasize: ["Difference between 'ls' and 'ls -l'", "Why hidden files are used for configuration (.bashrc)"],
      commonStudentConfusions: ["Students not realizing that 'ls -la' is the shorthand for 'ls -l -a'"],
      suggestedDiscussionPrompt: "Why does Linux hide files by prefixing them with a dot rather than using a proprietary file attribute?",
    },
    prevLesson: { title: "03. pwd Command", slug: "03-pwd" },
    nextLesson: { title: "05. cd Command", slug: "05-cd" },
  },

  "05-cd": {
    id: "linux-05",
    slug: "05-cd",
    title: "Linux cd Command — Navigating Robotic Workspaces",
    courseId: "linux",
    moduleNumber: 2,
    moduleTitle: "Navigation & File System",
    order: 5,
    durationMinutes: 20,
    difficulty: "Beginner",
    learningObjectives: [
      "Use 'cd' to switch current working directories.",
      "Navigate to parent directories with 'cd ..' and home with 'cd ~' or 'cd'.",
      "Switch back to the previous directory using 'cd -'.",
    ],
    concept: `The **\`cd\`** (Change Directory) command is used to move around the file system.

Essential Navigation Shortcuts:
- **\`cd ~\`** or simply **\`cd\`**: Takes you directly to your home directory (\`/home/redbrick\`).
- **\`cd ..\`**: Moves up one level to the parent directory.
- **\`cd ../..\`**: Moves up two levels.
- **\`cd -\`**: Toggles back to the previous directory you were just in.
- **\`cd .\`**: Refers to the current directory itself.`,
    syntax: `cd [DIRECTORY_PATH]`,
    syntaxExplanation: `If no path is provided, cd returns to the user's home directory ($HOME).`,
    examples: [
      {
        title: "Navigate into the ROS 2 Workspace",
        language: "bash",
        code: `cd ~/ros2_ws`,
        explanation: "Enters the ros2_ws directory in your home folder.",
      },
      {
        title: "Move up to parent directory",
        language: "bash",
        code: `cd ..`,
        explanation: "Moves up one directory level.",
      },
      {
        title: "Jump back to previous folder",
        language: "bash",
        code: `cd -`,
        explanation: "Returns to the previous working directory.",
      },
    ],
    roboticsContext: {
      title: "Building ROS 2 packages at workspace root",
      description: "In ROS 2, you must always run 'colcon build' from the root of your workspace (~/ros2_ws), NOT from inside the src folder. Mastering 'cd ..' and 'cd ~/ros2_ws' is essential to build packages without errors.",
    },
    commonMistakes: [
      {
        mistake: "Running 'colcon build' inside ~/ros2_ws/src instead of ~/ros2_ws.",
        solution: "Use 'cd ~/ros2_ws' before compiling to ensure build, install, and log folders are created in the proper root.",
      },
    ],
    exercise: {
      instruction: "Navigate into your ROS 2 workspace located at ros2_ws.",
      initialCommand: "cd ",
      targetCommand: ["cd ros2_ws", "cd ~/ros2_ws", "cd ./ros2_ws"],
      hint: "Type 'cd ros2_ws' or 'cd ~/ros2_ws'.",
      explanation: "cd changes your current working directory to ~/ros2_ws.",
    },
    quiz: [
      {
        id: "q-cd-1",
        type: "single",
        question: "Which command takes you one level up to the parent directory?",
        options: [
          { id: "a", text: "cd ." },
          { id: "b", text: "cd .." },
          { id: "c", text: "cd /" },
          { id: "d", text: "cd ~" },
        ],
        correctAnswer: "b",
        explanation: "In Unix file systems, '..' represents the parent directory.",
      },
    ],
    teacherNotes: {
      pedagogicalGoal: "Develop muscle memory for fast navigation across nested packages.",
      keyPointsToEmphasize: ["'cd -' for quick toggle between src and ws root", "Difference between / and ~"],
      commonStudentConfusions: ["Spaces in paths; explain that path segments are separated by slashes"],
      suggestedDiscussionPrompt: "Why does colcon require building at the workspace root rather than individual package subfolders?",
    },
    prevLesson: { title: "04. ls Command", slug: "04-ls" },
    nextLesson: { title: "06. mkdir Command", slug: "06-mkdir" },
  },

  "06-mkdir": {
    id: "linux-06",
    slug: "06-mkdir",
    title: "Linux mkdir Command — Building ROS 2 Workspaces",
    courseId: "linux",
    moduleNumber: 3,
    moduleTitle: "File & Directory Management",
    order: 6,
    durationMinutes: 15,
    difficulty: "Beginner",
    learningObjectives: [
      "Use 'mkdir' to create single directories.",
      "Use 'mkdir -p' to create parent directory hierarchies in a single command.",
      "Construct the standard ROS 2 workspace folder structure: ~/ros2_ws/src.",
    ],
    concept: `The **\`mkdir\`** (Make Directory) command creates one or more new folders.

The most critical flag in robotics development is **\`-p\` (parents)**.
Without \`-p\`, attempting to create \`mkdir ros2_ws/src\` when \`ros2_ws\` does not yet exist will result in an error: \`No such file or directory\`.
With \`-p\`, Linux automatically creates all necessary intermediate folders along the path.`,
    syntax: `mkdir [OPTIONS] DIRECTORY_NAME...`,
    syntaxExplanation: `mkdir -p creates parent directories as needed with no error if they already exist.`,
    examples: [
      {
        title: "Create Standard ROS 2 Workspace Structure",
        language: "bash",
        code: `mkdir -p ~/ros2_ws/src`,
        explanation: "Creates both 'ros2_ws' and its nested 'src' subfolder in one command.",
      },
      {
        title: "Create Robot Config and Launch Folders",
        language: "bash",
        code: `mkdir -p ~/robot_ws/launch ~/robot_ws/config ~/robot_ws/maps`,
        explanation: "Creates multiple directories simultaneously.",
      },
    ],
    roboticsContext: {
      title: "The Golden Standard of ROS 2 Workspaces",
      description: "Every ROS 2 developer begins a project with 'mkdir -p ~/ros2_ws/src'. Your custom C++ and Python packages live inside 'src', while colcon generates 'build', 'install', and 'log' adjacent to it.",
      diagram: `~/ros2_ws/
├── src/        <- YOU CREATE THIS with mkdir -p
│   ├── robot_description/
│   └── robot_navigation/
├── build/      <- Generated automatically by colcon
├── install/    <- Generated automatically by colcon
└── log/        <- Generated automatically by colcon`,
    },
    commonMistakes: [
      {
        mistake: "Running 'mkdir ros2_ws/src' without the -p flag when ros2_ws doesn't exist.",
        solution: "Always use 'mkdir -p' when creating nested folder hierarchies.",
      },
    ],
    exercise: {
      instruction: "Create a directory named robot_ws in your home directory.",
      initialCommand: "mkdir ",
      targetCommand: ["mkdir robot_ws", "mkdir ~/robot_ws"],
      hint: "Use 'mkdir robot_ws'.",
      explanation: "mkdir robot_ws creates a new folder for your robotics project.",
    },
    quiz: [
      {
        id: "q-mkdir-1",
        type: "single",
        question: "Which flag allows mkdir to create nested parent directories automatically if they do not exist?",
        options: [
          { id: "a", text: "-r" },
          { id: "b", text: "-f" },
          { id: "c", text: "-p" },
          { id: "d", text: "-a" },
        ],
        correctAnswer: "c",
        explanation: "The -p (parents) flag creates parent directories along the path without error.",
      },
    ],
    teacherNotes: {
      pedagogicalGoal: "Instill the standard ROS 2 workspace creation habit (mkdir -p ~/ros2_ws/src).",
      keyPointsToEmphasize: ["Never put robot source code outside 'src' in a ROS 2 workspace"],
      commonStudentConfusions: ["Wondering why mkdir fails on nested paths without -p"],
      suggestedDiscussionPrompt: "Why does ROS 2 separate 'src' from 'install' and 'build'?",
    },
    prevLesson: { title: "05. cd Command", slug: "05-cd" },
    nextLesson: { title: "07. touch Command", slug: "07-touch" },
  },

  "07-touch": {
    id: "linux-07",
    slug: "07-touch",
    title: "Linux touch Command — Creating Nodes & Scripts",
    courseId: "linux",
    moduleNumber: 3,
    moduleTitle: "File & Directory Management",
    order: 7,
    durationMinutes: 10,
    difficulty: "Beginner",
    learningObjectives: [
      "Use 'touch' to create new empty files.",
      "Understand how 'touch' updates file access and modification timestamps.",
      "Create Python node files, launch scripts, and YAML configurations.",
    ],
    concept: `The **\`touch\`** command creates a new empty file if the specified file does not exist.
If the file already exists, \`touch\` updates its access and modification timestamps to the current system time without altering its contents.`,
    syntax: `touch [OPTIONS] FILE_NAME...`,
    syntaxExplanation: `Creates empty files. Multiple file names can be provided to create several files at once.`,
    examples: [
      {
        title: "Create Python Node File",
        language: "bash",
        code: `touch robot_controller.py`,
        explanation: "Creates an empty Python file ready to receive rclpy node code.",
      },
      {
        title: "Create Multiple Files Simultaneously",
        language: "bash",
        code: `touch params.yaml robot.launch.py README.md`,
        explanation: "Creates parameter, launch, and documentation files in one shot.",
      },
    ],
    roboticsContext: {
      title: "Creating ROS 2 Python package boilerplate",
      description: "When creating a Python package, packages require empty '__init__.py' files inside package directories so Python can resolve imports. Developers commonly run 'touch __init__.py'.",
    },
    commonMistakes: [
      {
        mistake: "Assuming touch creates the directory hierarchy if the folder doesn't exist.",
        solution: "touch will fail if the parent folder does not exist. Create folders with 'mkdir -p' first, then touch files.",
      },
    ],
    exercise: {
      instruction: "Create a Python script named lidar_node.py using the touch command.",
      initialCommand: "touch ",
      targetCommand: "touch lidar_node.py",
      hint: "Type 'touch lidar_node.py'.",
      explanation: "touch creates an empty file named lidar_node.py.",
    },
    quiz: [
      {
        id: "q-touch-1",
        type: "single",
        question: "What happens if you run 'touch file.txt' when 'file.txt' already exists with content?",
        options: [
          { id: "a", text: "The file is deleted and recreated empty" },
          { id: "b", text: "Its modification timestamp is updated, but contents remain untouched" },
          { id: "c", text: "An error occurs" },
          { id: "d", text: "The file is renamed" },
        ],
        correctAnswer: "b",
        explanation: "touch safely updates the modification timestamp of existing files without overwriting or clearing data.",
      },
    ],
    teacherNotes: {
      pedagogicalGoal: "Teach file creation and how build systems like make/colcon use file timestamps to determine re-compilation.",
      keyPointsToEmphasize: ["Timestamps in build systems", "__init__.py in Python modules"],
      commonStudentConfusions: ["Expecting touch to open an editor like nano or gedit"],
      suggestedDiscussionPrompt: "How does colcon/make know which C++ files changed using timestamps?",
    },
    prevLesson: { title: "06. mkdir Command", slug: "06-mkdir" },
    nextLesson: { title: "08. cp, mv, rm Commands", slug: "08-cp-mv-rm" },
  },

  "08-cp-mv-rm": {
    id: "linux-08",
    slug: "08-cp-mv-rm",
    title: "cp, mv & rm — Managing Robot Files Safely",
    courseId: "linux",
    moduleNumber: 3,
    moduleTitle: "File & Directory Management",
    order: 8,
    durationMinutes: 25,
    difficulty: "Beginner",
    learningObjectives: [
      "Copy files and directories with 'cp' and 'cp -r'.",
      "Move and rename files with 'mv'.",
      "Safely delete files and directories with 'rm' and 'rm -rf', understanding the absence of a Recycle Bin.",
    ],
    concept: `File manipulation commands are fundamental to maintaining robot software:

1. **\`cp\` (Copy)**:
   - Copy file: \`cp source.py backup.py\`
   - Copy directory recursively: \`cp -r src/ backup_src/\`
2. **\`mv\` (Move / Rename)**:
   - Rename: \`mv old_node.py new_node.py\`
   - Move: \`mv robot.launch.py ~/robot_ws/launch/\`
3. **\`rm\` (Remove)**:
   - Remove file: \`rm temp.log\`
   - Remove folder and contents: \`rm -rf build/\`
   - **WARNING**: There is **NO Trash / Recycle Bin** in the Linux terminal. Deleted files cannot be restored!`,
    syntax: `cp [OPTIONS] SOURCE DEST\nmv SOURCE DEST\nrm [OPTIONS] FILE...`,
    syntaxExplanation: `Use -r or -R for recursive operations on directories with cp and rm.`,
    examples: [
      {
        title: "Backup a Launch File",
        language: "bash",
        code: `cp robot.launch.py robot.launch.py.bak`,
        explanation: "Creates a backup copy before modifying sensitive robot parameters.",
      },
      {
        title: "Clean Colcon Build Cache",
        language: "bash",
        code: `rm -rf build/ install/ log/`,
        explanation: "Common robotics debugging step to perform a clean recompilation.",
      },
    ],
    roboticsContext: {
      title: "When to clean colcon build artifacts",
      description: "When you change CMakeLists.txt, add C++ header files, or alter message definitions, stale build files can cause elusive compile errors. Running 'rm -rf build/ install/' from the workspace root forces colcon to compile cleanly.",
    },
    commonMistakes: [
      {
        mistake: "Typing 'rm -rf /' or forgetting a dot in relative paths.",
        solution: "Never run rm -rf with sudo or on root paths. Always double-check your current directory with 'pwd' before deleting.",
      },
    ],
    exercise: {
      instruction: "Remove the temporary directory named 'test_dir' and all its contents recursively using rm -rf.",
      initialCommand: "rm ",
      targetCommand: ["rm -rf test_dir", "rm -r test_dir"],
      hint: "Use 'rm -rf test_dir'.",
      explanation: "rm -rf recursively deletes a directory and its contents without prompting.",
    },
    quiz: [
      {
        id: "q-rm-1",
        type: "single",
        question: "Is there a Recycle Bin or Trash can when deleting files with 'rm' in the Linux CLI?",
        options: [
          { id: "a", text: "Yes, in ~/.Trash" },
          { id: "b", text: "No, deletion is immediate and permanent" },
          { id: "c", text: "Yes, files can be restored with 'unrm'" },
          { id: "d", text: "Only if -f is omitted" },
        ],
        correctAnswer: "b",
        explanation: "Terminal rm directly unlinks the inode from the file system. There is no undo or Recycle Bin.",
      },
    ],
    teacherNotes: {
      pedagogicalGoal: "Instill disciplined file safety habits. Emphasize that 'rm -rf' must be used with utmost caution.",
      keyPointsToEmphasize: ["cp requires -r for folders", "mv is used for both moving AND renaming"],
      commonStudentConfusions: ["Trying to rename with 'rename' command instead of 'mv'"],
      suggestedDiscussionPrompt: "Why does Linux use 'mv' for renaming files rather than a dedicated 'rename' command?",
    },
    prevLesson: { title: "07. touch Command", slug: "07-touch" },
    nextLesson: { title: "09. cat, grep & find", slug: "09-cat-grep-find" },
  },

  "09-cat-grep-find": {
    id: "linux-09",
    slug: "09-cat-grep-find",
    title: "cat, grep & find — Inspecting Logs & Sensor Configs",
    courseId: "linux",
    moduleNumber: 4,
    moduleTitle: "Inspection, Search & Logs",
    order: 9,
    durationMinutes: 20,
    difficulty: "Intermediate",
    learningObjectives: [
      "Print and concatenate files with 'cat'.",
      "Search patterns and filter text logs using 'grep'.",
      "Locate files in large robotics codebases using 'find'.",
    ],
    concept: `Robotics systems output gigabytes of diagnostic telemetry and error messages.
Mastering text filtering tools allows you to spot sensor dropouts, crashed nodes, and misplaced launch files in seconds:

1. **\`cat\`** (Concatenate): Prints file contents to the screen.
2. **\`grep\`** (Global Regular Expression Print): Filters lines matching a keyword.
   - \`grep "ERROR" robot.log\`
   - Pipe with other commands: \`ros2 topic list | grep scan\`
3. **\`find\`**: Traverses directory trees to locate files by name:
   - \`find . -name "*.launch.py"\``,
    syntax: `cat FILE\ngrep [OPTIONS] PATTERN FILE\nfind [DIR] -name "PATTERN"`,
    syntaxExplanation: `Grep searches file contents, while find searches file names and directories.`,
    examples: [
      {
        title: "Filter Error Lines from Robot Log",
        language: "bash",
        code: `grep "ERROR" /var/log/syslog`,
        explanation: "Finds all entries containing ERROR in system logs.",
      },
      {
        title: "Find all Python Launch Files in Workspace",
        language: "bash",
        code: `find ~/ros2_ws/src -name "*.launch.py"`,
        explanation: "Finds every launch file across all installed packages.",
      },
    ],
    roboticsContext: {
      title: "Debugging crashed nodes with grep",
      description: "When a robot node fails unexpectedly, running 'cat ~/.ros/log/latest/rosout.log | grep -E \"WARN|ERROR|FATAL\"' isolates the exact failure without having to read thousands of debug messages.",
    },
    commonMistakes: [
      {
        mistake: "Using grep to find a file by filename instead of 'find'.",
        solution: "Remember: 'find' searches for filenames; 'grep' searches for text INSIDE files.",
      },
    ],
    exercise: {
      instruction: "Find all files with the '.rules' extension inside the /etc directory.",
      initialCommand: "find ",
      targetCommand: ["find /etc -name \"*.rules\"", "find /etc -name '*.rules'"],
      hint: "Use find /etc -name \"*.rules\".",
      explanation: "find searches the /etc directory for udev hardware rules matching the pattern.",
    },
    quiz: [
      {
        id: "q-grep-1",
        type: "single",
        question: "Which tool is best for searching for the word 'exception' INSIDE a 10,000-line robot log file?",
        options: [
          { id: "a", text: "find" },
          { id: "b", text: "grep" },
          { id: "c", text: "touch" },
          { id: "d", text: "mkdir" },
        ],
        correctAnswer: "b",
        explanation: "grep searches within the text content of files to extract matching lines.",
      },
    ],
    teacherNotes: {
      pedagogicalGoal: "Empower students to troubleshoot their own robotics code using command line pipelines.",
      keyPointsToEmphasize: ["find vs grep distinction", "Piping: command | grep keyword"],
      commonStudentConfusions: ["Forgetting quotes in wildcards: find . -name *.py can cause shell glob expansion errors"],
      suggestedDiscussionPrompt: "How can combining 'ros2 topic list' with 'grep' help on a complex autonomous vehicle with 200+ topics?",
    },
    prevLesson: { title: "08. cp, mv, rm Commands", slug: "08-cp-mv-rm" },
    nextLesson: { title: "10. Permissions & USB Serial", slug: "10-permissions-robotics" },
  },

  "10-permissions-robotics": {
    id: "linux-10",
    slug: "10-permissions-robotics",
    title: "chmod, sudo & USB Serial Ports for Robotics",
    courseId: "linux",
    moduleNumber: 5,
    moduleTitle: "Robotics Hardware & Permissions",
    order: 10,
    durationMinutes: 25,
    difficulty: "Intermediate",
    learningObjectives: [
      "Understand Linux file permissions: Read (r), Write (w), Execute (x).",
      "Use 'chmod +x' to make robot Python nodes and bash scripts executable.",
      "Manage serial device permissions (/dev/ttyUSB0, /dev/ttyACM0) and add users to the 'dialout' group.",
      "Understand the purpose of udev rules for persistent robot sensor symlinks.",
    ],
    concept: `Linux employs a strict permissions security model. In robotics, permissions issues are the #1 reason why nodes fail to connect to sensors.

### 1. Making Scripts Executable (\`chmod +x\`)
When you write a Python node or shell script, Linux will not execute it until you grant execution permission:
\`\`\`bash
chmod +x my_robot_node.py
\`\`\`

### 2. Serial Port Access (\`/dev/ttyUSB0\` & \`dialout\`)
Microcontrollers (ESP32, STM32, Arduino) and LiDARs appear as character devices under \`/dev/ttyUSB*\` or \`/dev/ttyACM*\`.
By default, these devices belong to the **\`dialout\`** group. If your user is not in the \`dialout\` group, your ROS 2 node will crash with:
\`\`\`
PermissionError: [Errno 13] Permission denied: '/dev/ttyUSB0'
\`\`\`

To fix permanently:
\`\`\`bash
sudo usermod -aG dialout $USER
\`\`\`
*(Log out and log back in for changes to apply).*`,
    syntax: `chmod [PERMISSIONS] FILE\nsudo usermod -aG GROUP USERNAME`,
    syntaxExplanation: `chmod +x grants execution rights. usermod -aG appends the user to a supplemental group.`,
    examples: [
      {
        title: "Make Python Node Executable",
        language: "bash",
        code: `chmod +x my_robot_controller/robot_node.py`,
        explanation: "Enables ros2 run to launch the script directly as an executable.",
      },
      {
        title: "Add Current User to Dialout Group",
        language: "bash",
        code: `sudo usermod -aG dialout $USER`,
        explanation: "Grants permanent read/write access to all USB serial ports without needing sudo.",
      },
    ],
    roboticsContext: {
      title: "Why you should NEVER run ROS 2 nodes with 'sudo'",
      description: "Beginners often try running 'sudo ros2 run ...' when getting serial permission errors. This is dangerous! It runs unverified robot control loops with root privileges, breaks user environment variables, and creates root-owned logs that lock you out. Always grant dialout group membership instead.",
    },
    commonMistakes: [
      {
        mistake: "Running nodes with 'sudo ros2 run' to bypass serial port permissions.",
        solution: "Add your user to the dialout group with 'sudo usermod -aG dialout $USER' instead.",
      },
      {
        mistake: "Forgetting to log out and log back in after adding a user to a group.",
        solution: "Group membership updates only take effect in new login sessions. Reboot or run 'newgrp dialout'.",
      },
    ],
    exercise: {
      instruction: "Add execution permission (+x) to the script named 'robot_node.py'.",
      initialCommand: "chmod ",
      targetCommand: "chmod +x robot_node.py",
      hint: "Use 'chmod +x robot_node.py'.",
      explanation: "chmod +x marks the file as executable so the operating system can run it.",
    },
    quiz: [
      {
        id: "q-perm-1",
        type: "single",
        question: "Which Linux group must your user belong to in Ubuntu to access USB serial devices like /dev/ttyUSB0 without sudo?",
        options: [
          { id: "a", text: "robot" },
          { id: "b", text: "dialout" },
          { id: "c", text: "audio" },
          { id: "d", text: "www-data" },
        ],
        correctAnswer: "b",
        explanation: "The dialout group owns serial port devices in Ubuntu. Adding your user to dialout gives permission to read and write to microcontrollers and LiDARs.",
      },
      {
        id: "q-perm-2",
        type: "single",
        question: "What command makes a newly created Python script executable?",
        options: [
          { id: "a", text: "chmod +r script.py" },
          { id: "b", text: "chmod +x script.py" },
          { id: "c", text: "touch +x script.py" },
          { id: "d", text: "chown root script.py" },
        ],
        correctAnswer: "b",
        explanation: "+x adds the execute permission bit to the file's mode.",
      },
    ],
    lab: {
      id: "linux-lab-01",
      title: "Linux Lab 01 — Prepare Clean ROS 2 Workspace & Scripts",
      description: "Follow sequential steps to prepare a production-grade ROS 2 workspace, configure directory structures, and set file permissions.",
      steps: [
        {
          step: 1,
          title: "Navigate to Home",
          instruction: "Ensure your terminal is located in your home directory.",
          task: "Type 'cd ~' or 'cd' and execute.",
          validationCommand: ["cd ~", "cd", "cd /home/redbrick"],
          hint: "Use 'cd ~' to return home.",
        },
        {
          step: 2,
          title: "Create Workspace & Source Directory",
          instruction: "Create the standard nested ROS 2 workspace folder structure: ros2_ws/src.",
          task: "Run the mkdir command with the -p flag to create 'ros2_ws/src'.",
          validationCommand: ["mkdir -p ros2_ws/src", "mkdir -p ~/ros2_ws/src"],
          hint: "Use 'mkdir -p ros2_ws/src'.",
        },
        {
          step: 3,
          title: "Create Robot Controller Script",
          instruction: "Create an empty script named 'my_controller.py' inside your home directory.",
          task: "Use the touch command to create 'my_controller.py'.",
          validationCommand: ["touch my_controller.py", "touch ~/my_controller.py"],
          hint: "Use 'touch my_controller.py'.",
        },
        {
          step: 4,
          title: "Make Script Executable",
          instruction: "Apply execution permission to 'my_controller.py' so it can run as a ROS 2 node.",
          task: "Use chmod with +x on 'my_controller.py'.",
          validationCommand: ["chmod +x my_controller.py", "chmod +x ~/my_controller.py"],
          hint: "Use 'chmod +x my_controller.py'.",
        },
      ],
    },
    teacherNotes: {
      pedagogicalGoal: "Resolve the most common roadblock in robotics training labs: permission errors on hardware ports.",
      keyPointsToEmphasize: [
        "Why 'sudo ros2 run' is dangerous and bad practice",
        "The role of udev rules in giving fixed names like /dev/rplidar",
      ],
      commonStudentConfusions: ["Thinking running chmod is necessary for non-executable YAML files"],
      suggestedDiscussionPrompt: "If a robot has two identical USB serial adapters (e.g. LiDAR and motor controller), how does Linux distinguish between them?",
    },
    prevLesson: { title: "09. cat, grep & find", slug: "09-cat-grep-find" },
  },
};
