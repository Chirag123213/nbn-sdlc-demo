# Trial Two: attack list and test jobs for the independent review

**Owner:** Zac Clarkson
**Planner card:** [UX] - Independent review: criteria, attacks and mutation : 240
**Status:** Draft for Sidney Zeng. Frozen for Trial Two once merged; see section 9.
**Checked against:** `main` at `44557a3`, 17 Oct 2026. Run-two repositories `nbn-run2-ai-only`, `nbn-run2-copy-paste` and `nbn-run2-gated` at `6af6a5b` (tag `trial2-base`), none with a push yet.
**Feeds from:** `docs/research/trial-two/acceptance-criteria.md` (the frozen brief, T2-AC01 to T2-AC17). "Group 20 Showcase Test Plan.docx" (Sidney Zeng, 22 Sep 2026, Teams library `ab. Main Project Deliverables/Sprint 2`) for the fairness rules, the measures, the end-of-run conditions and the independent review scope. Trial one's review record in `docs/research/fault-reporting/evidence/run-2026-09-27/`.
**AI involvement:** Claude (Claude Code, Fable 5.1), given the three documents above and the run-two base repository, drafted the whole file. Checked by Zac Clarkson on 17 Oct 2026. Not yet reviewed by Sidney Zeng.

---

## 1. In one paragraph

This is the fixed checklist the independent reviewer runs against each of the three Trial Two builds after they are frozen. It turns the fourteen feature criteria into test jobs with one shared fixture set, lists the attacks the reviewer tries on every build in the same order, and says what counts as pass, fail, caught before merge and escaped. It is written down before any build starts so the review does not depend on which build the reviewer is looking at, which is the rule Sidney's test plan sets for trial one and which carries over unchanged. It does not change the brief, the criteria or the out-of-scope list.

## 2. What this document covers

| Covered | Not covered, and where it is instead |
| --- | --- |
| The fixture set every build is tested with (section 3) | The brief and the criteria: `acceptance-criteria.md`, frozen, Ahmed |
| One test job per criterion T2-AC01 to T2-AC14, and the record checks for T2-AC15 to T2-AC17 (section 4) | Lane rules: which tool and model each lane uses and what the gated lane must run. Sidney, in the Team 2 channel, before anyone clocks on |
| The attack list, run on every build in the same order (section 5) | The registered prediction and the hypotheses: Sidney's test plan, section "What we expect" |
| Mutation testing procedure and what is reported (section 6) | The results table, cost calculation and booth display: Sidney's test plan, "What we measure" |
| Issue categories and severity, so findings across builds are comparable (section 7) | The builders' own run logs, prompts and evidence: `docs/research/technician-dispatch/` in each build repository, per Zac's post of 16 Oct 2026 |
| Review order, timing and where the record goes (section 8) | |
| What has to be decided before the first clock-on (section 9) | |

## 3. The shared fixture set

The brief says the test protocol may use neutral fixture values, that they must be identical across all three builds, and that they must not add required behaviour. These are those values. Builders do not need them to build; the reviewer needs them to test. Whether builders see this section before they build is Sidney's call (section 9, decision 2).

The brief does not define a skill taxonomy, a fault taxonomy or an equipment catalogue, so each build will model these its own way. The reviewer maps the fixture onto whatever the build provides and records the mapping in the review record. A build that cannot represent a fixture value at all is recorded as such against the criterion that needs it, not forced.

### 3a. Faults

| Id | Fault, as the reviewer will enter it | Used by |
| --- | --- | --- |
| F1 | No connection at the premises | J1, J2, J4 |
| F2 | Intermittent speed drop | J3, J5 |
| F3 | Network termination device not powering on | J6 |

### 3b. Access and equipment requirements

| Id | Requirement, as the reviewer will enter it | What satisfies it |
| --- | --- | --- |
| R0 | None (ground floor, no pit) | Any technician |
| R1 | Second storey | Ladder or elevated work platform |
| R2 | Pit job | Pit access capability |

### 3c. Technicians

