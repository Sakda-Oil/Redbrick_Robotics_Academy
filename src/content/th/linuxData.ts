import { CourseData, LessonContent } from "@/types/course";

export const LINUX_COURSE_TH: CourseData = {
  id: "linux",
  title: "Linux Fundamentals สำหรับงาน Robotics",
  tagline: "จากศูนย์สู่การใช้งาน Ubuntu 24.04 สำหรับวิศวกรหุ่นยนต์",
  description:
    "เรียนรู้ระบบปฏิบัติการหลักที่เป็นรากฐานของหุ่นยนต์สมัยใหม่ เข้าใจโครงสร้างไฟล์ (File System), การจัดการโพรเซส, เชลล์สคริปต์ และการจัดการสิทธิ์พอร์ตฮาร์ดแวร์สำหรับ LiDAR, กล้อง และไมโครคอนโทรลเลอร์",
  targetAudience: "นักเรียน, นักศึกษา, วิศวกร, ผู้พัฒนาหุ่นยนต์ และเมกเกอร์",
  badge: "รองรับ Ubuntu 24.04 LTS",
  iconName: "Terminal",
  accentColor: "#B5230E",
  totalModules: 10,
  totalLessons: 23,
  estimatedHours: 12,
  modules: [
    {
      id: "mod-1",
      number: 1,
      title: "บทนำและสถาปัตยกรรมระบบ",
      description: "เคอร์เนล Linux, ระบบ Ubuntu 24.04 LTS และเหตุผลที่งานหุ่นยนต์ต้องใช้ Linux",
      lessons: [
        { id: "linux-01", slug: "01-introduction", title: "01. รู้จัก Linux และ Ubuntu 24.04 สำหรับหุ่นยนต์", durationMinutes: 15 },
        { id: "linux-02", slug: "02-terminal", title: "02. พื้นฐาน Terminal, Shell และ Bash", durationMinutes: 15 },
      ],
    },
    {
      id: "mod-2",
      number: 2,
      title: "การนำทางและโครงสร้างระบบไฟล์",
      description: "การเคลื่อนที่ผ่านโฟลเดอร์และเข้าใจเวิร์กสเปซของหุ่นยนต์",
      lessons: [
        { id: "linux-03", slug: "03-pwd", title: "03. pwd — ตรวจสอบไดเรกทอรีปัจจุบัน", durationMinutes: 10 },
        { id: "linux-04", slug: "04-ls", title: "04. ls — แสดงรายการไฟล์และแฟล็กสำคัญ", durationMinutes: 20 },
        { id: "linux-05", slug: "05-cd", title: "05. cd — การเปลี่ยนไดเรกทอรีและเส้นทาง", durationMinutes: 20 },
      ],
    },
    {
      id: "mod-3",
      number: 3,
      title: "การจัดการไฟล์และไดเรกทอรี",
      description: "การสร้าง Workspace, ไฟล์คอนฟิก และจัดการโค้ดหุ่นยนต์",
      lessons: [
        { id: "linux-06", slug: "06-mkdir", title: "06. mkdir — สร้างโครงสร้าง ROS Workspace", durationMinutes: 15 },
        { id: "linux-07", slug: "07-touch", title: "07. touch — สร้างไฟล์สคริปต์และโหนด Python", durationMinutes: 10 },
        { id: "linux-08", slug: "08-cp-mv-rm", title: "08. cp, mv, rm — คัดลอก ย้าย และลบไฟล์อย่างปลอดภัย", durationMinutes: 25 },
      ],
    },
    {
      id: "mod-4",
      number: 4,
      title: "การตรวจสอบ ค้นหา และอ่าน Log",
      description: "ตรวจสอบคอนฟิกเซนเซอร์, ค้นหาข้อความด้วย grep และค้นหาไฟล์ Launch",
      lessons: [
        { id: "linux-09", slug: "09-cat-grep-find", title: "09. cat, grep และ find ในงานหุ่นยนต์", durationMinutes: 20 },
      ],
    },
    {
      id: "mod-5",
      number: 5,
      title: "ฮาร์ดแวร์หุ่นยนต์และสิทธิ์การเข้าถึง",
      description: "การจัดการ /dev/ttyUSB0, กฎ udev, คำสั่ง sudo และกลุ่ม dialout",
      lessons: [
        { id: "linux-10", slug: "10-permissions-robotics", title: "10. chmod, sudo และพอร์ต Serial สำหรับหุ่นยนต์", durationMinutes: 25 },
      ],
    },
  ],
};

