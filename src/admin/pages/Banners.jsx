import { useState } from "react";
import { Plus, Pencil, Trash2, Image as ImageIcon } from "lucide-react";
import { adminBanners } from "../../data/admin";
import { PageHeader, ConfirmDialog } from "../components/AdminUI";
import { StatusBadge } from "../../components/ui/Badge";
import Modal from "../../components/ui/Modal";
import { OrbGlow } from "../../components/illustrations/Decorative";
import { useToast } from "../../context/ToastContext";

const TINT_BG = { sky: "from-sky-400 to-sky-600", green: "from-primary-700 to-primary-900", amber: "from-amber-400 to-amber-600" };

function emptyBanner() {
  return { id: Date.now(), title: "", placement: "Homepage Hero", tint: "green", status: "Active", startDate: "", endDate: "" };
}

export default function Banners() {
  const [banners, setBanners] = useState(adminBanners);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const toast = useToast();

  const save = (e) => {
    e.preventDefault();
    setBanners((prev) => {
      const exists = prev.some((b) => b.id === editing.id);
      return exists ? prev.map((b) => (b.id === editing.id ? editing : b)) : [...prev, editing];
    });
    setOpen(false);
    toast?.push("Banner saved successfully");
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Banners"
        description="Manage homepage, category and promotional banners"
        action={<button onClick={() => { setEditing(emptyBanner()); setOpen(true); }} className="btn-primary btn-sm"><Plus className="h-4 w-4" /> Add Banner</button>}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {banners.map((b) => (
          <div key={b.id} className="card overflow-hidden">
            <div className={`relative flex h-32 items-center justify-center overflow-hidden bg-gradient-to-br p-6 text-sand-50 ${TINT_BG[b.tint]}`}>
              <OrbGlow className="right-2 top-2 h-20 w-20" />
              <p className="relative font-heading text-lg font-bold">{b.title}</p>
            </div>
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-semibold text-ink-900">{b.placement}</p>
                <p className="text-xs text-ink-900/45">{b.startDate} → {b.endDate}</p>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={b.status} />
                <button onClick={() => { setEditing(b); setOpen(true); }} className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-900/10 text-ink-900 hover:border-primary-700"><Pencil className="h-3.5 w-3.5" /></button>
                <button onClick={() => setToDelete(b)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-900/10 text-red-500 hover:border-red-300 hover:bg-red-50"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          </div>
        ))}
        {banners.length === 0 && (
          <div className="col-span-full flex flex-col items-center rounded-3xl border border-dashed border-ink-900/12 py-16 text-center">
            <ImageIcon className="h-8 w-8 text-ink-900/30" />
            <p className="mt-3 text-sm text-ink-900/50">No banners yet</p>
          </div>
        )}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} maxWidth="max-w-lg">
        {editing && (
          <form onSubmit={save} className="space-y-4">
            <h2 className="font-heading text-lg font-bold text-ink-900">{banners.some((b) => b.id === editing.id) ? "Edit Banner" : "Add Banner"}</h2>
            <div>
              <label className="label-field">Banner Title</label>
              <input required value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="label-field">Placement</label>
              <select value={editing.placement} onChange={(e) => setEditing({ ...editing, placement: e.target.value })} className="input-field">
                <option>Homepage Hero</option>
                <option>Offers Page Top</option>
                <option>Category Page</option>
                <option>Product Page</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-field">Start Date</label>
                <input type="date" value={editing.startDate} onChange={(e) => setEditing({ ...editing, startDate: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="label-field">End Date</label>
                <input type="date" value={editing.endDate} onChange={(e) => setEditing({ ...editing, endDate: e.target.value })} className="input-field" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-field">Color Theme</label>
                <select value={editing.tint} onChange={(e) => setEditing({ ...editing, tint: e.target.value })} className="input-field">
                  <option value="green">Green</option>
                  <option value="sky">Sky</option>
                  <option value="amber">Amber</option>
                </select>
              </div>
              <div>
                <label className="label-field">Status</label>
                <select value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value })} className="input-field">
                  <option>Active</option>
                  <option>Scheduled</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn-primary w-full">Save Banner</button>
          </form>
        )}
      </Modal>

      <ConfirmDialog open={!!toDelete} onClose={() => setToDelete(null)} onConfirm={() => setBanners((prev) => prev.filter((b) => b.id !== toDelete.id))} title="Delete this banner?" />
    </div>
  );
}
