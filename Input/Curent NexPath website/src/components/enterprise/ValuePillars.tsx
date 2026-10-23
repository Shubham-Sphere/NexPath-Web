import { Layers, Gauge, ShieldCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { enterpriseData } from "./enterprise.data";

const pillarIcons: Record<string, typeof Layers> = {
  Layers,
  Gauge,
  ShieldCheck,
};

export function ValuePillars() {
  const { eyebrow, title, description, seeMoreLabel, seeMoreHref, pillars } =
    enterpriseData.valuePillars;

  return (
    <section className="border-b py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full border bg-card px-3 py-1 font-mono text-[11px] font-medium text-primary">
            {eyebrow.toUpperCase()}
          </span>
          <h2 className="mt-4 text-balance text-3xl font-extrabold leading-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground">{description}</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {pillars.map((pillar, i) => {
            const Icon = pillarIcons[pillar.title] || Layers;
            return (
              <div key={i} className="rounded-md border bg-card p-6 lg:p-8">
                <div className="grid size-10 place-items-center rounded-md bg-success-soft text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-bold">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{pillar.body}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Button variant="link" size="sm" asChild>
            <a href={seeMoreHref}>{seeMoreLabel}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ValuePillars;
