import type { EnterpriseData } from "./enterprise.types";

export const enterpriseData: EnterpriseData = {
  navItems: [
    { label: "Solutions", href: "#solutions" },
    { label: "Services", href: "#services" },
    { label: "Security", href: "#security" },
    { label: "Use cases", href: "#use-cases" },
    { label: "Plans", href: "#plans" },
    { label: "Docs", href: "{{PLACEHOLDER: documentation URL}}" },
  ],

  hero: {
    eyebrow: "NEXPATH FOR ENTERPRISE",
    headline: "One prompt quality standard for every AI coding agent your team already uses.",
    sub: "NexPath reviews a prompt before your agent acts on it, then applies your organisation's standards — scope, acceptance criteria, safety constraints, and rollback steps. Developers keep the agents they love. You keep one definition of what good looks like.",
    primaryLabel: "Talk to sales",
    primaryHref: "#contact",
    secondaryLabel: "Watch the demo",
    secondaryHref: "https://youtu.be/pNejtPA5DPU",
    trustChips: ["Local-first by default", "Apache 2.0", "Works with 6+ agents"],
  },

  statBand: [
    {
      value: "29/40",
      label: "SWE-bench Verified tasks solved",
      note: "vs 27/40 without NexPath",
      primary: true,
    },
    { value: "6+", label: "AI coding agents supported", note: "CLI, VS Code, and browser" },
    {
      value: "1",
      label: "targeted model call per prompt",
      note: "Reviewed once, before the agent acts",
    },
    {
      value: "0",
      label: "repositories uploaded or indexed",
      note: "Prompts and state stay on the device",
    },
  ],

  valuePillars: {
    eyebrow: "WHY ENTERPRISE",
    title: "Consistency, reviewability, and guardrails your developers keep.",
    description:
      "The same prompt-quality layer that improves one developer's work becomes a standard your whole organisation can rely on.",
    seeMoreLabel: "See how it works →",
    seeMoreHref: "/#workflow",
    pillars: [
      {
        title: "One standard, not seven",
        body: 'Every team writes prompts differently. NexPath applies your organisation\'s rules the same way in the terminal, the editor, and the browser — so "good" means one thing across the company.',
      },
      {
        title: "Less time in review",
        body: "Scoped briefs, explicit acceptance criteria, and named checks arrive with the prompt. Developers stop guessing what was meant, and reviewers stop re-explaining it.",
      },
      {
        title: "Guardrails that travel",
        body: "Safety, verification, and rollback steps ride along with the request. Your agent inherits your standards instead of inventing its own.",
      },
    ],
  },

  agentSurfaces: [
    {
      number: "01",
      eyebrow: "TERMINAL",
      title: "Claude Code",
      description:
        "The NexPath CLI reviews each prompt at the line before the agent writes a line of code. Accept, edit, or reject — then continue.",
    },
    {
      number: "02",
      eyebrow: "EDITOR",
      title: "Cursor, Windsurf",
      description:
        "The VS Code extension applies the same standard inside the editor your team already lives in. Works across VS Code forks.",
    },
    {
      number: "03",
      eyebrow: "BROWSER",
      title: "Replit, Lovable, Bolt.new",
      description:
        "The browser extension brings organisation standards to the builders shipping your web app, without a second workflow.",
    },
    {
      number: "04",
      eyebrow: "PLATFORM",
      title: "Prompt API",
      description:
        "Route prompts from your own tools, CI, or agent orchestration through one governed endpoint.",
    },
  ],

  services: [
    {
      eyebrow: "MANAGED",
      title: "Managed Review Service",
      body: "The review engine, delivered as a managed service. Every prompt is enhanced and checked against your standard before it reaches your agent — no infrastructure to run, no plugins to maintain.",
      tags: [{ label: "managed" }, { label: "no infra" }, { label: "any agent" }],
      linkLabel: "Talk to sales →",
      linkHref: "#contact",
    },
    {
      eyebrow: "GOVERNANCE",
      title: "Organisation Policy Engine",
      body: "Define scope templates, required verification, safety rules, and rollback steps once. NexPath applies them consistently per repo, per team, and per agent, and keeps every version immutable.",
      tags: [{ label: "versioned" }, { label: "per repo" }, { label: "immutable" }],
      linkLabel: "Talk to sales →",
      linkHref: "#contact",
    },
    {
      eyebrow: "YOUR NETWORK",
      title: "Private Deployment",
      body: "Run the review engine inside your own network boundary. Prompts, policies, and logs stay in your environment, and your own review service holds the records.",
      tags: [{ label: "vpc" }, { label: "air-gap ready" }, { label: "your logs" }],
      linkLabel: "Talk to sales →",
      linkHref: "#contact",
    },
    {
      eyebrow: "SUPPORT",
      title: "Enterprise Support",
      body: "Security review, procurement documentation, onboarding, and a named team for large deployments — with SLAs on the paths your team depends on.",
      tags: [{ label: "security review" }, { label: "procurement" }, { label: "SLA" }],
      linkLabel: "Talk to sales →",
      linkHref: "#contact",
    },
  ],

  useCases: [
    {
      title: "Feature implementation",
      body: "Scope, non-goals, and acceptance criteria before a line is written.",
    },
    {
      title: "Bug fixing",
      body: "Reproduction steps and a verification path the agent must follow.",
    },
    { title: "Hotfixes", body: "Minimal-change rules and a named rollback for production fixes." },
    {
      title: "Refactoring",
      body: "Boundaries and invariants stated, so the agent cannot quietly rewrite more than it was asked to.",
    },
    {
      title: "Test generation",
      body: "Explicit pass conditions so generated tests are checkable, not decorative.",
    },
    {
      title: "API & integrations",
      body: "Contract details, error handling, and compatibility rules included up front.",
    },
    {
      title: "Infrastructure",
      body: "Environment, cost, and blast-radius constraints stated before anything is provisioned.",
    },
    {
      title: "Documentation",
      body: "Audience, scope, and accuracy rules so docs match the code that ships.",
    },
    {
      title: "Code review",
      body: "The review criteria the author and the reviewer are both working from.",
    },
    {
      title: "Legacy migration",
      body: "Inventory, ordering, and stop conditions for work nobody can review by eye.",
    },
  ],

  security: {
    eyebrow: "ZERO-TRUST PROMPT HANDLING",
    headline: "Your prompts are not a telemetry source.",
    paragraph:
      "NexPath was designed local-first. The review happens where the work happens, and the organisation layer adds governance without taking control of your code away.",
    subFeatures: [
      {
        title: "Local by default",
        body: "Prompts, session state, and settings live in ~/.nexpath/ on the developer's machine. Your repository is never uploaded and your codebase is never indexed.",
      },
      {
        title: "Secret redaction",
        body: "API keys, tokens, and PEM blocks are stripped before a prompt is stored, so nothing sensitive reaches history or logs.",
      },
      {
        title: "Reviewable by design",
        body: "Every enhanced prompt is a document a person can read, diff, and approve. Nothing is applied silently, at any layer.",
      },
      {
        title: "Auditable",
        body: "Centralised, exportable records of every review, policy decision, and approval — ready for your security review and compliance evidence.",
      },
    ],
    badges: [
      { label: "Local-first" },
      { label: "Secret redaction" },
      { label: "Audit logs" },
      { label: "SSO & SCIM" },
      {
        label: 'SOC 2 {{PLACEHOLDER: SOC 2 status — Type I or Type II, or "in progress"}}',
        placeholder: "SOC 2 status",
      },
      { label: "ISO 27001 {{PLACEHOLDER: certification status}}", placeholder: "ISO 27001 status" },
      { label: "Encryption at rest" },
    ],
    note: "Items marked with a placeholder are not yet confirmed. Replace them only when the corresponding documentation exists.",
  },

  enterpriseFeatures: {
    eyebrow: "FEATURES",
    headline: "The organisation layer, end to end.",
    paragraph:
      "Everything below runs on the same engine your developers already use. Nothing here requires them to change tools.",
    ctaLabel: "Talk to sales",
    ctaHref: "#contact",
    features: [
      {
        title: "Organisation Prompt Standards",
        body: "Publish one set of scope, acceptance, safety, and rollback rules. Every team inherits them automatically, in every agent.",
      },
      {
        title: "Works with every agent",
        body: "One policy model across Claude Code, Cursor, Windsurf, Replit, Lovable, and Bolt.new. Switching tools never resets your standards.",
      },
      {
        title: "No repository upload",
        body: "Your codebase is never uploaded and never indexed. The review reads the prompt and session context, nothing more.",
      },
      {
        title: "Automatic secret redaction",
        body: "API keys, tokens, and PEM blocks are stripped before a prompt is stored or logged.",
      },
      {
        title: "Full audit trail",
        body: "Every review, policy decision, and approval is recorded and exportable for your security and compliance evidence.",
      },
      {
        title: "SSO, SCIM & role controls",
        body: "Bring your identity provider. Map roles to policies so each team only gets the standards it should have.",
      },
      {
        title: "Policy-as-code API",
        body: "Define, version, and roll out policy sets programmatically. Roll back a rule without touching the prompt path.",
      },
      {
        title: "Dedicated support & SLAs",
        body: "A named team for large deployments, with response targets on the paths your delivery depends on.",
      },
    ],
  },

  rollout: {
    eyebrow: "ROLLOUT",
    title: "Live in a sprint, not a quarter.",
    description: "Four steps from decision to a standard every developer inherits.",
    steps: [
      {
        number: "01",
        label: "Connect",
        description:
          "Point your agents at NexPath: the CLI, the VS Code extension, or the browser extension. No new IDE, no rewrite.",
      },
      {
        number: "02",
        label: "Govern",
        description:
          "Set your standard once. Scope templates, required checks, and acceptance rules apply to every prompt your teams send.",
      },
      {
        number: "03",
        label: "Roll out",
        description:
          "Ship it through the channel you already use — package manager, internal registry, or the Prompt API behind your own tooling.",
      },
      {
        number: "04",
        label: "Measure",
        description:
          "See where prompts get accepted, revised, or rejected, and tune the standard with evidence instead of opinion.",
      },
    ],
    quotes: [
      {
        quote:
          "The hard part of a prompt standard was never writing it. It was making sure it applied to the tool a developer happened to open that morning.",
        attribution: "{{PLACEHOLDER: role, e.g. VP Engineering}}",
        subLine: "{{PLACEHOLDER: company}}",
      },
      {
        quote:
          "We wanted standards we could audit, not standards that lived in a slide deck. NexPath gave us something we could log, review, and change.",
        attribution: "{{PLACEHOLDER: role, e.g. Head of Platform}}",
        subLine: "{{PLACEHOLDER: company}}",
      },
    ],
    nextStepTitle: "Bring your security team in early",
    nextStepBody:
      "A security review happens before rollout. We provide a security pack, procurement documentation, and support for vendor security questionnaires.",
    nextStepLink: "Request the security pack →",
    nextStepHref: "#contact",
  },

  promptApi: {
    eyebrow: "API",
    headline: "One endpoint for every agent.",
    paragraph1:
      "Route prompts through your own tooling, your CI, or an internal platform. The policy runs server-side, so a developer cannot opt out by switching to a different editor.",
    paragraph2:
      "Build directly against the Prompt API, or drop it into an existing orchestration layer. One integration covers every surface.",
    strip: [
      {
        eyebrow: "UNIFIED",
        title: "One contract",
        body: "A single endpoint for every agent, editor, and internal tool.",
      },
      {
        eyebrow: "POLICY-DRIVEN",
        title: "Standards server-side",
        body: "Rules apply at the API, so switching tools does not skip them.",
      },
      {
        eyebrow: "VERSIONED",
        title: "Immutable policy sets",
        body: "Every policy version is immutable and roll-backable.",
      },
      {
        eyebrow: "AVAILABLE NOW",
        title: "REST over HTTPS",
        body: "Swap the base URL and you control where the review runs.",
      },
    ],
  },

  workflowMetrics: {
    eyebrow: "MEASURED",
    title: "Published numbers, not promises.",
    description:
      "Every figure below links to the method behind it. Placeholder figures stay marked until the study exists.",
    cards: [
      {
        modality: "SWE-bench Verified",
        headline: "29/40",
        body: "Same 40 tasks, same model, same setup. NexPath improved the prompt before execution.",
        linkLabel: "Read the benchmark report →",
        linkHref: "https://github.com/hi0001234d/nexpath/tree/main/Nexpath_benchmark",
      },
      {
        modality: "Feature implementation",
        headline: "{{PLACEHOLDER: first-pass acceptance rate on scoped feature prompts}}",
        body: "{{PLACEHOLDER: n, model, and date range of the measurement}}",
        linkLabel: "Read the methodology →",
        linkHref: "{{PLACEHOLDER: methodology URL}}",
      },
      {
        modality: "Refactoring",
        headline: "{{PLACEHOLDER: share of refactor prompts accepted without a scope correction}}",
        body: "{{PLACEHOLDER: n, model, and date range of the measurement}}",
        linkLabel: "Read the methodology →",
        linkHref: "{{PLACEHOLDER: methodology URL}}",
      },
      {
        modality: "Security-sensitive changes",
        headline:
          "{{PLACEHOLDER: share of flagged changes that carried an explicit rollback step}}",
        body: "{{PLACEHOLDER: n, model, and date range of the measurement}}",
        linkLabel: "Read the methodology →",
        linkHref: "{{PLACEHOLDER: methodology URL}}",
      },
      {
        modality: "Test generation",
        headline: "{{PLACEHOLDER: share of test prompts that carried explicit pass conditions}}",
        body: "{{PLACEHOLDER: n, model, and date range of the measurement}}",
        linkLabel: "Read the methodology →",
        linkHref: "{{PLACEHOLDER: methodology URL}}",
      },
    ],
    note: "Figures marked with a placeholder are not yet published. They stay visibly unresolved until a methodology write-up exists.",
  },

  pricing: {
    eyebrow: "PLANS",
    title: "Priced per developer, not per prompt.",
    description:
      "Every plan is local-first and runs against the agents your team already uses. No plan uploads your repository or indexes your codebase.",
    strip:
      "Need a private deployment, a custom policy pack, or a procurement pack? The enterprise plan is built around them.",
    plans: [
      {
        name: "Team",
        seats: "Up to 25 developers",
        price: "{{PLACEHOLDER: Team price per developer per month}}",
        unit: "per developer / month",
        features: [
          "Organisation prompt standards",
          "All agent integrations (CLI, VS Code, browser)",
          "Shared policy library",
          "Email support",
          "30-day audit history",
        ],
        ctaLabel: "Talk to sales",
        ctaHref: "#contact",
      },
      {
        name: "Business",
        seats: "Up to 200 developers",
        price: "{{PLACEHOLDER: Business price per developer per month}}",
        unit: "per developer / month",
        badge: "MOST POPULAR",
        features: [
          "Everything in Team",
          "SSO, SCIM & role-based access",
          "Policy-as-code API",
          "1-year audit retention",
          "Priority support",
        ],
        ctaLabel: "Talk to sales",
        ctaHref: "#contact",
      },
      {
        name: "Enterprise",
        seats: "Unlimited developers",
        price: "Custom",
        unit: "annual contract",
        features: [
          "Everything in Business",
          "Private deployment in your network",
          "Custom policy packs",
          "Dedicated team & SLAs",
          "Security review & procurement documentation",
          "Onboarding and rollout support",
        ],
        ctaLabel: "Talk to sales",
        ctaHref: "#contact",
      },
    ],
  },

  customerStories: {
    eyebrow: "CUSTOMERS",
    title: "Teams ship on NexPath.",
    description:
      "Placeholder entries below are marked for replacement — swap in a real logo, quote, and attribution before publishing.",
    orgCountPlaceholder: "{{PLACEHOLDER: number of organisations on the enterprise plan}}",
    logos: [
      { label: "{{PLACEHOLDER: customer logo 1}}" },
      { label: "{{PLACEHOLDER: customer logo 2}}" },
      { label: "{{PLACEHOLDER: customer logo 3}}" },
      { label: "{{PLACEHOLDER: customer logo 4}}" },
      { label: "{{PLACEHOLDER: customer logo 5}}" },
      { label: "{{PLACEHOLDER: customer logo 6}}" },
    ],
    stories: [
      {
        quote:
          "By routing every prompt through the same standard, we stopped arguing about prompt quality in code review and started shipping. The standard was the same on the first day as on the hundredth.",
        person: "{{PLACEHOLDER: customer name 1}}",
        roleLine: "{{PLACEHOLDER: role, company 1}}",
        caseStudyUrl: "{{PLACEHOLDER: case study URL 1}}",
      },
      {
        quote:
          "The rollout was not a migration. Developers kept the tools they already had, and the standard came with them. That is the only reason adoption worked.",
        person: "{{PLACEHOLDER: customer name 2}}",
        roleLine: "{{PLACEHOLDER: role, company 2}}",
        caseStudyUrl: "{{PLACEHOLDER: case study URL 2}}",
      },
      {
        quote:
          "We could answer our security team's questions because the logs existed. Review, policy decision, approval — all of it was already there.",
        person: "{{PLACEHOLDER: customer name 3}}",
        roleLine: "{{PLACEHOLDER: role, company 3}}",
        caseStudyUrl: "{{PLACEHOLDER: case study URL 3}}",
      },
    ],
  },

  faq: {
    eyebrow: "FAQ",
    title: "Straight answers.",
    description:
      "What enterprise teams ask before they put NexPath in front of a whole engineering organisation.",
    items: [
      {
        question: "How is NexPath for Enterprise different from the CLI?",
        answer:
          "The CLI is the review engine a developer runs locally. Enterprise adds the organisation layer around it: shared standards, policy versions, role-based access, centralised audit records, and a support commitment. The review itself is identical.",
      },
      {
        question: "Does NexPath send our code anywhere?",
        answer:
          "No. Prompts, session state, and settings live in ~/.nexpath/ on the developer's machine. The only outbound call is the targeted model call that reviews a single prompt. Your repository is never uploaded and your codebase is never indexed. On a private deployment, the review runs inside your own network.",
      },
      {
        question: "Can we run NexPath inside our own network?",
        answer:
          "Yes. The private deployment runs the review engine behind your own boundary, so prompts, policies, and audit records stay in your environment. Talk to us about the topology that fits you.",
      },
      {
        question: "Which agents does the enterprise plan cover?",
        answer:
          "Claude Code through the CLI, Cursor and Windsurf (Devin) through the VS Code extension, and Replit, Lovable, and Bolt.new through the browser extension. The Prompt API covers your own tools on top of that.",
      },
      {
        question: "Can we enforce our own prompt standards?",
        answer:
          "Yes. Standards are defined as policy sets, versioned, and applied server-side for API traffic and client-side for local tools. Roles decide which policy set a team inherits.",
      },
      {
        question: "What does an enterprise rollout look like?",
        answer:
          "Four steps: connect the agents your team already uses, define the standard, roll it out through the channel you already use, and measure where prompts are accepted or revised. Most teams start with one team and one repository set.",
      },
      {
        question: "Do you support security reviews and procurement?",
        answer:
          "Yes. We provide a security pack, procurement documentation, and support for vendor security questionnaires. Request it from the contact form and we will route it to the right team.",
      },
      {
        question: "How is usage priced?",
        answer:
          "Per active developer, per month, with volume bands on the Business and Enterprise plans. Audit retention, SSO, and private deployment are plan features rather than add-ons.",
      },
    ],
  },

  contact: {
    headline: "Make every prompt a brief your team can trust.",
    paragraph:
      "Tell us how your team ships with AI today. We will show you what the standard looks like on your repositories, your agents, and your rules.",
    primaryLabel: "Talk to sales",
    secondaryLabel: "Watch the demo",
    secondaryHref: "https://youtu.be/pNejtPA5DPU",
    terminalLine: "$ nexpath install --policy acme-enterprise",
    formLabel: "TALK TO SALES",
    formSub: "We reply within one business day.",
    submitLabel: "Request a conversation",
    consentNote:
      "Your details are used to answer your request. Nothing is added to a marketing list without your consent.",
    endpointPlaceholder: "{{PLACEHOLDER: contact form endpoint}}",
    fields: [
      { name: "Full name", type: "text", required: true },
      { name: "Work email", type: "email", required: true },
      { name: "Company", type: "text", required: true },
      {
        name: "Team size",
        type: "select",
        required: true,
        options: ["1–10", "11–50", "51–200", "201–1000", "1000+"],
      },
      { name: "What are you building with?", type: "text", required: false },
      { name: "How can we help?", type: "textarea", required: true },
    ],
  },

  footer: {
    logline:
      "The prompt quality layer for AI coding workflows. One standard for every agent your team already uses.",
    columns: [
      {
        heading: "Product",
        links: [
          { label: "Managed review service", href: "#services" },
          { label: "Organisation policy engine", href: "#services" },
          { label: "Private deployment", href: "#services" },
          { label: "Enterprise support", href: "#services" },
          { label: "Plans", href: "#plans" },
          { label: "Prompt API", href: "#api" },
        ],
      },
      {
        heading: "Company",
        links: [
          { label: "About", href: "{{PLACEHOLDER: about URL}}" },
          { label: "Enterprise", href: "/enterprise" },
          { label: "Blog", href: "{{PLACEHOLDER: blog URL}}" },
          { label: "Careers", href: "{{PLACEHOLDER: careers URL}}" },
          { label: "Contact sales", href: "#contact" },
        ],
      },
      {
        heading: "Resources",
        links: [
          { label: "Documentation", href: "{{PLACEHOLDER: documentation URL}}" },
          { label: "Prompt API reference", href: "{{PLACEHOLDER: API reference URL}}" },
          { label: "Security", href: "#security" },
          { label: "Status", href: "{{PLACEHOLDER: status URL}}" },
          { label: "Changelog", href: "{{PLACEHOLDER: changelog URL}}" },
        ],
      },
      {
        heading: "Legal",
        links: [
          { label: "Terms of service", href: "{{PLACEHOLDER: terms URL}}" },
          { label: "Privacy policy", href: "{{PLACEHOLDER: privacy URL}}" },
          { label: "Security compliance", href: "{{PLACEHOLDER: compliance URL}}" },
          { label: "Data processing addendum", href: "{{PLACEHOLDER: DPA URL}}" },
          { label: "Cookie settings", href: "{{PLACEHOLDER: cookie URL}}" },
        ],
      },
    ],
    copyright: "© 2026 ParseOS. All rights reserved.",
    hackfest: "NexPath CLI · Built during MLH AI Hackfest 2026",
  },
};
