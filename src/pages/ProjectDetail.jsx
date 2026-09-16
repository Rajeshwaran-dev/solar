import { useParams, Link, Navigate } from "react-router-dom";
import { MapPin, Zap, Calendar, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { projects } from "../data/content";
import { Breadcrumb } from "../components/ui/Misc";
import ProductArt from "../components/illustrations/ProductArt";

const ICONS = ["powerSystem", "panel", "waterHeater", "streetLight", "inverter", "battery"];

const HIGHLIGHTS = [
  "Complete site survey and structural assessment",
  "Custom-engineered mounting for local wind/load conditions",
  "Grid synchronisation and net-metering setup",
  "Post-installation performance monitoring dashboard",
];

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  if (!project) return <Navigate to="/projects" replace />;

  const idx = projects.findIndex((p) => p.slug === slug);
  const icon = ICONS[idx % ICONS.length];
  const others = projects.filter((p) => p.id !== project.id).slice(0, 3);

  return (
    <div className="bg-sand-50 pb-24">
      <div className="container-page pt-8">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Projects", href: "/projects" }, { label: project.name }]} />
      </div>

      <div className="container-page mt-6 flex aspect-[16/7] items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-ink-800 to-ink-900">
        <ProductArt icon={icon} tint="amber" className="h-52 w-52" />
      </div>

      <div className="container-page mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px]">
        <div>
          <span className="eyebrow">{project.category}</span>
          <h1 className="mt-4 font-display text-3xl font-medium text-ink-900 sm:text-4xl">{project.name}</h1>
          <p className="mt-4 text-ink-900/60">{project.summary}</p>
          <p className="mt-4 text-ink-900/60">
            This installation was engineered end-to-end by the Sol Green team — from initial
            structural survey through to commissioning and handover. The system has been
            operating at rated performance since completion, with remote monitoring in place
            for ongoing optimisation.
          </p>

          <h2 className="mt-10 font-heading text-lg font-bold text-ink-900">Project Highlights</h2>
          <ul className="mt-4 space-y-2.5">
            {HIGHLIGHTS.map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-sm text-ink-900/70">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-700" /> {h}
              </li>
            ))}
          </ul>

          <Link to="/projects" className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-800">
            <ArrowLeft className="h-4 w-4" /> Back to all projects
          </Link>
        </div>

        <aside className="h-fit space-y-4">
          <div className="card space-y-4 p-6">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-ink-900/50">Project Details</h3>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="h-4 w-4 text-primary-700" />
              <div>
                <p className="text-xs text-ink-900/45">Location</p>
                <p className="font-semibold text-ink-900">{project.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Zap className="h-4 w-4 text-primary-700" />
              <div>
                <p className="text-xs text-ink-900/45">Capacity</p>
                <p className="font-semibold text-ink-900">{project.capacity}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 text-primary-700" />
              <div>
                <p className="text-xs text-ink-900/45">Completed</p>
                <p className="font-semibold text-ink-900">{project.year}</p>
              </div>
            </div>
          </div>
          <Link to="/contact" className="btn-primary flex w-full justify-center">
            Start a Similar Project <ArrowRight className="h-4 w-4" />
          </Link>
        </aside>
      </div>

      {others.length > 0 && (
        <div className="container-page mt-16">
          <h2 className="font-display text-2xl font-medium text-ink-900">More Projects</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {others.map((p, i) => (
              <Link key={p.id} to={`/projects/${p.slug}`} className="card card-hover group block overflow-hidden">
                <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-ink-800 to-ink-900">
                  <ProductArt icon={ICONS[(i + 1) % ICONS.length]} tint="amber" className="h-24 w-24" />
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-sm font-bold text-ink-900 group-hover:text-primary-800">{p.name}</h3>
                  <p className="mt-1 text-xs text-ink-900/50">{p.location}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
