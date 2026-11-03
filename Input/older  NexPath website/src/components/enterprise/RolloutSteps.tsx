import { enterpriseData } from "./enterprise.data";

export function RolloutSteps() {
  const {
    eyebrow,
    title,
    description,
    steps,
    quotes,
    nextStepTitle,
    nextStepBody,
    nextStepLink,
    nextStepHref,
  } = enterpriseData.rollout;

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

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="size-9 shrink-0 grid place-items-center rounded-full border font-mono text-xs text-primary">
                {step.number}
              </div>
              <span className="text-sm font-bold">{step.label}</span>
              {i < steps.length - 1 && (
                <div className="hidden sm:block h-px flex-1 bg-border" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {quotes.map((quote, i) => (
            <div key={i} className="rounded-md border bg-card p-6">
              <blockquote className="text-base leading-7">{quote.quote}</blockquote>
              <p className="mt-4 text-sm font-bold">{quote.attribution}</p>
              <p className="font-mono text-xs text-muted-foreground">{quote.subLine}</p>
            </div>
          ))}
          <div className="rounded-md border bg-primary/10 p-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
              NEXT STEP
            </span>
            <h4 className="mt-2 text-lg font-bold">{nextStepTitle}</h4>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{nextStepBody}</p>
            <a
              href={nextStepHref}
              className="mt-3 text-sm font-bold text-primary hover:underline inline-block"
            >
              {nextStepLink}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RolloutSteps;
