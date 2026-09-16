import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Zap, Calendar, ArrowUpRight } from "lucide-react";
import { projects } from "../data/content";
import ProductArt from "../components/illustrations/ProductArt";
import { Breadcrumb } from "../components/ui/Misc";

const ICONS = ["powerSystem", "panel", "waterHeater", "streetLight", "inverter", "battery"];
const CATEGORIES = ["All", ...new Set(projects.map((p) => p.category))];

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <div className="bg-sand-50 pb-24">
      <div className="border-b border-ink-900/8 bg-gradient-to-b from-sand-100 to-sand-50 py-16 sm:py-20">
        <div className="container-page">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Projects" }]} />
          <h1 className="mt-4 max-w-xl font-display text-4xl font-medium text-ink-900 sm:text-5xl">
            Projects powering real places
          </h1>
          <p className="mt-4 max-w-lg text-ink-900/60">
            A portfolio of installations across homes, industries, agriculture and public infrastructure.
          </p>
        </div>
      </div>

      <div className="container-page mt-10">
        <div className="flex flex-wrap gap-2.5">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                filter === c ? "border-primary-800 bg-primary-800 text-sand-50" : "border-ink-900/10 text-ink-900/60 hover:border-primary-700"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <motion.div key={p.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }}>
              <Link to={`/projects/${p.slug}`} className="card card-hover group block overflow-hidden">
                <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-ink-800 to-ink-900">
                  <ProductArt icon={ICONS[i % ICONS.length]} tint="amber" className="h-36 w-36 transition-transform duration-500 group-hover:scale-110" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-ink-900 backdrop-blur">{p.category}</span>
                  <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink-900 opacity-0 transition group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-lg font-bold text-ink-900 transition group-hover:text-primary-800">{p.name}</h3>
                  <p className="mt-2 text-sm text-ink-900/55">{p.summary}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-ink-900/8 pt-4 text-xs font-medium text-ink-900/50">
                    <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {p.location}</span>
                    <span className="flex items-center gap-1.5"><Zap className="h-3.5 w-3.5" /> {p.capacity}</span>
                    <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {p.year}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
