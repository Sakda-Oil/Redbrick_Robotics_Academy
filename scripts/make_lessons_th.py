import json

def get_lessons_th():
    return {
  "01-introduction": {
    "id": "ros2-01",
    "slug": "01-introduction",
    "title": "สถาปัตยกรรม ROS 2, มิดเดิลแวร์ DDS และตัวแปร ROS_DOMAIN_ID",
    "courseId": "ros2-jazzy",
    "moduleNumber": 1,
    "moduleTitle": "สถาปัตยกรรม ROS 2 และ DDS",
    "order": 1,
    "durationMinutes": 20,
    "difficulty": "Beginner",
    "learningObjectives": [
      "เข้าใจว่า ROS 2 คืออะไร และต่างจาก ROS 1 อย่างไร (ไม่มี roscore ที่เป็นจุดเสี่ยงระบบล่มอีกต่อไป)",
      "เข้าใจการทำงานของมิดเดิลแวร์ DDS (Data Distribution Service) แบบกระจายศูนย์",
      "เรียนรู้วิธีตั้งค่า ROS_DOMAIN_ID เพื่อแยกวงสื่อสารของหุ่นยนต์ในห้องทดลองหรือโรงงาน",
      "เข้าใจความแตกต่างระหว่างระบบเคอร์เนลทั่วไปและเคอร์เนลแบบเรียลไทม์ (PREEMPT_RT)"
    ],
    "concept": r"""**Robot Operating System 2 (ROS 2)** คือชุดเครื่องมือพัฒนาซอฟต์แวร์มาตรฐานอุตสาหกรรมสำหรับสร้างหุ่นยนต์อัตโนมัติระดับโปรดักชัน
แม้จะมีคำว่า Operating System แต่ ROS 2 ไม่ใช่ระบบปฏิบัติการแบบ Windows หรือ Ubuntu แต่คือ **Robotics Middleware & Distributed Ecosystem** ที่ทำงานอยู่บนระบบปฏิบัติการ Linux

### การเปลี่ยนแปลงเชิงสถาปัตยกรรม: ROS 1 เทียบกับ ROS 2 Jazzy
| คุณสมบัติทางสถาปัตยกรรม | ROS 1 (เดิม / ยุติการพัฒนา) | ROS 2 Jazzy (Ubuntu 24.04 LTS) |
| :--- | :--- | :--- |
| **กลไกการค้นหาโหนด** | มีศูนย์กลางหลัก (`roscore`) | **กระจายศูนย์แบบ Peer-to-Peer (DDS)** |
| **ความเสถียรของระบบ** | หาก Master ดับ ทั้งระบบจะหยุดทำงานทันที | **ไม่มีจุดตายเดี่ยว (No SPOF) ฟื้นตัวได้เอง** |
| **การทำงานแบบ Real-Time** | ไม่รองรับ Real-time เชิงลึก | **รองรับ POSIX Real-time (PREEMPT_RT)** |
| **ความปลอดภัยของเครือข่าย** | ส่งข้อความแบบ Plaintext ไม่เข้ารหัส | **มี DDS-Security (SROS 2) เข้ารหัส TLS** |
| **การควบคุมหุ่นยนต์หลายตัว** | เชื่อมต่อเครือข่ายข้ามเครื่องได้ยาก | **รองรับการแยกวงสื่อสารผ่าน `ROS_DOMAIN_ID`** |

### มิดเดิลแวร์ DDS และตัวแปลง RMW
ROS 2 ใช้มาตรฐาน DDS (Data Distribution Service) จากกลุ่ม OMG ในการค้นหาโหนดและส่งข้อมูลแบบอัตโนมัติ
โดยใน ROS 2 Jazzy ตัวเริ่มต้นคือ **eProsima Fast DDS** (`rmw_fastrtps_cpp`) และรองรับ **Eclipse Cyclone DDS** (`rmw_cyclonedds_cpp`) โดยผู้พัฒนาสามารถสลับมิดเดิลแวร์ได้ง่ายผ่านตัวแปร:
```bash
export RMW_IMPLEMENTATION=rmw_cyclonedds_cpp
```

### การคำนวณแบบ Real-Time: เคอร์เนลมาตรฐาน vs. PREEMPT_RT
ระบบ Ubuntu 24.04 LTS มาพร้อมเคอร์เนล Linux มาตรฐานที่รองรับ preemptible scheduling ซึ่งเพียงพอสำหรับการประมวลผลเซนเซอร์และการนำทาง แต่หากต้องการระบบควบคุมมอเตอร์ระดับ Hard Real-Time ความถี่สูง (เช่น 1 kHz โดยมี Jitter ต่ำกว่ามิลลิวินาที) จำเป็นต้องติดตั้ง **Linux Real-Time (PREEMPT_RT) kernel patch** ผ่าน Ubuntu Pro (`linux-image-realtime`)

### การแบ่งแยกเครือข่ายหุ่นยนต์ด้วย `ROS_DOMAIN_ID`
โดยค่าเริ่มต้น ทุกโหนดของ ROS 2 บนวงแลนเดียวกันจะค้นหากันเจอผ่าน UDP Multicast
หากในห้องเรียนหรือโรงงานมีหุ่นยนต์หลายตัวใช้งาน Wi-Fi เดียวกัน สัญญาณของแต่ละกลุ่มจะตีกันและอาจสั่งงานข้ามหุ่นยนต์ได้!
การตั้งค่า `export ROS_DOMAIN_ID=42` จะช่วยกำหนดหมายเลขโดเมนเฉพาะ (แนะนำช่วง 0–101) เพื่อแยกวงสื่อสารของหุ่นยนต์แต่ละตัวออกจากกันอย่างปลอดภัย""",
    "syntax": "export ROS_DOMAIN_ID=42\nexport RMW_IMPLEMENTATION=rmw_fastrtps_cpp\nros2 doctor",
    "syntaxExplanation": "ควรกำหนดค่า ROS_DOMAIN_ID ไว้ในไฟล์ ~/.bashrc เพื่อให้ทุกเทอร์มินัลเชื่อมต่อไปยังวงสื่อสารของหุ่นยนต์ของคุณเสมอ",
    "examples": [
      {
        "title": "กำหนดหมายเลขช่องสื่อสารของหุ่นยนต์",
        "language": "bash",
        "code": "export ROS_DOMAIN_ID=42\necho \"Active ROS 2 Domain ID: $ROS_DOMAIN_ID\"",
        "explanation": "แยกวงการค้นหาของ DDS ให้สื่อสารเฉพาะในโดเมนหมายเลข 42",
        "output": "Active ROS 2 Domain ID: 42"
      },
      {
        "title": "ตรวจสอบความสมบูรณ์ของระบบ ROS 2",
        "language": "bash",
        "code": "ros2 doctor --report",
        "explanation": "ตรวจสอบการเชื่อมต่อเน็ตเวิร์ก มิดเดิลแวร์ DDS และแจ้งเตือนปัญหาในระบบ",
        "output": "All 4 checks passed\nSUCCESS: ROS 2 installation is healthy."
      }
    ],
    "roboticsContext": {
      "title": "สถาปัตยกรรมหุ่นยนต์ Redbrick Mobile Robot (Raspberry Pi 5 + ESP32)",
      "description": "หุ่นยนต์ Redbrick Mobile Robot ออกแบบด้วยสถาปัตยกรรมประมวลผลสองระดับ: สมองส่วนบนใช้บอร์ด Raspberry Pi 5 รัน Ubuntu 24.04 LTS และ ROS 2 Jazzy สำหรับงานคำนวณหนัก (LiDAR SLAM, กล้อง และ Nav2) สื่อสารผ่าน UART/USB ไปยังบอร์ดไมโครคอนโทรลเลอร์ ESP32 ที่รัน micro-ROS เพื่อควบคุมมอเตอร์ขับเคลื่อนและอ่านเอ็นโค้ดเดอร์แบบความเร็วสูง",
      "diagram": "+---------------------------------------------------+\n|       Redbrick Mobile Robot (Differential Drive)  |\n|                                                   |\n|  [สมองส่วนบน: Raspberry Pi 5 - Ubuntu 24.04 LTS]  |\n|    - โหนด ROS 2 Jazzy: /lidar_node, /camera_node  |\n|    - ระบบนำทาง: Nav2, Costmaps, Behavior Trees    |\n|               | (/cmd_vel ผ่าน UART/USB)          |\n|               v                                   |\n|  [ตัวควบคุมส่วนล่าง: ESP32 micro-ROS]             |\n|    - ขับมอเตอร์ซ้าย-ขวาด้วยสัญญาณ PWM แบบ Real-Time |\n|    - อ่านค่าเอ็นโค้ดเดอร์ล้อส่งกลับเป็น /odom     |\n+---------------------------------------------------+"
    },
    "commonMistakes": [
      {
        "mistake": "พยายามพิมพ์คำสั่ง 'roscore' ใน ROS 2",
        "solution": "ใน ROS 2 ไม่มีคำสั่ง 'roscore' อีกต่อไป! โหนดต่างๆ ค้นหากันเองอัตโนมัติผ่านมิดเดิลแวร์ DDS"
      },
      {
        "mistake": "ตั้งค่า ROS_DOMAIN_ID บนตัวหุ่นยนต์และเครื่องคอมพิวเตอร์ควบคุมไม่ตรงกัน",
        "solution": "เครื่องคอมพิวเตอร์ควบคุมและตัวหุ่นยนต์ (Raspberry Pi 5) ต้องตั้งค่า ROS_DOMAIN_ID หมายเลขเดียวกันเสมอ"
      }
    ],
    "exercise": {
      "instruction": "ตรวจสอบเวอร์ชันของระบบ ROS 2 ที่ติดตั้งอยู่ด้วยคำสั่ง 'ros2 version'",
      "initialCommand": "ros2 ",
      "targetCommand": "ros2 version",
      "hint": "พิมพ์ 'ros2 version'",
      "explanation": "ros2 version จะแสดงชื่อเวอร์ชันที่กำลังใช้งานอยู่ (jazzy)"
    },
    "quiz": [
      {
        "id": "q-ros-arch-1",
        "type": "single",
        "question": "ระบบ ROS 2 Jazzy จำเป็นต้องเปิดโปรเซส 'roscore' ค้างไว้เพื่อเป็นศูนย์กลางหรือไม่?",
        "options": [
          {"id": "a", "text": "จำเป็น ต้องเปิดทิ้งไว้ในเทอร์มินัลแยกต่างหาก"},
          {"id": "b", "text": "ไม่จำเป็น ROS 2 ใช้มิดเดิลแวร์ DDS แบบกระจายศูนย์ ค้นหากันเองแบบอัตโนมัติ"},
          {"id": "c", "text": "จำเป็นเฉพาะเมื่อเขียนโหนดด้วยภาษา Python"},
          {"id": "d", "text": "จำเป็นเฉพาะเมื่อเชื่อมต่อหุ่นยนต์หลายตัว"}
        ],
        "correctAnswer": "b",
        "explanation": "ROS 2 ตัดระบบศูนย์กลาง roscore ออกไปอย่างสมบูรณ์ และใช้ DDS Multicast ในการค้นหาโหนดแบบกระจายศูนย์"
      },
      {
        "id": "q-ros-arch-2",
        "type": "single",
        "question": "เหตุใดการกำหนด 'ROS_DOMAIN_ID' จึงมีความสำคัญอย่างยิ่งในการเรียนการสอนและในโรงงาน?",
        "options": [
          {"id": "a", "text": "ช่วยให้คอมไพเลอร์ C++ ทำงานเร็วขึ้น"},
          {"id": "b", "text": "ช่วยแยกวงการสื่อสารของ DDS ไม่ให้หุ่นยนต์ได้รับคำสั่งจากกลุ่มหรือทีมอื่นบน Wi-Fi เดียวกัน"},
          {"id": "c", "text": "จำเป็นสำหรับการต่ออายุไลเซนส์ Ubuntu"},
          {"id": "d", "text": "ช่วยเร่งความเร็วในการชาร์จแบตเตอรี่หุ่นยนต์"}
        ],
        "correctAnswer": "b",
        "explanation": "ROS_DOMAIN_ID ทำหน้าที่แบ่งพาร์ทิชันเครือข่ายของ DDS ทำให้หุ่นยนต์แต่ละกลุ่มไม่ส่งข้อมูลรบกวนกัน"
      }
    ],
    "nextLesson": {"title": "02. ติดตั้ง ROS 2 Jazzy บน Ubuntu 24.04", "slug": "02-installation"}
  },

  "02-installation": {
    "id": "ros2-02",
    "slug": "02-installation",
    "title": "การติดตั้ง ROS 2 Jazzy บน Ubuntu 24.04 LTS",
    "courseId": "ros2-jazzy",
    "moduleNumber": 2,
    "moduleTitle": "การติดตั้งและเตรียมสภาพแวดล้อม",
    "order": 2,
    "durationMinutes": 25,
    "difficulty": "Beginner",
    "learningObjectives": [
      "เพิ่มคีย์ APT และคลังแพ็กเกจอย่างเป็นทางการของ ROS 2 Jazzy บน Ubuntu 24.04 (Noble Numbat)",
      "เข้าใจความแตกต่างระหว่าง 'ros-jazzy-desktop' และ 'ros-jazzy-ros-base'",
      "ตั้งค่า Environment Sourcing ในไฟล์ '~/.bashrc' เพื่อให้พร้อมใช้งานในทุกเทอร์มินัล"
    ],
    "concept": r"""ROS 2 Jazzy Jalisco คือเวอร์ชันสนับสนุนระยะยาว (LTS) ที่ทำงานคู่กับ **Ubuntu 24.04 LTS (Noble Numbat)** โดยได้รับการสนับสนุนการอัปเดตความปลอดภัยและการดูแลอย่างเป็นทางการจนถึงเดือนพฤษภาคม 2029

### ขั้นตอนการติดตั้งอย่างเป็นทางการผ่าน APT:
1. **ตรวจสอบ Locale ของระบบให้เป็น UTF-8**:
```bash
locale  # ตรวจสอบว่าระบบใช้ UTF-8 (เช่น en_US.UTF-8)
```
2. **เพิ่ม GPG Key อย่างเป็นทางการของ ROS 2**:
```bash
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
```
3. **เพิ่มคลังแพ็กเกจ ROS 2 เข้าสู่ Sources List**:
```bash
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null
```
4. **ติดตั้งแพ็กเกจที่เหมาะสม**:
- สำหรับเครื่อง Workstation หรือโน้ตบุ๊กพัฒนา:
```bash
sudo apt update && sudo apt install -y ros-jazzy-desktop
```
- สำหรับคอมพิวเตอร์ออนบอร์ดบนตัวหุ่นยนต์ (เช่น Raspberry Pi 5):
```bash
sudo apt update && sudo apt install -y ros-jazzy-ros-base
```
5. **ตั้งค่า Auto-Source ใน ~/.bashrc**:
```bash
echo "source /opt/ros/jazzy/setup.bash" >> ~/.bashrc
source ~/.bashrc
```""",
    "syntax": "source /opt/ros/jazzy/setup.bash",
    "syntaxExplanation": "โหลดพาธโปรแกรม ไบนารีคำสั่ง และโมดูล rclpy เข้าสู่สภาพแวดล้อมเชลล์ปัจจุบันของคุณ",
    "examples": [
      {
        "title": "โหลดสภาพแวดล้อม ROS 2 Jazzy",
        "language": "bash",
        "code": "source /opt/ros/jazzy/setup.bash",
        "explanation": "นำเข้าตัวแปรระบบของ ROS 2 Jazzy เข้าสู่เทอร์มินัล",
        "output": "[ROS2] Environment sourced: /opt/ros/jazzy/setup.bash"
      }
    ],
    "roboticsContext": {
      "title": "การเลือกแพ็กเกจระหว่าง Desktop กับ Base บนบอร์ด Raspberry Pi 5",
      "description": "บนเครื่องคอมพิวเตอร์ที่มีหน้าจอแสดงผล ให้ติดตั้ง 'ros-jazzy-desktop' เพื่อให้มีโปรแกรมกราฟิกเช่น RViz2 และ rqt ครบถ้วน ส่วนบนตัวหุ่นยนต์ Redbrick Mobile Robot (Raspberry Pi 5) ให้ติดตั้งเพียง 'ros-jazzy-ros-base' เพื่อประหยัดพื้นที่ SD Card และประหยัดแรม ทำให้หุ่นยนต์บูตระบบได้รวดเร็วที่สุด"
    },
    "commonMistakes": [
      {
        "mistake": "พยายามติดตั้ง ros-humble-* บน Ubuntu 24.04",
        "solution": "Ubuntu 24.04 Noble Numbat รองรับ ROS 2 Jazzy อย่างเป็นทางการเท่านั้น ห้ามฝืนติดตั้งแพ็กเกจรุ่นเก่า"
      },
      {
        "mistake": "เปิดเทอร์มินัลใหม่แล้วขึ้นเตือน 'ros2: command not found'",
        "solution": "ตรวจสอบว่าได้เพิ่มคำสั่ง 'source /opt/ros/jazzy/setup.bash' ไว้ที่บรรทัดล่างสุดของไฟล์ ~/.bashrc หรือยัง"
      }
    ],
    "exercise": {
      "instruction": "โหลดสภาพแวดล้อม ROS 2 ด้วยคำสั่ง 'source /opt/ros/jazzy/setup.bash'",
      "initialCommand": "source ",
      "targetCommand": "source /opt/ros/jazzy/setup.bash",
      "hint": "พิมพ์ 'source /opt/ros/jazzy/setup.bash'",
      "explanation": "การ source setup.bash จะตั้งค่าตัวแปร PATH และ PYTHONPATH ของ ROS 2"
    },
    "quiz": [
      {
        "id": "q-inst-1",
        "type": "single",
        "question": "แพ็กเกจใดที่แนะนำให้ติดตั้งบนคอมพิวเตอร์ออนบอร์ดของหุ่นยนต์จริง (เช่น Raspberry Pi 5)?",
        "options": [
          {"id": "a", "text": "ros-jazzy-desktop"},
          {"id": "b", "text": "ros-jazzy-ros-base"},
          {"id": "c", "text": "ros-jazzy-full-gui"},
          {"id": "d", "text": "ros-jazzy-simulator"}
        ],
        "correctAnswer": "b",
        "explanation": "ros-jazzy-ros-base ประกอบด้วยไลบรารีสื่อสารที่จำเป็นครบถ้วนโดยไม่มีโปรแกรมกราฟิกหนักๆ ทำให้ประหยัดทรัพยากรบนตัวหุ่นยนต์"
      }
    ],
    "prevLesson": {"title": "01. สถาปัตยกรรม ROS 2 และ DDS", "slug": "01-introduction"},
    "nextLesson": {"title": "03. คำสั่ง CLI และการตรวจสอบระบบหุ่นยนต์", "slug": "03-cli"}
  },

  "03-cli": {
    "id": "ros2-03",
    "slug": "03-cli",
    "title": "คำสั่ง CLI และการตรวจสอบระบบหุ่นยนต์",
    "courseId": "ros2-jazzy",
    "moduleNumber": 3,
    "moduleTitle": "คำสั่ง ROS 2 CLI และการตรวจสอบระบบ",
    "order": 3,
    "durationMinutes": 25,
    "difficulty": "Beginner",
    "learningObjectives": [
      "ใช้คำสั่ง 'ros2 node list' และ 'ros2 node info' เพื่อดูโปรเซสทั้งหมดที่ทำงานบนหุ่นยนต์",
      "ใช้ 'ros2 topic list -t' และ 'ros2 topic echo' เพื่อส่องดูข้อมูลเซนเซอร์แบบเรียลไทม์",
      "ตรวจสอบความถี่ของเซนเซอร์ด้วยคำสั่ง 'ros2 topic hz'",
      "ตรวจสอบเซอร์วิสและพารามิเตอร์ผ่านอินเทอร์เฟซแบบมาตรฐาน"
    ],
    "concept": r"""เครื่องมือ **`ros2` CLI** คือหัวใจสำคัญสำหรับวิศวกรหุ่นยนต์ในการทดสอบ ตรวจสอบ และวิเคราะห์ปัญหาของระบบ
โดยไม่จำเป็นต้องเขียนโค้ดแม้แต่บรรทัดเดียว คุณสามารถดูข้อมูลดิบจากเซนเซอร์ ติดตามคำสั่งควบคุมมอเตอร์ และตรวจสอบความเร็วการส่งข้อมูลได้ทันที

### ไวยากรณ์คำสั่งหลัก:
- **`ros2 node list`**: แสดงรายชื่อโหนดการคำนวณทั้งหมดที่กำลังทำงานอยู่ในกราฟ
- **`ros2 node info <node>`**: ดูข้อมูลเชิงลึกของโหนดว่า Publish หัวข้อใด และ Subscribe รับข้อมูลจากที่ไหนบ้าง
- **`ros2 topic list -t`**: แสดงท็อปปิกทั้งหมดพร้อมระบุชนิดข้อมูล (Message Type) อย่างชัดเจน
- **`ros2 topic echo /scan`**: แสดงข้อมูลระยะทางแบบเรียลไทม์จากเซนเซอร์ LiDAR ในรูปแบบ YAML
- **`ros2 topic hz /scan`**: วัดความถี่ในการส่งข้อมูลของเซนเซอร์เป็นหน่วย Hertz (Hz)
- **`ros2 service list`**: แสดงจุดเชื่อมต่อเซอร์วิสแบบถาม-ตอบ เช่น การสั่งรีเซ็ตตำแหน่งล้อ
- **`ros2 param list`**: แสดงรายชื่อตัวแปรพารามิเตอร์ที่สามารถปรับแต่งได้ของแต่ละโหนด""",
    "syntax": "ros2 <verb> <subverb> [arguments]",
    "syntaxExplanation": "คำสั่ง CLI ของ ROS 2 ทั้งหมดมีโครงสร้างแบบเดียวกันคือ ros2 <คำสั่งกริยา> <คำสั่งย่อย>",
    "examples": [
      {
        "title": "ดูรายชื่อโหนดทั้งหมดที่กำลังทำงานบนหุ่นยนต์",
        "language": "bash",
        "code": "ros2 node list",
        "explanation": "ค้นหาโหนดทั้งหมดในระบบเครือข่ายหุ่นยนต์",
        "output": "/camera_node\n/lidar_node\n/robot_controller\n/base_motors"
      },
      {
        "title": "ดูท็อปปิกพร้อมชนิดข้อมูล",
        "language": "bash",
        "code": "ros2 topic list -t",
        "explanation": "แสดงชื่อช่องสัญญาณพร้อมชนิดข้อมูล",
        "output": "/cmd_vel [geometry_msgs/msg/Twist]\n/scan [sensor_msgs/msg/LaserScan]\n/odom [nav_msgs/msg/Odometry]"
      },
      {
        "title": "วัดความถี่การหมุนสแกนของเซนเซอร์ LiDAR",
        "language": "bash",
        "code": "ros2 topic hz /scan",
        "explanation": "วัดอัตราการส่งข้อมูลอย่างต่อเนื่องเพื่อตรวจสอบสุขภาพของเซนเซอร์",
        "output": "average rate: 10.024\n  min: 0.098s max: 0.102s std dev: 0.0012s window: 10"
      }
    ],
    "roboticsContext": {
      "title": "การวินิจฉัยปัญหาฮาร์ดแวร์อย่างรวดเร็วผ่าน CLI",
      "description": "เมื่อหุ่นยนต์เคลื่อนที่ไม่ได้ สิ่งแรกที่วิศวกรหุ่นยนต์จะทำคือพิมพ์ 'ros2 topic hz /scan' หากความถี่เป็น 0.0 Hz แสดงว่าสาย USB ของ LiDAR หลุด หรือสิทธิ์การอ่านพอร์ต (/dev/ttyUSB0) มีปัญหา แต่หากได้ความถี่ 10.0 Hz แสดงว่าเซนเซอร์ทำงานปกติ ปัญหาอาจอยู่ที่คอนโทรลเลอร์สั่งงาน"
    },
    "commonMistakes": [
      {
        "mistake": "ใช้คำสั่งเก่าของ ROS 1 เช่น 'rostopic list' หรือ 'rosnode list'",
        "solution": "คำสั่งใน ROS 2 ทั้งหมดจะขึ้นต้นด้วย 'ros2 <verb>' เช่น 'ros2 topic list' โดยมีเว้นวรรคคั่นเสมอ"
      }
    ],
    "exercise": {
      "instruction": "แสดงรายชื่อท็อปปิกทั้งหมดในระบบด้วยคำสั่ง 'ros2 topic list'",
      "initialCommand": "ros2 ",
      "targetCommand": ["ros2 topic list", "ros2 topic list -t"],
      "hint": "พิมพ์ 'ros2 topic list'",
      "explanation": "ros2 topic list จะค้นหาและแสดงช่องสัญญาณท็อปปิกทั้งหมดในกราฟ"
    },
    "quiz": [
      {
        "id": "q-cli-1",
        "type": "single",
        "question": "คำสั่งใดใช้สำหรับวัดความถี่ในการส่งข้อมูลของท็อปปิกในหน่วย Hertz (Hz)?",
        "options": [
          {"id": "a", "text": "ros2 topic hz <topic_name>"},
          {"id": "b", "text": "ros2 topic speed <topic_name>"},
          {"id": "c", "text": "ros2 topic ping <topic_name>"},
          {"id": "d", "text": "ros2 topic test <topic_name>"}
        ],
        "correctAnswer": "a",
        "explanation": "ros2 topic hz จะคำนวณความถี่เฉลี่ย ระยะห่างต่ำสุด-สูงสุด และค่าเบี่ยงเบนมาตรฐานของการส่งข้อมูล"
      }
    ],
    "prevLesson": {"title": "02. ติดตั้ง ROS 2 Jazzy บน Ubuntu 24.04", "slug": "02-installation"},
    "nextLesson": {"title": "04. เวิร์กสเปซ, colcon และระบบ Overlay", "slug": "04-workspace"}
  },

  "04-workspace": {
    "id": "ros2-04",
    "slug": "04-workspace",
    "title": "เวิร์กสเปซ, colcon และระบบ Overlay",
    "courseId": "ros2-jazzy",
    "moduleNumber": 4,
    "moduleTitle": "เวิร์กสเปซและการบิลด์ด้วย colcon",
    "order": 4,
    "durationMinutes": 20,
    "difficulty": "Intermediate",
    "learningObjectives": [
      "เข้าใจโครงสร้างโฟลเดอร์มาตรฐานของ ROS 2 Workspace",
      "แยกความแตกต่างระหว่าง Underlay (/opt/ros/jazzy) และ Overlay (~/ros2_ws)",
      "สร้างและบิลด์แพ็กเกจด้วยคำสั่ง 'colcon build --symlink-install'",
      "โหลดพาธของแพ็กเกจที่บิลด์ใหม่ด้วยคำสั่ง 'source install/setup.bash'"
    ],
    "concept": r"""**ROS 2 Workspace** คือไดเรกทอรีที่ใช้สำหรับจัดเก็บ พัฒนา คอมไพล์ และติดตั้งแพ็กเกจซอฟต์แวร์หุ่นยนต์ของคุณ

### โครงสร้างโฟลเดอร์มาตรฐานของเวิร์กสเปซ:
```
~/ros2_ws/
├── src/        <- วางโค้ดแพ็กเกจของคุณที่นี่ (เช่น redbrick_controller, robot_bringup)
├── build/      <- ไฟล์ชั่วคราวระหว่างการคอมไพล์ของ CMake และ Setuptools
├── install/    <- ไบนารีพร้อมรัน สคริปต์สภาพแวดล้อม และ setup.bash
└── log/        <- บันทึกข้อผิดพลาดและคำเตือนจากการคอมไพล์
```

### Underlay เทียบกับ Overlay
- **Underlay**: คือระบบหลักที่ติดตั้งไว้ใน `/opt/ros/jazzy` ซึ่งมีไลบรารีและแพ็กเกจมาตรฐานของระบบ
- **Overlay**: คือเวิร์กสเปซส่วนตัวของคุณใน `~/ros2_ws` เมื่อคุณสั่ง `source ~/ros2_ws/install/setup.bash` แพ็กเกจที่คุณพัฒนาจะมีความสำคัญเหนือกว่าแพ็กเกจเดิมของระบบทันที

### แฟล็กสำคัญที่ขาดไม่ได้: `--symlink-install`
เมื่อพัฒนาแพ็กเกจด้วยภาษา Python ให้บิลด์ด้วยคำสั่งนี้เสมอ:
```bash
colcon build --symlink-install
```
คำสั่งนี้จะสร้าง Symbolic Link ชี้ตรงไปยังไฟล์ Python ต้นฉบับในโฟลเดอร์ `src/` ทำให้เมื่อคุณแก้ไขโค้ด อัลกอริทึมจะอัปเดต**ทันที**โดยไม่ต้องเสียเวลารัน colcon build ซ้ำใหม่ทุกรอบ!""",
    "syntax": "colcon build --symlink-install\nsource install/setup.bash",
    "syntaxExplanation": "ต้องรันคำสั่ง colcon build จากโฟลเดอร์รากของเวิร์กสเปซ (~/ros2_ws) เสมอ ไม่ใช่รันข้างใน src/",
    "examples": [
      {
        "title": "สร้างแพ็กเกจ Python ใหม่สำหรับควบคุมหุ่นยนต์",
        "language": "bash",
        "code": "cd ~/ros2_ws/src\nros2 pkg create --build-type ament_python redbrick_controller --dependencies rclpy geometry_msgs sensor_msgs",
        "explanation": "สร้างโครงสร้างแพ็กเกจ Python มาตรฐานพร้อมกำหนดรายการ Dependencies ที่ต้องใช้",
        "output": "creating folder redbrick_controller\ncreating package.xml\ncreating setup.py\ncreating setup.cfg\npackage created successfully"
      },
      {
        "title": "บิลด์เวิร์กสเปซแบบ Symlink",
        "language": "bash",
        "code": "cd ~/ros2_ws\ncolcon build --symlink-install",
        "explanation": "คอมไพล์แพ็กเกจทั้งหมดใน src/ พร้อมสร้างลิงก์เชื่อมโยงไฟล์ Python",
        "output": "Starting >>> redbrick_controller\nFinished <<< redbrick_controller [1.22s]\nSummary: 1 package finished"
      }
    ],
    "roboticsContext": {
      "title": "การพัฒนาอย่างรวดเร็วบนบอร์ด Raspberry Pi 5",
      "description": "การคอมไพล์ซอฟต์แวร์บนบอร์ดประมวลผลขนาดเล็กอย่าง Raspberry Pi มักใช้เวลา การใช้แฟล็ก '--symlink-install' ช่วยให้การปรับจูนอัลกอริทึมจำกัดความเร็วหรือตัวควบคุม PID ในภาษา Python มีผลทันที เพียงแค่บันทึกไฟล์แล้วสั่งรันโหนดใหม่ ไม่ต้องรอคอมไพล์ใหม่แม้แต่วินาทีเดียว"
    },
    "commonMistakes": [
      {
        "mistake": "เผลอรันคำสั่ง 'colcon build' ขณะที่อยู่ในโฟลเดอร์ 'src/'",
        "solution": "ต้องกลับมาที่โฟลเดอร์หลักของเวิร์กสเปซ (~/ros2_ws) เสมอก่อนรันคำสั่งบิลด์"
      },
      {
        "mistake": "ลืมรันคำสั่ง 'source install/setup.bash' หลังสร้างแพ็กเกจใหม่",
        "solution": "เทอร์มินัลจะไม่รู้จักแพ็กเกจที่เพิ่งสร้างจนกว่าจะโหลดไฟล์ setup.bash ในโฟลเดอร์ install"
      }
    ],
    "exercise": {
      "instruction": "สั่งบิลด์เวิร์กสเปซด้วยคำสั่ง 'colcon build --symlink-install'",
      "initialCommand": "colcon ",
      "targetCommand": ["colcon build --symlink-install", "colcon build"],
      "hint": "พิมพ์ 'colcon build --symlink-install'",
      "explanation": "colcon build จะประมวลผลแพ็กเกจทั้งหมดที่อยู่ในโฟลเดอร์ src/"
    },
    "quiz": [
      {
        "id": "q-ws-1",
        "type": "single",
        "question": "ประโยชน์หลักของการใส่แฟล็ก '--symlink-install' ในการพัฒนาแพ็กเกจ Python คืออะไร?",
        "options": [
          {"id": "a", "text": "ช่วยแปลงโค้ด Python เป็นไฟล์ C++ ไบนารี"},
          {"id": "b", "text": "ช่วยเชื่อมโยงไฟล์ต้นฉบับ ทำให้การแก้ไขโค้ดมีผลทันทีโดยไม่ต้องรัน colcon build ซ้ำ"},
          {"id": "c", "text": "ช่วยให้มอเตอร์หุ่นยนต์หมุนเร็วขึ้นสองเท่า"},
          {"id": "d", "text": "ช่วยข้ามขั้นตอนการทดสอบโค้ดทั้งหมด"}
        ],
        "correctAnswer": "b",
        "explanation": "--symlink-install สร้าง symbolic link เชื่อมไปยังไฟล์ใน src/ ทำให้ประหยัดเวลาในการพัฒนาซอฟต์แวร์ Python ได้อย่างมหาศาล"
      }
    ],
    "prevLesson": {"title": "03. คำสั่ง CLI และการตรวจสอบระบบหุ่นยนต์", "slug": "03-cli"},
    "nextLesson": {"title": "05. เขียนโหนด ROS 2 ด้วย Python (rclpy)", "slug": "05-nodes"}
  },

  "05-nodes": {
    "id": "ros2-05",
    "slug": "05-nodes",
    "title": "เขียนโหนด ROS 2 ด้วย Python (rclpy)",
    "courseId": "ros2-jazzy",
    "moduleNumber": 5,
    "moduleTitle": "การเขียนโหนดด้วย Python (rclpy)",
    "order": 5,
    "durationMinutes": 30,
    "difficulty": "Intermediate",
    "learningObjectives": [
      "เข้าใจสถาปัตยกรรมแบบโหนด: หน่วยประมวลผลอิสระที่ทำงานเฉพาะด้าน",
      "เขียนโหนดเชิงวัตถุ (OOP) ด้วยการสืบทอดคลาส 'rclpy.node.Node'",
      "สร้างฟังก์ชันจับเวลา (Timer) และเข้าใจการทำงานของ Event Loop (rclpy.spin)",
      "ใช้คำสั่ง 'self.get_logger().info()' บันทึก Log อย่างถูกต้องแทนการใช้ print()"
    ],
    "concept": r"""**Node (โหนด)** คือหน่วยประมวลผลซอฟต์แวร์อิสระที่รับผิดชอบหน้าที่เฉพาะอย่างใดอย่างหนึ่งในหุ่นยนต์
ตัวอย่างเช่น บนหุ่นยนต์ Redbrick Mobile Robot จะมีโหนดอ่านค่า RPLiDAR หนึ่งโหนด, โหนดประมวลผลภาพจากกล้องหนึ่งโหนด และโหนดควบคุมมอเตอร์ขับเคลื่อนล้ออีกหนึ่งโหนด

### โครงสร้างโหนดเชิงวัตถุมาตรฐาน (Object-Oriented Practice):
```python
import rclpy
from rclpy.node import Node

class RedbrickHeartbeat(Node):
    def __init__(self):
        super().__init__('redbrick_heartbeat')
        self.get_logger().info('Redbrick Heartbeat Node initialized!')
        
        # สร้าง Timer ให้ทำงานทุกๆ 0.5 วินาที (ความถี่ 2 Hz)
        self.counter = 0
        self.timer = self.create_timer(0.5, self.timer_callback)

    def timer_callback(self):
        self.counter += 1
        self.get_logger().info(f'หุ่นยนต์ทำงานปกติ Heartbeat #{self.counter}')

def main(args=None):
    rclpy.init(args=args)
    node = RedbrickHeartbeat()
    try:
        rclpy.spin(node)  # บล็อกและกระจายงานเมื่อมี Event เข้ามา
    except KeyboardInterrupt:
        node.get_logger().info('ผู้ใช้สั่งหยุดการทำงานของโหนด')
    finally:
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### ทำไมต้องสืบทอดจาก `rclpy.node.Node`?
การเขียนแบบ OOP ช่วยให้คลาสของคุณสามารถเรียกใช้ฟังก์ชันมาตรฐานของ ROS 2 ได้ทันที:
- `self.create_publisher()`
- `self.create_subscription()`
- `self.create_timer()`
- `self.get_logger().info()`, `warn()`, `error()`""",
    "syntax": "ros2 run <package_name> <executable_name>",
    "syntaxExplanation": "สั่งรันโหนดที่ติดตั้งอยู่ในแพ็กเกจของ ROS 2",
    "examples": [
      {
        "title": "รันโหนดตัวอย่าง Talker",
        "language": "bash",
        "code": "ros2 run demo_nodes_cpp talker",
        "explanation": "สั่งเปิดโหนดเดโมอย่างเป็นทางการที่ส่งข้อความอย่างต่อเนื่อง",
        "output": "[INFO] [talker]: Publishing: 'Hello World: 1'\n[INFO] [talker]: Publishing: 'Hello World: 2'"
      }
    ],
    "roboticsContext": {
      "title": "การแยกส่วนข้อผิดพลาด (Fault Isolation) ในยานยนต์ไร้คนขับ",
      "description": "ในระบบรถยนต์ขับเคลื่อนอัตโนมัติ หากโหนดประมวลผลปัญญาประดิษฐ์ของกล้องเกิดข้อผิดพลาดและแครช จะมีเพียงโหนดกล้องตัวเดียวเท่านั้นที่ดับลง ด้วยการแยกการทำงานแบบโมดูลของ ROS 2 โหนดระบบเบรกฉุกเฉินและโหนดตรวจจับสิ่งกีดขวางของ LiDAR จะยังคงทำงานต่อไปได้อย่างปลอดภัยโดยไม่ได้รับผลกระทบ"
    },
    "commonMistakes": [
      {
        "mistake": "ใช้คำสั่ง 'print()' ทั่วไปแทน 'self.get_logger().info()'",
        "solution": "get_logger() จะแนบเวลา Timestamp, ระดับความรุนแรง (INFO/WARN/ERROR) และชื่อโหนด ทำให้ค้นหาปัญหาในระบบที่มีหลายโหนดได้ง่ายขึ้นมาก"
      },
      {
        "mistake": "ลืมใส่คำสั่ง 'rclpy.spin(node)' ทำให้โปรแกรมจบการทำงานทันทีหลังเริ่มเปิด",
        "solution": "rclpy.spin ทำหน้าที่เป็น Event Loop คอยกระจายงานให้ Timer และข้อความที่ส่งเข้ามา"
      }
    ],
    "exercise": {
      "instruction": "สั่งรันโหนดเดโม talker จากแพ็กเกจ demo_nodes_cpp ด้วยคำสั่ง 'ros2 run demo_nodes_cpp talker'",
      "initialCommand": "ros2 run ",
      "targetCommand": "ros2 run demo_nodes_cpp talker",
      "hint": "พิมพ์ 'ros2 run demo_nodes_cpp talker'",
      "explanation": "ros2 run ใช้สำหรับเปิดรันไฟล์ไบนารีที่ถูกติดตั้งไว้ในแพ็กเกจ"
    },
    "quiz": [
      {
        "id": "q-node-1",
        "type": "single",
        "question": "คำสั่ง 'rclpy.spin(node)' ทำหน้าที่อะไรในโปรแกรม ROS 2 ภาษา Python?",
        "options": [
          {"id": "a", "text": "สั่งให้ล้อหุ่นยนต์หมุน 360 องศา"},
          {"id": "b", "text": "คอยกระจายงานและรักษาสถานะให้โหนดรอรับ Callback และ Timer ใน Event Loop"},
          {"id": "c", "text": "แปลงโค้ดภาษา Python เป็นภาษา C++"},
          {"id": "d", "text": "เปิดไฟ LED ด้านหน้าของหุ่นยนต์"}
        ],
        "correctAnswer": "b",
        "explanation": "rclpy.spin เป็นตัวจัดการ Event Loop ที่คอยจัดส่งงานเมื่อมีข้อความหรือสัญญาณนาฬิกา Timer เข้ามา"
      }
    ],
    "prevLesson": {"title": "04. เวิร์กสเปซ, colcon และระบบ Overlay", "slug": "04-workspace"},
    "nextLesson": {"title": "06. ท็อปปิก, การเผยแพร่และรับข้อมูล (Pub/Sub)", "slug": "06-topics"}
  },

  "06-topics": {
    "id": "ros2-06",
    "slug": "06-topics",
    "title": "ท็อปปิก, การเผยแพร่และรับข้อมูล (Pub/Sub)",
    "courseId": "ros2-jazzy",
    "moduleNumber": 6,
    "moduleTitle": "การสื่อสารผ่าน Topic (Pub/Sub)",
    "order": 6,
    "durationMinutes": 30,
    "difficulty": "Intermediate",
    "learningObjectives": [
      "เข้าใจสถาปัตยกรรมการส่งข้อมูลแบบทางเดียว Publisher/Subscriber",
      "ส่งคำสั่งควบคุมความเร็วหุ่นยนต์ผ่านท็อปปิก '/cmd_vel' ด้วยชนิดข้อมูล 'geometry_msgs/msg/Twist'",
      "รับข้อมูลสแกนระยะทางจากเซนเซอร์ LiDAR ผ่าน '/scan' และเข้าใจโปรไฟล์ QoS",
      "เข้าใจการคำนวณคิเนมาติกส์ของหุ่นยนต์ขับเคลื่อนสองล้อแบบ Differential-Drive"
    ],
    "concept": r"""**Topics (ท็อปปิก)** คือช่องทางการสื่อสารแบบทางเดียว (Unidirectional) และไม่ขึ้นต่อกัน (Asynchronous) ระหว่างโหนด
โหนดผู้ส่ง (Publisher) สามารถส่งข้อมูลได้โดยไม่ต้องรู้ว่ามีใครกำลังรับฟังอยู่หรือไม่ และโหนดผู้รับ (Subscriber) ก็รับข้อมูลได้โดยไม่ต้องสนใจว่าใครเป็นผู้สร้าง (**Decoupled Architecture**)

### ท็อปปิกมาตรฐานของงานหุ่นยนต์เคลื่อนที่:
- **`/cmd_vel`** (`geometry_msgs/msg/Twist`): คำสั่งควบคุมความเร็วเชิงเส้น ($v_x, v_y, v_z$) และความเร็วเชิงมุม ($\omega_x, \omega_y, \omega_z$) โดยสำหรับหุ่นยนต์ภาคพื้นดินแบบสองล้อ จะใช้เฉพาะ $v_x$ (เดินหน้า/ถอยหลัง) และ $\omega_z$ (เลี้ยวซ้าย/ขวา)
- **`/scan`** (`sensor_msgs/msg/LaserScan`): อาร์เรย์แสดงค่าระยะทางรอบตัวแบบ 2D จากเซนเซอร์ LiDAR
- **`/odom`** (`nav_msgs/msg/Odometry`): ตำแหน่งพิกัดประมาณการ $(x, y, \theta)$ และความเร็วจากการคำนวณรอบหมุนของล้อ

### คุณภาพของการให้บริการ (Quality of Service - QoS):
ROS 2 อนุญาตให้ปรับแต่งความเสถียรของการส่งข้อมูลบน DDS ได้ตามความเหมาะสม:
- **Sensor Data (Best Effort)**: เหมาะสำหรับเซนเซอร์ความถี่สูงเช่น LiDAR หรือกล้อง หากมีข้อมูลตกหล่นบ้างก็ไม่เป็นไร เพราะเน้นความสดใหม่ของข้อมูลมากกว่าการรอส่งซ้ำ
- **Reliable**: การันตีว่าข้อมูลต้องไปถึงผู้รับอย่างแน่นอน มีระบบส่งซ้ำ เหมาะสำหรับคำสั่งควบคุมมอเตอร์ `/cmd_vel` หรือสัญญาณหยุดฉุกเฉิน""",
    "syntax": "ros2 topic pub <topic_name> <msg_type> \"<data>\"",
    "syntaxExplanation": "ส่งข้อมูลเข้าไปในท็อปปิกโดยตรงผ่านบรรทัดคำสั่งเพื่อการทดสอบอย่างรวดเร็ว",
    "examples": [
      {
        "title": "สั่งให้หุ่นยนต์เดินหน้าด้วยความเร็ว 0.3 m/s ผ่าน CLI",
        "language": "bash",
        "code": "ros2 topic pub --once /cmd_vel geometry_msgs/msg/Twist \"{linear: {x: 0.3, y: 0.0, z: 0.0}, angular: {x: 0.0, y: 0.0, z: 0.0}}\"",
        "explanation": "ส่งแพ็กเกจ Twist หนึ่งครั้งเพื่อสั่งให้ล้อขับเคลื่อนเดินหน้า",
        "output": "publisher: beginning loop\npublishing #1: geometry_msgs.msg.Twist(linear=geometry_msgs.msg.Vector3(x=0.3, y=0.0, z=0.0), angular=geometry_msgs.msg.Vector3(x=0.0, y=0.0, z=0.0))"
      },
      {
        "title": "ส่องดูข้อมูลตำแหน่ง Odometry แบบสดๆ",
        "language": "bash",
        "code": "ros2 topic echo /odom",
        "explanation": "แสดงค่าตำแหน่งและทิศทางของหุ่นยนต์จากเอ็นโค้ดเดอร์",
        "output": "header:\n  frame_id: odom\nchild_frame_id: base_footprint\npose:\n  pose:\n    position: {x: 1.25, y: 0.42, z: 0.0}\n    orientation: {z: 0.0, w: 1.0}"
      }
    ],
    "roboticsContext": {
      "title": "ภาษาสากลของหุ่นยนต์เคลื่อนที่: /cmd_vel",
      "description": "ตั้งแต่หุ่นยนต์สองล้อขนาดเล็กเพื่อการศึกษา ไปจนถึงหุ่นยนต์ AMR อุตสาหกรรมในคลังสินค้าขนาดใหญ่ ทั้งหมดต่างรับคำสั่งขับเคลื่อนผ่านช่องสัญญาณเดียวกันคือ `/cmd_vel` ด้วยข้อความชนิด `geometry_msgs/msg/Twist` ทำให้ระบบนำทางอย่าง Nav2 สามารถนำมาใช้งานร่วมกับหุ่นยนต์ทุกรุ่นได้อย่างไร้รอยต่อ"
    },
    "commonMistakes": [
      {
        "mistake": "พยายามกำหนดค่า linear.y ให้กับหุ่นยนต์แบบสองล้อ Differential Drive",
        "solution": "หุ่นยนต์สองล้อมีข้อจำกัดทางคิเนมาติกส์ (Non-holonomic) ไม่สามารถสไลด์ไปทางซ้ายขวาได้ตรงๆ ให้กำหนดเฉพาะ linear.x และ angular.z เท่านั้น"
      }
    ],
    "exercise": {
      "instruction": "ส่องดูข้อความคำสั่งที่ส่งอยู่ในท็อปปิก /cmd_vel ด้วยคำสั่ง 'ros2 topic echo /cmd_vel'",
      "initialCommand": "ros2 topic echo ",
      "targetCommand": "ros2 topic echo /cmd_vel",
      "hint": "พิมพ์ 'ros2 topic echo /cmd_vel'",
      "explanation": "ros2 topic echo จะพิมพ์ข้อความที่กำลังไหลอยู่ในท็อปปิกออกมาให้เห็นแบบเรียลไทม์"
    },
    "quiz": [
      {
        "id": "q-topic-1",
        "type": "single",
        "question": "ชนิดข้อมูลมาตรฐานที่ใช้สำหรับสั่งความเร็วของหุ่นยนต์เคลื่อนที่บนท็อปปิก /cmd_vel คืออะไร?",
        "options": [
          {"id": "a", "text": "std_msgs/msg/String"},
          {"id": "b", "text": "geometry_msgs/msg/Twist"},
          {"id": "c", "text": "sensor_msgs/msg/Joy"},
          {"id": "d", "text": "nav_msgs/msg/Path"}
        ],
        "correctAnswer": "b",
        "explanation": "geometry_msgs/msg/Twist ประกอบด้วยเวกเตอร์ความเร็วเชิงเส้น (x, y, z) และความเร็วเชิงมุม (x, y, z)"
      }
    ],
    "lab": {
      "id": "ros2-lab-01",
      "title": "ห้องปฏิบัติการ ROS 2 — การตรวจสอบและวิเคราะห์การสื่อสารในกราฟ",
      "description": "ตรวจสอบกราฟการคำนวณ ติดตามการไหลของข้อมูลจากเซนเซอร์ไปยังคอนโทรลเลอร์ และวัดความถี่การทำงาน",
      "steps": [
        {
          "step": 1,
          "title": "ดูรายชื่อโหนดทั้งหมด",
          "instruction": "ตรวจสอบโหนดที่กำลังทำงานอยู่บนตัวหุ่นยนต์",
          "task": "รันคำสั่ง 'ros2 node list'",
          "validationCommand": "ros2 node list",
          "hint": "พิมพ์ 'ros2 node list'"
        },
        {
          "step": 2,
          "title": "ดูท็อปปิกพร้อมชนิดข้อมูล",
          "instruction": "ตรวจสอบช่องสัญญาณและรูปแบบข้อความของแต่ละท็อปปิก",
          "task": "รันคำสั่ง 'ros2 topic list -t'",
          "validationCommand": ["ros2 topic list -t", "ros2 topic list"],
          "hint": "พิมพ์ 'ros2 topic list -t'"
        },
        {
          "step": 3,
          "title": "ส่องดูข้อมูลเซนเซอร์ LiDAR",
          "instruction": "ดูค่าระยะทางจริงที่เซนเซอร์เลเซอร์ส่งออกมา",
          "task": "รันคำสั่ง 'ros2 topic echo /scan'",
          "validationCommand": "ros2 topic echo /scan",
          "hint": "พิมพ์ 'ros2 topic echo /scan'"
        },
        {
          "step": 4,
          "title": "วัดความถี่การสแกนของเซนเซอร์",
          "instruction": "ตรวจสอบว่า LiDAR ทำงานที่ความถี่ 10 Hz ตามเกณฑ์มาตรฐานหรือไม่",
          "task": "รันคำสั่ง 'ros2 topic hz /scan'",
          "validationCommand": "ros2 topic hz /scan",
          "hint": "พิมพ์ 'ros2 topic hz /scan'"
        }
      ]
    },
    "prevLesson": {"title": "05. เขียนโหนด ROS 2 ด้วย Python (rclpy)", "slug": "05-nodes"},
    "nextLesson": {"title": "07. เซอร์วิส, ไคลเอนต์ และการเรียกคำสั่งแบบซิงโครนัส", "slug": "07-services"}
  },

  "07-services": {
    "id": "ros2-07",
    "slug": "07-services",
    "title": "เซอร์วิส, ไคลเอนต์ และการเรียกคำสั่งแบบซิงโครนัส",
    "courseId": "ros2-jazzy",
    "moduleNumber": 7,
    "moduleTitle": "การสื่อสารแบบ Service (Client/Server)",
    "order": 7,
    "durationMinutes": 25,
    "difficulty": "Intermediate",
    "learningObjectives": [
      "เข้าใจรูปแบบการสื่อสารแบบถาม-ตอบ (Request/Response) ในระบบ ROS 2",
      "แยกแยะความเหมาะสมในการเลือกใช้ Service เทียบกับ Topic ในงานหุ่นยนต์",
      "เรียกสั่งงานเซอร์วิสผ่าน CLI ด้วยคำสั่ง 'ros2 service call'",
      "เขียน Service Server และ Asynchronous Client ด้วยภาษา Python ผ่าน rclpy"
    ],
    "concept": r"""ในขณะที่ Topic ถูกออกแบบมาสำหรับการสตรีมข้อมูลทางเดียวอย่างต่อเนื่อง (เช่น ข้อมูล LiDAR 10 Hz หรือข้อมูลภาพกล้อง 30 Hz) แต่ **Service** มีไว้สำหรับการสื่อสารแบบสองทางในรูปแบบ **Request/Response** (ถามแล้วต้องตอบ)

### ข้อแตกต่างระหว่าง Topic และ Service:
| ลักษณะการทำงาน | Topic (Pub/Sub) | Service (Client/Server) |
| :--- | :--- | :--- |
| **รูปแบบการสื่อสาร** | ทางเดียว แบบหลายผู้ส่งถึงหลายผู้รับ | สองทาง ตัวต่อตัว (ถาม-ตอบ) |
| **ลักษณะเวลา** | ส่งต่อเนื่องตลอดเวลา ไม่รอคำตอบ | เกิดขึ้นเป็นครั้งคราว และรอคำยืนยันผล |
| **การการันตีคำตอบ** | ไม่มีการตอบกลับว่าปลายทางได้รับหรือไม่ | มีข้อมูลผลลัพธ์ตอบกลับชัดเจน (Success/Failure) |
| **ตัวอย่างการใช้งาน** | ข้อมูลเซนเซอร์ (`/scan`, `/camera`), คำสั่งความเร็ว (`/cmd_vel`) | สั่งสอบเทียบเซนเซอร์, สั่งรีเซ็ตระยะทางล้อ, สั่งบันทึกแผนที่ |

### โครงสร้างไฟล์นิยามของ Service (.srv):
โครงสร้างจะแบ่งออกเป็น 2 ส่วนคั่นด้วยเครื่องหมายขีดสามขีด (`---`):
```
# example_interfaces/srv/SetBool.srv
bool data       # ส่วนคำขอ (Request)
---
bool success    # ส่วนคำตอบ (Response)
string message
```

### เซอร์วิสที่พบบ่อยในหุ่นยนต์:
- `/reset_odometry` (`std_srvs/srv/Trigger`): สั่งรีเซ็ตค่าพิกัดการนับรอบล้อให้กลับไปเป็นจุดเริ่มต้น $(0,0,0)$
- `/calibrate_imu` (`std_srvs/srv/Trigger`): สั่งสอบเทียบค่า Gyroscope ในขณะที่หุ่นยนต์หยุดนิ่ง
- `/toggle_headlights` (`example_interfaces/srv/SetBool`): สั่งเปิดหรือปิดไฟส่องสว่างด้านหน้า""",
    "syntax": "ros2 service call <service_name> <service_type> \"<request_data>\"",
    "syntaxExplanation": "ส่งคำขอไปยังเซอร์วิสที่ต้องการและรอรับคำตอบจากเซิร์ฟเวอร์",
    "examples": [
      {
        "title": "ดูรายชื่อเซอร์วิสทั้งหมดในระบบ",
        "language": "bash",
        "code": "ros2 service list",
        "explanation": "แสดงรายการจุดเชื่อมต่อเซอร์วิสทั้งหมดที่เปิดให้บริการอยู่",
        "output": "/reset_odometry\n/calibrate_imu\n/robot_controller/describe_parameters\n/robot_controller/get_parameters"
      },
      {
        "title": "สั่งรีเซ็ต Odometry ของหุ่นยนต์ผ่าน CLI",
        "language": "bash",
        "code": "ros2 service call /reset_odometry std_srvs/srv/Trigger \"{}\"",
        "explanation": "ส่งคำขอสั่งรีเซ็ตตำแหน่งล้อ และรอรับผลลัพธ์การยืนยัน",
        "output": "requester: making request: std_srvs.srv.Trigger_Request()\nresponse:\nstd_srvs.srv.Trigger_Response(success=True, message='Odometry successfully reset to (0,0,0)')"
      }
    ],
    "roboticsContext": {
      "title": "การสอบเทียบ IMU ก่อนเริ่มทำแผนที่ (Zero-Drift Calibration)",
      "description": "ก่อนที่หุ่นยนต์จะเริ่มสร้างแผนที่ SLAM ระบบจะเรียกใช้เซอร์วิส `/calibrate_imu` บอร์ดตรวจจับจะเก็บตัวอย่างไจโรสโคป 500 ตัวอย่างในขณะที่ตัวหุ่นยนต์จอดนิ่งสนิทเพื่อหาค่าเฉลี่ยความคลาดเคลื่อน (Bias) ช่วยป้องกันไม่ให้มุมหัวของหุ่นยนต์เกิดอาการเลี้ยวเอียงสะสมระหว่างการทำงานจริง"
    },
    "commonMistakes": [
      {
        "mistake": "ใช้ Service ในการส่งคำสั่งความเร็วควบคุมมอเตอร์ขับเคลื่อนอย่างต่อเนื่อง",
        "solution": "Service จะต้องรอคำตอบกลับทุกครั้ง ทำให้เกิดความหน่วงสะสม การส่งคำสั่งมอเตอร์อย่างต่อเนื่องควรใช้ Topic เช่น /cmd_vel"
      },
      {
        "mistake": "เขียนโค้ดที่ต้องทำงานนานหลายนาทีไว้ในฟังก์ชัน Callback ของ Service",
        "solution": "Service Callback ควรทำงานเสร็จสิ้นภายในไม่กี่มิลลิวินาที หากเป็นงานระยะยาวควรเปลี่ยนไปใช้ Action"
      }
    ],
    "exercise": {
      "instruction": "เรียกสั่งงานเซอร์วิสรีเซ็ต Odometry ด้วยคำสั่ง 'ros2 service call /reset_odometry std_srvs/srv/Trigger \"{}\"'",
      "initialCommand": "ros2 service call ",
      "targetCommand": "ros2 service call /reset_odometry std_srvs/srv/Trigger \"{}\"",
      "hint": "พิมพ์ 'ros2 service call /reset_odometry std_srvs/srv/Trigger \"{}\"'",
      "explanation": "ros2 service call จะส่งคำขอและพิมพ์การตอบกลับจากโหนดเซิร์ฟเวอร์"
    },
    "quiz": [
      {
        "id": "q-srv-1",
        "type": "single",
        "question": "สถานการณ์ใดต่อไปนี้ที่เหมาะสมกับการใช้งาน ROS 2 Service มากที่สุด?",
        "options": [
          {"id": "a", "text": "การสตรีมภาพจากกล้องความถี่ 30 FPS"},
          {"id": "b", "text": "การสั่งคำสั่งที่ต้องการคำยืนยันผลการทำงานทันที เช่น การสั่งรีเซ็ตพิกัดตำแหน่งหุ่นยนต์"},
          {"id": "c", "text": "การส่งคำสั่งความเร็วเดินหน้าของมอเตอร์ล้ออย่างต่อเนื่อง"},
          {"id": "d", "text": "การกระจายข้อมูลแผนที่ LiDAR ไปยังผู้รับหลายๆ เครื่องพร้อมกัน"}
        ],
        "correctAnswer": "b",
        "explanation": "Service ออกแบบมาสำหรับการสั่งงานแบบถาม-ตอบที่ต้องการผลยืนยันการทำงานที่แน่นอน"
      }
    ],
    "prevLesson": {"title": "06. ท็อปปิก, การเผยแพร่และรับข้อมูล (Pub/Sub)", "slug": "06-topics"},
    "nextLesson": {"title": "08. แอ็กชัน, การส่งเป้าหมาย และการติดตามผล (Nav2)", "slug": "08-actions"}
  },

  "08-actions": {
    "id": "ros2-08",
    "slug": "08-actions",
    "title": "แอ็กชัน, การส่งเป้าหมาย และการติดตามผล (Nav2)",
    "courseId": "ros2-jazzy",
    "moduleNumber": 8,
    "moduleTitle": "การสั่งงานแบบ Action (งานระยะยาว)",
    "order": 8,
    "durationMinutes": 30,
    "difficulty": "Advanced",
    "learningObjectives": [
      "เข้าใจสถาปัตยกรรม Client/Server ของ Action สำหรับภารกิจที่ใช้เวลานาน",
      "เข้าใจ 5 องค์ประกอบย่อยเบื้องหลัง: Goal, Cancel, Feedback, Status และ Result",
      "ส่งเป้าหมายงานและติดตามความคืบหน้าแบบสดๆ ผ่านคำสั่ง 'ros2 action send_goal --feedback'",
      "เรียนรู้บทบาทสำคัญของ Action ในระบบนำทางอัตโนมัติ Nav2"
    ],
    "concept": r"""สำหรับภารกิจที่ต้องใช้เวลาในการทำงานต่อเนื่องนานหลายวินาทีหรือหลายนาที (เช่น การสั่งให้หุ่นยนต์วิ่งข้ามคลังสินค้า, การหยิบจับชิ้นงานของแขนกล หรือการวิ่งกลับเข้าแท่นชาร์จ) ทั้ง Topic และ Service ต่างไม่ตอบโจทย์:
- Service จะ**บล็อกค้าง**จนกว่างานจะเสร็จ และไม่สามารถรายงานความคืบหน้าระหว่างทางได้
- Topic ไม่สามารถส่งสัญญาณ**ขอยกเลิกภารกิจกลางคัน**ได้อย่างเป็นระบบ

**Action (แอ็กชัน)** ถูกสร้างขึ้นมาเพื่อแก้ปัญหานี้โดยเฉพาะ โดยผสมผสานข้อดีของทั้ง Topic และ Service เข้าด้วยกัน

### 3 องค์ประกอบหลักของ Action (.action):
```
# nav2_msgs/action/NavigateToPose.action
geometry_msgs/PoseStamped pose     # 1. Goal (เป้าหมาย): พิกัดปลายทางที่ต้องการให้ไป
---
std_msgs/Empty result               # 2. Result (ผลลัพธ์สุดท้าย): แจ้งเมื่อถึงปลายทางสำเร็จ
---
geometry_msgs/PoseStamped current_pose  # 3. Feedback (ความคืบหน้า): ระยะทางที่เหลืออยู่แบบสดๆ
float32 distance_remaining
```

### สถาปัตยกรรมเบื้องหลังการทำงาน:
ทุก Action ใน ROS 2 ประกอบขึ้นจาก 2 Services และ 3 Topics:
1. **Goal Service**: ฝั่งไคลเอนต์ส่งคำขอเป้าหมาย และเซิร์ฟเวอร์ตอบรับว่ารับงานหรือไม่
2. **Cancel Service**: ฝั่งไคลเอนต์สามารถสั่งยกเลิกงานได้ตลอดเวลาหากเกิดเหตุฉุกเฉิน
3. **Feedback Topic**: เซิร์ฟเวอร์ส่งข้อมูลความคืบหน้ากลับมาเป็นระยะ (เช่น `distance_remaining: 1.2m`)
4. **Status Topic**: แจ้งสถานะของงาน (`ACCEPTED`, `EXECUTING`, `CANCELED`, `SUCCEEDED`)
5. **Result Service**: ส่งผลลัพธ์สรุปเมื่อภารกิจเสร็จสิ้นสมบูรณ์""",
    "syntax": "ros2 action send_goal <action_name> <action_type> \"<goal_data>\" --feedback",
    "syntaxExplanation": "ส่งเป้าหมายไปยัง Action Server พร้อมเปิดให้แสดงข้อมูลความคืบหน้า (Feedback) ระหว่างเดินทาง",
    "examples": [
      {
        "title": "ดูรายชื่อ Action Server ทั้งหมดในระบบ",
        "language": "bash",
        "code": "ros2 action list",
        "explanation": "แสดงรายชื่อจุดเชื่อมต่อแอ็กชันที่พร้อมให้บริการ",
        "output": "/navigate_to_pose\n/dock_robot\n/follow_waypoints"
      },
      {
        "title": "ส่งเป้าหมายพิกัดนำทาง Nav2 พร้อมดู Feedback สด",
        "language": "bash",
        "code": "ros2 action send_goal /navigate_to_pose nav2_msgs/action/NavigateToPose \"{pose: {header: {frame_id: 'map'}, pose: {position: {x: 2.0, y: 1.5, z: 0.0}, orientation: {w: 1.0}}}}\" --feedback",
        "explanation": "สั่งให้ระบบนำทาง Nav2 ขับไปยังพิกัด X=2.0, Y=1.5 และแสดงระยะทางที่เหลืออยู่แบบต่อเนื่อง",
        "output": "Waiting for an action server to become available...\nSending goal:\n  pose: ...\nFeedback:\n  distance_remaining: 2.50\nFeedback:\n  distance_remaining: 1.20\nGoal reached successfully!"
      }
    ],
    "roboticsContext": {
      "title": "การยกเลิกภารกิจฉุกเฉินเมื่อเจอสิ่งกีดขวางใน Nav2",
      "description": "หากมีมนุษย์หรือสิ่งกีดขวางที่ไม่คาดคิดเดินตัดหน้าหุ่นยนต์ Redbrick Mobile Robot ในขณะที่กำลังวิ่งไปยังจุดหมายปลายทางตามคำสั่ง `/navigate_to_pose` ระบบความปลอดภัยสามารถส่งคำสั่ง Cancel Request ไปยกเลิก Action ได้ทันที ทำให้หุ่นยนต์หยุดอย่างนุ่มนวลโดยไม่ต้องรีบูตระบบใหม่"
    },
    "commonMistakes": [
      {
        "mistake": "ใช้ Service ธรรมดาสำหรับงานที่ต้องใช้เวลานาน 30 วินาที",
        "solution": "งานที่ใช้เวลานานจะทำให้ Service Client ค้าง ควรเปลี่ยนมาใช้ Action เสมอเพื่อให้สามารถติดตามความคืบหน้าและยกเลิกได้"
      }
    ],
    "exercise": {
      "instruction": "แสดงรายชื่อ Action ทั้งหมดที่มีอยู่ในระบบด้วยคำสั่ง 'ros2 action list'",
      "initialCommand": "ros2 action ",
      "targetCommand": "ros2 action list",
      "hint": "พิมพ์ 'ros2 action list'",
      "explanation": "ros2 action list แสดงรายการ Action ทั้งหมดในกราฟ"
    },
    "quiz": [
      {
        "id": "q-act-1",
        "type": "single",
        "question": "3 ส่วนประกอบหลักที่นิยามอยู่ในไฟล์ Action (.action) ของ ROS 2 คืออะไรบ้าง?",
        "options": [
          {"id": "a", "text": "Input, Process, Output"},
          {"id": "b", "text": "Goal, Result, Feedback"},
          {"id": "c", "text": "Topic, Service, Parameter"},
          {"id": "d", "text": "Request, Response, Error"}
        ],
        "correctAnswer": "b",
        "explanation": "ไฟล์ Action ประกอบด้วย Goal (เป้าหมายงาน), Result (ผลลัพธ์สุดท้าย) และ Feedback (ความคืบหน้าระหว่างทาง)"
      }
    ],
    "prevLesson": {"title": "07. เซอร์วิส, ไคลเอนต์ และการเรียกคำสั่งแบบซิงโครนัส", "slug": "07-services"},
    "nextLesson": {"title": "09. ระบบพารามิเตอร์และการปรับแต่งค่าแบบไดนามิก", "slug": "09-parameters"}
  },

  "09-parameters": {
    "id": "ros2-09",
    "slug": "09-parameters",
    "title": "ระบบพารามิเตอร์และการปรับแต่งค่าแบบไดนามิก",
    "courseId": "ros2-jazzy",
    "moduleNumber": 9,
    "moduleTitle": "ระบบพารามิเตอร์และการปรับแต่งค่า",
    "order": 9,
    "durationMinutes": 25,
    "difficulty": "Intermediate",
    "learningObjectives": [
      "เข้าใจบทบาทของพารามิเตอร์ในการกำหนดค่าการทำงานของโหนด",
      "ประกาศและดึงค่าพารามิเตอร์ใน Python ด้วย 'declare_parameter' และ 'get_parameter'",
      "ตรวจสอบและปรับแต่งค่าพารามิเตอร์ในขณะที่หุ่นยนต์กำลังทำงานผ่านคำสั่ง 'ros2 param'",
      "บันทึกและโหลดค่าคอนฟิกูเรชันพารามิเตอร์ผ่านไฟล์ YAML"
    ],
    "concept": r"""**Parameters (พารามิเตอร์)** คือตัวแปรปรับแต่งค่าการทำงานเฉพาะของแต่ละโหนด ช่วยให้คุณสามารถปรับจูนพฤติกรรมของหุ่นยนต์ (เช่น ความเร็วสูงสุด, ระยะห่างระหว่างล้อ, ค่าอัตราขยาย PID, ความละเอียดของกล้อง) ได้อย่างสะดวก **โดยไม่ต้องแก้โค้ดหรือคอมไพล์ใหม่**

### การประกาศและอ่านค่าพารามิเตอร์ใน Python:
```python
import rclpy
from rclpy.node import Node

class DifferentialController(Node):
    def __init__(self):
        super().__init__('differential_controller')
        
        # 1. ต้องประกาศพารามิเตอร์พร้อมค่าตั้งต้นก่อนเสมอ
        self.declare_parameter('max_speed', 0.5)  # หน่วย: เมตร/วินาที
        self.declare_parameter('wheel_separation', 0.28)  # หน่วย: เมตร
        
        # 2. อ่านค่าพารามิเตอร์มาใช้งาน
        self.max_speed = self.get_parameter('max_speed').value
        self.get_logger().info(f'คอนโทรลเลอร์พร้อมทำงาน ความเร็วสูงสุด: {self.max_speed} m/s')
```

### การปรับแต่งพารามิเตอร์แบบสดๆ (Dynamic Reconfiguration):
ค่าพารามิเตอร์สามารถเปลี่ยนแปลงได้ทันทีในขณะที่หุ่นยนต์กำลังวิ่งอยู่จริง!
โดยการลงทะเบียนฟังก์ชัน Callback ผ่าน `self.add_on_set_parameters_callback(self.param_callback)` โหนดของคุณจะสามารถตรวจสอบและรับค่าความเร็วใหม่ไปใช้งานได้ทันทีโดยไม่ต้องรีสตาร์ตระบบ""",
    "syntax": "ros2 param set <node_name> <parameter_name> <value>",
    "syntaxExplanation": "ปรับเปลี่ยนค่าพารามิเตอร์ของโหนดที่กำลังทำงานอยู่แบบสดๆ ผ่าน CLI",
    "examples": [
      {
        "title": "ดูรายการพารามิเตอร์ทั้งหมดของโหนด",
        "language": "bash",
        "code": "ros2 param list /robot_controller",
        "explanation": "แสดงตัวแปรทั้งหมดที่โหนดนั้นเปิดให้ปรับแต่งได้",
        "output": "/robot_controller:\n  max_speed\n  wheel_separation\n  use_sim_time"
      },
      {
        "title": "ปรับความเร็วสูงสุดของหุ่นยนต์แบบเรียลไทม์",
        "language": "bash",
        "code": "ros2 param set /robot_controller max_speed 0.8",
        "explanation": "เพิ่มความเร็วสูงสุดเป็น 0.8 m/s ทันที",
        "output": "Set parameter successful"
      },
      {
        "title": "บันทึกค่าพารามิเตอร์ปัจจุบันออกมาเป็นไฟล์ YAML",
        "language": "bash",
        "code": "ros2 param dump /robot_controller",
        "explanation": "ส่งออกการตั้งค่าทั้งหมดออกมาเป็นไฟล์ YAML มาตรฐาน",
        "output": "/robot_controller:\n  ros__parameters:\n    max_speed: 0.8\n    wheel_separation: 0.28\n    use_sim_time: false"
      }
    ],
    "roboticsContext": {
      "title": "การจูนระบบควบคุมความเร็วบนพื้นผิวที่แตกต่างกัน",
      "description": "เมื่อนำหุ่นยนต์ Redbrick Mobile Robot ไปวิ่งทดสอบบนพื้นผิวต่างๆ (เช่น พื้นพรมที่มีแรงเสียดทานสูง เทียบกับพื้นกระเบื้องลื่น) วิศวกรจะปรับจูนค่าพารามิเตอร์การชดเชยแรงเสียดทานและอัตราขยาย PID ของมอเตอร์แบบสดๆ ด้วยคำสั่ง 'ros2 param set /base_motors kp 1.4' จนกระทั่งหุ่นยนต์วิ่งเป็นเส้นตรงได้อย่างสมบูรณ์แบบ"
    },
    "commonMistakes": [
      {
        "mistake": "พยายามเรียกใช้ 'self.get_parameter()' ก่อนที่จะสั่ง 'self.declare_parameter()'",
        "solution": "ใน ROS 2 ทุกพารามิเตอร์ต้องได้รับการประกาศด้วย declare_parameter ก่อนเสมอ มิฉะนั้นจะเกิด ParameterNotDeclaredException"
      }
    ],
    "exercise": {
      "instruction": "ตั้งค่าพารามิเตอร์ max_speed ของโหนด /robot_controller ให้เป็น 0.6 ด้วยคำสั่ง 'ros2 param set /robot_controller max_speed 0.6'",
      "initialCommand": "ros2 param set /robot_controller ",
      "targetCommand": "ros2 param set /robot_controller max_speed 0.6",
      "hint": "พิมพ์ 'ros2 param set /robot_controller max_speed 0.6'",
      "explanation": "ros2 param set จะอัปเดตค่าตัวแปรในโหนดนั้นทันที"
    },
    "quiz": [
      {
        "id": "q-param-1",
        "type": "single",
        "question": "สิ่งจำเป็นลำดับแรกสุดที่ต้องทำก่อนที่จะสามารถอ่านค่าพารามิเตอร์ในโหนด Python ของ ROS 2 คืออะไร?",
        "options": [
          {"id": "a", "text": "ต้องประกาศพารามิเตอร์ด้วยคำสั่ง self.declare_parameter() เสียก่อน"},
          {"id": "b", "text": "ต้องรีสตาร์ตเครื่องคอมพิวเตอร์ใหม่"},
          {"id": "c", "text": "ต้องสร้าง Action Server เพิ่มเติม"},
          {"id": "d", "text": "ต้องตั้งค่า Environment Variable ของระบบปฏิบัติการ"}
        ],
        "correctAnswer": "a",
        "explanation": "ROS 2 บังคับให้โหนดต้องประกาศตัวแปรพารามิเตอร์พร้อมค่าเริ่มต้นก่อนเข้าถึงข้อมูล"
      }
    ],
    "prevLesson": {"title": "08. แอ็กชัน, การส่งเป้าหมาย และการติดตามผล (Nav2)", "slug": "08-actions"},
    "nextLesson": {"title": "10. การสร้าง ROS 2 Launch Files ด้วย Python", "slug": "10-launch"}
  },

  "10-launch": {
    "id": "ros2-10",
    "slug": "10-launch",
    "title": "การสร้าง ROS 2 Launch Files ด้วย Python",
    "courseId": "ros2-jazzy",
    "moduleNumber": 10,
    "moduleTitle": "ระบบรันระบบด้วย ROS 2 Launch",
    "order": 10,
    "durationMinutes": 30,
    "difficulty": "Advanced",
    "learningObjectives": [
      "เข้าใจเหตุผลที่ต้องมี Launch File ในการควบคุมระบบหุ่นยนต์ที่มีหลายโหนด",
      "เขียนสคริปต์ Launch ด้วยภาษา Python โดยใช้แพ็กเกจ 'launch' และ 'launch_ros'",
      "กำหนดพารามิเตอร์, ชื่อเนมสเปซ และการเปลี่ยนชื่อท็อปปิก (Topic Remapping)",
      "สั่งเริ่มทำงานระบบหุ่นยนต์ทั้งตัวด้วยคำสั่งเดียวผ่าน 'ros2 launch'"
    ],
    "concept": r"""หุ่นยนต์เคลื่อนที่อัตโนมัติหนึ่งตัวประกอบไปด้วยโปรเซสย่อยนับสิบตัวที่ต้องทำงานพร้อมกัน: ไดรเวอร์ของ LiDAR, โหนดอ่านค่ากล้อง, ตัวควบคุมการขับเคลื่อนล้อ, ระบบแปลงพิกัด TF2 และระบบสร้างแผนที่ SLAM
การที่จะต้องเปิดหน้าต่างเทอร์มินัล 10 หน้าต่างเพื่อสั่ง `ros2 run` ทีละตัวเป็นเรื่องที่ไม่สะดวกอย่างยิ่ง

**ROS 2 Launch Files** ช่วยให้คุณสามารถสั่งเปิด กำหนดค่า และจัดการโปรเซสของระบบหุ่นยนต์ทั้งหมดได้ด้วยคำสั่งเพียงคำสั่งเดียว
โดยใน ROS 2 ไฟล์ Launch จะเขียนด้วย**ภาษา Python** (`.launch.py`) ทำให้มีความยืดหยุ่นสูง สามารถเขียนตรรกะแบบมีเงื่อนไข (if-else) และตรวจสอบสภาพแวดล้อมได้เต็มประสิทธิภาพ

### โครงสร้างสคริปต์ Launch ในภาษา Python:
```python
from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        # 1. สั่งเปิดไดรเวอร์เซนเซอร์ LiDAR
        Node(
            package='rplidar_ros',
            executable='rplidar_node',
            name='rplidar_node',
            parameters=[{'serial_port': '/dev/ttyUSB0', 'frame_id': 'laser_frame'}],
            output='screen'
        ),
        # 2. สั่งเปิดคอนโทรลเลอร์ขับเคลื่อนหุ่นยนต์
        Node(
            package='redbrick_controller',
            executable='robot_controller',
            name='robot_controller',
            parameters=[{'max_speed': 0.5}],
            remappings=[('/cmd_vel', '/diff_drive/cmd_vel')],
            output='screen'
        ),
    ])
```""",
    "syntax": "ros2 launch <package_name> <launch_file>.launch.py",
    "syntaxExplanation": "สั่งรันโหนดและคอนฟิกูเรชันทั้งหมดที่ระบุไว้ในไฟล์ Launch พร้อมกัน",
    "examples": [
      {
        "title": "สั่งเปิดระบบหุ่นยนต์ทั้งระบบด้วย Launch File เดียว",
        "language": "bash",
        "code": "ros2 launch redbrick_bringup robot.launch.py",
        "explanation": "เปิดไดรเวอร์และโหนดควบคุมทั้งหมดพร้อมกันในหน้าจอเดียว",
        "output": "[INFO] [launch]: All log files can be found in ~/.ros/log/\n[INFO] [rplidar_node]: RPLiDAR connected on /dev/ttyUSB0\n[INFO] [robot_controller]: Differential controller online."
      }
    ],
    "roboticsContext": {
      "title": "การเริ่มทำงานอัตโนมัติเมื่อหุ่นยนต์เปิดเครื่อง (Autonomous Startup)",
      "description": "หุ่นยนต์ AMR อุตสาหกรรมในคลังสินค้าจริงจะทำงานร่วมกับ systemd service ใน Linux ซึ่งจะรันคำสั่ง 'ros2 launch redbrick_bringup robot.launch.py' โดยอัตโนมัติทันทีที่เปิดเครื่อง โดย Launch System จะคอยตรวจสอบหากมีโหนดใดแครช ก็จะสั่งรีสตาร์ตโหนดนั้นขึ้นมาใหม่โดยอัตโนมัติ"
    },
    "commonMistakes": [
      {
        "mistake": "ตั้งชื่อไฟล์ Launch โดยไม่มีนามสกุล '.launch.py'",
        "solution": "ROS 2 กำหนดให้นามสกุลไฟล์ต้องลงท้ายด้วย '.launch.py' จึงจะสามารถค้นหาและสั่งรันผ่านคำสั่ง ros2 launch ได้"
      },
      {
        "mistake": "ลืมใส่คำสั่งติดตั้งโฟลเดอร์ 'launch/' ในไฟล์ setup.py ของแพ็กเกจ Python",
        "solution": "ต้องเพิ่มบรรทัด `(os.path.join('share', package_name, 'launch'), glob('launch/*.launch.py'))` ใน data_files ของ setup.py"
      }
    ],
    "exercise": {
      "instruction": "สั่งเปิดระบบหุ่นยนต์ด้วยคำสั่ง 'ros2 launch redbrick_bringup robot.launch.py'",
      "initialCommand": "ros2 launch ",
      "targetCommand": "ros2 launch redbrick_bringup robot.launch.py",
      "hint": "พิมพ์ 'ros2 launch redbrick_bringup robot.launch.py'",
      "explanation": "ros2 launch จะประมวลผลไฟล์ Launch Description และเริ่มทำงานทุกโหนดพร้อมกัน"
    },
    "quiz": [
      {
        "id": "q-launch-1",
        "type": "single",
        "question": "ภาษาโปรแกรมมิ่งใดที่เป็นมาตรฐานหลักอย่างเป็นทางการในการเขียน ROS 2 Launch Files?",
        "options": [
          {"id": "a", "text": "Python (.launch.py)"},
          {"id": "b", "text": "Bash (.sh)"},
          {"id": "c", "text": "C++ (.cpp)"},
          {"id": "d", "text": "JSON (.json)"}
        ],
        "correctAnswer": "a",
        "explanation": "ROS 2 ใช้ภาษา Python เป็นมาตรฐานหลักในการเขียน Launch เพื่อให้สามารถเขียนตรรกะควบคุมและปรับแต่งพารามิเตอร์ได้อย่างยืดหยุ่น"
      }
    ],
    "prevLesson": {"title": "09. ระบบพารามิเตอร์และการปรับแต่งค่าแบบไดนามิก", "slug": "09-parameters"},
    "nextLesson": {"title": "11. จำลองหุ่นยนต์ด้วย Gazebo Harmonic (ros_gz)", "slug": "11-gazebo-harmonic"}
  },

  "11-gazebo-harmonic": {
    "id": "ros2-11",
    "slug": "11-gazebo-harmonic",
    "title": "จำลองหุ่นยนต์ด้วย Gazebo Harmonic (ros_gz)",
    "courseId": "ros2-jazzy",
    "moduleNumber": 11,
    "moduleTitle": "การจำลองหุ่นยนต์ด้วย Gazebo Harmonic",
    "order": 11,
    "durationMinutes": 35,
    "difficulty": "Advanced",
    "learningObjectives": [
      "เข้าใจสถาปัตยกรรมของ Gazebo Harmonic ยุคใหม่ และการยกเลิก Gazebo Classic รุ่นเก่า",
      "ใช้งาน 'ros_gz_sim' และ 'ros_gz_bridge' เพื่อเชื่อมโยงการจำลองเข้ากับ ROS 2 Jazzy",
      "ทำ Topic Bridge เชื่อมต่อท็อปปิก '/cmd_vel', '/odom' และ '/scan' ระหว่าง ROS 2 และ Gazebo",
      "ทดสอบระบบหลบหลีกสิ่งกีดขวางในโลกเสมือนอย่างปลอดภัยก่อนนำไปใช้กับหุ่นยนต์จริง"
    ],
    "concept": r"""การทดสอบซอฟต์แวร์บนตัวหุ่นยนต์จริงมีความเสี่ยงและค่าใช้จ่ายสูง—ความผิดพลาดของอัลกอริทึมการนำทางอาจทำให้หุ่นยนต์พุ่งชนสิ่งของ มอเตอร์เสียหาย หรืออุปกรณ์ชำรุดได้
การจำลองในโลกเสมือน (Simulation) ช่วยให้คุณสามารถทดสอบความทนทานของอัลกอริทึมได้นับพันครั้งอย่างปลอดภัยไร้ความเสี่ยง

### มาตรฐานยุคใหม่: Gazebo Harmonic (`ros_gz`)
ใน ROS 2 Jazzy บน Ubuntu 24.04 LTS ซอฟต์แวร์จำลองหลักอย่างเป็นทางการคือ **Gazebo Harmonic (GZ Harmonic)**
ส่วนโปรแกรม Gazebo 11 รุ่นเดิม (\"Gazebo Classic\", `gazebo_ros`) ได้หมดอายุการสนับสนุน (End-Of-Life) และ**ถูกยกเลิกการใช้งานแล้ว**

### สถาปัตยกรรม Gazebo Harmonic ร่วมกับ ROS 2:
```
+------------------------------------+          +------------------------------------+
|           โหนด ROS 2 Jazzy          |          |      โปรแกรมจำลอง Gazebo Harmonic    |
|                                    |          |                                    |
|   /robot_controller   /teleop_node |          |   Physics Engine (DART / Bullet)   |
|   /nav2_planner       /slam_toolbox|          |   การจำลองเซนเซอร์และเรนเดอร์ภาพ 3D    |
+------------------------------------+          +------------------------------------+
                 ^                                                ^
                 | (ข้อความ ROS 2)                                 | (ข้อความ GZ Transport)
                 v                                                v
       +--------------------------------------------------------------------+
       |                   ros_gz_bridge (parameter_bridge)                 |
       |  สะพานเชื่อมข้อมูล: /cmd_vel, /odom, /scan ระหว่าง ROS 2 และ Gazebo   |
       +--------------------------------------------------------------------+
```

### การเปิดใช้งาน Gazebo Harmonic และเชื่อมต่อ Topic:
1. **เปิดโลกจำลอง Gazebo**:
```bash
ros2 launch ros_gz_sim gz_sim.launch.py gz_args:="-r empty.sdf"
```
2. **สร้างสะพานเชื่อมโยงท็อปปิกด้วย `parameter_bridge`**:
```bash
ros2 run ros_gz_bridge parameter_bridge \
  /cmd_vel@geometry_msgs/msg/Twist@gz.msgs.Twist \
  /odom@nav_msgs/msg/Odometry@gz.msgs.Odometry \
  /scan@sensor_msgs/msg/LaserScan@gz.msgs.LaserScan
```""",
    "syntax": "ros2 run ros_gz_bridge parameter_bridge <topic>@<ros_msg>@<gz_msg>",
    "syntaxExplanation": "สร้างสะพานส่งผ่านข้อมูลระหว่างชนิดข้อความของ ROS 2 และข้อความของ Gazebo Harmonic",
    "examples": [
      {
        "title": "เชื่อมโยงท็อปปิกควบคุมความเร็ว /cmd_vel",
        "language": "bash",
        "code": "ros2 run ros_gz_bridge parameter_bridge /cmd_vel@geometry_msgs/msg/Twist@gz.msgs.Twist",
        "explanation": "เชื่อมต่อท็อปปิก /cmd_vel ทำให้เมื่อสั่ง Twist ใน ROS 2 หุ่นยนต์ในโลกเสมือนจะเคลื่อนที่ตามทันที",
        "output": "[INFO] [ros_gz_bridge]: Created 2-way bridge for [/cmd_vel] (ROS 2: [geometry_msgs/msg/Twist] <-> GZ: [gz.msgs.Twist])"
      }
    ],
    "roboticsContext": {
      "title": "การสร้างฝาแฝดดิจิทัล (Digital Twin) สำหรับ Redbrick Mobile Robot",
      "description": "ก่อนที่จะปล่อยฝูงหุ่นยนต์ Redbrick Mobile Robot ออกไปวิ่งในคลังสินค้าจริง สภาพแวดล้อมทั้งหมดของโรงงานจะถูกจำลองขึ้นใน Gazebo Harmonic วิศวกรจะทดสอบจนมั่นใจ 100% ว่าหุ่นยนต์สามารถวางแผนเส้นทางและหลบหลีกสิ่งกีดขวางได้อย่างแม่นยำ ก่อนที่จะดาวน์โหลดโค้ดลงบอร์ด Raspberry Pi 5 บนตัวหุ่นยนต์จริง"
    },
    "commonMistakes": [
      {
        "mistake": "พยายามติดตั้ง 'ros-jazzy-gazebo-ros-pkgs' (Gazebo Classic รุ่นเก่า)",
        "solution": "Gazebo Classic ไม่รองรับบน ROS 2 Jazzy / Ubuntu 24.04 ให้ใช้ 'ros-jazzy-ros-gz-sim' และ 'ros-jazzy-ros-gz-bridge' เสมอ"
      },
      {
        "mistake": "ลืมใส่เครื่องหมาย '@' ในการจับคู่ชนิดข้อมูลของ ros_gz_bridge",
        "solution": "ไวยากรณ์ที่ถูกต้องคือ: <ชื่อท็อปปิก>@<ชนิดข้อความ_ROS2>@<ชนิดข้อความ_Gazebo>"
      }
    ],
    "exercise": {
      "instruction": "เชื่อมต่อท็อปปิก /cmd_vel ไปยัง Gazebo Harmonic ด้วยคำสั่ง 'ros2 run ros_gz_bridge parameter_bridge /cmd_vel@geometry_msgs/msg/Twist@gz.msgs.Twist'",
      "initialCommand": "ros2 run ros_gz_bridge parameter_bridge ",
      "targetCommand": "ros2 run ros_gz_bridge parameter_bridge /cmd_vel@geometry_msgs/msg/Twist@gz.msgs.Twist",
      "hint": "พิมพ์ 'ros2 run ros_gz_bridge parameter_bridge /cmd_vel@geometry_msgs/msg/Twist@gz.msgs.Twist'",
      "explanation": "parameter_bridge จะสร้างสะพานรับส่งข้อมูลระหว่าง ROS 2 และ Gazebo"
    },
    "quiz": [
      {
        "id": "q-gz-1",
        "type": "single",
        "question": "โปรแกรมจำลองโลกเสมือนและแพ็กเกจบริดจ์ใดที่เป็นมาตรฐานหลักอย่างเป็นทางการสำหรับ ROS 2 Jazzy บน Ubuntu 24.04?",
        "options": [
          {"id": "a", "text": "Gazebo Harmonic ร่วมกับแพ็กเกจ ros_gz (ros_gz_bridge)"},
          {"id": "b", "text": "Gazebo Classic 11 ร่วมกับ gazebo_ros"},
          {"id": "c", "text": "Stage 2D simulator"},
          {"id": "d", "text": "Webots 2019"}
        ],
        "correctAnswer": "a",
        "explanation": "ROS 2 Jazzy ทำงานร่วมกับ Gazebo Harmonic ยุคใหม่ผ่านแพ็กเกจ ros_gz เป็นมาตรฐานหลักอย่างเป็นทางการ"
      }
    ],
    "prevLesson": {"title": "10. การสร้าง ROS 2 Launch Files ด้วย Python", "slug": "10-launch"}
  }
}
