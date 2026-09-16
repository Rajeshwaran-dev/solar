import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Mail, Phone, MapPin, Calendar, ShoppingCart, Wallet } from "lucide-react";
import { adminCustomers, adminOrders } from "../../../data/admin";
import { formatPrice, formatDate } from "../../../lib/format";
import { StatusBadge } from "../../../components/ui/Badge";
import { StatCard } from "../../components/AdminUI";

export default function CustomerDetail() {
  const { id } = useParams();
  const customer = adminCustomers.find((c) => c.id === id);
  if (!customer) return <Navigate to="/admin/customers" replace />;

  const customerOrders = adminOrders.filter((o) => o.customer === customer.name);

  return (
    <div className="space-y-5">
      <Link to="/admin/customers" className="flex items-center gap-1.5 text-sm font-semibold text-primary-700"><ArrowLeft className="h-4 w-4" /> Back to Customers</Link>

      <div className="card flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-800 text-xl font-bold text-sand-50">{customer.name[0]}</span>
          <div>
            <h2 className="font-heading text-xl font-bold text-ink-900">{customer.name}</h2>
            <StatusBadge status={customer.status} className="mt-1" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-1.5 text-sm text-ink-900/60 sm:text-right">
          <span className="flex items-center gap-2 sm:justify-end"><Mail className="h-3.5 w-3.5" /> {customer.email}</span>
          <span className="flex items-center gap-2 sm:justify-end"><Phone className="h-3.5 w-3.5" /> {customer.phone}</span>
          <span className="flex items-center gap-2 sm:justify-end"><MapPin className="h-3.5 w-3.5" /> {customer.city}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard icon={ShoppingCart} label="Total Orders" value={customer.orders} tone="bg-sky-50 text-sky-600" />
        <StatCard icon={Wallet} label="Total Spent" value={formatPrice(customer.spent)} tone="bg-primary-800/8 text-primary-800" />
        <StatCard icon={Calendar} label="Customer Since" value={formatDate(customer.joined)} tone="bg-accent-500/10 text-accent-700" />
      </div>

      <div className="card p-6">
        <h3 className="font-heading text-base font-bold text-ink-900">Order History</h3>
        {customerOrders.length === 0 ? (
          <p className="mt-3 text-sm text-ink-900/50">No orders placed yet.</p>
        ) : (
          <div className="mt-4 divide-y divide-ink-900/6">
            {customerOrders.map((o) => (
              <div key={o.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div>
                  <p className="text-sm font-semibold text-ink-900">#{o.id}</p>
                  <p className="text-xs text-ink-900/45">{formatDate(o.date)}</p>
                </div>
                <StatusBadge status={o.status} />
                <span className="text-sm font-bold text-ink-900">{formatPrice(o.total)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