export const LINUX_LESSONS_TH: Record<string, LessonContent> = {
  "01-introduction": {
    id: "linux-01",
    slug: "01-introduction",
    title: "รู้จัก Linux และทำไมระบบหุ่นยนต์จึงรันบน Ubuntu 24.04",
    courseId: "linux",
    moduleNumber: 1,
    moduleTitle: "บทนำและสถาปัตยกรรมระบบ",
    order: 1,
    durationMinutes: 15,
    difficulty: "Beginner",
    learningObjectives: [
      "เข้าใจความหมายของ Operating System Kernel และ Distribution",
      "เข้าใจว่าทำไม Ubuntu 24.04 LTS (Noble Numbat) จึงเป็นมาตรฐานหลักระดับ Tier-1 ของ ROS 2 Jazzy",
      "เรียนรู้โครงสร้างไดเรกทอรีราก (/etc, /dev, /home, /opt) ในงานหุ่นยนต์",
    ],
    concept: `Linux คือแกนกลางระบบปฏิบัติการ (Kernel) แบบโอเพนซอร์สที่สร้างขึ้นโดย Linus Torvalds ในปี 1991
ในวงการหุ่นยนต์สมัยใหม่ กว่า 95% ของหุ่นยนต์อุตสาหกรรม, หุ่นยนต์เคลื่อนที่อัตโนมัติ (AMR), โดรน และแพลตฟอร์มงานวิจัย ทำงานบน Linux โดยเฉพาะ **Ubuntu Linux**

เหตุผลสำคัญที่ Ubuntu 24.04 LTS (Noble Numbat) เป็นมาตรฐานหลัก:
1. **การเข้าถึงฮาร์ดแวร์ที่มีความหน่วงต่ำ**: สื่อสารกับไมโครคอนโทรลเลอร์โดยตรงผ่าน USB Serial, CAN bus, I2C และ SPI ได้อย่างมีเสถียรภาพ
2. **การสนับสนุน ROS 2 Jazzy Jalisco อย่างเป็นทางการ**: มีแพ็กเกจไบนารีที่คอมไพล์สำเร็จรูปและทดสอบ CI สม่ำเสมอ
3. **ความสามารถรองรับ PREEMPT_RT Real-Time**: ตอบสนองแบบเรียลไทม์ที่จำเป็นสำหรับลูปควบคุมมอเตอร์ความถี่สูง
4. **อีโคซิสเต็มของไดรเวอร์หุ่นยนต์ที่สมบูรณ์**: รองรับไดรเวอร์เซนเซอร์ LiDAR (RPLiDAR, Velodyne), กล้องวัดระยะ Depth Camera (Intel RealSense, OAK-D) และ IMU ในทันที`,
    syntax: `uname -a\nlsb_release -a`,
    syntaxExplanation: `รันคำสั่ง 'uname -a' เพื่อตรวจเวอร์ชันเคอร์เนลและสถาปัตยกรรมซีพียู (x86_64 หรือ aarch64 บน Raspberry Pi 5) และ 'lsb_release -a' เพื่อยืนยันเวอร์ชันของระบบ Ubuntu`,
    examples: [
      {
        title: "ตรวจสอบ Kernel และสถาปัตยกรรมเครื่อง",
        language: "bash",
        code: `uname -a`,
        explanation: "แสดงชื่อเคอร์เนล โฮสต์เนม เวอร์ชัน และสถาปัตยกรรมประมวลผล",
        output: `Linux redbrick-robot 6.8.0-31-generic #31-Ubuntu SMP PREEMPT_DYNAMIC aarch64 GNU/Linux`,
      },
      {
        title: "ยืนยันเวอร์ชัน Ubuntu 24.04 LTS",
        language: "bash",
        code: `cat /etc/os-release`,
        explanation: "อ่านไฟล์คอนฟิกเพื่อตรวจสอบว่าเครื่องรันบน Ubuntu 24.04 LTS Noble Numbat",
        output: `NAME="Ubuntu"\nVERSION="24.04 LTS (Noble Numbat)"\nID=ubuntu\nVERSION_ID="24.04"`,
      },
    ],
    roboticsContext: {
      title: "ทำไมโฟลเดอร์ /dev และ /opt จึงสำคัญที่สุดในงานหุ่นยนต์",
      description: "ต่างจาก Windows ที่ใช้อุปกรณ์เป็น COM port ใน Linux อุปกรณ์ฮาร์ดแวร์ทุกตัวจะถูกมองเป็นไฟล์อยู่ในไดเรกทอรี /dev เช่น /dev/ttyUSB0 สำหรับเซนเซอร์ LiDAR หรือ /dev/video0 สำหรับกล้อง และตัวโปรแกรม ROS 2 จะถูกติดตั้งไว้ที่ /opt/ros/jazzy",
      diagram: `/ (Root ไดเรกทอรีราก)
├── bin         (ไฟล์คำสั่งหลัก: bash, ls)
├── dev         (พอร์ตเชื่อมต่ออุปกรณ์: ttyUSB0, video0, i2c)
├── etc         (ไฟล์คอนฟิกระบบและกฎ udev)
├── home
│   └── redbrick (โฟลเดอร์ผู้ใช้: ros2_ws, robot_ws)
└── opt
    └── ros
        └── jazzy (ที่ติดตั้งระบบ ROS 2 Jazzy Jalisco)`,
    },
    commonMistakes: [
      {
        mistake: "เข้าใจผิดว่าชื่อโฟลเดอร์ตัวพิมพ์ใหญ่และตัวพิมพ์เล็กเหมือนกันเหมือนใน Windows",
        solution: "Linux มีความอ่อนไหวต่อตัวพิมพ์ (Case-sensitive) ดังนั้น 'Ros2_ws', 'ros2_ws' และ 'ROS2_WS' คือ 3 โฟลเดอร์ที่แยกจากกันอย่างสิ้นเชิง",
      },
      {
        mistake: "ทำงานที่ไดเรกทอรีราก '/' โดยใช้สิทธิ์ root ตลอดเวลา",
        solution: "ควรทำงานภายในโฟลเดอร์ผู้ใช้เสมอ (/home/redbrick หรือ ~) เพื่อป้องกันการเผลอลบไฟล์ระบบสำคัญ",
      },
    ],
    exercise: {
      instruction: "ตรวจสอบไฟล์คอนฟิกเวอร์ชันระบบปฏิบัติการ โดยใช้คำสั่ง cat กับไฟล์ /etc/os-release",
      initialCommand: "cat ",
      targetCommand: "cat /etc/os-release",
      hint: "พิมพ์ 'cat /etc/os-release' เพื่อดูเวอร์ชันของ Ubuntu",
      explanation: "คำสั่ง cat ใช้สำหรับอ่านและแสดงเนื้อหาข้อความภายในไฟล์ออกมาที่หน้าจอเทอร์มินัล",
    },
    quiz: [
      {
        id: "q1",
        type: "single",
        question: "Ubuntu เวอร์ชันใดที่เป็น Tier-1 มาตรฐานสำหรับ ROS 2 Jazzy Jalisco?",
        options: [
          { id: "a", text: "Ubuntu 20.04 LTS (Focal)" },
          { id: "b", text: "Ubuntu 22.04 LTS (Jammy)" },
          { id: "c", text: "Ubuntu 24.04 LTS (Noble Numbat)" },
          { id: "d", text: "Ubuntu 18.04 LTS (Bionic)" },
        ],
        correctAnswer: "c",
        explanation: "ROS 2 Jazzy Jalisco ถูกพัฒนาและทดสอบอย่างเป็นทางการคู่กับ Ubuntu 24.04 LTS (Noble Numbat)",
      },
      {
        id: "q2",
        type: "single",
        question: "อุปกรณ์ฮาร์ดแวร์ภายนอก เช่น LiDAR หรือไมโครคอนโทรลเลอร์ จะปรากฏอยู่ในโฟลเดอร์ใดใน Linux?",
        options: [
          { id: "a", text: "/etc" },
          { id: "b", text: "/dev" },
          { id: "c", text: "/home" },
          { id: "d", text: "/var" },
        ],
        correctAnswer: "b",
        explanation: "ไดเรกทอรี /dev (Devices) เป็นที่อยู่ของ Device Node สำหรับอุปกรณ์ฮาร์ดแวร์ เช่น /dev/ttyUSB0 และ /dev/ttyACM0",
      },
    ],
    teacherNotes: {
      pedagogicalGoal: "ขจัดความกลัวการใช้งาน Command Line และสร้างความเข้าใจว่าทำไมหุ่นยนต์อัจฉริยะทั่วโลกจึงพึ่งพา Linux",
      keyPointsToEmphasize: [
        "ความสำคัญของ Case sensitivity ใน Linux",
        "หลักการ 'Everything is a file' ในระบบ UNIX",
        "วงรอบการสนับสนุนระยะยาวของ Ubuntu 24.04 LTS และ ROS 2 Jazzy (2024 - 2029)",
      ],
      commonStudentConfusions: [
        "ผู้เรียนที่คุ้นชินกับ Windows มักมองหาไดรฟ์ C:\\ ให้อธิบายแผนผังแบบ Single Root Tree",
      ],
      suggestedDiscussionPrompt: "เหตุใดผู้ผลิตรถยนต์ไร้คนขับและหุ่นยนต์อุตสาหกรรมจึงเลือกใช้ Linux มากกว่า Windows?",
    },
    nextLesson: { title: "02. พื้นฐาน Terminal และ Shell", slug: "02-terminal" },
  },

  "02-terminal": {
    id: "linux-02",
    slug: "02-terminal",
    title: "พื้นฐาน Linux Terminal, Shell และ Bash",
    courseId: "linux",
    moduleNumber: 1,
    moduleTitle: "บทนำและสถาปัตยกรรมระบบ",
    order: 2,
    durationMinutes: 15,
    difficulty: "Beginner",
    learningObjectives: [
      "แยกความแตกต่างระหว่าง Terminal Emulator, Shell และ Bash",
      "ฝึกใช้คีย์ลัดจำเป็น: Ctrl+C, Ctrl+L และการกด Tab เพื่อเติมคำสั่งอัตโนมัติ",
      "เข้าใจการทำงานของสตรีมข้อมูล Standard Input, Output และ Error",
    ],
    concept: `**Terminal (เทอร์มินัล)** คือหน้าต่างแสดงผลตัวอักษร ส่วน **Shell (เชลล์)** คือโปรแกรมแปลคำสั่งที่รับข้อความที่คุณพิมพ์ไปสั่งให้เคอร์เนลทำงาน
ใน Ubuntu 24.04 โปรแกรมเชลล์เริ่มต้นคือ **Bash** (Bourne-Again SHell)

คีย์ลัดจำเป็นสำหรับนักพัฒนาหุ่นยนต์:
- **Tab**: เติมชื่อไฟล์ ชื่อแพ็กเกจ หรือชื่อ Topic ให้โดยอัตโนมัติ (กด Tab 2 ครั้งเพื่อดูรายการทั้งหมด)
- **Ctrl + C**: ส่งสัญญาณ \`SIGINT\` เพื่อหยุดการทำงานของโหนดหุ่นยนต์อย่างปลอดภัย
- **Ctrl + L**: ล้างหน้าจอเทอร์มินัลให้ว่าง (เทียบเท่าคำสั่ง \`clear\`)
- **ลูกศรขึ้น / ลง**: เลื่อนดูประวัติคำสั่งที่เคยพิมพ์ เพื่อไม่ต้องพิมพ์คำสั่งยาวซ้ำ`,
    syntax: `whoami\nhostname\nclear`,
    syntaxExplanation: `โครงสร้างหน้าจอจะแสดง: username@hostname:current_directory$ โดยเครื่องหมาย '$' แสดงว่าเป็นผู้ใช้ทั่วไป`,
    examples: [
      {
        title: "ตรวจสอบชื่อผู้ใช้ที่กำลังล็อกอิน",
        language: "bash",
        code: `whoami`,
        explanation: "แสดงชื่อบัญชีผู้ใช้ปัจจุบัน",
        output: `redbrick`,
      },
      {
        title: "ตรวจสอบชื่อเครื่องหุ่นยนต์",
        language: "bash",
        code: `hostname`,
        explanation: "แสดงชื่อโฮสต์เนมบนเครือข่ายของคอมพิวเตอร์หุ่นยนต์",
        output: `redbrick-robot`,
      },
    ],
    roboticsContext: {
      title: "การเชื่อมต่อควบคุมหุ่นยนต์แบบ Headless ผ่าน SSH",
      description: "หุ่นยนต์ส่วนใหญ่ไม่มีหน้าจอหรือคีย์บอร์ดติดอยู่ที่ตัวเครื่อง วิศวกรจะเชื่อมต่อผ่านเครือข่ายด้วยคำสั่ง SSH เข้าไปที่คอมพิวเตอร์ออนบอร์ด (เช่น Raspberry Pi 5) เพื่อควบคุมผ่านเทอร์มินัลโดยตรง",
    },
    commonMistakes: [
      {
        mistake: "กด Ctrl+Z แทน Ctrl+C เพื่อหยุดโหนด",
        solution: "Ctrl+Z จะพักการทำงานของโหนดไว้เบื้องหลัง ทำให้พอร์ตมอเตอร์หรือเซนเซอร์ยังถูกล็อกค้างอยู่ ให้ใช้ Ctrl+C เสมอ",
      },
    ],
    exercise: {
      instruction: "พิมพ์คำสั่งเพื่อตรวจสอบว่าคุณกำลังใช้งานในฐานะผู้ใช้ชื่ออะไร",
      initialCommand: "",
      targetCommand: "whoami",
      hint: "พิมพ์ 'whoami' แล้วกด Enter",
      explanation: "whoami จะคืนค่าชื่อผู้ใช้งานปัจจุบันคือ 'redbrick'",
    },
    quiz: [
      {
        id: "q-term-1",
        type: "single",
        question: "คีย์ลัดใดใช้สำหรับหยุดการทำงานของโหนด ROS 2 ในเทอร์มินัลได้อย่างปลอดภัย?",
        options: [
          { id: "a", text: "Ctrl + V" },
          { id: "b", text: "Ctrl + C" },
          { id: "c", text: "Ctrl + Z" },
          { id: "d", text: "Esc + Enter" },
        ],
        correctAnswer: "b",
        explanation: "Ctrl+C จะส่งสัญญาณ SIGINT เพื่อให้โหนด ROS คืนทรัพยากร ปิดพอร์ต และหยุดมอเตอร์อย่างถูกต้อง",
      },
    ],
    teacherNotes: {
      pedagogicalGoal: "สร้างความคุ้นเคยกับ Terminal Prompt และฝึกทักษะการใช้คีย์ลัดเบื้องต้น",
      keyPointsToEmphasize: ["ความต่างระหว่าง Terminal กับ Shell", "พลังของปุ่ม Tab ในการพิมพ์คำสั่ง ROS 2"],
      commonStudentConfusions: ["สับสนระหว่าง Ctrl+C ในเทอร์มินัล (หยุดโปรแกรม) กับการ Copy (ต้องใช้ Ctrl+Shift+C)"],
      suggestedDiscussionPrompt: "ทำไมการกด Tab เพื่อเติมคำสั่งอัตโนมัติจึงช่วยลดข้อผิดพลาดในการพิมพ์ชื่อ Topic ใน ROS 2 ได้อย่างมาก?",
    },
    prevLesson: { title: "01. รู้จัก Linux", slug: "01-introduction" },
    nextLesson: { title: "03. คำสั่ง pwd", slug: "03-pwd" },
  },

  "03-pwd": {
    id: "linux-03",
    slug: "03-pwd",
    title: "คำสั่ง pwd — ตรวจสอบไดเรกทอรีปัจจุบัน",
    courseId: "linux",
    moduleNumber: 2,
    moduleTitle: "การนำทางและโครงสร้างระบบไฟล์",
    order: 3,
    durationMinutes: 10,
    difficulty: "Beginner",
    learningObjectives: [
      "เข้าใจความหมายของ Current Working Directory (CWD)",
      "ใช้คำสั่ง 'pwd' เพื่อแสดง Absolute Path เต็มรูปแบบ",
      "แยกความแตกต่างระหว่าง Absolute Path และ Relative Path",
    ],
    concept: `ในระบบ Linux ทุกเซสชันของเทอร์มินัลจะมีตำแหน่งโฟลเดอร์ที่เรากำลังยืนอยู่ เรียกว่า **Current Working Directory (CWD)**
ทุกคำสั่งที่คุณสั่งทำงานโดยไม่ระบุที่อยู่ จะอ้างอิงตำแหน่งเทียบกับโฟลเดอร์นี้เสมอ

คำสั่ง **\`pwd\`** (Print Working Directory) ทำหน้าที่พิมพ์เส้นทางเต็ม (Absolute Path) จากจุดเริ่มต้น \`/\` มายังตำแหน่งปัจจุบัน`,
    syntax: `pwd [OPTIONS]`,
    syntaxExplanation: `pwd แสดงเส้นทางเต็มของไดเรกทอรีที่ทำงานอยู่ หากมี flag -P จะแสดงตำแหน่งจริงในกรณีที่เป็น Symbolic Link`,
    examples: [
      {
        title: "แสดงตำแหน่งโฟลเดอร์ปัจจุบัน",
        language: "bash",
        code: `pwd`,
        explanation: "แสดงเส้นทางไดเรกทอรีปัจจุบันในระบบไฟล์จำลอง",
        output: `/home/redbrick`,
      },
    ],
    roboticsContext: {
      title: "ความสำคัญของ Path ในการรัน Launch file และบันทึก Rosbag",
      description: "เมื่อสั่งรันโหนดหรือบันทึกข้อมูลเซนเซอร์ด้วย rosbag หากใช้ Relative Path ไฟล์อาจถูกบันทึกผิดที่ การตรวจสอบด้วย pwd ก่อนทำให้มั่นใจว่าข้อมูลจะไม่สูญหาย",
    },
    commonMistakes: [
      {
        mistake: "สับสนระหว่างเครื่องหมาย tilde (~) กับ root directory (/)",
        solution: "~ หมายถึง /home/username (เช่น /home/redbrick) ส่วน / คือไดเรกทอรีรากสูงสุดของทั้งระบบ",
      },
    ],
    exercise: {
      instruction: "พิมพ์คำสั่งเพื่อตรวจสอบตำแหน่งไดเรกทอรีปัจจุบันของคุณ",
      initialCommand: "",
      targetCommand: "pwd",
      hint: "พิมพ์ 'pwd' แล้วกด Enter",
      explanation: "pwd จะแสดงเส้นทางปัจจุบัน เช่น /home/redbrick",
    },
    quiz: [
      {
        id: "q-pwd-1",
        type: "single",
        question: "คำสั่ง 'pwd' ย่อมาจากคำว่าอะไร?",
        options: [
          { id: "a", text: "Program Working Directory" },
          { id: "b", text: "Print Working Directory" },
          { id: "c", text: "Process Working Daemon" },
          { id: "d", text: "Password Directory" },
        ],
        correctAnswer: "b",
        explanation: "pwd ย่อมาจาก Print Working Directory ทำหน้าที่แสดงไดเรกทอรีการทำงานปัจจุบัน",
      },
    ],
    teacherNotes: {
      pedagogicalGoal: "ปูพื้นฐานเรื่องเส้นทางสัมพัทธ์ (Relative) และเส้นทางสัมบูรณ์ (Absolute)",
      keyPointsToEmphasize: ["~ คือตัวย่อของ /home/user", "เส้นทางที่ขึ้นต้นด้วย / คือ Absolute Path"],
      commonStudentConfusions: ["คิดว่า pwd เปลี่ยนโฟลเดอร์ได้ (ความจริงเพียงแค่แสดงผล)"],
      suggestedDiscussionPrompt: "ตำแหน่ง CWD ส่งผลต่อตำแหน่งที่คำสั่ง 'colcon build' ค้นหาแพ็กเกจอย่างไร?",
    },
    prevLesson: { title: "02. พื้นฐาน Terminal", slug: "02-terminal" },
    nextLesson: { title: "04. คำสั่ง ls", slug: "04-ls" },
  },

  "04-ls": {
    id: "linux-04",
    slug: "04-ls",
    title: "คำสั่ง ls — แสดงรายการไฟล์และเวิร์กสเปซของหุ่นยนต์",
    courseId: "linux",
    moduleNumber: 2,
    moduleTitle: "การนำทางและโครงสร้างระบบไฟล์",
    order: 4,
    durationMinutes: 20,
    difficulty: "Beginner",
    learningObjectives: [
      "ใช้คำสั่ง 'ls' เพื่อดูรายการไฟล์และโฟลเดอร์",
      "ฝึกใช้แฟล็กสำคัญ: -l (แสดงรายละเอียด), -a (แสดงไฟล์ซ่อน), -h (ขนาดไฟล์อ่านง่าย)",
      "เข้าใจความหมายของไฟล์คอนฟิกที่ขึ้นต้นด้วยจุด เช่น .bashrc",
    ],
    concept: `คำสั่ง **\`ls\`** (List) ใช้สำหรับแสดงรายการไฟล์และโฟลเดอร์ในตำแหน่งที่ต้องการ
ในงานหุ่นยนต์ คุณจะต้องใช้คำสั่งนี้บ่อยมากเพื่อตรวจสอบโฟลเดอร์ซอร์สโค้ด, ไฟล์ Launch และดูว่าอุปกรณ์เซนเซอร์เชื่อมต่อเข้ามาใน \`/dev\` หรือไม่

แฟล็กที่ใช้บ่อย:
- **\`ls -l\`**: แสดงรายละเอียดแบบยาว (สิทธิ์การเข้าถึง, เจ้าของไฟล์, ขนาด และเวลาแก้ไข)
- **\`ls -a\`**: แสดงไฟล์ทั้งหมด รวมถึงไฟล์ซ่อน (Hidden files ที่ขึ้นต้นด้วย \`.\` เช่น \`.bashrc\`)
- **\`ls -lh\`**: แสดงขนาดไฟล์เป็นหน่วยที่เข้าใจง่าย (KB, MB, GB)
- **\`ls -la\`**: รวมทั้งสองแฟล็กเพื่อตรวจสอบโฟลเดอร์อย่างครบถ้วน`,
    syntax: `ls [OPTIONS] [FILE/DIRECTORY]`,
    syntaxExplanation: `หากไม่ระบุที่อยู่ ls จะแสดงเนื้อหาในโฟลเดอร์ปัจจุบัน แต่สามารถระบุตำแหน่ง เช่น 'ls /dev' ได้`,
    examples: [
      {
        title: "แสดงรายการโฟลเดอร์ทั่วไป",
        language: "bash",
        code: `ls`,
        explanation: "แสดงโฟลเดอร์ที่มองเห็นได้ใน Home directory",
        output: `Documents/  Downloads/  robot_ws/  ros2_ws/`,
      },
      {
        title: "แสดงรายละเอียดสิทธิ์และขนาดไฟล์",
        language: "bash",
        code: `ls -l`,
        explanation: "แสดงสิทธิ์การเข้าถึง ขนาดไฟล์ และเวลาอัปเดต",
        output: `total 16\ndrwxr-xr-x 1 redbrick redbrick   4096 Sep 14 2026 Documents/\ndrwxr-xr-x 1 redbrick redbrick   4096 Sep 14 2026 Downloads/\ndrwxr-xr-x 1 redbrick redbrick   4096 Sep 14 2026 robot_ws/\ndrwxr-xr-x 1 redbrick redbrick   4096 Sep 14 2026 ros2_ws/`,
      },
      {
        title: "แสดงไฟล์ซ่อนและไฟล์คอนฟิก",
        language: "bash",
        code: `ls -a`,
        explanation: "เผยไฟล์คอนฟิกซ่อน เช่น .bashrc ที่เก็บการตั้งค่าตัวแปรสภาพแวดล้อมของ ROS 2",
        output: `.bashrc  Documents/  Downloads/  robot_ws/  ros2_ws/`,
      },
    ],
    roboticsContext: {
      title: "การตรวจสอบว่าไมโครคอนโทรลเลอร์หรือ LiDAR เสียบติดหรือไม่",
      description: "เมื่อเสียบบอร์ด ESP32 หรือเซนเซอร์ LiDAR เข้ากับพอร์ต USB ของหุ่นยนต์ ให้รันคำสั่ง 'ls -l /dev/ttyUSB*' หรือ 'ls -l /dev/ttyACM*' เพื่อดูว่าเคอร์เนลกำหนดชื่อพอร์ตให้อุปกรณ์แล้วหรือยัง",
      commandExample: `ls -l /dev/ttyUSB0\n# ผลลัพธ์: crw-rw---- 1 root dialout /dev/ttyUSB0`,
    },
    commonMistakes: [
      {
        mistake: "เข้าใจว่าไม่มีไฟล์คอนฟิกอยู่เพราะมองไม่เห็นในคำสั่ง ls ธรรมดา",
        solution: "ไฟล์คอนฟิกสำคัญของ Linux และ ROS มักขึ้นต้นด้วยจุดเสมอ ให้ใช้ 'ls -a' หรือ 'ls -la' เสมอ",
      },
    ],
    exercise: {
      instruction: "แสดงรายการไฟล์ทั้งหมดในไดเรกทอรีปัจจุบันรวมถึงไฟล์ซ่อนด้วยแฟล็ก -a",
      initialCommand: "ls ",
      targetCommand: ["ls -a", "ls -la", "ls -al"],
      hint: "เพิ่มแฟล็ก -a เช่น 'ls -a'",
      explanation: "ls -a จะแสดงไฟล์ซ่อน เช่น .bashrc ซึ่งใช้สำหรับโหลดสภาพแวดล้อม ROS 2 อัตโนมัติ",
    },
    quiz: [
      {
        id: "q-ls-1",
        type: "single",
        question: "แฟล็กใดของคำสั่ง ls ที่ใช้สำหรับแสดงไฟล์ซ่อนที่ขึ้นต้นด้วยจุด (.)?",
        options: [
          { id: "a", text: "-h" },
          { id: "b", text: "-a" },
          { id: "c", text: "-l" },
          { id: "d", text: "-r" },
        ],
        correctAnswer: "b",
        explanation: "-a (All) สั่งให้ ls แสดงไฟล์ทุกไฟล์รวมถึงไฟล์ซ่อน",
      },
      {
        id: "q-ls-2",
        type: "single",
        question: "แฟล็ก -l ในคำสั่ง 'ls -l' ให้ข้อมูลอะไรเพิ่มเติม?",
        options: [
          { id: "a", text: "โหมดประหยัดแรม" },
          { id: "b", text: "แสดงรายละเอียดสิทธิ์การเข้าถึง, เจ้าของไฟล์ และขนาดไฟล์แบบละเอียด" },
          { id: "c", text: "วนลูปไม่มีที่สิ้นสุด" },
          { id: "d", text: "แสดงเฉพาะไฟล์ที่ลิงก์ไว้" },
        ],
        correctAnswer: "b",
        explanation: "-l (Long format) แสดงตารางสิทธิ์ (Permissions), เจ้าของ (Owner), กลุ่ม (Group) และขนาดไฟล์",
      },
    ],
    teacherNotes: {
      pedagogicalGoal: "ให้ผู้เรียนสามารถอ่านสิทธิ์ไฟล์และค้นหาไฟล์คอนฟิกซ่อนได้อย่างมั่นใจ",
      keyPointsToEmphasize: ["ความแตกต่างระหว่าง 'ls' และ 'ls -l'", "การรวมแฟล็กเช่น 'ls -la'"],
      commonStudentConfusions: ["ลืมว่า .bashrc ซ่อนอยู่ จึงคิดว่าไฟล์หาย"],
      suggestedDiscussionPrompt: "ทำไม Linux จึงซ่อนไฟล์คอนฟิกด้วยการขึ้นต้นด้วยจุด แทนการใช้ฟีเจอร์ซ่อนไฟล์ของระบบ?",
    },
    prevLesson: { title: "03. คำสั่ง pwd", slug: "03-pwd" },
    nextLesson: { title: "05. คำสั่ง cd", slug: "05-cd" },
  },

  "05-cd": {
    id: "linux-05",
    slug: "05-cd",
    title: "คำสั่ง cd — การเปลี่ยนไดเรกทอรีและการนำทางในเวิร์กสเปซ",
    courseId: "linux",
    moduleNumber: 2,
    moduleTitle: "การนำทางและโครงสร้างระบบไฟล์",
    order: 5,
    durationMinutes: 20,
    difficulty: "Beginner",
    learningObjectives: [
      "ใช้คำสั่ง 'cd' เพื่อเปลี่ยนโฟลเดอร์การทำงาน",
      "ใช้ 'cd ..' เพื่อถอยกลับไปยังโฟลเดอร์แม่ และ 'cd ~' เพื่อกลับหน้าหลัก",
      "ใช้ 'cd -' เพื่อสลับกลับไปยังโฟลเดอร์ก่อนหน้าอย่างรวดเร็ว",
    ],
    concept: `คำสั่ง **\`cd\`** (Change Directory) ใช้สำหรับย้ายตำแหน่งการทำงานไปยังโฟลเดอร์อื่น

เทคนิคการนำทางที่จำเป็นสำหรับงานหุ่นยนต์:
- **\`cd ~\`** หรือเพียง **\`cd\`**: กลับสู่โฟลเดอร์หลักของผู้ใช้ (\`/home/redbrick\`)
- **\`cd ..\`**: ถอยขึ้นไปหนึ่งระดับ (Parent directory)
- **\`cd ../..\`**: ถอยขึ้นไปสองระดับ
- **\`cd -\`**: สลับกลับไปยังโฟลเดอร์ล่าสุดที่คุณเพิ่งเดินออกมาทันที
- **\`cd .\`**: อ้างอิงโฟลเดอร์ปัจจุบัน`,
    syntax: `cd [DIRECTORY_PATH]`,
    syntaxExplanation: `หากไม่ระบุเส้นทาง cd จะพาคุณกลับไปยัง Home directory ทันที`,
    examples: [
      {
        title: "เข้าไปยัง Workspace ของ ROS 2",
        language: "bash",
        code: `cd ~/ros2_ws`,
        explanation: "เปลี่ยนตำแหน่งเข้าไปในโฟลเดอร์ ros2_ws ใน Home",
      },
      {
        title: "ถอยกลับโฟลเดอร์แม่หนึ่งระดับ",
        language: "bash",
        code: `cd ..`,
        explanation: "ถอยออกจากโฟลเดอร์ปัจจุบันขึ้นไปหนึ่งชั้น",
      },
      {
        title: "สลับกลับโฟลเดอร์ก่อนหน้าทันที",
        language: "bash",
        code: `cd -`,
        explanation: "สลับกลับไปยังโฟลเดอร์ที่คุณเพิ่งอยู่ก่อนหน้านี้",
      },
    ],
    roboticsContext: {
      title: "การบิลด์แพ็กเกจที่ Root ของ Workspace",
      description: "ใน ROS 2 คุณต้องรันคำสั่ง 'colcon build' ที่จุดสูงสุดของเวิร์กสเปซ (~/ros2_ws) เสมอ ห้ามรันข้างในโฟลเดอร์ src ทักษะการใช้ 'cd ..' และ 'cd ~/ros2_ws' จึงสำคัญอย่างยิ่งเพื่อป้องกันการบิลด์ผิดพลาด",
    },
    commonMistakes: [
      {
        mistake: "สั่ง colcon build จากภายในโฟลเดอร์ ~/ros2_ws/src",
        solution: "ให้ใช้คำสั่ง 'cd ~/ros2_ws' เพื่อถอยออกมาก่อนเริ่มคอมไพล์โค้ดเสมอ",
      },
    ],
    exercise: {
      instruction: "เปลี่ยนไดเรกทอรีเข้าไปในโฟลเดอร์ ros2_ws",
      initialCommand: "cd ",
      targetCommand: ["cd ros2_ws", "cd ~/ros2_ws", "cd ./ros2_ws"],
      hint: "พิมพ์ 'cd ros2_ws' หรือ 'cd ~/ros2_ws'",
      explanation: "cd จะเปลี่ยนโฟลเดอร์การทำงานไปยัง ~/ros2_ws",
    },
    quiz: [
      {
        id: "q-cd-1",
        type: "single",
        question: "สัญลักษณ์ใดในคำสั่ง cd ใช้สำหรับถอยขึ้นไปยังไดเรกทอรีแม่ 1 ระดับ?",
        options: [
          { id: "a", text: "cd ." },
          { id: "b", text: "cd .." },
          { id: "c", text: "cd /" },
          { id: "d", text: "cd ~" },
        ],
        correctAnswer: "b",
        explanation: "'..' ในระบบไฟล์แทนความหมายของไดเรกทอรีแม่ด้านบนหนึ่งชั้น",
      },
    ],
    teacherNotes: {
      pedagogicalGoal: "สร้างความคล่องแคล่วในการเคลื่อนที่เข้า-ออกระหว่างโฟลเดอร์ซอร์สโค้ดและเวิร์กสเปซหลัก",
      keyPointsToEmphasize: ["การใช้ 'cd -' สลับไปมา", "ทำไมต้องบิลด์ที่ Root ของ Workspace"],
      commonStudentConfusions: ["การเว้นวรรค เช่น cd.. ติดกันจะไม่ทำงาน ต้องเป็น 'cd ..'"],
      suggestedDiscussionPrompt: "เหตุใดระบบ build ของ ROS 2 จึงบังคับให้รันคำสั่งที่ Workspace Root แทนที่จะให้รันในโฟลเดอร์ของแพ็กเกจย่อย?",
    },
    prevLesson: { title: "04. คำสั่ง ls", slug: "04-ls" },
    nextLesson: { title: "06. คำสั่ง mkdir", slug: "06-mkdir" },
  },

  "06-mkdir": {
    id: "linux-06",
    slug: "06-mkdir",
    title: "คำสั่ง mkdir — การสร้างโครงสร้าง ROS 2 Workspace",
    courseId: "linux",
    moduleNumber: 3,
    moduleTitle: "การจัดการไฟล์และไดเรกทอรี",
    order: 6,
    durationMinutes: 15,
    difficulty: "Beginner",
    learningObjectives: [
      "ใช้คำสั่ง 'mkdir' เพื่อสร้างโฟลเดอร์ใหม่",
      "ใช้แฟล็ก '-p' เพื่อสร้างโฟลเดอร์ซ้อนกันหลายชั้นในคำสั่งเดียว",
      "สร้างโครงสร้างโฟลเดอร์มาตรฐานของ ROS 2: ~/ros2_ws/src",
    ],
    concept: `คำสั่ง **\`mkdir\`** (Make Directory) ใช้สำหรับสร้างโฟลเดอร์ใหม่

แฟล็กที่สำคัญที่สุดสำหรับงานหุ่นยนต์คือ **\`-p\` (parents)**
หากไม่ใส่ \`-p\` แล้วคุณสั่ง \`mkdir ros2_ws/src\` ในขณะที่โฟลเดอร์ \`ros2_ws\` ยังไม่เคยถูกสร้างขึ้น ระบบจะแจ้งข้อผิดพลาด: \`No such file or directory\`
แต่เมื่อใส่ \`-p\` ระบบจะสร้างโฟลเดอร์แม่ที่ขาดอยู่ให้โดยอัตโนมัติอย่างราบรื่น`,
    syntax: `mkdir [OPTIONS] DIRECTORY_NAME...`,
    syntaxExplanation: `mkdir -p ช่วยสร้างโฟลเดอร์แม่ทั้งหมดในเส้นทางที่ระบุ และจะไม่แจ้ง error หากโฟลเดอร์นั้นมีอยู่แล้ว`,
    examples: [
      {
        title: "สร้างโครงสร้าง Workspace มาตรฐานของ ROS 2",
        language: "bash",
        code: `mkdir -p ~/ros2_ws/src`,
        explanation: "สร้างทั้งโฟลเดอร์ ros2_ws และโฟลเดอร์ src ภายในคำสั่งเดียว",
      },
      {
        title: "สร้างโฟลเดอร์คอนฟิกและ Launch พร้อมกันหลายโฟลเดอร์",
        language: "bash",
        code: `mkdir -p ~/robot_ws/launch ~/robot_ws/config ~/robot_ws/maps`,
        explanation: "สร้างโฟลเดอร์ที่จำเป็นสำหรับเก็บไฟล์แผนที่และพารามิเตอร์พร้อมกัน",
      },
    ],
    roboticsContext: {
      title: "โครงสร้างมาตรฐานระดับโลกของ ROS 2 Workspace",
      description: "นักพัฒนาหุ่นยนต์ทุกคนเริ่มต้นโปรเจกต์ด้วย 'mkdir -p ~/ros2_ws/src' โค้ดทั้งหมดของคุณจะอยู่ในโฟลเดอร์ 'src' ส่วน colcon จะสร้างโฟลเดอร์ build, install และ log ขึ้นมาคู่กันในภายหลัง",
      diagram: `~/ros2_ws/
├── src/        <- เราสร้างเองด้วย mkdir -p
│   ├── robot_description/
│   └── robot_navigation/
├── build/      <- colcon สร้างให้อัตโนมัติเมื่อคอมไพล์
├── install/    <- colcon สร้างให้อัตโนมัติเมื่อคอมไพล์
└── log/        <- colcon สร้างให้อัตโนมัติเมื่อคอมไพล์`,
    },
    commonMistakes: [
      {
        mistake: "สั่ง 'mkdir ros2_ws/src' โดยลืมแฟล็ก -p ทำให้เกิดข้อผิดพลาด",
        solution: "ใส่แฟล็ก '-p' เสมอเมื่อต้องการสร้างโฟลเดอร์ซ้อนหลายระดับ",
      },
    ],
    exercise: {
      instruction: "สร้างไดเรกทอรีชื่อ robot_ws ภายใน Home directory ของคุณ",
      initialCommand: "mkdir ",
      targetCommand: ["mkdir robot_ws", "mkdir ~/robot_ws"],
      hint: "พิมพ์ 'mkdir robot_ws'",
      explanation: "mkdir robot_ws จะสร้างโฟลเดอร์ใหม่สำหรับเก็บโปรเจกต์หุ่นยนต์ของคุณ",
    },
    quiz: [
      {
        id: "q-mkdir-1",
        type: "single",
        question: "แฟล็กใดของคำสั่ง mkdir ที่ช่วยสร้างโฟลเดอร์แม่ที่ยังไม่มีอยู่ให้โดยอัตโนมัติ?",
        options: [
          { id: "a", text: "-r" },
          { id: "b", text: "-f" },
          { id: "c", text: "-p" },
          { id: "d", text: "-a" },
        ],
        correctAnswer: "c",
        explanation: "แฟล็ก -p (Parents) ช่วยสร้างไดเรกทอรีแม่ทั้งหมดในพาธให้อัตโนมัติ",
      },
    ],
    teacherNotes: {
      pedagogicalGoal: "สร้างความคุ้นเคยกับคำสั่ง mkdir -p ~/ros2_ws/src ซึ่งเป็นจุดเริ่มต้นของทุกงานใน ROS 2",
      keyPointsToEmphasize: ["อย่าเอาโค้ดไปไว้นอก src เด็ดขาด", "ประโยชน์ของแฟล็ก -p"],
      commonStudentConfusions: ["ความเข้าใจผิดว่า colcon จะสร้างโฟลเดอร์ src ให้เอง (เราต้องสร้างเอง)"],
      suggestedDiscussionPrompt: "ทำไมระบบหุ่นยนต์จึงแยกโฟลเดอร์ src ออกจาก build และ install?",
    },
    prevLesson: { title: "05. คำสั่ง cd", slug: "05-cd" },
    nextLesson: { title: "07. คำสั่ง touch", slug: "07-touch" },
  },

  "07-touch": {
    id: "linux-07",
    slug: "07-touch",
    title: "คำสั่ง touch — การสร้างไฟล์สคริปต์และโหนดหุ่นยนต์",
    courseId: "linux",
    moduleNumber: 3,
    moduleTitle: "การจัดการไฟล์และไดเรกทอรี",
    order: 7,
    durationMinutes: 10,
    difficulty: "Beginner",
    learningObjectives: [
      "ใช้คำสั่ง 'touch' เพื่อสร้างไฟล์เปล่าใหม่",
      "เข้าใจการอัปเดตเวลาเข้าถึงและเวลาแก้ไขไฟล์ด้วย touch",
      "สร้างไฟล์โหนด Python, สคริปต์ Launch และไฟล์พารามิเตอร์ YAML",
    ],
    concept: `คำสั่ง **\`touch\`** ใช้สำหรับสร้างไฟล์เปล่าใหม่หากไฟล์นั้นยังไม่มีอยู่ในระบบ
แต่หากไฟล์นั้นมีอยู่แล้ว \`touch\` จะอัปเดตเวลาการเข้าถึง (Access time) และเวลาแก้ไขล่าสุด (Modification time) ให้เป็นเวลาปัจจุบัน โดยไม่ลบหรือเปลี่ยนเนื้อหาภายในไฟล์เลยแม้แต่น้อย`,
    syntax: `touch [OPTIONS] FILE_NAME...`,
    syntaxExplanation: `สามารถระบุชื่อไฟล์หลายไฟล์พร้อมกันเพื่อสร้างไฟล์เปล่าหลายไฟล์ในคำสั่งเดียว`,
    examples: [
      {
        title: "สร้างไฟล์โหนด Python สำหรับหุ่นยนต์",
        language: "bash",
        code: `touch robot_controller.py`,
        explanation: "สร้างไฟล์เปล่าพร้อมสำหรับเขียนโค้ดโหนด rclpy",
      },
      {
        title: "สร้างไฟล์พร้อมกันหลายประเภท",
        language: "bash",
        code: `touch params.yaml robot.launch.py README.md`,
        explanation: "สร้างไฟล์คอนฟิก ไฟล์ Launch และเอกสารพร้อมกัน",
      },
    ],
    roboticsContext: {
      title: "การสร้างไฟล์ __init__.py ในแพ็กเกจ Python ของ ROS 2",
      description: "เมื่อสร้างแพ็กเกจ ROS 2 ด้วย Python โฟลเดอร์ของโมดูลจำเป็นต้องมีไฟล์ '__init__.py' ว่างๆ อยู่ข้างใน เพื่อให้ Python มองเห็นว่าเป็น Package ที่ import ได้ วิศวกรจึงมักใช้คำสั่ง 'touch __init__.py'",
    },
    commonMistakes: [
      {
        mistake: "คิดว่า touch สามารถสร้างโฟลเดอร์ที่ยังไม่มีอยู่ได้",
        solution: "touch จะสร้างได้เฉพาะไฟล์เท่านั้น หากโฟลเดอร์แม่ยังไม่มีอยู่ ต้องใช้ 'mkdir -p' สร้างโฟลเดอร์ก่อน",
      },
    ],
    exercise: {
      instruction: "สร้างไฟล์สคริปต์ Python ชื่อ lidar_node.py โดยใช้คำสั่ง touch",
      initialCommand: "touch ",
      targetCommand: "touch lidar_node.py",
      hint: "พิมพ์ 'touch lidar_node.py'",
      explanation: "touch จะสร้างไฟล์เปล่าชื่อ lidar_node.py",
    },
    quiz: [
      {
        id: "q-touch-1",
        type: "single",
        question: "จะเกิดอะไรขึ้นหากสั่ง 'touch file.txt' ในขณะที่ไฟล์ file.txt มีเนื้อหาอยู่แล้ว?",
        options: [
          { id: "a", text: "เนื้อหาจะถูกลบและกลายเป็นไฟล์ว่าง" },
          { id: "b", text: "เวลาแก้ไขล่าสุดของไฟล์จะถูกอัปเดต โดยที่เนื้อหาข้างในยังคงเดิมทุกประการ" },
          { id: "c", text: "เกิด Error ทันที" },
          { id: "d", text: "ไฟล์จะถูกเปลี่ยนชื่อ" },
        ],
        correctAnswer: "b",
        explanation: "touch จะอัปเดตเฉพาะ Timestamp ของไฟล์โดยไม่แตะต้องเนื้อหาภายในอย่างปลอดภัย",
      },
    ],
    teacherNotes: {
      pedagogicalGoal: "สอนเรื่องการสร้างไฟล์ และบทบาทของ Timestamp ที่ Build system ใช้ตรวจสอบการคอมไพล์ซ้ำ",
      keyPointsToEmphasize: ["Timestamp กับระบบ build (make, colcon)", "ไฟล์ __init__.py"],
      commonStudentConfusions: ["คิดว่า touch จะเปิดหน้าต่างพิมพ์โค้ดขึ้นมา"],
      suggestedDiscussionPrompt: "Build tool เช่น colcon หรือ make ทราบได้อย่างไรว่าไฟล์ C++ ไฟล์ไหนถูกแก้ไขและต้องคอมไพล์ใหม่?",
    },
    prevLesson: { title: "06. คำสั่ง mkdir", slug: "06-mkdir" },
    nextLesson: { title: "08. คำสั่ง cp, mv, rm", slug: "08-cp-mv-rm" },
  },

  "08-cp-mv-rm": {
    id: "linux-08",
    slug: "08-cp-mv-rm",
    title: "cp, mv และ rm — การจัดการไฟล์หุ่นยนต์อย่างปลอดภัย",
    courseId: "linux",
    moduleNumber: 3,
    moduleTitle: "การจัดการไฟล์และไดเรกทอรี",
    order: 8,
    durationMinutes: 25,
    difficulty: "Beginner",
    learningObjectives: [
      "คัดลอกไฟล์และโฟลเดอร์ด้วย 'cp' และ 'cp -r'",
      "ย้ายและเปลี่ยนชื่อไฟล์ด้วย 'mv'",
      "ลบไฟล์และโฟลเดอร์ด้วย 'rm' และ 'rm -rf' พร้อมตระหนักว่าใน Terminal ไม่มีถังขยะ Recycle Bin",
    ],
    concept: `คำสั่งจัดการไฟล์พื้นฐานที่ต้องใช้ความระมัดระวัง:

1. **\`cp\` (Copy)**:
   - คัดลอกไฟล์: \`cp source.py backup.py\`
   - คัดลอกทั้งโฟลเดอร์: \`cp -r src/ backup_src/\` (ต้องใส่ \`-r\` เพื่อคัดลอกแบบ Recursive)
2. **\`mv\` (Move / Rename)**:
   - เปลี่ยนชื่อไฟล์: \`mv old_node.py new_node.py\`
   - ย้ายไฟล์: \`mv robot.launch.py ~/robot_ws/launch/\`
3. **\`rm\` (Remove)**:
   - ลบไฟล์: \`rm temp.log\`
   - ลบทั้งโฟลเดอร์อย่างถาวร: \`rm -rf build/\`
   - **คำเตือนสำคัญ**: ใน Terminal **ไม่มีถังขยะ Recycle Bin** เมื่อสั่ง rm ข้อมูลจะถูกลบออกจากดิสก์ทันทีและกู้คืนไม่ได้!`,
    syntax: `cp [OPTIONS] SOURCE DEST\nmv SOURCE DEST\nrm [OPTIONS] FILE...`,
    syntaxExplanation: `สำหรับการคัดลอกหรือลบโฟลเดอร์ ให้ใช้แฟล็ก -r หรือ -rf เสมอ`,
    examples: [
      {
        title: "สำรองไฟล์ Launch ก่อนแก้ไข",
        language: "bash",
        code: `cp robot.launch.py robot.launch.py.bak`,
        explanation: "ทำสำเนาไฟล์ไว้ก่อนปรับแต่งค่าพารามิเตอร์หุ่นยนต์",
      },
      {
        title: "ล้างแคชบิลด์เก่าของ Colcon เพื่อคอมไพล์ใหม่ทั้งหมด",
        language: "bash",
        code: `rm -rf build/ install/ log/`,
        explanation: "ขั้นตอนแก้ปัญหามาตรฐานเมื่อระบบคอมไพล์ ROS 2 ติดขัด",
      },
    ],
    roboticsContext: {
      title: "เมื่อไหร่ที่วิศวกรต้องล้างโฟลเดอร์ build และ install",
      description: "เมื่อมีการแก้ไขโครงสร้าง CMakeLists.txt, เพิ่มไฟล์ Header หรือเปลี่ยนชนิดข้อความใน ROS 2 บางครั้งแคชเดิมอาจทำให้เกิดข้อผิดพลาด การสั่ง 'rm -rf build/ install/' ที่ Workspace Root แล้วบิลด์ใหม่จะช่วยแก้ปัญหาได้อย่างเด็ดขาด",
    },
    commonMistakes: [
      {
        mistake: "เผลอสั่ง rm -rf / หรือพิมพ์ช่องว่างผิดใน Relative path",
        solution: "ห้ามสั่ง rm -rf ร่วมกับ sudo หรือโฟลเดอร์รากเด็ดขาด และควรตรวจตำแหน่งด้วย pwd ก่อนลบเสมอ",
      },
    ],
    exercise: {
      instruction: "ลบไดเรกทอรีชั่วคราวชื่อ test_dir และเนื้อหาทั้งหมดภายในด้วยคำสั่ง rm -rf",
      initialCommand: "rm ",
      targetCommand: ["rm -rf test_dir", "rm -r test_dir"],
      hint: "ใช้ 'rm -rf test_dir'",
      explanation: "rm -rf จะลบโฟลเดอร์และไฟล์ข้างในทั้งหมดแบบ Recursive โดยไม่ถามยืนยัน",
    },
    quiz: [
      {
        id: "q-rm-1",
        type: "single",
        question: "ใน Linux Terminal มีถังขยะ (Recycle Bin / Trash) สำหรับกู้คืนไฟล์ที่ถูกลบด้วยคำสั่ง rm หรือไม่?",
        options: [
          { id: "a", text: "มี อยู่ในโฟลเดอร์ ~/.Trash" },
          { id: "b", text: "ไม่มี ข้อมูลจะถูกลบออกจากระบบอย่างถาวรทันที" },
          { id: "c", text: "มี สามารถกู้คืนได้ด้วยคำสั่ง unrm" },
          { id: "d", text: "มีเฉพาะเมื่อไม่ได้ใส่แฟล็ก -f" },
        ],
        correctAnswer: "b",
        explanation: "คำสั่ง rm จะตัด Inode ของไฟล์ออกจากระบบไฟล์ทันที จึงไม่มีถังขยะให้กู้คืน",
      },
    ],
    teacherNotes: {
      pedagogicalGoal: "ปลูกฝังวินัยความปลอดภัยในการจัดการไฟล์ ย้ำเตือนอันตรายของคำสั่ง rm -rf",
      keyPointsToEmphasize: ["cp ต้องการ -r สำหรับโฟลเดอร์", "คำสั่ง mv ทำหน้าที่ทั้งย้ายและเปลี่ยนชื่อไฟล์"],
      commonStudentConfusions: ["พยายามหาคำสั่ง 'rename' ใน Linux"],
      suggestedDiscussionPrompt: "ทำไม Linux จึงใช้คำสั่งเดียวกัน (mv) สำหรับทั้งการย้ายที่อยู่และการเปลี่ยนชื่อไฟล์?",
    },
    prevLesson: { title: "07. คำสั่ง touch", slug: "07-touch" },
    nextLesson: { title: "09. คำสั่ง cat, grep และ find", slug: "09-cat-grep-find" },
  },

  "09-cat-grep-find": {
    id: "linux-09",
    slug: "09-cat-grep-find",
    title: "cat, grep และ find — การตรวจสอบ Log และไฟล์คอนฟิกเซนเซอร์",
    courseId: "linux",
    moduleNumber: 4,
    moduleTitle: "การตรวจสอบ ค้นหา และอ่าน Log",
    order: 9,
    durationMinutes: 20,
    difficulty: "Intermediate",
    learningObjectives: [
      "อ่านและแสดงเนื้อหาไฟล์ด้วย 'cat'",
      "ค้นหาข้อความและกรอง Log การทำงานด้วย 'grep'",
      "ค้นหาตำแหน่งไฟล์ในโปรเจกต์หุ่นยนต์ขนาดใหญ่ด้วย 'find'",
    ],
    concept: `ระบบหุ่นยนต์สร้างข้อมูลการทำงานและ Log ข้อความแจ้งเตือนจำนวนมหาศาล
เครื่องมือกรองข้อความช่วยให้วิศวกรค้นหาจุดที่เซนเซอร์หลุด หรือหาไฟล์ที่ต้องการได้ในไม่กี่วินาที:

1. **\`cat\`** (Concatenate): แสดงข้อความทั้งหมดในไฟล์ออกมาที่หน้าจอ
2. **\`grep\`** (Global Regular Expression Print): ค้นหาเฉพาะบรรทัดที่มีคำที่ต้องการ
   - \`grep "ERROR" robot.log\`
   - เชื่อมกับท่อคำสั่ง (Pipe): \`ros2 topic list | grep scan\`
3. **\`find\`**: ค้นหาตำแหน่งไฟล์ในระบบตามชื่อหรือนามสกุล:
   - \`find . -name "*.launch.py"\``,
    syntax: `cat FILE\ngrep [OPTIONS] PATTERN FILE\nfind [DIR] -name "PATTERN"`,
    syntaxExplanation: `grep ใช้ค้นหา 'ข้อความข้างในไฟล์' ส่วน find ใช้ค้นหา 'ชื่อของไฟล์'`,
    examples: [
      {
        title: "กรองหาเฉพาะข้อความ Error ใน Log ระบบ",
        language: "bash",
        code: `grep "ERROR" /var/log/syslog`,
        explanation: "ค้นหาบรรทัดที่มีคำว่า ERROR ในระบบ",
      },
      {
        title: "ค้นหาไฟล์ Launch ทั้งหมดใน Workspace",
        language: "bash",
        code: `find ~/ros2_ws/src -name "*.launch.py"`,
        explanation: "แสดงตำแหน่งของทุกไฟล์ .launch.py ในทุกแพ็กเกจ",
      },
    ],
    roboticsContext: {
      title: "การตรวจสอบสาเหตุที่โหนดหุ่นยนต์แครชด้วย grep",
      description: "เมื่อโหนดหุ่นยนต์หยุดทำงานกะทันหัน วิศวกรจะใช้คำสั่ง 'cat ~/.ros/log/latest/rosout.log | grep -E \"WARN|ERROR|FATAL\"' เพื่อดึงเฉพาะข้อผิดพลาดออกมาวิเคราะห์ได้ทันทีโดยไม่ต้องอ่าน Log หลายพันบรรทัด",
    },
    commonMistakes: [
      {
        mistake: "ใช้ grep เพื่อค้นหาชื่อไฟล์แทนที่จะใช้ find",
        solution: "จำง่ายๆ: 'find' ค้นหาไฟล์; 'grep' ค้นหาข้อความข้างในไฟล์",
      },
    ],
    exercise: {
      instruction: "ค้นหาไฟล์ทั้งหมดที่มีนามสกุล .rules ในโฟลเดอร์ /etc โดยใช้คำสั่ง find",
      initialCommand: "find ",
      targetCommand: ["find /etc -name \"*.rules\"", "find /etc -name '*.rules'"],
      hint: "พิมพ์ find /etc -name \"*.rules\"",
      explanation: "find จะค้นหาไฟล์กฎ udev ในโฟลเดอร์ /etc ที่ตรงกับเงื่อนไข",
    },
    quiz: [
      {
        id: "q-grep-1",
        type: "single",
        question: "คำสั่งใดเหมาะสมที่สุดสำหรับการค้นหาคำว่า 'exception' ภายในไฟล์ Log ขนาด 10,000 บรรทัด?",
        options: [
          { id: "a", text: "find" },
          { id: "b", text: "grep" },
          { id: "c", text: "touch" },
          { id: "d", text: "mkdir" },
        ],
        correctAnswer: "b",
        explanation: "grep ถูกออกแบบมาสำหรับค้นหาและกรองข้อความภายในไฟล์อย่างรวดเร็ว",
      },
    ],
    teacherNotes: {
      pedagogicalGoal: "ให้ผู้เรียนสามารถแก้ไขปัญหาโค้ดหุ่นยนต์ของตนเองได้ด้วยการอ่าน Log และใช้ Pipe",
      keyPointsToEmphasize: ["ความต่างของ find กับ grep", "การใช้ Pipe: command | grep keyword"],
      commonStudentConfusions: ["ลืมใส่เครื่องหมายคำพูดใน find เช่น find . -name *.py"],
      suggestedDiscussionPrompt: "บนหุ่นยนต์ไร้คนขับที่มี Topic มากกว่า 200 รายการ การใช้ 'ros2 topic list | grep lidar' ช่วยเพิ่มความเร็วในการทำงานอย่างไร?",
    },
    prevLesson: { title: "08. คำสั่ง cp, mv, rm", slug: "08-cp-mv-rm" },
    nextLesson: { title: "10. สิทธิ์และพอร์ต Serial", slug: "10-permissions-robotics" },
  },

  "10-permissions-robotics": {
    id: "linux-10",
    slug: "10-permissions-robotics",
    title: "chmod, sudo และพอร์ต USB Serial สำหรับหุ่นยนต์",
    courseId: "linux",
    moduleNumber: 5,
    moduleTitle: "ฮาร์ดแวร์หุ่นยนต์และสิทธิ์การเข้าถึง",
    order: 10,
    durationMinutes: 25,
    difficulty: "Intermediate",
    learningObjectives: [
      "เข้าใจสิทธิ์การเข้าถึงไฟล์ใน Linux: อ่าน (r), เขียน (w), รันโปรแกรม (x)",
      "ใช้ 'chmod +x' เพื่อเปิดสิทธิ์ Execute ให้โหนด Python และสคริปต์หุ่นยนต์",
      "จัดการสิทธิ์พอร์ตฮาร์ดแวร์ (/dev/ttyUSB0, /dev/ttyACM0) ด้วยกลุ่ม 'dialout'",
      "เข้าใจบทบาทของกฎ udev ในการล็อกชื่อพอร์ตเซนเซอร์ให้ถาวร",
    ],
    concept: `ระบบความปลอดภัยของ Linux เข้มงวดมาก ในงานหุ่นยนต์ ปัญหากว่า 80% ที่เซนเซอร์เชื่อมต่อไม่ติด มักเกิดจากเรื่องสิทธิ์ (Permissions):

### 1. การเปิดสิทธิ์รันสคริปต์ (\`chmod +x\`)
เมื่อคุณเขียนสคริปต์ Python หรือ Shell script ระบบจะไม่ยอมให้รันจนกว่าจะเปิดสิทธิ์ Execute:
\`\`\`bash
chmod +x my_robot_node.py
\`\`\`

### 2. สิทธิ์การเข้าถึงพอร์ตสื่อสาร (\`/dev/ttyUSB0\` และกลุ่ม \`dialout\`)
บอร์ดไมโครคอนโทรลเลอร์ (ESP32, STM32, Arduino) และเซนเซอร์ LiDAR จะปรากฏอยู่ในรูปไฟล์อุปกรณ์ \`/dev/ttyUSB*\` หรือ \`/dev/ttyACM*\`
โดยเริ่มต้น อุปกรณ์เหล่านี้จะเป็นของกลุ่ม **\`dialout\`** หากบัญชีของคุณไม่ได้อยู่ในกลุ่มนี้ โหนด ROS 2 จะแครชทันทีด้วยข้อความ:
\`\`\`
PermissionError: [Errno 13] Permission denied: '/dev/ttyUSB0'
\`\`\`

วิธีแก้ไขอย่างถาวร:
\`\`\`bash
sudo usermod -aG dialout $USER
\`\`\`
*(หลังจากรันแล้ว ให้ออกจากระบบแล้วล็อกอินใหม่ หรือรีบูตเพื่อให้สิทธิ์มีผล)*`,
    syntax: `chmod [PERMISSIONS] FILE\nsudo usermod -aG GROUP USERNAME`,
    syntaxExplanation: `chmod +x เพิ่มสิทธิ์การรันโปรแกรม ส่วน usermod -aG เพิ่มผู้ใช้เข้าไปในกลุ่มเสริม`,
    examples: [
      {
        title: "เปิดสิทธิ์ Execute ให้สคริปต์โหนดหุ่นยนต์",
        language: "bash",
        code: `chmod +x my_robot_controller/robot_node.py`,
        explanation: "ทำให้คำสั่ง ros2 run สามารถเรียกใช้ไฟล์นี้เป็นโปรแกรมได้",
      },
      {
        title: "เพิ่มสิทธิ์เข้าถึงพอร์ต Serial ให้ผู้ใช้ปัจจุบัน",
        language: "bash",
        code: `sudo usermod -aG dialout $USER`,
        explanation: "อนุญาตให้อ่านและเขียนข้อมูลไปยังพอร์ต USB Serial ทุกพอร์ตได้โดยไม่ต้องใช้ sudo",
      },
    ],
    roboticsContext: {
      title: "ทำไมจึงไม่ควรใช้ 'sudo' ในการรันโหนด ROS 2",
      description: "ผู้เริ่มต้นมักพยายามรัน 'sudo ros2 run ...' เมื่อติดปัญหา Permission denied แต่นี่เป็นวิธีที่อันตรายมาก! เพราะจะทำให้ลูปควบคุมหุ่นยนต์รันด้วยสิทธิ์สูงสุดของระบบ ข้ามตัวแปรสภาพแวดล้อมของผู้ใช้ และสร้างไฟล์ Log ที่ผู้ใช้ธรรมดาเปิดไม่ได้ วิธีที่ถูกต้องคือการเพิ่มผู้ใช้เข้ากลุ่ม dialout",
    },
    commonMistakes: [
      {
        mistake: "ใช้ sudo ros2 run เพื่อแก้ปัญหาการเข้าถึงพอร์ต USB",
        solution: "เพิ่มผู้ใช้เข้ากลุ่ม dialout ด้วย 'sudo usermod -aG dialout $USER' แทน",
      },
      {
        mistake: "ลืมออกจากระบบ (Log out) หลังจากเพิ่มกลุ่ม dialout",
        solution: "สิทธิ์ของกลุ่มจะอัปเดตเมื่อเริ่มล็อกอินเซสชันใหม่เท่านั้น ให้รีบูตหรือรัน 'newgrp dialout'",
      },
    ],
    exercise: {
      instruction: "เพิ่มสิทธิ์การรันโปรแกรม (+x) ให้กับไฟล์สคริปต์ชื่อ 'robot_node.py'",
      initialCommand: "chmod ",
      targetCommand: "chmod +x robot_node.py",
      hint: "พิมพ์ 'chmod +x robot_node.py'",
      explanation: "chmod +x เปิดสิทธิ์ Execute ทำให้ระบบปฏิบัติการสามารถรันไฟล์นี้เป็นโปรแกรมได้",
    },
    quiz: [
      {
        id: "q-perm-1",
        type: "single",
        question: "ใน Ubuntu ผู้ใช้งานต้องอยู่ในกลุ่ม (Group) ใด จึงจะสามารถเข้าถึงพอร์ต USB Serial เช่น /dev/ttyUSB0 ได้โดยไม่ต้องใช้ sudo?",
        options: [
          { id: "a", text: "robot" },
          { id: "b", text: "dialout" },
          { id: "c", text: "audio" },
          { id: "d", text: "www-data" },
        ],
        correctAnswer: "b",
        explanation: "กลุ่ม dialout เป็นเจ้าของพอร์ตสื่อสาร Serial ในระบบ การอยู่ในกลุ่มนี้จะทำให้อ่านและส่งข้อมูลไปยังไมโครคอนโทรลเลอร์และ LiDAR ได้โดยตรง",
      },
      {
        id: "q-perm-2",
        type: "single",
        question: "คำสั่งใดใช้เปิดสิทธิ์การรัน (Execute) ให้กับไฟล์สคริปต์ Python?",
        options: [
          { id: "a", text: "chmod +r script.py" },
          { id: "b", text: "chmod +x script.py" },
          { id: "c", text: "touch +x script.py" },
          { id: "d", text: "chown root script.py" },
        ],
        correctAnswer: "b",
        explanation: "+x เป็นการเพิ่ม Execute Permission bit ให้กับไฟล์",
      },
    ],
    lab: {
      id: "linux-lab-01",
      title: "Linux Lab 01 — เตรียม Workspace และสคริปต์สำหรับหุ่นยนต์",
      description: "ทำตามขั้นตอนเพื่อสร้างโครงสร้างเวิร์กสเปซมาตรฐานของ ROS 2, จัดระเบียบโฟลเดอร์ และตั้งค่าสิทธิ์ไฟล์อย่างถูกต้อง",
      steps: [
        {
          step: 1,
          title: "กลับสู่ Home Directory",
          instruction: "ตรวจสอบว่าเทอร์มินัลของคุณอยู่ในโฟลเดอร์หลักของผู้ใช้",
          task: "พิมพ์ 'cd ~' หรือ 'cd' แล้วกด Enter",
          validationCommand: ["cd ~", "cd", "cd /home/redbrick"],
          hint: "พิมพ์ 'cd ~' เพื่อกลับบ้าน",
        },
        {
          step: 2,
          title: "สร้างโครงสร้าง Workspace และโฟลเดอร์ src",
          instruction: "สร้างโฟลเดอร์ ros2_ws พร้อมโฟลเดอร์ย่อย src ภายในคำสั่งเดียว",
          task: "รันคำสั่ง mkdir พร้อมแฟล็ก -p สร้าง 'ros2_ws/src'",
          validationCommand: ["mkdir -p ros2_ws/src", "mkdir -p ~/ros2_ws/src"],
          hint: "ใช้ 'mkdir -p ros2_ws/src'",
        },
        {
          step: 3,
          title: "สร้างไฟล์สคริปต์ตัวควบคุมหุ่นยนต์",
          instruction: "สร้างไฟล์เปล่าชื่อ 'my_controller.py' ในโฟลเดอร์หลัก",
          task: "ใช้คำสั่ง touch เพื่อสร้าง 'my_controller.py'",
          validationCommand: ["touch my_controller.py", "touch ~/my_controller.py"],
          hint: "พิมพ์ 'touch my_controller.py'",
        },
        {
          step: 4,
          title: "เปิดสิทธิ์ Execute ให้ไฟล์สคริปต์",
          instruction: "เปิดสิทธิ์การรันโปรแกรมให้ 'my_controller.py' พร้อมสำหรับรันเป็นโหนด",
          task: "ใช้คำสั่ง chmod +x กับ 'my_controller.py'",
          validationCommand: ["chmod +x my_controller.py", "chmod +x ~/my_controller.py"],
          hint: "พิมพ์ 'chmod +x my_controller.py'",
        },
      ],
    },
    teacherNotes: {
      pedagogicalGoal: "ขจัดอุปสรรคสำคัญที่สุดในการอบรมหุ่นยนต์ คือปัญหาเรื่อง Permission ของพอร์ตสื่อสาร",
      keyPointsToEmphasize: [
        "อันตรายของการใช้ sudo ros2 run",
        "บทบาทของ udev rules ในการตั้งชื่อพอร์ตคงที่ เช่น /dev/rplidar",
      ],
      commonStudentConfusions: ["คิดว่าต้องรัน chmod กับไฟล์ YAML ด้วย (ไฟล์ YAML ต้องการเพียงสิทธิ์อ่าน ไม่ต้อง Execute)"],
      suggestedDiscussionPrompt: "หากหุ่นยนต์มีอุปกรณ์แปลงสัญญาณ USB สองตัวที่หน้าตาเหมือนกันเป๊ะ (เช่น LiDAR กับบอร์ดขับมอเตอร์) Linux จะแยกความแตกต่างได้อย่างไร?",
    },
    prevLesson: { title: "09. คำสั่ง cat, grep และ find", slug: "09-cat-grep-find" },
  },
};
