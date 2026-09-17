import { create } from "zustand";

export type SupportedLocale = "th" | "en";
export type ContentFontSize = "compact" | "normal" | "large";

export interface CourseProgressState {
  completedLessons: string[];
  completedExercises: string[];
  quizScores: Record<string, number>;
  labsCompleted: string[];
  teacherMode: boolean;
  theme: "dark" | "light";
  locale: SupportedLocale;
  fontSize: ContentFontSize;

  // Actions
  toggleLessonCompleted: (lessonId: string) => void;
  markLessonCompleted: (lessonId: string) => void;
  markExerciseCompleted: (exerciseId: string) => void;
  setQuizScore: (quizId: string, score: number) => void;
  markLabCompleted: (labId: string) => void;
  toggleTeacherMode: () => void;
  setTeacherMode: (enabled: boolean) => void;
  setTheme: (theme: "dark" | "light") => void;
  toggleTheme: () => void;
  setLocale: (locale: SupportedLocale) => void;
  toggleLocale: () => void;
  setFontSize: (fontSize: ContentFontSize) => void;
  resetProgress: (courseId?: string) => void;
}

const STORAGE_KEY = "redbrick_academy_progress_v2";

function loadInitialState() {
  if (typeof window === "undefined") {
    return {
      completedLessons: [],
      completedExercises: [],
      quizScores: {},
      labsCompleted: [],
      teacherMode: false,
      theme: "dark" as const,
      locale: "th" as const,
      fontSize: "normal" as const,
    };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        completedLessons: parsed.completedLessons || [],
        completedExercises: parsed.completedExercises || [],
        quizScores: parsed.quizScores || {},
        labsCompleted: parsed.labsCompleted || [],
        teacherMode: !!parsed.teacherMode,
        theme: (parsed.theme === "light" ? "light" : "dark") as "dark" | "light",
        locale: (parsed.locale === "en" ? "en" : "th") as SupportedLocale,
        fontSize: (["compact", "normal", "large"].includes(parsed.fontSize) ? parsed.fontSize : "normal") as ContentFontSize,
      };
    }
  } catch (e) {
    console.error("Failed to read progress from localStorage", e);
  }

  return {
    completedLessons: [],
    completedExercises: [],
    quizScores: {},
    labsCompleted: [],
    teacherMode: false,
    theme: "dark" as const,
    locale: "th" as const,
    fontSize: "normal" as const,
  };
}

function saveToLocalStorage(state: Partial<CourseProgressState>) {
  if (typeof window === "undefined") return;
  try {
    const data = {
      completedLessons: state.completedLessons,
      completedExercises: state.completedExercises,
      quizScores: state.quizScores,
      labsCompleted: state.labsCompleted,
      teacherMode: state.teacherMode,
      theme: state.theme,
      locale: state.locale,
      fontSize: state.fontSize,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save progress to localStorage", e);
  }
}

export const useProgressStore = create<CourseProgressState>((set, get) => ({
  ...loadInitialState(),

  toggleLessonCompleted: (lessonId: string) => {
    const { completedLessons } = get();
    const updated = completedLessons.includes(lessonId)
      ? completedLessons.filter((id) => id !== lessonId)
      : [...completedLessons, lessonId];
    set({ completedLessons: updated });
    saveToLocalStorage({ ...get(), completedLessons: updated });
  },

  markLessonCompleted: (lessonId: string) => {
    const { completedLessons } = get();
    if (!completedLessons.includes(lessonId)) {
      const updated = [...completedLessons, lessonId];
      set({ completedLessons: updated });
      saveToLocalStorage({ ...get(), completedLessons: updated });
    }
  },

  markExerciseCompleted: (exerciseId: string) => {
    const { completedExercises } = get();
    if (!completedExercises.includes(exerciseId)) {
      const updated = [...completedExercises, exerciseId];
      set({ completedExercises: updated });
      saveToLocalStorage({ ...get(), completedExercises: updated });
    }
  },

  setQuizScore: (quizId: string, score: number) => {
    const { quizScores } = get();
    const updated = { ...quizScores, [quizId]: score };
    set({ quizScores: updated });
    saveToLocalStorage({ ...get(), quizScores: updated });
  },

  markLabCompleted: (labId: string) => {
    const { labsCompleted } = get();
    if (!labsCompleted.includes(labId)) {
      const updated = [...labsCompleted, labId];
      set({ labsCompleted: updated });
      saveToLocalStorage({ ...get(), labsCompleted: updated });
    }
  },

  toggleTeacherMode: () => {
    const nextVal = !get().teacherMode;
    set({ teacherMode: nextVal });
    saveToLocalStorage({ ...get(), teacherMode: nextVal });
  },

  setTeacherMode: (enabled: boolean) => {
    set({ teacherMode: enabled });
    saveToLocalStorage({ ...get(), teacherMode: enabled });
  },

  setTheme: (theme: "dark" | "light") => {
    set({ theme });
    if (typeof document !== "undefined") {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
    saveToLocalStorage({ ...get(), theme });
  },

  toggleTheme: () => {
    const nextTheme = get().theme === "dark" ? "light" : "dark";
    get().setTheme(nextTheme);
  },

  setLocale: (locale: SupportedLocale) => {
    set({ locale });
    saveToLocalStorage({ ...get(), locale });
  },

  toggleLocale: () => {
    const next = get().locale === "th" ? "en" : "th";
    get().setLocale(next);
  },

  setFontSize: (fontSize: ContentFontSize) => {
    set({ fontSize });
    saveToLocalStorage({ ...get(), fontSize });
  },

  resetProgress: () => {
    const cleared = {
      completedLessons: [],
      completedExercises: [],
      quizScores: {},
      labsCompleted: [],
    };
    set(cleared);
    saveToLocalStorage({ ...get(), ...cleared });
  },
}));
