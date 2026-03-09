import { useEffect, useMemo, useRef, useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import {
  CONTROL_SIZES,
  RADIUS_TOKENS,
  SPACING_TOKENS,
  glassSurface,
  getViewportMode,
} from "./tokens";
import {
  CORRIDORS,
  REGIONS,
  createSceneFeatures,
  renderScene,
} from "./scene";

const DATES = [
  { date: "14 Jun 2024", time: "23:47" },
  { date: "13 Jun 2024", time: "23:31" },
  { date: "12 Jun 2024", time: "00:05" },
  { date: "11 Jun 2024", time: "23:52" },
  { date: "10 Jun 2024", time: "23:40" },
];

const NAV_ITEMS = ["Overview", "Timeline", "Events", "Weather", "Traffic", "Memory"];

const REGION_META = [
  { id: "aberdeen-humber", corridorId: "aberdeen-humber" },
  { id: "london-east-coast", corridorId: "london-east-coast" },
  { id: "teesside-tyne", corridorId: "aberdeen-humber" },
  { id: "firth-forth", corridorId: "aberdeen-humber" },
];

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function useViewportMode() {
  const [mode, setMode] = useState(() =>
    typeof window === "undefined" ? "desktop" : getViewportMode(window.innerWidth)
  );

  useEffect(() => {
    const onResize = () => setMode(getViewportMode(window.innerWidth));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return mode;
}

function makeTimelineTicks() {
  const ticks = [];
  for (let i = 0; i < 36; i += 1) {
    const wave = Math.sin(i * 0.43) * 5;
    const drift = Math.cos(i * 0.19) * 3.2;
    const bright = i % 10 === 0 || i === 18;
    ticks.push({
      height: 6 + wave + drift + (bright ? 3 : 0),
      bright,
    });
  }
  return ticks;
}

function MoonIcon({ size = 20, alpha = 0.34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="9.7" fill="none" stroke={`rgba(186,209,242,${alpha})`} strokeWidth="1" />
      <path d="M12 2A10 10 0 0 1 12 22A6 6 0 0 0 12 2" fill={`rgba(186,209,242,${alpha * 0.7})`} />
    </svg>
  );
}

function GlassCard({ tier = "tier1", active = false, style, padding, radius, children }) {
  return <div style={{ ...glassSurface(tier, { active, padding, radius }), ...style }}>{children}</div>;
}

function PanelLabel({ children, subdued }) {
  return (
    <div
      style={{
        fontSize: 9,
        fontWeight: 620,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: subdued ? "rgba(152,174,208,0.32)" : "rgba(174,196,226,0.5)",
      }}
    >
      {children}
    </div>
  );
}

function ToggleSwitch({ value, onChange }) {
  return (
    <button
      onClick={() => onChange(!value)}
      style={{
        width: 38,
        height: 20,
        borderRadius: RADIUS_TOKENS.pill,
        border: "1px solid rgba(255,255,255,0.08)",
        background: value
          ? "linear-gradient(90deg, rgba(85,146,255,0.7), rgba(75,124,220,0.62))"
          : "linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
        position: "relative",
        cursor: "pointer",
        transition: "all 0.2s",
        padding: 0,
      }}
    >
      <span
        style={{
          width: 14,
          height: 14,
          borderRadius: "50%",
          position: "absolute",
          top: 2,
          left: value ? 20 : 3,
          background: value ? "rgba(255,255,255,0.96)" : "rgba(214,223,241,0.46)",
          boxShadow: value ? "0 0 8px rgba(120,174,255,0.42)" : "none",
          transition: "all 0.2s",
        }}
      />
    </button>
  );
}

function SceneSlider({ label, value, onChange }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "72px 1fr 32px", gap: 8, alignItems: "center" }}>
      <span style={{ fontSize: 11.5, color: "rgba(202,216,238,0.72)" }}>{label}</span>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        style={{ width: "100%", accentColor: "#7eb0ff", opacity: 0.82 }}
      />
      <span
        style={{
          fontSize: 10.5,
          fontVariantNumeric: "tabular-nums",
          textAlign: "right",
          color: "rgba(170,192,224,0.56)",
        }}
      >
        {value}
      </span>
    </div>
  );
}

function CompactSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button
        onClick={() => setOpen((state) => !state)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "transparent",
          border: "none",
          padding: 0,
          cursor: "pointer",
          marginBottom: open ? 8 : 2,
        }}
      >
        <PanelLabel subdued>{title}</PanelLabel>
        <span
          style={{
            color: "rgba(156,178,212,0.4)",
            fontSize: 10,
            transform: open ? "rotate(0deg)" : "rotate(-90deg)",
            transition: "transform 0.2s",
          }}
        >
          v
        </span>
      </button>
      {open && children}
    </div>
  );
}

function AnomalySegmented({ value, onChange }) {
  const options = [
    { id: "none", label: "None" },
    { id: "dimming", label: "Dimming" },
    { id: "surge", label: "Surge" },
  ];

  return (
    <GlassCard tier="tier3" radius={RADIUS_TOKENS.nested} padding="4px" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4 }}>
      {options.map((option) => {
        const active = option.id === value;
        return (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            style={{
              border: "none",
              borderRadius: 12,
              padding: "6px 0",
              fontSize: 10,
              fontWeight: active ? 620 : 470,
              color: active ? "rgba(225,237,255,0.9)" : "rgba(150,172,206,0.44)",
              background: active
                ? "linear-gradient(180deg, rgba(104,154,255,0.34), rgba(76,126,224,0.24))"
                : "rgba(255,255,255,0.02)",
              boxShadow: active ? "inset 0 0 0 1px rgba(128,182,255,0.18)" : "none",
              cursor: "pointer",
              transition: "all 0.18s",
            }}
          >
            {option.label}
          </button>
        );
      })}
    </GlassCard>
  );
}

function ShippingSparkline() {
  const points = useMemo(() => {
    const values = [];
    for (let i = 0; i < 20; i += 1) {
      values.push(18 + Math.sin(i * 0.35) * 9 + Math.cos(i * 0.14) * 3.2);
    }
    return values;
  }, []);

  const width = 132;
  const height = 28;
  const path = points
    .map((value, i) => {
      const x = (i / (points.length - 1)) * width;
      const y = height - (value / 34) * height;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} style={{ opacity: 0.56 }}>
      <defs>
        <linearGradient id="shipArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6fa8ff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#6fa8ff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${path} L${width},${height} L0,${height} Z`} fill="url(#shipArea)" />
      <path d={path} fill="none" stroke="#82b5ff" strokeWidth="1.2" strokeDasharray="2.5,2" />
    </svg>
  );
}

function TopNav({
  mode,
  activeNav,
  onNavChange,
  onControls,
}) {
  const navItems = mode === "mobile" ? NAV_ITEMS.slice(0, 3) : NAV_ITEMS;

  return (
    <div
      style={{
        position: "absolute",
        top: 8,
        left: 0,
        right: 0,
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: `0 ${mode === "mobile" ? 10 : 16}px`,
        gap: 10,
      }}
    >
      <GlassCard
        tier="tier2"
        padding={mode === "mobile" ? "8px 10px" : "8px 12px"}
        radius={RADIUS_TOKENS.nested}
        style={{ display: "flex", alignItems: "center", gap: 8 }}
      >
        <MoonIcon size={mode === "mobile" ? 20 : 22} alpha={0.3} />
        <div style={{ lineHeight: 1.15 }}>
          <div style={{ fontSize: mode === "mobile" ? 10 : 10.8, fontWeight: 610, letterSpacing: "0.12em", color: "rgba(220,232,252,0.8)" }}>
            NORTH SEA · UK
          </div>
          <div style={{ fontSize: 8.2, letterSpacing: "0.08em", color: "rgba(152,176,214,0.56)" }}>NIGHT LIGHTS</div>
        </div>
      </GlassCard>

      <GlassCard
        tier="tier2"
        radius={RADIUS_TOKENS.pill}
        padding="3px"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          minHeight: CONTROL_SIZES.navHeight,
          flex: mode === "mobile" ? "1 1 auto" : "0 1 auto",
          maxWidth: mode === "mobile" ? 230 : undefined,
          overflowX: "auto",
        }}
      >
        {navItems.map((item) => {
          const active = item === activeNav;
          return (
            <button
              key={item}
              onClick={() => onNavChange(item)}
              style={{
                border: "none",
                borderRadius: RADIUS_TOKENS.pill,
                padding: mode === "mobile" ? "6px 10px" : "6px 12px",
                fontSize: mode === "mobile" ? 10 : 10.5,
                fontWeight: active ? 580 : 460,
                color: active ? "rgba(230,240,255,0.92)" : "rgba(154,176,208,0.54)",
                background: active
                  ? "linear-gradient(180deg, rgba(114,164,255,0.24), rgba(72,122,220,0.18))"
                  : "transparent",
                boxShadow: active ? "0 0 16px rgba(86,148,255,0.2), inset 0 0 0 1px rgba(130,184,255,0.14)" : "none",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.18s",
              }}
            >
              {item}
            </button>
          );
        })}
      </GlassCard>

      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <button
          onClick={onControls}
          style={{
            ...glassSurface("tier3", { radius: 12, padding: "0" }),
            width: CONTROL_SIZES.iconButton,
            height: CONTROL_SIZES.iconButton,
            border: "1px solid rgba(255,255,255,0.06)",
            color: "rgba(188,208,236,0.72)",
            cursor: "pointer",
            fontSize: 12,
          }}
        >
          ===
        </button>
      </div>
    </div>
  );
}

