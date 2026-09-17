# ROS 2 Jazzy Jalisco for Robotics — Complete Curriculum Roadmap

**Platform:** Redbrick Robotics Academy  
**Target Distribution:** ROS 2 Jazzy Jalisco (LTS 2024–2029)  
**Host Operating System:** Ubuntu 24.04 LTS (Noble Numbat)  
**Reference Robot Platform:** Redbrick Mobile Robot (Raspberry Pi 5 + ESP32 micro-ROS)  
**Curriculum Version:** 2.0.0 (Bilingual English / Thai)

---

## 1. Curriculum Overview & Pedagogical Philosophy

The **ROS 2 Jazzy Jalisco for Robotics** curriculum is designed for university engineering students, robotics researchers, and industrial automation developers.

### The Redbrick 7-Step Mastery Loop:
Every lesson follows a standardized, research-grounded instructional sequence:
1. **Learning Objectives**: 3–4 concrete, observable technical skills.
2. **Concept Foundation**: Deep theoretical explanations with tables, LaTeX kinematics formulas, and architectural diagrams rendered with semantic HTML typography.
3. **Syntax Reference**: Exact CLI grammar or Python/C++ code signatures.
4. **Try It Yourself Examples**: Copyable and runnable code snippets integrated with the interactive terminal simulator.
5. **Interactive Simulation Lab**: Real-time experimentation using the **2D Mobile Robot Simulator** and the **ROS 2 Computational Graph Simulator**.
6. **Common Mistakes & Solutions**: Practical triage of frequent real-world pitfalls.
7. **Hands-on Exercise & Concept Quiz**: Immediate knowledge reinforcement with automated command validation and multiple-choice quizzes.

---

## 2. Complete Module & Lesson Breakdown

```
ROS 2 Jazzy Jalisco Curriculum (11 Modules / 11 Core Lessons)
├── Module 01: ROS 2 Architecture & DDS [01-introduction]
├── Module 02: Installation & Environment Setup [02-installation]
├── Module 03: ROS 2 CLI & System Introspection [03-cli]
├── Module 04: Workspaces, colcon & Overlays [04-workspace]
├── Module 05: Writing Nodes in Python with rclpy [05-nodes]
├── Module 06: Topics, Publishers & Subscribers [06-topics]
├── Module 07: Services & Synchronous RPC [07-services]
├── Module 08: Actions & Goal Execution with Nav2 [08-actions]
├── Module 09: Parameters & Dynamic Reconfiguration [09-parameters]
├── Module 10: ROS 2 Launch Files in Python [10-launch]
└── Module 11: Gazebo Harmonic Simulation & ros_gz [11-gazebo-harmonic]
```

---

### Module 01: ROS 2 Architecture & DDS
- **Lesson ID:** `ros2-01` | **Slug:** `01-introduction` | **Duration:** 20 min
- **Core Topics:**
  - Paradigm shift: Elimination of centralized `roscore` single point of failure.
  - Data Distribution Service (DDS) peer-to-peer discovery over UDP multicast.
  - Tier-1 RMW implementations in Jazzy: Fast DDS (`rmw_fastrtps_cpp`) & Cyclone DDS (`rmw_cyclonedds_cpp`).
  - Network segmentation in shared environments using `ROS_DOMAIN_ID` (0–101).
  - Real-time computing facts: Linux preemptible generic kernel vs. Ubuntu Pro Real-Time kernel with PREEMPT_RT (`linux-image-realtime`).
- **Hands-on Exercise:** Check active ROS 2 distribution version via `ros2 version`.

---

### Module 02: Installation & Environment Setup
- **Lesson ID:** `ros2-02` | **Slug:** `02-installation` | **Duration:** 25 min
- **Core Topics:**
  - Official APT repository configuration on Ubuntu 24.04 LTS (Noble Numbat).
  - GPG keyring management: `/usr/share/keyrings/ros-archive-keyring.gpg`.
  - Workstation vs. Robot Base installation: `ros-jazzy-desktop` vs. `ros-jazzy-ros-base`.
  - Environment sourcing in `~/.bashrc`: `source /opt/ros/jazzy/setup.bash`.
- **Hands-on Exercise:** Source ROS 2 underlay environment.

---

### Module 03: ROS 2 CLI & System Introspection
- **Lesson ID:** `ros2-03` | **Slug:** `03-cli` | **Duration:** 25 min
- **Core Topics:**
  - Unified verb-subverb command grammar (`ros2 <verb> <subverb>`).
  - Node introspection: `ros2 node list`, `ros2 node info <node_name>`.
  - Topic telemetry inspection: `ros2 topic list -t`, `ros2 topic echo /scan`.
  - Sensor rate verification in Hertz: `ros2 topic hz /scan`.
  - Service, parameter, and action command verbs.
