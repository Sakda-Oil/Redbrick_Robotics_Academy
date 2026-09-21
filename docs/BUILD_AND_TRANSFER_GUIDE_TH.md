# คู่มือ Build และพัฒนา Redbrick Robotics Academy ต่อบนเครื่องอื่น

เอกสารนี้ใช้สำหรับติดตั้งโปรเจกต์บนเครื่องใหม่ เปิดโหมดพัฒนา สร้าง Production Build ตรวจสอบคุณภาพ แก้ปัญหา Build และส่งต่องานระหว่างหลายเครื่อง โดยอ้างอิง repository หลัก:

<https://github.com/Sakda-Oil/Redbrick_Robotics_Academy>

## 1. ภาพรวมโปรเจกต์

โปรเจกต์นี้พัฒนาด้วย Next.js 15, React 19, TypeScript, Tailwind CSS และ Zustand ใช้ npm เป็น package manager และเก็บ dependency เวอร์ชันที่ติดตั้งจริงไว้ใน `package-lock.json`

ค่ามาตรฐานที่ใช้ร่วมกันทุกเครื่อง:

| รายการ | ค่าแนะนำ |
| --- | --- |
| Node.js | 22 LTS ตามไฟล์ `.nvmrc` |
| Node.js ต่ำสุด | 20.9.0 (แนะนำให้ใช้ 22 LTS ตาม `.nvmrc`) |
| npm | 10 ขึ้นไป |
| Git | 2.30 ขึ้นไป |
| Development URL | `http://localhost:3000` |
| Production Build | โฟลเดอร์ `.next/` |
| Branch หลัก | `main` |

ไม่จำเป็นต้องติดตั้ง ROS 2 เพื่อพัฒนาเว็บไซต์ เนื่องจากส่วน Terminal และ ROS 2 Lab ทำงานอยู่ในเว็บแอป

## 2. เตรียมเครื่องมือบนเครื่องใหม่

ตรวจสอบก่อนว่าเครื่องมี Git, Node.js และ npm:

```bash
git --version
node --version
npm --version
```

ผลที่ควรได้คือ Node.js `v22.x` และ npm `10.x` หรือใหม่กว่า

### macOS

วิธีที่แนะนำคือใช้ `nvm` เพื่อให้เปลี่ยน Node.js ตาม `.nvmrc` ได้ง่าย:

```bash
brew install git nvm
mkdir -p ~/.nvm
```

เพิ่มบรรทัดต่อไปนี้ใน `~/.zshrc`:

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && . "/opt/homebrew/opt/nvm/nvm.sh"
```

Mac Intel อาจต้องใช้ `/usr/local/opt/nvm/nvm.sh` แทน `/opt/homebrew/opt/nvm/nvm.sh` จากนั้นเปิด Terminal ใหม่และรัน:

```bash
nvm install 22
nvm use 22
```

### Windows

ติดตั้ง Git และ Node.js LTS ผ่าน `winget` ใน PowerShell:

```powershell
winget install --id Git.Git -e
winget install --id OpenJS.NodeJS.LTS -e
```

ปิดและเปิด PowerShell ใหม่ แล้วตรวจสอบ:

```powershell
git --version
node --version
npm --version
```

หากพัฒนาผ่าน WSL2 ให้ติดตั้ง Node.js ภายใน WSL2 แยกจาก Node.js ของ Windows และเก็บ repository ไว้ใน filesystem ของ Linux เช่น `~/projects` เพื่อให้การอ่านไฟล์เร็วขึ้น

### Ubuntu 22.04/24.04 หรือ WSL2

```bash
sudo apt update
sudo apt install -y git curl build-essential
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install 22
nvm use 22
```

## 3. Clone โปรเจกต์ครั้งแรก

```bash
git clone https://github.com/Sakda-Oil/Redbrick_Robotics_Academy.git
cd Redbrick_Robotics_Academy
nvm use
npm ci
```

`npm ci` เหมาะสำหรับเครื่องใหม่และระบบ CI เพราะติดตั้ง dependency ตาม `package-lock.json` อย่างตรงกันทุกเครื่อง และจะไม่แก้ lockfile เอง

ถ้าไม่ได้ใช้ `nvm` ให้ตรวจสอบว่า `node --version` ตรงตามข้อกำหนดก่อนรัน `npm ci`

## 4. Environment variables

โปรเจกต์ทำงานได้โดยไม่สร้าง `.env.local` หากต้องการกำหนดชื่อแอป URL หรือพอร์ตเฉพาะเครื่อง ให้คัดลอกไฟล์ตัวอย่าง:

macOS, Linux และ WSL2:

```bash
cp .env.example .env.local
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

