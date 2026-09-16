import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ClipboardList, Wrench, LifeBuoy, Ruler, HeartHandshake, Layers, ArrowRight, Phone,
} from "lucide-react";
import { Breadcrumb } from "../components/ui/Misc";
import SectionHeading from "../components/ui/SectionHeading";

const SERVICES = [
  {
    icon: ClipboardList,
    title: "Solar Consultation",
    desc: "Free, no-obligation consultation to evaluate your energy usage, roof suitability and ideal system size.",
    points: ["Site feasibility check", "Usage & bill analysis", "Custom quotation within 24 hrs"],
  },
  {
    icon: Wrench,
    title: "Installation",
    desc: "Certified in-house technicians handle every install — not outsourced gig workers.",
    points: ["BIS-compliant mounting", "Electrical safety certification", "2-5 day turnaround"],
  },
  {
    icon: LifeBuoy,
    title: "Maintenance",
    desc: "Keep your system performing at peak efficiency with scheduled care.",
    points: ["Annual maintenance visits", "Panel cleaning & inspection", "Performance diagnostics"],
  },
  {
    icon: Ruler,
    title: "Project Planning",
    desc: "For commercial & industrial clients, our team manages the full project lifecycle.",
    points: ["Structural & load engineering", "Regulatory approvals", "Dedicated project manager"],
  },
  {
    icon: HeartHandshake,
    title: "After-Sales Support",
    desc: "Real humans, real warranty follow-through — not a call centre queue.",
    points: ["24/7 support hotline", "Warranty claim assistance", "Spare parts availability"],
  },
  {
    icon: Layers,
    title: "System Solutions",
    desc: "End-to-end design combining panels, inverters, batteries and monitoring.",
    points: ["Custom system architecture", "Hybrid & off-grid design", "Smart monitoring setup"],
  },
];

export default function Services() {
  return (
    <div className="bg-sand-50 pb-24">
      <div className="border-b border-ink-900/8 bg-gradient-to-b from-sand-100 to-sand-50 py-16 sm:py-20">
        <div className="container-page">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
          <h1 className="mt-4 max-w-xl font-display text-4xl font-medium text-ink-900 sm:text-5xl">
            More than a store — a complete solar service partner
          </h1>
          <p className="mt-4 max-w-lg text-ink-900/60">
            From first consultation to years of after-sales support, our
            services cover the entire lifecycle of your solar investment.
          </p>
        </div>
      </div>

      <div className="container-page py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="card group flex flex-col p-7"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-800/8 text-primary-800 transition group-hover:bg-primary-800 group-hover:text-accent-400">
                <s.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-heading text-lg font-bold text-ink-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-900/55">{s.desc}</p>
              <ul className="mt-4 space-y-1.5 border-t border-ink-900/8 pt-4">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-xs text-ink-900/60">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-500" /> {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="container-page">
        <div className="flex flex-col items-center gap-6 rounded-3xl bg-primary-900 px-6 py-14 text-center text-sand-50 sm:flex-row sm:justify-between sm:px-12 sm:text-left">
          <div>
            <SectionHeading dark title="Need a service that's not listed?" className="max-w-md" />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href="tel:+911800123456" className="btn-ghost-light">
              <Phone className="h-4 w-4" /> Call Us
            </a>
            <Link to="/contact" className="btn-accent">
              Get in Touch <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
