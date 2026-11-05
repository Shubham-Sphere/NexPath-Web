// Draft alternatives for How it works, Capabilities and Use cases, for side-by-side comparison on Enterprise Page 2.
import { useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronDown, Minus, Plus } from 'lucide-react';
import { Section, Heading, CopyText } from '@/components/enterprise/EnterprisePrimitives';
import { Button } from '@/components/ui/button';
import { e2 } from './enterprise2.data';

function DraftTag({ label }: { label: string }) {
  return <p className="mb-6 inline-flex border border-dashed border-primary/50 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-primary">Draft · {label}</p>;
}

const steps = e2.steps.items;
const cases = e2.useCases.items;
const capabilities = e2.capabilities.items;

/* ================= HOW IT WORKS ================= */

/* How it works — Variant A: vertical timeline with connecting spine */
export function HowItWorksTimelineV2() {
  return (
    <Section id="how-it-works-a">
      <DraftTag label="How it works A — Vertical timeline" />
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="font-mono text-xs text-primary">{e2.steps.heading.eyebrow}</p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">{e2.steps.heading.title}</h2>
          <p className="mt-5 max-w-lg leading-7 text-muted-foreground">{e2.steps.heading.description}</p>
        </div>
        <ol className="relative border-l-2 border-primary/30 pl-8 sm:pl-12">
          {steps.map((s, i) => (
            <li key={s.title} className="relative pb-12 last:pb-0">
              <span aria-hidden="true" className="absolute -left-[41px] flex size-6 items-center justify-center border-2 border-primary bg-background font-mono text-[10px] font-bold text-primary sm:-left-[57px]">{i + 1}</span>
              <p className="font-mono text-[11px] uppercase tracking-wider text-primary">Step 0{i + 1}</p>
              <h3 className="mt-2 text-2xl font-extrabold">{s.title}</h3>
              <p className="mt-3 max-w-xl leading-7 text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

/* How it works — Variant B: single-card carousel with arrows */
export function HowItWorksCarousel() {
  const [active, setActive] = useState(0);
  const current = steps[active] ?? steps[0];
  return (
    <Section id="how-it-works-b">
      <DraftTag label="How it works B — Step carousel" />
      <Heading {...e2.steps.heading} />
      <div className="mx-auto mt-12 max-w-3xl">
        <div className="relative border border-primary/40 bg-card p-8 sm:p-12">
          <span aria-hidden="true" className="absolute -left-1 -top-1 size-2.5 border-l-2 border-t-2 border-primary" />
          <span aria-hidden="true" className="absolute -bottom-1 -right-1 size-2.5 border-b-2 border-r-2 border-primary" />
          <p className="font-mono text-5xl text-primary/40">0{active + 1}</p>
          <h3 className="mt-4 text-2xl font-extrabold sm:text-3xl">{current?.title}</h3>
          <p className="mt-4 leading-7 text-muted-foreground">{current?.body}</p>
          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-2">
              {steps.map((s, i) => (
                <button key={s.title} aria-label={`Go to step ${String(i + 1)}`} aria-current={active === i} onClick={() => setActive(i)} className={`h-1.5 w-8 transition-colors ${active === i ? 'bg-primary' : 'bg-muted hover:bg-primary/40'}`} />
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-none" aria-label="Previous step" disabled={active === 0} onClick={() => setActive(a => Math.max(0, a - 1))}><ArrowLeft /></Button>
              <Button variant="hero" size="icon" className="rounded-none" aria-label="Next step" disabled={active === steps.length - 1} onClick={() => setActive(a => Math.min(steps.length - 1, a + 1))}><ArrowRight /></Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ================= CAPABILITIES ================= */

/* Capabilities — Variant A: numbered accordion rows */
export function CapabilitiesAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="capabilities-a">
      <DraftTag label="Capabilities A — Accordion" />
      <Heading {...e2.capabilities.heading} />
      <div className="mx-auto mt-12 max-w-4xl border-t border-primary/40">
        {capabilities.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.title} className="border-b border-primary/40">
              <button className="flex w-full items-center gap-5 py-5 text-left" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)}>
                <span className={`font-mono text-sm ${isOpen ? 'text-primary' : 'text-muted-foreground'}`}>0{i + 1}</span>
                <span className={`flex-1 text-lg font-bold sm:text-xl ${isOpen ? 'text-primary' : ''}`}>{item.title}</span>
                {isOpen ? <Minus className="size-4 shrink-0 text-primary" /> : <Plus className="size-4 shrink-0 text-muted-foreground" />}
              </button>
              {isOpen && (
                <div className="grid gap-4 pb-6 pl-9 sm:pl-12">
                  <p className="max-w-2xl leading-7 text-muted-foreground">{item.body}</p>
                  <p className="text-sm"><CopyText>{item.status}</CopyText></p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* Capabilities — Variant B: bento grid with featured first cell */
export function CapabilitiesBento() {
  return (
    <Section id="capabilities-b">
      <DraftTag label="Capabilities B — Bento grid" />
      <Heading {...e2.capabilities.heading} />
      <div className="mt-12 grid gap-px border border-primary/40 bg-primary/40 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((item, i) => (
          <article key={item.title} className={`group bg-background p-6 transition-colors hover:bg-accent/40 sm:p-8 ${i === 0 ? 'sm:col-span-2 lg:row-span-2' : ''}`}>
            <p className="font-mono text-[11px] text-primary">CAPABILITY / 0{i + 1}</p>
            <h3 className={`mt-3 font-extrabold ${i === 0 ? 'text-2xl sm:text-3xl' : 'text-lg'}`}>{item.title}</h3>
            <p className={`mt-3 leading-7 text-muted-foreground ${i === 0 ? 'max-w-lg' : 'text-sm leading-6'}`}>{item.body}</p>
            <p className="mt-4 text-xs"><CopyText>{item.status}</CopyText></p>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ================= USE CASES ================= */

/* Use cases — Variant A: gives/gets comparison cards */
export function UseCasesCompare() {
  return (
    <Section id="use-cases-a">
      <DraftTag label="Use cases A — Gives / Gets" />
      <Heading {...e2.useCases.heading} />
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {cases.map((item, i) => (
          <article key={item.title} className="flex flex-col border border-border bg-card">
            <div className="border-b border-border p-5">
              <p className="font-mono text-[11px] text-primary">SCENARIO 0{i + 1}</p>
              <h3 className="mt-2 text-lg font-bold">{item.title}</h3>
            </div>
            <div className="grid flex-1 grid-rows-2">
              <div className="border-b border-border p-5">
                <p className="font-mono text-[11px] uppercase tracking-wider text-primary">Gives</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground"><CopyText>{item.provider}</CopyText></p>
              </div>
              <div className="bg-muted/40 p-5">
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Gets</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground"><CopyText>{item.requester}</CopyText></p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* Use cases — Variant B: full-width spotlight with selector list */
export function UseCasesSpotlight() {
  const [active, setActive] = useState(0);
  const current = cases[active] ?? cases[0];
  return (
    <Section id="use-cases-b" className="bg-terminal text-terminal-foreground">
      <DraftTag label="Use cases B — Spotlight" />
      <div className="grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-16">
        <div>
          <p className="font-mono text-xs text-primary">{e2.useCases.heading.eyebrow}</p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">{e2.useCases.heading.title}</h2>
          <div className="mt-8 grid gap-2" role="tablist" aria-label="Use case scenarios">
            {cases.map((item, i) => (
              <button
                key={item.title}
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={`flex items-center justify-between gap-3 border px-4 py-3 text-left font-mono text-sm transition-colors ${active === i ? 'border-primary bg-primary text-primary-foreground' : 'border-terminal-line text-terminal-muted hover:text-terminal-foreground'}`}
              >
                <span>{item.title}</span>
                <ChevronDown className="size-4 -rotate-90 shrink-0" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
        <div role="tabpanel" className="border border-terminal-line p-8 sm:p-12">
          <p className="font-mono text-5xl text-primary/50">0{active + 1}</p>
          <h3 className="mt-4 text-2xl font-extrabold sm:text-3xl">{current?.title}</h3>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="border-l-2 border-primary pl-5">
              <p className="font-mono text-[11px] uppercase tracking-wider text-primary">Offering side</p>
              <p className="mt-3 text-sm leading-6 text-terminal-muted"><CopyText className="text-terminal-foreground">{current?.provider ?? ''}</CopyText></p>
            </div>
            <div className="border-l-2 border-terminal-line pl-5">
              <p className="font-mono text-[11px] uppercase tracking-wider text-terminal-muted">Requesting side</p>
              <p className="mt-3 text-sm leading-6 text-terminal-muted"><CopyText className="text-terminal-foreground">{current?.requester ?? ''}</CopyText></p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
