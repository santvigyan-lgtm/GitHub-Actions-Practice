# 📅 Day 5 — Author Custom Actions (JS, Docker & Composite)

> **Domain 3: Author & Maintain Actions | 25% of Exam**

---

## 🎯 Learning Objectives

By the end of Day 5, you will be able to:
- Create all 3 types of custom actions: Composite, JavaScript, Docker
- Define `action.yml` metadata with inputs, outputs, and branding
- Use `@actions/core` in JavaScript actions for inputs/outputs/failures
- Build Docker container actions with Dockerfile + entrypoint
- Understand semantic versioning and action distribution (Marketplace, private, internal)

---

## 📝 Problem Statements

### Problem 1: Composite Action
**Create** a composite action that sets up Node.js and builds the project.
- File: `composite-action/action.yml`
- Inputs: `node-version` (default: 20), `working-directory` (default: '.')
- Output: `build-path` — path to the build output
- Steps: setup-node + npm ci + npm run build
- **Success Criteria**: Use the action in a workflow and it runs all steps

### Problem 2: JavaScript Action
**Create** a JavaScript action using `@actions/core`.
- Files: `js-action/action.yml` + `js-action/index.js`
- Input: `who-to-greet` (required string)
- Output: `greeting-time` — timestamp of when greeting happened
- Use `core.getInput()`, `core.setOutput()`, `core.setFailed()`
- Use `runs: using: 'node20'` in metadata
- **Success Criteria**: Action greets the input name and sets output

### Problem 3: Docker Container Action
**Create** a Docker action that runs in a container.
- Files: `docker-action/action.yml` + `docker-action/Dockerfile` + `docker-action/entrypoint.sh`
- Input: `who-to-greet` (required string)
- The entrypoint script greets the user and outputs the greeting time
- **Success Criteria**: Action builds Docker container and runs entrypoint

### Problem 4: Action Versioning & Distribution
**Understand** action publishing and versioning.
- Create a `v1.0.0` tag and a floating `v1` tag
- Add `branding:` with icon and color for Marketplace
- Reference action via: `owner/repo@v1`, `owner/repo@v1.0.0`, or SHA
- **Question**: Why do consumers pin to SHA instead of tag? (Supply chain security)

### Problem 5: Test All Actions
**Create** a workflow that tests all 3 action types in one pipeline.
- Use the composite action in job 1
- Use the JavaScript action in job 2
- Use the Docker action in job 3
- **Success Criteria**: All 3 action types run successfully

---

## 📋 Action Types — Decision Guide

| Feature | Composite | JavaScript | Docker |
|---------|-----------|------------|--------|
| **runs-on** | All OS | Linux+Windows+Mac | Linux only |
| **Speed** | Fast | ⚡ Fastest | 🐢 Slowest (container) |
| **Language** | YAML/bash | Node.js | Any language |
| **Use case** | Reuse YAML steps | Complex logic | Custom runtime |
| **Pre/Post hooks** | ❌ No | ✅ Yes | ✅ Yes |

---

## 🧪 Practice Scenarios

| # | Scenario | Answer |
|---|----------|--------|
| 1 | When to choose composite vs JS vs Docker? | Composite: shell steps; JS: complex logic, fast; Docker: specific env |
| 2 | JS action must fail when input is invalid | `core.setFailed('message')` from `@actions/core` |
| 3 | Action needs cleanup even if workflow fails | Implement `post:` in `action.yml` |
| 4 | Consumer pins action to SHA hash instead of v1 | Supply chain security — SHAs are immutable |
| 5 | Action available only within organization | Publish to internal GitHub with private visibility |

---

## 💡 Exam Tips

> ⚠️ **Domain 3 is 25% of the exam — know all 3 action types!**

- JS actions are **fastest** (no container spin-up)
- Docker actions can use **any language/runtime**
- Composite actions **reuse YAML steps** — great for DRY workflows
- Know `action.yml` structure cold: `name`, `description`, `inputs`, `outputs`, `runs`
- JS action metadata: `runs: using: 'node20'` + `main: 'dist/index.js'`
- Docker action metadata: `runs: using: 'docker'` + `image: 'Dockerfile'`
- The exam tests action distribution: public marketplace vs private vs internal

---

## 📂 Solution Files

| File | What It Demonstrates |
|------|---------------------|
| [composite-action/action.yml](./composite-action/action.yml) | Composite action with inputs/outputs |
| [js-action/action.yml](./js-action/action.yml) | JavaScript action metadata |
| [js-action/index.js](./js-action/index.js) | JS logic using @actions/core |
| [docker-action/action.yml](./docker-action/action.yml) | Docker action metadata |
| [docker-action/Dockerfile](./docker-action/Dockerfile) | Container for Docker action |
| [docker-action/entrypoint.sh](./docker-action/entrypoint.sh) | Docker entrypoint script |
| [test-actions.yml](./.github/workflows/test-actions.yml) | Workflow testing all 3 types |

---

[⬅️ Day 4](../day-04/README.md) | [Back to Main](../README.md) | [Day 6 →](../day-06/README.md)
