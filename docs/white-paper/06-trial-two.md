# 6. Trial two

**Owner:** Sidney Zeng
**Planner card:** [PM] - Trial two results, executive summary, playback deck and handover pack : 240
**Status:** Ready for review
**Checked against:** `main` at `3c6fd4d`, 27 Oct 2026. `Peepachuu/nbn-sdlc-demo#73` at `48fff18` (the registered prediction). `Peepachuu/nbn-sdlc-demo#75` at `8953c02` (the protocol, the run sheets and the independent review). The three builds at their frozen commits: `9ahmedfr/nbn-run2-ai-only` at `f1611e0`, `Chirag123213/nbn-run2-copy-paste-1` at `ed173dc` and `Peepachuu/nbn-run2-gated` at `40c65f5`, read 27 Oct 2026. Pull request numbers are on the team repository, now `Chirag123213/nbn-sdlc-demo`; older references to `Peepachuu/nbn-sdlc-demo` redirect.
**Feeds from:** `docs/research/trial-two/acceptance-criteria.md` (frozen at `f43ca98`), `docs/research/trial-two/predictions.md` (PR #73), `docs/research/trial-two/attacks-and-test-jobs.md` and `docs/research/trial-two/review/` (PR #75), each build's `docs/research/technician-dispatch/` record, and `docs/white-paper/research-paper.md` sections 3.8, 4.6 and 4.7.

---

## 1. In one paragraph

Trial two built one feature, technician dispatch with 14 frozen criteria, three ways from the same starting commit, and one reviewer who built none of the three checked them all the same way. Only the gated build stored its data: it met 14 of 14 criteria and held all 18 attacks, while the AI-only and copy-and-paste builds met 12 of 14 because a reload lost every request and dispatch, even though both builders had marked all 14 as met and their CI was green. No gate in any lane caught any of the 15 findings before merge. Judged by the rule registered on 12 Oct 2026, the prediction that the builds would spread further apart than the feature grew held on one measure of three, so it is not supported. What separated the builds was a kind of failure, not a count, and a person found it by reloading the page.

## 2. What this chapter covers

| Covered | Not covered, and where it is instead |
| --- | --- |
| The registered prediction and the rule that judges it (3.1) | What each build cost: chapter 7 |
| How the trial ran: builders, tools, base commit, freeze and review (3.2) | The test jobs and the eighteen attacks in full: `docs/research/trial-two/attacks-and-test-jobs.md` (PR #75) |
| Results per criterion, per measure and per finding, and the prediction judged (3.3) | Trial one: the research paper, section 4.5 (chapter 5 was folded into the paper on 23 Oct 2026) |
| What the trial changes in tasks 5.3, 6.1, 6.4 and 7.4 (3.5) | How to run each task: chapter 3 |

## 3. The chapter

### Pattern B: what we ran and what it showed

#### 3.1 The question

The prediction, registered by Sidney Zeng in `docs/research/trial-two/predictions.md` and committed as `48fff18` on 12 Oct 2026, before any build (PR #73): "On the bigger feature, the three builds will end up further apart than they did in trial one, by more than the feature grew." Spread on a measure is the highest build's result minus the lowest, divided by the number of feature criteria (10 in trial one, 14 in trial two). The prediction is supported if trial two's spread per criterion is higher than trial one's on at least two of three measures: issues that escaped the independent review, feature criteria not met, and active human minutes.

#### 3.2 What was done

| Item | Value |
| --- | --- |
| Who | Builders, as in trial one: Ahmed Falulur Rahuman (build A, AI only), Chirag Wadehra (build B, copy and paste), Zafir Hasan (build C, gated framework). Reviewer: Zac Clarkson, who wrote the map and the review's attack list and test jobs, and built none of the three. Sidney Zeng registered the prediction, wrote the three run sheets, made the review's five decisions and declared the freeze |
| When | Criteria frozen 10 Oct 2026 (`f43ca98`). Prediction registered 12 Oct 2026. Protocol decisions 17 Oct 2026. Builds 17 and 18 Oct 2026, frozen at 22:27 on 18 Oct 2026. Offline checks 18 Oct 2026; preview checks, attacks, mutation and seeded faults 20 Oct 2026 |
| Repository and start commit | All three from `6af6a5b` (tag `trial2-base`): `9ahmedfr/nbn-run2-ai-only` pull request #10, frozen at `f1611e0`; `Chirag123213/nbn-run2-copy-paste-1` pull request #11, frozen at `ed173dc`; `Peepachuu/nbn-run2-gated` pull request #2, frozen at `40c65f5`. Lanes A and C built in repositories without the template's ruleset, so its two approvals and required checks gated lane B's pull request only. Lane C's build was also opened as #11 on `zacclarkson/nbn-run2-gated`, which has the ruleset, but the review read #2 |
| Tool, lane and model | A: Codex IDE extension in VS Code, approval set to "Approve for me". B: ChatGPT in the browser, code pasted into VS Code. C: Codex Desktop App, approval set to "Ask for approval", following a 178-line `AGENTS.md` with five stages (plan with no edits, tests first, implement and verify, review and correct, preview and acceptance) that stop for the builder's approval. All three were told to use GPT-5.6 Sol at high effort; four records name GPT-5: lane A's run record and commit trailer, and lane C's pull request declaration and commit trailer. Nobody built with Copilot, so the Copilot agent hook ran in no lane |
| Time limit | A four-hour estimate and a six-hour cap per build, with setup logged apart |
| What counted as done | T2-AC01 to AC14 (the feature) and AC15 to AC17 (the record) in `docs/research/trial-two/acceptance-criteria.md`, frozen at `f43ca98`. The reviewer ran one test job per criterion on each build's preview, the eighteen attacks in the same order on every build, a mutation run and two seeded faults |

#### 3.3 What happened

**Criteria.** Each result is the reviewer's, from the build's preview (`docs/research/trial-two/review/`, each lane's `review.md`, section 3.3). Run once.

| Criterion | A: AI only | B: copy and paste | C: gated framework |
| --- | --- | --- | --- |
| AC01 Create a request | Fail: a reload loses it | Fail: a reload loses it | Pass: written by a Server Action and read back |
| AC02 Fault recorded | Pass, on screen | Pass, on screen | Pass |
| AC03 Requirement recorded | Pass, on screen | Pass, on screen | Pass |
| AC04 Match to the fault | Pass | Pass | Pass |
| AC05 Match the equipment | Pass | Pass | Pass |
| AC06 Reject a second-storey mismatch | Pass | Pass, by leaving it out | Pass, and refused again at the server |
| AC07 Accept a compatible second-storey match | Pass | Pass | Pass |
| AC08 Reject a pit-job mismatch | Pass | Pass | Pass |
| AC09 No invented match | Pass | Pass | Pass |
| AC10 Schedule a valid dispatch | Pass, on screen | Pass, on screen | Pass |
| AC11 Record the dispatch | Fail: nothing stored | Fail: nothing stored | Pass: stored, and a second schedule refused |
| AC12 Equipment shown accessibly | Pass | Pass | Pass |
| AC13 Keyboard | Pass, in part | Pass, in part | Pass, in part |
| AC14 No colour-only information | Pass | Pass | Pass |
| **Feature criteria met, of 14** | **12** | **12** | **14** |
| AC15 Working preview | Pass | Pass | Pass |
| AC16 Results recorded | Pass, with a note | Fail: the AC07 screenshot is missing | Pass, with a note |
| AC17 Run details recorded | Present, with gaps | Present, with gaps | Present, with gaps |

**Measures.** From `docs/research/trial-two/review/README.md` (PR #75) and the builders' run logs.

| Measure | A: AI only | B: copy and paste | C: gated framework | Status |
| --- | --- | --- | --- | --- |
| Where a request lives | Browser memory; no sign-in | Browser memory, behind the base sign-in | Firestore, through Server Actions that check the owner, the status and the match | Run once |
| Attacks AT01 to AT14 | AT12 lands: the page is open to anyone. The rest hold or have nothing to attack | Hold where they have something to attack | All hold, at the rules, at the server and signed out | Run once |
| Attacks AT15 to AT18 | Hold | Hold | Hold | Run once |
| Feature tests added | 11 | 8 | 36 | Run once |
| Mutation score, feature files | 52.0% | 66.9% | 65.0% | Run once |
| Seed S1, owner check removed | Not applicable, no owner | Not applicable, no owner | Caught, by 1 test | Run once |
| Seed S2, access check always passes | Caught, by 5 tests | Caught, by 6 tests | Caught, by 7 tests | Run once |
| Findings | 5: one High, two Medium, two Low | 5: two Medium, three Low | 5: all Low | Run once |
| Findings counted for the prediction (decision 5) | 4, all escaped | 4, all escaped | 4, all escaped | Run once |
| Caught before merge by any gate | 0 | 0 | 0 | Run once |
| Builder's clock | 9 min 13 s (the run sheet says 14) | 62 min | 57 min, plus 32 min setup | Estimate (builder's log) |
| Active human minutes | 0 | 51 | 36 | Estimate (builder's log) |
| Reviewer's time | About 70 min | About 60 min | About 75 min | Run once |

**The prediction, judged by its rule.**

| Measure | Trial one: A, B, C | Spread per criterion, of 10 | Trial two: A, B, C | Spread per criterion, of 14 | Higher in trial two |
| --- | --- | --- | --- | --- | --- |
| Issues that escaped (decision 5) | 3, 1, 0 | 0.30 | 4, 4, 4 | 0.00 | No |
| Feature criteria not met | 1, 0, 0 | 0.10 | 2, 2, 0 | 0.14 | Yes |
| Active human minutes | 11, 94, 43 | 8.3 | 0, 51, 36 | 3.6 | No |

Higher on one measure of three: not supported. Three other readings do not change that. Trial one's escaped issues reconciled against its run sheet read 4, 1 and 1, still 0.30. Elapsed time instead of active time gives 9, 62 and 57 minutes, a spread of 3.8. On the builders' own reading of AC01 and AC11, both builds met all 14 criteria, a spread of 0.00, and the prediction then fails on all three measures; the research paper, section 4.6, gives that reading as 13, 13 and 14, but both builders' records mark all 14 as met. Of the directions registered beside the test, one held in full: build B again took the most active minutes. Build A's held in part: its unmet criteria per criterion rose from 0.10 to 0.14, but its escaped issues per criterion did not (0.30 to 0.29). Build C did not hold to zero or one escaped issue, and its tokens were not recorded, so its usage cannot be set against build A's.

**What the counts missed.** The two failed criteria are the same in builds A and B. Both keep the request, the match and the visit in the page's memory, nothing leaves the browser, and a reload returns an empty form. Both builders ticked AC01 and AC11, and both pull requests had green CI. The frozen text says a requester "can create" a request and a scheduled dispatch "records" the result; the reviewer read both as needing the record to exist after the page is gone. Build C writes each request through a Server Action that checks the session and schedules inside a transaction that checks the owner, the status and the match again, which is why its attacks had something to hold against.

**What the gates did.** The git hooks and CI checks ran in every lane and did what they were set to do: format, lint, types, tests, secrets, the AI declaration and the agent trailer. None of the fifteen findings was something those checks look for, so none was caught before merge. What caught the missing data store was a person who had not built the feature, reading "can create" against a reload.

#### 3.4 What this does not show

- **One build per method, one builder each, one feature.** Every figure is an observation, not a rate, and the builder cannot be separated from the method.
- **Build C's stages were an instruction file.** The agent followed `AGENTS.md` and the builder approved his own plan, tests and code. No holder stopped the agent skipping a stage, so the trial does not show the stages holding against an agent that ignores them, and no pull request in any lane was reviewed by a second person.
- **The ruleset gated lane B's pull request only.** Lanes A and C built in repositories without it (protocol, section 9, amendments 4 and 6). Lane C's copy, #11 on `zacclarkson/nbn-run2-gated`, has it but was not the pull request reviewed.
- **Nobody built with Copilot.** Lanes A and C used Codex and lane B used ChatGPT, so the trial says nothing about any Copilot lane, and the Copilot agent hook never ran.
- **AC13 was run in part.** The review tooling could not drive native date, time and radio controls from the keyboard; a person's keyboard run would close it on all three builds.
- **The escaped-issue count leaves findings out on purpose.** Decision 5 counts only checks trial one also ran, so 12 of the 15 findings are counted. All 15 are in the reviews.
- **The builders' records are weak evidence.** Each lane reused screenshots across criteria, five or six distinct images for 13 or 14 criteria, and two builders ticked criteria the reviewer failed.
- **Time to a correct feature was not measured.** Builds A and B would need a second cycle to store their data; it was not run.

#### 3.5 What the manual takes from it

- Write "create" and "record" as something a test can check, such as "the request is still there after a reload", before any build starts. Both failed criteria came from that gap. This changes task 5.3, acceptance criteria.
- Make the plan say where the data lives. Only build C stored its data. Its method put a plan, approved by the builder, before any code, and its `AGENTS.md` told the agent to keep Firestore client access denied, so the trial cannot say which of the two chose the store; both are cheap to copy. This changes task 6.1, where the agent plans and a person confirms the plan.
- Do not take a builder's tick, or green CI, as acceptance. The reviewer reruns each criterion on the preview, and reloads it. This changes task 6.4, review and merge approval.
- Agree a mutation threshold on the feature files. Every lane had a test finding that no gate refused. This changes task 7.4, judging whether the tests are correct.

## 4. Claims and evidence

| # | Claim, in the chapter's words | Section | Evidence | Status |
| --- | --- | --- | --- | --- |
| 1 | The prediction and its rule were committed on 12 Oct 2026, before any build | 1, 3.1 | `docs/research/trial-two/predictions.md` at `48fff18` (`Peepachuu/nbn-sdlc-demo#73`) | Run |
| 2 | The criteria were frozen at `f43ca98` on 10 Oct 2026 | 3.2 | `docs/research/trial-two/acceptance-criteria.md`; `Peepachuu/nbn-sdlc-demo#70` | Run |
| 3 | All three builds started from `6af6a5b`, and lanes A and C built in repositories without the ruleset | 3.2, 3.4 | `docs/research/trial-two/attacks-and-test-jobs.md`, section 9, amendments 4 and 6 (PR #75) | Run |
| 4 | The builds were frozen at 22:27 on 18 Oct 2026, at `f1611e0`, `ed173dc` and `40c65f5` | 3.2 | `docs/research/trial-two/review/README.md`, "Frozen commits" (PR #75) | Run |
| 5 | Lane A used the Codex IDE extension set to "Approve for me"; lane C used the Codex Desktop App set to "Ask for approval"; lane B used ChatGPT and pasted the code | 3.2 | `docs/research/trial-two/run-sheets/run-sheet-lane-A-Ahmed.xlsx` (PR #75); `run-log.xlsx` on `Peepachuu/nbn-run2-gated` at `40c65f5` and on `Chirag123213/nbn-run2-copy-paste-1` at `ed173dc` | Run once |
| 6 | Lane C followed a 178-line `AGENTS.md` with five stages that stop for the builder's approval | 3.2 | `docs/white-paper/research-paper.md`, section 3.8 | Run once |
| 7 | Four records name GPT-5 against the lane rule of GPT-5.6 Sol, and nobody built with Copilot | 3.2, 3.4 | `docs/research/technician-dispatch/trial-record.md` and the trailer on commit `5af6de8` on `9ahmedfr/nbn-run2-ai-only`; the declaration on pull request #2 and the trailer on commit `0d162bd` on `Peepachuu/nbn-run2-gated`; `docs/research/trial-two/review/ai-only/review.md` and `gated/review.md` (PR #75); research paper, section 3.8 | Run once |
| 8 | Builds A and B met 12 of 14 feature criteria and build C 14 of 14; AC01 and AC11 failed in A and B because nothing was stored | 1, 3.3 | `docs/research/trial-two/review/ai-only/review.md`, `copy-paste/review.md` and `gated/review.md`, section 3.3 (PR #75) | Run once |
| 9 | Both builders of A and B marked all 14 criteria as met, with green CI | 1, 3.3 | `docs/research/technician-dispatch/trial-record.md` on `9ahmedfr/nbn-run2-ai-only` at `f1611e0`; `docs/research/technician-dispatch/evidence/trial-record.md` on `Chirag123213/nbn-run2-copy-paste-1` at `ed173dc`; review records, findings table | Run once |
| 10 | In build C all eighteen attacks held; in build A, AT12 landed | 1, 3.3 | `docs/research/trial-two/review/README.md`, results table (PR #75) | Run once |
| 11 | Feature tests added were 11, 8 and 36; mutation scores over the feature files were 52.0, 66.9 and 65.0 percent | 3.3 | As above | Run once |
| 12 | Seed S1 was caught in build C by one test; seed S2 was caught in every build by 5, 6 and 7 tests | 3.3 | As above | Run once |
| 13 | Each build had five findings, four counted for the prediction, and none was caught before merge by any gate | 1, 3.3 | As above, and each `review.md`, section 7 | Run once |
| 14 | Builders' clocks were 9 min 13 s, 62 min, and 57 min plus 32 min of setup; active human minutes were 0, 51 and 36 | 3.3 | `docs/research/trial-two/review/README.md`; the run logs named in row 5 | Estimate (builders' logs) |
| 15 | The reviewer took about 70, 60 and 75 minutes per build | 3.3 | `docs/research/trial-two/review/README.md`, reviewer time log | Run once |
| 16 | Spread per criterion: escaped issues 0.30 to 0.00, criteria not met 0.10 to 0.14, active minutes 8.3 to 3.6; higher on one measure of three | 1, 3.3 | Arithmetic on rows 8, 13 and 14 and trial one's figures in `predictions.md`; `docs/white-paper/research-paper.md`, section 4.7 | Run once |
| 17 | On the builders' reading of AC01 and AC11 both builds met all 14 criteria, and the prediction fails on all three measures | 3.3 | The two builders' `trial-record.md` files named in row 9; `docs/white-paper/research-paper.md`, section 4.6 | Run once |
| 18 | The reviewer's tooling could not drive native date, time and radio controls, so AC13 ran in part | 3.3, 3.4 | `docs/research/trial-two/review/README.md`, "Tooling, and what it could not do" | Run |
| 19 | Each lane reused screenshots: 5, 6 and 5 distinct images | 3.4 | Each `review.md`, TJ16 | Run once |
| 20 | Only build C stored its data; its plan was approved before any code, and its `AGENTS.md` told the agent to keep Firestore client access denied | 3.5 | `docs/research/trial-two/review/README.md` (PR #75); `AGENTS.md` and `docs/research/technician-dispatch/evidence/run-log.xlsx` on `Peepachuu/nbn-run2-gated` at `40c65f5` | Run once |
| 21 | Lane C's build was also opened as #11 on `zacclarkson/nbn-run2-gated`, which has the ruleset | 3.2, 3.4 | Chapter 8, task 6.4, on branch `docs/results-and-cost`; `docs/research/trial-two/attacks-and-test-jobs.md`, section 9, amendments 4 and 6 (PR #75) | Run once |

## 5. Limits and open questions

| # | Limit or open question | Owner | What it blocks |
| --- | --- | --- | --- |
| 1 | AC01 and AC11 are read two ways: the reviewer's "exists after a reload" and the builders' "shown on screen". This chapter uses the reviewer's reading; the frozen text does not settle it | Sidney Zeng, with Ahmed Falulur Rahuman | The criteria counts and the prediction result on the builders' reading |
| 2 | The review record is still a draft pull request (#75), and the registered prediction (PR #73) is not on `main` either, so the paths in section 4 that point at them are not yet on `main` | Zac Clarkson, Sidney Zeng | Section 4 |
| 3 | The research paper, section 4.6, gives the builders' reading as 13, 13 and 14 and counts three GPT-5 records; the builders' records give 14, 14 and 14, and there are four | Zac Clarkson | The research paper, sections 3.8 and 4.6 |
| 4 | AC13 needs a person's keyboard run on all three builds | Zac Clarkson | AC13 in section 3.3 |
| 5 | Build C's tokens were not recorded, so the registered direction on tokens cannot be judged | Zafir Hasan | Section 3.3, chapter 7 |
| 6 | No build had a second person approve its plan or its pull request | Sidney Zeng | Any claim that the gated lifecycle's human gates held |

## 6. New terms

| Term | Meaning |
| --- | --- |
| Spread per criterion | The highest build's result minus the lowest, divided by the number of feature criteria |
| Counted finding | A finding from a check trial one also ran, and so counted for the prediction (protocol, decision 5) |
