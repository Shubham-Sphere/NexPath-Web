# NexPath Enterprise Page — Brief & Requirements Record

**Status:** Ready to build
**Created:** 2026-10-22
**Replaces:** `GIT-PUSH-FIX.md` (renamed; original push notes preserved in Appendix A)
**Master build prompt:** [`Input/Curent NexPath website/.lovable/plan/nexpath-enterprise-page-2026-10-22.md`](Input/Curent%20NexPath%20website/.lovable/plan/nexpath-enterprise-page-2026-10-22.md)

---

## 1. What this document is

This is the requirements record for the new `/enterprise` page on the NexPath website. It captures the full question-and-answer session that produced the specification, plus the decisions that were made on the user's behalf where the answer was "you choose".

The **deliverable** is the master build prompt in the `.lovable/plan/` folder. That file is the thing to hand to Lovable. This file is the reasoning behind it — read it before making changes to the master prompt.

### Reading order

1. This file — what was asked, what was answered, what was decided.
2. The master build prompt — the executable specification.
3. Appendix A — the original `GIT-PUSH-FIX.md` content, kept for reference.

---

## 2. The two reference sites

The user set the governing rule during the Q&A session, and repeated it in every subsequent answer:

> "all the widgets and content structure part follows https://hydrahost.com/ and features/services follows https://salad.com/"

**This means:**

| Reference | What is taken from it | What is NOT taken |
| --- | --- | --- |
| **hydrahost.com** | Widget layout, section order, section choreography, visual composition, card anatomy, list treatments, footer structure, the shape of each section | Copy, images, logos, colours, code, brand names |
| **salad.com** | Feature and service framing, product-card anatomy, use-case taxonomy, "why us" competency structure, deployment-model split, benchmark-card pattern, FAQ tone, customer-story structure | Copy, images, logos, colours, code, brand names |

**All copy on the page is original NexPath copy.** Neither site's sentences are reused. The user was explicit on this: *"not copy but all the widgets and content structure part follows hydrahost.com and features/services follows salad.com"*.

### 2.1 hydrahost.com — widget inventory

| # | hydrahost widget | Composition |
| --- | --- | --- |
| 1 | Header | Logo, nav cluster, right-side action, data-centre secondary link |
| 2 | Hero | Headline + paragraph, dark full-bleed visual, OEM logo strip immediately below |
| 3 | Solutions benefit cards | 3 cards, icon tile, headline, sentence, section CTA |
| 4 | Numbered platform solutions | 4 blocks, `01`–`04`, eyebrow, two-line title, description, visual |
| 5 | Confidential Metal (security) | Bold two-line title, paragraph, 4 labelled sub-features with visuals, badge row |
| 6 | Features | 2-column: heading + CTA left, 8-item arrow list right |
| 7 | Platform steps | 4-step numbered rail + supporting platform visual |
| 8 | Unified API | 2-column: narrative left, terminal/code panel right, 4-attribute strip below |
| 9 | Inventory / pricing cards | Product cards with price range, unit, availability badge, "Explore all" |
| 10 | Closing banner | Full-bleed CTA band with a supporting visual and a link |
| 11 | Testimonial | Single attributed quote with name, title, company |
| 12 | Footer | Logo block left, 4 link columns, bottom bar with addresses, copyright, version |

### 2.2 salad.com — feature and service inventory

| # | salad feature/service | Composition |
| --- | --- | --- |
| 1 | Product cluster | 4 product cards, each with a label, title, description, keyword tags, learn-more link |
| 2 | Use cases by workload | Grouped workload taxonomy, each with a one-line benefit |
| 3 | "Why Salad" | 4 competency cards, each a bold lead-in plus a paragraph |
| 4 | "Where it runs" | Two-column deployment split: managed vs private |
| 5 | "Optimized per workload" | Benchmark cards per modality, each figure linked to methodology |
| 6 | Customer stories | Quote, person, title, company, case-study link |
| 7 | FAQ | "Straight answers" accordion |
| 8 | Dual CTA band | Self-serve primary + sales secondary |
| 9 | Enterprise nav item | "Enterprise Support" as a first-class product in the nav |
| 10 | Trust signals | SOC 2 Type I badge, Trust Center link in the footer |

---

## 3. Question and answer record

All 21 questions asked, with the user's answer and, where applicable, the decision that was made on the user's behalf.

### Q1 — Who is the primary enterprise buyer?

**Answer:** *"Here You know how our tool is work then all are our target who can use our tool"*

