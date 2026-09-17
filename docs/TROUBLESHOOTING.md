# Redbrick Robotics Academy: Troubleshooting Guide

This guide provides solutions to common development issues encountered across macOS, Windows, and Linux environments.

---

## 🛑 1. Port 3000 is Already in Use (`EADDRINUSE`)

### Problem
When running `npm run dev`, you receive:
`Error: listen EADDRINUSE: address already in use :::3000`

### Solution

#### On macOS / Linux:
Find and terminate the process using port 3000:
```bash
# Identify process ID
lsof -i :3000

# Kill process
kill -9 $(lsof -t -i :3000)
```
Or start Next.js on a different port:
```bash
npm run dev -- -p 3001
```

#### On Windows (PowerShell):
```powershell
# Find process using port 3000
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force
```
Or start on another port:
```powershell
npm run dev -- -p 3001
```

---

## 📦 2. Node Version Mismatch

### Problem
Errors during `npm install` or `next build` indicating unsupported Node.js features.

### Solution
Redbrick Robotics Academy requires **Node.js 20.9.0+** or **Node.js 22 LTS**.
Check your current version:
```bash
node -v
```
If your version is older (e.g. Node 16 or 18):
```bash
# Using nvm (macOS / Linux)
nvm install 22
nvm use 22

# Using Windows
winget install OpenJS.NodeJS.LTS
```

---

## 🧹 3. Corrupted `node_modules` or `npm install` Failure

### Problem
Weird TypeScript or Webpack errors after pulling new code or switching branches.

### Solution
Perform a clean reinstall of dependencies:

#### On macOS / Linux:
```bash
rm -rf node_modules .next package-lock.json
npm install
npm run dev
```

#### On Windows (PowerShell):
```powershell
Remove-Item -Recurse -Force node_modules, .next
npm install
npm run dev
```

---

## 🔨 4. Next.js Build Fails (`npm run build`)

### Problem
`npm run build` exits with type errors or linting errors.

### Solution
Run the diagnostics tools individually to isolate the cause:
```bash
# 1. Check TypeScript static types
npm run typecheck

# 2. Check ESLint rules
npm run lint

# 3. Clear build cache and retry
rm -rf .next
npm run build
```

---

## 🔀 5. Git Pull Conflicts (`error: Your local changes would be overwritten by merge`)

### Problem
When attempting `git pull`, Git refuses to overwrite modified local files.

### Solution
1. **Option A: Stash your local changes, pull, then restore**:
   ```bash
   git stash
   git pull origin main
   git stash pop
   ```
2. **Option B: Commit your local work first**:
   ```bash
   git add .
   git commit -m "chore: save work in progress before pull"
   git pull origin main
   ```

---

## 🖼 6. Missing Assets or Broken Images (404)

### Problem
An image or logo does not render in the browser.

### Solution
- Ensure static images are located inside the `public/` directory (e.g. `public/images/redbrick_logo.png`).
- Next.js serves files from `public/` at the root path:
  - Valid path: `<Image src="/images/redbrick_logo.png" ... />`
  - ❌ Incorrect path: `<Image src="../public/images/redbrick_logo.png" ... />`
- Check case-sensitivity: Linux filesystems are case-sensitive (`logo.PNG` vs `logo.png`).

---

## 🌐 7. Localhost Fails to Load in Browser

### Problem
Browser displays `ERR_CONNECTION_REFUSED` when visiting `http://localhost:3000`.

### Solution
1. Confirm the terminal output shows:
   `- Local: http://localhost:3000`
   and the terminal has not stopped.
2. If using WSL2 or Docker, verify that port forwarding to `localhost` is enabled in Windows.
3. Try accessing `http://127.0.0.1:3000` directly.
