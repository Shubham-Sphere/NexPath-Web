import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { enterpriseData } from "./enterprise.data";

export function EnterpriseFeatures() {
  const { eyebrow, headline, paragraph, ctaLabel, ctaHref, features } =
    enterpriseData.enterpriseFeatures;

  return (
    <section className="border-b py-24">
      <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:px-8">
        <div className="flex flex-col">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            {eyebrow}
          </span>
          <h2 className="mt-4 text-4xl font-extrabold leading-tight">{headline}</h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">{paragraph}</p>
          <div className="mt-6">
            <Button variant="hero" size="xl" asChild>
              <a href={ctaHref}>
                {ctaLabel} <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>
        </div>

        <div>
          {features.map((feature, i) => (
            <div
              key={i}
              className="border-b border-border/60 py-5 last:border-b-0 flex items-start gap-4"
            >
              <div className="flex-1">
                <h4 className="text-sm font-bold">{feature.title}</h4>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{feature.body}</p>
              </div>
              <ArrowRight className="size-4 shrink-0 text-primary" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EnterpriseFeatures;
