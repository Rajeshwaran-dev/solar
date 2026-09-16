import { useState } from "react";
import { Plus, Pencil, Trash2, Ticket } from "lucide-react";
import { adminCoupons } from "../../data/admin";
import { PageHeader, ConfirmDialog, Th, Td } from "../components/AdminUI";
import { StatusBadge } from "../../components/ui/Badge";
import { EmptyState } from "../../components/ui/Misc";
import Modal from "../../components/ui/Modal";
import { useToast } from "../../context/ToastContext";

function emptyCoupon() {
  return { id: Date.now(), code: "", type: "Percentage", value: "", minOrder: 0, usage: 0, limit: 100, start: "", end: "", status: "Active" };
}

export default function Coupons() {
  const [coupons, setCoupons] = useState(adminCoupons);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const toast = useToast();

  const save = (e) => {
    e.preventDefault();
    setCoupons((prev) => {
      const exists = prev.some((c) => c.id === editing.id);
      return exists ? prev.map((c) => (c.id === editing.id ? editing : c)) : [...prev, editing];
    });
    setOpen(false);
    toast?.push("Coupon saved successfully");
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Coupons"
        description={`${coupons.length} discount codes`}
        action={<button onClick={() => { setEditing(emptyCoupon()); setOpen(true); }} className="btn-primary btn-sm"><Plus className="h-4 w-4" /> Add Coupon</button>}
      />

      <div className="card overflow-hidden">
        {coupons.length === 0 ? (
          <div className="p-6"><EmptyState icon={Ticket} title="No coupons yet" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-ink-900/8">
                <tr>
                  <Th>Code</Th>
                  <Th>Type</Th>
                  <Th>Value</Th>
                  <Th>Usage</Th>
                  <Th>Valid Until</Th>
                  <Th>Status</Th>
                  <Th className="text-right">Actions</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-900/6">
                {coupons.map((c) => (
                  <tr key={c.id} className="hover:bg-sand-100/50">
                    <Td className="font-mono font-bold text-ink-900">{c.code}</Td>
                    <Td>{c.type}</Td>
                    <Td className="font-semibold text-ink-900">{c.value}</Td>
                    <Td>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-sand-200">
                          <div className="h-full rounded-full bg-primary-700" style={{ width: `${Math.min(100, (c.usage / c.limit) * 100)}%` }} />
                        </div>
                        <span className="text-xs text-ink-900/50">{c.usage}/{c.limit}</span>
                      </div>
                    </Td>
                    <Td>{c.end}</Td>
                    <Td><StatusBadge status={c.status} /></Td>
                    <Td className="text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => { setEditing(c); setOpen(true); }} className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-900/10 text-ink-900 hover:border-primary-700"><Pencil className="h-3.5 w-3.5" /></button>
                        <button onClick={() => setToDelete(c)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-900/10 text-red-500 hover:border-red-300 hover:bg-red-50"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} maxWidth="max-w-lg">
        {editing && (
          <form onSubmit={save} className="space-y-4">
            <h2 className="font-heading text-lg font-bold text-ink-900">{coupons.some((c) => c.id === editing.id) ? "Edit Coupon" : "Add Coupon"}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-field">Coupon Code</label>
                <input required value={editing.code} onChange={(e) => setEditing({ ...editing, code: e.target.value.toUpperCase() })} className="input-field font-mono" />
              </div>
              <div>
                <label className="label-field">Type</label>
                <select value={editing.type} onChange={(e) => setEditing({ ...editing, type: e.target.value })} className="input-field">
                  <option>Percentage</option>
                  <option>Flat</option>
                  <option>Free Gift</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-field">Value</label>
                <input required value={editing.value} onChange={(e) => setEditing({ ...editing, value: e.target.value })} className="input-field" placeholder="e.g. 25% or ₹500" />
              </div>
              <div>
                <label className="label-field">Min Order (₹)</label>
                <input type="number" value={editing.minOrder} onChange={(e) => setEditing({ ...editing, minOrder: e.target.value })} className="input-field" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-field">Start Date</label>
                <input type="date" value={editing.start} onChange={(e) => setEditing({ ...editing, start: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="label-field">End Date</label>
                <input type="date" value={editing.end} onChange={(e) => setEditing({ ...editing, end: e.target.value })} className="input-field" />
              </div>
            </div>
            <div>
              <label className="label-field">Status</label>
              <select value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value })} className="input-field">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <button type="submit" className="btn-primary w-full">Save Coupon</button>
          </form>
        )}
      </Modal>

      <ConfirmDialog open={!!toDelete} onClose={() => setToDelete(null)} onConfirm={() => setCoupons((prev) => prev.filter((c) => c.id !== toDelete.id))} title="Delete this coupon?" description={toDelete ? `"${toDelete.code}" will no longer be usable at checkout.` : ""} />
    </div>
  );
}
