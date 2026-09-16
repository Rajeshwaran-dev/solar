import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Mail, CreditCard, Check } from "lucide-react";
import { adminOrders } from "../../../data/admin";
import { formatPrice, formatDate } from "../../../lib/format";
import { StatusBadge } from "../../../components/ui/Badge";
import { useToast } from "../../../context/ToastContext";

const STAGES = ["Processing", "Shipped", "Delivered"];

export default function OrderDetail() {
  const { id } = useParams();
  const order = adminOrders.find((o) => o.id === id);
  const [status, setStatus] = useState(order?.status);
  const toast = useToast();
  if (!order) return <Navigate to="/admin/orders" replace />;

  const stageIndex = Math.max(0, STAGES.indexOf(status));

  return (
    <div className="space-y-5">
      <Link to="/admin/orders" className="flex items-center gap-1.5 text-sm font-semibold text-primary-700"><ArrowLeft className="h-4 w-4" /> Back to Orders</Link>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-xl font-bold text-ink-900">Order #{order.id}</h2>
          <p className="mt-1 text-sm text-ink-900/50">Placed on {formatDate(order.date)}</p>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={status} className="!text-sm" />
          {status !== "Cancelled" && (
            <select
              value={status}
              onChange={(e) => { setStatus(e.target.value); toast?.push(`Order status updated to ${e.target.value}`); }}
              className="rounded-xl border border-ink-900/10 bg-white px-3 py-2 text-sm font-semibold"
            >
              {STAGES.map((s) => <option key={s}>{s}</option>)}
            </select>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          {status !== "Cancelled" && (
            <div className="card p-6">
              <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-ink-900/50">Order Progress</h3>
              <div className="mt-6 flex items-center">
                {STAGES.map((s, i) => (
                  <div key={s} className="flex flex-1 items-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${i <= stageIndex ? "bg-primary-800 text-sand-50" : "bg-sand-200 text-ink-900/40"}`}>
                        {i < stageIndex ? <Check className="h-4 w-4" /> : i + 1}
                      </span>
                      <span className={`text-xs font-semibold ${i <= stageIndex ? "text-ink-900" : "text-ink-900/40"}`}>{s}</span>
                    </div>
                    {i < STAGES.length - 1 && <div className={`mx-2 h-0.5 flex-1 ${i < stageIndex ? "bg-primary-800" : "bg-sand-200"}`} />}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="card p-6">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-ink-900/50">Products</h3>
            <div className="mt-4 divide-y divide-ink-900/6">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3 text-sm">
                  <span className="text-ink-900/80">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between border-t border-ink-900/8 pt-4">
              <span className="font-heading font-bold text-ink-900">Total</span>
              <span className="font-heading text-lg font-extrabold text-ink-900">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="card p-6">
            <h3 className="font-heading text-sm font-bold text-ink-900">Customer</h3>
            <p className="mt-3 text-sm font-semibold text-ink-900">{order.customer}</p>
            <p className="flex items-center gap-1.5 text-xs text-ink-900/50"><Mail className="h-3.5 w-3.5" /> {order.email}</p>
          </div>
          <div className="card p-6">
            <h3 className="flex items-center gap-2 font-heading text-sm font-bold text-ink-900"><CreditCard className="h-4 w-4 text-primary-700" /> Payment</h3>
            <p className="mt-3 text-sm text-ink-900/60">{order.payment}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
