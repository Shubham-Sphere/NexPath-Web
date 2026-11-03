# NexPath Waitlist / Wishlist — Implementation Plan

## Goal
Add a dedicated waitlist/wishlist page to the Lovable-built NexPath website with its own database, replacing the current third-party LaunchList widget so you own the visitor data.

## Recommended database: Supabase (PostgreSQL)

| Option | Verdict |
|--------|---------|
| **Supabase** | ✅ Best + quickest. Free tier (500 MB DB), you own the data, instant setup, works with TanStack Start. |
| Supermemory | ❌ Not suitable. It's an AI memory layer, not a relational database. Bad for structured waitlist data (email, dedup, export, admin listing). |
| LaunchList (current) | You don't own the data; limited control/customization. |

## Your current stack (for context)
- Location: `Input/Curent NexPath website/`
- Framework: TanStack Start (React 19 + Vite + Tailwind CSS)
- Routing: TanStack Router (file-based, `src/routes/`)
- UI: shadcn/ui (Radix UI), React Hook Form + Zod, Sonner toasts

## Step 1 — Install dependency
Run inside the website folder:
```bash
cd "Input/Curent NexPath website"
npm install @supabase/supabase-js
```

## Step 2 — Environment variables
Create/edit `.env` in `Input/Curent Nex Path website/` (copy from `.env.example`):

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> Vite only exposes variables prefixed with `VITE_` to the browser.

## Step 3 — Supabase client library
Create `Input/Curent NexPath website/src/lib/supabase.ts`:

```ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Copy .env.example to .env and add your Supabase keys.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type WaitlistEntry = {
  id: string;
  email: string;
  name?: string;
  created_at: string;
};
```

## Step 4 — Database schema
Run this SQL in your Supabase project's SQL Editor:

```sql
create table waitlist (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  name text,
  created_at timestamptz default now()
);

alter table waitlist enable row level security;

create policy "Anyone can join the waitlist"
  on waitlist for insert
  to anon
  with check (true);

create policy "Anyone can view waitlist entries"
  on waitlist for select
  to anon
  using (true);
```

## Step 5 — Waitlist page route
Create `Input/Curent NexPath website/src/routes/waitlist.tsx`:

```tsx
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
```

## Step 6 — Add navigation link
In `Input/Curent NexPath website/src/routes/index.tsx`, add to the `navItems` array:

```tsx
const navItems: Array<{ label: string; href: string }> = [
  { label: "How it works", href: "#workflow" },
  { label: "Benchmark", href: "#benchmark" },
  { label: "Enterprise", href: "/enterprise" },
  { label: "Waitlist", href: "/waitlist" },   // <-- add this
  { label: "Privacy", href: "#privacy" },
];
```

## What you get
- ✅ Own PostgreSQL database (Supabase free tier)
- ✅ Dedicated `/waitlist` page
- ✅ Duplicate email protection (unique constraint)
- ✅ Client-side validation (Zod + React Hook Form)
- ✅ Toast feedback for success/errors (Sonner)
- ✅ No cost to start; scales as you grow

## Next steps after creating files
1. Create `.env` with your Supabase URL and anon key.
2. Run `npm install @supabase/supabase-js`.
3. Run the SQL schema in Supabase.
4. Create `src/lib/supabase.ts`, `src/routes/waitlist.tsx`, and add the nav link in `src/routes/index.tsx`.
5. `npm run dev` → visit `http://localhost:5173/waitlist`.
6. Deploy (Vercel / Netlify / Lovable GitHub sync) and add the env vars in your host dashboard.
