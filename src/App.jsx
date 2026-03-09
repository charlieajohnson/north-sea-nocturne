import { useState, useEffect, useRef, useMemo } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";

// ─── Coastline polygons ─────────────────────────────────────────────────────
const UK_MAINLAND = [
  [-5.7,50],[-5,50],[-4.2,50.3],[-3.6,50.2],[-3.4,50.6],[-3,50.7],
  [-2,50.7],[-1.2,50.7],[-1,50.8],[0,50.8],[0.4,50.9],[0.8,51.1],
  [1,51.2],[1.4,51.4],[1.6,51.6],[1.7,51.8],[1.7,52.1],[1.8,52.5],
  [1.7,52.8],[1.5,52.9],[0.5,53],[0.3,53.3],[0.2,53.5],[0.1,53.6],
  [0,53.7],[-0.1,53.7],[-0.2,54],[-0.2,54.1],[-0.3,54.4],[-0.6,54.5],
  [-0.8,54.6],[-1,54.7],[-1.2,54.9],[-1.5,55],[-1.6,55.3],[-1.7,55.6],
  [-1.8,55.8],[-2,55.9],[-2.2,56.1],[-2.5,56.3],[-2.7,56.5],[-2.5,56.6],
  [-2.2,56.6],[-2,56.7],[-2,56.9],[-2,57.1],[-2.1,57.3],[-2,57.5],
  [-1.8,57.7],[-2,57.8],[-2.5,58],[-3,58.3],[-3.2,58.5],[-3.5,58.6],
  [-4,58.6],[-4.3,58.5],[-5,58.6],[-5.3,58.2],[-5,57.9],[-5.5,57.6],
  [-5.7,57.6],[-5.5,57.3],[-5.1,57.2],[-5.6,56.8],[-5.8,56.5],[-5.4,56.3],
  [-5.2,56.2],[-5.5,55.9],[-5.5,55.7],[-5.2,55.5],[-5,55.4],[-4.8,55.3],
  [-4.9,55.2],[-5.1,55],[-5,54.8],[-4.8,54.7],[-4.5,54.5],[-4.1,54.5],
  [-3.6,54.5],[-3.4,54.4],[-3.2,54.3],[-3.1,54.1],[-3,54],[-2.9,53.7],
  [-3,53.5],[-3.1,53.3],[-3.2,53.2],[-3.3,53.1],[-3.1,52.9],[-3.1,52.6],
  [-3.3,52.4],[-3.4,52.2],[-3.6,52],[-4,51.9],[-4.2,51.7],[-4.5,51.7],
  [-4.7,51.6],[-4.9,51.6],[-5.1,51.5],[-5.2,51.4],[-5.3,51.2],[-5.2,51],
  [-4.9,51],[-4.6,51.2],[-4.2,51.2],[-3.8,51.2],[-3.5,51],[-3.8,50.8],
  [-4.2,50.6],[-4.5,50.5],[-4.8,50.3],[-5.1,50.2],[-5.7,50],
];

const IRELAND = [
  [-6,52.2],[-6,52.5],[-6.2,52.8],[-6.4,53],[-6.2,53.2],[-6,53.4],
  [-6.1,53.5],[-6.3,53.7],[-6.2,53.9],[-6,54],[-5.9,54.2],[-6.1,54.4],
  [-6.5,54.5],[-7,54.4],[-7.3,54.3],[-7.5,54.2],[-7.7,54.3],[-8,54.5],
  [-8.2,54.5],[-8.5,54.3],[-8.8,54.3],[-9,54.2],[-9.5,54.2],[-9.8,54],
  [-10,53.8],[-10,53.5],[-9.8,53.3],[-9.6,53],[-10,52.8],[-10.2,52.5],
  [-10,52.2],[-9.8,52],[-9.5,51.8],[-9.5,51.6],[-9.8,51.5],[-9.6,51.4],
  [-8.5,51.5],[-7.8,51.5],[-7,52],[-6.5,52],[-6,52.2],
];

const NETH = [
  [3.4,51.4],[3.8,51.5],[4,51.8],[4.2,52],[4.4,52.2],[4.6,52.5],
  [4.8,52.7],[5,53],[5.2,53.2],[5.5,53.4],[6,53.5],[6.5,53.5],
  [7,53.4],[7,53.2],[6.8,53],[6.5,52.8],[6.2,52.5],[5.8,52],
  [5.5,51.8],[5,51.5],[4.5,51.3],[4,51.3],[3.4,51.4],
];

const BELFR = [
  [1.5,51],[2,51],[2.5,51.1],[3,51.2],[3.4,51.4],[3.4,51.3],
  [2.8,50.9],[2,50.8],[1.5,50.8],[1,50.8],[0.5,50.5],[0,50.2],
  [-0.5,49.8],[-1,49.7],[-1.5,49.5],[-1.5,49.3],[-1,49.2],
  [-0.5,49.5],[0,49.8],[0.5,50],[1,50.5],[1.5,51],
];

const DENMARK = [
  [8.5,54.8],[8.8,55],[8.5,55.5],[8.2,55.8],[8,56],[8.2,56.5],
  [8.5,56.8],[9,57],[9.5,57.2],[10,57.5],[10.5,57.7],[10.5,57.5],
  [10.2,57.2],[10,56.8],[9.8,56.5],[9.5,56],[9.8,55.5],[9.5,55],
  [9.2,54.8],[8.5,54.8],
];

