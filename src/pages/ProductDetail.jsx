import { useEffect, useMemo, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Heart, Share2, ShoppingCart, Zap, ShieldCheck, Truck, RotateCcw,
  Star, ChevronRight, Check,
} from "lucide-react";
import { getProductBySlug, getRelatedProducts, products } from "../data/products";
import { faqs, reviewSamples } from "../data/content";
import ProductArt from "../components/illustrations/ProductArt";
import Rating from "../components/ui/Rating";
import Badge, { DiscountBadge, StatusBadge } from "../components/ui/Badge";
import Accordion from "../components/ui/Accordion";
import { QuantityStepper, Breadcrumb } from "../components/ui/Misc";
import { formatPrice, discountPercent } from "../lib/format";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { addRecentlyViewed, getRecentlyViewed } from "../lib/recentlyViewed";
import ProductCard from "../components/product/ProductCard";
import QuickViewModal from "../components/product/QuickViewModal";
import { getCategoryBySlug } from "../data/categories";

const TABS = ["Description", "Features", "Specifications", "Applications", "Warranty", "Reviews", "FAQs"];

const GALLERY_STYLES = [
  { label: "Studio", bg: "from-sand-100 to-sand-200", transform: "" },
  { label: "Detail", bg: "from-primary-50 to-sand-100", transform: "scale-125" },
  { label: "In Context", bg: "from-ink-800 to-ink-900", transform: "" },
  { label: "Specs", bg: "from-accent-50 to-sand-100", transform: "scale-90" },
];

