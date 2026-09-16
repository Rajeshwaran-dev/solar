import { Link } from "react-router-dom";
import { Package, Heart, MapPin, Wallet, ArrowRight } from "lucide-react";
import { orders, currentUser } from "../../data/orders";
import { useCart } from "../../context/CartContext";
import { formatPrice, formatDate } from "../../lib/format";
import { StatusBadge } from "../../components/ui/Badge";
import { getProductBySlug } from "../../data/products";
import ProductArt from "../../components/illustrations/ProductArt";

export default function Dashboard() {
  const { wishlist } = useCart();
  const totalSpent = orders.filter((o) => o.status !== "Cancelled").reduce((s, o) => s + o.total, 0);

  const cards = [
    { icon: Package, label: "Total Orders", value: orders.length, tone: "bg-primary-800/8 text-primary-800" },
    { icon: Wallet, label: "Total Spent", value: formatPrice(totalSpent), tone: "bg-accent-500/10 text-accent-700" },
    { icon: Heart, label: "Wishlist Items", value: wishlist.length, tone: "bg-red-50 text-red-500" },
    { icon: MapPin, label: "Saved Addresses", value: 2, tone: "bg-sky-50 text-sky-600" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-medium text-ink-900">Welcome back, {currentUser.name.split(" ")[0]}</h1>
        <p className="mt-1 text-sm text-ink-900/50">Here's what's happening with your account.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="card p-5">
            <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${c.tone}`}>
              <c.icon className="h-5 w-5" />
            </span>
            <p className="mt-4 font-heading text-xl font-extrabold text-ink-900">{c.value}</p>
            <p className="text-xs text-ink-900/45">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="card p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-base font-bold text-ink-900">Recent Orders</h2>
          <Link to="/account/orders" className="flex items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-800">
            View All <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-5 divide-y divide-ink-900/6">
          {orders.slice(0, 3).map((order) => {
            const firstProduct = getProductBySlug(order.items[0].slug);
            return (
              <Link key={order.id} to={`/account/orders/${order.id}`} className="flex items-center gap-4 py-4 transition hover:bg-sand-100/60 -mx-2 px-2 rounded-xl">
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-sand-100">
                  {firstProduct && <ProductArt icon={firstProduct.icon} tint={firstProduct.tint} uid={`dash-${order.id}`} className="h-full w-full p-2" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink-900">#{order.id}</p>
                  <p className="text-xs text-ink-900/45">{formatDate(order.date)} · {order.items.length} item(s)</p>
                </div>
                <StatusBadge status={order.status} />
                <span className="font-heading text-sm font-bold text-ink-900">{formatPrice(order.total)}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
