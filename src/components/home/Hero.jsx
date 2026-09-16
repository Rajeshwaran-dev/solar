import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, ShieldCheck, Zap } from "lucide-react";
import { HeroRoofscape } from "../illustrations/Decorative";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sand-100 via-sand-50 to-sand-50 pb-16 pt-12 sm:pb-24 sm:pt-16">
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-primary-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 top-0 h-96 w-96 rounded-full bg-accent-300/25 blur-3xl" />

      <div className="container-page relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">
            <Zap className="h-3.5 w-3.5" /> India's Premium Solar Marketplace
          </span>
          <h1 className="mt-6 font-display text-[2.6rem] font-medium leading-[1.05] text-ink-900 sm:text-6xl lg:text-[3.4rem]">
            Power your world,
            <br />
            <span className="text-gradient-solar italic">naturally.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-900/60 sm:text-lg">
            Premium solar water heaters, street lights, power systems and more —
            engineered for Indian homes and businesses, backed by real installers
            and real warranties.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link to="/products" className="btn-accent">
              Explore Products <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="btn-outline">
              Get a Free Quote
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-ink-900/8 pt-7">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="h-5 w-5 text-primary-700" />
              <span className="text-sm font-semibold text-ink-900/70">25-Year Panel Warranty</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="flex -space-x-2">
                {["A", "B", "C"].map((l) => (
                  <span key={l} className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-sand-50 bg-primary-700 text-[10px] font-bold text-white">
                    {l}
                  </span>
                ))}
              </div>
              <span className="text-sm font-semibold text-ink-900/70">18,500+ Happy Homes</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="relative mx-auto w-full max-w-lg"
        >
          <HeroRoofscape className="w-full drop-shadow-2xl" />

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="glass absolute -left-2 top-8 rounded-2xl px-4 py-3 shadow-lift sm:-left-8"
          >
            <p className="text-[10px] font-bold uppercase tracking-wide text-primary-700">Live Generation</p>
            <p className="font-heading text-xl font-extrabold text-ink-900">4.8 kWh</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="glass absolute -right-2 bottom-10 rounded-2xl px-4 py-3 shadow-lift sm:-right-6"
          >
            <p className="text-[10px] font-bold uppercase tracking-wide text-primary-700">Monthly Savings</p>
            <p className="font-heading text-xl font-extrabold text-ink-900">₹3,420</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
