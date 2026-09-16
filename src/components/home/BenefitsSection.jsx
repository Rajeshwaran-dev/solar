import { motion } from "framer-motion";
import { Leaf, TrendingDown, Home as HomeIcon, BatteryCharging } from "lucide-react";
import ProductArt from "../illustrations/ProductArt";
import { OrbGlow } from "../illustrations/Decorative";

const BENEFITS = [
  { icon: TrendingDown, stat: "Up to 90%", label: "Reduction in monthly electricity bills" },
  { icon: Leaf, stat: "1.6 tons", label: "CO₂ offset per year, per average home system" },
  { icon: HomeIcon, stat: "+15%", label: "Typical increase in property resale value" },
  { icon: BatteryCharging, stat: "20-25 yrs", label: "Productive lifespan of a solar power system" },
];

export default function BenefitsSection() {
  return (
    <section className="section-dark relative overflow-hidden py-20 sm:py-28">
      <OrbGlow className="left-[-10%] top-[10%] h-72 w-72" color="green" />
      <OrbGlow className="right-[5%] bottom-[5%] h-56 w-56" color="accent" />

      <div className="container-page relative grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <span className="eyebrow-dark">The Solar Advantage</span>
          <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-sand-50 sm:text-4xl lg:text-[2.6rem]">
            Going solar pays you back — in money, and in impact.
          </h2>
          <p className="mt-5 max-w-md text-sand-100/60">
            Every Sol Green system is sized to your actual usage, so you see
            real, measurable returns from day one — not just a good feeling.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-5">
            {BENEFITS.map((b) => (
              <div key={b.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <b.icon className="h-5 w-5 text-accent-400" />
                <p className="mt-3 font-display text-2xl font-medium text-sand-50">{b.stat}</p>
                <p className="mt-1 text-xs leading-snug text-sand-100/55">{b.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto grid max-w-md grid-cols-2 gap-4"
        >
          {["powerSystem", "panel", "battery", "inverter"].map((icon, i) => (
            <div
              key={icon}
              className={`rounded-3xl bg-white/[0.05] p-6 ${i % 2 === 1 ? "mt-8" : ""}`}
            >
              <ProductArt icon={icon} tint="amber" className="h-28 w-28" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