| Id | Name used in the fixture | Suitable for faults | Equipment and access | Purpose in the tests |
| --- | --- | --- | --- | --- |
| T1 | Tech Alpha | F1 | Ladder | Valid second-storey match for F1 |
| T2 | Tech Bravo | F3 | Elevated work platform, pit access | Valid pit-job match for F3; valid second-storey match for F3 |
| T3 | Tech Charlie | F2 | None | Suitable for F2 but no ladder, no pit: the invalid second-storey and pit cases |
| T4 | Tech Delta | F1 | None | Suitable for F1 at ground floor only; invalid for R1 and R2 |

### 3d. Jobs the reviewer raises

| Id | Fault | Requirement | Valid matches | Exercises |
| --- | --- | --- | --- | --- |
| J1 | F1 | R0 | T1, T4 | T2-AC01 to AC05, AC10, AC11 |
| J2 | F1 | R1 | T1 only | T2-AC06 (T4 rejected), T2-AC07 (T1 accepted) |
| J3 | F2 | R1 | None | T2-AC06 (T3 rejected), T2-AC09 (no match invented) |
| J4 | F1 | R2 | None | T2-AC08 (T1 and T4 rejected), T2-AC09 |
| J5 | F2 | R2 | None | T2-AC08 (T3 rejected), T2-AC09 |
| J6 | F3 | R2 | T2 only | T2-AC08 (T1, T3, T4 rejected), T2-AC10, T2-AC11 |

### 3e. Accounts

Two requester accounts on each build's preview, created by the reviewer at review time: Requester A raises every job above; Requester B raises nothing and is used for the cross-user attacks in section 5. Credentials are recorded in the review record, not here.

## 4. Test jobs, one per criterion

Each job is run on the deployed preview named in the pull request (T2-AC15), signed in as Requester A unless stated. "Evidence" is the file the reviewer saves under the path in section 8. A criterion passes only if every row for it passes.

| Job | Criterion | What the reviewer does | Passes when | Evidence |
| --- | --- | --- | --- | --- |
| TJ01 | T2-AC01 | Raise J1 for a customer premises | The request exists and is visible to Requester A afterwards | `AC01-create.png`, and the stored record (`AC01-record.txt`) |
| TJ02 | T2-AC02 | Read J1 back | The fault F1 is on the request as entered | `AC02-fault.png` |
| TJ03 | T2-AC03 | Raise J2 with R1 and J4 with R2; read both back | Each requirement is on its request as entered | `AC03-requirements.png` |
| TJ04 | T2-AC04 | On J1, look at which technicians the build offers or accepts | T2 and T3 are not treated as valid for F1; T1 and T4 are | `AC04-match-fault.png` |
| TJ05 | T2-AC05 | On J2, look at which technician and equipment combinations the build offers or accepts | Only a combination that satisfies R1 is treated as valid | `AC05-match-equipment.png` |
| TJ06 | T2-AC06 | On J2, attempt to proceed with T4. On J3, attempt to proceed with T3 | Both are refused as matches. The refusal is visible to the requester | `AC06-reject-second-storey.png` |
| TJ07 | T2-AC07 | On J2, proceed with T1 to scheduling | Scheduling is reachable with T1 | `AC07-accept-second-storey.png` |
| TJ08 | T2-AC08 | On J4, attempt T1 and T4. On J5, attempt T3. On J6, attempt T1, T3 and T4 | Every one is refused | `AC08-reject-pit.png` |
| TJ09 | T2-AC09 | Look at what J3, J4 and J5 show after matching | The build says there is no compatible combination, or offers nothing. It does not present any technician as valid | `AC09-no-invented-match.png` |
| TJ10 | T2-AC10 | On J1 with T1, and J6 with T2, schedule the visit | A scheduled visit exists for each | `AC10-schedule.png` |
| TJ11 | T2-AC11 | Read the two scheduled dispatches back, in the UI and in the stored record | Each records the technician, the visit details and the requirement used for the match | `AC11-dispatch-record.png`, `AC11-record.txt` |
| TJ12 | T2-AC12 | On the matching screen for J2 and J6, view at 100 percent then with the page rendered in greyscale (browser DevTools, Rendering, emulate vision deficiency: achromatopsia) | Each requirement is shown with text and an icon, and can still be told apart in greyscale | `AC12-colour.png`, `AC12-greyscale.png` |
| TJ13 | T2-AC13 | Unplug or ignore the mouse. From sign-in, raise J1, match T1, schedule, using Tab, Shift-Tab, Enter, Space and arrow keys only | The whole flow completes. Focus is visible at every step. No step needs a pointer | `AC13-keyboard.md` (step list with the key pressed at each) |
| TJ14 | T2-AC14 | Greyscale render of the request list, the match result for J3 and the scheduled dispatch for J1 | Status, validity and requirement are all readable without colour | `AC14-greyscale.png` |
| TJ15 | T2-AC15 | Open the pull request | A preview URL is in the description and it loads the build's final commit | `AC15-pr.txt` |
| TJ16 | T2-AC16 | Open the builder's record in `docs/research/technician-dispatch/` | Every criterion T2-AC01 to AC14 has a pass or fail and a path to the evidence used | `AC16-record-check.md` |
| TJ17 | T2-AC17 | Same record, and the run log | Builder, repository, start commit `6af6a5b`, method, tool, model, clock-on and clock-off times, and elapsed time against the four-hour estimate and six-hour cap are all present | `AC17-run-details.md` |

