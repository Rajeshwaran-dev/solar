import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Target, Eye, ShieldCheck, Award, HeartHandshake, CheckCircle2, ArrowRight } from "lucide-react";
import ProductArt from "../components/illustrations/ProductArt";
import { OrbGlow } from "../components/illustrations/Decorative";
import SectionHeading from "../components/ui/SectionHeading";
import { Breadcrumb } from "../components/ui/Misc";
import { stats } from "../data/content";

const JOURNEY = [
  { year: "2011", title: "Sol Green Established", desc: "Founded with a vision to promote clean, sustainable, and energy-efficient technologies." },
  { year: "2015", title: "Sector Expansion", desc: "Expanded solutions across residential, commercial, industrial, and agricultural sectors." },
  { year: "2019", title: "Full Energy Portfolio", desc: "Introduced complete energy solutions including solar fencing, pumps, dryers & concentrators." },
  { year: "2022", title: "Tech & Support Network", desc: "Adopted latest technologies backed by an extensive after-sales service network." },
  { year: "2026", title: "Powering a Greener Tomorrow", desc: "Serving thousands of satisfied customers with dependable, long-term energy value." },
];

const VALUES = [
  { icon: Award, title: "Quality", desc: "Maintaining high-quality standards across all products and custom installations." },
  { icon: ShieldCheck, title: "Integrity", desc: "Guided by honesty, transparent pricing, and long-term customer trust." },
  { icon: HeartHandshake, title: "Reliability", desc: "Delivering dependable energy solutions backed by excellent after-sales support." },
  { icon: CheckCircle2, title: "Customer Satisfaction", desc: "Working closely with clients to understand requirements and deliver customized solutions." },
];

const MISSION_POINTS = [
  "Deliver high-quality and innovative energy solutions.",
  "Ensure customer satisfaction through reliable products and services.",
  "Promote environmental sustainability and energy conservation.",
  "Provide professional support and long-term value to our customers.",
  "Contribute to a cleaner and greener future for generations to come.",
];

