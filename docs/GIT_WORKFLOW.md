# Multi-Machine Git Workflow & Collaboration Guide

This document outlines the standard Git workflow for developing and maintaining **Redbrick Robotics Academy** across multiple computers (macOS, Windows, and Linux) while preventing merge conflicts and data loss.

---

## 💻 Working Across Multiple Computers (Machine A & Machine B)

When developing on a desktop at work (Machine A) and continuing on a laptop at home (Machine B):

### First Time Setup on Machine B
```bash
git clone <repository-url>
cd redbrick-robotics-academy
npm install
npm run dev
```

### Daily Routine (Before Starting Work)
**ALWAYS pull the latest changes before writing any code**:
```bash
git checkout main
git pull origin main
```

### Daily Routine (When Finishing Work)
Before leaving your computer, commit and push your work so it is available on your other machine:
```bash
git status
git add .
git commit -m "feat: complete lesson 07 synchronous services"
git push origin main  # or push your feature branch
```

---

## 🌿 Standard Branching Model

To avoid conflicts on `main`, perform non-trivial work on dedicated topic branches:

- `main`: Production-ready, stable codebase.
- `feature/<name>`: New lessons, courses, or simulator features.
- `fix/<name>`: Bug fixes and typo corrections.
- `docs/<name>`: Documentation additions and updates.

### Creating and Merging a Feature Branch
```bash
# 1. Ensure you have the latest code
git checkout main
git pull origin main

# 2. Create and switch to your feature branch
git checkout -b feature/add-ros2-topic-lab

# 3. Work and commit changes in small, logical units
git add src/content/ros2Data.ts
git commit -m "feat: add ROS 2 topic interactive exercises"

# 4. Push feature branch to GitHub
git push -u origin feature/add-ros2-topic-lab

# 5. Merge into main (via GitHub Pull Request or local merge)
git checkout main
git pull origin main
git merge feature/add-ros2-topic-lab
git push origin main
```

---

## ⚠️ Golden Rules to Prevent Conflicts

1. **Pull Before You Code**: Never start writing code on an outdated branch.
2. **Small, Atomic Commits**: Commit one logical change at a time rather than a single giant commit at the end of the week.
3. **Push Regularly**: Don't hoard commits locally across multiple days.
4. **Never Force Push (`git push --force`)**: Force pushing rewrites shared history and destroys commits made on your other computers.

---

## 🛠 Resolving Git Merge Conflicts

If you and a colleague (or your other computer) modified the same line of code, Git will halt during `git pull` or `git merge` with a conflict.

### Step 1: Identify Conflicted Files
```bash
git status
```
Git will list files under:
`Unmerged paths: (both modified: src/content/ros2Data.ts)`

### Step 2: Inspect Conflict Markers
Open the conflicted file in VS Code. You will see:
```text
<<<<<<< HEAD (Current Change - Your local code)
      "title": "06. Topics, Publishers & Subscribers in ROS 2",
=======
      "title": "06. Topics, Publishers & Subscribers",
>>>>>>> main (Incoming Change - Code from remote)
```

### Step 3: Resolve the Conflict
Choose the correct version, delete the marker lines (`<<<<<<<`, `=======`, `>>>>>>>`), and save the file.

### Step 4: Stage and Commit the Resolution
```bash
git add src/content/ros2Data.ts
git commit -m "fix: resolve merge conflict in topic lesson title"
git push origin main
```

---

## 🛡 Backup Principle Before Major Refactoring

Before undertaking large structural refactoring, create a local backup branch:

```bash
git checkout -b backup/before-major-refactor
git checkout main
```
If anything goes wrong during refactoring, you can easily inspect or restore code from the backup branch.

---

## 🏷 Release Version Tagging

When a major stable version is achieved, tag it:

```bash
# Create annotated tag
git tag -a v1.0.0 -m "Release v1.0.0: Initial Redbrick Robotics Academy launch"

# Push tag to GitHub
git push origin v1.0.0
```
To list existing tags:
```bash
git tag -l
```
