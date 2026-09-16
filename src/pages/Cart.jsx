import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Heart, Tag, ShieldCheck, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { getProductBySlug, products } from "../data/products";
import ProductArt from "../components/illustrations/ProductArt";
import { QuantityStepper, EmptyState } from "../components/ui/Misc";
import ProductCard from "../components/product/ProductCard";
import QuickViewModal from "../components/product/QuickViewModal";
import { formatPrice } from "../lib/format";

const VALID_COUPONS = { SOLAR10: 0.1, WELCOME500: 500 };

export default function Cart() {
  const { items, removeFromCart, updateQty, toggleWishlist, cartCount } = useCart();
  const toast = useToast();
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState(null);
  const [quickView, setQuickView] = useState(null);

  const lineItems = items
    .map((i) => ({ ...i, product: getProductBySlug(i.slug) }))
    .filter((i) => i.product);

  const subtotal = useMemo(
    () => lineItems.reduce((sum, i) => sum + i.product.price * i.qty, 0),
    [lineItems]
  );

  const discount = useMemo(() => {
    if (!coupon) return 0;
    if (typeof VALID_COUPONS[coupon] === "number" && VALID_COUPONS[coupon] < 1) {
      return Math.round(subtotal * VALID_COUPONS[coupon]);
    }
    return VALID_COUPONS[coupon] ?? 0;
  }, [coupon, subtotal]);

  const shipping = subtotal > 0 && subtotal < 5000 ? 199 : 0;
  const total = Math.max(0, subtotal - discount) + shipping;

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (VALID_COUPONS[code]) {
      setCoupon(code);
      toast?.push(`Coupon ${code} applied!`);
    } else {
      toast?.push("Invalid coupon code", "error");
    }
  };

  const recommended = products.filter((p) => !lineItems.some((i) => i.id === p.id)).slice(0, 4);

  if (lineItems.length === 0) {
    return (
      <div className="container-page py-24">
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Looks like you haven't added anything yet. Explore our range of premium solar products."
          action={<Link to="/products" className="btn-primary btn-sm">Explore Products</Link>}
        />
      </div>
    );
  }

  return (
    <div className="bg-sand-50 pb-32 sm:pb-24">
      <div className="container-page pt-8">
        <h1 className="font-display text-3xl font-medium text-ink-900 sm:text-4xl">Your Cart</h1>
        <p className="mt-2 text-ink-900/55">{cartCount} item{cartCount !== 1 ? "s" : ""} in your cart</p>
      </div>

      <div className="container-page mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          <AnimatePresence>
            {lineItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -40 }}
                className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
              >
                <Link to={`/product/${item.product.slug}`} className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-sand-100 to-sand-200">
                  <ProductArt icon={item.product.icon} tint={item.product.tint} uid={`cart-${item.id}`} className="h-full w-full p-3" />
                </Link>
                <div className="flex-1">
                  <Link to={`/product/${item.product.slug}`} className="font-heading text-sm font-bold text-ink-900 hover:text-primary-800">
                    {item.product.name}
                  </Link>
                  <p className="mt-1 text-xs text-ink-900/45">Brand: {item.product.brand}</p>
                  <p className="mt-2 font-heading text-base font-extrabold text-ink-900">{formatPrice(item.product.price)}</p>
                </div>
                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                  <QuantityStepper value={item.qty} onChange={(v) => updateQty(item.id, v)} size="sm" />
                  <div className="flex items-center gap-3">
                    <button onClick={() => toggleWishlist(item.product)} className="text-ink-900/40 transition hover:text-red-500" aria-label="Add to wishlist">
                      <Heart className="h-4 w-4" />
                    </button>
                    <button onClick={() => removeFromCart(item.id)} className="text-ink-900/40 transition hover:text-red-500" aria-label="Remove">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="space-y-5">
          <div className="card p-6">
            <h3 className="font-heading text-base font-bold text-ink-900">Have a coupon?</h3>
            <div className="mt-3 flex gap-2">
              <div className="relative flex-1">
                <Tag className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-900/30" />
                <input
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Enter code"
                  className="w-full rounded-full border border-ink-900/10 bg-sand-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary-600"
                />
              </div>
              <button onClick={applyCoupon} className="btn-outline btn-sm">Apply</button>
            </div>
            {coupon && <p className="mt-2 text-xs font-semibold text-primary-700">✓ {coupon} applied</p>}
            <p className="mt-2 text-xs text-ink-900/40">Try SOLAR10 or WELCOME500</p>
          </div>

          <div className="card p-6">
            <h3 className="font-heading text-base font-bold text-ink-900">Order Summary</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between text-ink-900/60">
                <span>Subtotal</span>
                <span className="font-semibold text-ink-900">{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-primary-700">
                  <span>Coupon Discount</span>
                  <span className="font-semibold">−{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-ink-900/60">
                <span>Shipping</span>
                <span className="font-semibold text-ink-900">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              <div className="my-2 h-px bg-ink-900/8" />
              <div className="flex justify-between text-base">
                <span className="font-heading font-bold text-ink-900">Total</span>
                <span className="font-heading text-xl font-extrabold text-ink-900">{formatPrice(total)}</span>
              </div>
            </div>
            <Link to="/checkout" className="btn-accent mt-6 hidden w-full sm:flex">
              Proceed to Checkout <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-ink-900/45">
              <ShieldCheck className="h-3.5 w-3.5" /> Secure checkout, 7-day replacement guarantee
            </div>
          </div>
        </div>
      </div>

      <div className="container-page mt-16">
        <h2 className="font-display text-2xl font-medium text-ink-900">You Might Also Need</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {recommended.map((p) => <ProductCard key={p.id} product={p} onQuickView={setQuickView} />)}
        </div>
      </div>

      <div className="glass fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-ink-900/8 px-5 py-4 sm:hidden">
        <div>
          <p className="text-xs text-ink-900/50">Total</p>
          <p className="font-heading text-lg font-extrabold text-ink-900">{formatPrice(total)}</p>
        </div>
        <Link to="/checkout" className="btn-accent">
          Checkout <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}
