# 🚀 GitHub Actions GH-200 Certification — 7-Day Hands-On Study Plan

> **100% Practical | Zero Theory Lectures | Based on Real Exam Passer Feedback**

[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-GH--200-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://docs.github.com/en/actions)
[![Exam](https://img.shields.io/badge/Exam-100_Minutes-FF6B6B?style=for-the-badge)](https://examregistration.github.com/)
[![Questions](https://img.shields.io/badge/Questions-~60-4CAF50?style=for-the-badge)](https://examregistration.github.com/)

---

## 📋 Exam Overview

| Detail | Value |
|--------|-------|
| **Exam Code** | GH-200 |
| **Duration** | 100 Minutes |
| **Questions** | ~60 (Multiple Choice + Scenario-Based) |
| **Open Docs** | ✅ GitHub Docs allowed during exam |
| **Pass Strategy** | Score 85%+ on practice tests before attempting |

## 📊 Domain Weight Distribution

| Domain | Weight | Study Day(s) |
|--------|--------|--------------|
| **Domain 1:** Author & Maintain Workflows | **40%** ⬆️ HIGHEST | Days 1, 2, 3 |
| **Domain 2:** Consume Workflows | **20%** | Days 3, 4 |
| **Domain 3:** Author & Maintain Actions | **25%** | Day 5 |
| **Domain 4:** Manage GitHub Actions for Enterprise | **15%** | Day 6 |
| **Mock Exam + Full Drill** | All Domains | Day 7 |

---

## 🗓️ 7-Day Study Plan Navigator

| Day | Topic | Domain | Link |
|-----|-------|--------|------|
| **Day 1** | Workflow Fundamentals & YAML Syntax | Domain 1 (40%) | [📂 day-01/](./day-01/) |
| **Day 2** | Jobs, Steps, Conditionals & Context Variables | Domain 1 (40%) | [📂 day-02/](./day-02/) |
| **Day 3** | Matrix Strategy, Artifacts & Caching | Domain 1+2 (60%) | [📂 day-03/](./day-03/) |
| **Day 4** | Secrets, Environments, Reusable Workflows | Domain 2 (20%) | [📂 day-04/](./day-04/) |
| **Day 5** | Author Custom Actions (JS, Docker & Composite) | Domain 3 (25%) | [📂 day-05/](./day-05/) |
| **Day 6** | Enterprise: Self-Hosted Runners, Security & Policies | Domain 4 (15%) | [📂 day-06/](./day-06/) |
| **Day 7** | Mock Exam + Speed Drills + Exam Readiness | All (100%) | [📂 day-07/](./day-07/) |

📄 **[Cheat Sheet →](./CHEAT_SHEET.md)** — Context variables, status functions, action types comparison

---

## 🛠️ Setup Instructions

### Prerequisites
1. **GitHub Account** — [Create one free](https://github.com) (or create a fresh test org)
2. **Create a public repo** named `gh-actions-practice` — all your workflows go here
3. **Install Act** (optional) — Run workflows locally: [github.com/nektos/act](https://github.com/nektos/act)

### How to Use This Repo

```bash
# Clone this repo
git clone https://github.com/santvigyan-lgtm/GitHub-Actions-Practice.git
cd GitHub-Actions-Practice

# Each day: create a new branch, write workflows, push, watch them run
git checkout -b day-01
# Copy the day's workflow files to .github/workflows/
# Push and watch in the Actions tab!
git push origin day-01
```

### Daily Workflow
1. Read the day's `README.md` for learning objectives
2. Try the **Problem Statements** — write workflows from scratch first
3. Compare with the provided **Solution Workflows**
4. Complete the **Practice Scenarios** to test edge cases
5. Review the **Exam Tips** before moving to the next day

---

## 💡 What Exam Passers Say

> 🗣️ *"The exam tests YAML reading as much as writing — you'll be shown broken or partial workflows and asked what happens"*

> 🗣️ *"Domain 1 (40%) is everything — if you can write any workflow trigger, multi-job pipeline, and matrix from scratch, you're halfway done"*

> 🗣️ *"Reusable workflows (`workflow_call`) and composite actions are consistently the hardest questions"*

> 🗣️ *"The GitHub Docs are allowed — but you won't have time to read them from scratch. Navigate directly to the page you need"*

> 🗣️ *"Practice at ghcertified.com free tests — score 85%+ before attempting the real exam"*

---

## 📚 Free Resources

| Resource | Link |
|----------|------|
| **GitHub Skills** (Interactive Labs) | [github.com/skills](https://github.com/skills) |
| **Practice Tests** | [ghcertified.com](https://ghcertified.com) |
| **Microsoft Learn Path** | [learn.microsoft.com → GitHub Actions](https://learn.microsoft.com/en-us/training/paths/automate-workflow-github-actions/) |
| **Official Docs** | [docs.github.com/en/actions](https://docs.github.com/en/actions) |
| **Workflow Syntax Reference** | [Workflow syntax for GitHub Actions](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions) |
| **Events Reference** | [Events that trigger workflows](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows) |

---

## 🏗️ Repo Structure

```
gh-actions-practice/
├── README.md                          ← You are here
├── CHEAT_SHEET.md                     ← Quick reference for exam day
├── day-01/                            ← Workflow Fundamentals & YAML
│   ├── README.md
│   ├── .github/workflows/            ← 6 workflow files
│   └── src/app.js                     ← Dummy file for path filters
├── day-02/                            ← Jobs, Conditionals & Context
│   ├── README.md
│   └── .github/workflows/            ← 4 workflow files
├── day-03/                            ← Matrix, Artifacts & Caching
│   ├── README.md
│   ├── .github/workflows/            ← 3 workflow files
│   └── package.json
├── day-04/                            ← Secrets, Environments, Reusable
│   ├── README.md
│   └── .github/workflows/            ← 4 workflow files
├── day-05/                            ← Custom Actions (JS/Docker/Composite)
│   ├── README.md
│   ├── composite-action/
│   ├── js-action/
│   ├── docker-action/
│   └── .github/workflows/
├── day-06/                            ← Enterprise, Security, Runners
│   ├── README.md
│   └── .github/
├── day-07/                            ← Mock Exam + Speed Drills
│   ├── README.md
│   ├── mock-tasks/
│   ├── speed-drills/
│   └── solutions/
└── .gitignore
```

---

## 📜 License

This project is for educational purposes. Built for the GitHub Actions GH-200 certification exam preparation.

**Build real workflows every day. The exam rewards muscle memory, not memorization. You've got this! 🚀**
