# 📅 Day 4 — Secrets, Environments & Reusable Workflows

> **Domain 2: Consume Workflows | 20% of Exam**

---

## 🎯 Learning Objectives

By the end of Day 4, you will be able to:
- Add and use repository-level and environment-level secrets
- Create GitHub Environments with protection rules (required reviewers)
- Build reusable workflows with `on: workflow_call`
- Call reusable workflows with inputs, secrets, and outputs
- Understand `GITHUB_TOKEN` default permissions and how to restrict them

---

## 📝 Problem Statements

### Problem 1: Secrets Management
**Configure** and use secrets in a workflow.
- Add a repo-level secret `DB_PASSWORD` via GitHub UI (Settings → Secrets)
- Access it in a workflow step using `${{ secrets.DB_PASSWORD }}`
- Remember: secrets are **masked** in logs — verify it shows `***`
- **Success Criteria**: Workflow runs and secret is masked in output

### Problem 2: Environment Protection
**Create** a protected production environment.
- Create Environment `production` via GitHub UI (Settings → Environments)
- Add a required reviewer protection rule
- Add an environment-level secret `PROD_API_KEY`
- Use `environment: production` in a deploy job
- **Success Criteria**: Deploy job pauses waiting for reviewer approval

### Problem 3: Reusable Workflow
**Build** a reusable deploy workflow with `workflow_call`.
- Define `inputs:` (environment, image-tag) and `secrets:` (DEPLOY_KEY)
- Define `outputs:` that return the deploy URL
- Call it from a second workflow using `uses: ./.github/workflows/deploy-reusable.yml`
- **Success Criteria**: Caller workflow passes inputs and receives outputs

### Problem 4: Secrets Inherit
**Simplify** secret passing using `secrets: inherit`.
- Caller passes ALL secrets automatically instead of listing each one
- Know when to use `inherit` vs explicit passing
- **Success Criteria**: Reusable workflow receives secrets without explicit listing

### Problem 5: GITHUB_TOKEN Permissions
**Use** `${{ secrets.GITHUB_TOKEN }}` for repository operations.
- Push a Git tag using the token
- Set `permissions:` to restrict token scope
- Understand default vs restricted permissions
- **Success Criteria**: Tag created successfully with minimal required permissions

---

## 📋 YAML Reference

```yaml
# === REUSABLE WORKFLOW (deploy-reusable.yml) ===
on:
  workflow_call:
    inputs:
      environment:
        required: true
        type: string
      image-tag:
        required: true
        type: string
    secrets:
      DEPLOY_KEY:
        required: true
    outputs:
      deploy-url:
        value: ${{ jobs.deploy.outputs.url }}

jobs:
  deploy:
    environment: ${{ inputs.environment }}
    runs-on: ubuntu-latest
    outputs:
      url: ${{ steps.deploy.outputs.url }}
    steps:
      - name: Deploy
        id: deploy
        run: |
          echo "Deploying ${{ inputs.image-tag }} to ${{ inputs.environment }}"
          echo "url=https://app-${{ inputs.environment }}.example.com" >> $GITHUB_OUTPUT

# === CALLER WORKFLOW (caller.yml) ===
jobs:
  call-deploy:
    uses: ./.github/workflows/deploy-reusable.yml
    with:
      environment: production
      image-tag: v1.2.${{ github.run_number }}
    secrets:
      DEPLOY_KEY: ${{ secrets.PROD_DEPLOY_KEY }}
    # OR use: secrets: inherit
```

---

## 🧪 Practice Scenarios

| # | Scenario | Answer |
|---|----------|--------|
| 1 | Org-level vs repo-level secret — what's the difference? | Org secrets shared across repos; repo secrets are repo-scoped |
| 2 | Reusable workflow needs calling workflow's secrets without listing each | Use `secrets: inherit` |
| 3 | 30-min timeout on production deployment | Configure environment wait-timer in GitHub UI |
| 4 | GITHUB_TOKEN denied permission to write packages | Set `permissions: packages: write` in workflow |

---

## 💡 Exam Tips

> ⚠️ **Reusable workflows are tested very heavily!**

- **Know the difference:**
  - `workflow_call` → reusable (called by another workflow)
  - `workflow_dispatch` → manual (triggered by human)
  - `workflow_run` → triggered after another workflow completes
- Secrets are **NOT** automatically passed to reusable workflows — use `secrets: inherit` or pass explicitly
- Environment protection rules **BLOCK** the job until a human approves
- `GITHUB_TOKEN` has **write** by default but you should restrict to `contents: read`

---

## 📂 Solution Workflow Files

| File | What It Demonstrates |
|------|---------------------|
| [secrets-demo.yml](./.github/workflows/secrets-demo.yml) | Accessing repo/env secrets |
| [deploy-reusable.yml](./.github/workflows/deploy-reusable.yml) | Reusable workflow with `workflow_call` |
| [caller.yml](./.github/workflows/caller.yml) | Calling a reusable workflow |
| [github-token.yml](./.github/workflows/github-token.yml) | GITHUB_TOKEN permissions |

---

[⬅️ Day 3](../day-03/README.md) | [Back to Main](../README.md) | [Day 5 →](../day-05/README.md)
