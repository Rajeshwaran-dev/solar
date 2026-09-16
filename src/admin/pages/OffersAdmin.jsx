import { useState } from "react";
import { Plus, Pencil, Trash2, Tag } from "lucide-react";
import { offers as initialOffers } from "../../data/content";
import { PageHeader, ConfirmDialog } from "../components/AdminUI";
import { StatusBadge } from "../../components/ui/Badge";
import Modal from "../../components/ui/Modal";
import { useToast } from "../../context/ToastContext";

const TINT_BG = { sky: "from-sky-500 to-sky-700", green: "from-primary-600 to-primary-900", amber: "from-amber-400 to-amber-600" };

function emptyOffer() {
  return { id: Date.now(), title: "", subtitle: "", code: "", expiry: "", tint: "green", discount: "", status: "Active" };
}

export default function OffersAdmin() {
  const [offers, setOffers] = useState(initialOffers.map((o) => ({ ...o, status: "Active" })));
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const toast = useToast();

  const save = (e) => {
    e.preventDefault();
    setOffers((prev) => {
      const exists = prev.some((o) => o.id === editing.id);
      return exists ? prev.map((o) => (o.id === editing.id ? editing : o)) : [...prev, editing];
    });
    setOpen(false);
    toast?.push("Offer saved successfully");
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Offers"
        description={`${offers.length} promotional campaigns`}
        action={<button onClick={() => { setEditing(emptyOffer()); setOpen(true); }} className="btn-primary btn-sm"><Plus className="h-4 w-4" /> Add Offer</button>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {offers.map((o) => (
          <div key={o.id} className={`relative overflow-hidden rounded-3xl bg-gradient-to-br p-6 text-sand-50 ${TINT_BG[o.tint]}`}>
            <Tag className="h-6 w-6 text-white/85" />
            <p className="mt-4 font-display text-xl font-medium">{o.discount}</p>
            <h3 className="mt-1 font-heading text-base font-bold text-sand-50">{o.title}</h3>
            <p className="mt-1 text-xs text-white/70">{o.subtitle}</p>
            <div className="mt-4 flex items-center justify-between">
              <StatusBadge status={o.status} className="!bg-white/15 !text-white" />
              <div className="flex gap-1.5">
                <button onClick={() => { setEditing(o); setOpen(true); }} className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 hover:bg-white/25"><Pencil className="h-3.5 w-3.5" /></button>
                <button onClick={() => setToDelete(o)} className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 hover:bg-white/25"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} maxWidth="max-w-lg">
        {editing && (
          <form onSubmit={save} className="space-y-4">
            <h2 className="font-heading text-lg font-bold text-ink-900">{offers.some((o) => o.id === editing.id) ? "Edit Offer" : "Add Offer"}</h2>
            <div>
              <label className="label-field">Title</label>
              <input required value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="label-field">Subtitle</label>
              <input value={editing.subtitle} onChange={(e) => setEditing({ ...editing, subtitle: e.target.value })} className="input-field" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-field">Discount Label</label>
                <input value={editing.discount} onChange={(e) => setEditing({ ...editing, discount: e.target.value })} className="input-field" placeholder="e.g. 25% OFF" />
              </div>
              <div>
                <label className="label-field">Coupon Code</label>
                <input value={editing.code} onChange={(e) => setEditing({ ...editing, code: e.target.value.toUpperCase() })} className="input-field font-mono" />
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
                  <option>Inactive</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn-primary w-full">Save Offer</button>
          </form>
        )}
      </Modal>

      <ConfirmDialog open={!!toDelete} onClose={() => setToDelete(null)} onConfirm={() => setOffers((prev) => prev.filter((o) => o.id !== toDelete.id))} title="Delete this offer?" />
    </div>
  );
}
