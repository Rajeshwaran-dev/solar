import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home as HomeIcon, Building2, Factory, Wheat, Lamp, ArrowRight, Check } from "lucide-react";
import { Breadcrumb } from "../components/ui/Misc";
import SectionHeading from "../components/ui/SectionHeading";
import ProductArt from "../components/illustrations/ProductArt";
import { OrbGlow } from "../components/illustrations/Decorative";

const SOLUTIONS = [
  {
    id: "residential",
    icon: HomeIcon,
    title: "Residential",
    tagline: "Solar for homes, villas & apartments",
    art: "powerSystem",
    benefits: [
      "Cut monthly electricity bills by up to 90%",
      "Net-metering & subsidy paperwork handled for you",
      "System sizes from 1kW to 10kW",
      "25-year panel performance warranty",
    ],
  },
  {
    id: "commercial",
    icon: Building2,
    title: "Commercial",
    tagline: "Offices, retail & hospitality",
    art: "inverter",
    benefits: [
      "Reduce daytime operating costs significantly",
      "Three-phase systems from 10kW to 100kW",
      "Fast ROI with commercial electricity tariffs",
      "Minimal roof disruption, weekend installs available",
    ],
  },
  {
    id: "industrial",
    icon: Factory,
    title: "Industrial",
    tagline: "Factories & manufacturing plants",
    art: "panel",
    benefits: [
      "High-capacity systems (100kW+) for heavy loads",
      "Ground-mount or rooftop configurations",
      "Dedicated project management team",
      "SCADA-ready monitoring & reporting",
    ],
  },
  {
    id: "agricultural",
    icon: Wheat,
    title: "Agricultural",
    tagline: "Farms, irrigation & cold storage",
    art: "battery",
    benefits: [
      "Off-grid systems for remote farmland",
      "Solar water pump integration",
      "Reliable power for cold storage units",
      "Government agri-subsidy eligible",
    ],
  },
  {
    id: "outdoor-lighting",
    icon: Lamp,
    title: "Outdoor Lighting",
    tagline: "Streets, societies & public spaces",
    art: "streetLight",
    benefits: [
      "Zero electricity cost street & pathway lighting",
      "Motion-sensor adaptive brightness",
      "Bulk discounts for societies & municipalities",
      "3-5 year maintenance-free operation",
    ],
  },
];

export default function Solutions() {
  const [active, setActive] = useState(SOLUTIONS[0].id);
  const current = SOLUTIONS.find((s) => s.id === active);

  return (
    <div className="bg-sand-50 pb-24">
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-800 to-ink-900 py-16 text-sand-50 sm:py-20">
        <OrbGlow className="right-0 top-0 h-72 w-72" />
        <div className="container-page relative">
          <Breadcrumb dark items={[{ label: "Home", href: "/" }, { label: "Solutions" }]} />
          <h1 className="mt-4 max-w-xl font-display text-4xl font-medium text-sand-50 sm:text-5xl">
            A solar solution for every setting
          </h1>
          <p className="mt-4 max-w-lg text-sand-100/65">
            From a single rooftop to an industrial campus, we engineer systems around real energy needs — not one-size-fits-all packages.
          </p>
        </div>
      </div>

      <div className="container-page mt-12">
        <div className="flex flex-wrap gap-2.5">
          {SOLUTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition ${
                active === s.id ? "border-primary-800 bg-primary-800 text-sand-50" : "border-ink-900/10 text-ink-900/70 hover:border-primary-700"
              }`}
            >
              <s.icon className="h-4 w-4" /> {s.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="mt-10 grid grid-cols-1 items-center gap-10 rounded-3xl bg-white p-8 shadow-soft sm:p-12 lg:grid-cols-2"
          >
            <div>
              <span className="eyebrow">{current.tagline}</span>
              <h2 className="mt-4 font-display text-3xl font-medium text-ink-900">{current.title} Solar Solutions</h2>
              <ul className="mt-6 space-y-3">
                {current.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-ink-900/70">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-700" /> {b}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/contact" className="btn-primary">Get a Free Assessment <ArrowRight className="h-4 w-4" /></Link>
                <Link to="/products" className="btn-outline">Browse Products</Link>
              </div>
            </div>
            <div className="flex justify-center rounded-3xl bg-gradient-to-br from-sand-100 to-sand-200 p-12">
              <ProductArt icon={current.art} tint="green" className="h-56 w-56" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="container-page mt-24">
        <SectionHeading align="center" eyebrow="How It Works" title="From consultation to commissioning" className="mx-auto" />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { step: "01", title: "Free Site Assessment", desc: "Our engineers evaluate your roof, usage and budget." },
            { step: "02", title: "Custom System Design", desc: "A right-sized proposal with transparent pricing." },
            { step: "03", title: "Professional Installation", desc: "Certified technicians complete the install in days." },
            { step: "04", title: "Monitoring & Support", desc: "App-based monitoring plus ongoing maintenance." },
          ].map((s) => (
            <div key={s.step} className="card p-6">
              <span className="font-display text-3xl font-medium text-accent-500">{s.step}</span>
              <h3 className="mt-3 font-heading text-base font-bold text-ink-900">{s.title}</h3>
              <p className="mt-2 text-sm text-ink-900/55">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
