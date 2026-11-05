# 11. FAQ — CURRENT

Title: "Frequently asked questions"
Description: "Short answers to the questions developers ask before adding NexPath CLI to their workflow."

1. **Is Nexpath another AI coding agent?**
   No. Nexpath is a prompt-quality layer that enhances prompts for the agents you already use: Claude Code, Cursor, Windsurf (Devin), Replit, Lovable, and Bolt.new. It doesn't generate code independently or replace your agent; you keep your workflow and review all suggestions before sending.

2. **Will Nexpath replace my current agent or workflow?**
   No. Nexpath works with the agents and tools you already use; it enhances prompts, not your agent. You retain full control to inspect, edit, or discard suggestions, so your existing agent and workflow remain unchanged.

3. **What is a prompt quality layer?**
   A prompt quality layer sits between you and your AI coding agent. It reads the prompt you were about to send, identifies what the task actually requires, and returns a stronger version with the scope, acceptance criteria, safety constraints, and rollback considerations the request was missing. You review it and decide what to send.

4. **Does Nexpath send my code anywhere?**
   No. Your prompts, session state, and settings stay in ~/.nexpath/ on your machine. The only outbound call is the targeted model call that reviews a single prompt. Your repository is never uploaded and your codebase is never indexed.

5. **Which AI coding agents does Nexpath support?**
   Claude Code, Cursor, Windsurf (Devin), Replit, Lovable, and Bolt.new are fully supported and tested end to end as of v0.1.5. The CLI covers terminal work, the editor extension covers VS Code and its forks, and the browser extension covers browser-based builders.

6. **How is this different from CLAUDE.md or Cursor rules?**
   Unlike static CLAUDE.md/Cursor rules (predefined, project-wide), Nexpath is a live, user-driven instruction layer at prompt time. It reviews prompt/context, preserves intent, and adds task-specific checks (scope, acceptance, verification, safety, etc.) for higher immediate impact. It's not an AI coding agent; it enhances prompts for agents you already use; you always review and control the final prompt.
