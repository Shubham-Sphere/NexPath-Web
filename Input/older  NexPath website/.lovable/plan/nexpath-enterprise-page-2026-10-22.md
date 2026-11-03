# NexPath — Enterprise page

## Goal

Build a new `/enterprise` route that sells NexPath to organisations. The page must use the **widget layout and section choreography of hydrahost.com** and the **feature/service framing of salad.com**, but every line of copy is original NexPath copy written for this product. Do not copy text, images, logos, or code from either site — borrow structure only.

The page is the enterprise counterpart to the existing homepage: same design tokens, same dark-mode support, same typography, a new level of density and credibility.

## Non-negotiables

- Original copy only. Never paste sentences from hydrahost.com or salad.com.
- Keep the existing NexPath design tokens. Do not introduce a new colour, font, or radius.
- Keep the existing homepage, header, footer, and route tree working. `/enterprise` is additive.
- Every fact on the page must be true today. Where a fact is not yet known, use a `{{PLACEHOLDER: ...}}` token — never invent a number, a customer, or a certification.
- No new dependencies. Use `lucide-react` icons, the existing `Button` component, and `cn` from `@/lib/utils`.
- Do not force-push, rebase, amend, or squash any published git history. Keep the branch in a working state.

## Design tokens

Use the tokens already defined in `src/styles.css`. Do not hard-code hex values.

- `bg-background` page background, `bg-card` surfaces, `text-foreground` headings, `text-muted-foreground` body copy
- `border` / `border-input` for all rules, `bg-muted` for inset panels
- `text-primary` + `bg-primary` for the single accent; `bg-success-soft` / `text-accent-foreground` for the soft accent chip
- `bg-terminal`, `text-terminal-foreground`, `text-terminal-muted`, `border-terminal-line` for the dark terminal panels
- `font-sans` (Manrope) for headings and body, `font-mono` (DM Mono) for eyebrows, labels, stats, and code
- `hatch` utility for the decorative side rails, `page-grid` for the hero backdrop, `text-balance` on headings
- Radius `rounded-md` for cards, `rounded-sm` for small chips, `rounded-full` for pill eyebrows — matching the homepage
- Full dark-mode support via the existing `.dark` class and `ThemeToggle`

## Route and files

Create:

```
src/routes/enterprise.tsx
src/components/enterprise/
  EnterpriseHeader.tsx
  EnterpriseHero.tsx
  TrustStrip.tsx
  StatBand.tsx
  ValuePillars.tsx
  AgentSurfaces.tsx
  ServicesGrid.tsx
  UseCases.tsx
  SecurityTrust.tsx
  EnterpriseFeatures.tsx
  RolloutSteps.tsx
  PromptApi.tsx
  WorkflowMetrics.tsx
  PricingPlans.tsx
  CustomerStories.tsx
  EnterpriseFaq.tsx
  ContactCta.tsx
  EnterpriseFooter.tsx
  enterprise.data.ts
  enterprise.types.ts
```

- `enterprise.data.ts` holds every string, array, and object used on the page, exported as typed constants. No copy inline in the JSX files.
- `enterprise.types.ts` holds the small set of shared types.
- `enterprise.tsx` is a `createFileRoute("/enterprise")` route that composes the sections in order, and sets `head` metadata.
- Register the route by adding the file. The TanStack router plugin regenerates `src/routeTree.gen.ts` on dev/build; do not hand-edit the generated file.
- `EnterpriseHeader` and `EnterpriseFooter` are page-local. Do not modify the root route or the shared homepage components.

## Placeholder token convention

Use this exact shape so every unknown is greppable:

```
{{PLACEHOLDER: short description of what goes here}}
```

Example: `{{PLACEHOLDER: number of organisations on the enterprise plan}}`

Tokens appear inline in copy, inside `enterprise.data.ts` only. Never in JSX. When a token is rendered, it must be visually obvious during review that it is unresolved.

---

# Section-by-section build spec

Build the sections in this exact order.

## S1 — Enterprise header

**Widget model:** hydrahost.com header (logo, primary nav cluster, right-side action).

**Layout:** sticky, `h-16`, `border-b`, `bg-background/95 backdrop-blur-md`, `max-w-7xl` inner container, `px-5 lg:px-8`. Identical geometry to the homepage header.

**Contents:**

- Left: wordmark. `Nexpath` in `font-extrabold`, followed by a `rounded-sm border` mono pill reading `ENTERPRISE`, matching the existing `CLI` pill on the homepage. Link to `/`.
- Centre (`hidden lg:flex`): nav links, `text-sm font-medium text-muted-foreground`, `hover:text-foreground`.
  - `Solutions` → `#solutions`
  - `Services` → `#services`
  - `Security` → `#security`
  - `Use cases` → `#use-cases`
  - `Plans` → `#plans`
  - `Docs` → `{{PLACEHOLDER: documentation URL}}`
- Right: `Button variant="hero" size="sm"` reading `Talk to sales` → `#contact`. Plus a `ThemeToggle` (copy the existing homepage implementation into `EnterpriseHeader.tsx` — it is page-local state, do not try to share it across routes).
- Mobile (`lg:hidden`): `Button variant="ghost" size="icon"` that toggles `Menu` / `X`, and an expandable nav panel below the header with the same six links stacked at `px-3 py-3`, plus a full-width `Talk to sales` block at the bottom using `bg-primary text-primary-foreground`. Close the panel on link click and on Escape.

## S2 — Hero

**Widget model:** hydrahost.com hero (image + headline left, visual right) combined with salad.com hero (headline, sub-copy, two CTAs, stat band immediately below).

