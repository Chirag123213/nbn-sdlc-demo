# 2. The lifecycle, the entry gate and how to read a gate

**Owner:** Zac Clarkson
**Planner card:** [UX] - White paper: assembly and final edit : 240
**Status:** Draft for review, 20 Oct 2026.
**Checked against:** `main` at `44557a3`; the trial two base at `6af6a5b` (tag `trial2-base`); the trial two review record on `docs/trial-two-attacks`.
**Feeds from:** `docs/white-paper/terms.md`, `docs/research/lifecycle-task-map.md`, `docs/adr/002-scope.md` ("Stages assumed"), `docs/reports/module-reconciliation.md` section 4, `docs/reports/D5-gated-lifecycle.html`.
**AI involvement:** Claude (Claude Code, Fable 5.1) drafted this chapter from the files above. Checked by Zac Clarkson, 20 Oct 2026.

---

## 1. In one paragraph

The gated lifecycle is a map and the gates that hold it. The map is NBN's eight stages opened into 44 tasks; each task carries a colour, a holder and a gate. Stages 1 to 4 are mapped and cited but not operated here; work enters stage 5 only when four things exist, and this paper calls that the entry gate. From stage 5 on, every task names what must be true before the next one starts and what makes that hold: a git hook, an agent hook, a CI check, a platform rule, a person, or nothing. The last of those matters most, because most AI "rules" in a repository are instruction text, and instruction text holds nothing. Chapter 3 gives every task in stages 5 to 8 its steps, gate, failure mode and worked example. This chapter gives the reader the map, the entry gate and the way to read a gate, which is all they need to follow chapter 3 and to question chapters 5 to 7.

## 2. What this chapter covers

| Covered | Not covered, and where it is instead |
| --- | --- |
| What the gated lifecycle is, in one definition (2.1) | Per-task steps and worked examples: chapter 3 |
| The map: eight stages, 44 tasks, three colours (2.1) | The research behind each stage's colour: `docs/research/slice1-spine.md`, summarised in chapter 1 |
| The entry gate to stage 5 (2.2) | How to produce the four entry artefacts: out of scope (ADR-002) |
| The six holders and how each gives way (2.3) | Which tool runs which hook: `docs/research/claude-copilot-mechanism-map.md` |
| One developer's Monday, nine gates (2.4) | What happened when three builds ran: chapter 6 |

## 3. The chapter

### 3.1 The gated lifecycle

A map and the gates that hold it.

The map is NBN's eight stages opened into tasks: 44 of them, in `docs/research/lifecycle-task-map.md`, drawn in `docs/reports/D4-lifecycle-map.html`. Each task carries three things.

- A colour, which says who decides. Red: a human decides. Amber: AI drafts, a human approves. Green: AI runs, a deterministic check holds.
- A gate, which is what must be true before the next task starts. It is written as a countable condition: "every commit passes pre-commit and commit-msg".
- A holder, which is what makes the gate hold. There are six (3.3). Every task names one.

Stages 5 to 8 are operated in this paper and were run three ways in trial two. Stages 1 to 4 are on the map with their colours and citations, scaffolded on Google's Design Sprint, and are not operated here (ADR-002).

The thing has one name. `docs/white-paper/terms.md` lists the words that are retired.

### 3.2 The entry gate

Work enters stage 5 when four things exist. Work that arrives without them goes back. The paper does not cover producing them.

| Stage | Must have produced | What stood in for it in the trials |
| --- | --- | --- |
| 1. Ideation and business case | A business case a named person approved: the problem, who it is for, the expected value. An AI draft is fine; the approval is human | The feature agreed with the client representative |
| 2. Requirements and discovery | User stories with acceptance criteria someone other than the author can check; open questions recorded, not guessed | `docs/research/trial-two/acceptance-criteria.md`, 17 criteria and an out-of-scope list, frozen 10 Oct 2026 (`f43ca98`) |
| 3. Solution design and architecture | Architecture and technology decisions recorded with a human approver, including the constraints the build must respect | ADR-001 (the stack); the trial two base at `6af6a5b` |
| 4. UX design and prototyping | Journey maps agreed; brand and design decisions made by a person; where there is an interface, an approved design to build against | The base's existing interface and design system; no new design work |

Source: ADR-002, "Stages assumed". The entry gate is itself a human gate: someone reads the four and says the work may start. In trial two that was the freeze of the brief.

### 3.3 How to read a gate

Six holders. The question to ask of any rule in a repository is which of these holds it.

| Holder | Meaning | In the trial two base (`6af6a5b`) | How it gives way |
| --- | --- | --- | --- |
| Hook (git) | A git hook installed by lefthook. Runs for every tool and every person who ran `pnpm install` | pre-commit: secret scan, placeholder check, prettier, eslint. commit-msg: Conventional Commits, 100 characters, lower-case scope | `--no-verify` by a human. The agent hook denies it for the agent |
| Hook (agent) | A hook inside one tool | `.github/hooks/copilot-guard.json` runs `scripts/copilot/pre-tool-use.cjs`, which denies `git push`, `--no-verify`, `LEFTHOOK=0` and `core.hooksPath` and returns the reason. Claude Code's equivalent is in `.claude/settings.json` | Fails open after 10 seconds. Binds only the tool it is installed in; nothing binds ChatGPT in a browser |
| CI check (required) | A GitHub Actions job the ruleset lists. Blocks the merge | AI Declaration, AI Attribution, Lint & Typecheck, Frontend Tests, Backend Unit Tests, Security Scan | Only by editing the ruleset. On `Peepachuu/nbn-sdlc-demo` today only AI Declaration is listed; the trial two repositories list all six |
| CI check (advisory) | A job that runs and reports | Mutation run on every pull request, no threshold | Ignored |
| Platform rule | The `main` ruleset | Two approving reviews, the author's not counted; squash only; no force push; no delete | A repository admin edits it |
| Human | A person makes a judgement and the record of it exists | 6.1 approve the plan; 6.4 approve the merge; 7.4 judge whether the tests would notice; 5.3, 5.4, 8.3, 8.5 | A rubber stamp. Two approvals mean two people have to |
| No gate | Written down, held by nothing | `CLAUDE.md`, `.github/copilot-instructions.md`, `AGENTS.md`, prompt files, skills, the agent's own summary | Already given way. In the dry run the agent "stopped and waited" by choice: `docs/research/ai-workflow-gates/dry-run-results.md`, "demonstrated through agent behaviour, not through a deterministic enforcement mechanism" |

