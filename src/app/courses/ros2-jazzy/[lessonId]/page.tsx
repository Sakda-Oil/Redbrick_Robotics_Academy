import React from "react";
import { notFound } from "next/navigation";
import { ROS2_COURSE, ROS2_LESSONS } from "@/content/ros2Data";
import { LessonPageLayout } from "@/components/course/LessonPageLayout";

interface LessonPageProps {
  params: Promise<{
    lessonId: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(ROS2_LESSONS).map((slug) => ({
    lessonId: slug,
  }));
}

export default async function ROS2LessonPage({ params }: LessonPageProps) {
  const { lessonId } = await params;
  const lesson = ROS2_LESSONS[lessonId];

  if (!lesson) {
    notFound();
  }

  return <LessonPageLayout course={ROS2_COURSE} lesson={lesson} />;
}
