import React from "react";
import { notFound } from "next/navigation";
import { LINUX_COURSE, LINUX_LESSONS } from "@/content/linuxData";
import { LessonPageLayout } from "@/components/course/LessonPageLayout";

interface LessonPageProps {
  params: Promise<{
    lessonId: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(LINUX_LESSONS).map((slug) => ({
    lessonId: slug,
  }));
}

export default async function LinuxLessonPage({ params }: LessonPageProps) {
  const { lessonId } = await params;
  const lesson = LINUX_LESSONS[lessonId];

  if (!lesson) {
    notFound();
  }

  return <LessonPageLayout course={LINUX_COURSE} lesson={lesson} />;
}
