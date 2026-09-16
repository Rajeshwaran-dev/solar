import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Search as SearchIcon, TrendingUp, Clock, X } from "lucide-react";
import { products } from "../data/products";
import { categories } from "../data/categories";
import ProductCard from "../components/product/ProductCard";
import QuickViewModal from "../components/product/QuickViewModal";
import { EmptyState } from "../components/ui/Misc";

const POPULAR = ["Solar Water Heater", "Street Light", "Inverter", "5kW System", "Lantern", "Battery"];
const RECENT_KEY = "solgreen_recent_searches_v1";

function readRecent() {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";
  const [input, setInput] = useState(initialQ);
  const [committed, setCommitted] = useState(initialQ);
  const [recent, setRecent] = useState(readRecent());
  const [quickView, setQuickView] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setInput(initialQ);
    setCommitted(initialQ);
  }, [initialQ]);

  const suggestions = useMemo(() => {
    if (!input.trim()) return [];
    return products.filter((p) => p.name.toLowerCase().includes(input.toLowerCase())).slice(0, 6);
  }, [input]);

  const results = useMemo(() => {
    if (!committed.trim()) return [];
    const q = committed.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.short.toLowerCase().includes(q)
    );
  }, [committed]);

  const commitSearch = (value) => {
    const v = value.trim();
    if (!v) return;
    setCommitted(v);
    setSearchParams({ q: v });
    const next = [v, ...recent.filter((r) => r !== v)].slice(0, 6);
    setRecent(next);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  };

  const clearRecent = () => {
    setRecent([]);
    localStorage.removeItem(RECENT_KEY);
  };

  return (
    <div className="bg-sand-50 pb-24">
      <div className="border-b border-ink-900/8 bg-gradient-to-b from-sand-100 to-sand-50 py-12">
        <div className="container-page">
          <h1 className="text-center font-display text-3xl font-medium text-ink-900 sm:text-4xl">Search Sol Green Solar</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              commitSearch(input);
            }}
            className="relative mx-auto mt-8 max-w-2xl"
          >
            <SearchIcon className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-900/35" />
            <input
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search for solar water heaters, panels, batteries…"
              className="w-full rounded-full border border-ink-900/10 bg-white py-4 pl-14 pr-32 text-sm shadow-soft outline-none focus:border-primary-600"
            />
            <button type="submit" className="btn-primary btn-sm absolute right-2 top-1/2 -translate-y-1/2">Search</button>

            {input && suggestions.length > 0 && committed !== input && (
              <div className="absolute inset-x-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-2xl border border-ink-900/8 bg-white shadow-lift">
                {suggestions.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setInput(p.name);
                      commitSearch(p.name);
                    }}
                    className="flex w-full items-center gap-3 px-5 py-3 text-left text-sm hover:bg-sand-100"
                  >
                    <SearchIcon className="h-3.5 w-3.5 text-ink-900/30" />
                    <span className="text-ink-900/80">{p.name}</span>
                    <span className="ml-auto text-xs text-ink-900/40">{categories.find((c) => c.slug === p.category)?.name}</span>
                  </button>
                ))}
              </div>
            )}
          </form>
        </div>
      </div>

      <div className="container-page mt-10">
        {!committed ? (
          <div className="mx-auto max-w-2xl space-y-10">
            <div>
              <h3 className="flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-ink-900/60">
                <TrendingUp className="h-4 w-4" /> Popular Searches
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {POPULAR.map((p) => (
                  <button key={p} onClick={() => { setInput(p); commitSearch(p); }} className="rounded-full border border-ink-900/10 bg-white px-4 py-2 text-sm font-medium text-ink-900/70 transition hover:border-primary-700 hover:text-primary-800">
                    {p}
                  </button>
                ))}
              </div>
            </div>
            {recent.length > 0 && (
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-ink-900/60">
                    <Clock className="h-4 w-4" /> Recent Searches
                  </h3>
                  <button onClick={clearRecent} className="text-xs font-semibold text-ink-900/40 hover:text-red-500">Clear</button>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {recent.map((r) => (
                    <button key={r} onClick={() => { setInput(r); commitSearch(r); }} className="flex items-center gap-2 rounded-full bg-sand-100 px-4 py-2 text-sm font-medium text-ink-900/70 transition hover:bg-sand-200">
                      <Clock className="h-3.5 w-3.5" /> {r}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : results.length === 0 ? (
          <EmptyState
            icon={SearchIcon}
            title={`No results for "${committed}"`}
            description="Try a different keyword, or browse our product categories below."
            action={<button onClick={() => navigate("/products")} className="btn-primary btn-sm">Browse All Products</button>}
          />
        ) : (
          <>
            <p className="mb-6 text-sm text-ink-900/55">
              <span className="font-semibold text-ink-900">{results.length}</span> results for “{committed}”
            </p>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 xl:grid-cols-4">
              {results.map((p) => <ProductCard key={p.id} product={p} onQuickView={setQuickView} />)}
            </div>
          </>
        )}
      </div>

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}
