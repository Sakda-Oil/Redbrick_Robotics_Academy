import { FSNode, TerminalCommandResult } from "../../types/terminal";

export class VirtualFileSystem {
  private root: FSNode;
  public cwd: string;
  private prevCwd: string;

  constructor() {
    this.root = this.createDefaultHierarchy();
    this.cwd = "/home/redbrick";
    this.prevCwd = "/home/redbrick";
  }

  public reset(): void {
    this.root = this.createDefaultHierarchy();
    this.cwd = "/home/redbrick";
    this.prevCwd = "/home/redbrick";
  }

  public readFile(pathStr: string): string | null {
    const resolved = this.resolvePath(pathStr);
    const node = this.getNode(resolved);
    if (node && node.type === "file") {
      return node.content || "";
    }
    return null;
  }

  public writeFile(pathStr: string, content: string): boolean {
    const resolved = this.resolvePath(pathStr);
    const parts = resolved.split("/").filter(Boolean);
    if (parts.length === 0) return false;
    const fileName = parts.pop()!;
    const parentPath = "/" + parts.join("/");
    
    const parentDir = this.getNode(parentPath);
    if (!parentDir || parentDir.type !== "directory") return false;
    
    if (!parentDir.children) parentDir.children = {};
    if (parentDir.children[fileName] && parentDir.children[fileName].type !== "file") {
      return false; // already exists as dir
    }

    parentDir.children[fileName] = {
      name: fileName,
      type: "file",
      permissions: "-rw-r--r--",
      owner: "redbrick",
      group: "redbrick",
      size: content.length,
      content,
    };
    return true;
  }

