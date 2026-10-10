# Independent PoC Verification — AC1 to AC6

**Date:** 10 October 2026

**Reviewer:** Chirag Wadehra

**Application:** NBN SDLC Demo — Fault Reporting

**Deployment URL:** https://nbn-sdlc-demo-frontend.vercel.app/

**Requirements:** `docs/requirements.md`

## 1. Objective

Independently verify the deployed fault-reporting proof of concept against the six acceptance criteria (POC-AC1 to POC-AC6).

The review includes manual browser testing, Firestore inspection, and examination of the existing implementation and automated tests.

The objective is to identify which requirements are satisfied, document any failures or incomplete checks, and request corrections where necessary.

## 2. Verification Summary

| Criterion | Description | Result |
|---|---|---|
| POC-AC1 | Submit a valid fault | PASS |
| POC-AC2 | Reject invalid input | FAIL — Correction requested |
| POC-AC3 | Store trusted fault details | PASS |
| POC-AC4 | Retrieve a submitted fault | PASS |
| POC-AC5 | Prevent unauthorised access | PARTIAL PASS |
| POC-AC6 | Handle a failed save | PARTIAL PASS |

The deployed application demonstrated successful fault submission, persistence and basic access isolation. However, AC2 remains failed pending correction, and some security and error-handling scenarios could not be independently verified through the browser.

---

## 3. Detailed Verification Results

### POC-AC1 — Submit a Valid Fault

**Result: PASS**

**Requirement:** A signed-in user must be able to submit a fault using one of the three permitted categories and a trimmed description containing 10–1000 characters.

**Verification performed:**

- Signed into the deployed application using a test account.
- Submitted synthetic fault reports using all three permitted categories:
  - `no-service`
  - `intermittent`
  - `slow-speed`
- Confirmed that the reports appeared in the user's report list.
- Confirmed that distinct references and the initial `submitted` status were displayed.

**Conclusion:** All three permitted fault categories were successfully submitted and displayed through the deployed application. AC1 passed the manual browser verification.

### POC-AC2 — Reject Invalid Input

**Result: FAIL — CORRECTION REQUESTED**

**Requirement:** Missing or unknown categories and descriptions outside the 10–1000-character limits must be rejected server-side without creating a report.

**Verification performed:**

| Test | Observed result | Outcome |
|---|---|---|
| Completely blank description | Browser displayed "Please fill in this field" and prevented submission | PASS — Browser validation |
| Whitespace-only description (12 spaces) | Server returned "String must contain at least 10 character(s)" | PASS — Server validation |
| 9-character description | Rejected by browser minimum-length validation | PASS — Browser validation |
| 10-character input containing trailing whitespace, trimmed to 9 characters | Rejected with a server-side validation error | PASS — Server validation |
| Exactly 10 characters | Successfully accepted and report created | PASS |
| Exactly 1000 characters | Successfully accepted and report created | PASS |
| Missing category | Server rejected the missing value with an error indicating that a valid category was expected and `null` was received | PASS — Server validation |
| Unknown category (`invalid-category`) | Server rejected the value with an invalid enum error | PASS — Server validation |
| Attempted 1001-character submission | Appeared to be accepted instead of rejected | FAIL — Correction requested |

**Finding:**

The deployed application successfully rejected blank, whitespace-only, too-short and invalid-category inputs. Server-side validation was confirmed for whitespace trimming and missing or unknown categories.

However, the attempted 1001-character submission appeared to succeed instead of being rejected. The persisted description length was not independently confirmed.

The issue was discussed with the developer and a correction has been requested.

A secondary usability issue was also observed: the description field cleared after certain server-side validation errors, requiring users to re-enter their text.

**Action required:**

- Correct the deployed implementation so descriptions exceeding 1000 characters are rejected server-side without creating a report.
- Confirm that the correction has been deployed.
- Independently retest the 1001-character boundary case and confirm that no report is created.

