# How to Add a New Course

This guide explains how to add an entirely new course curriculum (e.g. **Embedded Linux with Yocto** or **ROS 2 Navigation 2 (Nav2)**) to the platform.

---

## 📋 Architecture Checklist for Adding a Course

Adding a course involves 5 modular steps:
1. Define Course Type & Content Data.
2. Register Course in the Course Loader.
3. Create Course Landing Page & Dynamic Routes.
4. Add Navigation Entry & Localized Strings.
5. Verify Build & Routing.

---

## 🛠 Step 1: Create Course Content File

Create a new file under `src/content/`:
`src/content/nav2Data.ts` (along with localized versions in `src/content/th/nav2Data.ts` and `src/content/en/nav2Data.ts`).

Define the `CourseData` object:
```typescript
import { CourseData, LessonContent } from "@/types/course";

export const NAV2_COURSE: CourseData = {
  id: "nav2",
  title: "Autonomous Navigation with ROS 2 Nav2",
  tagline: "Path planning, behavior trees, and costmaps for AMRs",
  description: "Master global and local costmaps, BT navigators, and recovery behaviors.",
  targetAudience: "Autonomous Vehicle & Mobile Robot Developers",
  badge: "ROS 2 Jazzy Standard",
  iconName: "Compass",
  accentColor: "#D97706",
  totalModules: 1,
  totalLessons: 1,
  estimatedHours: 10,
  modules: [
    {
      id: "nav2-mod-1",
      number: 1,
      title: "Costmaps & Sensors",
      description: "Configuring 2D and 3D obstacle layers.",
      lessons: [
        {
          id: "nav2-01",
          slug: "01-costmaps",
          title: "01. Global and Local Costmaps",
          durationMinutes: 30
        }
      ]
    }
  ]
};

export const NAV2_LESSONS: Record<string, LessonContent> = {
  "01-costmaps": {
    id: "nav2-01",
    slug: "01-costmaps",
    title: "Global and Local Costmaps Configuration",
    courseId: "nav2",
    moduleNumber: 1,
    moduleTitle: "Costmaps & Sensors",
    order: 1,
    durationMinutes: 30,
    difficulty: "Advanced",
    learningObjectives: ["Understand rolling vs static costmaps"],
    concept: "Nav2 uses two primary costmaps...",
    syntax: "ros2 launch nav2_bringup navigation_launch.py",
    syntaxExplanation: "Starts the Nav2 stack.",
    examples: [],
    quiz: [],
    exercise: {
      instruction: "Echo active costmap topics",
      initialCommand: "ros2 topic list",
      targetCommand: "ros2 topic list",
      hint: "Run ros2 topic list",
      explanation: "Lists active topics"
    }
  }
};
```

---

## 🔌 Step 2: Register in Content Index

Open `src/content/index.ts`:
1. Export your course data:
   ```typescript
   export { NAV2_COURSE, NAV2_LESSONS } from "./nav2Data";
   ```
2. Update helper functions:
   ```typescript
   export function getCourseById(courseId: string, locale: "th" | "en"): CourseData | null {
     if (courseId === "linux") return getLinuxCourse(locale);
     if (courseId === "ros2-jazzy") return getROS2Course(locale);
     if (courseId === "nav2") return getNav2Course(locale);
     return null;
   }
   ```

---

## 🛣 Step 3: Create Course Landing Route

Create `src/app/courses/nav2/page.tsx`:
```tsx
import { Metadata } from "next";
import { CourseOverviewPage } from "@/components/course/CourseOverviewPage";
import { NAV2_COURSE } from "@/content/nav2Data";

export const metadata: Metadata = {
  title: "ROS 2 Nav2 Navigation Course — Redbrick Robotics Academy",
};

export default function Nav2CoursePage() {
  return <CourseOverviewPage course={NAV2_COURSE} />;
}
```

---

## 🧭 Step 4: Add to Navbar & Translations

1. In `src/locales/en.json` and `src/locales/th.json`, add localized labels for the course:
   ```json
   "nav": {
     "nav2Course": "Nav2 Navigation"
   }
   ```
2. In `src/components/layout/Navbar.tsx`, add the course link to the dropdown navigation menu.

---

## 🧪 Step 5: Verification

Run the compiler checks:
```bash
npm run typecheck
npm run build
```
Verify that all new routes are generated in the static site compilation.
