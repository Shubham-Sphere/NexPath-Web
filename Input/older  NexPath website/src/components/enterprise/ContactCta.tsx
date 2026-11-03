import { ArrowRight, Check, Play } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { enterpriseData } from "./enterprise.data";

export function ContactCta() {
  const {
    headline,
    paragraph,
    primaryLabel,
    secondaryLabel,
    secondaryHref,
    terminalLine,
    formLabel,
    formSub,
    submitLabel,
    consentNote,
    endpointPlaceholder,
    fields,
  } = enterpriseData.contact;

  return (
    <section className="border-b py-24 bg-terminal text-terminal-foreground" id="contact">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-4xl font-extrabold sm:text-5xl">{headline}</h2>
          <p className="mt-4 mx-auto max-w-2xl text-center text-base leading-7 text-terminal-muted">
            {paragraph}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button variant="hero" size="xl" asChild>
              <a href="#contact">
                {primaryLabel} <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button variant="terminal" size="xl" asChild>
              <a href={secondaryHref} target="_blank" rel="noopener noreferrer">
                <Play className="size-4" /> {secondaryLabel}
              </a>
            </Button>
          </div>

          <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-lg border border-terminal-line bg-terminal-soft text-left font-mono text-xs">
            <div className="flex items-center justify-between border-b border-terminal-line px-4 py-3">
              <span className="text-terminal-muted">nexpath install</span>
              <Button
                variant="ghost"
                size="sm"
                className="text-terminal-muted hover:bg-terminal hover:text-terminal-foreground"
              >
                <Check className="size-3.5" />
              </Button>
            </div>
            <pre className="overflow-x-auto p-5 leading-7 text-terminal-foreground">
              <code>{terminalLine}</code>
            </pre>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-2xl rounded-md border border-terminal-line bg-terminal-soft p-6 lg:p-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-terminal-muted">
            {formLabel}
          </span>
          <p className="mt-3 text-sm leading-6 text-terminal-muted">{formSub}</p>

          {/* TODO: point this at the CRM or form service before publishing */}
          <form
            className="mt-6 grid gap-4 sm:grid-cols-2"
            action={endpointPlaceholder}
            method="POST"
          >
            {fields.map((field) => {
              const isSelect = field.type === "select";
              const isTextarea = field.type === "textarea";
              return (
                <div key={field.name} className="flex flex-col">
                  <label
                    htmlFor={`contact-${field.name}`}
                    className="text-xs font-mono uppercase tracking-[0.12em] text-terminal-muted"
                  >
                    {field.name}
                  </label>
                  {isSelect ? (
                    <select
                      id={`contact-${field.name}`}
                      name={field.name}
                      required={field.required}
                      defaultValue=""
                      className="h-11 rounded-md border border-terminal-line bg-terminal px-4 text-sm text-terminal-foreground placeholder:text-terminal-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="">{`Select ${field.name.toLowerCase()}`}</option>
                      {field.options?.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : isTextarea ? (
                    <textarea
                      id={`contact-${field.name}`}
                      name={field.name}
                      rows={4}
                      required={field.required}
                      className="h-11 rounded-md border border-terminal-line bg-terminal px-4 text-sm text-terminal-foreground placeholder:text-terminal-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  ) : (
                    <input
                      id={`contact-${field.name}`}
                      name={field.name}
                      type={field.type}
                      required={field.required}
                      placeholder={field.name}
                      className="h-11 rounded-md border border-terminal-line bg-terminal px-4 text-sm text-terminal-foreground placeholder:text-terminal-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  )}
                </div>
              );
            })}
            <div className="mt-2 sm:col-span-2">
              <Button variant="hero" size="lg" type="submit" className="w-full">
                {submitLabel}
              </Button>
            </div>
          </form>
          <p className="mt-4 text-xs text-terminal-muted">{consentNote}</p>
        </div>
      </div>
    </section>
  );
}

export default ContactCta;