**Layout:** `relative border-b`, `page-grid` background, with an `absolute inset-0 bg-background/75` scrim over the grid. Inner: `max-w-7xl px-5 lg:px-8 py-16 lg:py-20`. Two-column grid `lg:grid-cols-[0.92fr_1.08fr]`, `gap-12`, `items-center`.

**Left column, in order:**

1. Eyebrow chip — `inline-flex items-center gap-2 border border-primary/25 bg-success-soft px-3 py-1.5 font-mono text-xs font-medium text-accent-foreground` with a `Sparkles` icon, text: `NEXPATH FOR ENTERPRISE`.
2. H1 — `mt-6 text-balance text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl`.
   **Copy:** `One prompt quality standard for every AI coding agent your team already uses.`
3. Sub-copy — `mt-6 max-w-xl text-balance text-lg leading-8 text-muted-foreground`.
   **Copy:** `NexPath reviews a prompt before your agent acts on it, then applies your organisation's standards — scope, acceptance criteria, safety constraints, and rollback steps. Developers keep the agents they love. You keep one definition of what good looks like.`
4. CTA row — `mt-8 flex flex-wrap gap-3`.
   - Primary: `Button variant="hero" size="xl"` → `Talk to sales` with an `ArrowRight` icon, href `#contact`.
   - Secondary: `Button variant="outline" size="xl"` → `Watch the demo` with a `Play` icon, href `https://youtu.be/pNejtPA5DPU`, `target="_blank" rel="noopener noreferrer"`.
5. Trust chip row — `mt-7 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-muted-foreground`, each item a `Check` icon in `text-primary` plus a label:
   - `Local-first by default`
   - `Apache 2.0`
   - `Works with 6+ agents`

**Right column:** a terminal-styled visual, not an image asset. Use `rounded-lg border border-terminal-line bg-terminal shadow-2xl overflow-hidden` with a fake window chrome bar (`px-4 py-3 flex items-center justify-between border-b border-terminal-line`, left label `nexpath review`, right a mono `ENTERPRISE` tag) and below it a `p-5` mono block showing a policy-applied review — original content, styled like the homepage's `StepMockup` and `PrivacyFeature` terminal cards. Suggested content inside the mono block:

```
> nexpath review --policy acme-enterprise

original   Add password reset
policy     acme-enterprise · v3

+ scope      auth pages only, no email provider changes
+ accept     tests pass, existing sessions unaffected
+ safety     no secrets in fixtures
+ rollback   feature flag defaults off

[ Accept ]  [ Edit ]  [ Reject ]
```

Style the `+` lines with `text-primary`, the original line with `text-terminal-muted`, and the three action chips as bordered `rounded` spans where the first is `border-primary bg-primary text-primary-foreground`.

## S3 — Trust strip

**Widget model:** hydrahost.com OEM logo row (Lenovo, HPE, NVIDIA, Dell, PNY) directly under the hero.

**Layout:** `border-b py-10`. Inner `max-w-7xl px-5 lg:px-8`.

**Contents:**

- Centred mono label, `font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground`: `WORKS WITH THE AGENTS YOUR TEAM ALREADY SHIPS WITH`.
- A flex row, `mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6`, of the real integration logos already in `src/assets/`: `claudecode-color.svg`, `cursor.svg`, `devin.svg` (Windsurf/Devin), `replit-color.svg`, `lovable-color.svg`, `bolt.new.svg`, `vs_code.svg`. Each at `h-6 w-auto opacity-70 transition-opacity hover:opacity-100`, `alt` set to the product name, `loading="lazy"`.
- Below the row, a one-line mono note, `mt-6 text-center font-mono text-xs text-muted-foreground`: `One standard. Every agent. No rewrite of your workflow.`

## S4 — Stat band

**Widget model:** salad.com hero stat row (16,000+ GPUs / 190+ countries / 90% lower cost / $0.015 per GPU-hour).

**Layout:** `border-b py-14`. Inner `max-w-7xl px-5 lg:px-8`. A `grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4` producing four cells, each `bg-card p-6 lg:p-8`.

**Use only numbers that are true today.** Four cells:

| Value | Label | Supporting note |
| --- | --- | --- |
| `29/40` | SWE-bench Verified tasks solved | `vs 27/40 without NexPath` |
| `6+` | AI coding agents supported | `CLI, VS Code, and browser` |
| `1` | targeted model call per prompt | `Reviewed once, before the agent acts` |
| `0` | repositories uploaded or indexed | `Prompts and state stay on the device` |

Each cell renders the value at `text-4xl font-extrabold` (the first one in `text-primary`), the label at `mt-3 text-sm font-bold`, and the note at `mt-1 font-mono text-xs text-muted-foreground`.

## S5 — Value pillars

**Widget model:** hydrahost.com "GPU Infrastructure for Every Use Case" — three benefit cards with icons, each with a short headline, a sentence, and a CTA link on the section.

**Layout:** `border-b py-24`. Inner `max-w-7xl px-5 lg:px-8`. Use the existing `SectionHeading` pattern (mono pill eyebrow + `text-3xl sm:text-4xl font-extrabold` title + `mt-3 text-base leading-7 text-muted-foreground` description).

- Eyebrow: `WHY ENTERPRISE`
- Title: `Consistency, reviewability, and guardrails your developers keep.`
- Description: `The same prompt-quality layer that improves one developer's work becomes a standard your whole organisation can rely on.`

**Three cards**, `mt-10 grid gap-5 md:grid-cols-3`, each `rounded-md border bg-card p-6 lg:p-8`:

1. Icon `Layers` in a `grid size-10 place-items-center rounded-md bg-success-soft text-primary` tile.
   Title: `One standard, not seven`
   Body: `Every team writes prompts differently. NexPath applies your organisation's rules the same way in the terminal, the editor, and the browser — so "good" means one thing across the company.`
