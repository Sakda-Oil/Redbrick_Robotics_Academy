export interface LearningObjective {
  title: string;
  description?: string;
}

export interface CodeExample {
  title: string;
  language: "bash" | "python" | "cpp" | "yaml" | "xml";
  code: string;
  explanation?: string;
  output?: string;
  allowTry?: boolean;
}

export interface ExerciseItem {
  instruction: string;
  initialCommand?: string;
  targetCommand: string | string[];
  hint: string;
  explanation: string;
  expectedOutput?: string;
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  type: "single" | "multiple" | "boolean" | "fill";
  question: string;
  options?: QuizOption[];
  correctAnswer: string | string[];
  explanation: string;
}

export interface LabStep {
  step: number;
  title: string;
  instruction: string;
  task: string;
  validationCommand: string | string[];
  hint: string;
  completed?: boolean;
}

export interface Lab {
  id: string;
  title: string;
  description: string;
  steps: LabStep[];
}

export interface LessonContent {
  id: string;
  slug: string;
  title: string;
  courseId: "linux" | "ros2-jazzy";
  moduleNumber: number;
  moduleTitle: string;
  order: number;
  durationMinutes: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  learningObjectives: string[];
  concept: string;
  syntax?: string;
  syntaxExplanation?: string;
  examples: CodeExample[];
  roboticsContext: {
    title: string;
    description: string;
    diagram?: string;
    commandExample?: string;
  };
  commonMistakes: {
    mistake: string;
    solution: string;
  }[];
  exercise?: ExerciseItem;
  quiz?: QuizQuestion[];
  lab?: Lab;
  teacherNotes?: {
    pedagogicalGoal: string;
    keyPointsToEmphasize: string[];
    commonStudentConfusions: string[];
    suggestedDiscussionPrompt: string;
  };
  prevLesson?: { title: string; slug: string };
  nextLesson?: { title: string; slug: string };
}

export interface CourseModule {
  id: string;
  number: number;
  title: string;
  description: string;
  lessons: {
    id: string;
    slug: string;
    title: string;
    durationMinutes: number;
  }[];
}

export interface CourseData {
  id: "linux" | "ros2-jazzy";
  title: string;
  tagline: string;
  description: string;
  targetAudience: string;
  badge: string;
  iconName: string;
  accentColor: string;
  totalModules: number;
  totalLessons: number;
  estimatedHours: number;
  modules: CourseModule[];
}