export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const toast = useToast();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [tab, setTab] = useState("Description");
  const [quickView, setQuickView] = useState(null);

  useEffect(() => {
    if (product) {
      addRecentlyViewed(product.id);
      setActiveImg(0);
      setQty(1);
      window.scrollTo({ top: 0 });
    }
  }, [product]);

  const recentlyViewedIds = useMemo(() => (product ? getRecentlyViewed(product.id) : []), [product]);
  const recentlyViewed = products.filter((p) => recentlyViewedIds.includes(p.id)).slice(0, 4);

  if (!product) return <Navigate to="/products" replace />;

  const category = getCategoryBySlug(product.category);
  const discount = discountPercent(product.price, product.mrp);
  const related = getRelatedProducts(product, 4);
  const productFaqs = faqs.filter((f) => f.category === "Products").slice(0, 4);
  const ratingBreakdown = [68, 20, 7, 3, 2];

  return (
    <div className="bg-sand-50 pb-24">
      <div className="container-page pt-6">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            ...(category ? [{ label: category.name, href: `/category/${category.slug}` }] : []),
            { label: product.name },
          ]}
        />
      </div>

      <div className="container-page mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Gallery */}
        <div>
          <motion.div
            key={activeImg}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            className={`relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br ${GALLERY_STYLES[activeImg].bg} shadow-soft`}
          >
            <ProductArt
              icon={product.icon}
              tint={activeImg === 2 ? "amber" : product.tint}
              uid={`main-${product.id}`}
              className={`h-4/5 w-4/5 ${GALLERY_STYLES[activeImg].transform}`}
            />
            <div className="absolute left-4 top-4 flex flex-col gap-1.5">
              {product.badges?.map((b) => <Badge key={b} tone={b}>{b}</Badge>)}
              <DiscountBadge percent={discount} />
            </div>
          </motion.div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {GALLERY_STYLES.map((g, i) => (
              <button
                key={g.label}
                onClick={() => setActiveImg(i)}
                className={`relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${g.bg} transition ${
                  activeImg === i ? "ring-2 ring-primary-700 ring-offset-2" : "opacity-70 hover:opacity-100"
                }`}
              >
                <ProductArt icon={product.icon} tint={i === 2 ? "amber" : product.tint} uid={`thumb-${product.id}-${i}`} className="h-3/4 w-3/4" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-primary-700/70">{product.brand}</span>
          <h1 className="mt-1.5 font-heading text-2xl font-extrabold leading-tight text-ink-900 sm:text-3xl">{product.name}</h1>

          <div className="mt-3 flex items-center gap-4">
            <button onClick={() => setTab("Reviews")} className="transition hover:opacity-80">
              <Rating value={product.rating} count={product.reviews} />
            </button>
            <StatusBadge status={product.stock === "in" ? "In Stock" : product.stock === "low" ? "Low Stock" : "Out of Stock"} />
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-heading text-3xl font-extrabold text-ink-900">{formatPrice(product.price)}</span>
            {discount > 0 && (
              <>
                <span className="text-lg text-ink-900/35 line-through">{formatPrice(product.mrp)}</span>
                <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-600">Save {discount}%</span>
              </>
            )}
          </div>
          <p className="mt-1 text-xs text-ink-900/45">Inclusive of all taxes. Free shipping on this item.</p>

          <p className="mt-5 text-sm leading-relaxed text-ink-900/65">{product.short}</p>

          <ul className="mt-5 space-y-2">
            {product.features?.slice(0, 4).map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-ink-900/75">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-700" /> {f}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <span className="text-sm font-semibold text-ink-900">Quantity</span>
            <QuantityStepper value={qty} onChange={setQty} />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => addToCart(product, qty)} className="btn-outline flex-1">
              <ShoppingCart className="h-4 w-4" /> Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart(product, qty);
                toast?.push("Proceeding to checkout…");
              }}
              className="btn-accent flex-1"
            >
              <Zap className="h-4 w-4" /> Buy Now
            </button>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => toggleWishlist(product)}
              className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                isWishlisted(product.id) ? "border-red-400 bg-red-50 text-red-500" : "border-ink-900/12 text-ink-900/70 hover:border-primary-700"
              }`}
            >
              <Heart className="h-4 w-4" fill={isWishlisted(product.id) ? "currentColor" : "none"} /> Wishlist
            </button>
            <button
              onClick={() => toast?.push("Link copied to clipboard", "info")}
              className="flex items-center gap-2 rounded-full border border-ink-900/12 px-4 py-2.5 text-sm font-semibold text-ink-900/70 transition hover:border-primary-700"
            >
              <Share2 className="h-4 w-4" /> Share
            </button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 border-t border-ink-900/8 pt-6">
            <div className="flex flex-col items-center gap-2 text-center">
              <ShieldCheck className="h-5 w-5 text-primary-700" />
              <span className="text-[11px] font-medium leading-tight text-ink-900/60">{product.warranty}</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <Truck className="h-5 w-5 text-primary-700" />
              <span className="text-[11px] font-medium leading-tight text-ink-900/60">Free Pan-India Delivery</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <RotateCcw className="h-5 w-5 text-primary-700" />
              <span className="text-[11px] font-medium leading-tight text-ink-900/60">7-Day Replacement</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container-page mt-16">
        <div className="scrollbar-none flex gap-1 overflow-x-auto border-b border-ink-900/8">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`shrink-0 whitespace-nowrap border-b-2 px-5 py-3.5 text-sm font-semibold transition ${
                tab === t ? "border-primary-800 text-primary-800" : "border-transparent text-ink-900/50 hover:text-ink-900"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="py-10">
          {tab === "Description" && (
            <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-ink-900/70">
              <p>{product.description}</p>
            </div>
          )}

          {tab === "Features" && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {product.features?.map((f) => (
                <div key={f} className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-soft">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-700" />
                  <span className="text-sm text-ink-900/75">{f}</span>
                </div>
              ))}
            </div>
          )}

          {tab === "Specifications" && (
            <div className="max-w-2xl overflow-hidden rounded-2xl border border-ink-900/8">
              {Object.entries(product.specs ?? {}).map(([k, v], i) => (
                <div key={k} className={`flex justify-between px-5 py-3.5 text-sm ${i % 2 === 0 ? "bg-white" : "bg-sand-100/60"}`}>
                  <span className="font-medium text-ink-900/55">{k}</span>
                  <span className="font-semibold text-ink-900">{v}</span>
                </div>
              ))}
            </div>
          )}

          {tab === "Applications" && (
            <div className="flex flex-wrap gap-3">
              {product.applications?.map((a) => (
                <span key={a} className="rounded-full bg-primary-800/8 px-4 py-2 text-sm font-semibold text-primary-800">{a}</span>
              ))}
            </div>
          )}

          {tab === "Warranty" && (
            <div className="max-w-xl rounded-2xl bg-white p-6 shadow-soft">
              <ShieldCheck className="h-8 w-8 text-primary-700" />
              <p className="mt-3 font-heading text-lg font-bold text-ink-900">{product.warranty}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-900/60">
                Warranty covers manufacturing defects and performance degradation beyond rated
                thresholds. Register your product within 30 days of delivery for expedited claims.
              </p>
            </div>
          )}

          {tab === "Reviews" && (
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr]">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-5xl font-medium text-ink-900">{product.rating}</span>
                  <div>
                    <Rating value={product.rating} showValue={false} size={16} />
                    <p className="mt-1 text-xs text-ink-900/45">{product.reviews} reviews</p>
                  </div>
                </div>
                <div className="mt-5 space-y-2">
                  {ratingBreakdown.map((pct, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-ink-900/55">
                      <span className="flex w-8 items-center gap-0.5">{5 - i} <Star className="h-3 w-3 text-accent-500" fill="currentColor" /></span>
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-sand-200">
                        <div className="h-full rounded-full bg-accent-500" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="w-8 text-right">{pct}%</span>
                    </div>
                  ))}
                </div>
                <button className="btn-primary btn-sm mt-6 w-full">Write a Review</button>
              </div>
              <div className="space-y-5">
                {reviewSamples.map((r, i) => (
                  <div key={i} className="rounded-2xl bg-white p-5 shadow-soft">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-800 text-xs font-bold text-sand-50">
                          {r.author[0]}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-ink-900">{r.author}</p>
                          <Rating value={r.rating} showValue={false} size={12} />
                        </div>
                      </div>
                      <span className="text-xs text-ink-900/40">{r.date}</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-ink-900/65">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "FAQs" && (
            <div className="max-w-2xl rounded-2xl bg-white p-6 shadow-soft">
              <Accordion items={productFaqs} />
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div className="container-page mt-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-medium text-ink-900">You May Also Like</h2>
            <Link to={`/category/${product.category}`} className="flex items-center gap-1 text-sm font-semibold text-primary-700">
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {related.map((p) => <ProductCard key={p.id} product={p} onQuickView={setQuickView} />)}
          </div>
        </div>
      )}

      {recentlyViewed.length > 0 && (
        <div className="container-page mt-16">
          <h2 className="font-display text-2xl font-medium text-ink-900">Recently Viewed</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {recentlyViewed.map((p) => <ProductCard key={p.id} product={p} onQuickView={setQuickView} />)}
          </div>
        </div>
      )}

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}
