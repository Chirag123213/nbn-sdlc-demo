# SDLC Model Requirements

# Pass 1 - Slice 1 Lifecycle Requirements

**Owner:** Ahmed Falulur Rahuman  

**Planner card:** [PRD] - Requirements pass 1, off slice 1 : 90  

**Pass:** 1 - Research Slice 1

## Problem statement

We need a clear SDLC model that shows where AI can help, where humans still need to be involved, and what checks should happen before AI-assisted work moves forward. The model should be practical for large software teams and easy to follow across the whole lifecycle.

## Target user

The main users are developers, testers and architects working in organisations with 100+ developers. We are using one shared lifecycle for everyone, with different levels of detail for junior and experienced users. For now, the junior layer comes first.

## User stories

### US-01 - Show where AI fits in the lifecycle

**Source:** Slice 1 - lifecycle structure

**User story:**  

As a developer, tester or architect, I want to see where AI fits across the SDLC, so I know where it can help and where humans still need to be involved.

**Acceptance criteria:**

- The model shows all eight lifecycle stages.
- It is clear that teams can move back and forth between stages instead of following a strict waterfall.
- Each stage shows the main AI and human responsibilities.

---

### US-02 - Explain the red, amber and green model

**Source:** Slice 1 - red/amber/green model

**User story:**  

As a developer, tester or architect, I want AI tasks to be clearly marked as red, amber or green, so I can quickly understand how much human involvement is needed.

**Acceptance criteria:**

- Red means the human makes the decision or approval.
- Amber means AI helps, but a human checks and approves the result.
- Green means AI can carry out the task while a human monitors it.
- Colours are applied to tasks, not the whole stage.

**Flag:** Leon's worked examples may still change how the red, amber and green model is explained.

---

### US-03 - Check AI-generated requirements and user insights

**Source:** Slice 1 - Stage 2 and Stage 4

**User story:**  

As a BA or developer, I want AI-generated requirements and user insights to be checked by a human, so incorrect assumptions do not get treated as real requirements.

**Acceptance criteria:**

- AI-generated user stories are treated as drafts until a human checks them.
- Requirements have clear and testable acceptance criteria before they are treated as ready.
- AI-generated user journeys or user insights are checked against real users, stakeholders or existing evidence.

**Flag:** Slice 1 proposes changing Stage 2 from GREEN to AMBER and journey mapping from GREEN to AMBER.

---

### US-04 - Verify AI-generated work before accepting it

**Source:** Slice 1 - approval gates; D2 - verification gap

**User story:**  

As a tester or developer, I want AI-generated work to be checked before it is accepted, so mistakes or made-up information are caught early.

**Acceptance criteria:**

- The model shows who is responsible for checking AI-generated work.
- The work is checked against its requirements or acceptance criteria.
- If the check fails, the work must be corrected before it moves forward.

---

### US-05 - Record AI involvement and responsibility

**Source:** Slice 1 - auditability; D2 - liability and authorship

**User story:**  

As a developer, tester or architect, I want AI-assisted changes to record what AI did and who approved it, so the change can be understood later and responsibility is clear.

**Acceptance criteria:**

- The AI tool or agent used is recorded.
- The important change and human approval are recorded.
- A human role is responsible for the final approval.

---

### US-06 - Put safeguards around AI agents

**Source:** Slice 1 - prompt-injection, supply-chain risk and regulatory controls

**User story:**  

As a developer or architect, I want limits around what an AI agent can access and change, so it cannot make unsafe or unrelated changes.

**Acceptance criteria:**

- The model shows what files, tools or systems an agent is allowed to access.
- Important security, legal, accessibility and organisational rules are enforced outside the AI where needed.
- AI agents are not allowed to approve or police their own work.

---

### US-07 - Show when AI can be given more responsibility

**Source:** Slice 1 - governance thresholds and Stage 8

**User story:**  

As an architect or developer, I want to know what needs to be true before AI is given more responsibility, so we do not automate high-risk work too early.

