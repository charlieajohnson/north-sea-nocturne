export const LABEL_TIERS = {
  A: { fontSize: 13.8, weight: 600, alpha: 0.88, offsetX: 8, offsetY: -6 },
  B: { fontSize: 11.2, weight: 550, alpha: 0.58, offsetX: 7, offsetY: -5 },
  C: { fontSize: 9.2, weight: 500, alpha: 0.26, offsetX: 6, offsetY: -4 },
};

export const LIGHT_TIER_PROFILES = {
  A: { coreRadius: 0.32, innerRadius: 1.2, outerRadius: 3.2, coreAlpha: 0.92, innerAlpha: 0.42, outerAlpha: 0.16 },
  B: { coreRadius: 0.26, innerRadius: 1.0, outerRadius: 2.6, coreAlpha: 0.7, innerAlpha: 0.3, outerAlpha: 0.11 },
  C: { coreRadius: 0.2, innerRadius: 0.8, outerRadius: 2.1, coreAlpha: 0.48, innerAlpha: 0.2, outerAlpha: 0.07 },
  OFFSHORE: { coreRadius: 0.2, innerRadius: 0.7, outerRadius: 1.4, coreAlpha: 0.62, innerAlpha: 0.18, outerAlpha: 0.05 },
  SHIPPING: { coreRadius: 0.22, innerRadius: 0.65, outerRadius: 1.15, coreAlpha: 0.34, innerAlpha: 0.1, outerAlpha: 0.03 },
};

const UK_MAINLAND = [
  [-5.7, 50], [-5, 50], [-4.2, 50.3], [-3.6, 50.2], [-3.4, 50.6], [-3, 50.7],
  [-2, 50.7], [-1.2, 50.7], [-1, 50.8], [0, 50.8], [0.4, 50.9], [0.8, 51.1],
  [1, 51.2], [1.4, 51.4], [1.6, 51.6], [1.7, 51.8], [1.7, 52.1], [1.8, 52.5],
  [1.7, 52.8], [1.5, 52.9], [0.5, 53], [0.3, 53.3], [0.2, 53.5], [0.1, 53.6],
  [0, 53.7], [-0.1, 53.7], [-0.2, 54], [-0.2, 54.1], [-0.3, 54.4], [-0.6, 54.5],
  [-0.8, 54.6], [-1, 54.7], [-1.2, 54.9], [-1.5, 55], [-1.6, 55.3], [-1.7, 55.6],
  [-1.8, 55.8], [-2, 55.9], [-2.2, 56.1], [-2.5, 56.3], [-2.7, 56.5], [-2.5, 56.6],
  [-2.2, 56.6], [-2, 56.7], [-2, 56.9], [-2, 57.1], [-2.1, 57.3], [-2, 57.5],
  [-1.8, 57.7], [-2, 57.8], [-2.5, 58], [-3, 58.3], [-3.2, 58.5], [-3.5, 58.6],
  [-4, 58.6], [-4.3, 58.5], [-5, 58.6], [-5.3, 58.2], [-5, 57.9], [-5.5, 57.6],
  [-5.7, 57.6], [-5.5, 57.3], [-5.1, 57.2], [-5.6, 56.8], [-5.8, 56.5], [-5.4, 56.3],
  [-5.2, 56.2], [-5.5, 55.9], [-5.5, 55.7], [-5.2, 55.5], [-5, 55.4], [-4.8, 55.3],
  [-4.9, 55.2], [-5.1, 55], [-5, 54.8], [-4.8, 54.7], [-4.5, 54.5], [-4.1, 54.5],
  [-3.6, 54.5], [-3.4, 54.4], [-3.2, 54.3], [-3.1, 54.1], [-3, 54], [-2.9, 53.7],
  [-3, 53.5], [-3.1, 53.3], [-3.2, 53.2], [-3.3, 53.1], [-3.1, 52.9], [-3.1, 52.6],
  [-3.3, 52.4], [-3.4, 52.2], [-3.6, 52], [-4, 51.9], [-4.2, 51.7], [-4.5, 51.7],
  [-4.7, 51.6], [-4.9, 51.6], [-5.1, 51.5], [-5.2, 51.4], [-5.3, 51.2], [-5.2, 51],
  [-4.9, 51], [-4.6, 51.2], [-4.2, 51.2], [-3.8, 51.2], [-3.5, 51], [-3.8, 50.8],
  [-4.2, 50.6], [-4.5, 50.5], [-4.8, 50.3], [-5.1, 50.2], [-5.7, 50],
];

