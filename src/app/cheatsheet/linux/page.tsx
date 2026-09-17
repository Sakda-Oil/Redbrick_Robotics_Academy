"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Terminal, Copy, Check, Search, ExternalLink } from "lucide-react";
import { useProgressStore } from "@/lib/store/progressStore";
import { getTranslation } from "@/lib/i18n";

interface CheatItem {
  command: string;
  descEn: string;
  descTh: string;
  categoryEn: "Navigation" | "Files" | "Search & Logs" | "Permissions & Hardware" | "Networking";
  categoryTh: "การนำทาง" | "จัดการไฟล์" | "ค้นหาและ Log" | "สิทธิ์และฮาร์ดแวร์" | "เน็ตเวิร์ก";
  link?: string;
}

const LINUX_CHEATS: CheatItem[] = [
  { command: "pwd", descEn: "Print current absolute working directory", descTh: "แสดงพาธโฟลเดอร์ปัจจุบันที่กำลังทำงานอยู่", categoryEn: "Navigation", categoryTh: "การนำทาง", link: "/courses/linux/03-pwd" },
  { command: "ls", descEn: "List files and directories in current folder", descTh: "แสดงรายชื่อไฟล์และโฟลเดอร์ในตำแหน่งปัจจุบัน", categoryEn: "Navigation", categoryTh: "การนำทาง", link: "/courses/linux/04-ls" },
  { command: "ls -la", descEn: "List all files including hidden dotfiles in long detailed format", descTh: "แสดงไฟล์ทั้งหมดรวมถึงไฟล์ซ่อน พร้อมรายละเอียดสิทธิ์และขนาด", categoryEn: "Navigation", categoryTh: "การนำทาง", link: "/courses/linux/04-ls" },
  { command: "ls -lh", descEn: "List files with human-readable file sizes (KB, MB, GB)", descTh: "แสดงรายการไฟล์พร้อมขนาดที่อ่านง่าย เช่น KB, MB, GB", categoryEn: "Navigation", categoryTh: "การนำทาง", link: "/courses/linux/04-ls" },
  { command: "cd ~", descEn: "Jump to user home directory (/home/redbrick)", descTh: "กลับสู่โฟลเดอร์ Home ของผู้ใช้ (/home/redbrick)", categoryEn: "Navigation", categoryTh: "การนำทาง", link: "/courses/linux/05-cd" },
  { command: "cd ..", descEn: "Move up one level to the parent directory", descTh: "ย้ายขึ้นไปโฟลเดอร์แม่ชั้นบนหนึ่งระดับ", categoryEn: "Navigation", categoryTh: "การนำทาง", link: "/courses/linux/05-cd" },
  { command: "cd -", descEn: "Switch back to the previous directory", descTh: "สลับกลับไปยังโฟลเดอร์ก่อนหน้าล่าสุด", categoryEn: "Navigation", categoryTh: "การนำทาง", link: "/courses/linux/05-cd" },

  { command: "mkdir -p ~/ros2_ws/src", descEn: "Create nested workspace directory hierarchy without error", descTh: "สร้างโฟลเดอร์โครงสร้าง Workspace ซ้อนกันหลายชั้นอย่างปลอดภัย", categoryEn: "Files", categoryTh: "จัดการไฟล์", link: "/courses/linux/06-mkdir" },
  { command: "touch robot_node.py", descEn: "Create an empty file or update existing timestamp", descTh: "สร้างไฟล์ว่างใหม่ หรืออัปเดตเวลา timestamp ของไฟล์เดิม", categoryEn: "Files", categoryTh: "จัดการไฟล์", link: "/courses/linux/07-touch" },
  { command: "cp source.py backup.py", descEn: "Copy a file to destination", descTh: "คัดลอกไฟล์ต้นทางไปยังปลายทาง", categoryEn: "Files", categoryTh: "จัดการไฟล์", link: "/courses/linux/08-cp-mv-rm" },
  { command: "cp -r src/ src_backup/", descEn: "Copy an entire directory recursively", descTh: "คัดลอกทั้งโฟลเดอร์และไฟล์ย่อยภายในทั้งหมด", categoryEn: "Files", categoryTh: "จัดการไฟล์", link: "/courses/linux/08-cp-mv-rm" },
  { command: "mv old_node.py new_node.py", descEn: "Rename or move a file/directory", descTh: "เปลี่ยนชื่อหรือย้ายไฟล์/โฟลเดอร์ไปยังตำแหน่งใหม่", categoryEn: "Files", categoryTh: "จัดการไฟล์", link: "/courses/linux/08-cp-mv-rm" },
  { command: "rm temp.log", descEn: "Permanently delete a file (NO Recycle Bin)", descTh: "ลบไฟล์ถาวรทันที (ไม่มีถังขยะกู้คืน)", categoryEn: "Files", categoryTh: "จัดการไฟล์", link: "/courses/linux/08-cp-mv-rm" },
  { command: "rm -rf build/ install/", descEn: "Recursively delete directories forcefully for clean build", descTh: "ลบโฟลเดอร์บิลด์ทิ้งทั้งหมดเพื่อเตรียม build ใหม่อย่างสะอาด", categoryEn: "Files", categoryTh: "จัดการไฟล์", link: "/courses/linux/08-cp-mv-rm" },

  { command: "cat /etc/os-release", descEn: "Print full contents of a file to terminal output", descTh: "อ่านและพิมพ์เนื้อหาทั้งหมดของไฟล์ออกทางหน้าจอ", categoryEn: "Search & Logs", categoryTh: "ค้นหาและ Log", link: "/courses/linux/09-cat-grep-find" },
  { command: "grep 'ERROR' robot.log", descEn: "Search and filter lines matching keyword in file", descTh: "ค้นหาและกรองเฉพาะบรรทัดที่ตรงกับคำสำคัญในไฟล์ Log", categoryEn: "Search & Logs", categoryTh: "ค้นหาและ Log", link: "/courses/linux/09-cat-grep-find" },
  { command: "find . -name '*.launch.py'", descEn: "Search directory tree for files matching pattern", descTh: "ค้นหาไฟล์ที่ตรงกับรูปแบบชื่อในโครงสร้างโฟลเดอร์", categoryEn: "Search & Logs", categoryTh: "ค้นหาและ Log", link: "/courses/linux/09-cat-grep-find" },
  { command: "tail -f /var/log/syslog", descEn: "Live follow appending system logs", descTh: "ติดตามดูข้อความ Log ของระบบแบบเรียลไทม์สด", categoryEn: "Search & Logs", categoryTh: "ค้นหาและ Log" },

  { command: "chmod +x script.py", descEn: "Grant execute permission to Python node or shell script", descTh: "เปิดสิทธิ์รัน (Execute) ให้กับสคริปต์ Python หรือ Shell", categoryEn: "Permissions & Hardware", categoryTh: "สิทธิ์และฮาร์ดแวร์", link: "/courses/linux/10-permissions-robotics" },
  { command: "ls -l /dev/ttyUSB*", descEn: "Inspect USB serial devices connected for LiDAR or ESP32", descTh: "ตรวจสอบพอร์ตซีเรียล USB ของเซนเซอร์ LiDAR หรือบอร์ด ESP32", categoryEn: "Permissions & Hardware", categoryTh: "สิทธิ์และฮาร์ดแวร์", link: "/courses/linux/10-permissions-robotics" },
  { command: "sudo usermod -aG dialout $USER", descEn: "Add user to dialout group for serial port access without sudo", descTh: "เพิ่มผู้ใช้เข้ากลุ่ม dialout เพื่อเข้าถึงพอร์ตซีเรียลโดยไม่ต้อง sudo", categoryEn: "Permissions & Hardware", categoryTh: "สิทธิ์และฮาร์ดแวร์", link: "/courses/linux/10-permissions-robotics" },
  { command: "dmesg | grep tty", descEn: "Inspect kernel boot & USB hotplug events for serial ports", descTh: "ตรวจสอบข้อความเคอร์เนลเมื่อเสียบอุปกรณ์ซีเรียล USB เข้าเครื่อง", categoryEn: "Permissions & Hardware", categoryTh: "สิทธิ์และฮาร์ดแวร์" },

  { command: "ip a", descEn: "Display all network interfaces and assigned IP addresses", descTh: "แสดงการ์ดเชื่อมต่อเน็ตเวิร์กและหมายเลข IP ทุกตัวในเครื่อง", categoryEn: "Networking", categoryTh: "เน็ตเวิร์ก" },
  { command: "ping -c 4 192.168.1.50", descEn: "Verify network connectivity to robot onboard computer", descTh: "ทดสอบการเชื่อมต่อเครือข่ายไปยังคอมพิวเตอร์บนตัวหุ่นยนต์", categoryEn: "Networking", categoryTh: "เน็ตเวิร์ก" },
  { command: "ssh redbrick@192.168.1.50", descEn: "Remote terminal login into robot onboard Raspberry Pi 5", descTh: "ล็อกอินรีโมตผ่านเทอร์มินัลเข้าบอร์ด Raspberry Pi 5 บนหุ่นยนต์", categoryEn: "Networking", categoryTh: "เน็ตเวิร์ก" },
  { command: "hostname -I", descEn: "Print current robot machine IP addresses", descTh: "แสดงหมายเลข IP Address ปัจจุบันของเครื่องหุ่นยนต์อย่างรวดเร็ว", categoryEn: "Networking", categoryTh: "เน็ตเวิร์ก" },
];

