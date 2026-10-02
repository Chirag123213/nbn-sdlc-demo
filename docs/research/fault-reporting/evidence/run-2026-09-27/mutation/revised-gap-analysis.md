# Mutation run history

All three runs are retained. None is a pre-feature baseline or a human-only control.

| Checkpoint | Raw report and console log stem | Valid | Killed | Survived | Uncovered | Errors | Detected |
|---|---|---:|---:|---:|---:|---:|---:|
| Preliminary implementation | `frontend-mutation` | 87 | 41 | 15 | 31 | 0 | 47.13% |
| Initial completed implementation | `frontend-mutation-final` | 88 | 56 | 14 | 18 | 0 | 63.64% |
| Focused test revision | `frontend-mutation-revised` | 88 | 65 | 12 | 11 | 0 | 73.86% |

Each stem has a `.json` raw report and `.txt` execution log in this directory.
The preliminary report embeds different source for `src/actions/faults.actions.ts`
and `src/features/faults/components/FaultReportList.tsx` from the next report.
Its different source and mutant count prevent interpreting that change as a
controlled test-only improvement. It is superseded for acceptance, not discarded.

The initial completed and focused-revision runs are recorded as using the same
scope, Stryker 9.6.1 and Vitest runner/configuration. Their counts support the
reported 63.64% to 73.86% comparison. No numeric acceptance threshold applies.

Detected percentage = (Killed + Timeout) / valid mutants × 100; error mutants
are excluded when defining the valid denominator, not subtracted twice.
All retained reports have zero errors/timeouts. Raw results remain authoritative.

The earlier [gap analysis](gap-analysis.md) describes the initial completed
checkpoint. The focused revision addressed validation, read-error and auth test
gaps. Surviving and uncovered mutants remain visible in the revised report.
Mocked mutation tests do not establish deployed Firebase or browser behaviour.
