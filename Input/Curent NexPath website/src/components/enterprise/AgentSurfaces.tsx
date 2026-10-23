import { cn } from "@/lib/utils";
import { enterpriseData } from "./enterprise.data";

function SurfaceVisual(kind: string) {
  const box =
    "rounded-md border border-terminal-line bg-terminal p-3 font-mono text-[11px] leading-5 text-terminal-foreground";
  if (kind === "terminal") {
    return (
      <div className={box}>
        <p className="text-terminal-muted">prompt</p>
        <p className="mt-1">
          Add password reset.
          <span className="cursor-blink ml-0.5 inline-block h-3 w-1.5 text-primary align-middle" />
        </p>
        <div className="mt-3 flex gap-2">
          {["Accept", "Edit", "Reject"].map((label, i) => (
            <span
              key={label}
              className={cn(
                "flex-1 rounded border px-1 py-1 text-center text-xs",
                i === 0
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-terminal-line text-terminal-foreground",
              )}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    );
  }
  if (kind === "editor") {
    return (
      <div className={box}>
        <p className="flex items-center gap-2">
          <span className="text-primary rounded border border-primary/30 px-1.5 py-0.5 text-xs">
            review
          </span>
          <span className="text-terminal-muted">▲ src/app/page.tsx</span>
        </p>
        <p className="mt-1 text-terminal-muted">- const x = prompt;</p>
        <p className="mt-1 text-primary">+ const x = enhancedPrompt;</p>
      </div>
    );
  }
  if (kind === "browser") {
    return (
      <div className={box}>
        <p className="flex items-center gap-2">
          <span className="text-primary rounded border border-primary/30 px-1.5 py-0.5 text-xs">
            policy applied
          </span>
          <span className="text-terminal-muted">acme-enterprise · v3</span>
        </p>
      </div>
    );
  }
  // platform
  return (
    <div className={box}>
      <p className="text-terminal-muted">$ curl -X POST</p>
      <p className="mt-1 text-primary">POST /v1/review</p>
    </div>
  );
}

export function AgentSurfaces() {
  return (
    <section className="border-b py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {enterpriseData.agentSurfaces.map((surface, i) => (
            <div key={i} className="bg-card p-6">
              <span className="font-mono text-xs text-primary">{surface.number}</span>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                {surface.eyebrow}
              </p>
              <h3 className="mt-3 text-lg font-bold">{surface.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{surface.description}</p>
              <div className="mt-6 flex-1" />
              {SurfaceVisual(
                i === 0 ? "terminal" : i === 1 ? "editor" : i === 2 ? "browser" : "platform",
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AgentSurfaces;
