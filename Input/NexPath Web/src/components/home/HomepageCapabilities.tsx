import { ArrowRight, Brain, Cpu, GitBranch, Github, History, Network, Search, ShieldCheck, Users, Workflow, UserRound, Timer, CircleCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const contextFeatures = [
  { icon: History, title: 'Remember beyond the current session', body: 'Important project context can remain useful even when it was recorded weeks or months earlier.' },
  { icon: Brain, title: 'Learn project patterns', body: "Pattern recognition helps identify recurring information and relationships within a project's accumulated context." },
  { icon: Search, title: 'Retrieve what matters for the task', body: 'Instead of relying exclusively on whatever happens to be present in the current conversation, NexPath aims to make relevant historical context available when a task calls for it.' },
  { icon: Users, title: 'Maintain continuity across coding agents', body: 'When you move between coding agents, relevant project knowledge can help keep their understanding aligned with the decisions and conventions established earlier.' },
];

export function ContextEngineeringSection() {
  return (
    <section id="context-engineering" aria-labelledby="context-engineering-title" className="border-b py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[11px] font-medium text-primary">INTELLIGENT CONTEXT</span>
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
        </div>
        <h2 id="context-engineering-title" className="mt-5 max-w-4xl text-balance text-3xl font-extrabold uppercase leading-tight sm:text-4xl">Your project has a memory. Your coding agent should have the right context, too.</h2>
        <div className="mt-14 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <h3 className="max-w-sm text-3xl font-bold leading-tight">Context that carries forward.</h3>
            <p className="mt-5 text-base leading-7 text-muted-foreground">Important project decisions do not always belong to the current conversation. Architecture choices, earlier implementation details, established conventions, and lessons learned can remain relevant long after the original discussion.</p>
            <p className="mt-4 text-base leading-7 text-muted-foreground">NexPath's Context Engineering capabilities are designed to help preserve that knowledge and bring relevant context back when it matters.</p>
            <div aria-hidden="true" className="hatch mt-10 hidden h-24 border-y border-border/60 lg:block" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {contextFeatures.map(({ icon: Icon, title, body }, index) => (
              <article key={title} className="flex flex-col border bg-card p-6 transition-colors hover:border-primary/40">
                <div className="flex items-center justify-between">
                  <span aria-hidden="true" className="flex size-10 items-center justify-center border border-border/70 bg-background">
                    <Icon className="size-5 text-primary" strokeWidth={1.5} />
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-5 text-lg font-bold leading-7">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-12 border border-terminal-line bg-terminal px-5 py-5 sm:px-7">
          <p className="flex items-baseline gap-3 font-mono text-sm leading-7">
            <span className="text-primary" aria-hidden="true">›</span>
            <span className="font-semibold text-terminal-foreground">Not just longer memory. More useful context at the right time.</span>
          </p>
          <p className="mt-1 pl-6 font-mono text-xs leading-6 text-terminal-muted">Context Engineering is part of NexPath's open-source foundation.</p>
        </div>
      </div>
    </section>
  );
}

const enterpriseFeatures = [
  {
    icon: Network,
    title: 'Use your internal device network',
    paragraphs: ['Connect supported internal devices and use compatible local models running on your own hardware, including GPUs where supported.'],
  },
  {
    icon: ShieldCheck,
    title: 'Activate Data Privacy Mode',
    paragraphs: [
      'When Data Privacy Mode is enabled and correctly configured, model inference in the protected workflow is restricted to designated internal models rather than external model APIs. Your code and project information for that inference remain within the configured internal device network.',
      'If a task needs a capability that the configured internal models cannot provide, NexPath brings you into the decision. Data Privacy Mode does not silently fall back to an external model API.',
    ],
  },
  {
    icon: GitBranch,
    title: 'Work with different coding agents and keep context aligned',
    paragraphs: [
      'Use different coding agents for different tasks. Context Engineering helps keep important project context available as you switch, so you do not have to rebuild the same project understanding each time.',
      'NexPath can also bring you into the loop when a task may be handled by a more suitable or more cost-effective agent. Smaller tasks that do not need a premium model may be handled by an appropriate lower-cost or local option, helping reduce unnecessary subscription or token costs without lowering the quality bar for the work.',
    ],
  },
  {
    icon: Cpu,
    title: 'Put your internal GPUs to work',
    paragraphs: ['You do not need to manually choose a local model for every task. When Data Privacy Mode is on, suitable work is routed to compatible models on your configured internal device network. Model selection is automatic within that protected setup; external model APIs are not used. Suitability and performance depend on the model, hardware, and task.'],
  },
  {
    icon: CircleCheck,
    title: 'Support mature software engineering',
    paragraphs: ['Enterprise capabilities extend the open-source foundation with evidence-based software engineering workflows that support maintainability and more deliberate verification.'],
  },
];

export function EnterprisePrivacySection() {
  return (
    <section id="enterprise-privacy" aria-labelledby="enterprise-privacy-title" className="border-b py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[11px] font-medium text-primary">ENTERPRISE CAPABILITIES</span>
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
        </div>
        <h2 id="enterprise-privacy-title" className="mt-5 max-w-4xl text-balance text-3xl font-extrabold leading-tight sm:text-4xl">ENTERPRISE PRIVACY &amp; INTERNAL DEVICE NETWORK</h2>
        <div className="mt-12 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <div className="lg:sticky lg:top-24">
              <div aria-hidden="true" className="mb-8 flex w-fit items-center gap-4 text-primary">
                <Network className="size-10" strokeWidth={1.25} /><span className="h-px w-10 bg-border" /><ShieldCheck className="size-10" strokeWidth={1.25} /><span className="h-px w-10 bg-border" /><Cpu className="size-10" strokeWidth={1.25} />
              </div>
              <h3 className="max-w-sm text-3xl font-bold leading-tight">Your code. Your infrastructure. Your control.</h3>
              <p className="mt-5 text-base leading-7 text-muted-foreground">AI-assisted development introduces an important question: where does your project information go when a coding agent processes it?</p>
              <p className="mt-4 text-base leading-7 text-muted-foreground">NexPath brings privacy-focused local AI workflows to developers who need greater control over how their code and project context are processed.</p>
            </div>
          </div>
          <div className="divide-y border-y">
            {enterpriseFeatures.map(({ icon: Icon, title, paragraphs }) => (
              <article key={title} className="grid grid-cols-[1.5rem_1fr] gap-4 py-7 sm:gap-5">
                <Icon aria-hidden="true" className="mt-1 size-5 text-primary" strokeWidth={1.5} />
                <div>
                  <h3 className="text-lg font-bold leading-7">{title}</h3>
                  {paragraphs.map((paragraph) => <p key={paragraph} className="mt-3 text-sm leading-7 text-muted-foreground">{paragraph}</p>)}
                </div>
              </article>
            ))}
          </div>
        </div>
        <p className="mt-12 border-l-2 border-primary pl-5 text-sm font-medium leading-7 text-muted-foreground">Enterprise privacy capabilities, with the focus still on better software engineering and developer control.</p>
      </div>
    </section>
  );
}

export function BackgroundDevelopmentSection() {
  return (
    <section id="background-development" aria-labelledby="background-development-title" className="border-b bg-accent/30 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <span className="font-mono text-[11px] font-medium text-primary">MORE PRODUCTIVE DEVELOPMENT</span>
            <h2 id="background-development-title" className="mt-5 text-balance text-3xl font-extrabold leading-tight sm:text-4xl">BACKGROUND MODE &amp; HUMAN-IN-THE-LOOP DEVELOPMENT</h2>
          </div>
          <div className="lg:pt-8">
            <h3 className="text-2xl font-bold leading-9">Let suitable work run in the background. Step in when your judgment matters.</h3>
            <p className="mt-5 text-base leading-7 text-muted-foreground">Not every development task needs your attention from beginning to end. Testing, verification, and other suitable follow-up work can take time, even when they do not need continuous supervision.</p>
            <p className="mt-4 text-base leading-7 text-muted-foreground">Start background mode when you want a suitable task to continue while you focus on other work, or let NexPath surface the option when a task is ready for background verification. Work can make progress while you are waiting on a coding agent or using time when a subscription would otherwise be idle.</p>
          </div>
        </div>
        <div aria-hidden="true" className="my-10 flex items-center justify-center gap-5 border-y border-primary/20 py-7 sm:gap-10">
          <Workflow className="size-8 shrink-0 text-primary" strokeWidth={1.5} />
          <span className="h-px max-w-40 flex-1 bg-primary/30" />
          <Timer className="size-8 shrink-0 text-primary" strokeWidth={1.5} />
          <span className="h-px max-w-40 flex-1 bg-primary/30" />
          <UserRound className="size-8 shrink-0 text-primary" strokeWidth={1.5} />
        </div>
        <div className="grid gap-9 md:grid-cols-2 md:gap-16">
          <article>
            <h3 className="text-xl font-bold">Save time and optimize token costs</h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">For suitable tasks, NexPath can use a more cost-effective coding agent or a configured local model instead of routing every step through a premium model. This can reduce unnecessary token costs while the primary coding agent remains available for work that needs it.</p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">The agent and model should still fit the task. Cost optimization does not mean accepting weaker verification or compromising the quality required for the work.</p>
          </article>
          <article>
            <h3 className="text-xl font-bold">Return to the loop when it matters</h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">Background work does not remove you from important decisions. When a task needs clarification, approval, or engineering judgment, NexPath brings you back into the loop.</p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">You remain the decision-maker. The aim is to save waiting time and reduce repetitive coordination while keeping you involved where your judgment makes a difference.</p>
          </article>
        </div>
        <p className="mt-12 max-w-3xl text-xl font-semibold leading-8">Spend less time waiting. Reduce unnecessary token costs. Stay involved where your judgment matters.</p>
      </div>
    </section>
  );
}

const openSourceFeatures = [
  { title: 'Open-source capabilities', paragraphs: ['Explore the available open-source functionality, inspect the implementation, and understand how NexPath fits into your development workflow.'] },
  { title: 'Context Engineering', paragraphs: ['Context Engineering helps preserve useful project knowledge and make relevant context available across development tasks and coding agents.'] },
  { title: 'Additional Enterprise capabilities', paragraphs: ['Enterprise capabilities extend the experience with supported advanced software engineering workflows and privacy-focused local-model infrastructure.', 'These capabilities are intended for developers and organizations with additional requirements around engineering practices, infrastructure, and data handling.'] },
];

export function OpenSourceCapabilitiesSection({ repositoryUrl }: { repositoryUrl: string }) {
  return (
    <section id="open-source-capabilities" aria-labelledby="open-source-capabilities-title" className="border-b py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Github aria-hidden="true" className="mx-auto mb-5 size-10 text-primary" strokeWidth={1.25} />
          <span className="font-mono text-[11px] font-medium text-muted-foreground">OPEN SOURCE, WITH MORE TO EXPLORE</span>
          <h2 id="open-source-capabilities-title" className="mt-4 text-balance text-3xl font-extrabold leading-tight sm:text-4xl">OPEN SOURCE &amp; ENTERPRISE CAPABILITIES</h2>
          <h3 className="mt-6 text-xl font-semibold leading-8">An open-source foundation. Additional capabilities for demanding workflows.</h3>
        </div>
        <div className="mt-12 grid gap-10 border-t pt-10 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div>
            <p className="text-base leading-8 text-muted-foreground">NexPath's open-source foundation is central to its identity. Prompt Enhancement is already open source, and Context Engineering is part of the open-source foundation.</p>
            <p className="mt-4 text-base leading-8 text-muted-foreground">Additional Enterprise capabilities extend beyond the open-source experience. They include evidence-based software engineering workflows and privacy-focused use of an internal device network.</p>
            <Button variant="outline" size="lg" asChild className="mt-8 h-auto min-h-11 w-full whitespace-normal py-3 sm:w-auto">
              <a href={repositoryUrl} target="_blank" rel="noopener noreferrer"><Github className="shrink-0" /><span>Explore the Open-Source Project</span><ArrowRight className="shrink-0" /></a>
            </Button>
          </div>
          <div className="space-y-8 border-l-2 border-primary/25 pl-6 sm:pl-8">
            {openSourceFeatures.map(({ title, paragraphs }) => (
              <article key={title}>
                <h3 className="text-lg font-bold">{title}</h3>
                {paragraphs.map((paragraph) => <p key={paragraph} className="mt-3 text-sm leading-7 text-muted-foreground">{paragraph}</p>)}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}