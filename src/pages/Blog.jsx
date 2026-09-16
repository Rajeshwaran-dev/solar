import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "../data/content";
import { formatDate } from "../lib/format";
import ProductArt from "../components/illustrations/ProductArt";
import { Breadcrumb, EmptyState } from "../components/ui/Misc";

const ICONS = ["waterHeater", "inverter", "panel", "accessory", "streetLight", "battery"];
const CATEGORIES = ["All", ...new Set(blogPosts.map((p) => p.category))];

export default function Blog() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const featured = blogPosts.find((p) => p.featured) ?? blogPosts[0];

  const filtered = useMemo(() => {
    return blogPosts
      .filter((p) => p.id !== featured.id)
      .filter((p) => category === "All" || p.category === category)
      .filter((p) => p.title.toLowerCase().includes(query.toLowerCase()));
  }, [category, query, featured.id]);

  return (
    <div className="bg-sand-50 pb-24">
      <div className="border-b border-ink-900/8 bg-gradient-to-b from-sand-100 to-sand-50 py-16 sm:py-20">
        <div className="container-page">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
          <h1 className="mt-4 max-w-xl font-display text-4xl font-medium text-ink-900 sm:text-5xl">
            The Solar Knowledge Hub
          </h1>
          <p className="mt-4 max-w-lg text-ink-900/60">
            Guides, case studies and practical advice for going solar — written by our own engineering team.
          </p>
        </div>
      </div>

      <div className="container-page mt-12">
        <Link to={`/blog/${featured.slug}`} className="group grid grid-cols-1 gap-8 overflow-hidden rounded-3xl bg-ink-900 lg:grid-cols-2">
          <div className="flex items-center justify-center bg-gradient-to-br from-ink-800 to-ink-900 p-12">
            <ProductArt icon="powerSystem" tint="amber" className="h-48 w-48 transition-transform duration-500 group-hover:scale-110" />
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-12">
            <span className="eyebrow-dark w-fit">Featured Article</span>
            <h2 className="mt-4 font-display text-2xl font-medium text-sand-50 sm:text-3xl">{featured.title}</h2>
            <p className="mt-3 text-sand-100/60">{featured.excerpt}</p>
            <div className="mt-5 flex items-center gap-3 text-xs text-sand-100/50">
              <span>{featured.author}</span> · <span>{formatDate(featured.date)}</span> · <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {featured.readTime}</span>
            </div>
            <span className="mt-6 flex items-center gap-2 text-sm font-bold text-accent-400">
              Read Article <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </div>

      <div className="container-page mt-14 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                category === c ? "border-primary-800 bg-primary-800 text-sand-50" : "border-ink-900/10 text-ink-900/60 hover:border-primary-700"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="relative sm:w-64">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-900/35" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles…"
            className="w-full rounded-full border border-ink-900/10 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary-600"
          />
        </div>
      </div>

      <div className="container-page mt-8">
        {filtered.length === 0 ? (
          <EmptyState icon={Search} title="No articles found" description="Try a different search term or category." />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post, i) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="card card-hover group block overflow-hidden">
                <div className="flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-sand-100 to-sand-200">
                  <ProductArt icon={ICONS[i % ICONS.length]} tint={post.tint} className="h-24 w-24" />
                </div>
                <div className="p-6">
                  <span className="text-[11px] font-bold uppercase tracking-wide text-primary-700">{post.category}</span>
                  <h3 className="mt-2 line-clamp-2 font-heading text-base font-bold leading-snug text-ink-900 transition group-hover:text-primary-800">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-ink-900/50">{post.excerpt}</p>
                  <div className="mt-4 flex items-center gap-3 text-xs text-ink-900/45">
                    <span>{formatDate(post.date)}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
