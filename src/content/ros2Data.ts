import { CourseData, LessonContent } from "@/types/course";

export const ROS2_COURSE: CourseData = {
  "id": "ros2-jazzy",
  "title": "ROS 2 Jazzy Jalisco for Robotics",
  "tagline": "Build production autonomous robots with Ubuntu 24.04 LTS & ROS 2 Jazzy",
  "description": "The complete, official guide to modern robot software architecture. Master DDS middleware, Python rclpy nodes, publishers/subscribers, services, actions, parameters, Python launch systems, and Gazebo Harmonic simulation on Ubuntu 24.04.",
  "targetAudience": "Robotics Engineers, Students, Software Developers & Researchers",
  "badge": "Ubuntu 24.04 LTS • Official Jazzy Standard",
  "iconName": "Cpu",
  "accentColor": "#B5230E",
  "totalModules": 11,
  "totalLessons": 11,
  "estimatedHours": 18,
  "modules": [
    {
      "id": "ros2-mod-1",
      "number": 1,
      "title": "ROS 2 Architecture & DDS",
      "description": "Decentralized peer-to-peer DDS middleware, ROS_DOMAIN_ID, and real-time computing.",
      "lessons": [
        {
          "id": "ros2-01",
          "slug": "01-introduction",
          "title": "01. What is ROS 2 & Architecture (DDS)",
          "durationMinutes": 20
        }
      ]
    },
    {
      "id": "ros2-mod-2",
      "number": 2,
      "title": "Installation & Environment Setup",
      "description": "Official APT installation on Ubuntu 24.04 LTS (Noble Numbat).",
      "lessons": [
        {
          "id": "ros2-02",
          "slug": "02-installation",
          "title": "02. ROS 2 Jazzy Installation on Ubuntu 24.04",
          "durationMinutes": 25
        }
      ]
    },
    {
      "id": "ros2-mod-3",
      "number": 3,
      "title": "ROS 2 CLI & Introspection",
      "description": "Inspecting nodes, topics, services, parameters, and action servers via CLI.",
      "lessons": [
        {
          "id": "ros2-03",
          "slug": "03-cli",
          "title": "03. ROS 2 CLI & Environment Introspection",
          "durationMinutes": 25
        }
      ]
    },
    {
      "id": "ros2-mod-4",
      "number": 4,
      "title": "Workspaces & Colcon Build",
      "description": "Managing packages, dependencies, overlays, and symlink builds.",
      "lessons": [
        {
          "id": "ros2-04",
          "slug": "04-workspace",
          "title": "04. Workspaces, colcon & Overlays",
          "durationMinutes": 20
        }
      ]
    },
    {
      "id": "ros2-mod-5",
      "number": 5,
      "title": "Nodes & Python Programming",
      "description": "Writing object-oriented Python nodes with rclpy and executors.",
      "lessons": [
        {
          "id": "ros2-05",
          "slug": "05-nodes",
          "title": "05. Writing ROS 2 Nodes in Python (rclpy)",
          "durationMinutes": 30
        }
      ]
    },
    {
      "id": "ros2-mod-6",
      "number": 6,
      "title": "Topics & Asynchronous Communication",
      "description": "Publisher/Subscriber architecture, message definitions, and QoS.",
      "lessons": [
        {
          "id": "ros2-06",
          "slug": "06-topics",
          "title": "06. Topics, Publishers & Subscribers",
          "durationMinutes": 30
        }
      ]
    },
    {
      "id": "ros2-mod-7",
      "number": 7,
      "title": "Services & Synchronous Communication",
      "description": "Client/Server request-response transactions for hardware calibration and control.",
      "lessons": [
        {
          "id": "ros2-07",
          "slug": "07-services",
          "title": "07. Services, Clients & Synchronous Calls",
          "durationMinutes": 25
        }
      ]
    },
    {
      "id": "ros2-mod-8",
      "number": 8,
      "title": "Actions & Long-Running Tasks",
      "description": "Preemptible goals with periodic feedback and final result for robot navigation.",
      "lessons": [
        {
          "id": "ros2-08",
          "slug": "08-actions",
          "title": "08. Actions, Goals & Feedback (Nav2)",
          "durationMinutes": 30
        }
      ]
    },
    {
      "id": "ros2-mod-9",
      "number": 9,
      "title": "Parameters & Dynamic Tuning",
      "description": "Dynamic parameter configuration and YAML tuning for robot controllers.",
      "lessons": [
        {
          "id": "ros2-09",
          "slug": "09-parameters",
          "title": "09. Parameters & Dynamic Reconfiguration",
          "durationMinutes": 25
        }
      ]
    },
    {
      "id": "ros2-mod-10",
      "number": 10,
      "title": "ROS 2 Launch System",
      "description": "Orchestrating multi-node robot pipelines using Python launch files.",
      "lessons": [
        {
          "id": "ros2-10",
          "slug": "10-launch",
          "title": "10. ROS 2 Launch Files in Python",
          "durationMinutes": 30
        }
      ]
    },
    {
      "id": "ros2-mod-11",
      "number": 11,
      "title": "Simulation with Gazebo Harmonic",
      "description": "Simulating mobile robots in Gazebo Harmonic with ros_gz bridge on Ubuntu 24.04.",
      "lessons": [
        {
          "id": "ros2-11",
          "slug": "11-gazebo-harmonic",
          "title": "11. Gazebo Harmonic Simulation (ros_gz)",
          "durationMinutes": 35
        }
      ]
    }
  ]
};

