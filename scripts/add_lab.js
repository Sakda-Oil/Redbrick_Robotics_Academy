const fs = require('fs');
const path = require('path');
const fileTh = path.join(__dirname, '../src/content/th/ros2Data.ts');
let contentTh = fs.readFileSync(fileTh, 'utf8');

const labJson = `
    "lab": {
      "id": "lab-install-01",
      "title": "ปฏิบัติการติดตั้ง ROS 2 Jazzy",
      "description": "จำลองการติดตั้ง ROS 2 บนเครื่อง Ubuntu 24.04 (Noble)",
      "steps": [
        {
          "step": 1,
          "title": "เพิ่ม GPG Key",
          "instruction": "เพิ่ม GPG Key เข้าสู่ระบบเพื่อตรวจสอบความถูกต้องของแพ็กเกจ",
          "task": "รันคำสั่ง sudo apt update ก่อน แต่ในขั้นตอนนี้ให้สมมติว่าคุณต้องการเพิ่มคีย์ ให้รัน 'sudo apt update' เป็นจุดเริ่มต้น",
          "hint": "พิมพ์ sudo apt update",
          "validationCommand": ["sudo apt update"]
        },
        {
          "step": 2,
          "title": "ติดตั้ง ROS 2 Desktop",
          "instruction": "ทำการติดตั้งแพ็กเกจ ros-jazzy-desktop",
          "task": "รันคำสั่ง apt install ด้วยสิทธิ์ sudo เพื่อติดตั้งแพ็กเกจ ros-jazzy-desktop (อย่าลืมใส่ -y ด้วยหรือไม่ใส่ก็ได้)",
          "hint": "พิมพ์ sudo apt install ros-jazzy-desktop",
          "validationCommand": ["sudo apt install ros-jazzy-desktop", "sudo apt install -y ros-jazzy-desktop"]
        },
        {
          "step": 3,
          "title": "ทดสอบคำสั่ง",
          "instruction": "ตรวจสอบการติดตั้งด้วยการเรียกไฟล์ setup.bash",
          "task": "ใช้คำสั่ง source เรียกไฟล์ setup.bash ของ jazzy",
          "hint": "พิมพ์ source /opt/ros/jazzy/setup.bash",
          "validationCommand": ["source /opt/ros/jazzy/setup.bash", ". /opt/ros/jazzy/setup.bash"]
        }
      ]
    },`;

contentTh = contentTh.replace(/"concept": "ROS 2 Jazzy Jalisco คือเวอร์ชันสนับสนุนระยะยาว/, labJson + '\n    "concept": "ROS 2 Jazzy Jalisco คือเวอร์ชันสนับสนุนระยะยาว');

fs.writeFileSync(fileTh, contentTh);

const fileEn = path.join(__dirname, '../src/content/en/ros2Data.ts');
let contentEn = fs.readFileSync(fileEn, 'utf8');

const labJsonEn = `
    "lab": {
      "id": "lab-install-01",
      "title": "ROS 2 Jazzy Installation Lab",
      "description": "Simulate ROS 2 installation on an Ubuntu 24.04 (Noble) machine",
      "steps": [
        {
          "step": 1,
          "title": "Update Package List",
          "instruction": "Update the APT package list first",
          "task": "Run sudo apt update to fetch the latest package lists.",
          "hint": "Type sudo apt update",
          "validationCommand": ["sudo apt update"]
        },
        {
          "step": 2,
          "title": "Install ROS 2 Desktop",
          "instruction": "Install the ros-jazzy-desktop package",
          "task": "Run apt install with sudo privileges to install the ros-jazzy-desktop package.",
          "hint": "Type sudo apt install ros-jazzy-desktop",
          "validationCommand": ["sudo apt install ros-jazzy-desktop", "sudo apt install -y ros-jazzy-desktop"]
        },
        {
          "step": 3,
          "title": "Source Environment",
          "instruction": "Source the ROS 2 setup script",
          "task": "Use the source command to load the setup.bash file for jazzy.",
          "hint": "Type source /opt/ros/jazzy/setup.bash",
          "validationCommand": ["source /opt/ros/jazzy/setup.bash", ". /opt/ros/jazzy/setup.bash"]
        }
      ]
    },`;
    
contentEn = contentEn.replace(/"concept": "ROS 2 Jazzy Jalisco is the Long Term Support/, labJsonEn + '\n    "concept": "ROS 2 Jazzy Jalisco is the Long Term Support');

fs.writeFileSync(fileEn, contentEn);

