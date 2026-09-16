import { Link } from "react-router-dom";
import {
    IndianRupee, ShoppingCart, Users, Package, Clock, AlertTriangle, ArrowUpRight, TrendingUp,
} from "lucide-react";
import {
    ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    PieChart, Pie, Cell,
} from "recharts";
import { StatCard, PageHeader } from "../components/AdminUI";
import { StatusBadge } from "../../components/ui/Badge";
import { products } from "../../data/products";
import { orders } from "../../data/orders";
import { adminCustomers, monthlySales, categoryPerformance } from "../../data/admin";
import { formatPrice, formatDate } from "../../lib/format";
import ProductArt from "../../components/illustrations/ProductArt";

const PIE_COLORS = ["#0B3D2E", "#22855C", "#F5B700", "#5FD0E8", "#D68F00", "#9CA3AF"];

export default function Dashboard() {
    const totalRevenue = monthlySales.reduce((s, m) => s + m.revenue, 0);
    const totalOrdersCount = monthlySales.reduce((s, m) => s + m.orders, 0);
    const lowStock = products.filter((p) => p.stock === "low").length;
    const pendingOrders = orders.filter((o) => o.status === "Processing").length + 18;

    const topProducts = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 5);

    return (
        <div className="space-y-6">
            <PageHeader title="Dashboard" description="Overview of your store's performance" />

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
                <StatCard icon={IndianRupee} label="Total Sales" value={formatPrice(totalRevenue)} delta="+18.2%" tone="bg-primary-800/8 text-primary-800" />
                <StatCard icon={ShoppingCart} label="Total Orders" value={totalOrdersCount.toLocaleString("en-IN")} delta="+9.4%" tone="bg-sky-50 text-sky-600" />
                <StatCard icon={Users} label="Customers" value="4,820" delta="+5.1%" tone="bg-accent-500/10 text-accent-700" />
                <StatCard icon={Package} label="Products" value={products.length} tone="bg-primary-800/8 text-primary-800" />
                <StatCard icon={Clock} label="Pending Orders" value={pendingOrders} delta="-2.3%" tone="bg-amber-50 text-amber-600" />
                <StatCard icon={AlertTriangle} label="Low Stock" value={lowStock} tone="bg-red-50 text-red-500" />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="card p-6 lg:col-span-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-heading text-base font-bold text-ink-900">Revenue Overview</h3>
                            <p className="text-xs text-ink-900/45">Last 6 months</p>
                        </div>
                        <span className="flex items-center gap-1 rounded-full bg-primary-800/8 px-3 py-1 text-xs font-bold text-primary-800">
                            <TrendingUp className="h-3.5 w-3.5" /> +21% growth
                        </span>
                    </div>
                    <div className="mt-4 h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={monthlySales} margin={{ left: -12, right: 12, top: 10 }}>
                                <defs>
                                    <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#146C4A" stopOpacity={0.35} />
                                        <stop offset="100%" stopColor="#146C4A" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#0B3D2E14" />
                                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#0B3D2E99" }} axisLine={false} tickLine={false} />
                                <YAxis tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} tick={{ fontSize: 12, fill: "#0B3D2E99" }} axisLine={false} tickLine={false} />
                                <Tooltip formatter={(v) => formatPrice(v)} contentStyle={{ borderRadius: 12, border: "1px solid #0B3D2E14" }} />
                                <Area type="monotone" dataKey="revenue" stroke="#146C4A" strokeWidth={2.5} fill="url(#rev)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card p-6">
                    <h3 className="font-heading text-base font-bold text-ink-900">Category Performance</h3>
                    <p className="text-xs text-ink-900/45">Share of total revenue</p>
                    <div className="mt-2 h-56">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={categoryPerformance} dataKey="value" nameKey="category" innerRadius={55} outerRadius={80} paddingAngle={2}>
                                    {categoryPerformance.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                                </Pie>
                                <Tooltip formatter={(v) => `${v}%`} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                        {categoryPerformance.map((c, i) => (
                            <div key={c.category} className="flex items-center gap-2 text-xs text-ink-900/60">
                                <span className="h-2 w-2 rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                                {c.category}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="card p-6 lg:col-span-2">
                    <div className="flex items-center justify-between">
                        <h3 className="font-heading text-base font-bold text-ink-900">Recent Orders</h3>
                        <Link to="/admin/orders" className="flex items-center gap-1 text-xs font-bold text-primary-700">View All <ArrowUpRight className="h-3.5 w-3.5" /></Link>
                    </div>
                    <div className="mt-4 divide-y divide-ink-900/6">
                        {orders.slice(0, 5).map((o) => (
                            <div key={o.id} className="flex items-center gap-4 py-3">
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-semibold text-ink-900">#{o.id}</p>
                                    <p className="text-xs text-ink-900/45">{formatDate(o.date)}</p>
                                </div>
                                <StatusBadge status={o.status} />
                                <span className="w-24 text-right text-sm font-bold text-ink-900">{formatPrice(o.total)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card p-6">
                    <div className="flex items-center justify-between">
                        <h3 className="font-heading text-base font-bold text-ink-900">Recent Customers</h3>
                        <Link to="/admin/customers" className="flex items-center gap-1 text-xs font-bold text-primary-700">View All <ArrowUpRight className="h-3.5 w-3.5" /></Link>
                    </div>
                    <div className="mt-4 space-y-3">
                        {adminCustomers.slice(0, 5).map((c) => (
                            <div key={c.id} className="flex items-center gap-3">
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-800 text-xs font-bold text-sand-50">{c.name[0]}</span>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-semibold text-ink-900">{c.name}</p>
                                    <p className="truncate text-xs text-ink-900/45">{c.city}</p>
                                </div>
                                <span className="text-xs font-bold text-ink-900">{formatPrice(c.spent)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="card p-6">
                <h3 className="font-heading text-base font-bold text-ink-900">Top Products</h3>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {topProducts.map((p) => (
                        <div key={p.id} className="rounded-2xl border border-ink-900/6 p-3">
                            <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-sand-100">
                                <ProductArt icon={p.icon} tint={p.tint} uid={`top-${p.id}`} image={p.image} alt={p.name} className="h-full w-full object-cover" />
                            </div>
                            <p className="mt-2.5 line-clamp-1 text-xs font-semibold text-ink-900">{p.name}</p>
                            <p className="text-xs text-ink-900/45">{p.reviews} reviews · {formatPrice(p.price)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
