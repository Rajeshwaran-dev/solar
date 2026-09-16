import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Tag, Copy, ArrowRight, Clock } from "lucide-react";
import { offers } from "../data/content";
import { products } from "../data/products";
import ProductCard from "../components/product/ProductCard";
import QuickViewModal from "../components/product/QuickViewModal";
import { Breadcrumb } from "../components/ui/Misc";
import { useToast } from "../context/ToastContext";
import { useState } from "react";

const TINT_BG = {
  sky: "from-sky-500 to-sky-700",
  green: "from-primary-600 to-primary-900",
  amber: "from-amber-400 to-amber-600",
};

export default function Offers() {
  const toast = useToast();
  const [quickView, setQuickView] = useState(null);
  const dealProducts = products.filter((p) => p.badges?.includes("Sale")).slice(0, 8);

  const copyCode = (code) => {
    navigator.clipboard?.writeText(code).catch(() => {});
    toast?.push(`Coupon code ${code} copied!`);
  };

  return (
    <div className="bg-sand-50 pb-24">
      <div className="relative overflow-hidden bg-gradient-to-br from-accent-500 to-accent-600 py-16 sm:py-20">
        <div className="container-page relative">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Offers" }]} />
          <h1 className="mt-4 max-w-xl font-display text-4xl font-medium text-ink-950 sm:text-5xl">
            Deals worth switching for
          </h1>
          <p className="mt-4 max-w-lg text-ink-950/70">
            Limited-time offers on our most popular solar products and systems.
          </p>
        </div>
      </div>

      <div className="container-page mt-14">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {offers.map((o, i) => (
            <motion.div
              key={o.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`relative flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br p-7 text-sand-50 shadow-soft ${TINT_BG[o.tint]}`}
            >
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
              <div className="relative">
                <Tag className="h-7 w-7 text-white/90" />
                <span className="mt-6 block font-display text-3xl font-medium">{o.discount}</span>
                <h3 className="mt-2 font-heading text-lg font-bold text-sand-50">{o.title}</h3>
                <p className="mt-1.5 text-sm text-white/70">{o.subtitle}</p>
              </div>
              <div className="relative mt-6 flex items-center justify-between gap-3">
                <button
                  onClick={() => copyCode(o.code)}
                  className="flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-2 text-xs font-bold tracking-wide backdrop-blur transition hover:bg-white/25"
                >
                  {o.code} <Copy className="h-3.5 w-3.5" />
                </button>
                <span className="flex items-center gap-1 text-[11px] text-white/60">
                  <Clock className="h-3 w-3" /> {o.expiry === "Ongoing" ? "Ongoing" : `Till ${o.expiry}`}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="container-page mt-20">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl font-medium text-ink-900">Products on Sale Right Now</h2>
          <Link to="/products" className="flex items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-800">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {dealProducts.map((p) => (
            <ProductCard key={p.id} product={p} onQuickView={setQuickView} />
          ))}
        </div>
      </div>

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}