const NORWAY = [
  [5,58.5],[5.5,58.8],[6,59],[6.5,59.5],[7,59.8],[7,60],
  [5.5,60.5],[5,60.5],[4.5,60.2],[4.8,59.8],[5,59.5],[4.8,59],[5,58.5],
];

const ALL_LANDS = [UK_MAINLAND, IRELAND, NETH, BELFR, DENMARK, NORWAY];

// ─── Projection ─────────────────────────────────────────────────────────────
const BOUNDS = { west: -6.5, south: 49.5, east: 7.5, north: 60.5 };

function mkProj(w, h) {
  const cLat = (BOUNDS.south + BOUNDS.north) / 2;
  const cos = Math.cos(cLat * Math.PI / 180);
  const gW = (BOUNDS.east - BOUNDS.west) * cos;
  const gH = BOUNDS.north - BOUNDS.south;
  const ga = gW / gH;
  const ca = w / h;
  let s, ox, oy;
  if (ca > ga) { s = h / gH; ox = (w - gW * s) / 2; oy = 0; }
  else { s = w / gW; ox = 0; oy = (h - gH * s) / 2; }
  return {
    s, ox, oy, cos,
    tp(lon, lat) {
      return { x: (lon - BOUNDS.west) * cos * s + ox, y: (BOUNDS.north - lat) * s + oy };
    }
  };
}

// ─── Cities ─────────────────────────────────────────────────────────────────
const CITIES = [
  { n: "LONDON", lon: -0.12, lat: 51.51, s: "l" },
  { n: "BIRMINGHAM", lon: -1.9, lat: 52.48, s: "l" },
  { n: "MANCHESTER", lon: -2.24, lat: 53.48, s: "m" },
  { n: "LIVERPOOL", lon: -2.98, lat: 53.41, s: "m" },
  { n: "HULL", lon: -0.34, lat: 53.74, s: "m" },
  { n: "NEWCASTLE", lon: -1.61, lat: 54.97, s: "m" },
  { n: "EDINBURGH", lon: -3.19, lat: 55.95, s: "m" },
  { n: "DUNDEE", lon: -2.97, lat: 56.46, s: "s" },
  { n: "ABERDEEN", lon: -2.09, lat: 57.15, s: "m" },
  { n: "SOUTHAMPTON", lon: -1.4, lat: 50.9, s: "s" },
  { n: "LEEDS", lon: -1.55, lat: 53.8, s: "s" },
  { n: "MIDDLESBROUGH", lon: -1.23, lat: 54.57, s: "s" },
  { n: "GLASGOW", lon: -4.25, lat: 55.86, s: "m" },
  { n: "BRISTOL", lon: -2.59, lat: 51.45, s: "s" },
  { n: "NORWICH", lon: 1.3, lat: 52.63, s: "s" },
  { n: "AMSTERDAM", lon: 4.9, lat: 52.37, s: "m" },
  { n: "ROTTERDAM", lon: 4.47, lat: 51.92, s: "s" },
];

// ─── Light features ─────────────────────────────────────────────────────────
function mkFeatures() {
  const f = [];
  // Tier 1
  const t1 = [[-0.12,51.51,0.40,1.0],[4.9,52.37,0.25,0.7],[-1.9,52.48,0.28,0.75]];
  for (const [lo,la,r,i] of t1) f.push({ lo, la, r, i, t: "t1", c: [255,205,130] });
  // Tier 2
  const t2 = [
    [-2.24,53.48,0.18,0.55],[-2.98,53.41,0.14,0.42],[-1.55,53.8,0.16,0.48],
    [-0.34,53.74,0.11,0.35],[-1.61,54.97,0.16,0.48],[-1.23,54.57,0.10,0.32],
    [-3.19,55.95,0.15,0.45],[-4.25,55.86,0.16,0.48],[-2.97,56.46,0.09,0.28],
    [-2.09,57.15,0.12,0.38],[-1.4,50.9,0.10,0.32],[-2.59,51.45,0.13,0.4],
    [-1.15,52.95,0.12,0.36],[-1.13,52.63,0.10,0.3],[-1.08,53.52,0.10,0.28],
    [-1.47,53.38,0.11,0.32],[-3.18,51.48,0.10,0.3],[1.29,52.63,0.07,0.2],
    [-0.75,52.04,0.06,0.16],[-0.88,51.9,0.07,0.2],[0.72,51.53,0.08,0.22],
    [4.47,51.92,0.14,0.38],[4.3,52.08,0.09,0.22],[5.47,51.44,0.10,0.28],
    [4.35,50.85,0.11,0.32],[-1.89,53.96,0.06,0.15],[-1.54,52.41,0.07,0.18],
    [-0.4,51.9,0.06,0.14],[0.9,51.87,0.05,0.12],[1.15,51.8,0.04,0.10],
  ];
  for (const [lo,la,r,i] of t2) f.push({ lo, la, r, i, t: "t2", c: [240,190,110] });
  // Corridors
  const co = [[-0.5,51.8,0.12,0.04],[-0.7,52.2,0.10,0.035],[-1,52.5,0.08,0.03],[-1.8,53.6,0.14,0.045],[-1.4,53.1,0.08,0.03],[-2.5,53.45,0.08,0.03]];
  for (const [lo,la,r,i] of co) f.push({ lo, la, r, i, t: "co", c: [180,150,80] });
  // Coastal ports
  const cp = [[1.73,52.62,0.05,0.25],[1.3,51.95,0.04,0.2],[0.07,51.45,0.08,0.3],[-0.78,54.62,0.05,0.22],[0.08,53.57,0.06,0.25],[-0.07,53.58,0.05,0.2],[1.6,52.47,0.03,0.15],[3.6,51.95,0.05,0.18]];
  for (const [lo,la,r,i] of cp) f.push({ lo, la, r, i, t: "cp", c: [190,215,255] });
  // Platforms
  const pl = [[1.8,53.5,0.02,0.65],[2.2,54,0.018,0.55],[2.8,54.5,0.015,0.45],[1.5,55,0.02,0.5],[2,55.5,0.022,0.6],[1.2,56.5,0.015,0.4],[0.8,57,0.02,0.45],[1.5,57.5,0.015,0.35],[2.5,56,0.015,0.45],[3,55.5,0.02,0.5],[3.5,54.2,0.015,0.38],[0.5,54.8,0.015,0.3],[1,55.8,0.013,0.33],[2.8,56.3,0.015,0.38],[0.3,56.2,0.015,0.32]];
  for (const [lo,la,r,i] of pl) f.push({ lo, la, r, i, t: "pl", c: [255,140,40] });
  // Shipping
  for (let j = 0; j < 20; j++) {
    const t = j / 20;
    f.push({ lo: 0.2 + t * 3.2 + (Math.random() - 0.5) * 0.3, la: 51.8 + t * 5 + (Math.random() - 0.5) * 0.25, r: 0.012 + Math.random() * 0.008, i: 0.05 + Math.random() * 0.06, t: "sh", c: [110,155,240] });
  }
  return f;
}

