"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Terminal,
  Cpu,
  FileText,
  Map,
  Search,
  Moon,
  Sun,
  GraduationCap,
  Menu,
  X,
  CheckCircle2,
  PlaySquare,
  Sparkles,
} from "lucide-react";
import { useProgressStore } from "@/lib/store/progressStore";
import { getTranslation } from "@/lib/i18n";
import { SearchModal } from "./SearchModal";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const {
    completedLessons,
    teacherMode,
    toggleTeacherMode,
    theme,
    toggleTheme,
    locale,
  } = useProgressStore();

  const t = getTranslation(locale);

  useEffect(() => {
    setMounted(true);
    // Apply dark mode class on initial mount
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Global shortcut Cmd+K or Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const totalLessonsEstimate = 32;
  const progressPercent = Math.min(
    100,
    Math.round((completedLessons.length / totalLessonsEstimate) * 100)
  );

  const navLinks = [
    { href: "/courses/linux", label: t.nav.linux, icon: Terminal },
    { href: "/courses/ros2-jazzy", label: t.nav.ros2, icon: Cpu },
    { href: "/playground/ros2", label: t.nav.playground, icon: PlaySquare },
    { href: "/learning-path", label: t.nav.learningPath, icon: Map },
    { href: "/cheatsheet/linux", label: t.nav.cheatsheet, icon: FileText },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-charcoal-800 bg-white/90 dark:bg-charcoal-900/90 backdrop-blur-md transition-colors">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-11 w-11 shrink-0 flex items-center justify-center transition-transform group-hover:scale-105">
                <Image
                  src="/images/redbrick-logo-transparent.png"
                  alt="Redbrick Robotics Logo"
                  width={44}
                  height={44}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base tracking-tight text-charcoal-900 dark:text-white flex items-center gap-1.5 font-heading">
                  REDBRICK <span className="text-redbrick-600 font-extrabold">ROBOTICS</span>
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-gray-500 dark:text-gray-400">
                  {t.nav.academy}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-redbrick-50 text-redbrick-600 dark:bg-redbrick-950/50 dark:text-redbrick-400 font-semibold"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-charcoal-800"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-charcoal-700 bg-gray-50 dark:bg-charcoal-800/80 text-xs text-gray-500 dark:text-gray-400 hover:border-redbrick-600/50 transition-colors shadow-sm"
              title={`${t.nav.search} (${t.nav.searchKey})`}
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{t.nav.search}</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-700 rounded text-gray-400">
                {t.nav.searchKey}
              </kbd>
            </button>

            {/* Language Switcher (Desktop & Tablet) */}
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            {/* Progress Badge */}
            {mounted && completedLessons.length > 0 && (
              <div
                className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full border border-green-500/30 bg-green-50/70 dark:bg-green-950/30 text-xs font-semibold text-green-700 dark:text-green-400"
                title={`${completedLessons.length} lessons completed`}
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                <span>{completedLessons.length} {t.nav.done}</span>
                <span className="text-[11px] opacity-75">({progressPercent}%)</span>
              </div>
            )}

            {/* Teacher Mode Toggle */}
            <button
              onClick={toggleTeacherMode}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                teacherMode
                  ? "bg-amber-500/10 border-amber-500 text-amber-600 dark:text-amber-400 shadow-sm"
                  : "border-gray-200 dark:border-charcoal-700 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
              title={teacherMode ? `${t.nav.teacherMode}: Active` : t.nav.studentMode}
            >
              <GraduationCap className={`h-4 w-4 ${teacherMode ? "text-amber-500" : ""}`} />
              <span className="hidden xl:inline">
                {teacherMode ? t.nav.teacherMode : t.nav.studentMode}
              </span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-gray-200 dark:border-charcoal-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-charcoal-800 transition-colors"
              title={t.nav.toggleTheme}
              aria-label={t.nav.toggleTheme}
            >
              {mounted && theme === "dark" ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-gray-600" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-charcoal-800"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-gray-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900 px-4 pt-2 pb-4 space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-charcoal-800">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{t.nav.language}</span>
              <LanguageSwitcher />
            </div>
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive
                      ? "bg-redbrick-50 text-redbrick-600 dark:bg-redbrick-950/60 dark:text-redbrick-400 font-semibold"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-charcoal-800"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-gray-200 dark:border-charcoal-800 flex items-center justify-between text-xs text-gray-500 px-3">
              <span>{t.nav.teacherMode}</span>
              <button
                onClick={toggleTeacherMode}
                className={`px-3 py-1 rounded text-xs font-semibold ${
                  teacherMode
                    ? "bg-amber-500 text-white"
                    : "bg-gray-200 dark:bg-charcoal-800 text-gray-700 dark:text-gray-300"
                }`}
              >
                {teacherMode ? "ON" : "OFF"}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
