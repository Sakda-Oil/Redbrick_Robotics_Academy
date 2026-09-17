"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Cpu, Copy, Check, Search, ExternalLink } from "lucide-react";
import { useProgressStore } from "@/lib/store/progressStore";
import { getTranslation } from "@/lib/i18n";

interface CheatItem {
  command: string;
  descEn: string;
  descTh: string;
  categoryEn: "Nodes" | "Topics" | "Services" | "Actions" | "Parameters" | "Build & Environment";
  categoryTh: "Node" | "Topic" | "Service" | "Action" | "Parameter" | "บิลด์และระบบ";
  link?: string;
}

const ROS2_CHEATS: CheatItem[] = [
  {
    command: "ros2 node list",
    descEn: "List all currently running nodes in the computation graph",
    descTh: "แสดงรายชื่อโหนด (Nodes) ทั้งหมดที่กำลังรันอยู่ในระบบ Computation Graph",
    categoryEn: "Nodes",
    categoryTh: "Node",
    link: "/courses/ros2-jazzy/03-cli",
  },
  {
    command: "ros2 node info /my_node",
    descEn: "Display subscribers, publishers, services, and actions for a node",
    descTh: "แสดงรายละเอียด Publisher, Subscriber, Service และ Action ของโหนดที่ระบุ",
    categoryEn: "Nodes",
    categoryTh: "Node",
    link: "/courses/ros2-jazzy/03-cli",
  },
  {
    command: "ros2 run <pkg> <executable>",
    descEn: "Run an executable node from an installed package",
    descTh: "รันโหนด Executable จากแพ็กเกจที่ติดตั้งอยู่ในระบบ",
    categoryEn: "Nodes",
    categoryTh: "Node",
    link: "/courses/ros2-jazzy/05-nodes",
  },

  {
    command: "ros2 topic list",
    descEn: "List all active topics currently advertised in the network",
    descTh: "แสดงรายชื่อ Topic ที่กำลังเปิดใช้งานทั้งหมดในเครือข่ายหุ่นยนต์",
    categoryEn: "Topics",
    categoryTh: "Topic",
    link: "/courses/ros2-jazzy/03-cli",
  },
  {
    command: "ros2 topic list -t",
    descEn: "List all topics with their exact message types in brackets",
    descTh: "แสดง Topic ทั้งหมดพร้อมชนิดข้อมูล Message Type ในวงเล็บ",
    categoryEn: "Topics",
    categoryTh: "Topic",
    link: "/courses/ros2-jazzy/03-cli",
  },
  {
    command: "ros2 topic echo /scan",
    descEn: "Stream real-time messages from a topic in readable YAML",
    descTh: "ดักฟังสตรีมข้อมูลสดจาก Topic แบบเรียลไทม์ในรูปแบบ YAML ที่อ่านง่าย",
    categoryEn: "Topics",
    categoryTh: "Topic",
    link: "/courses/ros2-jazzy/06-topics",
  },
  {
    command: "ros2 topic hz /scan",
    descEn: "Measure average publishing frequency (Hertz) of a topic",
    descTh: "วัดอัตราความถี่การส่งข้อมูลเฉลี่ย (Hz) ของเซนเซอร์หรือ Topic",
    categoryEn: "Topics",
    categoryTh: "Topic",
    link: "/courses/ros2-jazzy/06-topics",
  },
  {
    command: "ros2 topic info /cmd_vel",
    descEn: "Show publisher count, subscription count, and message type",
    descTh: "แสดงจำนวน Publisher, Subscriber และชนิดข้อความของ Topic",
    categoryEn: "Topics",
    categoryTh: "Topic",
    link: "/courses/ros2-jazzy/06-topics",
  },
  {
    command: 'ros2 topic pub --once /cmd_vel geometry_msgs/msg/Twist "{linear: {x: 0.2}}"',
    descEn: "Publish test message to topic from command line",
    descTh: "ส่งข้อมูลทดสอบเข้าไปยัง Topic 1 ครั้งผ่าน Command Line",
    categoryEn: "Topics",
    categoryTh: "Topic",
    link: "/courses/ros2-jazzy/06-topics",
  },

  {
    command: "ros2 service list",
    descEn: "List all available synchronous request/response service endpoints",
    descTh: "แสดง Service แบบถาม-ตอบ (Request/Response) ทั้งหมดที่พร้อมใช้งาน",
    categoryEn: "Services",
    categoryTh: "Service",
    link: "/courses/ros2-jazzy/03-cli",
  },
  {
    command: "ros2 service type /reset_odom",
    descEn: "Print the interface type of a service",
    descTh: "แสดงชนิดข้อมูล Interface Type ของ Service ที่ระบุ",
    categoryEn: "Services",
    categoryTh: "Service",
  },
  {
    command: "ros2 service call /reset_odom std_srvs/srv/Empty",
    descEn: "Execute and call a service from the terminal",
    descTh: "สั่งเรียกใช้งาน Service จากบรรทัดคำสั่งเทอร์มินัล",
    categoryEn: "Services",
    categoryTh: "Service",
  },

  {
    command: "ros2 action list",
    descEn: "List all long-running preemptible action servers",
    descTh: "แสดง Action ทั้งหมดสำหรับงานระยะยาวที่ยกเลิกได้และมี Feedback",
    categoryEn: "Actions",
    categoryTh: "Action",
    link: "/courses/ros2-jazzy/03-cli",
  },
  {
    command: "ros2 action info /navigate_to_pose",
    descEn: "Show client and server nodes attached to the action",
    descTh: "แสดงรายชื่อโหนดที่เป็น Action Client และ Action Server",
    categoryEn: "Actions",
    categoryTh: "Action",
  },

  {
    command: "ros2 param list",
    descEn: "List all parameters belonging to every running node",
    descTh: "แสดงรายการ Parameter ทั้งหมดของทุกโหนดที่กำลังทำงาน",
    categoryEn: "Parameters",
    categoryTh: "Parameter",
    link: "/courses/ros2-jazzy/03-cli",
  },
  {
    command: "ros2 param get /camera_node frame_rate",
    descEn: "Read current value of a node parameter",
    descTh: "อ่านค่าปัจจุบันของ Parameter ภายในโหนดที่กำหนด",
    categoryEn: "Parameters",
    categoryTh: "Parameter",
  },
  {
    command: "ros2 param set /camera_node frame_rate 30",
    descEn: "Dynamically update parameter on running node",
    descTh: "ปรับเปลี่ยนค่า Parameter แบบไดนามิกขณะโหนดกำลังทำงาน",
    categoryEn: "Parameters",
    categoryTh: "Parameter",
  },

  {
    command: "colcon build --symlink-install",
    descEn: "Compile packages in workspace using symlinks for rapid Python iteration",
    descTh: "คอมไพล์แพ็กเกจใน Workspace ด้วย Symlink เพื่อให้แก้ไขโค้ด Python ได้ทันทีโดยไม่ต้องบิลด์ซ้ำ",
    categoryEn: "Build & Environment",
    categoryTh: "บิลด์และระบบ",
    link: "/courses/ros2-jazzy/04-workspace",
  },
  {
    command: "source /opt/ros/jazzy/setup.bash",
    descEn: "Source official ROS 2 Jazzy underlay environment",
    descTh: "โหลด Environment หลักของ ROS 2 Jazzy เข้าสู่เซสชันเทอร์มินัล",
    categoryEn: "Build & Environment",
    categoryTh: "บิลด์และระบบ",
    link: "/courses/ros2-jazzy/02-installation",
  },
  {
    command: "source install/setup.bash",
    descEn: "Source local workspace overlay environment",
    descTh: "โหลด Overlay ของ Workspace ในเครื่องเพื่อให้มองเห็นแพ็กเกจที่เพิ่งสร้าง",
    categoryEn: "Build & Environment",
    categoryTh: "บิลด์และระบบ",
    link: "/courses/ros2-jazzy/04-workspace",
  },
  {
    command: "export ROS_DOMAIN_ID=42",
    descEn: "Set DDS domain ID to isolate robot communication channel",
    descTh: "ตั้งค่า Domain ID ของ DDS เพื่อแยกเครือข่ายสัญญาณหุ่นยนต์ไม่ให้ชนกัน",
    categoryEn: "Build & Environment",
    categoryTh: "บิลด์และระบบ",
    link: "/courses/ros2-jazzy/01-introduction",
  },
  {
    command: "ros2 doctor",
    descEn: "Examine ROS 2 network health and report setup anomalies",
    descTh: "ตรวจสอบสถานะความสมบูรณ์ของระบบ ROS 2 และรายงานข้อผิดพลาด",
    categoryEn: "Build & Environment",
    categoryTh: "บิลด์และระบบ",
    link: "/courses/ros2-jazzy/01-introduction",
  },
];