2. Icon `Gauge` in the same tile.
   Title: `Less time in review`
   Body: `Scoped briefs, explicit acceptance criteria, and named checks arrive with the prompt. Developers stop guessing what was meant, and reviewers stop re-explaining it.`
3. Icon `ShieldCheck` in the same tile.
   Title: `Guardrails that travel`
   Body: `Safety, verification, and rollback steps ride along with the request. Your agent inherits your standards instead of inventing its own.`

Below the cards, a centred `mt-8` link: `See how it works →` → `/#workflow`, `text-sm font-bold text-primary hover:underline`.

## S6 — Agent surfaces

**Widget model:** hydrahost.com "The AI Factory Operating System™" — four numbered blocks (`01`–`04`), each with a small eyebrow, a two-line title, a description, and a visual.

**Layout:** `border-b py-24`. Inner `max-w-7xl px-5 lg:px-8`. Grid `gap-px bg-border sm:grid-cols-2 lg:grid-cols-4` with each cell `bg-card p-6`.

Each cell:
- Number `01`–`04` in `font-mono text-xs text-primary`.
- Eyebrow in `font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground`.
- Title `mt-3 text-lg font-bold`.
- Description `mt-2 text-sm leading-6 text-muted-foreground`.
- A small visual anchored to the bottom of the cell, `mt-6 flex-1` spacer above it, styled like the homepage's `StepMockup` mono boxes (`rounded-md border border-terminal-line bg-terminal p-3 font-mono text-[11px] leading-5 text-terminal-foreground`).

**Content:**

| # | Eyebrow | Title | Description | Visual |
| --- | --- | --- | --- | --- |
| 01 | `TERMINAL` | `Claude Code` | `The NexPath CLI reviews each prompt at the line before the agent writes a line of code. Accept, edit, or reject — then continue.` | mono box showing a prompt line and an `accept / edit / reject` row |
| 02 | `EDITOR` | `Cursor, Windsurf` | `The VS Code extension applies the same standard inside the editor your team already lives in. Works across VS Code forks.` | mono box showing a `review` badge and two diff lines |
| 03 | `BROWSER` | `Replit, Lovable, Bolt.new` | `The browser extension brings organisation standards to the builders shipping your web app, without a second workflow.` | mono box showing a `policy applied` chip |
| 04 | `PLATFORM` | `Prompt API` | `Route prompts from your own tools, CI, or agent orchestration through one governed endpoint.` | mono box showing a `POST /v1/review` line |

## S7 — Services grid

**Widget model:** salad.com "Platform and deployment options" — four product cards, each with a product label, a title, a description, three mono keyword tags, and a "Learn more" link.

**Layout:** `border-b py-24`, `id="services"`. Section heading:

- Eyebrow: `SERVICES`
- Title: `Everything an enterprise rollout needs, in one place.`
- Description: `Pick the surface that matches your operating model. Every service is built on the same review engine and the same policy model.`

**Four cards**, `mt-10 grid gap-5 md:grid-cols-2`:

1. **Managed Review Service** — eyebrow `MANAGED`
   `The review engine, delivered as a managed service. Every prompt is enhanced and checked against your standard before it reaches your agent — no infrastructure to run, no plugins to maintain.`
   Tags: `managed` · `no infra` · `any agent`
   Link: `Talk to sales →` → `#contact`
2. **Organisation Policy Engine** — eyebrow `GOVERNANCE`
   `Define scope templates, required verification, safety rules, and rollback steps once. NexPath applies them consistently per repo, per team, and per agent, and keeps every version immutable.`
   Tags: `versioned` · `per repo` · `immutable`
   Link: `Talk to sales →` → `#contact`
3. **Private Deployment** — eyebrow `YOUR NETWORK`
   `Run the review engine inside your own network boundary. Prompts, policies, and logs stay in your environment, and your own review service holds the records.`
   Tags: `vpc` · `air-gap ready` · `your logs`
   Link: `Talk to sales →` → `#contact`
4. **Enterprise Support** — eyebrow `SUPPORT`
   `Security review, procurement documentation, onboarding, and a named team for large deployments — with SLAs on the paths your team depends on.`
   Tags: `security review` · `procurement` · `SLA`
   Link: `Talk to sales →` → `#contact`

**Card anatomy:** `rounded-md border bg-card p-6 lg:p-8`, with `text-xs font-mono uppercase tracking-[0.16em] text-primary` eyebrow, `mt-3 text-xl font-bold` title, `mt-3 text-sm leading-6 text-muted-foreground` body, a `mt-5 flex flex-wrap gap-2` row of `rounded-sm border bg-muted px-2 py-1 font-mono text-[11px] text-muted-foreground` tags, and a `mt-6 text-sm font-bold text-primary` link.

## S8 — Use cases

**Widget model:** salad.com "Use cases → By workload" navigation cluster.

**Layout:** `border-b py-24`, `id="use-cases"`. Section heading:

- Eyebrow: `USE CASES`
- Title: `Standards that hold up under every kind of work.`
- Description: `The same review applies everywhere. These are the workflows where enterprise teams see the difference first.`

**Ten cards**, `mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-5`, each `bg-card p-5`:

| Title | One-line body |
| --- | --- |
| `Feature implementation` | `Scope, non-goals, and acceptance criteria before a line is written.` |
| `Bug fixing` | `Reproduction steps and a verification path the agent must follow.` |
| `Hotfixes` | `Minimal-change rules and a named rollback for production fixes.` |
| `Refactoring` | `Boundaries and invariants stated, so the agent cannot quietly rewrite more than it was asked to.` |
| `Test generation` | `Explicit pass conditions so generated tests are checkable, not decorative.` |
| `API & integrations` | `Contract details, error handling, and compatibility rules included up front.` |
| `Infrastructure` | `Environment, cost, and blast-radius constraints stated before anything is provisioned.` |
| `Documentation` | `Audience, scope, and accuracy rules so docs match the code that ships.` |
| `Code review` | `The review criteria the author and the reviewer are both working from.` |
| `Legacy migration` | `Inventory, ordering, and stop conditions for work nobody can review by eye.` |

