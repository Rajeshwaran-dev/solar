import { useState } from "react";
import { useToast } from "../../context/ToastContext";

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 rounded-full transition ${checked ? "bg-primary-800" : "bg-sand-300"}`}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-soft transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  );
}

export default function Settings() {
  const toast = useToast();
  const [prefs, setPrefs] = useState({ orderUpdates: true, promotions: true, newsletter: false, sms: true });

  return (
    <div className="space-y-6">
      <div className="card p-7 sm:p-9">
        <h2 className="font-heading text-lg font-bold text-ink-900">Change Password</h2>
        <form
          onSubmit={(e) => { e.preventDefault(); toast?.push("Password updated successfully"); }}
          className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2"
        >
          <div className="sm:col-span-2">
            <label className="label-field">Current Password</label>
            <input type="password" className="input-field" placeholder="••••••••" />
          </div>
          <div>
            <label className="label-field">New Password</label>
            <input type="password" className="input-field" placeholder="••••••••" />
          </div>
          <div>
            <label className="label-field">Confirm New Password</label>
            <input type="password" className="input-field" placeholder="••••••••" />
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className="btn-primary">Update Password</button>
          </div>
        </form>
      </div>

      <div className="card p-7 sm:p-9">
        <h2 className="font-heading text-lg font-bold text-ink-900">Notification Preferences</h2>
        <div className="mt-5 divide-y divide-ink-900/6">
          {[
            { key: "orderUpdates", label: "Order Updates", desc: "Get notified about order status changes" },
            { key: "promotions", label: "Promotions & Offers", desc: "Receive alerts on discounts and sales" },
            { key: "newsletter", label: "Weekly Newsletter", desc: "Solar tips and product updates" },
            { key: "sms", label: "SMS Notifications", desc: "Delivery updates via text message" },
          ].map((row) => (
            <div key={row.key} className="flex items-center justify-between py-4">
              <div>
                <p className="text-sm font-semibold text-ink-900">{row.label}</p>
                <p className="text-xs text-ink-900/45">{row.desc}</p>
              </div>
              <Toggle checked={prefs[row.key]} onChange={(v) => setPrefs((p) => ({ ...p, [row.key]: v }))} />
            </div>
          ))}
        </div>
      </div>

      <div className="card border-red-100 p-7 sm:p-9">
        <h2 className="font-heading text-lg font-bold text-red-500">Danger Zone</h2>
        <p className="mt-2 text-sm text-ink-900/55">Permanently delete your account and all associated data.</p>
        <button className="mt-4 rounded-full border-2 border-red-200 px-6 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50">
          Delete Account
        </button>
      </div>
    </div>
  );
}
