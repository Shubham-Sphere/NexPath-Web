import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Clipboard,
  ExternalLink,
  Github,
  Menu,
  Moon,
  Play,
  ShieldCheck,
  Sparkles,
  SquareTerminal,
  Sun,
  X,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import boltIcon from "@/assets/bolt.new.svg";
import claudeIcon from "@/assets/claudecode-color.svg";
import cursorIcon from "@/assets/cursor.svg";
import devinIcon from "@/assets/devin.svg";
import extensionIcon from "@/assets/extension.svg";
import lovableIcon from "@/assets/lovable-color.svg";
import promptReviewScreenshot from "@/assets/nexpath-prompt-review.png.asset.json";
import replitIcon from "@/assets/replit-color.svg";
import vscodeIcon from "@/assets/vs_code.svg";

const repositoryUrl = "https://github.com/hi0001234d/nexpath";
const demoUrl = "https://youtu.be/pNejtPA5DPU";
const installCommands = ["npm install -g nexpath-cli", "nexpath install"];
const pageUrl = "https://parseos.tech/nexpath/home";



const softwareSchema = {

  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "NexPath CLI",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "macOS, Linux, Windows",
  description:
    "A local-first prompt quality layer for AI coding workflows. Nexpath reviews a prompt before the agent acts on it and adds the scope, verification, safety, and rollback checks the task needs.",
  url: pageUrl,
  softwareVersion: "0.1.5",
  license: "https://www.apache.org/licenses/LICENSE-2.0",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: "ParseOS" },
  codeRepository: repositoryUrl,
};

const faqs: Array<[string, string]> = [
  ["Is Nexpath another AI coding agent?", "No. Nexpath is a prompt-quality layer that enhances prompts for the agents you already use: Claude Code, Cursor, Windsurf (Devin), Replit, Lovable, and Bolt.new. It doesn't generate code independently or replace your agent; you keep your workflow and review all suggestions before sending."],
  ["Will Nexpath replace my current agent or workflow?", "No. Nexpath works with the agents and tools you already use; it enhances prompts, not your agent. You retain full control to inspect, edit, or discard suggestions, so your existing agent and workflow remain unchanged."],
  ["What is a prompt quality layer?", "A prompt quality layer sits between you and your AI coding agent. It reads the prompt you were about to send, identifies what the task actually requires, and returns a stronger version with the scope, acceptance criteria, safety constraints, and rollback considerations the request was missing. You review it and decide what to send."],
  ["Does Nexpath send my code anywhere?", "No. Your prompts, session state, and settings stay in ~/.nexpath/ on your machine. The only outbound call is the targeted model call that reviews a single prompt. Your repository is never uploaded and your codebase is never indexed."],
  ["Which AI coding agents does Nexpath support?", "Claude Code, Cursor, Windsurf (Devin), Replit, Lovable, and Bolt.new are fully supported and tested end to end as of v0.1.5. The CLI covers terminal work, the editor extension covers VS Code and its forks, and the browser extension covers browser-based builders."],
  ["How is this different from CLAUDE.md or Cursor rules?", "Unlike static CLAUDE.md/Cursor rules (predefined, project-wide), Nexpath is a live, user-driven instruction layer at prompt time. It reviews prompt/context, preserves intent, and adds task-specific checks (scope, acceptance, verification, safety, etc.) for higher immediate impact. It's not an AI coding agent; it enhances prompts for agents you already use; you always review and control the final prompt."],
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prompt Quality Layer for AI Coding | NexPath CLI" },
      {
        name: "description",
        content:
          "Nexpath is a local-first prompt quality layer for vibe coding. It adds scope, verification, safety, and rollback checks before AI-generated work is shipped.",
      },
      { property: "og:title", content: "NexPath CLI — Build fast. Ship with confidence." },
      {
        property: "og:description",
        content:
          "A local-first prompt quality layer for AI coding workflows. Catch missing scope, verification, safety, and rollback checks before AI-generated work becomes shipped risk.",
      },
      { property: "og:url", content: pageUrl },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Nexpatha" },
    ],
    links: [{ rel: "canonical", href: pageUrl }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(softwareSchema) },
      { type: "application/ld+json", children: JSON.stringify(faqSchema) },
    ],

  }),
  component: Index,
});

