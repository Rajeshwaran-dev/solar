import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Zap, ArrowUpRight } from "lucide-react";
import { projects } from "../../data/content";
import ProductArt from "../illustrations/ProductArt";
import SectionHeading from "../ui/SectionHeading";

const ICONS = ["powerSystem", "panel", "waterHeater"];

export default function ProjectsShowcase() {
  const featured = projects.slice(0, 3);
  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Our Work"
            title="Projects powering real places"
            description="A look at installations we've delivered across homes, industries and public infrastructure."
          />
          <Link to="/projects" className="btn-outline btn-sm hidden sm:inline-flex">
            View All Projects <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {featured.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link to={`/projects/${p.slug}`} className="card card-hover group block overflow-hidden">
                <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-ink-800 to-ink-900">
                  <ProductArt icon={ICONS[i % ICONS.length]} tint="amber" className="h-40 w-40 transition-transform duration-500 group-hover:scale-110" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-ink-900 backdrop-blur">
                    {p.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-lg font-bold text-ink-900 transition group-hover:text-primary-800">{p.name}</h3>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-medium text-ink-900/50">
                    <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {p.location}</span>
                    <span className="flex items-center gap-1.5"><Zap className="h-3.5 w-3.5" /> {p.capacity}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <Link to="/projects" className="btn-outline btn-sm mt-8 flex w-full justify-center sm:hidden">
          View All Projects <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
