# 📋 GitHub Actions GH-200 — CHEAT SHEET

> **Know These Cold for Exam Day!** Print this and keep it handy.

---

## 🔑 Essential Context Variables

| Expression | What It Returns | Example |
|-----------|----------------|---------|
| `${{ github.event_name }}` | Event that triggered the workflow | `push`, `pull_request`, `workflow_dispatch` |
| `${{ github.ref }}` | Full ref of the branch/tag | `refs/heads/main`, `refs/tags/v1.0.0` |
| `${{ github.ref_name }}` | Short ref name | `main`, `v1.0.0` |
| `${{ github.sha }}` | Full commit SHA | `a1b2c3d4e5f6...` |
| `${{ github.actor }}` | User who triggered the workflow | `octocat` |
| `${{ github.run_number }}` | Incrementing run number | `42` (great for versioning) |
| `${{ github.repository }}` | Repository name | `owner/repo` |
| `${{ github.workspace }}` | Workspace directory path | `/home/runner/work/repo/repo` |
| `${{ needs.<job>.outputs.<name> }}` | Output from a previous job | Any string value |
| `${{ secrets.MY_SECRET }}` | Repository or org secret | `***` (always masked) |
| `${{ env.MY_VAR }}` | Environment variable | Any string |
| `${{ matrix.node }}` | Current matrix value | `18`, `20` |
| `${{ inputs.environment }}` | Workflow dispatch/call input | `production` |
| `${{ steps.<id>.outputs.<name> }}` | Output from previous step | Any string value |
| `${{ runner.os }}` | Runner operating system | `Linux`, `Windows`, `macOS` |

---

## ✅ Status Check Functions

| Function | When It Returns `true` | Use Case |
|----------|----------------------|----------|
| `success()` | All previous steps/jobs passed | **DEFAULT** — no need to write it |
| `failure()` | Any previous step/job failed | Send failure notifications |
| `always()` | Always — regardless of status | Cleanup steps, resource teardown |
| `cancelled()` | Workflow was cancelled | Special cancellation handling |

```yaml
# Common patterns:
- name: Only on success (default)
  run: echo "passed"

- name: Only on failure
  if: failure()
  run: echo "send alert"

- name: Always run (cleanup)
  if: always()
  run: echo "cleanup"

- name: Main branch + success
  if: github.ref == 'refs/heads/main' && success()
  run: echo "deploy"
```

---

## 🎯 Trigger Types

```yaml
on:
  push:                          # On push to branches
    branches: [main, 'release/*']
    paths: ['src/**']            # Only when src/ changes
    tags: ['v*']                 # On version tags
    branches-ignore: ['temp/*']  # Skip temp branches

  pull_request:                  # On PR events
    branches: [main]
    types: [opened, synchronize, reopened]

  workflow_dispatch:             # Manual trigger (UI button)
    inputs:
      env:
        type: choice
        options: [dev, staging, prod]

  schedule:                      # Cron schedule
    - cron: '0 9 * * 1'         # Monday 9AM UTC

  workflow_call:                 # Reusable (called by another workflow)
    inputs: ...
    secrets: ...

  workflow_run:                  # Triggered AFTER another workflow
    workflows: ['Build']
    types: [completed]
```

---

## 🔄 Job Dependencies & Outputs

```yaml
jobs:
  build:
    outputs:
      version: ${{ steps.ver.outputs.version }}
    steps:
      - id: ver
        run: echo "version=1.0.${{ github.run_number }}" >> $GITHUB_OUTPUT

  deploy:
    needs: [build, test]   # Runs after BOTH complete
    if: github.ref == 'refs/heads/main'
    steps:
      - run: echo "${{ needs.build.outputs.version }}"
```

---

## 🔢 Matrix Strategy

