# 0. Executive summary

**Owner:** Sidney Zeng
**Planner card:** [PM] - Trial two results, executive summary, playback deck and handover pack : 240
**Status:** Ready for review
**Checked against:** `main` at `3c6fd4d`, 27 Oct 2026. Chapter 4 on branch `docs/white-paper-proof-of-concept` at `c15dc3b`. Chapters 7 and 8 on branch `docs/results-and-cost` at `4d1905e`, with chapter 7's trial two figures of 27 Oct 2026. Chapter 6 as drafted on 27 Oct 2026. `Peepachuu/nbn-sdlc-demo#75` at `8953c02`. Pull request numbers are on the team repository, now `Chirag123213/nbn-sdlc-demo`; older references to `Peepachuu/nbn-sdlc-demo` redirect.
**Feeds from:** Section 1 of chapters 1, 2, 3, 4, 6, 7 and 8. Chapter 5 and chapter 9 were folded into the research paper on 23 Oct 2026, so trial one and the limits come from `docs/white-paper/research-paper.md`, sections 4.5 and 6, and the conclusion from section 7.
**AI involvement:** Claude (claude.ai), given the sections above, drafted the whole summary on 27 Oct 2026. Not yet checked: it needs someone other than Sidney Zeng before it is marked reviewed.

---

## 1. In one paragraph

NBN Co asked how a software team should build with AI and still answer for the result. This paper's answer is the gated lifecycle: NBN's eight stages opened into 44 tasks, each with a colour that says who decides, a gate that says what must be true before the next task starts, and a holder that makes the gate hold, which an instruction file never does. We built the gates into a live repository, took one feature, the fault report, through stages 5 to 7, and then built a feature three ways in each of two trials, the second under a registered prediction and an independent review. The prediction was not supported, but the trial showed something a team can act on: two builds passed every automated check and stored nothing, and only a person who reloaded the page found it. A team adopting the lifecycle installs the hooks, checks and merge rules once, then makes four decisions for every feature.

## 2. What each chapter lets you do

| Chapter | What you can do or decide after reading it |
| --- | --- |
| 1. Requirements and brief traceability | Trace each line of Alessio Bonti's brief of 15 Aug 2026 to the chapter that answers it, and tell what was demonstrated from what is incomplete or undecided |
| 2. The lifecycle and gates | Read the map and any gate on it: every task from stage 5 on names what must be true before the next one starts and what holds it, and instruction text holds nothing |
| 3. The manual, stages 5 to 8 | Run each task in stages 5 to 8 with Copilot: its steps, gate, holder, failure mode and a worked example from our own runs |
| 4. Proof of concept | Tell a passing test suite from permission to merge and from acceptance of deployed behaviour, using the fault report's trace. Its AC2 correction and retest are still open |
| 5. Trial one (research paper, section 4.5) | See why a cost figure needs its escaped issues beside it: the cheapest of three builds of the fault report was the one whose builder spent no time reviewing, and it let the most through |
| 6. Trial two | See what the gates did not catch: only the gated build stored its data, met 14 of 14 criteria and held 18 of 18 attacks, and no gate caught any of the 15 findings before merge |
| 7. Results and cost | Budget a team's AI work: people's time is most of the cost, and reviewing one trial two build cost about twenty times the AI-only build's whole cost |
| 8. Governance | Put four names on every change: the repository holds the author, the agent and the approver, and only a person keeping the AI register holds the accountable owner |
| 9. Limits (research paper, section 6) | Weigh the evidence: one build per method, build C's stages ran as an instruction file its own builder approved, the ruleset gated one lane, and the hourly rate is assumed |

## 3. The four decisions

Install the git hooks, the CI checks and the `main` ruleset once (chapter 3, section 3). Then, for every feature, a person decides:

1. The issue has testable criteria and an out-of-scope list (task 5.3).
2. No code is written before a plan is approved (task 6.1).
3. Two people who did not write the code approve it (task 6.4).
4. Someone asks whether the tests would fail if the code were wrong, and reloads the page (task 7.4).

## 4. What is still open

| # | Open item | Where it is |
| --- | --- | --- |
| 1 | No NBN team has used the method; the first step is one NBN Copilot team on a real feature, with a second person approving each plan | Handover Document (`20 - SDLC Using AI - handover.docx`, 28 Oct 2026), section 9.5 |
| 2 | The trial two hardening, including the AI Attribution check, and open pull request #72 are not on `main` | Handover Document (`20 - SDLC Using AI - handover.docx`, 28 Oct 2026), section 9.4 |
| 3 | The fault report's AC2 correction and retest | Chapter 4, section 5 |
| 4 | The trial two review record (PR #75) is a draft and the registered prediction (PR #73) is not on `main`; the reading of AC01 and AC11 is undecided | Chapter 6, section 5 |

## 5. Claims and evidence

| # | Claim, in the summary's words | Section | Evidence | Status |
| --- | --- | --- | --- | --- |
| 1 | The map is NBN's eight stages opened into 44 tasks, each with a colour, a gate and a holder | 1, 2 | `docs/white-paper/02-lifecycle-and-gates.md`, section 1; `docs/research/lifecycle-task-map.md` | Run |
| 2 | Two builds passed every automated check and stored nothing; the gated build met 14 of 14 and held 18 of 18 attacks; no gate caught any finding before merge | 1, 2 | Chapter 6, sections 1 and 3.3; `docs/research/trial-two/review/README.md` (PR #75) | Run once |
| 3 | The registered prediction held on one measure of three and is not supported | 1 | Chapter 6, section 3.3; `docs/white-paper/research-paper.md`, section 4.7 | Run once |
| 4 | Reviewing one trial two build cost about twenty times the AI-only build's whole cost | 2 | Chapter 7, section 3.3 | Run once |
| 5 | The cheapest trial one build per criterion was the one whose builder spent no time reviewing, and it let the most through | 2 | `docs/white-paper/research-paper.md`, section 4.5 | Run once |
| 6 | The four decisions per feature | 3 | `docs/white-paper/research-paper.md`, section 7; `docs/white-paper/03-manual.md` | Run |
| 7 | The open items | 4 | Handover Document (`20 - SDLC Using AI - handover.docx`, 28 Oct 2026), sections 9.4 and 9.5; chapter 4, section 5; chapter 6, section 5 | Run |
