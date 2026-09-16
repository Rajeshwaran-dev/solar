import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, MessageCircle, ArrowRight } from "lucide-react";
import { faqs } from "../data/content";
import Accordion from "../components/ui/Accordion";
import { Breadcrumb, EmptyState } from "../components/ui/Misc";

const CATEGORIES = ["All", ...new Set(faqs.map((f) => f.category))];

export default function FAQ() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return faqs
      .filter((f) => category === "All" || f.category === category)
      .filter((f) => f.question.toLowerCase().includes(query.toLowerCase()));
  }, [category, query]);

  return (
    <div className="bg-sand-50 pb-24">
      <div className="border-b border-ink-900/8 bg-gradient-to-b from-sand-100 to-sand-50 py-16 sm:py-20">
        <div className="container-page text-center">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
          <h1 className="mx-auto mt-6 max-w-xl font-display text-4xl font-medium text-ink-900 sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <div className="relative mx-auto mt-8 max-w-lg">
            <Search className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-900/35" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search your question…"
              className="w-full rounded-full border border-ink-900/10 bg-white py-3.5 pl-12 pr-4 text-sm shadow-soft outline-none focus:border-primary-600"
            />
          </div>
        </div>
      </div>

      <div className="container-page mt-12 flex flex-wrap justify-center gap-2.5">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              category === c ? "border-primary-800 bg-primary-800 text-sand-50" : "border-ink-900/10 text-ink-900/60 hover:border-primary-700"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="container-page mt-10 max-w-3xl">
        {filtered.length === 0 ? (
          <EmptyState icon={Search} title="No matching questions" description="Try a different keyword or browse all categories." />
        ) : (
          <div className="rounded-3xl bg-white p-6 shadow-soft sm:p-8">
            <Accordion items={filtered} defaultOpen={0} />
          </div>
        )}
      </div>

      <div className="container-page mt-16 max-w-3xl">
        <div className="flex flex-col items-center gap-4 rounded-3xl bg-primary-900 px-6 py-10 text-center text-sand-50 sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-3">
            <MessageCircle className="h-6 w-6 text-accent-400" />
            <p className="font-heading font-semibold">Still have a question?</p>
          </div>
          <Link to="/contact" className="btn-accent">
            Contact Support <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
