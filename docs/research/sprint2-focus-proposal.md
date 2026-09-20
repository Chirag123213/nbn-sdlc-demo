# Sprint 2 focus: three stages, a hypothesis each, and how we would measure it

**Owner:** Zac Clarkson (UX)
**Status:** Proposal, 8 Sep 2026. For Sidney to check with Dr Ben and Alessio before the 12 Sep playback.
**Source:** D3 section 11 (Sprint 2 paragraph), section 10 (open items), the task map (`docs/research/lifecycle-task-map.md`).

> The decision. Three pulls on Sprint 2 point in different directions. Leon wants depth on ideation and the business case (Stage 1). Alessio's remit is GitHub and Claude Code, which is Stages 5 to 7. D3 section 11 says two or three stages, not eight, and that the team has to make its own evidence, but the measurement has not been designed. This page proposes the stages, the hypothesis per stage and the measurement, so the focus can be checked this week rather than after the playback.

## Proposal

Stages 6 and 7 in depth, as the benchmark. Stage 1 as the front stage, at interview and session depth, without a benchmark. Stages 5 and 8 held at the depth the map already gives them.

Why these three. Stages 6 and 7 hold every green row the map cannot yet defend (6.2, 6.3, 7.2, 7.5) and the one red row with a hard ceiling (7.4, "are the tests correct?"). They are the only stages where this repository can produce evidence inside three weeks. Stage 1 is where Leon asked for depth and where nobody at NBN has written the tasks down, and its evidence comes from interviews and a run-through, not from timed runs. Stage 5 is not dropped: its most important row, 5.3 (write the issue properly), is measured for free inside the Stage 6 runs, because issue quality is what decides how many files the agent touches.

## Stage 6, Development and build

Hypothesis. On the same issue, the agent with the repository's skills, rules and hooks produces a PR that needs fewer review changes and less reviewing time than the agent without them, at comparable token spend. Second hypothesis, the one 6.2 green depends on: the hooks catch every seeded violation (lint, format, commit format, secret).

Measurement. Three issues from the capstone backlog, two conditions (harness on, harness off), three runs each, eighteen runs. Per run: generating time, reviewing time, tokens (Zafir's INF-6a figures), review comments before mergeable, files touched against the issue's out-of-scope list, seeded violations caught. The reviewer is not the operator.

Defended if. Hooks catch all seeded violations, and change-failure rate across merged runs is under 5 percent (slice 1, recommendation 4). Otherwise 6.2 moves to amber and the map says why.

## Stage 7, Testing and QA

Hypothesis. Tests the agent writes score lower under mutation testing than a green CI run suggests, and a reviewer who sees the mutation score makes a different accept decision from one who sees only the green run. That is the evidence 7.4 needs to stay red with a number behind it.

Measurement. Stryker with the Vitest runner over the unit tests each Stage 6 run produced, giving a mutation score per run. An adversarial sub-agent pass (7.3) against each PR with two seeded defects, recording found and missed. The reviewer's accept decision recorded before and after the mutation score is shown.

Defended if. 7.2 and 7.5 stay green because CI holds them. 7.4 stays red with the score attached. 7.1 stays amber if the score sits below a floor set in week 1 from the human-written suite's own score.

## Stage 1, Ideation and business case

Hypothesis. Divergent option generation (1.3) can be green because the human screen catches fabricated industry examples cheaply; the real cost sits in 1.4, where every citation has to verify.

Measurement. One design-sprint-shaped session on the technician dispatch story, the team standing in for NBN, followed by the interview questions Ahmed already holds (question 1 for current tooling, question 4 for what people check before accepting AI work). Record: options generated, options surviving the human screen, the fraction of AI-cited examples that verify (the citation-audit method from slice 1), and time from brief to backed option.

Defended if. Every fabricated example is caught before sign-off (1.5). If one reaches sign-off, 1.3 moves to amber. No productivity claim is made from a single session.

## Shape of the three weeks

- Week 1: interviews (Ahmed), the Emily invite Dr Ben asked for, the Stage 1 session, and the instrument: Stryker installed, issue set chosen, seeded violation list, timing sheet. Telecommunications Act fetch (Zac).
- Week 2: the eighteen Stage 6 runs.
- Week 3: Stage 7 passes over the week 2 output, analysis, write-up, and the Atlassian source note only if the benchmark is to be presented as four-way.

## What is not proposed

Eight stages. The Stage 4 accessibility box. Stage 8, which is marked unvalidated on the map and needs rollout infrastructure the team does not have. Any productivity figure presented as transferring to NBN.

## Three questions for Dr Ben and Alessio

1. Stage 1 in, as Leon asked, or Stage 5 in its place, as Alessio's remit suggests? This page argues Stage 1, because 5.3 is measured inside the Stage 6 runs anyway.
2. Is this repository an acceptable proxy, or can Alessio supply one NBN-shaped issue with sanitised context? The evidence transfers better with the second.
3. Tokens reported as counts or as dollars? The register in module 6.9 wants cost per use, which needs a rate Alessio would have to give us.
