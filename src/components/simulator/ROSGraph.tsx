"use client";

import React, { useState, useRef } from "react";
import {
  Cpu,
  Radio,
  Activity,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Info,
  CheckCircle2,
  Layers,
  Sparkles,
} from "lucide-react";

export interface NodeData {
  id: string;
  name: string;
  type: string;
  pkg: string;
  publishers: string[];
  subscribers: string[];
  x: number;
  y: number;
  purpose: string;
}

export interface TopicData {
  id: string;
  name: string;
  type: string;
  publisher: string;
  subscriber: string;
  rate: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  labelX: number;
  labelY: number;
  description: string;
  sampleMessage: string;
}

const NODES: NodeData[] = [
  {
    id: "camera_node",
    name: "/camera_node",
    type: "Sensor Driver Node",
    pkg: "v4l2_camera",
    publishers: ["/camera/image_raw"],
    subscribers: [],
    x: 40,
    y: 40,
    purpose: "Streams 30 FPS raw RGB frames from robot front camera (/dev/video0) using standard v4l2 Linux driver.",
  },
  {
    id: "lidar_node",
    name: "/lidar_node",
    type: "Sensor Driver Node",
    pkg: "rplidar_ros",
    publishers: ["/scan"],
    subscribers: [],
    x: 40,
    y: 200,
    purpose: "Streams 360-degree planar distance range scans from laser rangefinder (/dev/ttyUSB0) for SLAM and collision avoidance.",
  },
  {
    id: "vision_node",
    name: "/vision_node",
    type: "Processing Node",
    pkg: "redbrick_vision",
    publishers: ["/target_pose"],
    subscribers: ["/camera/image_raw"],
    x: 310,
    y: 40,
    purpose: "Processes camera frames with OpenCV to detect docking targets or obstacles and computes relative 3D pose coordinates.",
  },
  {
    id: "robot_controller",
    name: "/robot_controller",
    type: "Control Node",
    pkg: "my_robot_controller",
    publishers: ["/cmd_vel"],
    subscribers: ["/scan", "/target_pose"],
    x: 310,
    y: 200,
    purpose: "Fuses LiDAR obstacle vectors and target coordinates to compute differential drive velocity steering (/cmd_vel).",
  },
  {
    id: "base_motors",
    name: "/base_motors",
    type: "Actuator & Odom Node",
    pkg: "micro_ros_esp32",
    publishers: ["/odom"],
    subscribers: ["/cmd_vel"],
    x: 580,
    y: 200,
    purpose: "ESP32 micro-ROS microcontroller agent that receives Twist velocity commands and drives left/right DC motors while streaming odometry.",
  },
];

