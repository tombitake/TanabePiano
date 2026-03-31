interface BachMascotProps {
  className?: string;
  hairColor?: string;
  faceColor?: string;
}

/**
 * Bach-themed mascot character —
 * Curly-haired, intense-faced character peeking from below,
 * inspired by the concert program illustration.
 */
export function BachMascot({
  className = 'w-40 h-36',
  hairColor = '#2D7070',
  faceColor = '#FFFFFF',
}: BachMascotProps) {
  const outline = '#1A2828';
  const strokeW = 4;

  return (
    <svg
      viewBox="0 0 220 190"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="バッハマスコットキャラクター"
    >
      {/* ── Hair body (main arc) ── */}
      <path
        d="M 18,190 C 18,88 45,8 110,4 C 175,8 202,88 202,190"
        fill={hairColor}
        stroke={outline}
        strokeWidth={strokeW}
        strokeLinejoin="round"
      />

      {/* ── Hair bumps (curls along the arc) ── */}
      {([
        [22, 148, 20],
        [40,  95, 20],
        [66,  46, 22],
        [96,  16, 22],
        [124,  12, 22],
        [150,  38, 22],
        [174,  84, 20],
        [196, 136, 20],
      ] as [number, number, number][]).map(([cx, cy, r], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill={hairColor}
          stroke={outline}
          strokeWidth={strokeW - 0.5}
        />
      ))}

      {/* ── Face (white dome, lower half visible) ── */}
      <ellipse
        cx="110"
        cy="165"
        rx="68"
        ry="56"
        fill={faceColor}
        stroke={outline}
        strokeWidth={strokeW}
      />

      {/* ── Left eyebrow (scowling inward) ── */}
      <line
        x1="78" y1="144"
        x2="98" y2="149"
        stroke={outline}
        strokeWidth={4}
        strokeLinecap="round"
      />
      {/* ── Right eyebrow ── */}
      <line
        x1="122" y1="149"
        x2="142" y2="144"
        stroke={outline}
        strokeWidth={4}
        strokeLinecap="round"
      />

      {/* ── Eyes ── */}
      <ellipse cx="90"  cy="158" rx="6.5" ry="5.5" fill={outline} />
      <ellipse cx="130" cy="158" rx="6.5" ry="5.5" fill={outline} />

      {/* ── Nose (small mark) ── */}
      <circle cx="110" cy="171" r="2.5" fill={outline} opacity="0.45" />

      {/* ── Mouth (determined, slight downward curve) ── */}
      <path
        d="M 97,182 C 102,178 118,178 123,182"
        stroke={outline}
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
      />

      {/* ── Left fist ── */}
      <rect x="28" y="175" width="36" height="22" rx="9" fill={faceColor} stroke={outline} strokeWidth={strokeW} />
      <line x1="36" y1="182" x2="56" y2="182" stroke={outline} strokeWidth={1.5} />
      <line x1="36" y1="188" x2="56" y2="188" stroke={outline} strokeWidth={1.5} />

      {/* ── Right fist ── */}
      <rect x="156" y="175" width="36" height="22" rx="9" fill={faceColor} stroke={outline} strokeWidth={strokeW} />
      <line x1="164" y1="182" x2="184" y2="182" stroke={outline} strokeWidth={1.5} />
      <line x1="164" y1="188" x2="184" y2="188" stroke={outline} strokeWidth={1.5} />
    </svg>
  );
}
