"use client";

import React from "react";

interface IllustrationProps {
  className?: string;
  style?: React.CSSProperties;
}

type PR = { x:number; y:number; width:number; height:number; fill:string };
const mkVr = (P: number) =>
  (vx:number, vy:number, vw:number, vh:number, fill:string): PR =>
    ({ x:vx*P, y:vy*P, width:vw*P, height:vh*P, fill });

function Rects({ rs }: { rs: PR[] }) {
  return <>{rs.map((r,i) => <rect key={i} x={r.x} y={r.y} width={r.width} height={r.height} fill={r.fill}/>)}</>;
}

// SMIL translate bob helper — renders an <animateTransform> that bobs the parent element
// amplitude: SVG units up (negative y). Uses ease-in-out spline.
function Bob({ amp = 8, dur = "2.4s", delay = "0s" }: { amp?: number; dur?: string; delay?: string }) {
  const v = `0,0; 0,${-amp}; 0,0`;
  return (
    <animateTransform attributeName="transform" type="translate"
      values={v} keyTimes="0; 0.5; 1"
      calcMode="spline" keySplines="0.42,0,0.58,1; 0.42,0,0.58,1"
      dur={dur} begin={delay} repeatCount="indefinite" additive="sum"/>
  );
}

// Cycles through sprite frames using discrete opacity — pixel-art sprite animator
// `frames` — explicit frame numbers (skips missing frames, e.g. [1,2,4])
// `pad`    — zero-pad width for frame number in filename (default 2 → "01"; use 0 for no padding)
function FrameAnim({ base, count = 4, frames, w, h, fps = 8, pad = 2 }: {
  base: string; count?: number; frames?: number[]; w: number; h: number; fps?: number; pad?: number
}) {
  const f = frames ?? Array.from({ length: count }, (_, i) => i + 1);
  const n = f.length;
  const dur = `${(n / fps).toFixed(3)}s`;
  return (
    <>
      {f.map((frame, i) => {
        const vals = Array.from({ length: n }, (_, j) => j === i ? "1" : "0").concat(i === 0 ? "1" : "0").join(";");
        const kT  = Array.from({ length: n + 1 }, (_, j) => (j / n).toFixed(3)).join(";");
        return (
          <image key={i} href={`${base}${pad > 0 ? String(frame).padStart(pad, "0") : frame}.png`}
            x={0} y={0} width={w} height={h} opacity={i === 0 ? 1 : 0}
            style={{ imageRendering: "pixelated" }}>
            <animate attributeName="opacity" values={vals} keyTimes={kT} calcMode="discrete" dur={dur} repeatCount="indefinite"/>
          </image>
        );
      })}
    </>
  );
}

// ─── Chapter I: The Feast of Polydectes ───────────────────────────────────
function ChapterI({ className, style }: IllustrationProps) {
  return (
    <svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id="c1-vig" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="100%" stopColor="#020108" stopOpacity="0.93"/>
        </radialGradient>
      </defs>
      <image href="/illustrations/chapter1/bg.svg" x="0" y="0" width="700" height="260"/>
      {/* Perseus — holds ground, slight uneasy recoil */}
      <g transform="translate(50,25)">
        <animateTransform attributeName="transform" type="translate"
          values="0,0; -4,-3; 0,0" keyTimes="0; 0.5; 1"
          calcMode="spline" keySplines="0.42,0,0.58,1; 0.42,0,0.58,1"
          dur="3.0s" repeatCount="indefinite" additive="sum"/>
        <FrameAnim base="/Perseus/perseus_idle_" w={72} h={96} fps={6}/>
      </g>
      {/* Polydectes — strides forward toward Perseus demanding the quest */}
      <g transform="translate(650,25) scale(-1,1)">
        <animateTransform attributeName="transform" type="translate"
          values="0,0; 30,-5; 0,0" keyTimes="0; 0.45; 1"
          calcMode="spline" keySplines="0.3,0,0.5,1; 0.5,0,0.7,1"
          dur="3.0s" repeatCount="indefinite" additive="sum"/>
        <FrameAnim base="/Polydectes/polydectes_idle_" w={96} h={128} fps={6}/>
      </g>
      <rect width="700" height="260" fill="url(#c1-vig)"/>
      <rect x="1" y="1" width="698" height="258" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.3"/>
    </svg>
  );
}

// ─── Chapter II: The Gods Take Interest ───────────────────────────────────
function ChapterII({ className, style }: IllustrationProps) {
  return (
    <svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id="c2-vig" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="100%" stopColor="#020208" stopOpacity="0.9"/>
        </radialGradient>
        <radialGradient id="c2-glow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#d4a428" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
      </defs>
      <image href="/illustrations/chapter2/bg.svg" x="0" y="0" width="700" height="260"/>
      <ellipse cx="350" cy="130" rx="160" ry="100" fill="url(#c2-glow)"/>
      {/* Hermes — swoops toward Perseus (center) presenting the harpe, then retreats */}
      <g transform="translate(50,20)">
        <animateTransform attributeName="transform" type="translate"
          values="0,0; 40,-12; 40,-12; 0,0"
          keyTimes="0; 0.35; 0.6; 1"
          calcMode="spline" keySplines="0.3,0,0.5,1; 0.42,0,0.58,1; 0.5,0,0.8,1"
          dur="3.2s" repeatCount="indefinite" additive="sum"/>
        <FrameAnim base="/Hermes/hermes_idle_" pad={0} w={96} h={128} fps={6}/>
      </g>
      {/* Athena — flipped to face left toward Perseus */}
      <g transform="translate(650,20) scale(-1,1)">
        <animateTransform attributeName="transform" type="translate"
          values="0,0; 35,-8; 35,-8; 0,0"
          keyTimes="0; 0.35; 0.6; 1"
          calcMode="spline" keySplines="0.3,0,0.5,1; 0.42,0,0.58,1; 0.5,0,0.8,1"
          dur="3.2s" begin="0.4s" repeatCount="indefinite" additive="sum"/>
        <FrameAnim base="/Athena/athena_idle_" pad={0} w={96} h={128} fps={6}/>
      </g>
      <rect width="700" height="260" fill="url(#c2-vig)"/>
      <rect x="1" y="1" width="698" height="258" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.3"/>
    </svg>
  );
}

