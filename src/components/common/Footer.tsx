"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Terminal, Cpu, BookOpen } from "lucide-react";
import { useProgressStore } from "@/lib/store/progressStore";
import { getTranslation } from "@/lib/i18n";

export function Footer() {
  const { locale } = useProgressStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const t = getTranslation(locale);

  return (
    <footer className="border-t border-gray-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900 transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Logo */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/images/redbrick-logo-transparent.png"
                alt="Redbrick Robotics Logo"
                width={36}
                height={36}
                className="object-contain"
              />
              <span className="font-bold text-base tracking-tight text-charcoal-900 dark:text-white font-heading">
                REDBRICK <span className="text-redbrick-600 font-extrabold">ROBOTICS</span>
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              {t.footer.desc}
            </p>
            <div className="text-xs font-semibold text-charcoal-700 dark:text-charcoal-300">
              {t.footer.motto}
            </div>
          </div>

          {/* Col 2: Linux Courses */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-900 dark:text-gray-100 flex items-center gap-1.5 font-heading">
              <Terminal className="h-3.5 w-3.5 text-redbrick-600" />
              {locale === "th" ? "หลักสูตร Linux พื้นฐาน" : "Linux Fundamentals"}
            </h4>
            <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/courses/linux/01-introduction" className="hover:text-redbrick-600 dark:hover:text-redbrick-400 transition-colors">
                  01. {locale === "th" ? "รู้จัก Linux และ Ubuntu 24.04" : "Linux Introduction & Ubuntu 24.04"}
                </Link>
              </li>
              <li>
                <Link href="/courses/linux/02-terminal" className="hover:text-redbrick-600 dark:hover:text-redbrick-400 transition-colors">
                  02. {locale === "th" ? "พื้นฐาน Terminal และ Shell" : "Terminal & Shell Basics"}
                </Link>
              </li>
              <li>
                <Link href="/courses/linux/04-ls" className="hover:text-redbrick-600 dark:hover:text-redbrick-400 transition-colors">
                  04. {locale === "th" ? "สำรวจโฟลเดอร์ด้วย ls" : "Directory Listing (ls)"}
                </Link>
              </li>
              <li>
                <Link href="/courses/linux/06-mkdir" className="hover:text-redbrick-600 dark:hover:text-redbrick-400 transition-colors">
                  06. {locale === "th" ? "สร้างโฟลเดอร์ Workspace ด้วย mkdir" : "Workspace Directories (mkdir)"}
                </Link>
              </li>
              <li>
                <Link href="/cheatsheet/linux" className="hover:text-redbrick-600 dark:hover:text-redbrick-400 transition-colors font-medium text-redbrick-600 dark:text-redbrick-400">
                  → {locale === "th" ? "สรุปคำสั่ง Linux Cheat Sheet" : "Linux Cheat Sheet"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: ROS 2 Jazzy */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-900 dark:text-gray-100 flex items-center gap-1.5 font-heading">
              <Cpu className="h-3.5 w-3.5 text-redbrick-600" />
              ROS 2 Jazzy Jalisco
            </h4>
            <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/courses/ros2-jazzy/01-introduction" className="hover:text-redbrick-600 dark:hover:text-redbrick-400 transition-colors">
                  01. {locale === "th" ? "สถาปัตยกรรมและโครงสร้าง ROS 2" : "What is ROS 2 & Architecture"}
                </Link>
              </li>
              <li>
                <Link href="/courses/ros2-jazzy/02-installation" className="hover:text-redbrick-600 dark:hover:text-redbrick-400 transition-colors">
                  02. {locale === "th" ? "การติดตั้งบน Ubuntu 24.04" : "Installation on Ubuntu 24.04"}
                </Link>
              </li>
              <li>
                <Link href="/courses/ros2-jazzy/03-cli" className="hover:text-redbrick-600 dark:hover:text-redbrick-400 transition-colors">
                  03. {locale === "th" ? "คำสั่ง CLI และ Environment" : "ROS 2 CLI & Environment"}
                </Link>
              </li>
              <li>
                <Link href="/playground/ros2" className="hover:text-redbrick-600 dark:hover:text-redbrick-400 transition-colors font-medium text-redbrick-600 dark:text-redbrick-400">
                  → {locale === "th" ? "สนามทดลองหุ่นยนต์ ROS 2" : "Interactive Robot Playground"}
                </Link>
              </li>
              <li>
                <Link href="/cheatsheet/ros2" className="hover:text-redbrick-600 dark:hover:text-redbrick-400 transition-colors font-medium text-redbrick-600 dark:text-redbrick-400">
                  → {locale === "th" ? "สรุปคำสั่ง ROS 2 CLI Cheat Sheet" : "ROS 2 CLI Cheat Sheet"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform & Mission */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-900 dark:text-gray-100 flex items-center gap-1.5 font-heading">
              <BookOpen className="h-3.5 w-3.5 text-redbrick-600" />
              {locale === "th" ? "สถาบันการเรียนรู้ Redbrick" : "Redbrick Academy"}
            </h4>
            <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/learning-path" className="hover:text-redbrick-600 dark:hover:text-redbrick-400 transition-colors">
                  {locale === "th" ? "แผนผังเส้นทางเรียนรู้ทั้งหมด" : "Full Learning Roadmap"}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-redbrick-600 dark:hover:text-redbrick-400 transition-colors">
                  {locale === "th" ? "เกี่ยวกับ Redbrick Robotics" : "About Redbrick Robotics"}
                </Link>
              </li>
              <li>
                <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-gray-100 dark:bg-charcoal-800 text-gray-600 dark:text-gray-300 font-mono">
                  Target: Ubuntu 24.04 • ROS 2 Jazzy
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-charcoal-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 dark:text-gray-400 gap-4">
          <div>
            Linux • ROS 2 • Embedded Systems • Robotics © {mounted ? new Date().getFullYear() : "2026"} Redbrick Robotics. {t.footer.rights}.
          </div>
          <div className="flex items-center gap-2">
            <span>{t.footer.builtFor}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
