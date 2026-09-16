import { useState } from "react";
import { Check, X, Star } from "lucide-react";
import { adminReviews } from "../../data/admin";
import { formatDate } from "../../lib/format";
import { PageHeader, SearchInput } from "../components/AdminUI";
import { StatusBadge } from "../../components/ui/Badge";
import { EmptyState } from "../../components/ui/Misc";

const FILTERS = ["All", "Pending", "Approved", "Rejected"];

export default function Reviews() {
  const [reviews, setReviews] = useState(adminReviews);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const setStatus = (id, status) => setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));

  const filtered = reviews
    .filter((r) => filter === "All" || r.status === filter)
    .filter((r) => `${r.product} ${r.customer}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-5">
      <PageHeader title="Reviews" description={`${reviews.filter((r) => r.status === "Pending").length} pending approval`} />

      <div className="card flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <SearchInput value={query} onChange={setQuery} placeholder="Search by product or customer…" className="flex-1" />
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold ${filter === f ? "border-primary-800 bg-primary-800 text-sand-50" : "border-ink-900/10 text-ink-900/60"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Star} title="No reviews found" description="Try a different filter or search term." />
      ) : (
        <div className="space-y-4">
          {filtered.map((r) => (
            <div key={r.id} className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-heading text-sm font-bold text-ink-900">{r.product}</p>
                  <StatusBadge status={r.status} />
                </div>
                <div className="mt-1.5 flex items-center gap-2 text-xs text-ink-900/50">
                  <span>{r.customer}</span> · <span>{formatDate(r.date)}</span>
                  <span className="flex items-center gap-0.5 text-accent-500">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3 w-3" fill={i < Math.round(r.rating) ? "currentColor" : "none"} />)}
                  </span>
                </div>
                <p className="mt-2 text-sm text-ink-900/65">{r.text}</p>
              </div>
              {r.status === "Pending" && (
                <div className="flex shrink-0 gap-2">
                  <button onClick={() => setStatus(r.id, "Approved")} className="flex items-center gap-1.5 rounded-full bg-primary-800 px-4 py-2 text-xs font-bold text-sand-50">
                    <Check className="h-3.5 w-3.5" /> Approve
                  </button>
                  <button onClick={() => setStatus(r.id, "Rejected")} className="flex items-center gap-1.5 rounded-full border border-red-200 px-4 py-2 text-xs font-bold text-red-500">
                    <X className="h-3.5 w-3.5" /> Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
