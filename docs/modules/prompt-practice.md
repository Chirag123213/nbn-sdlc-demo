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