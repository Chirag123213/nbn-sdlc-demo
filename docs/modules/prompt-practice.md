## Prompt Lifecycle

Any useful prompt identified by a team member should not only remain in the developer's chat history, but it should be moved through the four stages: written, stored, versioned and shared.

### Written

The prompt should be written clearly. It should clearly define the task, the relevant context, the expected outcome, and acceptance criteria and what is out of scope. This reduces ambiguity and helps prevent the AI from making changes that are irrelevant and unnecessary to the task.

### Stored

If a prompt is useful beyond a one-off conversation, it should be stored as a file in the repository rather than being left on someone's personal copilot chat history. The exact repository location should follow the team's agreed prompt-storage convention.

### Versioned

Once stored in the repository, the prompt is versioned through Git like an other project files, where the changes to the prompt can be reviewed, compared, reverted, and traced through commits and pull requests.

### Shared

After a prompt has been tested and reviewed, it can be made available to other developers instead of remaining personal knowledge. Repository-level prompts allow the team to reuse the same guidance, while more mature shared practices can later be distributed more broadly through GitHub Copilot.


## Where the Prompts are stored in the Repository

Prompt-related knowledge is stored as files in the repository rather than being left only in personal Copilot chats.

This repository demonstrates the agreed copilot storage structure using real files:

- Reusable task prompts are stored as `.github/prompts/<name>.prompt.md`.
- Repository-wide Copilot guidance is stored in `.github/copilot-instructions.md`.
- Repeated multi-step procedures that become skills are stored as `.github/skills/<skill-name>/SKILL.md`.

These files are committed to the repository, so they can be reviewed, versioned and reused by the team.