The builder's own pass or fail (TJ16) is recorded alongside the reviewer's, never in place of it. Where they disagree, the reviewer's result stands and the disagreement is a finding.

## 5. The attack list

Run on every build, in this order, after section 4. The reviewer does not stop at the first failure. An attack that is not on this list but occurs to the reviewer during one build is recorded as unplanned and is then run on all three builds, so no build gets an attack the others did not.

"Direct" means a write or read issued to the build's Firestore project with the Firebase web SDK and the preview's public config, signed in as the stated requester, bypassing the build's UI and Server Actions. This is the same method trial one used for its direct client rules checks.

| Attack | What the reviewer tries | Signed in as | Expected to hold | Gate that should catch it in the build | Severity if it lands |
| --- | --- | --- | --- | --- | --- |
| AT01 Resolve the wrong requester's request | Read Requester A's J1 by its document id | B | Denied | Firestore rules | High |
| AT02 Forge the owner | Create a request whose owner field is Requester A | B | Denied, or the owner is overwritten server-side | Rules, or the Server Action ignoring client-supplied owner | High |
| AT03 Change the owner | Update J1's owner field to Requester B | A | Denied | Rules: owner immutable | High |
| AT04 Schedule an incompatible match by hand | Write a dispatch for J2 naming T4 (no ladder) directly | A | Denied, or the build will not treat it as scheduled | Rules, or server-side re-check of the match at scheduling. A build that checks the match only in the UI fails this | High |
| AT05 Forge the match through the form | Intercept the schedule submission for J2 and replace the technician id with T4's (browser DevTools, edit and resend) | A | Refused by the server | Server Action re-validates the match | High |
| AT06 Schedule with no match | Attempt to schedule J3 (no valid combination) directly, with any technician | A | Denied | Rules or server check | High |
| AT07 Invalid status | Set a request's status to a value the build does not define, directly | A | Denied | Rules: status is a closed set | Medium |
| AT08 Schedule twice | Submit the schedule step for J1 twice in quick succession (double click, or resend) | A | One dispatch, or the second refused. Two dispatches for one request is a finding | Server idempotency or a rules constraint | Medium |
| AT09 Hard delete | Delete J1 directly | A | Denied | Rules: `allow delete: if false` | Medium |
| AT10 Out-of-scope surface | Search the UI and the code for reschedule, cancel, technician admin, rebate, notification | Reviewer | None present | Human review against the out-of-scope list. A build that added one is a scope breach, recorded under category 6 | Medium |
| AT11 Default deny intact | Read and write a collection the build did not define, directly | A | Denied | The base rules' catch-all deny, which a build might have loosened | High |
| AT12 Unauthenticated access | Open the dispatch page and call its Server Actions signed out | Nobody | Redirect or refusal, no data | `requireAuth()` first in every Server Action | High |
| AT13 Keyboard trap | During TJ13, note any element focus cannot leave, and any control reachable by pointer but not by Tab | A | None | Human review | Medium (fails T2-AC13 as well) |
| AT14 Colour-only cue | During TJ12 and TJ14, look for any state that is conveyed by colour with no text or icon | A | None | Human review | Medium (fails T2-AC12 or AC14 as well) |
| AT15 Secrets in history | `git log -p` on the branch piped through gitleaks, and read `.env*` entries in every commit | Reviewer | Nothing | Hook (git): gitleaks pre-commit in the base; Security Scan CI check | High |
| AT16 New dependencies | Diff `pnpm-lock.yaml` and every `package.json` between `6af6a5b` and the final commit | Reviewer | No new packages. Stryker is already in the base, so it does not count | Human review. Nothing in the base blocks this | Low |
| AT17 Green on the final commit | Run `pnpm run typecheck`, `pnpm run lint` and `pnpm run test:all` on a fresh clone of the final commit | Reviewer | All green, matching the CI run on the pull request | Lint and Typecheck, Frontend Tests, Backend Unit Tests CI checks, all required by the run-two ruleset | High if red |
| AT18 Declaration and trailer | Read the pull request template checkboxes and `git log --format=%B` on the branch | Reviewer | AI-assisted box ticked and at least one commit carries a `Co-authored-by` trailer naming the agent | AI Declaration and AI Attribution CI checks | Low as a code matter, but it is the experiment's data, so it is always reported |

