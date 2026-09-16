import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { MessageCircle } from "lucide-react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

export default function SiteLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-sand-50">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <a
        href="https://wa.me/917200082596"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-24 left-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition hover:scale-105 sm:bottom-6 sm:left-6 sm:h-14 sm:w-14"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" fill="white" />
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/50" />
      </a>
    </div>
  );
}
