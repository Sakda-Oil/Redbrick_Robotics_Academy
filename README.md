# Redbrick Robotics Academy 🤖

An interactive web learning platform for **Linux Fundamentals**, **Ubuntu Linux**, and **ROS 2 Jazzy Jalisco for Robotics**, developed by **Redbrick Robotics**.

This platform combines rich curriculum content with interactive, in-browser simulation environments—including a virtual Linux shell terminal with intelligent Tab completion, real-time ROS 2 computational graph visualization, and a 2D differential-drive mobile robot simulator with LiDAR and odometry telemetry.

---

## ⚡ Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/Sakda-Oil/Redbrick_Robotics_Academy.git
cd Redbrick_Robotics_Academy

# 2. Install dependencies
npm ci

# 3. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## ✨ Features

- **Bilingual Learning (TH / EN)**: Full internationalization support across all lessons, navigation, callouts, quizzes, and simulation interfaces.
- **Interactive Simulated Terminal**:
  - In-browser virtual Linux file system (`/home/redbrick/ros2_ws`).
  - Shell command execution (`ls`, `cd`, `pwd`, `mkdir`, `cat`, `touch`, `rm`, `source`, `colcon build`).
  - Native **Tab Completion** for commands and file paths with support for flags, relative paths, and common prefixes.
- **ROS 2 Jazzy Jalisco Integration**:
  - **Stateful 10-Step Installation Lab**: Practice official ROS 2 installation on Ubuntu 24.04 LTS (Noble Numbat) with interactive error checking and step validation.
  - **CLI Introspection**: Simulated tools for `ros2 node list`, `ros2 topic list -t`, `ros2 topic hz /scan`, and `ros2 doctor`.
  - **Dual Language Code Practice**: Python (`rclpy`) and C++ (`rclcpp`) code examples with in-browser Run capability.
  - **ROS 2 Computational Graph**: Graph topology visualizer showing active nodes, topics, publishers, and subscribers.
  - **2D Mobile Robot Simulator**: Differential-drive kinematics, 360° LiDAR raycasting, real-time `/cmd_vel` keyboard teleop, and `/odom` position feedback.
- **Pedagogical Workflow**: Progressive disclosure in course lessons (`Lesson → Practice → Result`) eliminating multi-window clutter.
- **ROS 2 Developer Playground**: Dedicated sandbox (`/playground/ros2`) with a code editor, interactive terminal, and autonomous 2D mobile robot lab.
- **Progress Tracking**: Local storage persistence for lesson completion, quizzes, exercises, font sizing, and language preference.

---

## 🛠 Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router, React Server Components & Static Site Generation) |
| **UI Library** | React 19, Lucide React icons, Canvas Confetti |
| **Styling** | Tailwind CSS v3, PostCSS, Custom typography system |
| **Animations** | Framer Motion |
| **State Management** | Zustand (with localStorage persistence) |
| **Language** | TypeScript 5.7+ |
| **Testing** | Jiti + Custom VFS & Tab Completion Test Suite |

---

## 📋 System Requirements

- **Node.js**: `v20.9.0` or `v22.x LTS` (Recommended: Node 22 via `.nvmrc`)
- **Package Manager**: `npm` (v10+ or v11+)
- **Operating System**: macOS, Windows (PowerShell or WSL2), or Linux (Ubuntu 22.04 / 24.04)

---

## 💻 Installation & Setup

### Clone Repository
```bash
git clone https://github.com/Sakda-Oil/Redbrick_Robotics_Academy.git
cd Redbrick_Robotics_Academy
```

### Install Dependencies
```bash
npm ci
```

### Environment Configuration (Optional)
```bash
cp .env.example .env.local
```

### Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

---

## 🚀 Available Scripts

```bash
# Start Next.js development server
npm run dev

# Run unit test suite (Virtual File System & Tab completion)
npm run test

# Run ESLint linting
npm run lint

# Run TypeScript compiler check
npm run typecheck

# Create optimized production build
npm run build

# Start production server locally
npm run start
```

---

## 📁 Project Directory Structure

