# Redbrick Robotics Academy 🤖

แพลตฟอร์มเรียนรู้แบบโต้ตอบสำหรับ **Linux พื้นฐาน**, **Ubuntu Linux** และ **ROS 2 Jazzy Jalisco สำหรับงานหุ่นยนต์** พัฒนาโดย Redbrick Robotics

เนื้อหาภายในประกอบด้วยบทเรียนภาษาไทยและอังกฤษ Terminal สำหรับฝึกคำสั่ง ห้องทดลอง ROS 2 ตัวแก้ไขโค้ด Python/C++ และสนามทดลองหุ่นยนต์เคลื่อนที่ 2 มิติที่มี LiDAR, Odometry และระบบหลบสิ่งกีดขวางอัตโนมัติ

## เริ่มใช้งานอย่างรวดเร็ว

```bash
# 1. ดาวน์โหลดโปรเจกต์
git clone https://github.com/Sakda-Oil/Redbrick_Robotics_Academy.git
cd Redbrick_Robotics_Academy

# 2. เลือก Node.js ตาม .nvmrc และติดตั้ง dependency
nvm use
npm ci

# 3. เปิด Development Server
npm run dev
```

เปิด <http://localhost:3000> ในเว็บเบราว์เซอร์

หากยังไม่มี Node.js เวอร์ชันที่กำหนด:

```bash
nvm install
nvm use
```

## ความสามารถหลัก

- **บทเรียนสองภาษา ไทย/อังกฤษ** ครอบคลุม Navigation, เนื้อหา, Quiz และห้องทดลอง
- **หลักสูตร Linux และ Ubuntu 24.04** ตั้งแต่คำสั่งพื้นฐานจนถึงการจัดการไฟล์และระบบ
- **หลักสูตร ROS 2 Jazzy** จัดตามหัวข้อจากเอกสาร ROS 2 Jazzy Tutorials โดยไม่รวมหมวด Demos และ Miscellaneous
- **บทติดตั้ง ROS 2 Jazzy** อ้างอิงขั้นตอนปัจจุบันสำหรับ Ubuntu 24.04 และแพ็กเกจ `ros2-apt-source`
- **Terminal แบบโต้ตอบ** รองรับคำสั่ง Linux, command history และ Tab completion
- **ฝึกเขียน ROS 2 ด้วย Python และ C++** พร้อมตรวจโครงสร้าง Publisher/Subscriber และแสดงผลการรัน
- **สนามทดลอง ROS 2 สำหรับนักพัฒนา** รวม Code Editor, Terminal และหุ่นยนต์ 2 มิติไว้ในหน้าเดียว
- **หุ่นยนต์ Differential Drive 2 มิติ** พร้อม LiDAR, `/cmd_vel`, `/odom` และการหลบสิ่งกีดขวางอัตโนมัติ
- **ติดตามความคืบหน้า** บันทึกบทเรียนที่เรียนจบ คะแนน Quiz ภาษา และขนาดตัวอักษรใน `localStorage`
- **Responsive UI** ใช้งานได้ทั้ง Desktop, Tablet และ Mobile

## เทคโนโลยีที่ใช้

| ส่วน | เทคโนโลยี |
| --- | --- |
| Framework | Next.js 15 App Router |
| UI | React 19, Lucide React, Canvas Confetti |
| ภาษา | TypeScript 5.7+ |
| Styling | Tailwind CSS 3, PostCSS |
| Animation | Framer Motion |
| State Management | Zustand พร้อม `localStorage` persistence |
| Testing | Jiti และชุดทดสอบ Terminal/ROS 2 |
| CI | GitHub Actions บน Node.js 22 |

## ความต้องการของระบบ

- Node.js `20.9.0` ขึ้นไป แนะนำ Node.js 22 LTS ตาม `.nvmrc`
- npm 10 ขึ้นไป
- Git 2.30 ขึ้นไป
- macOS, Windows PowerShell/WSL2 หรือ Linux

ตรวจสอบเวอร์ชันด้วย:

```bash
git --version
node --version
npm --version
```

## การติดตั้งบนเครื่องใหม่

```bash
git clone https://github.com/Sakda-Oil/Redbrick_Robotics_Academy.git
cd Redbrick_Robotics_Academy
nvm install
nvm use
npm ci
```

