# 📅 Day 6 — Enterprise: Self-Hosted Runners, Security & Policies

> **Domain 4: Manage GitHub Actions for Enterprise | 15% of Exam**

---

## 🎯 Learning Objectives

By the end of Day 6, you will be able to:
- Register and configure self-hosted runners with custom labels
- Set up runner groups at the organization level
- Configure minimal `permissions:` for GITHUB_TOKEN (principle of least privilege)
- Set up CODEOWNERS for workflow file protection
- Configure Dependabot for GitHub Actions version updates
- Understand OIDC-based cloud authentication (no long-lived secrets)
- Set up required status checks and org-level required workflows

---

## 📝 Problem Statements

### Problem 1: Self-Hosted Runner
**Register** a self-hosted runner on your machine.
- Download the runner app from GitHub Settings → Actions → Runners
- Run `config.sh` with `--url` and `--token` flags
- Add custom labels: `linux`, `x64`, `gpu`
- Target it with `runs-on: [self-hosted, gpu]`
- **Success Criteria**: Runner appears in Settings → Actions → Runners as "Online"

### Problem 2: Runner Groups (Org Level)
**Understand** how runner groups work at the organization level.
- Create a runner group, assign specific repos to it
- Only those repos can use runners in the group
- **Question**: If a runner is in a group, which repos can use it?
  - **Answer**: Only repos explicitly assigned to that runner group

### Problem 3: Minimal Permissions
**Configure** a workflow with the principle of least privilege.
- Set `permissions: contents: read` at workflow level
- Override at job level where write access is needed
- Set `permissions: packages: write` for Docker image push jobs
- Add `id-token: write` for OIDC cloud authentication
- **Success Criteria**: Workflow runs with minimal required permissions

### Problem 4: CODEOWNERS
**Set up** CODEOWNERS to protect workflow files.
- Create `.github/CODEOWNERS` file
- Require reviews for changes to `.github/workflows/**`
- **Success Criteria**: PR changing a workflow file requires CODEOWNER review

### Problem 5: Dependabot for Actions
**Configure** automatic version updates for GitHub Actions.
- Create `.github/dependabot.yml`
- Set `package-ecosystem: 'github-actions'` and `interval: 'weekly'`
- **Success Criteria**: Dependabot creates PRs when new action versions are released

### Problem 6: OIDC Cloud Authentication
**Understand** OpenID Connect (OIDC) for keyless cloud access.
- Set `permissions: id-token: write` to enable OIDC
- Use `aws-actions/configure-aws-credentials@v4` with `role-to-assume`
- No long-lived access keys needed!
- **Question**: Why is OIDC better than storing cloud credentials as secrets?
  - **Answer**: Short-lived tokens, no secret rotation needed, more secure

### Problem 7: Required Workflows (Enterprise)
**Understand** org-level required workflows.
- An admin creates a required workflow that runs on ALL repos in the org
- Example: security scanning, compliance checks
- **Question**: How do you enforce a security scan on every repo?
  - **Answer**: Create an org-level required workflow

---

## 📋 YAML Reference

```yaml
# Minimal permissions (principle of least privilege)
permissions:
  contents: read

jobs:
  publish:
    permissions:
      contents: write    # Override at job level
      packages: write
      id-token: write    # For OIDC token
    runs-on: [self-hosted, linux, x64, gpu]
    steps:
      - uses: actions/checkout@v4
```

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: 'github-actions'
    directory: '/'
    schedule:
      interval: 'weekly'
    groups:
      actions:
        patterns: ['actions/*']
```

---

## 🧪 Practice Scenarios

| # | Scenario | Answer |
|---|----------|--------|
| 1 | Self-hosted runner in a runner group — which repos can use it? | Only repos assigned to that group |
| 2 | Fork workflow wants to access secrets | GitHub blocks by default; approve in PR settings |
| 3 | Prevent workflow from having default write access | Set `permissions: read-all` or `contents: read` |
| 4 | OIDC for AWS — short-lived token instead of access keys | `id-token: write` + `aws-actions/configure-aws-credentials` |
| 5 | Enforce security scan on ALL repos in enterprise | Create org-level required workflow |

---

## 💡 Exam Tips

> ⚠️ **Domain 4 is 15% but easy marks if you know the concepts!**

- `GITHUB_TOKEN` has write by default — you **should** set `contents: read`
- `id-token: write` enables getting short-lived cloud credentials (OIDC)
- Self-hosted runner labels in `runs-on:` must **EXACTLY match** all labels on the runner
- Dependabot can auto-update GitHub Actions versions — know the YAML config
- CODEOWNERS + branch protection = defense in depth for workflow changes

---

## 📂 Solution Files

| File | What It Demonstrates |
|------|---------------------|
| [secure-workflow.yml](./.github/workflows/secure-workflow.yml) | Minimal permissions + self-hosted runner |
| [oidc-auth.yml](./.github/workflows/oidc-auth.yml) | OIDC-based cloud authentication |
| [dependabot.yml](./.github/dependabot.yml) | Dependabot for Actions updates |
| [CODEOWNERS](./.github/CODEOWNERS) | Workflow file protection |

---

[⬅️ Day 5](../day-05/README.md) | [Back to Main](../README.md) | [Day 7 →](../day-07/README.md)
