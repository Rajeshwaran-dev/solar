import { useState } from "react";
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";
import { Download } from "lucide-react";
import { PageHeader, Th, Td } from "../components/AdminUI";
import { monthlySales, weeklyVisitors, categoryPerformance, adminCustomers } from "../../data/admin";
import { products } from "../../data/products";
import { formatPrice } from "../../lib/format";

const TABS = ["Sales", "Orders", "Products", "Customers", "Inventory"];

export default function Reports() {
  const [tab, setTab] = useState("Sales");

  return (
    <div className="space-y-5">
      <PageHeader
        title="Reports"
        description="Analytics across sales, orders, products, customers and inventory"
        action={<button className="btn-outline btn-sm"><Download className="h-4 w-4" /> Export Report</button>}
      />

      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`rounded-full border px-4 py-2 text-sm font-semibold ${tab === t ? "border-primary-800 bg-primary-800 text-sand-50" : "border-ink-900/10 text-ink-900/60"}`}>{t}</button>
        ))}
      </div>

      {tab === "Sales" && (
        <div className="card p-6">
          <h3 className="font-heading text-base font-bold text-ink-900">Monthly Revenue</h3>
          <div className="mt-4 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#0B3D2E14" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v) => formatPrice(v)} />
                <Line type="monotone" dataKey="revenue" stroke="#146C4A" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {tab === "Orders" && (
        <div className="card p-6">
          <h3 className="font-heading text-base font-bold text-ink-900">Orders Per Month</h3>
          <div className="mt-4 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#0B3D2E14" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="orders" fill="#F5B700" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {tab === "Products" && (
        <div className="card p-6">
          <h3 className="font-heading text-base font-bold text-ink-900">Revenue Share by Category</h3>
          <div className="mt-4 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryPerformance} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#0B3D2E14" />
                <XAxis type="number" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="category" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} width={120} />
                <Tooltip formatter={(v) => `${v}%`} />
                <Bar dataKey="value" fill="#0B3D2E" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {tab === "Customers" && (
        <div className="card p-6">
          <h3 className="font-heading text-base font-bold text-ink-900">Weekly Visitor Traffic</h3>
          <div className="mt-4 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyVisitors}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#0B3D2E14" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="visitors" stroke="#22855C" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-ink-900/8"><tr><Th>Customer</Th><Th>Orders</Th><Th>Spent</Th></tr></thead>
              <tbody className="divide-y divide-ink-900/6">
                {adminCustomers.slice(0, 5).map((c) => (
                  <tr key={c.id}><Td className="font-semibold text-ink-900">{c.name}</Td><Td>{c.orders}</Td><Td>{formatPrice(c.spent)}</Td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "Inventory" && (
        <div className="card p-6">
          <h3 className="font-heading text-base font-bold text-ink-900">Stock Status Breakdown</h3>
          <div className="mt-4 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { status: "In Stock", count: products.filter((p) => p.stock === "in").length },
                  { status: "Low Stock", count: products.filter((p) => p.stock === "low").length },
                  { status: "Out of Stock", count: products.filter((p) => p.stock === "out").length },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#0B3D2E14" />
                <XAxis dataKey="status" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#146C4A" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
