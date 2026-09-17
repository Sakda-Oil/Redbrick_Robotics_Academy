import { TerminalCommandResult } from "@/types/terminal";

export interface ROS2SystemState {
  nodes: Array<{
    name: string;
    publications: string[];
    subscriptions: string[];
    services: string[];
  }>;
  topics: Array<{
    name: string;
    type: string;
    sampleData: string;
  }>;
}

export const INITIAL_ROS2_STATE: ROS2SystemState = {
  nodes: [
    {
      name: "/camera_node",
      publications: ["/camera/image_raw", "/rosout", "/parameter_events"],
      subscriptions: ["/parameter_events"],
      services: ["/camera_node/get_parameters", "/camera_node/set_parameters"],
    },
    {
      name: "/lidar_node",
      publications: ["/scan", "/rosout", "/parameter_events"],
      subscriptions: ["/parameter_events"],
      services: ["/lidar_node/get_parameters"],
    },
    {
      name: "/robot_controller",
      publications: ["/cmd_vel", "/rosout"],
      subscriptions: ["/scan", "/odom"],
      services: ["/robot_controller/set_parameters", "/reset_odometry"],
    },
    {
      name: "/robot_state_publisher",
      publications: ["/tf", "/tf_static", "/robot_description"],
      subscriptions: ["/joint_states"],
      services: ["/robot_state_publisher/get_parameters"],
    },
  ],
  topics: [
    {
      name: "/cmd_vel",
      type: "geometry_msgs/msg/Twist",
      sampleData: `linear:\n  x: 0.25\n  y: 0.0\n  z: 0.0\nangular:\n  x: 0.0\n  y: 0.0\n  z: 0.05\n---`,
    },
    {
      name: "/scan",
      type: "sensor_msgs/msg/LaserScan",
      sampleData: `header:\n  stamp:\n    sec: 1726330042\n    nanosec: 412952800\n  frame_id: lidar_link\nangle_min: -3.14159\nangle_max: 3.14159\nangle_increment: 0.01745\ntime_increment: 0.0001\nscan_time: 0.1\nrange_min: 0.12\nrange_max: 12.0\nranges: [1.42, 1.38, 1.35, 1.31, 1.29, 2.45, 2.50, 2.48, ... 360 points]\n---`,
    },
    {
      name: "/odom",
      type: "nav_msgs/msg/Odometry",
      sampleData: `header:\n  stamp:\n    sec: 1726330042\n    nanosec: 420000000\n  frame_id: odom\nchild_frame_id: base_footprint\npose:\n  pose:\n    position: {x: 1.24, y: 0.85, z: 0.0}\n    orientation: {x: 0.0, y: 0.0, z: 0.12, w: 0.99}\ntwist:\n  twist:\n    linear: {x: 0.25, y: 0.0, z: 0.0}\n    angular: {x: 0.0, y: 0.0, z: 0.05}\n---`,
    },
    {
      name: "/camera/image_raw",
      type: "sensor_msgs/msg/Image",
      sampleData: `header:\n  stamp:\n    sec: 1726330042\n    nanosec: 435000000\n  frame_id: camera_link\nheight: 480\nwidth: 640\nencoding: rgb8\nis_bigendian: 0\nstep: 1920\ndata: [134, 142, 120, 118, 115, ... 921600 bytes]\n---`,
    },
    {
      name: "/tf",
      type: "tf2_msgs/msg/TFMessage",
      sampleData: `transforms:\n  - header:\n      stamp: {sec: 1726330042, nanosec: 440000000}\n      frame_id: odom\n    child_frame_id: base_footprint\n    transform:\n      translation: {x: 1.24, y: 0.85, z: 0.0}\n      rotation: {x: 0.0, y: 0.0, z: 0.12, w: 0.99}\n---`,
    },
    {
      name: "/tf_static",
      type: "tf2_msgs/msg/TFMessage",
      sampleData: `transforms:\n  - header:\n      stamp: {sec: 1726330000, nanosec: 0}\n      frame_id: base_link\n    child_frame_id: lidar_link\n    transform:\n      translation: {x: 0.15, y: 0.0, z: 0.22}\n      rotation: {x: 0.0, y: 0.0, z: 0.0, w: 1.0}\n---`,
    },
  ],
};

export class ROS2Simulator {
  private state: ROS2SystemState;

  constructor(initialState: ROS2SystemState = INITIAL_ROS2_STATE) {
    this.state = initialState;
  }

