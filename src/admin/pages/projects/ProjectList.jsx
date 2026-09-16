import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { projects } from "../../../data/content";
import { PageHeader, ConfirmDialog, Th, Td } from "../../components/AdminUI";
import { StatusBadge } from "../../../components/ui/Badge";
import ProductArt from "../../../components/illustrations/ProductArt";

const ICONS = ["powerSystem", "panel", "waterHeater", "streetLight", "inverter", "battery"];

export default function ProjectList() {
  const [items, setItems] = useState(projects.map((p) => ({ ...p, status: "Published" })));
  const [toDelete, setToDelete] = useState(null);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Projects"
        description={`${items.length} showcased projects`}
        action={<Link to="/admin/projects/new" className="btn-primary btn-sm"><Plus className="h-4 w-4" /> Add Project</Link>}
      />

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-ink-900/8">
              <tr>
                <Th>Project</Th>
                <Th>Location</Th>
                <Th>Category</Th>
                <Th>Capacity</Th>
                <Th>Status</Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-900/6">
              {items.map((p, i) => (
                <tr key={p.id} className="hover:bg-sand-100/50">
                  <Td>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-sand-100">
                        <ProductArt icon={ICONS[i % ICONS.length]} tint="green" uid={`pr-${p.id}`} className="h-full w-full p-1" />
                      </div>
                      <span className="font-semibold text-ink-900">{p.name}</span>
                    </div>
                  </Td>
                  <Td>{p.location}</Td>
                  <Td>{p.category}</Td>
                  <Td>{p.capacity}</Td>
                  <Td><StatusBadge status={p.status} /></Td>
                  <Td className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/admin/projects/${p.id}`} className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-900/10 text-ink-900 hover:border-primary-700"><Pencil className="h-3.5 w-3.5" /></Link>
                      <button onClick={() => setToDelete(p)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-900/10 text-red-500 hover:border-red-300 hover:bg-red-50"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDialog open={!!toDelete} onClose={() => setToDelete(null)} onConfirm={() => setItems((prev) => prev.filter((p) => p.id !== toDelete.id))} title="Delete this project?" description={toDelete ? `"${toDelete.name}" will be removed from the public showcase.` : ""} />
    </div>
  );
}
