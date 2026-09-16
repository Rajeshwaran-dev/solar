// Lucide dropped brand icons — minimal line-art replacements matching the
// same stroke style (24x24, currentColor, strokeWidth 2).

const base = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };

export function FacebookIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M14 9h3V6h-3c-1.66 0-3 1.34-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.55.45-1 1-1z" />
    </svg>
  );
}

export function InstagramIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="M10 9.5v5l4.5-2.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedinIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <line x1="7.5" y1="9.5" x2="7.5" y2="16.5" />
      <circle cx="7.5" cy="6.7" r="0.6" fill="currentColor" />
      <path d="M11.5 16.5v-4c0-1.4 1-2.3 2.2-2.3 1.2 0 2 .9 2 2.3v4" />
      <line x1="11.5" y1="9.5" x2="11.5" y2="16.5" />
    </svg>
  );
}
