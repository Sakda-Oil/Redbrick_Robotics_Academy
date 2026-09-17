# Contributing to Redbrick Robotics Academy

Thank you for contributing to Redbrick Robotics Academy! To keep the codebase robust, well-documented, and consistent across development environments, please follow these guidelines.

---

## 🌿 Branch Naming Convention

Always create a dedicated branch off `main` for your work. Use the following prefixes:

- `feat/<feature-name>`: For new features, lessons, or simulation tools (e.g. `feat/ros2-action-server`)
- `fix/<bug-name>`: For bug fixes in content, UI, or simulator (e.g. `fix/tab-completion-spaces`)
- `docs/<doc-name>`: For documentation updates or new guides (e.g. `docs/setup-guide-windows`)
- `refactor/<refactor-name>`: For code refactoring without feature changes (e.g. `refactor/vfs-node-structure`)
- `test/<test-name>`: For adding or updating test cases (e.g. `test/vfs-rm-command`)
- `chore/<task-name>`: For dependency upgrades or tooling adjustments (e.g. `chore/update-dependencies`)

---

## 📝 Commit Message Convention

We adhere to the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```text
<type>: <short description in present tense>
```

### Supported Types:
- `feat:` A new feature, lesson, or simulator capability
- `fix:` A bug fix in code, simulator, or content typo
- `docs:` Documentation only changes
- `style:` Formatting, whitespace, or layout adjustments with no logic change
- `refactor:` Code changes that neither fix a bug nor add a feature
- `test:` Adding missing tests or correcting existing tests
- `chore:` Maintenance tasks, dependency updates, build tooling

### Examples:
```bash
git commit -m "feat: add ROS 2 Jazzy installation simulator"
git commit -m "fix: resolve tab completion for paths containing dashes"
git commit -m "docs: add Windows PowerShell setup instructions"
```

---

## 🧪 Pre-Commit Verification Checklist

Before pushing commits or opening a Pull Request, run the full verification pipeline locally:

```bash
# 1. Check code formatting & lint rules
npm run lint

# 2. Check TypeScript static types
npm run typecheck

# 3. Run Tab Completion and VFS unit tests
npm run test

# 4. Verify Next.js production build succeeds
npm run build
```

All 4 commands must exit with code 0.

---

## 🔀 Pull Request Process

1. **Keep Pull Requests Focused**: Limit PRs to one specific objective. Avoid mixing architectural refactors with content updates.
2. **Update Documentation**: If you add a new lesson or change a configuration file, update the corresponding documentation in `docs/` and `src/locales/`.
3. **Ensure Both Languages Match**: When adding or updating lesson content, ensure both Thai (`src/content/th/`) and English (`src/content/en/`) versions are kept in sync.
4. **No Secrets or Build Artifacts**: Never include `.env.local`, `.next/`, `dist_test/`, or credentials in your PR.
