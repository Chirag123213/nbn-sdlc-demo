# Trial two: registered prediction

**Registered by:** Sidney Zeng (PM)
**Registration:** the pull request that adds this file, opened before the first build: `Chirag123213/nbn-sdlc-demo#[number]`. GitHub records when it was opened, so the date does not rest on our word.
**Planner card:** [PM] - Trial two protocol, registered prediction and trial one evidence chapter : 240
**Protocol:** `docs/research/trial-two/protocol.md`
**Criteria:** `docs/research/trial-two/acceptance-criteria.md`, frozen by Ahmed Falulur Rahuman (freeze commit `[hash]`)

Nobody edits this file after the first build starts. A change goes in the table at the bottom, with the date, who decided and why.

---

## The prediction

On the bigger feature, the three builds will end up further apart than they did in trial one, by more than the feature grew.

## How it is measured

**Feature size** is the number of feature criteria: 10 in trial one, and 14 in trial two (T2-AC01 to T2-AC14). T2-AC15 to T2-AC17 cover the trial's evidence, not the feature, so they are not counted. A build without a working preview (T2-AC15) has all 14 counted as not met (protocol, section 2).

**Spread** on a measure is the highest build's result minus the lowest build's result, divided by feature size.

Three measures decide the test: what got through, what was finished, and how much human time it took.

| Measure | Trial one: A, B, C | Trial one spread per criterion | Trial two needs a gap of at least |
| --- | --- | --- | --- |
| Issues that escaped, found in the independent review | 3, 1, 0 | 0.30 | 5 issues |
| Feature criteria not met | 1, 0, 0 | 0.10 | 2 criteria |
| Active human minutes | 11, 94, 43 | 8.3 | 117 minutes |

Trial one figures: `showcase-run-sheet.xlsx`, as summarised in the Sprint 3 handover on 5 Oct 2026. The last column is the smallest whole number above trial one's spread per criterion times 14.

## What counts as supported

- **Supported:** trial two's spread per criterion is higher than trial one's on at least two of the three measures.
- **Not supported:** higher on one measure or none.
- **Grew only with size:** if the raw gap grew but the gap per criterion did not, we report that the difference grew in proportion to the feature, not faster. That does not support the prediction.

## Expected direction

These are directions, not part of the test.

- Build A, AI only: more escaped issues and unmet criteria per criterion than in trial one.
- Build B, copy and paste: the most active human minutes again.
- Build C, framework: zero or one escaped issue, and fewer total tokens than build A, as in trial one.

## Recorded, not tested

Cost in AUD, tokens, elapsed time, tests written, attacks blocked and the seeded defect are reported against trial one where trial one has a figure, but do not decide the test. The mutation score is new in trial two.

## Limits, stated before the run

- One build per method, the same three builders as trial one, one feature. Either result is an observation, not a rate.
- Each method has one builder, so the builder and the method cannot be separated.
- The comparison holds only if trial two counts escaped issues, minutes and criteria the same way trial one did (protocol, section 6).

## Changes after registration

| Date | Change | Decided by | Why |
| --- | --- | --- | --- |
| | | | |