ค่าตัวอย่าง:

```dotenv
NEXT_PUBLIC_APP_NAME="Redbrick Robotics Academy"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
PORT=3000
```

ไฟล์ `.env.local` เป็นค่าของแต่ละเครื่องและถูก ignore โดย Git อย่า commit secret, token หรือรหัสผ่านลง repository

## 5. เปิดโหมดพัฒนา

```bash
npm run dev
```

เปิด <http://localhost:3000> การแก้ไฟล์ใน `src/` จะอัปเดตหน้าเว็บอัตโนมัติ

หากพอร์ต 3000 ถูกใช้งานอยู่:

```bash
npm run dev -- -p 3001
```

แล้วเปิด <http://localhost:3001>

หยุดเซิร์ฟเวอร์ด้วย `Ctrl+C`

## 6. คำสั่งที่ใช้พัฒนาและตรวจสอบ

| คำสั่ง | หน้าที่ |
| --- | --- |
| `npm run dev` | เปิด Next.js Development Server |
| `npm run lint` | ตรวจ ESLint ใน `src/` |
| `npm run typecheck` | ตรวจ TypeScript โดยไม่สร้างไฟล์ output |
| `npm test` | ทดสอบ Terminal, ROS 2 curriculum และ robot logic |
| `npm run build` | สร้าง Production Build ใน `.next/` |
| `npm run start` | เปิด Production Server จาก Build ล่าสุด |
| `npm run verify` | รัน lint, typecheck, test และ build ตามลำดับ |

ก่อน commit หรือ push ควรรัน:

```bash
npm run verify
```

## 7. สร้างและทดสอบ Production Build

### Build ปกติ

```bash
npm run build
```

เมื่อสำเร็จ Next.js จะแสดงรายการ route และสร้างโฟลเดอร์ `.next/`

### ทดสอบ Build ที่สร้างแล้ว

```bash
npm run start
```

เปิด <http://localhost:3000> และตรวจหน้าหลักต่อไปนี้:

- `/`
- `/courses/linux`
- `/courses/ros2-jazzy`
- `/courses/ros2-jazzy/02-installation`
- `/playground/ros2`
- `/cheatsheet/linux`
- `/cheatsheet/ros2`

`npm run start` ต้องรันหลัง `npm run build` เท่านั้น หากยังไม่มี `.next/` จะเปิดไม่ได้

### Clean Build

ใช้เมื่อ Build cache เก่า หรือผลบนเครื่องหนึ่งไม่ตรงกับอีกเครื่อง:

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

`.next/` เป็นไฟล์ที่สร้างใหม่ได้และไม่ควร commit

## 8. ตำแหน่งไฟล์ที่แก้บ่อย

| ต้องการแก้ | ไฟล์หรือโฟลเดอร์ |
| --- | --- |
| หน้าแรก | `src/app/page.tsx` |
| Navbar | `src/components/common/Navbar.tsx` |
| Footer | `src/components/common/Footer.tsx` |
| Layout บทเรียน | `src/components/course/LessonPageLayout.tsx` |
| เนื้อหา Linux ภาษาไทย | `src/content/th/linuxData.ts` |
| เนื้อหา Linux ภาษาอังกฤษ | `src/content/en/linuxData.ts` |
| เนื้อหา ROS 2 ภาษาไทย | `src/content/th/ros2Data.ts` |
| เนื้อหา ROS 2 ภาษาอังกฤษ | `src/content/en/ros2Data.ts` |
| ข้อความ UI ภาษาไทย/อังกฤษ | `src/locales/th.json`, `src/locales/en.json` |
| Terminal | `src/components/simulator/TerminalSimulator.tsx` |
| บทติดตั้ง ROS 2 | `src/components/simulator/ROS2InstallationLab.tsx` |
| สนามทดลอง ROS 2 | `src/components/simulator/ROS2InteractiveLab.tsx` |
| หุ่นยนต์ 2D | `src/components/simulator/MobileRobotSimulator.tsx` |
| Logic หลบสิ่งกีดขวาง | `src/lib/simulator/obstacleAvoidance.ts` |
| Test | `scripts/test-completion.mjs`, `scripts/test-ros-simulator.mjs` |

เมื่อแก้เนื้อหาบทเรียน ต้องตรวจทั้งไฟล์ไทยและอังกฤษเพื่อให้จำนวน module, lesson และ slug ตรงกัน

