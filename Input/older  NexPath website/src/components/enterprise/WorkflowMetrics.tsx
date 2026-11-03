import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

import { enterpriseData } from "./enterprise.data";

export function WorkflowMetrics() {
  const { eyebrow, title, description, cards, note } = enterpriseData.workflowMetrics;

  return (
    <section className="border-b py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full border bg-card px-3 py-1 font-mono text-[11px] font-medium text-primary">
            {eyebrow}
          </span>
          <h2 className="mt-4 text-balance text-3xl font-extrabold leading-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground">{description}</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <div key={i} className="rounded-md border bg-card p-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                {card.modality}
              </span>
              <span className={cn("mt-3 text-3xl font-extrabold", i === 0 && "text-primary")}>
                {card.headline}
              </span>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{card.body}</p>
              <a
                href={card.linkHref}
                className="mt-4 text-sm font-bold text-primary hover:underline block text-center"
              >
                {card.linkLabel}
              </a>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-muted-foreground">{note}</p>
      </div>
    </section>
  );
}

export default WorkflowMetrics;
