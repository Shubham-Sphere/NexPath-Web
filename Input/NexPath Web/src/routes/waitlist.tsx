import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Zap,
  ShieldCheck,
  Timer,
  Sparkles,
  Terminal,
  ArrowDown,
  Check,
} from "lucide-react";

import { waitlistDb } from "@/integrations/waitlist/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { PartyPopper } from "lucide-react";

const waitlistSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  name: z
    .string()
    .trim()
    .max(100, "Name must be less than 100 characters")
    .optional(),
});

type WaitlistValues = z.infer<typeof waitlistSchema>;

const features = [
  {
    icon: Zap,
    title: "Give it the task, not just a prompt",
    body: "NexPath breaks the task into the right sub-prompts, runs them on the coding agent suited to the job, and keeps going, fixing and re-verifying until the result actually holds up.",
  },
  {
    icon: ShieldCheck,
    title: "Done means proven, not claimed",
    body: "NexPath checks whether the work actually works, not whether it merely looks right, turning any failure into a targeted fix, and re-verifying until the evidence backs the result.",
  },
  {
    icon: Timer,
    title: "Saves your time, never your control",
    body: "NexPath handles the routine watching so you're not babysitting every step, and brings you back the moment requirements, evidence, or consequences need a human decision.",
  },
  {
    icon: Sparkles,
    title: "More work from the coding agent you already use",
    body: "NexPath helps you pick the right agent and workflow while you're active, and puts its spare capacity to work reviewing, testing, and verifying while you're away.",
  },
];

const steps = [
  {
    n: "01",
    title: "Write your prompt",
    body: "Write your prompt, even a quick one, and hand it to NexPath. It takes the task from there.",
  },
  {
    n: "02",
    title: "NexPath carries the task",
    body: "It runs the work on the coding agent you already use, verifies the result with real evidence, and fixes and re-checks until it holds up. Swap the agent anytime.",
  },
  {
    n: "03",
    title: "You decide when it matters",
    body: "NexPath brings you back the moment requirements, evidence, or consequences need a human call, and you always see what shipped and why.",
  },
];

const faqs = [
  {
    q: "Is NexPath another AI coding agent?",
    a: "No. NexPath doesn't generate code or replace your coding agent. It gives your task a better, more standard software-engineering process breaking it down, running it on the agent you already use, and verifying the result with evidence before it's called done.",
  },
  {
    q: "Will NexPath replace my current agent or workflow?",
    a: "No. NexPath fits directly into the workflow and tools you already use. Your original prompt remains visible, you retain full control over what gets sent, and you review all changes before shipping.",
  },
  {
    q: "What happens after joining the waitlist?",
    a: "You'll get an email as soon as the feature launches, so you can install NexPath and try it for yourself.",
  },
];

