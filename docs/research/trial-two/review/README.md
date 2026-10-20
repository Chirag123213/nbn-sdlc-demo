# Trial two: independent review record

**Owner:** Zac Clarkson
**Planner card:** [UX] - Independent review: criteria, attacks and mutation : 240
**Status:** Complete. Builds frozen 18 Oct 2026 22:27 (Sidney Zeng, team channel). Offline checks run the same night; preview checks, attacks, mutation and seeds run 20 Oct 2026, in pull request order, nothing from one build read into the next.
**Protocol:** `../attacks-and-test-jobs.md`, frozen, with its section 9 decisions and dated amendments.

## Frozen commits

Sidney Zeng's freeze message did not name commits. These are the heads of each pull request when the reviewer read them at 22:58 on 18 Oct 2026, and the review ran against these and nothing later.

| Order | Lane               | Builder               | Repository and pull request             | Frozen commit | Pull request opened | Record                 |
| ----- | ------------------ | --------------------- | --------------------------------------- | ------------- | ------------------- | ---------------------- |
| 1     | A, AI only         | Ahmed Falulur Rahuman | `9ahmedfr/nbn-run2-ai-only#10`          | `f1611e0`     | 18 Oct 2026 00:03   | `ai-only/review.md`    |
| 2     | B, copy and paste  | Chirag Wadehra        | `Chirag123213/nbn-run2-copy-paste-1#11` | `ed173dc`     | 18 Oct 2026 01:04   | `copy-paste/review.md` |
| 3     | C, gated framework | Zafir Hasan           | `Peepachuu/nbn-run2-gated#2`            | `40c65f5`     | 18 Oct 2026 14:39   | `gated/review.md`      |

Order is the order the pull requests were opened (protocol section 8). Reviewer access on 18 Oct 2026: write on lanes A and B, read only on lane C. Nothing is pushed to any build repository.

## Results

| Measure                                                   | A, AI only                                                        | B, copy and paste                                                 | C, gated framework                                                            |
| --------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Feature criteria T2-AC01 to AC14 on the preview           | 12 of 14. AC01 and AC11 fail: nothing is stored                   | 12 of 14. AC01 and AC11 fail: nothing is stored                   | 14 of 14                                                                      |
| Record criteria AC15 to AC17                              | AC15 pass; AC16 pass with note; AC17 gaps                         | AC15 pass; AC16 fail (AC07 file missing); AC17 gaps               | AC15 pass; AC16 pass with note; AC17 gaps                                     |
| Where a request lives                                     | React state. No sign-in, no server, no store                      | React state behind the base sign-in. No server, no store          | Firestore, written by Server Actions with owner, status and match checks      |
| Attacks AT01 to AT14                                      | AT12 lands (public page). AT08, AT10 hold. The rest have no surface | AT05 (UI), AT08, AT10, AT12 hold. The rest have no surface      | All hold, at the rules, at the action, and signed out                         |
| Attacks AT15 to AT18                                      | Hold                                                              | Hold                                                              | Hold (version bumps noted under AT16)                                         |
| Feature tests added                                       | 11                                                                | 8                                                                 | 36                                                                            |
| Mutation score, configured scope (protocol formula)       | 41.78 (155 of 371)                                                | 42.50 (85 of 200)                                                 | 53.03 (210 of 396)                                                            |
| Mutation score, feature files only                        | 52.01 (155 of 298)                                                | 66.93 (85 of 127)                                                 | 65.02 (210 of 323)                                                            |
| Matching function alone                                   | 77.42                                                             | 100.00                                                            | 79.31; `dispatch.actions.ts` 86.36                                            |
| Seed S1, ownership check removed                          | Not applicable, no owner                                          | Not applicable, no owner                                          | Caught, 1 test                                                                |
| Seed S2, access check always passes                       | Caught, 5 tests                                                   | Caught, 6 tests                                                   | Caught, 7 tests                                                               |
| Findings (section 7 of each record)                       | 5: one High (AT12), two Medium, two Low                           | 5: two Medium, three Low                                          | 5: all Low                                                                    |
| Findings that count toward the prediction (decision 5)    | 4, all escaped                                                    | 4, all escaped                                                    | 4, all escaped, all Low                                                       |
| Caught before merge by any gate                           | 0                                                                 | 0                                                                 | 0                                                                             |
| Builder's clock (their log)                               | 9 min 13 s                                                        | 62 min                                                            | 57 min, plus 32 min setup logged separately                                   |