export default function LinuxCheatSheetPage() {
  const { locale } = useProgressStore();
  const t = getTranslation(locale);

  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    { id: "All", label: locale === "th" ? "ทั้งหมด" : "All" },
    { id: "Navigation", label: locale === "th" ? "การนำทาง" : "Navigation" },
    { id: "Files", label: locale === "th" ? "จัดการไฟล์" : "Files" },
    { id: "Search & Logs", label: locale === "th" ? "ค้นหาและ Log" : "Search & Logs" },
    { id: "Permissions & Hardware", label: locale === "th" ? "สิทธิ์และฮาร์ดแวร์" : "Permissions & Hardware" },
    { id: "Networking", label: locale === "th" ? "เน็ตเวิร์ก" : "Networking" },
  ];

  const handleCopy = async (cmd: string) => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopiedCmd(cmd);
      setTimeout(() => setCopiedCmd(null), 1800);
    } catch (e) {}
  };

  const filtered = LINUX_CHEATS.filter((item) => {
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
            <Terminal className="h-3.5 w-3.5" />
            <span>{t.cheatsheet.linuxTag}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-charcoal-900 dark:text-white tracking-tight font-heading">
            {t.cheatsheet.linuxTitle}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
            {t.cheatsheet.linuxDesc}
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Category tabs */}
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

          {/* Search input */}
          <div className="relative w-full sm:w-64">
            <Search className="h-4 w-4 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={locale === "th" ? "ค้นหาคำสั่ง..." : "Search commands..."}
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

              {/* Copy Button */}
              <button
                onClick={() => handleCopy(item.command)}
                className="shrink-0 p-2 rounded-lg border border-gray-200 dark:border-charcoal-700 bg-gray-50 dark:bg-charcoal-800 text-gray-500 dark:text-gray-400 hover:text-redbrick-600 dark:hover:text-redbrick-400 hover:border-redbrick-500/50 transition-all"
                title={t.common.copy}
              >
                {copiedCmd === item.command ? (
                  <Check className="h-4 w-4 text-green-500" />
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