function TimelineSurface({
  spacing,
  isPlaying,
  scrubPos,
  onScrub,
  onTogglePlay,
  selectedDate,
  activeCorridor,
  timelineUIState,
  onHover,
}) {
  const ticks = useMemo(makeTimelineTicks, []);
  const date = DATES[selectedDate];
  const corridor = CORRIDORS.find((item) => item.id === activeCorridor) || CORRIDORS[0];

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: spacing.timelineBottom,
        zIndex: 18,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div style={{ position: "relative", width: `min(92vw, ${spacing.timelineMaxWidth}px)`, pointerEvents: "auto" }}>
        <GlassCard
          tier="tier1"
          active
          radius={RADIUS_TOKENS.major}
          padding="12px 18px 14px"
          style={{
            minHeight: CONTROL_SIZES.timelineHeight,
            display: "grid",
            gridTemplateColumns: "148px 1fr 112px",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={{ fontSize: 9, letterSpacing: "0.14em", color: "rgba(146,170,206,0.46)", textTransform: "uppercase" }}>
              Live Corridor
            </span>
            <span style={{ fontSize: 12, fontWeight: 560, color: "rgba(218,231,252,0.82)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {corridor.label}
            </span>
            <span style={{ fontSize: 9.5, color: "rgba(156,178,212,0.6)", fontVariantNumeric: "tabular-nums" }}>
              {date.date}  {date.time}
            </span>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: 5 }}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
          >
            <div style={{ display: "flex", alignItems: "flex-end", height: 22, gap: 2.5, opacity: timelineUIState.hovered ? 1 : 0.88 }}>
              {ticks.map((tick, idx) => {
                const pos = (idx / (ticks.length - 1)) * 100;
                const near = Math.abs(pos - scrubPos) < 5;
                return (
                  <div
                    key={idx}
                    style={{
                      width: tick.bright ? 2 : 1.6,
                      height: clamp(tick.height, 5, 18),
                      borderRadius: 2,
                      background: tick.bright
                        ? "rgba(122,184,255,0.58)"
                        : near
                          ? "rgba(214,229,255,0.26)"
                          : "rgba(208,224,248,0.07)",
                    }}
                  />
                );
              })}
            </div>

            <div
              style={{ position: "relative", height: 20, cursor: "pointer" }}
              onClick={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                const pct = ((event.clientX - rect.left) / rect.width) * 100;
                onScrub(clamp(Math.round(pct), 0, 100));
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 9,
                  left: 0,
                  right: 0,
                  height: 2,
                  borderRadius: 999,
                  background: "rgba(208,222,246,0.1)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 9,
                  left: 0,
                  width: `${scrubPos}%`,
                  height: 2,
                  borderRadius: 999,
                  background: "linear-gradient(90deg, rgba(124,186,255,0.42), rgba(196,224,255,0.66))",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: `${scrubPos}%`,
                  top: 2,
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  transform: "translateX(-50%)",
                  background: "rgba(236,244,255,0.95)",
                  boxShadow: "0 0 14px rgba(138,196,255,0.54), 0 2px 8px rgba(0,0,0,0.4)",
                  animation: isPlaying ? "nsnPlayPulse 2.6s ease-in-out infinite" : "none",
                }}
              />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 8 }}>
            <GlassCard tier="tier3" radius={RADIUS_TOKENS.pill} padding="6px 10px" style={{ fontSize: 9, color: "rgba(164,188,224,0.6)", textTransform: "uppercase", letterSpacing: "0.11em" }}>
              {isPlaying ? "LIVE" : "PAUSED"}
            </GlassCard>
            <button
              style={{
                ...glassSurface("tier3", { radius: RADIUS_TOKENS.pill, padding: "6px 10px" }),
                border: "1px solid rgba(255,255,255,0.06)",
                color: "rgba(180,204,236,0.72)",
                fontSize: 9,
                letterSpacing: "0.08em",
                cursor: "pointer",
              }}
            >
              MODE
            </button>
          </div>
        </GlassCard>

        <button
          onClick={onTogglePlay}
          style={{
            position: "absolute",
            left: "50%",
            bottom: -18,
            transform: "translateX(-50%)",
            width: CONTROL_SIZES.playButton,
            height: CONTROL_SIZES.playButton,
            borderRadius: "50%",
            border: "1px solid rgba(166,206,255,0.24)",
            background: "linear-gradient(180deg, rgba(126,184,255,0.3), rgba(60,100,188,0.28))",
            boxShadow: "0 8px 20px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.2)",
            color: "rgba(236,244,255,0.95)",
            fontSize: 16,
            cursor: "pointer",
            display: "grid",
            placeItems: "center",
            animation: isPlaying ? "nsnControlBreath 4.4s ease-in-out infinite" : "none",
          }}
        >
          {isPlaying ? "II" : ">"}
        </button>
      </div>
    </div>
  );
}

