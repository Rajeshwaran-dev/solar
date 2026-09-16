import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, Package } from "lucide-react";
import { products as initialProducts } from "../../../data/products";
import { categories } from "../../../data/categories";
import { formatPrice } from "../../../lib/format";
import { PageHeader, SearchInput, Pagination, ConfirmDialog, Th, Td } from "../../components/AdminUI";
import { StatusBadge } from "../../../components/ui/Badge";
import { EmptyState } from "../../../components/ui/Misc";
import ProductArt from "../../../components/illustrations/ProductArt";

const PAGE_SIZE = 8;

export default function ProductList() {
  const [products, setProducts] = useState(initialProducts);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [stock, setStock] = useState("All");
  const [page, setPage] = useState(1);
  const [toDelete, setToDelete] = useState(null);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false;
      if (category !== "All" && p.category !== category) return false;
      if (stock !== "All" && p.stock !== stock) return false;
      return true;
    });
  }, [products, query, category, stock]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const removeProduct = (id) => setProducts((prev) => prev.filter((p) => p.id !== id));

  return (
    <div className="space-y-5">
      <PageHeader
        title="Products"
        description={`${products.length} products in catalog`}
        action={<Link to="/admin/products/new" className="btn-primary btn-sm"><Plus className="h-4 w-4" /> Add Product</Link>}
      />

      <div className="card flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <SearchInput value={query} onChange={(v) => { setQuery(v); setPage(1); }} placeholder="Search products…" className="flex-1" />
        <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }} className="rounded-xl border border-ink-900/10 bg-white px-3 py-2.5 text-sm">
          <option value="All">All Categories</option>
          {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
        </select>
        <select value={stock} onChange={(e) => { setStock(e.target.value); setPage(1); }} className="rounded-xl border border-ink-900/10 bg-white px-3 py-2.5 text-sm">
          <option value="All">All Stock</option>
          <option value="in">In Stock</option>
          <option value="low">Low Stock</option>
          <option value="out">Out of Stock</option>
        </select>
      </div>

      <div className="card overflow-hidden">
        {paged.length === 0 ? (
          <div className="p-6"><EmptyState icon={Package} title="No products found" description="Try adjusting your search or filters." /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-ink-900/8">
                <tr>
                  <Th>Product</Th>
                  <Th>Category</Th>
                  <Th>Price</Th>
                  <Th>Stock</Th>
                  <Th>Status</Th>
                  <Th className="text-right">Actions</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-900/6">
                {paged.map((p) => (
                  <tr key={p.id} className="hover:bg-sand-100/50">
                    <Td>
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-sand-100">
                          <ProductArt icon={p.icon} tint={p.tint} uid={`al-${p.id}`} image={p.image} alt={p.name} className="h-full w-full object-cover" />
                        </div>
                        <span className="line-clamp-1 max-w-[220px] font-semibold text-ink-900">{p.name}</span>
                      </div>
                    </Td>
                    <Td className="capitalize">{categories.find((c) => c.slug === p.category)?.name}</Td>
                    <Td className="font-semibold text-ink-900">{formatPrice(p.price)}</Td>
                    <Td><StatusBadge status={p.stock === "in" ? "In Stock" : p.stock === "low" ? "Low Stock" : "Out of Stock"} /></Td>
                    <Td><StatusBadge status="Active" /></Td>
                    <Td className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link to={`/admin/products/${p.id}`} className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-900/10 text-ink-900 hover:border-primary-700">
                          <Pencil className="h-3.5 w-3.5" />
                        </Link>
                        <button onClick={() => setToDelete(p)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-900/10 text-red-500 hover:border-red-300 hover:bg-red-50">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
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

      <ConfirmDialog
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={() => removeProduct(toDelete.id)}
        title="Delete this product?"
        description={toDelete ? `"${toDelete.name}" will be permanently removed from your catalog.` : ""}
      />
    </div>
  );
}