```yaml
strategy:
  fail-fast: false           # Don't cancel others on failure
  matrix:
    node: [16, 18, 20]
    os: [ubuntu-latest, windows-latest]
    include:                  # ADD combinations
      - node: 14
        os: ubuntu-latest
        experimental: true
    exclude:                  # REMOVE combinations
      - node: 16
        os: windows-latest
runs-on: ${{ matrix.os }}
continue-on-error: ${{ matrix.experimental == true }}
```

---

## 📦 Artifacts & Caching

```yaml
# UPLOAD artifact
- uses: actions/upload-artifact@v4
  with:
    name: build-output
    path: dist/
    retention-days: 5

# DOWNLOAD artifact (in different job)
- uses: actions/download-artifact@v4
  with:
    name: build-output

# CACHE dependencies
- uses: actions/cache@v4
  id: cache
  with:
    path: ~/.npm
    key: ${{ runner.os }}-npm-${{ hashFiles('**/package-lock.json') }}
    restore-keys: ${{ runner.os }}-npm-

# Check cache hit
- if: steps.cache.outputs.cache-hit != 'true'
  run: npm ci
```

---

## 🔐 Secrets & Permissions

```yaml
# Minimal permissions (ALWAYS SET THIS!)
permissions:
  contents: read

jobs:
  publish:
    permissions:         # Override per job
      contents: write
      packages: write
      id-token: write    # For OIDC

# Access secrets
- run: echo "${{ secrets.MY_SECRET }}"    # Masked as ***

# Pass secrets to reusable workflow
jobs:
  deploy:
    uses: ./.github/workflows/deploy.yml
    secrets: inherit     # Pass ALL secrets
    # OR explicitly:
    secrets:
      KEY: ${{ secrets.MY_KEY }}
```

---

## 🧩 Action Types Comparison

| | **Composite** | **JavaScript** | **Docker** |
|---|---|---|---|
| **OS Support** | All | All | Linux only |
| **Speed** | Fast | ⚡ Fastest | 🐢 Slowest |
| **Language** | YAML/bash | Node.js | Any language |
| **Use Case** | Reuse YAML steps | Complex logic | Custom runtime |
| **Pre/Post** | ❌ No | ✅ Yes | ✅ Yes |
| **runs: using** | `composite` | `node20` | `docker` |

```yaml
# Composite: runs: using: 'composite'
# JS:        runs: using: 'node20', main: 'dist/index.js'
# Docker:    runs: using: 'docker', image: 'Dockerfile'
```

---

## 🏢 Enterprise Quick Reference

| Topic | Key Point |
|-------|-----------|
| **Self-hosted runners** | `runs-on:` labels must **EXACTLY** match runner labels |
| **Runner groups** | Only repos assigned to the group can use its runners |
| **OIDC** | `id-token: write` + cloud provider action = keyless auth |
| **Dependabot** | `package-ecosystem: 'github-actions'` in `.github/dependabot.yml` |
| **CODEOWNERS** | Require reviews for `.github/workflows/**` changes |
| **Required workflows** | Org-level workflows that run on ALL repos automatically |
| **Fork secrets** | GitHub blocks fork access to secrets by default |
| **GITHUB_TOKEN** | Write by default, but restrict to `contents: read` |

---

## ⚡ Key Differences to Know

| Concept A | vs | Concept B |
|-----------|:---:|-----------|
| `workflow_call` (reusable) | ≠ | `workflow_dispatch` (manual) |
| `workflow_dispatch` (manual) | ≠ | `workflow_run` (after another) |
| `branches:` (include list) | ≠ | `branches-ignore:` (exclude list) |
| `continue-on-error: true` | ≠ | `if: always()` |
| `$GITHUB_OUTPUT` (new) | ≠ | `set-output` (deprecated) |
| Repo secret | ≠ | Environment secret (scoped) |
| `fail-fast: true` (default) | ≠ | `fail-fast: false` (all continue) |

---

**Build real workflows every day. The exam rewards muscle memory, not memorization. You've got this! 🚀**