## 9. วิธีส่งต่องานไปพัฒนาบนเครื่องอื่น

### เครื่องต้นทาง

ตรวจสอบและ Build ก่อนส่งงาน:

```bash
git status
npm run verify
git add .
git commit -m "feat: describe the completed change"
git push origin main
```

ถ้าทำงานร่วมกับผู้อื่น ควรสร้าง branch:

```bash
git switch -c feature/topic-name
git add .
git commit -m "feat: describe the completed change"
git push -u origin feature/topic-name
```

### เครื่องปลายทางที่ Clone ไว้แล้ว

```bash
cd Redbrick_Robotics_Academy
git status
git switch main
git pull --ff-only origin main
nvm use
npm ci
npm run verify
```

ใช้ `git pull --ff-only` เพื่อป้องกัน Git สร้าง merge commit โดยไม่ตั้งใจ ถ้ามีงานที่ยังไม่ commit ให้ commit หรือ stash ก่อน pull

```bash
git stash push -u -m "งานชั่วคราวก่อนอัปเดต main"
git pull --ff-only origin main
git stash pop
```

ตรวจ conflict ทุกครั้งหลัง `git stash pop`

## 10. เมื่อเพิ่มหรืออัปเดต dependency

เพิ่ม dependency ที่ใช้ในแอป:

```bash
npm install package-name
```

เพิ่มเครื่องมือสำหรับพัฒนา:

```bash
npm install -D package-name
```

ต้อง commit ทั้ง `package.json` และ `package-lock.json`:

```bash
git add package.json package-lock.json
git commit -m "chore: update dependencies"
```

หลัง pull แล้วพบว่า `package-lock.json` เปลี่ยน ให้รัน `npm ci` ใหม่

ไม่ควรลบ `package-lock.json` เพื่อแก้ปัญหา Build ทั่วไป เพราะจะทำให้แต่ละเครื่องได้ dependency คนละเวอร์ชัน

## 11. แนวทางวิเคราะห์เมื่อ Build ไม่ผ่าน

รันแยกทีละขั้นเพื่อระบุต้นเหตุ:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

### ESLint ไม่ผ่าน

อ่านข้อความที่ระบุไฟล์และบรรทัด จากนั้นแก้ import ที่ไม่ได้ใช้, React hook dependency หรือรูปแบบโค้ด แล้วรัน:

```bash
npm run lint
```

### TypeScript ไม่ผ่าน

ตรวจ error แรกก่อน เพราะ error ถัดไปอาจเกิดตามกันจาก type เดียว:

```bash
npm run typecheck
```

สาเหตุที่พบบ่อย:

- ชื่อ property ไม่ตรงกับ interface ใน `src/types/`
- ส่ง prop ให้ component ไม่ครบ
- import path หรือชื่อไฟล์ตัวพิมพ์เล็ก/ใหญ่ไม่ตรง โดยเฉพาะเมื่อย้ายจาก macOS/Windows ไป Linux
- เพิ่ม lesson แต่ slug หรือ course ID ไม่ตรงกัน

### Test ไม่ผ่าน

```bash
npm test
```

ชุดทดสอบหลักอยู่ที่:

- `scripts/test-completion.mjs`
- `scripts/test-ros-simulator.mjs`

แก้ logic ให้ตรงกับพฤติกรรมที่ต้องการก่อนแก้ assertion หากตั้งใจเปลี่ยนพฤติกรรมจริง จึงอัปเดต test พร้อมเหตุผลใน commit เดียวกัน

### Build cache มีปัญหา

ลบเฉพาะ `.next/` ก่อน:

```bash
rm -rf .next
npm run build
```

ถ้ายังผิดปกติ ให้ติดตั้ง dependency ใหม่จาก lockfile:

macOS, Linux และ WSL2:

```bash
rm -rf node_modules .next
npm ci
npm run verify
```

Windows PowerShell:

```powershell
Remove-Item -Recurse -Force node_modules, .next
npm ci
npm run verify
```

### พอร์ตถูกใช้งาน

เลือกพอร์ตอื่นได้ทันที:

```bash
npm run dev -- -p 3001
```

หรือ macOS/Linux ตรวจ process ด้วย:

```bash
lsof -i :3000
```

อย่าปิด process ที่ไม่รู้จัก ให้ตรวจ PID และโปรแกรมเจ้าของ process ก่อน

### หน้า 404 หลังเพิ่มบทเรียน

