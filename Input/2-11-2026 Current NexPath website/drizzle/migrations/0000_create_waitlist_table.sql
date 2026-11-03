CREATE TABLE public.waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  name text,
  joined_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX waitlist_email_unique ON public.waitlist (lower(email));

GRANT SELECT, INSERT, UPDATE, DELETE ON public.waitlist TO authenticated;
GRANT ALL ON public.waitlist TO service_role;
GRANT INSERT ON public.waitlist TO anon;

ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can join the waitlist"
  ON public.waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view their own waitlist entry"
  ON public.waitlist
  FOR SELECT
  TO authenticated
  USING (email = lower(auth.jwt() ->> 'email'));
