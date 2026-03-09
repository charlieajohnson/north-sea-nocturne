export const BREAKPOINTS = {
  tablet: 900,
  desktop: 1280,
};

export const RADIUS_TOKENS = {
  major: 28,
  nested: 20,
  compact: 14,
  pill: 999,
};

export const SPACING_TOKENS = {
  desktop: {
    pagePaddingX: 20,
    topOffset: 56,
    railWidth: 236,
    railGap: 14,
    timelineBottom: 20,
    timelineMaxWidth: 800,
    timelineLift: 134,
  },
  tablet: {
    pagePaddingX: 14,
    topOffset: 56,
    railWidth: 214,
    railGap: 12,
    timelineBottom: 18,
    timelineMaxWidth: 700,
    timelineLift: 128,
  },
  mobile: {
    pagePaddingX: 12,
    topOffset: 54,
    railGap: 10,
    timelineBottom: 14,
    timelineMaxWidth: 640,
    timelineLift: 118,
  },
};

export const CONTROL_SIZES = {
  navHeight: 32,
  navPillHeight: 28,
  iconButton: 30,
  timelineHeight: 94,
  playButton: 58,
  sliderThumb: 16,
};

export const GLASS_TOKENS = {
  tier1: {
    background:
      "linear-gradient(180deg, rgba(24,34,56,0.4) 0%, rgba(9,14,24,0.5) 100%)",
    border: "1px solid rgba(255,255,255,0.055)",
    boxShadow:
      "0 10px 26px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(255,255,255,0.018)",
    backdropFilter: "blur(34px) saturate(1.18)",
    WebkitBackdropFilter: "blur(34px) saturate(1.18)",
  },
  tier2: {
    background:
      "linear-gradient(180deg, rgba(24,34,54,0.29) 0%, rgba(8,13,22,0.4) 100%)",
    border: "1px solid rgba(255,255,255,0.04)",
    boxShadow:
      "0 7px 21px rgba(0,0,0,0.26), inset 0 1px 0 rgba(255,255,255,0.055), inset 0 -1px 0 rgba(255,255,255,0.016)",
    backdropFilter: "blur(28px) saturate(1.14)",
    WebkitBackdropFilter: "blur(28px) saturate(1.14)",
  },
  tier3: {
    background:
      "linear-gradient(180deg, rgba(31,43,67,0.24) 0%, rgba(12,18,31,0.34) 100%)",
    border: "1px solid rgba(255,255,255,0.04)",
    boxShadow:
      "0 5px 14px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.05)",
    backdropFilter: "blur(20px) saturate(1.08)",
    WebkitBackdropFilter: "blur(20px) saturate(1.08)",
  },
  active: {
    border: "1px solid rgba(152,198,255,0.22)",
    boxShadow:
      "0 9px 24px rgba(3,9,19,0.43), inset 0 1px 0 rgba(255,255,255,0.11), 0 0 0 1px rgba(90,155,255,0.07)",
  },
};

export function getViewportMode(width) {
  if (width >= BREAKPOINTS.desktop) return "desktop";
  if (width >= BREAKPOINTS.tablet) return "tablet";
  return "mobile";
}

export function glassSurface(tier, opts = {}) {
  const base = GLASS_TOKENS[tier] || GLASS_TOKENS.tier1;
  const active = opts.active ? GLASS_TOKENS.active : null;
  return {
    ...base,
    ...(active || {}),
    borderRadius: opts.radius || RADIUS_TOKENS.major,
    padding: opts.padding || "14px 16px",
  };
}
