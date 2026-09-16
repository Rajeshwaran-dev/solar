import { Link } from "react-router-dom";
import { faqs } from "../../data/content";
import Accordion from "../ui/Accordion";
import SectionHeading from "../ui/SectionHeading";

export default function FaqTeaser() {
  return (
    <section className="bg-sand-100/70 py-20 sm:py-28">
      <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <SectionHeading eyebrow="FAQ" title="Questions? We've got answers." />
          <p className="mt-5 max-w-sm text-sm text-ink-900/55">
            Still curious about pricing, subsidies, warranty or installation
            timelines? Browse our full FAQ or get in touch directly.
          </p>
          <Link to="/faq" className="btn-primary mt-7 inline-flex">View All FAQs</Link>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-soft sm:p-8">
          <Accordion items={faqs.slice(0, 5)} defaultOpen={0} />
        </div>
      </div>
    </section>
  );
}
