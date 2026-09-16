import { ChevronLeft, ChevronRight, Search, AlertTriangle } from "lucide-react";
import Modal from "../../components/ui/Modal";

export function PageHeader({ title, description, action }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 className="font-heading text-xl font-bold text-ink-900">{title}</h2>
        {description && <p className="mt-1 text-sm text-ink-900/50">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatCard({ icon: Icon, label, value, delta, tone = "bg-primary-800/8 text-primary-800" }) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${tone}`}>
          <Icon className="h-5 w-5" />
        </span>
        {delta && (
          <span className={`text-xs font-bold ${delta.startsWith("-") ? "text-red-500" : "text-primary-700"}`}>{delta}</span>
        )}
      </div>
      <p className="mt-4 font-heading text-lg font-extrabold text-ink-900 sm:text-2xl">{value}</p>
      <p className="text-xs font-medium text-ink-900/45">{label}</p>
    </div>
  );
}

export function SearchInput({ value, onChange, placeholder = "Search…", className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-900/35" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-ink-900/10 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary-600"
      />
    </div>
  );
}

export function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-between border-t border-ink-900/8 px-2 pt-4">
      <p className="text-xs text-ink-900/45">Page {page} of {totalPages}</p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(Math.max(1, page - 1))}
          disabled={page <= 1}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-900/10 text-ink-900 disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => onChange(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-900/10 text-ink-900 disabled:opacity-30"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function ConfirmDialog({ open, onClose, onConfirm, title = "Are you sure?", description }) {
  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-sm">
      <div className="text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
          <AlertTriangle className="h-6 w-6" />
        </span>
        <h3 className="mt-4 font-heading text-lg font-bold text-ink-900">{title}</h3>
        {description && <p className="mt-2 text-sm text-ink-900/55">{description}</p>}
        <div className="mt-6 flex gap-3">
          <button onClick={onClose} className="btn-outline flex-1 justify-center">Cancel</button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className="btn flex-1 justify-center bg-red-500 text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}

export function Th({ children, className = "" }) {
  return <th className={`px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-ink-900/45 ${className}`}>{children}</th>;
}

export function Td({ children, className = "" }) {
  return <td className={`px-4 py-3.5 text-sm text-ink-900/80 ${className}`}>{children}</td>;
}