Each card renders the title at `text-sm font-bold` and the body at `mt-2 text-xs leading-5 text-muted-foreground`.

## S9 — Security and trust

**Widget model:** hydrahost.com "Confidential Metal™" — a section with a bold two-line title, a supporting paragraph, four labelled sub-features in a bordered grid, and a row of security badges.

**Layout:** `border-b py-24`, `id="security"`. This section is the visual centrepiece of the page: use a dark terminal panel for the heading block to differentiate it from the rest of the page.

**Heading block:** `rounded-lg border border-terminal-line bg-terminal text-terminal-foreground p-8 lg:p-12`.
- Mono eyebrow `font-mono text-[11px] uppercase tracking-[0.16em] text-terminal-muted`: `ZERO-TRUST PROMPT HANDLING`
- H2 `mt-4 text-3xl font-extrabold sm:text-4xl`: `Your prompts are not a telemetry source.`
- Paragraph `mt-4 max-w-2xl text-base leading-7 text-terminal-muted`: `NexPath was designed local-first. The review happens where the work happens, and the organisation layer adds governance without taking control of your code away.`

**Four sub-features**, `mt-8 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4`, each `bg-card p-6`:

1. `Local by default` — `Prompts, session state, and settings live in ~/.nexpath/ on the developer's machine. Your repository is never uploaded and your codebase is never indexed.`
2. `Secret redaction` — `API keys, tokens, and PEM blocks are stripped before a prompt is stored, so nothing sensitive reaches history or logs.`
3. `Reviewable by design` — `Every enhanced prompt is a document a person can read, diff, and approve. Nothing is applied silently, at any layer.`
4. `Auditable` — `Centralised, exportable records of every review, policy decision, and approval — ready for your security review and compliance evidence.`

**Badge row**, `mt-8 flex flex-wrap gap-3`. Each badge `rounded-full border bg-card px-3 py-1.5 font-mono text-[11px] text-muted-foreground`. Use the `CheckCircle2` icon in `text-primary` inside each.

- `Local-first` (confirmed)
- `Secret redaction` (confirmed)
- `Audit logs` (confirmed)
- `SSO & SCIM` (confirmed)
- `SOC 2 {{PLACEHOLDER: SOC 2 status — Type I or Type II, or "in progress"}}` (unconfirmed — keep the placeholder visible)
- `ISO 27001 {{PLACEHOLDER: certification status}}` (unconfirmed — keep the placeholder visible)
- `Encryption at rest` (confirmed)

**A note under the badges**, `mt-4 max-w-2xl text-xs leading-5 text-muted-foreground`: `Items marked with a placeholder are not yet confirmed. Replace them only when the corresponding documentation exists.`

## S10 — Enterprise features

**Widget model:** hydrahost.com "Hydra Sets the New Standard" — a two-column section: heading on the left, an eight-item arrow list on the right, with a CTA under the heading.

**Layout:** `border-b py-24`. Inner `max-w-7xl grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:px-8`.

**Left column:**
- Mono eyebrow `font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground`: `FEATURES`
- H2 `mt-4 text-4xl font-extrabold leading-tight`: `The organisation layer, end to end.`
- Paragraph `mt-4 text-lg leading-8 text-muted-foreground`: `Everything below runs on the same engine your developers already use. Nothing here requires them to change tools.`
- CTA `mt-6`: `Button variant="hero"` → `Talk to sales` with `ArrowRight`, href `#contact`.

**Right column:** an eight-row list, each row `border-b border-border/60 py-5 last:border-b-0`, with a two-line block (title + body) on the left and an `ArrowRight` icon in `text-primary` on the right, matching the homepage's `GroupHeader` arrow treatment.

1. **Organisation Prompt Standards** — `Publish one set of scope, acceptance, safety, and rollback rules. Every team inherits them automatically, in every agent.`
2. **Works with every agent** — `One policy model across Claude Code, Cursor, Windsurf, Replit, Lovable, and Bolt.new. Switching tools never resets your standards.`
3. **No repository upload** — `Your codebase is never uploaded and never indexed. The review reads the prompt and session context, nothing more.`
4. **Automatic secret redaction** — `API keys, tokens, and PEM blocks are stripped before a prompt is stored or logged.`
5. **Full audit trail** — `Every review, policy decision, and approval is recorded and exportable for your security and compliance evidence.`
6. **SSO, SCIM & role controls** — `Bring your identity provider. Map roles to policies so each team only gets the standards it should have.`
7. **Policy-as-code API** — `Define, version, and roll out policy sets programmatically. Roll back a rule without touching the prompt path.`
8. **Dedicated support & SLAs** — `A named team for large deployments, with response targets on the paths your delivery depends on.`

## S11 — Rollout steps

**Widget model:** hydrahost.com "Meet the AI Factory Operating System™" — a four-step numbered progress indicator (`01 Rent 02 Manage 03 API 04 Support`) paired with a platform visual.

**Layout:** `border-b py-24`. Inner `max-w-7xl px-5 lg:px-8`.

Section heading:
- Eyebrow: `ROLLOUT`
- Title: `Live in a sprint, not a quarter.`
- Description: `Four steps from decision to a standard every developer inherits.`