ตรวจให้ครบ:

1. lesson มี `slug` ใน module ของ course
2. มีเนื้อหา lesson ที่ใช้ slug เดียวกัน
3. ภาษาไทยและอังกฤษมี slug ตรงกัน
4. ไม่มี slug ซ้ำ
5. ปิด Development Server ลบ `.next/` แล้วเปิดใหม่ หากเพิ่งเปลี่ยน route generation

### รูปภาพไม่แสดงบน Linux

Linux แยกตัวพิมพ์เล็กและใหญ่ ตรวจชื่อไฟล์ใน `public/` และ path ในโค้ดให้ตรงกันทุกตัว เช่น `logo.png` ไม่เท่ากับ `Logo.png`

### Build ผ่านในเครื่องแต่ GitHub Actions ไม่ผ่าน

CI ใช้ Ubuntu และ Node.js 22 พร้อม `npm ci` จึงมักพบปัญหาที่ filesystem แบบไม่แยกตัวพิมพ์ไม่พบ:

- ชื่อ import ไม่ตรงกับชื่อไฟล์
- ไม่ได้ commit ไฟล์ใหม่
- `package-lock.json` ไม่ตรงกับ `package.json`
- มีค่าจาก `.env.local` ที่โค้ดต้องใช้ แต่ไม่ได้กำหนดใน CI

ตรวจไฟล์ที่ Git ติดตามด้วย:

```bash
git status
git ls-files
```

จากนั้นจำลองขั้นตอน CI ด้วย:

```bash
npm ci
npm run verify
```

## 12. การแก้ Merge conflict อย่างปลอดภัย

ดูไฟล์ที่ conflict:

```bash
git status
```

เปิดไฟล์และแก้ส่วนที่มี marker:

Git จะแสดงส่วนของโค้ดจาก `HEAD` ตามด้วยเส้นแบ่ง และส่วนของโค้ดจาก branch ที่นำเข้ามา ให้เลือกหรือรวมเนื้อหาที่ถูกต้อง แล้วลบบรรทัด marker ของ Git ทั้งหมดก่อนบันทึกไฟล์

ลบ marker เลือกหรือรวมโค้ดที่ถูกต้อง แล้วตรวจสอบ:

```bash
git add path/to/resolved-file
npm run verify
git commit
```

หากยังไม่ต้องการแก้ conflict และต้องการยกเลิก merge:

```bash
git merge --abort
```

## 13. Checklist ก่อน Push

- [ ] ตรวจ `git status` และไม่มีไฟล์ส่วนตัวหรือ `.env.local`
- [ ] ตรวจเนื้อหาทั้งภาษาไทยและอังกฤษเมื่อแก้หลักสูตร
- [ ] `npm run lint` ผ่าน
- [ ] `npm run typecheck` ผ่าน
- [ ] `npm test` ผ่าน
- [ ] `npm run build` ผ่าน
- [ ] ทดลองหน้าที่แก้บนขนาดจอที่เกี่ยวข้อง
- [ ] Commit message อธิบายการเปลี่ยนแปลงชัดเจน
- [ ] Pull การเปลี่ยนแปลงล่าสุดก่อน push เมื่อมีผู้พัฒนาหลายคน

รันคำสั่งเดียวแทนรายการตรวจคุณภาพสี่ข้อได้ด้วย:

```bash
npm run verify
```

## 14. ไฟล์ที่ไม่ควรส่งขึ้น Git

รายการเหล่านี้ถูกกำหนดใน `.gitignore` และสร้างใหม่ได้ในแต่ละเครื่อง:

- `node_modules/`
- `.next/`
- `.env.local`
- log files
- `.DS_Store`
- cache ของ editor

ไฟล์ที่ต้องส่งขึ้น Git เพื่อให้เครื่องอื่น Build ได้เหมือนกัน:

- source code ใน `src/`
- test ใน `scripts/`
- `public/`
- `package.json`
- `package-lock.json`
- `.nvmrc`
- config ของ TypeScript, Next.js, Tailwind และ ESLint
- เอกสารใน `docs/`

## 15. ขั้นตอนสั้นสำหรับเครื่องใหม่

```bash
git clone https://github.com/Sakda-Oil/Redbrick_Robotics_Academy.git
cd Redbrick_Robotics_Academy
nvm install
nvm use
npm ci
npm run verify
npm run dev
```

เมื่อ `npm run verify` ผ่านทั้งหมด เครื่องใหม่พร้อมพัฒนาต่อจาก repository นี้
