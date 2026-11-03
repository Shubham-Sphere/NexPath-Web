import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { enterpriseData } from "./enterprise.data";

function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `enterprise-faq-panel-${index}`;
  const triggerId = `enterprise-faq-trigger-${index}`;

  return (
    <div>
      <button
        type="button"
        id={triggerId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-muted/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
      >
        <h3 className="flex-1 text-sm font-bold sm:text-base">{question}</h3>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-primary transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>
      {open && (
        <p id={panelId} className="px-5 pb-5 text-sm leading-6 text-muted-foreground">
          {answer}
        </p>
      )}
    </div>
  );
}

export function EnterpriseFaq() {
  const { eyebrow, title, description, items } = enterpriseData.faq;

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

        <div className="mx-auto mt-10 max-w-3xl divide-y divide-border overflow-hidden rounded-md border bg-card">
          {items.map((item, i) => (
            <FaqItem key={i} question={item.question} answer={item.answer} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default EnterpriseFaq;
