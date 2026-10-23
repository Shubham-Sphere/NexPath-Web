import { ArrowRight, Check, Play, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { enterpriseData } from "./enterprise.data";

function HeroVisual() {
  const code = [
    { text: "> nexpath review --policy acme-enterprise", muted: true },
    { text: "" },
    { text: "original   Add password reset", muted: true },
    { text: "policy     acme-enterprise · v3", muted: true },
    { text: "" },
    { text: "+ scope      auth pages only, no email provider changes", plus: true },
    { text: "+ accept     tests pass, existing sessions unaffected", plus: true },
    { text: "+ safety     no secrets in fixtures", plus: true },
    { text: "+ rollback   feature flag defaults off", plus: true },
    { text: "" },
    { text: "[ Accept ]  [ Edit ]  [ Reject ]", action: true },
  ];

  return (
    <figure className="relative overflow-hidden rounded-lg border border-terminal-line bg-terminal shadow-2xl">
      <div className="px-4 py-3 flex items-center justify-between border-b border-terminal-line">
        <span className="font-mono text-xs text-terminal-muted">nexpath review</span>
        <span className="font-mono text-xs text-primary border border-primary/30 px-1.5 py-0.5 rounded">
          ENTERPRISE
        </span>
      </div>
      <div className="p-5 font-mono text-xs leading-6 text-terminal-foreground">
        {code.map((line, i) => {
          if (line.muted) {
            return (
              <p key={i} className="text-terminal-muted">
                {line.text}
              </p>
            );
          }
          if (line.plus) {
            return (
              <p key={i} className="text-primary">
                {line.text}
              </p>
            );
          }
          if (line.action) {
            return (
              <div key={i} className="flex gap-2 mt-2">
                {["Accept", "Edit", "Reject"].map((label, j) => (
                  <span
                    key={j}
                    className={cn(
                      "flex-1 rounded border px-2 py-1 text-center text-xs",
                      j === 0
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-terminal-line text-terminal-foreground",
                    )}
                  >
                    {label}
                  </span>
                ))}
              </div>
            );
          }
          return <p key={i}>{line.text}</p>;
        })}
      </div>
    </figure>
  );
}

export function EnterpriseHero() {
  const {
    eyebrow,
    headline,
    sub,
    primaryLabel,
    primaryHref,
    secondaryLabel,
    secondaryHref,
    trustChips,
  } = enterpriseData.hero;

  return (
    <section className="relative border-b page-grid">
      <div className="absolute inset-0 bg-background/75" />
      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid flex-1 items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <div className="inline-flex items-center gap-2 border border-primary/25 bg-success-soft px-3 py-1.5 font-mono text-xs font-medium text-accent-foreground">
              <Sparkles className="size-3.5" /> {eyebrow}
            </div>
            <h1 className="mt-6 max-w-[12ch] text-balance text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
              {headline}
            </h1>
            <p className="mt-6 max-w-xl text-balance text-lg leading-8 text-muted-foreground">
              {sub}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="hero" size="xl" asChild>
                <a href={primaryHref}>
                  {primaryLabel} <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <a href={secondaryHref} target="_blank" rel="noopener noreferrer">
                  <Play className="size-4" /> {secondaryLabel}
                </a>
              </Button>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-muted-foreground">
              {trustChips.map((chip, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <Check className="size-3.5 text-primary" /> {chip}
                </span>
              ))}
            </div>
          </div>
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

export default EnterpriseHero;
