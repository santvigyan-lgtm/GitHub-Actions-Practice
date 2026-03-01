# 📅 Day 2 — Jobs, Steps, Conditionals & Context Variables

> **Domain 1: Author & Maintain Workflows | 40% of Exam** ⬆️ HIGHEST WEIGHT

---

## 🎯 Learning Objectives

By the end of Day 2, you will be able to:
- Create multi-job workflows with dependencies using `needs:`
- Use conditional execution with `if:`, `failure()`, `always()`, `cancelled()`
- Pass outputs between jobs using `$GITHUB_OUTPUT`
- Control error handling with `continue-on-error` and `timeout-minutes`
- Understand environment variable precedence (workflow → job → step)

---

## 📝 Problem Statements

### Problem 1: Multi-Job Pipeline
**Build** a 3-job pipeline: `build` → `test` → `deploy`
- `test` depends on `build` using `needs: build`
- `deploy` depends on both: `needs: [build, test]`
- Each job echoes its name and the current time
- **Success Criteria**: Jobs run sequentially in the correct order in the Actions tab

### Problem 2: Conditional Deployment
**Add** an `if:` condition so `deploy` only runs on the `main` branch.
- Condition: `if: github.ref == 'refs/heads/main' && success()`
- Push to a feature branch → deploy is skipped
- Push to main → deploy runs
- **Success Criteria**: Deploy job shows "Skipped" on non-main branches

### Problem 3: Failure Handling
**Create** a workflow that demonstrates all status check functions.
- Add a step that intentionally fails: `run: exit 1`
- Add a notification step with `if: failure()` — runs ONLY on failure
- Add a cleanup step with `if: always()` — runs regardless of status
- Add `continue-on-error: true` to a failing step and observe job still passes
- **Success Criteria**: Understand the difference between `failure()`, `always()`, and `success()`

### Problem 4: Job Outputs
**Pass** data from the `build` job to the `deploy` job.
- In `build`: set output `version=1.0.${{ github.run_number }}` using `$GITHUB_OUTPUT`
- In `deploy`: read it as `${{ needs.build.outputs.version }}`
- **Success Criteria**: Deploy job prints the version string from the build job

### Problem 5: Environment Variable Precedence
**Demonstrate** env var precedence across 3 levels.
- Set `MY_VAR: "workflow-level"` at workflow level
- Override to `MY_VAR: "job-level"` at job level
- Override again to `MY_VAR: "step-level"` at step level
- Print `MY_VAR` in each step to observe which value wins
- **Success Criteria**: Step-level overrides job-level, which overrides workflow-level

---

## 📋 YAML Reference

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    outputs:
      version: ${{ steps.set-version.outputs.version }}
    steps:
      - id: set-version
        run: echo 'version=1.0.${{ github.run_number }}' >> $GITHUB_OUTPUT

  test:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - run: echo 'Version from build: ${{ needs.build.outputs.version }}'

  deploy:
    needs: [build, test]
    if: github.ref == 'refs/heads/main' && success()
    runs-on: ubuntu-latest
    steps:
      - run: echo 'Deploying version ${{ needs.build.outputs.version }}'

  notify-failure:
    needs: [build, test, deploy]
    if: failure()
    runs-on: ubuntu-latest
    steps:
      - run: echo 'Pipeline failed! Sending alert...'
```

---

## 🧪 Practice Scenarios

| # | Scenario | Hint |
|---|----------|------|
| 1 | Deploy must run ONLY if build AND test pass AND branch is main | `if: github.ref == 'refs/heads/main' && success()` |
| 2 | A cleanup step must run even if earlier steps fail | `if: always()` |
| 3 | Pass a Docker image tag from build to deploy using outputs | Use `$GITHUB_OUTPUT` + `needs.<job>.outputs.<name>` |
| 4 | Debug by dumping all github context variables | `echo '${{ toJSON(github) }}'` |

---

## 💡 Exam Tips

> ⚠️ **Key status check functions you MUST memorize:**
> - `success()` — default, true if all previous steps/jobs succeeded
> - `failure()` — true if any previous step/job failed
> - `cancelled()` — true if workflow was cancelled
> - `always()` — runs regardless of status

- `success()` returns `false` when any upstream `need` fails — exam loves trick questions about this!
- `$GITHUB_OUTPUT` replaces the old `set-output` command — this is **heavily tested**
- `continue-on-error: true` makes a failing step not fail the job — know the difference vs `if: always()`

---

## 📂 Solution Workflow Files

| File | What It Demonstrates |
|------|---------------------|
| [multi-job-pipeline.yml](./.github/workflows/multi-job-pipeline.yml) | 3-job pipeline with `needs:` |
| [conditionals.yml](./.github/workflows/conditionals.yml) | `if:`, `failure()`, `always()`, `continue-on-error` |
| [job-outputs.yml](./.github/workflows/job-outputs.yml) | Passing outputs between jobs |
| [env-precedence.yml](./.github/workflows/env-precedence.yml) | Env var precedence demo |

---

[⬅️ Day 1](../day-01/README.md) | [Back to Main](../README.md) | [Day 3 →](../day-03/README.md)