**Interpretation:** The audience is *everyone who uses the tool* — not a narrow persona. The page must speak to the full spectrum: an individual developer reading it, a team lead, and a buyer signing a contract, all in one scroll. This is why the page is built as a progression: it opens with the individual developer benefit, climbs to team value, and lands on procurement-grade substance.

**Decision applied:** No single persona is named in the copy. Instead the page walks the ladder — developer → team → organisation → procurement. Section ordering was designed to make that descent explicit.

---

### Q2 — What is the core enterprise value proposition?

**Answer:** *"You choose"*

**Decision applied:** *"One prompt quality standard across every AI coding agent your team already uses — centrally governed, fully auditable."*

**Why:** The three candidates were org-wide standards, private/self-hosted deployment, and auditability. Standards was the strongest because it is the only one that is true of the product as it exists today, it maps to the hero stat band (4 stats, all defensible), and it is the only one that creates a reason to keep paying. Private deployment and auditability are demoted to supporting cards in the Services grid and the Security section respectively, so they still sell, but they are not the lead.

---

### Q3 — Which deployment options should the page present?

**Answer:** *"Managed SaaS (multi-tenant)"*

**Decision applied:** Two deployment surfaces are shown, and only two:

- **Managed Review Service** (Card 1 of the Services grid) — the managed multi-tenant offer.
- **Private Deployment** (Card 3 of the Services grid) — stated as available, routed through sales.

The Page was not given a dedicated "Where it runs" split section. Instead the deployment choice is carried inside the Services grid, where it reads as one of four purchasable services rather than a fork in the product.

**Note for the record:** The Q&A round 1 answer was "Managed SaaS only". Round 2 asked how to handle the other models; the answer was the standing rule about hydrahost/salad rather than a deployment decision, so the final call was made here: include Private Deployment as a service card. It is a real option for an enterprise buyer and omitting it invites the obvious follow-up question.

---

### Q4 — How should pricing be presented?

**Answer:** *"as https://salad.com/"*

**Decision applied:** Salad-style pricing — visible tier cards, each with a price, a unit, and a feature list. Three tiers: **Team** (up to 25 developers), **Business** (up to 200 developers), **Enterprise** (unlimited, custom contract). The Business card carries a `MOST POPULAR` badge and a `border-primary` treatment. Prices are `{{PLACEHOLDER}}` tokens because no price point was supplied or is yet defensible.

**Also applied:** A strip under the cards repeating the local-first guarantee, because pricing is exactly where an enterprise buyer re-asks the data question.

---

### Q5 — What should the primary CTA be?

**Answer:** *"Not clear now"*

**Decision applied:** **Primary: `Talk to sales`** → `#contact`. Appears in the header, the hero, the Features section, every plan card, and the closing band. It is the only conversion action the page asks for.

**Secondary (also undecided by the user):** **Secondary: `Watch the demo`** → `https://youtu.be/pNejtPA5DPU` (the existing demo URL from the homepage). It is a no-friction action for the individual developer in the audience, which is why it appears in the hero next to the primary CTA rather than being buried.

**Why not "book a demo" or "read the docs":** A calendar link and a docs link are both fine, but the demo video already exists, already has a proven URL, and works for the developer half of the audience without a sales conversation. "Talk to sales" plus "Watch the demo" is the pair that serves both halves.

---

### Q6 — Which compliance/security certifications can we claim?

**Answer:** *"I don't know about it"*

**Decision applied:** **Claim nothing that cannot be backed.** The Security section is built from *product behaviour that is true today* — local-first storage, secret redaction, no repository upload, reviewable prompts, audit records — and certifications appear as **explicitly visible placeholders**:

- `SOC 2 {{PLACEHOLDER: SOC 2 status — Type I or Type II, or "in progress"}}`
- `ISO 27001 {{PLACEHOLDER: certification status}}`

A note under the badge row states plainly: *"Items marked with a placeholder are not yet confirmed. Replace them only when the corresponding documentation exists."*

**Confirmed badges** (safe to state): `Local-first`, `Secret redaction`, `Audit logs`, `SSO & SCIM`, `Encryption at rest`.

**Never invent a certification, a customer, a logo, or a metric.** This rule is enforced in the master prompt as a non-negotiable.

---

### Q7 — What customer logos / testimonials should the page use?

**Answer:** *"as https://hydrahost.com/"*

**Decision applied:** hydrahost's pattern — an **integration logo row** plus **attributed testimonials**.