const workflow: Array<[string, string, string, "prompt" | "structured" | "checks" | "choice"]> = [
  ["01", "Understands", "Reads your prompt and session context to understand what you’re trying to accomplish without changing your intent.", "prompt"],
  ["02", "Structures", "Turns your intent into a clearer, more complete prompt with the scope and details the agent needs.", "structured"],
  ["03", "Safeguards", "Adds relevant verification, safety, and rollback checks when the task calls for them.", "checks"],
  ["04", "Controls", "You choose what to use. Accept, edit, or reject the enhanced prompt and keep your original one anytime.", "choice"],
];

const chromeStoreUrl = "https://chromewebstore.google.com/detail/nexpath/gdkknhjgflkkeajbhalkaakohpoflolc";
const firefoxStoreUrl = "https://addons.mozilla.org/en-US/firefox/addon/nexpath/";

type ToolGroup = {
  label: string;
  // Header icon and whether it is monochrome (needs inverting in dark mode).
  icon?: string;
  iconMono?: boolean;
  // [name, logo, monochrome logo that needs inverting in dark mode]
  tools: Array<[string, string, boolean]>;
  // Optional dropdown install options shown from the group title.
  install?: Array<{ label: string; href: string }>;
  // Optional in-page anchor the whole card navigates to when clicked.
  href?: string;
  // Short caption describing where the group works.
  hint: string;
};

const toolGroups: Array<ToolGroup> = [
  {
    label: "Browser extension",
    icon: extensionIcon,
    iconMono: true,
    tools: [["Replit", replitIcon, false], ["Lovable", lovableIcon, false], ["Bolt.new", boltIcon, true]],
    install: [
      { label: "Chrome Web Store", href: chromeStoreUrl },
      { label: "Firefox Add-ons", href: firefoxStoreUrl },
    ],
    hint: "Runs in the browser",
  },
  {
    label: "VS Code",
    icon: vscodeIcon,
    tools: [["Cursor", cursorIcon, true], ["Windsurf (Devin)", devinIcon, true]],
    install: [
      { label: "Open VSX", href: "https://open-vsx.org/extension/nexpath/nexpath-vscode" },
      { label: "VS Code Marketplace", href: "https://marketplace.visualstudio.com/items?itemName=nexpath.nexpath-vscode" },
    ],
    hint: "Works in VS Code forks",
  },
  {
    label: "NexPath CLI",
    tools: [["Claude Code", claudeIcon, false]],
    href: "#install",
    hint: "Runs in your terminal",
  },
];

