import { useState } from "react";
import { Camera } from "lucide-react";
import { currentUser } from "../../data/orders";
import { formatDate } from "../../lib/format";
import { useToast } from "../../context/ToastContext";

export default function Profile() {
  const toast = useToast();
  const [form, setForm] = useState({ name: currentUser.name, email: currentUser.email, phone: currentUser.phone });

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <div className="card p-7 sm:p-9">
      <h1 className="font-heading text-xl font-bold text-ink-900">Profile</h1>
      <p className="mt-1 text-sm text-ink-900/50">Member since {formatDate(currentUser.since)}</p>

      <div className="mt-7 flex items-center gap-5">
        <div className="relative">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-800 text-2xl font-bold text-sand-50">
            {form.name[0]}
          </span>
          <button className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-accent-500 text-ink-950 shadow-soft">
            <Camera className="h-4 w-4" />
          </button>
        </div>
        <div>
          <p className="font-heading text-base font-bold text-ink-900">{form.name}</p>
          <p className="text-sm text-ink-900/50">{form.email}</p>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast?.push("Profile updated successfully");
        }}
        className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2"
      >
        <div>
          <label className="label-field">Full Name</label>
          <input value={form.name} onChange={update("name")} className="input-field" />
        </div>
        <div>
          <label className="label-field">Phone Number</label>
          <input value={form.phone} onChange={update("phone")} className="input-field" />
        </div>
        <div className="sm:col-span-2">
          <label className="label-field">Email Address</label>
          <input value={form.email} onChange={update("email")} className="input-field" />
        </div>
        <div className="sm:col-span-2">
          <button type="submit" className="btn-primary">Save Changes</button>
        </div>
      </form>
    </div>
  );
}
