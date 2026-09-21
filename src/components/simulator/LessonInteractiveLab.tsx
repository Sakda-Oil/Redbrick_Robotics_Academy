"use client";

import React, { useState, useEffect } from "react";
import { LessonContent } from "@/types/course";
import { useProgressStore } from "@/lib/store/progressStore";
import { VirtualFileSystem } from "@/lib/simulator/virtualFileSystem";
import { ROS2Simulator } from "@/lib/simulator/ros2Simulator";
import { TerminalSimulator } from "./TerminalSimulator";
import { ROSGraph } from "./ROSGraph";
import { MobileRobotSimulator } from "./MobileRobotSimulator";
import { ROS2InstallationLab } from "./ROS2InstallationLab";
import {
  Code,
  Terminal as TerminalIcon,
  Network,
  Bot,
  Play,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

// Official ROS 2 Jazzy Code Presets
const LESSON_CODE_PRESETS: Record<
  string,
  {
    title: string;
    python: string;
    cpp: string;
    graphMode: "default" | "minimal_publisher" | "minimal_subscriber" | "robot_controller";
    explanation: { th: string; en: string };
  }
> = {
  "05-nodes": {
    title: "Minimal Publisher Node",
    graphMode: "minimal_publisher",
    explanation: {
      th: "ตัวอย่างนี้แสดงโครงสร้างพื้นฐานของ Node ใน ROS 2 (Object-Oriented) โดยสืบทอดจาก rclpy.node.Node และสร้าง Timer เพื่อทำงานตามรอบเวลา",
      en: "This example demonstrates standard OOP ROS 2 Node structure inheriting from rclpy.node.Node and utilizing a periodic timer.",
    },
    python: `import rclpy
from rclpy.node import Node
from std_msgs.msg import String


class MinimalPublisher(Node):

    def __init__(self):
        super().__init__('minimal_publisher')
        self.publisher_ = self.create_publisher(String, 'topic', 10)
        self.timer = self.create_timer(0.5, self.timer_callback)
        self.i = 0

    def timer_callback(self):
        msg = String()
        msg.data = f'Hello World: {self.i}'
        self.publisher_.publish(msg)
        self.get_logger().info(f'Publishing: "{msg.data}"')
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
    publisher_ = this->create_publisher<std_msgs::msg::String>("topic", 10);
    timer_ = this->create_wall_timer(
      500ms, std::bind(&MinimalPublisher::timer_callback, this));
  }

private:
  void timer_callback()
  {
    auto message = std_msgs::msg::String();
    message.data = "Hello, world! " + std::to_string(count_++);
    RCLCPP_INFO(this->get_logger(), "Publishing: '%s'", message.data.c_str());
    publisher_->publish(message);
  }
  rclcpp::TimerBase::SharedPtr timer_;
  rclcpp::Publisher<std_msgs::msg::String>::SharedPtr publisher_;
  size_t count_;
};

int main(int argc, char * argv[])
{
  rclcpp::init(argc, argv);
  rclcpp::spin(std::make_shared<MinimalPublisher>());
  rclcpp::shutdown();
  return 0;
}`,
  },
  "06-topics": {
    title: "Publisher & Subscriber (/topic)",
    graphMode: "minimal_subscriber",
    explanation: {
      th: "เรียนรู้การสื่อสารแบบ Pub/Sub แบบอะซิงโครนัส ข้อมูลถูกส่งผ่าน Topic โดยที่ผู้ส่งและผู้รับไม่จำเป็นต้องรู้จักกัน",
      en: "Learn asynchronous Pub/Sub messaging. Data flows across topics with complete publisher and subscriber decoupling.",
    },
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
            10)
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
      "topic", 10, std::bind(&MinimalSubscriber::topic_callback, this, std::placeholders::_1));
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
  "07-services": {
    title: "Service Server & Client (AddTwoInts)",
    graphMode: "default",
    explanation: {
      th: "Service ทำงานแบบ Request-Response (ซิงโครนัส) เหมาะกับการร้องขอคำสั่งหรือการตั้งค่าฮาร์ดแวร์ เช่น รีเซ็ต Odometry",
      en: "Services provide synchronous request-response transactions, ideal for hardware calibration or state queries.",
    },
    python: `import rclpy
from rclpy.node import Node
from example_interfaces.srv import AddTwoInts


class MinimalService(Node):

    def __init__(self):
        super().__init__('minimal_service')
        self.srv = self.create_service(
            AddTwoInts, 'add_two_ints', self.add_two_ints_callback)
        self.get_logger().info('AddTwoInts Service Ready.')

    def add_two_ints_callback(self, request, response):
        response.sum = request.a + request.b
        self.get_logger().info(f'Incoming request: a={request.a}, b={request.b} -> sum={response.sum}')
        return response


def main(args=None):
    rclpy.init(args=args)
    minimal_service = MinimalService()
    rclpy.spin(minimal_service)
    rclpy.shutdown()


if __name__ == '__main__':
    main()`,
    cpp: `#include "rclcpp/rclcpp.hpp"
#include "example_interfaces/srv/add_two_ints.hpp"
#include <memory>

void add(const std::shared_ptr<example_interfaces::srv::AddTwoInts::Request> request,
          std::shared_ptr<example_interfaces::srv::AddTwoInts::Response>      response)
{
  response->sum = request->a + request->b;
  RCLCPP_INFO(rclcpp::get_logger("rclcpp"), "Incoming request\\na: %ld" " b: %ld",
                request->a, request->b);
  RCLCPP_INFO(rclcpp::get_logger("rclcpp"), "sending back response: [%ld]", (long int)response->sum);
}

int main(int argc, char **argv)
{
  rclcpp::init(argc, argv);
  std::shared_ptr<rclcpp::Node> node = rclcpp::Node::make_shared("add_two_ints_server");
  rclcpp::Service<example_interfaces::srv::AddTwoInts>::SharedPtr service =
    node->create_service<example_interfaces::srv::AddTwoInts>("add_two_ints", &add);
  RCLCPP_INFO(rclcpp::get_logger("rclcpp"), "Ready to add two ints.");
  rclcpp::spin(node);
  rclcpp::shutdown();
}`,
  },
  "08-actions": {
    title: "Action Server (Fibonacci / Nav2 Goal)",
    graphMode: "default",
    explanation: {
      th: "Action สำหรับงานระยะยาวที่ต้องรายงานสถานะ Feedback เป็นระยะและสามารถยกเลิก (Cancel/Preempt) ได้ระหว่างทำงาน",
      en: "Actions manage long-running preemptible goals with periodic feedback, essential for Nav2 waypoint navigation.",
    },
    python: `import time
import rclpy
from rclpy.action import ActionServer
from rclpy.node import Node
from example_interfaces.action import Fibonacci


class FibonacciActionServer(Node):

    def __init__(self):
        super().__init__('fibonacci_action_server')
        self._action_server = ActionServer(
            self,
            Fibonacci,
            'fibonacci',
            self.execute_callback)
        self.get_logger().info('Fibonacci Action Server initialized.')

    def execute_callback(self, goal_handle):
        self.get_logger().info('Executing goal...')
        feedback_msg = Fibonacci.Feedback()
        feedback_msg.sequence = [0, 1]

        for i in range(1, goal_handle.request.order):
            feedback_msg.sequence.append(
                feedback_msg.sequence[i] + feedback_msg.sequence[i-1])
            self.get_logger().info(f'Feedback: {feedback_msg.sequence}')
            goal_handle.publish_feedback(feedback_msg)
            time.sleep(1)

        goal_handle.succeed()
        result = Fibonacci.Result()
        result.sequence = feedback_msg.sequence
        return result


def main(args=None):
    rclpy.init(args=args)
    server = FibonacciActionServer()
    rclpy.spin(server)
    rclpy.shutdown()


if __name__ == '__main__':
    main()`,
    cpp: `#include <memory>
#include "rclcpp/rclcpp.hpp"
#include "rclcpp_action/rclcpp_action.hpp"
#include "example_interfaces/action/fibonacci.hpp"

// Action Server Implementation in C++ (ROS 2 Jazzy)
class FibonacciActionServer : public rclcpp::Node
{
public:
  using Fibonacci = example_interfaces::action::Fibonacci;
  explicit FibonacciActionServer(const rclcpp::NodeOptions & options = rclcpp::NodeOptions())
  : Node("fibonacci_action_server", options)
  {
    RCLCPP_INFO(this->get_logger(), "Action server online.");
  }
};`,
  },
  "09-parameters": {
    title: "Parameters & Dynamic Tuning",
    graphMode: "default",
    explanation: {
      th: "Parameters ใช้สำหรับตั้งค่าตัวแปร เช่น ความเร็วสูงสุด ลิมิตของเซนเซอร์ โดยไม่ต้องคอมไพล์โค้ดใหม่",
      en: "Parameters allow real-time tuning of robot speed limits and sensor thresholds without recompilation.",
    },
    python: `import rclpy
from rclpy.node import Node


class ParameterNode(Node):

    def __init__(self):
        super().__init__('parameter_node')
        # Declare parameter with default value
        self.declare_parameter('max_speed', 0.5)
        self.timer = self.create_timer(1.0, self.timer_callback)

    def timer_callback(self):
        current_speed = self.get_parameter('max_speed').get_parameter_value().double_value
        self.get_logger().info(f'Current robot max_speed parameter: {current_speed} m/s')


def main(args=None):
    rclpy.init(args=args)
    node = ParameterNode()
    rclpy.spin(node)
    rclpy.shutdown()


if __name__ == '__main__':
    main()`,
    cpp: `#include <chrono>
#include <memory>
#include <string>
#include "rclcpp/rclcpp.hpp"

using namespace std::chrono_literals;

class MinimalParam : public rclcpp::Node
{
public:
  MinimalParam()
  : Node("minimal_param_node")
  {
    this->declare_parameter("max_speed", 0.5);
    timer_ = this->create_wall_timer(
      1000ms, std::bind(&MinimalParam::respond, this));
  }

  void respond()
  {
    double max_speed = this->get_parameter("max_speed").as_double();
    RCLCPP_INFO(this->get_logger(), "Current max_speed: %f", max_speed);
  }

private:
  rclcpp::TimerBase::SharedPtr timer_;
};

int main(int argc, char ** argv)
{
  rclcpp::init(argc, argv);
  rclcpp::spin(std::make_shared<MinimalParam>());
  rclcpp::shutdown();
  return 0;
}`,
  },
};

