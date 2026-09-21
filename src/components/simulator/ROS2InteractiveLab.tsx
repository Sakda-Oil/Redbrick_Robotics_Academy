"use client";

import React, { useState, useEffect } from "react";
import { TerminalSimulator } from "./TerminalSimulator";
import { MobileRobotSimulator } from "./MobileRobotSimulator";
import {
  Code,
  Bot,
  Play,
  Save,
  Folder,
  File,
  ChevronRight,
  ChevronDown,
  Sparkles,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { useProgressStore } from "@/lib/store/progressStore";
import { VirtualFileSystem } from "@/lib/simulator/virtualFileSystem";
import { ROS2Simulator } from "@/lib/simulator/ros2Simulator";

// Official ROS 2 Jazzy Examples
const CODE_PRESETS = {
  publisher: {
    title: "1. Minimal Publisher (/topic)",
    python: `import rclpy
from rclpy.node import Node
from std_msgs.msg import String


class MinimalPublisher(Node):

    def __init__(self):
        super().__init__('minimal_publisher')

        self.publisher_ = self.create_publisher(
            String,
            'topic',
            10
        )

        self.timer = self.create_timer(
            0.5,
            self.timer_callback
        )

        self.i = 0

    def timer_callback(self):
        msg = String()
        msg.data = f'Hello World: {self.i}'

        self.publisher_.publish(msg)

        self.get_logger().info(
            f'Publishing: "{msg.data}"'
        )

        self.i += 1


def main(args=None):

    rclpy.init(args=args)

    minimal_publisher = MinimalPublisher()

    rclpy.spin(minimal_publisher)

    minimal_publisher.destroy_node()

    rclpy.shutdown()


if __name__ == '__main__':
    main()`,
    cpp: `#include <chrono>
#include <memory>
#include <string>

#include "rclcpp/rclcpp.hpp"
#include "std_msgs/msg/string.hpp"

using namespace std::chrono_literals;

class MinimalPublisher : public rclcpp::Node
{
public:
  MinimalPublisher()
  : Node("minimal_publisher"), count_(0)
  {
    publisher_ =
      this->create_publisher<std_msgs::msg::String>(
        "topic", 10);

    timer_ =
      this->create_wall_timer(
        500ms,
        std::bind(
          &MinimalPublisher::timer_callback,
          this));
  }

private:
  void timer_callback()
  {
    auto message =
      std_msgs::msg::String();

    message.data =
      "Hello World: " +
      std::to_string(count_++);

    RCLCPP_INFO(
      this->get_logger(),
      "Publishing: '%s'",
      message.data.c_str());

    publisher_->publish(message);
  }

  rclcpp::TimerBase::SharedPtr timer_;

  rclcpp::Publisher<
    std_msgs::msg::String
  >::SharedPtr publisher_;

  size_t count_;
};

int main(int argc, char * argv[])
{
  rclcpp::init(argc, argv);

  rclcpp::spin(
    std::make_shared<MinimalPublisher>());

  rclcpp::shutdown();

  return 0;
}`,
  },
  subscriber: {
    title: "2. Minimal Subscriber (/topic)",
    python: `import rclpy
from rclpy.node import Node
from std_msgs.msg import String


class MinimalSubscriber(Node):

    def __init__(self):
        super().__init__('minimal_subscriber')
        self.subscription = self.create_subscription(
            String,
            'topic',
            self.listener_callback,
            10
        )
        self.subscription  # prevent unused variable warning

    def listener_callback(self, msg):
        self.get_logger().info(f'I heard: "{msg.data}"')


def main(args=None):
    rclpy.init(args=args)
    minimal_subscriber = MinimalSubscriber()
    rclpy.spin(minimal_subscriber)
    minimal_subscriber.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()`,
    cpp: `#include <memory>
#include "rclcpp/rclcpp.hpp"
#include "std_msgs/msg/string.hpp"

class MinimalSubscriber : public rclcpp::Node
{
public:
  MinimalSubscriber()
  : Node("minimal_subscriber")
  {
    subscription_ = this->create_subscription<std_msgs::msg::String>(
      "topic", 10,
      std::bind(&MinimalSubscriber::topic_callback, this, std::placeholders::_1));
  }

private:
  void topic_callback(const std_msgs::msg::String & msg) const
  {
    RCLCPP_INFO(this->get_logger(), "I heard: '%s'", msg.data.c_str());
  }

  rclcpp::Subscription<std_msgs::msg::String>::SharedPtr subscription_;
};

int main(int argc, char * argv[])
{
  rclcpp::init(argc, argv);
  rclcpp::spin(std::make_shared<MinimalSubscriber>());
  rclcpp::shutdown();
  return 0;
}`,
  },
  robot_controller: {
    title: "3. Robot Controller (Twist to /cmd_vel)",
    python: `import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist


class RobotController(Node):

    def __init__(self):
        super().__init__('robot_controller')

        self.publisher_ = self.create_publisher(
            Twist,
            '/cmd_vel',
            10
        )

        self.timer = self.create_timer(
            0.1,
            self.timer_callback
        )

    def timer_callback(self):
        msg = Twist()

        msg.linear.x = 0.25
        msg.angular.z = 0.0

        self.publisher_.publish(msg)
        self.get_logger().info('Publishing linear.x = 0.25 to /cmd_vel')


def main(args=None):

    rclpy.init(args=args)

    node = RobotController()

    rclpy.spin(node)

    node.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()`,
    cpp: `#include <chrono>
#include <memory>
#include "rclcpp/rclcpp.hpp"
#include "geometry_msgs/msg/twist.hpp"

using namespace std::chrono_literals;

class RobotController : public rclcpp::Node
{
public:
  RobotController()
  : Node("robot_controller")
  {
    publisher_ = this->create_publisher<geometry_msgs::msg::Twist>("/cmd_vel", 10);
    timer_ = this->create_wall_timer(
      100ms, std::bind(&RobotController::timer_callback, this));
  }

private:
  void timer_callback()
  {
    auto message = geometry_msgs::msg::Twist();
    message.linear.x = 0.25;
    message.angular.z = 0.0;
    RCLCPP_INFO(this->get_logger(), "Publishing linear.x = 0.25 to /cmd_vel");
    publisher_->publish(message);
  }

  rclcpp::TimerBase::SharedPtr timer_;
  rclcpp::Publisher<geometry_msgs::msg::Twist>::SharedPtr publisher_;
};

int main(int argc, char * argv[])
{
  rclcpp::init(argc, argv);
  rclcpp::spin(std::make_shared<RobotController>());
  rclcpp::shutdown();
  return 0;
}`,
  },
};

// Tree Node Component
function FSNodeView({
  node,
  path,
  level,
  onSelect,
  selectedPath,
}: {
  node: any;
  path: string;
  level: number;
  onSelect: (p: string) => void;
  selectedPath: string;
}) {
  const [expanded, setExpanded] = useState(level < 2);
  const isSelected = path === selectedPath;

  if (node.type === "file") {
    return (
      <div
        className={`flex items-center gap-1.5 py-1 px-2 cursor-pointer hover:bg-charcoal-700 select-none ${
          isSelected ? "bg-charcoal-800 text-blue-400 font-bold" : "text-gray-300"
        }`}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={() => onSelect(path)}
      >
        <File className="h-3.5 w-3.5 shrink-0" />
        <span className="text-xs truncate">{node.name}</span>
      </div>
    );
  }

  const children = node.children ? Object.values(node.children) : [];

  return (
    <div>
      <div
        className="flex items-center gap-1.5 py-1 px-2 cursor-pointer hover:bg-charcoal-800 text-gray-300 select-none"
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? (
          <ChevronDown className="h-3 w-3 shrink-0 text-gray-400" />
        ) : (
          <ChevronRight className="h-3 w-3 shrink-0 text-gray-400" />
        )}
        <Folder className="h-3.5 w-3.5 shrink-0 text-blue-400" />
        <span className="text-xs font-semibold truncate">{node.name}</span>
      </div>
      {expanded &&
        children.map((c: any) => (
          <FSNodeView
            key={c.name}
            node={c}
            path={`${path === "/" ? "" : path}/${c.name}`}
            level={level + 1}
            onSelect={onSelect}
            selectedPath={selectedPath}
          />
        ))}
    </div>
  );
}

