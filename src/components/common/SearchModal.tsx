"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  Terminal,
  Cpu,
  BookOpen,
  Code2,
  FileCheck,
  ArrowRight,
} from "lucide-react";

interface SearchResultItem {
  id: string;
  title: string;
  category: "Linux" | "ROS 2" | "Command" | "Lab" | "Playground";
  href: string;
  snippet: string;
  keywords: string[];
}

const SEARCH_INDEX: SearchResultItem[] = [
  // Linux Lessons
  {
    id: "linux-01",
    title: "01. What is Linux & Ubuntu 24.04 for Robotics",
    category: "Linux",
    href: "/courses/linux/01-introduction",
    snippet: "Understand the Linux kernel, distributions, why Ubuntu 24.04 is the robotics industry standard.",
    keywords: ["linux", "ubuntu", "noble numbat", "kernel", "robotics", "os"],
  },
  {
    id: "linux-02",
    title: "02. Linux Terminal, Shell & Bash Fundamentals",
    category: "Linux",
    href: "/courses/linux/02-terminal",
    snippet: "Master terminal shortcuts, bash environment, and standard streams for robotics.",
    keywords: ["terminal", "shell", "bash", "cli", "command line", "ctrl+c"],
  },
  {
    id: "linux-03",
    title: "03. pwd — Print Working Directory",
    category: "Linux",
    href: "/courses/linux/03-pwd",
    snippet: "Locate where your robot packages and workspace trees exist in the file system.",
    keywords: ["pwd", "directory", "current path", "navigation"],
  },
  {
    id: "linux-04",
    title: "04. ls — List Files & Robotic Workspaces",
    category: "Linux",
    href: "/courses/linux/04-ls",
    snippet: "Inspect workspace contents, launch files, hidden config files with flags -l, -a, -h.",
    keywords: ["ls", "list", "directory", "-la", "hidden files", "permissions"],
  },
  {
    id: "linux-05",
    title: "05. cd — Change Directory & Navigation",
    category: "Linux",
    href: "/courses/linux/05-cd",
    snippet: "Navigate relative and absolute paths, tilde (~), and parent directories (..) with ease.",
    keywords: ["cd", "change directory", "navigation", "relative path", "absolute path"],
  },
  {
    id: "linux-06",
    title: "06. mkdir — Create ROS 2 Workspaces & Directories",
    category: "Linux",
    href: "/courses/linux/06-mkdir",
    snippet: "Construct workspace architectures like mkdir -p ~/ros2_ws/src for robot nodes.",
    keywords: ["mkdir", "make directory", "mkdir -p", "ros2_ws", "workspace"],
  },
  {
    id: "linux-07",
    title: "07. touch — Create Script & Config Files",
    category: "Linux",
    href: "/courses/linux/07-touch",
    snippet: "Generate launch files, Python nodes, YAML parameters, and empty touch triggers.",
    keywords: ["touch", "file", "create file", "python script"],
  },
  {
    id: "linux-08",
    title: "08. cp, mv, rm — Managing Robot Files Safely",
    category: "Linux",
    href: "/courses/linux/08-cp-mv-rm",
    snippet: "Copy, move, rename, and safely delete files and directories in robotics packages.",
    keywords: ["cp", "mv", "rm", "copy", "move", "rename", "delete", "rm -rf"],
  },
  {
    id: "linux-09",
    title: "09. cat, grep, find — Inspecting Logs & Configurations",
    category: "Linux",
    href: "/courses/linux/09-cat-grep-find",
    snippet: "Filter sensor topics, find launch files, and debug runtime error logs quickly.",
    keywords: ["cat", "grep", "find", "search", "logs", "filter"],
  },
  {
    id: "linux-10",
    title: "10. Permissions, sudo & USB Serial Ports for Robotics",
    category: "Linux",
    href: "/courses/linux/10-permissions-robotics",
    snippet: "Set chmod +x, manage dialout group for /dev/ttyUSB0 and /dev/ttyACM0 microcontrollers.",
    keywords: ["chmod", "sudo", "permissions", "chown", "/dev/ttyUSB0", "/dev/ttyACM0", "dialout", "udev"],
  },

  // ROS 2 Lessons
  {
    id: "ros2-01",
    title: "01. What is ROS 2 & Architecture (DDS & ROS_DOMAIN_ID)",
    category: "ROS 2",
    href: "/courses/ros2-jazzy/01-introduction",
    snippet: "Understand ROS 2 Jazzy, DDS middleware, multi-robot communication, and ROS_DOMAIN_ID.",
    keywords: ["ros2", "jazzy", "dds", "fastdds", "cyclonedds", "ros_domain_id", "architecture"],
  },
  {
    id: "ros2-02",
    title: "02. ROS 2 Jazzy Installation on Ubuntu 24.04 LTS",
    category: "ROS 2",
    href: "/courses/ros2-jazzy/02-installation",
    snippet: "Official step-by-step setup on Ubuntu 24.04 Noble Numbat via official repositories.",
    keywords: ["installation", "install", "jazzy", "ubuntu 24.04", "apt", "repo.ros2.org"],
  },
  {
    id: "ros2-03",
    title: "03. ROS 2 CLI & Environment Introspection",
    category: "ROS 2",
    href: "/courses/ros2-jazzy/03-cli",
    snippet: "ros2 node, ros2 topic, ros2 service, ros2 action, ros2 param essential tools.",
    keywords: ["cli", "ros2 node list", "ros2 topic list", "ros2 topic echo", "introspection"],
  },
  {
    id: "ros2-04",
    title: "04. Workspaces, colcon & Overlays",
    category: "ROS 2",
    href: "/courses/ros2-jazzy/04-workspace",
    snippet: "Building packages with colcon build --symlink-install and sourcing install/setup.bash.",
    keywords: ["workspace", "colcon", "colcon build", "source setup.bash", "overlay", "underlay"],
  },
  {
    id: "ros2-05",
    title: "05. Nodes & Python rclpy Programming",
    category: "ROS 2",
    href: "/courses/ros2-jazzy/05-nodes",
    snippet: "Write clean object-oriented Python nodes using rclpy.node.Node and timers.",
    keywords: ["node", "rclpy", "python", "create_node", "spin", "timer"],
  },
  {
    id: "ros2-06",
    title: "06. Topics & Publisher / Subscriber Pattern",
    category: "ROS 2",
    href: "/courses/ros2-jazzy/06-topics",
    snippet: "Asynchronous data streams: geometry_msgs/Twist, sensor_msgs/LaserScan, and QoS policies.",
    keywords: ["topic", "publisher", "subscriber", "twist", "cmd_vel", "scan", "qos"],
  },

  // Interactive Tools
  {
    id: "playground",
    title: "Interactive ROS 2 Playground (Graph & Topic Inspector)",
    category: "Playground",
    href: "/playground/ros2",
    snippet: "Real-time interactive 3-panel playground with animated node graph, CLI terminal, and live message echo.",
    keywords: ["playground", "graph", "interactive", "terminal", "topic inspector", "simulation"],
  },
  {
    id: "cheat-linux",
    title: "Linux CLI Cheat Sheet for Robotics",
    category: "Command",
    href: "/cheatsheet/linux",
    snippet: "Quick reference table with 1-click copy for navigation, file ops, search, processes, and permissions.",
    keywords: ["cheat sheet", "linux commands", "quick reference", "copy"],
  },
  {
    id: "cheat-ros2",
    title: "ROS 2 Jazzy CLI Cheat Sheet",
    category: "Command",
    href: "/cheatsheet/ros2",
    snippet: "Essential ROS 2 Jazzy CLI commands for nodes, topics, services, actions, launch, and params.",
    keywords: ["ros2 cheat sheet", "ros2 cli", "cheat sheet", "ros2 topic", "ros2 node"],
  },
  {
    id: "path",
    title: "Robotics Learning Roadmap (Zero to Autonomous Robot)",
    category: "Command",
    href: "/learning-path",
    snippet: "Complete engineering curriculum progression from Linux basics to Nav2 and SLAM.",
    keywords: ["learning path", "roadmap", "curriculum", "beginner", "advanced", "autonomous"],
  },
];