interface LessonInteractiveLabProps {
  lesson: LessonContent;
  externalRunTrigger?: { command: string; timestamp: number };
}

type LessonLabType =
  | "theory" // ros2-01: No heavy simulator, just explanation / quick CLI
  | "installation" // ros2-02: Step-by-step installation lab
  | "cli" // ros2-03: Terminal only + optional Graph tab
  | "workspace" // ros2-04: Terminal only with workspace context
  | "coding" // ros2-05 .. 09: Code Editor + Terminal + optional Graph tab
  | "launch" // ros2-10: Terminal + optional Graph tab
  | "robot"; // ros2-11: Mobile Robot Simulator + Teleop

export function LessonInteractiveLab({ lesson, externalRunTrigger }: LessonInteractiveLabProps) {
  const { locale } = useProgressStore();
  const [fs] = useState(() => new VirtualFileSystem());
  const [ros] = useState(() => new ROS2Simulator());

  // Determine lab type based on lesson slug or id
  const labType: LessonLabType = (() => {
    if (lesson.id === "ros2-01" || lesson.slug === "01-introduction") return "theory";
    if (lesson.id === "ros2-02" || lesson.slug === "02-installation") return "installation";
    if (lesson.id === "ros2-03" || lesson.slug === "03-cli") return "cli";
    if (lesson.id === "ros2-04" || lesson.slug === "04-workspace") return "workspace";
    if (lesson.id === "ros2-10" || lesson.slug === "10-launch") return "launch";
    if (
      lesson.id === "ros2-11" ||
      lesson.slug === "11-gazebo-harmonic" ||
      lesson.slug?.includes("gazebo") ||
      lesson.slug?.includes("teleop")
    ) {
      return "robot";
    }
    return "coding";
  })();

  // Tab control: Only ONE panel is shown at a time!
  // coding: "practice" (Editor + Terminal) | "graph"
  // cli: "terminal" | "graph"
  // launch: "terminal" | "graph"
  // robot: "robot" | "graph"
  const [activeTab, setActiveTab] = useState<"practice" | "terminal" | "graph" | "robot">(() => {
    if (labType === "robot") return "robot";
    if (labType === "cli" || labType === "workspace" || labType === "launch") return "terminal";
    return "practice";
  });

  // Code editor states
  const presetKey = LESSON_CODE_PRESETS[lesson.slug] ? lesson.slug : "05-nodes";
  const preset = LESSON_CODE_PRESETS[presetKey];
  const [activeLanguage, setActiveLanguage] = useState<"python" | "cpp">("python");
  const [code, setCode] = useState<string>(preset[activeLanguage]);
  const [runSignal, setRunSignal] = useState<{ command: string; timestamp: number; sourceCode?: string } | undefined>();
  const [graphMode, setGraphMode] = useState<"default" | "minimal_publisher" | "minimal_subscriber" | "robot_controller">(
    preset.graphMode
  );

  useEffect(() => {
    if (!externalRunTrigger) return;
    setRunSignal(externalRunTrigger);
    setActiveTab(labType === "coding" ? "practice" : "terminal");
  }, [externalRunTrigger, labType]);

  // Sync code when language or lesson changes
  useEffect(() => {
    if (preset) {
      setCode(preset[activeLanguage]);
      setGraphMode(preset.graphMode);
    }
  }, [lesson.slug, activeLanguage, preset]);

  // Handle Run from Code Editor
  const handleRunCode = () => {
    const cmd =
      activeLanguage === "python"
        ? `python3 ~/ros2_ws/src/my_package/${lesson.slug.replace("-", "_")}.py`
        : `./${lesson.slug.replace("-", "_")}`;

    setRunSignal({ command: cmd, timestamp: Date.now(), sourceCode: code });
  };

  const handleResetCode = () => {
    if (preset) {
      setCode(preset[activeLanguage]);
    }
  };

  // Case 1: Theory lesson (01-introduction)
  if (labType === "theory") {
    return (
      <div className="p-6 rounded-2xl border border-charcoal-800 bg-charcoal-950 text-gray-300 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 text-redbrick-400 font-heading font-bold text-base">
          <Sparkles className="h-5 w-5" />
          <span>{locale === "th" ? "บทเรียนภาคทฤษฎี & สถาปัตยกรรม" : "Theory & Architecture Lab"}</span>
        </div>
        <p className="text-sm text-gray-400 leading-relaxed">
          {locale === "th"
            ? "บทเรียนนี้เน้นทำความเข้าใจสถาปัตยกรรม DDS และการแยกเครือข่ายด้วย ROS_DOMAIN_ID ในบทเรียนถัดไป คุณจะได้เริ่มติดตั้งและทดลองรันคำสั่งจริงใน Terminal"
            : "This module focuses on DDS architecture and ROS_DOMAIN_ID subnet isolation. You will begin practical terminal commands in the upcoming lesson."}
        </p>
        <div className="pt-2 flex items-center justify-between">
          <Link
            href="/courses/ros2-jazzy/02-installation"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-redbrick-600 hover:bg-redbrick-500 text-white font-bold text-xs transition-colors shadow-sm"
          >
            <span>{locale === "th" ? "ไปยังบทเรียนการติดตั้ง (Installation Lab)" : "Go to Installation Lab"}</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
          <Link
            href="/playground/ros2"
            className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors font-mono"
          >
            <span>ROS 2 Developer Playground</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  // Case 2: Installation lesson (02-installation)
  if (labType === "installation") {
    return (
      <div className="space-y-4">
        <div className="p-4 rounded-xl border border-charcoal-800 bg-charcoal-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-gray-300">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-bold text-white font-heading">
              {locale === "th" ? "ห้องทดลองติดตั้ง ROS 2 Jazzy บน Ubuntu 24.04" : "ROS 2 Jazzy Installation Lab (Ubuntu 24.04)"}
            </span>
          </div>
          <Link
            href="/playground/ros2"
            className="text-gray-400 hover:text-white flex items-center gap-1 font-mono transition-colors"
          >
            <span>Full Developer Playground</span>
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
        <ROS2InstallationLab />
      </div>
    );
  }

  // Case 3: Robot Simulation lesson (11-gazebo-harmonic)
  if (labType === "robot") {
    return (
      <div className="space-y-4">
        {/* Context & Tab Bar */}
        <div className="p-5 rounded-2xl border border-charcoal-800 bg-charcoal-950 shadow-xl space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-charcoal-800/80 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-redbrick-500 animate-pulse" />
                <h3 className="text-base sm:text-lg font-extrabold text-white font-heading tracking-tight">
                  {locale === "th" ? "ห้องทดลอง Mobile Robot Simulation (Gazebo)" : "Mobile Robot Simulation Lab"}
                </h3>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {locale === "th"
                  ? "ทดลองควบคุมหุ่นยนต์จำลองผ่าน Topic /cmd_vel พร้อมดูข้อมูล /odom และ /scan แบบเรียลไทม์"
                  : "Practice controlling the simulated robot via /cmd_vel while observing live /odom and /scan data."}
              </p>
            </div>

            {/* Tab Buttons: Robot Simulator vs ROS Graph */}
            <div className="flex items-center bg-charcoal-900 p-1 rounded-xl border border-charcoal-800">
              <button
                onClick={() => setActiveTab("robot")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === "robot"
                    ? "bg-redbrick-600 text-white shadow-sm"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Bot className="h-3.5 w-3.5" />
                <span>{locale === "th" ? "หุ่นยนต์จำลอง (Robot)" : "Robot Simulator"}</span>
              </button>
              <button
                onClick={() => setActiveTab("graph")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === "graph"
                    ? "bg-cyan-600 text-white shadow-sm"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Network className="h-3.5 w-3.5" />
                <span>{locale === "th" ? "ดูผังการเชื่อมต่อ (Graph)" : "Computational Graph"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab 1: Robot Simulator */}
        {activeTab === "robot" && (
          <div className="rounded-2xl overflow-hidden border border-charcoal-800 bg-charcoal-950 shadow-xl">
            <MobileRobotSimulator viewMode="student" />
          </div>
        )}

        {/* Tab 2: ROS Graph */}
        {activeTab === "graph" && (
          <div className="rounded-2xl overflow-hidden border border-charcoal-800 bg-charcoal-950 shadow-xl">
            <div className="p-3 bg-charcoal-900 border-b border-charcoal-800 flex items-center justify-between text-xs text-gray-300">
              <span className="font-bold flex items-center gap-1.5">
                <Network className="h-4 w-4 text-cyan-400" />
                <span>Topic Data Flow: /cmd_vel → /base_motors → /odom & /scan</span>
              </span>
              <button
                onClick={() => setActiveTab("robot")}
                className="text-xs text-redbrick-400 hover:text-redbrick-300 font-bold"
              >
                {locale === "th" ? "← กลับไปที่หุ่นยนต์" : "← Back to Robot"}
              </button>
            </div>
            <div className="max-h-[75vh] overflow-auto overscroll-contain">
              <ROSGraph graphMode="robot_controller" />
            </div>
          </div>
        )}
      </div>
    );
  }

  // Case 4: CLI & Workspace & Launch Lessons (Terminal-centric)
  if (labType === "cli" || labType === "workspace" || labType === "launch") {
    const quickCmds =
      labType === "cli"
        ? [
            "ros2 node list",
            "ros2 node info /lidar_node",
            "ros2 topic list -t",
            "ros2 topic echo /scan",
            "ros2 topic hz /scan",
            "ros2 service list",
            "ros2 doctor",
          ]
        : labType === "workspace"
        ? [
            "pwd",
            "ls -la",
            "cd ~/ros2_ws",
            "colcon build --symlink-install",
            "source install/setup.bash",
          ]
        : [
            "ros2 launch ros_gz_sim gz_sim.launch.py",
            "ros2 node list",
            "ros2 topic list",
          ];

    return (
      <div className="space-y-4">
        {/* Header with Navigation Tabs */}
        <div className="p-4 sm:p-5 rounded-2xl border border-charcoal-800 bg-charcoal-950 shadow-xl space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <h3 className="text-base sm:text-lg font-extrabold text-white font-heading tracking-tight">
                  {labType === "cli"
                    ? locale === "th"
                      ? "การทดลองคำสั่ง ROS 2 CLI"
                      : "ROS 2 CLI Introspection Lab"
                    : labType === "workspace"
                    ? locale === "th"
                      ? "การจัดการ Workspace & colcon build"
                      : "Workspace & colcon Build Lab"
                    : locale === "th"
                    ? "การรัน Multi-Node ด้วย Launch File"
                    : "ROS 2 Launch System Lab"}
                </h3>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {labType === "cli"
                  ? locale === "th"
                    ? "ทดลองรันคำสั่ง ros2 CLI เพื่อตรวจสอบ Node, Topic และความถี่ของเซนเซอร์"
                    : "Execute ros2 CLI commands to inspect active nodes, topics, and message frequencies."
                  : labType === "workspace"
                  ? locale === "th"
                    ? "ฝึกสร้างและคอมไพล์แพ็กเกจด้วย colcon build ภายใน ~/ros2_ws"
                    : "Build ROS 2 packages using colcon build inside your simulated ~/ros2_ws."
                  : locale === "th"
                  ? "สั่งรันหลาย Node พร้อมกันและตรวจสอบ Graph ที่เกิดขึ้น"
                  : "Launch multi-node pipelines and verify the resulting graph topology."}
              </p>
            </div>

            {/* Tab Buttons */}
            <div className="flex items-center bg-charcoal-900 p-1 rounded-xl border border-charcoal-800">
              <button
                onClick={() => setActiveTab("terminal")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === "terminal"
                    ? "bg-green-600 text-white shadow-sm"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <TerminalIcon className="h-3.5 w-3.5" />
                <span>{locale === "th" ? "Terminal จำลอง" : "Terminal"}</span>
              </button>
              <button
                onClick={() => setActiveTab("graph")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === "graph"
                    ? "bg-cyan-600 text-white shadow-sm"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Network className="h-3.5 w-3.5" />
                <span>{locale === "th" ? "ดูผัง Graph" : "Computational Graph"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab 1: Terminal */}
        {activeTab === "terminal" && (
          <div className="rounded-2xl overflow-hidden border border-charcoal-800 bg-charcoal-950 shadow-xl">
            <TerminalSimulator
              fileSystem={fs}
              rosSimulator={ros}
              runTrigger={runSignal}
              quickCommands={quickCmds}
              title={`ROS 2 Jazzy CLI Simulator — ${lesson.title}`}
              heightClass="h-[420px]"
            />
          </div>
        )}

        {/* Tab 2: Graph */}
        {activeTab === "graph" && (
          <div className="rounded-2xl overflow-hidden border border-charcoal-800 bg-charcoal-950 shadow-xl">
            <div className="p-3 bg-charcoal-900 border-b border-charcoal-800 flex items-center justify-between text-xs text-gray-300">
              <span className="font-bold flex items-center gap-1.5">
                <Network className="h-4 w-4 text-cyan-400" />
                <span>Computational Graph (Active Nodes & Topics)</span>
              </span>
              <button
                onClick={() => setActiveTab("terminal")}
                className="text-xs text-green-400 hover:text-green-300 font-bold"
              >
                {locale === "th" ? "← กลับไปที่ Terminal" : "← Back to Terminal"}
              </button>
            </div>
            <div className="max-h-[75vh] overflow-auto overscroll-contain">
              <ROSGraph graphMode="default" />
            </div>
          </div>
        )}
      </div>
    );
  }

  // Case 5: Coding Lessons (05-nodes, 06-topics, 07-services, 08-actions, 09-parameters)
  return (
    <div className="space-y-4">
      {/* Educational Header & Tab Bar */}
      <div className="p-4 sm:p-5 rounded-2xl border border-charcoal-800 bg-charcoal-950 shadow-xl space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              <h3 className="text-base sm:text-lg font-extrabold text-white font-heading tracking-tight">
                {locale === "th"
                  ? `พื้นที่ฝึกเขียนโค้ด: ${preset.title}`
                  : `Coding Practice: ${preset.title}`}
              </h3>
            </div>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed max-w-2xl">
              {preset.explanation[locale]}
            </p>
          </div>

          {/* Tab Selector: Practice vs Graph */}
          <div className="flex items-center bg-charcoal-900 p-1 rounded-xl border border-charcoal-800 shrink-0">
            <button
              onClick={() => setActiveTab("practice")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "practice"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Code className="h-3.5 w-3.5" />
              <span>{locale === "th" ? "เขียนโค้ด & รัน (Code & Run)" : "Code & Run"}</span>
            </button>
            <button
              onClick={() => setActiveTab("graph")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "graph"
                  ? "bg-cyan-600 text-white shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Network className="h-3.5 w-3.5" />
              <span>{locale === "th" ? "ดูผัง Graph" : "Computational Graph"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: Coding Practice (Code Editor + Terminal) */}
      {activeTab === "practice" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          {/* Code Editor (7 cols) */}
          <div className="lg:col-span-7 flex flex-col rounded-2xl overflow-hidden border border-charcoal-800 bg-charcoal-950 shadow-lg">
            {/* Editor Toolbar */}
            <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-charcoal-900 border-b border-charcoal-800 gap-2">
              <div className="flex items-center gap-2 text-gray-200">
                <Code className="h-4 w-4 text-blue-400" />
                <span className="font-bold text-xs sm:text-sm font-heading">
                  {activeLanguage === "python" ? "Python (rclpy)" : "C++ (rclcpp)"}
                </span>
              </div>

              {/* Language Selector + Run Controls */}
              <div className="flex items-center gap-2">
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
                  onClick={handleResetCode}
                  title="Reset Example"
                  className="p-1.5 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 text-gray-400 hover:text-gray-200 border border-charcoal-700 transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>

                <button
                  onClick={handleRunCode}
                  className="flex items-center gap-1.5 text-xs px-3.5 py-1 rounded-lg bg-green-600 hover:bg-green-500 text-white font-bold transition-all shadow-md active:scale-95"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>{locale === "th" ? "รันโค้ด" : "Run Code"}</span>
                </button>
              </div>
            </div>

            {/* Code TextArea */}
            <div className="flex flex-col flex-1 relative bg-charcoal-950">
              <div className="flex items-center justify-between bg-charcoal-900/90 text-gray-400 text-[11px] px-3 py-1.5 border-b border-charcoal-800 font-mono">
                <span>
                  ~/ros2_ws/src/my_package/{lesson.slug.replace("-", "_")}.
                  {activeLanguage === "python" ? "py" : "cpp"}
                </span>
                <span className="text-[10px] text-gray-500 uppercase">{activeLanguage}</span>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                className="w-full h-[360px] p-4 bg-transparent text-gray-200 font-mono text-xs sm:text-sm leading-relaxed resize-none focus:outline-none focus:ring-0 overflow-y-auto"
              />
            </div>
          </div>

          {/* Terminal Simulator (5 cols) */}
          <div className="lg:col-span-5 flex flex-col rounded-2xl overflow-hidden border border-charcoal-800 bg-charcoal-950 shadow-lg">
            <div className="flex items-center justify-between px-4 py-2.5 bg-charcoal-900 border-b border-charcoal-800">
              <div className="flex items-center gap-2 text-gray-200">
                <TerminalIcon className="h-4 w-4 text-green-400" />
                <span className="font-bold text-xs sm:text-sm font-heading">Output Terminal</span>
              </div>
              <button
                onClick={() => setActiveTab("graph")}
                className="text-[11px] text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 transition-colors"
              >
                <span>{locale === "th" ? "ดู Graph ผลลัพธ์" : "Inspect Graph"}</span>
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
            <TerminalSimulator
              fileSystem={fs}
              rosSimulator={ros}
              heightClass="h-[390px]"
              runTrigger={runSignal}
              quickCommands={[
                "ros2 node list",
                "ros2 topic list -t",
                "ros2 topic echo /topic",
                "ros2 doctor",
              ]}
            />
          </div>
        </div>
      )}

      {/* Tab 2: ROS Graph (Single panel) */}
      {activeTab === "graph" && (
        <div className="rounded-2xl overflow-hidden border border-charcoal-800 bg-charcoal-950 shadow-xl">
          <div className="p-3 bg-charcoal-900 border-b border-charcoal-800 flex items-center justify-between text-xs text-gray-300">
            <span className="font-bold flex items-center gap-1.5">
              <Network className="h-4 w-4 text-cyan-400" />
              <span>Computational Graph (Mode: {graphMode})</span>
            </span>
            <button
              onClick={() => setActiveTab("practice")}
              className="text-xs text-blue-400 hover:text-blue-300 font-bold"
            >
              {locale === "th" ? "← กลับไปที่ Code & Terminal" : "← Back to Code & Terminal"}
            </button>
          </div>
          <div className="max-h-[75vh] overflow-auto overscroll-contain">
            <ROSGraph graphMode={graphMode} />
          </div>
        </div>
      )}
    </div>
  );
}
