# The gated lifecycle: the manual

<!-- toc -->
## Contents

- The gated lifecycle: the manual
    - 1. What this is
    - 2. Before stage 5
    - 3. Install once
- Goes under the existing `jobs:` key in ci.yml
    - 4. How to read a task
    - 5. Stage 5: Development planning
    - 6. Stage 6: Development and build
    - 7. Stage 7: Testing and QA
    - 8. Stage 8: Deployment and iteration
    - 9. The four names
    - 10. Words
<!-- /toc -->


## 1. What this is

The gated lifecycle is a map and the gates that hold it. The map is NBN's eight stages opened into 44 tasks. Each task carries a colour, a gate and a holder. Red: a human decides. Amber: AI drafts, a human approves. Green: AI runs, a deterministic check holds. The gate is what must be true before the next task starts. The holder is what makes it hold: Hook (git), Hook (agent), CI check (required), CI check (advisory), Platform rule or Human. Where nothing holds it: No gate. An instruction file is no gate. This manual gives stages 5 to 8 in full and stages 1 to 4 at map level, because only 5 to 8 were run. Copilot is the example tool.

## 2. Before stage 5

### 2.1 The entry gate

Work that arrives without all four goes back. This manual does not give steps for producing them (ADR-002, "Stages assumed"); 2.2 gives each task in stages 1 to 4 its colour, gate and holder from the map.

| Stage | Handled well means |
|---|---|
| 1. Ideation and business case | A business case a named person approved: the problem, who it is for, and the expected value. An AI first draft is acceptable; the approval is human. |
| 2. Requirements and discovery | User stories with acceptance criteria that someone other than the author can check, and open questions recorded rather than guessed. |
| 3. Solution design and architecture | Architecture and technology decisions recorded with a human approver, including the constraints the build must respect. |
| 4. UX design and prototyping | Journey maps agreed, and brand and design decisions made by a person. Where the feature has an interface, an approved design to build against. |


### 2.2 Stages 1 to 4, task by task: mapped, not operated

