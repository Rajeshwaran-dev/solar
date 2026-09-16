import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

const TITLES = [
  { match: /^\/admin\/products/, title: "Products" },
  { match: /^\/admin\/categories/, title: "Categories" },
  { match: /^\/admin\/inventory/, title: "Inventory" },
  { match: /^\/admin\/orders/, title: "Orders" },
  { match: /^\/admin\/customers/, title: "Customers" },
  { match: /^\/admin\/reviews/, title: "Reviews" },
  { match: /^\/admin\/coupons/, title: "Coupons" },
  { match: /^\/admin\/offers/, title: "Offers" },
  { match: /^\/admin\/banners/, title: "Banners" },
  { match: /^\/admin\/blog/, title: "Blog" },
  { match: /^\/admin\/projects/, title: "Projects" },
  { match: /^\/admin\/services/, title: "Services" },
  { match: /^\/admin\/enquiries/, title: "Enquiries" },
  { match: /^\/admin\/reports/, title: "Reports" },
  { match: /^\/admin\/settings/, title: "Settings" },
];

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const title = TITLES.find((t) => t.match.test(location.pathname))?.title ?? "Dashboard";

  return (
    <div className="flex min-h-screen bg-sand-100/60">
      <AdminSidebar className="hidden lg:flex" />

      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-[95] lg:hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} className="absolute inset-0 bg-ink-950/50" />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", stiffness: 320, damping: 34 }} className="absolute left-0 top-0 h-full">
              <AdminSidebar onNavigate={() => setMobileOpen(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader onMenuClick={() => setMobileOpen(true)} title={title} />
        <main className="flex-1 p-5 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
