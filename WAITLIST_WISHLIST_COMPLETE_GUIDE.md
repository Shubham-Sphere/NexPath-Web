# NexPath Waitlist / Wishlist — Complete Guide

This single file contains everything you need to add a waitlist/wishlist page with its own database to your Lovable-built NexPath website.

---

## Recommendation: Supabase (PostgreSQL)

| Option | Verdict |
|--------|---------|
| **Supabase** | ✅ Best + quickest. Free tier (500 MB DB), you own the data, instant setup, works with TanStack Start. |
| Supermemory | ❌ Not suitable. It's an AI memory layer, not a relational database. Bad for structured waitlist data. |
| LaunchList (current) | You don't own the data; limited control/customization. |

---

## Your current stack

- Location: `Input/Curent Nex Path website/`
- Framework: TanStack Start (React 19 + Vite + Tailwind CSS)
- Routing: TanStack Router (file-based, `src/routes/`)
- UI: shadcn/ui (Radix UI), React Hook Form + Zod, Sonner toasts
- Node version: v20.20.0 (Supabase install works fine despite engine warnings)

---

## Step 1: Install the Supabase client

Run inside the website folder:

```bash
cd "Input/Curent Nex Path website"
npm install @supabase/supabase-js
```

> Already installed successfully in your project. The npm warnings about Node engine are harmless and can be ignored.

---

## Step 2: Environment variables

Create/edit `.env` in `Input/Curent Nex Path website/` (copy from `.env.example`):

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these values from your Supabase project: Settings → API → Project URL and anon public key.

> Vite only exposes variables prefixed with `VITE_` to the browser.

---

## Step 3: Supabase client library

File: `Input/Curent Nex Path website/src/lib/supabase.ts` (already created)

```ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env["VITE_SUPABASE_URL"];
const supabaseAnonKey = import.meta.env["VITE_SUPABASE_ANON_KEY"];

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

---

## Step 4: Database schema

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

This creates:
- A `waitlist` table with id, email (unique), name, and created_at
- Row Level Security enabled
- A policy allowing anyone to insert (join the waitlist)
- A policy allowing anyone to read entries

---

## Step 5: Waitlist page route

File: `Input/Curent Nex Path website/src/routes/waitlist.tsx` (already created)

This creates a dedicated `/waitlist` page with:
- Email (required) + name (optional) form
- Zod + React Hook Form validation
- Supabase insert on submit
- Duplicate email detection (shows "already on waitlist")
- Sonner toast success/error feedback
- Link back to home

---

## Step 6: Add navigation link

File: `Input/Curent Nex Path website/src/routes/index.tsx` (already edited)

Added to the `navItems` array:

```tsx
{ label: "Waitlist", href: "/waitlist" },
```

---

## Step 7: Register the route in TanStack Router

File: `Input/Curent Nex Path website/src/routeTree.gen.ts` (already edited)

The `/waitlist` route was added to the generated route tree so TypeScript recognizes the route path.

---

## What was changed in your project (summary)

### New files created:
1. `Input/Curent Nex Path website/src/lib/supabase.ts` — Supabase client
2. `Input/Curent Nex Path website/src/routes/waitlist.tsx` — Waitlist page

### Files edited:
3. `Input/Curent Nex Path website/src/routes/index.tsx` — Added Waitlist nav link
4. `Input/Curent Nex Path website/src/routeTree.gen.ts` — Registered /waitlist route

### TypeScript check:
- `npx tsc --noEmit` passes with **zero errors**.

---

## Next steps (do these in order)

1. **Create `.env`** in `Input/Curent Nex Path website/` with your Supabase URL and anon key.
2. **Run the SQL schema** above in your Supabase SQL Editor.
3. **Start the dev server**:
   ```bash
   cd "Input/Curent Nex Path website"
   npm run dev
   ```
4. **Visit**: `http://localhost:5173/waitlist`
5. **Deploy** — add the env vars in your hosting dashboard (Vercel / Netlify / Lovable GitHub sync).

---

## What you get

- ✅ Own PostgreSQL database (Supabase free tier)
- ✅ Dedicated `/waitlist` page
- ✅ Duplicate email protection (unique constraint)
- ✅ Client-side validation (Zod + React Hook Form)
- ✅ Toast feedback for success/errors (Sonner)
- ✅ No cost to start; scales as you grow