The 73 uncovered mutants that every lane shares are base files no build touched (`auth.actions.ts`, `lib/validations`); the feature-files row removes them. Both rows are reported so the comparison does not depend on which one is read.

## Reviewer time log

Measured from shell and tool timestamps.

| Date       | Start | End   | What                                                                                                     | Minutes |
| ---------- | ----- | ----- | -------------------------------------------------------------------------------------------------------- | ------- |
| 18 Oct     | 22:58 | 23:09 | Read the freeze, the three pull requests, access and head commits                                         | 11      |
| 18 Oct     | 23:09 | 23:12 | Clone all three at the frozen commits, install, typecheck, lint, test:all                                 | 3       |
| 18 Oct     | 23:10 | 23:20 | AT15, AT16, AT18, TJ15, TJ16, TJ17, code read for persistence, feature test counts                        | 10      |
| 18 Oct     | 23:13 | 23:14 | Mutation attempt on all three (invalid, see below)                                                        | 1       |
| 18 Oct     | 23:20 | 23:35 | Write the first record                                                                                    | 15      |
| 20 Oct     | 10:05 | 10:12 | Re-clone at the frozen commits in a container, install, start Stryker                                     | 7       |
| 20 Oct     | 10:12 | 10:35 | Lane A: TJ01 to TJ14, AT05, AT08, AT10, AT12 to AT14 on the preview                                       | 23      |
| 20 Oct     | 10:20 | 10:32 | Create and verify Requester A and B on lanes B and C (email verification by the reviewer)                 | 12      |
| 20 Oct     | 10:33 | 10:48 | Lane B: TJ01 to TJ14, AT05, AT08, AT10, AT12 to AT14 on the preview                                       | 15      |
| 20 Oct     | 10:52 | 11:12 | Lane C: TJ01 to TJ14 on the preview, AT01 to AT14 at the action and the Firestore REST API                | 20      |
| 20 Oct     | 10:12 | 10:58 | Stryker on all three (two configuration attempts, one valid run), then seeds; ran alongside the above     | 46      |
| 20 Oct     | 11:12 | 11:45 | Classify, write the three records and this file                                                           | 33      |

Per build, against protocol section 8's estimate of 3 h 30 min each: lane A about 1 h 10 min, lane B about 1 h, lane C about 1 h 15 min, with the mutation runs overlapping. The protocol's estimate was high by a factor of three, mostly because two builds had no server to attack.

## Tooling, and what it could not do

- The preview checks were driven through the Claude desktop browser pane: page text and DOM reads for every result, screenshots at reduced scale for the evidence folders, `fetch` from the page context for the lane C Server Action calls and the Firestore REST probes.
- The pane's synthetic keys do not operate Chromium's native date, time and datetime-local segments, and do not toggle a radio with Space. TJ13 is therefore "run once, in part" on every lane: Tab order, arrow keys on selects, Enter on buttons and focus visibility were verified; the native controls were read from the DOM (unstyled, labelled, no handlers, no tabindex traps) and passed on that basis. A human keyboard run would close the gap on all three.
- gitleaks was not available on the reviewer's machines; AT15 rests on a grep plus the Security Scan CI check on each pull request.
- The 18 Oct mutation attempt and the first 20 Oct run were invalid: Stryker's Vitest runner first found no related tests (`vitest.related`), then, with that off, ran the tests against the original files rather than its sandbox copy because the `@/` alias resolves outside the sandbox, so every mutant survived. The valid run uses Stryker's in-place mode (`inPlace: true`) on a throwaway clone, with `vitest.related: false`. The invalid outputs are kept in each lane's `evidence/mutation-attempt-2026-10-18.txt`; the valid run is `evidence/mutation-2026-10-20.txt` and `.json`.
- Lane A and B previews need no Firestore project to attack. Each "not applicable" row is a finding against the build (no store, no server), and the review is complete on those rows.

## Where the evidence is

```text
docs/research/trial-two/review/
  README.md                       this file
  accounts.txt                    the four reviewer accounts (synthetic names, reviewer's mailbox)
  ai-only/review.md               lane A record
  ai-only/evidence/               AC and AT files named in the record, mutation and seed outputs
  copy-paste/review.md            lane B record
  copy-paste/evidence/
  gated/review.md                 lane C record
  gated/evidence/                 includes request-ids.txt, the Server Action calls and the Firestore probes
```

Each `review.md` carries the chapter header block and a claims table in the white paper format, so the three feed chapter 6 without rewriting.
