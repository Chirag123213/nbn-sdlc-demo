# TJ13 keyboard run, lane A, 20 Oct 2026 10:30 AEDT

Fresh load of /dispatch in the Claude desktop browser pane. Keys sent through the pane; focused element read back with `document.activeElement` after each step.

| Step | Key          | Focus after                                       | Result                                                                                               |
| ---- | ------------ | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| 1    | Tab          | input `premises`                                  | Focus visible (ring)                                                                                 |
| 2    | type address | same                                              | Text entered                                                                                         |
| 3    | Tab          | select `faultId`                                  |                                                                                                      |
| 4    | ArrowDown    | same                                              | F1 selected                                                                                          |
| 5    | Tab          | select `accessRequirementId`                      |                                                                                                      |
| 6    | ArrowDown    | same                                              | R0 selected                                                                                          |
| 7    | Tab          | button "Find compatible technicians"              | outline solid 2px (focus visible)                                                                    |
| 8    | Enter        | step 2 rendered                                   | Submitted                                                                                            |
| 9    | Tab          | button "Select Tech Alpha and schedule visit"     | First Tab lands on the only enabled action; incompatible cards have no control                       |
| 10   | Enter        | step 3 rendered                                   | Selected                                                                                             |
| 11   | Tab          | input `visitDate` (type=date)                     |                                                                                                      |
| 12   | digits / Tab | focus stayed inside the date input; value not set | Pane key injection does not drive Chromium's segmented date control or check radios; see limit below |
| 13   | Tab, Tab     | button "Schedule dispatch"                        | outline auto (focus visible)                                                                         |
| 14   | Enter        | form submitted, blocked by required date/window   |                                                                                                      |

Limit: the review tooling's synthetic keys do not operate the native `<input type=date>` segments or toggle `<input type=radio>` with Space. Both controls are native, unstyled (`appearance: auto`), wrapped in `<label>`, with no key handlers and no `tabindex` other than -1 on a heading and a section (read from the DOM). They are keyboard-operable by construction in Chrome. Recorded as pass with this limit; a human keyboard run would close it.

Keyboard trap (AT13): none found. No element held focus other than the date input under synthetic keys, which is the tooling limit above.
