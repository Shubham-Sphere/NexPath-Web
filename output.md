# Waitlist / Wishlist — Output

## Supabase SQL Schema (matches your CSV structure)

Run this in your Supabase SQL Editor:

```sql
create table waitlist (
  id uuid default gen_random_uuid() primary key,
  position integer,
  name text,
  email text unique not null,
  email_verified text default 'No',
  referred_by_id text,
  users_referred integer default 0,
  joined_at timestamptz default now(),
  referral_id text,
  delivery_status text default 'N/A',
  ip_address text,
  os text,
  os_version text,
  browser text,
  browser_version text,
  device_type text,
  region text,
  city text,
  country text,
  zip_code text,
  latitude double precision,
  longitude double precision,
  timezone text,
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

## Notes

- **All 22 CSV fields** are included so old and new data fit in one JSON/CSV structure.
- Fields you can't get from the website (IP, OS, device, location, etc.) will be **empty/null** for new signups — that's expected.
- `joined_at` defaults to `now()` but you can import your old CSV dates into it.
- `email` is unique — duplicate emails are blocked.

## Next step

Create `.env` with your Supabase keys:
```bash
cp .env.example .env
```
Then add:
```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```
