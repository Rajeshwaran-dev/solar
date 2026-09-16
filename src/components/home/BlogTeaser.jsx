import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { blogPosts } from "../../data/content";
import { formatDate } from "../../lib/format";
import ProductArt from "../illustrations/ProductArt";
import SectionHeading from "../ui/SectionHeading";

export default function BlogTeaser() {
  const posts = blogPosts.slice(0, 3);
  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Solar Knowledge Hub" title="Learn before you switch" />
          <Link to="/blog" className="btn-outline btn-sm hidden sm:inline-flex">
            Visit Blog <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link to={`/blog/${post.slug}`} className="card card-hover group block overflow-hidden">
                <div className="flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-sand-100 to-sand-200">
                  <ProductArt icon={["panel", "inverter", "waterHeater"][i % 3]} tint={post.tint} className="h-24 w-24" />
                </div>
                <div className="p-6">
                  <span className="text-[11px] font-bold uppercase tracking-wide text-primary-700">{post.category}</span>
                  <h3 className="mt-2 line-clamp-2 font-heading text-base font-bold leading-snug text-ink-900 transition group-hover:text-primary-800">
                    {post.title}
                  </h3>
                  <div className="mt-4 flex items-center gap-3 text-xs text-ink-900/45">
                    <span>{formatDate(post.date)}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
