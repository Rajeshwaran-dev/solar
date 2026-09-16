import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ProductCard from "../product/ProductCard";
import QuickViewModal from "../product/QuickViewModal";
import SectionHeading from "../ui/SectionHeading";

export default function ProductRail({ eyebrow, title, description, products, viewAllHref = "/products", dark = false }) {
  const [quickView, setQuickView] = useState(null);

  return (
    <section className={`py-20 sm:py-28 ${dark ? "section-dark" : ""}`}>
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} dark={dark} />
          <Link to={viewAllHref} className={`btn-sm hidden sm:inline-flex ${dark ? "btn-ghost-light" : "btn-outline"}`}>
            View All <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onQuickView={setQuickView} />
          ))}
        </div>

        <Link to={viewAllHref} className={`btn-outline btn-sm mt-8 flex w-full justify-center sm:hidden ${dark ? "btn-ghost-light" : ""}`}>
          View All <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </section>
  );
}
