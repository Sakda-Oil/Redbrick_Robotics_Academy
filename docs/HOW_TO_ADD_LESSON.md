# How to Add a New Lesson

This guide walks you through the exact steps required to add a new lesson to either the **Linux Fundamentals** or **ROS 2 Jazzy Jalisco** course.

---

## 📋 Overview of Steps

1. Choose the target course (`linux` or `ros2-jazzy`).
2. Pick a unique `slug` (e.g. `12-lifecycle-nodes`) and numeric ID (e.g. `ros2-12`).
3. Register the lesson in the course modules list.
4. Define the complete lesson data (concept, code examples, exercises, and quiz).
5. Provide localized content for both Thai (`th`) and English (`en`).
6. Verify route rendering and progress tracking.

---

## 🛠 Step 1: Register in Course Module Structure

Open `src/content/ros2Data.ts` (or `src/content/linuxData.ts` for Linux).

Find the `modules` array in `ROS2_COURSE` and add the lesson to the desired module:

```typescript
{
  "id": "ros2-mod-12",
  "number": 12,
  "title": "Managed Lifecycle Nodes",
  "description": "Deterministic state machines (Unconfigured -> Inactive -> Active).",
  "lessons": [
    {
      "id": "ros2-12",
      "slug": "12-lifecycle-nodes",
      "title": "12. ROS 2 Lifecycle Nodes & State Management",
      "durationMinutes": 30
    }
  ]
}
```

---

## ✍️ Step 2: Define Full Lesson Content

In the same file (`src/content/ros2Data.ts`), add an entry to the `ROS2_LESSONS` object under your slug (`"12-lifecycle-nodes"`):

```typescript
export const ROS2_LESSONS: Record<string, LessonContent> = {
  // ... existing lessons ...
  "12-lifecycle-nodes": {
    "id": "ros2-12",
    "slug": "12-lifecycle-nodes",
    "title": "ROS 2 Lifecycle Nodes & Deterministic State Management",
    "courseId": "ros2-jazzy",
    "moduleNumber": 12,
    "moduleTitle": "Managed Lifecycle Nodes",
    "order": 12,
    "durationMinutes": 30,
    "difficulty": "Advanced",
    "learningObjectives": [
      "Understand the ROS 2 lifecycle state machine.",
      "Manage Unconfigured, Inactive, Active, and Finalized states.",
      "Use 'ros2 lifecycle' CLI verbs."
    ],
    "concept": "Lifecycle nodes provide deterministic state control...",
    "syntax": "ros2 lifecycle get /lifecycle_talker",
    "syntaxExplanation": "Queries the active lifecycle state of a managed node.",
    "examples": [
      {
        "title": "Inspect Lifecycle State",
        "language": "bash",
        "code": "ros2 lifecycle get /lifecycle_talker",
        "explanation": "Returns the active state.",
        "output": "active [3]"
      }
    ],
    "roboticsContext": {
      "title": "Deterministic Boot Sequences in Industrial Robots",
      "description": "Ensures LiDAR and camera drivers are fully online before wheel motors activate."
    },
    "commonMistakes": [
      {
        "mistake": "Calling configure() when the node is already Active.",
        "solution": "Lifecycle transitions must follow valid transition paths."
      }
    ],
    "exercise": {
      "instruction": "Check the lifecycle state of /lifecycle_talker using the CLI.",
      "initialCommand": "ros2 lifecycle ",
      "targetCommand": "ros2 lifecycle get /lifecycle_talker",
      "hint": "Type 'ros2 lifecycle get /lifecycle_talker'.",
      "explanation": "ros2 lifecycle get retrieves the node's current lifecycle state."
    },
    "quiz": [
      {
        "id": "q-lifecycle-1",
        "type": "single",
        "question": "Which state does a lifecycle node enter after a successful 'configure' transition?",
        "options": [
          { "id": "a", "text": "Active" },
          { "id": "b", "text": "Inactive" },
          { "id": "c", "text": "Finalized" }
        ],
        "correctAnswer": "b",
        "explanation": "A node enters Inactive upon configuration, holding resources without publishing data."
      }
    ],
    "prevLesson": {
      "title": "11. Gazebo Harmonic Simulation",
      "slug": "11-gazebo-harmonic"
    }
  }
};
```

---

## 🇹🇭 Step 3: Add Thai Localized Content

Open `src/content/th/ros2Data.ts` and add the matching entry under `"12-lifecycle-nodes"` with Thai explanations, objectives, and quiz translations.

---

## 🇬🇧 Step 4: Add English Localized Content

Open `src/content/en/ros2Data.ts` and add the matching entry under `"12-lifecycle-nodes"` with English explanations.

---

## 🧪 Step 5: Verify Route & Progress

1. Start your local dev server:
   ```bash
   npm run dev
   ```
2. Navigate to: `http://localhost:3000/courses/ros2-jazzy/12-lifecycle-nodes`
3. Verify:
   - Page renders without errors.
   - Sidebar highlights the new lesson.
   - Language switcher toggles between Thai and English.
   - Submitting the exercise marks it complete.
   - Completing the quiz increments course progress in the navbar.
4. Run static validation:
   ```bash
   npm run typecheck
   npm run build
   ```
   Ensure the new route appears in the static pages list.
