https://north-sea-nocturne.vercel.app

# North Sea Nocturne

A living nocturnal field of UK east coast and North Sea nighttime lights.

Simulation-first visualization that transforms NASA Black Marble nighttime radiance data into an animated, exploratory visual system. Currently rendering with synthetic data — designed to be backed by real VNP46A2 tiles.

## Quick start

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

## Deploy to Vercel

```bash
# Via CLI
npx vercel

# Or connect the repo to Vercel dashboard — it auto-detects Vite.
```

## Architecture

This is the **Phase 1 skeleton** from the spec — a working frontend scene with synthetic data and all UI chrome.

```
src/
  App.jsx       — Main component (scene renderer + UI panels)
  main.jsx      — React entry point
index.html      — Shell with Inter font, slider styling, scrollbar theming
vite.config.js  — Vite + React plugin
vercel.json     — Vercel SPA routing
```

### What's wired up

- **Canvas renderer** — geographically-projected night scene with real UK/Ireland/continental coastline polygons
- **Tiered luminance** — T1 cities (London, Amsterdam, Birmingham) with sharp cores, T2 cities with moderate glow, platforms as pinpoint flares, shipping as faint cool traces
- **Non-linear intensity curve** — `pow(0.7)` transfer function compresses midtones, lifts peaks
- **Three-pass coastline glow** — wide atmospheric haze → medium rim → thin bright edge
- **Animated simulation** — per-type flicker (platform flare, shipping drift, city breathing)
- **Scene controls** — Glow, Persistence, Anomaly mode, Atmosphere toggles
- **Collapsible glass panels** — hero controls promoted, secondary collapsed
- **Premium timeline** — click-to-seek scrubber with playhead, LIVE indicator
- **Weather / Shipping / Regions** — structural chrome ready for real data

### Next steps (from spec)

1. Decompose into `packages/` monorepo structure
2. Add Zustand store for scene state
3. Build `ingest-worker` for real Black Marble tile processing
4. Replace synthetic features with tile-backed luminance layer
5. Add MapLibre GL JS for proper map interactions (pan, zoom)

## Stack

- Vite 6
- React 18
- Canvas 2D (upgrade path: WebGL via Three.js or deck.gl)
- Vercel for deployment

## License

MIT
