import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { projects } from "../../../data/content";
import { useToast } from "../../../context/ToastContext";
import ProductArt from "../../../components/illustrations/ProductArt";

const ICONS = ["powerSystem", "panel", "waterHeater", "streetLight", "inverter", "battery"];

export default function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const existing = projects.find((p) => String(p.id) === id);

  const [form, setForm] = useState({
    name: existing?.name ?? "",
    location: existing?.location ?? "",
    category: existing?.category ?? "Residential Society",
    capacity: existing?.capacity ?? "",
    year: existing?.year ?? "2026",
    summary: existing?.summary ?? "",
    icon: "powerSystem",
    status: "Published",
  });

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const submit = (e) => {
    e.preventDefault();
    toast?.push(existing ? "Project updated successfully" : "Project created successfully");
    navigate("/admin/projects");
  };

  return (
    <div className="space-y-5">
      <Link to="/admin/projects" className="flex items-center gap-1.5 text-sm font-semibold text-primary-700"><ArrowLeft className="h-4 w-4" /> Back to Projects</Link>
      <h2 className="font-heading text-xl font-bold text-ink-900">{existing ? "Edit Project" : "Add New Project"}</h2>

      <form onSubmit={submit} className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
        <div className="card space-y-4 p-6">
          <div>
            <label className="label-field">Project Name</label>
            <input required value={form.name} onChange={(e) => update("name", e.target.value)} className="input-field" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label-field">Location</label>
              <input required value={form.location} onChange={(e) => update("location", e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="label-field">Capacity</label>
              <input required value={form.capacity} onChange={(e) => update("capacity", e.target.value)} className="input-field" placeholder="e.g. 120 kW" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label-field">Category</label>
              <select value={form.category} onChange={(e) => update("category", e.target.value)} className="input-field">
                <option>Residential Society</option>
                <option>Industrial</option>
                <option>Commercial</option>
                <option>Agricultural</option>
                <option>Hospitality</option>
                <option>Institutional</option>
                <option>Public Infrastructure</option>
              </select>
            </div>
            <div>
              <label className="label-field">Year</label>
              <input value={form.year} onChange={(e) => update("year", e.target.value)} className="input-field" />
            </div>
          </div>
          <div>
            <label className="label-field">Description</label>
            <textarea rows={4} value={form.summary} onChange={(e) => update("summary", e.target.value)} className="input-field resize-none" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="card space-y-4 p-6">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-ink-900/50">Project Image</h3>
            <div className="flex aspect-video items-center justify-center rounded-2xl bg-gradient-to-br from-ink-800 to-ink-900">
              <ProductArt icon={form.icon} tint="amber" className="h-16 w-16" />
            </div>
            <div className="grid grid-cols-6 gap-2">
              {ICONS.map((icon) => (
                <button key={icon} type="button" onClick={() => update("icon", icon)} className={`flex aspect-square items-center justify-center rounded-lg border-2 bg-sand-50 p-1 ${form.icon === icon ? "border-primary-700" : "border-transparent"}`}>
                  <ProductArt icon={icon} tint="green" className="h-full w-full" />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="label-field">Status</label>
            <select value={form.status} onChange={(e) => update("status", e.target.value)} className="input-field">
              <option>Draft</option>
              <option>Published</option>
            </select>
          </div>
          <button type="submit" className="btn-primary flex w-full justify-center"><Save className="h-4 w-4" /> {existing ? "Save Changes" : "Add Project"}</button>
        </div>
      </form>
    </div>
  );
}
