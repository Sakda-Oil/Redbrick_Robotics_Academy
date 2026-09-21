"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Compass,
  Activity,
  Radio,
  Eye,
  Sliders,
  Sparkles,
  Zap,
  ShieldAlert,
  HelpCircle,
  Info,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Square,
} from "lucide-react";
import { computeAvoidanceCommand } from "@/lib/simulator/obstacleAvoidance";

export interface MobileRobotSimulatorProps {
  onCmdVelPublish?: (linear: number, angular: number) => void;
  className?: string;
  initialMode?: "manual" | "avoidance" | "patrol";
  externalCmdVel?: { linear: number; angular: number; timestamp: number };
  viewMode?: "student" | "advanced";
}

interface Obstacle {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  color: string;
}

interface LidarHit {
  angle: number;
  distance: number;
  hitX: number;
  hitY: number;
}

// Arena configuration (8m x 5m world)
const WORLD_WIDTH = 8.0;
const WORLD_HEIGHT = 5.0;
const ROBOT_RADIUS = 0.22; // 22cm radius (44cm diameter)
const WHEEL_TRACK = 0.28; // 28cm between wheels

// Obstacles inside the arena
const OBSTACLES: Obstacle[] = [
  { x: 1.5, y: 1.0, w: 1.0, h: 0.8, label: "Pillar A", color: "#475569" },
  { x: 5.5, y: 1.2, w: 1.2, h: 0.7, label: "Workstation", color: "#334155" },
  { x: 2.0, y: 3.2, w: 1.4, h: 0.8, label: "Crate Stack", color: "#64748b" },
  { x: 5.2, y: 3.4, w: 0.9, h: 0.9, label: "Docking Base", color: "#B5230E" },
];

