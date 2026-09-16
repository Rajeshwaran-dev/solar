import { Link } from "react-router-dom";
import { ArrowRight, Sun } from "lucide-react";
import { OrbGlow } from "../illustrations/Decorative";

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-primary-900 py-20 text-center sm:py-28">
      <OrbGlow className="left-1/4 top-0 h-72 w-72" color="accent" />
      <OrbGlow className="right-1/4 bottom-0 h-72 w-72" color="green" />
      <div className="container-page relative">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-500 animate-spin-slow">
          <Sun className="h-7 w-7 text-ink-950" />
        </span>
        <h2 className="mx-auto mt-7 max-w-2xl font-display text-3xl font-medium leading-tight text-sand-50 sm:text-4xl lg:text-5xl">
          Ready to cut your electricity bill for good?
        </h2>
        <p className="mx-auto mt-5 max-w-md text-sand-100/65">
          Get a free, no-obligation site assessment and personalised solar
          quote within 24 hours.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link to="/contact" className="btn-accent">
            Get a Free Quote <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/products" className="btn-ghost-light">
            Browse Products
          </Link>
        </div>
      </div>
    </section>
  );
}