function ThemeToggle({ className }: { className?: string }) {

  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("nexpath-theme");
    const isDark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("nexpath-theme", next ? "dark" : "light");
  }

  return (
    <Button variant="ghost" size="icon" className={className} onClick={toggleTheme} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}>
      {dark ? <Sun /> : <Moon />}
    </Button>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copyInstallCommands() {
    if (!navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(installCommands.join("\n"));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch { /* clipboard unavailable */ }
  }

  const navItems = [

    ["How it works", "#workflow"],
    ["Benchmark", "#benchmark"],
    ["Privacy", "#privacy"],
  ];


  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#top" className="flex items-center gap-2" aria-label="Nexpath home">
            <span className="font-extrabold">Nexpath</span>
            <span className="hidden rounded-sm border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline">CLI</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground lg:flex" aria-label="Main navigation">
            {navItems.map(([label, href]) => <a key={href} className="transition-colors hover:text-foreground" href={href}>{label}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="hero" size="sm" className="hidden sm:inline-flex" asChild>
              <a href="#tools">Get Started <ArrowRight className="size-4" /></a>
            </Button>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
              {menuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        {menuOpen && (
          <nav className="border-t bg-background px-5 py-4 lg:hidden" aria-label="Mobile navigation">
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              {navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-3 text-sm font-semibold hover:bg-muted">{label}</a>)}
              <a href="#tools" onClick={() => setMenuOpen(false)} className="mt-2 rounded-md bg-primary px-3 py-3 text-center text-sm font-semibold text-primary-foreground">Get Started <ArrowRight className="inline size-4" /></a>
            </div>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="page-grid relative border-b">
          <div className="absolute inset-0 bg-background/75" />
          <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col px-5 py-16 lg:px-8 lg:py-20">
          <div className="grid flex-1 items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
            <div>
              <div className="inline-flex items-center gap-2 border border-primary/25 bg-success-soft px-3 py-1.5 font-mono text-xs font-medium text-accent-foreground">
                <Sparkles className="size-3.5" /> Prompt quality layer for AI coding workflows
              </div>
              <h1 className="mt-6 max-w-[12ch] text-balance text-5xl font-extrabold leading-[1.02] sm:text-6xl lg:text-7xl">Build fast. Ship with confidence.</h1>
              <p className="mt-6 max-w-xl text-balance text-lg leading-8 text-muted-foreground">
                NexPath refines your prompt before your AI agent acts, so the work starts from a clear brief. You choose what gets sent.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button variant="hero" size="xl" asChild><a href="#tools">Get Started <ArrowRight /></a></Button>

                <Button variant="outline" size="xl" asChild><a href={demoUrl} target="_blank" rel="noopener noreferrer"><Play /> Watch demo</a></Button>
              </div>
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-muted-foreground">
                {["Enhanced or original, your choice", "Apache 2.0", "Works with your coding agent"].map((item) => <span key={item} className="flex items-center gap-1.5"><Check className="size-3.5 text-primary" /> {item}</span>)}
              </div>
            </div>

            <figure className="relative overflow-hidden rounded-lg border border-terminal-line bg-terminal shadow-2xl">
              <img
                src={promptReviewScreenshot.url}
                alt="Real Nexpath CLI prompt review screen: the original request stays visible while the enhanced prompt breaks it into numbered sections with keyboard controls to send, edit, or return to the original."
                className="block w-full"
                loading="eager"
                width={1118}
                height={721}
              />
            </figure>
          </div>
          </div>
        </section>

        <section id="workflow" className="border-b py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading eyebrow="How it works" title="One thoughtful enhancement before the work begins." description="NexPath strengthens your prompt before the AI agent acts, while keeping you in control." />
            <HatchedFrame>
              <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
                {workflow.map(([number, title, description, mock]) => (
                  <article key={number} className="flex flex-col bg-card p-6">
                    <span className="font-mono text-xs text-primary">{number}</span>
                    <h3 className="mt-3 text-lg font-bold">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
                    <div className="mt-6 flex-1" />
                    <StepMockup kind={mock} />
                  </article>
                ))}
              </div>
            </HatchedFrame>
          </div>
        </section>

        <section id="tools" className="border-b py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading eyebrow="Supported across your workflow" title="Wherever you already build." description="Terminal, editor, or browser, NexPath CLI attaches to the tool you already use." />
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {toolGroups.map((group) => {
                const cardClass = cn(
                  "flex flex-col overflow-hidden rounded-md border bg-card transition-colors hover:border-primary/30",
                  group.href && "cursor-pointer",
                );
                const inner = (
                  <>
                    <GroupHeader group={group} />
                    <p className="border-b border-border/60 bg-background px-6 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{group.hint}</p>
                    <ul className="flex flex-1 flex-col">
                      {group.tools.map(([name, icon, mono]) => (
                        <li key={name} className="flex items-center gap-3.5 border-b border-border/60 px-6 py-5 transition-colors last:border-b-0 hover:bg-muted/40">
                          <img src={icon} alt="" aria-hidden="true" className={cn("size-7 shrink-0", mono && "dark:invert")} />
                          <span className="text-sm font-bold">{name}</span>
                        </li>
                      ))}
                      <li className="hatch flex-1 border-t border-border/60" aria-hidden="true" />
                    </ul>
                  </>
                );
                return group.href ? (
                  <a key={group.label} href={group.href} className={cardClass} aria-label={`${group.label} — see how to add Nexpath to your workflow`}>
                    {inner}
                  </a>
                ) : (
                  <article key={group.label} className={cardClass}>
                    {inner}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="benchmark" className="border-b py-24">

          <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-8">
            <div>
              <span className="inline-block rounded-full border bg-card px-3 py-1 font-mono text-[11px] font-medium text-primary">Measured by project tests.</span>
              <h2 className="mt-4 text-balance text-4xl font-extrabold leading-tight">SWE-BENCH VERIFIED</h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">Same 40 tasks, same model and setup. NexPath improved the prompt before execution, helping the CLI solve 29 tasks vs. 27 without NexPath.</p>
              <a href={`${repositoryUrl}/tree/main/Nexpath_benchmark`} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">Read the benchmark report <ExternalLink className="size-4" /></a>
            </div>
            <div className="border bg-card p-6 shadow-sm sm:p-8">
              <BenchmarkBar label="Claude Code + Nexpath" score="29/40" percent="72.5%" width="72.5%" highlighted />
              <BenchmarkBar label="Claude Code" score="27/40" percent="67.5%" width="67.5%" />
              <div className="mt-8 grid gap-4 border-t pt-6 sm:grid-cols-2">
                <div><strong className="text-2xl">0</strong><p className="mt-1 text-xs text-muted-foreground">Tasks solved without Nexpath</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="privacy" className="border-b py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading eyebrow="Privacy by default" title="Your workflow stays yours." description="Everything stays in ~/.nexpath/. Your repository is never uploaded or indexed." />
            <HatchedFrame>
              <div className="grid gap-px bg-border md:grid-cols-3">
                <PrivacyFeature icon={<ShieldCheck />} title="Automatic secret redaction" text="API keys, tokens, and PEM blocks are stripped before a prompt is stored." kind="redact" />
                <PrivacyFeature icon={<CheckCircle2 />} title="Local prompt control" text="Delete, prune, or clear stored prompts with one command." kind="local" />
                <PrivacyFeature icon={<Sparkles />} title="Targeted guidance only" text="No filler. If there is nothing useful to add, NexPath CLI stays out of the way." kind="guidance" />
                <div className="bg-card px-6 py-5 md:col-span-3">
                  <p className="font-mono text-[11px] font-medium text-muted-foreground">WHAT NEXPATH IS NOT</p>
                  <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                    {["Not a coding agent", "Not a linter or CI", "Runs once, on the prompt, before the agent writes code"].map((item) => <span key={item} className="flex items-center gap-2 text-xs font-medium text-muted-foreground"><X className="size-3.5 text-primary" />{item}</span>)}
                  </div>
                </div>
              </div>
            </HatchedFrame>
          </div>
        </section>

        <section id="faq" className="border-b py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading eyebrow="FAQ" title="Frequently asked questions" description="Short answers to the questions developers ask before adding NexPath CLI to their workflow." />
            <div className="mx-auto mt-10 max-w-3xl divide-y divide-border overflow-hidden rounded-md border bg-card">
              {faqs.map(([question, answer]) => <FaqItem key={question} question={question} answer={answer} />)}
            </div>
          </div>
        </section>

        <section id="waitlist" className="border-b py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading eyebrow="Early access" title="Join the NexPath waitlist" description="Be first to hear about new NexPath releases, integrations, and early-access features." />
            <div className="mx-auto mt-10 max-w-xl rounded-md border bg-card p-6 sm:p-8">
              <LaunchListWidget />
            </div>
          </div>
        </section>


        <section id="install" className="bg-terminal py-24 text-terminal-foreground">

          <div className="mx-auto max-w-5xl px-5 text-center lg:px-8">
            <h2 className="text-balance text-4xl font-extrabold sm:text-5xl">Improve your prompt for Claude Code.</h2>
            <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-lg border border-terminal-line bg-terminal-soft text-left font-mono text-xs sm:text-sm">
              <div className="flex items-center justify-between border-b border-terminal-line px-4 py-3"><span className="text-terminal-muted">terminal</span><Button variant="ghost" size="sm" onClick={copyInstallCommands} className="text-terminal-muted hover:bg-terminal hover:text-terminal-foreground" aria-label={copied ? "Copied" : "Copy install commands"}>{copied ? <Check /> : <Clipboard />}</Button></div>
              <pre className="overflow-x-auto p-5 leading-7 text-terminal-foreground"><code><span className="text-success">$</span> {installCommands[0]}{"\n"}<span className="text-success">$</span> {installCommands[1]}</code></pre>
            </div>
            <div className="mt-8 flex justify-center"><Button variant="hero" size="xl" asChild><a href="https://github.com/hi0001234d/nexpath#add-nexpath-to-your-development-workflow--installation" target="_blank" rel="noopener noreferrer"><Github /> View on GitHub</a></Button></div>
          </div>
        </section>
      </main>

      <footer className="border-t border-terminal-line bg-terminal text-terminal-muted">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-5 py-6 text-xs sm:flex-row sm:justify-between lg:px-8">
          <p>NexPath CLI · Built during MLH AI Hackfest 2026</p>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5" aria-label="Social media">
              <a
                href={repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nexpath on GitHub"
                title="GitHub"
                className="inline-flex size-8 items-center justify-center rounded-md transition-colors hover:bg-terminal-soft hover:text-terminal-foreground"
              >
                <Github className="size-4" />
              </a>
              <a
                href="https://discord.gg/Xg5aRWG5c"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nexpath Discord community"
                title="Discord"
                className="inline-flex size-8 items-center justify-center rounded-md transition-colors hover:bg-terminal-soft hover:text-terminal-foreground"
              >
                <DiscordIcon className="size-4" />
              </a>
              <a
                href="https://x.com/Nex_path"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nexpath on X"
                title="X"
                className="inline-flex size-8 items-center justify-center rounded-md transition-colors hover:bg-terminal-soft hover:text-terminal-foreground"
              >
                <XIcon className="size-4" />
              </a>
              <a
                href="https://www.linkedin.com/showcase/nex-path/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nexpath on LinkedIn"
                title="LinkedIn"
                className="inline-flex size-8 items-center justify-center rounded-md transition-colors hover:bg-terminal-soft hover:text-terminal-foreground"
              >
                <LinkedInIcon className="size-4" />
              </a>
            </div>
            <ThemeToggle className="size-8 text-terminal-muted hover:bg-terminal-soft hover:text-terminal-foreground" />
          </div>
        </div>
      </footer>
    </div>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125M7.119 20.452H3.555V9h3.564zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
    </svg>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.6 12.6 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03M8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418m7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418" />
    </svg>
  );
}

function HatchedFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("mx-auto mt-12 grid max-w-5xl grid-cols-[1rem_1fr_1rem] border sm:grid-cols-[2rem_1fr_2rem]", className)}>
      <div className="hatch border-r" aria-hidden="true" />
      {children}
      <div className="hatch border-l" aria-hidden="true" />
    </div>
  );
}

function StepMockup({ kind }: { kind: "prompt" | "structured" | "checks" | "choice" }) {

  const box = "rounded-md border border-terminal-line bg-terminal p-3 font-mono text-[11px] leading-5 text-terminal-foreground";
  if (kind === "prompt") return <div className={box}><p className="text-terminal-muted">prompt</p><p className="mt-1">Add password reset.<span className="cursor-blink ml-0.5 inline-block h-3 w-1.5 bg-primary align-middle" /></p></div>;
  if (kind === "structured") return <div className={box}>{[["Goal", "reset flow"], ["Scope", "login page"], ["Accept", "tests pass"]].map(([k, v]) => <p key={k}><span className="text-primary">{k}:</span> <span className="text-terminal-muted">{v}</span></p>)}</div>;
  if (kind === "checks") return <div className={box}>{["Scope", "Safety", "Rollback"].map((c) => <p key={c} className="flex items-center gap-2"><Check className="size-3.5 text-primary" />{c}</p>)}</div>;
  return <div className={cn(box, "flex gap-1.5")}>{["Accept", "Edit", "Reject"].map((c, i) => <span key={c} className={cn("flex-1 rounded border border-terminal-line px-1 py-1 text-center text-terminal-muted", i === 0 && "border-primary bg-primary text-primary-foreground")}>{c}</span>)}</div>;
}


function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="mx-auto max-w-3xl text-center"><span className="inline-block rounded-full border bg-card px-3 py-1 font-mono text-[11px] font-medium text-primary">{eyebrow.toUpperCase()}</span><h2 className="mt-4 text-balance text-3xl font-extrabold leading-tight sm:text-4xl">{title}</h2><p className="mt-3 text-base leading-7 text-muted-foreground">{description}</p></div>;
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-muted/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
      >
        <h3 className="flex-1 text-sm font-bold sm:text-base">{question}</h3>
        <ChevronDown className={cn("size-4 shrink-0 text-primary transition-transform duration-200", open && "rotate-180")} />
      </button>
      {open && <p className="px-5 pb-5 text-sm leading-6 text-muted-foreground">{answer}</p>}
    </div>
  );
}

function BenchmarkBar({ label, score, percent, width, highlighted = false }: { label: string; score: string; percent: string; width: string; highlighted?: boolean }) {
  return <div className="mb-7 last:mb-0"><div className="mb-3 flex items-end justify-between gap-3"><div><p className="font-bold">{label}</p><p className="mt-1 font-mono text-xs text-muted-foreground">{percent} solved</p></div><strong className={`text-2xl ${highlighted ? "text-primary" : "text-foreground"}`}>{score}</strong></div><div className="h-3 overflow-hidden bg-muted"><div className={highlighted ? "h-full bg-primary" : "h-full bg-muted-foreground/35"} style={{ width }} /></div></div>;
}

function GroupHeader({ group }: { group: ToolGroup }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!group.install?.length) {
    return (
      <header className="px-5 pb-4 pt-5">
        <div className="flex w-full items-center gap-2.5 rounded-sm border bg-background px-3 py-2.5">
          <SquareTerminal className="size-5 shrink-0 text-primary" aria-hidden="true" />
          <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-foreground">{group.label}</span>
        </div>
      </header>
    );
  }

  return (
    <header className="px-5 pb-4 pt-5">
      <div className="relative" ref={rootRef}>
        <button
          type="button"
          aria-haspopup="true"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className={cn(
            "flex w-full items-center gap-2.5 rounded-sm border bg-background px-3 py-2.5 text-left transition-colors hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
            open && "border-primary/40",
          )}
        >
          {group.icon && <img src={group.icon} alt="" aria-hidden="true" className={cn("size-5 shrink-0", group.iconMono && "dark:invert")} />}
          <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-foreground">{group.label}</span>
          <ChevronDown className={cn("ml-auto size-4 shrink-0 text-primary transition-transform duration-200", open && "rotate-180")} />
        </button>
        {open && (
          <div role="menu" aria-label={`${group.label} install options`} className="absolute left-0 top-full z-20 mt-2 w-56 rounded-md border bg-card p-1 shadow-lg">
            {group.install.map((option) => (
              <a
                key={option.label}
                role="menuitem"
                href={option.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => window.setTimeout(() => setOpen(false), 0)}
                className="group flex items-center justify-between gap-2 rounded-sm px-3 py-2 font-mono text-[11px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {option.label}
                <ExternalLink className="size-3 shrink-0 transition-colors group-hover:text-primary" />
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}



function PrivacyFeature({ icon, title, text, kind }: { icon: ReactNode; title: string; text: string; kind: "redact" | "local" | "guidance" }) {
  return (
    <article className="flex min-h-80 flex-col bg-card p-6 sm:p-8">
      <span className="grid size-10 place-items-center rounded-md bg-success-soft text-primary [&_svg]:size-5">{icon}</span>
      <h3 className="mt-5 text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
      <div className="mt-auto pt-8">
        {kind === "redact" && <div className="rounded-md border bg-background p-3 font-mono text-[10px]"><p className="text-muted-foreground">API_KEY=<span className="text-destructive line-through">sk-live-••••••</span></p><p className="mt-2 flex items-center gap-1.5 text-primary"><ShieldCheck className="size-3.5" /> Secret removed before storage</p></div>}
        {kind === "local" && <div className="rounded-md border bg-background p-3 font-mono text-[10px]"><p className="text-muted-foreground">$ nexpath history --clear</p><p className="mt-2 flex items-center gap-1.5 text-primary"><Check className="size-3.5" /> Local history cleared</p></div>}
        {kind === "guidance" && <div className="rounded-md border bg-background p-3 font-mono text-[10px]"><div className="flex items-center justify-between gap-3"><span className="text-muted-foreground">review.signal</span><span className="rounded border border-primary/30 bg-success-soft px-1.5 py-0.5 text-primary">useful only</span></div><div className="mt-3 h-1.5 overflow-hidden bg-muted"><div className="h-full w-3/4 bg-primary" /></div></div>}
      </div>
    </article>
  );
}

const LAUNCHLIST_SRC = "https://getlaunchlist.com/js/widget-diy.js";

// LaunchList's official "Custom Form" integration: same form key and audience, styled with site tokens.
// widget-diy.js (loaded once) handles referral tracking; the form posts to LaunchList directly.
function LaunchListWidget() {
  useEffect(() => {
    if (document.querySelector(`script[src="${LAUNCHLIST_SRC}"]`)) return;
    const script = document.createElement("script");
    script.src = LAUNCHLIST_SRC;
    script.defer = true;
    document.head.appendChild(script);
  }, []);
  return (
    <form className="launchlist-form flex flex-col gap-3" action="https://getlaunchlist.com/s/KLWIOj" method="POST">
      <label htmlFor="waitlist-email" className="sr-only">Email address</label>
      <input id="waitlist-email" name="email" type="email" required placeholder="Enter your email" className="h-11 rounded-md border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
      <Button type="submit" size="lg" className="h-11 w-full">Sign Up</Button>
    </form>
  );
}
