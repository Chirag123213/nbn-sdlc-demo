const { spawnSync } = require('node:child_process')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { afterEach, test } = require('node:test')
const assert = require('node:assert/strict')

const tempFiles = []

afterEach(() => {
  for (const file of tempFiles.splice(0)) fs.rmSync(file, { force: true })
})

function validate(message) {
  const file = path.join(os.tmpdir(), `commit-msg-${process.pid}-${Date.now()}-${Math.random()}`)
  tempFiles.push(file)
  fs.writeFileSync(file, message)
  return spawnSync(process.execPath, [path.join(__dirname, 'check-commit-msg.js'), file], { encoding: 'utf8' })
}

test('rejects an otherwise valid agent commit without an attribution trailer', () => {
  const result = validate('feat: add fault report form\n')

  assert.notEqual(result.status, 0)
  assert.match(result.stderr, /AI-Assisted: yes\|no trailer/)
})

test('accepts a valid conventional commit with an AI attribution trailer', () => {
  const result = validate('feat: add fault report form\n\nAI-Assisted: yes\nCo-authored-by: GitHub Copilot <copilot@github.com>\n')

  assert.equal(result.status, 0, result.stderr)
})

test('rejects a malformed attribution trailer', () => {
  const result = validate('feat: add fault report form\n\nAI-Assisted: yes\nCo-authored-by: GitHub Copilot\n')

  assert.notEqual(result.status, 0)
})

test('rejects a human co-author trailer that does not identify AI assistance', () => {
  const result = validate('feat: add fault report form\n\nAI-Assisted: yes\nCo-authored-by: Alex Developer <alex@example.com>\n')

  assert.notEqual(result.status, 0)
})

test('accepts a human commit that explicitly declares no AI assistance', () => {
  const result = validate('fix: correct typo in instructions\n\nAI-Assisted: no\n')

  assert.equal(result.status, 0, result.stderr)
})

test('rejects an AI co-author when the commit declares no AI assistance', () => {
  const result = validate('feat: add fault report form\n\nAI-Assisted: no\nCo-authored-by: GitHub Copilot <copilot@github.com>\n')

  assert.notEqual(result.status, 0)
})
