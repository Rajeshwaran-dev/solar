import { useState } from "react";
import { Menu, Search, Bell, ChevronDown } from "lucide-react";

export default function AdminHeader({ onMenuClick, title }) {
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between gap-4 border-b border-ink-900/8 bg-white/90 px-5 backdrop-blur sm:px-8">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="flex h-10 w-10 items-center justify-center rounded-xl text-ink-900 hover:bg-sand-100 lg:hidden">
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="font-heading text-lg font-bold text-ink-900">{title}</h1>
      </div>

      <div className="hidden flex-1 max-w-md items-center gap-2 rounded-xl bg-sand-100 px-4 py-2.5 sm:flex">
        <Search className="h-4 w-4 text-ink-900/35" />
        <input placeholder="Search orders, products, customers…" className="w-full bg-transparent text-sm outline-none placeholder:text-ink-900/35" />
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <button onClick={() => setNotifOpen((v) => !v)} className="relative flex h-10 w-10 items-center justify-center rounded-xl text-ink-900 hover:bg-sand-100">
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 rounded-2xl border border-ink-900/8 bg-white p-3 shadow-lift">
              <p className="px-2 py-1.5 text-xs font-bold uppercase tracking-wide text-ink-900/40">Notifications</p>
              {[
                "New order #SGS241102 received",
                "Low stock alert: PowerCell LiFePO4 300Ah",
                "3 new product reviews pending approval",
              ].map((n) => (
                <div key={n} className="rounded-xl px-2 py-2.5 text-sm text-ink-900/70 hover:bg-sand-100">{n}</div>
              ))}
            </div>
          )}
        </div>
        <button className="flex items-center gap-2.5 rounded-xl px-2 py-1.5 hover:bg-sand-100">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-800 text-xs font-bold text-sand-50">SA</span>
          <span className="hidden text-left sm:block">
            <span className="block text-sm font-semibold text-ink-900">Sol Admin</span>
            <span className="block text-xs text-ink-900/45">Administrator</span>
          </span>
          <ChevronDown className="hidden h-3.5 w-3.5 text-ink-900/40 sm:block" />
        </button>
      </div>
    </header>
  );
}