**Step rail**, `mt-10 flex flex-col gap-4 sm:flex-row sm:items-center`, each step a flex item containing:
- A `size-9 shrink-0 grid place-items-center rounded-full border font-mono text-xs text-primary` circle with the number.
- A label `text-sm font-bold`.
- A connector `hidden sm:block h-px flex-1 bg-border` between steps except the last.

1. `Connect` — `Point your agents at NexPath: the CLI, the VS Code extension, or the browser extension. No new IDE, no rewrite.`
2. `Govern` — `Set your standard once. Scope templates, required checks, and acceptance rules apply to every prompt your teams send.`
3. `Roll out` — `Ship it through the channel you already use — package manager, internal registry, or the Prompt API behind your own tooling.`
4. `Measure` — `See where prompts get accepted, revised, or rejected, and tune the standard with evidence instead of opinion.`

Below the rail, `mt-10 grid gap-5 md:grid-cols-3`:
- A quote-style card: `rounded-md border bg-card p-6` with a `blockquote` in `text-base leading-7`, an attribution `mt-4 text-sm font-bold`, and a `font-mono text-xs text-muted-foreground` sub-line.
  Quote: `The hard part of a prompt standard was never writing it. It was making sure it applied to the tool a developer happened to open that morning.`
  Attribution: `{{PLACEHOLDER: role, e.g. VP Engineering}}`
  Sub-line: `{{PLACEHOLDER: company}}`
- A second card with the same structure:
  Quote: `We wanted standards we could audit, not standards that lived in a slide deck. NexPath gave us something we could log, review, and change.`
  Attribution: `{{PLACEHOLDER: role, e.g. Head of Platform}}`
  Sub-line: `{{PLACEHOLDER: company}}`
- A third card that is a link card: `rounded-md border bg-primary/10 p-6` with a mono eyebrow `NEXT STEP`, a `text-lg font-bold` title `Bring your security team in early`, a body `mt-2 text-sm leading-6 text-muted-foreground` explaining that a security review happens before rollout, and a `text-sm font-bold text-primary` link `Request the security pack →` → `#contact`.

## S12 — Prompt API

**Widget model:** hydrahost.com "Unified Bare Metal API" — a two-column section: narrative on the left, a terminal code panel on the right, plus a four-attribute strip underneath.

**Layout:** `border-b py-24`. Inner `max-w-7xl grid gap-12 px-5 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-8`.

**Left column:**
- Mono eyebrow: `API`
- H2 `mt-4 text-4xl font-extrabold leading-tight`: `One endpoint for every agent.`
- Paragraph `mt-4 text-lg leading-8 text-muted-foreground`: `Route prompts through your own tooling, your CI, or an internal platform. The policy runs server-side, so a developer cannot opt out by switching to a different editor.`
- Paragraph `mt-4 text-base leading-7 text-muted-foreground`: `Build directly against the Prompt API, or drop it into an existing orchestration layer. One integration covers every surface.`

**Right column:** terminal panel, same anatomy as the homepage install block — `overflow-hidden rounded-lg border border-terminal-line bg-terminal-soft`, a chrome bar `flex items-center justify-between border-b border-terminal-line px-4 py-3` with `text-terminal-muted` label `nexpath api` and a copy button, and a `pre` block with `p-5 leading-7 text-terminal-foreground font-mono text-xs`.

Code content (original, and the URL is a placeholder):

```
$ curl -X POST {{PLACEHOLDER: API base URL}}/v1/review \
  -H "Authorization: Bearer $NEXPATH_API_KEY" \
  -H "Content-Type: application/json" -d '{
    "prompt": "Add password reset to the auth flow",
    "policy": "acme-enterprise",
    "version": "3",
    "agent": "claude-code",
    "context": { "repo": "acme/web", "branch": "feat/password-reset" }
  }'
```

Highlight the `$` in `text-success` and the `{{PLACEHOLDER: API base URL}}` in `text-primary`. The copy button copies the snippet and shows a `Check` icon for ~1.8s, exactly like the homepage `copyInstallCommands` pattern.

**Four-attribute strip** below, `mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4`, each cell `bg-card p-6`:
- `UNIFIED` / **One contract** / `A single endpoint for every agent, editor, and internal tool.`
- `POLICY-DRIVEN` / **Standards server-side** / `Rules apply at the API, so switching tools does not skip them.`
- `VERSIONED` / **Immutable policy sets** / `Every policy version is immutable and roll-backable.`
- `AVAILABLE NOW` / **REST over HTTPS** / `Swap the base URL and you control where the review runs.`

## S13 — Workflow metrics

**Widget model:** salad.com "Optimized per workload" — a row of cards, each with a modality name, a headline benchmark figure, a supporting sentence, and a link to the methodology.

**Layout:** `border-b py-24`. Section heading:
- Eyebrow: `MEASURED`
- Title: `Published numbers, not promises.`
- Description: `Every figure below links to the method behind it. Placeholder figures stay marked until the study exists.`

**Five cards**, `mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3`:

1. `SWE-bench Verified` — headline `29/40` — `Same 40 tasks, same model, same setup. NexPath improved the prompt before execution.` — link `Read the benchmark report →` → `https://github.com/hi0001234d/nexpath/tree/main/Nexpath_benchmark`
2. `Feature implementation` — headline `{{PLACEHOLDER: first-pass acceptance rate on scoped feature prompts}}` — `{{PLACEHOLDER: n, model, and date range of the measurement}}`
3. `Refactoring` — headline `{{PLACEHOLDER: share of refactor prompts accepted without a scope correction}}` — `{{PLACEHOLDER: n, model, and date range of the measurement}}`
4. `Security-sensitive changes` — headline `{{PLACEHOLDER: share of flagged changes that carried an explicit rollback step}}` — `{{PLACEHOLDER: n, model, and date range of the measurement}}`
5. `Test generation` — headline `{{PLACEHOLDER: share of test prompts that carried explicit pass conditions}}` — `{{PLACEHOLDER: n, model, and date range of the measurement}}`

