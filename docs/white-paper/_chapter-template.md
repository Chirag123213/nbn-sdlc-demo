# [Chapter number]. [Chapter title, as it appears in `README.md` section 2]

> Lines that start with `>` are guidance. Delete them before you mark the pull request ready. Square brackets are yours to replace. Rules for wording, evidence labels and numbers are in `README.md` section 3.

**Owner:** [Name]
**Planner card:** [Card title, copied exactly]
**Status:** Outline | Draft | Ready for review | Reviewed
**Checked against:** `main` at `[short commit]`, [D Mon 2026]. [Any other branch, pull request or repository you read, with its commit.]
**Feeds from:** [The files this chapter is built from, as repository paths.]
**AI involvement:** [Tool and model], given [what you gave it], drafted [which parts]. Checked by [name, not the person who prompted] on [D Mon 2026].

---

## 1. In one paragraph

> Three to five sentences. What the reader can do or decide after reading this chapter that they could not before. No background. The executive summary is assembled from these paragraphs, so write it to stand alone.

[Paragraph.]

## 2. What this chapter covers

> One table. Use D4 task ids for anything inside stages 5 to 8. "Not covered" is as useful to the reader as "covered", so fill both.

| Covered             | Not covered, and where it is instead      |
| ------------------- | ----------------------------------------- |
| [Task 6.2, commits] | [Task 6.4, review: chapter 3, section 6d] |

## 3. The chapter

> Use pattern A, pattern B, or both. Delete the one you do not use.

### Pattern A: how to do it

> For a chapter the reader follows. One block per task, in the order the reader meets them. Every block has the same five headings (ADR-002, "Full depth means"). If you cannot fill a heading, write "Not yet" and add a row to section 5. Do not drop the heading.

#### Task [6.2]: [name of the task, as on the D4 map]

**Steps.** What the developer runs or clicks, in order. Real commands, real paths.

```bash
[command]
```

**Gate and holder.** What stops the work, and what holds it: Hook (git), Hook (agent), CI check (required), CI check (advisory), Platform rule, Human, or No gate.

| Gate                  | Holder  | Where it lives      |
| --------------------- | ------- | ------------------- |
| [What stops the work] | [Label] | `[path or setting]` |

**Failure mode.** What goes wrong when the gate is missing or ignored. One real case from this repository if there is one, with its pull request or commit.

**Worked example.** One pass through the steps on the fault report or a trial build: what was typed, what came back.

**How you know it worked.** The countable thing a team checks, and the command or page that shows it. Take the criterion from `docs/research/success-metrics-stages-5-8.md` where a row exists.

> A filled block, so the level of detail is clear. The worked example was run against `scripts/check-commit-msg.js` on `main` at `fb6e758` on 6 Oct 2026.
>
> **Task 6.2: commit message format**
>
> **Steps.** Commit as usual. The hook runs by itself after `pnpm install` has installed lefthook.
>
> ```bash
> git commit -m "feat(fault-report): add lodge form and Firestore rule"
> ```
>
> **Gate and holder.** The message must start with a Conventional Commits type. Holder: Hook (git). It lives in `lefthook.yml` (`commit-msg`) and `scripts/check-commit-msg.js`.
>
> **Failure mode.** The hook checks the format and nothing else. It does not check that an agent commit carries a `Co-authored-by` trailer, so an unattributed agent commit passes (`docs/modules/git-commits.md`, "Provenance").
>
> **Worked example.** `add fault form` is refused with exit code 1 and the message "Commit message does not follow Conventional Commits". `feat(fault-report): add lodge form and Firestore rule` exits 0.
>
> **How you know it worked.** Every commit on the branch matches the pattern: `git log --format=%s main..HEAD` shows no line without a type prefix.

### Pattern B: what we ran and what it showed

> For a chapter that reports a run, a trial, an analysis or a traceability check. Same five headings every time, so a reader can compare chapters 4, 5 and 6 side by side.

#### 3.1 The question

> One sentence the chapter answers. For a trial, this is the registered prediction, quoted with the commit that registered it.

[Question.]

#### 3.2 What was done

> Enough that someone else could repeat it. Fill every row. "Not recorded" is a valid value and is better than a blank.

| Item                        | Value                                              |
| --------------------------- | -------------------------------------------------- |
| Who                         | [Name and role in the run]                         |
| When                        | [Start and end, full dates]                        |
| Repository and start commit | `[owner/repo]` at `[commit or tag]`                |
| Tool, lane and model        | [For example: Codex, model and effort as recorded] |
| Time limit                  | [Planned and cap]                                  |
| What counted as done        | [The criteria, with the path to the frozen copy]   |

#### 3.3 What happened

> Results as a table first, prose second. One row per criterion, gate or measure. Use the evidence labels.

| Measure                   | Result   | Evidence | Status   |
| ------------------------- | -------- | -------- | -------- |
| [Acceptance criteria met] | [5 of 6] | `[path]` | Run once |

#### 3.4 What this does not show

> The limits of this run, stated before the reader finds them. Sample size, anything mocked, anything estimated, anything that changed mid-run.

- [Limit.]

#### 3.5 What the manual takes from it

> The change to practice. Each line names the chapter 3 task it affects.

- [Finding, and the task it changes.]

## 4. Claims and evidence

> Every factual claim in this chapter, one row each. This table becomes the evidence index (appendix B). Paths are repository paths, or `owner/repo#number` for a pull request or issue, or a URL with the date retrieved for anything outside the repository. If the evidence is in the Teams library and not in the repository, give the folder and file name.

| #   | Claim, in the chapter's words                           | Section | Evidence                                                              | Status |
| --- | ------------------------------------------------------- | ------- | --------------------------------------------------------------------- | ------ |
| 1   | [The ruleset requires one status check, AI Declaration] | [3]     | `docs/research/fault-reporting/evidence/main-ruleset-detail.json.txt` | Run    |

## 5. Limits and open questions

> Chapter 9 is built from these tables across all chapters. Put anything unfinished, undecided or untested here, and nowhere else.

| #   | Limit or open question | Owner  | What it blocks       |
| --- | ---------------------- | ------ | -------------------- |
| 1   | [Question]             | [Name] | [Section or chapter] |

## 6. New terms

> Only terms this chapter introduces that are not in `docs/reports/module-reconciliation.md` section 4. Leave the table empty if there are none.

| Term | Meaning |
| ---- | ------- |
|      |         |

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