The map covers all eight stages. Stages 1 to 4 were researched in Sprint 1 (slice 1, the task map, Google's Design Sprint as the scaffold) and were not run in the proof of concept or either trial, so no row below has a worked example. Each row says who decides, what must be true before the next task, and what holds it. Where the holder is a person, the record of their decision is the evidence. Where the map names a hook or check, none is built in the repository; it is a specification.

Three rows are green in the map with no deterministic holder (1.3, 2.2, 4.3). There, green keeps the workshop's meaning: AI runs and a person monitors the output. By chapter 2's rule, a green row without a hook, a check or a platform rule reads as amber, and chapter 9 lists the relabel as open.

**Stage 1: Ideation and business case.** Profile: human decides at both ends, AI widens the middle. Rests on Google's Design Sprint (understand, map, sketch) and Microsoft's envisioning and problem-formulation pages.

| Task | Colour | Gate | Holder |
|---|---|---|---|
| 1.1 Frame the brief: business context, goals, what is troubling, what is on the horizon | Red | A written brief exists and the sponsor agrees it describes the problem | Human |
| 1.2 Contextual inquiry: narrow from the organisation to the team and the specific process | Amber | The human has struck out anything the AI asserted without a source | Human |
| 1.3 Generate divergent business-case options with industry examples | Green | Three to five options exist, none shipped anywhere | Human monitors (no deterministic holder) |
| 1.4 Back the preferred option with evidence: interviews, industry statistics, where the pain is | Amber | Every figure in the case has a verified source | Human; a citation check is specified, not built |
| 1.5 Refine, align stakeholders, sign off | Red | Sponsor sign-off recorded | Human |

**Stage 2: Requirements and discovery.** Profile: red anchors, AI drafting between them, one mechanical commit. Rests on Microsoft's Definition of Ready and Work Items pages and the requirements-engineering evidence (generated stories less diverse and meeting criteria less often than human ones).

| Task | Colour | Gate | Holder |
|---|---|---|---|
| 2.1 Fix the anchor set: known users, known tasks, known pain points, existing evidence | Red | The anchor set is written down and marked as fact | Human |
| 2.2 Draft user stories from the anchor set | Green | Every story traces to an anchor or to a gap deliberately left open | Human monitors (no deterministic holder) |
| 2.3 Draft acceptance criteria and the out-of-scope list for each story | Amber | Accessibility and security criteria present on every story | Human |
| 2.4 Verify against the Definition of Ready, prioritise, accept into the backlog | Red | Story passes the DoR checklist; product owner accepts | Human |
| 2.5 Commit accepted stories and criteria to the repository as Markdown | Green | File is on the branch and referenced by name in later prompts | CI check that the file exists and parses: specified, not built |

**Stage 3: Solution design and architecture.** Profile: AI drafts options, people decide and own the threat model. Rests on Microsoft's design reviews, ADR and trade-study templates and the SDL requirement that security requirements are set by the team and reviewed by someone other than the author.

| Task | Colour | Gate | Holder |
|---|---|---|---|
| 3.1 Document the existing system: infrastructure map, APIs, existing patterns | Amber | A context document exists in the repository that a new engineer could onboard from | Human |
| 3.2 Generate candidate architectures against the approved tool list | Amber | Every option uses only approved tools and names its trade-offs | Human |
| 3.3 Trade study and architecture decision record | Red | ADR merged; decision log updated | Human; the merge is under the `main` ruleset |
| 3.4 Threat model, security and privacy requirements | Red | Threat model reviewed by someone other than the author | Human |
| 3.5 Technical spike on the riskiest unknown | Amber | Spike log answers the question it was scoped for; time-box respected | Human |

**Stage 4: UX design and prototyping.** Profile: the most red of the eight. Rests on the Design Sprint's prototype and test days, the persona and journey-map evidence (synthetic personas "susceptible to caricature"; AI journey maps are hypothesis maps), the accessibility-critique evidence (69 to 71 percent recall) and NBN's inclusive-design obligations.

| Task | Colour | Gate | Holder |
|---|---|---|---|
| 4.1 Fix the anchor set: known users, historical evidence, known tasks and pains | Red | Anchors written down as fact | Human |
| 4.2 Hypothesis journey map and proto-personas in the gaps left open | Amber | Every generated hypothesis has a research task attached | Human researcher |
| 4.3 Skeleton screens straight from the acceptance criteria | Green | Rough screens exist for every story in the sprint, none polished | Human monitors (no deterministic holder) |
| 4.4 Brand and design-system decisions | Red | Design tokens loaded into context before any generation | Human; the design system is the rule set |
| 4.5 Brand compliance check by overlay diff | Green | No visible shift, or every shift is explained | Hook (design-system CSS over generated CSS): specified, not built |
| 4.6 Usability and accessibility critique | Amber | Human has dispositioned every AI finding; WCAG target met | Human |
| 4.7 Inclusion decisions, including First Nations inclusive-design policy | Red | Policy codified in the system prompt and tool chain before design starts | Human |
| 4.8 Test with real users | Red | Findings from real users recorded; synthetic users not used as a substitute | Human |

What a team takes from these four stages is the hand-over: the four artefacts in 2.1, each with a named person's approval on it. A team that already runs a design sprint or a discovery process keeps it and adds the colours. The gates here are all human approvals, which is what Google and Microsoft document for the same work.

## 3. Install once

This is the setup a team does to a repository so the green gates exist. Paths are from the team's repository. Where a path is in the trial two base (`6af6a5b`, tag `trial2-base`) and not yet on `main` (`44557a3`), it says so.

### 3.1 Git hooks (lefthook)

Install:

```bash
pnpm install
```

The root `prepare` script runs `lefthook install`. A clone that has not run `pnpm install` has no hook.

`lefthook.yml` runs:

- pre-commit: placeholder check, Prettier, ESLint on staged frontend and backend files. Prettier cannot block (`|| true`). The trial two base adds a secret scan, `scripts/check-secrets.js`. On `main` at `44557a3` the secret scan runs only in CI.
- commit-msg: Conventional Commits, checked by `scripts/check-commit-msg.js`.

```yaml
commit-msg:
  commands:
    conventional-commit:
      run: node scripts/check-commit-msg.js {1}
```

The pattern the script tests in the trial two base:

```
^(feat|fix|docs|style|refactor|test|chore|build|ci|perf|revert)(\([a-z0-9-]+\))?!?: \S.{0,99}$
```

Subject of 100 characters or fewer, lower-case kebab-case scope, `!` for a breaking change. Git's own merge and revert messages pass. The older pattern on `main` had none of these; its replacement is proposal P1 in `docs/modules/git-commits.md` and is what the base ships.

### 3.2 The agent hook

Copilot: `.github/hooks/copilot-guard.json` (trial two base; `.github/hooks/fault-reporting.json` on `main` at `b62e009`) runs `scripts/copilot/pre-tool-use.cjs` before a tool call. In the trial two base it denies any `git ... push` by the agent, `--no-verify` or `-n` on commit, merge or push, and any command that sets `core.hooksPath` or `LEFTHOOK=0`, and returns the reason to the agent. On `main` only the push denial exists; the rest is proposal P2 in `docs/modules/git-commits.md`. Test cases live in `scripts/copilot/pre-tool-use.test.cjs` and the `hook-contract` check runs them in CI.

A Copilot hook fails open on timeout. It is a gate only while it responds in time.

Claude Code equivalent: `hooks.PreToolUse` in `.claude/settings.json` (blocks push to `main`, `--force`, `--no-verify`, `firebase deploy`) plus `permissions.deny`.

### 3.3 CI jobs

All in `.github/workflows/ci.yml`, run on the pull request.

| Job | What it does | Required by the ruleset |
|---|---|---|
| AI Declaration (job `ai-declaration`) | Reads the two AI use checkboxes in the pull request body and fails if neither is ticked | Yes, on `main` and in the trial two base |
| AI Attribution (job `ai-attribution`) | If AI use is declared, fails unless a commit on the branch carries an agent `Co-authored-by` trailer; also checks the pull request title is Conventional Commits | Trial two base and PR #72. Not on `main` at `44557a3` |
| Lint & Typecheck | Lint and TypeScript checks | Trial two base only. Advisory on `main` |
| Frontend Tests | Frontend component and unit tests | Trial two base only. Advisory on `main` |
| Backend Unit Tests | Backend unit tests | Trial two base only. Advisory on `main` |
| Security Scan (job `security`) | `gitleaks/gitleaks-action@v3` and `pnpm audit --audit-level=high` | Trial two base only. Advisory on `main` |
| Mutation evidence (`.github/workflows/mutation.yml`, jobs `hook-contract` and `mutation`) | `hook-contract` runs the agent hook's test cases. `mutation` runs Stryker on the backend (`pnpm --filter backend exec stryker run`) and uploads the report. Runs on pull requests that touch backend code, the hooks or the Copilot scripts. `backend/stryker.config.json` sets `"break": 0`, so it never fails a run | No |

The AI Attribution job in the trial two base's `ci.yml` (proposal P4 in `docs/modules/git-commits.md`):

```yaml
# Goes under the existing `jobs:` key in ci.yml
jobs:
  ai-attribution:
    name: AI Attribution
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Agent trailer present when AI use is declared
        env:
          PR_BODY: ${{ github.event.pull_request.body }}
          PR_TITLE: ${{ github.event.pull_request.title }}
          BASE: origin/${{ github.base_ref }}
        run: |
          if ! printf '%s\n' "$PR_TITLE" | grep -Eq '^(feat|fix|docs|style|refactor|test|chore|build|ci|perf|revert)(\([a-z0-9-]+\))?!?: \S'; then
            echo "::error::PR title becomes the squash commit on main and must follow Conventional Commits."
            exit 1
          fi
          if printf '%s\n' "$PR_BODY" | tr -d '\r' | grep -Eq '^- \[[xX]\] AI-assisted tools were used to create this change\.$'; then
            count=$(git log "$BASE"..HEAD --format='%(trailers:key=Co-authored-by,valueonly)' | grep -ciE 'copilot|claude|anthropic|openai|codex' || true)
            if [ "$count" -eq 0 ]; then
              echo "::error::AI use is declared but no commit carries an agent Co-authored-by trailer."
              exit 1
            fi
          fi
          echo "AI attribution check passed."
```

A CI job holds nothing until the ruleset lists it as required. Add each job to the ruleset's required checks after it exists.

### 3.4 The pull request template

`.github/pull_request_template.md` carries the two AI use checkboxes the AI Declaration job reads, the "Tool/model" and "What the AI contributed" fields, and the confidence card (plan, assumptions, alternatives, known edge cases). The checkbox line the jobs match:

```
- [x] AI-assisted tools were used to create this change.
```

Only the declaration is checked. The other sections are prompts.

### 3.5 Copilot's trailer

Copilot agent mode (VS Code) adds no trailer by default. Create `.vscode/settings.json` (P3 in `docs/modules/git-commits.md`):

```json
{
  "git.addAICoAuthor": "chatAndAgent",
  "github.copilot.chat.commitMessageGeneration.instructions": [
    {
      "text": "Use Conventional Commits: type(scope): description. Types: feat, fix, docs, style, refactor, test, chore, build, ci, perf, revert. Lower-case kebab-case scope. Subject 100 characters or fewer. One logical change per commit."
    }
  ]
}
```

This shapes behaviour. The AI Attribution job is what checks it. Claude Code adds `Co-Authored-By: Claude <model> <noreply@anthropic.com>` by default (`attribution.commit` in `.claude/settings.json`).

### 3.6 The `main` ruleset

Set on the repository, not in a file:

- `required_approving_review_count: 2`. An author cannot approve their own pull request.
- Squash and merge only.
- No force push. No deleting `main`.
- Required status checks: AI Declaration on `main`; the six jobs in 3.3 under the trial two ruleset.

Do not add Copilot as a bypass actor. That would let the Copilot cloud agent skip the approvals.

A ruleset belongs to one repository and does not follow the code. Before relying on it, check the repository the pull request targets:

```bash
gh api repos/Peepachuu/nbn-sdlc-demo/rulesets --jq '.[] | {name, enforcement, target}'
```

## 4. How to read a task

Every gate has one holder. Six holders, and one label for the absence of one.

| Holder | Meaning | Example in the repository |
|---|---|---|
| Hook (git) | A git hook installed by lefthook. Runs for every tool and every person who ran `pnpm install` | `scripts/check-commit-msg.js` rejects `add notes` and accepts `feat: add notes` |
| Hook (agent) | A hook inside one tool. `.github/hooks/*.json` for Copilot, `.claude/settings.json` for Claude Code. Fails open on timeout in Copilot | `scripts/copilot/pre-tool-use.cjs` denies `git push` by the agent |
| CI check (required) | A GitHub Actions job the ruleset lists | AI Declaration: on PR #43 an unanswered declaration failed the check and an answered one passed |
| CI check (advisory) | A job that runs and reports and does not block the merge | Security Scan on `main`: on PR #38 Gitleaks found a seeded credential and the job failed; a merge with two approvals would still have been allowed |
| Platform rule | The `main` ruleset: two approvals, squash only, no force push, no delete | PR #47 squash merged with two approvals; the trailer on `20755e0` survived onto `main` as `2c9a958` |
| Human | A person makes a judgement | Task 6.4: the reviewer reads the diff against the acceptance criteria |
| No gate | The rule is written down and nothing holds it. Instructions files, prompt files, skills, custom agents and the agent's own summary are all No gate | `.github/copilot-instructions.md` says "Wait for the human to approve that plan before changing feature code". On the cloud agent, assigning the issue starts the work |

## 5. Stage 5: Development planning

Profile: mixed. Two amber drafting tasks, one red instruction task, one red commitment, one green mechanical push. ADR-002 specifies this stage to its handoff: from an agreed story to an agent-ready issue. Prioritisation and role assignment are named, not specified.

### 5.1 Slice the work into minimal, single-purpose issues (Amber)

#### Steps

1. Ask the AI to propose the slicing of the agreed stories into issues.
2. Read each proposed issue. Split any issue that bundles more than one purpose.
3. Keep the issue's scope list as a fenced block in the issue body, so the pull request's files can be compared with it later.

#### Gate and holder

| Gate | Holder | Where it lives |
|---|---|---|
| No issue bundles more than one purpose | Human | The issue body; checked after the run with the S9.2 command below |

#### Failure mode

Agent pull requests bundle multiple purposes at over three times the human rate (40.0 percent against 12.2 percent, Watanabe et al., arXiv 2509.14745). In the fault report run, commit `2c19c5d` on PR #63 bumped Next to 16.3.6 and added seven overrides inside the feature pull request, although issue #57 excluded dependency upgrades. That is a two-purpose pull request.

#### Worked example

The workshop demonstrated 5.1 and 5.2 end to end: MoSCoW, story-to-role assignment across front end, back end and full stack, dependency flagging and complexity estimates, output as a two-week sprint plan and then pushed into GitHub issues (D2 v2 section 4.1).

#### How you know it worked

Share of issues the agent proposes that a human accepts without splitting; target 100 percent single-purpose after human edit, and no merged pull request from the sprint touching files outside its issue's scope list.

```bash
gh issue list --state all --limit 100 --json number,title,labels,body,createdAt,closedAt
gh pr view <pr> --json files --jq '.files[].path'
```

### 5.2 Prioritise (MoSCoW), assign to roles, flag dependencies and complexity (Amber)

#### Steps

1. Ask the AI to draft a priority, an owner role and the dependencies and complexity for each issue.
2. A person edits the result.

#### Gate and holder

| Gate | Holder | Where it lives |
|---|---|---|
| Every issue has a priority, an owner role and its dependencies listed | Human | Issue labels and linked issues |

#### Failure mode

Not yet

#### Worked example

The same workshop run as 5.1.

#### How you know it worked

Every issue carries a priority label, an owner role and its dependency links before the sprint is committed; the count of issues missing any of the three is zero.

```bash
gh issue list --json labels,body
```

### 5.3 Write each issue properly: acceptance criteria and the out-of-scope list (Red)

#### Steps

Before the issue is assigned to Copilot, a person confirms it contains or references:

1. Task definition: what change is required and why.
2. Acceptance criteria: observable conditions that define when the task is complete.
3. Scope: the parts of the system that may need to change.
4. Exclusions: functionality or files that are explicitly outside the task.
5. Repository context: relevant specifications, architecture documents or other repository files needed to understand the task, named by path. For the fault report: `docs/research/fault-reporting/feature-brief.md`.
6. Dependencies and constraints: existing functionality, security requirements or other conditions that affect implementation.

Two items the run added:

7. Record the approval of the acceptance criteria with a named person and a full timestamp with date and timezone.
8. Set up the environment before handoff: keys entered by a person, the `.env` the agent's worktree can read, and the Node and pnpm versions recorded.

If any required information is missing or still awaiting a decision, the issue stays with a human.

#### Gate and holder

| Gate | Holder | Where it lives |
|---|---|---|
| The issue is complete enough to delegate: out-of-scope list present, criteria testable | Human | The issue body and the files it names by path |

#### Failure mode

An issue without an out-of-scope list is read literally and the agent widens the change. The workshop saw a 35-file change from a small request (D2 v2 section 4.2). Repository instructions can tell Copilot how to behave after assignment; they cannot make the requirements correct or complete. In the run, the approval of the acceptance criteria was first recorded as "9:43" with no date or timezone and had to be supplied again.

#### Worked example

Issue #57, the fault report. The issue carries the task description and acceptance criteria and references `docs/research/fault-reporting/feature-brief.md`, which records the user story, acceptance criteria, exclusions and proposed scope. The approval of the criteria is in `docs/research/fault-reporting/decisions.md`, 27 Sep 2026.

#### How you know it worked

Every issue has testable acceptance criteria and an explicit out-of-scope list before an agent reads it; after the run, files touched outside the out-of-scope list is zero. Zero AI credits by definition; record the human minutes per issue.

```bash
gh issue view <issue> --json number,title,body,labels,timelineItems
gh pr view <pr> --json files --jq '.files[].path'
```

### 5.4 Commit the sprint plan (Red)

#### Steps

1. Team and product owner agree the plan.
2. Check capacity.
3. After commitment, add or rescope an issue only through a recorded decision.

#### Gate and holder

| Gate | Holder | Where it lives |
|---|---|---|
| Team and product owner agree the plan; capacity checked | Human | Not yet |

#### Failure mode

Not yet

#### Worked example

Not yet

#### How you know it worked

Plan committed with capacity checked; the sprint's issues do not change after commitment except through a recorded decision. Count of issues added or rescoped after day 1.

```bash
gh issue view <issue> --json createdAt,timelineItems
```

### 5.5 Push the issues into the repo host (Green)

#### Steps

1. Create one GitHub issue per slice, from the issue template, linked to the stories file from task 2.5.

#### Gate and holder

| Gate | Holder | Where it lives |
|---|---|---|
| Issues exist, templated, linked to the stories file | Hook (issue template validation), as the task map labels it | Not yet |

#### Failure mode

Not yet

#### Worked example

The workshop plan was pushed into GitHub issues (D2 v2 section 4.1).

#### How you know it worked

Every issue exists in GitHub, uses the issue template, and links to the story; template validation fails zero issues after the push.

```bash
gh issue list --json body
```

## 6. Stage 6: Development and build

Profile: leans autonomous, with a red gate at the end. One amber planning task, two green execution tasks behind hooks, one red review, one amber iteration. Specified in full.

### 6.1 Agent reads the issue, confirms each acceptance criterion, plans (Amber)

#### Steps

Copilot agent mode (VS Code):

1. Open the repository in VS Code and start Copilot in Agent mode.
2. Attach the issue with the + (Add Context) button and Issue, or paste the issue URL, and reference `docs/research/fault-reporting/feature-brief.md`.
3. Ask:

> Read the attached issue and the fault-reporting feature brief. Map every acceptance criterion to an implementation step, proposed files and a test. Produce the plan before changing feature code.

4. Review the plan and redirect it if necessary. Record the approval with a name and a timestamp.
5. Only then ask Copilot to implement.

Copilot cloud agent: assigning the issue starts the work. There is no approval step between assigning and the agent beginning. A plan-first instruction shapes behaviour and is not a gate.

#### Gate and holder

| Gate | Holder | Where it lives |
|---|---|---|
| Plan accepted before any code is written | Human, in Copilot agent mode (VS Code) and Copilot CLI. No gate on the Copilot cloud agent | The session. The run recorded it in `docs/research/fault-reporting/decisions.md` |

#### Failure mode

On the cloud agent, nothing holds the plan. In the run, the planning exchange could not be saved word for word; only the prompt was. "Prompt recorded" is achievable. "Response recorded" depends on the tool exporting it.

#### Worked example

The fault report run asked for "a plan only". `docs/research/fault-reporting/decisions.md` records the approval on 27 Sep 2026 and the authorisation to implement on 30 Sep 2026. The prompt is kept at `docs/research/fault-reporting/evidence/run-2026-09-27/planning-prompt.txt`.

#### How you know it worked

Plan accepted by the human before code is written; count of plan revisions before acceptance, and share of acceptance criteria the plan names explicitly (target 100 percent). Copilot coding agent: 1 premium request per session plus 1 per steering comment. Review: budget 10 minutes per issue.

```bash
gh pr view <pr> --json number,title,body,author,createdAt,mergedAt,additions,deletions,changedFiles,commits,reviews,comments,reviewThreads,reviewDecision
```

### 6.2 Branch, implement, commit (Green)

#### Steps

1. Branch: `git checkout main && git pull` then `git checkout -b feature/fault-report`.
2. Decide the boundary. One logical change per commit. If the change needs "and" to describe it, split it.
3. Stage: `git add -p` (review each hunk) or stage from the VS Code Source Control view. Read what the agent changed before it is staged.
4. Pre-commit checks run automatically on `git commit`: placeholder check, Prettier, ESLint on staged frontend and backend files. In the trial two base, the secret scan too.
5. Commit: `git commit -m "feat(fault-report): add lodge form and Firestore rule"`, or Copilot's sparkle button in Source Control. The message must match `scripts/check-commit-msg.js`.
6. Record the versions: CI runs Node 22 and pnpm 10. "Passes locally" and "passes in CI" are different claims.
7. The agent does not push. A person does, in task 6.3.

#### Gate and holder

| Gate | Holder | Where it lives |
|---|---|---|
| One logical change per commit | Human | The developer's staging, `git add -p` |
| Commit blocked if placeholders remain or ESLint fails | Hook (git) | `lefthook.yml`, pre-commit |
| A secret is refused before it is committed | Hook (git), trial two base only | `lefthook.yml` and `scripts/check-secrets.js` at `6af6a5b` |
| Message is Conventional Commits | Hook (git) | `lefthook.yml`, commit-msg; `scripts/check-commit-msg.js` |
| The agent cannot push | Hook (agent) | Copilot: `.github/hooks/copilot-guard.json` running `scripts/copilot/pre-tool-use.cjs`. Claude Code: `.claude/settings.json` blocks `git push ... origin main`, `--force` and `--no-verify` |
| The agent cannot skip the git hooks | Hook (agent) in the trial two base and in Claude Code. No gate on `main`'s Copilot hook | `scripts/copilot/pre-tool-use.cjs` at `6af6a5b` |

#### Failure mode

Without the commit-msg hook, messages drift (`wip`, `fixes`, `update`) and nobody can tell a feature from a refactor in `git log`. The hook is missing on a clone without `pnpm install`, or on `git commit --no-verify`, which the agent hook on `main` does not block and the trial two base's does. Without the boundary decision, one commit holds a feature, a refactor and a dependency bump, and the squash merge hides it on `main`. In the run, the agent worked in an isolated worktree that could not read the root `.env`, and Firebase integration stayed blocked from 27 Sep to 30 Sep. Local Node 24.19 and pnpm 11.20 ran against CI's Node 22 and pnpm 10. The push hook has a passing contract test in CI; nothing records it firing during the run. A hook that never fired is not evidence it held.

#### Worked example

Zafir builds the fault report with Copilot agent mode (VS Code). He branches from `main`: `git checkout -b feature/fault-report`. Copilot writes the lodge form and its Firestore rule. Zafir reads the diff and decides this is one change: "users can lodge a fault". The dashboard list is a second change and waits for its own commit. Copilot proposes the message `add fault form`. Git refuses it: the commit-msg hook finds no type prefix and prints the format. Copilot tries again with `feat(fault-report): add lodge form and Firestore rule`. Accepted. Copilot offers to push. The Copilot agent hook denies it.

The commit-msg script, run on 28 Sep 2026 (`node scripts/check-commit-msg.js <file>`):

| Message | Result |
|---|---|
| `add notes` | rejected |
| `feat: add notes` | accepted |
| `feat(fault-report): add lodge form and Firestore rules` | accepted |
| `Feat: add notes` | rejected |
| `feat:add notes` | rejected |
| `feat!: drop v1 fault schema` | rejected by `main`'s script; accepted by the trial two base's |

#### How you know it worked

Every commit on the branch passed the pre-commit and commit-msg hooks; seeded violations (lint, format, non-conventional message, secret) caught: target 100 percent of seeded cases. Rework count: commits after the first review request.

```bash
gh pr view <pr> --json commits
gh run list --branch <branch> --limit 50 --json databaseId,name,conclusion,headSha,createdAt,updatedAt
```

### 6.3 Open a draft PR with description and provenance (Green)

#### Steps

1. A person pushes: `git push -u origin feature/fault-report`.
2. Open the pull request: `gh pr create --base main` or the GitHub web page. Fill in the template, `.github/pull_request_template.md`.
3. Tick one of the two AI use boxes. If AI was used, fill in "Tool/model" and "What the AI contributed" from the tool's own settings, not from the agent's account of itself. If the tool shows no model name, write "not disclosed".
4. Make sure at least one commit on the branch carries the agent's trailer. Copilot agent mode (VS Code) adds none by default; section 3.5 has the setting.
5. Fill in the confidence card: plan, assumptions, alternatives and known edge cases.
6. Read the trailers on the branch before asking for review:

```bash
git log --format='%h %an %ad%n%(trailers)' --date=iso origin/main..HEAD
```

Copilot cloud agent: the agent opens the pull request itself, and GitHub Actions workflows do not run until someone with write access clicks "Approve and run workflows", after checking whether Copilot changed anything under `.github/workflows/`.

#### Gate and holder

| Gate | Holder | Where it lives |
|---|---|---|
| The AI declaration is answered | CI check (required) | `.github/workflows/ci.yml`, job `ai-declaration` |
| An AI-declared pull request carries an agent trailer | No gate on `main` at `44557a3`. CI check (AI Attribution) in the trial two base and PR #72; required only once the ruleset lists it | `.github/workflows/ci.yml` at `6af6a5b`, job `ai-attribution` |
| The confidence card is filled in | No gate | `.github/pull_request_template.md` |
| The prompt is recorded | No gate | Nowhere in the repository. The run kept it in `docs/research/fault-reporting/evidence/run-2026-09-27/` |

#### Failure mode

At VS Code's default setting, every Copilot agent-mode commit lands with a human author and no trailer, so `main` shows a human author on agent-written code. In the run, the Copilot interface did not show a model name, and every record says "not disclosed". PR #63 changes 68 files: 43 are evidence files (3,221 lines), the feature is 9 source files (216 lines) and 2 test files (191 lines). A reviewer has 68 files to open to find the 11 that matter. Keep evidence out of the feature diff.

#### Worked example

Commit `20755e0` carried `Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>`. When PR #47 was squash merged, the trailer survived onto `main` as `2c9a958` (`docs/governance-verification-results.md`, test 5). The feature commit `9593f1e` on PR #63 carries `Co-authored-by: Copilot App`, which the tool added without anyone enforcing it.

#### How you know it worked

100 percent of pull requests opened by the agent carry the attribution record (author, model, session link) in the pull request body or the commit trailers; the body names the issue and each acceptance criterion. Baseline on `main` before the run: 0 percent.

```bash
git log --format='%h %an %ad%n%(trailers)' --date=iso origin/main..HEAD
```

### 6.4 Human code review and merge approval (Red)

#### Steps

Review in this order, against the diff and not Copilot's summary:

1. Check repository conventions: architecture, file locations, naming, validation, authentication, imports.
2. Check scope: one logical change, inside the issue's requested scope. Look for unrelated refactoring, dependency changes, formatting changes or extra functionality.
3. Check related documentation and configuration: schemas, rules, other repository artefacts that the change also needs.
4. Check correctness against each acceptance criterion. Confirm nothing was silently changed or omitted.
5. Check the tests: they exist for the required behaviour and test outcomes rather than reproducing the implementation.
6. Check security and failure paths: authentication, authorisation, input validation, error handling, secrets, and the negative cases.
7. Check the validation evidence: the actual CI results, not Copilot's statement that a check passed.

Then:

8. Two people who did not write the change approve. The author cannot approve their own pull request.
9. Merge with Squash and merge, with a Conventional Commits title for the squash commit. GitHub offers the pull request title; edit it if it is not conventional.

#### Gate and holder

| Gate | Holder | Where it lives |
|---|---|---|
| Two approving reviews from people with write access | Platform rule | `main` ruleset, `required_approving_review_count: 2` |
| Squash merge only; no force push; no deleting `main` | Platform rule | The same ruleset |
| The required check has passed | CI check (required) | AI Declaration on `main`; six jobs under the trial two ruleset |
| The change is correct, in scope and fits the repository | Human | The reviewer's reading of the diff |
| The squash title is Conventional Commits | CI check (required) in the trial two base: the AI Attribution job fails a non-Conventional title. No gate on `main` | `.github/workflows/ci.yml` at `6af6a5b`, job `ai-attribution` |
| The requester's approval does not count | Platform rule on the Copilot cloud agent (GitHub). In agent mode and the CLI the requester is the author, so GitHub's normal rule holds | GitHub |

#### Failure mode

Rubber-stamping an agent-authored change. Copilot can produce a plausible implementation, a convincing explanation and passing automated checks. Experienced developers believed AI assistance made them about 20 percent faster while measured about 19 percent slower (METR, via `docs/research/slice2-build-modules.md`). Large or multi-purpose pull requests are harder to review and more often rejected. On `main`, with only AI Declaration required, failing lint, types or tests reach `main` once two people approve. Three of the last three merges on `main` before 28 Sep 2026 (#52, #53, #54) landed with non-conventional squash titles, and `58e1a35 Feature/copilot issue workflow (#61)` is a fourth.

#### Worked example

PR #63, the fault report: all seven checks on the head commit `2c19c5d` passed. No review had been submitted when read on 2 Oct 2026. The two-approval rule is about to be exercised on an agent-written feature. On PR #47, the only merge button the ruleset allowed was Squash and merge, and the branch's commits landed on `main` as one commit with their trailers.

#### How you know it worked

Approved by someone other than the author, CI green, branch protection in force. Measures: time to first review, review minutes per pull request, review comments before mergeable, pull request size in lines. Benchmarks: respond within one business day (Google); 200 to 400 lines per review, under 500 lines per hour, under 60 minutes per sitting (SmartBear, reporting the Cisco study). Review minutes are the central cost figure of the whole benchmark; the reviewer writes them on the sheet at the end of each sitting.

```bash
gh pr view <pr> --json reviews,createdAt,mergedAt,additions,deletions
gh api repos/Peepachuu/nbn-sdlc-demo/rulesets --jq '.[] | {name, enforcement, target}'
```

### 6.5 Iterate on review comments (Amber)

#### Steps

1. If the implementation does not satisfy the review, it is revised.
2. Copilot cloud agent: mention `@copilot` in a review comment, or push commits to the branch yourself. Each Copilot push waits for workflow approval again.
3. Copilot agent mode (VS Code): give the comment to the agent in the session, then run the task 6.4 review again on the new diff before pushing.

#### Gate and holder

| Gate | Holder | Where it lives |
|---|---|---|
| Reviewer's comments resolved | Human, the reviewer re-reviews | The pull request's review threads |

#### Failure mode

Not yet

#### Worked example

Not yet

#### How you know it worked

Reviewer comments resolved. Measures: revision rounds per pull request, and share of review comments resolved by the agent without a human editing the branch. Benchmark: the agent stayed involved in 41.1 percent of post-merge revisions (Watanabe et al.).

```bash
gh pr view <pr> --json reviewThreads,commits
```

## 7. Stage 7: Testing and QA

Profile: mixed, with a hard ceiling. Two green execution tasks behind CI, two amber generation and review tasks, one red judgement that cannot be automated. Specified in full. Tasks 7.1 and 7.3 have no module text; their content below is from the run evidence.

### 7.1 Generate unit tests alongside the change (Amber)

#### Steps

1. In the task 6.1 plan, require a test for every acceptance criterion ("Map every acceptance criterion to an implementation step, proposed files and a test").
2. After the change, map the test files in the pull request diff to the issue's criteria by hand.
3. Record which criteria rest on mocked tests and which on live ones.

#### Gate and holder

| Gate | Holder | Where it lives |
|---|---|---|
| Tests exist for every acceptance criterion | Human | The pull request diff, mapped to the criteria by hand |

#### Failure mode

The verification problem: when the agent writes both the implementation and the tests, a passing suite is not independent verification. The agent has written both sides of the exam. About half of LLM-generated assertions are wrong (51.82 to 58.71 percent and 38.72 to 48.19 percent accuracy on two datasets, ACM TOSEM 2025). That is the reason task 7.4 exists.

#### Worked example

The fault report run's `docs/research/fault-reporting/evidence/run-2026-09-27/ac-matrix.md` maps each of the six acceptance criteria to a line of evidence. Three rest partly on mocked tests because there is no safe way to test them live: direct-ID access, unauthenticated Server Action calls, and a forced storage failure.

#### How you know it worked

A test exists for every acceptance criterion on the issue (coverage of criteria, not lines); the count of criteria with no test is zero. Review: 5 minutes per pull request.

```bash
gh pr view <pr> --json files
```

### 7.2 Run the CI suite: lint, typecheck, unit tests, audit (Green)

#### Steps

1. CI runs on the pull request: AI Declaration, Lint & Typecheck, Frontend Tests, Backend Unit Tests, Security Scan, and AI Attribution where present.
2. On the Copilot cloud agent, click "Approve and run workflows" first; nothing runs until a person does.
3. Run the same locally on a fresh clone of the final commit:

```bash
pnpm install
pnpm run typecheck && pnpm run lint && pnpm run test:all
```

4. First-pass success is the conclusion of the run whose `headSha` is the first commit pushed on the branch.

#### Gate and holder

| Gate | Holder | Where it lives |
|---|---|---|
| All checks pass | CI check (required) for AI Declaration on `main`. CI check (advisory) for Lint & Typecheck, Frontend Tests, Backend Unit Tests and Security Scan on `main`. All six CI check (required) under the trial two ruleset | `.github/workflows/ci.yml`; the ruleset |

#### Failure mode

On `main`, a pull request with two approvals can merge while the four advisory jobs are red. `docs/GIT-WORKFLOW.md` says "CI must pass before merge"; the ruleset does not. "Passes locally" and "passes in CI" differ: the run's local Node 24.19 and pnpm 11.20 against CI's Node 22 and pnpm 10 blocked the baseline production build on the developer's machine.

#### Worked example

PR #63: all seven checks on the head commit `2c19c5d` passed when read on 2 Oct 2026.

#### How you know it worked

All six CI jobs green on the final commit; first-pass CI success rate for agent-written changes across the sprint (share of pull requests whose first push was green).

```bash
gh run list --branch <branch> --limit 50 --json databaseId,name,conclusion,headSha,createdAt,updatedAt
```

### 7.3 Adversarial review pass by a separate agent (Amber)

#### Steps

1. Use a saved review prompt, for example `.github/prompts/example-review.prompt.md`: review the change for bugs, missing tests and unnecessary changes.
2. Run it with an agent that did not write the change, in a separate context. Say what it is independent of: the author's context, the model, or the person.
3. Do not tell the reviewing agent which faults were seeded.
4. Every finding goes to a human for disposition. None is auto-resolved.
5. Copilot code review costs 13 premium requests per review. Its approval does not count towards the merge.

#### Gate and holder

| Gate | Holder | Where it lives |
|---|---|---|
| Findings surfaced to a human, none auto-resolved | Human | The pull request's review comments; the run's `docs/research/fault-reporting/evidence/run-2026-09-27/adversarial-review.md` |
| An agent's review approval does not satisfy the merge | Platform rule, GitHub's default | Repository settings (`docs/governance-verification-results.md`, test 4) |

#### Failure mode

In the run, the first reviewer had been told which faults were seeded, so it was not blind. A second "fresh" reviewer was independent only in that it had a separate context; it identified itself as OpenAI Codex inside a Copilot session. "Independent review" has to say independent of what. Agent review does not replace the human approver. An agent may surveil another agent, "but definitely not itself" (D2 v2 section 4.5).

#### Worked example

The first review agent on the fault report found one Medium gap: the list test had one document and did not assert order, storage failure or the 1000-character boundary. Tests were added and the detected-mutant figure went from 63.64 percent (56 of 88) to 73.86 percent (65 of 88). Evidence: `adversarial-review.md`, `mutation/gap-analysis.md`, `mutation/revised-gap-analysis.md` under `docs/research/fault-reporting/evidence/run-2026-09-27/`.

#### How you know it worked

Every pull request gets a pass from an agent that is not the author; seeded defects found: report found and missed against two seeded defects per pull request; no finding auto-resolved. Review: 2 minutes per finding.

```bash
gh pr view <pr> --json reviews,comments
```

### 7.4 Judge whether the tests are correct (Red)

#### Steps

1. Run mutation testing over the tests the agent wrote, before a human modifies them. Backend:

```bash
pnpm --filter backend add -D @stryker-mutator/core @stryker-mutator/vitest-runner
pnpm --filter backend exec stryker run
gh run download <run-id> --name mutation-report
```

Frontend, where the config is already in the base:

```bash
pnpm --filter frontend mutation
```

The score is `mutationScore` in `reports/mutation/mutation.json`. Killed divided by valid mutants; errors are excluded from the denominator.

2. Apply seeded faults by hand in a throwaway working copy and run the suite after each. At least one test must fail for each seed.
3. The reviewer records their accept decision before and after seeing the score, and confirms the tests would catch a real fault.

#### Gate and holder

| Gate | Holder | Where it lives |
|---|---|---|
| Human confirms the tests would catch a real fault | Human, with the mutation score and the seed results as evidence | The review record. `backend/stryker.config.json` has `"thresholds": { "high": 80, "low": 60, "break": 0 }`, so Stryker itself enforces nothing |

#### Failure mode

Coverage does not measure correctness. The tests pass because the agent wrote tests that match the code it wrote, and CI green is read as "tested" when it means "ran". `break: 0` means no mutation run ever fails. New code has no mutation baseline by definition: the run had no frontend baseline to compare with, and the backend baseline (12.37 percent) was a different scope. A sub-agent that checks tests has the same next-token properties as the one that wrote them; it can widen coverage but cannot be an independent oracle.

#### Worked example

For the fault report, Zafir approved descriptive frontend mutation reporting with no percentage threshold plus two seeded faults that the tests must catch (`decisions.md`, 30 Sep 2026). Both seeded faults were caught. After the task 7.3 gap was closed, the detected-mutant figure rose from 63.64 percent to 73.86 percent. The missing baseline was recorded as an approved exception (`baseline.md`, `evidence/run-2026-09-27/mutation-proposal.md`).

#### How you know it worked

Mutation score per run over the tests the agent wrote, and the reviewer's accept decision recorded before and after seeing the score; the gate holds when the reviewer confirms the tests would catch a real fault. Benchmark: Stryker's documented thresholds, high 80, low 60, break unset. Review: 10 minutes per pull request.

### 7.5 Security scan and dependency audit (Green)

#### Steps

1. The Security Scan job runs `gitleaks/gitleaks-action@v3` over the commits and `pnpm audit --audit-level=high` over the dependencies.
2. In the trial two base, the secret scan also runs at pre-commit, so a secret is refused before it leaves the machine.
3. A named person dispositions every high-severity finding before merge.
4. Keep dependency upgrades out of the feature pull request. If the audit needs one, it is its own pull request with its own approval.
5. Read the findings and their disposition:

```bash
gh api repos/Peepachuu/nbn-sdlc-demo/dependabot/alerts --jq '.[] | {number, state, severity: .security_advisory.severity, dismissed_by: .dismissed_by.login, dismissed_reason}'
```

#### Gate and holder

| Gate | Holder | Where it lives |
|---|---|---|
| No high-severity finding, or each one dispositioned | CI check (advisory) on `main`; CI check (required) under the trial two ruleset | `.github/workflows/ci.yml`, job `security` |
| A secret is refused before commit | Hook (git), trial two base only | `lefthook.yml` and `scripts/check-secrets.js` at `6af6a5b` |
| Each high finding has a named disposition | Human | Dependabot alerts, `dismissed_by` and `dismissed_reason` |

#### Failure mode

On `main` a failed Security Scan does not block the merge. In the run, Gitleaks was not available locally, so the secret scan first ran in CI after a person had pushed. The dependency audit went from 0 high and 0 critical on 22 Sep 2026 to 1 critical and 8 high on 2 Oct 2026; commit `2c19c5d` bumped Next and added seven overrides inside the feature pull request while `tooling-and-security.md` at the same commit still said no upgrades were applied. The scope gate and the security gate pulled against each other, and the evidence fell behind the code.

#### Worked example

PR #31: Gitleaks 8.24.3 scanned five commits and found no leaks. PR #38: a synthetic AWS-style credential committed to `feature/gitleaks-verification` was detected in `gitleaks-test.txt` on line 2 under the `aws-access-token` rule, and the Security Scan job failed:

```text
Finding:     ...aws_access_key_id = REDACTED
Secret:      REDACTED
RuleID:      aws-access-token
File:        gitleaks-test.txt
Line:        2

1 commits scanned.
leaks found: 1

🛑 Leaks detected, see job summary for details
```

#### How you know it worked

Security Scan job green, or every high-severity finding dispositioned by a named human; count of undispositioned high findings at merge is zero. Review: 5 minutes per finding.

```bash
gh run list --branch <branch> --limit 50 --json databaseId,name,conclusion,headSha,createdAt,updatedAt
```

## 8. Stage 8: Deployment and iteration

Profile: leans autonomous for execution, intervention for judgement. ADR-002 specifies this stage to its handoff: from an approved merge to a verified deployment. Tasks 8.2 to 8.6 are not built in the repository. Four of the six rows cannot be measured on it.

### 8.1 Preview deployment on every PR (Green)

#### Steps

1. The hosting platform deploys a preview for every pull request and posts the URL on it. No step is needed from the developer.
2. Before review starts, check the pull request carries the preview URL and that it loads the final commit.
3. Read the deployments:

```bash
gh api repos/Peepachuu/nbn-sdlc-demo/deployments --jq '.[] | {id, environment, ref, created_at}'
```

#### Gate and holder

| Gate | Holder | Where it lives |
|---|---|---|
| Preview URL posted on the pull request | Platform rule, held by the hosting platform rather than the ruleset | The pull request's deployment status and comments |

#### Failure mode

When read on 2 Oct 2026, GitHub showed no commit status, no deployment and no hosting-platform comment for PR #63, although previews were posted on PRs #9, #14 and #43. In the same run the Firebase CLI stopped with a 403 for the service account; the rules were deployed through the Rules API and a person created the index in the console. The agent reached a permission boundary and a person crossed it.

#### Worked example

Previews were posted on PRs #9, #14 and #43.

#### How you know it worked

100 percent of pull requests carry a preview URL as a deployment status before review starts.

### 8.2 Progressive rollout: flags, canary rings, metric-gated automatic rollback (Green)

#### Steps

Not built in the repository. The task map: feature flags decouple deploy from release, rings ramp exposure, and rollback fires on a metric threshold without a human in the loop.

#### Gate and holder

| Gate | Holder | Where it lives |
|---|---|---|
| Success-rate and latency thresholds hold at each ring | Hook (rollout controller), as the task map labels it. None exists here | Not yet |

#### Failure mode

Not yet

#### Worked example

Not yet

#### How you know it worked

Benchmark-only on this repository: no rollout rings exist. Success-rate and latency thresholds hold at each ring; rollback fires without a human when a threshold breaks. Benchmark: DORA elite performers deploy on demand with change failure rate around 5 percent and recovery under one hour.

### 8.3 Production promotion approval (Red)

#### Steps

Not built in the repository. The task map: a named release owner records approval against the release. For NBN Co the SOCI Act may make the approval a regulated act.

#### Gate and holder

| Gate | Holder | Where it lives |
|---|---|---|
| Approval recorded against the release | Human, the release owner | Not yet |

#### Failure mode

Not yet

#### Worked example

Not yet

#### How you know it worked

Approval recorded against the release by a named release owner; count of production deploys without a recorded approval is zero.

```bash
gh api repos/Peepachuu/nbn-sdlc-demo/environments --jq '.environments[] | {name, protection_rules}'
```

### 8.4 Monitoring and alert triage (Amber)

#### Steps

Not built in the repository. The task map: AI summarises signals and correlates alerts, a human decides what they mean.

#### Gate and holder

| Gate | Holder | Where it lives |
|---|---|---|
| Every alert has a human disposition | Human | Not yet |

#### Failure mode

Not yet

#### Worked example

Not yet

#### How you know it worked

Benchmark-only on this repository: no production alerts exist. Every alert has a human disposition; measure time from alert to disposition.

### 8.5 Incident response and post-incident review (Red)

#### Steps

Not built in the repository. The task map: incidents are human in every source; a blameless post-incident record is written.

#### Gate and holder

| Gate | Holder | Where it lives |
|---|---|---|
| Blameless post-incident record written | Human | Not yet |

#### Failure mode

Not yet

#### Worked example

Not yet

#### How you know it worked

Benchmark-only on this repository. Blameless post-incident record written for every incident; repeat incidents of the same class fall over time.

### 8.6 Fold the learning back into context: rules files, skills, design system, ADRs (Amber)

#### Steps

Not built in the repository as a gated task. The prompt practice module gives the steps for the prompt and skill half of it:

1. Written: state the task, the context, the expected outcome, the acceptance criteria and what is out of scope.
2. Stored: a prompt useful beyond one conversation goes in the repository as `.github/prompts/<name>.prompt.md`. Repository-wide guidance goes in `.github/copilot-instructions.md`. A repeated multi-step procedure goes in `.github/skills/<skill-name>/SKILL.md`.
3. Versioned: the file changes through pull requests like any other file.
4. Shared: after review, the team reuses it. Only reviewed, stable material is promoted beyond the repository.
5. Promote a prompt to a skill when it has been used for at least three separate tasks, at least two people could use it, it has at least three ordered steps, it has been stable for two consecutive uses, and a team member has reviewed it. These five thresholds are the team's proposal; they have no external source.
6. Another team member reviews each new or changed prompt, instruction or skill: purpose clear, scope bounded, outcome defined, no secrets, stored in the agreed place, the right artefact type, and tested by the author.

For rules the tool chain can hold, the change goes into a hook, a CI job or an ADR, not an instructions file.

#### Gate and holder

| Gate | Holder | Where it lives |
|---|---|---|
| The change is in the repo, not in someone's chat history | Human, the reviewer of the pull request | `.github/prompts/`, `.github/copilot-instructions.md`, `.github/skills/`, `lefthook.yml`, `docs/adr/` |

A prompt file, a skill or an instructions file is itself No gate. It holds the knowledge; it does not hold a gate.

#### Failure mode

The one prompt the run reused is in two places in two wordings: `docs/research/fault-reporting/evidence/run-2026-09-27/planning-prompt.txt` and an earlier form in `runbook.md`. There is already no single reviewed copy.

#### Worked example

The planning prompt from task 6.1 has been used once, so by the module's own rule it stays a prompt. It is the first real candidate for `.github/prompts/`. The prompt file and the skill in the repository now are examples.

#### How you know it worked

Every review finding that names a rule ends as a merged change to the instructions file, a hook, or an ADR, not a chat message; count of findings with no repo change, target zero.

```bash
gh pr list --state merged --limit 100 --json number,title,mergedAt,files --jq '.[] | select(.files[].path | test("CLAUDE.md|copilot-instructions|^.claude/|lefthook.yml|^docs/adr/")) | {number, title, mergedAt}'
```

## 9. The four names

Every change carries four names (governance and token model, section 2).

| Name | Filled by | Source of the record |
|---|---|---|
| Human author of record | The committer | Git author on the commit |
| Agent co-author | The agent that contributed | `Co-Authored-By` trailer on the commit |
| Human approver | A person who is not the requester | Pull request review, enforced by the `main` ruleset |
| Accountable owner | Named in the AI register | `docs/AI-register.md` |

The accountable owner's obligation runs until the next release.

## 10. Words

Terms used in this manual, and the terms they replace (module reconciliation, section 4).

| Use | Meaning | Instead of |
|---|---|---|
| Copilot agent mode (VS Code) | Copilot editing the developer's workspace from the VS Code chat panel | "agent mode", "Copilot in VS Code" used loosely |
| Copilot cloud agent | Copilot assigned a GitHub issue, working on its own branch and opening the pull request | "Copilot coding agent", "the agent" |
| Copilot CLI | The lane the fault report run used | "Copilot App", "Copilot session" |
| Lane | One of the three above. A statement about Copilot names its lane | "Copilot does X" with no lane |
| Gate | A point where work stops until something lets it through | "control", "check", "checkpoint" as synonyms |
| Holder | What holds a gate | "Classification", "Gate mechanism", "Control type" |
| Hook (git) | A git hook installed by lefthook | "Hook" alone |
| Hook (agent) | A hook inside one tool. Fails open on timeout in Copilot | "Hook" alone |
| CI check (required) | A GitHub Actions job the ruleset lists | "CI must pass" |
| CI check (advisory) | A job that runs and reports and does not block the merge | "CI gate" |
| Platform rule | The `main` ruleset: two approvals, squash only, no force push, no delete | "CI check (ruleset)", "Control type: Human" |
| Human | A person makes a judgement | |
| No gate | The rule is written down and nothing holds it | "Advisory" |
| Instructions file | `.github/copilot-instructions.md` (Claude Code: `CLAUDE.md`) | "repository guidance", "rules file" |
| Prompt file | `.github/prompts/<name>.prompt.md` | "saved prompt", "slash command" |
| Skill | `.github/skills/<name>/SKILL.md` | "procedure" |
| Trailer | The `Co-authored-by:` line on a commit. Git matches the key in any case | "attribution", "co-author tag" |
| AI declaration | The two checkboxes in the pull request template that the AI Declaration job reads | "AI disclosure" |
| The four names | Human author of record, Agent co-author, Human approver, Accountable owner | "accountability chain" roles under other names |
| AI Credits | The unit Copilot bills on the Student plan | "premium requests", "tokens" for Copilot |
| Task 6.3 | Task ids from the map, always with the number | "the PR step" |
| Section | A part of this manual | "module", kept for the four source files only |