Commands the reviewer uses for AT15 to AT18, run from the root of a fresh clone of the build repository at its final commit:

```bash
git diff 6af6a5b..HEAD --stat -- pnpm-lock.yaml package.json frontend/package.json backend/package.json
git log --format='%h %s%n%b' 6af6a5b..HEAD
gitleaks git --log-opts="6af6a5b..HEAD" .
pnpm install
pnpm run typecheck && pnpm run lint && pnpm run test:all
```

## 6. Mutation testing

Stryker and its Vitest runner are in the run-two base at `6af6a5b` (`frontend/package.json`, `frontend/stryker.config.json`), so running it adds nothing to any build and the no-new-dependencies rule is not touched. Trial one installed Stryker after the freeze; that step is no longer needed.

Procedure, per build, on the fresh clone from AT17:

```bash
pnpm --filter frontend mutation
```

Reported for each build, from the Stryker summary and the JSON report, with no threshold applied:

| Figure | How it is read |
| --- | --- |
| Valid mutants | Total minus errors |
| Killed | Detected by a test |
| Survived | Not detected by any test |
| No coverage | No test reached the mutant |
| Score | Killed divided by valid, as trial one computed it. Errors are excluded from the denominator |

Two seeded faults are also applied by hand to each build, in a throwaway working copy, and the test suite run after each. They are the faults the fixture set is built to expose:

| Seed | Change | Passes when |
| --- | --- | --- |
| S1 Ownership | Remove the check that the requester owns the request before scheduling | At least one test fails |
| S2 Match | Make the second-storey check always return true | At least one test fails |

A build where neither seed fails a test still passes the criteria if its UI behaves; the seed result is reported as a test-quality figure beside the mutation score, not as a criterion result.

If a build put matching logic in the backend package, the backend has no Stryker config in the base. The reviewer reports frontend mutation only and says so, rather than adding a config after the freeze.

## 7. Issue categories and severity

Every finding from sections 4, 5 and 6 gets one category and one severity, so the counts can be compared across the three builds.

| Category | Covers |
| --- | --- |
| 1 Authorisation | Who can read, write or schedule what. AT01 to AT03, AT06, AT11, AT12 |
| 2 Matching integrity | Whether the match is enforced where it cannot be bypassed. T2-AC04 to AC09, AT04, AT05 |
| 3 Data integrity | Immutable fields, closed sets, idempotency, soft delete. AT07 to AT09 |
| 4 Validation | Input checks on the request form and the Server Actions |
| 5 Accessibility | T2-AC12 to AC14, AT13, AT14 |
| 6 Scope | Anything built from the out-of-scope list. AT10 |
| 7 Tests | Missing or weak tests, from section 6 and from reading the test files |
| 8 Hygiene | Secrets, dependencies, red checks, declaration. AT15 to AT18 |
| 9 Record | Gaps in the builder's run log, prompts or evidence. TJ16, TJ17 |