**Card anatomy:** `rounded-md border bg-card p-6`. Modality name in `font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground`, headline `mt-3 text-3xl font-extrabold` (first card in `text-primary`), body `mt-2 text-sm leading-6 text-muted-foreground`, link `mt-4 text-sm font-bold text-primary hover:underline`.

**Note under the grid**, `mt-6 text-xs text-muted-foreground`: `Figures marked with a placeholder are not yet published. They stay visibly unresolved until a methodology write-up exists.`

## S14 — Pricing plans

**Widget model:** salad.com pricing cards combined with hydrahost.com inventory cards (price, unit, availability badge).

**Layout:** `border-b py-24`, `id="plans"`. Section heading:
- Eyebrow: `PLANS`
- Title: `Priced per developer, not per prompt.`
- Description: `Every plan is local-first and runs against the agents your team already uses. No plan uploads your repository or indexes your codebase.`

**Three cards**, `mt-10 grid gap-5 lg:grid-cols-3`:

1. **Team** — `Up to 25 developers` — price `{{PLACEHOLDER: Team price per developer per month}}` / `per developer / month`
   - Organisation prompt standards
   - All agent integrations (CLI, VS Code, browser)
   - Shared policy library
   - Email support
   - 30-day audit history
2. **Business** — `Up to 200 developers` — price `{{PLACEHOLDER: Business price per developer per month}}` / `per developer / month` — badge `MOST POPULAR`
   - Everything in Team
   - SSO, SCIM & role-based access
   - Policy-as-code API
   - 1-year audit retention
   - Priority support
3. **Enterprise** — `Unlimited developers` — price `Custom` / `annual contract`
   - Everything in Business
   - Private deployment in your network
   - Custom policy packs
   - Dedicated team & SLAs
   - Security review & procurement documentation
   - Onboarding and rollout support

**Card anatomy:** `rounded-md border bg-card p-6 lg:p-8`, with a `relative` wrapper. The Business card gets `border-primary` and `ring-1 ring-primary/25`. The `MOST POPULAR` badge is absolutely positioned `top-0 right-6 -translate-y-1/2 rounded-full bg-primary px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-primary-foreground`. Plan name `text-xl font-bold`, seat line `mt-1 font-mono text-xs text-muted-foreground`, price `mt-5 text-4xl font-extrabold`, unit `mt-1 font-mono text-xs text-muted-foreground`, feature list `mt-6 space-y-3` with each item a `flex items-start gap-2.5 text-sm` and a `Check` icon `mt-0.5 size-4 shrink-0 text-primary`, then a CTA button `mt-7 w-full`: Team and Business get `Button variant="outline"`, Enterprise gets `Button variant="hero"`. All three CTAs read `Talk to sales` and point to `#contact`.

**Strip under the cards**, `mt-8 rounded-md border bg-muted p-5 text-sm leading-6 text-muted-foreground`:
`Need a private deployment, a custom policy pack, or a procurement pack? The enterprise plan is built around them.`

## S15 — Customer stories

**Widget model:** salad.com "Customer stories" quotes with a logo, a quote, an attributed person, and a "Read the case study" link — preceded by hydrahost-style customer logo placement.

**Layout:** `border-b py-24`. Section heading:
- Eyebrow: `CUSTOMERS`
- Title: `Teams ship on NexPath.`
- Description: `Placeholder entries below are marked for replacement — swap in a real logo, quote, and attribution before publishing.`

**Logo row**, `mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-6`:
- Six `{{PLACEHOLDER: customer logo 1}}` … `{{PLACEHOLDER: customer logo 6}}` slots, each `h-6 w-auto opacity-70` placeholder boxes with `grid size-24 place-items-center rounded-sm border border-dashed border-border font-mono text-[10px] text-muted-foreground`.
- A line above the row, `mb-8 text-center font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground`: `{{PLACEHOLDER: number of organisations on the enterprise plan}} organisations run NexPath.`

**Three story cards**, `mt-12 grid gap-5 lg:grid-cols-3`, each `rounded-md border bg-card p-6 lg:p-8`:
- Quote `text-base leading-7`
- Person `mt-5 text-sm font-bold`
- Role and company `font-mono text-xs text-muted-foreground`
- Link `mt-4 text-sm font-bold text-primary hover:underline` → `{{PLACEHOLDER: case study URL}}`

Card 1 quote: `By routing every prompt through the same standard, we stopped arguing about prompt quality in code review and started shipping. The standard was the same on the first day as on the hundredth.`
Card 1 person: `{{PLACEHOLDER: customer name 1}}`, role line `{{PLACEHOLDER: role, company 1}}`

Card 2 quote: `The rollout was not a migration. Developers kept the tools they already had, and the standard came with them. That is the only reason adoption worked.`
Card 2 person: `{{PLACEHOLDER: customer name 2}}`, role line `{{PLACEHOLDER: role, company 2}}`

Card 3 quote: `We could answer our security team's questions because the logs existed. Review, policy decision, approval — all of it was already there.`
Card 3 person: `{{PLACEHOLDER: customer name 3}}`, role line `{{PLACEHOLDER: role, company 3}}`

## S16 — FAQ

**Widget model:** salad.com "FAQ — Straight answers" and the homepage's existing accordion.

**Layout:** `border-b py-24`. Section heading:
- Eyebrow: `FAQ`
- Title: `Straight answers.`
- Description: `What enterprise teams ask before they put NexPath in front of a whole engineering organisation.`

