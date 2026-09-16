import { useState } from "react";
import { Link } from "react-router-dom";
import { Package, ChevronRight } from "lucide-react";
import { orders } from "../../data/orders";
import { getProductBySlug } from "../../data/products";
import { formatPrice, formatDate } from "../../lib/format";
import { StatusBadge } from "../../components/ui/Badge";
import { EmptyState } from "../../components/ui/Misc";
import ProductArt from "../../components/illustrations/ProductArt";

const FILTERS = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function Orders() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-medium text-ink-900">My Orders</h1>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                filter === f ? "border-primary-800 bg-primary-800 text-sand-50" : "border-ink-900/10 text-ink-900/60"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Package} title="No orders here" description="Orders matching this filter will show up here." />
      ) : (
        <div className="space-y-4">
          {filtered.map((order) => {
            const firstProduct = getProductBySlug(order.items[0].slug);
            return (
              <Link key={order.id} to={`/account/orders/${order.id}`} className="card card-hover flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-sand-100">
                  {firstProduct && <ProductArt icon={firstProduct.icon} tint={firstProduct.tint} uid={`ord-${order.id}`} className="h-full w-full p-2.5" />}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-heading text-sm font-bold text-ink-900">#{order.id}</p>
                    <StatusBadge status={order.status} />
                  </div>
                  <p className="mt-1 text-xs text-ink-900/45">
                    {formatDate(order.date)} · {order.items.length} item(s) · {order.payment}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-heading text-base font-extrabold text-ink-900">{formatPrice(order.total)}</span>
                  <ChevronRight className="h-4 w-4 text-ink-900/30" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