export default function About() {
  return (
    <div className="bg-sand-50 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sand-100 to-sand-50 pb-16 pt-10">
        <OrbGlow className="right-[-5%] top-10 h-72 w-72" />
        <div className="container-page relative">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About Us" }]} />
          <div className="mt-8 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <span className="eyebrow">About Sol Green</span>
              <h1 className="mt-5 font-display text-4xl font-medium leading-[1.15] text-ink-900 sm:text-5xl">
                Sol Green – Powering a Greener Tomorrow Since 2011.
              </h1>
              <p className="mt-6 text-base leading-relaxed text-ink-900/70">
                Sol Green is a trusted renewable energy solutions company established in 2011 with a vision to promote clean, sustainable, and energy-efficient technologies. Over the years, we have built a strong reputation for delivering reliable products, quality workmanship, and customer-focused services across residential, commercial, industrial, and agricultural sectors.
              </p>
              <Link to="/contact" className="btn-primary mt-8 inline-flex">
                Get in Touch <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            {/* Photo Collage */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="col-span-2 aspect-[16/9] overflow-hidden rounded-3xl border border-ink-900/10 shadow-soft">
                <ProductArt image="/product-5.jpeg" alt="Solar Installation" className="h-full w-full object-cover" />
              </div>
              <div className="aspect-square overflow-hidden rounded-3xl border border-ink-900/10 shadow-soft">
                <ProductArt image="/product-1.jpeg" alt="Solar Power System" className="h-full w-full object-cover" />
              </div>
              <div className="aspect-square overflow-hidden rounded-3xl border border-ink-900/10 shadow-soft">
                <ProductArt image="/product-6.jpeg" alt="Solar Water Heater" className="h-full w-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Story Paragraphs */}
      <section className="py-16 sm:py-24">
        <div className="container-page space-y-16">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="eyebrow">Complete Energy Solutions</span>
              <h2 className="mt-4 font-display text-3xl font-medium text-ink-900">
                Comprehensive Expertise Across All Sectors
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-900/70">
                We specialize in providing complete energy solutions, including power generation systems, energy storage solutions, water heating systems, fencing solutions, pumping systems, street lighting, drying systems, and other innovative renewable energy products.
              </p>
              <p className="mt-4 text-base leading-relaxed text-ink-900/70">
                Our commitment to quality, innovation, and customer satisfaction has enabled us to successfully serve a growing number of customers and projects across residential, commercial, industrial, and agricultural sectors.
              </p>
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-3xl border border-ink-900/10 shadow-lift">
              <ProductArt image="/product-3.jpeg" alt="Solar Solutions" className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div className="order-2 aspect-[4/3] overflow-hidden rounded-3xl border border-ink-900/10 shadow-lift lg:order-1">
              <ProductArt image="/product-4.jpeg" alt="Solar Battery & Inverter System" className="h-full w-full object-cover" />
            </div>
            <div className="order-1 lg:order-2">
              <span className="eyebrow">Customer Commitment</span>
              <h2 className="mt-4 font-display text-3xl font-medium text-ink-900">
                Customized Solutions & Excellent Support
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-900/70">
                At Sol Green, we believe that every customer deserves a dependable and cost-effective energy solution. Our experienced team works closely with clients to understand their requirements and provide customized solutions that deliver long-term value and performance.
              </p>
              <p className="mt-4 text-base leading-relaxed text-ink-900/70">
                Since our inception, we have remained committed to adopting the latest technologies, maintaining high-quality standards, and offering excellent after-sales support. Through continuous improvement and innovation, we strive to contribute to a greener future while helping customers reduce energy costs and achieve energy independence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="bg-sand-100/80 py-20 sm:py-28">
        <div className="container-page grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Vision */}
          <div className="card flex flex-col justify-between p-8 sm:p-10">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-800/10 text-primary-800">
                <Eye className="h-6 w-6" />
              </div>
              <span className="eyebrow mt-6">Our Vision</span>
              <h3 className="mt-3 font-display text-2xl font-bold text-ink-900">Vision</h3>
              <p className="mt-4 text-base leading-relaxed text-ink-900/75">
                To be a leading provider of sustainable energy solutions that empower communities and businesses with clean, reliable, and efficient energy.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="card bg-ink-900 p-8 text-sand-50 sm:p-10 shadow-lift">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-500/20 text-accent-400">
              <Target className="h-6 w-6" />
            </div>
            <span className="eyebrow-dark mt-6">Our Mission</span>
            <h3 className="mt-3 font-display text-2xl font-bold text-sand-50">Mission</h3>
            <ul className="mt-5 space-y-3">
              {MISSION_POINTS.map((pt, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-sand-100/80">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Timeline Journey */}
      <section className="py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading align="center" eyebrow="Our Milestones" title="Sol Green Journey Since 2011" className="mx-auto" />
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
                <p className="text-sm text-ink-900/60">{j.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-dark py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading dark align="center" eyebrow="Our Principles" title="Our Core Values" className="mx-auto" />
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-sand-100/60">
            Our success is driven by our dedication to quality, integrity, reliability, and customer satisfaction. These values continue to guide us as we expand our services and strengthen our position as a trusted name in the renewable energy industry.
          </p>
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center shadow-soft">
                <v.icon className="mx-auto h-7 w-7 text-accent-400" />
                <h3 className="mt-4 font-heading text-base font-bold text-sand-50">{v.title}</h3>
                <p className="mt-2 text-sm text-sand-100/60">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
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

      {/* Final CTA */}
      <section className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-primary-900 px-6 py-16 text-center sm:px-16 shadow-lift">
          <OrbGlow className="left-10 top-0 h-56 w-56" />
          <h2 className="relative font-display text-3xl font-medium text-sand-50 sm:text-4xl">
            Want to be our next success story?
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-sand-100/65">
            Talk to our experienced team about custom, long-term renewable energy solutions for your home or business.
          </p>
          <Link to="/contact" className="btn-accent relative mt-8 inline-flex">
            Get in Touch <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