function LeftAssistantPanel({
  selectedDate,
  onSelectDate,
  mode,
}) {
  const date = DATES[selectedDate];
  return (
    <GlassCard tier="tier1" active radius={RADIUS_TOKENS.major} padding="14px 14px 12px" style={{ display: "grid", gap: 11 }}>
      <div>
        <PanelLabel>Time</PanelLabel>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 3 }}>
          <span style={{ fontSize: mode === "mobile" ? 18 : 21, fontWeight: 320, color: "rgba(227,236,251,0.9)" }}>{date.date}</span>
          <span style={{ fontSize: 15, color: "rgba(184,201,226,0.62)", fontVariantNumeric: "tabular-nums" }}>{date.time}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 9.5, color: "rgba(156,180,212,0.54)", marginTop: 5 }}>
          <MoonIcon size={12} alpha={0.25} />
          <span>Waxing Gibbous</span>
          <span style={{ marginLeft: "auto" }}>72%</span>
        </div>
      </div>

      <div style={{ height: 1, background: "linear-gradient(90deg, rgba(255,255,255,0.02), rgba(168,192,228,0.2), rgba(255,255,255,0.02))" }} />

      <div>
        <CompactSection title="Recent" defaultOpen>
          <div style={{ display: "grid", gap: 4 }}>
            {DATES.map((item, idx) => (
              <button
                key={item.date}
                onClick={() => onSelectDate(idx)}
                style={{
                  border: "none",
                  background: idx === selectedDate ? "rgba(119,172,255,0.16)" : "rgba(255,255,255,0.01)",
                  borderRadius: 12,
                  padding: "5px 7px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: idx === selectedDate ? "rgba(224,236,255,0.9)" : "rgba(162,184,218,0.5)",
                  cursor: "pointer",
                  fontSize: 10.5,
                }}
              >
                <span>{item.date}</span>
                <span style={{ fontVariantNumeric: "tabular-nums" }}>{item.time}</span>
              </button>
            ))}
          </div>
        </CompactSection>
      </div>

      <div style={{ height: 1, background: "linear-gradient(90deg, rgba(255,255,255,0.02), rgba(168,192,228,0.2), rgba(255,255,255,0.02))" }} />

      <div>
        <CompactSection title="Weather" defaultOpen={mode !== "mobile"}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <div style={{ fontSize: 9, color: "rgba(152,176,208,0.52)", marginBottom: 2 }}>North Sea</div>
              <div style={{ fontSize: 27, lineHeight: 1, fontWeight: 280, color: "rgba(228,238,252,0.88)" }}>
                11.2<span style={{ fontSize: 12, verticalAlign: "super" }}>C</span>
              </div>
            </div>
            <div style={{ fontSize: 9.5, color: "rgba(170,194,226,0.58)", textAlign: "right" }}>
              NW Wind 24 km/h
              <br />
              Humidity 77%
            </div>
          </div>
        </CompactSection>
      </div>
    </GlassCard>
  );
}