**Acceptance criteria:**

- The model shows what checks or evidence are needed before AI gets more control.
- Higher-risk tasks require stronger human oversight.
- Deployment, rollback and incident decisions clearly show where human approval is still required.

---

### US-08 - Show how AI affects teamwork and review

**Source:** D2 - collaboration, handoffs and decision load

**User story:**  

As a member of a software team, I want the model to show how AI changes handoffs and review work, so faster AI output does not create confusion or too much work for reviewers.

**Acceptance criteria:**

- The model shows how work is handed between roles.
- Teams have a shared place for requirements and acceptance criteria.
- Human review points are clearly shown.
- The model considers review workload, not just how fast AI can produce work.

---

### US-09 - Show when a prototype can be used as the specification

**Source:** D2 - requirements and specification gap

**User story:**  

As a BA or developer, I want the model to show when prototype feedback is enough to guide the work and when written requirements are still needed, so the team has a clear source of truth.

**Acceptance criteria:**

- The model distinguishes prototype or screen-based work from backend or non-visual changes.
- The model makes it clear what the source of truth is for the work.
- Written requirements are still required when a prototype cannot clearly describe the change.

---

### US-10 - Show what actually happens inside each lifecycle stage

**Source:** Slice 1 - lifecycle structure and stage mechanics

**User story:**  

As a developer, tester or architect, I want each lifecycle stage to show the actual steps, tools and checks involved, so I know what to do next instead of only seeing a high-level stage name.

**Acceptance criteria:**

- Each stage includes the main actions or artifacts involved.
- Each stage shows who or what is responsible, such as a human, agent or sub-agent.
- A reader can tell what the next step or approval point is from the model.

---

## Unresolved questions

These still need clarification:

1. What is the minimum human check required at each stage?
2. What AI audit information does NBN need to keep?
3. What should allow a task to move from amber to green?
4. Does the team agree with changing Stage 2 from GREEN to AMBER?
5. Does the team agree with changing journey mapping from GREEN to AMBER?
6. Which NBN rules or regulations need to be enforced as hard limits?
7. How much control should AI have over deployment and rollback?
8. What should be the default way of handling collaboration and review when AI speeds up development?

## Pass 1 note

This is the first requirements pass. Later research, developer interviews and test findings can update these stories if new evidence changes what we currently know.

---

# Pass 2 - Slice 2 Build Requirements

**Planner card:** [PRD] - Requirements pass 2, off slice 2 : 90

**Pass:** 2 - Research Slice 2

## User stories

### US-11 - Keep each commit focused on one change

**Source:** Slice 2 - Module 2: How a commit is done

**User story:**

As a developer, I want each commit to contain one clear change, so it is easier to review, understand and roll back.

**Acceptance criteria:**

- Each commit represents one logical change.
- Commit messages follow the repository's Conventional Commits format.
- If a change contains multiple separate purposes, it is split before review.

---

### US-12 - Require independent approval for AI-assisted pull requests

**Source:** Slice 2 - Module 3: How branches become merges

**User story:**

As a developer, I want AI-assisted pull requests to be reviewed by someone who did not create or request the change, so the final decision is independent.

**Acceptance criteria:**

- The person who created or requested the AI-assisted change cannot be the only approver.
- CI checks must pass before the pull request is merged.
- A human reviewer checks the actual code changes and test plan before approval.

---

### US-13 - Add secret scanning to CI

**Source:** Slice 2 - Module 4: How harnesses are used

**Buildable:** Yes

**User story:**

As a developer, I want CI to check for exposed secrets, so credentials are caught before they are merged into the repository.

**Acceptance criteria:**

- Secret scanning runs automatically on pull requests.
- The check fails when a likely secret is detected.
- A detected secret must be removed or resolved before the change is merged.

---

### US-14 - Check whether AI-written tests actually catch bugs

**Source:** Slice 2 - Module 4: How harnesses are used

