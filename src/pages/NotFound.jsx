import { Link } from "react-router-dom";
import { Sun, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-800/10">
        <Sun className="h-8 w-8 text-primary-700" />
      </span>
      <h1 className="mt-6 font-display text-5xl font-medium text-ink-900">404</h1>
      <p className="mt-3 max-w-sm text-ink-900/55">
        This page has wandered off-grid. Let's get you back to somewhere sunnier.
      </p>
      <Link to="/" className="btn-primary mt-8">
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>
    </div>
  );
}
