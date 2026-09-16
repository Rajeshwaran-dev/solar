import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Plus, X, Save } from "lucide-react";
import { getProductById } from "../../../data/products";

import { categories } from "../../../data/categories";
import ProductArt from "../../../components/illustrations/ProductArt";
import { useToast } from "../../../context/ToastContext";

const ICONS = ["waterHeater", "streetLight", "lantern", "powerSystem", "inverter", "panel", "battery", "accessory"];
const BADGES = ["New", "Featured", "Best Seller", "Sale"];

function emptyProduct() {
  return {
    name: "", brand: "Sol Green", category: categories[0].slug, icon: "waterHeater",
    price: "", mrp: "", stock: "in", warranty: "", short: "", description: "",
    features: [""], specs: [{ key: "", value: "" }], applications: [""], badges: [], status: "Active",
  };
}

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const existing = id ? getProductById(id) : null;

  const [form, setForm] = useState(() => {
    if (!existing) return emptyProduct();
    return {
      ...existing,
      price: String(existing.price),
      mrp: String(existing.mrp),
      features: existing.features?.length ? existing.features : [""],
      specs: Object.entries(existing.specs ?? {}).map(([key, value]) => ({ key, value })),
      applications: existing.applications?.length ? existing.applications : [""],
      status: "Active",
    };
  });

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));
  const updateList = (field, i, value) => setForm((f) => ({ ...f, [field]: f[field].map((v, idx) => (idx === i ? value : v)) }));
  const addListItem = (field, empty) => setForm((f) => ({ ...f, [field]: [...f[field], empty] }));
  const removeListItem = (field, i) => setForm((f) => ({ ...f, [field]: f[field].filter((_, idx) => idx !== i) }));
  const toggleBadge = (b) => setForm((f) => ({ ...f, badges: f.badges.includes(b) ? f.badges.filter((x) => x !== b) : [...f.badges, b] }));

  const submit = (e) => {
    e.preventDefault();
    toast?.push(existing ? "Product updated successfully" : "Product created successfully");
    navigate("/admin/products");
  };

  return (
    <div className="space-y-5">
      <Link to="/admin/products" className="flex items-center gap-1.5 text-sm font-semibold text-primary-700"><ArrowLeft className="h-4 w-4" /> Back to Products</Link>
      <h2 className="font-heading text-xl font-bold text-ink-900">{existing ? "Edit Product" : "Add New Product"}</h2>

      <form onSubmit={submit} className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <div className="card space-y-4 p-6">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-ink-900/50">Basic Information</h3>
            <div>
              <label className="label-field">Product Name</label>
              <input required value={form.name} onChange={(e) => update("name", e.target.value)} className="input-field" placeholder="e.g. SunFlow ETC 100 LPD Water Heater" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-field">Brand</label>
                <input value={form.brand} onChange={(e) => update("brand", e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="label-field">Category</label>
                <select value={form.category} onChange={(e) => update("category", e.target.value)} className="input-field">
                  {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="label-field">Short Description</label>
              <input value={form.short} onChange={(e) => update("short", e.target.value)} className="input-field" placeholder="One-line summary shown on product cards" />
            </div>
            <div>
              <label className="label-field">Full Description</label>
              <textarea rows={4} value={form.description} onChange={(e) => update("description", e.target.value)} className="input-field resize-none" />
            </div>
          </div>

          <div className="card space-y-4 p-6">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-ink-900/50">Pricing &amp; Stock</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="label-field">Price (₹)</label>
                <input required type="number" value={form.price} onChange={(e) => update("price", e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="label-field">MRP (₹)</label>
                <input type="number" value={form.mrp} onChange={(e) => update("mrp", e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="label-field">Stock Status</label>
                <select value={form.stock} onChange={(e) => update("stock", e.target.value)} className="input-field">
                  <option value="in">In Stock</option>
                  <option value="low">Low Stock</option>
                  <option value="out">Out of Stock</option>
                </select>
              </div>
            </div>
            <div>
              <label className="label-field">Warranty</label>
              <input value={form.warranty} onChange={(e) => update("warranty", e.target.value)} className="input-field" placeholder="e.g. 5 years on tank, 2 years on tubes" />
            </div>
          </div>

          <div className="card space-y-4 p-6">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-ink-900/50">Key Features</h3>
            {form.features.map((f, i) => (
              <div key={i} className="flex gap-2">
                <input value={f} onChange={(e) => updateList("features", i, e.target.value)} className="input-field" placeholder={`Feature ${i + 1}`} />
                <button type="button" onClick={() => removeListItem("features", i)} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-ink-900/10 text-red-500"><X className="h-4 w-4" /></button>
              </div>
            ))}
            <button type="button" onClick={() => addListItem("features", "")} className="flex items-center gap-1.5 text-sm font-semibold text-primary-700"><Plus className="h-4 w-4" /> Add Feature</button>
          </div>

          <div className="card space-y-4 p-6">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-ink-900/50">Specifications</h3>
            {form.specs.map((s, i) => (
              <div key={i} className="flex gap-2">
                <input value={s.key} onChange={(e) => updateList("specs", i, { ...s, key: e.target.value })} className="input-field" placeholder="Spec name" />
                <input value={s.value} onChange={(e) => updateList("specs", i, { ...s, value: e.target.value })} className="input-field" placeholder="Value" />
                <button type="button" onClick={() => removeListItem("specs", i)} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-ink-900/10 text-red-500"><X className="h-4 w-4" /></button>
              </div>
            ))}
            <button type="button" onClick={() => addListItem("specs", { key: "", value: "" })} className="flex items-center gap-1.5 text-sm font-semibold text-primary-700"><Plus className="h-4 w-4" /> Add Specification</button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card space-y-4 p-6">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-ink-900/50">Product Image</h3>
            <div className="flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br from-sand-100 to-sand-200">
              <ProductArt icon={form.icon} tint="green" uid="form-preview" className="h-2/3 w-2/3" />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {ICONS.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => update("icon", icon)}
                  className={`flex aspect-square items-center justify-center rounded-xl border-2 bg-sand-50 p-1.5 ${form.icon === icon ? "border-primary-700" : "border-transparent"}`}
                >
                  <ProductArt icon={icon} tint="green" className="h-full w-full" />
                </button>
              ))}
            </div>
          </div>

          <div className="card space-y-4 p-6">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-ink-900/50">Status &amp; Badges</h3>
            <div>
              <label className="label-field">Product Status</label>
              <select value={form.status} onChange={(e) => update("status", e.target.value)} className="input-field">
                <option>Active</option>
                <option>Draft</option>
                <option>Archived</option>
              </select>
            </div>
            <div>
              <label className="label-field">Badges</label>
              <div className="flex flex-wrap gap-2">
                {BADGES.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => toggleBadge(b)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${form.badges.includes(b) ? "border-primary-800 bg-primary-800 text-sand-50" : "border-ink-900/10 text-ink-900/60"}`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button type="submit" className="btn-primary flex w-full justify-center">
            <Save className="h-4 w-4" /> {existing ? "Save Changes" : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