**Buildable:** Yes

**User story:**

As a tester or developer, I want AI-written tests to be checked using mutation testing, so passing tests do not give false confidence.

**Acceptance criteria:**

- Mutation testing can be run against AI-written tests.
- The mutation score is recorded before a human changes the generated test file.
- The team defines a minimum mutation-score threshold before it is used as a gate.

---

### US-15 - Enforce the design system during build

**Source:** Slice 2 - Module 5: Design-system enforcement in build

**User story:**

As a developer or designer, I want AI-generated interfaces to follow the real design-system rules, so generated work does not introduce incorrect styles.

**Acceptance criteria:**

- Generated UI uses the design tokens stored in the repository.
- Visual differences are checked using a screenshot or overlay comparison.
- Updating the visual baseline requires human review.

---

### US-16 - Make the deployment gate clear

**Source:** Slice 2 - Module 6: Deploy mechanics

**User story:**

As a developer, I want the model to clearly show when merging a change also deploys it, so I know the final human approval point before production.

**Acceptance criteria:**

- The model states whether merging to `main` automatically deploys the change.
- If merging is the deployment gate, final pull-request approval is shown as the last human decision before production.
- If manual promotion is used, it is shown as a separate human approval step.

## Pass 2 note

These requirements add the build-level mechanics identified in Research Slice 2. The existing Pass 1 lifecycle requirements remain unchanged. Findings from the build spike can be used to refine these stories later.

---

# PRD-7 - Sprint 2 Backlog

**Owner:** Ahmed Falulur Rahuman

**Planner card:** [PRD] - Convert the map into the Sprint 2 backlog : 120

**Sources:** D3 SDLC Research Report, D4 Lifecycle Map, Lifecycle Task Map, existing Pass 1 and Pass 2 requirements

## Purpose

This backlog carries the existing lifecycle and build requirements into Sprint 2, adds requirements surfaced by the finished lifecycle map, and gives each story a rough size for Sprint 2 planning.

## Rough sizing

The following sizes are initial planning estimates:

- **S** - Small
- **M** - Medium
- **L** - Large

---

## Updates to existing requirements

### US-03 - Check AI-generated requirements and user insights

**Map update:** The finished map uses task-level colours rather than recolouring the whole stage. In Stage 2, AI drafting is GREEN at task 2.2, while the Definition of Ready and backlog acceptance gate at task 2.4 is RED. Journey mapping is AMBER at task 4.2 because AI-generated hypotheses still require human validation.

### US-04 - Verify AI-generated work before accepting it

Add to the acceptance criteria:

- The model identifies the RED human decision or verification task in each lifecycle stage.

### US-05 - Record AI involvement and responsibility

Add to the acceptance criteria:

- AI-assisted work identifies the human committer, AI co-author where applicable, non-requesting approver, and accountable owner.
- Important AI use is recorded in the project register.

### US-06 - Put safeguards around AI agents

Add to the acceptance criteria:

- Every governance control identifies whether it is held by a human, hook, CI check, or has no enforceable gate.
- A prompt, rules file, skill, or sub-agent is not treated as a hard control by itself.
- The governance rules identified in Module 6.12 name who or what holds each rule.
- The Commonwealth AI policy is treated as a model for NBN Co rather than a binding obligation.

### US-07 - Show when AI can be given more responsibility

Add to the acceptance criteria:

- A task moves towards GREEN only when a deterministic check or measured threshold supports the automation.
- A rules file or skill alone does not justify moving a task to GREEN.
- Deployment execution may be automated behind deterministic controls, while production promotion and incident decisions remain human-controlled.

### US-08 - Show how AI affects teamwork and review

Add to the acceptance criteria:

- Human review time is recorded so the review load created by AI-generated work can be measured.

---

## Additional Sprint 2 stories

### US-17 - Start AI development from a ready issue

**Source:** D3 Module 6.1 - Issue to branch

**Rough size:** M

**User story:**

