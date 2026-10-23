import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { enterpriseData } from "./enterprise.data";

export function ServicesGrid() {
  return (
    <section className="border-b py-24" id="services">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full border bg-card px-3 py-1 font-mono text-[11px] font-medium text-primary">
            SERVICES
          </span>
          <h2 className="mt-4 text-balance text-3xl font-extrabold leading-tight sm:text-4xl">
            Everything an enterprise rollout needs, in one place.
          </h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            Pick the surface that matches your operating model. Every service is built on the same
            review engine and the same policy model.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {enterpriseData.services.map((service, i) => (
            <div key={i} className="rounded-md border bg-card p-6 lg:p-8">
              <span className="text-xs font-mono uppercase tracking-[0.16em] text-primary">
                {service.eyebrow}
              </span>
              <h3 className="mt-3 text-xl font-bold">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{service.body}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {service.tags.map((tag, j) => (
                  <span
                    key={j}
                    className="rounded-sm border bg-muted px-2 py-1 font-mono text-[11px] text-muted-foreground"
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
              <a
                href={service.linkHref}
                className="mt-6 text-sm font-bold text-primary hover:underline block text-center"
              >
                {service.linkLabel}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesGrid;
