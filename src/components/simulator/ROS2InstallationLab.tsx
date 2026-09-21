"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Terminal as TerminalIcon,
  CheckCircle2,
  Circle,
  Play,
  RotateCcw,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import { useProgressStore } from "@/lib/store/progressStore";

interface InstallStep {
  id: number;
  key: string;
  titleTh: string;
  titleEn: string;
  command: string;
  explainTh: string;
  explainEn: string;
  resultTh: string;
  resultEn: string;
  requiredState?: string;
  missingErrorTh?: string;
  missingErrorEn?: string;
}

const STEPS: InstallStep[] = [
  {
    id: 1,
    key: "ubuntuVerified",
    titleTh: "ตรวจสอบว่าเป็น Ubuntu 24.04",
    titleEn: "Confirm Ubuntu 24.04",
    command: "cat /etc/os-release",
    explainTh: "ทำก่อนเพื่อป้องกันการติดตั้ง ROS ผิดรุ่น ค่าที่ต้องเห็นคือ VERSION_ID=\"24.04\" และ VERSION_CODENAME=noble",
    explainEn: "Do this first to avoid installing the wrong ROS release. Look for VERSION_ID=\"24.04\" and VERSION_CODENAME=noble.",
    resultTh: "ผ่านเมื่อเห็น 24.04 และ noble",
    resultEn: "Pass when the output contains 24.04 and noble",
  },
  {
    id: 2,
    key: "localeConfigured",
    titleTh: "ตั้งค่าภาษาให้รองรับ UTF-8",
    titleEn: "Configure a UTF-8 locale",
    command: "sudo apt update && sudo apt install locales\nsudo locale-gen en_US en_US.UTF-8\nsudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8\nexport LANG=en_US.UTF-8\nlocale",
    explainTh: "UTF-8 ทำให้ Terminal และข้อความ ROS 2 อ่านอักขระได้ถูกต้อง รันชุดคำสั่งนี้ครั้งเดียวก่อนเพิ่ม Repository",
    explainEn: "UTF-8 ensures that the terminal and ROS 2 messages use valid text encoding. Run this block once before adding the repository.",
    resultTh: "ผ่านเมื่อ LANG และ LC_ALL ลงท้ายด้วย UTF-8",
    resultEn: "Pass when LANG and LC_ALL end in UTF-8",
  },
  {
    id: 3,
    key: "universeEnabled",
    titleTh: "เปิดคลังแพ็กเกจ Universe",
    titleEn: "Enable the Universe repository",
    command: "sudo apt install software-properties-common\nsudo add-apt-repository universe",
    explainTh: "Universe มี dependencies ที่ ROS 2 ต้องใช้ คำสั่งแรกติดตั้งเครื่องมือจัดการ Repository และคำสั่งที่สองเปิด Universe",
    explainEn: "Universe contains dependencies used by ROS 2. The first command installs repository tools; the second enables Universe.",
    resultTh: "ผ่านเมื่อระบบแจ้งว่าเปิด component universe แล้ว",
    resultEn: "Pass when the universe component is enabled",
  },
  {
    id: 4,
    key: "rosRepoAdded",
    titleTh: "ติดตั้งตัวจัดการ ROS 2 APT Repository",
    titleEn: "Install the ROS 2 APT source package",
    command: "sudo apt update && sudo apt install curl -y\nexport ROS_APT_SOURCE_VERSION=$(curl -s https://api.github.com/repos/ros-infrastructure/ros-apt-source/releases/latest | grep -F \"tag_name\" | awk -F'\"' '{print $4}')\ncurl -L -o /tmp/ros2-apt-source.deb \"https://github.com/ros-infrastructure/ros-apt-source/releases/download/${ROS_APT_SOURCE_VERSION}/ros2-apt-source_${ROS_APT_SOURCE_VERSION}.$(. /etc/os-release && echo ${UBUNTU_CODENAME:-${VERSION_CODENAME}})_all.deb\"\nsudo dpkg -i /tmp/ros2-apt-source.deb",
    explainTh: "วิธีปัจจุบันจากเอกสารทางการใช้แพ็กเกจ ros2-apt-source ซึ่งตั้งค่า key และ Repository ให้อัตโนมัติ และรับการอัปเดตการตั้งค่าในอนาคต",
    explainEn: "The current official method installs ros2-apt-source, which configures the signing keys and repository and can receive future configuration updates.",
    resultTh: "ผ่านเมื่อ dpkg ติดตั้ง ros2-apt-source สำเร็จ",
    resultEn: "Pass when dpkg installs ros2-apt-source successfully",
  },
  {
    id: 5,
    key: "aptUpdated",
    titleTh: "อัปเดตรายการแพ็กเกจและระบบ",
    titleEn: "Update the package index and system",
    command: "sudo apt update\nsudo apt upgrade",
    explainTh: "APT จะอ่าน Repository ที่เพิ่งเพิ่มและอัปเดต Ubuntu ก่อนติดตั้ง ROS 2 ขั้นตอนนี้อาจใช้เวลาหลายนาที",
    explainEn: "APT reads the newly added repository and updates Ubuntu before ROS 2 is installed. This can take several minutes.",
    resultTh: "ผ่านเมื่อ apt update และ apt upgrade จบโดยไม่มี error",
    resultEn: "Pass when apt update and apt upgrade finish without errors",
    requiredState: "rosRepoAdded",
    missingErrorTh: "คำเตือน: ยังไม่ได้เพิ่ม ROS 2 Repository รายการแพ็กเกจของ ROS 2 จะไม่ถูกดึงเข้ามา",
    missingErrorEn: "Warning: ROS 2 Repository not added yet; ROS packages cannot be indexed.",
  },
  {
    id: 6,
    key: "rosInstalled",
    titleTh: "ติดตั้ง ROS 2 Jazzy Desktop",
    titleEn: "Install ROS 2 Jazzy Desktop",
    command: "sudo apt install ros-jazzy-desktop",
    explainTh: "เหมาะสำหรับคอมพิวเตอร์เรียนและพัฒนา เพราะมี ROS 2, RViz, rqt และตัวอย่างพร้อมใช้งาน หากเป็นเครื่องหุ่นยนต์ไม่มีจอให้เลือก ros-jazzy-ros-base",
    explainEn: "Use Desktop on a learning or development PC because it includes ROS 2, RViz, rqt, and examples. Use ros-jazzy-ros-base on a headless robot computer.",
    resultTh: "ผ่านเมื่อมีโฟลเดอร์ /opt/ros/jazzy",
    resultEn: "Pass when /opt/ros/jazzy exists",
    requiredState: "rosRepoAdded",
    missingErrorTh: "E: Unable to locate package ros-jazzy-desktop\n[HINT] คุณยังไม่ได้เพิ่ม ROS 2 repository (กรุณาทำขั้นตอนที่ 4 ก่อน)",
    missingErrorEn: "E: Unable to locate package ros-jazzy-desktop\n[HINT] ROS 2 apt repository not found. Please complete Step 4 first.",
  },
  {
    id: 7,
    key: "devToolsInstalled",
    titleTh: "ติดตั้งเครื่องมือพัฒนา",
    titleEn: "Install development tools",
    command: "sudo apt update && sudo apt install ros-dev-tools",
    explainTh: "จำเป็นเมื่อจะสร้าง Workspace หรือเขียน Package เพราะมี colcon, rosdep และเครื่องมือตรวจโค้ด",
    explainEn: "Install this when you plan to create workspaces or packages. It includes colcon, rosdep, and code-quality tools.",
    resultTh: "ผ่านเมื่อเรียก colcon และ rosdep ได้",
    resultEn: "Pass when colcon and rosdep are available",
  },
  {
    id: 8,
    key: "environmentSourced",
    titleTh: "โหลด ROS 2 ใน Terminal ปัจจุบัน",
    titleEn: "Source ROS 2 in the current terminal",
    command: "source /opt/ros/jazzy/setup.bash",
    explainTh: "ต้องทำทุกครั้งที่เปิด Terminal ใหม่ เพื่อให้เชลล์รู้จักคำสั่ง ros2 ขั้นตอนนี้ยังไม่แก้ ~/.bashrc อัตโนมัติ",
    explainEn: "Do this in every new terminal so the shell can find ros2. This step does not edit ~/.bashrc automatically.",
    resultTh: "ผ่านเมื่อ ROS_DISTRO มีค่าเป็น jazzy",
    resultEn: "Pass when ROS_DISTRO is jazzy",
    requiredState: "rosInstalled",
    missingErrorTh: "bash: /opt/ros/jazzy/setup.bash: No such file or directory\n[HINT] ยังไม่ได้ติดตั้ง ROS 2 Jazzy ในระบบ (กรุณาทำขั้นตอนที่ 6 ก่อน)",
    missingErrorEn: "bash: /opt/ros/jazzy/setup.bash: No such file or directory\n[HINT] ROS 2 Jazzy is not installed. Please run Step 6 first.",
  },
  {
    id: 9,
    key: "rosVerified",
    titleTh: "ตรวจสอบว่า ros2 ใช้งานได้",
    titleEn: "Verify that ros2 is available",
    command: "ros2 --help",
    explainTh: "ถ้าเห็นรายการคำสั่ง node, topic, service และ action แปลว่าการติดตั้งและการ source สำเร็จ",
    explainEn: "If node, topic, service, and action appear, installation and environment sourcing succeeded.",
    resultTh: "ผ่านเมื่อ ros2 --help แสดงรายการคำสั่ง",
    resultEn: "Pass when ros2 --help lists its commands",
    requiredState: "environmentSourced",
    missingErrorTh: "Command 'ros2' not found, but can be installed with: sudo apt install ros-jazzy-ros-base\n[HINT] คุณยังไม่ได้ Source สภาพแวดล้อม กรุณารัน: source /opt/ros/jazzy/setup.bash",
    missingErrorEn: "Command 'ros2' not found.\n[HINT] Environment not sourced. Please run: source /opt/ros/jazzy/setup.bash",
  },
  {
    id: 10,
    key: "demoRan",
    titleTh: "ทดสอบส่งข้อความด้วย Talker",
    titleEn: "Test message publishing with Talker",
    command: "ros2 run demo_nodes_cpp talker",
    explainTh: "Talker จะส่ง Hello World ต่อเนื่อง เปิด Terminal อีกหน้าต่างแล้ว source จากนั้นรัน ros2 run demo_nodes_py listener เพื่อทดสอบฝั่งรับ",
    explainEn: "Talker publishes Hello World repeatedly. In a second sourced terminal, run ros2 run demo_nodes_py listener to test the receiver.",
    resultTh: "ผ่านเมื่อเห็น Publishing: Hello World",
    resultEn: "Pass when Publishing: Hello World appears",
    requiredState: "environmentSourced",
    missingErrorTh: "Command 'ros2' not found. Please source the environment first.",
    missingErrorEn: "Command 'ros2' not found. Please source the environment first.",
  },
];

