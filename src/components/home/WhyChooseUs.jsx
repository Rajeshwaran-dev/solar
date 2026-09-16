import { ShieldCheck, Truck, Headset, BadgePercent, Wrench, Award } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { motion } from "framer-motion";

const REASONS = [
  { icon: ShieldCheck, title: "Certified & Warranted", desc: "Every product backed by manufacturer warranties up to 25 years." },
  { icon: Truck, title: "Pan-India Delivery", desc: "Delivery & certified installation across 20+ states." },
  { icon: Wrench, title: "Expert Installation", desc: "In-house trained technicians, not third-party gig installers." },
  { icon: Headset, title: "24/7 Support", desc: "Real humans on call for pre-sales and after-sales queries." },
  { icon: BadgePercent, title: "Subsidy Assistance", desc: "We handle your government subsidy paperwork end-to-end." },
  { icon: Award, title: "15 Years in Solar", desc: "18,500+ installations and counting since 2011." },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-sand-100/70 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          align="center"
          eyebrow="Why Sol Green"
          title="Trusted by thousands of Indian homes & businesses"
          description="We don't just sell solar products — we engineer complete, dependable energy outcomes."
          className="mx-auto"
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="card group flex items-start gap-4 p-6"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-800/8 text-primary-800 transition group-hover:bg-primary-800 group-hover:text-accent-400">
                <r.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-heading text-base font-bold text-ink-900">{r.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-900/55">{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
