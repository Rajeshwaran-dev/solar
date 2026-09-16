import { useState } from "react";
import { Save } from "lucide-react";
import { PageHeader } from "../components/AdminUI";
import { useToast } from "../../context/ToastContext";

const TABS = ["General", "Company", "Contact", "Shipping", "Payment", "Notifications", "Social Media", "Website"];

function Toggle({ checked, onChange }) {
  return (
    <button type="button" onClick={() => onChange(!checked)} className={`relative h-6 w-11 rounded-full transition ${checked ? "bg-primary-800" : "bg-sand-300"}`}>
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-soft transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  );
}

export default function SettingsAdmin() {
  const [tab, setTab] = useState("General");
  const toast = useToast();
  const [notif, setNotif] = useState({ orders: true, lowStock: true, reviews: false, enquiries: true });

  const save = (e) => {
    e.preventDefault();
    toast?.push("Settings saved successfully");
  };

  return (
    <div className="space-y-5">
      <PageHeader title="Settings" description="Configure your store's global settings" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
        <div className="card h-fit p-2">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`block w-full rounded-xl px-4 py-2.5 text-left text-sm font-semibold ${tab === t ? "bg-primary-800 text-sand-50" : "text-ink-900/65 hover:bg-sand-100"}`}>
              {t}
            </button>
          ))}
        </div>

        <form onSubmit={save} className="card space-y-5 p-6 sm:p-8">
          {tab === "General" && (
            <>
              <h3 className="font-heading text-lg font-bold text-ink-900">General Settings</h3>
              <div><label className="label-field">Store Name</label><input defaultValue="Sol Green Solar" className="input-field" /></div>
              <div><label className="label-field">Store Tagline</label><input defaultValue="Power Your World, Naturally" className="input-field" /></div>
              <div><label className="label-field">Default Currency</label><select className="input-field"><option>INR (₹)</option><option>USD ($)</option></select></div>
              <div><label className="label-field">Timezone</label><select className="input-field"><option>Asia/Kolkata (IST)</option></select></div>
            </>
          )}

          {tab === "Company" && (
            <>
              <h3 className="font-heading text-lg font-bold text-ink-900">Company Details</h3>
              <div><label className="label-field">Brand Name</label><input defaultValue="Sol Green" className="input-field" /></div>
              <div><label className="label-field">Proprietor Name</label><input defaultValue="C. Prakash" className="input-field" /></div>
              <div><label className="label-field">Registered Address</label><textarea rows={3} defaultValue="Plot No. 3, 4th Right Cross Street, Saravana Nagar, Main Road, Paravai, Madurai – 625402" className="input-field resize-none" /></div>
            </>
          )}

          {tab === "Contact" && (
            <>
              <h3 className="font-heading text-lg font-bold text-ink-900">Contact Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="label-field">Support Phone</label><input defaultValue="+91 72000 82596" className="input-field" /></div>
                <div><label className="label-field">Support Email</label><input defaultValue="solgreensolar@yahoo.in" className="input-field" /></div>
              </div>
              <div><label className="label-field">WhatsApp Number</label><input defaultValue="+91 72000 82596" className="input-field" /></div>
              <div><label className="label-field">Business Hours</label><input defaultValue="Anytime" className="input-field" /></div>
            </>
          )}

          {tab === "Shipping" && (
            <>
              <h3 className="font-heading text-lg font-bold text-ink-900">Shipping Settings</h3>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="label-field">Free Shipping Threshold (₹)</label><input type="number" defaultValue={5000} className="input-field" /></div>
                <div><label className="label-field">Standard Shipping Fee (₹)</label><input type="number" defaultValue={199} className="input-field" /></div>
              </div>
              <div><label className="label-field">Delivery Zones</label><textarea rows={2} defaultValue="All India — 20+ states with installation support" className="input-field resize-none" /></div>
            </>
          )}

          {tab === "Payment" && (
            <>
              <h3 className="font-heading text-lg font-bold text-ink-900">Payment Methods</h3>
              {["Credit / Debit Card", "UPI", "Net Banking", "Cash on Delivery", "EMI Options"].map((m) => (
                <div key={m} className="flex items-center justify-between border-b border-ink-900/6 py-3 last:border-0">
                  <span className="text-sm font-semibold text-ink-900">{m}</span>
                  <Toggle checked={m !== "Cash on Delivery"} onChange={() => {}} />
                </div>
              ))}
            </>
          )}

          {tab === "Notifications" && (
            <>
              <h3 className="font-heading text-lg font-bold text-ink-900">Admin Notifications</h3>
              {[
                { key: "orders", label: "New Order Alerts" },
                { key: "lowStock", label: "Low Stock Warnings" },
                { key: "reviews", label: "New Review Notifications" },
                { key: "enquiries", label: "New Enquiry Alerts" },
              ].map((row) => (
                <div key={row.key} className="flex items-center justify-between border-b border-ink-900/6 py-3 last:border-0">
                  <span className="text-sm font-semibold text-ink-900">{row.label}</span>
                  <Toggle checked={notif[row.key]} onChange={(v) => setNotif((p) => ({ ...p, [row.key]: v }))} />
                </div>
              ))}
            </>
          )}

          {tab === "Social Media" && (
            <>
              <h3 className="font-heading text-lg font-bold text-ink-900">Social Media Links</h3>
              <div><label className="label-field">Facebook URL</label><input placeholder="https://facebook.com/solgreensolar" className="input-field" /></div>
              <div><label className="label-field">Instagram URL</label><input placeholder="https://instagram.com/solgreensolar" className="input-field" /></div>
              <div><label className="label-field">YouTube URL</label><input placeholder="https://youtube.com/@solgreensolar" className="input-field" /></div>
              <div><label className="label-field">LinkedIn URL</label><input placeholder="https://linkedin.com/company/solgreensolar" className="input-field" /></div>
            </>
          )}

          {tab === "Website" && (
            <>
              <h3 className="font-heading text-lg font-bold text-ink-900">Website Settings</h3>
              <div><label className="label-field">SEO Meta Title</label><input defaultValue="Sol Green Solar — Power Your World, Naturally" className="input-field" /></div>
              <div><label className="label-field">SEO Meta Description</label><textarea rows={3} defaultValue="Premium solar products and solutions — water heaters, street lights, inverters, power systems and more." className="input-field resize-none" /></div>
              <div className="flex items-center justify-between border-t border-ink-900/6 pt-4">
                <span className="text-sm font-semibold text-ink-900">Maintenance Mode</span>
                <Toggle checked={false} onChange={() => {}} />
              </div>
            </>
          )}

          <button type="submit" className="btn-primary"><Save className="h-4 w-4" /> Save Changes</button>
        </form>
      </div>
    </div>
  );
}
