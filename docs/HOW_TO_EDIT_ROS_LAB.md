# How to Edit & Tune the ROS 2 Interactive Lab

This guide explains how to customize and extend the simulation engine that powers the **Redbrick Robotics Academy** interactive learning environment.

---

## 🗂 Simulator Subsystem Overview

```text
src/
├── components/simulator/
│   ├── TerminalSimulator.tsx       # Shell window UI & keyboard event listener
│   ├── ROSGraph.tsx                # SVG ROS computation graph renderer
│   ├── MobileRobotSimulator.tsx    # 2D differential-drive canvas & LiDAR
│   ├── ROS2InstallationLab.tsx     # 10-step Ubuntu 24.04 installation simulator
│   ├── LessonInteractiveLab.tsx    # Context-aware lesson lab coordinator
│   └── ROS2InteractiveLab.tsx      # Standalone 4-quadrant developer sandbox
└── lib/simulator/
    ├── virtualFileSystem.ts        # In-memory POSIX filesystem & command parser
    ├── ros2Simulator.ts            # ROS 2 topics, nodes, and message bus
    └── completion/
        └── completionEngine.ts     # Tab completion logic
```

---

## 🖥 1. Editing Simulated Terminal Commands & Outputs

### Adding New Shell Commands
Open [`src/lib/simulator/virtualFileSystem.ts`](file:///Users/oil/Documents/Antigravity/Redbrick_Docs/src/lib/simulator/virtualFileSystem.ts).

Find the `execute(commandLine: string)` method:
```typescript
if (command === "my_custom_command") {
  return "Output from custom command!";
}
```

### Adding New `ros2` Subcommands
Open [`src/lib/simulator/ros2Simulator.ts`](file:///Users/oil/Documents/Antigravity/Redbrick_Docs/src/lib/simulator/ros2Simulator.ts).

Find the `execute(cmd: string)` router:
- `ros2 node list`: Returns array of active node names.
- `ros2 topic list -t`: Returns registered topic names with type signatures.
- `ros2 topic echo <topic>`: Returns simulated YAML messages (e.g. LaserScan data points or Twist linear/angular values).
- `ros2 topic hz <topic>`: Returns calculated Hertz frequency benchmarks.

---

## 📝 2. Editing Code Editor Presets (Python & C++)

Open [`src/components/simulator/LessonInteractiveLab.tsx`](file:///Users/oil/Documents/Antigravity/Redbrick_Docs/src/components/simulator/LessonInteractiveLab.tsx) (or [`ROS2InteractiveLab.tsx`](file:///Users/oil/Documents/Antigravity/Redbrick_Docs/src/components/simulator/ROS2InteractiveLab.tsx)).

Find the `LESSON_CODE_PRESETS` dictionary:
```typescript
"06-topics": {
  title: "Publisher & Subscriber (/topic)",
  graphMode: "minimal_subscriber",
  python: `... Python code ...`,
  cpp: `... C++ code ...`
}
```
You can edit the default code templates, add additional ROS 2 packages, or change the callback logic.

---

## 🕸 3. Editing the Computational Graph (`rqt_graph`)

Open [`src/components/simulator/ROSGraph.tsx`](file:///Users/oil/Documents/Antigravity/Redbrick_Docs/src/components/simulator/ROSGraph.tsx).

### Adding Nodes
Add to `NODES` or the specific mode array (`PUBLISHER_NODES`, `SUBSCRIBER_NODES`, `CONTROLLER_NODES`):
```typescript
{
  id: "slam_toolbox",
  name: "/slam_toolbox",
  type: "SLAM & Mapping Node",
  pkg: "slam_toolbox",
  publishers: ["/map"],
  subscribers: ["/scan", "/odom"],
  x: 280,
  y: 40,
  purpose: "Constructs 2D occupancy grid map using LiDAR odometry."
}
```

### Adding Topics
Add to `TOPICS` or mode arrays (`PUBLISHER_TOPICS`, `CONTROLLER_TOPICS`):
```typescript
{
  id: "map",
  name: "/map",
  type: "nav_msgs/msg/OccupancyGrid",
  publisher: "/slam_toolbox",
  subscriber: "/nav2_costmap",
  rate: "1.0 Hz",
  x1: 420, y1: 70,
  x2: 580, y2: 70,
  labelX: 500, labelY: 60,
  description: "2D probability occupancy grid for path planning.",
  sampleMessage: `info:\n  resolution: 0.05\n  width: 200\n  height: 200`
}
```

---

## 🤖 4. Tuning Robot Kinematics & LiDAR Simulator

Open [`src/components/simulator/MobileRobotSimulator.tsx`](file:///Users/oil/Documents/Antigravity/Redbrick_Docs/src/components/simulator/MobileRobotSimulator.tsx).

### Tuning Kinematics
Inside the animation loop:
- `robot.v`: Linear velocity ($m/s$).
- `robot.omega`: Angular velocity ($rad/s$).
- `targetV` and `targetOmega`: Smooth velocity ramps based on keyboard or programmatic input.

```typescript
// Position integration:
const dt = delta / 1000;
robot.x += robot.v * Math.cos(robot.theta) * dt;
robot.y += robot.v * Math.sin(robot.theta) * dt;
robot.theta += robot.omega * dt;
```

### Adjusting LiDAR Raycasting
Find `castRay()`:
- `maxDist`: Change detection range (default: 4.5 meters).
- LiDAR sample count: Modify the ray count in `updateSimulation` (default: 360 rays).

### Adding Custom Arena Obstacles
Modify `ARENA_OBSTACLES`:
```typescript
const ARENA_OBSTACLES: Obstacle[] = [
  { x: 1.8, y: 1.2, w: 0.8, h: 0.8, label: "Pallet A", color: "#64748B" },
  { x: 5.2, y: 3.4, w: 0.9, h: 0.9, label: "Charging Dock", color: "#B5230E" },
];
```

---

## 🧪 5. Testing Simulator Modifications

Always verify that simulator modifications do not break Tab completion or production builds:
```bash
npm run test
npm run typecheck
npm run build
```