const IRELAND = [
  [-6, 52.2], [-6, 52.5], [-6.2, 52.8], [-6.4, 53], [-6.2, 53.2], [-6, 53.4],
  [-6.1, 53.5], [-6.3, 53.7], [-6.2, 53.9], [-6, 54], [-5.9, 54.2], [-6.1, 54.4],
  [-6.5, 54.5], [-7, 54.4], [-7.3, 54.3], [-7.5, 54.2], [-7.7, 54.3], [-8, 54.5],
  [-8.2, 54.5], [-8.5, 54.3], [-8.8, 54.3], [-9, 54.2], [-9.5, 54.2], [-9.8, 54],
  [-10, 53.8], [-10, 53.5], [-9.8, 53.3], [-9.6, 53], [-10, 52.8], [-10.2, 52.5],
  [-10, 52.2], [-9.8, 52], [-9.5, 51.8], [-9.5, 51.6], [-9.8, 51.5], [-9.6, 51.4],
  [-8.5, 51.5], [-7.8, 51.5], [-7, 52], [-6.5, 52], [-6, 52.2],
];

const NETH = [
  [3.4, 51.4], [3.8, 51.5], [4, 51.8], [4.2, 52], [4.4, 52.2], [4.6, 52.5],
  [4.8, 52.7], [5, 53], [5.2, 53.2], [5.5, 53.4], [6, 53.5], [6.5, 53.5],
  [7, 53.4], [7, 53.2], [6.8, 53], [6.5, 52.8], [6.2, 52.5], [5.8, 52],
  [5.5, 51.8], [5, 51.5], [4.5, 51.3], [4, 51.3], [3.4, 51.4],
];

const BELFR = [
  [1.5, 51], [2, 51], [2.5, 51.1], [3, 51.2], [3.4, 51.4], [3.4, 51.3],
  [2.8, 50.9], [2, 50.8], [1.5, 50.8], [1, 50.8], [0.5, 50.5], [0, 50.2],
  [-0.5, 49.8], [-1, 49.7], [-1.5, 49.5], [-1.5, 49.3], [-1, 49.2],
  [-0.5, 49.5], [0, 49.8], [0.5, 50], [1, 50.5], [1.5, 51],
];

const DENMARK = [
  [8.5, 54.8], [8.8, 55], [8.5, 55.5], [8.2, 55.8], [8, 56], [8.2, 56.5],
  [8.5, 56.8], [9, 57], [9.5, 57.2], [10, 57.5], [10.5, 57.7], [10.5, 57.5],
  [10.2, 57.2], [10, 56.8], [9.8, 56.5], [9.5, 56], [9.8, 55.5], [9.5, 55],
  [9.2, 54.8], [8.5, 54.8],
];

const NORWAY = [
  [5, 58.5], [5.5, 58.8], [6, 59], [6.5, 59.5], [7, 59.8], [7, 60],
  [5.5, 60.5], [5, 60.5], [4.5, 60.2], [4.8, 59.8], [5, 59.5], [4.8, 59], [5, 58.5],
];

const ALL_LANDS = [UK_MAINLAND, IRELAND, NETH, BELFR, DENMARK, NORWAY];

const BOUNDS = {
  west: -6.5,
  south: 49.5,
  east: 7.5,
  north: 60.5,
};

