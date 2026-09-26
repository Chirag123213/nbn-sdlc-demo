"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const { decide } = require("./pre-tool-use.cjs");
for (const command of [
  "git push origin main",
  "git push",
  "git push origin HEAD:main",
  "git -C /tmp/repo push --force",
  "git status && git push",
  '"git" "push" origin main',
]) {
  test(`deny ${command}`, () =>
    assert.equal(
      decide({ toolName: "bash", toolArgs: { command } }).permissionDecision,
      "deny",
    ));
}
test("read-only command preserves normal permissions", () =>
  assert.deepEqual(
    decide({ toolName: "bash", toolArgs: { command: "git status" } }),
    {},
  ));
test("non-shell tools preserve normal permissions", () =>
  assert.deepEqual(
    decide({ toolName: "view", toolArgs: { path: "README.md" } }),
    {},
  ));
test("string arguments and PowerShell are supported", () =>
  assert.equal(
    decide({
      toolName: "powershell",
      toolArgs: JSON.stringify({ command: "git push" }),
    }).permissionDecision,
    "deny",
  ));
test("malformed shell arguments denied", () =>
  assert.equal(
    decide({ toolName: "bash", toolArgs: "bad-json" }).permissionDecision,
    "deny",
  ));
test("stdin protocol returns a single denial JSON object", () => {
  const r = spawnSync(
    process.execPath,
    [require.resolve("./pre-tool-use.cjs")],
    { input: "{invalid", encoding: "utf8" },
  );
  assert.equal(r.status, 0);
  assert.equal(JSON.parse(r.stdout).permissionDecision, "deny");
});
