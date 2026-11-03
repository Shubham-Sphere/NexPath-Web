import { enterpriseData } from "./enterprise.data";

export function CustomerStories() {
  const { eyebrow, title, description, orgCountPlaceholder, logos, stories } =
    enterpriseData.customerStories;

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

        <p className="mb-8 text-center font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
          {orgCountPlaceholder} organisations run NexPath.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {logos.map((logo, i) => (
            <div
              key={i}
              className="grid size-24 place-items-center rounded-sm border border-dashed border-border font-mono text-[10px] text-muted-foreground h-6 w-auto opacity-70"
            >
              {logo.label}
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {stories.map((story, i) => (
            <div key={i} className="rounded-md border bg-card p-6 lg:p-8">
              <p className="text-base leading-7">{story.quote}</p>
              <p className="mt-5 text-sm font-bold">{story.person}</p>
              <p className="font-mono text-xs text-muted-foreground">{story.roleLine}</p>
              <a
                href={story.caseStudyUrl}
                className="mt-4 text-sm font-bold text-primary hover:underline inline-block"
              >
                Read the case study →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CustomerStories;
