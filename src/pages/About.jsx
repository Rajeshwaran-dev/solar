import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Target, Eye, Leaf, HeartHandshake, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import ProductArt from "../components/illustrations/ProductArt";
import { OrbGlow } from "../components/illustrations/Decorative";
import SectionHeading from "../components/ui/SectionHeading";
import { Breadcrumb } from "../components/ui/Misc";
import { stats } from "../data/content";

const JOURNEY = [
  { year: "2011", title: "Founded in Bengaluru", desc: "Started as a two-person team installing solar water heaters for local homes." },
  { year: "2015", title: "First 1,000 Installations", desc: "Expanded into street lighting and off-grid systems across Karnataka." },
  { year: "2019", title: "Pan-India Expansion", desc: "Launched certified installer network across 12 states." },
  { year: "2022", title: "Manufacturing Partnership", desc: "Began co-engineering panels and inverters with domestic manufacturers." },
  { year: "2026", title: "18,500+ Homes Powered", desc: "Crossed 42MW of cumulative installed capacity nationwide." },
];

const VALUES = [
  { icon: ShieldCheck, title: "Integrity", desc: "Transparent pricing, honest sizing, no upsell pressure." },
  { icon: Sparkles, title: "Craftsmanship", desc: "Every install treated like it's for our own home." },
  { icon: Leaf, title: "Sustainability", desc: "We measure success in tons of CO₂ offset, not just revenue." },
  { icon: HeartHandshake, title: "Long-Term Trust", desc: "Warranty support that actually shows up when called." },
];

export default function About() {
  return (
    <div className="bg-sand-50 pb-24">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sand-100 to-sand-50 pb-16 pt-10">
        <OrbGlow className="right-[-5%] top-10 h-72 w-72" />
        <div className="container-page relative">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />
          <div className="mt-8 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <span className="eyebrow">Our Story</span>
              <h1 className="mt-5 font-display text-4xl font-medium leading-[1.1] text-ink-900 sm:text-5xl">
                Fifteen years of turning sunlight into savings.
              </h1>
              <p className="mt-6 max-w-md text-ink-900/60">
                Sol Green Solar began with a simple belief: renewable energy
                should be accessible, dependable, and beautifully engineered —
                not a compromise. Today we're one of India's most trusted
                solar product and solutions brands.
              </p>
              <Link to="/contact" className="btn-primary mt-8 inline-flex">
                Work With Us <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="col-span-2 rounded-3xl bg-primary-800 p-8">
                <ProductArt icon="powerSystem" tint="amber" className="mx-auto h-32 w-32" />
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-soft">
                <ProductArt icon="panel" tint="green" className="h-20 w-20" />
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-soft">
                <ProductArt icon="waterHeater" tint="sky" className="h-20 w-20" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story blocks */}
      <section className="py-20 sm:py-28">
        <div className="container-page space-y-20">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <span className="eyebrow">The Beginning</span>
              <h2 className="mt-4 font-display text-3xl font-medium text-ink-900">
                It started with one leaking, unreliable water heater.
              </h2>
              <p className="mt-4 text-ink-900/60">
                Our founder's own electric geyser failed one winter, and the
                repair quote cost nearly as much as a solar alternative. That
                small moment of arithmetic became a company — one committed to
                making the economics of solar obvious to every Indian household.
              </p>
            </div>
            <div className="order-1 flex justify-center rounded-3xl bg-gradient-to-br from-sky-50 to-sand-100 p-12 lg:order-2">
              <ProductArt icon="waterHeater" tint="sky" className="h-52 w-52" />
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div className="flex justify-center rounded-3xl bg-gradient-to-br from-primary-50 to-sand-100 p-12">
              <ProductArt icon="powerSystem" tint="green" className="h-52 w-52" />
            </div>
            <div>
              <span className="eyebrow">Today</span>
              <h2 className="mt-4 font-display text-3xl font-medium text-ink-900">
                A full-stack solar company, not just a storefront.
              </h2>
              <p className="mt-4 text-ink-900/60">
                We now design, sell, install and maintain complete solar
                ecosystems — from single lanterns to industrial rooftop
                arrays — backed by an in-house engineering and installer team
                across 20+ states.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="bg-sand-100/70 py-20 sm:py-28">
        <div className="container-page grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="card p-8">
            <Target className="h-8 w-8 text-primary-700" />
            <h3 className="mt-5 font-heading text-xl font-bold text-ink-900">Our Mission</h3>
            <p className="mt-3 text-ink-900/60">
              To make dependable solar energy the default choice for Indian
              homes and businesses — through honest sizing, quality hardware,
              and installation you can trust.
            </p>
          </div>
          <div className="card bg-ink-900 p-8 text-sand-50">
            <Eye className="h-8 w-8 text-accent-400" />
            <h3 className="mt-5 font-heading text-xl font-bold text-sand-50">Our Vision</h3>
            <p className="mt-3 text-sand-100/65">
              A future where every rooftop in India generates clean power —
              and where switching to solar is as simple as ordering it online.
            </p>
          </div>
        </div>
      </section>

      {/* Solar Journey timeline */}
      <section className="py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading align="center" eyebrow="Our Journey" title="Fifteen years, one milestone at a time" className="mx-auto" />
          <div className="relative mx-auto mt-16 max-w-3xl">
            <div className="absolute left-4 top-0 h-full w-0.5 bg-ink-900/10 sm:left-1/2" />
            {JOURNEY.map((j, i) => (
              <motion.div
                key={j.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`relative mb-10 flex flex-col gap-2 pl-12 sm:w-1/2 sm:pl-0 sm:pr-10 ${
                  i % 2 === 1 ? "sm:ml-auto sm:pl-10 sm:pr-0 sm:text-left" : "sm:text-right"
                }`}
              >
                <span className="absolute left-2.5 top-1 h-3 w-3 rounded-full bg-accent-500 sm:left-auto sm:right-[-6px] sm:top-1.5" style={i % 2 === 1 ? { left: "-6px", right: "auto" } : {}} />
                <span className="font-display text-2xl font-medium text-primary-700">{j.year}</span>
                <h3 className="font-heading text-base font-bold text-ink-900">{j.title}</h3>
                <p className="text-sm text-ink-900/55">{j.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-dark py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading dark align="center" eyebrow="What Drives Us" title="Our company values" className="mx-auto" />
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center">
                <v.icon className="mx-auto h-7 w-7 text-accent-400" />
                <h3 className="mt-4 font-heading text-base font-bold text-sand-50">{v.title}</h3>
                <p className="mt-2 text-sm text-sand-100/55">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container-page grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.id} className="text-center">
              <p className="font-display text-3xl font-medium text-primary-800 sm:text-4xl">
                {s.value.toLocaleString("en-IN")}{s.suffix}
              </p>
              <p className="mt-1 text-sm text-ink-900/55">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-primary-900 px-6 py-16 text-center sm:px-16">
          <OrbGlow className="left-10 top-0 h-56 w-56" />
          <h2 className="relative font-display text-3xl font-medium text-sand-50 sm:text-4xl">
            Want to be our next success story?
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-sand-100/65">
            Talk to our team about the right solar solution for your home or business.
          </p>
          <Link to="/contact" className="btn-accent relative mt-8 inline-flex">
            Get in Touch <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
