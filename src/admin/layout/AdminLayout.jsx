import { useState, useRef, useEffect } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { useAdminAuth } from "../../context/AdminAuthContext";

const TITLES = [
  { match: /^\/admin\/products/, title: "Products" },
  { match: /^\/admin\/categories/, title: "Categories" },
  { match: /^\/admin\/inventory/, title: "Inventory" },
  { match: /^\/admin\/orders/, title: "Orders" },
  { match: /^\/admin\/customers/, title: "Customers" },
  { match: /^\/admin\/reviews/, title: "Reviews" },
  { match: /^\/admin\/coupons/, title: "Coupons" },
  { match: /^\/admin\/offers/, title: "Offers" },
  { match: /^\/admin\/projects/, title: "Projects" },
  { match: /^\/admin\/enquiries/, title: "Enquiries" },
  { match: /^\/admin\/reports/, title: "Reports" },
  { match: /^\/admin\/settings/, title: "Settings" },
];

export default function AdminLayout() {
  const { isAuthenticated } = useAdminAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const mainRef = useRef(null);
  const title = TITLES.find((t) => t.match.test(location.pathname))?.title ?? "Dashboard";

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [location.pathname]);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-sand-100/60">
      <AdminSidebar className="hidden lg:flex h-full" />

      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-[95] lg:hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} className="absolute inset-0 bg-ink-950/50" />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", stiffness: 320, damping: 34 }} className="absolute left-0 top-0 h-full w-72">
              <AdminSidebar onNavigate={() => setMobileOpen(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="flex min-w-0 flex-1 flex-col h-full overflow-hidden">
        <AdminHeader onMenuClick={() => setMobileOpen(true)} title={title} />
        <main ref={mainRef} className="flex-1 overflow-y-auto p-5 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