  public execute(commandLine: string): TerminalCommandResult | null {
    const trimmed = commandLine.trim();

    // Source command
    if (trimmed.startsWith("source ")) {
      const target = trimmed.replace("source ", "").trim();
      return {
        output: `[ROS2] Environment sourced: ${target}`,
        exitCode: 0,
      };
    }

    // Colcon build
    if (trimmed.startsWith("colcon build")) {
      return {
        output: `Starting >>> my_robot_controller\nFinished <<< my_robot_controller [1.45s]\n\nSummary: 1 package finished [1.60s]`,
        exitCode: 0,
      };
    }

    if (!trimmed.startsWith("ros2")) {
      return null;
    }

    const tokens = trimmed.split(/\s+/);
    const subcmd = tokens[1];
    const action = tokens[2];
    const target = tokens[3];

    if (!subcmd || subcmd === "--help" || subcmd === "-h") {
      return {
        output: `usage: ros2 [-h] Call \`ros2 <command> -h\` for more detailed usage. ...\n\nCommands:\n  action    Various action related sub-commands\n  bag       Various rosbag related sub-commands\n  component Various component related sub-commands\n  daemon    Various daemon related sub-commands\n  doctor    Check ROS setup for potential issues\n  interface Show information about ROS interfaces\n  launch    Run a launch file\n  lifecycle Various lifecycle related sub-commands\n  multicast Various multicast related sub-commands\n  node      Various node related sub-commands\n  param     Various param related sub-commands\n  pkg       Create and manage ROS packages\n  run       Run an executable from a package\n  service   Various service related sub-commands\n  topic     Various topic related sub-commands\n  trace     Trace ROS 2 applications\n  version   Show current ROS 2 distribution`,
        exitCode: 0,
      };
    }

    if (subcmd === "version") {
      return {
        output: `jazzy (Jazzy Jalisco, Ubuntu 24.04 LTS)`,
        exitCode: 0,
      };
    }

    if (subcmd === "node") {
      if (action === "list") {
        const names = this.state.nodes.map((n) => n.name);
        return { output: names.join("\n"), exitCode: 0 };
      }
      if (action === "info") {
        if (!target) return { output: "ros2 node info: error: the following arguments are required: node_name", exitCode: 1 };
        const found = this.state.nodes.find((n) => n.name === target);
        if (!found) return { output: `Node '${target}' not found`, exitCode: 1 };
        return {
          output: `${found.name}\n  Subscribers:\n${found.subscriptions.map((s) => `    ${s}`).join("\n")}\n  Publishers:\n${found.publications.map((p) => `    ${p}`).join("\n")}\n  Service Servers:\n${found.services.map((srv) => `    ${srv}`).join("\n")}`,
          exitCode: 0,
        };
      }
      return { output: "Available commands: ros2 node list, ros2 node info <name>", exitCode: 0 };
    }

    if (subcmd === "topic") {
      if (action === "list") {
        if (tokens.includes("-t")) {
          const list = this.state.topics.map((t) => `${t.name} [${t.type}]`);
          return { output: list.join("\n"), exitCode: 0 };
        }
        const list = this.state.topics.map((t) => t.name);
        return { output: list.join("\n"), exitCode: 0 };
      }
      if (action === "echo") {
        if (!target) return { output: "ros2 topic echo: error: topic_name is required", exitCode: 1 };
        const topic = this.state.topics.find((t) => t.name === target);
        if (!topic) return { output: `Could not determine the type for the passed topic '${target}'`, exitCode: 1 };
        return { output: topic.sampleData, exitCode: 0 };
      }
      if (action === "hz") {
        if (!target) return { output: "ros2 topic hz: error: topic_name is required", exitCode: 1 };
        return { output: `average rate: 10.024\n\tmin: 0.098s max: 0.102s std dev: 0.00114s window: 10`, exitCode: 0 };
      }
      if (action === "info") {
        if (!target) return { output: "ros2 topic info: error: topic_name is required", exitCode: 1 };
        const topic = this.state.topics.find((t) => t.name === target);
        if (!topic) return { output: `Unknown topic '${target}'`, exitCode: 1 };
        return {
          output: `Type: ${topic.type}\nPublisher count: 1\nSubscription count: 1`,
          exitCode: 0,
        };
      }
      return { output: "Available commands: ros2 topic list [-t], ros2 topic echo <name>, ros2 topic hz <name>, ros2 topic info <name>", exitCode: 0 };
    }

    if (subcmd === "service") {
      if (action === "list") {
        const services = [
          "/camera_node/describe_parameters",
          "/camera_node/get_parameters",
          "/lidar_node/get_parameters",
          "/robot_controller/set_parameters",
          "/reset_odometry",
          "/spawn_entity",
        ];
        return { output: services.join("\n"), exitCode: 0 };
      }
    }

    if (subcmd === "action") {
      if (action === "list") {
        const actions = ["/navigate_to_pose", "/follow_path", "/spin", "/dock_robot"];
        return { output: actions.join("\n"), exitCode: 0 };
      }
    }

    if (subcmd === "param") {
      if (action === "list") {
        return {
          output: `/camera_node:\n  frame_rate\n  resolution\n/robot_controller:\n  max_linear_speed\n  max_angular_speed\n  use_sim_time`,
          exitCode: 0,
        };
      }
    }

    if (subcmd === "run") {
      const pkg = tokens[2];
      const exe = tokens[3];
      if (pkg === "demo_nodes_cpp" && exe === "talker") {
        return {
          output: `[INFO] [1726330050.123456] [talker]: Publishing: 'Hello World: 1'\n[INFO] [1726330051.123567] [talker]: Publishing: 'Hello World: 2'\n[INFO] [1726330052.123678] [talker]: Publishing: 'Hello World: 3'`,
          exitCode: 0,
        };
      }
      if (pkg === "demo_nodes_cpp" && exe === "listener") {
        return {
          output: `[INFO] [1726330050.124000] [listener]: I heard: [Hello World: 1]\n[INFO] [1726330051.124111] [listener]: I heard: [Hello World: 2]\n[INFO] [1726330052.124222] [listener]: I heard: [Hello World: 3]`,
          exitCode: 0,
        };
      }
      if (pkg && exe) {
        return {
          output: `[INFO] [redbrick_node]: Node '${exe}' from package '${pkg}' started successfully.`,
          exitCode: 0,
        };
      }
      return { output: "Usage: ros2 run <package_name> <executable_name>", exitCode: 1 };
    }

    return {
      output: `ros2: '${subcmd}' is not a recognized command. See 'ros2 --help'.`,
      exitCode: 1,
    };
  }
}
