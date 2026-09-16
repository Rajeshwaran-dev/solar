import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Download } from "lucide-react";
import { adminCustomers } from "../../../data/admin";
import { formatPrice, formatDate } from "../../../lib/format";
import { PageHeader, SearchInput, Pagination, Th, Td } from "../../components/AdminUI";
import { StatusBadge } from "../../../components/ui/Badge";

const PAGE_SIZE = 8;

export default function CustomerList() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => adminCustomers.filter((c) => `${c.name} ${c.email}`.toLowerCase().includes(query.toLowerCase())),
    [query]
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Customers"
        description={`${adminCustomers.length} registered customers`}
        action={<button className="btn-outline btn-sm"><Download className="h-4 w-4" /> Export</button>}
      />

      <div className="card p-4">
        <SearchInput value={query} onChange={(v) => { setQuery(v); setPage(1); }} placeholder="Search customers by name or email…" />
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-ink-900/8">
              <tr>
                <Th>Customer</Th>
                <Th>Location</Th>
                <Th>Orders</Th>
                <Th>Total Spent</Th>
                <Th>Joined</Th>
                <Th>Status</Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-900/6">
              {paged.map((c) => (
                <tr key={c.id} className="hover:bg-sand-100/50">
                  <Td>
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-800 text-xs font-bold text-sand-50">{c.name[0]}</span>
                      <div>
                        <p className="font-semibold text-ink-900">{c.name}</p>
                        <p className="text-xs text-ink-900/45">{c.email}</p>
                      </div>
                    </div>
                  </Td>
                  <Td>{c.city}</Td>
                  <Td>{c.orders}</Td>
                  <Td className="font-semibold text-ink-900">{formatPrice(c.spent)}</Td>
                  <Td>{formatDate(c.joined)}</Td>
                  <Td><StatusBadge status={c.status} /></Td>
                  <Td className="text-right">
                    <Link to={`/admin/customers/${c.id}`} className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-ink-900/10 text-ink-900 hover:border-primary-700">
                      <Eye className="h-3.5 w-3.5" />
                    </Link>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 pb-4">
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      </div>
    </div>
  );
}