| Severity | Means |
| --- | --- |
| High | A requester can do something to another requester's data, or an incompatible technician can be dispatched |
| Medium | Wrong behaviour the requester would notice, or a criterion failed, with no cross-user effect |
| Low | Would be raised in code review and fixed in a follow-up; no behaviour change |

For each finding the record also says whether a gate caught it before merge (a failed CI check, a hook refusal, a review comment on the pull request, or the builder's own log saying they found and fixed it) or whether it escaped. That split is the "caught before merge" and "escaped" pair in Sidney's measures.

## 8. Order, time and where the record goes

The three builds are reviewed one after another, in the order their pull requests were opened, and nothing in one review is read into another until all three are done. The reviewer runs section 4, then 5, then 6, then classifies with section 7.

| Step | Estimated time per build |
| --- | --- |
| Accounts, fixture entry, mapping the fixture to the build's model | 30 min |
| Test jobs TJ01 to TJ17 | 60 min |
| Attacks AT01 to AT18 | 60 min |
| Mutation run and two seeds | 30 min, mostly waiting |
| Classification and write-up | 30 min |

Those are Zac Clarkson's estimates on 17 Oct 2026, before any review has been run. Actual times are logged in the review record.

The record for each build lives in this repository, not in the build repository, so the builder cannot edit it:

```text
docs/research/trial-two/review/
  README.md                       index, order reviewed, dates, reviewer times
  ai-only/review.md               fixture mapping, TJ and AT tables filled, findings
  ai-only/evidence/               the files named in sections 4 to 6
  copy-paste/review.md
  copy-paste/evidence/
  gated/review.md
  gated/evidence/
```

Each `review.md` carries the same header block as this file and a claims table in the white paper format, so the three feed chapter 6 without rewriting.

## 9. Decisions needed before the first clock-on

These are Sidney's to make, in the Team 2 channel, so all three builders hear the same thing.

1. **Fixture loading.** Every build uses the same four technicians. Sections 3a to 3c go into all three repositories as `fixtures/technicians.json` before anyone clocks on, and prompt 2 of the run sheet tells every AI to use that file. If a build still keeps its technicians where the reviewer can't reach them, the reviewer writes T1 to T4 straight into its Firestore project at review. Builders are not asked to document their technician record: in lane A that would mean reading the code, which the method rules out, and the reviewer reads the code at review.
2. **Who sees what.** Builders see the technician file only. They do not see the jobs in section 3d, the test jobs in section 4 or the attacks in section 5 until their build is frozen, and they do not open this pull request until then. Lanes B and C have a person who could steer the build toward known tests, while lane A's AI only ever sees prompts 1 and 2, so showing the tests to people would favour B and C.
3. **The model line.** GPT-5.6 Sol, thinking set to high, in all three lanes: Codex for A and C, ChatGPT for B, the same as trial one. It is written in the run sheet, and each builder screenshots the setting before prompt 1, so TJ17 has it in writing.
4. **The hourly rate.** A$100 an hour, the rate trial one's costs used, so the two trials compare. If it was never agreed with Alessio, the paper says it is the team's assumption.
5. **Issues that escaped, for the prediction.** This review runs far more checks than trial one's did. For the registered prediction, the escaped-issue count uses only findings from checks trial one also ran, and every other finding is reported beside it. The reviewer marks those checks in section 5 before the first clock-on.


## 10. Claims

| Claim | Evidence | Label |
| --- | --- | --- |
| The run-two base contains Stryker and a frontend config | `frontend/package.json` and `frontend/stryker.config.json` at `6af6a5b` | Run |
| The run-two ruleset requires six CI checks | `gh api repos/zacclarkson/nbn-run2-gated/rulesets`, read 17 Oct 2026 | Run |
| No build had pushed by 17 Oct 2026 | All three repositories at `6af6a5b`, read with `gh api` on 17 Oct 2026 | Run |
| Trial one's independent review used direct client Firestore checks and two seeded faults | `docs/research/fault-reporting/evidence/run-2026-09-27/ac-matrix.md` | Run once |
| The time estimates in section 8 | Zac Clarkson, 17 Oct 2026 | Estimate |
| The fixture set exposes every criterion T2-AC04 to AC09 | Section 3d, by construction. Not yet exercised against any build | Documented, not run |