Two consequences the reader should carry into chapter 3.

- A green task without a hook, a check or a rule named is an amber task mislabelled. Chapter 3 names the holder on every green row.
- `CLAUDE.md` on `main` calls its instruction text "Mandatory AI Development Gates". By this table it is no gate. The sentence that makes the plan step hold is the human who refuses to approve code without a plan (6.1).

### 3.4 Monday

One developer with Copilot, one issue, nine gates. `docs/reports/D5-gated-lifecycle.html` animates this; chapter 3 gives each task in full.

| | Task | What happens | Gate | Holder |
| --- | --- | --- | --- | --- |
| 1 | 5.3 | Take an issue with testable criteria and an out-of-scope list | List present; criteria testable | Human |
| 2 | 6.1 | Ask the agent for a plan; approve it before any code | Plan accepted first | Human |
| 3 | 6.2 | The agent branches, writes tests and code, commits | Every commit passes pre-commit and commit-msg | Hook (git) |
| 4 | 6.3 | The agent tries to push and is denied; the developer pushes | Pushes stay with a person; hooks cannot be skipped | Hook (agent) |
| 5 | 6.3 | Open the pull request: Conventional title, AI declaration ticked, Co-authored-by trailer on a commit | Declaration and trailer agree | CI check (required) |
| 6 | 7.2, 7.5 | CI runs | Lint & Typecheck, tests, security scan green; mutation reports | CI check (required ×4, advisory ×1) |
| 7 | 7.4 | A reviewer asks whether the tests would fail if the code were wrong | A person confirms, with the mutation report and a seeded fault as evidence | Human |
| 8 | 6.4 | Two people who did not write it approve; squash-merge | Two approvals; six checks green; squash | Platform rule, human |
| 9 | 8.1 | The pull request deploys a preview | Preview URL on the pull request | CI check (hosting) |

Step 7 is the one trial two turned on. Two of three builds reached step 8 with fourteen criteria ticked and green CI, and stored nothing. The gate that catches that is a person reloading the page.

## 4. Claims and evidence

| # | Claim, in the chapter's words | Section | Evidence | Status |
| --- | --- | --- | --- | --- |
| 1 | The map has 44 tasks, each with a colour, a gate and a holder | 3.1 | `docs/research/lifecycle-task-map.md`; holder labels `docs/reports/module-reconciliation.md` §4 | Run once (counted) |
| 2 | Work enters stage 5 on four artefacts | 3.2 | `docs/adr/002-scope.md`, "Stages assumed" | Documented |
| 3 | The trial two base has the hooks, agent hook, six CI jobs and ruleset listed in 3.3 | 3.3 | `lefthook.yml`, `.github/hooks/copilot-guard.json`, `scripts/copilot/pre-tool-use.cjs`, `.github/workflows/ci.yml` at `6af6a5b`; ruleset read 17 Oct 2026 (`attacks-and-test-jobs.md` §10) | Run |
| 4 | On `Peepachuu/nbn-sdlc-demo` only AI Declaration is a required check | 3.3 | `docs/research/fault-reporting/evidence/main-ruleset-detail.json.txt` | Run once (read, pre-transfer) |
| 5 | The dry-run approval gate held by agent behaviour, not enforcement | 3.3 | `docs/research/ai-workflow-gates/dry-run-results.md`, limitations | Documented |
| 6 | Two of three trial two builds stored nothing and passed every automated check | 3.4 | `docs/research/trial-two/review/README.md`, "Results" | Run once |

## 5. Limits and open questions

| # | Limit or open question | Owner | What it blocks |
| --- | --- | --- | --- |
| 1 | The ruleset evidence for `main` predates the repository transfer to `Peepachuu`; re-pull it | Chirag or Zafir | Claim 4's date |
| 2 | ADR-002 is still marked Proposed and its stage 1 stand-in carries a placeholder date | Zac | Nothing in this chapter; tidy before assembly |
| 3 | `CLAUDE.md` and `docs/GIT-WORKFLOW.md` on `main` overstate what is enforced | whoever takes the one-hour card | Reader trust, if they open the repo |
| 4 | Stages 1 to 4 are mapped, not operated; this paper makes no claim about AI in them | nobody this sprint | Scope, stated |

## 6. New terms

| Term | Meaning |
| --- | --- |
| The gated lifecycle | The map and the gates that hold it. The only name for the thing |
| Entry gate | The four artefacts work must have before stage 5 |
| Holder | What makes a gate hold. One of six labels |
| No gate | A rule that is written down and held by nothing. Instruction files are the usual case |
