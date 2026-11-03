import { useEffect, useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowDown, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EnterpriseFooter from '@/components/enterprise/EnterpriseFooter';
import { Section, Brackets, CopyText } from '@/components/enterprise/EnterprisePrimitives';
import { HowItWorksTimelineV2, HowItWorksCarousel, CapabilitiesAccordion, CapabilitiesBento, UseCasesCompare, UseCasesSpotlight } from '@/components/enterprise2/Enterprise2Variants';
import { e2 } from '@/components/enterprise2/enterprise2.data';
import { ProblemSection, HowItWorksSection, CapabilitiesSection, UseCasesSection, TrustSection, DarkBand } from '@/components/enterprise2/Enterprise2Sections';

function HeroStatusline() {
  const [now, setNow] = useState('');
  useEffect(() => {
    const tick = () => setNow(new Date().toISOString().slice(11, 19));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-primary/30 pt-4 font-mono text-[11px] text-muted-foreground">
      <span className="flex items-center gap-2 text-foreground"><span className="size-1.5 animate-pulse rounded-full bg-primary" aria-hidden="true"/>MODE: CONCEPT PREVIEW</span>
      <span className="flex items-center gap-2">DETAILS: <CopyText>{'{{PLACEHOLDER: pending confirmation}}'}</CopyText></span>
      <a href="#how-it-works" className="flex items-center gap-2 transition-colors hover:text-primary"><span className="text-primary">▍</span>SCROLL<ArrowDown className="size-3 animate-bounce" aria-hidden="true"/></a>
      <span className="ml-auto tabular-nums">UTC {now || '--:--:--'}</span>
    </div>
  );
}

export const Route = createFileRoute('/enterprise')({
  head: () => ({ meta: [{ title: e2.seo.title }, { name: 'description', content: e2.seo.description }, { property: 'og:title', content: e2.seo.title }, { property: 'og:description', content: e2.seo.description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
  component: EnterprisePage2,
});

function EnterprisePage2() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-5 lg:px-8">
          <Link to="/" className="flex items-center gap-2"><span className="font-extrabold">{e2.brand}</span><span className="rounded-sm border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">{e2.badge}</span></Link>
          <Button variant="hero" size="sm" asChild><a href="#cta">{e2.cta.primary}</a></Button>
        </div>
      </header>
      <main>
        <section className="page-grid relative border-b">
          <div aria-hidden="true" className="absolute inset-0 bg-background/75" />
          <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col px-5 py-14 lg:px-8 lg:py-16">
            <div className="grid flex-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="inline-flex border border-primary/25 bg-success-soft px-3 py-1.5 font-mono text-xs text-accent-foreground">{e2.hero.eyebrow}</p>
              <h1 className="mt-6 text-balance text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">{e2.hero.title}</h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">{e2.hero.description}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <span className="relative inline-flex"><Brackets /><Button variant="hero" size="xl" asChild className="rounded-none"><a href="#capabilities">{e2.hero.primary}<ArrowRight /></a></Button></span>
                <Button variant="outline" size="xl" asChild className="rounded-none"><a href="#how-it-works">{e2.hero.secondary}</a></Button>
              </div>
            </div>
            <figure className="relative border border-terminal-line bg-terminal p-6 font-mono text-xs text-terminal-muted">
              <Brackets />
              <p className="mb-5 text-terminal-foreground">network.availability</p>
              {e2.hero.sides.map((s, i) => (
                <div key={i} className="mb-3 border border-terminal-line p-4">
                  <CopyText className="text-terminal-foreground">{s}</CopyText>
                  <div className="mt-3 grid grid-cols-12 gap-1">{Array.from({ length: 12 }).map((_, h) => { const on = i === 0 ? h < 6 : h >= 6; return <span key={h} className={on ? 'h-3 bg-primary' : 'h-3 bg-terminal-line'} />; })}</div>
                </div>
              ))}
              <figcaption className="mt-4 text-[10px]">Illustrative: capacity windows on different schedules</figcaption>
            </figure>
            </div>
            <HeroStatusline />
          </div>
        </section>

        <DarkBand />

        <HowItWorksSection />
        <HowItWorksTimelineV2 />
        <HowItWorksCarousel />

        <Section className="bg-terminal text-terminal-foreground"><div className="grid gap-10 lg:grid-cols-2"><div><p className="font-mono text-[11px] text-terminal-muted">{e2.value.eyebrow}</p><h2 className="mt-4 text-4xl font-extrabold">{e2.value.title}</h2><p className="mt-4 text-terminal-muted">{e2.value.description}</p></div><ul className="grid gap-3">{e2.value.points.map(p => <li key={p} className="flex items-center gap-3 border border-terminal-line p-4"><Check className="size-4 text-primary" />{p}</li>)}</ul></div></Section>

        <CapabilitiesSection />
        <CapabilitiesAccordion />
        <CapabilitiesBento />

        <UseCasesSection />
        <UseCasesCompare />
        <UseCasesSpotlight />

        <ProblemSection />

        <TrustSection />

        <Section id="cta" className="bg-terminal text-terminal-foreground"><div className="text-center"><h2 className="text-balance text-4xl font-extrabold sm:text-5xl">{e2.cta.title}</h2><p className="mx-auto mt-4 max-w-2xl text-terminal-muted">{e2.cta.description}</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Button variant="hero" size="xl" asChild><a href="/#waitlist">{e2.cta.primary}<ArrowRight /></a></Button><Button variant="terminal" size="xl" asChild><Link to="/">{e2.cta.secondary}</Link></Button></div></div></Section>
      </main>
      <EnterpriseFooter />
    </div>
  );
}
