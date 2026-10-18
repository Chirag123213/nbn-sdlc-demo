# Trial two review: lane A, AI only

**Owner:** Zac Clarkson
**Planner card:** [UX] - Independent review: criteria, attacks and mutation : 240
**Status:** Draft. Offline checks run 18 Oct 2026; preview checks, attacks and mutation not yet run.
**Checked against:** `9ahmedfr/nbn-run2-ai-only` at `f1611e0` (pull request #10, frozen by Sidney Zeng on 18 Oct 2026 at 22:27). Base `6af6a5b` (tag `trial2-base`). Protocol `docs/research/trial-two/attacks-and-test-jobs.md` on `docs/trial-two-attacks` at `0b349ca`.
**Feeds from:** `docs/research/trial-two/attacks-and-test-jobs.md` (sections 4 to 8), `docs/research/trial-two/acceptance-criteria.md`, the pull request and the builder's record under `docs/research/technician-dispatch/` in the build repository.
**AI involvement:** Claude (Claude Code, Fable 5.1), given the frozen clone, the pull request and the protocol, ran the offline checks and drafted this file. Checked by Zac Clarkson on 18 Oct 2026.

---

## 1. In one paragraph

This is the independent review record for the lane A (AI only) build by Ahmed Falulur Rahuman, reviewed against the frozen commit `f1611e0` and never against anything pushed later. On 18 Oct 2026 the reviewer ran the checks that need only the repository, AT15 to AT18 and TJ15 to TJ17, and read how the build stores a request. The test jobs on the preview (TJ01 to TJ14), the attacks on the running build (AT01 to AT14) and a valid mutation score are still to run. Until they are, nothing here is a criterion result.

## 2. What this chapter covers

| Covered                                                                                        | Not covered, and where it is instead                                                                                                                                |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AT15 to AT18, TJ15 to TJ17, test counts, a first mutation attempt, how the build persists data | TJ01 to TJ14 and AT01 to AT14 (section 5, open), the seeded faults S1 and S2 (section 5), the comparison across builds (`README.md` in this folder, then chapter 6) |

## 3. The chapter

### Pattern B: what we ran and what it showed

#### 3.1 The question

Does the lane A (AI only) build meet T2-AC01 to T2-AC17, do its rules and Server Actions hold under the eighteen attacks, and would its tests notice if the code were wrong, measured as protocol section 6 sets out and compared under the prediction registered in `docs/research/trial-two/attacks-and-test-jobs.md` section 9.

#### 3.2 What was done

| Item                            | Value                                                                                                                                                                                                    |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Who                             | Zac Clarkson, reviewer. Built none of the three.                                                                                                                                                         |
| When                            | 18 Oct 2026, 22:58 to 23:35, offline checks only                                                                                                                                                         |
| Repository and start commit     | `9ahmedfr/nbn-run2-ai-only` at `f1611e0`, branch `feature/technician-dispatch`, 8 commits on top of `6af6a5b`, which is an ancestor (checked with `git merge-base`)                                      |
| Tool, lane and model            | OpenAI Codex, model GPT-5 (builder's `trial-record.md`); Planner card and master document say GPT-5.6 Sol at high effort                                                                                 |
| Time limit                      | Four hours estimate, six hours cap (the brief)                                                                                                                                                           |
| What counted as done            | `docs/research/trial-two/acceptance-criteria.md`, T2-AC01 to T2-AC17                                                                                                                                     |
| Builder's setup before prompt 1 | `c938643` added `fixtures/technicians.json` and removed `.github/copilot-instructions.md` and `frontend/AGENTS.md`; `a9cf63b` set `.firebaserc`. Both are before prompt 1 and are covered by amendment 3 |
| Builder's recorded start commit | `ccfb2ca` (builder's record). That is the merge of the builder's setup pull request #8, itself on top of `6af6a5b` (amendment 3)                                                                         |

#### 3.3 What happened

| Measure                                                                       | Result                                                                                                                                                                                                                                                                                                                   | Evidence                                                        | Status                        |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- | ----------------------------- |
| TJ01 to TJ14, criteria on the preview                                         | Not yet run                                                                                                                                                                                                                                                                                                              |                                                                 | Not yet                       |
| TJ15, preview URL in the pull request loads the final commit                  | A preview URL is in the description and the Vercel check on `f1611e0` passed. Loading it against the final commit is not yet confirmed by the reviewer                                                                                                                                                                   | `evidence/AC15-pr.txt`                                          | Run once, in part             |
| TJ16, builder's record has pass or fail and an evidence path for AC01 to AC14 | Pass, with a note. Distinct screenshots: 5 of 14. AC01, AC02, AC03 are one file; AC04, AC05, AC06, AC07, AC12, AC14 are one file; AC08 and AC09 are one file; AC10 and AC13 are one file                                                                                                                                 | `evidence/AC16-record-check.md`                                 | Run once                      |
| TJ17, run details                                                             | Builder, repository, branch, method, tool, model, start and end times and elapsed time are all present. Start commit is `ccfb2ca`, not `6af6a5b`. Model is recorded as GPT-5, which disagrees with the Planner card. No run-log spreadsheet in the repository (the lane A run sheet Sidney saved is in `../run-sheets/`) | `evidence/AC17-run-details.md`                                  | Run once                      |
| Builder's clock                                                               | 23:53:09 on 17 Oct 2026 to 00:02:22 on 18 Oct 2026, 9 min 13 s elapsed (builder's record, measured); Planner card says 14 min                                                                                                                                                                                            | builder's record                                                | Estimate (builder's log)      |
| AT01 to AT14                                                                  | Not yet run                                                                                                                                                                                                                                                                                                              |                                                                 | Not yet                       |
| AT15, secrets in history                                                      | No `.env` file in any commit, no key-like string in the branch diff. gitleaks was not installed on the reviewer's machine; the Security Scan CI check passed on the pull request                                                                                                                                         | `evidence/AT15-secrets.txt`                                     | Run once, in part             |
| AT16, new dependencies                                                        | Pass. No change to any `package.json` or to `pnpm-lock.yaml`                                                                                                                                                                                                                                                             | `evidence/AT16-dependencies.txt`                                | Run once                      |
| AT17, green on the final commit                                               | `pnpm install --frozen-lockfile`, `typecheck`, `lint` and `test:all` all exit 0 on a fresh clone, 18 Oct 2026 23:12. Backend 5 tests, frontend 17 tests. Matches the pull request's CI checks                                                                                                                            | `evidence/AT17-typecheck.txt`, `AT17-lint.txt`, `AT17-test.txt` | Run once                      |
| AT18, declaration and trailer                                                 | AI-assisted box ticked. Co-authored-by trailers: 2 (`5af6de8` OpenAI Codex (GPT-5), `2e57433` OpenAI Codex). AI Declaration and AI Attribution checks passed                                                                                                                                                             | `evidence/AT18-declaration-and-trailer.txt`                     | Run once                      |
| Feature test count                                                            | 11 tests (frontend total minus the 6 tests in the base). `TechnicianDispatchFlow.test.tsx` (5), `matching.test.ts` (6)                                                                                                                                                                                                   | `evidence/feature-test-count.txt`                               | Run once                      |
| Mutation score                                                                | Stryker ran 18 Oct 2026 23:13 and exited with `No tests were executed` (its Vitest runner found no test files related to the mutated files). To be rerun with related-file detection off. No score yet                                                                                                                   | `evidence/mutation-attempt-2026-10-18.txt`                      | Not yet                       |
| Seeds S1 and S2                                                               | Not yet run                                                                                                                                                                                                                                                                                                              |                                                                 | Not yet                       |
| How a request is stored (code read)                                           | None. `TechnicianDispatchFlow.tsx` holds the request, the match and the scheduled dispatch in React `useState`. No Server Action, no Firestore read or write, no change to `firebase/firestore.rules`. A page reload loses the request                                                                                   | source at `f1611e0`                                             | Run once (read, not executed) |