As a developer, I want AI development to start from a clearly defined issue and acceptance criteria, so the agent understands what to build and what is outside the scope of the task.

**Acceptance criteria:**

- The issue contains testable acceptance criteria before implementation begins.
- The issue contains an out-of-scope list where required.
- The agent reads the issue and acceptance criteria before generating code.
- The agent produces a plan before implementation begins.
- A human confirms or redirects the plan before code is written.
- Work is performed on a separate branch rather than directly on `main`.

---

### US-18 - Record AI usage, review effort and token cost

**Source:** D3 Module 6.9 - Token accounting and cost

**Rough size:** M

**User story:**

As a delivery lead, I want AI usage, review effort and token consumption recorded, so the team can see the cost and actual effort of AI-assisted work.

**Acceptance criteria:**

- AI generation time is recorded.
- Human review time is recorded separately.
- Tokens consumed are recorded where available.
- Each AI use has an accountable owner.
- The record is stored in a shared project register.

---

### US-19 - Store important prompts as versioned project files

**Source:** D3 Module 6.11 - Prompt practice

**Rough size:** M

**User story:**

As a developer, I want important AI instructions to be stored and versioned with the project, so the team can reuse, review and improve them.

**Acceptance criteria:**

- Important reusable AI instructions are stored as project files.
- Changes to those files are version controlled.
- Changes can be reviewed through the normal pull-request process.
- Shared instructions are available to the team rather than remaining only in private chat history.
- A prompt or rules file is not treated as a hard control unless an external mechanism enforces the rule.

---

## Sprint 2 story sizing

| Story | Rough size |
| --- | --- |
| US-01 - Show where AI fits in the lifecycle | M |
| US-02 - Explain the red, amber and green model | S |
| US-03 - Check AI-generated requirements and user insights | M |
| US-04 - Verify AI-generated work before accepting it | M |
| US-05 - Record AI involvement and responsibility | M |
| US-06 - Put safeguards around AI agents | L |
| US-07 - Show when AI can be given more responsibility | M |
| US-08 - Show how AI affects teamwork and review | M |
| US-09 - Show when a prototype can be used as the specification | S |
| US-10 - Show what happens inside each lifecycle stage | L |
| US-11 - Keep each commit focused on one change | S |
| US-12 - Require independent approval for AI-assisted pull requests | M |
| US-13 - Add secret scanning to CI | M |
| US-14 - Check whether AI-written tests actually catch bugs | M |
| US-15 - Enforce the design system during build | M |
| US-16 - Make the deployment gate clear | M |
| US-17 - Start AI development from a ready issue | M |
| US-18 - Record AI usage, review effort and token cost | M |
| US-19 - Store important prompts as versioned project files | M |

---

## Module coverage

| D3 module | Requirement |
| --- | --- |
| 6.1 Issue to branch | US-17 |
| 6.2 How a commit is done | US-11 |
| 6.3 How branches become merges | US-12 |
| 6.4 How harnesses are used | US-13, US-14 |
| 6.5 Design-system enforcement in build | US-15 |
| 6.6 Deploy mechanics | US-16 |
| 6.7 Collaboration with an agent in the loop | US-08, US-09 |
| 6.8 Guardrails | US-06 |
| 6.9 Token accounting and cost | US-18 |
| 6.10 Liability, provenance and code authorship | US-05 |
| 6.11 Prompt practice | US-19 |
| 6.12 Regulatory codification for NBN Co | US-06 |

---

## Brief module coverage

| Brief area | Requirement |
| --- | --- |
| Testing | US-13, US-14 |
| Code generation | US-17 |
| Infrastructure | US-13, US-16 |
| Git commits | US-11 |

---

## PRD-6 walkthrough status

PRD-6 walkthrough findings were not available when this backlog was prepared. No walkthrough gaps have been invented or inferred from the research.

If PRD-6 produces additional gaps, they should be added to the Sprint 2 backlog as stories rather than left as notes.