# Lane B preview run, 20 Oct 2026 10:33 to 10:48 AEDT

Preview: https://nbn-run2-copy-paste-rkxdmer7p-chirag123213.vercel.app/technician-dispatch (pull request #11, final commit ed173dc). Reviewer: Zac Clarkson, driving the Claude desktop browser pane, signed in as Requester A (accounts.txt).

Signed out, /technician-dispatch redirects to /auth/signin (AT12 holds). Sign-up requires a verified email before sign-in; the reviewer's plus-addressed mailbox was used.

The feature is one page with three sections. Submitting section 1 renders section 2 in place; nothing leaves the browser (network log: static assets and the auth session POST only). Only compatible technicians are listed; incompatible ones are not shown at all, so a refusal is shown by absence plus the "No compatible technician and equipment match" panel when the list is empty.

| Job | Entered | Build showed | Criteria |
| --- | --- | --- | --- |
| J1 | F1, R0 | T1 and T4 listed with "No additional equipment"; T2, T3 absent. Selected T1, scheduled 2026-10-22 09:00. Record shows premises, technician, visit, access requirement and equipment chip. Double-click on Schedule gave one record (AT08) | AC01 (UI), AC02, AC04, AC10, AC11 (UI) |
| J2 | F1, R1 | T1 only, equipment "Ladder"; T4 absent. Radio selected, Schedule button enabled | AC03, AC05, AC06 (by absence), AC07 |
| J3 | F2, R1 | "No compatible technician and equipment match ... An incompatible combination will not be offered for scheduling." | AC06 (T3), AC09 |
| J4 | F1, R2 | No match panel | AC08, AC09 |
| J5 | F2, R2 | No match panel | AC08, AC09 |
| J6 | F3, R2 | T2 only, "Pit Access". Scheduled 2026-10-23 13:00 | AC08, AC10, AC11 (UI) |

Persistence: reload of /technician-dispatch after J1 returns an empty form. No list of requests anywhere. The request and the dispatch are gone. No write to Firestore at any step. AC01 "visible afterwards" and AC11 "stored record" fail.

AT05 (form tamper, client-side form): with J6 matched to T2, the technician radio's DOM value was set to T4 and the schedule form submitted; the result still recorded Tech Bravo. The build keeps the selected match in component state, not in the DOM value. Holds at the UI level; there is no server to enforce it.

Greyscale (document filter grayscale(1)): equipment chips carry an icon plus text; "Suitable for" lines are text; the dispatch record is text. No colour-only state. AC12-AC14-greyscale-match-J6.jpg.

Keyboard (TJ13): Tab order premises, fault select, requirement select, notes, submit; ArrowDown changes selects; Enter submits; first Tab after submit lands on the T1 radio. Native radios, date and time inputs with labels, no custom key handlers, no tabindex other than -1 on a section. Submit button focus ring is a box-shadow ring (focus:ring-2), visible. Same tooling limit as lane A for radio Space and date segments; recorded as pass with that limit.

AT10: grep of frontend/src for reschedule, cancel, rebate, notification, technician admin: nothing.
