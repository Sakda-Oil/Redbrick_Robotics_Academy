# Changelog

All notable changes to the **Redbrick Robotics Academy** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- Multi-platform setup guides for macOS, Windows (PowerShell), and Linux.
- GitHub Actions automated CI testing lint, typecheck, unit tests, and production build.
- Comprehensive technical documentation suite in `docs/`.

---

## [1.0.0] - 2026-09-17

### Added
- **Complete ROS 2 Jazzy Jalisco Curriculum**: 11 production-grade modules covering DDS architecture, Ubuntu 24.04 installation, ROS 2 CLI, colcon build, Python (`rclpy`) nodes, topics, services, actions, parameters, Python launch files, and Gazebo Harmonic simulation.
- **Linux Fundamentals Curriculum**: 10 interactive modules covering terminal essentials, navigation, file management, permissions, pipelines, and robotics scripting.
- **Bilingual Internationalization (TH/EN)**: Native toggle for Thai and English with localized lesson content, navigation, and feedback.
- **Interactive Terminal Simulator**:
  - Virtual File System (`/home/redbrick/ros2_ws`).
  - Shell command execution (`ls`, `cd`, `pwd`, `mkdir`, `cat`, `touch`, `rm`, `source`, `colcon build`).
  - Bash-like Tab Auto-Completion engine (53/53 unit tests passed).
- **ROS 2 Computational Graph**: Real-time visualization for Nodes, Topics, Publishers, and Subscribers (`minimal_publisher`, `minimal_subscriber`, `robot_controller`, `default`).
- **2D Mobile Robot Simulator**:
  - Real-time 2D differential-drive kinematics.
  - 360° LiDAR raycasting against walls and arena obstacles.
  - Dynamic topic teleop for `/cmd_vel`, `/odom`, and `/scan`.
  - Student Mode vs. Advanced Mode toggles.
- **Stateful 10-Step Installation Lab**: Interactive simulated installation of ROS 2 Jazzy on Ubuntu 24.04 with step validation and realistic error messages.
- **Progressive Disclosure Flow**: Contextual `LessonInteractiveLab` ensuring lessons only show required tools without 4-grid clutter.
- **ROS 2 Developer Playground**: Standalone developer sandbox (`/playground/ros2`) featuring the full 4-panel environment.
- **Dynamic Educational Pipeline**: "What is happening? / ตอนนี้เกิดอะไรขึ้น?" real-time explanation panel.
- **Progress Tracking & State Persistence**: Local storage sync for completed lessons, quiz scores, font size preferences, and active language.
