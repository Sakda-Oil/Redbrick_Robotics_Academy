import React from "react";
import { notFound } from "next/navigation";
import { LINUX_COURSE, LINUX_LESSONS } from "@/content/linuxData";
import { ROS2_COURSE, ROS2_LESSONS } from "@/content/ros2Data";
import { LessonPageLayout } from "@/components/course/LessonPageLayout";

interface LessonPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const linuxKeys = Object.keys(LINUX_LESSONS);
  const ros2Keys = Object.keys(ROS2_LESSONS);

  const slugs = new Set<string>();

  linuxKeys.forEach((key) => {
    slugs.add(key);
    const shortSlug = key.replace(/^\d+-/, "");
    if (shortSlug) slugs.add(shortSlug);
  });

  ros2Keys.forEach((key) => {
    slugs.add(key);
    const shortSlug = key.replace(/^\d+-/, "");
    if (shortSlug) slugs.add(shortSlug);
  });

  return Array.from(slugs).map((slug) => ({ slug }));
}

export default async function LessonAliasPage({ params }: LessonPageProps) {
  const { slug } = await params;

  // 1. Direct match in Linux
  if (LINUX_LESSONS[slug]) {
    return <LessonPageLayout course={LINUX_COURSE} lesson={LINUX_LESSONS[slug]} />;
  }

  // 2. Direct match in ROS2
  if (ROS2_LESSONS[slug]) {
    return <LessonPageLayout course={ROS2_COURSE} lesson={ROS2_LESSONS[slug]} />;
  }

  // 3. Suffix / alias match in Linux (e.g. 'ls' -> '04-ls')
  const linuxKey = Object.keys(LINUX_LESSONS).find(
    (k) => k === slug || k.replace(/^\d+-/, "") === slug || k.endsWith(`-${slug}`)
  );
  if (linuxKey && LINUX_LESSONS[linuxKey]) {
    return <LessonPageLayout course={LINUX_COURSE} lesson={LINUX_LESSONS[linuxKey]} />;
  }

  // 4. Suffix / alias match in ROS2
  const ros2Key = Object.keys(ROS2_LESSONS).find(
    (k) => k === slug || k.replace(/^\d+-/, "") === slug || k.endsWith(`-${slug}`)
  );
  if (ros2Key && ROS2_LESSONS[ros2Key]) {
    return <LessonPageLayout course={ROS2_COURSE} lesson={ROS2_LESSONS[ros2Key]} />;
  }

  notFound();
}