export function MobileRobotSimulator({
  onCmdVelPublish,
  className = "",
  initialMode = "manual",
  externalCmdVel,
  viewMode = "student",
}: MobileRobotSimulatorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [currentViewMode, setCurrentViewMode] = useState<"student" | "advanced">(viewMode);

  // Simulation mode: manual teleop, autonomous obstacle avoidance, square patrol
  const [driveMode, setDriveMode] = useState<"manual" | "avoidance" | "patrol">(initialMode);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [activeTelemetryTab, setActiveTelemetryTab] = useState<"/cmd_vel" | "/odom" | "/scan" | "/camera">("/cmd_vel");

  // Robot State in meters & radians
  // World is 8m x 5m
  const robotRef = useRef({
    x: 4.0, // meters
    y: 2.5, // meters
    theta: 0.0, // radians (0 = pointing right)
    v: 0.0, // m/s
    omega: 0.0, // rad/s
    targetV: 0.0,
    targetOmega: 0.0,
    trail: [] as { x: number; y: number }[],
    lidarHits: [] as LidarHit[],
    minDistance: 5.0,
    cameraDetected: false,
    patrolStep: 0,
    patrolTimer: 0,
  });

  // UI display states (throttled to 10Hz to prevent React re-render churn)
  const [telemetry, setTelemetry] = useState({
    x: "4.00",
    y: "2.50",
    thetaDeg: "0.0",
    v: "0.00",
    omega: "0.00",
    minScan: "5.00",
    cameraDetected: false,
    leftWheelSpeed: "0.00",
    rightWheelSpeed: "0.00",
  });

  // Teleop control settings
  const [speedSetting, setSpeedSetting] = useState<number>(0.4); // max linear m/s
  const [turnSetting, setTurnSetting] = useState<number>(1.2); // max angular rad/s

  // Track if component is in viewport
  const isVisibleRef = useRef<boolean>(true);

  // Helper: Cast LiDAR ray against walls and obstacles
  const castRay = useCallback(
    (originX: number, originY: number, angle: number, maxDist: number = 4.5): LidarHit => {
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      let closestDist = maxDist;
      let hitX = originX + cosA * maxDist;
      let hitY = originY + sinA * maxDist;

      // 1. Check world boundaries (0..WORLD_WIDTH, 0..WORLD_HEIGHT)
      if (cosA > 0.0001) {
        const d = (WORLD_WIDTH - originX) / cosA;
        if (d > 0 && d < closestDist) {
          closestDist = d;
          hitX = WORLD_WIDTH;
          hitY = originY + sinA * d;
        }
      } else if (cosA < -0.0001) {
        const d = (0 - originX) / cosA;
        if (d > 0 && d < closestDist) {
          closestDist = d;
          hitX = 0;
          hitY = originY + sinA * d;
        }
      }

      if (sinA > 0.0001) {
        const d = (WORLD_HEIGHT - originY) / sinA;
        if (d > 0 && d < closestDist) {
          closestDist = d;
          hitX = originX + cosA * d;
          hitY = WORLD_HEIGHT;
        }
      } else if (sinA < -0.0001) {
        const d = (0 - originY) / sinA;
        if (d > 0 && d < closestDist) {
          closestDist = d;
          hitX = originX + cosA * d;
          hitY = 0;
        }
      }

      // 2. Check OBSTACLES (AABB)
      for (const obs of OBSTACLES) {
        const minX = obs.x;
        const maxX = obs.x + obs.w;
        const minY = obs.y;
        const maxY = obs.y + obs.h;

        // X planes
        if (cosA !== 0) {
          const t1 = (minX - originX) / cosA;
          const y1 = originY + sinA * t1;
          if (t1 > 0 && t1 < closestDist && y1 >= minY && y1 <= maxY) {
            closestDist = t1;
            hitX = minX;
            hitY = y1;
          }

          const t2 = (maxX - originX) / cosA;
          const y2 = originY + sinA * t2;
          if (t2 > 0 && t2 < closestDist && y2 >= minY && y2 <= maxY) {
            closestDist = t2;
            hitX = maxX;
            hitY = y2;
          }
        }

        // Y planes
        if (sinA !== 0) {
          const t3 = (minY - originY) / sinA;
          const x3 = originX + cosA * t3;
          if (t3 > 0 && t3 < closestDist && x3 >= minX && x3 <= maxX) {
            closestDist = t3;
            hitX = x3;
            hitY = minY;
          }

          const t4 = (maxY - originY) / sinA;
          const x4 = originX + cosA * t4;
          if (t4 > 0 && t4 < closestDist && x4 >= minX && x4 <= maxX) {
            closestDist = t4;
            hitX = x4;
            hitY = maxY;
          }
        }
      }

      return { angle, distance: closestDist, hitX, hitY };
    },
    []
  );

  // Handle intersection observer to pause when scrolled off-screen
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.15 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Update target velocities
  const setTargetVelocity = useCallback(
    (v: number, omega: number) => {
      robotRef.current.targetV = v;
      robotRef.current.targetOmega = omega;
      if (onCmdVelPublish) {
        onCmdVelPublish(v, omega);
      }
    },
    [onCmdVelPublish]
  );

  useEffect(() => {
    if (externalCmdVel) {
      if (driveMode !== "manual") setDriveMode("manual");
      setTargetVelocity(externalCmdVel.linear, externalCmdVel.angular);
    }
  }, [externalCmdVel, setTargetVelocity, driveMode]);

  // Manual command triggers
  const handleCommand = useCallback(
    (cmd: "forward" | "backward" | "left" | "right" | "stop") => {
      if (driveMode !== "manual") setDriveMode("manual");
      switch (cmd) {
        case "forward":
          setTargetVelocity(speedSetting, 0.0);
          break;
        case "backward":
          setTargetVelocity(-speedSetting * 0.75, 0.0);
          break;
        case "left":
          setTargetVelocity(0.0, turnSetting);
          break;
        case "right":
          setTargetVelocity(0.0, -turnSetting);
          break;
        case "stop":
          setTargetVelocity(0.0, 0.0);
          break;
      }
    },
    [driveMode, speedSetting, turnSetting, setTargetVelocity]
  );

  const handleReset = () => {
    robotRef.current.x = 4.0;
    robotRef.current.y = 2.5;
    robotRef.current.theta = 0.0;
    robotRef.current.v = 0.0;
    robotRef.current.omega = 0.0;
    robotRef.current.targetV = 0.0;
    robotRef.current.targetOmega = 0.0;
    robotRef.current.trail = [];
    robotRef.current.patrolStep = 0;
    robotRef.current.patrolTimer = 0;
    if (onCmdVelPublish) onCmdVelPublish(0, 0);
  };

  // Keyboard navigation listener when canvas area is focused
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only capture when container or canvas has active focus to prevent global key stealing
      if (!containerRef.current?.contains(document.activeElement)) return;

      if (["ArrowUp", "w", "W"].includes(e.key)) {
        e.preventDefault();
        handleCommand("forward");
      } else if (["ArrowDown", "s", "S"].includes(e.key)) {
        e.preventDefault();
        handleCommand("backward");
      } else if (["ArrowLeft", "a", "A"].includes(e.key)) {
        e.preventDefault();
        handleCommand("left");
      } else if (["ArrowRight", "d", "D"].includes(e.key)) {
        e.preventDefault();
        handleCommand("right");
      } else if ([" ", "x", "X"].includes(e.key)) {
        e.preventDefault();
        handleCommand("stop");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleCommand]);

  // Main 60FPS Physics Simulation & Canvas Rendering Loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    let telemetryTimer = 0;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = (currentTime: number) => {
      animId = requestAnimationFrame(render);

      if (!isVisibleRef.current || !isRunning) {
        lastTime = currentTime;
        return;
      }

      // Delta time in seconds (clamped to max 0.1s to avoid physics explosions on tab switch)
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      const robot = robotRef.current;

      // 1. Autonomous Behavior Logic
      if (driveMode === "avoidance") {
        const command = computeAvoidanceCommand(robot.lidarHits, robot.theta, speedSetting);
        robot.targetV = command.linear;
        robot.targetOmega = command.angular;
      } else if (driveMode === "patrol") {
        // Square Patrol: Move forward 2.0s, turn 90 deg (1.57s @ 1.0 rad/s)
        robot.patrolTimer += dt;
        if (robot.patrolStep % 2 === 0) {
          // Forward leg
          robot.targetV = 0.35;
          robot.targetOmega = 0.0;
          if (robot.patrolTimer > 2.5) {
            robot.patrolTimer = 0;
            robot.patrolStep++;
          }
        } else {
          // Turn 90 degrees leg
          robot.targetV = 0.0;
          robot.targetOmega = 1.05;
          if (robot.patrolTimer > 1.5) {
            robot.patrolTimer = 0;
            robot.patrolStep++;
          }
        }
      }

      // 2. Velocity Smoothing (Motor acceleration response)
      const accel = 3.0; // m/s^2
      const alphaOmega = 6.0; // rad/s^2
      robot.v += (robot.targetV - robot.v) * Math.min(1.0, accel * dt);
      robot.omega += (robot.targetOmega - robot.omega) * Math.min(1.0, alphaOmega * dt);

      // 3. Differential Drive Kinematics Integration:
      // dx/dt = v * cos(theta)
      // dy/dt = v * sin(theta)
      // dtheta/dt = omega
      const nextX = robot.x + robot.v * Math.cos(robot.theta) * dt;
      const nextY = robot.y + robot.v * Math.sin(robot.theta) * dt;
      const nextTheta = robot.theta + robot.omega * dt;

      // 4. Arena Boundary & Collision Prevention
      let collision = false;
      if (
        nextX - ROBOT_RADIUS < 0 ||
        nextX + ROBOT_RADIUS > WORLD_WIDTH ||
        nextY - ROBOT_RADIUS < 0 ||
        nextY + ROBOT_RADIUS > WORLD_HEIGHT
      ) {
        collision = true;
      }

      for (const obs of OBSTACLES) {
        if (
          nextX + ROBOT_RADIUS > obs.x &&
          nextX - ROBOT_RADIUS < obs.x + obs.w &&
          nextY + ROBOT_RADIUS > obs.y &&
          nextY - ROBOT_RADIUS < obs.y + obs.h
        ) {
          collision = true;
          break;
        }
      }

      if (!collision) {
        robot.x = nextX;
        robot.y = nextY;
      } else {
        // Friction stop on wall hit
        robot.v = 0;
      }
      robot.theta = nextTheta;

      // Record trajectory trail (every ~10cm)
      const lastTrail = robot.trail[robot.trail.length - 1];
      if (
        !lastTrail ||
        Math.hypot(robot.x - lastTrail.x, robot.y - lastTrail.y) > 0.1
      ) {
        robot.trail.push({ x: robot.x, y: robot.y });
        if (robot.trail.length > 150) robot.trail.shift();
      }

      // 5. 2D LiDAR Ray Casting (36 rays, 10-degree increments over 360 degrees)
      const RAY_COUNT = 36;
      const hits: LidarHit[] = [];
      let minRayDist = 5.0;

      for (let i = 0; i < RAY_COUNT; i++) {
        const rayAngle = robot.theta + (i * 2 * Math.PI) / RAY_COUNT;
        const hit = castRay(robot.x, robot.y, rayAngle, 4.5);
        hits.push(hit);
        if (hit.distance < minRayDist) minRayDist = hit.distance;
      }
      robot.lidarHits = hits;
      robot.minDistance = minRayDist;

      // 6. Camera Field-Of-View Check (Check if Docking Base is inside 60 deg cone)
      let camDetected = false;
      const dock = OBSTACLES[3]; // Docking base
      const dockCenterX = dock.x + dock.w / 2;
      const dockCenterY = dock.y + dock.h / 2;
      const toDockX = dockCenterX - robot.x;
      const toDockY = dockCenterY - robot.y;
      const distToDock = Math.hypot(toDockX, toDockY);
      if (distToDock < 3.2) {
        const angleToDock = Math.atan2(toDockY, toDockX);
        const relAngle = ((angleToDock - robot.theta + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
        if (Math.abs(relAngle) < Math.PI / 6) {
          // Within 60 deg cone (-30 to +30)
          camDetected = true;
        }
      }
      robot.cameraDetected = camDetected;

      // 7. Throttled UI Telemetry updates (10Hz)
      telemetryTimer += dt;
      if (telemetryTimer > 0.1) {
        telemetryTimer = 0;
        const vL = (robot.v - (robot.omega * WHEEL_TRACK) / 2).toFixed(2);
        const vR = (robot.v + (robot.omega * WHEEL_TRACK) / 2).toFixed(2);
        const deg = (((robot.theta * 180) / Math.PI) % 360).toFixed(1);

        setTelemetry({
          x: robot.x.toFixed(2),
          y: robot.y.toFixed(2),
          thetaDeg: deg,
          v: robot.v.toFixed(2),
          omega: robot.omega.toFixed(2),
          minScan: robot.minDistance.toFixed(2),
          cameraDetected: robot.cameraDetected,
          leftWheelSpeed: vL,
          rightWheelSpeed: vR,
        });
      }

      // 8. Canvas Graphics Rendering
      const cw = canvas.width;
      const ch = canvas.height;
      const scaleX = cw / WORLD_WIDTH;
      const scaleY = ch / WORLD_HEIGHT;

      // Background
      ctx.fillStyle = "#090d16";
      ctx.fillRect(0, 0, cw, ch);

      // Arena Grid (1 meter grid cells)
      ctx.strokeStyle = "#1e293b";
      ctx.lineWidth = 1;
      for (let gx = 0; gx <= WORLD_WIDTH; gx += 1) {
        ctx.beginPath();
        ctx.moveTo(gx * scaleX, 0);
        ctx.lineTo(gx * scaleX, ch);
        ctx.stroke();
      }
      for (let gy = 0; gy <= WORLD_HEIGHT; gy += 1) {
        ctx.beginPath();
        ctx.moveTo(0, gy * scaleY);
        ctx.lineTo(cw, gy * scaleY);
        ctx.stroke();
      }

      // Draw Obstacles
      for (const obs of OBSTACLES) {
        const ox = obs.x * scaleX;
        const oy = obs.y * scaleY;
        const ow = obs.w * scaleX;
        const oh = obs.h * scaleY;

        ctx.fillStyle = obs.color;
        ctx.fillRect(ox, oy, ow, oh);
        ctx.strokeStyle = "#94a3b8";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(ox, oy, ow, oh);

        // Label
        ctx.fillStyle = "#f8fafc";
        ctx.font = "10px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(obs.label, ox + ow / 2, oy + oh / 2);
      }

      // Draw Trajectory Trail
      if (robot.trail.length > 1) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(181, 35, 14, 0.4)";
        ctx.lineWidth = 2;
        ctx.setLineDash([3, 3]);
        for (let i = 0; i < robot.trail.length; i++) {
          const pt = robot.trail[i];
          const px = pt.x * scaleX;
          const py = pt.y * scaleY;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Draw LiDAR Beams & Hits
      for (const hit of robot.lidarHits) {
        const hx = hit.hitX * scaleX;
        const hy = hit.hitY * scaleY;
        const rx = robot.x * scaleX;
        const ry = robot.y * scaleY;

        // Beam line
        ctx.beginPath();
        ctx.moveTo(rx, ry);
        ctx.lineTo(hx, hy);
        const isNear = hit.distance < 0.6;
        ctx.strokeStyle = isNear ? "rgba(239, 68, 68, 0.35)" : "rgba(34, 197, 94, 0.15)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Hit point dot
        ctx.beginPath();
        ctx.arc(hx, hy, isNear ? 3 : 2, 0, Math.PI * 2);
        ctx.fillStyle = isNear ? "#ef4444" : "#22c55e";
        ctx.fill();
      }

      // Robot Transform
      const rx = robot.x * scaleX;
      const ry = robot.y * scaleY;
      const radPx = ROBOT_RADIUS * scaleX;

      ctx.save();
      ctx.translate(rx, ry);
      ctx.rotate(robot.theta);

      // Camera FOV Frustum (60 deg cone)
      const fovDist = 2.8 * scaleX;
      const fovAngle = Math.PI / 6; // 30 deg on each side
      const grad = ctx.createRadialGradient(0, 0, 10, 0, 0, fovDist);
      grad.addColorStop(0, "rgba(6, 182, 212, 0.3)");
      grad.addColorStop(1, "rgba(6, 182, 212, 0.0)");

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, fovDist, -fovAngle, fovAngle);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = "rgba(6, 182, 212, 0.4)";
      ctx.stroke();

      // Robot Wheels (Differential Drive Left & Right)
      const wheelW = radPx * 0.75;
      const wheelH = radPx * 0.28;
      const trackDist = (WHEEL_TRACK * scaleX) / 2;

      ctx.fillStyle = "#0f172a";
      ctx.strokeStyle = "#64748b";
      ctx.lineWidth = 1.5;

      // Left wheel (top in local frame)
      ctx.fillRect(-wheelW / 2, -trackDist - wheelH / 2, wheelW, wheelH);
      ctx.strokeRect(-wheelW / 2, -trackDist - wheelH / 2, wheelW, wheelH);

      // Right wheel (bottom in local frame)
      ctx.fillRect(-wheelW / 2, trackDist - wheelH / 2, wheelW, wheelH);
      ctx.strokeRect(-wheelW / 2, trackDist - wheelH / 2, wheelW, wheelH);

      // Castor wheel (front)
      ctx.beginPath();
      ctx.arc(radPx * 0.65, 0, radPx * 0.18, 0, Math.PI * 2);
      ctx.fillStyle = "#475569";
      ctx.fill();

      // Main Circular Robot Chassis
      ctx.beginPath();
      ctx.arc(0, 0, radPx, 0, Math.PI * 2);
      ctx.fillStyle = "#1e293b";
      ctx.fill();
      ctx.strokeStyle = "#B5230E"; // Redbrick red accent rim
      ctx.lineWidth = 3;
      ctx.stroke();

      // Raspberry Pi 5 & Electronics Bay Mockup
      ctx.fillStyle = "#064e3b"; // Green PCB
      ctx.fillRect(-radPx * 0.45, -radPx * 0.4, radPx * 0.9, radPx * 0.8);

      // LiDAR Turret (Center RPLiDAR)
      ctx.beginPath();
      ctx.arc(0, 0, radPx * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = "#0f172a";
      ctx.fill();
      ctx.strokeStyle = "#0ea5e9";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Front Heading Pointer Arrow
      ctx.beginPath();
      ctx.moveTo(radPx * 0.4, 0);
      ctx.lineTo(radPx * 0.95, 0);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(radPx * 0.95, 0);
      ctx.lineTo(radPx * 0.75, -5);
      ctx.lineTo(radPx * 0.75, 5);
      ctx.closePath();
      ctx.fillStyle = "#ffffff";
      ctx.fill();

      ctx.restore();
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [driveMode, isRunning, speedSetting, turnSetting, castRay]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      aria-label="Interactive 2D Mobile Robot Simulator with ROS 2 Telemetry"
      className={`w-full my-8 rounded-2xl border border-charcoal-700 bg-charcoal-950 text-white overflow-hidden shadow-2xl font-sans focus:outline-none focus:ring-2 focus:ring-redbrick-500/50 ${className}`}
    >
      {/* Top Header & Simulation Status */}
      <div className="p-4 sm:p-5 bg-charcoal-900 border-b border-charcoal-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-redbrick-600/20 text-redbrick-500 border border-redbrick-500/30">
            <Radio className="h-6 w-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-xl font-extrabold text-white font-heading">
                Redbrick 2D Mobile Robot Simulator
              </h3>
              <span className="text-xs bg-redbrick-900/50 text-redbrick-300 border border-redbrick-700/50 px-2 py-0.5 rounded-full font-mono font-bold">
                Jazzy Differential-Drive
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
              {currentViewMode === "student"
                ? "Teleoperation & Telemetry (/cmd_vel, /odom, /scan)"
                : "Kinematics: dx/dt = v cos(θ), dy/dt = v sin(θ), dθ/dt = ω • Micro-ROS ESP32 Base"}
            </p>
          </div>
        </div>

        {/* Play/Pause & Mode Selectors */}
        <div className="flex items-center flex-wrap gap-2">
          <div className="flex bg-charcoal-950 p-0.5 rounded-lg border border-charcoal-800 text-xs font-mono">
            <button
              type="button"
              onClick={() => {
                setDriveMode("avoidance");
                setIsRunning(true);
              }}
              aria-pressed={driveMode === "avoidance"}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                driveMode === "avoidance"
                  ? "bg-green-600 text-white font-bold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Auto Avoid
            </button>
            <button
              type="button"
              onClick={() => {
                setDriveMode("manual");
                setTargetVelocity(0, 0);
              }}
              aria-pressed={driveMode === "manual"}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                driveMode === "manual"
                  ? "bg-redbrick-600 text-white font-bold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Manual
            </button>
          </div>
          <div className="flex bg-charcoal-950 p-0.5 rounded-lg border border-charcoal-800 text-xs font-mono">
            <button
              type="button"
              onClick={() => setCurrentViewMode("student")}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                currentViewMode === "student"
                  ? "bg-redbrick-600 text-white font-bold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Student View
            </button>
            <button
              type="button"
              onClick={() => setCurrentViewMode("advanced")}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                currentViewMode === "advanced"
                  ? "bg-redbrick-600 text-white font-bold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Advanced
            </button>
          </div>

          <button
            onClick={() => setIsRunning(!isRunning)}
            aria-label={isRunning ? "Pause Simulation" : "Resume Simulation"}
            className="p-2 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 border border-charcoal-700 text-gray-200 transition-colors"
          >
            {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 text-green-400" />}
          </button>
          <button
            onClick={handleReset}
            aria-label="Reset Robot Position"
            className="p-2 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 border border-charcoal-700 text-gray-200 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area: Canvas Arena (Left) & Telemetry / Control Panel (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-charcoal-800">
        {/* 2D Canvas Arena (8 Cols on Desktop) */}
        <div className="lg:col-span-8 p-3 sm:p-4 bg-charcoal-950 flex flex-col items-center justify-center relative border-b lg:border-b-0 lg:border-r border-charcoal-800">
          <div className="w-full relative rounded-xl overflow-hidden border border-charcoal-800 shadow-inner aspect-[8/5]">
            <canvas
              ref={canvasRef}
              width={800}
              height={500}
              className="w-full h-full block cursor-crosshair"
            />

            {/* In-Canvas Mini HUD Overlay (Hidden in Student View) */}
            {currentViewMode === "advanced" && (
              <div className="absolute top-3 left-3 bg-charcoal-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-charcoal-800 text-[11px] font-mono text-gray-300 flex items-center gap-3 pointer-events-none">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  SIM RUNNING (60 FPS)
                </span>
                <span className="text-gray-500">|</span>
                <span>LiDAR Min: <strong className={Number(telemetry.minScan) < 0.6 ? "text-red-400" : "text-green-400"}>{telemetry.minScan}m</strong></span>
                <span className="text-gray-500">|</span>
                <span>Camera Target: <strong className={telemetry.cameraDetected ? "text-cyan-400" : "text-gray-400"}>{telemetry.cameraDetected ? "DOCK DETECTED" : "NONE"}</strong></span>
              </div>
            )}

            {/* Arena Legend (Hidden in Student View) */}
            {currentViewMode === "advanced" && (
              <div className="absolute bottom-3 right-3 bg-charcoal-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-charcoal-800 text-[10px] font-mono text-gray-400 flex items-center gap-2 pointer-events-none">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-cyan-400" /> Camera FOV (60°)
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-green-400" /> LiDAR Rays
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-redbrick-500" /> Chassis
                </span>
              </div>
            )}
          </div>

          <p className="mt-2 text-[11px] text-gray-500 font-mono text-center">
            Click inside arena and use <kbd className="px-1.5 py-0.5 bg-charcoal-800 rounded border border-charcoal-700">W/A/S/D</kbd> or Arrow Keys for keyboard teleop.
          </p>
        </div>

        {/* Teleop Controls & ROS 2 Telemetry Inspector (4 Cols on Desktop) */}
        <div className="lg:col-span-4 p-4 sm:p-5 bg-charcoal-900/60 flex flex-col justify-between space-y-5">
          {/* Teleop Control D-Pad */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 font-mono flex items-center gap-1.5">
                <Sliders className="h-3.5 w-3.5 text-redbrick-400" /> Teleop Drive Controls
              </span>
              <span className="text-[11px] text-gray-500 font-mono">
                {driveMode === "manual" ? "Manual Mode" : "Auto Avoiding with /scan"}
              </span>
            </div>

            {driveMode === "avoidance" && (
              <div className="mb-4 flex items-start gap-2 rounded-xl border border-green-700/40 bg-green-950/30 p-3 text-xs leading-relaxed text-green-200">
                <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
                <span>หุ่นยนต์กำลังขับเอง ใช้ข้อมูล <strong>/scan</strong> ชะลอ เลี้ยว หรือถอยเมื่อพบสิ่งกีดขวาง กดปุ่มทิศทางเพื่อเปลี่ยนเป็น Manual</span>
              </div>
            )}

            {/* D-Pad Buttons */}
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={() => handleCommand("forward")}
                aria-label="Drive Forward"
                className="w-14 h-12 rounded-xl bg-charcoal-800 hover:bg-redbrick-600 active:scale-95 border border-charcoal-700 text-white flex items-center justify-center transition-all shadow-md"
              >
                <ArrowUp className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCommand("left")}
                  aria-label="Turn Left"
                  className="w-14 h-12 rounded-xl bg-charcoal-800 hover:bg-redbrick-600 active:scale-95 border border-charcoal-700 text-white flex items-center justify-center transition-all shadow-md"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleCommand("stop")}
                  aria-label="Emergency Stop"
                  className="w-14 h-12 rounded-xl bg-red-950/80 hover:bg-red-700 active:scale-95 border border-red-800 text-red-300 hover:text-white flex items-center justify-center transition-all shadow-md font-mono text-xs font-bold"
                >
                  <Square className="h-4 w-4 fill-current" />
                </button>
                <button
                  onClick={() => handleCommand("right")}
                  aria-label="Turn Right"
                  className="w-14 h-12 rounded-xl bg-charcoal-800 hover:bg-redbrick-600 active:scale-95 border border-charcoal-700 text-white flex items-center justify-center transition-all shadow-md"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
              <button
                onClick={() => handleCommand("backward")}
                aria-label="Drive Backward"
                className="w-14 h-12 rounded-xl bg-charcoal-800 hover:bg-redbrick-600 active:scale-95 border border-charcoal-700 text-white flex items-center justify-center transition-all shadow-md"
              >
                <ArrowDown className="h-5 w-5" />
              </button>
            </div>

            {/* Velocity Sliders */}
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs font-mono">
              <div>
                <label className="block text-gray-400 mb-1">Max Speed: {speedSetting} m/s</label>
                <input
                  type="range"
                  min="0.1"
                  max="0.8"
                  step="0.05"
                  value={speedSetting}
                  onChange={(e) => setSpeedSetting(parseFloat(e.target.value))}
                  className="w-full accent-redbrick-500 cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Turn Rate: {turnSetting} rad/s</label>
                <input
                  type="range"
                  min="0.5"
                  max="2.5"
                  step="0.1"
                  value={turnSetting}
                  onChange={(e) => setTurnSetting(parseFloat(e.target.value))}
                  className="w-full accent-redbrick-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="p-3 bg-charcoal-950 rounded-xl border border-charcoal-800 grid grid-cols-3 gap-2 text-center text-xs font-mono">
            <div>
              <div className="text-gray-500 text-[10px]">Position (X, Y)</div>
              <div className="font-bold text-gray-200 mt-0.5">{telemetry.x}, {telemetry.y} m</div>
            </div>
            <div>
              <div className="text-gray-500 text-[10px]">Heading (&theta;)</div>
              <div className="font-bold text-amber-400 mt-0.5">{telemetry.thetaDeg}&deg;</div>
            </div>
            <div>
              <div className="text-gray-500 text-[10px]">Linear Vel</div>
              <div className="font-bold text-green-400 mt-0.5">{telemetry.v} m/s</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom ROS 2 Telemetry & Topic Payload Inspector */}
      <div className="p-4 sm:p-5 bg-charcoal-950">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-redbrick-400" />
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300 font-mono">
              ROS 2 Jazzy Live Message Stream
            </h4>
          </div>

          {/* Topic Selector Tabs */}
          <div className="flex bg-charcoal-900 p-1 rounded-xl border border-charcoal-800 text-xs font-mono">
            <button
              onClick={() => setActiveTelemetryTab("/cmd_vel")}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeTelemetryTab === "/cmd_vel"
                  ? "bg-charcoal-800 text-redbrick-400 font-bold border border-charcoal-700"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              /cmd_vel
            </button>
            <button
              onClick={() => setActiveTelemetryTab("/odom")}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeTelemetryTab === "/odom"
                  ? "bg-charcoal-800 text-redbrick-400 font-bold border border-charcoal-700"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              /odom
            </button>
            <button
              onClick={() => setActiveTelemetryTab("/scan")}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeTelemetryTab === "/scan"
                  ? "bg-charcoal-800 text-redbrick-400 font-bold border border-charcoal-700"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              /scan
            </button>
          </div>
        </div>

        {/* Dynamic YAML ROS 2 Message Output */}
        <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-800 font-mono text-xs sm:text-sm text-green-400 overflow-x-auto">
          {activeTelemetryTab === "/cmd_vel" && (
            <pre className="leading-relaxed">
{`# Topic: /cmd_vel (geometry_msgs/msg/Twist)
linear:
  x: ${telemetry.v}
  y: 0.0
  z: 0.0
angular:
  x: 0.0
  y: 0.0
  z: ${telemetry.omega}

# Differential wheel speeds calculated:
# Left Wheel (vL):  ${telemetry.leftWheelSpeed} m/s
# Right Wheel (vR): ${telemetry.rightWheelSpeed} m/s`}
            </pre>
          )}

          {activeTelemetryTab === "/odom" && (
            <pre className="leading-relaxed">
{`# Topic: /odom (nav_msgs/msg/Odometry)
header:
  stamp: {sec: 1726500042, nanosec: 84000000}
  frame_id: "odom"
child_frame_id: "base_footprint"
pose:
  pose:
    position: {x: ${telemetry.x}, y: ${telemetry.y}, z: 0.0}
    orientation: {yaw_deg: ${telemetry.thetaDeg}°, z: ${Math.sin(Number(telemetry.thetaDeg) * Math.PI / 360).toFixed(3)}, w: ${Math.cos(Number(telemetry.thetaDeg) * Math.PI / 360).toFixed(3)}}
twist:
  twist:
    linear: {x: ${telemetry.v}, y: 0.0, z: 0.0}
    angular: {x: 0.0, y: 0.0, z: ${telemetry.omega}}`}
            </pre>
          )}

          {activeTelemetryTab === "/scan" && (
            <pre className="leading-relaxed">
{`# Topic: /scan (sensor_msgs/msg/LaserScan)
header:
  stamp: {sec: 1726500042, nanosec: 92000000}
  frame_id: "laser_frame"
angle_min: -3.1415926
angle_max: 3.1415926
angle_increment: 0.1745329  # 10 degrees (36 rays)
range_min: 0.15
range_max: 4.50
closest_obstacle_distance: ${telemetry.minScan} m
status: ${Number(telemetry.minScan) < 0.65 ? "PROXIMITY WARNING (< 0.65m)" : "CLEAR PATH"}`}
            </pre>
          )}
        </div>

        {/* What is happening? Interactive Flow Explanation */}
        <div className="mt-4 p-4 rounded-xl bg-charcoal-900 border border-charcoal-800 text-xs sm:text-sm">
          <div className="font-bold text-redbrick-400 mb-2 flex items-center gap-1.5 font-mono">
            <Info className="h-4 w-4" />
            <span>ตอนนี้เกิดอะไรขึ้น? (What is happening?)</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-gray-300">
            {Number(telemetry.v) > 0 ? (
              <>
                <span className="px-2 py-1 rounded bg-blue-950/60 border border-blue-500/30 text-blue-300 font-semibold">คุณกด Forward (หรือส่งคำสั่ง)</span>
                <span className="text-gray-500">→</span>
                <span className="px-2 py-1 rounded bg-charcoal-800 text-amber-300">ระบบสร้าง Twist (linear.x = {telemetry.v})</span>
                <span className="text-gray-500">→</span>
                <span className="px-2 py-1 rounded bg-green-950/60 border border-green-500/30 text-green-300 font-bold">Publish ไป /cmd_vel</span>
                <span className="text-gray-500">→</span>
                <span className="px-2 py-1 rounded bg-charcoal-800 text-gray-200">Mobile base รับ message</span>
                <span className="text-gray-500">→</span>
                <span className="px-2 py-1 rounded bg-purple-950/60 border border-purple-500/30 text-purple-300 font-semibold">Robot เคลื่อนที่ไปข้างหน้า</span>
                <span className="text-gray-500">→</span>
                <span className="px-2 py-1 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">/odom อัปเดตพิกัด (X: {telemetry.x}, Y: {telemetry.y})</span>
              </>
            ) : Number(telemetry.v) < 0 ? (
              <>
                <span className="px-2 py-1 rounded bg-blue-950/60 border border-blue-500/30 text-blue-300 font-semibold">คุณกด Backward</span>
                <span className="text-gray-500">→</span>
                <span className="px-2 py-1 rounded bg-charcoal-800 text-amber-300">สร้าง Twist (linear.x = {telemetry.v})</span>
                <span className="text-gray-500">→</span>
                <span className="px-2 py-1 rounded bg-green-950/60 border border-green-500/30 text-green-300 font-bold">Publish ไป /cmd_vel</span>
                <span className="text-gray-500">→</span>
                <span className="px-2 py-1 rounded bg-purple-950/60 border border-purple-500/30 text-purple-300">Robot ถอยหลัง</span>
              </>
            ) : Math.abs(Number(telemetry.omega)) > 0 ? (
              <>
                <span className="px-2 py-1 rounded bg-blue-950/60 border border-blue-500/30 text-blue-300 font-semibold">คุณสั่งหมุนเลี้ยว</span>
                <span className="text-gray-500">→</span>
                <span className="px-2 py-1 rounded bg-charcoal-800 text-amber-300">Twist (angular.z = {telemetry.omega})</span>
                <span className="text-gray-500">→</span>
                <span className="px-2 py-1 rounded bg-green-950/60 border border-green-500/30 text-green-300 font-bold">Publish ไป /cmd_vel</span>
                <span className="text-gray-500">→</span>
                <span className="px-2 py-1 rounded bg-purple-950/60 border border-purple-500/30 text-purple-300 font-semibold">Diff-drive หมุนตัว ({telemetry.thetaDeg}°)</span>
              </>
            ) : (
              <>
                <span className="px-2 py-1 rounded bg-charcoal-800 text-gray-400">หุ่นยนต์หยุดนิ่ง (linear.x = 0.0, angular.z = 0.0)</span>
                <span className="text-gray-500">→</span>
                <span className="px-2 py-1 rounded bg-charcoal-800 text-gray-400">/cmd_vel เป็นศูนย์</span>
                <span className="text-gray-500">→</span>
                <span className="px-2 py-1 rounded bg-charcoal-800 text-gray-400">พร้อมรับคำสั่งจาก Teleop / Node</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
