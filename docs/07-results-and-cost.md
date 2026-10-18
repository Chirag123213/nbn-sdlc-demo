# 7. Results and cost

**Owner:** Sidney Zeng
**Planner card:** [PM] - Results and cost analysis, and governance chapter : 240
**Status:** Draft
**Checked against:** `main` at `44557a3`, 18 Oct 2026. `Peepachuu/nbn-sdlc-demo#73` at `48fff18` (the registered prediction). `Peepachuu/nbn-sdlc-demo#75` at `0b349ca`.
**Feeds from:** `docs/research/fault-reporting/evidence/run-2026-09-27/usage-and-time-estimates.md`, `docs/research/fault-reporting/credit-log.md`, `docs/reports/governance-and-token-model.md`, `docs/AI-register.md`, `docs/research/trial-two/predictions.md` (PR #73), chapter 5, and `trial-two-run-sheet.xlsx` (Teams library, `ab. Main Project Deliverables/Sprint 3`), whose trial one figures come from `showcase-run-sheet.xlsx` as summarised in the Sprint 3 handover of 5 Oct 2026.

---

## 1. In one paragraph

What an AI-assisted feature costs is mostly what a person's time costs. In trial one the same fault report cost A$30.11, A$76.94 or A$163.72 to build depending on the method, and the AI's part of each was between A$5.27 and A$11.78. Everything else was people's time at A$100 an hour. The cheapest build was the one nobody reviewed, and it was also the one that let three issues through, so a cost per build means little without the escaped issues beside it. If you are deciding what an AI-assisted team will cost, budget the reviewer's minutes first and the tokens second. Trial two's figures go into this chapter once Zac Clarkson's review closes.

## 2. What this chapter covers

| Covered | Not covered, and where it is instead |
| --- | --- |
| How a build's cost is worked out: the rates and the formula | How to record usage and time as you go: chapter 8 |
| What the proof of concept recorded about its time and AI Credits | How the proof of concept ran: chapter 4 |
| Trial one's cost per build, per criterion met and by part | What trial one found about quality: chapter 5 |
| Where trial two's cost figures will go, and how they will be compared | Trial two's results and whether the prediction held: chapter 6 |
| What the cost figures cannot show | Copilot pricing on an enterprise plan: not tested, section 5 |

## 3. The chapter

### Pattern B: what we ran and what it showed

#### 3.1 The question

What does building one feature with AI cost, and how much of that cost is the AI? The registered prediction for trial two records cost in AUD and tokens against trial one but does not use them to decide the test (`docs/research/trial-two/predictions.md`, "Recorded, not tested", `Peepachuu/nbn-sdlc-demo#73` at `48fff18`). This chapter reports them.

#### 3.2 What was done

| Item | Value |
| --- | --- |
| Who | Sidney Zeng worked out the costs. The builders recorded their own time and usage: Zafir Hasan for the proof of concept; Ahmed Falulur Rahuman, Chirag Wadehra and Zafir Hasan for builds A, B and C in both trials |
| When | Proof of concept: GitHub usage dated 27 Sep to 2 Oct 2026. Trial one: builds finished for the showcase on 1 Oct 2026. Trial two: builds on 17 and 18 Oct 2026, frozen on 18 Oct 2026. Analysis: 18 Oct 2026 |
| Repository and start commit | Proof of concept: `Peepachuu/nbn-sdlc-demo`, the fault report (PR #63). Trial one: the three repositories named in chapter 5. Trial two: `9ahmedfr/nbn-run2-ai-only` at `ccfb2ca`, `Chirag123213/nbn-run2-copy-paste-1` at `8aa27a3` and `Peepachuu/nbn-run2-gated` at `c96e3b2` |
| Tool, lane and model | Proof of concept: Copilot CLI, model not disclosed by the interface (`docs/research/fault-reporting/credit-log.md`). Both trials: Codex for builds A and C, ChatGPT for build B, GPT-5.6 Sol at high effort (`docs/AI-register.md`, AI-04) |
| Time limit | Trial one: four hours of active time per build. Trial two: a four-hour estimate and a six-hour cap |
| What counted as done | A build's cost is its active human minutes at the people rate, plus its tokens at OpenAI's list price converted to AUD. The rates are below. Approval time for build C is reported beside the total, not inside it |

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

**Trial two.** The figures go in once the run records close at 12:00 on 19 Oct 2026 and Zac Clarkson's review is done. The table is the same as trial one's, with 14 feature criteria instead of 10.

| Measure | A: AI only | B: copy and paste | C: framework | Evidence | Status |
| --- | --- | --- | --- | --- | --- |
| Active human minutes | Pending | Pending | Pending | Each build's `run-log.xlsx` | |
| Of which reviewing | Pending | Pending | Pending | As above | |
| People, A$ | Pending | Pending | Pending | Minutes x A$100 an hour | |
| AI, A$ | Pending | Pending | Pending | Tokens x list price x 1.42 | |
| Total, A$ | Pending | Pending | Pending | `trial-two-run-sheet.xlsx`, Builds tab | |
| Approval by Sidney Zeng, A$, reported beside the total | n/a | n/a | Pending | `trial-two-run-sheet.xlsx`, Builds tab | |
| Feature criteria met, of 14 | Pending | Pending | Pending | Zac Clarkson's review | |
| Cost per criterion met, A$ | Pending | Pending | Pending | Total over criteria met | |
| Issues that escaped review | Pending | Pending | Pending | Zac Clarkson's review | |

#### 3.4 What this does not show

- **One build per method, one builder each, one feature per trial.** Each figure is an observation, not a rate, and the builder cannot be separated from the method.
- **Self-logged time, written late in trial one.** Trial one's times and usage were written down from memory two days after the builds (Zac Clarkson, team channel, 16 Oct 2026). Trial two's builders logged as they went.
- **Build B's tokens are an estimate.** ChatGPT shows no token figures, so build B's AI cost comes from its chat transcript. In trial two, Chirag Wadehra's own estimate counts the transcript once at about four characters per token, which is not how trial one's 1.13M was worked out.
- **The rates are assumptions.** A$100 an hour was never agreed with the client, and the price list and exchange rate have no retrieval date. Every total moves with them.
- **No invoices.** Every tool ran on a subscription plan, so the AI costs are list-price equivalents, not money spent (`docs/reports/governance-and-token-model.md`, section 7).
- **The proof of concept and the trials do not compare.** Different tool, lane, unit and feature. The proof of concept's credits are daily account totals that cannot be tied to the fault report alone.
- **An escaped issue is not priced.** The chapter reports escaped issues beside cost but does not say what one costs to find and fix later.
- **Approval time is not in trial one.** Sidney Zeng's approval of build C was not timed in trial one.

#### 3.5 What the manual takes from it

- Plan capacity for the reviewer, not the tokens. Review time drove the cost of every reviewed build, and the AI was 4 to 39 percent of a build's cost. This changes task 5.4, committing the sprint plan.
- Record review minutes as they happen, at every sitting. This changes task 6.4, review and merge approval.
- Never report a build's cost without the issues that escaped it. The cheapest build in trial one let the most through. This changes task 6.4, where the approver weighs both.
- Record usage in the tool's own unit and price tokens only for comparison, with the price and its date. This is the usage block in chapter 8.

## 4. Claims and evidence

| # | Claim, in the chapter's words | Section | Evidence | Status |
| --- | --- | --- | --- | --- |
| 1 | Cost and tokens are recorded against trial one but do not decide the trial two test | 3.1 | `docs/research/trial-two/predictions.md` (`Peepachuu/nbn-sdlc-demo#73` at `48fff18`) | Run |
| 2 | The rates: A$100 an hour; US$4, US$0.40 and US$20 per million input, cached and output tokens; 1.42 A$ per US$ | 3.2 | `trial-two-run-sheet.xlsx`, Rates tab (Teams library, `ab. Main Project Deliverables/Sprint 3`) | Run |
| 3 | A$100 an hour was not confirmed with the client and is the team's assumption | 3.2, 3.4 | `Peepachuu/nbn-sdlc-demo#75`, section 9, decision 4 | Run |
| 4 | Both trials used GPT-5.6 Sol at high effort, in Codex and ChatGPT | 3.2 | `docs/AI-register.md`, AI-04 | Run |
| 5 | The proof of concept ran on Copilot CLI, with no model name disclosed | 3.2 | `docs/research/fault-reporting/credit-log.md` | Run |
| 6 | The proof of concept took about 240 minutes of generating, including prompting, and about 35 minutes of Zafir Hasan's review | 3.3 | `docs/research/fault-reporting/evidence/run-2026-09-27/usage-and-time-estimates.md` | Estimate (Zafir Hasan) |
| 7 | GitHub's daily totals for 27 Sep to 2 Oct 2026 came to 69.05 AI Credits, displayed as $0.69 | 3.3 | As above | Run once |
| 8 | Every usage cell in the fault report's credit log says "Pending" | 3.3 | `docs/research/fault-reporting/credit-log.md` at `44557a3` | Run |
| 9 | Trial one's active human minutes were 11, 94 and 43, of which 0, 34 and 25 were reviewing | 3.3 | `showcase-run-sheet.xlsx`, via the Sprint 3 handover of 5 Oct 2026 | Run once |
| 10 | Trial one's totals were A$30.11, A$163.72 and A$76.94, with AI parts of A$11.78, A$7.05 and A$5.27 | 1, 3.3 | As above | Run once; build B's AI part: Estimate |
| 11 | Trial one met 9, 10 and 10 of 10 feature criteria, and 3, 1 and 0 issues escaped | 1, 3.3 | As above | Run once |
| 12 | People's time was 61, 96 and 93 percent of the trial one builds' costs | 3.3 | Arithmetic on rows 9 and 10 | Run once |
| 13 | Cost per criterion met was A$3.35, A$16.37 and A$7.69 | 3.3 | Arithmetic on rows 10 and 11 | Run once |
| 14 | Trial one's times and usage were written down from memory two days after the builds | 3.4 | Zac Clarkson, team channel, 16 Oct 2026 | Estimate (Zac Clarkson) |
| 15 | ChatGPT shows no token figures, so build B's AI cost is a transcript estimate | 3.4 | `docs/reports/governance-and-token-model.md`, section 6 | Run |
| 16 | Chirag Wadehra's trial two estimate counts the transcript once at about four characters per token | 3.4 | `docs/research/technician-dispatch/evidence/token-usage.md` on `Chirag123213/nbn-run2-copy-paste-1` at `ed173dc` | Run once |
| 17 | Every tool ran on a subscription plan, so there is no invoice | 3.4 | `docs/reports/governance-and-token-model.md`, section 7 | Run |
| 18 | Trial two's records close at 12:00 on 19 Oct 2026 | 3.3 | `trial-two-run-sheet.xlsx`, Deviations tab | Run |

## 5. Limits and open questions

| # | Limit or open question | Owner | What it blocks |
| --- | --- | --- | --- |
| 1 | Trial one's figures have not been checked against `showcase-run-sheet.xlsx` itself, only the handover's summary | Sidney Zeng | Section 3.3, chapter 5 |
| 2 | A$100 an hour is the team's assumption until the client agrees a rate | Sidney Zeng, to confirm with Alessio Bonti | Every A$ figure |
| 3 | The OpenAI price list and the exchange rate have no retrieval date | Sidney Zeng | Every AI figure |
| 4 | Trial two's figures wait for the records to close and for Zac Clarkson's review | Sidney Zeng, Zac Clarkson | Section 3.3, chapter 6 |
| 5 | Trial two's build C has no token counts yet, and build B's estimate is not worked out the way trial one's was | Zafir Hasan, Sidney Zeng | Trial two's AI figures |
| 6 | The proof of concept's credits are daily account totals and its times are retrospective estimates | Zafir Hasan | Section 3.3 |
| 7 | What an escaped issue costs is not measured | Sidney Zeng | Section 3.5, chapter 9 |

## 6. New terms

| Term | Meaning |
| --- | --- |
| Cost per criterion met | A build's total cost divided by the feature criteria it met |
| AI share | The AI part of a build's cost as a percentage of its total |

---

## Before you mark it ready

- [ ] Header block complete, including the commit it was checked against and the AI involvement line
- [ ] Section 1 stands alone
- [ ] Every Pattern A task has all five headings, or "Not yet" with a row in section 5
- [ ] Every number has a source, a date and a unit
- [ ] Every claim has a row in section 4, and every path in section 4 opens
- [ ] Every statement about Copilot names its lane
- [ ] Terms match `docs/reports/module-reconciliation.md` section 4
- [ ] Guidance lines and unused pattern deleted
- [ ] No em dashes