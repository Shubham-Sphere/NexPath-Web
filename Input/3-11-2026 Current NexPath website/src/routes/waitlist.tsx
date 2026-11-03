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
    body: "NexPath breaks the task into the right sub-prompts, runs them on the coding agent suited to the job, and keeps going — fixing and re-verifying until the result actually holds up.",
  },
  {
    icon: ShieldCheck,
    title: "Done means proven, not claimed",
    body: "NexPath checks whether the work actually works, not whether it merely looks right — turning any failure into a targeted fix, and re-verifying until the evidence backs the result.",
  },
  {
    icon: Timer,
    title: "Saves your time, never your control",
    body: "NexPath handles the routine watching so you're not babysitting every step, and brings you back the moment requirements, evidence, or consequences need a human decision.",
  },
  {
    icon: Sparkles,
    title: "More from the agent you already use",
    body: "NexPath helps you pick the right agent and workflow while you're active, and puts its spare capacity to work reviewing, testing, and verifying while you're away.",
  },
];

const steps = [
  {
    n: "01",
    title: "Write your prompt",
    body: "Write your prompt — even a quick one — and hand it to NexPath. It takes the task from there.",
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
    a: "No. NexPath doesn't generate code or replace your coding agent. It gives your task a better, more standard software-engineering process — breaking it down, running it on the agent you already use, and verifying the result with evidence before it's called done.",
  },
  {
    q: "Will NexPath replace my current agent or workflow?",
    a: "No. NexPath works with the agents and tools you already use — it enhances prompts, not your agent. You retain full control to inspect, edit, or discard suggestions, so your existing agent and workflow remain unchanged.",
  },
  {
    q: "What happens after joining the waitlist?",
    a: "You'll get product updates and an invitation when new access opens. Early members help shape a better, more standard software-engineering process — and get in first.",
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