export function SearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (isOpen) {
      setQuery("");
    }
  }, [isOpen]);

  const filteredResults = useMemo(() => {
    if (!query.trim()) return SEARCH_INDEX.slice(0, 6);
    const q = query.toLowerCase();
    return SEARCH_INDEX.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSnippet = item.snippet.toLowerCase().includes(q);
      const matchKeywords = item.keywords.some((k) => k.toLowerCase().includes(q));
      return matchTitle || matchSnippet || matchKeywords;
    });
  }, [query]);

  const handleSelect = (href: string) => {
    onClose();
    router.push(href);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full max-w-2xl overflow-hidden rounded-xl border border-gray-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-900 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-gray-200 dark:border-charcoal-800 gap-3 bg-gray-50/50 dark:bg-charcoal-800/50">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search lessons, commands (ls, mkdir, ros2 topic, chmod)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-sm text-charcoal-900 dark:text-white placeholder-gray-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-gray-400 hover:text-gray-600 dark:hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-gray-100 dark:divide-charcoal-800">
          {filteredResults.length === 0 ? (
            <div className="p-8 text-center text-sm text-gray-500">
              No results found for &ldquo;{query}&rdquo;. Try &ldquo;ls&rdquo;, &ldquo;ros2&rdquo;, or &ldquo;workspace&rdquo;.
            </div>
          ) : (
            filteredResults.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item.href)}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-charcoal-800/70 transition-colors flex items-start gap-3 group"
              >
                <div className="mt-0.5 p-2 rounded-md bg-gray-100 dark:bg-charcoal-800 text-redbrick-600 dark:text-redbrick-400 group-hover:bg-redbrick-600 group-hover:text-white transition-colors">
                  {item.category === "Linux" ? (
                    <Terminal className="h-4 w-4" />
                  ) : item.category === "ROS 2" ? (
                    <Cpu className="h-4 w-4" />
                  ) : (
                    <BookOpen className="h-4 w-4" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-charcoal-900 dark:text-white truncate">
                      {item.title}
                    </span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-gray-100 dark:bg-charcoal-800 text-gray-500">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                    {item.snippet}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity self-center" />
              </button>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-gray-50 dark:bg-charcoal-950 border-t border-gray-100 dark:border-charcoal-800 text-[11px] text-gray-400 flex items-center justify-between">
          <span>Press ESC to close</span>
          <span>Redbrick Robotics Knowledge Base</span>
        </div>
      </div>
    </div>
  );
}
