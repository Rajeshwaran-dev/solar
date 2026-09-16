import { useMemo, useState } from "react";
import { Boxes, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { products } from "../../data/products";
import { categories } from "../../data/categories";
import { formatPrice } from "../../lib/format";
import { PageHeader, StatCard, SearchInput, Th, Td } from "../components/AdminUI";
import { StatusBadge } from "../../components/ui/Badge";
import ProductArt from "../../components/illustrations/ProductArt";

const STOCK_QTY = { in: 84, low: 6, out: 0 };

export default function Inventory() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const counts = useMemo(() => ({
    total: products.length,
    in: products.filter((p) => p.stock === "in").length,
    low: products.filter((p) => p.stock === "low").length,
    out: products.filter((p) => p.stock === "out").length,
  }), []);

  const filtered = products.filter((p) => {
    if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false;
    if (filter !== "All" && p.stock !== filter) return false;
    return true;
  });

  return (
    <div className="space-y-5">
      <PageHeader title="Inventory" description="Stock levels across your product catalog" />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Boxes} label="Total Products" value={counts.total} tone="bg-primary-800/8 text-primary-800" />
        <StatCard icon={CheckCircle2} label="In Stock" value={counts.in} tone="bg-primary-800/8 text-primary-800" />
        <StatCard icon={AlertTriangle} label="Low Stock" value={counts.low} tone="bg-amber-50 text-amber-600" />
        <StatCard icon={XCircle} label="Out of Stock" value={counts.out} tone="bg-red-50 text-red-500" />
      </div>

      <div className="card flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <SearchInput value={query} onChange={setQuery} placeholder="Search inventory…" className="flex-1" />
        <div className="flex gap-2">
          {["All", "in", "low", "out"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold capitalize ${filter === f ? "border-primary-800 bg-primary-800 text-sand-50" : "border-ink-900/10 text-ink-900/60"}`}
            >
              {f === "in" ? "In Stock" : f === "low" ? "Low Stock" : f === "out" ? "Out of Stock" : f}
            </button>
          ))}
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-ink-900/8">
              <tr>
                <Th>Product</Th>
                <Th>Category</Th>
                <Th>Quantity</Th>
                <Th>Price</Th>
                <Th>Status</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-900/6">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-sand-100/50">
                  <Td>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-sand-100">
                        <ProductArt icon={p.icon} tint={p.tint} uid={`inv-${p.id}`} className="h-full w-full p-1" />
                      </div>
                      <span className="line-clamp-1 max-w-[240px] font-semibold text-ink-900">{p.name}</span>
                    </div>
                  </Td>
                  <Td>{categories.find((c) => c.slug === p.category)?.name}</Td>
                  <Td>{STOCK_QTY[p.stock]} units</Td>
                  <Td className="font-semibold text-ink-900">{formatPrice(p.price)}</Td>
                  <Td><StatusBadge status={p.stock === "in" ? "In Stock" : p.stock === "low" ? "Low Stock" : "Out of Stock"} /></Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
