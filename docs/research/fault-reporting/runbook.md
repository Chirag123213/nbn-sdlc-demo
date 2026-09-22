# FR-01: setup and measured-run handoff

This checklist prepares the experiment. The deliverable to build later is the fault-reporting feature in `feature-brief.md`. Do not implement it during setup. Preparation was performed with Codex; it is not a Copilot result or a human-only control.

## What is ready

- Source baseline: current main `c2461d276426f2372ae09a65aae59a8fbd5e955b` (PR #52), captured on 22 September 2026.
- Setup branch: `codex/fault-reporting-setup`. Original `docs/success-metrics` branch preserved. Zac's source document copied from commit `72e54f6` for traceability.
- Feature rationale, six acceptance criteria, exclusions and proposed file scope: `feature-brief.md`.
- Repository instructions and `.github/hooks/fault-reporting.json` committed with this setup. Local hook contract: `node --test scripts/copilot/pre-tool-use.test.cjs`.
- Baseline register and raw evidence: `baseline.md` and `evidence/`.
- Stryker configuration and CI artifact upload: `backend/stryker.config.json` and `.github/workflows/mutation.yml`.

## Environment

From the repository root run `pnpm run env:sync`, then `pnpm run dev`, then open http://localhost:3000/auth/signin. Keep credentials only in root `.env`; derived package env files are generated. This machine uses Node 24.19.0 and pnpm 11.20.0; CI uses Node 22 and pnpm 10. For pnpm 11's dependency-check incompatibility on this machine, the recorded runs set `PNPM_CONFIG_VERIFY_DEPS_BEFORE_RUN=false` after a successful frozen-lockfile install. This is an execution workaround, not a repository setting or skipped quality test.

The sign-in UI renders and read-only Firebase Auth/Firestore probes succeed. A full sign-in, authenticated application operation and independent teammate access still need a human smoke test. The latest existing preview redirects to Vercel login; do not mark it publicly reachable or as this baseline's deployment. No deployment matching the source SHA was returned by the GitHub deployments query.

## Baseline freeze

The commit that adds this runbook and baseline is the setup freeze. Resolve it with `git log -1 --format=%H -- docs/research/fault-reporting/baseline.md` and record it at the beginning of FR-01. Keep the original evidence immutable; append subsequent observations in a new run folder. Recheck credentials/connectivity and branch controls if setup changes before FR-01. Use the same mutation scope for comparisons; if implementation is in the frontend, add frontend mutation configuration and measure that existing suite before implementation rather than comparing a frontend result with this backend baseline.

## Remaining human and Copilot gates

1. Zafir approves or edits the detailed feature criteria, names an independent reviewer and records capacity in `decisions.md`. The proposed brief is AI-assisted; the human must take ownership of the final criteria. Never claim Stage 5.3 was human-only drafting.
2. Complete the application sign-in smoke test and have a teammate verify access to the chosen shared environment. Resolve or record the default build's environment restriction.
3. Review the baseline gaps with Zac, especially mutation scope, missing historical human times, and lack of a comparable human-only feature PR. Agree a mutation floor explicitly; `break: 0` currently collects evidence and imposes no quality floor.
4. Once Student access is approved, authenticate Copilot CLI, record its version/plan, and verify that the instructions and hook load in an actual session. The hook's synthetic local tests do not establish runtime integration. For cloud agent, merge hook configuration to the default branch before using it.
5. Open the feature issue using the human-approved brief and record its URL. No GitHub issue or public PR was posted during this setup.
6. Start `credit-log.md` with actual usage readings. Save a timestamped screenshot/export before and after each stage. Record the displayed model or `Auto; underlying model not shown`. Setup usage is separate. Do not infer credit use from request counts or mark an unobserved counter as zero.
7. Give Copilot the prompt below; approve the resulting plan before implementation. Record revision count, criterion coverage and human instruction minutes.
8. During development record commits, scope changes, hook blocks, PR size and attribution. During testing map AC1–AC6 to actual tests, retain CI/mutation reports, record human judgement before/after seeing mutation results, and disposition separate-review findings. Use isolated disposable patches for seeded defects; never deploy them.
9. Before merge require independent approval and actual green quality checks; current rules only require AI Declaration. Record the named release owner and approval before promotion. Record deployment URL/SHA and feed lessons into a reviewed repo change.

## First measured prompt

> Read the approved fault-reporting issue, `.github/copilot-instructions.md`, and the frozen baseline. Map AC1–AC6 to implementation steps and tests. List exact files, dependencies and unresolved choices. Produce a plan only and wait for human approval before editing feature code. Report the model if the interface exposes it; do not guess.

## Hook limits and evidence

The preToolUse script returns a denial for recognised `git ... push` shell commands, including implicit destinations, and preserves normal permissions for other calls. It handles object/string tool arguments and Bash/PowerShell. It does not parse all shell syntax, block aliases/scripts/API writes, enforce branch protection or prevent its own modification. Tests demonstrate only the enumerated cases. Keep human review and GitHub branch rules independent of this teaching example.

Sources checked 22 September 2026: [hook contract](https://docs.github.com/en/copilot/reference/hooks-reference), [custom instructions](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions), [AI Credit billing](https://docs.github.com/en/copilot/concepts/billing-and-usage/individuals/billing), [usage readings](https://docs.github.com/en/copilot/how-tos/manage-and-track-spending/monitor-ai-usage).

## Corrections when applying Zac's source recipe

- Student billing uses AI Credits, not the source document's legacy premium-request estimates. Use observed usage and keep units explicit.
- `gh issue view --json timelineItems` and `gh pr view --json reviewThreads` are unsupported CLI fields; use API queries if those objects are needed.
- First-pass CI means the first eligible PR workflow run at the first PR head, not necessarily the branch's earliest commit. This repository runs on pull requests and pushes to main, not every feature-branch push.
- Do not assume a root `mutationScore` JSON field: retain raw Stryker statuses and the CLI summary. This report computes detected mutants / valid mutants; errors must be excluded from the denominator if present.
- Check ruleset conditions and required-check names, not just whether a ruleset exists.
- Production-scale rates remain benchmark-only. An unavailable metric is not zero.