// ─── Chapter III: The Grey Sisters ────────────────────────────────────────
function ChapterIII({ className, style }: IllustrationProps) {
  const vr = mkVr(4);
  const SK2="#c09070",EY="#18101e";
  const GR="#888090",GR2="#a8a0b0",WG="#d0ccd8",WH="#e8e8f8";

  const graeae: PR[] = [
    vr(3,0,8,2,WH), vr(2,0,4,4,WH), vr(10,0,3,4,WH),
    vr(4,2,6,5,SK2), vr(8,4,1,1,EY), vr(9,5,1,1,SK2),
    vr(5,7,4,2,SK2),
    vr(3,9,7,8,WG), vr(3,9,7,1,GR),
    vr(4,10,5,7,GR2),
    vr(3,14,7,1,GR),
    vr(1,9,2,5,WG), vr(3,13,3,2,SK2), vr(5,12,4,2,SK2),
    vr(8,12,2,2,WH),
    vr(10,9,2,6,WG),
    vr(4,17,2,6,WG), vr(8,17,2,6,WG),
    vr(3,23,4,2,GR), vr(7,23,4,2,GR),
  ];

  // 4s cycle: eye passes Left→Right→Left
  // Each hold: 1.5s. Each transit: 0.5s, arcing upward through the gap.
  // Left sister at translate(50,40), right hand ≈ SVG (90,88)
  // Right sister at translate(650,40) scale(-1,1), left hand ≈ SVG (610,88)
  // Arc peak midway: (350,68)
  const D = "4s";
  const eKT = "0; 0.375; 0.4375; 0.5; 0.875; 0.9375; 1";
  const eXY = "90,88; 90,88; 350,68; 610,88; 610,88; 350,68; 90,88";
  const eKS = "0.5,0,0.5,0; 0.3,0,0.7,1; 0.3,0,0.7,1; 0.5,0,0.5,0; 0.3,0,0.7,1; 0.3,0,0.7,1";

  return (
    <svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id="c3-vig" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="100%" stopColor="#020208" stopOpacity="0.92"/>
        </radialGradient>
        <radialGradient id="c3-eye" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d4b030" stopOpacity="0.85"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
      </defs>
      <image href="/illustrations/chapter3/bg.svg" x="0" y="0" width="700" height="260"/>

      {/* Left sister — reaches right toward center when passing/receiving */}
      <g transform="translate(50,40)">
        <animateTransform attributeName="transform" type="translate"
          values="0,0; 0,0; 10,0; 0,0; 10,0; 10,0; 0,0"
          keyTimes="0; 0.3; 0.5; 0.625; 0.875; 1.0; 1.0"
          calcMode="spline" keySplines="0.5,0,0.5,0; 0.3,0,0.5,1; 0.5,0,0.3,1; 0.3,0,0.5,1; 0.5,0,0.5,0; 0.5,0,0.5,0"
          dur={D} repeatCount="indefinite" additive="sum"/>
        <Rects rs={graeae}/>
      </g>

      {/* Right sister — mirrored; local +x = world −x, reaches left when passing/receiving */}
      <g transform="translate(650,40) scale(-1,1)">
        <animateTransform attributeName="transform" type="translate"
          values="0,0; 10,0; 10,0; 0,0; 0,0; 10,0; 0,0"
          keyTimes="0; 0.375; 0.625; 0.75; 0.875; 1.0; 1.0"
          calcMode="spline" keySplines="0.3,0,0.5,1; 0.5,0,0.5,0; 0.5,0,0.3,1; 0.5,0,0.5,0; 0.3,0,0.5,1; 0.5,0,0.5,0"
          dur={D} repeatCount="indefinite" additive="sum"/>
        <Rects rs={graeae}/>
      </g>

      {/* The shared golden eye — arcs between the two sisters' outstretched hands */}
      <g>
        <animateTransform attributeName="transform" type="translate"
          values={eXY} keyTimes={eKT} calcMode="spline" keySplines={eKS}
          dur={D} repeatCount="indefinite"/>
        <ellipse cx="0" cy="0" rx="13" ry="9" fill="url(#c3-eye)" opacity="0.7"/>
        <ellipse cx="0" cy="0" rx="6"  ry="4" fill="#c8a020"/>
        <ellipse cx="0" cy="0" rx="4"  ry="3" fill="#a07808"/>
        <ellipse cx="0" cy="0" rx="2"  ry="2" fill="#100808"/>
        <rect    x="-1" y="-2" width="2" height="1" fill="#e8d050" opacity="0.9"/>
      </g>

      <rect width="700" height="260" fill="url(#c3-vig)"/>
      <rect x="1" y="1" width="698" height="258" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.3"/>
    </svg>
  );
}

