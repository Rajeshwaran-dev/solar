import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "../../data/content";
import Rating from "../ui/Rating";
import SectionHeading from "../ui/SectionHeading";

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 5500);
    return () => clearInterval(t);
  }, []);

  const current = testimonials[index];

  return (
    <section className="bg-sand-100/70 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          align="center"
          eyebrow="Customer Stories"
          title="Real homes. Real savings. Real reviews."
          className="mx-auto"
        />

        <div className="relative mx-auto mt-14 max-w-3xl">
          <Quote className="mx-auto h-10 w-10 text-accent-400" />
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <p className="mt-6 font-display text-xl font-medium leading-relaxed text-ink-900 sm:text-2xl">
                “{current.quote}”
              </p>
              <div className="mt-6 flex flex-col items-center gap-2">
                <Rating value={current.rating} />
                <p className="font-heading text-sm font-bold text-ink-900">{current.name}</p>
                <p className="text-xs text-ink-900/50">{current.role} · {current.system}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-soft transition hover:bg-primary-800 hover:text-sand-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-primary-800" : "w-2 bg-ink-900/15"}`}
                />
              ))}
            </div>
            <button
              onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-soft transition hover:bg-primary-800 hover:text-sand-50"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