export function ROS2InstallationLab() {
  const { locale } = useProgressStore();

  const [state, setState] = useState({
    ubuntuVerified: false,
    localeConfigured: false,
    universeEnabled: false,
    rosRepoAdded: false,
    aptUpdated: false,
    rosInstalled: false,
    devToolsInstalled: false,
    environmentSourced: false,
    rosVerified: false,
    demoRan: false,
  });

  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  const [currentInput, setCurrentInput] = useState("");
  const [isInstalling, setIsInstalling] = useState(false);
  const [installProgress, setInstallProgress] = useState(0);
  const terminalOutputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const output = terminalOutputRef.current;
    if (output) output.scrollTop = output.scrollHeight;
  }, [terminalLogs, installProgress]);

  const appendLog = (line: string) => {
    setTerminalLogs((prev) => [...prev, line]);
  };

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    appendLog('redbrick@ubuntu:~$ ' + trimmed);

    if (trimmed === "cat /etc/os-release") {
      appendLog('PRETTY_NAME="Ubuntu 24.04 LTS"');
      appendLog('VERSION_ID="24.04"');
      appendLog('VERSION_CODENAME=noble');
      appendLog('UBUNTU_CODENAME=noble');
      appendLog("[OK] This machine matches the supported Jazzy platform.");
      setState((prev) => ({ ...prev, ubuntuVerified: true }));
      return;
    }

    if (trimmed === "locale" || (trimmed.includes("locale-gen") && trimmed.includes("locale"))) {
      appendLog("Generating locales (this might take a while)...");
      appendLog("  en_US.UTF-8... done");
      appendLog("LANG=en_US.UTF-8");
      appendLog('LC_CTYPE="en_US.UTF-8"');
      appendLog("LC_ALL=en_US.UTF-8");
      appendLog("[OK] System locale is properly configured for UTF-8.");
      setState((prev) => ({ ...prev, localeConfigured: true }));
      return;
    }

    if (trimmed.includes("apt install locales")) {
      appendLog("Reading package lists... Done");
      appendLog("locales is already the newest version.");
      return;
    }

    if (trimmed.startsWith("sudo locale-gen")) {
      appendLog("Generating locales (this might take a while)...");
      appendLog("  en_US.UTF-8... done");
      return;
    }

    if (trimmed.startsWith("sudo update-locale") || trimmed.startsWith("export LANG=")) {
      appendLog("[OK] UTF-8 environment variables updated.");
      return;
    }

    if (trimmed.includes("add-apt-repository") && trimmed.includes("universe")) {
      appendLog("'universe' distribution component enabled for all sources.");
      setState((prev) => ({ ...prev, universeEnabled: true }));
      return;
    }

    if (trimmed.includes("apt install software-properties-common")) {
      appendLog("software-properties-common is already the newest version.");
      return;
    }

    if (trimmed.includes("ros2-apt-source.deb") && trimmed.includes("dpkg -i")) {
      appendLog("Finding the latest ros2-apt-source release...");
      appendLog("Downloading ros2-apt-source for Ubuntu noble...");
      appendLog("Selecting previously unselected package ros2-apt-source.");
      appendLog("Setting up ros2-apt-source...");
      appendLog("[OK] ROS 2 signing keys and APT repository were configured.");
      setState((prev) => ({ ...prev, rosRepoAdded: true }));
      return;
    }

    if (trimmed.includes("apt install curl")) {
      appendLog("curl is already the newest version.");
      return;
    }

    if (trimmed.startsWith("export ROS_APT_SOURCE_VERSION=")) {
      appendLog("[OK] ROS_APT_SOURCE_VERSION set to the latest release.");
      return;
    }

    if (trimmed.includes("curl -L -o /tmp/ros2-apt-source.deb")) {
      appendLog("Downloading ros2-apt-source for Ubuntu noble...");
      appendLog("[OK] Saved to /tmp/ros2-apt-source.deb");
      return;
    }

    if (trimmed === "sudo dpkg -i /tmp/ros2-apt-source.deb") {
      appendLog("Selecting previously unselected package ros2-apt-source.");
      appendLog("Setting up ros2-apt-source...");
      appendLog("[OK] ROS 2 signing keys and APT repository were configured.");
      setState((prev) => ({ ...prev, rosRepoAdded: true }));
      return;
    }

    if (trimmed.includes("apt install") && trimmed.includes("ros-dev-tools")) {
      appendLog("Installing colcon-common-extensions, rosdep, python3-vcstool...");
      appendLog("Setting up colcon (0.16.0)...");
      appendLog("Setting up rosdep (0.23.0)...");
      appendLog("[OK] Robot development tools installed.");
      setState((prev) => ({ ...prev, devToolsInstalled: true }));
      return;
    }

    if (
      trimmed === "sudo apt update" ||
      trimmed === "sudo apt upgrade" ||
      (trimmed.includes("sudo apt update") && trimmed.includes("sudo apt upgrade"))
    ) {
      if (!state.rosRepoAdded) {
        appendLog("Hit:1 http://archive.ubuntu.com/ubuntu noble InRelease");
        appendLog("Hit:2 http://archive.ubuntu.com/ubuntu noble-updates InRelease");
        appendLog("Hit:3 http://archive.ubuntu.com/ubuntu noble-security InRelease");
        appendLog("Reading package lists... Done");
        appendLog("Notice: ROS 2 packages are not indexed because ros2-apt-source has not been installed.");
      } else {
        appendLog("Hit:1 http://archive.ubuntu.com/ubuntu noble InRelease");
        appendLog("Get:2 http://packages.ros.org/ros2/ubuntu noble InRelease [4,685 B]");
        appendLog("Get:3 http://packages.ros.org/ros2/ubuntu noble/main amd64 Packages [1,240 kB]");
        appendLog("Fetched 1,245 kB in 1s (1,120 kB/s)");
        appendLog("Reading package lists... Done");
        appendLog("Building dependency tree... Done");
        appendLog("Reading state information... Done");
        appendLog("Calculating upgrade... Done");
        appendLog("[OK] Package index and installed system packages are up to date.");
        setState((prev) => ({ ...prev, aptUpdated: true }));
      }
      return;
    }

    if (trimmed.includes("apt install") && trimmed.includes("ros-jazzy-desktop")) {
      if (!state.rosRepoAdded) {
        appendLog("Reading package lists... Done");
        appendLog("Building dependency tree... Done");
        appendLog("Reading state information... Done");
        appendLog("E: Unable to locate package ros-jazzy-desktop");
        appendLog(">> HINT: คุณยังไม่ได้เพิ่ม ROS 2 repository (กรุณารันขั้นตอนที่ 4 ก่อน)");
        return;
      }

      setIsInstalling(true);
      appendLog("Reading package lists... Done");
      appendLog("Building dependency tree... Done");
      appendLog("Reading state information... Done");
      appendLog("The following NEW packages will be installed:");
      appendLog("  ros-jazzy-desktop ros-jazzy-ros-base rviz2 rclcpp rclpy geometry-msgs sensor-msgs");
      appendLog("0 upgraded, 185 newly installed, 0 to remove and 0 not upgraded.");
      appendLog("Need to get 428 MB of archives.");
      appendLog("After this operation, 1,840 MB of additional disk space will be used.");
      appendLog("Do you want to continue? [Y/n] Y");

      const stages = [5, 25, 52, 78, 100];
      stages.forEach((p, idx) => {
        setTimeout(() => {
          setInstallProgress(p);
          appendLog('Progress: [' + p + '%] Unpacking & setting up ros-jazzy-desktop packages...');
          if (p === 100) {
            appendLog("Setting up ldconfig triggers...");
            appendLog("[SUCCESS] ROS 2 Jazzy Jalisco Desktop successfully installed into /opt/ros/jazzy!");
            setIsInstalling(false);
            setState((prev) => ({ ...prev, rosInstalled: true }));
          }
        }, (idx + 1) * 350);
      });
      return;
    }

    if (trimmed.includes("source /opt/ros/jazzy/setup.bash")) {
      if (!state.rosInstalled) {
        appendLog("bash: /opt/ros/jazzy/setup.bash: No such file or directory");
        appendLog(">> HINT: ยังไม่ได้ติดตั้ง ROS 2 Jazzy ในระบบ (กรุณาทำขั้นตอนที่ 6 ก่อน)");
        return;
      }
      appendLog("[OK] Sourced /opt/ros/jazzy/setup.bash.");
      appendLog("[OK] AMENT_PREFIX_PATH=/opt/ros/jazzy");
      appendLog("[OK] ROS_DISTRO=jazzy");
      setState((prev) => ({ ...prev, environmentSourced: true }));
      return;
    }

    if (trimmed === "ros2" || trimmed === "ros2 --help") {
      if (!state.environmentSourced) {
        appendLog("Command 'ros2' not found, but can be installed with: sudo apt install ros-jazzy-ros-base");
        appendLog(">> HINT: คุณยังไม่ได้ Source สภาพแวดล้อม กรุณารัน: source /opt/ros/jazzy/setup.bash");
        return;
      }

      appendLog("usage: ros2 [-h] [--use-python-logging] Call  for more detailed usage.");
      appendLog("");
      appendLog("Commands:");
      appendLog("  action     Various action related sub-commands");
      appendLog("  bag        Various rosbag related sub-commands");
      appendLog("  component  Manage component containers");
      appendLog("  daemon     Various daemon related sub-commands");
      appendLog("  launch     Run a launch file");
      appendLog("  node       Various node related sub-commands");
      appendLog("  param      Various param related sub-commands");
      appendLog("  pkg        Create and inspect packages");
      appendLog("  run        Run a package specific executable");
      appendLog("  service    Various service related sub-commands");
      appendLog("  topic      Various topic related sub-commands");
      appendLog("");
      appendLog("[SUCCESS] ros2 command line interface is operational!");
      setState((prev) => ({ ...prev, rosVerified: true }));
      return;
    }

    if (trimmed.includes("ros2 run demo_nodes_cpp talker")) {
      if (!state.environmentSourced) {
        appendLog("Command 'ros2' not found. Please source the environment first.");
        return;
      }

      appendLog("[INFO] [talker]: Publishing: 'Hello World: 1'");
      appendLog("[INFO] [talker]: Publishing: 'Hello World: 2'");
      appendLog("[INFO] [talker]: Publishing: 'Hello World: 3'");
      appendLog("[SUCCESS] Demo talker node published successfully via DDS!");
      setState((prev) => ({ ...prev, demoRan: true }));
      return;
    }

    appendLog('bash: ' + trimmed + ': command not found');
  };

  const handleRunStep = (step: InstallStep) => {
    executeCommand(step.command);
  };

  const handleReset = () => {
    setState({
      ubuntuVerified: false,
      localeConfigured: false,
      universeEnabled: false,
      rosRepoAdded: false,
      aptUpdated: false,
      rosInstalled: false,
      devToolsInstalled: false,
      environmentSourced: false,
      rosVerified: false,
      demoRan: false,
    });
    setTerminalLogs([]);
    setInstallProgress(0);
  };

  return (
    <div className="my-10 rounded-2xl border-2 border-redbrick-600/30 bg-charcoal-950 text-white overflow-hidden shadow-2xl font-sans">
      <div className="p-5 bg-charcoal-900 border-b border-charcoal-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-redbrick-600 text-white shadow-md">
            <TerminalIcon className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-extrabold text-white font-heading">
                {locale === "th"
                  ? "ฝึกติดตั้ง ROS 2 Jazzy บน Ubuntu 24.04"
                  : "Practice installing ROS 2 Jazzy on Ubuntu 24.04"}
              </h3>
              <span className="text-[10px] font-mono font-bold bg-green-950/80 text-green-400 border border-green-800/40 px-2 py-0.5 rounded-full">
                Interactive Guided Lab
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              {locale === "th"
                ? "กด “รัน” หรือพิมพ์คำสั่งเอง ผลลัพธ์จะแสดงใน Terminal ด้านขวาทันที"
                : "Click Run or type a command. Its output appears immediately in the terminal on the right."}
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 text-gray-300 text-xs font-mono transition-colors self-start sm:self-auto border border-charcoal-700"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>{locale === "th" ? "รีเซ็ตสถานะ" : "Reset Lab"}</span>
        </button>
      </div>

      <div className="border-b border-charcoal-800 bg-sky-950/25 px-5 py-4 text-sm text-sky-100">
        <div className="flex items-start gap-3">
          <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-sky-400" />
          <div className="space-y-1.5 leading-relaxed">
            <p className="font-bold">
              {locale === "th" ? "คู่มือติดตั้ง ROS 2 Jazzy สำหรับ Ubuntu 24.04" : "ROS 2 Jazzy installation guide for Ubuntu 24.04"}
            </p>
            <p className="text-sky-200/80">
              {locale === "th" ? "ทำตามขั้นตอนจากบนลงล่าง คำสั่งและผลลัพธ์ทั้งหมดจะแสดงผ่าน Terminal เดียว" : "Follow the steps from top to bottom. Every command and its output appears in one terminal."}
            </p>
            <a
              href="https://docs.ros.org/en/jazzy/Installation/Ubuntu-Install-Debs.html"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-bold text-sky-300 underline decoration-sky-500/50 underline-offset-4 hover:text-white"
            >
              {locale === "th" ? "เปิดคู่มือติดตั้ง ROS 2 Jazzy ทางการ" : "Open the official ROS 2 Jazzy installation guide"}
              <ChevronRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-start">
        <div className="lg:col-span-7 p-5 space-y-3 border-b lg:border-b-0 lg:border-r border-charcoal-800">
          <div className="text-xs font-mono font-bold uppercase text-gray-400 mb-1 flex items-center justify-between">
            <span>{locale === "th" ? "ทำตามลำดับ 10 ขั้นตอน" : "Follow these 10 steps in order"}</span>
            <span className="text-redbrick-400">
              {Object.values(state).filter(Boolean).length} / 10 Done
            </span>
          </div>

          {STEPS.map((step) => {
            const isDone = (state as any)[step.key];
            return (
              <div
                key={step.id}
                className={'p-3.5 rounded-xl border transition-all ' + (isDone ? 'bg-green-950/15 border-green-600/40' : 'bg-charcoal-900/60 border-charcoal-800 hover:border-charcoal-700')}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    {isDone ? (
                      <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="h-4 w-4 text-gray-600 shrink-0 mt-0.5" />
                    )}
                    <div className="min-w-0">
                      <span className="mb-1 inline-block rounded bg-charcoal-800 px-1.5 py-0.5 font-mono text-[10px] text-gray-400">
                        {locale === "th" ? `ขั้นตอน ${step.id}` : `Step ${step.id}`}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-gray-100 font-heading">
                        {locale === "th" ? step.titleTh : step.titleEn}
                      </h4>
                      <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">
                        {locale === "th" ? step.explainTh : step.explainEn}
                      </p>
                      <p className="mt-2 flex items-start gap-1.5 text-[11px] font-medium leading-relaxed text-green-300">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                        <span><strong>{locale === "th" ? "สำเร็จเมื่อ: " : "Success: "}</strong>{locale === "th" ? step.resultTh : step.resultEn}</span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRunStep(step)}
                    className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-redbrick-600 hover:bg-redbrick-500 active:scale-95 text-white font-bold text-xs transition-all shadow-sm"
                  >
                    <Play className="h-3 w-3 fill-current" />
                    <span>{locale === "th" ? "รัน" : "Run"}</span>
                  </button>
                </div>

                <div className="mt-3 overflow-hidden rounded-lg border border-charcoal-700 bg-charcoal-800/70">
                  <div className="border-b border-charcoal-700 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-gray-400">
                    {locale === "th" ? "คำสั่งสำหรับคัดลอกไปรัน" : "Command to copy and run"}
                  </div>
                  <pre className="overflow-x-auto p-3 font-mono text-[11px] leading-relaxed text-gray-200">
                    <code>{step.command}</code>
                  </pre>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-5 flex flex-col bg-charcoal-950 h-[780px] lg:h-[900px] lg:sticky lg:top-20">
          <div className="px-4 py-2.5 bg-charcoal-900 border-b border-charcoal-800 flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-gray-300 flex items-center gap-1.5">
              <TerminalIcon className="h-3.5 w-3.5 text-green-400" />
              Terminal
            </span>
            <span className="text-[10px] font-mono text-gray-500">
              {state.environmentSourced ? "ROS 2 Jazzy Sourced" : "Base Shell"}
            </span>
          </div>

          <div
            ref={terminalOutputRef}
            className="flex-1 p-4 font-mono text-xs overflow-y-auto text-gray-300 bg-charcoal-950 select-text"
          >
            {terminalLogs.length === 0 && (
              <p className="mb-2 text-gray-600">
                {locale === "th"
                  ? "พิมพ์คำสั่งด้านล่าง หรือกดปุ่ม “รัน” ในแต่ละขั้นตอน"
                  : "Type a command below or click Run on a step."}
              </p>
            )}
            <div className="space-y-1">
              {terminalLogs.map((log, idx) => (
                <div
                  key={idx}
                  className={
                    log.startsWith("redbrick@")
                      ? "text-redbrick-400 font-semibold mt-1"
                      : log.startsWith("[OK]") || log.startsWith("[SUCCESS]")
                      ? "text-green-400 font-semibold"
                      : log.startsWith("E:") || log.startsWith("bash:") || log.startsWith("Command 'ros2' not found")
                      ? "text-red-400 font-bold"
                      : log.startsWith(">> HINT:")
                      ? "text-amber-300 font-medium"
                      : "text-gray-300"
                  }
                >
                  {log}
                </div>
              ))}
            </div>

            {isInstalling && (
              <div className="mt-2 p-2 rounded bg-charcoal-900 border border-charcoal-800">
                <div className="flex justify-between text-[10px] mb-1">
                  <span>Downloading & Unpacking Packages...</span>
                  <span className="text-green-400 font-bold">{installProgress}%</span>
                </div>
                <div className="w-full bg-charcoal-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-green-500 h-full transition-all duration-300"
                    style={{ width: installProgress + '%' }}
                  />
                </div>
              </div>
            )}

            <form
              onSubmit={(event) => {
                event.preventDefault();
                executeCommand(currentInput);
                setCurrentInput("");
              }}
              className="mt-2 flex items-center gap-2"
            >
              <span className="shrink-0 select-none font-bold text-redbrick-400">
                redbrick@ubuntu:~$
              </span>
              <input
                type="text"
                value={currentInput}
                onChange={(event) => setCurrentInput(event.target.value)}
                placeholder={locale === "th" ? "พิมพ์คำสั่งแล้วกด Enter" : "Type a command and press Enter"}
                aria-label={locale === "th" ? "พิมพ์คำสั่งติดตั้ง ROS 2" : "Type a ROS 2 installation command"}
                className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-gray-600"
                spellCheck={false}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
