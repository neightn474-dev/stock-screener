# Fresh PR From Latest Main

Use this checklist when an older AdvisorIQ pull request shows GitHub merge conflicts.

## Why this file exists

GitHub can show conflicts even when the local files do not contain conflict markers. That happens when the pull request branch and the latest `main` branch both changed or added the same paths differently.

The safest fix is to open a fresh pull request from a branch created from the latest `main` instead of repeatedly resolving conflicts in GitHub's browser editor.

## Clean branch flow

```bash
git fetch origin
git checkout main
git pull origin main
git checkout -b advisoriq-clean-mvp
```

Apply or cherry-pick the clean AdvisorIQ work, then validate:

```bash
node advisoriq/tools/validate.mjs
```

Push the fresh branch:

```bash
git push origin advisoriq-clean-mvp
```

Open a new pull request from `advisoriq-clean-mvp` into `main`.

## What to verify before opening the PR

- `node advisoriq/tools/validate.mjs` passes.
- No files contain Git conflict-marker text from an unfinished merge or rebase.
- The PR is opened from a branch based on the latest `main`.
- The old conflicted PR is closed so reviewers do not keep seeing stale conflict state.
