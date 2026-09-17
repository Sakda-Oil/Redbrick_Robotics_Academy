"use client";

import React from "react";
import Link from "next/link";
import {
  Terminal,
  Cpu,
  Code2,
  Bot,
  Zap,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useProgressStore } from "@/lib/store/progressStore";
import { getTranslation } from "@/lib/i18n";

export default function LearningPathPage() {
  const { locale } = useProgressStore();
  const t = getTranslation(locale);

  const pathMilestones = [
    {
      step: "01",
      title: locale === "th" ? "พื้นฐาน Linux และคำสั่งเบื้องต้น" : "Linux Fundamentals",
      level: locale === "th" ? "ระดับเริ่มต้น" : "Beginner",
      desc:
        locale === "th"
          ? "เชี่ยวชาญการใช้คำสั่ง Terminal บน Ubuntu 24.04 โครงสร้างไฟล์ในระบบ การนำทาง (pwd, cd, ls) และคีย์ลัดสำคัญสำหรับหุ่นยนต์"
          : "Master the Ubuntu 24.04 command line, file system hierarchy, navigation (pwd, cd, ls), and essential terminal shortcuts.",
      skills: ["Bash Terminal", "File System Hierarchy", "mkdir, touch, cp, mv, rm"],
      link: "/courses/linux",
      linkText: locale === "th" ? "เริ่มเรียนหลักสูตร Linux พื้นฐาน" : "Start Linux Fundamentals",
      icon: Terminal,
    },
    {
      step: "02",
      title: locale === "th" ? "Linux สำหรับเชื่อมต่อฮาร์ดแวร์หุ่นยนต์" : "Linux for Robotics Hardware",
      level: locale === "th" ? "ระดับเริ่มต้น-ปานกลาง" : "Beginner-Intermediate",
      desc:
        locale === "th"
          ? "ตั้งค่าสิทธิ์พอร์ตสื่อสารซีเรียล (/dev/ttyUSB0, /dev/ttyACM0), เพิ่มผู้ใช้ในกลุ่ม dialout, กำหนดกฎ udev สำหรับ LiDAR และตรวจเช็ก dmesg logs"
          : "Configure serial device permissions (/dev/ttyUSB0, /dev/ttyACM0), manage the dialout group, write udev rules, and inspect kernel dmesg logs.",
      skills: ["Serial Ports", "dialout Group", "udev Rules for LiDAR", "chmod +x & sudo"],
      link: "/courses/linux/10-permissions-robotics",
      linkText: locale === "th" ? "ไปยังบทเรียนสิทธิ์และฮาร์ดแวร์" : "Go to Permissions & Hardware",
      icon: Bot,
    },
    {
      step: "03",
      title: locale === "th" ? "สถาปัตยกรรม ROS 2 และ DDS Middleware" : "ROS 2 Architecture & DDS",
      level: locale === "th" ? "ระดับปานกลาง" : "Intermediate",
      desc:
        locale === "th"
          ? "เข้าใจระบบกระจายข้อมูลแบบกระจายศูนย์ Data Distribution Service (DDS) โดยไม่ต้องพึ่งพา roscore และแยกวงเน็ตเวิร์กหุ่นยนต์ด้วย ROS_DOMAIN_ID"
          : "Understand the decentralized Data Distribution Service (DDS), eliminate roscore, and isolate multi-robot network traffic with ROS_DOMAIN_ID.",
      skills: ["DDS Middleware", "ROS_DOMAIN_ID Isolation", "ros2 doctor", "Peer-to-peer Discovery"],
      link: "/courses/ros2-jazzy/01-introduction",
      linkText: locale === "th" ? "สำรวจสถาปัตยกรรม ROS 2" : "Explore ROS 2 Architecture",
      icon: Cpu,
    },
    {
      step: "04",
      title: locale === "th" ? "คำสั่ง ROS 2 CLI และการตรวจเช็กระบบ" : "ROS 2 CLI & Environment Introspection",
      level: locale === "th" ? "ระดับปานกลาง" : "Intermediate",
      desc:
        locale === "th"
          ? "ใช้งานเครื่องมือ CLI แบบรวมศูนย์ในการตรวจรายชื่อ Node, ดึงข้อมูล Topic เซนเซอร์, วัดความถี่ส่งข้อมูล (Hz) และเรียกใช้งาน Service"
          : "Use the unified ROS 2 CLI to introspect nodes, echo sensor telemetry, measure topic frequencies (Hz), and call service endpoints.",
      skills: ["ros2 node list", "ros2 topic echo", "ros2 topic hz", "ros2 service & action"],
      link: "/courses/ros2-jazzy/03-cli",
      linkText: locale === "th" ? "ฝึกฝนคำสั่ง ROS 2 CLI" : "Master ROS 2 CLI",
      icon: Terminal,
    },
    {
      step: "05",
      title: locale === "th" ? "การสร้าง Workspace, Colcon Build และ Overlays" : "Workspaces, Colcon & Overlays",
      level: locale === "th" ? "ระดับปานกลาง" : "Intermediate",
      desc:
        locale === "th"
          ? "โครงสร้างเวิร์กสเปซหุ่นยนต์มาตรฐาน (~/ros2_ws/src), การคอมไพล์ด้วยคำสั่ง colcon build --symlink-install และการ source ซ้อนทับ overlay"
          : "Structure scalable robotics workspaces (~/ros2_ws/src), compile with colcon build --symlink-install, and source local overlays.",
      skills: ["colcon build", "--symlink-install", "Underlay vs Overlay", "package.xml & setup.py"],
      link: "/courses/ros2-jazzy/04-workspace",
      linkText: locale === "th" ? "เรียนรู้ Workspace และ Colcon" : "Learn Workspaces & Colcon",
      icon: Code2,
    },
    {
      step: "06",
      title: locale === "th" ? "การเขียน Node และ Topic ด้วย Python rclpy" : "Python Node & Topic Programming",
      level: locale === "th" ? "ระดับปานกลาง-สูง" : "Intermediate-Advanced",
      desc:
        locale === "th"
          ? "พัฒนา Node หุ่นยนต์เชิงวัตถุด้วย rclpy.node.Node ส่งคำสั่งควบคุมความเร็วบน /cmd_vel และรับข้อมูลสตรีมเซนเซอร์ผ่าน Subscriber"
          : "Write modular object-oriented nodes with rclpy.node.Node. Publish velocity commands on /cmd_vel and subscribe to sensor streams.",
      skills: ["rclpy Node Inheritance", "Publisher / Subscriber", "geometry_msgs/Twist", "Timers & Executors"],
      link: "/courses/ros2-jazzy/05-nodes",
      linkText: locale === "th" ? "เขียนโปรแกรม Node ด้วย Python" : "Write Python ROS Nodes",
      icon: Code2,
    },
    {
      step: "07",
      title: locale === "th" ? "Raspberry Pi 5 + Micro-ROS และ ESP32" : "Raspberry Pi 5 + Micro-ROS & ESP32",
      level: locale === "th" ? "ระดับสูง" : "Advanced",
      desc:
        locale === "th"
          ? "ติดตั้ง ROS 2 Jazzy บน Raspberry Pi 5 รัน Ubuntu 24.04 เชื่อมต่อกับไมโครคอนโทรลเลอร์ ESP32 ผ่านสาย USB/Wi-Fi ด้วย micro-ROS Agent"
          : "Deploy ROS 2 Jazzy on Raspberry Pi 5 running Ubuntu 24.04. Connect ESP32 microcontrollers over USB/Wi-Fi using the micro-ROS Agent.",
      skills: ["Raspberry Pi 5 Ubuntu Setup", "ESP32 micro-ROS", "Micro-ROS Agent", "Low-latency Motor Control"],
      link: "/courses/ros2-jazzy",
      linkText: locale === "th" ? "สำรวจฮาร์ดแวร์ฝังตัวสำหรับหุ่นยนต์" : "Explore Embedded Robotics",
      icon: Zap,
    },
    {
      step: "08",
      title: locale === "th" ? "เซนเซอร์, TF2 และการนำทางอัตโนมัติ (Nav2)" : "Sensors, TF2 & Autonomous Navigation (Nav2)",
      level: locale === "th" ? "ระดับเชี่ยวชาญ (Professional)" : "Advanced Professional",
      desc:
        locale === "th"
          ? "ผสานข้อมูล LiDAR, IMU และ Wheel Odometry สร้างแผนที่ด้วย SLAM Toolbox แปลงพิกัดเฟรมด้วย TF2 และวางแผนเส้นทางหลบสิ่งกีดขวางด้วย Nav2"
          : "Fuse LiDAR, IMU, and Wheel Odometry. Build maps with SLAM Toolbox, publish coordinate transforms with TF2, and execute autonomous path planning with Nav2.",
      skills: ["TF2 Coordinate Transforms", "Cartographer / SLAM", "Nav2 Action Servers", "Obstacle Costmaps"],
      link: "/playground/ros2",
      linkText: locale === "th" ? "ทดลองในสนามจำลอง Playground" : "Try in Playground",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-charcoal-950 py-10 sm:py-16 font-sans">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-redbrick-50 dark:bg-redbrick-950/40 text-redbrick-600 dark:text-redbrick-400 text-xs font-bold font-mono mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{t.learningPath.tag}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-charcoal-900 dark:text-white tracking-tight font-heading">
            {t.learningPath.title}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-3 leading-relaxed">
            {t.learningPath.subtitle}
          </p>
        </div>

        {/* Milestone Timeline */}
        <div className="relative space-y-8 before:absolute before:inset-0 before:left-7 sm:before:left-1/2 before:w-0.5 before:-translate-x-1/2 before:bg-gray-200 dark:before:bg-charcoal-800">
          {pathMilestones.map((m, idx) => {
            const Icon = m.icon;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={m.step}
                className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-6 ${
                  isEven ? "sm:flex-row-reverse" : ""
                }`}
              >
                {/* Center Badge Dot */}
                <div className="absolute left-7 sm:left-1/2 -translate-x-1/2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-redbrick-600 text-white font-bold text-xs shadow-lg shadow-redbrick-600/30 z-10 border-4 border-white dark:border-charcoal-950">
                  {m.step}
                </div>

                {/* Content Card (takes 1/2 width on sm+) */}
                <div className="w-full sm:w-[calc(50%-2.5rem)] pl-16 sm:pl-0">
                  <div className="rounded-2xl border border-gray-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900 p-6 shadow-sm hover:border-redbrick-500/50 transition-all hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-gray-100 dark:bg-charcoal-800 text-gray-600 dark:text-gray-400">
                        {m.level}
                      </span>
                      <Icon className="h-4 w-4 text-redbrick-600" />
                    </div>

                    <h3 className="text-lg font-bold text-charcoal-900 dark:text-white font-heading">
                      {m.title}
                    </h3>

                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                      {m.desc}
                    </p>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-gray-100 dark:border-charcoal-800">
                      {m.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-50 dark:bg-charcoal-800 text-gray-600 dark:text-gray-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4">
                      <Link
                        href={m.link}
                        className="inline-flex items-center gap-1 text-xs font-bold text-redbrick-600 dark:text-redbrick-400 hover:underline"
                      >
                        <span>{m.linkText}</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
