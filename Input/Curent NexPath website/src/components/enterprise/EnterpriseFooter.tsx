import { Github } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { enterpriseData } from "./enterprise.data";

function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("nexpath-theme");
    const isDark = stored
      ? stored === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("nexpath-theme", next ? "dark" : "light");
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      onClick={toggleTheme}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? <Sun /> : <Moon />}
    </Button>
  );
}

function Moon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 3c4.71 0 8.5 3.79 8.5 8.5s-3.79 8.5-8.5 8.5a8.494 8.494 0 01-8.5-8.5c0-4.71 3.79-8.5 8.5-8.5z" />
    </svg>
  );
}

function Sun({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      className={className}
    >
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.6 12.6 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03M8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418m7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125M7.119 20.452H3.555V9h3.564zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
    </svg>
  );
}

export function EnterpriseFooter() {
  const { logline, columns, copyright, hackfest } = enterpriseData.footer;

  return (
    <footer className="border-t border-terminal-line bg-terminal text-terminal-muted">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2.8fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-terminal-foreground">Nexpath</span>
              <span className="hidden rounded-sm border px-1.5 py-0.5 font-mono text-[10px] text-terminal-foreground sm:inline">
                ENTERPRISE
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-6 text-terminal-muted">{logline}</p>
            <div className="mt-6 flex items-center gap-5">
              <a
                href="https://github.com/hi0001234d/nexpath"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nexpath on GitHub"
                title="GitHub"
                className="inline-flex size-8 items-center justify-center rounded-md transition-colors hover:bg-terminal-soft hover:text-terminal-foreground"
              >
                <Github className="size-4" />
              </a>
              <a
                href="https://discord.gg/Xg5aRWG5c"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nexpath Discord community"
                title="Discord"
                className="inline-flex size-8 items-center justify-center rounded-md transition-colors hover:bg-terminal-soft hover:text-terminal-foreground"
              >
                <DiscordIcon className="size-4" />
              </a>
              <a
                href="https://x.com/Nex_path"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nexpath on X"
                title="X"
                className="inline-flex size-8 items-center justify-center rounded-md transition-colors hover:bg-terminal-soft hover:text-terminal-foreground"
              >
                <XIcon className="size-4" />
              </a>
              <a
                href="https://www.linkedin.com/showcase/nex-path/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nexpath on LinkedIn"
                title="LinkedIn"
                className="inline-flex size-8 items-center justify-center rounded-md transition-colors hover:bg-terminal-soft hover:text-terminal-foreground"
              >
                <LinkedInIcon className="size-4" />
              </a>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {columns.map((column) => (
              <div key={column.heading}>
                <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-terminal-foreground">
                  {column.heading}
                </h4>
                <div className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="text-sm text-terminal-muted hover:text-terminal-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-terminal-line pt-6 text-xs sm:flex-row sm:justify-between">
          <p>{copyright}</p>
          <p>{hackfest}</p>
          <ThemeToggle className="size-8 text-terminal-muted hover:bg-terminal-soft hover:text-terminal-foreground" />
        </div>
      </div>
    </footer>
  );
}

export default EnterpriseFooter;
