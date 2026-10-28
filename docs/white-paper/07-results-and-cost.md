# 7. Results and cost

**Owner:** Sidney Zeng
**Planner card:** [PM] - Results and cost analysis, and governance chapter : 240
**Status:** Ready for review
**Checked against:** `main` at `3c6fd4d`, 27 Oct 2026. `Peepachuu/nbn-sdlc-demo#73` at `48fff18` (the registered prediction). `Peepachuu/nbn-sdlc-demo#75` at `8953c02` (the trial two protocol, run sheets and independent review). The three trial two builds at their frozen commits: `9ahmedfr/nbn-run2-ai-only` at `f1611e0`, `Chirag123213/nbn-run2-copy-paste-1` at `ed173dc` and `Peepachuu/nbn-run2-gated` at `40c65f5`, read 27 Oct 2026. Pull request numbers are on the team repository, now `Chirag123213/nbn-sdlc-demo`; older references to `Peepachuu/nbn-sdlc-demo` redirect.
**Feeds from:** `docs/research/fault-reporting/evidence/run-2026-09-27/usage-and-time-estimates.md`, `docs/research/fault-reporting/credit-log.md`, `docs/reports/governance-and-token-model.md`, `docs/AI-register.md`, `docs/research/trial-two/predictions.md` (PR #73), the research paper's section 4.5 (chapter 5 was folded into the paper on 23 Oct 2026), and `trial-two-run-sheet.xlsx` (Teams library, `ab. Main Project Deliverables/Sprint 3`), whose trial one figures come from `showcase-run-sheet.xlsx` as summarised in the Sprint 3 handover of 5 Oct 2026. For trial two: `docs/research/trial-two/run-sheets/run-sheet-lane-A-Ahmed.xlsx` and `docs/research/trial-two/review/README.md` (PR #75), and in the build repositories `docs/research/technician-dispatch/evidence/run-log.xlsx` (builds B and C), `token-usage.md` (build B), `start_tokens.png` and `end_tokens.png` (build C).

---

## 1. In one paragraph

What an AI-assisted feature costs is mostly what a person's time costs. In trial one the same fault report cost A$30.11, A$76.94 or A$163.72 to build depending on the method, and the AI's part of each was between A$5.27 and A$11.78. In trial two the AI-only build cost A$5.66, all of it tokens, and did not store anything the brief asked it to keep, while checking any one build took the independent reviewer about an hour, A$100 to A$125 at A$100 an hour. In both trials the cheapest build was the one whose builder spent no time reviewing, so a cost per build means little without the escaped issues and the review beside it. If you are deciding what an AI-assisted team will cost, budget the reviewer's minutes first and the tokens second.

## 2. What this chapter covers

| Covered | Not covered, and where it is instead |
| --- | --- |
| How a build's cost is worked out: the rates and the formula | How to record usage and time as you go: chapter 8 |
| What the proof of concept recorded about its time and AI Credits | How the proof of concept ran: chapter 4 |
| Trial one's cost per build, per criterion met and by part | What trial one found about quality: the research paper, section 4.5 |
| Trial two's cost per build, per criterion met and by part, with the independent review's time beside it | Trial two's results and whether the prediction held: chapter 6 |
| What the cost figures cannot show | Copilot pricing on an enterprise plan: not tested, section 5 |

## 3. The chapter

### Pattern B: what we ran and what it showed

#### 3.1 The question

What does building one feature with AI cost, and how much of that cost is the AI? The registered prediction for trial two records cost in AUD and tokens against trial one but does not use them to decide the test (`docs/research/trial-two/predictions.md`, "Recorded, not tested", `Peepachuu/nbn-sdlc-demo#73` at `48fff18`). This chapter reports them.

#### 3.2 What was done

| Item | Value |
| --- | --- |
| Who | Sidney Zeng worked out the costs. The builders recorded their own time and usage: Zafir Hasan for the proof of concept; Ahmed Falulur Rahuman, Chirag Wadehra and Zafir Hasan for builds A, B and C in both trials. Zac Clarkson logged his own review time in trial two |
| When | Proof of concept: GitHub usage dated 27 Sep to 2 Oct 2026. Trial one: builds finished for the showcase on 1 Oct 2026. Trial two: builds on 17 and 18 Oct 2026, frozen on 18 Oct 2026, reviewed on 18 and 20 Oct 2026. Analysis: trial one on 18 Oct 2026, trial two on 27 Oct 2026 |
| Repository and start commit | Proof of concept: `Peepachuu/nbn-sdlc-demo`, the fault report (PR #63). Trial one: the three showcase repositories (`docs/AI-register.md`, AI-04). Trial two: `9ahmedfr/nbn-run2-ai-only` at `ccfb2ca`, `Chirag123213/nbn-run2-copy-paste-1` at `8aa27a3` and `Peepachuu/nbn-run2-gated` at `c96e3b2`, frozen at `f1611e0`, `ed173dc` and `40c65f5` |
| Tool, lane and model | Proof of concept: GitHub Copilot Desktop App with GPT 5.6 Luna, as Zafir Hasan confirmed on 23 Oct 2026; the credit log says Copilot CLI with no model disclosed. Both trials: Codex for builds A and C, ChatGPT for build B, GPT-5.6 Sol at high effort as instructed, for trial one in `docs/AI-register.md` (AI-04) and for trial two in the review protocol, section 9, decision 3 (PR #75). Four trial two records name GPT-5 instead (chapter 6, section 3.2) |
| Time limit | Trial one: four hours of active time per build. Trial two: a four-hour estimate and a six-hour cap |
| What counted as done | A build's cost is its active human minutes at the people rate, plus its tokens at OpenAI's list price converted to AUD. Active human minutes are active plus reviewing; waiting and setup are logged but not counted. Codex reports cached input inside its input count, so input is priced net of cached input. The rates are below. Approval time for build C and the independent review are reported beside the total, not inside it |

The rates every figure uses (`trial-two-run-sheet.xlsx`, Rates tab):

| Item | Value | Source |
| --- | --- | --- |
| People | A$100 an hour | Trial one's rate. Not confirmed with Alessio Bonti, so the paper treats it as the team's assumption (`Peepachuu/nbn-sdlc-demo#75`, section 9, decision 4) |
| Input tokens | US$4 per million | OpenAI list price, as used in trial one. Retrieval date not recorded |
| Cached input tokens | US$0.40 per million | As above |
| Output tokens | US$20 per million | As above |
| US$ to A$ | 1.42 | Trial one's rate. Date not recorded |

#### 3.3 What happened

**The proof of concept.** The fault report's time and usage were written up on 2 Oct 2026, after the run, from figures Zafir Hasan supplied. They are run-level totals, not per-stage readings.

| Measure | Result | Evidence | Status |
| --- | --- | --- | --- |
| Generating time, including prompting | About 240 minutes | `docs/research/fault-reporting/evidence/run-2026-09-27/usage-and-time-estimates.md` | Estimate (Zafir Hasan) |
| Zafir Hasan's review time | About 35 minutes | As above | Estimate (Zafir Hasan) |
| AI Credits, GitHub daily totals, 27 Sep to 2 Oct 2026 | 69.05 AI Credits | As above | Run once |
| Displayed amount for those credits | $0.69, currency not stated | As above | Run once |
| Usage cells in the credit log | All "Pending" | `docs/research/fault-reporting/credit-log.md` | Run |

The proof of concept is not priced in AUD. Its 240 minutes mix a person prompting with the agent working, so they cannot be priced as a person's time. If all 275 minutes had been a person's, they would cost A$458 at A$100 an hour, which is an upper bound. Its AI usage is in AI Credits, which the paper does not convert into dollars.

**Trial one.** One build per method, on the fault report, with GPT-5.6 Sol at high effort.

| Measure | A: AI only | B: copy and paste | C: framework | Evidence | Status |
| --- | --- | --- | --- | --- | --- |
| Active human minutes | 11 | 94 | 43 | Run sheet | Run once |
| Of which reviewing | 0 | 34 | 25 | Run sheet | Run once |
| People, A$ | 18.33 | 156.67 | 71.67 | Minutes x A$100 an hour | Run once |
| AI, A$ | 11.78 | 7.05 | 5.27 | Tokens x list price x 1.42 | A and C: Run once. B: Estimate |
| Total, A$ | 30.11 | 163.72 | 76.94 | Run sheet | Run once |
| AI share of the total | 39% | 4% | 7% | AI over total | Run once |
| Feature criteria met, of 10 | 9 | 10 | 10 | Run sheet | Run once |
| Cost per criterion met, A$ | 3.35 | 16.37 | 7.69 | Total over criteria met | Run once |
| Issues that escaped review | 3 | 1 | 0 | Run sheet | Run once |

Run sheet: `showcase-run-sheet.xlsx`, as summarised in the Sprint 3 handover of 5 Oct 2026. These figures have not yet been checked against the run sheet itself (section 5).

Three things stand out. People's time was most of every build's cost: 61 percent in build A, 96 percent in build B and 93 percent in build C. The AI part moved the other way to the human part: build A used the most tokens and the least human time. And the ranking by cost is not the ranking by outcome. Build A was cheapest per criterion met at A$3.35 and let three issues through; build C cost A$7.69 per criterion and let none through. A cost figure without the escaped issues beside it would have recommended the build that was checked least.

**Trial two.** One build per method, on technician dispatch, 14 feature criteria instead of 10. Each builder logged time as they went, in Melbourne time, in their run log.

| Measure | A: AI only | B: copy and paste | C: framework | Evidence | Status |
| --- | --- | --- | --- | --- | --- |
| Active human minutes | 0 | 51 | 36 | A: `docs/research/trial-two/run-sheets/run-sheet-lane-A-Ahmed.xlsx`, Log tab (PR #75). B and C: `docs/research/technician-dispatch/evidence/run-log.xlsx` in each build repository | Estimate (builder's log) |
| Of which reviewing | 0 | 10 | 23 | As above | Estimate (builder's log) |
| Waiting, not counted | 14 | 11 | 21 | As above | Estimate (builder's log) |
| Setup, not counted | 65 | Not logged | 32 | As above | Estimate (builder's log) |
| People, A$ | 0.00 | 85.00 | 60.00 | Minutes x A$100 an hour | Estimate |
| AI, A$ | 5.66 | 1.36, a floor | Not recorded | Tokens x list price x 1.42 | A: Run once. B: Estimate. C: no token counts |
| Total, A$ | 5.66 | 86.36, a floor | 60.00 plus the AI part | People plus AI | Estimate |
| AI share of the total | 100% | About 2% | Not known | AI over total | Estimate |
| Feature criteria met, of 14 | 12 | 12 | 14 | `docs/research/trial-two/review/README.md` (PR #75) | Run once |
| Cost per criterion met, A$ | 0.47 | 7.20 | 4.29 plus the AI part | Total over criteria met | Estimate |
| Issues that escaped review | 4 | 4 | 4 | As above, counted under decision 5 | Run once |
| Independent review, reported beside the total | About 70 minutes, A$116.67 | About 60 minutes, A$100.00 | About 75 minutes, A$125.00 | As above, reviewer time log | Run once |
| Approval by Sidney Zeng, reported beside the total | n/a | n/a | Not recorded | Build C's run log, Events tab, is empty | Run once |

How the AI figures were worked out:

- **Build A.** Codex read 6,666,353 input tokens, 6,534,272 of them from cache, and wrote 42,060 output tokens. That is 132,081 uncached input at US$4 per million, 6,534,272 cached at US$0.40 and 42,060 output at US$20: US$3.98, or A$5.66.
- **Build B.** ChatGPT shows no token figures. Chirag Wadehra's export counts 106,814 tokens at about four characters per token: 73,523 the model read (his prompts and the tool output) and 33,291 it wrote (its replies and tool calls). At US$4 and US$20 per million that is US$0.96, or A$1.36. It is a floor: the model re-reads the conversation on every turn, and its reasoning is not in the export.
- **Build C.** No token counts were recorded. Codex showed only how much of the plan's allowance was left: the five-hour allowance went from 97 to 11 percent and the weekly allowance from 99 to 86 percent.

Three things stand out. The AI-only build was the cheapest in either trial, A$5.66 in total, because its builder logged no active or reviewing minutes; it met 12 of 14 criteria and stored nothing. Review was the largest cost wherever it was measured: the independent review of one build took about an hour, A$100 to A$125, which is about twenty times the AI-only build's whole cost. And the ranking by cost is again not the ranking by outcome. The gated build cost its builder A$60 of time plus tokens that were not recorded, and it was the only build to meet all 14 criteria and hold all 18 attacks. Each build let four counted issues through, so in trial two the escaped issues do not separate the methods; what the review found does, a missing data store in builds A and B and five low-severity findings in build C.

#### 3.4 What this does not show

- **One build per method, one builder each, one feature per trial.** Each figure is an observation, not a rate, and the builder cannot be separated from the method.
- **Self-logged time, written late in trial one.** Trial one's times and usage were written down from memory two days after the builds (Zac Clarkson, team channel, 16 Oct 2026). Trial two's builders logged as they went.
- **Build B's tokens are an estimate in both trials.** ChatGPT shows no token figures, so build B's AI cost comes from its chat transcript. In trial two, Chirag Wadehra's estimate counts the transcript once at about four characters per token, which is not how trial one's 1.13M was worked out, so the two trials' B figures do not compare and trial two's is a floor.
- **Build C's trial two tokens were not recorded.** The plan-allowance percentages cannot be turned into tokens without the plan's limits, so build C's total and cost per criterion are people's time only.
- **Cached input is priced net.** Trial two prices input net of cached input, as Codex counts it. If trial one priced cached input on top of input, the two trials' AI figures do not compare until the Rates tab is checked (section 5).
- **The rates are assumptions.** A$100 an hour was never agreed with the client, and the price list and exchange rate have no retrieval date. Every total moves with them.
- **No invoices.** Every tool ran on a subscription plan, so the AI costs are list-price equivalents, not money spent (`docs/reports/governance-and-token-model.md`, section 7).
- **The proof of concept and the trials do not compare.** Different tool, lane, unit and feature. The proof of concept's credits are daily account totals that cannot be tied to the fault report alone.
- **An escaped issue is not priced, and neither is the rework.** The chapter reports escaped issues beside cost but does not say what one costs to find and fix later. Builds A and B in trial two would need a second cycle to store their data; that cycle was not run, so no time to a correct feature is claimed.
- **Approval time is not in either trial.** Sidney Zeng's approval of build C was not timed in trial one, and in trial two the builder approved his own stages and no approval by Sidney Zeng was logged.

#### 3.5 What the manual takes from it

- Plan capacity for the reviewer, not the tokens. Review time drove the cost of every reviewed build: the AI was 4 to 39 percent of a build's cost in trial one, and in trial two reviewing one build cost about twenty times the AI-only build's whole cost. This changes task 5.4, committing the sprint plan.
- Record review minutes as they happen, at every sitting. This changes task 6.4, review and merge approval.
- Never report a build's cost without the issues that escaped it and what the review found. The cheapest build in each trial let the most through or stored nothing. This changes task 6.4, where the approver weighs both.
- Record usage in the tool's own unit and price tokens only for comparison, with the price and its date. Read the tool's token counts at the start and the end of the build, not the plan allowance. This is the usage block in chapter 8.

## 4. Claims and evidence

| # | Claim, in the chapter's words | Section | Evidence | Status |
| --- | --- | --- | --- | --- |
| 1 | Cost and tokens are recorded against trial one but do not decide the trial two test | 3.1 | `docs/research/trial-two/predictions.md` (`Peepachuu/nbn-sdlc-demo#73` at `48fff18`) | Run |
| 2 | The rates: A$100 an hour; US$4, US$0.40 and US$20 per million input, cached and output tokens; 1.42 A$ per US$ | 3.2 | `trial-two-run-sheet.xlsx`, Rates tab (Teams library, `ab. Main Project Deliverables/Sprint 3`) | Run |
| 3 | A$100 an hour was not confirmed with the client and is the team's assumption | 3.2, 3.4 | `Peepachuu/nbn-sdlc-demo#75`, section 9, decision 4 | Run |
| 4 | Both trials were instructed to use GPT-5.6 Sol at high effort, in Codex and ChatGPT, and four trial two records name GPT-5 | 3.2 | `docs/AI-register.md`, AI-04 (trial one); `docs/research/trial-two/attacks-and-test-jobs.md`, section 9, decision 3 (trial two, PR #75); chapter 6, section 4, row 7 | Run |
| 5 | The fault report's credit log names Copilot CLI with no model; Zafir Hasan corrected this to GitHub Copilot Desktop App with GPT 5.6 Luna on 23 Oct 2026 | 3.2 | `docs/research/fault-reporting/credit-log.md`; `docs/research/fault-reporting/evidence/reconciliation-2026-10-23/README.md` on branch `docs/white-paper-proof-of-concept` | Estimate (Zafir Hasan) |
| 6 | The proof of concept took about 240 minutes of generating, including prompting, and about 35 minutes of Zafir Hasan's review | 3.3 | `docs/research/fault-reporting/evidence/run-2026-09-27/usage-and-time-estimates.md` | Estimate (Zafir Hasan) |
| 7 | GitHub's daily totals for 27 Sep to 2 Oct 2026 came to 69.05 AI Credits, displayed as $0.69 | 3.3 | As above | Run once |
| 8 | Every usage cell in the fault report's credit log says "Pending" | 3.3 | `docs/research/fault-reporting/credit-log.md` at `44557a3` | Run |
| 9 | Trial one's active human minutes were 11, 94 and 43, of which 0, 34 and 25 were reviewing | 3.3 | `showcase-run-sheet.xlsx`, via the Sprint 3 handover of 5 Oct 2026 | Run once |
| 10 | Trial one's totals were A$30.11, A$163.72 and A$76.94, with AI parts of A$11.78, A$7.05 and A$5.27 | 1, 3.3 | As above | Run once; build B's AI part: Estimate |
| 11 | Trial one met 9, 10 and 10 of 10 feature criteria, and 3, 1 and 0 issues escaped | 1, 3.3 | As above | Run once |
| 12 | People's time was 61, 96 and 93 percent of the trial one builds' costs | 3.3 | Arithmetic on rows 9 and 10 | Run once |
| 13 | Cost per criterion met was A$3.35, A$16.37 and A$7.69 | 3.3 | Arithmetic on rows 10 and 11 | Run once |
| 14 | Trial one's times and usage were written down from memory two days after the builds | 3.4 | Zac Clarkson, team channel, 16 Oct 2026 | Estimate (Zac Clarkson) |
| 15 | ChatGPT shows no token figures, so build B's AI cost is a transcript estimate | 3.3, 3.4 | `docs/research/technician-dispatch/evidence/run-log.xlsx`, Log tab, Tokens, on `Chirag123213/nbn-run2-copy-paste-1` at `ed173dc` | Run |
| 16 | Chirag Wadehra's trial two estimate counts the transcript once at about four characters per token: 106,814 tokens, 73,523 read and 33,291 written | 3.3, 3.4 | `docs/research/technician-dispatch/evidence/token-usage.md` on `Chirag123213/nbn-run2-copy-paste-1` at `ed173dc` | Estimate (Chirag Wadehra) |
| 17 | Every tool ran on a subscription plan, so there is no invoice | 3.4 | `docs/reports/governance-and-token-model.md`, section 7 | Run |
| 18 | Trial two's active human minutes were 0, 51 and 36, of which 0, 10 and 23 were reviewing; waiting was 14, 11 and 21 minutes | 3.3 | `docs/research/trial-two/run-sheets/run-sheet-lane-A-Ahmed.xlsx` (PR #75); `docs/research/technician-dispatch/evidence/run-log.xlsx` on `Chirag123213/nbn-run2-copy-paste-1` at `ed173dc` and `Peepachuu/nbn-run2-gated` at `40c65f5` | Estimate (builders' logs) |
| 19 | Build A used 6,666,353 input tokens, 6,534,272 of them cached, and 42,060 output tokens | 3.3 | `docs/research/trial-two/run-sheets/run-sheet-lane-A-Ahmed.xlsx`, Log tab, Tokens (PR #75) | Run once |
| 20 | Build C recorded plan allowance, not tokens: the five-hour allowance went from 97 to 11 percent left and the weekly from 99 to 86 percent | 3.3, 3.4 | `docs/research/technician-dispatch/evidence/start_tokens.png` and `end_tokens.png` on `Peepachuu/nbn-run2-gated` at `40c65f5`; the Tokens cells in its `run-log.xlsx` are empty | Run once |
| 21 | Trial two's AI parts were A$5.66 for build A and at least A$1.36 for build B, and its totals A$5.66, at least A$86.36, and A$60.00 plus build C's unrecorded AI part | 1, 3.3 | Arithmetic on rows 2, 16, 18, 19 and 20 | Estimate |
| 22 | Trial two met 12, 12 and 14 of 14 feature criteria, and 4, 4 and 4 counted issues escaped | 3.3 | `docs/research/trial-two/review/README.md` (PR #75) | Run once |
| 23 | The independent review took about 70, 60 and 75 minutes per build, A$100 to A$125 at A$100 an hour | 1, 3.3, 3.5 | As above, reviewer time log | Run once |
| 24 | Reviewing one build cost about twenty times the AI-only build's total | 3.3, 3.5 | Arithmetic on rows 21 and 23 | Estimate |

## 5. Limits and open questions

| # | Limit or open question | Owner | What it blocks |
| --- | --- | --- | --- |
| 1 | Trial one's figures have not been checked against `showcase-run-sheet.xlsx` itself, only the handover's summary | Sidney Zeng | Section 3.3; the research paper, section 4.5 |
| 2 | A$100 an hour is the team's assumption until the client agrees a rate | Sidney Zeng, to confirm with Alessio Bonti | Every A$ figure |
| 3 | The OpenAI price list and the exchange rate have no retrieval date | Sidney Zeng | Every AI figure |
| 4 | Build C's trial two AI usage was recorded as plan allowance, not tokens | Zafir Hasan | Build C's AI part, total and cost per criterion |
| 5 | Build B's trial two token figure is a transcript estimate and a floor, worked out differently from trial one's | Chirag Wadehra, Sidney Zeng | Comparing build B across the trials |
| 6 | Whether trial one priced input net of cached input, as trial two does, is not yet checked against the Rates tab | Sidney Zeng | Comparing the AI figures across the trials |
| 7 | The proof of concept's credits are daily account totals and its times are retrospective estimates | Zafir Hasan | Section 3.3 |
| 8 | What an esca