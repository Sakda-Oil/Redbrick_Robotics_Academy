with open('src/components/simulator/ROS2InstallationLab.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Replace any literal newlines inside strings with literal '\n'
# Let's inspect where the broken lines are
code = code.replace('E: Unable to locate package ros-jazzy-desktop\n', 'E: Unable to locate package ros-jazzy-desktop\\n')
code = code.replace('bash: /opt/ros/jazzy/setup.bash: No such file or directory\n', 'bash: /opt/ros/jazzy/setup.bash: No such file or directory\\n')
code = code.replace("sudo apt install ros-jazzy-ros-base\n", "sudo apt install ros-jazzy-ros-base\\n")
code = code.replace("Command 'ros2' not found.\n", "Command 'ros2' not found.\\n")

with open('src/components/simulator/ROS2InstallationLab.tsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Fixed broken newlines in ROS2InstallationLab.tsx")
