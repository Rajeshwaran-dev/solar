import { Link } from "react-router-dom";
import { Sun, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { categories } from "../../data/categories";
import {
  FacebookIcon, InstagramIcon, YoutubeIcon, LinkedinIcon, XTwitterIcon, BloggerIcon,
} from "../ui/SocialIcons";

const SOCIAL_LINKS = [
  { name: "Facebook", icon: FacebookIcon, href: "https://www.facebook.com/profile.php?id=61585413036717" },
  { name: "Instagram", icon: InstagramIcon, href: "https://www.instagram.com/solgreen_2025/?hl=en" },
  { name: "YouTube", icon: YoutubeIcon, href: "https://www.youtube.com/@SolGreenPrakash" },
  { name: "LinkedIn", icon: LinkedinIcon, href: "https://www.linkedin.com/in/solgreen-prakash-229951420/" },
  { name: "X (Twitter)", icon: XTwitterIcon, href: "https://x.com/solgreen_solar" },
  { name: "Blogger", icon: BloggerIcon, href: "https://www.blogger.com/blog/pages/5439505361849246052" },
];

export default function SiteFooter() {
  return (
    <footer className="section-dark relative overflow-hidden pt-20">
      <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-primary-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-accent-500/10 blur-3xl" />

      <div className="container-page relative">
        <div className="grid grid-cols-1 gap-12 border-b border-white/8 pb-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Link to="/" className="inline-flex items-center">
              <img src="/logo.png" alt="Sol Green Solar" className="h-28 sm:h-36 w-auto max-h-[120px] rounded-3xl bg-white px-5 py-3 object-contain shadow-medium transition-transform hover:scale-105" />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-sand-100/60">
              Premium solar products and complete energy solutions — engineered for
              Indian homes, businesses and institutions to run on sunlight.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  title={s.name}
                  aria-label={s.name}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-sand-100 transition hover:bg-accent-500 hover:text-ink-950 hover:scale-110"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wide text-sand-50/90">Shop</h4>
            <ul className="mt-5 space-y-3 text-sm text-sand-100/60">
              {categories.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <Link to={`/category/${c.slug}`} className="transition hover:text-accent-400">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wide text-sand-50/90">Company</h4>
            <ul className="mt-5 space-y-3 text-sm text-sand-100/60">
              <li><Link to="/about" className="transition hover:text-accent-400">About Us</Link></li>
              <li><Link to="/projects" className="transition hover:text-accent-400">Projects</Link></li>
              <li><Link to="/offers" className="transition hover:text-accent-400">Offers</Link></li>
              <li><Link to="/faq" className="transition hover:text-accent-400">FAQ</Link></li>
              <li><Link to="/contact" className="transition hover:text-accent-400">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wide text-sand-50/90">Stay in the loop</h4>
            <p className="mt-5 text-sm text-sand-100/60">Solar tips, offers and product launches — no spam.</p>
            <form className="mt-4 flex overflow-hidden rounded-full border border-white/15 bg-white/5 p-1" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="you@email.com"
                className="w-full bg-transparent px-4 text-sm text-sand-50 outline-none placeholder:text-sand-100/40"
              />
              <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-500 text-ink-950 transition hover:bg-accent-400">
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
            <ul className="mt-6 space-y-3 text-sm text-sand-100/60">
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-accent-400" />
                <a href="tel:+917200082596" className="hover:text-accent-400 transition">+91 72000 82596</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-accent-400" />
                <a href="mailto:solgreensolar@yahoo.in" className="hover:text-accent-400 transition">solgreensolar@yahoo.in</a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" />
                <span>Plot No. 3, 4th Right Cross Street, Saravana Nagar, Main Road, Paravai, Madurai – 625402</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 py-7 text-xs text-sand-100/45 sm:flex-row">
          <p>© 2026 Sol Green Solar (Proprietor: C. Prakash). All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a href="#" className="transition hover:text-accent-400">Privacy Policy</a>
            <a href="#" className="transition hover:text-accent-400">Terms of Service</a>
            <a href="#" className="transition hover:text-accent-400">Shipping Policy</a>
            <a href="#" className="transition hover:text-accent-400">Warranty</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
