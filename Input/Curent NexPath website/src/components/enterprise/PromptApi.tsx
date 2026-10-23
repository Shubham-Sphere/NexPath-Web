import { Check, Clipboard } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { enterpriseData } from "./enterprise.data";

export function PromptApi() {
  const { eyebrow, headline, paragraph1, paragraph2, strip } = enterpriseData.promptApi;
  const [copied, setCopied] = useState(false);

  function copySnippet() {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(
      `$ curl -X POST {{PLACEHOLDER: API base URL}}/v1/review \\\n  -H "Authorization: Bearer $NEXPATH_API_KEY" \\\n  -H "Content-Type: application/json" -d '{\n    "prompt": "Add password reset to the auth flow",\n    "policy": "acme-enterprise",\n    "version": "3",\n    "agent": "claude-code",\n    "context": { "repo": "acme/web", "branch": "feat/password-reset" }\n  }'\n`,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  const apiSnippet = (
    <>
      <span className="text-success">$</span> curl -X POST{" "}
      <span className="text-primary">{`{{PLACEHOLDER: API base URL}}`}</span>/v1/review{"\n"}
      {'  -H "Authorization: Bearer $NEXPATH_API_KEY" \n'}
      {'  -H "Content-Type: application/json" -d \'{\n'}
      {'    "prompt": "Add password reset to the auth flow",\n'}
      {'    "policy": "acme-enterprise",\n'}
      {'    "version": "3",\n'}
      {'    "agent": "claude-code",\n'}
      {'    "context": { "repo": "acme/web", "branch": "feat/password-reset" }\n'}
      {"  }'"}
    </>
  );

  return (
    <section className="border-b py-24" id="api">
      <div className="mx-auto max-w-7xl grid gap-12 px-5 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-8">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            {eyebrow}
          </span>
          <h2 className="mt-4 text-4xl font-extrabold leading-tight">{headline}</h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">{paragraph1}</p>
          <p className="mt-4 text-base leading-7 text-muted-foreground">{paragraph2}</p>
        </div>

        <div className="overflow-hidden rounded-lg border border-terminal-line bg-terminal-soft">
          <div className="flex items-center justify-between border-b border-terminal-line px-4 py-3">
            <span className="font-mono text-xs text-terminal-muted">nexpath api</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={copySnippet}
              className="text-terminal-muted hover:bg-terminal hover:text-terminal-foreground"
              aria-label={copied ? "Copied" : "Copy snippet"}
            >
              {copied ? <Check className="size-3.5" /> : <Clipboard className="size-3.5" />}
            </Button>
          </div>
          <pre className="overflow-x-auto p-5 leading-7 text-terminal-foreground font-mono text-xs">
            <code>{apiSnippet}</code>
          </pre>
        </div>
      </div>

      <div className="mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
        {strip.map((attr, i) => (
          <div key={i} className="bg-card p-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              {attr.eyebrow}
            </span>
            <h4 className="mt-3 text-lg font-bold">{attr.title}</h4>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{attr.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PromptApi;
