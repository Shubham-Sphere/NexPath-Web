import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env["VITE_SUPABASE_URL"] as string,
  import.meta.env["VITE_SUPABASE_ANON_KEY"] as string,
  { auth: { persistSession: false } },
);

export type Entry = {
  id: string;
  email: string;
  name: string | null;
  joined_at: string | null;
};

export const COLUMNS = [
  { key: "email", label: "Email" },
  { key: "name", label: "Name" },
  { key: "joined_at", label: "Joined" },
] as const;

export type ColKey = (typeof COLUMNS)[number]["key"];

export function toCsv(rows: Entry[]) {
  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const keys = COLUMNS.map((c) => c.key);
  return [keys.join(","), ...rows.map((r) => keys.map((k) => esc(r[k])).join(","))].join("\n");
}
