import { useState } from "react";
import { ClipboardList, Wrench, LifeBuoy, Ruler, HeartHandshake, Layers, Pencil } from "lucide-react";
import { PageHeader } from "../components/AdminUI";
import { StatusBadge } from "../../components/ui/Badge";
import Modal from "../../components/ui/Modal";
import { useToast } from "../../context/ToastContext";

const INITIAL = [
  { id: 1, icon: ClipboardList, title: "Solar Consultation", desc: "Free, no-obligation consultation to evaluate your energy usage and roof suitability.", status: "Active" },
  { id: 2, icon: Wrench, title: "Installation", desc: "Certified in-house technicians handle every install.", status: "Active" },
  { id: 3, icon: LifeBuoy, title: "Maintenance", desc: "Scheduled maintenance visits and performance diagnostics.", status: "Active" },
  { id: 4, icon: Ruler, title: "Project Planning", desc: "Full project lifecycle management for commercial & industrial clients.", status: "Active" },
  { id: 5, icon: HeartHandshake, title: "After-Sales Support", desc: "24/7 support hotline and warranty claim assistance.", status: "Active" },
  { id: 6, icon: Layers, title: "System Solutions", desc: "End-to-end design combining panels, inverters, batteries and monitoring.", status: "Active" },
];

export default function ServicesAdmin() {
  const [services, setServices] = useState(INITIAL);
  const [editing, setEditing] = useState(null);
  const toast = useToast();

  const save = (e) => {
    e.preventDefault();
    setServices((prev) => prev.map((s) => (s.id === editing.id ? editing : s)));
    setEditing(null);
    toast?.push("Service updated successfully");
  };

  return (
    <div className="space-y-5">
      <PageHeader title="Services" description="Manage the services listed on your public Services page" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div key={s.id} className="card p-5">
            <div className="flex items-start justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-800/8 text-primary-800"><s.icon className="h-5 w-5" /></span>
              <StatusBadge status={s.status} />
            </div>
            <h3 className="mt-3 font-heading text-base font-bold text-ink-900">{s.title}</h3>
            <p className="mt-1.5 line-clamp-2 text-xs text-ink-900/50">{s.desc}</p>
            <button onClick={() => setEditing(s)} className="btn-outline btn-sm mt-4 w-full"><Pencil className="h-3.5 w-3.5" /> Edit</button>
          </div>
        ))}
      </div>

      <Modal open={!!editing} onClose={() => setEditing(null)} maxWidth="max-w-lg">
        {editing && (
          <form onSubmit={save} className="space-y-4">
            <h2 className="font-heading text-lg font-bold text-ink-900">Edit Service</h2>
            <div>
              <label className="label-field">Title</label>
              <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="label-field">Description</label>
              <textarea rows={3} value={editing.desc} onChange={(e) => setEditing({ ...editing, desc: e.target.value })} className="input-field resize-none" />
            </div>
            <div>
              <label className="label-field">Status</label>
              <select value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value })} className="input-field">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <button type="submit" className="btn-primary w-full">Save Service</button>
          </form>
        )}
      </Modal>
    </div>
  );
}
