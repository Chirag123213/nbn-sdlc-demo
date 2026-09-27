# FR-01 pre-feature baseline

Captured 22 September 2026, before fault-report implementation. Source commit: `c2461d276426f2372ae09a65aae59a8fbd5e955b`. Setup and instrumentation changes are in this branch; application source was not intentionally changed. Evidence capture is complete for the observations below, with readiness gaps explicitly open. This is not a claim that every gate passed.

## Environment and checks

| Check                                     | Observation                                                                                                                                                                                                            |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Runtime                                   | Node 24.19.0, pnpm 11.20.0 on macOS; CI uses Node 22 / pnpm 10.                                                                                                                                                        |
| Installation                              | Frozen source lockfile installed successfully before checks. Stryker 9.6.1 added afterwards as measurement instrumentation.                                                                                            |
| Lint / typecheck / placeholder validation | Passed.                                                                                                                                                                                                                |
| Existing unit tests                       | 5 backend + 6 frontend = 11 passing. Initial sandbox attempt could not bind test sockets; unrestricted rerun passed.                                                                                                   |
| Default production build                  | Blocked on this machine by Turbopack port-binding EPERM, including the approved direct retry. First restricted attempt also failed Google Fonts fetch. See build evidence; do not classify this as a successful build. |
| Dependency audit before instrumentation   | 0 high, 0 critical, 4 moderate.                                                                                                                                                                                        |
| Current main CI                           | Success for source SHA, run 35588985543. This is not evidence for unpushed setup changes or first-pass feature CI.                                                                                                     |
| Local environment                         | Sign-in route HTTP 200 and rendered Email/Password/Google sign-in controls in browser. No user login performed.                                                                                                        |
| Firebase                                  | Read-only Admin Auth and Firestore calls succeeded; credential project matches web project. No user/database records created.                                                                                          |
| Shared preview                            | Latest returned preview redirects to Vercel login; independent teammate reachability unverified. No deployment returned for source SHA.                                                                                |
| Branch protection                         | Active default-branch ruleset; two approvals; only AI Declaration required. Lint, tests and security are not required status checks by this ruleset.                                                                   |
| Release environment                       | Preview and production exist; both have empty protection_rules and no deployment branch policy. No enforced release approval evidenced.                                                                                |
| Dependabot alerts                         | API returned 403 stating alerts disabled and additional scope needed. Findings unavailable, not zero.                                                                                                                  |

An initial diagnostic mistakenly excluded digits in environment-variable names and reported the service-account key missing. The corrected check and live connectivity results supersede that diagnostic. No credential values were saved.

## Mutation evidence

Stryker 9.6.1 / Vitest runner on existing backend source, excluding the entrypoint and Firebase initialization module: **12.37%**. 97 mutants: 11 killed, 1 timeout, 39 survived, 46 uncovered, 0 errors. Detected = killed + timeout = 12; score = 12 / 97. CLI run took about 13 seconds. Keep the timeout visible; it is not proof of an assertion catching the fault.

This existing suite has unverified/mixed authorship and is not a verified human-only suite. This score is not a frontend mutation baseline or a project-wide measure. `break: 0` makes the new workflow an evidence collector, not an accepted minimum quality gate. A named human must approve the threshold and comparison scope before the feature run. The first instrumentation attempt could not discover the Vitest plugin; explicit plugin configuration fixed it before the recorded successful run.

## Historical examples

| PR                              | Provenance / comparability                                             | Files | Added + deleted lines | Time to first submitted review | Reviews | Active human review minutes |
| ------------------------------- | ---------------------------------------------------------------------- | ----- | --------------------- | ------------------------------ | ------- | --------------------------- |
| #31 Secret scanning             | Claude attribution present; extent unknown. Infrastructure example.    | 6     | 449                   | 3078.03 minutes                | 1       | Not recorded                |
| #52 Docs/prompt practice module | Human-only self-declaration; docs-only, not a matched feature control. | 4     | 166                   | 30.23 minutes                  | 2       | Not recorded                |

No productivity improvement or causal comparison can be inferred from these two unlike PRs. No comparable human-only fault-report implementation was found or manufactured. Review waiting time is not active review cost.

## Zac's criterion register

