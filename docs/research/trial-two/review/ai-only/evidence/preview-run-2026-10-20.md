# Lane A preview run, 20 Oct 2026 10:15 to 10:35 AEDT

Preview: https://nbn-run2-ai-only-git-featur-2d4761-ahmedfrahuman-9613s-projects.vercel.app/dispatch (pull request #10, final commit f1611e0). Reviewer: Zac Clarkson, driving the Claude desktop browser pane. No sign-in was needed or offered; the page is public.

Fixture entered exactly as protocol section 3. Each job is a fresh load of /dispatch because the build keeps nothing between loads.

| Job | Entered | Build showed                                                                                                                                           | Criteria                               |
| --- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------- |
| J1  | F1, R0  | T1 and T4 "Compatible match" with Select; T2, T3 "Not compatible", no control. Selected T1, scheduled 2026-10-22 8:00-12:00, reference DSP-T1-20261022 | AC01 (UI), AC02, AC04, AC10, AC11 (UI) |
| J2  | F1, R1  | T1 only compatible ("Meets requirement: Ladder"); T4 "Does not meet requirement: Second storey access", no control. T1 proceeds to scheduling          | AC03, AC05, AC06 (T4), AC07            |
| J3  | F2, R1  | "No compatible technician and equipment match ... No technician can be selected"; T3 shown not compatible on access                                    | AC06 (T3), AC09                        |
| J4  | F1, R2  | No match; T1 and T4 fail on pit access                                                                                                                 | AC08, AC09                             |
| J5  | F2, R2  | No match; T3 fails on pit access                                                                                                                       | AC08, AC09                             |
| J6  | F3, R2  | T2 only; T1, T3, T4 not compatible. Scheduled 2026-10-23 12:00-16:00, DSP-T2-20261023. Double-click on Schedule produced one result (AT08)             | AC08, AC10, AC11 (UI)                  |

Persistence: see AC01-persistence-J1.txt. Reload loses everything; no network write at any step.

Greyscale (document filter grayscale(1)): compatible / not compatible badges carry text plus a tick or cross icon; equipment requirement carries text plus an icon; nothing is colour-only. AC12-AC14-greyscale-match-J6.jpg, AC14-greyscale-dispatch-J6.jpg.

AT10: grep of frontend/src for reschedule, cancel, rebate, notification, technician admin: nothing.
AT12: /dispatch loads signed out, no redirect, Server Actions: none exist. Fail.
AT05: no server to intercept; the match is enforced in the browser only. Recorded as not applicable with the finding under category 2.