**Conclusion:** AC2 is marked as **FAIL — CORRECTION REQUESTED** because the deployed application did not demonstrate the required maximum-description-length enforcement. All other tested validation scenarios passed. The outstanding correction must be deployed and independently retested before AC2 can be accepted.

### POC-AC3 — Store Trusted Fault Details

**Result: PASS**

**Requirement:** The server must assign a unique reference, authenticated owner UID, creation timestamp and initial `submitted` status. Client-supplied owner and status values must not override the server-controlled values.

**Verification performed:**

- Submitted fault reports through the deployed application and confirmed that unique references were generated.
- Inspected a submitted report in Firebase Firestore and confirmed that its document ID matched the reference displayed on the website.
- Verified that the stored category and description matched the submitted values.
- Confirmed that the document contained a `createdAt` timestamp and an initial status of `submitted`.
- Compared the stored owner UID against the user's Firebase Authentication UID and confirmed an exact match.
- Used Chrome DevTools to send modified requests directly to the deployed Server Action, attempting to override the owner UID and report status.

**Security test results:**

| Test | Observed result | Outcome |
|---|---|---|
| Report reference | Unique reference generated and matched Firestore document ID | PASS |
| Authenticated ownership | Stored UID matched the authenticated user's UID | PASS |
| Creation timestamp | `createdAt` timestamp present in Firestore | PASS |
| Initial report status | Stored status was `submitted` | PASS |
| Forged owner UID | Server returned `success: false` with `Unrecognized key(s) in object: 'uid'` | PASS |
| Forged status (`resolved`) | Server returned `success: false` with `Unrecognized key(s) in object: 'status'` | PASS |
| Persistence after rejected requests | Neither forged report appeared in the report list after refreshing | PASS |

**Code review:**

The repository implementation assigns the owner UID from the authenticated session, uses a Firestore server timestamp, and sets the initial report status to `submitted`. Strict input validation rejects unexpected fields.

**Conclusion:** AC3 passed independent verification. The stored report details were confirmed through Firebase, and both attempts to override server-controlled fields were rejected by the deployed application without creating reports.

### POC-AC4 — Retrieve a Submitted Fault

**Result: PASS**

**Requirement:** A successful submission must display a reference, and the submitted report must remain retrievable after a refresh or subsequent session.

**Verification performed:**

- Successfully submitted fault reports using the deployed application.
- Observed report references displayed after submission.
- Returned to the account in subsequent sessions.
- Confirmed that previously submitted reports remained visible with their original references.

**Conclusion:** Submitted fault reports persisted across sessions and remained accessible to their owner. AC4 passed the manual verification.

### POC-AC5 — Prevent Unauthorised Access

**Result: PARTIAL PASS**

**Requirement:** Unauthenticated users must not be able to create or read fault reports. Authenticated users must not be able to access another user's reports, including through direct-ID requests.

**Verification performed:**

- Signed out and attempted to access `/faults` directly. The application redirected to the sign-in page.
- Signed in using a second test account (User B). The report list displayed `No fault reports yet`, confirming that User A's reports were not visible.
- Submitted a valid fault-report request directly to the deployed Server Action while signed out.
- The request returned the sign-in page rather than a successful report reference.
- Signed back into User A's account and confirmed that the unauthenticated test report had not been created.

**Code and test review:**

The repository's Server Actions require authentication, filter report lists by the authenticated user's UID, and check ownership when retrieving reports by reference ID.

Existing automated tests cover unauthenticated actions and cross-user direct-ID restrictions.

**Limitations:**

- Cross-user direct-ID retrieval was not independently tested against the deployed application.
- Unauthenticated server-side report reading was not directly tested.
- Existing automated tests were reviewed but not independently executed during this verification.

**Conclusion:** The deployed application passed the unauthenticated page-access, unauthenticated creation, and cross-user report-list isolation checks. The remaining server-side access scenarios are supported by repository code and existing tests but were not independently exercised against the deployment.

