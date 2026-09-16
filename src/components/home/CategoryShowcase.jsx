import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { categories } from "../../data/categories";
import ProductArt from "../illustrations/ProductArt";
import SectionHeading from "../ui/SectionHeading";

export default function CategoryShowcase() {
  return (
    <section className="py-20 sm:py-24 bg-sand-100/40 border-y border-ink-900/[0.05]">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Shop by Category"
            title="Every solar product you need, in one place"
            description="From rooftop power systems to solar water heaters — engineered, tested, and installer-approved."
          />
          <Link to="/products" className="btn-outline btn-sm hidden sm:inline-flex">
            View All Products <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.slice(0, 6).map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                to={`/category/${cat.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink-900/[0.08] bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
              >
                {/* Product Image Header */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-sand-200">
                  <ProductArt
                    icon={cat.icon}
                    alt={cat.name}
                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  <span className="absolute top-3.5 right-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-md shadow-soft transition group-hover:bg-accent-400 group-hover:scale-110">
                    <ArrowUpRight className="h-4.5 w-4.5 text-ink-900" />
                  </span>

                  <span className="absolute bottom-3.5 left-3.5 rounded-full bg-ink-950/80 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-sand-50">
                    {cat.productCount} Products
                  </span>
                </div>

                {/* Card Content Body */}
                <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-ink-900 transition group-hover:text-primary-800">
                      {cat.name}
                    </h3>
                    <p className="mt-1.5 text-xs text-ink-900/60 leading-relaxed">
                      {cat.description || cat.tagline}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-primary-800 group-hover:text-primary-700">
                    <span>Explore Products</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <Link to="/products" className="btn-outline btn-md w-full justify-center">
            View All Products <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
