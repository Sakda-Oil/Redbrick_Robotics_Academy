"use client";

import React, { useState } from "react";
import {
  Terminal as TerminalIcon,
  CheckCircle2,
  Circle,
  Play,
  RotateCcw,
  Sparkles,
  AlertCircle,
  HelpCircle,
  Layers,
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
  requiredState?: string;
  missingErrorTh?: string;
  missingErrorEn?: string;
}

const STEPS: InstallStep[] = [
  {
    id: 1,
    key: "ubuntuVerified",
    titleTh: "1. ตรวจสอบเวอร์ชัน Ubuntu (Noble 24.04)",
    titleEn: "1. Check Ubuntu Version (Noble 24.04)",
    command: "lsb_release -a",
    explainTh: "ตรวจสอบว่าระบบปฏิบัติการคือ Ubuntu 24.04 LTS (Noble Numbat) ซึ่งเป็นแพลตฟอร์มหลักของ ROS 2 Jazzy",
    explainEn: "Verify that the operating system is Ubuntu 24.04 LTS (Noble Numbat), the official tier-1 platform for ROS 2 Jazzy.",
  },
  {
    id: 2,
    key: "localeConfigured",
    titleTh: "2. ตั้งค่า Locale ให้รองรับ UTF-8",
    titleEn: "2. Configure UTF-8 Locale",
    command: "locale",
    explainTh: "ROS 2 ต้องการการเข้ารหัส UTF-8 เพื่อรองรับชื่อ Node, Topic และข้อความหลายภาษาอย่างถูกต้อง",
    explainEn: "ROS 2 strictly requires a UTF-8 environment for node names, topic namespaces, and message encoding.",
  },
  {
    id: 3,
    key: "universeEnabled",
    titleTh: "3. เปิดใช้งาน Ubuntu Universe Repository",
    titleEn: "3. Enable Ubuntu Universe Repository",
    command: "sudo add-apt-repository universe",
    explainTh: "เปิดใช้งานคลังแพ็กเกจ Universe ของ Ubuntu ซึ่งบรรจุเครื่องมือและคอมไพเลอร์ที่จำเป็นต่อหุ่นยนต์",
    explainEn: "Enable the Ubuntu Universe software repository containing necessary build tools and libraries.",
  },
  {
    id: 4,
    key: "rosRepoAdded",
    titleTh: "4. เพิ่ม ROS 2 GPG Key และ APT Repository",
    titleEn: "4. Add ROS 2 GPG Key & Official APT Repository",
    command: "sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg",
    explainTh: "ดาวน์โหลดคีย์ความปลอดภัยอย่างเป็นทางการของ Open Robotics เพื่อตรวจสอบความถูกต้องของแพ็กเกจ",
    explainEn: "Download and store the official Open Robotics GPG public key for APT package signature verification.",
  },
  {
    id: 5,
    key: "aptUpdated",
    titleTh: "5. อัปเดต Package Index",
    titleEn: "5. Update APT Package Index",
    command: "sudo apt update",
    explainTh: "ดาวน์โหลดรายชื่อแพ็กเกจใหม่ล่าสุดจากคลัง ROS 2 เข้าสู่ฐานข้อมูล APT ในเครื่อง",
    explainEn: "Refresh the local package index to include newly added ROS 2 Jazzy packages.",
    requiredState: "rosRepoAdded",
    missingErrorTh: "คำเตือน: ยังไม่ได้เพิ่ม ROS 2 Repository รายการแพ็กเกจของ ROS 2 จะไม่ถูกดึงเข้ามา",
    missingErrorEn: "Warning: ROS 2 Repository not added yet; ROS packages cannot be indexed.",
  },
  {
    id: 6,
    key: "rosInstalled",
    titleTh: "6. ติดตั้ง ROS 2 Jazzy Desktop",
    titleEn: "6. Install ROS 2 Jazzy Desktop Suite",
    command: "sudo apt install -y ros-jazzy-desktop",
    explainTh: "ติดตั้ง ROS 2 Core, RViz2, คลังข้อความมาตรฐาน, ไลบรารี rclcpp/rclpy และ Demos",
    explainEn: "Installs core ROS 2 Jazzy, RViz2, standard messages, rclcpp/rclpy, and development demos.",
    requiredState: "rosRepoAdded",
    missingErrorTh: "E: Unable to locate package ros-jazzy-desktop\n[HINT] คุณยังไม่ได้เพิ่ม ROS 2 repository (กรุณาทำขั้นตอนที่ 4 ก่อน)",
    missingErrorEn: "E: Unable to locate package ros-jazzy-desktop\n[HINT] ROS 2 apt repository not found. Please complete Step 4 first.",
  },
  {
    id: 7,
    key: "devToolsInstalled",
    titleTh: "7. ติดตั้ง Development Tools (colcon, rosdep)",
    titleEn: "7. Install Dev Tools (colcon, rosdep)",
    command: "sudo apt install -y ros-dev-tools",
    explainTh: "ติดตั้ง colcon สำหรับคอมไพล์โค้ดหุ่นยนต์, rosdep สำหรับจัดการ dependencies และ vcs สำหรับโค้ดต้นทาง",
    explainEn: "Installs colcon build tool, rosdep dependency manager, and VCS repository utilities.",
  },
  {
    id: 8,
    key: "environmentSourced",
    titleTh: "8. โหลดสภาพแวดล้อม (Source Environment)",
    titleEn: "8. Source ROS 2 Environment",
    command: "source /opt/ros/jazzy/setup.bash",
    explainTh: "โหลด environment variables (PATH, AMENT_PREFIX_PATH, PYTHONPATH) ของ ROS 2 เข้าสู่เชลล์",
    explainEn: "Export ROS 2 environment paths and binaries into the current shell session.",
    requiredState: "rosInstalled",
    missingErrorTh: "bash: /opt/ros/jazzy/setup.bash: No such file or directory\n[HINT] ยังไม่ได้ติดตั้ง ROS 2 Jazzy ในระบบ (กรุณาทำขั้นตอนที่ 6 ก่อน)",
    missingErrorEn: "bash: /opt/ros/jazzy/setup.bash: No such file or directory\n[HINT] ROS 2 Jazzy is not installed. Please run Step 6 first.",
  },
  {
    id: 9,
    key: "rosVerified",
    titleTh: "9. ตรวจสอบคำสั่ง ros2 CLI",
    titleEn: "9. Verify ros2 CLI Binary",
    command: "ros2 --help",
    explainTh: "ตรวจสอบว่าคำสั่ง 'ros2' พร้อมทำงานและแสดงรายการ Subcommands ทั้งหมด",
    explainEn: "Verify that the 'ros2' binary is accessible and inspect the available core subverbs.",
    requiredState: "environmentSourced",
    missingErrorTh: "Command 'ros2' not found, but can be installed with: sudo apt install ros-jazzy-ros-base\n[HINT] คุณยังไม่ได้ Source สภาพแวดล้อม กรุณารัน: source /opt/ros/jazzy/setup.bash",
    missingErrorEn: "Command 'ros2' not found.\n[HINT] Environment not sourced. Please run: source /opt/ros/jazzy/setup.bash",
  },
  {
    id: 10,
    key: "demoRan",
    titleTh: "10. รัน Demo C++ Talker Node",
    titleEn: "10. Run Demo C++ Talker Node",
    command: "ros2 run demo_nodes_cpp talker",
    explainTh: "ทดสอบรันโหนด Publisher แรกเพื่อยืนยันว่าระบบสื่อสาร ROS 2 และ DDS ทำงานสมบูรณ์",
    explainEn: "Launch the canonical C++ talker node to confirm that ROS 2 DDS middleware is functioning.",
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

  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "Redbrick Ubuntu 24.04 LTS (Noble Numbat) [Simulated Environment]",
    "Type a command or click 'Run Step' to install ROS 2 Jazzy step-by-step.",
    "",
  ]);

  const [currentInput, setCurrentInput] = useState("");
  const [isInstalling, setIsInstalling] = useState(false);
  const [installProgress, setInstallProgress] = useState(0);

  const appendLog = (line: string) => {
    setTerminalLogs((prev) => [...prev, line]);
  };

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    appendLog('redbrick@ubuntu:~$ ' + trimmed);

    if (trimmed === "lsb_release -a") {
      appendLog("Distributor ID: Ubuntu");
      appendLog("Description:    Ubuntu 24.04 LTS");
      appendLog("Release:        24.04");
      appendLog("Codename:       noble");
      setState((prev) => ({ ...prev, ubuntuVerified: true }));
      return;
    }

    if (trimmed === "locale") {
      appendLog("LANG=en_US.UTF-8");
      appendLog('LC_CTYPE="en_US.UTF-8"');
      appendLog("LC_ALL=en_US.UTF-8");
      appendLog("[OK] System locale is properly configured for UTF-8.");
      setState((prev) => ({ ...prev, localeConfigured: true }));
      return;
    }

    if (trimmed.includes("add-apt-repository") && trimmed.includes("universe")) {
      appendLog("'universe' distribution component enabled for all sources.");
      setState((prev) => ({ ...prev, universeEnabled: true }));
      return;
    }

    if (trimmed.includes("ros.key") || (trimmed.includes("ros-archive-keyring.gpg") && trimmed.includes("curl"))) {
      appendLog("Downloading ROS 2 archive keyring...");
      appendLog("File saved to /usr/share/keyrings/ros-archive-keyring.gpg");
      appendLog("Adding deb [arch=amd64 signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] to /etc/apt/sources.list.d/ros2.list");
      appendLog("[OK] ROS 2 Jazzy repository added successfully.");
      setState((prev) => ({ ...prev, rosRepoAdded: true }));
      return;
    }

    if (trimmed === "sudo apt update") {
      if (!state.rosRepoAdded) {
        appendLog("Hit:1 http://archive.ubuntu.com/ubuntu noble InRelease");
        appendLog("Hit:2 http://archive.ubuntu.com/ubuntu noble-updates InRelease");
        appendLog("Hit:3 http://archive.ubuntu.com/ubuntu noble-security InRelease");
        appendLog("Reading package lists... Done");
        appendLog("Notice: ROS 2 packages not indexed because repository key has not been added.");
      } else {
        appendLog("Hit:1 http://archive.ubuntu.com/ubuntu noble InRelease");
        appendLog("Get:2 http://packages.ros.org/ros2/ubuntu noble InRelease [4,685 B]");
        appendLog("Get:3 http://packages.ros.org/ros2/ubuntu noble/main amd64 Packages [1,240 kB]");
        appendLog("Fetched 1,245 kB in 1s (1,120 kB/s)");
        appendLog("Reading package lists... Done");
        appendLog("Building dependency tree... Done");
        appendLog("Reading state information... Done");
        appendLog("[OK] 1,420 packages can be upgraded.");
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

    if (trimmed.includes("apt install") && trimmed.includes("ros-dev-tools")) {
      appendLog("Installing colcon-common-extensions, rosdep, python3-vcstool...");
      appendLog("Setting up colcon (0.16.0)...");
      appendLog("Setting up rosdep (0.23.0)...");
      appendLog("[OK] Robot development tools installed.");
      setState((prev) => ({ ...prev, devToolsInstalled: true }));
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

    appendLog('bash: ' + trimmed + ': command simulated but not part of installation steps.');
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
    setTerminalLogs([
      "Redbrick Ubuntu 24.04 LTS (Noble Numbat) [Simulated Environment]",
      "Reset completed. Ready to start from Step 1.",
      "",
    ]);
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
                  ? "ห้องปฏิบัติการติดตั้ง ROS 2 Jazzy บน Ubuntu 24.04 (Stateful Simulator)"
                  : "Stateful ROS 2 Jazzy Installation Lab (Ubuntu 24.04 Noble)"}
              </h3>
              <span className="text-[10px] font-mono font-bold bg-green-950/80 text-green-400 border border-green-800/40 px-2 py-0.5 rounded-full">
                Interactive Guided Lab
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              {locale === "th"
                ? "กด 'Run Step' ตามลำดับ 10 ขั้นตอน หรือพิมพ์คำสั่งจริงใน Terminal เพื่อทดสอบการติดตั้งเสมือนจริง"
                : "Execute commands sequentially across all 10 official steps to experience a stateful installation simulation."}
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        <div className="lg:col-span-7 p-5 space-y-3 border-b lg:border-b-0 lg:border-r border-charcoal-800 max-h-[620px] overflow-y-auto">
          <div className="text-xs font-mono font-bold uppercase text-gray-400 mb-1 flex items-center justify-between">
            <span>Official Installation Roadmap (10 Steps)</span>
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
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-gray-100 font-heading">
                        {locale === "th" ? step.titleTh : step.titleEn}
                      </h4>
                      <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">
                        {locale === "th" ? step.explainTh : step.explainEn}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRunStep(step)}
                    className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-redbrick-600 hover:bg-redbrick-500 active:scale-95 text-white font-bold text-xs transition-all shadow-sm"
                  >
                    <Play className="h-3 w-3 fill-current" />
                    <span>Run</span>
                  </button>
                </div>

                <div className="mt-2.5 px-3 py-1.5 rounded-lg bg-black/60 border border-charcoal-800 font-mono text-[11px] text-gray-300 flex items-center justify-between overflow-x-auto">
                  <code>{step.command}</code>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-5 flex flex-col bg-charcoal-950 h-[620px]">
          <div className="px-4 py-2.5 bg-charcoal-900 border-b border-charcoal-800 flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-gray-300 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              Ubuntu 24.04 Terminal Simulator
            </span>
            <span className="text-[10px] font-mono text-gray-500">
              {state.environmentSourced ? "ROS 2 Jazzy Sourced" : "Base Shell"}
            </span>
          </div>

          <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-1 text-gray-300 bg-charcoal-950 select-text">
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
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              executeCommand(currentInput);
              setCurrentInput("");
            }}
            className="p-3 bg-charcoal-900 border-t border-charcoal-800 flex items-center gap-2 font-mono text-xs"
          >
            <span className="text-redbrick-400 select-none font-bold">
              {state.environmentSourced ? "redbrick@ubuntu:~$ [ros2]" : "redbrick@ubuntu:~$"}
            </span>
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder="Type command (e.g. lsb_release -a)..."
              className="flex-1 bg-transparent text-white outline-none focus:ring-0"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