- **Hands-on Exercise:** Inspect registered topic list using `ros2 topic list`.

---

### Module 04: Workspaces, colcon & Overlays
- **Lesson ID:** `ros2-04` | **Slug:** `04-workspace` | **Duration:** 20 min
- **Core Topics:**
  - Standard directory anatomy: `src/`, `build/`, `install/`, `log/`.
  - Underlay (`/opt/ros/jazzy`) vs. Overlay (`~/ros2_ws`).
  - Package creation: `ros2 pkg create --build-type ament_python redbrick_controller --dependencies rclpy geometry_msgs sensor_msgs`.
  - Fast development flag: `colcon build --symlink-install` for instant Python iterations.
  - Overlay registration: `source install/setup.bash`.
- **Hands-on Exercise:** Build packages using `colcon build --symlink-install`.

---

### Module 05: Writing Nodes in Python (rclpy)
- **Lesson ID:** `ros2-05` | **Slug:** `05-nodes` | **Duration:** 30 min
- **Core Topics:**
  - Node architecture: Single-purpose modular processes.
  - Object-oriented Python node development inheriting from `rclpy.node.Node`.
  - Timer creation: `self.create_timer(timer_period, callback)`.
  - Structured logging: `self.get_logger().info()` vs `print()`.
  - Event loop executors and spin lifecycle: `rclpy.spin(node)`.
- **Hands-on Exercise:** Run demo talker node via `ros2 run demo_nodes_cpp talker`.

---

### Module 06: Topics, Publishers & Subscribers
- **Lesson ID:** `ros2-06` | **Slug:** `06-topics` | **Duration:** 30 min
- **Core Topics:**
  - Asynchronous, decoupled many-to-many communication model.
  - Universal mobile robot velocity interface: `/cmd_vel` (`geometry_msgs/msg/Twist`).
  - 2D planar LiDAR distance streaming: `/scan` (`sensor_msgs/msg/LaserScan`).
  - Wheel encoder odometry: `/odom` (`nav_msgs/msg/Odometry`).
  - Quality of Service (QoS) tuning: Best Effort (Sensor Data) vs. Reliable.
- **Hands-on Exercise & Lab:** `ROS 2 Lab 01 — Publisher & Subscriber Introspection`.

---

### Module 07: Services, Clients & Synchronous Calls
- **Lesson ID:** `ros2-07` | **Slug:** `07-services` | **Duration:** 25 min
- **Core Topics:**
  - Bidirectional Request/Response pattern (Remote Procedure Call).
  - When to use Services vs Topics.
  - Standard service interface definitions (`.srv`).
  - Practical robotics services: `/reset_odometry` (`std_srvs/srv/Trigger`), `/calibrate_imu`.
  - CLI invocation: `ros2 service call /reset_odometry std_srvs/srv/Trigger "{}"`.
  - Python implementation of Service Servers and async Service Clients.
- **Hands-on Exercise:** Trigger odometry reset service via CLI.

---

### Module 08: Actions, Goals & Feedback (Nav2)
- **Lesson ID:** `ros2-08` | **Slug:** `08-actions` | **Duration:** 30 min
- **Core Topics:**
  - Long-running preemptible tasks with progress feedback.
  - Action interface definition (`.action`): Goal, Result, and Feedback.
  - Under-the-hood architecture: 2 Services (Goal, Cancel) + 3 Topics (Feedback, Status, Result).
  - Autonomous navigation with Nav2: `nav2_msgs/action/NavigateToPose`.
  - CLI command: `ros2 action send_goal /navigate_to_pose ... --feedback`.
- **Hands-on Exercise:** List all active action servers using `ros2 action list`.

---

### Module 09: Parameters & Dynamic Reconfiguration
- **Lesson ID:** `ros2-09` | **Slug:** `09-parameters` | **Duration:** 25 min
- **Core Topics:**
  - Node parameters for dynamic behavior tuning without recompilation.
  - Declaring and reading parameters: `self.declare_parameter()` and `self.get_parameter()`.
  - Dynamic parameter callbacks (`add_on_set_parameters_callback`).
  - CLI verbs: `ros2 param list`, `ros2 param get`, `ros2 param set`, `ros2 param dump`.
  - Exporting and loading parameter files via YAML.
- **Hands-on Exercise:** Dynamically update `max_speed` parameter on controller node.

---