export const CITIES = [
  { name: "LONDON", lon: -0.12, lat: 51.51, tier: "A", baseRadius: 0.22, strength: 1.0, color: [255, 210, 140] },
  { name: "ABERDEEN", lon: -2.09, lat: 57.15, tier: "A", baseRadius: 0.16, strength: 0.72, color: [245, 198, 130] },
  { name: "NEWCASTLE", lon: -1.61, lat: 54.97, tier: "A", baseRadius: 0.16, strength: 0.7, color: [245, 198, 132] },
  { name: "MANCHESTER", lon: -2.24, lat: 53.48, tier: "B", baseRadius: 0.13, strength: 0.6, color: [236, 192, 122] },
  { name: "HULL", lon: -0.34, lat: 53.74, tier: "B", baseRadius: 0.11, strength: 0.5, color: [228, 184, 118] },
  { name: "EDINBURGH", lon: -3.19, lat: 55.95, tier: "B", baseRadius: 0.12, strength: 0.52, color: [230, 188, 124] },
  { name: "DUNDEE", lon: -2.97, lat: 56.46, tier: "B", baseRadius: 0.09, strength: 0.42, color: [226, 184, 118] },
  { name: "BIRMINGHAM", lon: -1.9, lat: 52.48, tier: "B", baseRadius: 0.12, strength: 0.52, color: [236, 192, 124] },
  { name: "GLASGOW", lon: -4.25, lat: 55.86, tier: "B", baseRadius: 0.11, strength: 0.48, color: [230, 186, 121] },
  { name: "AMSTERDAM", lon: 4.9, lat: 52.37, tier: "B", baseRadius: 0.11, strength: 0.46, color: [230, 188, 124] },
  { name: "ROTTERDAM", lon: 4.47, lat: 51.92, tier: "C", baseRadius: 0.09, strength: 0.38, color: [220, 178, 112] },
  { name: "LIVERPOOL", lon: -2.98, lat: 53.41, tier: "C", baseRadius: 0.09, strength: 0.36, color: [222, 179, 114] },
  { name: "SOUTHAMPTON", lon: -1.4, lat: 50.9, tier: "C", baseRadius: 0.08, strength: 0.3, color: [218, 172, 108] },
  { name: "LEEDS", lon: -1.55, lat: 53.8, tier: "C", baseRadius: 0.08, strength: 0.3, color: [218, 172, 108] },
  { name: "MIDDLESBROUGH", lon: -1.23, lat: 54.57, tier: "C", baseRadius: 0.07, strength: 0.26, color: [212, 168, 104] },
  { name: "BRISTOL", lon: -2.59, lat: 51.45, tier: "C", baseRadius: 0.07, strength: 0.24, color: [210, 166, 104] },
  { name: "NORWICH", lon: 1.3, lat: 52.63, tier: "C", baseRadius: 0.06, strength: 0.2, color: [204, 162, 100] },
];

export const CORRIDORS = [
  {
    id: "aberdeen-humber",
    label: "Aberdeen -> Humber corridor",
    points: [
      [-2.09, 57.15],
      [-1.61, 54.97],
      [-0.78, 54.62],
      [-0.34, 53.74],
      [0.08, 53.57],
    ],
    focus: [0.35, 55.8],
  },
  {
    id: "london-east-coast",
    label: "London + East Coast spine",
    points: [
      [-0.12, 51.51],
      [0.72, 51.53],
      [1.3, 52.63],
      [0.08, 53.57],
      [-0.34, 53.74],
      [-1.61, 54.97],
    ],
    focus: [0.1, 53.4],
  },
];

export const REGIONS = [
  { id: "aberdeen-humber", label: "Aberdeen -> Humber" },
  { id: "london-east-coast", label: "London + East Coast" },
  { id: "teesside-tyne", label: "Teesside / Tyne" },
  { id: "firth-forth", label: "Firth of Forth" },
];