export default function ROS2CheatSheetPage() {
  const { locale } = useProgressStore();
  const t = getTranslation(locale);

  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    { id: "All", label: locale === "th" ? "ทั้งหมด" : "All" },
    { id: "Nodes", label: "Nodes" },
    { id: "Topics", label: "Topics" },
    { id: "Services", label: "Services" },
    { id: "Actions", label: "Actions" },
    { id: "Parameters", label: "Parameters" },
    { id: "Build & Environment", label: locale === "th" ? "บิลด์และระบบ" : "Build & Environment" },
  ];

  const handleCopy = async (cmd: string) => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopiedCmd(cmd);
      setTimeout(() => setCopiedCmd(null), 1800);
    } catch (e) {}
  };

  const filtered = ROS2_CHEATS.filter((item) => {
    const cat = item.categoryEn;
    const matchCat = activeCategory === "All" || cat === activeCategory;
    const desc = locale === "th" ? item.descTh : item.descEn;
    const matchSearch =
      item.command.toLowerCase().includes(searchTerm.toLowerCase()) ||
      desc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-charcoal-950 py-10 sm:py-16 font-sans">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-redbrick-50 dark:bg-redbrick-950/40 text-redbrick-600 dark:text-redbrick-400 text-xs font-bold font-mono mb-3">
            <Cpu className="h-3.5 w-3.5" />
            <span>{t.cheatsheet.ros2Tag}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-charcoal-900 dark:text-white tracking-tight font-heading">
            {t.cheatsheet.ros2Title}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
            {t.cheatsheet.ros2Desc}
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-800 shadow-sm">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeCategory === cat.id
                    ? "bg-redbrick-600 text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="h-4 w-4 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={locale === "th" ? "ค้นหาคำสั่ง ROS 2..." : "Search ROS 2 commands..."}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900 text-xs text-charcoal-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-redbrick-500 shadow-sm"
            />
          </div>
        </div>

        {/* Command Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-gray-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900 p-4 shadow-sm flex items-center justify-between gap-3 hover:border-redbrick-500/50 transition-colors group"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-gray-100 dark:bg-charcoal-800 text-gray-500">
                    {locale === "th" ? item.categoryTh : item.categoryEn}
                  </span>
                  {item.link && (
                    <Link
                      href={item.link}
                      className="text-[11px] text-redbrick-600 dark:text-redbrick-400 hover:underline inline-flex items-center gap-0.5"
                    >
                      <span>{t.cheatsheet.lessonLink}</span>
                      <ExternalLink className="h-2.5 w-2.5" />
                    </Link>
                  )}
                </div>
                <code className="block font-mono text-sm font-bold text-redbrick-600 dark:text-redbrick-400 truncate">
                  {item.command}
                </code>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-snug">
                  {locale === "th" ? item.descTh : item.descEn}
                </p>
              </div>

              <button
                onClick={() => handleCopy(item.command)}
                className="shrink-0 p-2.5 rounded-lg bg-gray-50 dark:bg-charcoal-800 hover:bg-redbrick-600 hover:text-white text-gray-400 dark:text-gray-300 transition-colors shadow-sm"
                title={locale === "th" ? "คัดลอกคำสั่ง" : "Copy command"}
              >
                {copiedCmd === item.command ? (
                  <Check className="h-4 w-4 text-green-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
