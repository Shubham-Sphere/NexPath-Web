import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Download, Pencil, Trash2, Columns3, RefreshCw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase, COLUMNS, toCsv, type Entry, type ColKey } from "@/lib/waitlist";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NexPath Waitlist Admin" },
      { name: "description", content: "Manage NexPath waitlist signups." },
      { property: "og:title", content: "NexPath Waitlist Admin" },
      { property: "og:description", content: "Manage NexPath waitlist signups." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [rows, setRows] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [visible, setVisible] = useState<Record<ColKey, boolean>>({
    email: true, name: true, joined_at: true,
  });
  const [editing, setEditing] = useState<Entry | null>(null);
  const [deleting, setDeleting] = useState<Entry | null>(null);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase.from("waitlist").select("*").order("joined_at", { ascending: false });
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    setRows((data ?? []) as Entry[]);
  }
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const s = q.toLowerCase();
    return rows.filter(
      (r) => !s || r.email.toLowerCase().includes(s) || (r.name ?? "").toLowerCase().includes(s),
    );
  }, [rows, q]);

  async function update(id: string, patch: Partial<Entry>) {
    const { error } = await supabase.from("waitlist").update(patch).eq("id", id);
    if (error) { toast.error(error.message); return false; }
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
    toast.success("Entry updated");
    return true;
  }

  async function remove(id: string) {
    const { error } = await supabase.from("waitlist").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    setRows((rs) => rs.filter((r) => r.id !== id));
    toast.success("Entry deleted");
  }

  function exportCsv() {
    const blob = new Blob([toCsv(filtered)], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `waitlist-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    toast.success(`Exported ${filtered.length} rows`);
  }

  const cols = COLUMNS.filter((c) => visible[c.key]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
          <div>
            <h1 className="font-display text-xl font-semibold tracking-tight">
              Nex<span className="text-primary">Path</span> Waitlist
            </h1>
            <p className="text-sm text-muted-foreground">Admin dashboard</p>
          </div>
          <div className="text-right">
            <div className="font-display text-3xl font-semibold text-primary">{rows.length}</div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Total signups</div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-4 px-4 py-6">
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search email or name…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline"><Columns3 /> Columns</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {COLUMNS.map((c) => (
                <DropdownMenuCheckboxItem
                  key={c.key}
                  checked={visible[c.key]}
                  onCheckedChange={(v) => setVisible((p) => ({ ...p, [c.key]: !!v }))}
                  onSelect={(e) => e.preventDefault()}
                >
                  {c.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="icon" onClick={load} aria-label="Refresh"><RefreshCw /></Button>
          <Button onClick={exportCsv}><Download /> Export CSV</Button>
        </div>

        <div className="overflow-hidden rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                {cols.map((c) => <TableHead key={c.key}>{c.label}</TableHead>)}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={cols.length + 1} className="py-10 text-center text-muted-foreground">Loading…</TableCell></TableRow>
              ) : filtered.length === 0 ? (
                <TableRow><TableCell colSpan={cols.length + 1} className="py-10 text-center text-muted-foreground">No entries found</TableCell></TableRow>
              ) : (
                filtered.map((r) => (
                  <TableRow key={r.id}>
                    {visible.email && <TableCell className="font-medium">{r.email}</TableCell>}
                    {visible.name && <TableCell>{r.name ?? "—"}</TableCell>}
                    {visible.joined_at && (
                      <TableCell className="whitespace-nowrap text-muted-foreground">
                        {r.joined_at ? new Date(r.joined_at).toLocaleString() : "—"}
                      </TableCell>
                    )}
                    <TableCell className="text-right whitespace-nowrap">
                      <Button variant="ghost" size="icon" onClick={() => setEditing(r)} aria-label="Edit"><Pencil /></Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleting(r)} aria-label="Delete" className="text-destructive"><Trash2 /></Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <p className="text-xs text-muted-foreground">Showing {filtered.length} of {rows.length}</p>
      </main>

      <EditDialog entry={editing} onClose={() => setEditing(null)} onSave={async (id, p) => { if (await update(id, p)) setEditing(null); }} />

      <AlertDialog open={!!deleting} onOpenChange={(o) => !o && setDeleting(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete entry?</AlertDialogTitle>
            <AlertDialogDescription>{deleting?.email} will be permanently removed.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => { if (deleting) remove(deleting.id); setDeleting(null); }}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function EditDialog({ entry, onClose, onSave }: {
  entry: Entry | null; onClose: () => void; onSave: (id: string, p: Partial<Entry>) => void;
}) {
  const [f, setF] = useState({ email: "", name: "" });
  useEffect(() => {
    if (entry) setF({ email: entry.email, name: entry.name ?? "" });
  }, [entry]);
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF((p) => ({ ...p, [k]: e.target.value }));

  return (
    <Dialog open={!!entry} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader><DialogTitle>Edit entry</DialogTitle></DialogHeader>
        <div className="grid gap-3">
          <div className="grid gap-1.5"><Label>Email</Label><Input value={f.email} onChange={set("email")} /></div>
          <div className="grid gap-1.5"><Label>Name</Label><Input value={f.name} onChange={set("name")} /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={() => entry && onSave(entry.id, {
            email: f.email.trim(), name: f.name || null,
          })}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