const TOPICS: TopicData[] = [
  {
    id: "camera_raw",
    name: "/camera/image_raw",
    type: "sensor_msgs/msg/Image",
    publisher: "/camera_node",
    subscriber: "/vision_node",
    rate: "30.0 Hz",
    x1: 170,
    y1: 70,
    x2: 310,
    y2: 70,
    labelX: 240,
    labelY: 58,
    description: "Raw uncompressed RGB image stream (640x480) for real-time vision pipelines.",
    sampleMessage: `header:\n  stamp:\n    sec: 1726500000\n    nanosec: 120000000\n  frame_id: "camera_optical_link"\nheight: 480\nwidth: 640\nencoding: "rgb8"\nis_bigendian: 0\nstep: 1920\ndata: [134, 142, 120, 118, ... 921600 bytes]`,
  },
  {
    id: "scan",
    name: "/scan",
    type: "sensor_msgs/msg/LaserScan",
    publisher: "/lidar_node",
    subscriber: "/robot_controller",
    rate: "10.0 Hz",
    x1: 170,
    y1: 230,
    x2: 310,
    y2: 230,
    labelX: 240,
    labelY: 218,
    description: "Planar 2D laser rangefinder scan array (360 points) for obstacle mapping and navigation.",
    sampleMessage: `header:\n  stamp:\n    sec: 1726500000\n    nanosec: 240000000\n  frame_id: "laser_frame"\nangle_min: -3.1415926\nangle_max: 3.1415926\nangle_increment: 0.0174533\nrange_min: 0.15\nrange_max: 12.0\nranges: [1.42, 1.38, 1.35, 1.31, ... 360 values]`,
  },
  {
    id: "target_pose",
    name: "/target_pose",
    type: "geometry_msgs/msg/PoseStamped",
    publisher: "/vision_node",
    subscriber: "/robot_controller",
    rate: "15.0 Hz",
    x1: 375,
    y1: 100,
    x2: 375,
    y2: 200,
    labelX: 375,
    labelY: 150,
    description: "Estimated target position and quaternion orientation in camera coordinate frame.",
    sampleMessage: `header:\n  stamp:\n    sec: 1726500000\n    nanosec: 350000000\n  frame_id: "camera_optical_link"\npose:\n  position: {x: 1.25, y: -0.15, z: 0.0}\n  orientation: {x: 0.0, y: 0.0, z: 0.05, w: 0.998}`,
  },
  {
    id: "cmd_vel",
    name: "/cmd_vel",
    type: "geometry_msgs/msg/Twist",
    publisher: "/robot_controller",
    subscriber: "/base_motors",
    rate: "20.0 Hz",
    x1: 440,
    y1: 230,
    x2: 580,
    y2: 230,
    labelX: 510,
    labelY: 218,
    description: "Mobile robot linear velocity (m/s) and angular steering rate (rad/s).",
    sampleMessage: `linear:\n  x: 0.5\n  y: 0.0\n  z: 0.0\nangular:\n  x: 0.0\n  y: 0.0\n  z: 0.2`,
  },
  {
    id: "odom",
    name: "/odom",
    type: "nav_msgs/msg/Odometry",
    publisher: "/base_motors",
    subscriber: "/robot_controller",
    rate: "30.0 Hz",
    x1: 645,
    y1: 260,
    x2: 440,
    y2: 260,
    labelX: 540,
    labelY: 285,
    description: "Dead-reckoning position and orientation feedback calculated from wheel encoders.",
    sampleMessage: `header:\n  frame_id: "odom"\nchild_frame_id: "base_footprint"\npose:\n  pose:\n    position: {x: 1.24, y: 0.38, z: 0.0}\n    orientation: {x: 0.0, y: 0.0, z: 0.25, w: 0.96}\ntwist:\n  twist:\n    linear: {x: 0.5, y: 0.0, z: 0.0}\n    angular: {x: 0.0, y: 0.0, z: 0.2}`,
  },
];

const PUBLISHER_NODES: NodeData[] = [
  {
    id: "minimal_publisher",
    name: "/minimal_publisher",
    type: "Publisher Node",
    pkg: "my_package",
    publishers: ["/topic"],
    subscribers: [],
    x: 140,
    y: 130,
    purpose: "Publishes string messages to /topic at 2 Hz.",
  },
];

const PUBLISHER_TOPICS: TopicData[] = [
  {
    id: "topic",
    name: "/topic",
    type: "std_msgs/msg/String",
    publisher: "/minimal_publisher",
    subscriber: "(None)",
    rate: "2.0 Hz",
    x1: 270,
    y1: 160,
    x2: 460,
    y2: 160,
    labelX: 365,
    labelY: 148,
    description: "Standard string topic carrying Hello World messages.",
    sampleMessage: `data: "Hello World: 42"`,
  },
];

const SUBSCRIBER_NODES: NodeData[] = [
  {
    id: "minimal_publisher",
    name: "/minimal_publisher",
    type: "Publisher Node",
    pkg: "my_package",
    publishers: ["/topic"],
    subscribers: [],
    x: 80,
    y: 130,
    purpose: "Publishes string messages to /topic at 2 Hz.",
  },
  {
    id: "minimal_subscriber",
    name: "/minimal_subscriber",
    type: "Subscriber Node",
    pkg: "my_package",
    publishers: [],
    subscribers: ["/topic"],
    x: 480,
    y: 130,
    purpose: "Subscribes to /topic and logs incoming messages.",
  },
];

const SUBSCRIBER_TOPICS: TopicData[] = [
  {
    id: "topic",
    name: "/topic",
    type: "std_msgs/msg/String",
    publisher: "/minimal_publisher",
    subscriber: "/minimal_subscriber",
    rate: "2.0 Hz",
    x1: 210,
    y1: 160,
    x2: 480,
    y2: 160,
    labelX: 345,
    labelY: 148,
    description: "Pub/Sub communication bus transferring string messages.",
    sampleMessage: `data: "Hello World: 108"`,
  },
];

const CONTROLLER_NODES: NodeData[] = [
  {
    id: "robot_controller",
    name: "/robot_controller",
    type: "Control Node",
    pkg: "my_robot_controller",
    publishers: ["/cmd_vel"],
    subscribers: [],
    x: 80,
    y: 130,
    purpose: "Generates velocity commands (/cmd_vel) for mobile base.",
  },
  {
    id: "base_motors",
    name: "/base_motors",
    type: "Actuator Node",
    pkg: "micro_ros_esp32",
    publishers: ["/odom"],
    subscribers: ["/cmd_vel"],
    x: 480,
    y: 130,
    purpose: "Receives Twist commands and drives differential motors.",
  },
];