export const Route = createFileRoute("/waitlist")({
  head: () => ({
    meta: [
      { title: "Join the Nexpath waitlist" },
      {
        name: "description",
        content:
          "NexPath is the human-in-the-loop layer for your coding-agent workflow. Join the early-access waitlist.",
      },
      { property: "og:title", content: "Join the Nexpath waitlist" },
      {
        property: "og:description",
        content:
          "Give it the task. Get proof it works. Join the NexPath early-access waitlist.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: WaitlistPage,
});

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
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

function WaitlistPage() {
  const [joinedOpen, setJoinedOpen] = useState(false);
  const form = useForm<WaitlistValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: { email: "", name: "" },
  });

  async function onSubmit(values: WaitlistValues) {
    try {
      const { error } = await waitlistDb.from("waitlist").insert({
        email: values.email.toLowerCase(),
        name: values.name?.trim() ? values.name.trim() : null,
      });

      if (error) {
        if (error.code === "23505") {
          toast.info("You're already on the waitlist.");
          return;
        }
        console.error(error);
        toast.error("Something went wrong. Please try again.");
        return;
      }

      setJoinedOpen(true);
      form.reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link to="/" className="flex items-center gap-2" aria-label="Nexpath home">
            <span className="font-extrabold">Nexpath</span>
            <span className="hidden rounded-sm border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline">
              CLI
            </span>
          </Link>
          <Button variant="outline" size="sm" asChild>
            <Link to="/">Back to home</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="page-grid border-b">
          <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:py-28 lg:px-8">
            <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 font-mono text-[11px] font-medium text-primary">
              <Terminal className="size-3" />
              Early access
            </span>
            <h1 className="mt-6 text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Give it the task. Get proof it works.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground">
              NexPath is the human-in-the-loop layer for your coding-agent
              workflow. Give it the task, and it carries the work through
              execution and verification to an evidence-backed result. Join the
              early-access waitlist.
            </p>
            <div className="mt-8">
              <Button variant="hero" size="lg" asChild>
                <a href="#join">
                  Join the waitlist
                  <ArrowDown />
                </a>
              </Button>
            </div>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-1.5">
                <Check className="size-4 text-primary" />
                Works with your current agent
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="size-4 text-primary" />
                You approve every result
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="size-4 text-primary" />
                Free during early access
              </li>
            </ul>
          </div>
        </section>

        {/* Features */}
        <section className="border-b py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-5 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-block rounded-full border bg-card px-3 py-1 font-mono text-[11px] font-medium text-primary">
                Features
              </span>
              <h2 className="mt-4 text-balance text-3xl font-extrabold leading-tight sm:text-4xl">
                Built for developers who ship
              </h2>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="rounded-lg border bg-card p-6 shadow-sm transition-colors hover:border-primary/40"
                >
                  <div className="flex size-10 items-center justify-center rounded-md border bg-accent text-accent-foreground">
                    <f.icon className="size-5" />
                  </div>
                  <h3 className="mt-4 text-base font-bold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {f.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-b py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-5 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-block rounded-full border bg-card px-3 py-1 font-mono text-[11px] font-medium text-primary">
                How it works
              </span>
              <h2 className="mt-4 text-balance text-3xl font-extrabold leading-tight sm:text-4xl">
                Three steps to a proven result
              </h2>
            </div>
            <div className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-6">
              {steps.map((s) => (
                <div key={s.n} className="text-center">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-full border-2 border-primary bg-accent font-mono text-sm font-bold text-accent-foreground">
                    {s.n}
                  </div>
                  <h3 className="mt-4 text-base font-bold">{s.title}</h3>
                  <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b py-16 sm:py-24">
          <div className="mx-auto max-w-2xl px-5 lg:px-8">
            <div className="text-center">
              <span className="inline-block rounded-full border bg-card px-3 py-1 font-mono text-[11px] font-medium text-primary">
                FAQ
              </span>
              <h2 className="mt-4 text-balance text-3xl font-extrabold leading-tight sm:text-4xl">
                Frequently asked questions
              </h2>
            </div>
            <Accordion type="single" collapsible className="mt-10">
              {faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-sm font-semibold">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-6 text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Join form */}
        <section id="join" className="scroll-mt-20 py-16 sm:py-24">
          <div className="mx-auto max-w-xl px-5 lg:px-8">
            <div className="text-center">
              <h2 className="text-balance text-3xl font-extrabold leading-tight">
                Join the NexPath waitlist
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Get product updates and a chance to help shape a better, more
                standard software-engineering process.
              </p>
            </div>
            <div className="mt-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                  noValidate
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                            maxLength={255}
                            className="h-12 text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Name{" "}
                          <span className="font-normal text-muted-foreground">
                            (optional)
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Your name"
                            autoComplete="name"
                            maxLength={100}
                            className="h-12 text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? "Joining…" : "Sign up"}
                  </Button>
                </form>
              </Form>
              <div className="mt-6 flex items-center justify-center gap-4">
                <a
                  href="https://x.com/Nex_path"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="NexPath on X"
                  title="X"
                  className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <XIcon className="size-4" />
                </a>
                <a
                  href="https://discord.com/invite/za6JPBHrkV"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="NexPath Discord community"
                  title="Discord"
                  className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <DiscordIcon className="size-5" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 text-sm text-muted-foreground sm:flex-row lg:px-8">
          <span>© {new Date().getFullYear()} Nexpath</span>
          <Link to="/" className="hover:text-foreground">
            Back to homepage
          </Link>
        </div>
      </footer>

      <Dialog
        open={joinedOpen}
        onOpenChange={(open) => {
          setJoinedOpen(open);
          if (!open) {
            document
              .getElementById("join")
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }}
      >
        <DialogContent className="max-w-md rounded-lg border bg-card p-8 text-center shadow-lg sm:p-10">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full border-2 border-primary bg-accent">
            <PartyPopper className="size-6 text-primary" aria-hidden />
          </div>
          <DialogTitle className="mt-5 text-balance text-2xl font-extrabold tracking-tight">
            You're on the waitlist! 🎉
          </DialogTitle>
          <DialogDescription className="mt-2 text-sm leading-6 text-muted-foreground">
            Thanks for joining NexPath early access. We'll email you with
            product updates and your invitation as soon as new spots open.
          </DialogDescription>
          <Button
            variant="hero"
            size="lg"
            className="mt-6 w-full"
            onClick={() => setJoinedOpen(false)}
          >
            Back to the page
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
