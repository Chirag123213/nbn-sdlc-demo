# 8. Governance

**Owner:** Sidney Zeng
**Planner card:** [PM] - Results and cost analysis, and governance chapter : 240
**Status:** Draft
**Checked against:** `main` at `44557a3`, 18 Oct 2026. The trial two base `6af6a5b` (tag `trial2-base`). The trial two build branches at the commits frozen on 18 Oct 2026: `9ahmedfr/nbn-run2-ai-only` at `f1611e0`, `Chirag123213/nbn-run2-copy-paste-1` at `ed173dc` and `Peepachuu/nbn-run2-gated` at `40c65f5`. `Peepachuu/nbn-sdlc-demo#75` at `0b349ca`.

---

## 1. In one paragraph

Every AI-assisted change needs four names: the person who committed it, the agent that helped, a person who approved it, and the person accountable for the AI use. The repository can hold three of them. Git records the author, a CI check can refuse an AI-declared pull request that carries no agent trailer, and the `main` ruleset refuses a merge without two approvals. Only a person keeping the AI register holds the fourth, and nothing at all stops a credential being pasted into a chat. In our two trials each of these broke without any tool reporting it: a private key went into a chat window, Codex wrote a different model into its trailer from the one it was set to, and a ruleset stopped applying when a build moved to another repository. This chapter gives the steps to set each gate up, what holds it, and the check that shows it held.

## 2. What this chapter covers

| Covered | Not covered, and where it is instead |
| --- | --- |
| The four names, and what holds each one | Writing the commit and adding the trailer: chapter 3, task 6.2 |
| Registering an AI use case before it is used | What each build cost: chapter 7 |
| Setting up an environment without the agent seeing a credential | Secret scanning of commits: chapter 3, task 7.5 |
| Task 6.3: the AI declaration, the agent trailer and the prompt record | Reviewing an agent's diff: chapter 3, task 6.4 |
| Task 6.4: the approval gate before merge | Deployment and rollback steps: chapter 3, stage 8 |
| Recording AI usage for every task, in the tool's own unit | Pricing that usage: chapter 7 |
| Task 8.3: production promotion approval | Copyright and licence in agent-written code: not covered, section 5 |
| The seven rules NBN Co adopts, and who holds each | Copilot controls that need GitHub Enterprise: not tested, section 5 |

## 3. The chapter

Governance in this manual means one thing: for any AI-assisted change, you can name a person for each of the four names, and every gate that protects them has a holder you can test. On `main` at `44557a3` they stand like this.

| Name | Where it is recorded | What holds it | On `main` at `44557a3` |
| --- | --- | --- | --- |
| Human author of record | Git author on the commit | Git records it on every commit | Recorded |
| Agent co-author | `Co-authored-by:` trailer on a commit | CI check, AI Attribution | Not checked. The job is in PR #72 and in the trial two repositories |
| Human approver | Approving reviews on the pull request | Platform rule: two approvals, squash only | In force, tested on PR #43 |
| Accountable owner | A row in `docs/AI-register.md` | Human | Four rows, last reviewed 27 Sep 2026 |

Seven rules sit on top, taken from the Commonwealth's Policy for the responsible use of AI in government. That policy binds non-corporate Commonwealth entities. NBN Co is a corporate Commonwealth entity, so the paper adopts the policy as the nearest model, not as an obligation (`docs/reports/governance-and-token-model.md`, section 5).

| # | Rule | Holder |
| --- | --- | --- |
| 1 | No personal or sensitive information into a public model | Hook (agent) where the pattern is known, which fails open on timeout in Copilot agent mode (VS Code). Human for the rest |
| 2 | Every AI use case has an accountable owner and a register entry | Human |
| 3 | Human oversight matched to autonomy and stakes | Human, with CI checks as the floor |
| 4 | Deploys to critical-infrastructure assets stay inside a written risk management program | Human |
| 5 | WCAG AA minimum on anything public | CI check plus Human |
| 6 | Generated artefacts for First Nations audiences are hypotheses until validated with the community | Human |
| 7 | Security and resilience are part of operations | CI check plus Human |

A hook or a check can hold two of the seven. People hold the other five, so most of the tasks below are about making sure a person does the step and leaves a record of it.

### Pattern A: how to do it

#### Before stage 5: register the AI use case

This is not a D4 task. It comes first because every other gate in this chapter assumes the register row exists.

**Steps.**

