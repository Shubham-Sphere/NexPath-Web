import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().optional(),
});

export const Route = createFileRoute("/waitlist")({
  head: () => ({
    meta: [
      { title: "Join the NexPath Waitlist" },
      {
        name: "description",
        content:
          "Be first to hear about new NexPath releases, integrations, and early-access features.",
      },
    ],
  }),
  component: Waitlist,
});

function Waitlist() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", name: "" },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("waitlist").insert([
        {
          email: values.email,
          name: values.name || null,
        },
      ]);

      if (error) throw error;

      toast.success("You're on the waitlist! We'll be in touch soon.");
      form.reset();
    } catch (err: any) {
      if (err.code === "23505") {
        toast.error("This email is already on the waitlist.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border bg-success-soft px-3 py-1 font-mono text-xs font-medium text-accent-foreground">
            Early access
          </span>
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Join the NexPath waitlist
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Be first to hear about new NexPath releases, integrations, and early-access features.
          </p>
        </div>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 rounded-xl border bg-card p-6 shadow-sm"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Full name (optional)</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your name"
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Joining..." : "Join waitlist"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have access?{" "}
          <Link to="/" className="font-medium text-primary hover:underline">
            Go home
          </Link>
        </p>
      </div>
    </div>
  );
}
