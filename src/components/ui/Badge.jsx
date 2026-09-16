const STYLES = {
  "New": "bg-sky-100 text-sky-700",
  "Featured": "bg-primary-100 text-primary-800",
  "Best Seller": "bg-accent-100 text-accent-800",
  "Sale": "bg-red-100 text-red-600",
  default: "bg-sand-200 text-ink-900/70",
};

export default function Badge({ children, tone, className = "" }) {
  const style = STYLES[tone ?? children] ?? STYLES.default;
  return <span className={`badge ${style} ${className}`}>{children}</span>;
}

export function DiscountBadge({ percent, className = "" }) {
  if (!percent) return null;
  return (
    <span className={`badge bg-ink-900 text-accent-400 ${className}`}>
      {percent}% OFF
    </span>
  );
}

export function StatusBadge({ status, className = "" }) {
  const map = {
    in: "bg-primary-100 text-primary-700",
    "in stock": "bg-primary-100 text-primary-700",
    low: "bg-amber-100 text-amber-700",
    "low stock": "bg-amber-100 text-amber-700",
    out: "bg-red-100 text-red-600",
    "out of stock": "bg-red-100 text-red-600",
    active: "bg-primary-100 text-primary-700",
    inactive: "bg-sand-200 text-ink-900/50",
    pending: "bg-amber-100 text-amber-700",
    processing: "bg-sky-100 text-sky-700",
    shipped: "bg-indigo-100 text-indigo-700",
    delivered: "bg-primary-100 text-primary-700",
    cancelled: "bg-red-100 text-red-600",
    published: "bg-primary-100 text-primary-700",
    draft: "bg-sand-200 text-ink-900/50",
    approved: "bg-primary-100 text-primary-700",
    rejected: "bg-red-100 text-red-600",
  };
  const key = (status ?? "").toLowerCase();
  return (
    <span className={`badge capitalize ${map[key] ?? STYLES.default} ${className}`}>
      {status}
    </span>
  );
}