1. Before anyone uses a new tool, model or use case, add a row to `docs/AI-register.md` on a branch and open a pull request.
2. Name one person as the accountable owner. "The team" is not an owner.
3. Write what a task may cost, in the tool's own unit, and the obligation period: until the next release.
4. Review the register at every sprint close, and whenever a tool or model changes.

`docs/AI-register.md`

```markdown
| ID | Use case | Accountable owner | Tool and model | Where it runs | What a task may cost | Obligation | Evidence |
|---|---|---|---|---|---|---|---|
| AI-04 | Showcase comparison builds | Sidney Zeng | OpenAI, GPT-5.6 Sol at high effort | Codex and ChatGPT, against the three showcase repositories | Four hours of active time per build, within plan limits | Until the showcase closes | `showcase-run-sheet.xlsx` |
```

**Gate and holder.**

| Gate | Holder | Where it lives |
| --- | --- | --- |
| A use case has a named owner before it is used | Human | `docs/AI-register.md` |
| A change to the register is approved by two people | Platform rule | `main` ruleset |

**Failure mode.** The register did not exist until the governance and token model created it on 27 Sep 2026. Its first incident row is dated 25 Sep 2026, so trial one's builds were under way before their row was written. The same gap is open now. AI-04 covers the showcase builds "until the showcase closes". Trial two is a separate run, on 17 and 18 Oct 2026, and has no row of its own (section 5).

**Worked example.** AI-04 went into `main` through PR #58, merged on 4 Oct 2026 as `3f00377`, with the two approvals the ruleset requires. It names Sidney Zeng as owner, the model and effort, where the builds ran and the time limit, and its incident row records trial one's key exposure and what was done about it. It does not record the date the row was written. Add that column, so a reviewer can see whether a row came before the use.

**How you know it worked.** No row in `docs/research/success-metrics-stages-5-8.md` covers the register. The check is a count: every AI tool and model used in the sprint maps to a register row dated before its first use, and the number without one is zero. List the agents named in commit trailers with the S9.3 command in task 6.3 below, and match each one to a row.

#### Before task 6.1: set up the environment without the agent

This is not a D4 task either. It is where trial one's incident happened.

**Steps.**

1. Enter every key yourself, in the Firebase and Vercel dashboards. The agent does not do set-up, and no credential goes into an AI chat, in any lane, for any reason (`docs/AI-register.md`, rules).
2. Keep key files out of anything you hand to a chat tool. If a chat tool needs the repository as a zip, make the zip with git, which leaves out ignored files such as `.env.local`:

