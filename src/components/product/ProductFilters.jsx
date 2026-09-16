import { Star } from "lucide-react";
import { categories } from "../../data/categories";

const PRICE_RANGES = [
  { id: "all", label: "All Prices", min: 0, max: Infinity },
  { id: "under-2k", label: "Under ₹2,000", min: 0, max: 2000 },
  { id: "2k-20k", label: "₹2,000 – ₹20,000", min: 2000, max: 20000 },
  { id: "20k-100k", label: "₹20,000 – ₹1,00,000", min: 20000, max: 100000 },
  { id: "above-100k", label: "Above ₹1,00,000", min: 100000, max: Infinity },
];

const BADGE_OPTIONS = ["New", "Featured", "Best Seller", "Sale"];

export default function ProductFilters({ filters, setFilters, hideCategory = false }) {
  const toggleCategory = (slug) => {
    setFilters((f) => ({
      ...f,
      categories: f.categories.includes(slug)
        ? f.categories.filter((c) => c !== slug)
        : [...f.categories, slug],
    }));
  };

  const toggleBadge = (b) => {
    setFilters((f) => ({
      ...f,
      badges: f.badges.includes(b) ? f.badges.filter((x) => x !== b) : [...f.badges, b],
    }));
  };

  return (
    <div className="space-y-8">
      {!hideCategory && (
        <div>
          <h4 className="font-heading text-sm font-bold uppercase tracking-wide text-ink-900">Category</h4>
          <div className="mt-4 space-y-3">
            {categories.map((c) => (
              <label key={c.id} className="flex cursor-pointer items-center gap-3 text-sm text-ink-900/70">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(c.slug)}
                  onChange={() => toggleCategory(c.slug)}
                  className="h-4 w-4 rounded border-ink-900/20 text-primary-700 focus:ring-primary-600/30"
                />
                {c.name}
              </label>
            ))}
          </div>
        </div>
      )}

      <div>
        <h4 className="font-heading text-sm font-bold uppercase tracking-wide text-ink-900">Price</h4>
        <div className="mt-4 space-y-3">
          {PRICE_RANGES.map((r) => (
            <label key={r.id} className="flex cursor-pointer items-center gap-3 text-sm text-ink-900/70">
              <input
                type="radio"
                name="price"
                checked={filters.price === r.id}
                onChange={() => setFilters((f) => ({ ...f, price: r.id }))}
                className="h-4 w-4 border-ink-900/20 text-primary-700 focus:ring-primary-600/30"
              />
              {r.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-heading text-sm font-bold uppercase tracking-wide text-ink-900">Rating</h4>
        <div className="mt-4 space-y-3">
          {[4, 3, 2].map((r) => (
            <label key={r} className="flex cursor-pointer items-center gap-2 text-sm text-ink-900/70">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === r}
                onChange={() => setFilters((f) => ({ ...f, rating: r }))}
                className="h-4 w-4 border-ink-900/20 text-primary-700 focus:ring-primary-600/30"
              />
              <span className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-3.5 w-3.5 ${i < r ? "text-accent-500" : "text-sand-300"}`} fill="currentColor" strokeWidth={0} />
                ))}
              </span>
              &amp; up
            </label>
          ))}
          {filters.rating && (
            <button onClick={() => setFilters((f) => ({ ...f, rating: null }))} className="text-xs font-semibold text-primary-700 hover:underline">
              Clear rating
            </button>
          )}
        </div>
      </div>

      <div>
        <h4 className="font-heading text-sm font-bold uppercase tracking-wide text-ink-900">Availability</h4>
        <div className="mt-4 space-y-3">
          <label className="flex cursor-pointer items-center gap-3 text-sm text-ink-900/70">
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={() => setFilters((f) => ({ ...f, inStockOnly: !f.inStockOnly }))}
              className="h-4 w-4 rounded border-ink-900/20 text-primary-700 focus:ring-primary-600/30"
            />
            In Stock Only
          </label>
        </div>
      </div>

      <div>
        <h4 className="font-heading text-sm font-bold uppercase tracking-wide text-ink-900">Tags</h4>
        <div className="mt-4 flex flex-wrap gap-2">
          {BADGE_OPTIONS.map((b) => (
            <button
              key={b}
              onClick={() => toggleBadge(b)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                filters.badges.includes(b)
                  ? "border-primary-800 bg-primary-800 text-sand-50"
                  : "border-ink-900/12 text-ink-900/60 hover:border-primary-700"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export { PRICE_RANGES };