TJ01 (visible afterwards) and TJ11 (stored record) cannot pass on a build with no store, and AT01 to AT09 and AT11 have no server surface to attack. Both are to be confirmed on the preview before they are recorded as findings.

Findings are not classified under section 7 until the preview checks are run, so the builder's record gaps above are listed in section 5 and not yet counted.

#### 3.4 What this does not show

- Nothing about the running build. No test job or attack has touched the preview, so no criterion has a reviewer result yet.
- The mutation figure is not valid for the reason given in the table. A rerun is needed before any score is compared.
- AT15 is partial: the secrets scanner the protocol names was not available locally, so the local check is a grep and the CI result is the only gitleaks run.
- Reviewer time is logged in `README.md` in this folder; the per-build times in protocol section 8 are not yet measurable because the review of this build is not finished.

#### 3.5 What the manual takes from it

- Not yet. Filled when the review of all three builds is complete.

## 4. Claims and evidence

| #   | Claim, in the chapter's words                                                        | Section | Evidence                                                        | Status   |
| --- | ------------------------------------------------------------------------------------ | ------- | --------------------------------------------------------------- | -------- |
| 1   | The branch starts at `6af6a5b` and the final commit is `f1611e0`                     | 3.2     | `9ahmedfr/nbn-run2-ai-only#10`, `git merge-base` on the clone   | Run      |
| 2   | Typecheck, lint and all tests pass on a fresh clone of `f1611e0`                     | 3.3     | `evidence/AT17-test.txt`, `AT17-typecheck.txt`, `AT17-lint.txt` | Run once |
| 3   | The build adds 11 feature tests                                                      | 3.3     | `evidence/feature-test-count.txt`                               | Run once |
| 4   | No dependency was added or changed between `6af6a5b` and `f1611e0`                   | 3.3     | `evidence/AT16-dependencies.txt`                                | Run once |
| 5   | The AI-assisted box is ticked and a Co-authored-by trailer is on the branch          | 3.3     | `evidence/AT18-declaration-and-trailer.txt`                     | Run once |
| 6   | Evidence files missing from the builder's record: none; distinct screenshots 5 of 14 | 3.3     | `evidence/AC16-record-check.md`                                 | Run once |
| 7   | The build keeps the request in React state and writes nothing to Firestore           | 3.3     | source at `f1611e0`                                             | Run once |
| 8   | The 18 Oct mutation run produced no valid score                                      | 3.3     | `evidence/mutation-attempt-2026-10-18.txt`                      | Run once |

## 5. Limits and open questions

| #   | Limit or open question                                                                         | Owner                                  | What it blocks                             |
| --- | ---------------------------------------------------------------------------------------------- | -------------------------------------- | ------------------------------------------ |
| 1   | TJ01 to TJ14 on the preview with the shared fixture set                                        | Zac Clarkson                           | Every criterion result, section 3.3        |
| 2   | AT01 to AT14 on the preview and the build's Firestore project                                  | Zac Clarkson                           | Categories 1 to 6 in section 7             |
| 3   | Mutation rerun with Stryker's related-file detection off, then seeds S1 and S2                 | Zac Clarkson                           | Mutation score and seed results, chapter 6 |
| 4   | Whether the record gaps under TJ16 and TJ17 are findings (category 9) and at what severity     | Zac Clarkson, after the preview checks | Escaped-issue count                        |
| 5   | Reviewer access: write on the build repository; nothing is pushed there, the record lives here | Zac Clarkson                           | Nothing, noted for the method              |

## 6. New terms

| Term | Meaning |
| ---- | ------- |
|      |         |