### Module 10: ROS 2 Launch Files in Python
- **Lesson ID:** `ros2-10` | **Slug:** `10-launch` | **Duration:** 30 min
- **Core Topics:**
  - Multi-node system orchestration and startup lifecycle.
  - Writing Python launch files (`.launch.py`) with `launch` and `launch_ros`.
  - Declaring Node actions with parameters, namespaces, and output redirection.
  - Topic remapping: `remappings=[('/cmd_vel', '/diff_drive/cmd_vel')]`.
  - Systemd service integration for autonomous robot boot.
- **Hands-on Exercise:** Start complete robot bringup using `ros2 launch`.

---

### Module 11: Gazebo Harmonic Simulation & ros_gz
- **Lesson ID:** `ros2-11` | **Slug:** `11-gazebo-harmonic` | **Duration:** 35 min
- **Core Topics:**
  - Modern simulation in ROS 2 Jazzy: **Gazebo Harmonic (GZ Harmonic)**.
  - Official deprecation of Gazebo Classic 11 (`gazebo_ros`).
  - Launching Gazebo worlds: `ros2 launch ros_gz_sim gz_sim.launch.py`.
  - Bridging topics between ROS 2 and Gazebo with `ros_gz_bridge parameter_bridge`:
    ```bash
    ros2 run ros_gz_bridge parameter_bridge /cmd_vel@geometry_msgs/msg/Twist@gz.msgs.Twist
    ```
  - Digital Twin validation of differential-drive kinematics and obstacle avoidance before physical deployment.
- **Hands-on Exercise:** Bridge velocity command topic to Gazebo Harmonic.

---

## 3. Hardware Architecture: Redbrick Mobile Robot

The reference platform throughout this curriculum is the **Redbrick Mobile Robot**:

```
+-------------------------------------------------------------------------------+
|                       REDBRICK MOBILE ROBOT HARDWARE STACK                     |
+-------------------------------------------------------------------------------+
| 1. High-Level Compute: Raspberry Pi 5 (8GB)                                   |
|    - OS: Ubuntu 24.04 LTS Server                                              |
|    - Middleware: ROS 2 Jazzy Jalisco                                          |
|    - Primary Nodes:                                                           |
|        /lidar_node      (RPLiDAR A1 360° laser rangefinder at 10 Hz)          |
|        /camera_node     (V4L2 60° FOV front camera at 30 FPS)                 |
|        /robot_controller(Differential-drive velocity converter)               |
|        /nav2_stack      (Autonomous navigation, costmaps, and behavior trees) |
+-------------------------------------------------------------------------------+
| 2. Low-Level Control: ESP32 Microcontroller                                   |
|    - Framework: micro-ROS (eProsima Client)                                   |
|    - Communication: Serial UART/USB to Raspberry Pi 5                         |
|    - Actuators: 2x 12V DC Gear Motors with high-resolution magnetic encoders  |
|    - Closed-Loop Controller: 100 Hz PID velocity control loop                 |
|    - Feedback: Computes dead-reckoning odometry and publishes to /odom        |
+-------------------------------------------------------------------------------+
```

---

## 4. Interactive Simulation Suite

The learning platform includes two deeply integrated, responsive simulator components:

### 4.1 Redbrick 2D Mobile Robot Simulator (`MobileRobotSimulator.tsx`)
- **Kinematics Engine**: Continuous differential-drive integration at 60 FPS:
  $$\frac{dx}{dt} = v \cos\theta, \quad \frac{dy}{dt} = v \sin\theta, \quad \frac{d\theta}{dt} = \omega$$
- **LiDAR Simulation**: 36-ray ray casting over 360° with collision detection against obstacles and arena walls.
- **Camera Simulation**: 60° field-of-view visual frustum with target marker detection.
- **Control Modes**:
  - *Manual Teleop*: On-screen D-pad and keyboard (<kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> / Arrow keys).
  - *LiDAR Avoidance*: Autonomous obstacle avoidance reacting to front distance drops below 0.65m.
  - *Square Patrol*: Periodic forward and 90° heading turns.
- **Live ROS 2 Telemetry**: Real-time YAML inspect tabs for `/cmd_vel`, `/odom`, `/scan`, and `/camera/detected`.

### 4.2 ROS 2 Computational Graph Simulator (`ROSGraph.tsx`)
- **Architecture Visualization**: Interactive graph inspired by `rqt_graph`.
- **Educational Inspector**: Displays node types, publisher topics, subscriber topics, and real-time payload previews.
- **UX Features**: Pan, Zoom In/Out, Reset View, and wide 24px hitboxes for accessible selection.