ใช้ `npm ci` เมื่อติดตั้งโปรเจกต์บนเครื่องใหม่หรือระบบ CI เพื่อให้ dependency ตรงกับ `package-lock.json`

### Environment variables

โปรเจกต์สามารถเปิดใช้งานได้โดยไม่ต้องสร้าง `.env.local` หากต้องการกำหนดค่าเฉพาะเครื่อง:

macOS, Linux และ WSL2:

```bash
cp .env.example .env.local
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

ค่าตัวอย่างอยู่ใน `.env.example`:

```dotenv
NEXT_PUBLIC_APP_NAME="Redbrick Robotics Academy"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
PORT=3000
```

อย่า commit `.env.local`, token, secret หรือรหัสผ่านขึ้น Git

## คำสั่งสำหรับพัฒนา

| คำสั่ง | การทำงาน |
| --- | --- |
| `npm run dev` | เปิด Development Server |
| `npm run lint` | ตรวจ ESLint ใน source code |
| `npm run typecheck` | ตรวจ TypeScript โดยไม่สร้าง output |
| `npm test` | รันชุดทดสอบ Terminal และ ROS 2 |
| `npm run build` | สร้าง Production Build |
| `npm run start` | เปิด Production Server จาก Build ล่าสุด |
| `npm run verify` | รัน lint, typecheck, test และ build ตามลำดับ |

ก่อน commit หรือ push ให้ตรวจทั้งโปรเจกต์ด้วย:

```bash
npm run verify
```

## การสร้าง Production Build

```bash
npm run build
npm run start
```

จากนั้นเปิด <http://localhost:3000> เพื่อตรวจ Build ที่สร้างแล้ว

หากต้องการล้าง Build cache:

macOS, Linux และ WSL2:

```bash
rm -rf .next
npm run build
```

Windows PowerShell:

```powershell
Remove-Item -Recurse -Force .next
npm run build
```

## โครงสร้างโปรเจกต์

```text
Redbrick_Robotics_Academy/
├── .github/
│   └── workflows/ci.yml             # GitHub Actions
├── docs/                            # คู่มือพัฒนาและแก้ไขโปรเจกต์
│   ├── BUILD_AND_TRANSFER_GUIDE_TH.md
│   ├── SETUP_GUIDE.md
│   ├── DEVELOPMENT_GUIDE.md
│   ├── EDITING_GUIDE.md
│   ├── GIT_WORKFLOW.md
│   └── TROUBLESHOOTING.md
├── public/                          # รูปภาพและ static assets
├── scripts/
│   ├── test-completion.mjs          # ทดสอบ Terminal completion
│   └── test-ros-simulator.mjs       # ทดสอบหลักสูตรและ ROS 2 Lab
├── src/
│   ├── app/                         # Next.js routes และ pages
│   ├── components/
│   │   ├── common/                  # Navbar, Footer, Search, Markdown
│   │   ├── course/                  # Layout, Sidebar, Quiz, Exercise
│   │   └── simulator/               # Terminal และ ROS 2 Labs
│   ├── content/
│   │   ├── th/                      # เนื้อหาภาษาไทย
│   │   └── en/                      # เนื้อหาภาษาอังกฤษ
│   ├── lib/                         # Store และ logic ของห้องทดลอง
│   ├── locales/                     # ข้อความ UI ไทย/อังกฤษ
│   └── types/                       # TypeScript types
├── .env.example
├── .nvmrc                          # Node.js 22
├── package.json
├── package-lock.json
├── tailwind.config.js
└── tsconfig.json
```

## ตำแหน่งไฟล์ที่แก้บ่อย

| ต้องการแก้ | ไฟล์ |
| --- | --- |
| หน้าแรก | `src/app/page.tsx` |
| Navbar | `src/components/common/Navbar.tsx` |
| Footer | `src/components/common/Footer.tsx` |
| Layout หน้าบทเรียน | `src/components/course/LessonPageLayout.tsx` |
| เนื้อหา Linux ภาษาไทย | `src/content/th/linuxData.ts` |
| เนื้อหา Linux ภาษาอังกฤษ | `src/content/en/linuxData.ts` |
| เนื้อหา ROS 2 ภาษาไทย | `src/content/th/ros2Data.ts` |
| เนื้อหา ROS 2 ภาษาอังกฤษ | `src/content/en/ros2Data.ts` |
| ข้อความ UI | `src/locales/th.json`, `src/locales/en.json` |
| Terminal | `src/components/simulator/TerminalSimulator.tsx` |
| บทติดตั้ง ROS 2 | `src/components/simulator/ROS2InstallationLab.tsx` |
| ห้องทดลองตามบทเรียน | `src/components/simulator/LessonInteractiveLab.tsx` |
| สนามทดลอง ROS 2 | `src/components/simulator/ROS2InteractiveLab.tsx` |
| หุ่นยนต์ 2 มิติ | `src/components/simulator/MobileRobotSimulator.tsx` |
| ระบบหลบสิ่งกีดขวาง | `src/lib/simulator/obstacleAvoidance.ts` |
| สีและ Typography | `tailwind.config.js` |

## การทำงานต่อบนเครื่องอื่น

บนเครื่องต้นทาง:

```bash
npm run verify
git status
git add .
git commit -m "feat: อธิบายงานที่แก้ไข"
git push origin main
```

บนเครื่องปลายทาง:

```bash
cd Redbrick_Robotics_Academy
git switch main
git pull --ff-only origin main
nvm use
npm ci
npm run verify
npm run dev
```

อ่านขั้นตอนแยกตามระบบปฏิบัติการ การแก้ Build error และ Git conflict ได้ใน [คู่มือ Build และพัฒนาต่อบนเครื่องอื่น ภาษาไทย](docs/BUILD_AND_TRANSFER_GUIDE_TH.md)

## Checklist ก่อน Push

- [ ] ไม่มี `.env.local`, secret หรือไฟล์ส่วนตัวใน `git status`
- [ ] เนื้อหาภาษาไทยและอังกฤษมี module, lesson และ slug ตรงกัน
- [ ] `npm run lint` ผ่าน
- [ ] `npm run typecheck` ผ่าน
- [ ] `npm test` ผ่าน
- [ ] `npm run build` ผ่าน
- [ ] ทดลองหน้าที่แก้บนขนาดหน้าจอที่เกี่ยวข้อง
- [ ] Commit message อธิบายสิ่งที่เปลี่ยนชัดเจน

## คู่มือเพิ่มเติม

- 🇹🇭 [คู่มือ Build และพัฒนาต่อบนเครื่องอื่น ฉบับละเอียด](docs/BUILD_AND_TRANSFER_GUIDE_TH.md)
- 📘 [คู่มือติดตั้ง macOS, Windows และ Linux](docs/SETUP_GUIDE.md)
- 🏗 [โครงสร้างและแนวทางพัฒนา](docs/DEVELOPMENT_GUIDE.md)
- ✏️ [คู่มือแก้ไขเนื้อหาและ UI](docs/EDITING_GUIDE.md)
- 🗂 [คู่มือโครงสร้างไฟล์](docs/FILE_GUIDE.md)
- 🌿 [แนวทางใช้ Git หลายเครื่อง](docs/GIT_WORKFLOW.md)
- ➕ [วิธีเพิ่มบทเรียน](docs/HOW_TO_ADD_LESSON.md)
- 📚 [วิธีเพิ่มหลักสูตร](docs/HOW_TO_ADD_COURSE.md)
- 🔬 [วิธีแก้ไข ROS 2 Lab](docs/HOW_TO_EDIT_ROS_LAB.md)
- ⛔ [ไฟล์และส่วนที่ต้องระวัง](docs/DO_NOT_EDIT.md)
- 🛠 [แนวทางแก้ปัญหา](docs/TROUBLESHOOTING.md)

## GitHub Actions

ทุกครั้งที่ push หรือเปิด Pull Request เข้า `main` ระบบ CI จะรันบน Node.js 22 ตามลำดับ:

```text
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

ควรรัน `npm run verify` ในเครื่องก่อน push เพื่อให้ผลใกล้เคียงกับ CI

## ลิขสิทธิ์

สงวนลิขสิทธิ์ © 2026 **Redbrick Robotics Co., Ltd.** ห้ามเผยแพร่ คัดลอก หรือดัดแปลงโดยไม่ได้รับอนุญาตเป็นลายลักษณ์อักษร
