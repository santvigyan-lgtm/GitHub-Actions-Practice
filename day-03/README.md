# 📅 Day 3 — Matrix Strategy, Artifacts & Caching

> **Domain 1 + Domain 2: Author & Maintain + Consume Workflows | 60% of Exam**

---

## 🎯 Learning Objectives

By the end of Day 3, you will be able to:
- Create matrix builds across Node versions and operating systems
- Use `include:` and `exclude:` to customize matrix combinations
- Control failure behavior with `fail-fast: false`
- Upload/download artifacts between jobs
- Cache dependencies to speed up workflows

---

## 📝 Problem Statements

### Problem 1: Matrix Build
**Create** a matrix job that tests across multiple configurations.
- Matrix: `node-version: [16, 18, 20]` × `os: [ubuntu-latest, windows-latest]`
- Add `include:` to add node 14 on ubuntu only (with `experimental: true`)
- Add `exclude:` to remove windows + node 16 combination
- Set `fail-fast: false` so all jobs complete even if one fails
- **Success Criteria**: 6 matrix jobs appear in Actions tab (3×2 - 1 excluded + 1 included)

### Problem 2: Artifact Upload & Download
**Create** a 2-job workflow where job 1 uploads an artifact and job 2 downloads it.
- Job 1: Generate a `build-output.txt` file and upload it with `actions/upload-artifact@v4`
- Set `retention-days: 5` on the artifact
- Job 2: Download the artifact using `actions/download-artifact@v4` and read its contents
- **Success Criteria**: Job 2 successfully reads the file created by Job 1

### Problem 3: Dependency Caching
**Add** npm dependency caching to speed up builds.
- Use `actions/cache@v4` to cache `~/.npm`
- Cache key: `${{ runner.os }}-node${{ matrix.node }}-${{ hashFiles('**/package-lock.json') }}`
- Set `restore-keys:` for partial cache matches
- Check for cache hit using `steps.<id>.outputs.cache-hit == 'true'`
- **Success Criteria**: Second run shows "Cache restored" and runs faster

### Problem 4: Matrix with Conditional Deploy
**Build** on ubuntu AND windows, but deploy only on ubuntu.
- Use `if: matrix.os == 'ubuntu-latest'` to conditionally run deploy step
- Use `continue-on-error: ${{ matrix.experimental == true }}` for experimental builds
- **Success Criteria**: Deploy step is skipped on windows matrix jobs

---

## 📋 YAML Reference

```yaml
jobs:
  test:
    strategy:
      fail-fast: false
      matrix:
        node: [16, 18, 20]
        os: [ubuntu-latest, windows-latest]
        include:
          - node: 14
            os: ubuntu-latest
            experimental: true
        exclude:
          - node: 16
            os: windows-latest
    runs-on: ${{ matrix.os }}
    continue-on-error: ${{ matrix.experimental == true }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/cache@v4
        id: npm-cache
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node${{ matrix.node }}-${{ hashFiles('**/package-lock.json') }}
          restore-keys: ${{ runner.os }}-node${{ matrix.node }}-
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node }}
      - run: npm ci && npm test
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: test-results-${{ matrix.os }}-${{ matrix.node }}
          path: coverage/
          retention-days: 7
```

---

## 🧪 Practice Scenarios

| # | Scenario | Hint |
|---|----------|------|
| 1 | Build on ubuntu AND macos, deploy only on ubuntu | `if: matrix.os == 'ubuntu-latest'` |
| 2 | Cache pip packages for Python — find correct cache path | Linux: `~/.cache/pip`, Windows: `~\AppData\Local\pip\Cache` |
| 3 | Artifact from job 1 needed in job 3 | Add `needs:` and `download-artifact` in job 3 |
| 4 | One matrix combination keeps failing flakily | `continue-on-error: ${{ matrix.experimental == true }}` |

---

## 💡 Exam Tips

> ⚠️ **Matrix and artifacts are heavily tested in Domain 1 + Domain 2**

- `hashFiles()` takes a glob pattern **in quotes**: `hashFiles('**/package-lock.json')`
- Artifacts uploaded by one job are **NOT** available automatically — must use `download-artifact`
- `fail-fast: false` means all matrix jobs continue even if one fails (default is `true`)
- `include:` ADDS combinations; `exclude:` REMOVES combinations — know the difference
- Each artifact must have a **unique name** — use matrix variables in the name

---

## 📂 Solution Workflow Files

| File | What It Demonstrates |
|------|---------------------|
| [matrix-test.yml](./.github/workflows/matrix-test.yml) | Matrix with include/exclude + fail-fast |
| [artifacts.yml](./.github/workflows/artifacts.yml) | Upload/Download artifacts between jobs |
| [caching.yml](./.github/workflows/caching.yml) | npm caching with hashFiles key |

---

[⬅️ Day 2](../day-02/README.md) | [Back to Main](../README.md) | [Day 4 →](../day-04/README.md)
