"use client";

import React, { useState, useEffect } from "react";
import { Activity, Radio, Play, Pause, RefreshCw } from "lucide-react";

interface ROSTopicInspectorProps {
  initialTopic?: string;
}

export function ROSTopicInspector({ initialTopic = "/scan" }: ROSTopicInspectorProps) {
  const [selectedTopic, setSelectedTopic] = useState(initialTopic);
  const [isStreaming, setIsStreaming] = useState(true);
  const [count, setCount] = useState(1);
  const [stamp, setStamp] = useState(Date.now());

  useEffect(() => {
    if (!isStreaming) return;
    const interval = setInterval(() => {
      setCount((c) => c + 1);
      setStamp(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, [isStreaming]);

  const getSimulatedMessage = (topic: string, tick: number) => {
    const sec = Math.floor(stamp / 1000);
    const nsec = (stamp % 1000) * 1000000;

    switch (topic) {
      case "/scan":
        const r1 = (1.4 + Math.sin(tick * 0.2) * 0.1).toFixed(2);
        const r2 = (1.35 + Math.cos(tick * 0.2) * 0.1).toFixed(2);
        const r3 = (2.4 + Math.sin(tick * 0.1) * 0.15).toFixed(2);
        return `header:
  stamp:
    sec: ${sec}
    nanosec: ${nsec}
  frame_id: "lidar_link"
angle_min: -3.1415927
angle_max: 3.1415927
angle_increment: 0.0174533
scan_time: 0.1
range_min: 0.15
range_max: 12.0
ranges:
  - ${r1}
  - ${r2}
  - ${r3}
  - 1.28
  - 1.30
  - 2.55
  # [360 total range readings]
intensities:
  - 102.0
  - 98.0
  - 110.0`;

      case "/cmd_vel":
        const vx = (0.2 + (tick % 3 === 0 ? 0.05 : 0)).toFixed(2);
        const wz = (tick % 4 === 0 ? 0.15 : 0.0).toFixed(2);
        return `linear:
  x: ${vx}
  y: 0.0
  z: 0.0
angular:
  x: 0.0
  y: 0.0
  z: ${wz}`;

      case "/odom":
        const xPos = (1.0 + tick * 0.05).toFixed(3);
        const yPos = (0.5 + Math.sin(tick * 0.1) * 0.2).toFixed(3);
        return `header:
  stamp:
    sec: ${sec}
    nanosec: ${nsec}
  frame_id: "odom"
child_frame_id: "base_footprint"
pose:
  pose:
    position:
      x: ${xPos}
      y: ${yPos}
      z: 0.0
    orientation:
      x: 0.0
      y: 0.0
      z: 0.125
      w: 0.992
twist:
  twist:
    linear:
      x: 0.22
      y: 0.0
      z: 0.0
    angular:
      x: 0.0
      y: 0.0
      z: 0.05`;

      case "/camera/image_raw":
        return `header:
  stamp:
    sec: ${sec}
    nanosec: ${nsec}
  frame_id: "camera_link"
height: 480
width: 640
encoding: "rgb8"
is_bigendian: 0
step: 1920
data: [255, 128, 40, 255, 128, 40, ... 921600 bytes]`;

      default:
        return `[No telemetry stream for ${topic}]`;
    }
  };

  const topicsList = [
    { name: "/scan", type: "sensor_msgs/msg/LaserScan", hz: "10.0 Hz" },
    { name: "/cmd_vel", type: "geometry_msgs/msg/Twist", hz: "20.0 Hz" },
    { name: "/odom", type: "nav_msgs/msg/Odometry", hz: "30.0 Hz" },
    { name: "/camera/image_raw", type: "sensor_msgs/msg/Image", hz: "30.0 Hz" },
  ];

  return (
    <div className="rounded-xl border border-charcoal-700 bg-charcoal-950 text-white overflow-hidden shadow-xl flex flex-col h-full font-mono text-xs">
      {/* Top Header */}
      <div className="px-4 py-2.5 bg-charcoal-900 border-b border-charcoal-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-green-400 animate-pulse" />
          <span className="font-bold text-gray-200">ROS 2 Topic Inspector</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsStreaming(!isStreaming)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
              isStreaming
                ? "bg-green-600/20 text-green-400 border border-green-500/30"
                : "bg-gray-800 text-gray-400"
            }`}
          >
            {isStreaming ? (
              <>
                <Pause className="h-3 w-3" />
                <span>Streaming</span>
              </>
            ) : (
              <>
                <Play className="h-3 w-3" />
                <span>Paused</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Topic Switcher Buttons */}
      <div className="p-3 bg-charcoal-900/60 border-b border-charcoal-800 flex flex-wrap items-center gap-2">
        <span className="text-[10px] uppercase font-bold text-gray-500 select-none">Topic:</span>
        {topicsList.map((t) => (
          <button
            key={t.name}
            onClick={() => setSelectedTopic(t.name)}
            className={`px-2.5 py-1 rounded text-xs transition-colors flex items-center gap-1.5 ${
              selectedTopic === t.name
                ? "bg-redbrick-600 text-white font-bold shadow-sm"
                : "bg-charcoal-800 text-gray-400 hover:text-white"
            }`}
          >
            <span>{t.name}</span>
            <span className="text-[10px] opacity-70">({t.hz})</span>
          </button>
        ))}
      </div>

      {/* Stream Terminal Window */}
      <div className="flex-1 p-4 overflow-y-auto bg-charcoal-950 font-mono text-xs leading-relaxed text-green-400">
        <div className="text-gray-500 mb-2 border-b border-charcoal-800 pb-1">
          # ros2 topic echo {selectedTopic} [frame #{count}]
        </div>
        <pre className="whitespace-pre-wrap">
          {getSimulatedMessage(selectedTopic, count)}
        </pre>
      </div>
    </div>
  );
}
