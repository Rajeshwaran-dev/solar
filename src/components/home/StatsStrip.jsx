import { motion } from "framer-motion";
import { stats } from "../../data/content";

export default function StatsStrip() {
  return (
    <section className="relative z-10 -mt-8 sm:-mt-14">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-ink-900/8 shadow-lift sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.id} className="flex flex-col items-center gap-1 bg-primary-800 px-4 py-7 text-center sm:py-9">
              <span className="font-display text-3xl font-medium text-accent-400 sm:text-4xl">
                {s.value.toLocaleString("en-IN")}
                <span className="text-xl sm:text-2xl">{s.suffix}</span>
              </span>
              <span className="text-xs font-medium text-sand-100/70 sm:text-sm">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