| Criterion                           | Baseline / status before feature implementation                                                                                                                                           |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 5.1 Single-purpose issues and scope | One proposed vertical feature brief; exact file plan and human acceptance pending. Historical scope compliance not reconstructed.                                                         |
| 5.2 Priority, owner, dependencies   | P1, Zafir/run operator, dependency list recorded; independent reviewer not yet named.                                                                                                     |
| 5.3 Human criteria and exclusions   | Six draft criteria plus exclusions prepared with AI assistance. Human adoption/revision and active instruction minutes pending; cannot claim human-only authorship.                       |
| 5.4 Committed plan and rescope      | Setup decision log exists; sprint capacity and implementation-plan approval pending. No implementation started.                                                                           |
| 5.5 Hosted issue / template         | Feature issue not yet published; not passed. Existing issue snapshot saved.                                                                                                               |
| 6.1 Approved implementation plan    | Not yet run. Six criteria provide the denominator for future plan coverage.                                                                                                               |
| 6.2 Commit hooks / rework           | Existing Lefthook configured; new Copilot push-guard contract has 11 local test cases. Full lint/format/message/secret seeded-case experiment not performed; no 100% claim for all hooks. |
| 6.3 Attribution                     | Existing AI declaration CI plus expanded instructions; model/session completeness not enforced by that CI. No feature PR exists.                                                          |
| 6.4 Human review / CI / protection  | Historical values above; two approvals required currently but only AI Declaration is required CI. Active review cost unavailable.                                                         |
| 6.5 Revision rounds                 | Feature not started; historical thread-resolution/agent-only revision share not measured.                                                                                                 |
| 7.1 Tests per acceptance criterion  | 0 of 6 feature criteria currently implemented/tested (feature absent), not a failed feature submission. Existing suite: 11 tests.                                                         |
| 7.2 CI and first-pass success       | Latest source main CI passed. Feature first-pass rate not applicable until first feature PR workflow run.                                                                                 |
| 7.3 Separate adversarial review     | Not performed. Reserve two isolated seeded defects: omitted owner check and acceptance of blank description; remove them before any merge/deploy.                                         |
| 7.4 Correct tests / mutation        | Backend 12.37%; human before/after accept decisions and agreed floor pending.                                                                                                             |
| 7.5 Security                        | Audit 0 high/critical, 4 moderate before instrumentation; Gitleaks configured in source CI. Dependabot alert data unavailable.                                                            |
| 8.1 Preview before review           | Historical preview exists, access-protected; source-SHA deployment not found. Feature preview not created.                                                                                |
| 8.2 Progressive rollout             | Benchmark-only; no rollout rings measured.                                                                                                                                                |
| 8.3 Release approval                | No environment protection rules present. No new production promotion performed; named approval record pending.                                                                            |
| 8.4 Monitoring / triage             | Benchmark-only; no production alert/disposition timing measured.                                                                                                                          |
| 8.5 Incident review                 | Benchmark-only; no production incidents or repeat-incident rate measured.                                                                                                                 |
| 8.6 Learning into repository        | Instructions and hook proposed in setup branch; no feature review finding yet. No claim of a merged feedback fix.                                                                         |

## Evidence and reproducibility

Raw JSON is stored with `.json.txt` suffix so the repository's placeholder checker does not mistake historical PR-template text for an unreplaced project variable. Contents remain valid JSON. `local-checks` and `unrestricted-checks` record command timing/exit status; `.txt` command outputs retain diagnostic failures as well as successful retries. `mutation-summary` and `historical-summary` contain derived values; raw reports/PR records are retained beside them. See `runbook.md` for the freeze commit and remaining gates, and `credit-log.md` for future per-stage readings.

All preparation here is AI-assisted Codex work. Copilot access is pending; no Copilot credits or model observations have been fabricated. Human acceptance, human-only provenance and runtime hook loading remain separate evidence requirements.

Instrumentation note: an initial Stryker 10 installation introduced shared Babel/Zod resolution changes and a temporary frontend type conflict. The final lockfile was regenerated from the source lockfile with Stryker 9.6.1. The preliminary 11.88% Stryker 10 score is superseded by the final 12.37% Stryker 9.6.1 score; different mutant sets must not be compared as a test-quality improvement. Final dependency audit: 0 high/critical and 5 moderate findings, one more moderate than before instrumentation.

Final verification: lint and typecheck pass; a clean non-incremental frontend typecheck also passes. All 11 normal unit tests pass after narrowing backend Vitest discovery to `tests/unit/**/*.test.ts`, preventing accidental execution of Stryker sandbox copies during concurrent runs. The diagnostic command `node frontend/scripts/run-next.cjs build --webpack` passes after clearing stale caches; the default Turbopack command remains blocked by the local port-binding restriction. No application code was changed to obtain the fallback result. Hook contract tests: 11 passed. New CI workflow has not run remotely.

Commit-hook observation: placeholder and Conventional Commit checks passed. The existing format hook reported `prettier: command not found` but returned success because its command ends in `|| true`; formatting enforcement is therefore not demonstrated. New setup files were formatted directly using the installed backend Prettier before commit. Backend compilation also passes (`evidence/backend-build.txt`).
