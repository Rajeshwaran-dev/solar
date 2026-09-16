import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { categories as initialCategories } from "../../../data/categories";
import { PageHeader, ConfirmDialog } from "../../components/AdminUI";
import { StatusBadge } from "../../../components/ui/Badge";
import Modal from "../../../components/ui/Modal";
import ProductArt from "../../../components/illustrations/ProductArt";
import { useToast } from "../../../context/ToastContext";
import { slugify } from "../../../lib/format";

const ICONS = ["waterHeater", "streetLight", "lantern", "powerSystem", "inverter", "panel", "battery", "accessory"];

export default function CategoryList() {
  const [categories, setCategories] = useState(initialCategories.map((c) => ({ ...c, status: "Active" })));
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const toast = useToast();

  const openNew = () => {
    setEditing({ id: Date.now(), name: "", tagline: "", description: "", icon: "waterHeater", productCount: 0, status: "Active" });
    setOpen(true);
  };

  const save = (e) => {
    e.preventDefault();
    const withSlug = { ...editing, slug: editing.slug ?? slugify(editing.name) };
    setCategories((prev) => {
      const exists = prev.some((c) => c.id === withSlug.id);
      return exists ? prev.map((c) => (c.id === withSlug.id ? withSlug : c)) : [...prev, withSlug];
    });
    setOpen(false);
    toast?.push("Category saved successfully");
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Categories"
        description={`${categories.length} product categories`}
        action={<button onClick={openNew} className="btn-primary btn-sm"><Plus className="h-4 w-4" /> Add Category</button>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <div key={c.id} className="card p-5">
            <div className="flex items-start justify-between">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sand-100">
                <ProductArt icon={c.icon} tint="green" className="h-11 w-11" />
              </div>
              <StatusBadge status={c.status} />
            </div>
            <h3 className="mt-3 font-heading text-base font-bold text-ink-900">{c.name}</h3>
            <p className="mt-1 line-clamp-2 text-xs text-ink-900/50">{c.description}</p>
            <p className="mt-3 text-xs font-semibold text-primary-700">{c.productCount} Products</p>
            <div className="mt-4 flex gap-2 border-t border-ink-900/8 pt-4">
              <button onClick={() => { setEditing(c); setOpen(true); }} className="btn-outline btn-sm flex-1"><Pencil className="h-3.5 w-3.5" /> Edit</button>
              <button onClick={() => setToDelete(c)} className="flex items-center justify-center rounded-full border border-ink-900/12 px-4 text-red-500 hover:border-red-300 hover:bg-red-50">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} maxWidth="max-w-lg">
        {editing && (
          <form onSubmit={save} className="space-y-4">
            <h2 className="font-heading text-lg font-bold text-ink-900">{categories.some((c) => c.id === editing.id) ? "Edit Category" : "Add Category"}</h2>
            <div>
              <label className="label-field">Category Name</label>
              <input required value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="label-field">Tagline</label>
              <input value={editing.tagline} onChange={(e) => setEditing({ ...editing, tagline: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="label-field">Description</label>
              <textarea rows={3} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="input-field resize-none" />
            </div>
            <div>
              <label className="label-field">Icon</label>
              <div className="grid grid-cols-8 gap-2">
                {ICONS.map((icon) => (
                  <button key={icon} type="button" onClick={() => setEditing({ ...editing, icon })} className={`flex aspect-square items-center justify-center rounded-lg border-2 p-1 ${editing.icon === icon ? "border-primary-700" : "border-transparent bg-sand-100"}`}>
                    <ProductArt icon={icon} tint="green" className="h-full w-full" />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="label-field">Status</label>
              <select value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value })} className="input-field">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <button type="submit" className="btn-primary w-full">Save Category</button>
          </form>
        )}
      </Modal>

      <ConfirmDialog
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={() => setCategories((prev) => prev.filter((c) => c.id !== toDelete.id))}
        title="Delete this category?"
        description={toDelete ? `"${toDelete.name}" and its association with products will be removed.` : ""}
      />
    </div>
  );
}
