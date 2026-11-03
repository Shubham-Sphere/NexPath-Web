import { useEffect, useRef, useState } from 'react';
// Capability tabs render as a vertical stack on large screens, horizontal scroll on small.
import { Clock, Eye, Workflow, Network, ShieldCheck, SlidersHorizontal, Activity, Users, Layers, Globe, GitBranch } from 'lucide-react';
import { Section, Heading, CopyText } from '@/components/enterprise/EnterprisePrimitives';
import { Button } from '@/components/ui/button';
import { e2 } from './enterprise2.data';

const problemIcons = [Clock, Eye, Workflow];
const stepIcons = [Network, Eye, Workflow];
const capabilityIcons = [Eye, Network, GitBranch, Users, Activity, Layers];
const trustIcons = [ShieldCheck, Eye, SlidersHorizontal, ShieldCheck];

export function ProblemSection() {
  return <Section id="problem"><div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-20"><div className="lg:sticky lg:top-24 lg:self-start"><p className="font-mono text-xs text-primary">{e2.problem.heading.eyebrow}</p><h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">{e2.problem.heading.title}</h2><p className="mt-5 max-w-lg leading-7 text-muted-foreground">{e2.problem.heading.description}</p></div><div>{e2.problem.items.map((item, i) => { const Icon = problemIcons[i] ?? Clock; return <article key={item.title} className="grid grid-cols-[40px_minmax(0,1fr)] gap-5 border-t py-7 first:border-primary/40"><Icon className="mt-1 size-6 text-primary"/><div className="min-w-0"><h3 className="text-lg font-bold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.body}</p></div></article>; })}</div></div></Section>;
}

export function HowItWorksSection() {
  const [active, setActive] = useState(0);
  const items = e2.steps.items;
  const current = e2.steps.demo[active] ?? e2.steps.demo[0];
  return (
    <Section id="how-it-works">
      <Heading {...e2.steps.heading}/>
      <div className="mt-12">
        <div role="tablist" aria-label="How it works steps" className="grid grid-cols-3 border border-primary/40">
          {items.map((item, i) => (
            <Button
              variant="ghost"
              key={item.title}
              id={`step-tab-${i}`}
              role="tab"
              aria-selected={active === i}
              aria-controls="step-panel"
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={event => {
                if (['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) {
                  event.preventDefault();
                  const forward = event.key === 'ArrowRight';
                  const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : (i + (forward ? 1 : items.length - 1)) % items.length;
                  setActive(next);
                  document.getElementById(`step-tab-${next}`)?.focus();
                }
              }}
              className={`h-auto min-h-14 min-w-0 whitespace-normal rounded-none px-2 py-4 font-mono text-xs font-semibold leading-snug transition-colors sm:px-4 sm:text-sm ${active === i ? 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground' : 'text-primary hover:bg-accent/50'} ${i > 0 ? 'border-l border-primary/40' : ''}`}
            >
              {item.title}
            </Button>
          ))}
        </div>
        <div id="step-panel" role="tabpanel" tabIndex={0} aria-labelledby={`step-tab-${active}`} className="pt-10 sm:pt-14">
          <div className="grid gap-9 md:min-h-60 md:grid-cols-3 md:gap-10">
            {current?.columns.map((column, i) => {
              const Icon = stepIcons[(active + i) % stepIcons.length] ?? Workflow;
              return <article key={column.title} className="min-w-0">
                <Icon aria-hidden="true" strokeWidth={1.25} className="size-12 text-primary sm:size-14" />
                <h3 className="mt-6 text-lg font-bold">{column.title}</h3>
                <p className="mt-3 text-base leading-7 text-muted-foreground">{column.body}</p>
              </article>;
            })}
          </div>
          <div className="mt-10 text-center sm:mt-12"><Button variant="hero" asChild className="rounded-none"><a href="#capabilities">{current?.cta}</a></Button></div>
        </div>
      </div>
      <p className="mt-6 text-center font-mono text-xs text-muted-foreground">Illustrative demo · platform capabilities pending confirmation</p>
      <p className="mt-9 text-center text-sm text-muted-foreground"><CopyText>{e2.steps.note}</CopyText></p>
    </Section>
  );
}

export function CapabilitiesSection() {
  const [active, setActive] = useState(0);
  const items = e2.capabilities.items;
  const current = items[active] ?? items[0];
  const Icon = capabilityIcons[active] ?? Network;
  return (
    <Section id="capabilities">
      <Heading {...e2.capabilities.heading}/>
      <div className="mt-12 grid border border-primary/40 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div role="tablist" aria-label="Capabilities" aria-orientation="vertical" className="flex overflow-x-auto lg:block">
          {items.map((item, i) => (
            <button
              key={item.title}
              id={`capability-tab-${i}`}
              role="tab"
              aria-selected={active === i}
              aria-controls="capability-panel"
              onClick={() => setActive(i)}
              onKeyDown={event => {
                if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                  event.preventDefault();
                  const forward = event.key === 'ArrowDown' || event.key === 'ArrowRight';
                  const next = (i + (forward ? 1 : items.length - 1)) % items.length;
                  setActive(next);
                  document.getElementById(`capability-tab-${next}`)?.focus();
                }
              }}
              className={`shrink-0 border-b border-primary/40 px-5 py-4 text-left text-sm font-semibold transition-colors last:border-b-0 lg:block lg:w-full lg:py-5 ${active === i ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-accent/50'}`}
            >
              {item.title}
            </button>
          ))}
        </div>
        <div id="capability-panel" role="tabpanel" aria-labelledby={`capability-tab-${active}`} className="grid border-t border-primary/40 lg:grid-cols-[minmax(0,1fr)_auto] lg:border-t-0">
          <div className="min-w-0 p-6 sm:p-10">
            <h3 className="text-2xl font-extrabold">{current?.title}</h3>
            <p className="mt-4 max-w-xl leading-7 text-muted-foreground">{current?.body}</p>
            <p className="mt-6"><CopyText>{current?.status ?? ''}</CopyText></p>
          </div>
          <figure aria-hidden="true" className="hidden aspect-square h-full items-center justify-center border-l border-primary/40 bg-accent/40 lg:flex">
            <Icon strokeWidth={1} className="size-28 text-primary/70"/>
          </figure>
        </div>
      </div>
    </Section>
  );
}

export function DarkBand() {
  const phrases = ['Availability awareness', 'Resource coordination', 'Task routing', 'Permissions'];
  return (
    <div className="flex min-h-[149px] items-center border-b bg-terminal py-10 text-terminal-foreground" aria-label="Platform focus areas">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-5 px-6">
        {phrases.map((phrase) => (
          <span key={phrase} className="flex items-center gap-10 whitespace-nowrap font-mono text-base">
            <span className="size-1.5 rounded-full bg-primary" aria-hidden="true"/>
            {phrase}
          </span>
        ))}
      </div>
    </div>
  );
}

export function UseCasesSection() {
  const wrapper = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const count = e2.useCases.items.length;

  useEffect(() => {
    let frame = 0;
    function update() {
      const el = wrapper.current;
      const row = track.current;
      if (!el || !row) return;
      const distance = el.offsetHeight - window.innerHeight;
      const p = distance > 0 ? Math.min(1, Math.max(0, -el.getBoundingClientRect().top / distance)) : 0;
      const shift = Math.max(0, row.scrollWidth - row.clientWidth);
      row.style.transform = `translate3d(${String(-p * shift)}px, 0, 0)`;
      setProgress(p);
    }
    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    }
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);


  return (
    <div ref={wrapper} className="relative border-b bg-muted/40" style={{ height: `${String(Math.max(count, 2) * 75)}vh` }}>
      <section id="use-cases" aria-label="Use cases" className="sticky top-0 flex h-screen scroll-mt-0 flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
          <div className="min-w-0">
            <p className="font-mono text-xs text-primary">{e2.useCases.heading.eyebrow}</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">{e2.useCases.heading.title}</h2>
            <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">{e2.useCases.heading.description}</p>
          </div>
          <div className="mt-8 overflow-hidden sm:mt-10">
            <div ref={track} className="flex gap-6 will-change-transform sm:gap-8">
              {e2.useCases.items.map((item, i) => (
                <article key={item.title} className="grid w-[85%] shrink-0 gap-5 border-t border-primary/40 pt-5 sm:w-[72%] sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-6 lg:w-[58%] lg:grid-cols-[190px_minmax(0,1fr)]">
                  <div aria-hidden="true" className="relative flex h-36 items-center justify-center border-y bg-accent/40 sm:h-[46vh] sm:max-h-[540px] sm:min-h-72">
                    <Globe className="size-16 text-primary/60 sm:size-24" strokeWidth={0.8}/>
                    <span className="absolute bottom-4 left-4 font-mono text-xs text-primary">NETWORK / 0{i + 1}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-4xl text-primary/50">0{i + 1}</p>
                    <h3 className="mt-3 text-xl font-bold">{item.title}</h3>
                    <div className="mt-4 grid gap-3">
                      <div><p className="font-mono text-[11px] text-primary">Offering side</p><p className="mt-1 text-sm leading-6 text-muted-foreground"><CopyText>{item.provider}</CopyText></p></div>
                      <div className="border-t pt-3"><p className="font-mono text-[11px] text-primary">Requesting side</p><p className="mt-1 text-sm leading-6 text-muted-foreground"><CopyText>{item.requester}</CopyText></p></div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="mt-6 flex items-center gap-4 sm:mt-8">
            <p className="shrink-0 font-mono text-[11px] text-muted-foreground">Scroll to explore</p>
            <div className="h-px flex-1 bg-border"><div className="h-px bg-primary transition-[width] duration-150" style={{ width: `${String(progress * 100)}%` }}/></div>
            <p className="shrink-0 font-mono text-[11px] text-primary">{String(Math.min(count, Math.floor(progress * count) + 1)).padStart(2, '0')} / {String(count).padStart(2, '0')}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export function TrustSection() {
  return <Section id="trust"><div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16"><div><ShieldCheck className="size-10 text-primary" strokeWidth={1.4}/><p className="mt-6 font-mono text-xs text-primary">{e2.trust.heading.eyebrow}</p><h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">{e2.trust.heading.title}</h2><p className="mt-4 leading-7 text-muted-foreground">{e2.trust.heading.description}</p></div><div className="grid gap-x-8 sm:grid-cols-2">{e2.trust.items.map((item, i) => { const Icon = trustIcons[i] ?? ShieldCheck; return <article key={item.title} className="min-w-0 border-t py-6"><Icon className="size-5 text-primary"/><h3 className="mt-4 font-bold">{item.title}</h3><p className="mt-3 text-sm leading-6"><CopyText>{item.body}</CopyText></p></article>; })}</div></div></Section>;
}