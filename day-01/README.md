# 📅 Day 1 — Workflow Fundamentals & YAML Syntax

> **Domain 1: Author & Maintain Workflows | 40% of Exam** ⬆️ HIGHEST WEIGHT

---

## 🎯 Learning Objectives

By the end of Day 1, you will be able to:
- Create a GitHub Actions workflow from scratch
- Use multiple trigger types: `push`, `pull_request`, `workflow_dispatch`, `schedule`
- Filter triggers with `branches`, `paths`, `branches-ignore`
- Understand core context variables (`github.event_name`, `github.ref`, etc.)

---

## 📝 Problem Statements

### Problem 1: Hello World Workflow
**Create** `.github/workflows/hello.yml` from scratch.
- Trigger on `push`
- One job named `greet` running on `ubuntu-latest`
- Two steps: echo "Hello GitHub Actions!" and print the runner OS
- **Success Criteria**: Push to repo → see green check in Actions tab

### Problem 2: PR-Only Trigger
**Create** a workflow that runs ONLY when a pull request is opened to `main`.
- Trigger: `pull_request` targeting `main` branch only
- Run a linting step (echo "Linting code...")
- **Success Criteria**: Create a PR to main → workflow triggers; push to feature branch → nothing happens

### Problem 3: Manual Trigger with Inputs
**Create** a workflow with `workflow_dispatch` trigger.
- Add 3 inputs: `environment` (choice: dev/staging/prod), `debug` (boolean), `message` (string)
- Echo all input values in the job
- **Success Criteria**: Go to Actions tab → "Run workflow" button appears → select inputs → runs correctly

### Problem 4: Scheduled Trigger
**Create** a workflow that runs every Monday at 9:00 AM UTC.
- Use `schedule` trigger with cron syntax
- Echo "Weekly check running on ${{ github.event_name }}"
- **Success Criteria**: Verify cron syntax is valid (use crontab.guru)

### Problem 5: Multi-Trigger Workflow
**Create** a workflow that triggers on BOTH `push` AND `pull_request`.
- Use the `on:` array syntax for multiple events
- Add `paths: ['src/**']` filter so it only runs when `src/` files change
- Add `branches-ignore: ['release/**']` to skip release branches
- **Success Criteria**: Change a file in `src/` → triggers; change README → doesn't trigger

### Problem 6: Context Variable Explorer
**Create** a workflow that dumps all key context variables.
- Print: `github.event_name`, `github.sha`, `github.actor`, `github.repository`, `github.ref`
- Use `${{ toJSON(github) }}` to dump the full github context
- **Success Criteria**: Read the output and understand what each variable contains

---

## 📋 YAML Reference

```yaml
name: CI Pipeline
on:
  push:
    branches: [main]
    paths: ['src/**']
  pull_request:
    branches: [main]
  workflow_dispatch:
    inputs:
      environment:
        type: choice
        options: [dev, staging, prod]
  schedule:
    - cron: '0 9 * * 1'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Print info
        run: |
          echo 'Runner: ${{ runner.os }}'
          echo 'Event: ${{ github.event_name }}'
          echo 'Ref: ${{ github.ref }}'
```

---

## 🧪 Practice Scenarios

| # | Scenario | Hint |
|---|----------|------|
| 1 | A workflow must run on push to main AND on every PR — write the `on:` block | Use map syntax with both events |
| 2 | Trigger workflow only when `.py` files change, not when `docs/` changes | Use `paths:` and/or `paths-ignore:` |
| 3 | Allow developers to manually trigger with a 'dry-run' boolean input | `workflow_dispatch` with `type: boolean` |
| 4 | Read what `github.event_name`, `github.sha`, `github.actor` contain | Add echo steps with `${{ }}` expressions |

---

## 💡 Exam Tips

> ⚠️ **Domain 1 is 40% of the exam. YAML indentation errors are the #1 mistake.**

- Read every YAML option in the trigger section — `paths`, `branches`, `tags`, `types` appear constantly
- `on: push` is NOT the same as `on: [push, pull_request]` — the `on:` key is singular when using map syntax with additional filters
- Know the difference between `branches:` (include) and `branches-ignore:` (exclude) — you cannot use both

---

## 📂 Solution Workflow Files

| File | What It Demonstrates |
|------|---------------------|
| [hello.yml](./.github/workflows/hello.yml) | Basic push trigger + echo |
| [pr-trigger.yml](./.github/workflows/pr-trigger.yml) | PR to main only |
| [manual-trigger.yml](./.github/workflows/manual-trigger.yml) | `workflow_dispatch` with inputs |
| [scheduled.yml](./.github/workflows/scheduled.yml) | Cron schedule trigger |
| [multi-trigger.yml](./.github/workflows/multi-trigger.yml) | Combined triggers + path filters |
| [context-explorer.yml](./.github/workflows/context-explorer.yml) | Dump all context variables |

---

[⬅️ Back to Main](../README.md) | [Day 2 →](../day-02/README.md)
