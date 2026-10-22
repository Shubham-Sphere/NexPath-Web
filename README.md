# NexPath web — Supermemory setup

Supermemory v5 is wired up as the memory layer for this project. This repo is the
**memory layer only**: the CLI, the agent skill, the docs MCP, the SDK wrapper,
and the smoke test. App wiring comes later.

Everything here follows the official
[agents & MCP guide](https://supermemory.ai/docs/agents-and-mcp).

## What is set up

| Piece | Where | What it does |
| --- | --- | --- |
| CLI | `node_modules/.bin/supermemory` (v5.0.2) | `add`, `search`, `profile`, `namespaces`, `migrate`, `setup` |
| Skill | `.agents/skills/supermemory/` | Teaches the agent the real v5 API surface instead of hallucinating it |
| Docs MCP | `opencode.json` | Lets the agent search the Supermemory docs while coding |
| SDK | `src/lib/supermemory.ts` | Thin wrapper: namespaces, remember, recall, profile, wait, forget |
| Scripts | `scripts/smoke.ts`, `scripts/search.ts` | End-to-end smoke test and terminal search |
| Env | `.env` / `.env.example` | `SUPERMEMORY_API_KEY`, `SUPERMEMORY_NAMESPACE` |

## Activate it

The API key is the only missing piece. Get one at
[console.supermemory.ai](https://console.supermemory.ai) (it starts with `sm_`).

```bash
cp .env.example .env
# paste your key into .env
npm run memory:smoke
```

The smoke test writes one document, waits for processing, searches it, prints the
profile, then deletes the document again.

Prefer the CLI? `npx supermemory login` stores credentials for the CLI, or export
`SUPERMEMORY_API_KEY` and the CLI picks it up too:

```bash
npm run memory:whoami
npm run memory:namespaces
npx supermemory search "what do I like?" --namespace nexpath
```

## Using the memory layer

```ts
import {
  remember,
  recall,
  getProfile,
  profileToText,
  userNamespace,
} from "./src/lib/supermemory.js";

const namespace = userNamespace(user.id); // user_123

await remember(namespace, "Prefers concise, technical answers.", {
  id: `conv_${sessionId}`, // stable id -> one evolving document per conversation
  dreaming: "instant", // so memories are ready right after
});

const results = await recall(namespace, "how should I answer?", { limit: 5 });
const context = profileToText(await getProfile(namespace));
```

Namespaces are the isolation boundary. One per end user by default; use
`projectNamespace(userId, projectId)` for per-project memory and `orgNamespace(name)`
for shared company knowledge.

## Rules that matter (v5)

- Namespace is **always the first argument**, never a body field.
- Auth is `Authorization: Bearer sm_...` only.
- `dreaming: "instant"` when the next step reads memories or the profile.
- Never emit `containerTag`, `customId`, `entityContext`, `filterByMetadata`,
  `documentDate`, `q`, `/v3/`, `/v4/` — those are the deprecated API.
- Already on v3/v4 somewhere? Run `npx supermemory@latest migrate`.

## Agent setup recap

- Skill: `npx skills add https://github.com/supermemoryai/skills --skill supermemory`
- Docs MCP (OpenCode, project scope): `opencode.json` -> `mcp.supermemory-docs`
- Docs MCP (other clients): see <https://supermemory.ai/docs/agents-and-mcp>
- Need the docs while coding in another project? The same snippet works in
  `~/.config/opencode/opencode.jsonc`.

The **Memory MCP** (`https://mcp.supermemory.ai`) is a different product — it gives
the assistant itself long-term memory across chats. It is not configured here.