const CONTROLLER_TOPICS: TopicData[] = [
  {
    id: "cmd_vel",
    name: "/cmd_vel",
    type: "geometry_msgs/msg/Twist",
    publisher: "/robot_controller",
    subscriber: "/base_motors",
    rate: "10.0 Hz",
    x1: 210,
    y1: 160,
    x2: 480,
    y2: 160,
    labelX: 345,
    labelY: 148,
    description: "Velocity control vector (linear.x, angular.z).",
    sampleMessage: `linear:\n  x: 0.2\n  y: 0.0\n  z: 0.0\nangular:\n  x: 0.0\n  y: 0.0\n  z: 0.0`,
  },
];

export interface ROSGraphProps {
  activeTopicId?: string;
  graphMode?: "default" | "minimal_publisher" | "minimal_subscriber" | "robot_controller";
}

export function ROSGraph({ activeTopicId = "cmd_vel", graphMode = "default" }: ROSGraphProps) {
  const activeNodes =
    graphMode === "minimal_publisher"
      ? PUBLISHER_NODES
      : graphMode === "minimal_subscriber"
      ? SUBSCRIBER_NODES
      : graphMode === "robot_controller"
      ? CONTROLLER_NODES
      : NODES;

  const activeTopics =
    graphMode === "minimal_publisher"
      ? PUBLISHER_TOPICS
      : graphMode === "minimal_subscriber"
      ? SUBSCRIBER_TOPICS
      : graphMode === "robot_controller"
      ? CONTROLLER_TOPICS
      : TOPICS;

  const [selectedEntity, setSelectedEntity] = useState<
    { type: "node"; data: NodeData } | { type: "topic"; data: TopicData }
  >(() => ({ type: "topic", data: activeTopics[0] || TOPICS[3] }));

  // Keep entity updated when graphMode changes
  React.useEffect(() => {
    setSelectedEntity({ type: "topic", data: activeTopics[0] || TOPICS[3] });
  }, [graphMode, activeTopics]);

  const [zoom, setZoom] = useState<number>(1.0);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.15, 1.6));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.15, 0.7));
  const handleResetView = () => {
    setZoom(1.0);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div className="w-full my-8 rounded-2xl border border-charcoal-700 bg-charcoal-950 text-white overflow-hidden shadow-2xl font-sans">
      {/* Objective & Pedagogical Context Banner */}
      <div className="p-4 sm:p-5 bg-charcoal-900 border-b border-charcoal-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2 rounded-xl bg-redbrick-600 text-white shrink-0 mt-0.5 sm:mt-0">
            <Radio className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm sm:text-base font-bold text-white font-heading tracking-tight">
                ROS 2 Computational Graph Simulator
              </h3>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-charcoal-800 text-amber-400 border border-amber-500/20">
                Inspired by ROS 2 Graph / rqt_graph
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              จุดประสงค์: ศึกษาการเดินทางของข้อมูลเซนเซอร์ (Camera & LiDAR) ผ่าน ROS 2 Graph ไปยัง Controller เพื่อควบคุมหุ่นยนต์เคลื่อนที่
            </p>
          </div>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-1.5 self-end sm:self-center bg-charcoal-950 p-1 rounded-xl border border-charcoal-800">
          <button
            onClick={handleZoomIn}
            className="p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-charcoal-800 transition-colors"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-charcoal-800 transition-colors"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <button
            onClick={handleResetView}
            className="p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-charcoal-800 transition-colors flex items-center gap-1 text-xs px-2"
            title="Reset View"
            aria-label="Reset View"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative p-4 sm:p-6 overflow-auto bg-gradient-to-b from-charcoal-950 to-charcoal-900/80 min-h-[340px] flex items-start justify-start sm:justify-center">
        <svg
          viewBox="0 0 740 320"
          className="w-full min-w-[700px] h-auto select-none transition-transform duration-200"
          style={{ transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)` }}
        >
          <defs>
            {/* Arrow Marker standard */}
            <marker
              id="graph-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#B5230E" />
            </marker>

            {/* Active Highlight Arrow */}
            <marker
              id="graph-arrow-active"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#22C55E" />
            </marker>
          </defs>

          {/* Grid lines background */}
          <g opacity="0.15">
            {Array.from({ length: 15 }).map((_, i) => (
              <line key={`gx-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="320" stroke="#4B5563" strokeDasharray="3,3" />
            ))}
            {Array.from({ length: 7 }).map((_, i) => (
              <line key={`gy-${i}`} x1="0" y1={i * 50} x2="740" y2={i * 50} stroke="#4B5563" strokeDasharray="3,3" />
            ))}
          </g>

          {/* Connection Lines (Topics) */}
          {activeTopics.map((topic) => {
            const isSelected = selectedEntity?.data.id === topic.id;
            const isActive = activeTopicId === topic.id || (activeTopicId === "cmd_vel" && topic.id === "cmd_vel");

            return (
              <g
                key={topic.id}
                role="button"
                tabIndex={0}
                aria-label={`ROS 2 Topic: ${topic.name}`}
                onClick={() => setSelectedEntity({ type: "topic", data: topic })}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedEntity({ type: "topic", data: topic });
                  }
                }}
                className="cursor-pointer group outline-none"
              >
                {/* Wide invisible hitbox for easy clicking */}
                <line
                  x1={topic.x1}
                  y1={topic.y1}
                  x2={topic.x2}
                  y2={topic.y2}
                  stroke="transparent"
                  strokeWidth="24"
                />

                {/* Visible Data Flow Line */}
                <line
                  x1={topic.x1}
                  y1={topic.y1}
                  x2={topic.x2}
                  y2={topic.y2}
                  stroke={isSelected ? "#EF4444" : isActive ? "#22C55E" : "#B5230E"}
                  strokeWidth={isSelected ? "3" : isActive ? "2.5" : "2"}
                  strokeDasharray={isActive ? "4,4" : "none"}
                  markerEnd={isActive ? "url(#graph-arrow-active)" : "url(#graph-arrow)"}
                  className="transition-colors"
                />

                {/* Topic Label Box */}
                <rect
                  x={topic.labelX - 55}
                  y={topic.labelY - 10}
                  width="110"
                  height="20"
                  rx="5"
                  fill="#1E2124"
                  stroke={isSelected ? "#EF4444" : isActive ? "#22C55E" : "#4B5563"}
                  strokeWidth={isSelected ? "2" : "1"}
                  className="group-hover:stroke-redbrick-400 transition-colors"
                />

                <text
                  x={topic.labelX}
                  y={topic.labelY + 4}
                  textAnchor="middle"
                  fill={isSelected ? "#FCA5A5" : isActive ? "#86EFAC" : "#F3F4F6"}
                  fontSize="9.5"
                  fontFamily="monospace"
                  fontWeight="bold"
                  className="select-none pointer-events-none"
                >
                  {topic.name}
                </text>
              </g>
            );
          })}

          {/* Nodes */}
          {activeNodes.map((node) => {
            const isSelected = selectedEntity?.data.id === node.id;
            const isNodeActive =
              activeTopicId === "cmd_vel" && (node.id === "robot_controller" || node.id === "base_motors");

            return (
              <g
                key={node.id}
                role="button"
                tabIndex={0}
                aria-label={`ROS 2 Node: ${node.name}`}
                transform={`translate(${node.x}, ${node.y})`}
                onClick={() => setSelectedEntity({ type: "node", data: node })}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedEntity({ type: "node", data: node });
                  }
                }}
                className="cursor-pointer group outline-none"
              >
                {/* Node Box */}
                <rect
                  width="130"
                  height="60"
                  rx="10"
                  fill="#181B20"
                  stroke={isSelected ? "#EF4444" : isNodeActive ? "#22C55E" : "#374151"}
                  strokeWidth={isSelected ? "2.5" : isNodeActive ? "2" : "1.5"}
                  className="group-hover:stroke-redbrick-500 transition-colors"
                />

                {/* Status indicator pulse dot */}
                <circle cx="16" cy="20" r="4" fill="#22C55E" />

                {/* Node Name */}
                <text
                  x="28"
                  y="24"
                  fill="#FFFFFF"
                  fontSize="11"
                  fontWeight="bold"
                  fontFamily="monospace"
                  className="select-none pointer-events-none"
                >
                  {node.name}
                </text>

                {/* Node Package Badge */}
                <rect x="14" y="36" width="102" height="15" rx="3" fill="#262A30" />
                <text
                  x="65"
                  y="47"
                  textAnchor="middle"
                  fill="#9CA3AF"
                  fontSize="8.5"
                  fontFamily="monospace"
                  className="select-none pointer-events-none"
                >
                  pkg: {node.pkg}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Educational Entity Inspector */}
      {selectedEntity && (
        <div className="p-5 bg-charcoal-900 border-t border-charcoal-800">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Col 1 & 2: Entity Identity & Description */}
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center gap-2.5">
                <span
                  className={`text-xs uppercase font-bold px-2.5 py-1 rounded font-mono ${
                    selectedEntity.type === "node"
                      ? "bg-redbrick-600/20 text-redbrick-400 border border-redbrick-500/30"
                      : "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                  }`}
                >
                  {selectedEntity.type === "node" ? "ROS 2 Node" : "ROS 2 Topic"}
                </span>
                <span className="font-mono font-bold text-base sm:text-lg text-white">
                  {selectedEntity.data.name}
                </span>
              </div>

              {selectedEntity.type === "node" ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm">
                    <div className="p-3 rounded-xl bg-charcoal-950 border border-charcoal-800 space-y-1">
                      <span className="text-gray-400 font-semibold block text-xs">Publishers (ส่งข้อมูล):</span>
                      {selectedEntity.data.publishers.length > 0 ? (
                        selectedEntity.data.publishers.map((p) => (
                          <span key={p} className="font-mono text-green-400 block font-medium">
                            {p}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500 italic block">- ไม่มี (None) -</span>
                      )}
                    </div>
                    <div className="p-3 rounded-xl bg-charcoal-950 border border-charcoal-800 space-y-1">
                      <span className="text-gray-400 font-semibold block text-xs">Subscribers (รับข้อมูล):</span>
                      {selectedEntity.data.subscribers.length > 0 ? (
                        selectedEntity.data.subscribers.map((s) => (
                          <span key={s} className="font-mono text-blue-400 block font-medium">
                            {s}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500 italic block">- ไม่มี (None) -</span>
                      )}
                    </div>
                  </div>

                  <div className="pt-1">
                    <span className="text-xs font-semibold text-gray-400 block mb-1">Purpose / หน้าที่ในหุ่นยนต์:</span>
                    <p className="text-sm text-gray-200 leading-relaxed bg-charcoal-950 p-3 rounded-xl border border-charcoal-800">
                      {selectedEntity.data.purpose}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm">
                    <div className="p-3 rounded-xl bg-charcoal-950 border border-charcoal-800 space-y-1">
                      <span className="text-gray-400 font-semibold block text-xs">Publisher Node:</span>
                      <span className="font-mono text-green-400 font-medium block">
                        {selectedEntity.data.publisher}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-charcoal-950 border border-charcoal-800 space-y-1">
                      <span className="text-gray-400 font-semibold block text-xs">Subscriber Node:</span>
                      <span className="font-mono text-blue-400 font-medium block">
                        {selectedEntity.data.subscriber}
                      </span>
                    </div>
                  </div>

                  <div className="pt-1">
                    <span className="text-xs font-semibold text-gray-400 block mb-1">รายละเอียด Topic:</span>
                    <p className="text-sm text-gray-200 leading-relaxed bg-charcoal-950 p-3 rounded-xl border border-charcoal-800">
                      {selectedEntity.data.description}
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Col 3: Specifications & Sample Payload */}
            <div className="p-4 rounded-xl bg-charcoal-950 border border-charcoal-800 flex flex-col justify-between text-xs font-mono space-y-3">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-gray-400 font-bold block mb-2 font-heading">
                  {selectedEntity.type === "node" ? "Node Specifications" : "Message Structure"}
                </span>

                {selectedEntity.type === "node" ? (
                  <div className="space-y-2">
                    <div>
                      <span className="text-gray-500 block text-[11px]">Type:</span>
                      <span className="text-gray-200 font-medium">{selectedEntity.data.type}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[11px]">Package:</span>
                      <span className="text-redbrick-400 font-bold">{selectedEntity.data.pkg}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[11px]">Runtime Status:</span>
                      <span className="text-green-400 flex items-center gap-1 mt-0.5">
                        <CheckCircle2 className="h-3.5 w-3.5" /> ACTIVE (rclpy / micro-ROS)
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div>
                      <span className="text-gray-500 block text-[11px]">Message Type:</span>
                      <span className="text-amber-400 font-bold">{selectedEntity.data.type}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[11px]">Publish Rate:</span>
                      <span className="text-green-400 font-medium">{selectedEntity.data.rate}</span>
                    </div>
                  </div>
                )}
              </div>

              {selectedEntity.type === "topic" && (
                <div>
                  <span className="text-gray-400 text-[10px] uppercase font-bold block mb-1">
                    Sample Message (YAML):
                  </span>
                  <pre className="p-2.5 rounded bg-black/60 text-green-300 text-[11px] leading-snug overflow-x-auto border border-charcoal-800 max-h-36">
                    {selectedEntity.data.sampleMessage}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
