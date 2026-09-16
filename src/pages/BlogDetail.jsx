import { useParams, Link, Navigate } from "react-router-dom";
import { Clock, Link as LinkIcon } from "lucide-react";
import { blogPosts, getBlogBySlug } from "../data/content";
import { formatDate } from "../lib/format";
import ProductArt from "../components/illustrations/ProductArt";
import { Breadcrumb } from "../components/ui/Misc";
import { useToast } from "../context/ToastContext";
import { LinkedinIcon, FacebookIcon } from "../components/ui/SocialIcons";

const ICONS = ["waterHeater", "inverter", "panel", "accessory", "streetLight", "battery"];

export default function BlogDetail() {
  const { slug } = useParams();
  const post = getBlogBySlug(slug);
  const toast = useToast();
  if (!post) return <Navigate to="/blog" replace />;

  const related = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="bg-sand-50 pb-24">
      <div className="container-page pt-8">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title }]} />
      </div>

      <div className="container-page mt-6 max-w-3xl">
        <span className="eyebrow">{post.category}</span>
        <h1 className="mt-4 font-display text-3xl font-medium leading-tight text-ink-900 sm:text-4xl">{post.title}</h1>
        <div className="mt-5 flex items-center gap-3 text-sm text-ink-900/50">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-800 text-xs font-bold text-sand-50">
            {post.author[0]}
          </span>
          <span>{post.author}</span> · <span>{formatDate(post.date)}</span>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
        </div>
      </div>

      <div className="container-page mt-8 flex aspect-[16/7] max-w-4xl items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-sand-100 to-sand-200">
        <ProductArt icon="powerSystem" tint={post.tint} className="h-40 w-40" />
      </div>

      <div className="container-page mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_200px]">
        <article className="max-w-3xl space-y-5 text-base leading-relaxed text-ink-900/70">
          <p className="text-lg font-medium text-ink-900/85">{post.excerpt}</p>
          {post.content?.map((para, i) => <p key={i}>{para}</p>)}
        </article>

        <aside className="h-fit">
          <p className="mb-3 text-xs font-heading font-bold uppercase tracking-wide text-ink-900/50">Share</p>
          <div className="flex gap-2 lg:flex-col">
            <button onClick={() => toast?.push("Shared to Facebook", "info")} className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink-900 shadow-soft transition hover:bg-primary-800 hover:text-sand-50">
              <FacebookIcon className="h-4 w-4" />
            </button>
            <button onClick={() => toast?.push("Shared to LinkedIn", "info")} className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink-900 shadow-soft transition hover:bg-primary-800 hover:text-sand-50">
              <LinkedinIcon className="h-4 w-4" />
            </button>
            <button onClick={() => toast?.push("Link copied to clipboard")} className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink-900 shadow-soft transition hover:bg-primary-800 hover:text-sand-50">
              <LinkIcon className="h-4 w-4" />
            </button>
          </div>
        </aside>
      </div>

      <div className="container-page mt-20">
        <h2 className="font-display text-2xl font-medium text-ink-900">Related Articles</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {related.map((p, i) => (
            <Link key={p.id} to={`/blog/${p.slug}`} className="card card-hover group block overflow-hidden">
              <div className="flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-sand-100 to-sand-200">
                <ProductArt icon={ICONS[i % ICONS.length]} tint={p.tint} className="h-20 w-20" />
              </div>
              <div className="p-5">
                <h3 className="line-clamp-2 font-heading text-sm font-bold text-ink-900 group-hover:text-primary-800">{p.title}</h3>
                <p className="mt-2 text-xs text-ink-900/45">{formatDate(p.date)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