- **Integration logo row** (Section 3): the real agent logos already in `src/assets/` — Claude Code, Cursor, Windsurf (Devin), Replit, Lovable, Bolt.new, VS Code. These are real, verifiable integrations, so the row is honest. It sits exactly where hydrahost puts its OEM strip, directly under the hero.
- **Customer stories** (Section 15): six dashed placeholder logo slots plus three testimonial cards with `{{PLACEHOLDER}}` quotes, names, roles, companies, and case-study URLs.

**Why the placeholders are safe:** the *structure* is hydrahost's, but nothing is claimed. The user's real customers drop into slots that already exist.

---

### Q8 — Confirm the value proposition direction

**Answer:** *"as https://salad.com/"* (the standing rule)

**Decision applied:** The hero headline and sub-copy were written to salad's opening pattern — a short, declarative, ownable claim, followed by a mechanism paragraph, followed by dual CTAs, followed immediately by a stat band. Final headline: *"One prompt quality standard for every AI coding agent your team already uses."*

---

### Q9 — How should the page handle other deployment models?

**Answer:** The standing hydrahost/salad rule.

**Decision applied:** See Q3. Handled inside the Services grid rather than a separate split section.

---

### Q10 — What should the hero stat band show?

**Answer:** The standing hydrahost/salad rule.

**Decision applied:** salad's four-number band, but populated **only with numbers that are true today**:

| Value | Label |
| --- | --- |
| `29/40` | SWE-bench Verified tasks solved (vs 27/40 without NexPath) |
| `6+` | AI coding agents supported |
| `1` | targeted model call per prompt reviewed |
| `0` | repositories uploaded or indexed |

All four are defensible from existing product facts. This is deliberately a departure from hydrahost/salad, whose bands are large scale numbers — for an enterprise audience, a band of unverifiable scale claims would do more damage than a band of four provable ones.

---

### Q11 — Should the page look like hydrahost/salad, or keep NexPath's visual system?

**Answer:** The standing hydrahost/salad rule.

**Decision applied:** **Keep NexPath's tokens.** The rule governs *widgets and content structure*; it does not override the design system. The page uses the existing `styles.css` tokens — green primary, Manrope + DM Mono, terminal surfaces, `hatch` and `page-grid` utilities, full dark-mode support. Section *composition* follows hydrahost (dark bands, bordered grids, 2-column feature splits, terminal code panels); section *content model* follows salad.

---

### Q12 — Which sections do you want on the page?

**Answer:** The standing hydrahost/salad rule.

**Decision applied:** The union of both sites' section sets, mapped onto NexPath content, in hydrahost's order with salad's content model. **18 sections**, listed in §5 below.

---

### Q13 — Where should the "Talk to sales" form submit to?

**Answer:** The standing hydrahost/salad rule.

**Decision applied:** **Placeholder endpoint + TODO.** A six-field form (full name, work email, company, team size, what are you building with, how can we help) with `action="{{PLACEHOLDER: contact form endpoint}}"`, a `// TODO: point this at the CRM or form service before publishing` comment above the form element, and a note that details are used to answer the request and are not added to a marketing list without consent. Fields and copy follow hydrahost's "Talk to Solutions Architecture" contact pattern.

---

### Q14 — Which design tokens should the page use?

**Answer:** *"Keep NexPath tokens (Recommended)"*

**Decision applied:** See Q11.

---

### Q15 — Full real copy, or marked placeholders?

**Answer:** *"not copy but all the widgets and content structure part follows https://hydrahost.com/ and features/services follows https://salad.com/"*

**Decision applied:** **Original copy, written for NexPath, with placeholders only where a fact is unknown.** Every section in the master prompt ships with finished, publishable copy. Placeholder tokens are used *only* for: prices, certification status, customer names/logos/quotes, enterprise scale metrics, and per-workflow measurement figures. The token format is fixed: `{{PLACEHOLDER: short description}}`.

---

### Q16 — How should the new page be structured in code?

**Answer:** *"Route + components/enterprise/* (Recommended)"*

**Decision applied:** `src/routes/enterprise.tsx` plus 18 files in `src/components/enterprise/`, with all copy hoisted into `enterprise.data.ts` and types into `enterprise.types.ts`. The router's generated `routeTree.gen.ts` is regenerated by the plugin, not hand-edited.

---

### Q17 — Should the homepage nav and footer also change?

