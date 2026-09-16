import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { categories } from "../../data/categories";
import ProductArt from "../illustrations/ProductArt";
import SectionHeading from "../ui/SectionHeading";

const SIZES = [
  "sm:col-span-2 sm:row-span-2",
  "",
  "",
  "sm:col-span-2",
  "",
  "",
];

export default function CategoryShowcase() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Shop by Category"
            title="Every solar product you need, in one place"
            description="From rooftop power systems to portable lanterns — engineered, tested and installer-approved."
          />
          <Link to="/products" className="btn-outline btn-sm hidden sm:inline-flex">
            View All Products <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-4 sm:grid-rows-2">
          {categories.slice(0, 6).map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={SIZES[i]}
            >
              <Link
                to={`/category/${cat.slug}`}
                className="group relative flex h-full min-h-[190px] flex-col justify-between overflow-hidden rounded-3xl border border-ink-900/[0.06] bg-gradient-to-br from-white to-sand-100 p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-ink-900">{cat.name}</h3>
                    <p className="mt-1 text-xs font-medium text-ink-900/45">{cat.tagline}</p>
                  </div>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white shadow-soft transition group-hover:bg-accent-400">
                    <ArrowUpRight className="h-4 w-4 text-ink-900" />
                  </span>
                </div>
                <div className="flex items-end justify-between">
                  <span className="rounded-full bg-ink-900/5 px-3 py-1 text-[11px] font-bold text-ink-900/60">
                    {cat.productCount} Products
                  </span>
                  <ProductArt
                    icon={cat.icon}
                    tint="green"
                    className="h-24 w-24 shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
