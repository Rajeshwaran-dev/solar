import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard, Package, FolderTree, Boxes, ShoppingCart, Users, Star,
  Ticket, BadgePercent, Image, FileText, Briefcase, Wrench, Inbox, BarChart3,
  Settings, Sun, X,
} from "lucide-react";

const NAV = [
  { section: "Overview", items: [{ label: "Dashboard", href: "/admin", icon: LayoutDashboard, end: true }] },
  {
    section: "Catalog",
    items: [
      { label: "Products", href: "/admin/products", icon: Package },
      { label: "Categories", href: "/admin/categories", icon: FolderTree },
      { label: "Inventory", href: "/admin/inventory", icon: Boxes },
    ],
  },
  {
    section: "Sales",
    items: [
      { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
      { label: "Customers", href: "/admin/customers", icon: Users },
      { label: "Reviews", href: "/admin/reviews", icon: Star },
      { label: "Coupons", href: "/admin/coupons", icon: Ticket },
      { label: "Offers", href: "/admin/offers", icon: BadgePercent },
    ],
  },
  {
    section: "Content",
    items: [
      { label: "Projects", href: "/admin/projects", icon: Briefcase },
    ],
  },
  {
    section: "Operations",
    items: [
      { label: "Enquiries", href: "/admin/enquiries", icon: Inbox },
      { label: "Reports", href: "/admin/reports", icon: BarChart3 },
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

export default function AdminSidebar({ onNavigate, className = "" }) {
  return (
    <div className={`flex h-full w-72 shrink-0 flex-col bg-ink-950 text-sand-100 ${className}`}>
      <div className="flex shrink-0 items-center justify-between border-b border-white/8 px-5 py-5">
        <Link to="/admin" className="flex items-center gap-3 w-full pr-2">
          <img src="/logo.png" alt="Sol Green Solar" className="h-16 sm:h-20 w-auto max-h-[72px] rounded-2xl bg-white px-4 py-2.5 object-contain shadow-medium transition-transform hover:scale-102" />
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-accent-400 bg-accent-400/10 px-2.5 py-1 rounded-full border border-accent-400/20 shrink-0">Panel</span>
        </Link>
        {onNavigate && (
          <button onClick={onNavigate} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-sand-100 lg:hidden">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-4 pb-6">
        {NAV.map((section) => (
          <div key={section.section}>
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-sand-100/30">{section.section}</p>
            <div className="mt-2 space-y-0.5">
              {section.items.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.end}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                      isActive ? "bg-accent-500 text-ink-950" : "text-sand-100/70 hover:bg-white/5 hover:text-sand-50"
                    }`
                  }
                >
                  <item.icon className="h-4 w-4" /> {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="shrink-0 border-t border-white/8 p-4">
        <Link to="/" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-sand-100/60 transition hover:bg-white/5 hover:text-sand-50">
          ← Back to Storefront
        </Link>
      </div>
    </div>
  );
}