function mkProj(w, h) {
  const centerLat = (BOUNDS.south + BOUNDS.north) / 2;
  const cos = Math.cos((centerLat * Math.PI) / 180);
  const geoW = (BOUNDS.east - BOUNDS.west) * cos;
  const geoH = BOUNDS.north - BOUNDS.south;
  const geoAspect = geoW / geoH;
  const canvasAspect = w / h;

  let scale;
  let offsetX;
  let offsetY;

  if (canvasAspect > geoAspect) {
    scale = h / geoH;
    offsetX = (w - geoW * scale) / 2;
    offsetY = 0;
  } else {
    scale = w / geoW;
    offsetX = 0;
    offsetY = (h - geoH * scale) / 2;
  }

  return {
    scale,
    cos,
    tp(lon, lat) {
      return {
        x: (lon - BOUNDS.west) * cos * scale + offsetX,
        y: (BOUNDS.north - lat) * scale + offsetY,
      };
    },
  };
}

function seededRand(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function createSceneFeatures() {
  const features = [];

  for (const city of CITIES) {
    features.push({
      kind: "city",
      tier: city.tier,
      lon: city.lon,
      lat: city.lat,
      radius: city.baseRadius,
      strength: city.strength,
      color: city.color,
      phase: seededRand(city.lon * 43 + city.lat * 7) * 6.28,
    });
  }

  const offshore = [
    [1.8, 53.5, 0.018, 0.62], [2.2, 54, 0.016, 0.54], [2.8, 54.5, 0.014, 0.44],
    [1.5, 55, 0.018, 0.52], [2, 55.5, 0.019, 0.58], [1.2, 56.5, 0.013, 0.38],
    [0.8, 57, 0.017, 0.44], [1.5, 57.5, 0.013, 0.35], [2.5, 56, 0.013, 0.42],
    [3, 55.5, 0.017, 0.48], [3.5, 54.2, 0.013, 0.36], [0.5, 54.8, 0.013, 0.31],
    [1, 55.8, 0.011, 0.33], [2.8, 56.3, 0.013, 0.37], [0.3, 56.2, 0.013, 0.31],
  ];

  for (const point of offshore) {
    features.push({
      kind: "offshore",
      lon: point[0],
      lat: point[1],
      radius: point[2],
      strength: point[3],
      color: [255, 150, 58],
      phase: seededRand(point[0] * 11 + point[1] * 19) * 6.28,
    });
  }

  for (let idx = 0; idx < 22; idx += 1) {
    const step = idx / 21;
    const jitterLon = (seededRand(idx * 17 + 4) - 0.5) * 0.28;
    const jitterLat = (seededRand(idx * 29 + 9) - 0.5) * 0.23;
    features.push({
      kind: "shipping",
      lon: 0.2 + step * 3.25 + jitterLon,
      lat: 51.8 + step * 5.1 + jitterLat,
      radius: 0.011 + seededRand(idx * 7 + 3) * 0.006,
      strength: 0.05 + seededRand(idx * 13 + 6) * 0.05,
      color: [116, 162, 244],
      phase: seededRand(idx * 41 + 12) * 6.28,
    });
  }

  return features;
}

function drawPoly(ctx, proj, points) {
  ctx.beginPath();
  for (let i = 0; i < points.length; i += 1) {
    const p = proj.tp(points[i][0], points[i][1]);
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  }
  ctx.closePath();
}

function getCorridorById(activeCorridor) {
  return CORRIDORS.find((corridor) => corridor.id === activeCorridor) || CORRIDORS[0];
}

function drawCorridorField(ctx, proj, corridor, time, glowGain) {
  const points = corridor.points.map((point) => proj.tp(point[0], point[1]));

  ctx.save();
  ctx.globalCompositeOperation = "screen";

  for (let i = 0; i < points.length; i += 1) {
    const p = points[i];
    const pulse = 0.88 + 0.12 * Math.sin(time * 0.00035 + i * 0.9);
    const radial = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 115 * glowGain * pulse);
    radial.addColorStop(0, "rgba(90,140,255,0.07)");
    radial.addColorStop(0.45, "rgba(72,126,230,0.03)");
    radial.addColorStop(1, "rgba(56,108,200,0)");
    ctx.fillStyle = radial;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 115 * glowGain * pulse, 0, 6.28);
    ctx.fill();
  }

  ctx.beginPath();
  for (let i = 0; i < points.length; i += 1) {
    const p = points[i];
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  }
  ctx.lineWidth = 1.8;
  ctx.strokeStyle = "rgba(82,146,255,0.2)";
  ctx.shadowColor = "rgba(84,155,255,0.32)";
  ctx.shadowBlur = 10;
  ctx.stroke();

  ctx.restore();
}