// ─── Chapter IV: The Nymphs' Gifts ────────────────────────────────────────
function ChapterIV({ className, style }: IllustrationProps) {

  // 20s cycle: Perseus walks (0–3s), then one nymph per phase (3–20s)
  const D = "20s";
  // Nymph hand position in SVG (right side of scene, left-extended arm toward Perseus)
  const NX = 428, NY = 70;
  // Perseus equip positions in SVG (he lands at translate(150,20), sprite 96×128)
  // Centers of each equipped item in world coords:
  const KBX=239, KBY=114;  // kibisis — right hip
  const CAX=208, CAY=29;   // cap     — above head
  const SLX=204, SLY=143;  // sandals — feet

  return (
    <svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id="c4-vig" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="100%" stopColor="#020208" stopOpacity="0.9"/>
        </radialGradient>
      </defs>
      <image href="/illustrations/chapter4/bg.svg" x="0" y="0" width="700" height="260"/>

      {/* Perseus — walks in from left (0–3s), stands and receives gifts */}
      <g>
        <animateTransform attributeName="transform" type="translate"
          values="30,30; 160,30; 160,30"
          keyTimes="0; 0.15; 1"
          calcMode="spline" keySplines="0.3,0,0.5,1; 0.42,0,0.58,1"
          dur={D} repeatCount="indefinite"/>
        {/* Phase keyTimes: walk | idle | +kibisis | +cap | +sandals | end */}
        {/* Walk (0–0.15) */}
        <g>
          <animate attributeName="opacity" values="1;0;0;0;0;0" keyTimes="0;0.15;0.35;0.65;0.95;1" calcMode="discrete" dur={D} repeatCount="indefinite"/>
          <FrameAnim base="/Perseus/perseus_walk_" w={96} h={128} fps={8}/>
        </g>
        {/* Idle, no items (0.15–0.35) */}
        <g>
          <animate attributeName="opacity" values="0;1;0;0;0;0" keyTimes="0;0.15;0.35;0.65;0.95;1" calcMode="discrete" dur={D} repeatCount="indefinite"/>
          <FrameAnim base="/Perseus/perseus_idle_" w={96} h={128} fps={6}/>
        </g>
        {/* Idle + kibisis (0.35–0.65) — frame 03 missing, skip it */}
        <g>
          <animate attributeName="opacity" values="0;0;1;0;0;0" keyTimes="0;0.15;0.35;0.65;0.95;1" calcMode="discrete" dur={D} repeatCount="indefinite"/>
          <FrameAnim base="/Perseus/perseus_idle_kibisis_" frames={[1,2,4]} w={96} h={128} fps={6}/>
        </g>
        {/* Idle + kibisis + cap (0.65–0.95) */}
        <g>
          <animate attributeName="opacity" values="0;0;0;1;0;0" keyTimes="0;0.15;0.35;0.65;0.95;1" calcMode="discrete" dur={D} repeatCount="indefinite"/>
          <FrameAnim base="/Perseus/perseus_idle_kibisis_cap_" w={96} h={128} fps={6}/>
        </g>
        {/* Idle + all items (0.95–1.0) — frame 03 missing, skip it */}
        <g>
          <animate attributeName="opacity" values="0;0;0;0;1;0" keyTimes="0;0.15;0.35;0.65;0.95;1" calcMode="discrete" dur={D} repeatCount="indefinite"/>
          <FrameAnim base="/Perseus/perseus_idle_all_" frames={[1,2,4]} w={96} h={128} fps={6}/>
        </g>
      </g>

      {/* ── Nymph 1: rises from Styx (t=3–5s), gives Kibisis (t=6–7s), retreats (t=7–9s) ── */}
      <g>
        <animateTransform attributeName="transform" type="translate"
          values="470,220; 470,220; 470,30; 470,30; 470,220; 470,220"
          keyTimes="0; 0.15; 0.25; 0.35; 0.45; 1"
          calcMode="spline" keySplines="0.42,0,0.58,1; 0.3,0,0.5,1; 0.42,0,0.58,1; 0.5,0,0.8,1; 0.42,0,0.58,1"
          dur={D} repeatCount="indefinite"/>
        <FrameAnim base="/Nymph/stygian_nymph_idle_frame" pad={0} w={96} h={128} fps={6}/>
      </g>
      {/* Stygian ripple — Nymph 1 */}
      <ellipse cx="470" cy="155" rx="4" ry="2" fill="none" stroke="#7888a0" strokeWidth="1" opacity="0">
        <animate attributeName="opacity" values="0;0;0.7;0.2;0;0" keyTimes="0;0.15;0.18;0.24;0.28;1" calcMode="linear" dur={D} repeatCount="indefinite"/>
        <animate attributeName="rx"      values="4;4;20;30;36;4"  keyTimes="0;0.15;0.18;0.24;0.28;1" calcMode="linear" dur={D} repeatCount="indefinite"/>
        <animate attributeName="ry"      values="2;2;6;9;11;2"    keyTimes="0;0.15;0.18;0.24;0.28;1" calcMode="linear" dur={D} repeatCount="indefinite"/>
      </ellipse>
      {/* Kibisis in transit — held at nymph (t=5–6s), flies to Perseus (t=6–7s) */}
      <g>
        <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.249;0.25;0.349;0.35;1" calcMode="linear" dur={D} repeatCount="indefinite"/>
        <animateTransform attributeName="transform" type="translate"
          values={`${NX},${NY}; ${NX},${NY}; ${KBX},${KBY}; ${KBX},${KBY}`}
          keyTimes="0; 0.30; 0.35; 1"
          calcMode="spline" keySplines="0.42,0,0.58,1; 0.3,0,0.5,1; 0.42,0,0.58,1"
          dur={D} repeatCount="indefinite"/>
        <image href="/Perseus/item_kibisis.png" x="-24" y="-24" width="48" height="48" style={{imageRendering:"pixelated"}}/>
      </g>

      {/* ── Nymph 2: rises (t=9–11s), gives Cap of Hades (t=12–13s), retreats (t=13–15s) ── */}
      <g>
        <animateTransform attributeName="transform" type="translate"
          values="470,220; 470,220; 470,30; 470,30; 470,220; 470,220"
          keyTimes="0; 0.45; 0.55; 0.65; 0.75; 1"
          calcMode="spline" keySplines="0.42,0,0.58,1; 0.3,0,0.5,1; 0.42,0,0.58,1; 0.5,0,0.8,1; 0.42,0,0.58,1"
          dur={D} repeatCount="indefinite"/>
        <FrameAnim base="/Nymph/stygian_nymph_idle_frame" pad={0} w={96} h={128} fps={6}/>
      </g>
      {/* Stygian ripple — Nymph 2 */}
      <ellipse cx="470" cy="155" rx="4" ry="2" fill="none" stroke="#7888a0" strokeWidth="1" opacity="0">
        <animate attributeName="opacity" values="0;0;0.7;0.2;0;0" keyTimes="0;0.45;0.48;0.54;0.58;1" calcMode="linear" dur={D} repeatCount="indefinite"/>
        <animate attributeName="rx"      values="4;4;20;30;36;4"  keyTimes="0;0.45;0.48;0.54;0.58;1" calcMode="linear" dur={D} repeatCount="indefinite"/>
        <animate attributeName="ry"      values="2;2;6;9;11;2"    keyTimes="0;0.45;0.48;0.54;0.58;1" calcMode="linear" dur={D} repeatCount="indefinite"/>
      </ellipse>
      {/* Cap of Hades in transit — held at nymph (t=11–12s), flies to Perseus (t=12–13s) */}
      <g>
        <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.549;0.55;0.649;0.65;1" calcMode="linear" dur={D} repeatCount="indefinite"/>
        <animateTransform attributeName="transform" type="translate"
          values={`${NX},${NY}; ${NX},${NY}; ${CAX},${CAY}; ${CAX},${CAY}`}
          keyTimes="0; 0.60; 0.65; 1"
          calcMode="spline" keySplines="0.42,0,0.58,1; 0.3,0,0.5,1; 0.42,0,0.58,1"
          dur={D} repeatCount="indefinite"/>
        <image href="/Perseus/item_cap_of_hades.png" x="-24" y="-24" width="48" height="48" style={{imageRendering:"pixelated"}}/>
      </g>

      {/* ── Nymph 3: rises (t=15–17s), gives Sandals (t=18–19s), retreats (t=19–20s) ── */}
      <g>
        <animateTransform attributeName="transform" type="translate"
          values="470,220; 470,220; 470,30; 470,30; 470,220"
          keyTimes="0; 0.75; 0.85; 0.95; 1"
          calcMode="spline" keySplines="0.42,0,0.58,1; 0.3,0,0.5,1; 0.42,0,0.58,1; 0.5,0,0.8,1"
          dur={D} repeatCount="indefinite"/>
        <FrameAnim base="/Nymph/stygian_nymph_idle_frame" pad={0} w={96} h={128} fps={6}/>
      </g>
      {/* Stygian ripple — Nymph 3 */}
      <ellipse cx="470" cy="155" rx="4" ry="2" fill="none" stroke="#7888a0" strokeWidth="1" opacity="0">
        <animate attributeName="opacity" values="0;0;0.7;0.2;0;0" keyTimes="0;0.75;0.78;0.84;0.88;1" calcMode="linear" dur={D} repeatCount="indefinite"/>
        <animate attributeName="rx"      values="4;4;20;30;36;4"  keyTimes="0;0.75;0.78;0.84;0.88;1" calcMode="linear" dur={D} repeatCount="indefinite"/>
        <animate attributeName="ry"      values="2;2;6;9;11;2"    keyTimes="0;0.75;0.78;0.84;0.88;1" calcMode="linear" dur={D} repeatCount="indefinite"/>
      </ellipse>
      {/* Winged sandals in transit — held at nymph (t=17–18s), flies to Perseus (t=18–19s) */}
      <g>
        <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.849;0.85;0.949;0.95;1" calcMode="linear" dur={D} repeatCount="indefinite"/>
        <animateTransform attributeName="transform" type="translate"
          values={`${NX},${NY}; ${NX},${NY}; ${SLX},${SLY}; ${SLX},${SLY}`}
          keyTimes="0; 0.90; 0.95; 1"
          calcMode="spline" keySplines="0.42,0,0.58,1; 0.3,0,0.5,1; 0.42,0,0.58,1"
          dur={D} repeatCount="indefinite"/>
        <image href="/Perseus/item_winged_sandals.png" x="-24" y="-24" width="48" height="48" style={{imageRendering:"pixelated"}}/>
      </g>

      <rect width="700" height="260" fill="url(#c4-vig)"/>
      <rect x="1" y="1" width="698" height="258" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.3"/>
    </svg>
  );
}

