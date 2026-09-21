# Redbrick Robotics Academy: New Machine Setup Guide

This guide provides step-by-step instructions for getting the **Redbrick Robotics Academy** project up and running on a brand-new computer.

---

## 📋 System Requirements

- **Node.js**: `v20.9.0` or `v22.x LTS` (Node 22 LTS recommended)
- **Package Manager**: `npm` (`v10.x` or `v11.x`)
- **Git**: `v2.30+`
- **Recommended Editor**: Visual Studio Code with the Tailwind CSS, ESLint, and TypeScript extensions.

---

## 🍏 1. macOS Setup

### Step 1: Install Homebrew, Git, and Node.js
If you don't already have Homebrew installed, open Terminal and run:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Install Git and Node.js:
```bash
brew install git node@22
brew link --overwrite node@22
```

Alternatively, if you use `nvm` (Node Version Manager):
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.zshrc
nvm install 22
nvm use 22
```

Verify installations:
```bash
git --version
node -v   # Should output v22.x.x (or v20+)
npm -v    # Should output 10.x or 11.x
```

### Step 2: Clone the Repository
```bash
git clone https://github.com/Sakda-Oil/Redbrick_Robotics_Academy.git
cd Redbrick_Robotics_Academy
```

### Step 3: Install Dependencies
```bash
npm ci
```

### Step 4: Environment Variables (Optional)
```bash
cp .env.example .env.local
```

### Step 5: Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in Safari or Chrome.

---

## 🪟 2. Windows Setup (PowerShell & Git Bash)

### Step 1: Install Git & Node.js on Windows
1. **Download & Install Git for Windows**:
   - Download from: [https://git-scm.com/download/win](https://git-scm.com/download/win)
   - During installation, keep the default option to enable Git from Command Prompt and PowerShell.
2. **Download & Install Node.js 22 LTS**:
   - Download the Windows Installer (`.msi`) from: [https://nodejs.org/](https://nodejs.org/)
   - Ensure the "Add to PATH" checkbox is selected.
   - Alternatively, install via `winget` in PowerShell:
     ```powershell
     winget install OpenJS.NodeJS.LTS
     ```

Verify installation in Windows PowerShell:
```powershell
git --version
node -v
npm -v
```

### Step 2: Clone the Repository
Open **PowerShell** or **Git Bash**:
```powershell
git clone https://github.com/Sakda-Oil/Redbrick_Robotics_Academy.git
cd Redbrick_Robotics_Academy
```

### Step 3: Install Dependencies
```powershell
npm ci
```

### Step 4: Environment Variables (Optional)
In PowerShell:
```powershell
Copy-Item .env.example .env.local
```

### Step 5: Run Development Server
```powershell
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in Microsoft Edge or Chrome.

> [!NOTE]
> **Windows Path Formatting**: All paths inside the Next.js project and simulators use standard POSIX forward slashes (`/`), so the code runs identically across Windows, macOS, and Linux without OS-specific path issues.

---

## 🐧 3. Linux Setup (Ubuntu 22.04 / 24.04 LTS)

### Step 1: Update APT and Install Prerequisites
```bash
sudo apt update && sudo apt install -y curl git build-essential
```

### Step 2: Install Node.js 22 LTS via NodeSource
```bash
# Download and install NodeSource repository setup script for Node.js 22
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -

# Install Node.js
sudo apt install -y nodejs

# Verify installation
node -v   # Should output v22.x.x
npm -v    # Should output 10.x.x
```

### Step 3: Clone the Repository
```bash
git clone https://github.com/Sakda-Oil/Redbrick_Robotics_Academy.git
cd Redbrick_Robotics_Academy
```

### Step 4: Install Dependencies
```bash
npm ci
```

### Step 5: Environment Variables (Optional)
```bash
cp .env.example .env.local
```

### Step 6: Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔍 Verification After Installation

To verify that the project is 100% functional and ready for development on your new computer, run:

```bash
# 1. Run Tab Completion and VFS tests
npm run test

# 2. Check TypeScript compiler
npm run typecheck

# 3. Check linting
npm run lint

# 4. Verify Next.js production build
npm run build
```

If all 4 commands complete successfully, your machine is fully configured!
