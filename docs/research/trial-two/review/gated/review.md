# Trial two review: lane C, gated framework

**Owner:** Zac Clarkson
**Planner card:** [UX] - Independent review: criteria, attacks and mutation : 240
**Status:** Draft. Offline checks run 18 Oct 2026; preview checks, attacks and mutation not yet run.
**Checked against:** `Peepachuu/nbn-run2-gated` at `40c65f5` (pull request #2, frozen by Sidney Zeng on 18 Oct 2026 at 22:27). Base `6af6a5b` (tag `trial2-base`). Protocol `docs/research/trial-two/attacks-and-test-jobs.md` on `docs/trial-two-attacks` at `0b349ca`.
**Feeds from:** `docs/research/trial-two/attacks-and-test-jobs.md` (sections 4 to 8), `docs/research/trial-two/acceptance-criteria.md`, the pull request and the builder's record under `docs/research/technician-dispatch/` in the build repository.
**AI involvement:** Claude (Claude Code, Fable 5.1), given the frozen clone, the pull request and the protocol, ran the offline checks and drafted this file. Checked by Zac Clarkson on 18 Oct 2026.

---

## 1. In one paragraph

This is the independent review record for the lane C (gated framework) build by Zafir Hasan, reviewed against the frozen commit `40c65f5` and never against anything pushed later. On 18 Oct 2026 the reviewer ran the checks that need only the repository, AT15 to AT18 and TJ15 to TJ17, and read how the build stores a request. The test jobs on the preview (TJ01 to TJ14), the attacks on the running build (AT01 to AT14) and a valid mutation score are still to run. Until they are, nothing here is a criterion result.

## 2. What this chapter covers

| Covered                                                                                        | Not covered, and where it is instead                                                                                                                                |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AT15 to AT18, TJ15 to TJ17, test counts, a first mutation attempt, how the build persists data | TJ01 to TJ14 and AT01 to AT14 (section 5, open), the seeded faults S1 and S2 (section 5), the comparison across builds (`README.md` in this folder, then chapter 6) |

## 3. The chapter

### Pattern B: what we ran and what it showed

#### 3.1 The question

Does the lane C (gated framework) build meet T2-AC01 to T2-AC17, do its rules and Server Actions hold under the eighteen attacks, and would its tests notice if the code were wrong, measured as protocol section 6 sets out and compared under the prediction registered in `docs/research/trial-two/attacks-and-test-jobs.md` section 9.

#### 3.2 What was done

| Item                            | Value                                                                                                                                                              |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Who                             | Zac Clarkson, reviewer. Built none of the three.                                                                                                                   |
| When                            | 18 Oct 2026, 22:58 to 23:35, offline checks only                                                                                                                   |
| Repository and start commit     | `Peepachuu/nbn-run2-gated` at `40c65f5`, branch `feature/technician-dispatch`, 7 commits on top of `6af6a5b`, which is an ancestor (checked with `git merge-base`) |
| Tool, lane and model            | Codex desktop app, GPT-5.6 Sol at high effort, approval setting "Ask for approval" (run log and `model_setting.png`)                                               |
| Time limit                      | Four hours estimate, six hours cap (the brief)                                                                                                                     |
| What counted as done            | `docs/research/trial-two/acceptance-criteria.md`, T2-AC01 to T2-AC17                                                                                               |
| Builder's setup before prompt 1 | `c96e3b2` added `fixtures/technicians.json` and a root `AGENTS.md` (178 lines) and set `.firebaserc`. Before prompt 1, covered by amendments 3 and 6               |
| Builder's recorded start commit | Blank in the run log. The branch starts at `6af6a5b` and the first commit `c96e3b2` adds the setup files                                                           |

#### 3.3 What happened

| Measure                                                                       | Result                                                                                                                                                                                                                                                                                                                                                                     | Evidence                                                        | Status                        |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ----------------------------- |
| TJ01 to TJ14, criteria on the preview                                         | Not yet run                                                                                                                                                                                                                                                                                                                                                                |                                                                 | Not yet                       |
| TJ15, preview URL in the pull request loads the final commit                  | A preview URL is in the description and the Vercel check on `40c65f5` passed. Loading it against the final commit is not yet confirmed by the reviewer                                                                                                                                                                                                                     | `evidence/AC15-pr.txt`                                          | Run once, in part             |
| TJ16, builder's record has pass or fail and an evidence path for AC01 to AC14 | Pass, with a note. Distinct screenshots: 5 of 14. AC01, AC02, AC03 are one file; AC04, AC05, AC06, AC07, AC12 are one file; AC08 and AC09 are one file; AC10, AC11, AC14 are one file                                                                                                                                                                                      | `evidence/AC16-record-check.md`                                 | Run once                      |
| TJ17, run details                                                             | Builder, lane, branch, tool and surface, model and effort, approval setting, first-prompt and PR-open times, elapsed and setup minutes are present. Start commit is blank. Repository is recorded as `zacclarkson/nbn-run2-gated` (the name before the move). Token before and after cells are blank; the figures are in the two screenshots                               | `evidence/AC17-run-details.md`                                  | Run once                      |
| Builder's clock                                                               | First prompt 13:49, PR open with green preview 14:44 on 18 Oct 2026; elapsed 57 min (active 13, reviewing 23, waiting 21); setup 32 min logged separately (run log totals, measured as logged)                                                                                                                                                                             | builder's record                                                | Estimate (builder's log)      |
| AT01 to AT14                                                                  | Not yet run                                                                                                                                                                                                                                                                                                                                                                |                                                                 | Not yet                       |
| AT15, secrets in history                                                      | No `.env` file in any commit, no key-like string in the branch diff. gitleaks was not installed on the reviewer's machine; the Security Scan CI check passed on the pull request                                                                                                                                                                                           | `evidence/AT15-secrets.txt`                                     | Run once, in part             |
| AT16, new dependencies                                                        | Pass, version bumps noted. Version bumps, no new package: `next` 16.3.6 to 16.3.8, `eslint-config-next` 16.3.6 to 16.3.8, `sharp` 0.35.4 to 0.35.5, and lockfile overrides for `proxy-addr`, `source-map-js` and `nanoid`, all in `89eb71e fix(deps): remediate audit findings`                                                                                            | `evidence/AT16-dependencies.txt`                                | Run once                      |
| AT17, green on the final commit                                               | `pnpm install --frozen-lockfile`, `typecheck`, `lint` and `test:all` all exit 0 on a fresh clone, 18 Oct 2026 23:12. Backend 5 tests, frontend 42 tests. Matches the pull request's CI checks                                                                                                                                                                              | `evidence/AT17-typecheck.txt`, `AT17-lint.txt`, `AT17-test.txt` | Run once                      |
| AT18, declaration and trailer                                                 | AI-assisted box ticked. Co-authored-by trailers: 1 (`0d162bd` OpenAI Codex GPT-5). AI Declaration and AI Attribution checks passed                                                                                                                                                                                                                                         | `evidence/AT18-declaration-and-trailer.txt`                     | Run once                      |
| Feature test count                                                            | 36 tests (frontend total minus the 6 tests in the base). `DispatchFlow.test.tsx`, `actions.test.ts`, `matching.test.ts`, `validation.test.ts` (36 tests by Vitest count; 25 `it` blocks, the rest from `it.each`)                                                                                                                                                          | `evidence/feature-test-count.txt`                               | Run once                      |
| Mutation score                                                                | Stryker ran 18 Oct 2026 23:13 to 23:14 and reported 396 valid mutants: 8 killed, 21 survived, 367 with no coverage, score 2.02 percent. Only `validation.test.ts` was executed; the runner did not relate the other seven test files to the mutated files, so the figure is not valid and the run is repeated with related-file detection off before any score is recorded | `evidence/mutation-attempt-2026-10-18.txt`                      | Not yet                       |
| Seeds S1 and S2                                                               | Not yet run                                                                                                                                                                                                                                                                                                                                                                |                                                                 | Not yet                       |
| How a request is stored (code read)                                           | Firestore through the Admin SDK. `dispatch.actions.ts` calls `requireAuth()` first, writes `dispatchRequests` with `ownerId: session.uid`, and schedules inside `runTransaction` with an owner check. `firebase/firestore.rules` is unchanged, so the base's default deny applies to any client SDK access and every write goes through the Server Actions                 | source at `40c65f5`                                             | Run once (read, not executed) |

Direct attacks AT01 to AT09 and AT11 are expected to be denied by the base rules; the Server Action path is what AT05, AT06 and AT08 test.

Findings are not classified under section 7 until the preview checks are run, so the builder's record gaps above are listed in section 5 and not yet counted.

#### 3.4 What this does not show

- Nothing about the running build. No test job or attack has touched the preview, so no criterion has a reviewer result yet.
- The mutation figure is not valid for the reason given in the table. A rerun is needed before any score is compared.
- AT15 is partial: the secrets scanner the protocol names was not available locally, so the local check is a grep and the CI result is the only gitleaks run.
- Reviewer time is logged in `README.md` in this folder; the per-build times in protocol section 8 are not yet measurable because the review of this build is not finished.

#### 3.5 What the manual takes from it

- Not yet. Filled when the review of all three builds is complete.

## 4. Claims and evidence

| #   | Claim, in the chapter's words                                                                                        | Section | Evidence                                                        | Status   |
| --- | -------------------------------------------------------------------------------------------------------------------- | ------- | --------------------------------------------------------------- | -------- |
| 1   | The branch starts at `6af6a5b` and the final commit is `40c65f5`                                                     | 3.2     | `Peepachuu/nbn-run2-gated#2`, `git merge-base` on the clone     | Run      |
| 2   | Typecheck, lint and all tests pass on a fresh clone of `40c65f5`                                                     | 3.3     | `evidence/AT17-test.txt`, `AT17-typecheck.txt`, `AT17-lint.txt` | Run once |
| 3   | The build adds 36 feature tests                                                                                      | 3.3     | `evidence/feature-test-count.txt`                               | Run once |
| 4   | The branch bumps `next`, `eslint-config-next` and `sharp` versions and adds no new package                           | 3.3     | `evidence/AT16-dependencies.txt`                                | Run once |
| 5   | The AI-assisted box is ticked and a Co-authored-by trailer is on the branch                                          | 3.3     | `evidence/AT18-declaration-and-trailer.txt`                     | Run once |
| 6   | Evidence files missing from the builder's record: none; distinct screenshots 5 of 14                                 | 3.3     | `evidence/AC16-record-check.md`                                 | Run once |
| 7   | Writes go through Server Actions with `requireAuth()` and an owner check, and the base Firestore rules are unchanged | 3.3     | source at `40c65f5`                                             | Run once |
| 8   | The 18 Oct mutation run produced no valid score                                                                      | 3.3     | `evidence/mutation-attempt-2026-10-18.txt`                      | Run once |

## 5. Limits and open questions

| #   | Limit or open question                                                                                    | Owner                                  | What it blocks                             |
| --- | --------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------------------------------------------ |
| 1   | TJ01 to TJ14 on the preview with the shared fixture set                                                   | Zac Clarkson                           | Every criterion result, section 3.3        |
| 2   | AT01 to AT14 on the preview and the build's Firestore project                                             | Zac Clarkson                           | Categories 1 to 6 in section 7             |
| 3   | Mutation rerun with Stryker's related-file detection off, then seeds S1 and S2                            | Zac Clarkson                           | Mutation score and seed results, chapter 6 |
| 4   | Whether the record gaps under TJ16 and TJ17 are findings (category 9) and at what severity                | Zac Clarkson, after the preview checks | Escaped-issue count                        |
| 5   | Reviewer access: read only on the build repository, so nothing can be pushed there; the record lives here | Zac Clarkson                           | Nothing, noted for the method              |

## 6. New terms

| Term | Meaning |
| ---- | ------- |
|      |         |