// ─── Canvas rendering ───────────────────────────────────────────────────────
function drawPoly(ctx, proj, pts) {
  ctx.beginPath();
  for (let i = 0; i < pts.length; i++) {
    const p = proj.tp(pts[i][0], pts[i][1]);
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  }
  ctx.closePath();
}

function renderScene(ctx, w, h, time, feats, params) {
  ctx.fillStyle = "#040810";
  ctx.fillRect(0, 0, w, h);

  const og = ctx.createRadialGradient(w * 0.52, h * 0.38, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.82);
  og.addColorStop(0, "rgba(8,12,24,0.4)");
  og.addColorStop(1, "rgba(3,5,12,0)");
  ctx.fillStyle = og;
  ctx.fillRect(0, 0, w, h);

  const proj = mkProj(w, h);

  // Stars
  if (!ctx._s5) {
    ctx._s5 = [];
    for (let i = 0; i < 180; i++) {
      ctx._s5.push({ x: Math.random(), y: Math.random() * 0.3, r: 0.2 + Math.random() * 0.6, a: 0.04 + Math.random() * 0.12, ph: Math.random() * 6.28 });
    }
  }
  for (const s of ctx._s5) {
    const alpha = s.a * (0.4 + 0.6 * Math.sin(time * 0.0003 + s.ph));
    ctx.fillStyle = "rgba(180,200,255," + alpha + ")";
    ctx.beginPath();
    ctx.arc(s.x * w, s.y * h, s.r, 0, 6.28);
    ctx.fill();
  }

  // Land
  for (const poly of ALL_LANDS) {
    drawPoly(ctx, proj, poly);
    ctx.fillStyle = "rgba(8,11,18,1)";
    ctx.fill();
  }

  // Coastline glow pass 1 — wide atmospheric
  ctx.save();
  ctx.shadowColor = "rgba(35,80,180,0.2)";
  ctx.shadowBlur = 24;
  for (const poly of ALL_LANDS) {
    drawPoly(ctx, proj, poly);
    ctx.strokeStyle = "rgba(35,80,180,0.08)";
    ctx.lineWidth = 3;
    ctx.stroke();
  }
  ctx.restore();

  // Coastline pass 2 — UK rim
  ctx.save();
  ctx.shadowColor = "rgba(50,110,220,0.35)";
  ctx.shadowBlur = 10;
  drawPoly(ctx, proj, UK_MAINLAND);
  ctx.strokeStyle = "rgba(50,110,220,0.18)";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.restore();

  // Coastline pass 3 — thin edge
  drawPoly(ctx, proj, UK_MAINLAND);
  ctx.strokeStyle = "rgba(70,140,240,0.12)";
  ctx.lineWidth = 0.8;
  ctx.stroke();

  // Continental coasts
  for (const poly of [NETH, BELFR]) {
    drawPoly(ctx, proj, poly);
    ctx.strokeStyle = "rgba(50,100,200,0.08)";
    ctx.lineWidth = 0.6;
    ctx.stroke();
  }

  // Light features
  const gG = params.glow / 100;
  const pe = params.persistence / 100;

  for (const f of feats) {
    const pos = proj.tp(f.lo, f.la);
    const x = pos.x;
    const y = pos.y;
    const pxR = f.r * proj.s;
    const maxR = pxR * 8;
    if (x < -maxR || x > w + maxR || y < -maxR || y > h + maxR) continue;

    let fl = 1;
    if (f.t === "pl") {
      fl = (0.45 + 0.55 * Math.sin(time * 0.005 + f.lo * 13 + f.la * 9)) * (0.7 + 0.3 * Math.sin(time * 0.023 + f.lo * 5));
    } else if (f.t === "sh") {
      fl = 0.3 + 0.7 * Math.sin(time * 0.0013 + f.lo * 3);
    } else if (f.t === "t1" || f.t === "t2") {
      fl = 0.94 + 0.06 * Math.sin(time * 0.0005 + f.la * 0.7);
    }

    if (params.clouds && f.t !== "co") {
      fl *= 0.82 + 0.18 * Math.sin((f.lo + time * 8e-6) * 3.2) * Math.cos((f.la + time * 6e-6) * 2.5);
    }

    const rawI = f.i * fl * (0.5 + gG * 0.65);
    const intensity = Math.pow(rawI, 0.7);
    const cr = f.c[0], cg = f.c[1], cb = f.c[2];

    if (f.t === "t1") {
      const coreR = pxR * 0.35;
      const haloR = pxR * (1.8 + pe * 2.2);
      const hg = ctx.createRadialGradient(x, y, coreR * 0.5, x, y, haloR);
      hg.addColorStop(0, "rgba(" + cr + "," + cg + "," + cb + "," + (intensity * 0.4) + ")");
      hg.addColorStop(0.2, "rgba(" + cr + "," + cg + "," + cb + "," + (intensity * 0.12) + ")");
      hg.addColorStop(0.5, "rgba(" + cr + "," + cg + "," + cb + "," + (intensity * 0.03) + ")");
      hg.addColorStop(1, "rgba(" + cr + "," + cg + "," + cb + ",0)");
      ctx.fillStyle = hg;
      ctx.beginPath(); ctx.arc(x, y, haloR, 0, 6.28); ctx.fill();
      const cg2 = ctx.createRadialGradient(x, y, 0, x, y, coreR);
      cg2.addColorStop(0, "rgba(255,255,248," + Math.min(intensity * 0.85, 0.9) + ")");
      cg2.addColorStop(0.4, "rgba(" + cr + "," + cg + "," + cb + "," + (intensity * 0.5) + ")");
      cg2.addColorStop(1, "rgba(" + cr + "," + cg + "," + cb + ",0)");
      ctx.fillStyle = cg2;
      ctx.beginPath(); ctx.arc(x, y, coreR, 0, 6.28); ctx.fill();
    } else if (f.t === "t2" || f.t === "cp") {
      const coreR = pxR * 0.25;
      const haloR = pxR * (1.5 + pe * 1.8);
      const hg = ctx.createRadialGradient(x, y, coreR * 0.3, x, y, haloR);
      hg.addColorStop(0, "rgba(" + cr + "," + cg + "," + cb + "," + (intensity * 0.45) + ")");
      hg.addColorStop(0.15, "rgba(" + cr + "," + cg + "," + cb + "," + (intensity * 0.15) + ")");
      hg.addColorStop(0.4, "rgba(" + cr + "," + cg + "," + cb + "," + (intensity * 0.04) + ")");
      hg.addColorStop(1, "rgba(" + cr + "," + cg + "," + cb + ",0)");
      ctx.fillStyle = hg;
      ctx.beginPath(); ctx.arc(x, y, haloR, 0, 6.28); ctx.fill();
      if (f.i > 0.2) {
        const cg2 = ctx.createRadialGradient(x, y, 0, x, y, coreR);
        cg2.addColorStop(0, "rgba(255,255,242," + (intensity * 0.55) + ")");
        cg2.addColorStop(0.5, "rgba(" + cr + "," + cg + "," + cb + "," + (intensity * 0.18) + ")");
        cg2.addColorStop(1, "rgba(" + cr + "," + cg + "," + cb + ",0)");
        ctx.fillStyle = cg2;
        ctx.beginPath(); ctx.arc(x, y, coreR, 0, 6.28); ctx.fill();
      }
    } else if (f.t === "co") {
      const haloR = pxR * (2 + pe * 1.5);
      const hg = ctx.createRadialGradient(x, y, 0, x, y, haloR);
      hg.addColorStop(0, "rgba(" + cr + "," + cg + "," + cb + "," + (intensity * 0.15) + ")");
      hg.addColorStop(0.4, "rgba(" + cr + "," + cg + "," + cb + "," + (intensity * 0.04) + ")");
      hg.addColorStop(1, "rgba(" + cr + "," + cg + "," + cb + ",0)");
      ctx.fillStyle = hg;
      ctx.beginPath(); ctx.arc(x, y, haloR, 0, 6.28); ctx.fill();
    } else if (f.t === "pl") {
      const flareR = pxR * 0.5;
      const haloR = pxR * (1.2 + pe * 1);
      const hg = ctx.createRadialGradient(x, y, 0, x, y, haloR);
      hg.addColorStop(0, "rgba(" + cr + "," + cg + "," + cb + "," + (intensity * 0.5) + ")");
      hg.addColorStop(0.3, "rgba(" + cr + "," + cg + "," + cb + "," + (intensity * 0.1) + ")");
      hg.addColorStop(1, "rgba(" + cr + "," + cg + "," + cb + ",0)");
      ctx.fillStyle = hg;
      ctx.beginPath(); ctx.arc(x, y, haloR, 0, 6.28); ctx.fill();
      if (fl > 0.5) {
        ctx.fillStyle = "rgba(255,210,120," + (intensity * fl * 0.6) + ")";
        ctx.beginPath(); ctx.arc(x, y, Math.max(flareR * 0.3, 1), 0, 6.28); ctx.fill();
      }
    } else if (f.t === "sh") {
      const haloR = pxR * (1 + pe * 0.8);
      ctx.fillStyle = "rgba(" + cr + "," + cg + "," + cb + "," + (intensity * 0.35) + ")";
      ctx.beginPath(); ctx.arc(x, y, haloR, 0, 6.28); ctx.fill();
      ctx.fillStyle = "rgba(" + cr + "," + cg + "," + cb + "," + (intensity * 0.15) + ")";
      ctx.beginPath(); ctx.arc(x, y, haloR * 2.5, 0, 6.28); ctx.fill();
    }
  }

  // Haze
  if (params.haze) {
    ctx.save();
    ctx.globalAlpha = 0.06;
    const hg = ctx.createLinearGradient(0, h * 0.4, 0, h);
    hg.addColorStop(0, "transparent");
    hg.addColorStop(1, "rgba(18,35,65,1)");
    ctx.fillStyle = hg;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  }

  // Moonlight
  if (params.moonlight) {
    const mg = ctx.createRadialGradient(w * 0.78, h * 0.05, 0, w * 0.68, h * 0.12, Math.max(w, h) * 0.42);
    mg.addColorStop(0, "rgba(50,70,110,0.055)");
    mg.addColorStop(0.4, "rgba(28,42,72,0.02)");
    mg.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = mg;
    ctx.fillRect(0, 0, w, h);
  }

  // Bloom
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.filter = "blur(" + (2 + gG * 5) + "px)";
  ctx.globalAlpha = 0.14 + gG * 0.1;
  ctx.drawImage(ctx.canvas, 0, 0);
  ctx.restore();

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.filter = "blur(" + (10 + gG * 12) + "px)";
  ctx.globalAlpha = 0.04 + gG * 0.03;
  ctx.drawImage(ctx.canvas, 0, 0);
  ctx.restore();

  // Vignette
  const vig = ctx.createRadialGradient(w * 0.46, h * 0.44, Math.min(w, h) * 0.12, w * 0.5, h * 0.5, Math.max(w, h) * 0.74);
  vig.addColorStop(0, "rgba(0,0,0,0)");
  vig.addColorStop(1, "rgba(0,0,0,0.42)");
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, w, h);

  // Labels
  ctx.save();
  for (const c of CITIES) {
    const pos = proj.tp(c.lon, c.lat);
    if (pos.x < 5 || pos.x > w - 5 || pos.y < 5 || pos.y > h - 5) continue;
    const fs = c.s === "l" ? 12.5 : c.s === "m" ? 10 : 8;
    ctx.font = (c.s === "l" ? "600 " : "500 ") + fs + 'px "Inter","SF Pro Display",system-ui,sans-serif';
    ctx.fillStyle = c.s === "l" ? "rgba(210,218,232,0.72)" : c.s === "m" ? "rgba(180,192,212,0.42)" : "rgba(160,172,195,0.28)";
    ctx.textAlign = "left";
    ctx.fillText(c.n, pos.x + 7, pos.y - 5);
  }
  const nsp = proj.tp(2.5, 55.5);
  if (nsp.x > 0 && nsp.x < w) {
    ctx.font = '300 14px "Inter",system-ui,sans-serif';
    ctx.fillStyle = "rgba(75,100,145,0.14)";
    ctx.textAlign = "center";
    ctx.fillText("N O R T H   S E A", nsp.x, nsp.y);
  }
  const abh = proj.tp(0.5, 55.8);
  if (abh.x > 0 && abh.x < w) {
    ctx.font = '400 9px "Inter",system-ui,sans-serif';
    ctx.fillStyle = "rgba(68,136,255,0.18)";
    ctx.textAlign = "center";
    ctx.fillText("Aberdeen \u2192 Humber corridor", abh.x, abh.y);
  }
  ctx.restore();
}

