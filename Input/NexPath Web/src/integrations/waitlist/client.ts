import { createClient } from "@supabase/supabase-js";

// User's own Supabase project for waitlist signups (anon key is public by design).
const WAITLIST_SUPABASE_URL = "https://uyalymkupbkfbocznyfs.supabase.co";
const WAITLIST_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5YWx5bWt1cGJrZmJvY3pueWZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM2MTE1NDcsImV4cCI6MjEwOTE4NzU0N30.x00MCla3HHsAzWfzQPL0ubdJHO7tf5MzjZBg8kQeAZc";

export const waitlistDb = createClient(WAITLIST_SUPABASE_URL, WAITLIST_SUPABASE_ANON_KEY, {
  auth: { persistSession: false, autoRefreshToken: false, storageKey: "nexpath-waitlist" },
});