export function ROS2InteractiveLab() {
  const { locale } = useProgressStore();
  const [fs] = useState(() => new VirtualFileSystem());
  const [ros] = useState(() => new ROS2Simulator());

  const [activePreset, setActivePreset] = useState<"publisher" | "subscriber" | "robot_controller">("publisher");
  const [activeLanguage, setActiveLanguage] = useState<"python" | "cpp">("python");
  const [code, setCode] = useState("");
  const [activeFile, setActiveFile] = useState("/home/redbrick/ros2_ws/src/my_package/my_package/minimal_publisher.py");

  const [runSignal, setRunSignal] = useState<{ command: string; timestamp: number; sourceCode?: string } | undefined>(undefined);
  const [activePanel, setActivePanel] = useState<"workspace" | "robot">("workspace");
  const [externalCmdVel, setExternalCmdVel] = useState<{ linear: number; angular: number; timestamp: number } | undefined>(undefined);
  const [updateTick, setUpdateTick] = useState(0);

  // Initialize workspace directories & files
  useEffect(() => {
    fs.execute("mkdir -p /home/redbrick/ros2_ws/src/my_package/my_package");
    fs.execute("mkdir -p /home/redbrick/ros2_ws/src/my_package/src");

    // Seed preset files
    fs.writeFile(
      "/home/redbrick/ros2_ws/src/my_package/my_package/minimal_publisher.py",
      CODE_PRESETS.publisher.python
    );
    fs.writeFile(
      "/home/redbrick/ros2_ws/src/my_package/src/minimal_publisher.cpp",
      CODE_PRESETS.publisher.cpp
    );
    fs.writeFile(
      "/home/redbrick/ros2_ws/src/my_package/my_package/minimal_subscriber.py",
      CODE_PRESETS.subscriber.python
    );
    fs.writeFile(
      "/home/redbrick/ros2_ws/src/my_package/src/minimal_subscriber.cpp",
      CODE_PRESETS.subscriber.cpp
    );
    fs.writeFile(
      "/home/redbrick/ros2_ws/src/my_package/my_package/robot_controller.py",
      CODE_PRESETS.robot_controller.python
    );
    fs.writeFile(
      "/home/redbrick/ros2_ws/src/my_package/src/robot_controller.cpp",
      CODE_PRESETS.robot_controller.cpp
    );

    setUpdateTick((prev) => prev + 1);
  }, [fs]);

  // Sync active file when preset or language changes
  useEffect(() => {
    let filePath = "";
    if (activeLanguage === "python") {
      filePath = `/home/redbrick/ros2_ws/src/my_package/my_package/${activePreset}.py`;
    } else {
      filePath = `/home/redbrick/ros2_ws/src/my_package/src/${activePreset}.cpp`;
    }
    setActiveFile(filePath);

    const content = fs.readFile(filePath);
    if (content !== null) {
      setCode(content);
    } else {
      const fallback = CODE_PRESETS[activePreset][activeLanguage];
      setCode(fallback);
      fs.writeFile(filePath, fallback);
    }
  }, [activePreset, activeLanguage, fs]);

  const handleSave = () => {
    if (activeFile) {
      fs.writeFile(activeFile, code);
      setUpdateTick((prev) => prev + 1);
    }
  };

  const handleResetExample = () => {
    const defaultCode = CODE_PRESETS[activePreset][activeLanguage];
    setCode(defaultCode);
    if (activeFile) {
      fs.writeFile(activeFile, defaultCode);
      setUpdateTick((prev) => prev + 1);
    }
  };

  const handleRun = () => {
    handleSave();

    // 1. Determine simulated terminal command
    const cmd = activeFile.endsWith(".py")
      ? `python3 ${activeFile.replace("/home/redbrick/ros2_ws/", "")}`
      : `./${activeFile.replace("/home/redbrick/ros2_ws/", "").replace(".cpp", "")}`;

    // Running the controller publishes a simulated /cmd_vel command to the robot.
    if (activePreset === "robot_controller") {
      setExternalCmdVel({ linear: 0.35, angular: 0.0, timestamp: Date.now() });
    }

    // Send the program to the terminal simulator.
    setRunSignal({ command: cmd, timestamp: Date.now(), sourceCode: code });
  };

  // Get root node for tree
  // @ts-ignore - access internal node for explorer view
  const rootNode = fs.getNode ? fs.getNode("/home/redbrick") : null;

  return (
    <div className="flex flex-col gap-6">
      {/* Educational Header & Architecture Flow */}
      <div className="p-5 rounded-2xl border border-charcoal-800 bg-charcoal-950/80 backdrop-blur-md shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-charcoal-800/80 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-redbrick-500 animate-pulse" />
              <h3 className="text-lg sm:text-xl font-extrabold text-white font-heading tracking-tight">
                {locale === "th" ? "ห้องทดลอง ROS 2 แบบโต้ตอบ" : "ROS 2 Interactive Lab"}
              </h3>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-redbrick-950/80 text-redbrick-400 border border-redbrick-800/50 uppercase">
                Educational ROS 2 Simulator
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 leading-relaxed">
              {locale === "th"
                ? "ห้องทดลองนี้ใช้สำหรับเรียนรู้ว่าคำสั่งควบคุมใน ROS 2 ถูกส่งผ่าน Topic ไปยัง Mobile Robot อย่างไร ผู้เรียนสามารถควบคุมหุ่นยนต์ ดู /cmd_vel และสังเกตข้อมูล /odom และ /scan แบบเรียลไทม์"
                : "This lab is designed to help you understand how control commands in ROS 2 are routed through topics to a mobile robot. You can teleoperate the robot, inspect /cmd_vel, and monitor real-time /odom and /scan telemetry."}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {locale === "th"
                ? "ใช้สำหรับรันโค้ดตัวอย่าง Python/C++ ดูผลใน Terminal และทดลองหุ่นยนต์ที่ขับหลบสิ่งกีดขวางด้วย LiDAR"
                : "Run Python/C++ examples, inspect their terminal output, and try a LiDAR-based robot that avoids obstacles autonomously."}
            </p>
          </div>
        </div>

        {/* Real-time Message Flow Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Architecture Flow */}
          <div className="p-3.5 rounded-xl bg-charcoal-900/80 border border-charcoal-800 text-xs font-mono">
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Robot Topic Data Flow</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-gray-300">
              <span className="px-2 py-1 rounded bg-charcoal-800 text-gray-200">Teleop / Keyboard</span>
              <span className="text-redbrick-500 font-bold">→</span>
              <span className="px-2 py-1 rounded bg-redbrick-950/80 text-redbrick-400 font-bold border border-redbrick-800/50">/cmd_vel</span>
              <span className="text-redbrick-500 font-bold">→</span>
              <span className="px-2 py-1 rounded bg-charcoal-800 text-gray-200">Robot Controller</span>
              <span className="text-redbrick-500 font-bold">→</span>
              <span className="px-2 py-1 rounded bg-charcoal-800 text-gray-200">Mobile Robot</span>
              <span className="text-redbrick-500 font-bold">→</span>
              <span className="px-2 py-1 rounded bg-green-950/80 text-green-400 font-bold border border-green-800/50">/odom + /scan</span>
            </div>
          </div>

          {/* UI Interaction Flow */}
          <div className="p-3.5 rounded-xl bg-charcoal-900/80 border border-charcoal-800 text-xs font-mono">
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ArrowRight className="h-3.5 w-3.5 text-blue-400" />
              <span>UI Learning Workflow</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-gray-300">
              <span className="px-2 py-1 rounded bg-blue-950/60 text-blue-300 border border-blue-800/40">1. เขียน/รันคำสั่ง</span>
              <span className="text-gray-500 font-bold">→</span>
              <span className="px-2 py-1 rounded bg-charcoal-800 text-gray-200">2. ดู Terminal Output</span>
              <span className="text-gray-500 font-bold">→</span>
              <span className="px-2 py-1 rounded bg-green-950/60 text-green-300 border border-green-800/40">3. ดู Robot ทำงานและหลบสิ่งกีดขวาง</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 rounded-2xl border border-charcoal-800 bg-charcoal-950 p-2 shadow-lg">
        {[
          { id: "workspace" as const, icon: Code, th: "เขียนและรันโค้ด", en: "Code & Terminal" },
          { id: "robot" as const, icon: Bot, th: "หุ่นยนต์หลบสิ่งกีดขวาง", en: "Autonomous Robot" },
        ].map((panel) => {
          const Icon = panel.icon;
          const selected = activePanel === panel.id;
          return (
            <button
              key={panel.id}
              onClick={() => setActivePanel(panel.id)}
              className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-colors ${
                selected
                  ? "bg-redbrick-600 text-white shadow-md"
                  : "text-gray-400 hover:bg-charcoal-900 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{locale === "th" ? panel.th : panel.en}</span>
            </button>
          );
        })}
      </div>

      {/* Workspace: editor and terminal share the screen only on wide displays. */}
      {activePanel === "workspace" && (
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        {/* Workspace Code Editor */}
        <div className="xl:col-span-6 flex flex-col rounded-2xl overflow-hidden border border-charcoal-800 bg-charcoal-950 shadow-lg">
          {/* Editor Header */}
          <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-charcoal-900 border-b border-charcoal-800 gap-2">
            <div className="flex items-center gap-2 text-gray-200">
              <Code className="h-4 w-4 text-redbrick-400" />
              <span className="font-bold text-xs sm:text-sm font-heading">Code Editor</span>
            </div>

            {/* Example Template Selector */}
            <select
              value={activePreset}
              onChange={(e) => setActivePreset(e.target.value as "publisher" | "subscriber" | "robot_controller")}
              className="px-2.5 py-1 text-xs rounded-lg bg-charcoal-800 text-gray-200 border border-charcoal-700 outline-none focus:border-redbrick-500 font-mono"
            >
              <option value="publisher">1. Minimal Publisher (/topic)</option>
              <option value="subscriber">2. Minimal Subscriber (/topic)</option>
              <option value="robot_controller">3. Robot Controller (/cmd_vel)</option>
            </select>

            {/* Python / C++ Switcher & Actions */}
            <div className="flex items-center gap-1.5">
              <div className="flex bg-charcoal-800 p-0.5 rounded-lg border border-charcoal-700 text-xs font-mono">
                <button
                  onClick={() => setActiveLanguage("python")}
                  className={`px-2.5 py-1 rounded-md transition-colors font-bold ${
                    activeLanguage === "python"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Python
                </button>
                <button
                  onClick={() => setActiveLanguage("cpp")}
                  className={`px-2.5 py-1 rounded-md transition-colors font-bold ${
                    activeLanguage === "cpp"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  C++
                </button>
              </div>

              <button
                onClick={handleResetExample}
                title="Reset Example Code"
                className="p-1.5 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 text-gray-400 hover:text-gray-200 border border-charcoal-700 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>

              <button
                onClick={handleSave}
                title="Save File to Simulated Workspace"
                className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 text-gray-200 border border-charcoal-700 transition-colors"
              >
                <Save className="h-3.5 w-3.5 text-gray-400" />
                <span className="hidden sm:inline">Save</span>
              </button>

              <button
                onClick={handleRun}
                title="Run this program in the simulated terminal"
                className="flex items-center gap-1 text-xs px-3 py-1 rounded-lg bg-green-600 hover:bg-green-500 text-white font-bold transition-all shadow-md active:scale-95"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Run</span>
              </button>
            </div>
          </div>

          {/* Editor Body: File Explorer + Text Area */}
          <div className="flex h-[520px]">
            {/* File Tree */}
            <div className="w-44 shrink-0 bg-charcoal-900/60 border-r border-charcoal-800 overflow-y-auto py-2">
              <div className="px-3 pb-1 text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500">
                Workspace
              </div>
              {rootNode && (
                <FSNodeView
                  node={rootNode}
                  path="/home/redbrick"
                  level={0}
                  onSelect={setActiveFile}
                  selectedPath={activeFile}
                />
              )}
            </div>

            {/* Code TextArea */}
            <div className="flex flex-col flex-1 relative bg-charcoal-950">
              <div className="flex items-center justify-between bg-charcoal-900/90 text-gray-400 text-[11px] px-3 py-1.5 border-b border-charcoal-800 font-mono">
                <span className="truncate">{activeFile}</span>
                <span className="text-[10px] text-gray-500 uppercase">{activeLanguage}</span>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                className="flex-1 w-full p-4 bg-transparent text-gray-200 font-mono text-xs sm:text-sm leading-relaxed resize-none focus:outline-none focus:ring-0"
              />
            </div>
          </div>
        </div>

        {/* Terminal */}
        <div className="xl:col-span-6 flex flex-col rounded-2xl overflow-hidden bg-charcoal-950 shadow-lg">
          <TerminalSimulator
            fileSystem={fs}
            rosSimulator={ros}
            heightClass="h-[520px]"
            flush
            runTrigger={runSignal}
            onExecute={() => setUpdateTick((prev) => prev + 1)}
          />
        </div>
      </div>
      )}

      {activePanel === "robot" && (
        <div className="flex flex-col rounded-2xl overflow-hidden border border-charcoal-800 bg-charcoal-950 shadow-lg">
          <div className="flex items-center justify-between px-4 py-2.5 bg-charcoal-900 border-b border-charcoal-800 text-gray-200">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-redbrick-400" />
              <span className="font-bold text-xs sm:text-sm font-heading">Mobile Robot Simulator</span>
            </div>
            <span className="text-[10px] font-mono text-green-400 font-semibold">
              ● LiDAR Auto Avoidance Ready
            </span>
          </div>
          <div className="max-h-[75vh] overflow-auto overscroll-contain relative flex flex-col">
            <MobileRobotSimulator externalCmdVel={externalCmdVel} initialMode="avoidance" />
          </div>
        </div>
      )}
    </div>
  );
}
