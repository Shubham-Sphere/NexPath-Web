import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { enterpriseData } from "./enterprise.data";

export function PricingPlans() {
  const { eyebrow, title, description, strip, plans } = enterpriseData.pricing;

  return (
    <section className="border-b py-24" id="plans">
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

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {plans.map((plan, i) => {
            const isPopular = plan.badge === "MOST POPULAR";
            return (
              <div
                key={i}
                className={cn(
                  "rounded-md border bg-card p-6 lg:p-8 relative flex flex-col",
                  isPopular ? "border-primary ring-1 ring-primary/25" : "",
                )}
              >
                {isPopular && (
                  <span className="absolute top-0 right-6 -translate-y-1/2 rounded-full bg-primary px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-primary-foreground">
                    {plan.badge}
                  </span>
                )}
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="mt-1 font-mono text-xs text-muted-foreground">{plan.seats}</p>
                <span className="mt-5 text-4xl font-extrabold">{plan.price}</span>
                <p className="mt-1 font-mono text-xs text-muted-foreground">{plan.unit}</p>
                <ul className="mt-6 space-y-3" role="list">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  key={i}
                  variant={isPopular ? "hero" : "outline"}
                  size="lg"
                  className="mt-7 w-full"
                  asChild
                >
                  <a href={plan.ctaHref}>{plan.ctaLabel}</a>
                </Button>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-md border bg-muted p-5 text-sm leading-6 text-muted-foreground">
          {strip}
        </div>
      </div>
    </section>
  );
}

export default PricingPlans;
