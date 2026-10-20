# Lane C: scheduleDispatch Server Action called directly, 20 Oct 2026 11:00 AEDT

Signed in as Requester A in the browser pane. The action id was read from the client bundle (createServerReference "4011d6195f06...") and called with fetch POST /dispatch, header Next-Action, body JSON array of one argument object. Responses are the RSC payload line 1.

| Attack                                              | Call                                                            | Response                                                                                                                     |
| --------------------------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| AT05 forge the match through the form (server side) | J6 (GmcVeoMFLHxBcdlcwPKI, F3/R2) with technicianId T1           | success:false, "The selected technician is not compatible with this request."                                                |
| AT06 schedule with no match                         | J3 (uJS9qZciuQLjr6r32N43, F2/R1, no valid combination) with T3  | success:false, "The selected technician is not compatible with this request."                                                |
| AT04 incompatible match by hand                     | J2 (dSaMaDie01xi9FFzJ1HC, already scheduled with T1) with T4    | success:false, "This dispatch has already been scheduled." The status guard fires before the match check; T4 was not written |
| AT08 schedule twice                                 | J1 (DlcmIkV2SN9TdhwB5iXi, scheduled 22 Oct 09:00) with T1 again | success:false, "This dispatch has already been scheduled."                                                                   |
| Unknown id                                          | requestId "doesnotexist"                                        | success:false, "Dispatch request not found."                                                                                 |
| AT07 extra fields                                   | J6 with T2 plus status:"scheduled", ownerId:"x"                 | success:false, "Unrecognized key(s) in object: 'status', 'ownerId'" (zod strict)                                             |

The two "already been scheduled" responses are also the persistence evidence for AC01 and AC11: the server read J1 and J2 back from Firestore with status scheduled after the browser had been reloaded several times.