function drawLightStack(ctx, x, y, pxRadius, intensity, color, profile, outerTone) {
  const cr = color[0];
  const cg = color[1];
  const cb = color[2];
  const or = outerTone[0];
  const og = outerTone[1];
  const ob = outerTone[2];

  const outerR = pxRadius * profile.outerRadius;
  const innerR = pxRadius * profile.innerRadius;
  const coreR = Math.max(pxRadius * profile.coreRadius, 0.9);

  const outerGrad = ctx.createRadialGradient(x, y, 0, x, y, outerR);
  outerGrad.addColorStop(0, `rgba(${or},${og},${ob},${Math.min(intensity * profile.outerAlpha, 0.22)})`);
  outerGrad.addColorStop(0.5, `rgba(${or},${og},${ob},${Math.min(intensity * profile.outerAlpha * 0.35, 0.09)})`);
  outerGrad.addColorStop(1, `rgba(${or},${og},${ob},0)`);
  ctx.fillStyle = outerGrad;
  ctx.beginPath();
  ctx.arc(x, y, outerR, 0, 6.28);
  ctx.fill();

  const innerGrad = ctx.createRadialGradient(x, y, coreR * 0.2, x, y, innerR);
  innerGrad.addColorStop(0, `rgba(${cr},${cg},${cb},${Math.min(intensity * profile.innerAlpha, 0.56)})`);
  innerGrad.addColorStop(0.5, `rgba(${cr},${cg},${cb},${Math.min(intensity * profile.innerAlpha * 0.35, 0.2)})`);
  innerGrad.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
  ctx.fillStyle = innerGrad;
  ctx.beginPath();
  ctx.arc(x, y, innerR, 0, 6.28);
  ctx.fill();

  const coreGrad = ctx.createRadialGradient(x, y, 0, x, y, coreR);
  coreGrad.addColorStop(0, `rgba(255,255,248,${Math.min(intensity * profile.coreAlpha, 0.94)})`);
  coreGrad.addColorStop(0.6, `rgba(${cr},${cg},${cb},${Math.min(intensity * profile.coreAlpha * 0.48, 0.45)})`);
  coreGrad.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
  ctx.fillStyle = coreGrad;
  ctx.beginPath();
  ctx.arc(x, y, coreR, 0, 6.28);
  ctx.fill();
}

function getOuterTone(feature, anomaly) {
  if (anomaly === "dimming") return [118, 166, 255];
  if (anomaly === "surge") return [255, 176, 98];

  if (feature.kind === "shipping") return [106, 160, 242];
  if (feature.kind === "offshore") return [255, 164, 76];

  return [108, 156, 238];
}

function drawSeaAtmosphere(ctx, w, h, time, hazeEnabled) {
  const veil = ctx.createLinearGradient(0, h * 0.36, 0, h);
  veil.addColorStop(0, "rgba(18,34,62,0.05)");
  veil.addColorStop(1, "rgba(20,42,74,0.1)");
  ctx.fillStyle = veil;
  ctx.fillRect(0, 0, w, h);

  const drift = (Math.sin(time * 0.00008) * 0.5 + 0.5) * w * 0.07;
  const hazeBoost = hazeEnabled ? 1 : 0.62;
  const field = ctx.createRadialGradient(
    w * 0.54 + drift,
    h * 0.62,
    0,
    w * 0.56 + drift,
    h * 0.68,
    Math.max(w, h) * 0.62
  );
  field.addColorStop(0, `rgba(78,124,206,${0.055 * hazeBoost})`);
  field.addColorStop(0.45, `rgba(56,98,176,${0.03 * hazeBoost})`);
  field.addColorStop(1, "rgba(38,74,138,0)");
  ctx.fillStyle = field;
  ctx.fillRect(0, 0, w, h);
}