export const ROS2_LESSONS: Record<string, LessonContent> = {
  "01-introduction": {
    "id": "ros2-01",
    "slug": "01-introduction",
    "title": "What is ROS 2 & Architecture (DDS & ROS_DOMAIN_ID)",
    "courseId": "ros2-jazzy",
    "moduleNumber": 1,
    "moduleTitle": "ROS 2 Architecture & DDS",
    "order": 1,
    "durationMinutes": 20,
    "difficulty": "Beginner",
    "learningObjectives": [
      "Understand what ROS 2 is and how it differs from ROS 1 (No roscore single point of failure).",
      "Understand the DDS (Data Distribution Service) decentralized middleware foundation.",
      "Learn the function of ROS_DOMAIN_ID to isolate robot network traffic in shared labs.",
      "Understand real-time guarantees: Ubuntu 24.04 standard kernel vs PREEMPT_RT patch."
    ],
    "concept": "The **Robot Operating System 2 (ROS 2)** is the industry-standard framework for building production-grade autonomous robots.\nDespite the name, ROS 2 is not a standalone OS like Ubuntu; it is a **distributed robotics middleware and ecosystem** that executes on top of Linux.\n\n### Key Architectural Shifts: ROS 1 vs. ROS 2 Jazzy\n| Architecture Feature | ROS 1 (Legacy / EOL) | ROS 2 Jazzy (Ubuntu 24.04 LTS) |\n| :--- | :--- | :--- |\n| **Discovery Mechanism** | Centralized Master (`roscore`) | **Decentralized Peer-to-Peer (DDS)** |\n| **Fault Tolerance** | Master crash halts all communications | **No single point of failure; dynamic re-discovery** |\n| **Real-Time Execution** | No native POSIX real-time support | **POSIX Real-time (PREEMPT_RT kernel support)** |\n| **Network Security** | Unencrypted plaintext sockets | **DDS-Security (SROS 2) with TLS & Access Control** |\n| **Multi-Robot Fleets** | Fragile multi-master bridges | **Native isolation via `ROS_DOMAIN_ID`** |\n\n### Data Distribution Service (DDS) & RMW\nROS 2 uses DDS (an Object Management Group standard) for dynamic discovery and serialization.\nThe default DDS implementation in ROS 2 Jazzy is **eProsima Fast DDS** (`rmw_fastrtps_cpp`), with tier-1 support for **Eclipse Cyclone DDS** (`rmw_cyclonedds_cpp`). You can switch middleware at runtime using the environment variable:\n```bash\nexport RMW_IMPLEMENTATION=rmw_cyclonedds_cpp\n```\n\n### Real-Time Computing: Standard Kernel vs. PREEMPT_RT\nUbuntu 24.04 LTS includes a standard preemptible generic Linux kernel (`PREEMPT_DYNAMIC`). While suitable for high-level SLAM and planning, true hard real-time determinism (e.g. 1 kHz motor control loops with sub-millisecond jitter) requires the **Linux Real-Time (PREEMPT_RT) kernel patch**, available via Ubuntu Pro (`linux-image-realtime`).\n\n### Fleet Network Segmentation with `ROS_DOMAIN_ID`\nBy default, ROS 2 nodes on the same local subnet discover each other automatically over UDP multicast.\nIf multiple robots share the same Wi-Fi, their topics will cross-talk and cause accidental collisions!\nSetting `export ROS_DOMAIN_ID=42` restricts discovery to a dedicated domain index (recommended range: 0–101), ensuring full radio silence between student groups or warehouse AMRs.",
    "syntax": "export ROS_DOMAIN_ID=42\nexport RMW_IMPLEMENTATION=rmw_fastrtps_cpp\nros2 doctor",
    "syntaxExplanation": "Set ROS_DOMAIN_ID and optional RMW implementation in your ~/.bashrc file to guarantee network isolation.",
    "examples": [
      {
        "title": "Configure Robot Network Domain ID",
        "language": "bash",
        "code": "export ROS_DOMAIN_ID=42\necho \"Active ROS 2 Domain ID: $ROS_DOMAIN_ID\"",
        "explanation": "Isolates the DDS discovery layer to domain 42.",
        "output": "Active ROS 2 Domain ID: 42"
      },
      {
        "title": "Verify ROS 2 Environment Health",
        "language": "bash",
        "code": "ros2 doctor --report",
        "explanation": "Inspects network interfaces, active RMW middleware, and configuration warnings.",
        "output": "All 4 checks passed\nSUCCESS: ROS 2 installation is healthy."
      }
    ],
    "roboticsContext": {
      "title": "Redbrick Mobile Robot Architecture (Raspberry Pi 5 + ESP32)",
      "description": "The Redbrick Mobile Robot utilizes a two-tier compute architecture: a Raspberry Pi 5 running Ubuntu 24.04 LTS and ROS 2 Jazzy acts as the high-level brain (LiDAR SLAM, camera AI, and Nav2 navigation), while an ESP32 microcontroller running micro-ROS executes high-frequency PID motor control and wheel encoder odometry.",
      "diagram": "+---------------------------------------------------+\n|       Redbrick Mobile Robot (Differential Drive)  |\n|                                                   |\n|  [High-Level Brain: Raspberry Pi 5 - Ubuntu 24.04]|\n|    - ROS 2 Jazzy nodes: /lidar_node, /camera_node |\n|    - Navigation: Nav2, Costmaps, Behavior Trees   |\n|               | (/cmd_vel via UART/USB)           |\n|               v                                   |\n|  [Low-Level Controller: ESP32 micro-ROS]          |\n|    - Real-time PWM motor drivers                  |\n|    - Wheel optical encoders -> /odom feedback     |\n+---------------------------------------------------+"
    },
    "commonMistakes": [
      {
        "mistake": "Attempting to execute 'roscore' in ROS 2.",
        "solution": "There is NO 'roscore' in ROS 2! Nodes communicate peer-to-peer over DDS without a centralized server."
      },
      {
        "mistake": "Using conflicting or missing ROS_DOMAIN_ID between the robot and your control workstation.",
        "solution": "Both the physical robot (e.g. Raspberry Pi 5) and your remote development PC must export the exact same ROS_DOMAIN_ID."
      }
    ],
    "exercise": {
      "instruction": "Check the active ROS 2 distribution version using 'ros2 version'.",
      "initialCommand": "ros2 ",
      "targetCommand": "ros2 version",
      "hint": "Type 'ros2 version'.",
      "explanation": "ros2 version outputs the active distribution (jazzy)."
    },
    "quiz": [
      {
        "id": "q-ros-arch-1",
        "type": "single",
        "question": "Does ROS 2 Jazzy require running 'roscore' as a central master process?",
        "options": [
          {
            "id": "a",
            "text": "Yes, it must run in a background terminal"
          },
          {
            "id": "b",
            "text": "No, ROS 2 uses decentralized peer-to-peer DDS discovery"
          },
          {
            "id": "c",
            "text": "Only when running Python nodes"
          },
          {
            "id": "d",
            "text": "Only when multiple robots are connected"
          }
        ],
        "correctAnswer": "b",
        "explanation": "ROS 2 completely eliminates roscore. Nodes discover each other automatically across DDS multicast."
      },
      {
        "id": "q-ros-arch-2",
        "type": "single",
        "question": "Why is ROS_DOMAIN_ID essential in classroom and laboratory robotics setups?",
        "options": [
          {
            "id": "a",
            "text": "It accelerates C++ compiler speed"
          },
          {
            "id": "b",
            "text": "It isolates DDS traffic so robots do not receive commands from other teams"
          },
          {
            "id": "c",
            "text": "It is required for Ubuntu licensing"
          },
          {
            "id": "d",
            "text": "It configures battery charging rate"
          }
        ],
        "correctAnswer": "b",
        "explanation": "ROS_DOMAIN_ID partitions DDS multicast discovery, preventing robots from cross-talking on shared networks."
      }
    ],
    "nextLesson": {
      "title": "02. Installation on Ubuntu 24.04",
      "slug": "02-installation"
    }
  },
  "02-installation": {
    "id": "ros2-02",
    "slug": "02-installation",
    "title": "ROS 2 Jazzy Installation on Ubuntu 24.04 LTS",
    "courseId": "ros2-jazzy",
    "moduleNumber": 2,
    "moduleTitle": "Installation & Environment Setup",
    "order": 2,
    "durationMinutes": 25,
    "difficulty": "Beginner",
    "learningObjectives": [
      "Add the official ROS 2 Jazzy APT repository keys on Ubuntu 24.04 (Noble Numbat).",
      "Understand the difference between 'ros-jazzy-desktop' and 'ros-jazzy-ros-base'.",
      "Configure environment sourcing in '~/.bashrc' for automatic shell initialization."
    ],
    "concept": "ROS 2 Jazzy Jalisco is the official Long-Term Support (LTS) release paired with **Ubuntu 24.04 LTS (Noble Numbat)**, supported with security updates and bug fixes through May 2029.\n\n### Step-by-Step Official APT Installation Workflow:\n1. **Verify UTF-8 System Locale**:\n```bash\nlocale  # Confirm UTF-8 is active (e.g. en_US.UTF-8)\n```\n2. **Add Official ROS 2 GPG Archive Key**:\n```bash\nsudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg\n```\n3. **Add Official Repository to Sources List**:\n```bash\necho \"deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main\" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null\n```\n4. **Install Packages**:\n- For development workstations:\n```bash\nsudo apt update && sudo apt install -y ros-jazzy-desktop\n```\n- For headless onboard computers (e.g. Raspberry Pi 5):\n```bash\nsudo apt update && sudo apt install -y ros-jazzy-ros-base\n```\n5. **Auto-Source in ~/.bashrc**:\n```bash\necho \"source /opt/ros/jazzy/setup.bash\" >> ~/.bashrc\nsource ~/.bashrc\n```",
    "syntax": "source /opt/ros/jazzy/setup.bash",
    "syntaxExplanation": "Loads ROS 2 Jazzy binary executables, Python rclpy libraries, and CLI tools into your active shell session.",
    "examples": [
      {
        "title": "Source ROS 2 Jazzy Environment",
        "language": "bash",
        "code": "source /opt/ros/jazzy/setup.bash",
        "explanation": "Loads the core ROS 2 underlay environment.",
        "output": "[ROS2] Environment sourced: /opt/ros/jazzy/setup.bash"
      }
    ],
    "roboticsContext": {
      "title": "Desktop vs. Base Package Selection on Embedded Robots",
      "description": "On your development PC with external monitors, install 'ros-jazzy-desktop' to include RViz2, rqt visualization tools, and Gazebo integration. On an embedded robot like the Redbrick Mobile Robot (Raspberry Pi 5), install 'ros-jazzy-ros-base' to minimize RAM usage, storage overhead, and boot latency."
    },
    "commonMistakes": [
      {
        "mistake": "Attempting to install 'ros-humble-*' on Ubuntu 24.04.",
        "solution": "Ubuntu 24.04 Noble Numbat is paired exclusively with ROS 2 Jazzy. Humble is for Ubuntu 22.04."
      },
      {
        "mistake": "Opening a new terminal window and getting 'ros2: command not found'.",
        "solution": "Ensure 'source /opt/ros/jazzy/setup.bash' is present in your ~/.bashrc file."
      }
    ],
    "exercise": {
      "instruction": "Source the ROS 2 Jazzy setup file using 'source /opt/ros/jazzy/setup.bash'.",
      "initialCommand": "source ",
      "targetCommand": "source /opt/ros/jazzy/setup.bash",
      "hint": "Type 'source /opt/ros/jazzy/setup.bash'.",
      "explanation": "Sourcing setup.bash exports PATH and PYTHONPATH for ROS 2 tools."
    },
    "quiz": [
      {
        "id": "q-inst-1",
        "type": "single",
        "question": "Which meta-package is recommended for headless embedded robots like Raspberry Pi 5?",
        "options": [
          {
            "id": "a",
            "text": "ros-jazzy-desktop"
          },
          {
            "id": "b",
            "text": "ros-jazzy-ros-base"
          },
          {
            "id": "c",
            "text": "ros-jazzy-full-gui"
          },
          {
            "id": "d",
            "text": "ros-jazzy-simulator"
          }
        ],
        "correctAnswer": "b",
        "explanation": "ros-jazzy-ros-base contains core communication libraries without heavyweight graphical dependencies like RViz2."
      }
    ],
    "prevLesson": {
      "title": "01. Architecture & DDS",
      "slug": "01-introduction"
    },
    "nextLesson": {
      "title": "03. ROS 2 CLI",
      "slug": "03-cli"
    }
  },
  "03-cli": {
    "id": "ros2-03",
    "slug": "03-cli",
    "title": "ROS 2 CLI & Environment Introspection",
    "courseId": "ros2-jazzy",
    "moduleNumber": 3,
    "moduleTitle": "ROS 2 CLI & Introspection",
    "order": 3,
    "durationMinutes": 25,
    "difficulty": "Beginner",
    "learningObjectives": [
      "Use 'ros2 node list' and 'ros2 node info' to explore active robot processes.",
      "Use 'ros2 topic list -t' and 'ros2 topic echo' to inspect live sensor feeds.",
      "Verify sensor health and scanning rates with 'ros2 topic hz'.",
      "Inspect services, parameters, and action servers using the unified CLI."
    ],
    "concept": "The **`ros2` CLI** is the primary tool for testing, debugging, and inspecting autonomous robots.\nWithout opening source code, you can monitor sensor streams, observe actuator commands, and verify system performance in real-time.\n\n### Core Command Verbs:\n- **`ros2 node list`**: Lists all active computation nodes in the graph.\n- **`ros2 node info <node>`**: Displays subscribers, publishers, services, and action servers owned by a specific node.\n- **`ros2 topic list -t`**: Lists all active topic channels along with their exact message signatures.\n- **`ros2 topic echo /scan`**: Prints live data points from the LiDAR sensor in readable YAML format.\n- **`ros2 topic hz /scan`**: Measures the publishing frequency in Hertz (critical for checking if sensors match rated specs).\n- **`ros2 service list`**: Displays request/response endpoints (e.g. odometry reset, calibration).\n- **`ros2 param list`**: Lists configurable parameters across all nodes.\n- **`ros2 action list`**: Lists long-running action goals (e.g. Nav2 navigation).",
    "syntax": "ros2 <verb> <subverb> [arguments]",
    "syntaxExplanation": "All ROS 2 CLI tools follow a consistent verb-subverb grammar (e.g. 'ros2 topic list', 'ros2 node info').",
    "examples": [
      {
        "title": "List All Active Robot Nodes",
        "language": "bash",
        "code": "ros2 node list",
        "explanation": "Queries the DDS graph and lists active processes.",
        "output": "/camera_node\n/lidar_node\n/robot_controller\n/base_motors"
      },
      {
        "title": "Inspect Topics with Message Types",
        "language": "bash",
        "code": "ros2 topic list -t",
        "explanation": "Outputs topics and their associated message types.",
        "output": "/cmd_vel [geometry_msgs/msg/Twist]\n/scan [sensor_msgs/msg/LaserScan]\n/odom [nav_msgs/msg/Odometry]"
      },
      {
        "title": "Measure LiDAR Sensor Frequency",
        "language": "bash",
        "code": "ros2 topic hz /scan",
        "explanation": "Measures continuous publishing frequency.",
        "output": "average rate: 10.024\n  min: 0.098s max: 0.102s std dev: 0.0012s window: 10"
      }
    ],
    "roboticsContext": {
      "title": "Rapid Hardware Diagnostics via CLI",
      "description": "When an autonomous robot refuses to move, an engineer's first step is running 'ros2 topic hz /scan'. If the rate is 0.0 Hz, the physical USB cable to the RPLiDAR is disconnected or serial permissions (/dev/ttyUSB0) are missing. If it reports 10.0 Hz, the sensor driver is healthy!"
    },
    "commonMistakes": [
      {
        "mistake": "Running legacy ROS 1 syntax like 'rostopic list' or 'rosnode list'.",
        "solution": "All ROS 2 commands begin with 'ros2 <verb>', e.g. 'ros2 topic list' and 'ros2 node list'."
      }
    ],
    "exercise": {
      "instruction": "List all active topics in the system using the ROS 2 CLI.",
      "initialCommand": "ros2 ",
      "targetCommand": [
        "ros2 topic list",
        "ros2 topic list -t"
      ],
      "hint": "Type 'ros2 topic list'.",
      "explanation": "ros2 topic list returns all currently registered topics."
    },
    "quiz": [
      {
        "id": "q-cli-1",
        "type": "single",
        "question": "Which command measures the publishing frequency of a topic in Hertz (Hz)?",
        "options": [
          {
            "id": "a",
            "text": "ros2 topic hz <topic_name>"
          },
          {
            "id": "b",
            "text": "ros2 topic speed <topic_name>"
          },
          {
            "id": "c",
            "text": "ros2 topic ping <topic_name>"
          },
          {
            "id": "d",
            "text": "ros2 topic test <topic_name>"
          }
        ],
        "correctAnswer": "a",
        "explanation": "ros2 topic hz calculates moving-window publishing frequency, latency intervals, and standard deviation."
      }
    ],
    "prevLesson": {
      "title": "02. Installation",
      "slug": "02-installation"
    },
    "nextLesson": {
      "title": "04. Workspaces & colcon",
      "slug": "04-workspace"
    }
  },
  "04-workspace": {
    "id": "ros2-04",
    "slug": "04-workspace",
    "title": "Workspaces, colcon & Overlays",
    "courseId": "ros2-jazzy",
    "moduleNumber": 4,
    "moduleTitle": "Workspaces & Colcon Build",
    "order": 4,
    "durationMinutes": 20,
    "difficulty": "Intermediate",
    "learningObjectives": [
      "Understand the standard ROS 2 workspace directory structure.",
      "Distinguish between the system Underlay (/opt/ros/jazzy) and your Overlay (~/ros2_ws).",
      "Build packages efficiently using 'colcon build --symlink-install'.",
      "Source the local overlay using 'source install/setup.bash'."
    ],
    "concept": "A **ROS 2 Workspace** is a dedicated directory structure where custom robotic software packages are developed, compiled, and installed.\n\n### Standard Workspace Anatomy:\n```\n~/ros2_ws/\n├── src/        <- Put your packages here (e.g. redbrick_controller, my_robot_bringup)\n├── build/      <- Intermediate CMake & Setuptools compilation build objects\n├── install/    <- Final compiled binaries, libraries, and generated environment scripts\n└── log/        <- Build diagnostic logs and warnings\n```\n\n### Underlay vs. Overlay\n- **Underlay**: The global system installation in `/opt/ros/jazzy`, containing core libraries and official ROS packages.\n- **Overlay**: Your personal workspace in `~/ros2_ws`. When you source `~/ros2_ws/install/setup.bash`, packages in your overlay take precedence over system packages with the same name!\n\n### The Essential Flag: `--symlink-install`\nWhen developing Python packages, always build with:\n```bash\ncolcon build --symlink-install\n```\nThis creates symbolic links pointing directly to your Python source files in `src/`. When you modify an algorithm or script, your changes take effect **immediately** without requiring another `colcon build`!",
    "syntax": "colcon build --symlink-install\nsource install/setup.bash",
    "syntaxExplanation": "Always run colcon build from the root of your workspace (~/ros2_ws), then source install/setup.bash.",
    "examples": [
      {
        "title": "Create a New Python Robot Package",
        "language": "bash",
        "code": "cd ~/ros2_ws/src\nros2 pkg create --build-type ament_python redbrick_controller --dependencies rclpy geometry_msgs sensor_msgs",
        "explanation": "Generates a clean ROS 2 Python package template with pre-configured dependencies.",
        "output": "creating folder redbrick_controller\ncreating package.xml\ncreating setup.py\ncreating setup.cfg\npackage created successfully"
      },
      {
        "title": "Build Workspace with Symlink Install",
        "language": "bash",
        "code": "cd ~/ros2_ws\ncolcon build --symlink-install",
        "explanation": "Compiles all packages inside src/ using symlinks for rapid development.",
        "output": "Starting >>> redbrick_controller\nFinished <<< redbrick_controller [1.22s]\nSummary: 1 package finished"
      }
    ],
    "roboticsContext": {
      "title": "Fast Iteration on Embedded Raspberry Pi 5",
      "description": "Compiling software on embedded ARM processors can consume significant CPU time. By utilizing '--symlink-install', modifying a differential-drive velocity limiter algorithm in Python applies instantaneously—just save the code and re-launch the node!"
    },
    "commonMistakes": [
      {
        "mistake": "Running 'colcon build' while located inside the 'src/' subdirectory.",
        "solution": "Always change directory to the root of your workspace (~/ros2_ws) before running colcon build."
      },
      {
        "mistake": "Forgetting to run 'source install/setup.bash' after building a brand new package.",
        "solution": "Your shell cannot locate new package executables until you source the local install/setup.bash."
      }
    ],
    "exercise": {
      "instruction": "Build your workspace packages using 'colcon build --symlink-install'.",
      "initialCommand": "colcon ",
      "targetCommand": [
        "colcon build --symlink-install",
        "colcon build"
      ],
      "hint": "Type 'colcon build --symlink-install'.",
      "explanation": "colcon builds your workspace packages."
    },
    "quiz": [
      {
        "id": "q-ws-1",
        "type": "single",
        "question": "What is the primary benefit of the '--symlink-install' flag during Python node development?",
        "options": [
          {
            "id": "a",
            "text": "It converts Python scripts into encrypted C++ binaries"
          },
          {
            "id": "b",
            "text": "It creates symbolic links so Python edits apply immediately without re-building"
          },
          {
            "id": "c",
            "text": "It runs the robot motor at double speed"
          },
          {
            "id": "d",
            "text": "It bypasses all unit tests"
          }
        ],
        "correctAnswer": "b",
        "explanation": "--symlink-install links source files into install/, eliminating repetitive build steps when modifying Python code."
      }
    ],
    "prevLesson": {
      "title": "03. ROS 2 CLI",
      "slug": "03-cli"
    },
    "nextLesson": {
      "title": "05. Nodes & Python rclpy",
      "slug": "05-nodes"
    }
  },
  "05-nodes": {
    "id": "ros2-05",
    "slug": "05-nodes",
    "title": "Writing ROS 2 Nodes in Python (rclpy)",
    "courseId": "ros2-jazzy",
    "moduleNumber": 5,
    "moduleTitle": "Nodes & Python Programming",
    "order": 5,
    "durationMinutes": 30,
    "difficulty": "Intermediate",
    "learningObjectives": [
      "Understand the Node architecture: modular computational units.",
      "Write an object-oriented Python node inheriting from 'rclpy.node.Node'.",
      "Create periodic timers and understand event executors (rclpy.spin).",
      "Use 'self.get_logger().info()' instead of print() for structured logging."
    ],
    "concept": "A **Node** is a modular, single-purpose software process responsible for one discrete responsibility in the robot.\nFor example, in the Redbrick Mobile Robot, one node reads the RPLiDAR, a second node processes camera frames, and a third node computes differential-drive velocity steering.\n\n### Object-Oriented Node Structure (Best Practice):\n```python\nimport rclpy\nfrom rclpy.node import Node\n\nclass RedbrickHeartbeat(Node):\n    def __init__(self):\n        super().__init__('redbrick_heartbeat')\n        self.get_logger().info('Redbrick Heartbeat Node initialized!')\n        \n        # Periodic timer callback at 2 Hz (every 0.5s)\n        self.counter = 0\n        self.timer = self.create_timer(0.5, self.timer_callback)\n\n    def timer_callback(self):\n        self.counter += 1\n        self.get_logger().info(f'Robot telemetry online. Heartbeat #{self.counter}')\n\ndef main(args=None):\n    rclpy.init(args=args)\n    node = RedbrickHeartbeat()\n    try:\n        rclpy.spin(node)  # Blocks and executes callbacks as events arrive\n    except KeyboardInterrupt:\n        node.get_logger().info('Node interrupted by user.')\n    finally:\n        node.destroy_node()\n        rclpy.shutdown()\n\nif __name__ == '__main__':\n    main()\n```\n\n### Why Inherit from `rclpy.node.Node`?\nObject-oriented inheritance gives your class native access to:\n- `self.create_publisher()`\n- `self.create_subscription()`\n- `self.create_timer()`\n- `self.get_logger().info()`, `warn()`, `error()`",
    "syntax": "ros2 run <package_name> <executable_name>",
    "syntaxExplanation": "Runs an executable node installed within a ROS 2 package.",
    "examples": [
      {
        "title": "Execute Demo Talker Node",
        "language": "bash",
        "code": "ros2 run demo_nodes_cpp talker",
        "explanation": "Launches the official talker demo publisher node.",
        "output": "[INFO] [talker]: Publishing: 'Hello World: 1'\n[INFO] [talker]: Publishing: 'Hello World: 2'"
      }
    ],
    "roboticsContext": {
      "title": "Fault Isolation in Autonomous Vehicles",
      "description": "In an autonomous vehicle, if an AI camera perception node encounters an unhandled exception and crashes, only that individual node terminates. Thanks to modular ROS 2 node boundaries, the emergency braking node and LiDAR collision avoidance node continue running without interruption, keeping the robot safe."
    },
    "commonMistakes": [
      {
        "mistake": "Using standard Python 'print()' instead of 'self.get_logger().info()'.",
        "solution": "get_logger() attaches UTC timestamps, severity levels (INFO, WARN, ERROR), and node names, which are essential for multi-node debugging."
      },
      {
        "mistake": "Forgetting 'rclpy.spin(node)', causing the script to exit immediately after initialization.",
        "solution": "rclpy.spin dispatches events and keeps the node listening for timers and incoming messages."
      }
    ],
    "exercise": {
      "instruction": "Run the demo talker node from the demo_nodes_cpp package using ros2 run.",
      "initialCommand": "ros2 run ",
      "targetCommand": "ros2 run demo_nodes_cpp talker",
      "hint": "Type 'ros2 run demo_nodes_cpp talker'.",
      "explanation": "ros2 run starts compiled binaries from ROS 2 packages."
    },
    "quiz": [
      {
        "id": "q-node-1",
        "type": "single",
        "question": "What is the function of 'rclpy.spin(node)' in a ROS 2 Python program?",
        "options": [
          {
            "id": "a",
            "text": "It spins the physical robot wheels 360 degrees"
          },
          {
            "id": "b",
            "text": "It keeps the node alive and dispatches incoming callbacks and timers in an event loop"
          },
          {
            "id": "c",
            "text": "It compiles the Python code into C++"
          },
          {
            "id": "d",
            "text": "It turns on the robot's front LED"
          }
        ],
        "correctAnswer": "b",
        "explanation": "rclpy.spin is the core event loop dispatcher that processes timers, subscriptions, and service requests."
      }
    ],
    "prevLesson": {
      "title": "04. Workspaces & colcon",
      "slug": "04-workspace"
    },
    "nextLesson": {
      "title": "06. Topics & Pub/Sub",
      "slug": "06-topics"
    }
  },
  "06-topics": {
    "id": "ros2-06",
    "slug": "06-topics",
    "title": "Topics, Publishers & Subscribers",
    "courseId": "ros2-jazzy",
    "moduleNumber": 6,
    "moduleTitle": "Topics & Asynchronous Communication",
    "order": 6,
    "durationMinutes": 30,
    "difficulty": "Intermediate",
    "learningObjectives": [
      "Understand the asynchronous Publisher/Subscriber message bus.",
      "Publish robot velocity commands on '/cmd_vel' using 'geometry_msgs/msg/Twist'.",
      "Subscribe to sensor telemetry on '/scan' and understand Quality of Service (QoS) profiles.",
      "Inspect message fields and verify differential-drive kinematics."
    ],
    "concept": "**Topics** provide unidirectional, asynchronous, many-to-many communication streams between nodes.\nPublishers send data without knowing who receives it, and subscribers receive data without knowing who produced it (**Decoupled Architecture**).\n\n### Standard Robotics Topics:\n- **`/cmd_vel`** (`geometry_msgs/msg/Twist`): Controls mobile robot linear velocities ($v_x, v_y, v_z$) and angular velocities ($\\omega_x, \\omega_y, \\omega_z$). On ground differential-drive robots, only $v_x$ (forward/back) and $\\omega_z$ (steering yaw) are used.\n- **`/scan`** (`sensor_msgs/msg/LaserScan`): 2D planar LiDAR distance readings array.\n- **`/odom`** (`nav_msgs/msg/Odometry`): Dead-reckoning robot pose $(x, y, \theta)$ and twist calculated from wheel encoders.\n\n### Quality of Service (QoS) Profiles:\nROS 2 enables fine-grained tuning of transport reliability over DDS:\n- **Sensor Data (Best Effort)**: For high-rate telemetry like LiDAR (10–30 Hz) or camera frames. Dropping an occasional frame is preferable to delaying real-time execution.\n- **Reliable**: Guarantees delivery through retransmissions (used for mission-critical commands like `/cmd_vel` or emergency stops).",
    "syntax": "ros2 topic pub <topic_name> <msg_type> \"<data>\"",
    "syntaxExplanation": "Publishes a message directly to a topic via the command line for testing.",
    "examples": [
      {
        "title": "Drive Robot Forward at 0.3 m/s via CLI",
        "language": "bash",
        "code": "ros2 topic pub --once /cmd_vel geometry_msgs/msg/Twist \"{linear: {x: 0.3, y: 0.0, z: 0.0}, angular: {x: 0.0, y: 0.0, z: 0.0}}\"",
        "explanation": "Publishes a single Twist velocity packet to command forward motion.",
        "output": "publisher: beginning loop\npublishing #1: geometry_msgs.msg.Twist(linear=geometry_msgs.msg.Vector3(x=0.3, y=0.0, z=0.0), angular=geometry_msgs.msg.Vector3(x=0.0, y=0.0, z=0.0))"
      },
      {
        "title": "Echo Live Odometry Stream",
        "language": "bash",
        "code": "ros2 topic echo /odom",
        "explanation": "Streams live position and velocity telemetry from wheel encoders.",
        "output": "header:\n  frame_id: odom\nchild_frame_id: base_footprint\npose:\n  pose:\n    position: {x: 1.25, y: 0.42, z: 0.0}\n    orientation: {z: 0.0, w: 1.0}"
      }
    ],
    "roboticsContext": {
      "title": "Universal Motion Interface: /cmd_vel",
      "description": "Across industrial warehouse AMRs, inspection rovers, and university research platforms, `/cmd_vel` with `geometry_msgs/msg/Twist` is the universal standard for motion control. Any navigation stack (such as Nav2) commands the robot purely by publishing to `/cmd_vel`."
    },
    "commonMistakes": [
      {
        "mistake": "Setting linear.y on a differential-drive robot.",
        "solution": "Differential-drive robots have non-holonomic constraints and cannot move sideways instantaneously. Only set linear.x and angular.z."
      }
    ],
    "exercise": {
      "instruction": "Echo live telemetry from the /cmd_vel topic to inspect current velocity commands.",
      "initialCommand": "ros2 topic echo ",
      "targetCommand": "ros2 topic echo /cmd_vel",
      "hint": "Type 'ros2 topic echo /cmd_vel'.",
      "explanation": "ros2 topic echo displays live messages published to /cmd_vel."
    },
    "quiz": [
      {
        "id": "q-topic-1",
        "type": "single",
        "question": "Which message type is the standard for mobile robot velocity commands on /cmd_vel?",
        "options": [
          {
            "id": "a",
            "text": "std_msgs/msg/String"
          },
          {
            "id": "b",
            "text": "geometry_msgs/msg/Twist"
          },
          {
            "id": "c",
            "text": "sensor_msgs/msg/Joy"
          },
          {
            "id": "d",
            "text": "nav_msgs/msg/Path"
          }
        ],
        "correctAnswer": "b",
        "explanation": "geometry_msgs/msg/Twist defines 3D linear and 3D angular velocity vectors."
      }
    ],
    "lab": {
      "id": "ros2-lab-01",
      "title": "ROS 2 Lab 01 — Publisher & Subscriber Introspection",
      "description": "Inspect the computational graph, trace data flow from sensor nodes to controller, and verify topic frequencies.",
      "steps": [
        {
          "step": 1,
          "title": "List Active Nodes",
          "instruction": "Discover all active nodes currently running on the robot.",
          "task": "Run 'ros2 node list'.",
          "validationCommand": "ros2 node list",
          "hint": "Type 'ros2 node list'."
        },
        {
          "step": 2,
          "title": "List Topics with Data Types",
          "instruction": "Inspect topic channels and verify their message signatures.",
          "task": "Execute 'ros2 topic list -t'.",
          "validationCommand": [
            "ros2 topic list -t",
            "ros2 topic list"
          ],
          "hint": "Type 'ros2 topic list -t'."
        },
        {
          "step": 3,
          "title": "Echo LiDAR Sensor Stream",
          "instruction": "Inspect the live range array published by the laser scanner.",
          "task": "Run 'ros2 topic echo /scan'.",
          "validationCommand": "ros2 topic echo /scan",
          "hint": "Type 'ros2 topic echo /scan'."
        },
        {
          "step": 4,
          "title": "Verify LiDAR Scanning Frequency",
          "instruction": "Check if the LiDAR is operating at the expected 10 Hz frequency.",
          "task": "Execute 'ros2 topic hz /scan'.",
          "validationCommand": "ros2 topic hz /scan",
          "hint": "Type 'ros2 topic hz /scan'."
        }
      ]
    },
    "prevLesson": {
      "title": "05. Nodes & Python rclpy",
      "slug": "05-nodes"
    },
    "nextLesson": {
      "title": "07. Services & Clients",
      "slug": "07-services"
    }
  },
  "07-services": {
    "id": "ros2-07",
    "slug": "07-services",
    "title": "Services, Clients & Synchronous Calls",
    "courseId": "ros2-jazzy",
    "moduleNumber": 7,
    "moduleTitle": "Services & Synchronous Communication",
    "order": 7,
    "durationMinutes": 25,
    "difficulty": "Intermediate",
    "learningObjectives": [
      "Understand the Client/Server Request-Response pattern in ROS 2.",
      "Distinguish when to use Services vs. Topics in robot software architectures.",
      "Call services via CLI using 'ros2 service call'.",
      "Write Python service servers and asynchronous service clients using rclpy."
    ],
    "concept": "While Topics are designed for continuous unidirectional streaming (e.g. 10 Hz LiDAR ranges or 30 Hz motor velocities), **Services** provide a bidirectional **Request/Response** pattern (Remote Procedure Call / RPC).\n\n### Topics vs. Services:\n| Characteristic | Topics (Pub/Sub) | Services (Client/Server) |\n| :--- | :--- | :--- |\n| **Communication Pattern** | Unidirectional Many-to-Many | Bidirectional One-to-One (Request/Response) |\n| **Timing** | Asynchronous, continuous stream | Synchronous or Async callback transaction |\n| **Confirmation** | Fire-and-forget (no response guarantee) | Explicit response returned upon completion |\n| **Typical Robotics Use** | Sensor data (`/scan`, `/camera`), control (`/cmd_vel`) | Calibration, triggering homing, reset odometry, save map |\n\n### Service Definition Structure (.srv):\nA service is defined by two message definitions separated by three dashes (`---`):\n```\n# example_interfaces/srv/SetBool.srv\nbool data       # Request part\n---\nbool success    # Response part\nstring message\n```\n\n### Common Robotics Services:\n- `/reset_odometry` (`std_srvs/srv/Trigger`): Clears wheel encoder accumulator back to $(0,0,0)$.\n- `/calibrate_imu` (`std_srvs/srv/Trigger`): Zeroes gyroscope drift when robot is stationary.\n- `/toggle_headlights` (`example_interfaces/srv/SetBool`): Turns LED spotlights on/off.",
    "syntax": "ros2 service call <service_name> <service_type> \"<request_data>\"",
    "syntaxExplanation": "Invokes a service request from the command line and waits for the server's response.",
    "examples": [
      {
        "title": "List All Active Services",
        "language": "bash",
        "code": "ros2 service list",
        "explanation": "Lists all available service endpoints in the robot graph.",
        "output": "/reset_odometry\n/calibrate_imu\n/robot_controller/describe_parameters\n/robot_controller/get_parameters"
      },
      {
        "title": "Call Reset Odometry Service via CLI",
        "language": "bash",
        "code": "ros2 service call /reset_odometry std_srvs/srv/Trigger \"{}\"",
        "explanation": "Sends an empty trigger request to reset wheel odometry to origin.",
        "output": "requester: making request: std_srvs.srv.Trigger_Request()\nresponse:\nstd_srvs.srv.Trigger_Response(success=True, message='Odometry successfully reset to (0,0,0)')"
      }
    ],
    "roboticsContext": {
      "title": "Zero-Drift IMU Calibration on Startup",
      "description": "Before initiating SLAM mapping, autonomous mobile robots call a calibration service: `/calibrate_imu`. The IMU driver averages 500 gyroscope samples while the chassis is motionless to calculate biases, preventing angular drift during navigation."
    },
    "commonMistakes": [
      {
        "mistake": "Using a service to send continuous motor speed commands.",
        "solution": "Services block until a response is received, creating latency spikes. Use Topics for continuous streams like /cmd_vel."
      },
      {
        "mistake": "Blocking the main thread inside a service callback in Python.",
        "solution": "Service callbacks should complete quickly (within milliseconds). Long-running operations should be implemented as Actions."
      }
    ],
    "exercise": {
      "instruction": "Call the reset odometry service using 'ros2 service call /reset_odometry std_srvs/srv/Trigger \"{}\"'.",
      "initialCommand": "ros2 service call ",
      "targetCommand": "ros2 service call /reset_odometry std_srvs/srv/Trigger \"{}\"",
      "hint": "Type 'ros2 service call /reset_odometry std_srvs/srv/Trigger \"{}\"'.",
      "explanation": "ros2 service call triggers the service and prints the server response."
    },
    "quiz": [
      {
        "id": "q-srv-1",
        "type": "single",
        "question": "When is a ROS 2 Service preferable over a Topic?",
        "options": [
          {
            "id": "a",
            "text": "When streaming 30 FPS camera video"
          },
          {
            "id": "b",
            "text": "When an immediate confirmation/response is required for an action like resetting odometry"
          },
          {
            "id": "c",
            "text": "When sending continuous /cmd_vel motor commands"
          },
          {
            "id": "d",
            "text": "When broadcasting LiDAR range clouds to multiple subscribers"
          }
        ],
        "correctAnswer": "b",
        "explanation": "Services are designed for discrete request-response transactions requiring confirmed execution."
      }
    ],
    "prevLesson": {
      "title": "06. Topics & Pub/Sub",
      "slug": "06-topics"
    },
    "nextLesson": {
      "title": "08. Actions & Nav2",
      "slug": "08-actions"
    }
  },
  "08-actions": {
    "id": "ros2-08",
    "slug": "08-actions",
    "title": "Actions, Goals & Feedback (Nav2)",
    "courseId": "ros2-jazzy",
    "moduleNumber": 8,
    "moduleTitle": "Actions & Long-Running Tasks",
    "order": 8,
    "durationMinutes": 30,
    "difficulty": "Advanced",
    "learningObjectives": [
      "Understand the Action client/server architecture for long-running robot behaviors.",
      "Understand the 5 components under the hood: Goal, Cancel, Feedback, Status, and Result.",
      "Send goals and monitor live feedback using 'ros2 action send_goal --feedback'.",
      "Learn how Nav2 uses Actions for autonomous waypoint navigation."
    ],
    "concept": "For long-running tasks that can take seconds or minutes to complete (such as navigating across a warehouse, picking an object with a robotic arm, or charging a battery), both Topics and Services are insufficient:\n- Services **block** until completion and cannot report periodic progress.\n- Topics cannot be easily **cancelled** mid-flight by the requester.\n\n**Actions** solve this by combining the strengths of Topics and Services into a complete goal-oriented execution framework.\n\n### The 3 Core Parts of an Action (.action):\n```\n# nav2_msgs/action/NavigateToPose.action\ngeometry_msgs/PoseStamped pose     # 1. Goal: Where to go\n---\nstd_msgs/Empty result               # 2. Result: Final outcome\n---\ngeometry_msgs/PoseStamped current_pose  # 3. Feedback: Real-time progress updates\nfloat32 distance_remaining\n```\n\n### Under-The-Hood Architecture:\nEvery ROS 2 Action is built on top of 2 Services and 3 Topics:\n1. **Goal Service**: Client requests the server to accept the goal.\n2. **Cancel Service**: Client can abort or preempt the goal at any time.\n3. **Feedback Topic**: Server streams live progress (e.g. `distance_remaining: 1.2m`).\n4. **Status Topic**: Broadcasts goal status (`ACCEPTED`, `EXECUTING`, `CANCELED`, `SUCCEEDED`).\n5. **Result Service**: Returns final completion outcome when goal is reached.",
    "syntax": "ros2 action send_goal <action_name> <action_type> \"<goal_data>\" --feedback",
    "syntaxExplanation": "Sends an action goal and prints continuous feedback until execution finishes.",
    "examples": [
      {
        "title": "List All Active Action Servers",
        "language": "bash",
        "code": "ros2 action list",
        "explanation": "Discovers active action servers in the robot graph.",
        "output": "/navigate_to_pose\n/dock_robot\n/follow_waypoints"
      },
      {
        "title": "Send Nav2 Navigation Goal with Live Feedback",
        "language": "bash",
        "code": "ros2 action send_goal /navigate_to_pose nav2_msgs/action/NavigateToPose \"{pose: {header: {frame_id: 'map'}, pose: {position: {x: 2.0, y: 1.5, z: 0.0}, orientation: {w: 1.0}}}}\" --feedback",
        "explanation": "Commands Nav2 to navigate to coordinates (X=2.0, Y=1.5) and streams distance feedback.",
        "output": "Waiting for an action server to become available...\nSending goal:\n  pose: ...\nFeedback:\n  distance_remaining: 2.50\nFeedback:\n  distance_remaining: 1.20\nGoal reached successfully!"
      }
    ],
    "roboticsContext": {
      "title": "Preemptible Obstacle Avoidance in Nav2",
      "description": "If a human suddenly walks in front of the Redbrick Mobile Robot while it is executing a `/navigate_to_pose` action, the safety system can immediately send a Cancel Request to the action server, bringing the robot to a gentle halt without losing its overall mission state."
    },
    "commonMistakes": [
      {
        "mistake": "Using a standard Service for a task that takes 30 seconds to complete.",
        "solution": "Long-running tasks freeze service clients. Always use Actions when progress feedback and cancellation are needed."
      }
    ],
    "exercise": {
      "instruction": "List all active actions in the ROS 2 system using 'ros2 action list'.",
      "initialCommand": "ros2 action ",
      "targetCommand": "ros2 action list",
      "hint": "Type 'ros2 action list'.",
      "explanation": "ros2 action list displays available action endpoints."
    },
    "quiz": [
      {
        "id": "q-act-1",
        "type": "single",
        "question": "What three elements comprise an Action definition in ROS 2?",
        "options": [
          {
            "id": "a",
            "text": "Input, Process, Output"
          },
          {
            "id": "b",
            "text": "Goal, Result, Feedback"
          },
          {
            "id": "c",
            "text": "Topic, Service, Parameter"
          },
          {
            "id": "d",
            "text": "Request, Response, Error"
          }
        ],
        "correctAnswer": "b",
        "explanation": "An action file (.action) defines Goal (requested target), Result (final outcome), and Feedback (periodic progress updates)."
      }
    ],
    "prevLesson": {
      "title": "07. Services & Clients",
      "slug": "07-services"
    },
    "nextLesson": {
      "title": "09. Parameters",
      "slug": "09-parameters"
    }
  },
  "09-parameters": {
    "id": "ros2-09",
    "slug": "09-parameters",
    "title": "Parameters & Dynamic Reconfiguration",
    "courseId": "ros2-jazzy",
    "moduleNumber": 9,
    "moduleTitle": "Parameters & Dynamic Tuning",
    "order": 9,
    "durationMinutes": 25,
    "difficulty": "Intermediate",
    "learningObjectives": [
      "Understand node parameters as configuration settings.",
      "Declare and retrieve parameters in Python with 'declare_parameter' and 'get_parameter'.",
      "Inspect and modify parameters dynamically at runtime using 'ros2 param'.",
      "Save and load parameter configurations via YAML files."
    ],
    "concept": "**Parameters** are configuration values associated with individual nodes. They allow you to tune robot behavior (such as maximum linear speed, wheel track width, PID gains, and camera resolution) **without modifying code or recompiling packages**.\n\n### Declaring and Reading Parameters in Python:\n```python\nimport rclpy\nfrom rclpy.node import Node\n\nclass DifferentialController(Node):\n    def __init__(self):\n        super().__init__('differential_controller')\n        \n        # Declare parameter with default value\n        self.declare_parameter('max_speed', 0.5)  # m/s\n        self.declare_parameter('wheel_separation', 0.28)  # meters\n        \n        # Read parameter value\n        self.max_speed = self.get_parameter('max_speed').value\n        self.get_logger().info(f'Controller initialized with max_speed: {self.max_speed} m/s')\n```\n\n### Dynamic Parameter Reconfiguration:\nParameters can be updated dynamically while the robot is running!\nUsing `self.add_on_set_parameters_callback(self.param_callback)`, your node can validate and adopt new speeds on the fly without restarting.",
    "syntax": "ros2 param set <node_name> <parameter_name> <value>",
    "syntaxExplanation": "Dynamically sets the value of a parameter on an active node.",
    "examples": [
      {
        "title": "List All Parameters for a Running Node",
        "language": "bash",
        "code": "ros2 param list /robot_controller",
        "explanation": "Displays all declared parameters for the robot controller.",
        "output": "/robot_controller:\n  max_speed\n  wheel_separation\n  use_sim_time"
      },
      {
        "title": "Dynamically Adjust Max Speed via CLI",
        "language": "bash",
        "code": "ros2 param set /robot_controller max_speed 0.8",
        "explanation": "Changes max velocity limit to 0.8 m/s in real-time.",
        "output": "Set parameter successful"
      },
      {
        "title": "Dump Node Parameters to YAML File",
        "language": "bash",
        "code": "ros2 param dump /robot_controller",
        "explanation": "Exports current parameters into standard YAML format.",
        "output": "/robot_controller:\n  ros__parameters:\n    max_speed: 0.8\n    wheel_separation: 0.28\n    use_sim_time: false"
      }
    ],
    "roboticsContext": {
      "title": "Tuning Wheel Encoders and PID Gains",
      "description": "When calibrating a newly assembled Redbrick Mobile Robot on different floor textures (carpet vs. smooth tile), engineers tune wheel friction compensation and PID gains dynamically using 'ros2 param set /base_motors kp 1.4' until the robot tracks straight lines with zero deviation."
    },
    "commonMistakes": [
      {
        "mistake": "Attempting to get a parameter with 'self.get_parameter()' before calling 'self.declare_parameter()'.",
        "solution": "In ROS 2, parameters must be explicitly declared before they can be read or modified."
      }
    ],
    "exercise": {
      "instruction": "Set the max_speed parameter on /robot_controller to 0.6 using 'ros2 param set /robot_controller max_speed 0.6'.",
      "initialCommand": "ros2 param set /robot_controller ",
      "targetCommand": "ros2 param set /robot_controller max_speed 0.6",
      "hint": "Type 'ros2 param set /robot_controller max_speed 0.6'.",
      "explanation": "ros2 param set updates the active parameter."
    },
    "quiz": [
      {
        "id": "q-param-1",
        "type": "single",
        "question": "What must you do in ROS 2 before reading a parameter's value in a Python node?",
        "options": [
          {
            "id": "a",
            "text": "Declare the parameter using self.declare_parameter()"
          },
          {
            "id": "b",
            "text": "Restart the computer"
          },
          {
            "id": "c",
            "text": "Create an action server"
          },
          {
            "id": "d",
            "text": "Export a system environment variable"
          }
        ],
        "correctAnswer": "a",
        "explanation": "ROS 2 requires nodes to declare parameters with a default value and optional descriptor before access."
      }
    ],
    "prevLesson": {
      "title": "08. Actions & Nav2",
      "slug": "08-actions"
    },
    "nextLesson": {
      "title": "10. Launch Files",
      "slug": "10-launch"
    }
  },
  "10-launch": {
    "id": "ros2-10",
    "slug": "10-launch",
    "title": "ROS 2 Launch Files in Python",
    "courseId": "ros2-jazzy",
    "moduleNumber": 10,
    "moduleTitle": "ROS 2 Launch System",
    "order": 10,
    "durationMinutes": 30,
    "difficulty": "Advanced",
    "learningObjectives": [
      "Understand why launch files are essential for orchestrating multi-node robotic systems.",
      "Write Python launch files utilizing 'launch' and 'launch_ros'.",
      "Pass parameters, namespaces, and topic remappings within launch descriptions.",
      "Execute full robot systems using 'ros2 launch'."
    ],
    "concept": "An autonomous mobile robot consists of dozens of simultaneous processes: LiDAR driver, camera node, wheel odometry controller, TF2 coordinate transforms, and SLAM mapping.\nOpening 10 separate terminal windows to run `ros2 run` for each node is impractical.\n\n**ROS 2 Launch Files** allow you to start, configure, and orchestrate your entire multi-node robotic system with a single command. In ROS 2, launch files are written as standard **Python scripts** (`.launch.py`), giving you the full programmatic power of conditional logic, event handlers, and environment inspection.\n\n### Standard Python Launch File Structure:\n```python\nfrom launch import LaunchDescription\nfrom launch_ros.actions import Node\n\ndef generate_launch_description():\n    return LaunchDescription([\n        # 1. Start LiDAR Sensor Driver\n        Node(\n            package='rplidar_ros',\n            executable='rplidar_node',\n            name='rplidar_node',\n            parameters=[{'serial_port': '/dev/ttyUSB0', 'frame_id': 'laser_frame'}],\n            output='screen'\n        ),\n        # 2. Start Differential Robot Controller\n        Node(\n            package='redbrick_controller',\n            executable='robot_controller',\n            name='robot_controller',\n            parameters=[{'max_speed': 0.5}],\n            remappings=[('/cmd_vel', '/diff_drive/cmd_vel')],\n            output='screen'\n        ),\n    ])\n```",
    "syntax": "ros2 launch <package_name> <launch_file>.launch.py",
    "syntaxExplanation": "Starts all nodes and configurations defined inside the launch file.",
    "examples": [
      {
        "title": "Launch Complete Robot Bringup System",
        "language": "bash",
        "code": "ros2 launch redbrick_bringup robot.launch.py",
        "explanation": "Executes all drivers and control nodes simultaneously.",
        "output": "[INFO] [launch]: All log files can be found in ~/.ros/log/\n[INFO] [rplidar_node]: RPLiDAR connected on /dev/ttyUSB0\n[INFO] [robot_controller]: Differential controller online."
      }
    ],
    "roboticsContext": {
      "title": "Autonomous Startup on Robot Boot",
      "description": "Production autonomous mobile robots use systemd services that execute a master Python launch file (`robot.launch.py`) upon boot. If any node fails or crashes, the launch system can automatically restart the specific failed process or trigger an orderly failsafe shutdown."
    },
    "commonMistakes": [
      {
        "mistake": "Naming launch files without the '.launch.py' suffix.",
        "solution": "ROS 2 launch discovery requires the extension '.launch.py' (or '.launch.xml' / '.launch.yaml')."
      },
      {
        "mistake": "Forgetting to install the 'launch/' directory in setup.py for Python packages.",
        "solution": "Add `(os.path.join('share', package_name, 'launch'), glob('launch/*.launch.py'))` to data_files in setup.py."
      }
    ],
    "exercise": {
      "instruction": "Launch the robot system using 'ros2 launch redbrick_bringup robot.launch.py'.",
      "initialCommand": "ros2 launch ",
      "targetCommand": "ros2 launch redbrick_bringup robot.launch.py",
      "hint": "Type 'ros2 launch redbrick_bringup robot.launch.py'.",
      "explanation": "ros2 launch executes the target launch file."
    },
    "quiz": [
      {
        "id": "q-launch-1",
        "type": "single",
        "question": "What programming language is the primary, official standard for writing ROS 2 launch files?",
        "options": [
          {
            "id": "a",
            "text": "Python (.launch.py)"
          },
          {
            "id": "b",
            "text": "Bash (.sh)"
          },
          {
            "id": "c",
            "text": "C++ (.cpp)"
          },
          {
            "id": "d",
            "text": "JSON (.json)"
          }
        ],
        "correctAnswer": "a",
        "explanation": "ROS 2 uses Python as its primary launch language, allowing programmatic control flow and dynamic node configuration."
      }
    ],
    "prevLesson": {
      "title": "09. Parameters",
      "slug": "09-parameters"
    },
    "nextLesson": {
      "title": "11. Gazebo Harmonic",
      "slug": "11-gazebo-harmonic"
    }
  },
  "11-gazebo-harmonic": {
    "id": "ros2-11",
    "slug": "11-gazebo-harmonic",
    "title": "Gazebo Harmonic Simulation (ros_gz)",
    "courseId": "ros2-jazzy",
    "moduleNumber": 11,
    "moduleTitle": "Simulation with Gazebo Harmonic",
    "order": 11,
    "durationMinutes": 35,
    "difficulty": "Advanced",
    "learningObjectives": [
      "Understand modern Gazebo Harmonic (GZ) and how it replaces deprecated Gazebo Classic.",
      "Use 'ros_gz_sim' and 'ros_gz_bridge' to interface simulation with ROS 2 Jazzy.",
      "Bridge '/cmd_vel', '/odom', and '/scan' topics between ROS 2 and Gazebo Harmonic.",
      "Safely test autonomous obstacle avoidance in simulation before hardware deployment."
    ],
    "concept": "Testing software on physical robot hardware can be risky and expensive—algorithmic bugs in navigation can cause physical crashes, wheel motor damage, or collisions.\nSimulation allows you to stress-test your navigation algorithms thousands of times in safety.\n\n### The Modern Standard: Gazebo Harmonic (`ros_gz`)\nIn ROS 2 Jazzy on Ubuntu 24.04 LTS, **Gazebo Harmonic (GZ Harmonic)** is the official simulation engine.\nThe legacy Gazebo 11 (\"Gazebo Classic\", `gazebo_ros`) reached End-Of-Life and is **strictly deprecated**.\n\n### Gazebo Harmonic Architecture:\n```\n+------------------------------------+          +------------------------------------+\n|           ROS 2 Jazzy Nodes        |          |      Gazebo Harmonic Simulator     |\n|                                    |          |                                    |\n|   /robot_controller   /teleop_node |          |   Physics Engine (DART / Bullet)   |\n|   /nav2_planner       /slam_toolbox|          |   3D Rendering & Sensor Simulation |\n+------------------------------------+          +------------------------------------+\n                 ^                                                ^\n                 | (ROS 2 Messages)                               | (GZ Messages)\n                 v                                                v\n       +--------------------------------------------------------------------+\n       |                   ros_gz_bridge (parameter_bridge)                 |\n       |  Bridges: /cmd_vel, /odom, /scan between ROS 2 and Gazebo Harmonic |\n       +--------------------------------------------------------------------+\n```\n\n### Launching Gazebo Harmonic and Bridging Topics:\n1. **Launch Gazebo World**:\n```bash\nros2 launch ros_gz_sim gz_sim.launch.py gz_args:=\"-r empty.sdf\"\n```\n2. **Bridge Core Topics with `parameter_bridge`**:\n```bash\nros2 run ros_gz_bridge parameter_bridge \\\n  /cmd_vel@geometry_msgs/msg/Twist@gz.msgs.Twist \\\n  /odom@nav_msgs/msg/Odometry@gz.msgs.Odometry \\\n  /scan@sensor_msgs/msg/LaserScan@gz.msgs.LaserScan\n```",
    "syntax": "ros2 run ros_gz_bridge parameter_bridge <topic>@<ros_msg>@<gz_msg>",
    "syntaxExplanation": "Creates a bi-directional or uni-directional bridge between ROS 2 messages and Gazebo Harmonic messages.",
    "examples": [
      {
        "title": "Bridge Differential Drive cmd_vel Topic",
        "language": "bash",
        "code": "ros2 run ros_gz_bridge parameter_bridge /cmd_vel@geometry_msgs/msg/Twist@gz.msgs.Twist",
        "explanation": "Bridges /cmd_vel so sending Twist messages in ROS 2 drives the simulated robot.",
        "output": "[INFO] [ros_gz_bridge]: Created 2-way bridge for [/cmd_vel] (ROS 2: [geometry_msgs/msg/Twist] <-> GZ: [gz.msgs.Twist])"
      }
    ],
    "roboticsContext": {
      "title": "Digital Twin Testing for the Redbrick Mobile Robot",
      "description": "Before deploying autonomous warehouse software to a fleet of Redbrick Mobile Robots, the entire lab environment is modelled as a Gazebo Harmonic world. Engineers verify that the simulated robot navigates around obstacles without colliding before flashing code to the physical Raspberry Pi 5."
    },
    "commonMistakes": [
      {
        "mistake": "Attempting to install 'ros-jazzy-gazebo-ros-pkgs' (Classic Gazebo).",
        "solution": "Gazebo Classic is not supported on ROS 2 Jazzy / Ubuntu 24.04. Always use 'ros-jazzy-ros-gz-sim' and 'ros-jazzy-ros-gz-bridge'."
      },
      {
        "mistake": "Forgetting the '@' syntax when bridging topics in ros_gz_bridge.",
        "solution": "The bridge syntax requires: <topic>@<ros_type>@<gz_type>, for example '/cmd_vel@geometry_msgs/msg/Twist@gz.msgs.Twist'."
      }
    ],
    "exercise": {
      "instruction": "Bridge the /cmd_vel topic to Gazebo Harmonic using 'ros2 run ros_gz_bridge parameter_bridge /cmd_vel@geometry_msgs/msg/Twist@gz.msgs.Twist'.",
      "initialCommand": "ros2 run ros_gz_bridge parameter_bridge ",
      "targetCommand": "ros2 run ros_gz_bridge parameter_bridge /cmd_vel@geometry_msgs/msg/Twist@gz.msgs.Twist",
      "hint": "Type 'ros2 run ros_gz_bridge parameter_bridge /cmd_vel@geometry_msgs/msg/Twist@gz.msgs.Twist'.",
      "explanation": "parameter_bridge connects ROS 2 topics to Gazebo Harmonic."
    },
    "quiz": [
      {
        "id": "q-gz-1",
        "type": "single",
        "question": "Which simulation software and bridge package is the official standard for ROS 2 Jazzy on Ubuntu 24.04?",
        "options": [
          {
            "id": "a",
            "text": "Gazebo Harmonic with ros_gz (ros_gz_bridge)"
          },
          {
            "id": "b",
            "text": "Gazebo Classic 11 with gazebo_ros"
          },
          {
            "id": "c",
            "text": "Stage 2D simulator"
          },
          {
            "id": "d",
            "text": "Webots 2019"
          }
        ],
        "correctAnswer": "a",
        "explanation": "ROS 2 Jazzy pairs officially with Gazebo Harmonic using the ros_gz integration packages."
      }
    ],
    "prevLesson": {
      "title": "10. Launch Files",
      "slug": "10-launch"
    }
  }
};