```text
Redbrick_Robotics_Academy/
├── .github/
│   └── workflows/ci.yml         # Automated GitHub Actions CI
├── .vscode/
│   └── extensions.json          # Recommended VS Code extensions
├── docs/                        # Complete technical & editing guides
│   ├── SETUP_GUIDE.md           # Multi-OS setup (macOS, Windows, Linux)
│   ├── DEVELOPMENT_GUIDE.md     # Architecture & engineering workflow
│   ├── EDITING_GUIDE.md         # Exact file paths for editing content & UI
│   ├── FILE_GUIDE.md            # Directory index with risk classifications
│   ├── GIT_WORKFLOW.md          # Multi-machine Git collaboration guide
│   ├── HOW_TO_ADD_LESSON.md     # Step-by-step guide to adding lessons
│   ├── HOW_TO_ADD_COURSE.md     # Step-by-step guide to adding courses
│   ├── HOW_TO_EDIT_ROS_LAB.md   # How to tune the ROS 2 simulator & robot
│   ├── DO_NOT_EDIT.md           # Files and identifiers that must remain untouched
│   └── TROUBLESHOOTING.md       # Common issues and solutions
├── public/                      # Static assets (logos, icons, favicon)
│   └── images/
│       ├── redbrick_logo.png
│       └── redbrick-logo-transparent.png
├── scripts/                     # Content generation and test runners
│   └── test-completion.mjs      # 53-point Tab completion test suite
├── src/
│   ├── app/                     # Next.js App Router pages
│   │   ├── layout.tsx           # Global Root Layout
│   │   ├── page.tsx             # Academy Homepage
│   │   ├── courses/             # Course routes (/courses/linux, /courses/ros2-jazzy)
│   │   ├── cheatsheet/          # Interactive CLI Cheatsheets
│   │   └── playground/          # Developer Sandbox (/playground/ros2)
│   ├── components/              # React Components
│   │   ├── common/              # Common UI (Navbar, Footer, MarkdownRenderer, etc.)
│   │   ├── course/              # Course Layout, Sidebar, Header, Quizzes
│   │   └── simulator/           # Terminal, VFS, ROSGraph, RobotSimulator
│   ├── content/                 # Course Curriculum & Lesson Data
│   │   ├── en/                  # English content modules
│   │   ├── th/                  # Thai content modules
│   │   ├── linuxData.ts         # Linux course metadata & lessons
│   │   └── ros2Data.ts          # ROS 2 Jazzy course metadata & lessons
│   ├── lib/                     # Utilities, State & Simulation Engine
│   │   ├── i18n.ts              # Internationalization loader
│   │   ├── simulator/           # Virtual File System, ROS simulator, tab engine
│   │   └── store/               # Zustand progress store
│   ├── locales/                 # UI string translations (en.json, th.json)
│   └── types/                   # TypeScript interfaces and type definitions
├── .editorconfig                # Universal editor formatting
├── .env.example                 # Environment configuration template
├── .gitignore                   # Git ignore specifications
├── .nvmrc                       # Node version target (22)
├── package.json                 # Project dependencies & scripts
├── package-lock.json            # Deterministic dependency lockfile
├── tailwind.config.js           # Theme colors, fonts, and breakpoints
└── tsconfig.json                # TypeScript compiler configuration
```

---

## 🔍 Editing Quick Reference

Looking to make changes? Use this direct lookup:

