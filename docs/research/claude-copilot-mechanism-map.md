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
| Command | Explicitly triggered Claude operation requiring the user to invoke it | Explicitly invoked Copilot operation | User-triggered Copilot Chat commands or agent actions |
| Slash command | Explicitly invoked repo skills such as `/bootstrap`, `/verify`, `/checkpoint`, `/git-feature` and `/git-hotfix` | Prompt files / Copilot slash commands | `.github/prompts/*.prompt.md`; prompt files provide the closest repo-defined equivalent and can be explicitly invoked in Copilot Chat |
| MCP server | `mcpServers` in `.claude/settings.json` | Copilot MCP servers | `.github/mcp.json` for repository configuration, or repository Copilot MCP settings |

