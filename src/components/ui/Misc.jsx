import { ChevronRight, Minus, Plus, Inbox } from "lucide-react";
import { Link } from "react-router-dom";

export function Breadcrumb({ items, dark = false }) {
  return (
    <nav className={`flex flex-wrap items-center gap-1.5 text-xs font-medium ${dark ? "text-sand-100/55" : "text-ink-900/50"}`}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight className="h-3 w-3" />}
          {item.href ? (
            <Link to={item.href} className={`transition ${dark ? "hover:text-accent-400" : "hover:text-primary-700"}`}>
              {item.label}
            </Link>
          ) : (
            <span className={dark ? "text-sand-50" : "text-ink-900"}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function QuantityStepper({ value, onChange, min = 1, max = 99, size = "md" }) {
  const dims = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  return (
    <div className="inline-flex items-center rounded-full border border-ink-900/10 bg-white">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className={`flex ${dims} items-center justify-center rounded-full text-ink-900 transition hover:bg-sand-100 disabled:opacity-30`}
        disabled={value <= min}
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="w-8 text-center text-sm font-semibold tabular-nums">{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        className={`flex ${dims} items-center justify-center rounded-full text-ink-900 transition hover:bg-sand-100 disabled:opacity-30`}
        disabled={value >= max}
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export function EmptyState({ icon: Icon = Inbox, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-ink-900/12 bg-sand-100/60 px-6 py-16 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-soft">
        <Icon className="h-7 w-7 text-primary-700" />
      </div>
      <h3 className="font-heading text-lg font-semibold text-ink-900">{title}</h3>
      {description && <p className="mt-2 max-w-sm text-sm text-ink-900/55">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="card overflow-hidden">
      <div className="skeleton aspect-square w-full rounded-none" />
      <div className="space-y-3 p-4">
        <div className="skeleton h-3 w-1/3" />
        <div className="skeleton h-4 w-4/5" />
        <div className="skeleton h-4 w-1/2" />
      </div>
    </div>
  );
}

export function TableRowSkeleton({ cols = 5 }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-4">
          <div className="skeleton h-4 w-full" />
        </td>
      ))}
    </tr>
  );
}
