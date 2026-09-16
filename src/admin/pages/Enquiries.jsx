import { useState } from "react";
import { Mail, Phone, Calendar, Inbox } from "lucide-react";
import { adminEnquiries } from "../../data/admin";
import { formatDate } from "../../lib/format";
import { PageHeader, SearchInput } from "../components/AdminUI";
import { StatusBadge } from "../../components/ui/Badge";
import { EmptyState } from "../../components/ui/Misc";

const STATUSES = ["All", "New", "In Progress", "Resolved"];

export default function Enquiries() {
  const [enquiries, setEnquiries] = useState(adminEnquiries);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(adminEnquiries[0] ?? null);

  const updateStatus = (id, status) => {
    setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
    if (selected?.id === id) setSelected((s) => ({ ...s, status }));
  };

  const filtered = enquiries
    .filter((e) => filter === "All" || e.status === filter)
    .filter((e) => `${e.customer} ${e.product}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-5">
      <PageHeader title="Enquiries" description={`${enquiries.filter((e) => e.status === "New").length} new enquiries`} />

      <div className="card flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <SearchInput value={query} onChange={setQuery} placeholder="Search enquiries…" className="flex-1" />
        <div className="flex flex-wrap gap-2">
          {STATUSES.map((s) => (
            <button key={s} onClick={() => setFilter(s)} className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold ${filter === s ? "border-primary-800 bg-primary-800 text-sand-50" : "border-ink-900/10 text-ink-900/60"}`}>{s}</button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Inbox} title="No enquiries found" />
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[380px_1fr]">
          <div className="card max-h-[600px] divide-y divide-ink-900/6 overflow-y-auto p-2">
            {filtered.map((e) => (
              <button
                key={e.id}
                onClick={() => setSelected(e)}
                className={`flex w-full flex-col gap-1 rounded-xl p-3.5 text-left transition ${selected?.id === e.id ? "bg-primary-800/8" : "hover:bg-sand-100"}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-ink-900">{e.customer}</span>
                  <StatusBadge status={e.status} />
                </div>
                <span className="line-clamp-1 text-xs text-ink-900/50">{e.requirement}</span>
                <span className="text-[11px] text-ink-900/35">{formatDate(e.date)}</span>
              </button>
            ))}
          </div>

          {selected && (
            <div className="card p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="font-heading text-lg font-bold text-ink-900">{selected.customer}</h3>
                  <p className="text-sm text-ink-900/50">{selected.product}</p>
                </div>
                <select value={selected.status} onChange={(e) => updateStatus(selected.id, e.target.value)} className="rounded-xl border border-ink-900/10 px-3 py-2 text-sm font-semibold">
                  <option>New</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
              </div>
              <div className="mt-5 grid grid-cols-1 gap-3 rounded-2xl bg-sand-100/60 p-4 sm:grid-cols-3">
                <span className="flex items-center gap-2 text-sm text-ink-900/70"><Phone className="h-4 w-4 text-primary-700" /> {selected.phone}</span>
                <span className="flex items-center gap-2 text-sm text-ink-900/70"><Mail className="h-4 w-4 text-primary-700" /> {selected.email}</span>
                <span className="flex items-center gap-2 text-sm text-ink-900/70"><Calendar className="h-4 w-4 text-primary-700" /> {formatDate(selected.date)}</span>
              </div>
              <div className="mt-5">
                <h4 className="font-heading text-sm font-bold text-ink-900">Requirement</h4>
                <p className="mt-2 text-sm text-ink-900/65">{selected.requirement}</p>
              </div>
              <div className="mt-6 flex gap-3">
                <a href={`mailto:${selected.email}`} className="btn-primary btn-sm"><Mail className="h-3.5 w-3.5" /> Reply via Email</a>
                <a href={`tel:${selected.phone}`} className="btn-outline btn-sm"><Phone className="h-3.5 w-3.5" /> Call Customer</a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