### POC-AC6 — Handle a Failed Save

**Result: PARTIAL PASS**

**Requirement:** If a valid fault report cannot be saved, the user must receive a useful error message without a false success confirmation.

**Verification performed:**

A live Firestore save failure was not deliberately triggered against the deployed website.

Instead, the existing server-side implementation and automated tests were independently reviewed.

**Code and test review:**

- The `createFaultReport()` Server Action catches persistence failures and returns a useful error.
- The fault-reporting form displays the returned error message.
- The form does not display a success reference when the save operation fails.
- Existing unit tests simulate a storage failure and verify the expected error-handling response.
- Component tests verify that an error is displayed without a false success confirmation.

**Limitations:**

Reproducing a genuine Firestore save failure on valid inputs through the browser is difficult.

**Conclusion:** The implementation and existing tests support AC6. However, direct verification of a failed save against the deployed website remains incomplete.

---

## 4. Findings and Requested Corrections

| ID | Severity | Finding | Action | Status |
|---|---|---|---|---|
| F-01 | Major | 1001-character input appeared accepted | Fix, deploy and retest limit | Correction requested |
| F-02 | Minor | Description clears on validation error | Consider preserving input | Improvement suggested |
| L-01 | Verification limitation | Direct-ID and unauthenticated reads not tested live | Record code/test evidence | Documented limitation |
| L-02 | Verification limitation | Firestore save failure not reproduced live | Record code/test evidence | Documented limitation |
| L-03 | Traceability limitation | Deployed Git commit not confirmed | Record SHA if needed | Documented limitation |

**Details:**

- **F-01:** The attempted 1001-character submission appeared successful. The developer confirmed that the required maximum-length validation was not implemented in the tested deployment. The exact persisted character count was not independently confirmed. Server-side rejection of descriptions over 1000 characters must be implemented, deployed and retested.
- **F-02:** After certain server-side validation errors, the description field was cleared, requiring users to re-enter their input.
- **L-01:** Cross-user direct-ID access and unauthenticated server-side reading were not tested on the deployment. Other AC5 checks passed, including unauthenticated creation and cross-user report-list isolation. The existing code and tests were reviewed; no further live tests are planned for this review.
- **L-02:** AC6 error handling was supported by code and existing tests, but a genuine Firestore save failure was not induced on the shared deployment.
- **L-03:** The live Vercel deployment's exact Git SHA was not independently matched to the source revision reviewed.

### Outstanding Correction

The primary outstanding issue is **F-01 (POC-AC2)**. The developer has been notified, and a correction has been requested.

Once the correction is deployed, the oversized-description test must be repeated to verify that submissions exceeding 1000 characters are rejected without creating a report.

The remaining items are documented usability suggestions or verification limitations rather than confirmed acceptance-criterion failures.


## 5. Overall Conclusion

Independent verification confirmed that the deployed fault-reporting application supports valid submissions, correct storage of report details, report retrieval across sessions, and user-account isolation.

AC1, AC3 and AC4 passed independent verification. Additional security testing for AC3 confirmed that the deployed server rejects attempts to override report ownership and status. AC5 also passed the tested unauthenticated access, unauthenticated creation and cross-user report-list isolation checks.

However, the proof of concept cannot yet be considered fully accepted against AC1–AC6 because **AC2 failed** due to the outstanding maximum-description-length validation issue. The developer has been informed, and a correction has been requested.

AC5 and AC6 remain partially verified because certain security and database-failure scenarios were not independently tested against the deployed application. The relevant repository implementation and existing automated tests were reviewed, and these limitations have been documented.

The review did not modify the deployed application or the shared Firebase configuration.

The next required action is to deploy the AC2 correction and independently retest the oversized-description boundary case. The remaining verification limitations should be acknowledged or resolved by the responsible human reviewer before final PoC acceptance.

**Overall verification outcome: NOT FULLY ACCEPTED — AC2 correction and follow-up verification required.**