**Eight accordion items** in a `mx-auto mt-10 max-w-3xl divide-y divide-border overflow-hidden rounded-md border bg-card` container, using the homepage `FaqItem` pattern exactly: a `button` with `aria-expanded`, `flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-muted/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary`, the question in an `h3` at `text-sm font-bold sm:text-base`, a `ChevronDown` at `size-4 shrink-0 text-primary` that rotates `180` when open, and the answer in `px-5 pb-5 text-sm leading-6 text-muted-foreground`.

1. **How is NexPath for Enterprise different from the CLI?** — `The CLI is the review engine a developer runs locally. Enterprise adds the organisation layer around it: shared standards, policy versions, role-based access, centralised audit records, and a support commitment. The review itself is identical.`
2. **Does NexPath send our code anywhere?** — `No. Prompts, session state, and settings live in ~/.nexpath/ on the developer's machine. The only outbound call is the targeted model call that reviews a single prompt. Your repository is never uploaded and your codebase is never indexed. On a private deployment, the review runs inside your own network.`
3. **Can we run NexPath inside our own network?** — `Yes. The private deployment runs the review engine behind your own boundary, so prompts, policies, and audit records stay in your environment. Talk to us about the topology that fits you.`
4. **Which agents does the enterprise plan cover?** — `Claude Code through the CLI, Cursor and Windsurf (Devin) through the VS Code extension, and Replit, Lovable, and Bolt.new through the browser extension. The Prompt API covers your own tools on top of that.`
5. **Can we enforce our own prompt standards?** — `Yes. Standards are defined as policy sets, versioned, and applied server-side for API traffic and client-side for local tools. Roles decide which policy set a team inherits.`
6. **What does an enterprise rollout look like?** — `Four steps: connect the agents your team already uses, define the standard, roll it out through the channel you already use, and measure where prompts are accepted or revised. Most teams start with one team and one repository set.`
7. **Do you support security reviews and procurement?** — `Yes. We provide a security pack, procurement documentation, and support for vendor security questionnaires. Request it from the contact form and we will route it to the right team.`
8. **How is usage priced?** — `Per active developer, per month, with volume bands on the Business and Enterprise plans. Audit retention, SSO, and private deployment are plan features rather than add-ons.`

## S17 — Closing CTA and contact form

**Widget model:** hydrahost.com closing banner ("Deploying AI Factory Infrastructure?" + CTA) combined with salad.com's dual CTA band.

**Layout:** `border-b py-24`, `id="contact"`. Dark terminal band, `bg-terminal text-terminal-foreground`.

**Band:**
- H2 `text-balance text-4xl font-extrabold sm:text-5xl`: `Make every prompt a brief your team can trust.`
- Paragraph `mt-4 mx-auto max-w-2xl text-center text-base leading-7 text-terminal-muted`: `Tell us how your team ships with AI today. We will show you what the standard looks like on your repositories, your agents, and your rules.`
- CTA row `mt-8 flex flex-wrap justify-center gap-3`:
  - `Button variant="hero" size="xl"` → `Talk to sales` with `ArrowRight`.
  - `Button variant="terminal" size="xl"` → `Watch the demo` with `Play` → `https://youtu.be/pNejtPA5DPU`.
- Terminal strip below, `mx-auto mt-10 max-w-3xl overflow-hidden rounded-lg border border-terminal-line bg-terminal-soft text-left font-mono text-xs` with a chrome bar and a single line `$ nexpath install --policy acme-enterprise` plus a copy button.

**Contact form**, `mx-auto mt-12 max-w-2xl rounded-md border border-terminal-line bg-terminal-soft p-6 lg:p-8`:
- Mono label `font-mono text-[11px] uppercase tracking-[0.16em] text-terminal-muted`: `TALK TO SALES`
- Short line `mt-3 text-sm leading-6 text-terminal-muted`: `We reply within one business day.`
- Form `mt-6 grid gap-4 sm:grid-cols-2`, `action="{{PLACEHOLDER: contact form endpoint}}"` with `method="POST"`, plus a `// TODO: point this at the CRM or form service before publishing` code comment above the form element.
- Fields: `Full name` (text, required), `Work email` (email, required), `Company` (text, required), `Team size` (select: `1–10`, `11–50`, `51–200`, `201–1000`, `1000+`), `What are you building with?` (text, optional), `How can we help?` (textarea, rows 4, required).
- Field chrome must work on the dark panel: `h-11 rounded-md border border-terminal-line bg-terminal px-4 text-sm text-terminal-foreground placeholder:text-terminal-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`, labels `text-xs font-mono uppercase tracking-[0.12em] text-terminal-muted`.
- Submit button `mt-2 sm:col-span-2`: `Button variant="hero" size="lg"` reading `Request a conversation`.
- A note under the form, `mt-4 text-xs text-terminal-muted`: `Your details are used to answer your request. Nothing is added to a marketing list without your consent.`

## S18 — Enterprise footer

**Widget model:** hydrahost.com footer — logo block on the left, four link columns, then a bottom bar with addresses, copyright, and a version tag.

**Layout:** `border-t border-terminal-line bg-terminal text-terminal-muted`. Inner `mx-auto max-w-7xl px-5 py-14 lg:px-8`.

