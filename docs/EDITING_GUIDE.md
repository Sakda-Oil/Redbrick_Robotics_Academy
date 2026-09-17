# Redbrick Robotics Academy: Editing & Customization Guide

This guide lists the exact, verified file locations for modifying every component, course lesson, simulator feature, and styling token in the **Redbrick Robotics Academy** project.

---

## 📍 Direct File Map

| Feature / Area | Exact File Path in Repository |
| :--- | :--- |
| **Homepage & Hero Section** | [`src/app/page.tsx`](file:///Users/oil/Documents/Antigravity/Redbrick_Docs/src/app/page.tsx) |
| **Top Navigation Bar (Navbar)** | [`src/components/layout/Navbar.tsx`](file:///Users/oil/Documents/Antigravity/Redbrick_Docs/src/components/layout/Navbar.tsx) |
| **Course Sidebar Navigation** | [`src/components/course/CourseSidebar.tsx`](file:///Users/oil/Documents/Antigravity/Redbrick_Docs/src/components/course/CourseSidebar.tsx) |
| **Lesson Page Template / Layout** | [`src/components/course/LessonPageLayout.tsx`](file:///Users/oil/Documents/Antigravity/Redbrick_Docs/src/components/course/LessonPageLayout.tsx) |
| **Linux Course Curriculum (Default)** | [`src/content/linuxData.ts`](file:///Users/oil/Documents/Antigravity/Redbrick_Docs/src/content/linuxData.ts) |
| **Linux Course Curriculum (Thai)** | [`src/content/th/linuxData.ts`](file:///Users/oil/Documents/Antigravity/Redbrick_Docs/src/content/th/linuxData.ts) |
| **Linux Course Curriculum (English)** | [`src/content/en/linuxData.ts`](file:///Users/oil/Documents/Antigravity/Redbrick_Docs/src/content/en/linuxData.ts) |
| **ROS 2 Jazzy Curriculum (Default)** | [`src/content/ros2Data.ts`](file:///Users/oil/Documents/Antigravity/Redbrick_Docs/src/content/ros2Data.ts) |
| **ROS 2 Jazzy Curriculum (Thai)** | [`src/content/th/ros2Data.ts`](file:///Users/oil/Documents/Antigravity/Redbrick_Docs/src/content/th/ros2Data.ts) |
| **ROS 2 Jazzy Curriculum (English)** | [`src/content/en/ros2Data.ts`](file:///Users/oil/Documents/Antigravity/Redbrick_Docs/src/content/en/ros2Data.ts) |
| **UI Translations (Thai)** | [`src/locales/th.json`](file:///Users/oil/Documents/Antigravity/Redbrick_Docs/src/locales/th.json) |
| **UI Translations (English)** | [`src/locales/en.json`](file:///Users/oil/Documents/Antigravity/Redbrick_Docs/src/locales/en.json) |
| **Interactive Terminal UI** | [`src/components/simulator/TerminalSimulator.tsx`](file:///Users/oil/Documents/Antigravity/Redbrick_Docs/src/components/simulator/TerminalSimulator.tsx) |
| **Virtual File System & Shell Commands** | [`src/lib/simulator/virtualFileSystem.ts`](file:///Users/oil/Documents/Antigravity/Redbrick_Docs/src/lib/simulator/virtualFileSystem.ts) |
| **Terminal Tab Auto-Completion Engine** | [`src/lib/simulator/completion/completionEngine.ts`](file:///Users/oil/Documents/Antigravity/Redbrick_Docs/src/lib/simulator/completion/completionEngine.ts) |
| **ROS 2 Computational Graph (`rqt_graph`)** | [`src/components/simulator/ROSGraph.tsx`](file:///Users/oil/Documents/Antigravity/Redbrick_Docs/src/components/simulator/ROSGraph.tsx) |
| **2D Mobile Robot Simulator & Teleop** | [`src/components/simulator/MobileRobotSimulator.tsx`](file:///Users/oil/Documents/Antigravity/Redbrick_Docs/src/components/simulator/MobileRobotSimulator.tsx) |
| **ROS 2 Installation Lab (Ubuntu 24.04)** | [`src/components/simulator/ROS2InstallationLab.tsx`](file:///Users/oil/Documents/Antigravity/Redbrick_Docs/src/components/simulator/ROS2InstallationLab.tsx) |
| **Contextual Lesson Lab Manager** | [`src/components/simulator/LessonInteractiveLab.tsx`](file:///Users/oil/Documents/Antigravity/Redbrick_Docs/src/components/simulator/LessonInteractiveLab.tsx) |
| **Developer Playground Page** | [`src/app/playground/ros2/page.tsx`](file:///Users/oil/Documents/Antigravity/Redbrick_Docs/src/app/playground/ros2/page.tsx) |
| **Full 4-Pane Developer Sandbox** | [`src/components/simulator/ROS2InteractiveLab.tsx`](file:///Users/oil/Documents/Antigravity/Redbrick_Docs/src/components/simulator/ROS2InteractiveLab.tsx) |
| **Tailwind Theme, Colors & Fonts** | [`tailwind.config.js`](file:///Users/oil/Documents/Antigravity/Redbrick_Docs/tailwind.config.js) |
| **Global CSS & Custom Utilities** | [`src/app/globals.css`](file:///Users/oil/Documents/Antigravity/Redbrick_Docs/src/app/globals.css) |

---

## 📝 1. Editing Homepage & Hero Section

- Open [`src/app/page.tsx`](file:///Users/oil/Documents/Antigravity/Redbrick_Docs/src/app/page.tsx).
- You can edit:
  - Hero tagline, badges, and Call-To-Action buttons.
  - Course feature cards (`Linux Fundamentals` and `ROS 2 Jazzy`).
  - Interactive preview widgets.

---

## 🧭 2. Editing Navbar & Course Sidebar

- **Navbar**: Open [`src/components/layout/Navbar.tsx`](file:///Users/oil/Documents/Antigravity/Redbrick_Docs/src/components/layout/Navbar.tsx).
  - Add or remove navigation links (Courses, Playground, Cheatsheet).
  - Modify language switcher button behavior.
- **Sidebar**: Open [`src/components/course/CourseSidebar.tsx`](file:///Users/oil/Documents/Antigravity/Redbrick_Docs/src/components/course/CourseSidebar.tsx).
  - Adjust section grouping logic or default expansion behavior.
  - Adjust module badge colors or lesson completion checkmark icons.

---

## 📚 3. Editing Lessons, Quizzes & Exercises

Each lesson is stored as a structured TypeScript object.

To edit a ROS 2 Jazzy lesson (for example `06-topics`):
1. **Base Definition**: Edit [`src/content/ros2Data.ts`](file:///Users/oil/Documents/Antigravity/Redbrick_Docs/src/content/ros2Data.ts) under key `"06-topics"`.
2. **Thai Version**: Edit [`src/content/th/ros2Data.ts`](file:///Users/oil/Documents/Antigravity/Redbrick_Docs/src/content/th/ros2Data.ts) under key `"06-topics"`.
3. **English Version**: Edit [`src/content/en/ros2Data.ts`](file:///Users/oil/Documents/Antigravity/Redbrick_Docs/src/content/en/ros2Data.ts) under key `"06-topics"`.

Fields available per lesson:
- `title`: Lesson title displayed in headers and sidebar.
- `learningObjectives`: Array of bullet points shown in the top card.
- `concept`: Markdown content explaining theory and code.
- `syntax`: Code/CLI snippet.
- `examples`: Array of `{ title, code, explanation, output }`.
- `roboticsContext`: `{ title, description, diagram }` explaining real robot applications.
- `commonMistakes`: `{ mistake, solution }` troubleshooting alerts.
- `exercise`: `{ instruction, initialCommand, targetCommand, hint, explanation }`.
- `quiz`: Array of `{ id, type, question, options: [{id, text}], correctAnswer, explanation }`.

---

## 💻 4. Editing the Simulated Terminal & Tab Completion

- **Shell Command Implementation**:
  - Open [`src/lib/simulator/virtualFileSystem.ts`](file:///Users/oil/Documents/Antigravity/Redbrick_Docs/src/lib/simulator/virtualFileSystem.ts).
  - Search for `execute(commandLine: string)`. Add or change mock command handling.
- **Tab Auto-Completion Logic**:
  - Open [`src/lib/simulator/completion/completionEngine.ts`](file:///Users/oil/Documents/Antigravity/Redbrick_Docs/src/lib/simulator/completion/completionEngine.ts).
  - Adjust command matching, path parsing, or trailing space behaviors.
  - Test your changes using: `npm run test`.

---

## 🕸 5. Editing the ROS 2 Computational Graph

- Open [`src/components/simulator/ROSGraph.tsx`](file:///Users/oil/Documents/Antigravity/Redbrick_Docs/src/components/simulator/ROSGraph.tsx).
- **Node Definitions**: Find `NODES`, `PUBLISHER_NODES`, `SUBSCRIBER_NODES`, `CONTROLLER_NODES`.
  - Add or change node IDs, package names, published topics, and subscribed topics.
- **Topic Definitions**: Find `TOPICS`, `PUBLISHER_TOPICS`, `CONTROLLER_TOPICS`.
  - Add or change topic names, types (`std_msgs/msg/String`, `geometry_msgs/msg/Twist`), sample messages, and rates.

---

## 🤖 6. Editing the Mobile Robot Simulator

- Open [`src/components/simulator/MobileRobotSimulator.tsx`](file:///Users/oil/Documents/Antigravity/Redbrick_Docs/src/components/simulator/MobileRobotSimulator.tsx).
- **Robot Kinematics**:
  - Differential drive calculation is located in the animation frame loop (`updateSimulation`).
  - Max linear speed and angular velocity settings are in `speedSetting` and `turnSetting`.
- **Arena & Obstacles**:
  - Find `ARENA_OBSTACLES`. You can add boxes, walls, or docking stations with coordinates in meters.
- **Dynamic Explanation Panel**:
  - Find `What is happening? / ตอนนี้เกิดอะไรขึ้น?` to modify how active driving states are explained to learners.

---

## 🎨 7. Customizing Brand Colors & Fonts

- Open [`tailwind.config.js`](file:///Users/oil/Documents/Antigravity/Redbrick_Docs/tailwind.config.js).
- **Redbrick Red Palette**:
  - `redbrick.600`: Primary accent (`#B5230E`).
  - `redbrick.500`: Hover accent (`#D12B12`).
  - `redbrick.900` / `950`: Dark mode background badges.
- **Typography**:
  - Headings: `font-heading` (`Plus Jakarta Sans`).
  - Body: `font-sans` (`Inter`).
  - Code/Terminal: `font-mono` (`JetBrains Mono`).