// ─── Chapter V: The Gorgon's Lair ─────────────────────────────────────────
// Gorgon sprites: 24×32 px PNGs in /public/Gorgons/, rendered at 4× (96×128 SVG units)
function ChapterV({ className, style }: IllustrationProps) {
  const D = "14s";
  // Phase keyTimes (7 values):
  // 0–0.40 walk in | 0.40–0.55 hold (aegis raised) | 0.55–0.65 strike | 0.65–0.75 kill hold | 0.75–0.85 retreat | 0.85–1 exit
  const kT = "0; 0.40; 0.55; 0.65; 0.75; 0.85; 1";


  // 4-frame discrete PNG animation helper — cycles frames at given fps
  const px = { width: 96, height: 128, style: { imageRendering: 'pixelated' as const } };
  function GorgonFrames({ base, fps = 2 }: { base: string; fps?: number }) {
    const dur = `${1 / fps * 4}s`; // full cycle duration for 4 frames
    const v = (active: number) => [0,1,2,3].map(i => i===active?1:0).join(';');
    return (
      <>
        {[0,1,2,3].map(i => (
          <image key={i} href={`/Gorgons/${base}_${i}.png`} x="0" y="0"
            {...px} opacity={i===0?1:0}>
            <animate attributeName="opacity" values={v(i)}
              dur={dur} repeatCount="indefinite" calcMode="discrete"/>
          </image>
        ))}
      </>
    );
  }

  return (
    <svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id="c5-vig" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="100%" stopColor="#020106" stopOpacity="0.92"/>
        </radialGradient>
        <radialGradient id="c5-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5a2080" stopOpacity="0.12"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
      </defs>
      <image href="/illustrations/chapter5/bg.svg" x="0" y="0" width="700" height="260"/>
      <ellipse cx="320" cy="165" rx="200" ry="90" fill="url(#c5-glow)"/>

      {/* Stheno — sleeping, teal snake-hair */}
      <g transform="translate(30,100)">
        <Bob amp={3} dur="6s" delay="0s"/>
        <GorgonFrames base="Stheno_Sleep"/>
      </g>

      {/* Euryale — sleeping, crimson snake-hair */}
      <g transform="translate(170,100)">
        <Bob amp={3} dur="7.5s" delay="2s"/>
        <GorgonFrames base="Euryale_Sleep"/>
      </g>

      {/* Medusa — sleeping, then dead after the strike */}
      <g transform="translate(310,100)">
        {/* Sleeping — visible until kill */}
        <g>
          <animate attributeName="opacity" values="1;1;1;0;0;0;1"
            keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
          <Bob amp={2} dur="5s" delay="1s"/>
          <GorgonFrames base="Medusa_Sleep"/>
        </g>
        {/* Dead — visible after kill */}
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;0;1;1;1;0"
            keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
          <GorgonFrames base="Medusa_Dead"/>
        </g>
      </g>

      {/* Perseus — Cap of Hades (nearly invisible), sneaks in, lunges to kill */}
      <g transform="translate(650,20) scale(-1,1)">
        {/* Translate: sneak in → hold → retreat → exit */}
        <animateTransform attributeName="transform" type="translate"
          values="0,0; 210,5; 220,5; 220,5; 220,5; 200,3; 0,0"
          keyTimes={kT} calcMode="spline"
          keySplines="0.3,0,0.5,1; 0.3,0,0.7,1; 0.42,0,0.58,1; 0.42,0,0.58,1; 0.42,0,0.58,1; 0.5,0,0.8,1"
          dur={D} repeatCount="indefinite" additive="sum"/>
        {/* Cap of Hades opacity: ghost-faint while sneaking, slightly more visible at strike */}
        <animate attributeName="opacity"
          values="0.12; 0.15; 0.42; 0.20; 0.12; 0; 0"
          keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>

        {/* Sneak pose (side profile, crouched) — visible walk-in, hold, and retreat */}
        <g>
          <animate attributeName="opacity" values="1;1;0;0;1;0;0"
            keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
          <FrameAnim base="/Perseus/perseus_sneak_" w={96} h={128} fps={4}/>
        </g>

        {/* Slash / kill pose — visible at strike and post-kill */}
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0;0;0"
            keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
          <FrameAnim base="/Perseus/perseus_slash_" w={96} h={128} fps={8}/>
        </g>
      </g>

      {/* Strike flash — blood-red burst at the kill moment */}
      <ellipse cx="405" cy="168" rx="28" ry="20" fill="#c82020" opacity="0">
        <animate attributeName="opacity" values="0;0;0;0.85;0;0;0"
          keyTimes="0;0.60;0.63;0.65;0.68;0.71;1"
          calcMode="linear" dur={D} repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="405" cy="168" rx="13" ry="9" fill="#f0c040" opacity="0">
        <animate attributeName="opacity" values="0;0;0;0.95;0;0;0"
          keyTimes="0;0.62;0.64;0.65;0.67;0.70;1"
          calcMode="linear" dur={D} repeatCount="indefinite"/>
      </ellipse>

      <rect width="700" height="260" fill="url(#c5-vig)"/>
      <rect x="1" y="1" width="698" height="258" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.3"/>
    </svg>
  );
}