| What you want to edit | Primary File Path |
| :--- | :--- |
| **Homepage & Hero** | `src/app/page.tsx` |
| **Navbar & Header Navigation** | `src/components/common/Navbar.tsx` |
| **Course Sidebar Navigation** | `src/components/course/CourseSidebar.tsx` |
| **Linux Course Content (Default)** | `src/content/linuxData.ts` |
| **Linux Content (Thai / English)** | `src/content/th/linuxData.ts` / `src/content/en/linuxData.ts` |
| **ROS 2 Course Content (Default)** | `src/content/ros2Data.ts` |
| **ROS 2 Content (Thai / English)** | `src/content/th/ros2Data.ts` / `src/content/en/ros2Data.ts` |
| **UI Translations (Thai / English)** | `src/locales/th.json` & `src/locales/en.json` |
| **Interactive Terminal Simulator** | `src/components/simulator/TerminalSimulator.tsx` |
| **Terminal Tab Completion Logic** | `src/lib/simulator/completion/completionEngine.ts` |
| **Virtual File System (VFS)** | `src/lib/simulator/virtualFileSystem.ts` |
| **ROS 2 Computational Graph** | `src/components/simulator/ROSGraph.tsx` |
| **2D Mobile Robot Simulator** | `src/components/simulator/MobileRobotSimulator.tsx` |
| **ROS 2 Installation Lab** | `src/components/simulator/ROS2InstallationLab.tsx` |
| **ROS 2 Guided Lesson Lab** | `src/components/simulator/LessonInteractiveLab.tsx` |
| **ROS 2 Developer Playground** | `src/app/playground/ros2/page.tsx` |
| **Brand Colors & Typography** | `tailwind.config.js` |

*For complete instructions, read [`docs/EDITING_GUIDE.md`](docs/EDITING_GUIDE.md).*

---

## 💻 New Computer Onboarding Checklist

Setting up on a new machine? Check off each step:

- [ ] **Install Git**: Check with `git --version`
- [ ] **Install Node.js 22 LTS**: Check with `node -v` (v20+ or v22+)
- [ ] **Clone repository**: `git clone https://github.com/Sakda-Oil/Redbrick_Robotics_Academy.git`
- [ ] **Enter folder**: `cd Redbrick_Robotics_Academy`
- [ ] **Install dependencies**: `npm ci`
- [ ] **Optional setup**: `cp .env.example .env.local`
- [ ] **Run dev server**: `npm run dev`
- [ ] **Verify browser**: Open `http://localhost:3000`
- [ ] **Run verification build**: `npm run build`

*For OS-specific details (macOS, Windows PowerShell, Ubuntu Linux), refer to [`docs/SETUP_GUIDE.md`](docs/SETUP_GUIDE.md).*

---

## 🔀 Git Collaboration Workflow

When working across multiple computers or team members:

1. **Always pull before starting work**:
   ```bash
   git pull origin main
   ```
2. **Create a topic branch**:
   ```bash
   git checkout -b feature/topic-name
   ```
3. **Commit with clean conventional messages**:
   ```bash
   git add .
   git commit -m "feat: add ROS 2 parameter tuning lesson"
   ```
4. **Push and create Pull Request**:
   ```bash
   git push -u origin feature/topic-name
   ```

*Read [`docs/GIT_WORKFLOW.md`](docs/GIT_WORKFLOW.md) for branch rules and conflict resolution.*

---

## 📖 Complete Documentation Index

All extended guides are available in the [`docs/`](docs/) directory:

- 📘 [Setup Guide (macOS / Windows / Linux)](docs/SETUP_GUIDE.md)
- 🇹🇭 [คู่มือ Build และพัฒนาต่อบนเครื่องอื่น ฉบับละเอียด](docs/BUILD_AND_TRANSFER_GUIDE_TH.md)
- 🏗 [Development & Architecture Guide](docs/DEVELOPMENT_GUIDE.md)
- ✏️ [Editing & Content Reference](docs/EDITING_GUIDE.md)
- 🗂 [File Safety Guide](docs/FILE_GUIDE.md)
- 🌿 [Git Workflow & Collaboration](docs/GIT_WORKFLOW.md)
- ➕ [How to Add a Lesson](docs/HOW_TO_ADD_LESSON.md)
- 📚 [How to Add a Course](docs/HOW_TO_ADD_COURSE.md)
- 🔬 [How to Edit ROS 2 Interactive Labs](docs/HOW_TO_EDIT_ROS_LAB.md)
- ⛔ [Do Not Edit Guide](docs/DO_NOT_EDIT.md)
- 🛠 [Troubleshooting Guide](docs/TROUBLESHOOTING.md)

---

## 📄 License

Proprietary © 2026 **Redbrick Robotics Co., Ltd.** All rights reserved.  
Unauthorized distribution, copying, or modification without written permission is prohibited.
