import { useParams, Link, Navigate } from "react-router-dom";
import { Check, MapPin, CreditCard, ArrowLeft, RotateCcw, Download } from "lucide-react";
import { getOrderById, currentUser } from "../../data/orders";
import { getProductBySlug } from "../../data/products";
import { formatPrice, formatDate } from "../../lib/format";
import { StatusBadge } from "../../components/ui/Badge";
import ProductArt from "../../components/illustrations/ProductArt";

export default function OrderDetail() {
  const { id } = useParams();
  const order = getOrderById(id);
  if (!order) return <Navigate to="/account/orders" replace />;

  return (
    <div className="space-y-6">
      <Link to="/account/orders" className="flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800">
        <ArrowLeft className="h-4 w-4" /> Back to Orders
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-medium text-ink-900">Order #{order.id}</h1>
          <p className="mt-1 text-sm text-ink-900/50">Placed on {formatDate(order.date)}</p>
        </div>
        <StatusBadge status={order.status} className="!text-sm" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-ink-900/50">Order Timeline</h2>
            <div className="relative mt-6 space-y-6 pl-6">
              <div className="absolute left-[7px] top-1 h-[calc(100%-8px)] w-0.5 bg-ink-900/8" />
              {order.timeline.map((t) => (
                <div key={t.label} className="relative">
                  <span className={`absolute -left-6 top-0.5 flex h-4 w-4 items-center justify-center rounded-full ${t.done ? "bg-primary-800" : "bg-sand-300"}`}>
                    {t.done && <Check className="h-2.5 w-2.5 text-sand-50" />}
                  </span>
                  <p className={`text-sm font-semibold ${t.done ? "text-ink-900" : "text-ink-900/40"}`}>{t.label}</p>
                  <p className="text-xs text-ink-900/40">{t.date}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-ink-900/50">Items</h2>
            <div className="mt-4 divide-y divide-ink-900/6">
              {order.items.map((item) => {
                const product = getProductBySlug(item.slug);
                if (!product) return null;
                return (
                  <div key={item.slug} className="flex items-center gap-4 py-4">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-sand-100">
                      <ProductArt icon={product.icon} tint={product.tint} uid={`od-${item.slug}`} className="h-full w-full p-2.5" />
                    </div>
                    <div className="flex-1">
                      <Link to={`/product/${product.slug}`} className="text-sm font-semibold text-ink-900 hover:text-primary-800">{product.name}</Link>
                      <p className="text-xs text-ink-900/45">Qty: {item.qty}</p>
                    </div>
                    <span className="font-heading text-sm font-bold text-ink-900">{formatPrice(item.price * item.qty)}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex justify-between border-t border-ink-900/8 pt-4">
              <span className="font-heading font-bold text-ink-900">Total</span>
              <span className="font-heading text-lg font-extrabold text-ink-900">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="card p-6">
            <h3 className="flex items-center gap-2 font-heading text-sm font-bold text-ink-900">
              <MapPin className="h-4 w-4 text-primary-700" /> Delivery Address
            </h3>
            <p className="mt-3 text-sm text-ink-900/60">{currentUser.name}</p>
            <p className="text-sm text-ink-900/60">{order.address}</p>
            <p className="mt-1 text-sm text-ink-900/60">{currentUser.phone}</p>
          </div>
          <div className="card p-6">
            <h3 className="flex items-center gap-2 font-heading text-sm font-bold text-ink-900">
              <CreditCard className="h-4 w-4 text-primary-700" /> Payment Method
            </h3>
            <p className="mt-3 text-sm text-ink-900/60">{order.payment}</p>
          </div>
          <button className="btn-outline flex w-full justify-center">
            <Download className="h-4 w-4" /> Download Invoice
          </button>
          {order.status === "Delivered" && (
            <button className="btn-outline flex w-full justify-center">
              <RotateCcw className="h-4 w-4" /> Request Return
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