// ─── Chapter VI: The Flight Home ──────────────────────────────────────────
function ChapterVI({ className, style }: IllustrationProps) {
  const stars: { x:number; y:number; dur:string; del:string; op:number; gold?:boolean; dim?:boolean; }[] = [
    { x:22,  y:6,  dur:"2.1s", del:"0.0s", op:0.88 },
    { x:75,  y:20, dur:"3.3s", del:"0.7s", op:0.82 },
    { x:140, y:12, dur:"2.7s", del:"1.2s", op:0.85 },
    { x:200, y:4,  dur:"1.9s", del:"0.3s", op:0.90 },
    { x:268, y:16, dur:"2.5s", del:"1.8s", op:0.80 },
    { x:338, y:8,  dur:"3.1s", del:"0.5s", op:0.85 },
    { x:410, y:22, dur:"2.3s", del:"2.1s", op:0.82 },
    { x:475, y:10, dur:"1.7s", del:"0.9s", op:0.87 },
    { x:548, y:18, dur:"2.9s", del:"1.5s", op:0.82 },
    { x:618, y:6,  dur:"2.0s", del:"0.2s", op:0.88 },
    { x:672, y:14, dur:"3.5s", del:"1.1s", op:0.80 },
    { x:48,  y:38, dur:"2.2s", del:"0.6s", op:0.58, gold:true },
    { x:116, y:46, dur:"3.0s", del:"1.4s", op:0.52, gold:true },
    { x:192, y:32, dur:"2.6s", del:"0.8s", op:0.60, gold:true },
    { x:310, y:50, dur:"1.8s", del:"2.2s", op:0.50, gold:true },
    { x:430, y:40, dur:"2.4s", del:"0.4s", op:0.55, gold:true },
    { x:550, y:34, dur:"3.2s", del:"1.7s", op:0.52, gold:true },
    { x:660, y:44, dur:"2.8s", del:"0.0s", op:0.48, gold:true },
    { x:30,  y:68, dur:"4.0s", del:"1.3s", op:0.55, dim:true },
    { x:100, y:76, dur:"3.5s", del:"2.5s", op:0.50, dim:true },
    { x:170, y:62, dur:"2.8s", del:"0.7s", op:0.55, dim:true },
    { x:250, y:80, dur:"4.2s", del:"1.9s", op:0.48, dim:true },
    { x:380, y:70, dur:"3.1s", del:"3.0s", op:0.52, dim:true },
    { x:460, y:56, dur:"2.5s", del:"0.3s", op:0.55, dim:true },
    { x:560, y:74, dur:"3.8s", del:"2.1s", op:0.50, dim:true },
    { x:640, y:60, dur:"2.2s", del:"1.6s", op:0.48, dim:true },
  ];

  const windLines = [
    { y:82,  w:70, del:"0.0s", dur:"1.8s" },
    { y:96,  w:45, del:"0.6s", dur:"2.1s" },
    { y:72,  w:85, del:"1.2s", dur:"1.5s" },
    { y:110, w:55, del:"0.3s", dur:"2.0s" },
    { y:62,  w:40, del:"0.9s", dur:"1.7s" },
    { y:122, w:65, del:"1.5s", dur:"2.3s" },
    { y:52,  w:50, del:"0.4s", dur:"1.9s" },
    { y:134, w:30, del:"1.8s", dur:"1.6s" },
  ];

  return (
    <svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id="c6-vig" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="100%" stopColor="#020308" stopOpacity="0.92"/>
        </radialGradient>
        <radialGradient id="c6-moon" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d0c870" stopOpacity="0.45"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <style>{`
          @keyframes c6-twinkle  { 0%,100%{opacity:1} 50%{opacity:0.05} }
          @keyframes c6-moonGlow { 0%,100%{opacity:0.5} 50%{opacity:1} }
          @keyframes c6-wind {
            0%   { transform:translateX(750px); opacity:0; }
            8%   { opacity:0.5; }
            88%  { opacity:0.5; }
            100% { transform:translateX(-150px); opacity:0; }
          }
          @keyframes c6-wave  { 0%{transform:translateX(0)} 100%{transform:translateX(-100px)} }
          @keyframes c6-shimmer { 0%,100%{opacity:0.04} 50%{opacity:0.10} }
        `}</style>
      </defs>

      <rect width="700" height="200" fill="#050810"/>
      <rect x="0" y="0"   width="700" height="50"  fill="#040608"/>
      <rect x="0" y="50"  width="700" height="60"  fill="#060910"/>
      <rect x="0" y="110" width="700" height="60"  fill="#070a12"/>
      <rect x="0" y="170" width="700" height="30"  fill="#090c14"/>

      {stars.map((s, i) => (
        <rect key={i} x={s.x} y={s.y}
          width={s.dim ? 1 : 2} height={s.dim ? 1 : 2}
          fill={s.gold ? "#c9a84c" : s.dim ? "#808090" : "#e4dfc2"}
          style={{ animation:`c6-twinkle ${s.dur} ease-in-out ${s.del} infinite`, opacity:s.op }}
        />
      ))}

      <ellipse cx="610" cy="48" rx="58" ry="58" fill="url(#c6-moon)"
        style={{ animation:"c6-moonGlow 4s ease-in-out infinite" }}/>
      <rect x="580" y="18" width="60" height="60" fill="#040608"/>
      <rect x="586" y="24" width="48" height="48" fill="#cfc478" opacity="0.16"/>
      <rect x="590" y="28" width="40" height="40" fill="#d0c87a" opacity="0.24"/>
      <rect x="594" y="32" width="32" height="32" fill="#cfc472" opacity="0.36"/>
      <rect x="598" y="36" width="24" height="24" fill="#c8be68" opacity="0.50"/>
      <rect x="604" y="28" width="24" height="40" fill="#040608"/>
      <rect x="606" y="26" width="22" height="44" fill="#040608"/>

      {windLines.map((w, i) => (
        <rect key={i} x={0} y={w.y} width={w.w} height={1}
          fill="#b8c8d8"
          style={{ opacity:0, animation:`c6-wind ${w.dur} linear ${w.del} infinite` }}
        />
      ))}

      <g>
        <animateTransform
          attributeName="transform" type="translate"
          values="-220,12; 40,26; 200,10; 360,-6; 510,16; 650,2; 920,10"
          keyTimes="0; 0.15; 0.30; 0.45; 0.60; 0.75; 1"
          calcMode="spline"
          keySplines="0.42,0,0.58,1; 0.42,0,0.58,1; 0.42,0,0.58,1; 0.42,0,0.58,1; 0.42,0,0.58,1; 0.42,0,0.58,1"
          dur="9s" repeatCount="indefinite"
        />
        <rect x={-200} y={18} width={200} height={44} fill="#c9a84c" opacity="0.05"/>
        <rect x={-130} y={26} width={130} height={32} fill="#c9a84c" opacity="0.09"/>
        <rect x={-70}  y={30} width={70}  height={20} fill="#dbd060" opacity="0.15"/>
        <rect x={-30}  y={32} width={30}  height={14} fill="#dbd060" opacity="0.22"/>
        <g transform="translate(-84,0)" opacity={0.08}>
          <FrameAnim base="/Perseus/perseus_flight_" w={96} h={128} fps={8}/>
        </g>
        <g transform="translate(-44,0)" opacity={0.20}>
          <FrameAnim base="/Perseus/perseus_flight_" w={96} h={128} fps={8}/>
        </g>
        <FrameAnim base="/Perseus/perseus_flight_" w={96} h={128} fps={8}/>
      </g>

      <rect x="0" y="198" width="700" height="62" fill="#060c18"/>
      <rect x="0" y="198" width="700" height="8"  fill="#08101e"/>

      <g style={{ animation:"c6-wave 4s linear infinite" }}>
        {[0,1,2,3,4,5,6,7,8].map(n => (
          <React.Fragment key={n}>
            <rect x={n*100}      y={206} width={60} height={2} fill="#0a1420" opacity="0.8"/>
            <rect x={n*100 + 15} y={214} width={75} height={2} fill="#0c1622" opacity="0.7"/>
            <rect x={n*100 + 30} y={222} width={50} height={2} fill="#0a1420" opacity="0.6"/>
            <rect x={n*100 +  5} y={230} width={65} height={2} fill="#0c1622" opacity="0.5"/>
          </React.Fragment>
        ))}
      </g>

      <rect x="530" y="200" width="80" height="58" fill="#c0b860"
        style={{ animation:"c6-shimmer 3.5s ease-in-out infinite" }}/>
      <rect x="550" y="205" width="40" height="53" fill="#c0b860"
        style={{ animation:"c6-shimmer 3.5s ease-in-out 1.2s infinite" }}/>

      <rect width="700" height="260" fill="url(#c6-vig)"/>
      <rect x="1" y="1" width="698" height="258" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.3"/>
    </svg>
  );
}

// ─── Chapter VII: Andromeda ───────────────────────────────────────────────
function ChapterVII({ className, style }: IllustrationProps) {
  const vr = mkVr(4);
  const SK="#d49060",EY="#18101e";
  const BR="#b87832",BH="#d4a450";
  const TN="#dcd4a4",BL="#7a5028",LT="#5a3c22";
  const CP="#c41818",CD="#8a1010",PL="#700c0c";
  const WH="#e8e8f8";

  const perseusSoar: PR[] = [
    vr(0,0,5,2,PL),
    vr(3,0,8,2,BH), vr(2,1,10,3,BR), vr(2,4,2,5,BR),
    vr(4,1,6,7,SK), vr(8,3,1,1,EY), vr(9,5,1,2,SK),
    vr(5,8,4,2,SK),
    vr(0,4,3,22,CP), vr(0,26,3,4,CD),
    vr(3,10,8,9,TN), vr(3,16,8,2,BL),
    vr(11,4,2,9,SK), vr(12,1,2,5,BH), vr(13,0,1,3,BH),
    vr(1,10,2,8,SK),
    vr(5,20,2,9,SK), vr(8,21,2,8,SK),
    vr(4,29,3,2,LT), vr(7,29,3,2,LT),
    vr(2,26,2,4,WH), vr(10,26,2,4,WH),
  ];

  return (
    <svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id="c7-vig" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="100%" stopColor="#020308" stopOpacity="0.92"/>
        </radialGradient>
      </defs>
      <image href="/illustrations/chapter7/bg.svg" x="0" y="0" width="700" height="260"/>
      {/* Andromeda — strained upward, then falls back (chained) */}
      <g transform="translate(100,15)">
        <animateTransform attributeName="transform" type="translate"
          values="0,0; 0,-10; 0,-2; 0,-10; 0,0"
          keyTimes="0; 0.3; 0.5; 0.7; 1"
          calcMode="spline" keySplines="0.42,0,0.58,1; 0.42,0,0.58,1; 0.42,0,0.58,1; 0.42,0,0.58,1"
          dur="2.0s" repeatCount="indefinite" additive="sum"/>
        {/* 8-bit rock */}
        <rect x={16} y={92} width={64} height={4} fill="#2a2820"/>
        <rect x={12} y={96} width={72} height={8} fill="#484440"/>
        <rect x={10} y={104} width={76} height={8} fill="#585450"/>
        <rect x={12} y={112} width={72} height={8} fill="#484440"/>
        <rect x={16} y={120} width={64} height={6} fill="#383430"/>
        <rect x={20} y={126} width={56} height={4} fill="#282420"/>
        <rect x={16} y={92} width={20} height={2} fill="#807868"/>
        <rect x={12} y={96} width={10} height={2} fill="#706860"/>
        <rect x={44} y={96} width={4} height={14} fill="#2a2820"/>
        <rect x={62} y={100} width={4} height={10} fill="#383430"/>
        {/* Andromeda sprite */}
        <FrameAnim base="/Andromeda/andromeda_chained_" count={2} w={96} h={128} fps={2}/>
      </g>
      {/* Perseus — swoops hard toward Andromeda to rescue her, then circles back */}
      <g transform="translate(640,10) scale(-1,1)">
        <animateTransform attributeName="transform" type="translate"
          values="0,0; 80,-16; 80,-16; 0,0"
          keyTimes="0; 0.35; 0.6; 1"
          calcMode="spline" keySplines="0.3,0,0.5,1; 0.42,0,0.58,1; 0.5,0,0.8,1"
          dur="3.0s" repeatCount="indefinite" additive="sum"/>
        <Rects rs={perseusSoar}/>
      </g>
      <rect width="700" height="260" fill="url(#c7-vig)"/>
      <rect x="1" y="1" width="698" height="258" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.3"/>
    </svg>
  );
}

// ─── Chapter VIII: Return to Seriphos ─────────────────────────────────────
function ChapterVIII({ className, style }: IllustrationProps) {
  const D = "10s";
  // 0–0.25 (0–2.5s): idle | 0.25–0.50 (2.5–5s): pull head | 0.50–0.65 (5–6.5s): stone transition | 0.65–0.95 (6.5–9.5s): stone hold | 0.95–1 reset
  const kT = "0; 0.25; 0.50; 0.65; 0.95; 1";
  return (
    <svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id="c8-vig" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="100%" stopColor="#020208" stopOpacity="0.92"/>
        </radialGradient>
        <radialGradient id="c8-bag" cx="30%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
      </defs>
      <image href="/illustrations/chapter8/bg.svg" x="0" y="0" width="700" height="260"/>
      <ellipse cx="164" cy="120" rx="130" ry="110" fill="url(#c8-bag)"/>

      {/* Perseus — stays put; idle then slowly pulls out Medusa's head */}
      <g transform="translate(50,20)">
        {/* Idle with all items (0–2.5s and 9.5–10s) */}
        <g>
          <animate attributeName="opacity" values="1;0;0;0;1;1" keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
          <FrameAnim base="/Perseus/perseus_idle_all_" frames={[1,2,4]} w={96} h={128} fps={6}/>
        </g>
        {/* Pull head — frames 01→05 each shown for 0.8s, plays once (no loop back) */}
        {([
          {f:"01", a:"0;1;0;0;0;0;0;0;0"},
          {f:"02", a:"0;0;1;0;0;0;0;0;0"},
          {f:"03", a:"0;0;0;1;0;0;0;0;0"},
          {f:"04", a:"0;0;0;0;1;0;0;0;0"},
          {f:"05", a:"0;0;0;0;0;1;0;0;0"},
        ] as {f:string; a:string}[]).map(({f, a}) => (
          <image key={f} href={`/Perseus/perseus_pull_head_${f}.png`}
            x={0} y={0} width={96} height={128} opacity="0" style={{imageRendering:"pixelated"}}>
            <animate attributeName="opacity" values={a}
              keyTimes="0;0.25;0.33;0.41;0.49;0.57;0.65;0.95;1"
              calcMode="discrete" dur={D} repeatCount="indefinite"/>
          </image>
        ))}
        {/* Frame 05 held still (6.5–9.5s = 3s hold, matches Polydectes stone hold) */}
        <image href="/Perseus/perseus_pull_head_05.png" x={0} y={0} width={96} height={128} opacity="0" style={{imageRendering:"pixelated"}}>
          <animate attributeName="opacity" values="0;0;0;0;0;0;1;0;0"
            keyTimes="0;0.25;0.33;0.41;0.49;0.57;0.65;0.95;1"
            calcMode="discrete" dur={D} repeatCount="indefinite"/>
        </image>
      </g>

      {/* Polydectes — idle, then turns to stone, then held as stone for 3s */}
      <g transform="translate(650,20) scale(-1,1)">
        {/* Idle (0–5s and 9.5–10s) */}
        <g>
          <animate attributeName="opacity" values="1;1;0;0;1;1" keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
          <FrameAnim base="/Polydectes/polydectes_idle_" w={96} h={128} fps={6}/>
        </g>
        {/* Stone transformation (5–6.5s) */}
        <g>
          <animate attributeName="opacity" values="0;0;1;0;0;0" keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
          <FrameAnim base="/Polydectes/polydectes_stone_" count={5} w={96} h={128} fps={4}/>
        </g>
        {/* Stone held — last frame, 3 seconds (6.5–9.5s) */}
        <g>
          <animate attributeName="opacity" values="0;0;0;1;0;0" keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
          <image href="/Polydectes/polydectes_stone_05.png" x={0} y={0} width={96} height={128} style={{imageRendering:"pixelated"}}/>
        </g>
      </g>

      <rect width="700" height="260" fill="url(#c8-vig)"/>
      <rect x="1" y="1" width="698" height="258" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.3"/>
    </svg>
  );
}

// ─── Chapter IX: Endings ──────────────────────────────────────────────────
function ChapterIX({ className, style }: IllustrationProps) {
  const vr = mkVr(4);
  const SK="#d49060",SK2="#b07848",EY="#18101e";
  const BR="#b87832",BH="#d4a450";
  const TN="#dcd4a4",BL="#7a5028",LT="#5a3c22";
  const CP="#c41818",CD="#8a1010",PL="#700c0c";
  const WH="#e8e8f8",GD="#d4a428",PP="#7030b0",GR="#908880";

  const perseusThrow: PR[] = [
    vr(0,0,5,2,PL),
    vr(3,0,8,2,BH), vr(2,1,10,3,BR), vr(2,4,2,5,BR),
    vr(4,1,6,7,SK), vr(8,3,1,1,EY), vr(9,5,1,2,SK),
    vr(5,8,4,2,SK),
    vr(0,4,2,22,CP), vr(0,26,2,3,CD),
    vr(3,10,8,9,TN), vr(3,16,8,2,BL),
    vr(11,2,2,10,SK),
    vr(11,0,4,3,GR), vr(12,0,3,2,SK2),
    vr(0,8,2,8,SK),
    vr(3,20,2,10,SK), vr(9,20,2,10,SK),
    vr(2,30,4,2,LT), vr(8,30,4,2,LT),
    vr(1,27,3,3,WH), vr(10,27,3,3,WH),
  ];

  const acrisius: PR[] = [
    vr(8,0,6,1,GD), vr(8,0,2,2,GD), vr(11,0,2,2,GD),
    vr(4,2,6,6,SK2), vr(7,4,1,1,EY), vr(8,5,1,2,SK2),
    vr(4,7,5,3,GR),
    vr(5,10,4,2,SK2),
    vr(2,12,10,9,PP),
    vr(2,18,10,2,GD),
    vr(0,10,2,8,PP), vr(12,8,2,8,PP),
    vr(4,21,2,8,PP), vr(9,18,2,10,PP),
    vr(3,29,4,2,LT), vr(8,28,4,2,LT),
  ];

  return (
    <svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id="c9-vig" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="100%" stopColor="#020208" stopOpacity="0.9"/>
        </radialGradient>
      </defs>
      <image href="/illustrations/chapter9/bg.svg" x="0" y="0" width="700" height="260"/>
      {/* Perseus — throws: lunge forward-up on release, settle back */}
      <g transform="translate(50,30)">
        <animateTransform attributeName="transform" type="translate"
          values="0,0; 8,-12; 0,0"
          keyTimes="0; 0.35; 1"
          calcMode="spline" keySplines="0.2,0,0.4,1; 0.5,0,0.8,1"
          dur="1.1s" repeatCount="indefinite" additive="sum"/>
        <Rects rs={perseusThrow}/>
      </g>
      {/* Discus in flight — arcs from Perseus's hand toward Acrisius */}
      <g>
        <animateTransform attributeName="transform" type="translate"
          values="120,50; 560,90; 120,50"
          keyTimes="0; 0.45; 1"
          calcMode="spline" keySplines="0.2,0,0.6,1; 0.4,0,0.8,1"
          dur="1.1s" repeatCount="indefinite"/>
        <ellipse rx="10" ry="4" fill="#9aa8b0" opacity="0.85"/>
        <ellipse rx="7" ry="3" fill="#c8d0d8" opacity="0.9"/>
      </g>
      {/* Acrisius — struck, staggers backward and crumples */}
      <g transform="translate(650,30) scale(-1,1)">
        <animateTransform attributeName="transform" type="translate"
          values="0,0; 0,0; -20,8; -35,14; -20,8; 0,0"
          keyTimes="0; 0.3; 0.45; 0.6; 0.75; 1"
          calcMode="spline" keySplines="0.42,0,0.58,1; 0.2,0,0.4,1; 0.42,0,0.58,1; 0.42,0,0.58,1; 0.5,0,0.8,1"
          dur="1.1s" begin="0.38s" repeatCount="indefinite" additive="sum"/>
        <Rects rs={acrisius}/>
      </g>
      <rect width="700" height="260" fill="url(#c9-vig)"/>
      <rect x="1" y="1" width="698" height="258" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.3"/>
    </svg>
  );
}

// ─── Map + Public Component ────────────────────────────────────────────────
const ILLUSTRATIONS: Record<string, (props: IllustrationProps) => React.ReactElement> = {
  I:    ChapterI,
  II:   ChapterII,
  III:  ChapterIII,
  IV:   ChapterIV,
  V:    ChapterV,
  VI:   ChapterVI,
  VII:  ChapterVII,
  VIII: ChapterVIII,
  IX:   ChapterIX,
};

interface ChapterIllustrationProps {
  chapter: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function ChapterIllustration({ chapter, className, style }: ChapterIllustrationProps) {
  const Component = ILLUSTRATIONS[chapter];
  if (!Component) return null;
  return (
    <Component
      className={className ?? "w-full block"}
      style={style}
    />
  );
}
