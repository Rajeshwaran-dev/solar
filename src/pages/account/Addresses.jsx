import { useState } from "react";
import { Plus, MapPin, Pencil, Trash2, Star } from "lucide-react";
import { addresses as initialAddresses } from "../../data/orders";
import Modal from "../../components/ui/Modal";
import { useToast } from "../../context/ToastContext";

export default function Addresses() {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const toast = useToast();

  const removeAddress = (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    toast?.push("Address removed", "info");
  };

  const openNew = () => {
    setEditing({ id: Date.now(), label: "", name: "", phone: "", line: "", city: "", state: "", pincode: "" });
    setOpen(true);
  };

  const saveAddress = (e) => {
    e.preventDefault();
    setAddresses((prev) => {
      const exists = prev.some((a) => a.id === editing.id);
      return exists ? prev.map((a) => (a.id === editing.id ? editing : a)) : [...prev, editing];
    });
    setOpen(false);
    toast?.push("Address saved");
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-medium text-ink-900">My Addresses</h1>
        <button onClick={openNew} className="btn-primary btn-sm"><Plus className="h-4 w-4" /> Add Address</button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {addresses.map((a) => (
          <div key={a.id} className="card p-5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-bold text-ink-900">
                <MapPin className="h-4 w-4 text-primary-700" /> {a.label}
              </span>
              {a.default && <span className="flex items-center gap-1 rounded-full bg-accent-100 px-2.5 py-1 text-[10px] font-bold text-accent-800"><Star className="h-3 w-3" fill="currentColor" /> Default</span>}
            </div>
            <p className="mt-3 text-sm font-semibold text-ink-900">{a.name}</p>
            <p className="text-sm text-ink-900/60">{a.line}, {a.city}, {a.state} {a.pincode}</p>
            <p className="mt-1 text-sm text-ink-900/60">{a.phone}</p>
            <div className="mt-4 flex gap-2 border-t border-ink-900/8 pt-4">
              <button onClick={() => { setEditing(a); setOpen(true); }} className="btn-outline btn-sm flex-1"><Pencil className="h-3.5 w-3.5" /> Edit</button>
              <button onClick={() => removeAddress(a.id)} className="flex items-center justify-center rounded-full border border-ink-900/12 px-4 text-red-500 transition hover:border-red-300 hover:bg-red-50">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} maxWidth="max-w-lg">
        {editing && (
          <form onSubmit={saveAddress} className="space-y-4">
            <h2 className="font-heading text-lg font-bold text-ink-900">{addresses.some((a) => a.id === editing.id) ? "Edit Address" : "Add Address"}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-field">Label</label>
                <input required value={editing.label} onChange={(e) => setEditing({ ...editing, label: e.target.value })} className="input-field" placeholder="Home / Office" />
              </div>
              <div>
                <label className="label-field">Full Name</label>
                <input required value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="input-field" />
              </div>
            </div>
            <div>
              <label className="label-field">Address Line</label>
              <input required value={editing.line} onChange={(e) => setEditing({ ...editing, line: e.target.value })} className="input-field" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <input required value={editing.city} onChange={(e) => setEditing({ ...editing, city: e.target.value })} className="input-field" placeholder="City" />
              <input required value={editing.state} onChange={(e) => setEditing({ ...editing, state: e.target.value })} className="input-field" placeholder="State" />
              <input required value={editing.pincode} onChange={(e) => setEditing({ ...editing, pincode: e.target.value })} className="input-field" placeholder="Pincode" />
            </div>
            <input required value={editing.phone} onChange={(e) => setEditing({ ...editing, phone: e.target.value })} className="input-field" placeholder="Phone Number" />
            <button type="submit" className="btn-primary w-full">Save Address</button>
          </form>
        )}
      </Modal>
    </div>
  );
}