**Answer:** *"Nav + homepage footer link"*

**Decision applied:** Two additive changes to `src/routes/index.tsx` and nothing else:
1. `Enterprise` added to the header `navItems`, after `Benchmark`, before `Privacy`. It must be a router `<Link to="/enterprise">`, not an `<a href>`, so it navigates client-side.
2. An `Enterprise` link added to the homepage footer, in the terminal-footer colour treatment.

No section reordering, no copy edits, no style changes on the homepage.

---

### Q18 — Where should the "Talk to sales" form submit to? (repeated)

**Answer:** *"Placeholder endpoint + TODO (Recommended)"*

**Decision applied:** See Q13.

---

## 4. Decisions taken on the user's behalf

Consolidated list of every judgement call, so they can be overridden individually.

| # | Decision | Rationale |
| --- | --- | --- |
| D1 | Lead with org-wide prompt standards | Only value prop fully true today; creates renewal logic |
| D2 | Deployment shown inside the Services grid, not a separate section | Avoids a fork; reads as a purchasable service |
| D3 | Private Deployment included as a service card | Omitting it invites the obvious follow-up |
| D4 | Primary CTA `Talk to sales`, secondary `Watch the demo` | Serves both halves of the audience; demo URL already exists |
| D5 | No unverified certifications | User could not confirm any; claiming one is a liability |
| D6 | Real integration logos, placeholder customer logos | Integrations are true today; customers are not |
| D7 | Stat band uses 4 provable numbers, not scale claims | Enterprise audiences check numbers |
| D8 | Keep NexPath design tokens | Site-wide consistency beats per-page novelty |
| D9 | 18 sections, union of both reference sites | Satisfies both references in one page |
| D10 | All copy hoisted to `enterprise.data.ts` | JSON-LD and visible FAQ can never drift |
| D11 | Homepage changes limited to nav + footer link | Additive, reversible, low risk |
| D12 | Placeholder token format `{{PLACEHOLDER: ...}}` | Greppable; every unresolved item is findable |
| D13 | No new dependencies | `lucide-react` + existing `Button` + `cn` cover everything |
| D14 | Enterprise footer is page-local | Avoids coupling the homepage to a second footer shape |

---

## 5. Section map

| # | Section | Widget source | Content source |
| --- | --- | --- | --- |
| S1 | Enterprise header | hydrahost header | — |
| S2 | Hero | hydrahost hero + salad hero | — |
| S3 | Integration trust strip | hydrahost OEM strip | — |
| S4 | Stat band | salad stat row | — |
| S5 | Value pillars (3) | hydrahost benefit cards | salad "Why" competencies |
| S6 | Agent surfaces (4) | hydrahost numbered solutions | salad deployment options |
| S7 | Services grid (4) | salad product cards | salad enterprise support |
| S8 | Use cases (10) | — | salad use cases by workload |
| S9 | Security and trust | hydrahost Confidential Metal | salad trust centre |
| S10 | Enterprise features (8) | hydrahost arrow list | — |
| S11 | Rollout steps (4) | hydrahost step rail | — |
| S12 | Prompt API | hydrahost unified API | salad API surface |
| S13 | Workflow metrics (5) | — | salad "optimized per workload" |
| S14 | Pricing plans (3) | salad pricing + hydrahost inventory | — |
| S15 | Customer stories | hydrahost testimonial | salad customer stories |
| S16 | FAQ (8) | — | salad FAQ |
| S17 | Closing CTA + contact form | hydrahost closing banner | salad dual CTA |
| S18 | Enterprise footer | hydrahost footer | salad footer columns |

---

## 6. Facts used on the page

Every claim traces to a fact already established in the product or on the existing homepage. Nothing new was invented.

| Fact | Value | Source |
| --- | --- | --- |
| Agents supported | Claude Code, Cursor, Windsurf (Devin), Replit, Lovable, Bolt.new, VS Code | Existing homepage `toolGroups` |
| Benchmark | 29/40 vs 27/40 on SWE-bench Verified, 40 tasks, same model and setup | Existing homepage `#benchmark` |
| Storage | Prompts, session state, settings in `~/.nexpath/`; repo never uploaded, codebase never indexed | Existing homepage FAQ + privacy section |
| Redaction | API keys, tokens, PEM blocks stripped before storage | Existing homepage privacy section |
| Model calls | One targeted call to review a single prompt | Existing homepage FAQ |
| Licence | Apache 2.0 | Existing homepage |
| Version | 0.1.5 (product); enterprise version is a placeholder | Existing homepage schema |
| Repo | `https://github.com/hi0001234d/nexpath` | Existing homepage |
| Demo | `https://youtu.be/pNejtPA5DPU` | Existing homepage |
| Install | `npm install -g nexpath-cli` / `nexpath install` | Existing homepage |
| Company | ParseOS | Existing homepage schema |
| Socials | GitHub, Discord, X, LinkedIn | Existing homepage footer |
| Built during | MLH AI Hackfest 2026 | Existing homepage footer |
| Canonical base | `https://parseos.tech/nexpath/home` | Existing homepage |

