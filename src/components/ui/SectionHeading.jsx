import { motion } from "framer-motion";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  className = "",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""} ${className}`}
    >
      {eyebrow && <span className={dark ? "eyebrow-dark" : "eyebrow"}>{eyebrow}</span>}
      <h2
        className={`mt-4 font-display text-3xl font-bold tracking-tight leading-[1.15] sm:text-4xl lg:text-[2.6rem] ${
          dark ? "text-sand-50" : "text-ink-900"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base leading-relaxed ${dark ? "text-sand-100/65" : "text-ink-900/60"}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