// ─── Glass system ───────────────────────────────────────────────────────────
const GLASS_BASE = {
  background: "rgba(10,14,24,0.52)",
  backdropFilter: "blur(32px) saturate(1.2)",
  WebkitBackdropFilter: "blur(32px) saturate(1.2)",
  border: "1px solid rgba(255,255,255,0.05)",
  borderRadius: 14,
  boxShadow: "0 6px 28px rgba(0,0,0,0.35), inset 0 0.5px 0 rgba(255,255,255,0.035)",
};

const GLASS_ACTIVE = {
  ...GLASS_BASE,
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 6px 28px rgba(0,0,0,0.35), inset 0 0.5px 0 rgba(255,255,255,0.05)",
};

function GlassPanel({ children, style, active }) {
  return (
    <div style={{ ...(active ? GLASS_ACTIVE : GLASS_BASE), padding: "14px 16px", ...style }}>
      {children}
    </div>
  );
}

function PanelLabel({ children }) {
  return (
    <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.15em", color: "rgba(150,168,198,0.4)", textTransform: "uppercase", marginBottom: 8 }}>
      {children}
    </div>
  );
}

function ToggleSwitch({ value, onChange, color }) {
  const c = color || "#4488ff";
  return (
    <div onClick={() => onChange(!value)} style={{ width: 36, height: 19, borderRadius: 10, background: value ? c : "rgba(255,255,255,0.06)", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
      <div style={{ width: 13, height: 13, borderRadius: "50%", background: value ? "#fff" : "rgba(255,255,255,0.22)", position: "absolute", top: 3, left: value ? 20 : 3, transition: "all 0.2s", boxShadow: value ? "0 0 5px " + c : "none" }} />
    </div>
  );
}

function SceneSlider({ label, value, onChange, color }) {
  const c = color || "#4488ff";
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
      <span style={{ fontSize: 11.5, color: "rgba(200,210,225,0.72)", minWidth: 72 }}>{label}</span>
      <div style={{ flex: 1, margin: "0 8px" }}>
        <input type="range" min={0} max={100} value={value} onChange={(e) => onChange(Number(e.target.value))} style={{ width: "100%", accentColor: c, height: 2, opacity: 0.65 }} />
      </div>
      <span style={{ fontSize: 10.5, color: "rgba(150,168,198,0.5)", minWidth: 28, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{value}%</span>
    </div>
  );
}

function AnomalyPicker({ value, onChange }) {
  const options = ["None", "Dimming", "Surge"];
  return (
    <div style={{ display: "flex", gap: 3, marginBottom: 8 }}>
      {options.map((opt) => {
        const active = value === opt.toLowerCase();
        const activeColor = opt === "Surge" ? "#ff8844" : opt === "Dimming" ? "#5599ff" : "rgba(200,210,225,0.8)";
        return (
          <button
            key={opt}
            onClick={() => onChange(opt.toLowerCase())}
            style={{
              flex: 1, padding: "4px 0", fontSize: 10.5,
              fontWeight: active ? 600 : 400, fontFamily: "inherit",
              background: active ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.015)",
              border: "1px solid " + (active ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.03)"),
              borderRadius: 6,
              color: active ? activeColor : "rgba(150,168,198,0.3)",
              cursor: "pointer", transition: "all 0.15s",
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function ShippingSparkline() {
  const pts = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 24; i++) arr.push(18 + Math.sin(i * 0.4) * 11 + Math.random() * 7);
    return arr;
  }, []);
  const svgW = 140, svgH = 28;
  const path = pts.map((v, i) => (i === 0 ? "M" : "L") + ((i / 23) * svgW) + "," + (svgH - (v / 45) * svgH)).join(" ");
  return (
    <svg width={svgW} height={svgH} style={{ opacity: 0.5 }}>
      <defs>
        <linearGradient id="sparkGrad5" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4488ff" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#4488ff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={path + " L" + svgW + "," + svgH + " L0," + svgH + " Z"} fill="url(#sparkGrad5)" />
      <path d={path} fill="none" stroke="#4488ff" strokeWidth="1.2" strokeDasharray="3,2" />
      <circle cx={svgW} cy={svgH - (pts[23] / 45) * svgH} r="2" fill="#4488ff" />
    </svg>
  );
}

function MoonIcon({ size }) {
  const s = size || 24;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="none" stroke="rgba(180,200,230,0.2)" strokeWidth="1" />
      <path d="M12 2A10 10 0 0 1 12 22A6 6 0 0 0 12 2" fill="rgba(180,200,230,0.12)" />
    </svg>
  );
}

// ─── Collapsible section ────────────────────────────────────────────────────
function Section({ title, children, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen !== false);
  return (
    <div>
      <div onClick={() => setOpen(!open)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", marginBottom: open ? 8 : 0 }}>
        <PanelLabel>{title}</PanelLabel>
        <span style={{ fontSize: 9, color: "rgba(150,168,198,0.3)", transform: open ? "rotate(0deg)" : "rotate(-90deg)", transition: "transform 0.2s" }}>▾</span>
      </div>
      {open && children}
    </div>
  );
}

// ─── Data ───────────────────────────────────────────────────────────────────
const DATES = [
  { d: "14 Jun 2024", t: "23:47" },
  { d: "13 Jun 2024", t: "23:31" },
  { d: "12 Jun 2024", t: "00:05" },
  { d: "11 Jun 2024", t: "23:52" },
  { d: "10 Jun 2024", t: "23:40" },
];

const REGIONS = [
  { n: "Aberdeen \u2192 Humber", a: true },
  { n: "Thames Estuary", a: false },
  { n: "Teesside / Tyne", a: false },
  { n: "Firth of Forth", a: false },
];

const TICK_DATA = [];
for (let i = 0; i < 60; i++) TICK_DATA.push({ h: 1 + Math.random() * 14, b: Math.random() > 0.8 });

const MINI_TICKS = [];
for (let i = 0; i < 28; i++) MINI_TICKS.push({ h: 3 + Math.random() * 8, hl: i === 18 });

// ─── Main component ────────────────────────────────────────────────────────
export default function NorthSeaNocturne() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const timeRef = useRef(0);
  const featuresRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [glow, setGlow] = useState(82);
  const [persistence, setPersistence] = useState(64);
  const [haze, setHaze] = useState(false);
  const [clouds, setClouds] = useState(true);
  const [moonlight, setMoonlight] = useState(true);
  const [anomaly, setAnomaly] = useState("surge");
  const [activeNav, setActiveNav] = useState("Overview");
  const [selectedDate, setSelectedDate] = useState(0);
  const [scrubPos, setScrubPos] = useState(75);

  if (!featuresRef.current) featuresRef.current = mkFeatures();

  const sceneParams = useMemo(() => ({
    glow, persistence, haze, clouds, moonlight, anomaly,
  }), [glow, persistence, haze, clouds, moonlight, anomaly]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    let running = true;
    let lastW = 0, lastH = 0, lastDpr = 0;

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
        lastDpr = dpr; lastW = dw; lastH = dh;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      renderScene(ctx, dw, dh, timeRef.current, featuresRef.current, sceneParams);
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => { running = false; cancelAnimationFrame(animRef.current); };
  }, [isPlaying, sceneParams]);

  const navItems = ["Overview", "Timeline", "Events", "Weather", "Traffic", "Memory"];

  return (
    <div style={{ width: "100%", height: "100vh", background: "#040810", fontFamily: '"Inter","SF Pro Display",-apple-system,system-ui,sans-serif', color: "rgba(200,210,225,0.85)", position: "relative", overflow: "hidden" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }} />

      {/* Top Nav */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <MoonIcon size={28} />
          <div>
            <div style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: "0.12em", color: "rgba(215,222,235,0.82)" }}>NORTH SEA · UK</div>
            <div style={{ fontSize: 8.5, color: "rgba(135,150,178,0.4)", letterSpacing: "0.08em" }}>NIGHT LIGHTS</div>
          </div>
        </div>
        <div style={{ ...GLASS_BASE, padding: "4px 5px", display: "flex", gap: 1, borderRadius: 10 }}>
          {navItems.map((item) => (
            <button key={item} onClick={() => setActiveNav(item)} style={{ padding: "4px 13px", fontSize: 11, fontFamily: "inherit", fontWeight: activeNav === item ? 500 : 400, background: activeNav === item ? "rgba(255,255,255,0.06)" : "transparent", border: "none", borderRadius: 6, color: activeNav === item ? "rgba(215,222,235,0.82)" : "rgba(150,168,198,0.35)", cursor: "pointer", transition: "all 0.15s" }}>
              {item}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["\u2315", "\u2295", "\u2261"].map((icon, idx) => (
            <div key={idx} style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "rgba(175,190,215,0.4)", cursor: "pointer" }}>
              {icon}
            </div>
          ))}
        </div>
      </div>

      {/* Left Sidebar - single collapsed card */}
      <div style={{ position: "absolute", top: 58, left: 14, bottom: 74, width: 240, zIndex: 10, overflowY: "auto" }}>
        <GlassPanel active>
          <Section title="Time" defaultOpen={true}>
            <div style={{ fontSize: 22, fontWeight: 300, color: "rgba(228,233,244,0.9)", lineHeight: 1.15 }}>
              {DATES[selectedDate].d}
              <span style={{ fontSize: 18, marginLeft: 8, color: "rgba(195,205,222,0.5)" }}>{DATES[selectedDate].t}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 5, fontSize: 10, color: "rgba(150,168,198,0.4)" }}>
              <MoonIcon size={12} />
              <span>Waxing Gibbous</span>
              <span style={{ marginLeft: "auto" }}>72%</span>
            </div>
          </Section>

          <div style={{ height: 1, background: "rgba(255,255,255,0.03)", margin: "10px 0" }} />

          <Section title="Recent" defaultOpen={true}>
            {DATES.map((d, i) => (
              <div key={i} onClick={() => setSelectedDate(i)} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", fontSize: 11, color: i === selectedDate ? "rgba(215,222,235,0.82)" : "rgba(150,168,198,0.35)", cursor: "pointer", borderBottom: i < DATES.length - 1 ? "1px solid rgba(255,255,255,0.02)" : "none" }}>
                <span>{d.d}</span>
                <span style={{ fontVariantNumeric: "tabular-nums" }}>{d.t}</span>
              </div>
            ))}
          </Section>

          <div style={{ height: 1, background: "rgba(255,255,255,0.03)", margin: "10px 0" }} />

          <Section title="Weather" defaultOpen={false}>
            <div style={{ fontSize: 10, color: "rgba(150,168,198,0.4)" }}>North Sea</div>
            <div style={{ fontSize: 30, fontWeight: 200, color: "rgba(228,233,244,0.86)", lineHeight: 1.1, marginTop: 2 }}>
              11.2<span style={{ fontSize: 14, verticalAlign: "super" }}>°C</span>
            </div>
            <div style={{ fontSize: 10, color: "rgba(150,168,198,0.4)", marginTop: 2 }}>
              NW Wind <span style={{ color: "rgba(195,205,222,0.6)", fontWeight: 500 }}>24</span> km/h
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 9, color: "rgba(135,150,178,0.3)" }}>
              <div>
                <div>Pressure ↓</div>
                <div style={{ color: "rgba(195,205,222,0.6)", fontSize: 12, marginTop: 1 }}>1002 hPa</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div>Humidity</div>
                <div style={{ color: "rgba(195,205,222,0.6)", fontSize: 12, marginTop: 1 }}>77%</div>
              </div>
            </div>
          </Section>
        </GlassPanel>
      </div>

      {/* Right Sidebar */}
      <div style={{ position: "absolute", top: 58, right: 14, bottom: 74, width: 240, zIndex: 10, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
        <GlassPanel active>
          <PanelLabel>Scene</PanelLabel>
          <SceneSlider label="Glow" value={glow} onChange={setGlow} />
          <SceneSlider label="Persistence" value={persistence} onChange={setPersistence} />
          <div style={{ marginTop: 4 }}>
            <AnomalyPicker value={anomaly} onChange={setAnomaly} />
          </div>
        </GlassPanel>

        <GlassPanel>
          <Section title="Atmosphere" defaultOpen={false}>
            {[["Haze", haze, setHaze], ["Clouds", clouds, setClouds], ["Moonlight", moonlight, setMoonlight]].map(([label, val, setter]) => (
              <div key={String(label)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: "rgba(195,205,222,0.6)" }}>{String(label)}</span>
                <ToggleSwitch value={val} onChange={setter} />
              </div>
            ))}
            <div style={{ fontSize: 10, color: "rgba(150,168,198,0.4)", marginTop: 4, marginBottom: 2 }}>Intensity</div>
            <div style={{ height: 4, borderRadius: 2, background: "linear-gradient(90deg,#2244aa,#4488ff,#44cc88,#ffcc44,#ff6622,#ff2244)" }} />
          </Section>
        </GlassPanel>

        <GlassPanel>
          <Section title="Shipping Activity" defaultOpen={false}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
              <div>
                <span style={{ fontSize: 18, fontWeight: 300, color: "rgba(228,233,244,0.86)" }}>123</span>
                <span style={{ fontSize: 10, color: "rgba(150,168,198,0.35)", marginLeft: 4 }}>vessels</span>
              </div>
              <span style={{ fontSize: 8, color: "rgba(100,175,255,0.45)", fontWeight: 600, letterSpacing: "0.1em" }}>HIGH</span>
            </div>
            <ShippingSparkline />
          </Section>
        </GlassPanel>

        <GlassPanel>
          <Section title="Regions" defaultOpen={false}>
            {REGIONS.map((r, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: i < REGIONS.length - 1 ? "1px solid rgba(255,255,255,0.02)" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", border: "1.5px solid " + (r.a ? "#4488ff" : "rgba(255,255,255,0.1)"), background: r.a ? "#4488ff" : "transparent" }} />
                  <span style={{ fontSize: 11, color: r.a ? "rgba(215,222,235,0.82)" : "rgba(150,168,198,0.35)" }}>{r.n}</span>
                </div>
                <ToggleSwitch value={r.a} onChange={() => {}} />
              </div>
            ))}
          </Section>
        </GlassPanel>
      </div>

      {/* Bottom Timeline */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10, display: "flex", justifyContent: "center", padding: "12px 18px" }}>
        <div style={{ ...GLASS_ACTIVE, padding: "12px 20px", display: "flex", alignItems: "center", gap: 14, maxWidth: 580, width: "100%" }}>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            style={{
              width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(215,222,235,0.8)", cursor: "pointer", fontSize: 13,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
            }}
          >
            {isPlaying ? "\u23F8" : "\u25B6"}
          </button>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ display: "flex", alignItems: "flex-end", height: 16, gap: 1.5 }}>
              {TICK_DATA.map((tick, i) => {
                const pos = (i / TICK_DATA.length) * 100;
                const near = Math.abs(pos - scrubPos) < 5;
                return (
                  <div key={i} style={{ width: 1.5, height: tick.h, background: tick.b ? "rgba(255,155,50,0.6)" : near ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)", borderRadius: 1 }} />
                );
              })}
            </div>
            <div
              style={{ position: "relative", height: 6, cursor: "pointer" }}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setScrubPos(Math.round(((e.clientX - rect.left) / rect.width) * 100));
              }}
            >
              <div style={{ position: "absolute", top: 2, left: 0, right: 0, height: 2, background: "rgba(255,255,255,0.06)", borderRadius: 1 }} />
              <div style={{ position: "absolute", top: 2, left: 0, width: scrubPos + "%", height: 2, background: "rgba(255,255,255,0.18)", borderRadius: 1 }} />
              <div style={{ position: "absolute", left: scrubPos + "%", top: -1, width: 14, height: 14, borderRadius: "50%", background: "#fff", transform: "translateX(-50%)", boxShadow: "0 0 8px rgba(255,255,255,0.25), 0 2px 6px rgba(0,0,0,0.4)" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 8, color: "rgba(150,168,198,0.25)", letterSpacing: "0.04em", marginTop: 1 }}>
              {["APR", "MAY", "JUN", "JUL"].map((m) => (
                <span key={m} style={{ color: m === "JUN" ? "rgba(195,205,222,0.55)" : undefined, fontWeight: m === "JUN" ? 500 : 400 }}>{m}</span>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: isPlaying ? "#44cc88" : "rgba(255,255,255,0.15)", boxShadow: isPlaying ? "0 0 6px rgba(68,204,136,0.5)" : "none", transition: "all 0.3s" }} />
            <span style={{ fontSize: 8.5, fontWeight: 600, color: isPlaying ? "rgba(68,204,136,0.6)" : "rgba(150,168,198,0.3)", letterSpacing: "0.1em", transition: "color 0.3s" }}>LIVE</span>
          </div>
        </div>
      </div>
      <SpeedInsights />
    </div>
  );
}
