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
      { label: "Banners", href: "/admin/banners", icon: Image },
      { label: "Blog", href: "/admin/blog", icon: FileText },
      { label: "Projects", href: "/admin/projects", icon: Briefcase },
      { label: "Services", href: "/admin/services", icon: Wrench },
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
      <div className="flex items-center justify-between px-6 py-6">
        <Link to="/admin" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-500">
            <Sun className="h-4.5 w-4.5 text-ink-950" />
          </span>
          <div className="leading-none">
            <p className="font-heading text-sm font-extrabold text-sand-50">Sol Green</p>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-sand-100/40">Admin Panel</p>
          </div>
        </Link>
        {onNavigate && (
          <button onClick={onNavigate} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-sand-100 lg:hidden">
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

      <div className="border-t border-white/8 p-4">
        <Link to="/" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-sand-100/60 transition hover:bg-white/5 hover:text-sand-50">
          ← Back to Storefront
        </Link>
      </div>
    </div>
  );
}
