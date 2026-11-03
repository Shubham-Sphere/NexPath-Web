import { CheckCircle2 } from "lucide-react";
import { enterpriseData } from "./enterprise.data";

export function SecurityTrust() {
  const { eyebrow, headline, paragraph, subFeatures, badges, note } = enterpriseData.security;

  return (
    <section className="border-b py-24" id="security">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="rounded-lg border border-terminal-line bg-terminal text-terminal-foreground p-8 lg:p-12">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-terminal-muted">
            {eyebrow}
          </span>
          <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">{headline}</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-terminal-muted">{paragraph}</p>
        </div>

        <div className="mt-8 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
          {subFeatures.map((feature, i) => (
            <div key={i} className="bg-card p-6">
              <h4 className="text-lg font-bold">{feature.title}</h4>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {badges.map((badge, i) => (
            <span
              key={i}
              className="rounded-full border bg-card px-3 py-1.5 font-mono text-[11px] text-muted-foreground flex items-center gap-1.5"
            >
              <CheckCircle2 className="size-3.5 text-primary" aria-hidden="true" />
              {badge.label}
            </span>
          ))}
        </div>

        <p className="mt-4 max-w-2xl text-xs leading-5 text-muted-foreground">{note}</p>
      </div>
    </section>
  );
}

export default SecurityTrust;
