import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { products } from "../../data/products";
import ProductCard from "../../components/product/ProductCard";
import QuickViewModal from "../../components/product/QuickViewModal";
import { EmptyState } from "../../components/ui/Misc";

export default function Wishlist() {
  const { wishlist } = useCart();
  const [quickView, setQuickView] = useState(null);
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-ink-900">My Wishlist</h1>
      <p className="mt-1 text-sm text-ink-900/50">{items.length} item(s) saved</p>

      {items.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            icon={Heart}
            title="Your wishlist is empty"
            description="Tap the heart icon on any product to save it here for later."
            action={<Link to="/products" className="btn-primary btn-sm">Explore Products</Link>}
          />
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
          {items.map((p) => <ProductCard key={p.id} product={p} onQuickView={setQuickView} />)}
        </div>
      )}
      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}
