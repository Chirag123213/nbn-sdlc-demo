#!/usr/bin/env node
/**
 * Validates commit messages follow Conventional Commits and record provenance.
 * Called by Lefthook commit-msg hook.
 *
 * Usage: node scripts/check-commit-msg.js <commit-msg-file>
 */
const fs = require('fs')

const msgFile = process.argv[2]
if (!msgFile) {
  console.error('Usage: node scripts/check-commit-msg.js <commit-msg-file>')
  process.exit(1)
}

const msg = fs.readFileSync(msgFile, 'utf8').trim()
const pattern = /^(feat|fix|docs|style|refactor|test|chore|build|ci|perf|revert)(\(.+\))?: .{1,100}/
const aiAssistedTrailers = msg.match(/^AI-Assisted:\s*(yes|no)$/gim) ?? []
const aiCoauthorTrailer = /^Co-authored-by:\s+[^\n]*(?:copilot|claude|anthropic|openai|codex|chatgpt|gemini|cursor)[^\n]*<[^<>\s]+@[^<>\s]+>$/im

if (!pattern.test(msg)) {
  console.error('\n❌ Commit message does not follow Conventional Commits.\n')
  console.error('  Format: type(scope): description')
  console.error('  Types:  feat | fix | docs | style | refactor | test | chore | build | ci | perf | revert')
  console.error('\n  Examples:')
  console.error('    feat: add invoice PDF export')
  console.error('    fix(auth): handle token expiry on refresh')
  console.error('    docs: update Firestore schema')
  console.error('    chore: upgrade firebase-admin to v13\n')
  process.exit(1)
}

if (aiAssistedTrailers.length !== 1) {
  console.error('\n❌ Commit message must include exactly one AI-Assisted: yes|no trailer.\n')
  process.exit(1)
}

if (/^AI-Assisted:\s*yes$/im.test(msg) && !aiCoauthorTrailer.test(msg)) {
  console.error('\n❌ AI-assisted commits must include an AI Co-authored-by trailer.\n')
  console.error('  Example: Co-authored-by: GitHub Copilot <copilot@github.com>\n')
  process.exit(1)
}

if (/^AI-Assisted:\s*no$/im.test(msg) && aiCoauthorTrailer.test(msg)) {
  console.error('\n❌ A commit declaring no AI assistance cannot include an AI co-author.\n')
  process.exit(1)
}

process.exit(0)
