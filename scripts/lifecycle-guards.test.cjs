const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { spawnSync } = require('node:child_process')
const { test } = require('node:test')
const assert = require('node:assert/strict')

const root = path.resolve(__dirname, '..')
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')

test('Prettier is a failing pre-commit command and CI runs the format check', () => {
  const hooks = read('lefthook.yml')
  const workflow = read('.github/workflows/ci.yml')

  assert.match(hooks, /run: \.\/node_modules\/\.bin\/prettier --write \{staged_files\}(?!\s*\|\|)/)
  assert.doesNotMatch(hooks, /prettier[^\n]*\|\|\s*true/)
  assert.match(read('package.json'), /"format:check": "pnpm -r format:check"/)
  assert.match(workflow, /name: Check formatting\n\s+run: pnpm run format:check/)
})

test('Prettier rejects an intentionally unformatted source file', () => {
  const fixture = path.join(os.tmpdir(), `prettier-break-${process.pid}.ts`)
  fs.writeFileSync(fixture, 'const value={a:1}\n')

  try {
    const result = spawnSync(path.join(root, 'backend/node_modules/.bin/prettier'), ['--check', fixture], { encoding: 'utf8' })
    assert.notEqual(result.status, 0, `${result.stdout}\n${result.stderr}`)
  } finally {
    fs.rmSync(fixture, { force: true })
  }
})

test('high severity dependency findings fail the pull request security job', () => {
  const workflow = read('.github/workflows/ci.yml')
  const requiredJob = workflow.split('\n  ai-declaration:\n')[1].split('\n  lint-typecheck:\n')[0]

  assert.match(requiredJob, /if: github\.event_name == 'pull_request'/)
  assert.match(requiredJob, /uses: actions\/checkout@v4/)
  assert.match(requiredJob, /name: High severity dependency audit \(required merge check\)\n\s+run: pnpm audit --audit-level=high/)
  assert.doesNotMatch(requiredJob, /--ignore=|continue-on-error:\s*true/)
  const workspace = read('pnpm-workspace.yaml')
  assert.match(workspace, /ignoreGhsas:\n\s+- GHSA-vfj7-8cjw-p6xm/)
  assert.equal((workspace.match(/- GHSA-[a-z0-9-]+/g) ?? []).length, 1)
})

test('Firestore index edits trigger production deploy and indexes are deployed', () => {
  const workflow = read('.github/workflows/deploy.yml')

  assert.match(workflow, /paths:[\s\S]*?- 'firebase\/firestore\.indexes\.json'/)
  assert.match(workflow, /--only firestore:rules,firestore:indexes/)
})

test('Stryker runs with the backend unit tests and configured mutation thresholds', () => {
  const config = JSON.parse(read('backend/stryker.config.json'))
  const workflow = read('.github/workflows/mutation.yml')

  assert.equal(config.testRunner, 'vitest')
  assert.ok(config.mutate.length > 0)
  assert.ok(config.thresholds.break >= 10)
  assert.match(workflow, /pnpm --filter backend exec stryker run/)
})
