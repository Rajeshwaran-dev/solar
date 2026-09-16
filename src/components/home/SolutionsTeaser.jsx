import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home as HomeIcon, Building2, Factory, Wheat, Lamp, ArrowRight } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";

const SOLUTIONS = [
  { icon: HomeIcon, title: "Residential", desc: "Rooftop systems sized for homes & villas.", tint: "from-primary-700 to-primary-900" },
  { icon: Building2, title: "Commercial", desc: "Offices, retail & hospitality installations.", tint: "from-sky-600 to-sky-800" },
  { icon: Factory, title: "Industrial", desc: "High-capacity systems for factories.", tint: "from-ink-700 to-ink-900" },
  { icon: Wheat, title: "Agricultural", desc: "Irrigation pumps & farm electrification.", tint: "from-amber-600 to-amber-800" },
  { icon: Lamp, title: "Outdoor Lighting", desc: "Street lights & public infrastructure.", tint: "from-primary-600 to-ink-800" },
];

export default function SolutionsTeaser() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Solar Solutions"
          title="A solar solution engineered for every setting"
          description="Whether it's a single home or an industrial campus, we design systems around real energy needs."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {SOLUTIONS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}
            >
              <Link
                to="/solutions"
                className={`group relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br p-6 text-sand-50 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${s.tint}`}
              >
                <s.icon className="h-8 w-8 text-accent-400" />
                <div>
                  <h3 className="font-heading text-lg font-bold text-sand-50">{s.title}</h3>
                  <p className="mt-1.5 text-xs leading-snug text-sand-100/70">{s.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-accent-400 opacity-0 transition group-hover:opacity-100">
                    Learn more <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
