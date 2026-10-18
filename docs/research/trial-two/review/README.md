# Trial two: independent review record

**Owner:** Zac Clarkson
**Planner card:** [UX] - Independent review: criteria, attacks and mutation : 240
**Status:** In progress. Builds frozen 18 Oct 2026 22:27 (Sidney Zeng, team channel). Offline checks run the same night. Preview checks, attacks, seeds and a valid mutation score are still to run.
**Protocol:** `../attacks-and-test-jobs.md`, frozen, with its section 9 decisions and dated amendments.

## Frozen commits

Sidney Zeng's freeze message did not name commits. These are the heads of each pull request when the reviewer read them at 22:58 on 18 Oct 2026, and the review runs against these and nothing later.

| Order | Lane               | Builder               | Repository and pull request             | Frozen commit | Pull request opened | Record                 |
| ----- | ------------------ | --------------------- | --------------------------------------- | ------------- | ------------------- | ---------------------- |
| 1     | A, AI only         | Ahmed Falulur Rahuman | `9ahmedfr/nbn-run2-ai-only#10`          | `f1611e0`     | 18 Oct 2026 00:03   | `ai-only/review.md`    |
| 2     | B, copy and paste  | Chirag Wadehra        | `Chirag123213/nbn-run2-copy-paste-1#11` | `ed173dc`     | 18 Oct 2026 01:04   | `copy-paste/review.md` |
| 3     | C, gated framework | Zafir Hasan           | `Peepachuu/nbn-run2-gated#2`            | `40c65f5`     | 18 Oct 2026 14:39   | `gated/review.md`      |

Order is the order the pull requests were opened (protocol section 8). Reviewer access on 18 Oct 2026: write on lanes A and B, read only on lane C. Nothing is pushed to any build repository.

## What has been run

| Check                                                    | A                                                        | B                                                                      | C                                                                                  |
| -------------------------------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| AT17 clean clone: install, typecheck, lint, test:all     | Green, 22 tests                                          | Green, 19 tests                                                        | Green, 47 tests                                                                    |
| Feature tests added (frontend total minus 6 in the base) | 11                                                       | 8                                                                      | 36                                                                                 |
| AT16 dependency diff                                     | None                                                     | None                                                                   | Version bumps, no new package                                                      |
| AT15 secrets (local grep; gitleaks only in CI)           | Nothing                                                  | Nothing                                                                | Nothing                                                                            |
| AT18 declaration and trailer                             | Ticked, 2 trailers                                       | Ticked, 1 trailer                                                      | Ticked, 1 trailer                                                                  |
| TJ16 record check                                        | 14 of 14 files, 5 distinct                               | 13 of 14 files (AC07 missing), 6 distinct                              | 14 of 14 files, 5 distinct; no trial record file, results in the pull request only |
| TJ17 run details                                         | Present; start commit `ccfb2ca`, model recorded as GPT-5 | Present; start commit is the builder's own feature commit, times blank | Present; start commit blank                                                        |
| How a request is stored (code read)                      | React state only, no store                               | React state only, no store                                             | Firestore through Server Actions, owner check, base rules unchanged                |
| Mutation                                                 | Attempted, no tests executed                             | Attempted, no tests executed                                           | Ran, but only one test file executed; figure not valid                             |
| TJ01 to TJ14, AT01 to AT14, seeds S1 and S2              | Not yet                                                  | Not yet                                                                | Not yet                                                                            |

Numbers are from runs on 18 Oct 2026 between 23:09 and 23:20 on the reviewer's machine. Each build's `evidence/` folder holds the output.

## Reviewer time log

Measured from shell timestamps on 18 Oct 2026.

| Start | End   | What                                                                               | Minutes |
| ----- | ----- | ---------------------------------------------------------------------------------- | ------- |
| 22:58 | 23:09 | Read the freeze, the three pull requests, access and head commits                  | 11      |
| 23:09 | 23:12 | Clone all three at the frozen commits, install, typecheck, lint, test:all          | 3       |
| 23:10 | 23:20 | AT15, AT16, AT18, TJ15, TJ16, TJ17, code read for persistence, feature test counts | 10      |
| 23:13 | 23:14 | Mutation attempt on all three                                                      | 1       |
| 23:20 | 23:35 | Write this record                                                                  | 15      |

## Next

1. Rerun Stryker on each clone with related-file detection off, then apply seeds S1 and S2.
2. Lane A on the preview: TJ01 to TJ14, then AT01 to AT14. Then B, then C. Nothing from one is read into the next.
3. Classify every finding under protocol section 7, split caught and escaped, and fill the second column for checks trial one did not run.
