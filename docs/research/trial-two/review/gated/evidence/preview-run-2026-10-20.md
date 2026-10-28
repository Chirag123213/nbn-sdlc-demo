# Lane C preview run, 20 Oct 2026 10:52 to 11:12 AEDT

Preview: https://nbn-run2-gated-git-feature-technician-dispatch-treeko.vercel.app/dispatch (pull request #2, final commit 40c65f5). Reviewer: Zac Clarkson, driving the Claude desktop browser pane, signed in as Requester A, then Requester B (accounts.txt). Firebase project `nbn-run2`.

Signed out, /dispatch redirects to /auth/signin?redirect=/dispatch (AT12 holds). A signed-out call of the scheduleDispatch Server Action is redirected before the action runs (opaque redirect, no body).

Each request is a Server Action call (POST /dispatch) that writes to Firestore and returns the request id and the matches. The page shows the create form, then the match list, then the scheduled record. There is no list of past requests; a reload returns the empty form.

| Job | Id                   | Entered | Build showed                                                                                                                                                                             | Criteria                               |
| --- | -------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| J1  | DlcmIkV2SN9TdhwB5iXi | F1, R0  | T1 and T4 "Compatible match", equipment "No equipment required"; T2, T3 not offered. Scheduled T1, 22 Oct 2026 9:00 am. Double-click on Schedule produced one POST and one record (AT08) | AC01, AC02, AC04, AC10, AC11           |
| J2  | dSaMaDie01xi9FFzJ1HC | F1, R1  | T1 only, "Equipment required: Ladder"; T4 not offered. Scheduled T1, 22 Oct 1:00 pm                                                                                                      | AC03, AC05, AC06 (T4 by absence), AC07 |
| J3  | uJS9qZciuQLjr6r32N43 | F2, R1  | "No compatible technician found. No technician and equipment combination satisfies the recorded request." Request still created                                                          | AC06 (T3), AC09                        |
| J4  | (created)            | F1, R2  | No compatible technician found                                                                                                                                                           | AC08, AC09                             |
| J5  | (created)            | F2, R2  | No compatible technician found                                                                                                                                                           | AC08, AC09                             |
| J6  | GmcVeoMFLHxBcdlcwPKI | F3, R2  | T2 only, "Pit access". Scheduled T2, 23 Oct 1:00 pm                                                                                                                                      | AC08, AC10, AC11                       |

Persistence (AC01, AC11 stored record): the server read J1 and J2 back as `scheduled` on later calls (AT04-AT08-server-action-calls.md), after reloads and a sign-out. The UI offers no way for the requester to see a request afterwards, so "visible to Requester A afterwards" holds only through the server, not the screen; recorded as a note against AC01, not a fail.

Greyscale (document filter grayscale(1)): "Compatible match" badge is text plus a tick icon; equipment line is text plus an icon; the scheduled record is text. No colour-only state. AC12-AC14-greyscale-match-J6.jpg, AC10-AC11-AC14-greyscale-schedule-J6.jpg.

Keyboard (TJ13): Tab order premises, fault select, requirement select, submit (outline solid 2px on focus); ArrowDown changes selects; Enter submits; first Tab after submit lands on the T1 radio (native, appearance auto); then the datetime-local field; then Schedule. One extra tab stop: the technician card `<li>` carries tabindex 0. No trap. Same tooling limit as lanes A and B for radio Space and date segments.

Direct Firestore (REST with the preview's public apiKey and the two requesters' ID tokens, see AT01-AT11-firestore-direct.txt): every read, list, create, update, delete and undefined-collection access returned 403 PERMISSION_DENIED, signed in as A, as B, and signed out. The base default-deny rule is unchanged and the feature never opened a client path.

Server Action attacks (AT01-AT11 via scheduleDispatch): see AT04-AT08-server-action-calls.md. As Requester B, scheduling A's J3 and J1 returned "Dispatch request not found." (AT01 holds; no existence leak).

AT10: grep of frontend/src for reschedule, cancel, rebate, notification, technician admin: nothing.
