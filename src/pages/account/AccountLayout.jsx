import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, User, Package, Heart, MapPin, Settings, LogOut } from "lucide-react";
import { currentUser } from "../../data/orders";
import { Breadcrumb } from "../../components/ui/Misc";

const NAV = [
  { label: "Dashboard", href: "/account", icon: LayoutDashboard, end: true },
  { label: "Profile", href: "/account/profile", icon: User },
  { label: "Orders", href: "/account/orders", icon: Package },
  { label: "Wishlist", href: "/account/wishlist", icon: Heart },
  { label: "Addresses", href: "/account/addresses", icon: MapPin },
  { label: "Settings", href: "/account/settings", icon: Settings },
];

export default function AccountLayout() {
  return (
    <div className="bg-sand-50 pb-24">
      <div className="container-page pt-8">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "My Account" }]} />
      </div>

      <div className="container-page mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="card p-6">
            <div className="flex items-center gap-3 border-b border-ink-900/8 pb-5">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-800 text-base font-bold text-sand-50">
                {currentUser.name[0]}
              </span>
              <div className="min-w-0">
                <p className="truncate font-heading text-sm font-bold text-ink-900">{currentUser.name}</p>
                <p className="truncate text-xs text-ink-900/45">{currentUser.email}</p>
              </div>
            </div>
            <nav className="mt-4 flex flex-col gap-1">
              {NAV.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition ${
                      isActive ? "bg-primary-800 text-sand-50" : "text-ink-900/65 hover:bg-sand-100"
                    }`
                  }
                >
                  <item.icon className="h-4 w-4" /> {item.label}
                </NavLink>
              ))}
              <button className="mt-2 flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50">
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            </nav>
          </div>
        </aside>

        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
