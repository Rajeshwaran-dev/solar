import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  Phone,
  Sun,
} from "lucide-react";
import { categories } from "../../data/categories";
import { useCart } from "../../context/CartContext";
import ProductArt from "../illustrations/ProductArt";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products", mega: true },
  { label: "Solutions", href: "/solutions" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { cartCount, wishlist } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submitSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery("");
    }
  };

  return (
    <>
      <div className="hidden bg-ink-900 text-sand-100 sm:block">
        <div className="container-page flex items-center justify-between py-2 text-xs">
          <p className="flex items-center gap-2">
            <Sun className="h-3.5 w-3.5 text-accent-400" />
            Free site survey &amp; subsidy assistance on every rooftop system
          </p>
          <a href="tel:+911800123456" className="flex items-center gap-1.5 text-sand-100/80 transition hover:text-accent-400">
            <Phone className="h-3.5 w-3.5" /> +91 1800-123-456
          </a>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-sand-50/90 shadow-soft backdrop-blur-lg" : "bg-sand-50"
        }`}
      >
        <div className="container-page flex h-[76px] items-center justify-between gap-6">
          <Link to="/" className="flex shrink-0 items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-800">
              <Sun className="h-5 w-5 text-accent-400" />
            </span>
            <span className="font-heading text-lg font-extrabold leading-none tracking-tight text-ink-900">
              Sol Green<span className="text-primary-700"> Solar</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) =>
              link.mega ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setMegaOpen(true)}
                  onMouseLeave={() => setMegaOpen(false)}
                >
                  <NavLink
                    to={link.href}
                    className={({ isActive }) =>
                      `flex items-center gap-1 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                        isActive ? "text-primary-800" : "text-ink-900/75 hover:text-primary-800"
                      }`
                    }
                  >
                    {link.label}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </NavLink>
                  <AnimatePresence>
                    {megaOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-1/2 top-full w-[720px] -translate-x-1/2 pt-3"
                      >
                        <div className="grid grid-cols-4 gap-1 rounded-3xl border border-ink-900/[0.06] bg-white p-5 shadow-lift">
                          {categories.map((cat) => (
                            <Link
                              key={cat.id}
                              to={`/category/${cat.slug}`}
                              className="group flex flex-col items-center gap-2 rounded-2xl p-3 text-center transition hover:bg-sand-100"
                            >
                              <ProductArt icon={cat.icon} tint="green" className="h-14 w-14" />
                              <span className="text-xs font-semibold leading-tight text-ink-900 group-hover:text-primary-800">
                                {cat.name}
                              </span>
                            </Link>
                          ))}
                          <Link
                            to="/products"
                            className="col-span-4 mt-2 flex items-center justify-center rounded-xl bg-primary-800/5 py-2.5 text-xs font-heading font-bold uppercase tracking-wide text-primary-800 transition hover:bg-primary-800/10"
                          >
                            View all products →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <NavLink
                  key={link.href}
                  to={link.href}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                      isActive ? "text-primary-800" : "text-ink-900/75 hover:text-primary-800"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              )
            )}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setSearchOpen((s) => !s)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink-900 transition hover:bg-sand-200"
              aria-label="Search"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
            <Link
              to="/account/wishlist"
              className="relative hidden h-10 w-10 items-center justify-center rounded-full text-ink-900 transition hover:bg-sand-200 sm:flex"
              aria-label="Wishlist"
            >
              <Heart className="h-[18px] w-[18px]" />
              {wishlist?.length > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent-500 text-[9px] font-bold text-ink-950">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link
              to="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink-900 transition hover:bg-sand-200"
              aria-label="Cart"
            >
              <ShoppingCart className="h-[18px] w-[18px]" />
              {cartCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent-500 text-[9px] font-bold text-ink-950">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link
              to="/account"
              className="hidden h-10 w-10 items-center justify-center rounded-full text-ink-900 transition hover:bg-sand-200 sm:flex"
              aria-label="Account"
            >
              <User className="h-[18px] w-[18px]" />
            </Link>
            <Link to="/contact" className="btn-primary btn-sm hidden lg:inline-flex">
              Get a Quote
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink-900 lg:hidden"
              aria-label="Menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-ink-900/[0.06] bg-white"
            >
              <form onSubmit={submitSearch} className="container-page flex items-center gap-3 py-4">
                <Search className="h-5 w-5 text-ink-900/40" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for solar water heaters, inverters, street lights…"
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-ink-900/35"
                />
                <button type="submit" className="btn-primary btn-sm">Search</button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div className="fixed inset-0 z-[95] lg:hidden" initial="closed" animate="open" exit="closed">
            <motion.div
              variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
              className="absolute inset-0 bg-ink-950/50"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              variants={{ open: { x: 0 }, closed: { x: "100%" } }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="absolute right-0 top-0 flex h-full w-[84%] max-w-sm flex-col bg-sand-50 p-6 shadow-lift"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-heading text-lg font-extrabold text-ink-900">Menu</span>
                <button onClick={() => setMobileOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full bg-sand-200">
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>
              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `rounded-xl px-4 py-3.5 text-base font-semibold ${
                        isActive ? "bg-primary-800/8 text-primary-800" : "text-ink-900"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                <div className="my-2 h-px bg-ink-900/8" />
                <NavLink to="/account" onClick={() => setMobileOpen(false)} className="rounded-xl px-4 py-3.5 text-base font-semibold text-ink-900">
                  My Account
                </NavLink>
                <NavLink to="/account/wishlist" onClick={() => setMobileOpen(false)} className="rounded-xl px-4 py-3.5 text-base font-semibold text-ink-900">
                  Wishlist
                </NavLink>
                <NavLink to="/offers" onClick={() => setMobileOpen(false)} className="rounded-xl px-4 py-3.5 text-base font-semibold text-ink-900">
                  Offers
                </NavLink>
                <NavLink to="/faq" onClick={() => setMobileOpen(false)} className="rounded-xl px-4 py-3.5 text-base font-semibold text-ink-900">
                  FAQ
                </NavLink>
              </nav>
              <Link to="/contact" onClick={() => setMobileOpen(false)} className="btn-primary mt-4 w-full">
                Get a Quote
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
