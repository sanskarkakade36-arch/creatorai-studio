"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Mail, Phone, Building2, Star, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { getLeadNotes, addLeadNote, deleteLead } from "@/lib/supabase/leads";
import { STATUS_META } from "@/lib/leads/status";
import type { Lead, LeadNote } from "@/types/database";

interface LeadDetailDialogProps {
  lead: Lead | null;
  onOpenChange: (open: boolean) => void;
  orgId: string | null;
  userId: string | null;
  onDeleted: (leadId: string) => void;
}

export default function LeadDetailDialog({ lead, onOpenChange, orgId, userId, onDeleted }: LeadDetailDialogProps) {
  const [notes, setNotes] = useState<LeadNote[]>([]);
  const [newNote, setNewNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Remounted per-lead via `key` in LeadsView, so local state already starts
  // fresh — this effect only needs to fetch.
  useEffect(() => {
    if (!lead) return;
    const supabase = createClient();
    getLeadNotes(supabase, lead.id).then(setNotes);
  }, [lead]);

  if (!lead) return null;
  const statusMeta = STATUS_META[lead.status] ?? STATUS_META.new;

  const handleAddNote = async () => {
    if (!newNote.trim() || !orgId || !userId) return;
    setSaving(true);
    setError("");

    try {
      const supabase = createClient();
      const { note, error: noteError } = await addLeadNote(supabase, lead.id, orgId, newNote.trim(), userId);
      if (noteError || !note) {
        setError(noteError ?? "Couldn't save that note");
        return;
      }
      setNotes((prev) => [note, ...prev]);
      setNewNote("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't reach the server");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Delete ${lead.name || lead.email || "this lead"}?`)) return;
    const supabase = createClient();
    await deleteLead(supabase, lead.id);
    onDeleted(lead.id);
  };

  return (
    <Dialog.Root open={!!lead} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50" style={{ background: "rgba(0,0,0,0.6)" }} />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg rounded-2xl p-5 space-y-4 max-h-[85vh] overflow-y-auto"
          style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <Dialog.Title className="text-lg font-bold text-white">{lead.name || "Unnamed lead"}</Dialog.Title>
              {lead.company && (
                <p className="text-xs flex items-center gap-1.5 mt-0.5" style={{ color: "var(--text-muted)" }}>
                  <Building2 size={11} /> {lead.company}
                </p>
              )}
            </div>
            <Dialog.Close className="p-1 rounded-lg hover:bg-white/10">
              <X size={16} style={{ color: "var(--text-muted)" }} />
            </Dialog.Close>
          </div>

          <div className="flex flex-wrap gap-3 text-xs" style={{ color: "var(--text-secondary)" }}>
            {lead.email && <span className="flex items-center gap-1.5"><Mail size={11} /> {lead.email}</span>}
            {lead.phone && <span className="flex items-center gap-1.5"><Phone size={11} /> {lead.phone}</span>}
          </div>

          <div className="flex items-center gap-2 rounded-xl p-3" style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)" }}>
            <Star size={14} style={{ color: "#f59e0b" }} />
            <div className="min-w-0">
              <p className="text-sm font-bold text-white">AI Score: {lead.ai_score}/100</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>{lead.ai_score_reason}</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>Status</label>
            <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-bold" style={{ background: statusMeta.bg, color: statusMeta.color }}>
              {statusMeta.label}
            </span>
            <span className="text-xs ml-2" style={{ color: "var(--text-muted)" }}>Change it from the leads table</span>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>Notes</label>
            <div className="flex gap-2">
              <input
                className="input flex-1"
                placeholder="Add a note…"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleAddNote(); }}
              />
              <button onClick={handleAddNote} disabled={saving || !newNote.trim()} className="btn-secondary px-3">
                {saving ? <span className="spinner w-4 h-4" /> : "Add"}
              </button>
            </div>
            {error && <p className="text-xs" style={{ color: "#f87171" }}>{error}</p>}
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {notes.map((n) => (
                <div key={n.id} className="rounded-lg p-2.5 text-sm" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  <p style={{ color: "var(--text-secondary)" }}>{n.content}</p>
                  <p className="text-[10px] mt-1" style={{ color: "var(--text-muted)" }}>{new Date(n.created_at).toLocaleString()}</p>
                </div>
              ))}
              {notes.length === 0 && <p className="text-xs" style={{ color: "var(--text-muted)" }}>No notes yet.</p>}
            </div>
          </div>

          <button
            onClick={handleDelete}
            className="flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
            style={{ color: "#f87171" }}
          >
            <Trash2 size={13} /> Delete lead
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
