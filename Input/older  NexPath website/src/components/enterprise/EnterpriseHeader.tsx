import { Link } from "@tanstack/react-router";
import { ArrowRight, Menu, Sun, X } from "lucide-react";
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

export function EnterpriseHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = enterpriseData.navItems;

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link to="/" className="flex items-center gap-2" aria-label="Nexpath home">
          <span className="font-extrabold">Nexpath</span>
          <span className="hidden rounded-sm border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline">
            ENTERPRISE
          </span>
        </Link>
        <nav
          className="hidden items-center gap-6 text-sm font-medium text-muted-foreground lg:flex"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <a key={item.href} className="transition-colors hover:text-foreground" href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="hero" size="sm" asChild>
            <a href="#contact">
              Talk to sales <ArrowRight className="size-4" />
            </a>
          </Button>
          <ThemeToggle className="lg:hidden size-8" />
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {menuOpen && (
        <nav className="border-t bg-background px-5 py-4 lg:hidden" aria-label="Mobile navigation">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="rounded-md px-3 py-3 text-sm font-semibold hover:bg-muted"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={closeMenu}
              className="mt-2 rounded-md bg-primary px-3 py-3 text-center text-sm font-semibold text-primary-foreground"
            >
              Talk to sales <ArrowRight className="inline size-4" />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

export default EnterpriseHeader;