---

## 7. Open items to resolve before launch

Tracked in the master prompt as `{{PLACEHOLDER}}` tokens. Grep for `{{PLACEHOLDER` in the final page source.

| Area | Item |
| --- | --- |
| Pricing | Team, Business, and Enterprise price points |
| Compliance | SOC 2 status, ISO 27001 status |
| Customers | 6 logos, 3 quotes, 3 names, 3 role/company lines, 3 case-study URLs |
| Metrics | Per-workflow measurement figures + n/model/date-range notes |
| Scale | Number of organisations on the enterprise plan |
| Platform | Enterprise software version, documentation URL, API base URL |
| Commercial | Contact form endpoint, legal page URLs, status/changelog URLs |
| Socials | None — Discord (`https://discord.gg/Xg5aRWG5c`), X (`https://x.com/Nex_path`), and LinkedIn (`https://www.linkedin.com/showcase/nex-path/`) are known and reused from the homepage |

---

## 8. How to run the build

1. Open the Lovable project connected to this repo.
2. Paste the contents of `Input/Curent NexPath website/.lovable/plan/nexpath-enterprise-page-2026-10-22.md` as the prompt, or point Lovable at the plan file directly.
3. Lovable writes `src/routes/enterprise.tsx` and `src/components/enterprise/*`.
4. Review against §5 (section map) and §7 (open items).
5. Grep the result for `{{PLACEHOLDER` — every hit must be one of the items in §7.
6. **Do not force-push, rebase, amend, or squash.** The branch is connected to Lovable and rewriting published history breaks the sync. Keep the branch in a working state.

---

## Appendix A — Original `GIT-PUSH-FIX.md` content

Retained for reference. This section is unchanged from the file this document replaced.

**Goal:** push this repo to the **Shubham-Sphere** account, with **no CLI login** and **no logout** of anything.
**State:** ✅ **DONE.** The SSH key is registered and `main` is pushed.
**Last updated:** 2026-10-22

### A.1 The one action you needed to take — ✅ completed

Signed in to GitHub as **Shubham-Sphere**, open
<https://github.com/settings/ssh/new> and add this SSH key:

| Field | Value |
|---|---|
| Title | `NexPath-Web - jemi` |
| Key | `ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIMrhcqkct11ETsD+py2/S1T/MKbnj7rNrKKU34Xy9HJ6 shubham@emptyops.com` |

Paste the key as a single line, including the `ssh-ed25519` prefix and the `shubham@emptyops.com` suffix. Click **Add SSH key**.

No token, no `gh auth login`, no `gh auth logout`.

### A.2 Then run these two commands — ✅ both done

```bash
cd "/home/jemi/Desktop/NexPath web"
ssh -T git@github-shubham        # -> Hi Shubham-Sphere! You've successfully authenticated, ...
git push -u origin main          # -> * [new branch]      main -> main
```

`ssh -T` exits with code **1 even on success** — GitHub refuses shell access by design, so the greeting is the real signal, not the exit code.

Result: `main` now tracks `origin/main` at `a40fca1`.
Repo: <https://github.com/Shubham-Sphere/NexPath-Web>

### A.3 Why this is the route

Your machine already had everything needed — except one fact that GitHub was missing: **that the key `~/.ssh/id_ed25519_shubham` belongs to Shubham-Sphere.** Registering the public key makes that true. No credential, no session, no login state is involved.

| Account | Role here |
|---|---|
| `bhavnesh75` | **Not your account — excluded.** Its `gh` session and its SSH key were left exactly as they were. Nothing was logged out, nothing was switched, nothing was pushed to it. |
| `Shubham-Sphere` | Owns the target repo. Gets a **new, dedicated key** (`id_ed25519_shubham`) so the two accounts never interfere. |

**Routes that were tested and rejected**