- **Top row**, `grid gap-10 lg:grid-cols-[1.2fr_2.8fr]`:
  - Left: `Nexpath` in `font-extrabold text-terminal-foreground` with the `ENTERPRISE` mono pill beneath it, then a `mt-4 max-w-xs text-sm leading-6 text-terminal-muted` paragraph: `The prompt quality layer for AI coding workflows. One standard for every agent your team already uses.` and the existing social icon links (GitHub, Discord, X, LinkedIn) reusing the homepage's inline SVG components, pointing at the same URLs the homepage uses: GitHub `https://github.com/hi0001234d/nexpath`, Discord `https://discord.gg/Xg5aRWG5c`, X `https://x.com/Nex_path`, LinkedIn `https://www.linkedin.com/showcase/nex-path/`. All four open in a new tab with `rel="noopener noreferrer"`.
  - Right: four link columns, `grid gap-8 sm:grid-cols-2 lg:grid-cols-4`. Each column has a `font-mono text-[11px] uppercase tracking-[0.16em] text-terminal-foreground` heading and a `mt-4 space-y-2.5` list of `text-sm text-terminal-muted hover:text-terminal-foreground` links.
    - **Product** — Managed review service, Organisation policy engine, Private deployment, Enterprise support, Plans (`#plans`), Prompt API (`#api`)
    - **Company** — About, Enterprise (`/enterprise`), Blog, Careers, Contact sales (`#contact`)
    - **Resources** — Documentation, Prompt API reference, Security (`#security`), Status, Changelog
    - **Legal** — Terms of service, Privacy policy, Security compliance, Data processing addendum, Cookie settings
    - Unresolved links use `{{PLACEHOLDER: URL}}` and are marked as such.
- **Bottom bar**, `mt-12 flex flex-col items-center gap-4 border-t border-terminal-line pt-6 text-xs sm:flex-row sm:justify-between`:
  - `© 2026 ParseOS. All rights reserved.`
  - `NexPath CLI · Built during MLH AI Hackfest 2026`
  - A `ThemeToggle` styled for the dark footer, exactly like the homepage's footer toggle.

---

# Homepage changes

Two small, additive changes to `src/routes/index.tsx`. Do not restructure the homepage.

1. **Header nav** — add `["Enterprise", "/enterprise"]` to the `navItems` array. Place it after `Benchmark` and before `Privacy`. It renders as a normal nav link, so a React Router `<Link to="/enterprise">` is needed instead of an `<a href>` for the two existing `navItems.map` blocks — keep the existing anchor links as-is and special-case the new entry so it navigates as a route rather than reloading the page. In the mobile nav block, render it the same way.
2. **Footer** — add an `Enterprise` link to the homepage footer. The current footer is a single row; add a small link row above the bottom row, or add the link next to the existing `NexPath CLI · Built during MLH AI Hackfest 2026` line, matching the terminal-footer colour treatment (`text-terminal-muted`, `hover:text-terminal-foreground`).

Change nothing else on the homepage: no section reordering, no copy edits, no style changes.

# SEO and structured data

Set route-level `head` metadata on `/enterprise`:

- `title`: `NexPath for Enterprise — One Prompt Standard for Every AI Coding Agent`
- `name="description"`: `NexPath reviews every prompt before your AI coding agent acts, then applies your organisation's standards for scope, verification, safety, and rollback. Works with Claude Code, Cursor, Windsurf, Replit, Lovable, and Bolt.new.`
- `property="og:title"`: `NexPath for Enterprise — Build fast. Ship with confidence.`
- `property="og:description"`: `One prompt quality standard across every AI coding agent your team already uses — centrally governed, fully auditable.`
- `property="og:url"`: `https://parseos.tech/nexpath/enterprise`
- `property="og:type"`: `website`
- `name="twitter:card"`: `summary_large_image`
- `name="twitter:site"`: `@Nexpatha`
- `links`: canonical `https://parseos.tech/nexpath/enterprise`

**JSON-LD**, two blocks in `head.scripts`:

1. `SoftwareApplication` — reuse the homepage's `softwareSchema` shape, with `name: "NexPath CLI for Enterprise"`, `applicationCategory: "DeveloperApplication"`, `audience: { "@type": "BusinessAudience", "name": "Enterprise engineering teams" }`, `description` matching the meta description, `url` set to the enterprise canonical, and `softwareVersion` `{{PLACEHOLDER: current enterprise version}}`.
2. `FAQPage` — generated from the same eight FAQ entries in `enterprise.data.ts`, so the markup and the visible accordion can never drift apart. Build it from the data, not from a hand-written copy.

# Accessibility

- Every interactive element is a real `button` or `a`; no clickable `div`s.
- The FAQ uses `aria-expanded` on the trigger and `aria-controls` pointing at the panel id.
- The mobile nav toggle uses `aria-label` and `aria-expanded`.
- Icon-only controls (copy, theme, social, menu) all carry `aria-label`.
- The stat band, plan cards, and use-case grid are semantic lists or `article` elements, not nested `div`s.
- All placeholder text is inside real form labels with `htmlFor` matching `id`.
- Decorative hatch and grid backgrounds are `aria-hidden`.
- Heading order is sequential: one `h1` per page, `h2` per section, `h3` inside cards.

# Verification

- `npm run build` completes with no errors and no new TypeScript errors.
- `npm run lint` reports nothing new.
- The router registers `/enterprise` — confirm the generated `routeTree.gen.ts` includes it and do not hand-edit that file.
- Check the page at 375px, 768px, 1280px, and 1536px. No horizontal overflow, no clipped dropdowns, no overlapping cards.
- Toggle light and dark mode on every section, including the hero, the security band, the API panel, the CTA band, and the footer.
- Confirm every internal anchor (`#solutions`, `#services`, `#security`, `#use-cases`, `#plans`, `#api`, `#contact`) resolves to an existing element id on the page.
- Confirm the homepage still renders, still navigates, and the new `Enterprise` link reaches `/enterprise`.
- Confirm the copy button in the API section copies the snippet and shows the check state.
- Confirm the FAQ accordion opens, closes, and reports correct `aria-expanded`.
- Search the final file set for `{{PLACEHOLDER` and list every remaining token. Every one of them is intentional and must be listed in the summary so it can be filled before launch.
- Confirm the FAQ JSON-LD matches the visible FAQ entries exactly.
