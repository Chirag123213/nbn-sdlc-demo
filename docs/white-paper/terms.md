# Terms for the white paper

**Owner:** Zac Clarkson
**Status:** Binding for every chapter from 20 Oct 2026. Ben Philip, 19 Oct: "you use three different terminologies in three different places, everything falls apart". This file is the fix. `docs/reports/module-reconciliation.md` section 4 still governs tool and holder vocabulary; this file sits above it and names the thing itself.

## The thing

**The gated lifecycle.** A map and the gates that hold it.

The map is NBN's eight stages opened into tasks (`docs/research/lifecycle-task-map.md`, 44 tasks). Each task carries a colour, a holder and a gate.

- Colour says who decides. Red: a human decides. Amber: AI drafts, a human approves. Green: AI runs, a deterministic check holds.
- A gate is what must be true before the next task starts.
- A holder is what makes the gate hold. There are six, and every task names one: hook (git), hook (agent), CI check (required or advisory), platform rule, human, no gate. An instruction file is no gate.

In `nbn-sdlc-demo` at `6af6a5b` (the trial two base) the holders are: lefthook pre-commit (secret scan, placeholders, prettier, eslint) and commit-msg (Conventional Commits, 100 characters, lower-case scope); the Copilot agent hook (`.github/hooks/copilot-guard.json`), which denies the agent `git push`, `--no-verify` and any change to the hooks; six CI checks (AI Declaration, AI Attribution, Lint & Typecheck, Frontend Tests, Backend Unit Tests, Security Scan) plus an advisory mutation run; the `main` ruleset (two approving reviews, squash only, no force push, no delete, the six checks required); the pull request template's AI declaration; and three human gates, at the plan (6.1), the merge (6.4) and the test judgement (7.4).

Lane C in the trials is the gated lifecycle applied to stages 5 to 8. Lanes A and B are the same feature and the same base without the human gates and without an agent that respects the hooks.

## Monday

A developer with Copilot takes an issue that has acceptance criteria and an out-of-scope list (5.3). They ask the agent for a plan and approve it before any code (6.1). The agent branches, writes tests, writes code and commits through the git hooks (6.2); a commit that fails lint or the message format does not land. The developer pushes, because the agent hook denies the agent (6.3). They open the pull request, tick the AI declaration and the agent's co-author trailer is on at least one commit; CI runs the six checks (7.2, 7.5). Two people who did not write it approve and squash-merge (6.4). The preview deploys on the pull request (8.1). Before approving, a reviewer asks whether the tests would notice a wrong implementation (7.4); mutation output and a seeded fault are the evidence.

## Words

Use: the gated lifecycle; the map; a stage; a task (always with its number, "task 6.3"); a gate; a holder; a colour; a lane (A, B, C); the trial two base; the proof of concept (FR-01); trial one (the showcase build); trial two.

Do not use for the thing: the model, the manual, the cycle, the workflow, the process, the checklist, "our framework". Do not use "the framework" for the client's colour scheme; say the client's colour scheme or the D2 v2 baseline. Do not use control, check or checkpoint for a gate. Do not use "module" for a part of the white paper; the four files in `docs/modules/` keep the word.

Two files on `main` break this and are to be fixed: `CLAUDE.md` calls instruction text "Mandatory AI Development Gates" (it is no gate); `docs/GIT-WORKFLOW.md` lists lint, tests and audit as checks that "must pass before merge" when the `main` ruleset on `Peepachuu/nbn-sdlc-demo` requires AI Declaration only (`docs/research/fault-reporting/evidence/main-ruleset-detail.json.txt`). The trial two base requires all six.
