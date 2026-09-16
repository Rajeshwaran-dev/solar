import { Link } from "react-router-dom";
import { Heart, Eye, ShoppingCart } from "lucide-react";
import ProductArt from "../illustrations/ProductArt";
import Rating from "../ui/Rating";
import Badge, { DiscountBadge } from "../ui/Badge";
import { formatPrice, discountPercent } from "../../lib/format";
import { useCart } from "../../context/CartContext";

export default function ProductCard({ product, onQuickView, className = "" }) {
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const discount = discountPercent(product.price, product.mrp);
  const wishlisted = isWishlisted(product.id);

  return (
    <div className={`card card-hover group relative flex flex-col overflow-hidden ${className}`}>
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-sand-100 to-sand-200">
        <Link to={`/product/${product.slug}`} className="block h-full w-full">
          <ProductArt
            icon={product.icon}
            tint={product.tint}
            uid={product.id}
            image={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.badges?.map((b) => (
            <Badge key={b} tone={b}>{b}</Badge>
          ))}
          <DiscountBadge percent={discount} />
        </div>

        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full shadow-soft backdrop-blur transition ${
            wishlisted ? "bg-red-500 text-white" : "bg-white/90 text-ink-900 hover:bg-white"
          }`}
          aria-label="Toggle wishlist"
        >
          <Heart className="h-4 w-4" fill={wishlisted ? "currentColor" : "none"} />
        </button>

        <div className="absolute inset-x-3 bottom-3 flex translate-y-3 gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={() => onQuickView?.(product)}
            className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full bg-white/95 text-xs font-heading font-bold text-ink-900 shadow-soft backdrop-blur transition hover:bg-white"
          >
            <Eye className="h-3.5 w-3.5" /> Quick View
          </button>
          <button
            onClick={() => addToCart(product)}
            className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full bg-primary-800 text-xs font-heading font-bold text-sand-50 shadow-soft transition hover:bg-primary-700"
          >
            <ShoppingCart className="h-3.5 w-3.5" /> Add to Cart
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-primary-700/70">
          {product.brand}
        </span>
        <Link to={`/product/${product.slug}`}>
          <h3 className="line-clamp-2 font-heading text-sm font-bold leading-snug text-ink-900 transition group-hover:text-primary-800">
            {product.name}
          </h3>
        </Link>
        <Rating value={product.rating} count={product.reviews} size={13} />
        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className="font-heading text-lg font-extrabold text-ink-900">{formatPrice(product.price)}</span>
          {discount > 0 && (
            <span className="text-xs text-ink-900/35 line-through">{formatPrice(product.mrp)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
