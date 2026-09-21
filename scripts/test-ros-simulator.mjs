import { simulateROSProgram } from "../src/lib/simulator/ros2Simulator.ts";
import { computeAvoidanceCommand } from "../src/lib/simulator/obstacleAvoidance.ts";
import { ROS2_COURSE as ROS2_COURSE_EN, ROS2_LESSONS as ROS2_LESSONS_EN } from "../src/content/en/ros2Data.ts";
import { ROS2_COURSE_TH, ROS2_LESSONS_TH } from "../src/content/th/ros2Data.ts";
import { readFileSync } from "node:fs";

let passed = 0;

function check(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  }
  passed += 1;
  console.log(`✅ PASS: ${message}`);
}

console.log("\nROS 2 curriculum and executable playground tests\n");

for (const [locale, course, lessons] of [
  ["EN", ROS2_COURSE_EN, ROS2_LESSONS_EN],
  ["TH", ROS2_COURSE_TH, ROS2_LESSONS_TH],
]) {
  const listed = course.modules.flatMap((module) => module.lessons);
  check(course.totalModules === course.modules.length, `${locale}: module count matches metadata`);
  check(course.totalLessons === listed.length, `${locale}: lesson count matches metadata`);
  check(listed.every((lesson) => lessons[lesson.slug]), `${locale}: every listed lesson has content`);
  check(
    course.modules.every((module) => !["Demos", "Miscellaneous"].includes(module.title)),
    `${locale}: excluded tutorial groups are absent`
  );
  check(
    course.modules.map((module) => module.title).join("|") ===
      "First steps with ROS|Beginner: CLI tools|Beginner: Client libraries|Intermediate",
    `${locale}: curriculum follows the selected Jazzy tutorial groups`
  );
}

for (const [locale, lessons] of [
  ["EN", ROS2_LESSONS_EN],
  ["TH", ROS2_LESSONS_TH],
]) {
  const installation = lessons["02-installation"];
  check(installation.concept.includes("ros2-apt-source.deb"), `${locale}: installation uses the official ros2-apt-source package`);
  check(installation.concept.includes("ros-jazzy-desktop"), `${locale}: installation includes the Jazzy Desktop package`);
  check(!installation.concept.includes("ros-archive-keyring.gpg"), `${locale}: legacy manual keyring instructions are absent`);
}

const installationLab = readFileSync(new URL("../src/components/simulator/ROS2InstallationLab.tsx", import.meta.url), "utf8");
check(installationLab.includes("sudo dpkg -i /tmp/ros2-apt-source.deb"), "installation simulator follows the official repository setup flow");
check(installationLab.includes("resultTh") && installationLab.includes("สำเร็จเมื่อ"), "installation simulator explains success criteria to beginners");
check(installationLab.includes("setCurrentInput") && installationLab.includes("พิมพ์คำสั่งติดตั้ง ROS 2"), "single installation terminal accepts typed commands");
check(!installationLab.includes("Terminal Simulator") && !installationLab.includes("Simulated Environment"), "installation output uses a single terminal without simulator labeling");
check(!installationLab.includes("border-t border-charcoal-800 bg-charcoal-950 px-4 py-4"), "terminal prompt is integrated into the output surface without a second lower panel");

const lessonLayout = readFileSync(new URL("../src/components/course/LessonPageLayout.tsx", import.meta.url), "utf8");
check(lessonLayout.includes("!isGuidedROS2Installation && (\n            <section id=\"concept\""), "installation page hides the duplicate command-heavy concept section");
check(lessonLayout.includes("!isGuidedROS2Installation && <section id=\"examples\""), "installation page hides the duplicate example terminal section");

const pythonPublisher = `import rclpy
from rclpy.node import Node
class Talker(Node):
    def __init__(self):
        super().__init__('talker')
        self.publisher = self.create_publisher(String, '/topic', 10)
def main():
    rclpy.init()`;
const pythonResult = simulateROSProgram("python3 talker.py", pythonPublisher);
check(pythonResult.exitCode === 0, "valid rclpy publisher runs successfully");
check(pythonResult.output.includes("talker") && pythonResult.output.includes("/topic"), "publisher output identifies node and topic");

const invalidPython = simulateROSProgram("python3 broken.py", "print('hello')");
check(invalidPython.exitCode !== 0, "invalid ROS 2 Python source reports an error");

const cppSubscriber = `#include "rclcpp/rclcpp.hpp"
class Listener : public rclcpp::Node {
  Listener() : Node("listener") { create_subscription<String>("/topic", 10, callback); }
};
int main(int argc, char ** argv) { rclcpp::init(argc, argv); }`;
const cppResult = simulateROSProgram("./listener", cppSubscriber);
check(cppResult.exitCode === 0, "valid rclcpp subscriber runs successfully");
check(cppResult.output.includes("I heard"), "subscriber produces observable output");

const clearPath = computeAvoidanceCommand([], 0, 0.4);
check(clearPath.state === "clear" && clearPath.linear === 0.4, "autonomous robot cruises when the LiDAR path is clear");

const obstacleAhead = computeAvoidanceCommand(
  [
    { angle: 0, distance: 0.35 },
    { angle: Math.PI / 3, distance: 2.0 },
    { angle: -Math.PI / 3, distance: 0.5 },
  ],
  0,
  0.4
);
check(obstacleAhead.state === "reversing" && obstacleAhead.linear < 0, "autonomous robot reverses before a close obstacle");
check(obstacleAhead.angular > 0, "autonomous robot turns toward the side with more clearance");

console.log(`\n🎉 ALL ${passed}/${passed} ROS 2 TESTS PASSED\n`);
