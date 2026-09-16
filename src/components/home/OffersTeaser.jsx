import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Tag, ArrowUpRight } from "lucide-react";
import { offers } from "../../data/content";
import SectionHeading from "../ui/SectionHeading";

const TINT_BG = {
  sky: "from-sky-500 to-sky-700",
  green: "from-primary-600 to-primary-900",
  amber: "from-amber-400 to-amber-600",
};

export default function OffersTeaser() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Limited-Time Offers" title="Deals worth switching for" />
          <Link to="/offers" className="btn-outline btn-sm hidden sm:inline-flex">
            View All Offers <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {offers.slice(0, 3).map((o, i) => (
            <motion.div
              key={o.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                to="/offers"
                className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br p-7 text-sand-50 shadow-soft transition hover:-translate-y-1 hover:shadow-lift ${TINT_BG[o.tint]}`}
              >
                <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/10" />
                <Tag className="h-7 w-7 text-white/90" />
                <div className="relative mt-8">
                  <span className="font-display text-2xl font-medium">{o.discount}</span>
                  <h3 className="mt-2 font-heading text-base font-bold text-sand-50">{o.title}</h3>
                  <p className="mt-1.5 text-xs text-white/70">{o.subtitle}</p>
                  <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-bold tracking-wide backdrop-blur">
                    CODE: {o.code}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
