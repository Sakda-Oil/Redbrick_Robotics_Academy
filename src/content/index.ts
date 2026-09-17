import { CourseData, LessonContent } from "@/types/course";
import { SupportedLocale } from "@/lib/store/progressStore";
import { LINUX_COURSE as LINUX_COURSE_EN, LINUX_LESSONS as LINUX_LESSONS_EN } from "./en/linuxData";
import { ROS2_COURSE as ROS2_COURSE_EN, ROS2_LESSONS as ROS2_LESSONS_EN } from "./en/ros2Data";
import { LINUX_COURSE_TH, LINUX_LESSONS_TH } from "./th/linuxData";
import { ROS2_COURSE_TH, ROS2_LESSONS_TH } from "./th/ros2Data";

export function getLinuxCourse(locale: SupportedLocale = "th"): CourseData {
  return locale === "en" ? LINUX_COURSE_EN : LINUX_COURSE_TH;
}

export function getLinuxLesson(slug: string, locale: SupportedLocale = "th"): LessonContent | undefined {
  const dict = locale === "en" ? LINUX_LESSONS_EN : LINUX_LESSONS_TH;
  return dict[slug] || LINUX_LESSONS_TH[slug] || LINUX_LESSONS_EN[slug];
}

export function getAllLinuxLessons(locale: SupportedLocale = "th"): Record<string, LessonContent> {
  return locale === "en" ? LINUX_LESSONS_EN : LINUX_LESSONS_TH;
}

export function getROS2Course(locale: SupportedLocale = "th"): CourseData {
  return locale === "en" ? ROS2_COURSE_EN : ROS2_COURSE_TH;
}

export function getROS2Lesson(slug: string, locale: SupportedLocale = "th"): LessonContent | undefined {
  const dict = locale === "en" ? ROS2_LESSONS_EN : ROS2_LESSONS_TH;
  return dict[slug] || ROS2_LESSONS_TH[slug] || ROS2_LESSONS_EN[slug];
}

export function getAllROS2Lessons(locale: SupportedLocale = "th"): Record<string, LessonContent> {
  return locale === "en" ? ROS2_LESSONS_EN : ROS2_LESSONS_TH;
}

// Backward compatibility exports
export { LINUX_COURSE_EN as LINUX_COURSE, LINUX_LESSONS_EN as LINUX_LESSONS };
export { ROS2_COURSE_EN as ROS2_COURSE, ROS2_LESSONS_EN as ROS2_LESSONS };