`docs/research/trial-two/run-sheets/run-sheet-lane-B-Chirag.xlsx`, Steps tab, set-up (PR #75)

```bash
git archive --format=zip -o ~/Downloads/nbn-run2-copy-paste.zip HEAD
```

3. If a key does reach a chat, treat it as exposed. Rotate it, delete any share link to the chat, and add an incident row to the register.

**Gate and holder.**

| Gate | Holder | Where it lives |
| --- | --- | --- |
| No credential enters an AI chat | Human. No tool watches the chat window | `docs/AI-register.md`, rules |
| A secret committed to git is found | CI check (advisory), gitleaks | `.github/workflows/ci.yml`, job `security` |
| A secret is refused before it is committed | Hook (git), in the trial two repositories only | `lefthook.yml` and `scripts/check-secrets.js` at `6af6a5b` |

**Failure mode.** On 25 Sep 2026, during trial one's set-up, a Firebase service-account private key was pasted into a chat window in one lane. No gate fired. Secret scanning watches commits, the AI declaration asks about AI use, and the ruleset acts only on a merge. The model reported the exposure itself, afterwards, and the key was rotated (`docs/AI-register.md`, incidents; governance and token model, section 9).

**Worked example.** Trial two ran under this rule. Every builder's run sheet had them type keys into the dashboards, and lane B's repository went to ChatGPT as a `git archive` zip. That leaves out `.env.local`, which is where this repository keeps `FIREBASE_SERVICE_ACCOUNT_KEY_BASE64` (`.env.example`). Whether any key reached a chat in trial two is not yet known: the Incidents sections of the three run logs were blank on 18 Oct 2026 (section 5).

**How you know it worked.** Each run log's Incidents section says "None", and the register's Incidents table has no new row. No row in the success metrics covers this step.

#### Task 6.3: Open a draft PR with description and provenance

**Steps.**

1. Open the pull request from the template, `.github/pull_request_template.md`, and tick one of the two AI use boxes.
2. If AI was used, fill in "Tool/model" and "What the AI contributed" from the tool's own settings, not from the agent's account of itself.
3. Make sure at least one commit on the branch carries the agent's trailer. Copilot agent mode (VS Code) adds none by default. Chapter 3, task 6.2 has the setting that turns it on.
4. Fill in the confidence card: plan, assumptions, alternatives and known edge cases.
5. Before you ask for review, read the trailers on the branch:

`docs/research/success-metrics-stages-5-8.md`, S9.3

```bash
git log --format='%h %an %ad%n%(trailers)' --date=iso origin/main..HEAD
```

**Gate and holder.**

| Gate | Holder | Where it lives |
| --- | --- | --- |
| The AI declaration is answered | CI check (required) | `.github/workflows/ci.yml`, job `ai-declaration` |
| An AI-declared pull request carries an agent trailer | CI check, AI Attribution. Not on `main`: it is in PR #72 and in the trial two repositories | `.github/workflows/ci.yml` at `6af6a5b`, job `ai-attribution` |
| The confidence card is filled in | No gate | `.github/pull_request_template.md` |
| The prompt is recorded | No gate | Nowhere in the repository |

**Failure mode.** The trailer records what the agent believes about itself. In trial two, Codex wrote `OpenAI Codex GPT-5` on lane C's test commit `0d162bd`, while Zafir Hasan's model-setting screenshot shows GPT-5.6 Sol at high effort. Lane A's feature commit `5af6de8` carries `OpenAI Codex (GPT-5)`. The check also counts trailers per pull request, not per commit. On lane C, one of seven commits carries a trailer and the feature commit `f9c9877` carries none, and that passes. Nothing anywhere records the prompt. The trials recorded prompts in their run logs, which is an experiment record, not a gate (governance and token model, section 3).

**Worked example.** On 20 Sep 2026 Chirag Wadehra's commit `20755e0` carried `Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>`. When PR #47 was squash merged, the trailer survived onto `main` as `2c9a958` (`docs/governance-verification-results.md`, test 5). On PR #43, leaving both AI declaration boxes unticked failed the required AI Declaration check while the other checks passed, and ticking the AI-assisted box passed it again (test 2).

**How you know it worked.** The row for task 6.3 in `docs/research/success-metrics-stages-5-8.md`: 100 percent of pull requests opened by the agent carry the attribution record (author, model, session link) in the PR body or the commit trailers. Read the trailers with the S9.3 command above and compare the model each one names with the tool's own setting.

#### Task 6.4: Human code review and merge approval

This block covers the approval gate. How to review the diff itself is in chapter 3, task 6.4.

**Steps.**

1. Ask two people who did not write the change to review it. A Copilot code review can comment, but its approval does not count.
2. Merge only with **Squash and merge**, once both approvals are in and the required check has passed.
3. Do not add Copilot as a bypass actor on the ruleset. That would let the Copilot cloud agent skip the approvals (`docs/modules/git-commits.md`, "Copilot pull request rules").
4. Before you rely on the gate, check that the repository your pull request targets has the ruleset:

`docs/research/success-metrics-stages-5-8.md`, S9.6

```bash
gh api repos/Peepachuu/nbn-sdlc-demo/rulesets --jq '.[] | {name, enforcement, target}'
```

**Gate and holder.**

| Gate | Holder | Where it lives |
| --- | --- | --- |
| Two approving reviews before merge | Platform rule | `main` ruleset, `docs/research/fault-reporting/evidence/main-ruleset-detail.json.txt` |
| Squash merge only, no force push, no deletion | Platform rule | The same ruleset |
| Copilot code review approvals do not count | Platform rule, GitHub's default | Repository settings (`docs/governance-verification-results.md`, test 4) |
| The approver is not the person who asked for the change | Human | The pull request's reviews |

**Failure mode.** A ruleset belongs to one repository and does not follow the code. On 17 Oct 2026 Ahmed Falulur Rahuman moved the lane A build, with Sidney Zeng's agreement, to `9ahmedfr/nbn-run2-ai-only`, which has no ruleset, so neither the two approvals nor the required checks gated its pull request. On 18 Oct 2026 Zafir Hasan forked lane C to `Peepachuu/nbn-run2-gated`, which has no ruleset either, so its pull request #2 there is ungated; the copy he also opened on the original repository, `zacclarkson/nbn-run2-gated` #11, is gated (`Peepachuu/nbn-sdlc-demo#75`, section 9, amendments 4 and 6). Nothing warned anyone. The ungated pull requests looked the same as gated ones.

**Worked example.** On PR #43, with every check green and no approvals, the merge was refused from the repository owner's account and from a collaborator's, with "At least 2 approving reviews are required by reviewers with write access." (`docs/governance-verification-results.md`, test 1).

**How you know it worked.** The row for task 6.4 in `docs/research/success-metrics-stages-5-8.md`: approved by someone other than the author, CI green and branch protection in force, measured by time to first review and review minutes per pull request. The S9.6 command shows the ruleset is in force. The `gh pr view` command in S9.3 lists who approved.

#### Every task: record the AI usage

This is not a D4 task. It feeds chapter 7, which prices the usage.

**Steps.**

1. Read the tool's usage display before the first prompt and again when the task ends. Record both in the tool's own unit: AI Credits for Copilot, tokens for Codex and Claude Code.
2. Record the human minutes beside it: instructing, reviewing and correcting, written down as they happen.
3. Start a new record when the model changes, the session changes or a quota resets.
4. Do not convert one unit into another. To compare tools, price tokens at the API list price and write down the price and the date you read it.

**Gate and holder.**

| Gate | Holder | Where it lives |
| --- | --- | --- |
| Usage is recorded before and after each task | No gate | `docs/research/fault-reporting/credit-log.md` |
| A task stays within what the register allows | Human, the accountable owner | `docs/AI-register.md`, "What a task may cost" |

**Failure mode.** Every usage cell for the fault report still says "Pending" in the credit log on `main` at `44557a3`, so the AI cost of the proof of concept was never recorded. The tools also report usage in units that do not compare. ChatGPT shows no token figures at all. In trial two, the Codex desktop app showed lane C only the share of its five-hour allowance left, 97 percent before the build and 11 percent after it on 18 Oct 2026, which cannot be priced.

**Worked example.** Lane A of trial two, Ahmed Falulur Rahuman's run log: 0 tokens before prompt 1 on 17 Oct 2026, and 6,666,353 input tokens, 6,534,272 of them cached, and 42,060 output tokens when the pull request opened on 18 Oct 2026 (Log tab). Chapter 7 prices them.

**How you know it worked.** Every task has a reading before and after, in the tool's own unit, and the count of tasks without one is zero. The operational cost line under each stage in `docs/research/success-metrics-stages-5-8.md` says what a task should cost.

#### Task 8.3: Production promotion approval

**Steps.**

1. Name a release owner for the release.
2. Record their approval against the release before anything reaches production.
3. Keep the register owner's obligation open until that release ships.

**Gate and holder.**

| Gate | Holder | Where it lives |
| --- | --- | --- |
| A named release owner approves the release | Human, a regulated act where SOCI applies | Not yet in this repository |
| Firestore rules reach production only through `main` | Platform rule plus a CI workflow | `.github/workflows/deploy.yml`, environment `production` |

**Failure mode.** On this repository the merge is the release for Firestore rules. `deploy.yml` deploys `firebase/firestore.rules` to production on every push to `main` that changes the file, so the two approvals on the pull request are the only approval production gets (`docs/governance-verification-results.md`, test 3). Whether the `production` environment has required reviewers set in GitHub is not recorded (section 5).

**Worked example.** Not yet. Nothing in this project has been promoted to a production release.

**How you know it worked.** The row for task 8.3 in `docs/research/success-metrics-stages-5-8.md`: approval recorded against the release by a named release owner, and the count of production deploys without a recorded approval is zero.

## 4. Claims and evidence

| # | Claim, in the chapter's words | Section | Evidence | Status |
| --- | --- | --- | --- | --- |
| 1 | Every AI-assisted change needs four names: author, agent co-author, approver, accountable owner | 1, 3 | `docs/reports/governance-and-token-model.md`, section 2 | Documented, not run |
| 2 | Git records the author on every commit | 3 | `git log` on `main` at `44557a3` | Run |
| 3 | On `main` no CI check reads the agent trailer; the AI Attribution job is in PR #72 and in the trial two base | 3, 6.3 | `.github/workflows/ci.yml` at `44557a3` and at `6af6a5b`; `Peepachuu/nbn-sdlc-demo#72` | Run |
| 4 | The `main` ruleset requires two approving reviews, squash merge only and the AI Declaration check, and blocks deletion and force pushes | 3, 6.4 | `docs/research/fault-reporting/evidence/main-ruleset-detail.json.txt` | Run |
| 5 | The register has four rows and was last reviewed on 27 Sep 2026 | 3 | `docs/AI-register.md` | Run |
| 6 | The Commonwealth policy binds non-corporate Commonwealth entities, and NBN Co is a corporate one | 3 | `docs/reports/governance-and-token-model.md`, section 5 (slice 3 Module 6, with fetch dates) | Documented, not run |
| 7 | The seven rules and their holders | 3 | `docs/reports/governance-and-token-model.md`, section 5 | Documented, not run |
| 8 | A Copilot hook fails open on timeout in Copilot agent mode (VS Code) | 3 | `docs/research/claude-copilot-mechanism-map.md`, test of 22 Sep 2026 | Run once |
| 9 | The register was created on 27 Sep 2026, after its first incident on 25 Sep 2026 | Register | `docs/reports/governance-and-token-model.md`, section 2; `docs/AI-register.md`, incidents | Run |
| 10 | Trial two ran on 17 and 18 Oct 2026 and has no register row | Register | `docs/AI-register.md` at `44557a3`; `Peepachuu/nbn-sdlc-demo#75`, section 9, amendments | Run |
| 11 | The register went into `main` through PR #58, merged on 4 Oct 2026 as `3f00377` | Register | `Peepachuu/nbn-sdlc-demo#58`; commit `3f00377` | Run |
| 12 | No credential goes into an AI chat, in any lane | Set-up | `docs/AI-register.md`, rules | Run |
| 13 | `git archive` leaves ignored files such as `.env.local` out of the zip | Set-up | git documentation, `git archive`; `.gitignore` at `44557a3` | Documented, not run |
| 14 | The gitleaks job is a CI check (advisory) on `main` | Set-up | `.github/workflows/ci.yml`, job `security`; `docs/research/fault-reporting/evidence/main-ruleset-detail.json.txt` | Run |
| 15 | The pre-commit secret scan exists only in the trial two base | Set-up | `lefthook.yml` at `6af6a5b` and at `44557a3` | Run |
| 16 | On 25 Sep 2026 a service-account private key was pasted into a chat during set-up, no gate fired, the model reported it and the key was rotated | Set-up | `docs/AI-register.md`, incidents; `docs/reports/governance-and-token-model.md`, section 9 | Run once |
| 17 | Trial two's run sheets had builders type keys into the dashboards, and lane B zipped its repository with `git archive` | Set-up | `docs/research/trial-two/run-sheets/` (`Peepachuu/nbn-sdlc-demo#75` at `0b349ca`) | Run once |
| 18 | This repository keeps `FIREBASE_SERVICE_ACCOUNT_KEY_BASE64` in its environment file | Set-up | `.env.example` at `44557a3` | Run |
| 19 | The three trial two run logs had blank Incidents sections on 18 Oct 2026 | Set-up | Lanes B and C: `docs/research/technician-dispatch/evidence/run-log.xlsx` at `ed173dc` and `40c65f5`. Lane A: `docs/research/trial-two/run-sheets/run-sheet-lane-A-Ahmed.xlsx` (`Peepachuu/nbn-sdlc-demo#75` at `0b349ca`) | Run once |
| 20 | Codex wrote `OpenAI Codex GPT-5` on lane C's commit `0d162bd`, while the model setting showed GPT-5.6 Sol at high effort | 6.3 | `Peepachuu/nbn-run2-gated` at `40c65f5`: commit `0d162bd`; `docs/research/technician-dispatch/evidence/model_setting.png` | Run once |
| 21 | Lane A's feature commit `5af6de8` carries `OpenAI Codex (GPT-5)` | 6.3 | `9ahmedfr/nbn-run2-ai-only` at `f1611e0` | Run once |
| 22 | On lane C one of seven commits carries a trailer, and the feature commit `f9c9877` carries none | 6.3 | `Peepachuu/nbn-run2-gated`, `6af6a5b..40c65f5` | Run once |
| 23 | Nothing in the repository records the prompt for routine work | 6.3 | `docs/reports/governance-and-token-model.md`, section 3 | Run |
| 24 | Copilot agent mode (VS Code) adds no trailer by default | 6.3 | `docs/modules/git-commits.md`, "Provenance" | Documented, not run |
| 25 | A trailer on `20755e0` survived the squash merge of PR #47 onto `main` as `2c9a958` | 6.3 | `docs/governance-verification-results.md`, test 5 | Run once |
| 26 | An unanswered AI declaration failed the required check on PR #43, and an answered one passed | 6.3 | `docs/governance-verification-results.md`, test 2 | Run once |
| 27 | A merge with no approvals was refused from the owner's and a collaborator's account on PR #43 | 6.4 | `docs/governance-verification-results.md`, test 1 | Run once |
| 28 | No repository setting lets Copilot approvals count towards merge | 6.4 | `docs/governance-verification-results.md`, test 4 | Run once |
| 29 | Adding Copilot as a ruleset bypass actor would let the Copilot cloud agent skip approvals | 6.4 | `docs/modules/git-commits.md`, "Copilot pull request rules" (GitHub Docs, fetched 28 Sep 2026) | Documented, not run |
| 30 | Lane A moved, with Sidney Zeng's agreement, to a repository with no ruleset on 17 Oct 2026, and lane C was forked to one with no ruleset on 18 Oct 2026; lane C's second pull request, #11 on the original repository, is gated | 6.4 | `Peepachuu/nbn-sdlc-demo#75`, section 9, amendments 4 and 6; pull request refs on `zacclarkson/nbn-run2-gated`, read 18 Oct 2026 | Run once |
| 31 | Every usage cell for the fault report says "Pending" in the credit log | Usage | `docs/research/fault-reporting/credit-log.md` at `44557a3` | Run |
| 32 | ChatGPT shows no token figures | Usage | `docs/reports/governance-and-token-model.md`, section 6; `docs/research/technician-dispatch/evidence/token-usage.md` on `Chirag123213/nbn-run2-copy-paste-1` at `ed173dc` | Run once |
| 33 | Lane C's usage screenshots show 97 percent of the five-hour allowance left before the build and 11 percent after, on 18 Oct 2026 | Usage | `docs/research/technician-dispatch/evidence/start_tokens.png` and `end_tokens.png` on `Peepachuu/nbn-run2-gated` at `40c65f5` | Run once |
| 34 | Lane A used 6,666,353 input tokens, 6,534,272 of them cached, and 42,060 output tokens | Usage | `docs/research/trial-two/run-sheets/run-sheet-lane-A-Ahmed.xlsx`, Log tab (`Peepachuu/nbn-sdlc-demo#75` at `0b349ca`) | Run once |
| 35 | `deploy.yml` deploys Firestore rules to production on every push to `main` that changes them | 8.3 | `.github/workflows/deploy.yml`; `docs/governance-verification-results.md`, test 3 | Run |
| 36 | The success criteria for tasks 6.3, 6.4 and 8.3 | 6.3, 6.4, 8.3 | `docs/research/success-metrics-stages-5-8.md`, sections 4 and 6 | Documented, not run |

## 5. Limits and open questions

| # | Limit or open question | Owner | What it blocks |
| --- | --- | --- | --- |
| 1 | Copyright and licence in agent-written code need counsel. This chapter takes no legal position | Sidney Zeng, to raise with Alessio Bonti | Chapter 9 |
| 2 | The AI Attribution check and the pre-commit secret scan are in PR #72 and the trial two repositories, not on `main` | Zafir Hasan | Task 6.3, the set-up block |
| 3 | Once PR #72 merges, AI Attribution holds nothing until the `main` ruleset lists it as a required check | Zac Clarkson | Task 6.3 |
| 4 | Nothing records the prompt for routine work | Sidney Zeng | Task 6.3 |
| 5 | Copilot cloud agent attribution is documented, not tested. Nobody on the team has cloud agent access | Zafir Hasan, owner of AI-02 | Task 6.3 |
| 6 | Trial two has no register row. AI-04 covers the showcase only | Sidney Zeng | The register block |
| 7 | Whether any credential reached a chat in trial two. The run logs' Incidents sections were blank on 18 Oct 2026 | Sidney Zeng | The set-up block |
| 8 | Lane C's usage is recorded only as a share of the allowance, and the fault report's not at all | Zafir Hasan | The usage block, chapter 7 |
| 9 | No release owner or release approval record exists, and whether the `production` environment has required reviewers is not recorded | Chirag Wadehra, infrastructure specification | Task 8.3 |
| 10 | Copilot controls that need GitHub Enterprise (enterprise policies, content exclusion, MCP allowlists, agent management) were not tested. NBN Co runs GitHub Enterprise, so they are available to it | Sidney Zeng, to ask Alessio Bonti for an enterprise sandbox | Section 3 |

## 6. New terms

| Term | Meaning |
| --- | --- |
| Release owner | The named person who approves a production release, task 8.3 |

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