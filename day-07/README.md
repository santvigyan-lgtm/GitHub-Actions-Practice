# 📅 Day 7 — Mock Exam + Speed Drills + Exam Day Readiness

> **All 4 Domains — Full Simulation | 100% of Exam**

---

## 🎯 Objectives

- Complete 6 mock exam tasks covering all domains
- Practice 5 timed speed drills for exam simulation  
- Build muscle memory for common workflow patterns
- Know which docs pages to navigate to during the exam

---

## 📝 Mock Exam Tasks

### Task 1 — [Domain 1: 40%] PR Pipeline with Matrix + Artifacts
**Write** a workflow triggered on PR to main:
- Run `lint` on Node 18, `build` on Node 20 (use matrix)
- Upload the build artifact using `actions/upload-artifact@v4`
- ⏱️ **Time Target**: 8 minutes
- 📂 **Template**: [task-01-matrix-artifact.yml](./mock-tasks/task-01-matrix-artifact.yml)

### Task 2 — [Domain 1: 40%] Debug Broken YAML
**Read** the broken workflow YAML and find the bug:
- Common trap: `if:` on job vs step level
- Another trap: incorrect indentation
- ⏱️ **Time Target**: 5 minutes
- 📂 **Template**: [task-02-fix-broken.yml](./mock-tasks/task-02-fix-broken.yml)

### Task 3 — [Domain 2: 20%] Extract Reusable Workflow
**Extract** a deploy job into a reusable workflow:
- Caller passes: `environment`, `image-tag` inputs and `PROD_KEY` secret
- Reusable workflow deploys and returns a `deploy-url` output
- ⏱️ **Time Target**: 10 minutes
- 📂 **Template**: [task-03-reusable-workflow.yml](./mock-tasks/task-03-reusable-workflow.yml)

### Task 4 — [Domain 3: 25%] Composite Security Action
**Write** a composite action that:
- Installs a security scanning tool
- Runs the scan and outputs the vulnerability count
- Fails the workflow if count > 0
- ⏱️ **Time Target**: 10 minutes
- 📂 **Template**: [task-04-composite-action/action.yml](./mock-tasks/task-04-composite-action/action.yml)

### Task 5 — [Domain 4: 15%] Minimal Permissions
**Add** minimum permissions to a workflow that pushes Docker images:
- Set exactly: `packages: write`, `contents: read`
- ⏱️ **Time Target**: 3 minutes
- 📂 **Template**: [task-05-permissions.yml](./mock-tasks/task-05-permissions.yml)

### Task 6 — [Domain 1: 40%] Python Pip Caching
**Add** caching to a Python workflow:
- Cache pip packages with key using `hashFiles('requirements.txt')`
- Include `restore-keys` fallback
- ⏱️ **Time Target**: 5 minutes
- 📂 **Template**: [task-06-python-cache.yml](./mock-tasks/task-06-python-cache.yml)

---

## ⚡ Speed Drills (Timed!)

| Drill | Time | Task |
|-------|------|------|
| **Drill 1** | 3 min | Write `workflow_dispatch` with 3 inputs (string, boolean, choice) |
| **Drill 2** | 4 min | Write a 3-job pipeline with `needs:` and output passing |
| **Drill 3** | 2 min | Write the correct `permissions:` block (read repo, write packages) |
| **Drill 4** | 5 min | Write a complete composite `action.yml` with 2 inputs and 1 output |
| **Drill 5** | 3 min | Write matrix with `include`/`exclude` and `fail-fast: false` |

📂 **Templates**: [speed-drills/](./speed-drills/)
📂 **Solutions**: [solutions/](./solutions/)

---

## 📋 Exam Day Quick Reference

### Resources Allowed During Exam
- ✅ [github.com/actions](https://github.com/actions) — Official actions repo
- ✅ [docs.github.com/en/actions](https://docs.github.com/en/actions) — Documentation
- ✅ [github.com/marketplace](https://github.com/marketplace) — Action marketplace

### Key Docs Pages to Know Cold
| Topic | Docs Page |
|-------|-----------|
| Workflow syntax | `/workflow-syntax-for-github-actions` |
| Trigger events | `/events-that-trigger-workflows` |
| Composite actions | `/creating-a-composite-action` |
| JavaScript actions | `/creating-a-javascript-action` |
| Reusable workflows | `/reusing-workflows` |
| GitHub-hosted runners | `/using-github-hosted-runners` |
| Security hardening | `/security-hardening-for-github-actions` |

---

## 💡 Final Exam Tips

> 🗣️ *"The exam is not hard if you've written real workflows. The YAML syntax questions catch people who only read theory. Build something every day."*

- **100 minutes, ~60 questions** — about 1.5 minutes per question
- **Score 85%+ on ghcertified.com** practice tests before attempting
- **GitHub Docs are allowed** but you won't have time to search from scratch
- **Domain 1 (40%)** is the kingmaker — nail triggers, jobs, matrix, and outputs
- **Reusable workflows + composite actions** are the hardest questions

---

## 📂 All Files

| Category | Files |
|----------|-------|
| Mock Tasks | `task-01` through `task-06` + composite action |
| Speed Drills | `drill-01` through `drill-05` |
| Solutions | All solutions in `solutions/` |

---

[⬅️ Day 6](../day-06/README.md) | [Back to Main](../README.md) | [📄 Cheat Sheet](../CHEAT_SHEET.md)
