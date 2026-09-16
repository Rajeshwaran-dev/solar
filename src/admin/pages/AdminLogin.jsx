import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Sun, Lock, Mail, ArrowRight, ShieldCheck, KeyRound, AlertCircle } from "lucide-react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { useToast } from "../../context/ToastContext";

export default function AdminLogin() {
  const [email, setEmail] = useState("admin@solgreen.in");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const res = login(email, password);
      setLoading(false);
      if (res.success) {
        toast?.push("Logged in successfully!", "success");
        navigate("/admin", { replace: true });
      } else {
        setError(res.error);
      }
    }, 400);
  };

  const fillDemo = () => {
    setEmail("admin@solgreen.in");
    setPassword("admin123");
    setError("");
    toast?.push("Demo credentials filled!", "info");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-sand-100/80 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex flex-col items-center gap-2">
            <img src="/logo.png" alt="Sol Green Solar" className="h-24 sm:h-28 w-auto max-h-[110px] rounded-3xl bg-white px-6 py-4 object-contain shadow-medium transition-transform hover:scale-105" />
            <p className="text-xs font-bold uppercase tracking-widest text-primary-800 bg-primary-50 px-3 py-1 rounded-full border border-primary-200">
              Admin Portal
            </p>
          </Link>
          <h2 className="mt-6 font-heading text-2xl font-bold text-ink-900">
            Sign in to Dashboard
          </h2>
          <p className="mt-1.5 text-sm text-ink-900/55">
            Enter your administrative credentials to manage store operations
          </p>
        </div>

        {/* Demo Credentials Helper Box */}
        <div className="mt-6 rounded-2xl border border-accent-500/30 bg-accent-50/70 p-4 shadow-soft">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <KeyRound className="h-4 w-4 shrink-0 text-accent-700" />
              <span className="text-xs font-heading font-bold uppercase tracking-wide text-ink-900">
                Demo Credentials
              </span>
            </div>
            <button
              type="button"
              onClick={fillDemo}
              className="rounded-full bg-accent-500 px-3 py-1 text-[11px] font-heading font-bold text-ink-950 transition hover:bg-accent-400"
            >
              Fill Demo
            </button>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs font-mono text-ink-900/80">
            <div className="rounded-lg bg-white/80 px-2.5 py-1.5 border border-ink-900/5">
              <span className="block text-[10px] font-sans font-semibold text-ink-900/40 uppercase">Email</span>
              admin@solgreen.in
            </div>
            <div className="rounded-lg bg-white/80 px-2.5 py-1.5 border border-ink-900/5">
              <span className="block text-[10px] font-sans font-semibold text-ink-900/40 uppercase">Password</span>
              admin123
            </div>
          </div>
        </div>

        {/* Card Form */}
        <div className="mt-6 rounded-3xl border border-ink-900/[0.08] bg-white p-6 sm:p-8 shadow-lift">
          {error && (
            <div className="mb-5 flex items-center gap-2.5 rounded-2xl bg-red-50 p-3.5 text-xs font-medium text-red-600 border border-red-200">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="label-field">Email Address</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-900/35" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@solgreen.in"
                  className="input-field pl-10"
                />
              </div>
            </div>

            <div>
              <label className="label-field">Password</label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-900/35" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pl-10"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary mt-2 w-full justify-center !py-3.5 shadow-soft"
            >
              {loading ? (
                "Verifying credentials…"
              ) : (
                <>
                  Sign In to Dashboard <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between border-t border-ink-900/8 pt-5 text-xs">
            <span className="flex items-center gap-1.5 text-ink-900/45">
              <ShieldCheck className="h-4 w-4 text-primary-700" /> Secure Admin Portal
            </span>
            <Link
              to="/"
              className="font-semibold text-primary-700 transition hover:underline"
            >
              ← Back to Storefront
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
