// Decorative brand elements — glows, dividers, and the hero rooftop scene.

export function OrbGlow({ className = "", color = "accent" }) {
  const bg =
    color === "accent"
      ? "radial-gradient(circle, rgba(245,183,0,0.55) 0%, rgba(245,183,0,0) 70%)"
      : "radial-gradient(circle, rgba(70,160,117,0.5) 0%, rgba(70,160,117,0) 70%)";
  return (
    <div
      className={`pointer-events-none absolute rounded-full blur-2xl animate-float ${className}`}
      style={{ background: bg }}
    />
  );
}

export function WaveDivider({ flip = false, className = "", fill = "#0A1F17" }) {
  return (
    <svg
      viewBox="0 0 1440 100"
      className={`block w-full ${flip ? "rotate-180" : ""} ${className}`}
      preserveAspectRatio="none"
    >
      <path
        d="M0,40 C240,100 480,0 720,30 C960,60 1200,100 1440,40 L1440,100 L0,100 Z"
        fill={fill}
      />
    </svg>
  );
}

export function DotGrid({ className = "" }) {
  return (
    <svg className={className} width="100%" height="100%">
      <defs>
        <pattern id="dotgrid" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.6" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dotgrid)" />
    </svg>
  );
}

export function HeroRoofscape({ className = "" }) {
  return (
    <svg viewBox="0 0 640 560" className={className} role="img" aria-hidden="true">
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF3C4" />
          <stop offset="100%" stopColor="#FFFBEA" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hero-panel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#146C4A" />
          <stop offset="100%" stopColor="#082C21" />
        </linearGradient>
        <linearGradient id="hero-roof" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0F4C39" />
          <stop offset="100%" stopColor="#082C21" />
        </linearGradient>
      </defs>

      <circle cx="480" cy="130" r="230" fill="url(#hero-sky)" />
      <circle cx="470" cy="110" r="58" fill="#F5B700" opacity="0.95" />
      <circle cx="470" cy="110" r="90" fill="#FFC93C" opacity="0.25" />
      <circle cx="470" cy="110" r="120" fill="#FFC93C" opacity="0.12" />

      {/* house body */}
      <rect x="90" y="340" width="380" height="200" rx="10" fill="#0B3D2E" />
      <rect x="90" y="340" width="380" height="200" rx="10" fill="white" opacity="0.03" />
      <rect x="130" y="390" width="70" height="90" rx="6" fill="#0A1F17" />
      <rect x="230" y="390" width="60" height="60" rx="6" fill="#12392B" />
      <rect x="320" y="390" width="60" height="60" rx="6" fill="#12392B" />
      <rect x="230" y="390" width="60" height="60" rx="6" fill="url(#hero-sky)" opacity="0.25" />
      <rect x="320" y="390" width="60" height="60" rx="6" fill="url(#hero-sky)" opacity="0.25" />

      {/* roof */}
      <path d="M60 340 L280 210 L500 340 Z" fill="url(#hero-roof)" />

      {/* solar panels on roof, isometric grid */}
      <g transform="translate(0,-6)">
        {[0, 1, 2, 3].map((c) => (
          <g key={c} transform={`translate(${150 + c * 42},${300 - c * 4})`}>
            <rect x="0" y="0" width="34" height="60" rx="3" fill="url(#hero-panel)" transform="skewY(-18)" />
          </g>
        ))}
      </g>

      {/* ground */}
      <ellipse cx="280" cy="545" rx="260" ry="14" fill="#0B3D2E" opacity="0.08" />

      {/* connecting energy line */}
      <path
        d="M470 170 C 440 230, 380 250, 300 260"
        stroke="#FFC93C"
        strokeWidth="3"
        strokeDasharray="2 10"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
    </svg>
  );
}
