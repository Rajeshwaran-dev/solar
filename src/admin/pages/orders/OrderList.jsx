import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Download, ShoppingCart } from "lucide-react";
import { adminOrders } from "../../../data/admin";
import { formatPrice, formatDate } from "../../../lib/format";
import { PageHeader, SearchInput, Pagination, Th, Td } from "../../components/AdminUI";
import { StatusBadge } from "../../../components/ui/Badge";
import { EmptyState } from "../../../components/ui/Misc";

const STATUSES = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];
const PAGE_SIZE = 8;

export default function OrderList() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return adminOrders.filter((o) => {
      if (status !== "All" && o.status !== status) return false;
      if (query && !(`${o.id} ${o.customer}`.toLowerCase().includes(query.toLowerCase()))) return false;
      return true;
    });
  }, [query, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Orders"
        description={`${adminOrders.length} total orders`}
        action={<button className="btn-outline btn-sm"><Download className="h-4 w-4" /> Export</button>}
      />

      <div className="card flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <SearchInput value={query} onChange={(v) => { setQuery(v); setPage(1); }} placeholder="Search by order ID or customer…" className="flex-1" />
        <div className="flex flex-wrap gap-2">
          {STATUSES.map((s) => (
            <button key={s} onClick={() => { setStatus(s); setPage(1); }} className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold ${status === s ? "border-primary-800 bg-primary-800 text-sand-50" : "border-ink-900/10 text-ink-900/60"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="card overflow-hidden">
        {paged.length === 0 ? (
          <div className="p-6"><EmptyState icon={ShoppingCart} title="No orders found" description="Try a different search or filter." /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-ink-900/8">
                <tr>
                  <Th>Order ID</Th>
                  <Th>Customer</Th>
                  <Th>Products</Th>
                  <Th>Date</Th>
                  <Th>Total</Th>
                  <Th>Payment</Th>
                  <Th>Status</Th>
                  <Th className="text-right">Actions</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-900/6">
                {paged.map((o) => (
                  <tr key={o.id} className="hover:bg-sand-100/50">
                    <Td className="font-semibold text-ink-900">#{o.id}</Td>
                    <Td>{o.customer}</Td>
                    <Td className="max-w-[200px]"><span className="line-clamp-1">{o.items.join(", ")}</span></Td>
                    <Td>{formatDate(o.date)}</Td>
                    <Td className="font-semibold text-ink-900">{formatPrice(o.total)}</Td>
                    <Td>{o.payment}</Td>
                    <Td><StatusBadge status={o.status} /></Td>
                    <Td className="text-right">
                      <Link to={`/admin/orders/${o.id}`} className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-ink-900/10 text-ink-900 hover:border-primary-700">
                        <Eye className="h-3.5 w-3.5" />
                      </Link>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="px-4 pb-4">
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      </div>
    </div>
  );
}
