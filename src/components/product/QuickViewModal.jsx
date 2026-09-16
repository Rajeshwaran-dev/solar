import { Link } from "react-router-dom";
import { Heart, ShoppingCart, ArrowUpRight } from "lucide-react";
import Modal from "../ui/Modal";
import Rating from "../ui/Rating";
import Badge, { DiscountBadge } from "../ui/Badge";
import ProductArt from "../illustrations/ProductArt";
import { formatPrice, discountPercent } from "../../lib/format";
import { useCart } from "../../context/CartContext";

export default function QuickViewModal({ product, onClose }) {
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  if (!product) return null;
  const discount = discountPercent(product.price, product.mrp);

  return (
    <Modal open={!!product} onClose={onClose} maxWidth="max-w-3xl">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-sand-100 to-sand-200">
          <ProductArt icon={product.icon} tint={product.tint} uid={`qv-${product.id}`} image={product.image} alt={product.name} className="h-full w-full object-cover" />
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {product.badges?.map((b) => <Badge key={b} tone={b}>{b}</Badge>)}
            <DiscountBadge percent={discount} />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-wide text-primary-700/70">{product.brand}</span>
          <h3 className="mt-1.5 font-heading text-xl font-bold text-ink-900">{product.name}</h3>
          <Rating value={product.rating} count={product.reviews} className="mt-2" />
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-heading text-2xl font-extrabold text-ink-900">{formatPrice(product.price)}</span>
            {discount > 0 && <span className="text-sm text-ink-900/35 line-through">{formatPrice(product.mrp)}</span>}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink-900/60">{product.short}</p>
          <ul className="mt-4 space-y-1.5">
            {product.features?.slice(0, 3).map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-ink-900/70">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" /> {f}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex gap-2.5">
            <button onClick={() => addToCart(product)} className="btn-primary flex-1">
              <ShoppingCart className="h-4 w-4" /> Add to Cart
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className={`btn-outline h-full !px-4 ${isWishlisted(product.id) ? "!border-red-400 !text-red-500" : ""}`}
            >
              <Heart className="h-4 w-4" fill={isWishlisted(product.id) ? "currentColor" : "none"} />
            </button>
          </div>
          <Link
            to={`/product/${product.slug}`}
            onClick={onClose}
            className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-800"
          >
            View full details <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </Modal>
  );
}