| Route | Result | Why it fails |
|---|---|---|
| Push with the old `git@github.com:` remote | `Permission to Shubham-Sphere/NexPath-Web.git denied to bhavnesh75.` | That key authenticates as `bhavnesh75`, which only has **READ** on the repo. |
| `ssh -i ~/.ssh/id_ed25519_shubham -T git@github.com` | `Permission denied (publickey)` | That key was registered on **no** account yet. **Step 1 fixes exactly this.** |
| Push with the captured `ghu_uagy…` token | `403 Permission denied` | That token is a **GitHub App user token**: it shows ADMIN *viewer* permission, but it has no `Contents: write` permission, and it expires in about an hour. |
| Fork `Shubham-Sphere/NexPath-Web` and push to the fork | `Empty repositories cannot be forked` | The upstream repo has zero commits, so GitHub refuses to fork it. |
| `gh auth login --with-token` with a PAT | Works, but it **is** a login | It would add an account rather than log one out, but it needs a PAT minted in the browser. An SSH key does the same job with no token at all. |
| `gh auth logout` / `gh auth switch` | Not needed | Nothing was logged out, so there is nothing to undo. |

**Device-code logins that were cancelled**

Two GitHub device-code requests were waiting for approval from an earlier attempt (`4476-E096` and `4DC1-E321`). Both were **cancelled** — no login was completed and no session was created. The `gh` session for `bhavnesh75` is still active and unmodified.

### A.4 What is already done on this machine

| Item | State |
|---|---|
| Key pair | `~/.ssh/id_ed25519_shubham` (+ `.pub`). Fingerprint `SHA256:sC/46jr4d7B7BCsvDYCC0nRXc3V9/ZfYADsFeL/Lu80` |
| `~/.ssh/config` | Created. Alias `github-shubham` → `github.com`, pinned to `IdentityFile ~/.ssh/id_ed25519_shubham`, `IdentitiesOnly yes` |
| Plain `github.com` | Still resolves to `~/.ssh/id_ed25519` → `bhavnesh75`. Unchanged. |
| Repo remote | `origin → git@github-shubham:Shubham-Sphere/NexPath-Web.git` |
| Commits | `a40fca1`, `33fae1a`, `653d4bb`, `c8bbc1c` — all pushed to `origin/main` |
| Upstream | `Shubham-Sphere/NexPath-Web`, public, default branch `main`, `HEAD = a40fca1` |
| Secrets | `.env` is gitignored. Only `.env.example` is tracked. Nothing secret is being pushed. |
| Supermemory setup | Untouched by any of this. `.env` stays local, `~/.supermemory/` is untouched. |

Undo the remote change at any time with:

```bash
git remote set-url origin git@github.com:Shubham-Sphere/NexPath-Web.git
```

### A.5 If the push still fails

| Message | Meaning | Fix |
|---|---|---|
| `Permission denied (publickey)` on `ssh -T git@github-shubham` | The key is not on the Shubham-Sphere account (or was pasted incompletely) | Redo step 1 with the full one-line key. |
| `ssh -T` says `Hi <someone-else>!` | The key was added to a different account | Move it in Settings → SSH and GPG keys on that account, then add it to Shubham-Sphere. |
| `Permission to Shubham-Sphere/NexPath-Web.git denied` | The key maps to Shubham-Sphere but that account lacks write access | Confirm with `gh repo view Shubham-Sphere/NexPath-Web --json viewerPermission` (want `WRITE` or `ADMIN`). |
| `remote: Permission denied` on push only | The branch is protected | Push a different branch or open a PR: `git push -u origin HEAD:push-nexpath-web`. |

### A.6 Reference commands (all read-only, safe to run any time)

```bash
gh auth status                                  # bhavnesh75 — still active, nothing logged out
gh repo view Shubham-Sphere/NexPath-Web --json viewerPermission,isPrivate
gh repo list bhavnesh75
ssh -T git@github.com                           # -> Hi bhavnesh75!  (default key, unchanged)
ssh -T git@github-shubham                       # -> Hi Shubham-Sphere!  (after step 1)
ssh-keygen -lf ~/.ssh/id_ed25519_shubham.pub
git remote -v
git log --oneline
```

### A.7 Safety notes

- `~/.ssh/id_ed25519_shubham` is the **private** key — never share it, never paste it into GitHub. Only the `.pub` file goes into the web form.
- The public key is safe to paste anywhere.
- Nothing in this document involves a Supermemory credential; the two setups are independent.
