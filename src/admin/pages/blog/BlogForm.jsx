import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { blogPosts } from "../../../data/content";
import { useToast } from "../../../context/ToastContext";
import ProductArt from "../../../components/illustrations/ProductArt";

const ICONS = ["waterHeater", "inverter", "panel", "accessory", "streetLight", "battery"];

export default function BlogForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const existing = blogPosts.find((p) => String(p.id) === id);

  const [form, setForm] = useState({
    title: existing?.title ?? "",
    category: existing?.category ?? "Buying Guide",
    excerpt: existing?.excerpt ?? "",
    body: existing?.content?.join("\n\n") ?? "",
    tags: "",
    icon: "waterHeater",
    status: existing ? "Published" : "Draft",
  });

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const submit = (e) => {
    e.preventDefault();
    toast?.push(existing ? "Article updated successfully" : "Article created successfully");
    navigate("/admin/blog");
  };

  return (
    <div className="space-y-5">
      <Link to="/admin/blog" className="flex items-center gap-1.5 text-sm font-semibold text-primary-700"><ArrowLeft className="h-4 w-4" /> Back to Blog</Link>
      <h2 className="font-heading text-xl font-bold text-ink-900">{existing ? "Edit Article" : "Add New Article"}</h2>

      <form onSubmit={submit} className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          <div className="card space-y-4 p-6">
            <div>
              <label className="label-field">Article Title</label>
              <input required value={form.title} onChange={(e) => update("title", e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="label-field">Excerpt</label>
              <textarea rows={2} value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} className="input-field resize-none" />
            </div>
            <div>
              <label className="label-field">Body</label>
              <textarea rows={12} value={form.body} onChange={(e) => update("body", e.target.value)} className="input-field resize-none font-mono text-xs" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card space-y-4 p-6">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-ink-900/50">Featured Image</h3>
            <div className="flex aspect-video items-center justify-center rounded-2xl bg-gradient-to-br from-sand-100 to-sand-200">
              <ProductArt icon={form.icon} tint="green" className="h-16 w-16" />
            </div>
            <div className="grid grid-cols-6 gap-2">
              {ICONS.map((icon) => (
                <button key={icon} type="button" onClick={() => update("icon", icon)} className={`flex aspect-square items-center justify-center rounded-lg border-2 bg-sand-50 p-1 ${form.icon === icon ? "border-primary-700" : "border-transparent"}`}>
                  <ProductArt icon={icon} tint="green" className="h-full w-full" />
                </button>
              ))}
            </div>
          </div>

          <div className="card space-y-4 p-6">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-ink-900/50">Organize</h3>
            <div>
              <label className="label-field">Category</label>
              <select value={form.category} onChange={(e) => update("category", e.target.value)} className="input-field">
                <option>Savings & ROI</option>
                <option>Buying Guide</option>
                <option>Maintenance</option>
                <option>Policy & Subsidy</option>
                <option>Case Study</option>
              </select>
            </div>
            <div>
              <label className="label-field">Tags (comma separated)</label>
              <input value={form.tags} onChange={(e) => update("tags", e.target.value)} className="input-field" placeholder="solar, savings, guide" />
            </div>
            <div>
              <label className="label-field">Status</label>
              <select value={form.status} onChange={(e) => update("status", e.target.value)} className="input-field">
                <option>Draft</option>
                <option>Published</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn-primary flex w-full justify-center"><Save className="h-4 w-4" /> {existing ? "Save Changes" : "Publish Article"}</button>
        </div>
      </form>
    </div>
  );
}