function RightControlStack({
  glow,
  persistence,
  setGlow,
  setPersistence,
  haze,
  clouds,
  moonlight,
  setHaze,
  setClouds,
  setMoonlight,
  anomaly,
  setAnomaly,
  regions,
  activeRegion,
  onSelectRegion,
}) {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <GlassCard tier="tier1" active radius={RADIUS_TOKENS.major} padding="14px 14px 12px" style={{ display: "grid", gap: 10 }}>
        <PanelLabel>Hero Controls</PanelLabel>
        <SceneSlider label="Glow" value={glow} onChange={setGlow} />
        <SceneSlider label="Persistence" value={persistence} onChange={setPersistence} />
      </GlassCard>

      <GlassCard tier="tier2" radius={RADIUS_TOKENS.nested} padding="12px 12px 10px" style={{ display: "grid", gap: 10 }}>
        <CompactSection title="Atmosphere" defaultOpen>
          <div style={{ display: "grid", gap: 8 }}>
            {[
              ["Haze", haze, setHaze],
              ["Clouds", clouds, setClouds],
              ["Moonlight", moonlight, setMoonlight],
            ].map((row) => (
              <div key={row[0]} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 11, color: "rgba(184,205,232,0.64)" }}>{row[0]}</span>
                <ToggleSwitch value={row[1]} onChange={row[2]} />
              </div>
            ))}
          </div>
        </CompactSection>

        <CompactSection title="Anomaly Mode" defaultOpen={false}>
          <AnomalySegmented value={anomaly} onChange={setAnomaly} />
        </CompactSection>
      </GlassCard>

      <GlassCard tier="tier2" radius={RADIUS_TOKENS.nested} padding="10px 12px" style={{ display: "grid", gap: 10 }}>
        <div>
          <PanelLabel subdued>Shipping</PanelLabel>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 2 }}>
            <div>
              <span style={{ fontSize: 18, fontWeight: 360, color: "rgba(226,236,252,0.9)" }}>123</span>
              <span style={{ marginLeft: 4, fontSize: 9.5, color: "rgba(154,176,208,0.52)" }}>vessels</span>
            </div>
            <span style={{ fontSize: 8, letterSpacing: "0.1em", color: "rgba(124,186,255,0.62)", textTransform: "uppercase" }}>high</span>
          </div>
          <ShippingSparkline />
        </div>

        <div style={{ height: 1, background: "linear-gradient(90deg, rgba(255,255,255,0.02), rgba(158,186,226,0.2), rgba(255,255,255,0.02))" }} />

        <div>
          <PanelLabel subdued>Regions</PanelLabel>
          <div style={{ display: "grid", gap: 5, marginTop: 4 }}>
            {regions.map((region) => {
              const active = activeRegion === region.id;
              return (
                <button
                  key={region.id}
                  onClick={() => onSelectRegion(region.id)}
                  style={{
                    border: active ? "1px solid rgba(132,184,255,0.22)" : "1px solid rgba(255,255,255,0.04)",
                    background: active
                      ? "linear-gradient(180deg, rgba(104,154,255,0.18), rgba(72,122,220,0.12))"
                      : "rgba(255,255,255,0.015)",
                    borderRadius: 12,
                    padding: "6px 8px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    color: active ? "rgba(224,236,255,0.86)" : "rgba(158,182,216,0.52)",
                    fontSize: 10.5,
                  }}
                >
                  <span>{region.label}</span>
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: active ? "rgba(120,182,255,0.9)" : "rgba(152,176,212,0.2)",
                      boxShadow: active ? "0 0 7px rgba(120,182,255,0.52)" : "none",
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

export default function NorthSeaNocturne() {
  const viewportMode = useViewportMode();
  const spacing = SPACING_TOKENS[viewportMode];

  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const timeRef = useRef(0);
  const featuresRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [glow, setGlow] = useState(80);
  const [persistence, setPersistence] = useState(62);
  const [haze, setHaze] = useState(true);
  const [clouds, setClouds] = useState(true);
  const [moonlight, setMoonlight] = useState(true);
  const [anomaly, setAnomaly] = useState("surge");

  const [activeNav, setActiveNav] = useState("Overview");
  const [selectedDate, setSelectedDate] = useState(0);
  const [scrubPos, setScrubPos] = useState(78);
  const [timelineUIState, setTimelineUIState] = useState({
    hovered: false,
    emphasis: "scrub",
  });

  const [activeRegion, setActiveRegion] = useState("aberdeen-humber");
  const [showTabletDrawer, setShowTabletDrawer] = useState(false);
  const [showMobileSheet, setShowMobileSheet] = useState(false);

  if (!featuresRef.current) featuresRef.current = createSceneFeatures();

  const activeCorridor = useMemo(() => {
    const match = REGION_META.find((item) => item.id === activeRegion);
    return match ? match.corridorId : "aberdeen-humber";
  }, [activeRegion]);

  const sceneParams = useMemo(
    () => ({
      glow,
      persistence,
      haze,
      clouds,
      moonlight,
      anomaly,
      activeCorridor,
      viewportMode,
    }),
    [glow, persistence, haze, clouds, moonlight, anomaly, activeCorridor, viewportMode]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    let running = true;
    let lastW = 0;
    let lastH = 0;
    let lastDpr = 0;

    const loop = () => {
      if (!running) return;
      if (isPlaying) timeRef.current += 16;

      const rect = canvas.getBoundingClientRect();
      const dw = rect.width;
      const dh = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      if (dpr !== lastDpr || dw !== lastW || dh !== lastH) {
        canvas.width = Math.round(dw * dpr);
        canvas.height = Math.round(dh * dpr);
        lastDpr = dpr;
        lastW = dw;
        lastH = dh;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      renderScene(ctx, dw, dh, timeRef.current, featuresRef.current, sceneParams);
      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);

    return () => {
      running = false;
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying, sceneParams]);

  useEffect(() => {
    if (viewportMode === "desktop") {
      setShowTabletDrawer(false);
      setShowMobileSheet(false);
    }
    if (viewportMode === "tablet") {
      setShowMobileSheet(false);
    }
    if (viewportMode === "mobile") {
      setShowTabletDrawer(false);
    }
  }, [viewportMode]);

  const onScrub = (value) => {
    setScrubPos(value);
    setTimelineUIState((state) => ({ ...state, emphasis: "scrub" }));
    const idx = clamp(Math.round(((100 - value) / 100) * (DATES.length - 1)), 0, DATES.length - 1);
    setSelectedDate(idx);
  };

  const isDesktop = viewportMode === "desktop";
  const isTablet = viewportMode === "tablet";
  const isMobile = viewportMode === "mobile";

  const sharedRightRail = (
    <RightControlStack
      glow={glow}
      persistence={persistence}
      setGlow={setGlow}
      setPersistence={setPersistence}
      haze={haze}
      clouds={clouds}
      moonlight={moonlight}
      setHaze={setHaze}
      setClouds={setClouds}
      setMoonlight={setMoonlight}
      anomaly={anomaly}
      setAnomaly={setAnomaly}
      regions={REGIONS}
      activeRegion={activeRegion}
      onSelectRegion={setActiveRegion}
    />
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        background: "#03070f",
        fontFamily: '"Inter","SF Pro Display",-apple-system,system-ui,sans-serif',
        color: "rgba(205,220,244,0.88)",
      }}
    >
      <style>{`
        @keyframes nsnPlayPulse {
          0%, 100% { transform: translateX(-50%) scale(1); box-shadow: 0 0 14px rgba(138,196,255,0.54), 0 2px 8px rgba(0,0,0,0.4); }
          50% { transform: translateX(-50%) scale(1.08); box-shadow: 0 0 20px rgba(152,210,255,0.66), 0 2px 10px rgba(0,0,0,0.45); }
        }
        @keyframes nsnControlBreath {
          0%, 100% { box-shadow: 0 8px 20px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.2); }
          50% { box-shadow: 0 10px 24px rgba(0,0,0,0.52), inset 0 1px 0 rgba(255,255,255,0.24), 0 0 22px rgba(120,182,255,0.28); }
        }
      `}</style>

      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }} />

      <TopNav
        mode={viewportMode}
        activeNav={activeNav}
        onNavChange={setActiveNav}
        onControls={() => {
          if (isTablet) setShowTabletDrawer((state) => !state);
          if (isMobile) setShowMobileSheet((state) => !state);
        }}
      />

      {!isMobile && (
        <div
          style={{
            position: "absolute",
            top: spacing.topOffset,
            left: spacing.pagePaddingX,
            bottom: spacing.timelineLift,
            width: spacing.railWidth,
            zIndex: 14,
            overflowY: "auto",
            paddingBottom: 8,
          }}
        >
          <LeftAssistantPanel selectedDate={selectedDate} onSelectDate={setSelectedDate} mode={viewportMode} />
        </div>
      )}

      {isDesktop && (
        <div
          style={{
            position: "absolute",
            top: spacing.topOffset,
            right: spacing.pagePaddingX,
            bottom: spacing.timelineLift,
            width: spacing.railWidth,
            zIndex: 14,
            overflowY: "auto",
            paddingBottom: 8,
          }}
        >
          {sharedRightRail}
        </div>
      )}

      {isTablet && showTabletDrawer && (
        <div
          style={{
            position: "absolute",
            top: spacing.topOffset,
            right: spacing.pagePaddingX,
            bottom: spacing.timelineLift,
            width: spacing.railWidth,
            zIndex: 24,
            overflowY: "auto",
            paddingBottom: 8,
          }}
        >
          {sharedRightRail}
        </div>
      )}

      {isMobile && (
        <div
          style={{
            position: "absolute",
            top: 62,
            left: spacing.pagePaddingX,
            right: spacing.pagePaddingX,
            zIndex: 14,
          }}
        >
          <LeftAssistantPanel selectedDate={selectedDate} onSelectDate={setSelectedDate} mode={viewportMode} />
        </div>
      )}

      {isMobile && showMobileSheet && (
        <div
          style={{
            position: "absolute",
            left: spacing.pagePaddingX,
            right: spacing.pagePaddingX,
            bottom: spacing.timelineLift - 6,
            maxHeight: "44vh",
            zIndex: 22,
            overflowY: "auto",
          }}
        >
          {sharedRightRail}
        </div>
      )}

      <TimelineSurface
        spacing={spacing}
        isPlaying={isPlaying}
        scrubPos={scrubPos}
        onScrub={onScrub}
        onTogglePlay={() => {
          setIsPlaying((state) => !state);
          setTimelineUIState((state) => ({ ...state, emphasis: "play" }));
        }}
        selectedDate={selectedDate}
        activeCorridor={activeCorridor}
        timelineUIState={timelineUIState}
        onHover={(hovered) => setTimelineUIState((state) => ({ ...state, hovered }))}
      />
      <SpeedInsights />
    </div>
  );
}