function drawCoastlineGlow(ctx, proj) {
  ctx.save();
  ctx.shadowColor = "rgba(76,138,252,0.28)";
  ctx.shadowBlur = 28;
  for (const poly of ALL_LANDS) {
    drawPoly(ctx, proj, poly);
    ctx.strokeStyle = "rgba(62,118,220,0.12)";
    ctx.lineWidth = 3.2;
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.shadowColor = "rgba(126,188,255,0.22)";
  ctx.shadowBlur = 10;
  drawPoly(ctx, proj, UK_MAINLAND);
  ctx.strokeStyle = "rgba(108,170,255,0.28)";
  ctx.lineWidth = 1.8;
  ctx.stroke();
  ctx.restore();

  drawPoly(ctx, proj, UK_MAINLAND);
  ctx.strokeStyle = "rgba(142,202,255,0.22)";
  ctx.lineWidth = 0.9;
  ctx.stroke();

  for (const poly of [NETH, BELFR]) {
    drawPoly(ctx, proj, poly);
    ctx.strokeStyle = "rgba(78,132,220,0.14)";
    ctx.lineWidth = 0.75;
    ctx.stroke();
  }
}

function drawLabels(ctx, proj, activeCorridor, viewportMode) {
  for (const city of CITIES) {
    if (viewportMode === "mobile" && city.tier === "C") continue;

    const pos = proj.tp(city.lon, city.lat);
    if (pos.x < 5 || pos.x > ctx.canvas.width || pos.y < 5 || pos.y > ctx.canvas.height) continue;

    const labelStyle = LABEL_TIERS[city.tier] || LABEL_TIERS.C;
    const alpha = city.tier === "C" ? labelStyle.alpha * 0.78 : labelStyle.alpha;
    ctx.font = `${labelStyle.weight} ${labelStyle.fontSize}px "Inter","SF Pro Display",system-ui,sans-serif`;
    ctx.fillStyle = `rgba(215,226,245,${alpha})`;
    ctx.textAlign = "left";
    ctx.fillText(city.name, pos.x + labelStyle.offsetX, pos.y + labelStyle.offsetY);
  }

  const seaPoint = proj.tp(2.4, 55.7);
  ctx.font = '300 15px "Inter","SF Pro Display",system-ui,sans-serif';
  ctx.fillStyle = "rgba(95,132,182,0.12)";
  ctx.textAlign = "center";
  ctx.fillText("N O R T H      S E A", seaPoint.x, seaPoint.y);

  const selected = getCorridorById(activeCorridor);
  const focus = proj.tp(selected.focus[0], selected.focus[1]);
  ctx.font = '500 9px "Inter","SF Pro Display",system-ui,sans-serif';
  ctx.fillStyle = "rgba(126,180,255,0.34)";
  ctx.textAlign = "center";
  ctx.fillText(selected.label, focus.x, focus.y);
}

export function renderScene(ctx, w, h, time, features, params) {
  ctx.fillStyle = "#03070f";
  ctx.fillRect(0, 0, w, h);

  const deep = ctx.createRadialGradient(w * 0.52, h * 0.34, 0, w * 0.5, h * 0.54, Math.max(w, h) * 0.88);
  deep.addColorStop(0, "rgba(12,19,35,0.48)");
  deep.addColorStop(1, "rgba(3,7,15,0)");
  ctx.fillStyle = deep;
  ctx.fillRect(0, 0, w, h);

  const proj = mkProj(w, h);

  if (!ctx._nsnStars) {
    ctx._nsnStars = [];
    for (let i = 0; i < 120; i += 1) {
      ctx._nsnStars.push({
        x: seededRand(i * 7 + 2),
        y: seededRand(i * 13 + 7) * 0.28,
        radius: 0.25 + seededRand(i * 5 + 4) * 0.55,
        alpha: 0.03 + seededRand(i * 11 + 5) * 0.11,
        phase: seededRand(i * 17 + 8) * 6.28,
      });
    }
  }

  for (const star of ctx._nsnStars) {
    const twinkle = star.alpha * (0.72 + 0.28 * Math.sin(time * 0.00026 + star.phase));
    ctx.fillStyle = `rgba(176,205,252,${twinkle})`;
    ctx.beginPath();
    ctx.arc(star.x * w, star.y * h, star.radius, 0, 6.28);
    ctx.fill();
  }

  for (const poly of ALL_LANDS) {
    drawPoly(ctx, proj, poly);
    ctx.fillStyle = "rgba(8,13,22,1)";
    ctx.fill();
  }

  drawSeaAtmosphere(ctx, w, h, time, params.haze);
  drawCoastlineGlow(ctx, proj);

  const corridor = getCorridorById(params.activeCorridor);
  drawCorridorField(ctx, proj, corridor, time, 0.85 + params.glow / 180);

  const glowGain = params.glow / 100;
  const persistenceGain = params.persistence / 100;

  for (const feature of features) {
    const pos = proj.tp(feature.lon, feature.lat);
    const pxRadius = feature.radius * proj.scale;
    const outerClamp = pxRadius * 6;
    if (pos.x < -outerClamp || pos.x > w + outerClamp || pos.y < -outerClamp || pos.y > h + outerClamp) {
      continue;
    }

    let flicker = 1;
    if (feature.kind === "offshore") {
      flicker = (0.52 + 0.48 * Math.sin(time * 0.0045 + feature.phase)) *
        (0.78 + 0.22 * Math.sin(time * 0.016 + feature.phase * 0.5));
    } else if (feature.kind === "shipping") {
      flicker = 0.42 + 0.58 * Math.sin(time * 0.0012 + feature.phase);
    } else if (feature.kind === "city") {
      flicker = 0.94 + 0.06 * Math.sin(time * 0.00048 + feature.phase);
    }

    if (params.clouds && feature.kind !== "shipping") {
      flicker *= 0.85 + 0.15 * Math.sin((feature.lon + time * 0.000008) * 3) *
        Math.cos((feature.lat + time * 0.000006) * 2.4);
    }

    let anomalyAdjust = 1;
    if (params.anomaly === "surge") anomalyAdjust = feature.kind === "city" ? 1.11 : 1.05;
    if (params.anomaly === "dimming") anomalyAdjust = feature.kind === "city" ? 0.84 : 0.9;

    const raw = feature.strength * flicker * (0.58 + glowGain * 0.75) * anomalyAdjust;
    const intensity = Math.pow(Math.max(raw, 0), 0.8);

    const profile =
      feature.kind === "city"
        ? LIGHT_TIER_PROFILES[feature.tier] || LIGHT_TIER_PROFILES.C
        : feature.kind === "offshore"
          ? LIGHT_TIER_PROFILES.OFFSHORE
          : LIGHT_TIER_PROFILES.SHIPPING;

    const modRadius =
      feature.kind === "city"
        ? pxRadius * (1 + persistenceGain * 0.45)
        : pxRadius * (1 + persistenceGain * 0.22);

    drawLightStack(
      ctx,
      pos.x,
      pos.y,
      modRadius,
      intensity,
      feature.color,
      profile,
      getOuterTone(feature, params.anomaly)
    );
  }

  if (params.moonlight) {
    const moonGlow = ctx.createRadialGradient(
      w * 0.8,
      h * 0.08,
      0,
      w * 0.72,
      h * 0.16,
      Math.max(w, h) * 0.44
    );
    moonGlow.addColorStop(0, "rgba(70,98,145,0.06)");
    moonGlow.addColorStop(0.45, "rgba(40,62,102,0.02)");
    moonGlow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = moonGlow;
    ctx.fillRect(0, 0, w, h);
  }

  drawLabels(ctx, proj, params.activeCorridor, params.viewportMode);

  const vignette = ctx.createRadialGradient(
    w * 0.48,
    h * 0.44,
    Math.min(w, h) * 0.16,
    w * 0.5,
    h * 0.5,
    Math.max(w, h) * 0.78
  );
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(1, "rgba(0,0,0,0.46)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, w, h);
}
