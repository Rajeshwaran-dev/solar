// Custom flat-gradient product illustrations — Sol Green Solar's own visual
// identity in place of generic stock photography.

const TINTS = {
  sky: { a: "#5FD0E8", b: "#1B8A9E", glow: "#BFF3FA" },
  amber: { a: "#FFD666", b: "#F5B700", glow: "#FFF3C4" },
  green: { a: "#46A075", b: "#0B3D2E", glow: "#CFE9DA" },
};

function useTint(tint) {
  return TINTS[tint] ?? TINTS.green;
}

function Frame({ children, uid, tint, className }) {
  const t = useTint(tint);
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-hidden="true">
      <defs>
        <linearGradient id={`grad-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={t.a} />
          <stop offset="100%" stopColor={t.b} />
        </linearGradient>
        <radialGradient id={`glow-${uid}`} cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor={t.glow} stopOpacity="0.9" />
          <stop offset="100%" stopColor={t.glow} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="94" fill={`url(#glow-${uid})`} opacity="0.6" />
      {children}
    </svg>
  );
}

export function WaterHeaterArt({ tint = "sky", uid = "wh", className }) {
  return (
    <Frame uid={uid} tint={tint} className={className}>
      <g>
        <ellipse cx="100" cy="168" rx="52" ry="8" fill="#0B3D2E" opacity="0.08" />
        <rect x="62" y="52" width="76" height="104" rx="38" fill={`url(#grad-${uid})`} />
        <rect x="62" y="52" width="76" height="104" rx="38" fill="white" opacity="0.08" />
        <rect x="74" y="66" width="52" height="6" rx="3" fill="white" opacity="0.55" />
        <rect x="74" y="80" width="34" height="6" rx="3" fill="white" opacity="0.35" />
        <g transform="translate(100,40)">
          <line x1="-22" y1="-14" x2="-22" y2="-2" stroke="#F5B700" strokeWidth="4" strokeLinecap="round" />
          <line x1="0" y1="-20" x2="0" y2="-4" stroke="#F5B700" strokeWidth="4" strokeLinecap="round" />
          <line x1="22" y1="-14" x2="22" y2="-2" stroke="#F5B700" strokeWidth="4" strokeLinecap="round" />
        </g>
        <circle cx="150" cy="46" r="14" fill="#FFC93C" />
        <circle cx="150" cy="46" r="20" fill="#FFC93C" opacity="0.25" />
      </g>
    </Frame>
  );
}

export function StreetLightArt({ tint = "amber", uid = "sl", className }) {
  return (
    <Frame uid={uid} tint={tint} className={className}>
      <g>
        <ellipse cx="100" cy="176" rx="40" ry="7" fill="#0B3D2E" opacity="0.08" />
        <rect x="94" y="70" width="12" height="106" rx="4" fill="#0B3D2E" />
        <path d="M100 70 L140 44 L150 52 L106 78 Z" fill={`url(#grad-${uid})`} />
        <rect x="118" y="30" width="34" height="20" rx="5" fill={`url(#grad-${uid})`} />
        <rect x="118" y="30" width="34" height="8" rx="4" fill="white" opacity="0.35" />
        <circle cx="135" cy="58" r="16" fill="#FFDB70" opacity="0.9" />
        <circle cx="135" cy="58" r="30" fill="#FFDB70" opacity="0.25" />
        <circle cx="135" cy="58" r="44" fill="#FFDB70" opacity="0.12" />
      </g>
    </Frame>
  );
}

export function LanternArt({ tint = "amber", uid = "la", className }) {
  return (
    <Frame uid={uid} tint={tint} className={className}>
      <g>
        <ellipse cx="100" cy="172" rx="36" ry="7" fill="#0B3D2E" opacity="0.08" />
        <path d="M78 60 Q100 40 122 60 L128 150 Q100 168 72 150 Z" fill={`url(#grad-${uid})`} />
        <rect x="72" y="146" width="56" height="10" rx="5" fill="#0B3D2E" opacity="0.85" />
        <rect x="88" y="40" width="24" height="14" rx="4" fill="#0B3D2E" opacity="0.85" />
        <path d="M88 44 Q100 24 112 44" stroke="#0B3D2E" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.85" />
        <circle cx="100" cy="100" r="22" fill="#FFE58F" opacity="0.95" />
        <circle cx="100" cy="100" r="38" fill="#FFE58F" opacity="0.25" />
      </g>
    </Frame>
  );
}

export function PowerSystemArt({ tint = "green", uid = "ps", className }) {
  return (
    <Frame uid={uid} tint={tint} className={className}>
      <g>
        <ellipse cx="100" cy="172" rx="56" ry="7" fill="#0B3D2E" opacity="0.08" />
        <path d="M40 120 L100 90 L160 120 L100 150 Z" fill={`url(#grad-${uid})`} opacity="0.95" />
        {[0, 1, 2].map((r) => (
          <g key={r}>
            {[0, 1, 2, 3].map((c) => (
              <rect
                key={c}
                x={62 + c * 20 - r * 10}
                y={104 + r * 12}
                width="16"
                height="9"
                rx="1.5"
                fill="white"
                opacity="0.28"
                transform={`skewX(-15)`}
              />
            ))}
          </g>
        ))}
        <circle cx="152" cy="52" r="18" fill="#FFC93C" />
        <circle cx="152" cy="52" r="30" fill="#FFC93C" opacity="0.22" />
        <path d="M148 44 L156 44 L150 56 L158 56 L142 70 L146 56 L140 56 Z" fill="#0B3D2E" opacity="0.7" />
      </g>
    </Frame>
  );
}

export function InverterArt({ tint = "green", uid = "iv", className }) {
  return (
    <Frame uid={uid} tint={tint} className={className}>
      <g>
        <ellipse cx="100" cy="172" rx="42" ry="7" fill="#0B3D2E" opacity="0.08" />
        <rect x="64" y="52" width="72" height="112" rx="14" fill={`url(#grad-${uid})`} />
        <rect x="76" y="66" width="48" height="30" rx="6" fill="white" opacity="0.15" />
        <path
          d="M80 82 L90 82 L96 70 L104 96 L110 82 L120 82"
          stroke="#FFDB70"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="84" cy="112" r="4" fill="#7CE3B8" />
        <rect x="96" y="108" width="28" height="8" rx="4" fill="white" opacity="0.35" />
        <rect x="76" y="130" width="48" height="6" rx="3" fill="white" opacity="0.25" />
        <rect x="76" y="142" width="30" height="6" rx="3" fill="white" opacity="0.2" />
      </g>
    </Frame>
  );
}

export function PanelArt({ tint = "green", uid = "pn", className }) {
  return (
    <Frame uid={uid} tint={tint} className={className}>
      <g>
        <ellipse cx="100" cy="172" rx="58" ry="7" fill="#0B3D2E" opacity="0.08" />
        <rect x="36" y="60" width="128" height="92" rx="8" fill={`url(#grad-${uid})`} />
        {[0, 1, 2, 3].map((c) => (
          <line key={c} x1={36 + (c + 1) * 25.6} y1="60" x2={36 + (c + 1) * 25.6} y2="152" stroke="white" strokeOpacity="0.3" strokeWidth="2" />
        ))}
        {[0, 1, 2].map((r) => (
          <line key={r} x1="36" y1={60 + (r + 1) * 23} x2="164" y2={60 + (r + 1) * 23} stroke="white" strokeOpacity="0.3" strokeWidth="2" />
        ))}
        <circle cx="150" cy="42" r="15" fill="#FFC93C" />
        <circle cx="150" cy="42" r="26" fill="#FFC93C" opacity="0.2" />
      </g>
    </Frame>
  );
}

export function BatteryArt({ tint = "green", uid = "bt", className }) {
  return (
    <Frame uid={uid} tint={tint} className={className}>
      <g>
        <ellipse cx="100" cy="172" rx="46" ry="7" fill="#0B3D2E" opacity="0.08" />
        <rect x="58" y="66" width="84" height="94" rx="12" fill={`url(#grad-${uid})`} />
        <rect x="82" y="54" width="36" height="14" rx="4" fill="#0B3D2E" opacity="0.8" />
        <rect x="68" y="82" width="64" height="14" rx="4" fill="white" opacity="0.25" />
        <path d="M104 100 L88 126 L100 126 L96 146 L114 118 L102 118 Z" fill="#FFDB70" />
      </g>
    </Frame>
  );
}

export function AccessoryArt({ tint = "green", uid = "ac", className }) {
  return (
    <Frame uid={uid} tint={tint} className={className}>
      <g>
        <ellipse cx="100" cy="172" rx="46" ry="7" fill="#0B3D2E" opacity="0.08" />
        <circle cx="100" cy="104" r="52" fill={`url(#grad-${uid})`} opacity="0.18" />
        <rect x="70" y="86" width="60" height="36" rx="10" fill={`url(#grad-${uid})`} />
        <circle cx="86" cy="104" r="7" fill="white" opacity="0.5" />
        <circle cx="114" cy="104" r="7" fill="white" opacity="0.5" />
        <path d="M60 104 H70 M130 104 H140" stroke="#0B3D2E" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
        <path d="M100 86 V70 M100 122 V138" stroke="#0B3D2E" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
      </g>
    </Frame>
  );
}

const REGISTRY = {
  waterHeater: WaterHeaterArt,
  streetLight: StreetLightArt,
  lantern: LanternArt,
  powerSystem: PowerSystemArt,
  inverter: InverterArt,
  panel: PanelArt,
  battery: BatteryArt,
  accessory: AccessoryArt,
};

export default function ProductArt({ icon, tint, uid, className }) {
  const Cmp = REGISTRY[icon] ?? AccessoryArt;
  return <Cmp tint={tint} uid={uid ?? icon} className={className} />;
}
