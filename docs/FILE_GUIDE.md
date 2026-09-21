# Redbrick Robotics Academy: File & Directory Safety Guide

This matrix categorizes the files and directories in the **Redbrick Robotics Academy** project to help contributors understand which files can be safely edited and which files require extreme caution.

---

## 🟢 1. Safe to Edit (Content, Text, Documentation & Styles)

Modifications to these files carry **low risk** and will not break application routing or simulation infrastructure.

| File / Directory | Purpose | Safe to Edit? | Risk Level | Used By |
| :--- | :--- | :--- | :--- | :--- |
| `src/content/ros2Data.ts` | ROS 2 Jazzy curriculum lesson definitions | ✅ Yes | Low | ROS 2 lesson pages |
| `src/content/linuxData.ts` | Linux Fundamentals curriculum lesson definitions | ✅ Yes | Low | Linux lesson pages |
| `src/content/th/*` | Thai localized lesson texts & exercises | ✅ Yes | Low | Lesson renderer |
| `src/content/en/*` | English localized lesson texts & exercises | ✅ Yes | Low | Lesson renderer |
| `src/locales/th.json` | Thai UI button labels, titles, nav items | ✅ Yes | Low | `useProgressStore` / `getTranslation` |
| `src/locales/en.json` | English UI button labels, titles, nav items | ✅ Yes | Low | `useProgressStore` / `getTranslation` |
| `docs/*` | Architecture and setup markdown documentation | ✅ Yes | None | Developers & contributors |
| `README.md` | Master project repository overview | ✅ Yes | None | Developers & GitHub visitors |
| `CONTRIBUTING.md` | Team contribution guidelines | ✅ Yes | None | Developers |
| `CHANGELOG.md` | Release notes & feature history | ✅ Yes | None | Release tracking |
| `public/images/*` | Logos, branding icons, diagrams | ✅ Yes | Low | UI layouts |

---

## 🟡 2. Caution (Components, UI Logic & Simulation Views)

Modifications here affect UI behavior, rendering, or simulator presentation. Test thoroughly with `npm run test` and `npm run dev` before committing.

| File / Directory | Purpose | Safe to Edit? | Risk Level | Used By |
| :--- | :--- | :--- | :--- | :--- |
| `src/app/page.tsx` | Academy Homepage layout & cards | ⚠️ Caution | Medium | Root route `/` |
| `src/components/common/Navbar.tsx` | Main top navigation bar & language switcher | ⚠️ Caution | Medium | Global app layout |
| `src/components/course/CourseSidebar.tsx` | Collapsible module sidebar navigation | ⚠️ Caution | Medium | Course lesson views |
| `src/components/course/QuizEngine.tsx` | Multiple-choice quiz interactive evaluator | ⚠️ Caution | Medium | Lesson assessment cards |
| `src/components/course/ExerciseBox.tsx` | CLI exercise validation prompt | ⚠️ Caution | Medium | Lesson practice cards |
| `src/components/simulator/LessonInteractiveLab.tsx` | Context-aware lab manager per lesson | ⚠️ Caution | Medium | ROS 2 course lessons |
| `src/components/simulator/ROS2InstallationLab.tsx` | 10-step Ubuntu 24.04 installation lab | ⚠️ Caution | Medium | Lesson `ros2-02` |
| `src/components/simulator/ROSGraph.tsx` | SVG ROS computation graph renderer | ⚠️ Caution | Medium | Interactive labs & playground |
| `src/components/simulator/MobileRobotSimulator.tsx` | 2D robot kinematics, LiDAR & canvas | ⚠️ Caution | Medium | Lesson `ros2-11` & playground |
| `tailwind.config.js` | Design system tokens, colors, breakpoints | ⚠️ Caution | Medium | Global Tailwind compiler |

---

## 🔴 3. Critical (Core Architecture & Infrastructure)

Changes to these files can break application routing, state persistence, or simulator execution. **Do not modify without explicit engineering consensus.**

| File / Directory | Purpose | Safe to Edit? | Risk Level | Used By |
| :--- | :--- | :--- | :--- | :--- |
| `src/app/courses/[courseId]/[lessonId]/page.tsx` | Dynamic SSG lesson page route handler | ⛔ Critical | High | All lesson routing |
| `src/lib/store/progressStore.ts` | Zustand store & localStorage serialization | ⛔ Critical | High | Progress & preferences |
| `src/lib/simulator/virtualFileSystem.ts` | In-browser POSIX file system engine | ⛔ Critical | High | Terminal simulator |
| `src/lib/simulator/completion/completionEngine.ts` | Tab auto-completion algorithm | ⛔ Critical | High | TerminalSimulator |
| `src/types/course.ts` | Course, module, and lesson interfaces | ⛔ Critical | High | Entire content system |
| `package.json` | Project dependencies, engine targets & scripts | ⛔ Critical | High | Node / npm runtime |
| `package-lock.json` | Exact pinned dependency tree | ⛔ Critical | High | CI / Deployment builds |
| `tsconfig.json` | TypeScript compiler configuration | ⛔ Critical | High | `npm run typecheck` & `build` |
| `.github/workflows/ci.yml` | Automated GitHub Actions CI pipeline | ⛔ Critical | High | GitHub Actions |

---

## ⚙️ 4. Generated / Build Output (NEVER EDIT OR COMMIT)

These directories are produced automatically by compilation and must always remain in `.gitignore`.

| Directory | Generator Tool | Why Never Edit? |
| :--- | :--- | :--- |
| `node_modules/` | `npm install` | External packages managed by npm. |
| `.next/` | `npm run dev` / `npm run build` | Next.js compilation cache and static outputs. |
| `dist_test/` | `npm run test` | Transpiled test artifacts. |
| `tsconfig.tsbuildinfo` | `tsc` | Incremental TypeScript build cache. |
| `.DS_Store` | macOS Finder | OS filesystem metadata cache. |
