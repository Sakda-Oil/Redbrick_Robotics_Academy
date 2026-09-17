import json
import os
from build_ros2_curriculum_complete import get_common_modules_en, get_common_modules_th
from make_lessons_en import get_lessons_en
from make_lessons_th import get_lessons_th

def main():
    modules_en = get_common_modules_en()
    modules_th = get_common_modules_th()
    lessons_en = get_lessons_en()
    lessons_th = get_lessons_th()

    course_en = {
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
        "modules": modules_en
    }

    course_th = {
        "id": "ros2-jazzy",
        "title": "ROS 2 Jazzy Jalisco สำหรับงานหุ่นยนต์อัตโนมัติ",
        "tagline": "สร้างหุ่นยนต์อัตโนมัติระดับโปรดักชันด้วย Ubuntu 24.04 LTS และ ROS 2 Jazzy",
        "description": "คู่มือมาตรฐานอย่างเป็นทางการสำหรับสถาปัตยกรรมซอฟต์แวร์หุ่นยนต์ยุคใหม่ เข้าใจมิดเดิลแวร์ DDS, การเขียนโหนด Python rclpy, การสื่อสารแบบ Pub/Sub, Service, Action, พารามิเตอร์, ระบบ Launch และการจำลองโลกเสมือนด้วย Gazebo Harmonic บน Ubuntu 24.04",
        "targetAudience": "วิศวกรหุ่นยนต์, นักเรียนนักศึกษา, นักพัฒนาซอฟต์แวร์ และนักวิจัย",
        "badge": "Ubuntu 24.04 LTS • มาตรฐาน Jazzy อย่างเป็นทางการ",
        "iconName": "Cpu",
        "accentColor": "#B5230E",
        "totalModules": 11,
        "totalLessons": 11,
        "estimatedHours": 18,
        "modules": modules_th
    }

    # 1. Write src/content/en/ros2Data.ts
    content_en = 'import { CourseData, LessonContent } from "@/types/course";\n\n'
    content_en += "export const ROS2_COURSE: CourseData = " + json.dumps(course_en, indent=2, ensure_ascii=False) + ";\n\n"
    content_en += "export const ROS2_LESSONS: Record<string, LessonContent> = " + json.dumps(lessons_en, indent=2, ensure_ascii=False) + ";\n"

    with open("src/content/en/ros2Data.ts", "w", encoding="utf-8") as f:
        f.write(content_en)
    print("Wrote src/content/en/ros2Data.ts")

    # 2. Write src/content/th/ros2Data.ts
    content_th = 'import { CourseData, LessonContent } from "@/types/course";\n\n'
    content_th += "export const ROS2_COURSE_TH: CourseData = " + json.dumps(course_th, indent=2, ensure_ascii=False) + ";\n\n"
    content_th += "export const ROS2_LESSONS_TH: Record<string, LessonContent> = " + json.dumps(lessons_th, indent=2, ensure_ascii=False) + ";\n"

    with open("src/content/th/ros2Data.ts", "w", encoding="utf-8") as f:
        f.write(content_th)
    print("Wrote src/content/th/ros2Data.ts")

    # 3. Write src/content/ros2Data.ts (re-export and standard sync)
    content_main = 'import { CourseData, LessonContent } from "@/types/course";\n\n'
    content_main += "export const ROS2_COURSE: CourseData = " + json.dumps(course_en, indent=2, ensure_ascii=False) + ";\n\n"
    content_main += "export const ROS2_LESSONS: Record<string, LessonContent> = " + json.dumps(lessons_en, indent=2, ensure_ascii=False) + ";\n"

    with open("src/content/ros2Data.ts", "w", encoding="utf-8") as f:
        f.write(content_main)
    print("Wrote src/content/ros2Data.ts")

    print("All curriculum files successfully updated!")

if __name__ == "__main__":
    main()
