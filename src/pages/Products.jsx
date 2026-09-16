import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { SlidersHorizontal, LayoutGrid, List, X, Search as SearchIcon } from "lucide-react";
import { products } from "../data/products";
import { categories, getCategoryBySlug } from "../data/categories";
import ProductCard from "../components/product/ProductCard";
import QuickViewModal from "../components/product/QuickViewModal";
import ProductFilters, { PRICE_RANGES } from "../components/product/ProductFilters";
import { Breadcrumb, EmptyState, ProductCardSkeleton } from "../components/ui/Misc";
import ProductArt from "../components/illustrations/ProductArt";

const SORT_OPTIONS = [
  { id: "popularity", label: "Popularity" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating", label: "Highest Rated" },
  { id: "newest", label: "Newest First" },
];

const PAGE_SIZE = 12;

export default function Products({ categorySlug }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlFilter = searchParams.get("filter");
  const category = categorySlug ? getCategoryBySlug(categorySlug) : null;

  const [filters, setFilters] = useState({
    categories: categorySlug ? [categorySlug] : [],
    price: "all",
    rating: null,
    inStockOnly: false,
    badges: urlFilter === "featured" ? ["Featured"] : urlFilter === "bestseller" ? ["Best Seller"] : [],
  });
  const [sort, setSort] = useState("popularity");
  const [query, setQuery] = useState("");
  const [view, setView] = useState("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [quickView, setQuickView] = useState(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(t);
  }, [filters, sort, query, categorySlug]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filters, sort, query]);

  const filtered = useMemo(() => {
    const priceRange = PRICE_RANGES.find((r) => r.id === filters.price) ?? PRICE_RANGES[0];
    let list = products.filter((p) => {
      if (filters.categories.length && !filters.categories.includes(p.category)) return false;
      if (p.price < priceRange.min || p.price > priceRange.max) return false;
      if (filters.rating && p.rating < filters.rating) return false;
      if (filters.inStockOnly && p.stock === "out") return false;
      if (filters.badges.length && !filters.badges.some((b) => p.badges?.includes(b))) return false;
      if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });

    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list = [...list].sort((a, b) => (b.badges?.includes("New") ? 1 : 0) - (a.badges?.includes("New") ? 1 : 0));
        break;
      default:
        list = [...list].sort((a, b) => b.reviews - a.reviews);
    }
    return list;
  }, [filters, sort, query]);

  const visible = filtered.slice(0, visibleCount);
  const activeChips = [
    ...filters.categories.map((c) => ({ key: `cat-${c}`, label: getCategoryBySlug(c)?.name })),
    ...(filters.price !== "all" ? [{ key: "price", label: PRICE_RANGES.find((r) => r.id === filters.price)?.label }] : []),
    ...(filters.rating ? [{ key: "rating", label: `${filters.rating}★ & up` }] : []),
    ...filters.badges.map((b) => ({ key: `badge-${b}`, label: b })),
  ];

  const clearAll = () => {
    setFilters({ categories: categorySlug ? [categorySlug] : [], price: "all", rating: null, inStockOnly: false, badges: [] });
    setQuery("");
    setSearchParams({});
  };

  return (
    <div className="bg-sand-50 pb-24">
      {category ? (
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-800 to-ink-900 py-16 text-sand-50 sm:py-20">
          <div className="container-page relative flex flex-col items-center gap-8 text-center lg:flex-row lg:text-left">
            <div className="flex-1">
              <Breadcrumb dark items={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: category.name }]} />
              <h1 className="mt-4 font-display text-3xl font-medium text-sand-50 sm:text-4xl lg:text-5xl">{category.name}</h1>
              <p className="mt-3 max-w-lg text-sand-100/65">{category.description}</p>
            </div>
            <ProductArt icon={category.icon} tint="amber" className="h-40 w-40 shrink-0" />
          </div>
        </div>
      ) : (
        <div className="container-page pt-8">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Products" }]} />
          <h1 className="mt-4 font-display text-3xl font-medium text-ink-900 sm:text-4xl">All Products</h1>
          <p className="mt-2 max-w-xl text-ink-900/55">Browse our complete range of solar products, engineered and warrantied.</p>
        </div>
      )}

      <div className="container-page mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-3xl border border-ink-900/[0.06] bg-white p-6 shadow-soft">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-heading text-base font-bold text-ink-900">Filters</h3>
              {activeChips.length > 0 && (
                <button onClick={clearAll} className="text-xs font-semibold text-primary-700 hover:underline">Clear all</button>
              )}
            </div>
            <ProductFilters filters={filters} setFilters={setFilters} hideCategory={!!categorySlug} />
          </div>
        </aside>

        <div>
          <div className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-soft sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 sm:max-w-xs">
              <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-900/35" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products…"
                className="w-full rounded-full border border-ink-900/10 bg-sand-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary-600"
              />
            </div>
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="btn-outline btn-sm lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </button>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-full border border-ink-900/10 bg-sand-50 px-4 py-2.5 text-sm font-medium outline-none focus:border-primary-600"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.id} value={o.id}>{o.label}</option>
                ))}
              </select>
              <div className="hidden items-center gap-1 rounded-full bg-sand-100 p-1 sm:flex">
                <button onClick={() => setView("grid")} className={`flex h-8 w-8 items-center justify-center rounded-full transition ${view === "grid" ? "bg-white shadow-soft" : ""}`}>
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button onClick={() => setView("list")} className={`flex h-8 w-8 items-center justify-center rounded-full transition ${view === "list" ? "bg-white shadow-soft" : ""}`}>
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-ink-900/55">
              Showing <span className="font-semibold text-ink-900">{Math.min(visible.length, filtered.length)}</span> of{" "}
              <span className="font-semibold text-ink-900">{filtered.length}</span> products
            </p>
            {activeChips.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {activeChips.map((c) => (
                  <span key={c.key} className="flex items-center gap-1.5 rounded-full bg-primary-800/8 px-3 py-1.5 text-xs font-semibold text-primary-800">
                    {c.label}
                  </span>
                ))}
                <button onClick={clearAll} className="flex items-center gap-1 text-xs font-semibold text-ink-900/50 hover:text-red-500">
                  <X className="h-3 w-3" /> Clear
                </button>
              </div>
            )}
          </div>

          {loading ? (
            <div className={`mt-6 grid gap-4 sm:gap-6 ${view === "grid" ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
              {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="mt-6">
              <EmptyState
                icon={SearchIcon}
                title="No products match your filters"
                description="Try adjusting or clearing your filters to see more results."
                action={<button onClick={clearAll} className="btn-primary btn-sm">Clear Filters</button>}
              />
            </div>
          ) : (
            <motion.div
              layout
              className={`mt-6 grid gap-4 sm:gap-6 ${view === "grid" ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}
            >
              {visible.map((p) =>
                view === "grid" ? (
                  <ProductCard key={p.id} product={p} onQuickView={setQuickView} />
                ) : (
                  <ProductListRow key={p.id} product={p} onQuickView={setQuickView} />
                )
              )}
            </motion.div>
          )}

          {!loading && visibleCount < filtered.length && (
            <div className="mt-10 flex justify-center">
              <button onClick={() => setVisibleCount((v) => v + PAGE_SIZE)} className="btn-outline">
                Load More Products
              </button>
            </div>
          )}
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[95] lg:hidden">
          <div className="absolute inset-0 bg-ink-950/50" onClick={() => setMobileFiltersOpen(false)} />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="absolute bottom-0 max-h-[85vh] w-full overflow-y-auto rounded-t-3xl bg-white p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-heading text-lg font-bold text-ink-900">Filters</h3>
              <button onClick={() => setMobileFiltersOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full bg-sand-100">
                <X className="h-4.5 w-4.5" />
              </button>
            </div>
            <ProductFilters filters={filters} setFilters={setFilters} hideCategory={!!categorySlug} />
            <button onClick={() => setMobileFiltersOpen(false)} className="btn-primary mt-6 w-full">
              Show {filtered.length} Results
            </button>
          </motion.div>
        </div>
      )}

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}

function ProductListRow({ product, onQuickView }) {
  return (
    <div className="card card-hover flex gap-5 p-4">
      <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-sand-100 to-sand-200">
        <ProductArt icon={product.icon} tint={product.tint} uid={`row-${product.id}`} className="h-full w-full p-3" />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wide text-primary-700/70">{product.brand}</span>
          <h3 className="font-heading text-base font-bold text-ink-900">{product.name}</h3>
          <p className="mt-1 line-clamp-1 text-sm text-ink-900/50">{product.short}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-heading text-lg font-extrabold text-ink-900">₹{product.price.toLocaleString("en-IN")}</span>
          <div className="flex gap-2">
            <button onClick={() => onQuickView(product)} className="btn-outline btn-sm">Quick View</button>
            <a href={`/product/${product.slug}`} className="btn-primary btn-sm">View</a>
          </div>
        </div>
      </div>
    </div>
  );
}
