# White paper chapters

Where the white paper is written, who writes which chapter, and the rules every chapter follows so the assembled document reads as one piece.

**Planner card:** [UX] - Template, three repositories and white paper chapter template : 240
**Author:** Zac Clarkson, 6 Oct 2026. Drafted with Claude (claude.ai). The chapter list was read from the Sprint 3 Planner cards on 6 Oct 2026 and the section structure from `docs/reports/module-reconciliation.md` section 7.
**Checked against:** `main` at `fb6e758`.

---

## 1. How to write your chapter

1. Copy `_chapter-template.md` to the file name in the table in section 2.
2. Fill in the header block first. A chapter with no "Checked against" commit cannot be assembled.
3. Pick the body pattern that fits. Pattern A is for a chapter that tells the reader how to do something. Pattern B is for a chapter that reports something the team ran or analysed. A chapter can use both.
4. Fill in the claims table as you write, not at the end. Every number, every "we found" and every "the repository does" gets a row.
5. Open a draft pull request on a `docs/white-paper-<short-name>` branch. Mark it ready when the checklist at the bottom of the template is ticked.

Chapters are due **Wednesday 21 October 2026**. Assembly starts the next day.

## 2. Chapters, owners and files

The order is my proposal for the assembled paper. Owners come from the Sprint 3 cards.

| #   | Chapter                                              | File                        | Owner         | Sprint 3 card                                                                   | Pattern                                       |
| --- | ---------------------------------------------------- | --------------------------- | ------------- | ------------------------------------------------------------------------------- | --------------------------------------------- |
| 0   | Executive summary                                    | `00-executive-summary.md`   | Sidney        | [PM] - Trial two results, executive summary, playback deck and handover pack    | Neither. One page, written last               |
| 1   | Requirements and brief traceability                  | `01-requirements.md`        | Ahmed         | [PRD] - White paper: requirements and brief traceability                        | B                                             |
| 2   | The lifecycle, the entry gate and how to read a gate | `02-lifecycle-and-gates.md` | Zac           | [UX] - White paper: assembly and final edit                                     | A                                             |
| 3   | The manual, stages 5 to 8                            | `03-manual.md`              | Zac assembles | No chapter card. See the note below                                             | A                                             |
| 4   | Proof of concept, including remaining gaps           | `04-proof-of-concept.md`    | Zafir         | [INF] - White paper: PoC chapter, including remaining gaps                      | B                                             |
| 5   | Trial one                                            | `05-trial-one.md`           | Sidney        | [PM] - Trial two protocol, registered prediction and trial one evidence chapter | B                                             |
| 6   | Trial two                                            | `06-trial-two.md`           | Sidney        | [PM] - Trial two results, executive summary, playback deck and handover pack    | B                                             |
| 7   | Results and cost                                     | `07-results-and-cost.md`    | Sidney        | [PM] - Results and cost analysis, and governance chapter                        | B                                             |
| 8   | Governance                                           | `08-governance.md`          | Sidney        | [PM] - Results and cost analysis, and governance chapter                        | A                                             |
| 9   | Limits and open questions                            | `09-limits.md`              | Zac           | [UX] - White paper: assembly and final edit                                     | Neither. Built from every chapter's section 5 |

**Chapter 3 has no card of its own.** It is built from the four modules in `docs/modules/` and from Chirag's infrastructure specification ([INF] - Module specification: infrastructure). I will fold those into chapter 3 at assembly. Module authors do not rewrite them as chapters. What I need from module authors is the edits listed in `docs/reports/module-reconciliation.md` section 5, on `main` by 21 October.

**Appendices** (copy and paste, evidence index, sources, glossary) are built at assembly. The evidence index is every chapter's claims table joined together, which is why the table is not optional.

**My independent review** ([UX] - Independent review: criteria, attacks and mutation) is written up in the same template and feeds chapter 6.

## 3. Rules for every chapter

Follow these and I can join the chapters at assembly without rewriting them.

**The reader.** A junior developer at NBN who has Copilot and has not used it under a process (client meeting, 17 Sep 2026). Write what they would do on Monday. If a paragraph does not change what the reader does or believes, cut it.

**Words.** Use the terms in `docs/reports/module-reconciliation.md` section 4. The ones that get mixed up most:

| Write                                                          | Not                                    |
| -------------------------------------------------------------- | -------------------------------------- |
| Copilot agent mode (VS Code), Copilot cloud agent, Copilot CLI | "Copilot" with no lane                 |
| Gate, and its holder                                           | control, check, checkpoint as synonyms |
| Hook (git) or Hook (agent)                                     | "Hook" alone                           |
| CI check (required) or CI check (advisory)                     | "CI must pass"                         |
| No gate                                                        | "advisory" for an instruction file     |
| Task 6.3                                                       | "the PR step"                          |
| Section, chapter                                               | "module" for a part of the white paper |
| The fault report, FR-01                                        | "the demo", "the PoC feature"          |

**Evidence status.** Every claim carries one of five labels. They are the only ones the paper uses.

| Label               | Means                                                                     |
| ------------------- | ------------------------------------------------------------------------- |
| Run                 | Someone on the team did it and a file, pull request or commit shows it    |
| Run once            | As above, one time, so it is an observation and not a rate                |
| Mocked              | Shown by a test against a mock, not against the live system               |
| Estimate            | A person's recollection or judgement, with their name                     |
| Documented, not run | Taken from vendor documentation or published research. Nobody here ran it |

**Numbers.** A number has a source, a date and a unit in the same sentence or the same table row. Copilot usage is in AI Credits. People's time is in minutes or hours and says whether it was measured or estimated.

**Dates and people.** Full dates (6 Oct 2026). Named people for approvals and decisions, never "the team approved".

**Tools.** Copilot is the example tool. Claude Code and Codex appear as equivalents, or as the tool a trial lane used. Say which.

**AI involvement.** The header block says which tool drafted the chapter, what it was given, and who checked it. This paper is about attribution, so it carries its own.

**Formatting.** Markdown only. Tables for anything with more than two attributes. Code blocks carry commands and file contents copied from this repository, with the path above the block. No em dashes.

## 4. Review and assembly

- A chapter pull request needs the same two approvals as any other change to `main`.
- I read every chapter against its claims table before assembly. A claim whose evidence path does not resolve goes back to its author.
- A Word copy of the assembled paper goes in the Teams library under `ab. Main Project Deliverables/Sprint 3`. The markdown in this folder stays the source.