  private createDefaultHierarchy(): FSNode {
    return {
      name: "/",
      type: "directory",
      permissions: "drwxr-xr-x",
      owner: "root",
      group: "root",
      children: {
        bin: {
          name: "bin",
          type: "directory",
          permissions: "drwxr-xr-x",
          owner: "root",
          group: "root",
          children: {
            bash: { name: "bash", type: "file", permissions: "-rwxr-xr-x", owner: "root", group: "root", size: 1245000 },
            ls: { name: "ls", type: "file", permissions: "-rwxr-xr-x", owner: "root", group: "root", size: 142000 },
          },
        },
        dev: {
          name: "dev",
          type: "directory",
          permissions: "drwxr-xr-x",
          owner: "root",
          group: "root",
          children: {
            ttyUSB0: { name: "ttyUSB0", type: "device", permissions: "crw-rw----", owner: "root", group: "dialout", size: 0 },
            ttyACM0: { name: "ttyACM0", type: "device", permissions: "crw-rw----", owner: "root", group: "dialout", size: 0 },
            null: { name: "null", type: "device", permissions: "crw-rw-rw-", owner: "root", group: "root", size: 0 },
          },
        },
        etc: {
          name: "etc",
          type: "directory",
          permissions: "drwxr-xr-x",
          owner: "root",
          group: "root",
          children: {
            "os-release": {
              name: "os-release",
              type: "file",
              permissions: "-rw-r--r--",
              owner: "root",
              group: "root",
              size: 382,
              content: `PRETTY_NAME="Ubuntu 24.04 LTS"\nNAME="Ubuntu"\nVERSION_ID="24.04"\nVERSION="24.04 LTS (Noble Numbat)"\nVERSION_CODENAME=noble\nID=ubuntu\nHOME_URL="https://www.ubuntu.com/"\nSUPPORT_URL="https://help.ubuntu.com/"\nBUG_REPORT_URL="https://bugs.launchpad.net/ubuntu/"`,
            },
            udev: {
              name: "udev",
              type: "directory",
              permissions: "drwxr-xr-x",
              owner: "root",
              group: "root",
              children: {
                "rules.d": {
                  name: "rules.d",
                  type: "directory",
                  permissions: "drwxr-xr-x",
                  owner: "root",
                  group: "root",
                  children: {
                    "99-robot-lidar.rules": {
                      name: "99-robot-lidar.rules",
                      type: "file",
                      permissions: "-rw-r--r--",
                      owner: "root",
                      group: "root",
                      size: 156,
                      content: `KERNEL=="ttyUSB*", ATTRS{idVendor}=="10c4", ATTRS{idProduct}=="ea60", MODE:="0666", SYMLINK+="rplidar"`,
                    },
                  },
                },
              },
            },
          },
        },
        opt: {
          name: "opt",
          type: "directory",
          permissions: "drwxr-xr-x",
          owner: "root",
          group: "root",
          children: {
            ros: {
              name: "ros",
              type: "directory",
              permissions: "drwxr-xr-x",
              owner: "root",
              group: "root",
              children: {
                jazzy: {
                  name: "jazzy",
                  type: "directory",
                  permissions: "drwxr-xr-x",
                  owner: "root",
                  group: "root",
                  children: {
                    "setup.bash": {
                      name: "setup.bash",
                      type: "file",
                      permissions: "-rw-r--r--",
                      owner: "root",
                      group: "root",
                      size: 1042,
                      content: `# ROS 2 Jazzy Jalisco Environment Setup\nexport ROS_DISTRO=jazzy\nexport ROS_VERSION=2\nexport ROS_PYTHON_VERSION=3\nexport AMENT_PREFIX_PATH=/opt/ros/jazzy`,
                    },
                  },
                },
              },
            },
          },
        },
        home: {
          name: "home",
          type: "directory",
          permissions: "drwxr-xr-x",
          owner: "root",
          group: "root",
          children: {
            redbrick: {
              name: "redbrick",
              type: "directory",
              permissions: "drwxr-xr-x",
              owner: "redbrick",
              group: "redbrick",
              children: {
                ".bashrc": {
                  name: ".bashrc",
                  type: "file",
                  permissions: "-rw-r--r--",
                  owner: "redbrick",
                  group: "redbrick",
                  size: 3820,
                  content: `# Redbrick Robotics .bashrc\nsource /opt/ros/jazzy/setup.bash\nexport ROS_DOMAIN_ID=42\nexport TURTLEBOT3_MODEL=burger`,
                },
                Documents: {
                  name: "Documents",
                  type: "directory",
                  permissions: "drwxr-xr-x",
                  owner: "redbrick",
                  group: "redbrick",
                  children: {
                    "notes.txt": {
                      name: "notes.txt",
                      type: "file",
                      permissions: "-rw-r--r--",
                      owner: "redbrick",
                      group: "redbrick",
                      size: 140,
                      content: "ROS 2 and Linux fundamentals study notes.\nMaster the terminal first!",
                    },
                  },
                },
                Downloads: {
                  name: "Downloads",
                  type: "directory",
                  permissions: "drwxr-xr-x",
                  owner: "redbrick",
                  group: "redbrick",
                  children: {},
                },
                Projects: {
                  name: "Projects",
                  type: "directory",
                  permissions: "drwxr-xr-x",
                  owner: "redbrick",
                  group: "redbrick",
                  children: {
                    robot: {
                      name: "robot",
                      type: "directory",
                      permissions: "drwxr-xr-x",
                      owner: "redbrick",
                      group: "redbrick",
                      children: {
                        "main.py": {
                          name: "main.py",
                          type: "file",
                          permissions: "-rw-r--r--",
                          owner: "redbrick",
                          group: "redbrick",
                          size: 180,
                          content: "# Autonomous robot navigation script\nprint('Robot initialized.')",
                        },
                      },
                    },
                  },
                },
                "notes.txt": {
                  name: "notes.txt",
                  type: "file",
                  permissions: "-rw-r--r--",
                  owner: "redbrick",
                  group: "redbrick",
                  size: 256,
                  content: "Redbrick Robotics Academy\nWelcome to robotics programming!",
                },
                "linux.txt": {
                  name: "linux.txt",
                  type: "file",
                  permissions: "-rw-r--r--",
                  owner: "redbrick",
                  group: "redbrick",
                  size: 512,
                  content: "Ubuntu 24.04 LTS (Noble Numbat)\nTier-1 platform for ROS 2 Jazzy Jalisco.",
                },
                ros2_ws: {
                  name: "ros2_ws",
                  type: "directory",
                  permissions: "drwxr-xr-x",
                  owner: "redbrick",
                  group: "redbrick",
                  children: {
                    src: {
                      name: "src",
                      type: "directory",
                      permissions: "drwxr-xr-x",
                      owner: "redbrick",
                      group: "redbrick",
                      children: {
                        my_robot_controller: {
                          name: "my_robot_controller",
                          type: "directory",
                          permissions: "drwxr-xr-x",
                          owner: "redbrick",
                          group: "redbrick",
                          children: {
                            "package.xml": {
                              name: "package.xml",
                              type: "file",
                              permissions: "-rw-r--r--",
                              owner: "redbrick",
                              group: "redbrick",
                              size: 890,
                              content: `<?xml version="1.0"?>\n<package format="3">\n  <name>my_robot_controller</name>\n  <version>0.0.1</version>\n  <description>Redbrick Robot Controller Package</description>\n  <maintainer email="info@redbrick.tech">Redbrick Robotics</maintainer>\n  <license>Apache-2.0</license>\n  <depend>rclpy</depend>\n  <depend>geometry_msgs</depend>\n  <depend>sensor_msgs</depend>\n</package>`,
                            },
                            "setup.py": {
                              name: "setup.py",
                              type: "file",
                              permissions: "-rw-r--r--",
                              owner: "redbrick",
                              group: "redbrick",
                              size: 672,
                              content: `from setuptools import find_packages, setup\npackage_name = 'my_robot_controller'\nsetup(\n    name=package_name,\n    version='0.0.1',\n    packages=find_packages(exclude=['test']),\n    install_requires=['setuptools'],\n    entry_points={\n        'console_scripts': [\n            'robot_node = my_robot_controller.robot_node:main'\n        ],\n    },\n)`,
                            },
                            my_robot_controller: {
                              name: "my_robot_controller",
                              type: "directory",
                              permissions: "drwxr-xr-x",
                              owner: "redbrick",
                              group: "redbrick",
                              children: {
                                "__init__.py": { name: "__init__.py", type: "file", permissions: "-rw-r--r--", owner: "redbrick", group: "redbrick", size: 0, content: "" },
                                "robot_node.py": {
                                  name: "robot_node.py",
                                  type: "file",
                                  permissions: "-rw-r--r--",
                                  owner: "redbrick",
                                  group: "redbrick",
                                  size: 1054,
                                  content: `import rclpy\nfrom rclpy.node import Node\nfrom geometry_msgs.msg import Twist\n\nclass RobotNode(Node):\n    def __init__(self):\n        super().__init__('robot_node')\n        self.publisher_ = self.create_publisher(Twist, '/cmd_vel', 10)\n        self.timer = self.create_timer(0.5, self.timer_callback)\n        self.get_logger().info('Redbrick Robot Node has started.')\n\n    def timer_callback(self):\n        msg = Twist()\n        msg.linear.x = 0.2\n        msg.angular.z = 0.0\n        self.publisher_.publish(msg)\n\ndef main(args=None):\n    rclpy.init(args=args)\n    node = RobotNode()\n    rclpy.spin(node)\n    node.destroy_node()\n    rclpy.shutdown()\n\nif __name__ == '__main__':\n    main()`,
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                    install: {
                      name: "install",
                      type: "directory",
                      permissions: "drwxr-xr-x",
                      owner: "redbrick",
                      group: "redbrick",
                      children: {
                        "setup.bash": { name: "setup.bash", type: "file", permissions: "-rw-r--r--", owner: "redbrick", group: "redbrick", size: 340, content: "# Local overlay setup.bash" },
                      },
                    },
                  },
                },
                robot_ws: {
                  name: "robot_ws",
                  type: "directory",
                  permissions: "drwxr-xr-x",
                  owner: "redbrick",
                  group: "redbrick",
                  children: {
                    launch: {
                      name: "launch",
                      type: "directory",
                      permissions: "drwxr-xr-x",
                      owner: "redbrick",
                      group: "redbrick",
                      children: {
                        "robot.launch.py": {
                          name: "robot.launch.py",
                          type: "file",
                          permissions: "-rw-r--r--",
                          owner: "redbrick",
                          group: "redbrick",
                          size: 780,
                          content: `from launch import LaunchDescription\nfrom launch_ros.actions import Node\n\ndef generate_launch_description():\n    return LaunchDescription([\n        Node(package='my_robot_controller', executable='robot_node', name='robot_node'),\n    ])`,
                        },
                      },
                    },
                    config: {
                      name: "config",
                      type: "directory",
                      permissions: "drwxr-xr-x",
                      owner: "redbrick",
                      group: "redbrick",
                      children: {
                        "params.yaml": {
                          name: "params.yaml",
                          type: "file",
                          permissions: "-rw-r--r--",
                          owner: "redbrick",
                          group: "redbrick",
                          size: 210,
                          content: `robot_node:\n  ros__parameters:\n    max_linear_speed: 0.5\n    max_angular_speed: 1.5\n    lidar_topic: "/scan"\n    domain_id: 42`,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    };
  }

  public resolvePath(pathStr: string): string {
    if (!pathStr || pathStr === "~") return "/home/redbrick";
    if (pathStr.startsWith("~/")) {
      pathStr = "/home/redbrick/" + pathStr.slice(2);
    } else if (!pathStr.startsWith("/")) {
      pathStr = (this.cwd === "/" ? "" : this.cwd) + "/" + pathStr;
    }

    const segments = pathStr.split("/").filter(Boolean);
    const resolved: string[] = [];

    for (const seg of segments) {
      if (seg === ".") continue;
      if (seg === "..") {
        if (resolved.length > 0) resolved.pop();
      } else {
        resolved.push(seg);
      }
    }

    return "/" + resolved.join("/");
  }

  public getNode(pathStr: string): FSNode | null {
    const fullPath = this.resolvePath(pathStr);
    if (fullPath === "/") return this.root;

    const parts = fullPath.split("/").filter(Boolean);
    let current = this.root;

    for (const part of parts) {
      if (!current.children || !current.children[part]) {
        return null;
      }
      current = current.children[part];
    }
    return current;
  }

  public execute(commandLine: string): TerminalCommandResult {
    const trimmed = commandLine.trim();
    if (!trimmed) return { output: "", exitCode: 0 };

    const tokens = this.parseTokens(trimmed);
    const cmd = tokens[0];
    const args = tokens.slice(1);

    switch (cmd) {
      case "sudo": {
        if (args[0] === "apt" && args[1] === "update") {
          return {
            output: "Hit:1 http://archive.ubuntu.com/ubuntu noble InRelease\nGet:2 http://archive.ubuntu.com/ubuntu noble-updates InRelease [126 kB]\nGet:3 http://archive.ubuntu.com/ubuntu noble-security InRelease [126 kB]\nGet:4 http://packages.ros.org/ros2/ubuntu noble InRelease [4,685 B]\nFetched 257 kB in 1s (210 kB/s)\nReading package lists... Done\nBuilding dependency tree... Done\nReading state information... Done",
            exitCode: 0
          };
        }
        if (args[0] === "apt" && args[1] === "install") {
          const pkg = args[2] || "package-name";
          return {
            output: "Reading package lists... Done\nBuilding dependency tree... Done\nReading state information... Done\n\nThe following NEW packages will be installed:\n  " + pkg + "\n0 upgraded, 1 newly installed, 0 to remove.\nNeed to get 1,234 kB of archives.\nAfter this operation, 5,432 kB of additional disk space will be used.\nGet:1 http://packages.ros.org/ros2/ubuntu noble/main amd64 " + pkg + " [1,234 kB]\nFetched 1,234 kB in 1s (1,234 kB/s)\nSelecting previously unselected package " + pkg + ".\nPreparing to unpack .../" + pkg + " ...\nUnpacking " + pkg + " ...\nSetting up " + pkg + " ...\nProcessing triggers for libc-bin ...",
            exitCode: 0
          };
        }
        if (args[0] === "apt") {
          return { output: "sudo apt: command simulated but not implemented", exitCode: 0 };
        }
        // Fallback for sudo apt ... or other sudo commands, we just return a fake success or error
        return { output: "sudo: permission granted (simulated)", exitCode: 0 };
      }

      case "pwd":
        return { output: this.cwd, exitCode: 0 };

      case "clear":
        return { output: "\x1bc", exitCode: 0 };

      case "whoami":
        return { output: "redbrick", exitCode: 0 };

      case "hostname":
        return { output: "redbrick-robot", exitCode: 0 };

      case "uname": {
        if (args.includes("-a")) {
          return {
            output: "Linux redbrick-robot 6.8.0-31-generic #31-Ubuntu SMP PREEMPT_DYNAMIC aarch64 GNU/Linux",
            exitCode: 0,
          };
        }
        return { output: "Linux", exitCode: 0 };
      }

      case "cd": {
        const target = args[0] || "~";
        if (target === "-") {
          const prev = this.prevCwd;
          this.prevCwd = this.cwd;
          this.cwd = prev;
          return { output: this.cwd, exitCode: 0, newCwd: this.cwd };
        }

        const resolved = this.resolvePath(target);
        const node = this.getNode(resolved);

        if (!node) {
          return { output: `bash: cd: ${target}: No such file or directory`, exitCode: 1 };
        }
        if (node.type !== "directory") {
          return { output: `bash: cd: ${target}: Not a directory`, exitCode: 1 };
        }

        this.prevCwd = this.cwd;
        this.cwd = resolved;
        return { output: "", exitCode: 0, newCwd: this.cwd };
      }

      case "ls": {
        let showHidden = false;
        let showLong = false;
        let targetPath = ".";

        for (const arg of args) {
          if (arg.startsWith("-")) {
            if (arg.includes("a")) showHidden = true;
            if (arg.includes("l")) showLong = true;
          } else {
            targetPath = arg;
          }
        }

        const resolved = this.resolvePath(targetPath);
        const node = this.getNode(resolved);

        if (!node) {
          return { output: `ls: cannot access '${targetPath}': No such file or directory`, exitCode: 2 };
        }

        if (node.type !== "directory") {
          return { output: node.name, exitCode: 0 };
        }

        const entries = Object.values(node.children || {});
        let filtered = entries;
        if (!showHidden) {
          filtered = entries.filter((e) => !e.name.startsWith("."));
        }

        if (showLong) {
          const lines = filtered.map((e) => {
            const isDir = e.type === "directory";
            const perms = e.permissions || (isDir ? "drwxr-xr-x" : "-rw-r--r--");
            const owner = e.owner || "redbrick";
            const group = e.group || "redbrick";
            const size = (e.size || (isDir ? 4096 : 0)).toString().padStart(6);
            return `${perms} 1 ${owner} ${group} ${size} Sep 14 2026 ${e.name}${isDir ? "/" : ""}`;
          });
          return { output: `total ${filtered.length * 4}\n` + lines.join("\n"), exitCode: 0 };
        }

        const names = filtered.map((e) => (e.type === "directory" ? `${e.name}/` : e.name));
        return { output: names.join("  "), exitCode: 0 };
      }

      case "mkdir": {
        if (args.length === 0) {
          return { output: "mkdir: missing operand", exitCode: 1 };
        }

        const makeParents = args.includes("-p");
        const dirNames = args.filter((a) => !a.startsWith("-"));

        for (const dirPath of dirNames) {
          const resolved = this.resolvePath(dirPath);
          const parts = resolved.split("/").filter(Boolean);
          let current = this.root;

          for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            const isLast = i === parts.length - 1;

            if (!current.children) current.children = {};

            if (!current.children[part]) {
              if (isLast || makeParents) {
                current.children[part] = {
                  name: part,
                  type: "directory",
                  permissions: "drwxr-xr-x",
                  owner: "redbrick",
                  group: "redbrick",
                  children: {},
                };
              } else {
                return { output: `mkdir: cannot create directory '${dirPath}': No such file or directory`, exitCode: 1 };
              }
            }
            current = current.children[part];
          }
        }
        return { output: "", exitCode: 0 };
      }

      case "touch": {
        if (args.length === 0) {
          return { output: "touch: missing file operand", exitCode: 1 };
        }

        for (const filePath of args) {
          const resolved = this.resolvePath(filePath);
          const parts = resolved.split("/").filter(Boolean);
          const fileName = parts.pop()!;
          const parentPath = "/" + parts.join("/");
          const parentNode = this.getNode(parentPath);

          if (!parentNode || parentNode.type !== "directory") {
            return { output: `touch: cannot touch '${filePath}': No such file or directory`, exitCode: 1 };
          }

          if (!parentNode.children) parentNode.children = {};
          if (!parentNode.children[fileName]) {
            parentNode.children[fileName] = {
              name: fileName,
              type: "file",
              permissions: "-rw-r--r--",
              owner: "redbrick",
              group: "redbrick",
              size: 0,
              content: "",
            };
          }
        }
        return { output: "", exitCode: 0 };
      }

      case "cat": {
        if (args.length === 0) return { output: "", exitCode: 0 };
        const resolved = this.resolvePath(args[0]);
        const node = this.getNode(resolved);
        if (!node) {
          return { output: `cat: ${args[0]}: No such file or directory`, exitCode: 1 };
        }
        if (node.type === "directory") {
          return { output: `cat: ${args[0]}: Is a directory`, exitCode: 1 };
        }
        return { output: node.content || "", exitCode: 0 };
      }

      case "rm": {
        const recursive = args.includes("-r") || args.includes("-rf") || args.includes("-R");
        const targets = args.filter((a) => !a.startsWith("-"));

        for (const target of targets) {
          const resolved = this.resolvePath(target);
          if (resolved === "/" || resolved === "/home/redbrick") {
            return { output: `rm: it is dangerous to operate recursively on '${target}'`, exitCode: 1 };
          }
          const parts = resolved.split("/").filter(Boolean);
          const name = parts.pop()!;
          const parentNode = this.getNode("/" + parts.join("/"));

          if (!parentNode || !parentNode.children || !parentNode.children[name]) {
            if (!args.includes("-rf")) {
              return { output: `rm: cannot remove '${target}': No such file or directory`, exitCode: 1 };
            }
            continue;
          }

          if (parentNode.children[name].type === "directory" && !recursive) {
            return { output: `rm: cannot remove '${target}': Is a directory`, exitCode: 1 };
          }

          delete parentNode.children[name];
        }
        return { output: "", exitCode: 0 };
      }

      case "cp": {
        const cleanArgs = args.filter((a) => !a.startsWith("-"));
        if (cleanArgs.length < 2) {
          return { output: "cp: missing destination file operand after '" + (cleanArgs[0] || "") + "'", exitCode: 1 };
        }
        const srcPath = cleanArgs[0];
        const destPath = cleanArgs[1];
        const srcNode = this.getNode(this.resolvePath(srcPath));
        if (!srcNode) {
          return { output: `cp: cannot stat '${srcPath}': No such file or directory`, exitCode: 1 };
        }
        if (srcNode.type === "directory" && !args.includes("-r") && !args.includes("-R") && !args.includes("-rf")) {
          return { output: `cp: -r not specified; omitting directory '${srcPath}'`, exitCode: 1 };
        }

        const resolvedDest = this.resolvePath(destPath);
        const destNode = this.getNode(resolvedDest);

        if (destNode && destNode.type === "directory") {
          const srcName = srcPath.split("/").filter(Boolean).pop()!;
          if (!destNode.children) destNode.children = {};
          destNode.children[srcName] = JSON.parse(JSON.stringify(srcNode));
          destNode.children[srcName].name = srcName;
        } else {
          const parts = resolvedDest.split("/").filter(Boolean);
          const fileName = parts.pop()!;
          const parent = this.getNode("/" + parts.join("/"));
          if (!parent || parent.type !== "directory") {
            return { output: `cp: cannot create regular file '${destPath}': No such file or directory`, exitCode: 1 };
          }
          if (!parent.children) parent.children = {};
          parent.children[fileName] = JSON.parse(JSON.stringify(srcNode));
          parent.children[fileName].name = fileName;
        }
        return { output: "", exitCode: 0 };
      }

      case "mv": {
        const cleanArgs = args.filter((a) => !a.startsWith("-"));
        if (cleanArgs.length < 2) {
          return { output: "mv: missing destination file operand after '" + (cleanArgs[0] || "") + "'", exitCode: 1 };
        }
        const srcPath = cleanArgs[0];
        const destPath = cleanArgs[1];
        const resolvedSrc = this.resolvePath(srcPath);
        const srcNode = this.getNode(resolvedSrc);
        if (!srcNode) {
          return { output: `mv: cannot stat '${srcPath}': No such file or directory`, exitCode: 1 };
        }

        const resolvedDest = this.resolvePath(destPath);
        const destNode = this.getNode(resolvedDest);

        if (destNode && destNode.type === "directory") {
          const srcName = srcPath.split("/").filter(Boolean).pop()!;
          if (!destNode.children) destNode.children = {};
          destNode.children[srcName] = JSON.parse(JSON.stringify(srcNode));
          destNode.children[srcName].name = srcName;
        } else {
          const parts = resolvedDest.split("/").filter(Boolean);
          const fileName = parts.pop()!;
          const parent = this.getNode("/" + parts.join("/"));
          if (!parent || parent.type !== "directory") {
            return { output: `mv: cannot move to '${destPath}': No such file or directory`, exitCode: 1 };
          }
          if (!parent.children) parent.children = {};
          parent.children[fileName] = JSON.parse(JSON.stringify(srcNode));
          parent.children[fileName].name = fileName;
        }

        // Remove source
        const srcParts = resolvedSrc.split("/").filter(Boolean);
        const srcName = srcParts.pop()!;
        const srcParent = this.getNode("/" + srcParts.join("/"));
        if (srcParent && srcParent.children) {
          delete srcParent.children[srcName];
        }

        return { output: "", exitCode: 0 };
      }

      case "head": {
        if (args.length === 0) return { output: "head: missing file operand", exitCode: 1 };
        let linesCount = 10;
        let targetFile = args[0];
        if (args[0] === "-n" && args[1]) {
          linesCount = parseInt(args[1], 10) || 10;
          targetFile = args[2];
        }
        if (!targetFile) return { output: "head: missing file operand", exitCode: 1 };
        const resolved = this.resolvePath(targetFile);
        const node = this.getNode(resolved);
        if (!node) return { output: `head: cannot open '${targetFile}' for reading: No such file or directory`, exitCode: 1 };
        if (node.type === "directory") return { output: `head: error reading '${targetFile}': Is a directory`, exitCode: 1 };
        const lines = (node.content || "").split("\n");
        return { output: lines.slice(0, linesCount).join("\n"), exitCode: 0 };
      }

      case "tail": {
        if (args.length === 0) return { output: "tail: missing file operand", exitCode: 1 };
        let linesCount = 10;
        let targetFile = args[0];
        if (args[0] === "-n" && args[1]) {
          linesCount = parseInt(args[1], 10) || 10;
          targetFile = args[2];
        }
        if (!targetFile) return { output: "tail: missing file operand", exitCode: 1 };
        const resolved = this.resolvePath(targetFile);
        const node = this.getNode(resolved);
        if (!node) return { output: `tail: cannot open '${targetFile}' for reading: No such file or directory`, exitCode: 1 };
        if (node.type === "directory") return { output: `tail: error reading '${targetFile}': Is a directory`, exitCode: 1 };
        const lines = (node.content || "").split("\n");
        return { output: lines.slice(-linesCount).join("\n"), exitCode: 0 };
      }

      case "date": {
        const now = new Date();
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const day = days[now.getUTCDay()];
        const month = months[now.getUTCMonth()];
        const dateNum = now.getUTCDate().toString().padStart(2, "0");
        const time = now.toISOString().slice(11, 19);
        const year = now.getUTCFullYear();
        return { output: `${day} ${month} ${dateNum} ${time} UTC ${year}`, exitCode: 0 };
      }

      case "echo": {
        const str = args.join(" ");
        return { output: str, exitCode: 0 };
      }

      case "grep": {
        if (args.length < 2) {
          return { output: "Usage: grep <pattern> <file>", exitCode: 1 };
        }
        const pattern = args[0];
        const file = args[1];
        const node = this.getNode(file);
        if (!node || node.type !== "file") {
          return { output: `grep: ${file}: No such file or directory`, exitCode: 2 };
        }
        const lines = (node.content || "").split("\n");
        const matched = lines.filter((l) => l.includes(pattern));
        return { output: matched.join("\n"), exitCode: matched.length > 0 ? 0 : 1 };
      }

      case "find": {
        const targetDir = args[0] || ".";
        const nameIdx = args.indexOf("-name");
        const searchPattern = nameIdx !== -1 ? args[nameIdx + 1] : null;

        const resolved = this.resolvePath(targetDir);
        const results: string[] = [];

        const walk = (path: string, n: FSNode) => {
          if (!searchPattern || n.name.includes(searchPattern.replace(/"/g, "").replace(/\*/g, ""))) {
            results.push(path);
          }
          if (n.children) {
            for (const child of Object.values(n.children)) {
              walk(`${path}/${child.name}`, child);
            }
          }
        };

        const rootSearch = this.getNode(resolved);
        if (rootSearch) {
          walk(targetDir, rootSearch);
        }
        return { output: results.join("\n"), exitCode: 0 };
      }

      case "chmod": {
        if (args.length < 2) {
          return { output: "chmod: missing operand", exitCode: 1 };
        }
        const mode = args[0];
        const target = args[1];
        const node = this.getNode(target);
        if (!node) {
          return { output: `chmod: cannot access '${target}': No such file or directory`, exitCode: 1 };
        }
        if (mode.includes("+x")) {
          node.permissions = (node.permissions || "-rw-r--r--").replace(/r--$/, "r-x").replace(/rw-$/, "rwx");
        }
        return { output: "", exitCode: 0 };
      }

      case "help": {
        return {
          output: `Redbrick Robotics Linux Simulator Commands:\n  pwd, ls [-l -a], cd, mkdir [-p], touch, cat, cp [-r], mv, rm [-rf], head, tail, grep, find, echo, chmod, date, uname [-a], whoami, hostname, clear, ros2 ...`,
          exitCode: 0,
        };
      }

      default:
        return {
          output: `bash: ${cmd}: command not found. Type 'help' for available commands.`,
          exitCode: 127,
        };
    }
  }

  private parseTokens(str: string): string[] {
    const regex = /[^\s"']+|"([^"]*)"|'([^']*)'/g;
    const matches: string[] = [];
    let match;
    while ((match = regex.exec(str)) !== null) {
      matches.push(match[1] || match[2] || match[0]);
    }
    return matches;
  }
}
