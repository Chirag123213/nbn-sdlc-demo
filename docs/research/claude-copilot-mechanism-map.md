# Claude Code to GitHub Copilot Mechanism Map

This document maps the Claude Code mechanisms identified in `docs/reports/D1-claude-certification.md` and the repository's Claude configuration to their GitHub Copilot equivalents.

If no direct Copilot equivalent exists, it is recorded explicitly.

## Mechanism mapping

| Claude mechanism | Claude implementation in this repo | GitHub Copilot equivalent | Copilot implementation |
|---|---|---|---|
| CLAUDE.md | `CLAUDE.md`, `frontend/CLAUDE.md`, `backend/CLAUDE.md` | Repository and path-specific custom instructions | `.github/copilot-instructions.md` and `.github/instructions/*.instructions.md` |
| Skill | `.claude/skills/*.md` | Agent skills | `.github/skills/<skill>/SKILL.md` |
| Sub-agent | `.claude/agents/*.md` | Custom agents / subagents | `.github/agents/<agent>.agent.md` |
| Hook | `.claude/settings.json` hooks | Copilot hooks | `.github/hooks/*.json` |
| Command | Explicitly invoked Claude commands and skills | Slash commands and prompt files | Built-in `/` commands and `.github/prompts/*.prompt.md` |
| MCP server | `mcpServers` in `.claude/settings.json` | Copilot MCP servers | `.github/mcp.json` for repository configuration, or repository Copilot MCP settings |

