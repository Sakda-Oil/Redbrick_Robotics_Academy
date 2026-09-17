"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Terminal,
  Cpu,
  ArrowRight,
  CheckCircle2,
  PlaySquare,
  Sparkles,
  Bot,
  Zap,
  Code2,
  ShieldCheck,
} from "lucide-react";
import { useProgressStore } from "@/lib/store/progressStore";
import { getTranslation } from "@/lib/i18n";
import { TerminalSimulator } from "@/components/simulator/TerminalSimulator";

export default function HomePage() {
  const { locale } = useProgressStore();
  const t = getTranslation(locale);

  const learningSteps = [
    {
      label: locale === "th" ? "พื้นฐาน Linux" : "Linux Basics",
      desc: locale === "th" ? "เทอร์มินัล, Ubuntu 24.04, ไฟล์" : "Terminal, Ubuntu 24.04, Files",
      icon: Terminal,
    },
    {
      label: "ROS 2 Jazzy",
      desc: locale === "th" ? "Node, Topic, สถาปัตยกรรม DDS" : "Nodes, Topics, DDS Architecture",
      icon: Cpu,
    },
    {
      label: locale === "th" ? "โปรแกรมหุ่นยนต์" : "Robot Programming",
      desc: locale === "th" ? "Node มอเตอร์ด้วย Python rclpy" : "Python rclpy & C++ Motor Nodes",
      icon: Code2,
    },
    {
      label: locale === "th" ? "เซนเซอร์ & ไดรเวอร์" : "Sensors & Drivers",
      desc: locale === "th" ? "LiDAR, กล้อง RealSense, Micro-ROS" : "LiDAR, RealSense, Micro-ROS",
      icon: Bot,
    },
    {
      label: locale === "th" ? "SLAM & ทำแผนที่" : "SLAM & Mapping",
      desc: locale === "th" ? "Cartographer, SLAM Toolbox" : "Cartographer, SLAM Toolbox",
      icon: Zap,
    },
    {
      label: locale === "th" ? "การนำทาง Nav2" : "Nav2 Navigation",
      desc: locale === "th" ? "วางแผนเส้นทางและ Costmaps อัตโนมัติ" : "Autonomous Path Planning & Costmaps",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-gray-200 dark:border-charcoal-800 bg-gradient-to-b from-white via-gray-50/50 to-gray-100/50 dark:from-charcoal-900 dark:via-charcoal-950 dark:to-charcoal-950 py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(#b5230e15_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-redbrick-600/30 bg-redbrick-50 dark:bg-redbrick-950/40 text-xs font-bold text-redbrick-600 dark:text-redbrick-400">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{t.home.badge}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-charcoal-900 dark:text-white leading-[1.15] font-heading">
                {t.home.heroTitle1} <br />
                {t.home.heroTitle2} <span className="text-redbrick-600">ROS 2</span>. <br />
                {t.home.heroTitle3}
              </h1>

              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                {t.home.heroDesc}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/courses/linux"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-redbrick-600 hover:bg-redbrick-500 text-white text-sm font-extrabold shadow-lg shadow-redbrick-600/25 transition-all hover:scale-[1.02]"
                >
                  <Terminal className="h-4 w-4" />
                  <span>{t.home.startLinux}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/courses/ros2-jazzy"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl border border-charcoal-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 hover:border-redbrick-600 text-charcoal-900 dark:text-white text-sm font-bold shadow-sm transition-all"
                >
                  <Cpu className="h-4 w-4 text-redbrick-600" />
                  <span>{t.home.learnROS2}</span>
                </Link>

                <Link
                  href="/playground/ros2"
                  className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-gray-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-gray-300 text-sm font-semibold hover:text-redbrick-600 transition-colors"
                >
                  <PlaySquare className="h-4 w-4" />
                  <span>{t.home.playground}</span>
                </Link>
              </div>

              {/* Verified specs badges */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-gray-500 dark:text-gray-400 font-mono">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Ubuntu 24.04 LTS (Noble)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>ROS 2 Jazzy Jalisco</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Raspberry Pi 5 + ESP32</span>
                </div>
              </div>
            </div>

            {/* Right Hero Column: Large Brand Logo Presentation */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative p-8 rounded-3xl border border-gray-200 dark:border-charcoal-800 bg-white/80 dark:bg-charcoal-900/80 shadow-2xl backdrop-blur-md w-full max-w-md flex flex-col items-center text-center group">
                <div className="relative h-48 w-48 mb-4 transition-transform group-hover:scale-105 duration-300">
                  <Image
                    src="/images/redbrick-logo-transparent.png"
                    alt="Redbrick Robotics Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <h3 className="text-xl font-black text-charcoal-900 dark:text-white tracking-tight font-heading">
                  REDBRICK <span className="text-redbrick-600 font-extrabold">ROBOTICS</span>
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-widest font-semibold">
                  Engineering • Education • Innovation
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-charcoal-800 w-full flex items-center justify-between text-xs text-gray-600 dark:text-gray-300 font-mono">
                  <span>Interactive Simulators</span>
                  <span className="text-green-500 font-bold">100% In-Browser</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Learning Path Flow */}
      <section className="py-16 bg-white dark:bg-charcoal-900 border-b border-gray-200 dark:border-charcoal-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-redbrick-600 mb-2 font-heading">
              {t.home.roadmapTag}
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 dark:text-white font-heading">
              {t.home.roadmapTitle}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
              {t.home.roadmapSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {learningSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.label}
                  className="relative p-5 rounded-2xl border border-gray-200 dark:border-charcoal-800 bg-gray-50/50 dark:bg-charcoal-950 flex flex-col items-center text-center space-y-2 group hover:border-redbrick-500/50 transition-all hover:-translate-y-1"
                >
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-800 flex items-center justify-center text-redbrick-600 shadow-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-[10px] font-mono font-bold text-gray-400">
                    STEP 0{idx + 1}
                  </div>
                  <h4 className="text-sm font-bold text-charcoal-900 dark:text-white font-heading">
                    {step.label}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/learning-path"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-redbrick-600 dark:text-redbrick-400 hover:underline"
            >
              <span>{locale === "th" ? "สำรวจแผนผังและหมุดหมายการเรียนรู้วิศวกรรมหุ่นยนต์ทั้งหมด" : "Explore full interactive engineering roadmap with milestones"}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Course Cards Section */}
      <section className="py-16 sm:py-24 bg-gray-50 dark:bg-charcoal-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-redbrick-600 mb-2 font-heading">
              {t.home.featuredCoursesTag}
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 dark:text-white font-heading">
              {t.home.featuredCoursesTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Card 1: Linux Fundamentals */}
            <div className="rounded-2xl border border-gray-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900 p-8 shadow-sm flex flex-col justify-between hover:border-redbrick-600/40 transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-redbrick-600/10 text-redbrick-600">
                    <Terminal className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400">
                    10 Modules • 23 Lessons
                  </span>
                </div>

                <h4 className="text-2xl font-bold text-charcoal-900 dark:text-white font-heading">
                  {t.home.linuxCardTitle}
                </h4>

                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t.home.linuxCardDesc}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono text-gray-600 dark:text-gray-400 pt-2">
                  <div className="flex items-center gap-1.5">✓ Terminal & Bash shortcuts</div>
                  <div className="flex items-center gap-1.5">✓ pwd, ls, cd, mkdir, touch</div>
                  <div className="flex items-center gap-1.5">✓ grep, find, logs inspection</div>
                  <div className="flex items-center gap-1.5">✓ chmod, dialout & USB serial</div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-charcoal-800 flex items-center justify-between">
                <span className="text-xs text-gray-500">{locale === "th" ? "ระยะเวลาโดยประมาณ: 12 ชั่วโมง" : "Estimated: 12 Hours"}</span>
                <Link
                  href="/courses/linux"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-redbrick-600 hover:bg-redbrick-500 text-white font-bold text-xs shadow-md transition-colors"
                >
                  <span>{locale === "th" ? "เริ่มเรียน Linux" : "Start Linux Course"}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 2: ROS 2 Jazzy Jalisco */}
            <div className="rounded-2xl border border-gray-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900 p-8 shadow-sm flex flex-col justify-between hover:border-redbrick-600/40 transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-redbrick-600/10 text-redbrick-600">
                    <Cpu className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-redbrick-600/10 text-redbrick-600 dark:text-redbrick-400">
                    Ubuntu 24.04 • 11 Modules
                  </span>
                </div>

                <h4 className="text-2xl font-bold text-charcoal-900 dark:text-white font-heading">
                  {t.home.ros2CardTitle}
                </h4>

                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t.home.ros2CardDesc}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono text-gray-600 dark:text-gray-400 pt-2">
                  <div className="flex items-center gap-1.5">✓ DDS & ROS_DOMAIN_ID</div>
                  <div className="flex items-center gap-1.5">✓ ros2 node, topic, service CLI</div>
                  <div className="flex items-center gap-1.5">✓ Python rclpy node templates</div>
                  <div className="flex items-center gap-1.5">✓ colcon build & overlays</div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-charcoal-800 flex items-center justify-between">
                <span className="text-xs text-gray-500">{locale === "th" ? "ระยะเวลาโดยประมาณ: 18 ชั่วโมง" : "Estimated: 18 Hours"}</span>
                <Link
                  href="/courses/ros2-jazzy"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-redbrick-600 hover:bg-redbrick-500 text-white font-bold text-xs shadow-md transition-colors"
                >
                  <span>{locale === "th" ? "เริ่มเรียน ROS 2" : "Start ROS 2 Course"}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Interactive Terminal Teaser Section */}
      <section className="py-16 bg-white dark:bg-charcoal-900 border-t border-gray-200 dark:border-charcoal-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-redbrick-600 mb-2 font-heading">
              {t.home.tryNowTag}
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 dark:text-white font-heading">
              {t.home.tryNowTitle}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
              {t.home.tryNowSubtitle}
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <TerminalSimulator
              title="Homepage Live Interactive Terminal"
              quickCommands={[
                "ls -la",
                "pwd",
                "cd ~/ros2_ws",
                "ros2 node list",
                "ros2 topic list",
                "ros2 topic echo /scan",
              ]}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
