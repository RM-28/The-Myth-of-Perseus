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
        <style>{`
          @keyframes c1-flame  { 0%,100%{opacity:1} 30%{opacity:0.50} 65%{opacity:0.95} 85%{opacity:0.55} }
          @keyframes c1-glow   { 0%,100%{opacity:0.11} 50%{opacity:0.20} }
          @keyframes c1-candle { 0%,100%{opacity:1} 38%{opacity:0.28} 70%{opacity:0.82} }
        `}</style>
        <radialGradient id="c1-vig" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="100%" stopColor="#140108" stopOpacity="0.95"/>
        </radialGradient>
      </defs>

      {/* ── Stone back wall ── */}
      <rect width="700" height="212" fill="#0e0c1e"/>
      {Array.from({length:15},(_,i)=><rect key={i} x={0} y={i*14} width={700} height={12} fill={i%2===0?"#16142a":"#1a1830"}/>)}
      {[0,80,160,240,320,400,480,560,640].map(x=><rect key={x} x={x} y={0} width={2} height={210} fill="#0a0818" opacity="0.45"/>)}
      {[40,120,200,280,360,440,520,600].map(x=>Array.from({length:8},(_,i)=><rect key={`${x}${i}`} x={x} y={i*28} width={2} height={12} fill="#0a0818" opacity="0.45"/>))}

      {/* ── Stone floor ── */}
      <rect x={0} y={212} width={700} height={48} fill="#120e24"/>
      {Array.from({length:4},(_,i)=><rect key={i} x={0} y={212+i*14} width={700} height={12} fill={i%2===0?"#1c1830":"#181428"}/>)}
      {[0,70,140,210,280,350,420,490,560,630].map(x=><rect key={x} x={x} y={212} width={2} height={48} fill="#0a0818" opacity="0.5"/>)}

      {/* ── Side columns ── */}
      <rect x={0}   y={0} width={44}  height={212} fill="#1e1a34"/>
      <rect x={0}   y={0} width={4}   height={212} fill="#2a2640"/>
      <rect x={40}  y={0} width={4}   height={212} fill="#0e0c1e"/>
      <rect x={656} y={0} width={44}  height={212} fill="#1e1a34"/>
      <rect x={692} y={0} width={8}   height={212} fill="#2a2640"/>
      <rect x={656} y={0} width={4}   height={212} fill="#0e0c1e"/>

      {/* ── Purple banner (sways slightly) ── */}
      <rect x={240} y={0} width={220} height={104} fill="#2a1040" opacity="0.8"/>
      <rect x={244} y={0} width={212} height={100} fill="#321248" opacity="0.6"/>
      <rect x={290} y={82} width={120} height={18} fill="#2a8870" opacity="0.12"/>
      <g>
        <animateTransform attributeName="transform" type="translate"
          values="0,0; 3,2; 0,0; -2,1; 0,0" keyTimes="0;0.25;0.5;0.75;1"
          calcMode="spline" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
          dur="5s" repeatCount="indefinite"/>
        <rect x={244} y={0} width={212} height={4} fill="#2a8870" opacity="0.45"/>
      </g>

      {/* ── Feast table ── */}
      <rect x={196} y={158} width={308} height={4}  fill="#5e3e14"/>
      <rect x={196} y={162} width={308} height={52} fill="#3a2408"/>
      {[248,300,352,404,452].map(x=><rect key={x} x={x} y={162} width={2} height={52} fill="#1e1004" opacity="0.5"/>)}
      <rect x={208} y={212} width={16} height={48} fill="#2e1c06"/>
      <rect x={476} y={212} width={16} height={48} fill="#2e1c06"/>

      {/* ── Left torch ── */}
      <rect x={22} y={84} width={4} height={128} fill="#1c1828"/>
      <rect x={18} y={78} width={12} height={8}  fill="#382a10"/>
      <g style={{animation:"c1-flame 0.45s ease-in-out 0s infinite"}}>
        <rect x={16} y={48} width={12} height={32} fill="#a02408"/>
        <rect x={18} y={48} width={8}  height={26} fill="#c84010"/>
        <rect x={19} y={48} width={6}  height={18} fill="#d87018"/>
        <rect x={20} y={48} width={4}  height={12} fill="#e09828"/>
      </g>
      <rect x={0} y={34} width={68} height={130} fill="#a03010" style={{animation:"c1-glow 0.7s ease-in-out 0s infinite"}}/>

      {/* ── Right torch ── */}
      <rect x={674} y={84} width={4} height={128} fill="#1c1828"/>
      <rect x={670} y={78} width={12} height={8}  fill="#382a10"/>
      <g style={{animation:"c1-flame 0.45s ease-in-out 0.22s infinite"}}>
        <rect x={670} y={48} width={12} height={32} fill="#a02408"/>
        <rect x={672} y={48} width={8}  height={26} fill="#c84010"/>
        <rect x={673} y={48} width={6}  height={18} fill="#d87018"/>
        <rect x={674} y={48} width={4}  height={12} fill="#e09828"/>
      </g>
      <rect x={632} y={34} width={68} height={130} fill="#a03010" style={{animation:"c1-glow 0.7s ease-in-out 0.28s infinite"}}/>

      {/* ── Candles on table ── */}
      {[277,344,411].map((cx,idx)=>(
        <g key={cx}>
          <rect x={cx+5} y={132} width={4} height={28} fill="#c8a860"/>
          <rect x={cx+5} y={132} width={1} height={28} fill="#e0c878" opacity="0.5"/>
          <rect x={cx+1} y={158} width={12} height={4} fill="#806010"/>
          <g style={{animation:`c1-candle 0.55s ease-in-out ${idx*0.17}s infinite`}}>
            <rect x={cx+6} y={120} width={2} height={10} fill="#c83808"/>
            <rect x={cx+7} y={118} width={2} height={6}  fill="#e07018"/>
          </g>
        </g>
      ))}
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
      <rect x="1" y="1" width="698" height="258" fill="none" stroke="#7a1818" strokeWidth="0.8" strokeOpacity="0.45"/>
    </svg>
  );
}

// ─── Chapter II: The Gods Take Interest ───────────────────────────────────
function ChapterII({ className, style }: IllustrationProps) {
  const c2stars = [
    {x:42,y:8,op:0.85,dur:"2.1s",del:"0s"},{x:118,y:14,op:0.80,dur:"3.3s",del:"0.7s"},
    {x:214,y:6,op:0.88,dur:"2.7s",del:"1.2s"},{x:310,y:18,op:0.75,dur:"1.9s",del:"0.3s"},
    {x:432,y:10,op:0.82,dur:"3.1s",del:"1.8s"},{x:528,y:4,op:0.78,dur:"2.3s",del:"0.5s"},
    {x:622,y:16,op:0.80,dur:"2.9s",del:"2.1s"},{x:78,y:32,op:0.55,dur:"2.2s",del:"0.6s"},
    {x:256,y:28,op:0.60,dur:"3.0s",del:"1.4s"},{x:484,y:22,op:0.55,dur:"1.7s",del:"0.9s"},
    {x:648,y:42,op:0.45,dur:"2.5s",del:"1.5s"},{x:96,y:62,op:0.50,dur:"3.5s",del:"2.2s"},
    {x:340,y:72,op:0.48,dur:"2.8s",del:"0.4s"},{x:588,y:52,op:0.52,dur:"3.2s",del:"1.7s"},
  ];
  return (
    <svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className={className} style={style} aria-hidden="true">
      <defs>
        <style>{`
          @keyframes c2-twinkle { 0%,100%{opacity:1} 50%{opacity:0.06} }
          @keyframes c2-glow    { 0%,100%{opacity:0.022} 50%{opacity:0.052} }
          @keyframes c2-moon    { 0%,100%{opacity:0.38}  50%{opacity:0.55}  }
        `}</style>
        <radialGradient id="c2-vig" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="100%" stopColor="#010410" stopOpacity="0.92"/>
        </radialGradient>
        <radialGradient id="c2-glow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#b0c8f8" stopOpacity="0.20"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
      </defs>

      {/* ── Sky ── */}
      <rect width="700" height="260" fill="#060810"/>
      {[[0,20,"#040608"],[20,30,"#060810"],[50,40,"#070912"],[90,40,"#090c14"],[130,30,"#0b0e18"]].map(([y,h,c],i)=>
        <rect key={i} x={0} y={y as number} width={700} height={h as number} fill={c as string}/>)}

      {/* ── Stars ── */}
      {c2stars.map((s,i)=>(
        <rect key={i} x={s.x} y={s.y} width={2} height={2} fill={i<7?"#e8dfc0":"#2a8870"} opacity={s.op}
          style={{animation:`c2-twinkle ${s.dur} ease-in-out ${s.del} infinite`}}/>
      ))}

      {/* ── Crescent moon ── */}
      <rect x={596} y={22} width={32} height={32} fill="#060810"/>
      <rect x={602} y={28} width={20} height={20} fill="#d4c888" style={{animation:"c2-moon 4s ease-in-out infinite"}} opacity="0.30"/>
      <rect x={604} y={30} width={16} height={16} fill="#d4c888" style={{animation:"c2-moon 4s ease-in-out 0.5s infinite"}} opacity="0.40"/>
      <rect x={606} y={32} width={12} height={12} fill="#cfc080" opacity="0.50"/>
      <rect x={610} y={30} width={12} height={18} fill="#060810"/>
      <rect x={612} y={28} width={10} height={22} fill="#060810"/>

      {/* ── Drifting cloud wisps ── */}
      {[{sx:100,y:32,w:120,dur:"20s",del:"0s"},{sx:400,y:50,w:150,dur:"26s",del:"8s"},{sx:620,y:22,w:130,dur:"22s",del:"4s"}].map((c,i)=>(
        <g key={i}>
          <animateTransform attributeName="transform" type="translate"
            values="0,0; -900,0" keyTimes="0;1" calcMode="linear" dur={c.dur} begin={c.del} repeatCount="indefinite"/>
          <rect x={c.sx} y={c.y}   width={c.w}    height={8} fill="#141c2a" opacity="0.7"/>
          <rect x={c.sx+20} y={c.y+4} width={c.w-40} height={6} fill="#1a2434" opacity="0.5"/>
        </g>
      ))}

      {/* ── Mount Olympus cloud banks ── */}
      {([
        {x:0,   y:138, w:130, h:30}, {x:90,  y:128, w:110, h:40},
        {x:175, y:134, w:140, h:34}, {x:290, y:122, w:120, h:46},
        {x:385, y:130, w:130, h:38}, {x:490, y:116, w:130, h:52},
        {x:598, y:126, w:140, h:42},
      ] as {x:number;y:number;w:number;h:number}[]).map(({x,y,w,h},i)=>(
        <rect key={i} x={x} y={y} width={w} height={h} fill={i%2===0?"#141c2c":"#101828"}/>
      ))}
      {/* Cloud highlights — lighter tops */}
      {([
        {x:10,  y:134, w:110, h:6}, {x:104, y:124, w:90,  h:7},
        {x:190, y:130, w:116, h:6}, {x:306, y:118, w:98,  h:7},
        {x:400, y:126, w:106, h:6}, {x:504, y:112, w:106, h:7},
        {x:614, y:122, w:116, h:6},
      ] as {x:number;y:number;w:number;h:number}[]).map(({x,y,w,h},i)=>(
        <rect key={i} x={x} y={y} width={w} height={h} fill={i%2===0?"#1c2438":"#1a2236"} opacity="0.8"/>
      ))}
      {/* Cloud floor — solid Olympus mist base */}
      <rect x={0} y={158} width={700} height={102} fill="#0c1220"/>
      {Array.from({length:6},(_,i)=><rect key={i} x={0} y={158+i*12} width={700} height={10} fill={i%2===0?"#0e1422":"#0c121e"}/>)}
      {/* Divine silver-blue light shafts breaking through clouds */}
      <rect x={240} y={118} width={44} height={52} fill="#8090c0" opacity="0.018">
        <animate attributeName="opacity" values="0.018;0.040;0.018" dur="4.2s" repeatCount="indefinite"/>
      </rect>
      <rect x={400} y={112} width={54} height={58} fill="#7080b8" opacity="0.014">
        <animate attributeName="opacity" values="0.014;0.032;0.014" dur="5.0s" begin="1.4s" repeatCount="indefinite"/>
      </rect>
      <rect x={320} y={124} width={30} height={44} fill="#9098c8" opacity="0.010">
        <animate attributeName="opacity" values="0.010;0.024;0.010" dur="3.8s" begin="2.2s" repeatCount="indefinite"/>
      </rect>

      {/* ── Divine golden glow left (Hermes) — pulsing ── */}
      <rect x={0} y={0} width={160} height={260} fill="#2a8870" opacity="0.025">
        <animate attributeName="opacity" values="0.025;0.055;0.025" dur="2.8s" repeatCount="indefinite"/>
      </rect>
      {/* ── Divine silver-blue glow right (Athena) — pulsing ── */}
      <rect x={540} y={0} width={160} height={260} fill="#8090c0" opacity="0.022">
        <animate attributeName="opacity" values="0.022;0.048;0.022" dur="3.2s" begin="0.6s" repeatCount="indefinite"/>
      </rect>

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
      <rect x="1" y="1" width="698" height="258" fill="none" stroke="#8090c8" strokeWidth="0.8" strokeOpacity="0.45"/>
    </svg>
  );
}

// ─── Chapter III: The Grey Sisters ────────────────────────────────────────
function ChapterIII({ className, style }: IllustrationProps) {
  // 12s cycle: hold → slow arc → hold → slow arc back
  const D = "12s";

  // Sisters centered around x=350, 40px gap between them
  // Deino: translate(266,30), sprite 64×120 → right-hand side ≈ (324, 118) world
  // Enyo:  translate(434,30) scale(-1,1), visual x=[370,434] → left-hand side ≈ (376, 118) world
  const DX = 324, DY = 118;
  const EX = 376, EY = 118;
  const PX = 350, PY = 74; // arc peak (above the gap)

  // 8 keyTimes: hold-start | hold-end | mid-arc | arrive | hold-end | hold-end | mid-arc-back | arrive-back
  const kT = "0; 0.30; 0.38; 0.45; 0.75; 0.83; 0.90; 1";
  const kS = "0.5,0,0.5,0; 0.3,0,0.7,1; 0.3,0,0.7,1; 0.5,0,0.5,0; 0.3,0,0.7,1; 0.3,0,0.7,1; 0.5,0,0.5,0";

  // Eye: starts with Deino, arcs to Enyo, arcs back
  const eV = `${DX},${DY}; ${DX},${DY}; ${PX},${PY}; ${EX},${EY}; ${EX},${EY}; ${PX},${PY}; ${DX},${DY}; ${DX},${DY}`;
  // Tooth: starts with Enyo, arcs to Deino, arcs back — opposite phase
  const tV = `${EX},${EY+14}; ${EX},${EY+14}; ${PX},${PY+8}; ${DX},${DY+14}; ${DX},${DY+14}; ${PX},${PY+8}; ${EX},${EY+14}; ${EX},${EY+14}`;

  return (
    <svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id="c3-vig" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="100%" stopColor="#060810" stopOpacity="0.93"/>
        </radialGradient>
      </defs>

      {/* ── Overcast sky ── */}
      <rect width="700" height="260" fill="#080c14"/>
      {[[0,40,"#060a10"],[40,60,"#080c16"],[100,60,"#0c1020"]].map(([y,h,c],i)=>
        <rect key={i} x={0} y={y as number} width={700} height={h as number} fill={c as string}/>)}

      {/* ── Cold dim stars ── */}
      {[[50,12],[180,8],[360,16],[580,10],[660,20]].map(([x,y],i)=>(
        <rect key={i} x={x} y={y} width={2} height={2} fill="#8890a8" opacity="0.45"
          style={{animation:`c3-tw ${1.8+i*0.4}s ease-in-out ${i*0.5}s infinite`}}/>
      ))}
      <defs>
        <style>{`@keyframes c3-tw{0%,100%{opacity:0.45}50%{opacity:0.04}} @keyframes c3-mist{0%{transform:translateX(-120px);opacity:0}10%{opacity:0.55}90%{opacity:0.55}100%{transform:translateX(820px);opacity:0}}`}</style>
      </defs>

      {/* ── Distant Atlas peaks ── */}
      {[[0,100,80,60],[40,90,70,70],[80,104,100,56],[220,98,80,62],[460,96,90,64],[600,94,100,66]].map(([x,y,w,h],i)=>
        <rect key={i} x={x as number} y={y as number} width={w as number} height={h as number} fill={i%2===0?"#0e1222":"#101424"}/>)}

      {/* ── Stone ground ── */}
      <rect x={0} y={158} width={700} height={102} fill="#0a0e1a"/>
      {Array.from({length:5},(_,i)=><rect key={i} x={0} y={158+i*14} width={700} height={12} fill={i%2===0?"#0e1220":"#0a0e1c"}/>)}
      {[0,80,160,240,320,400,480,560,640].map(x=><rect key={x} x={x} y={160} width={2} height={14} fill="#060810" opacity="0.6"/>)}
      {[40,120,200,280,360,440,520,600].map(x=><rect key={x} x={x} y={174} width={2} height={14} fill="#060810" opacity="0.6"/>)}
      {[[148,162,32,14],[330,164,40,12],[520,162,28,14]].map(([x,y,w,h],i)=><rect key={i} x={x as number} y={y as number} width={w as number} height={h as number} fill="#141a28"/>)}

      {/* ── Drifting mist bands ── */}
      {[{y:152,h:6,del:"0s"},{y:158,h:5,del:"4s"},{y:146,h:4,del:"9s"}].map((m,i)=>(
        <rect key={i} x={-120} y={m.y} width={200} height={m.h} fill="#0e1830" opacity="0.7"
          style={{animation:`c3-mist ${14+i*3}s linear ${m.del} infinite`}}/>
      ))}
      {[{y:150,h:8,del:"2s"},{y:155,h:6,del:"6s"}].map((m,i)=>(
        <rect key={i} x={-120} y={m.y} width={160} height={m.h} fill="#141e30" opacity="0.5"
          style={{animation:`c3-mist ${18+i*4}s linear ${m.del} infinite`}}/>
      ))}

      {/* Deino — left sister */}
      <g transform="translate(266,30)">
        <Bob amp={3} dur="3.2s" delay="0s"/>
        <FrameAnim base="/Graeae/sister1_deino_frame" pad={0} w={64} h={120} fps={4}/>
      </g>

      {/* Enyo — right sister, flipped to face left */}
      <g transform="translate(434,30) scale(-1,1)">
        <Bob amp={3} dur="3.8s" delay="0.7s"/>
        <FrameAnim base="/Graeae/sister2_enyo_frame" pad={0} w={64} h={120} fps={4}/>
      </g>

      {/* Shared eye — arcs slowly between sisters, Deino→Enyo then back */}
      <g>
        <animateTransform attributeName="transform" type="translate"
          values={eV} keyTimes={kT} calcMode="spline" keySplines={kS}
          dur={D} repeatCount="indefinite"/>
        <g transform="translate(-16,-16)">
          <FrameAnim base="/Graeae/eye_frame" pad={0} w={32} h={32} fps={4}/>
        </g>
      </g>

      {/* Shared tooth — arcs slowly between sisters, Enyo→Deino then back (inverse phase) */}
      <g>
        <animateTransform attributeName="transform" type="translate"
          values={tV} keyTimes={kT} calcMode="spline" keySplines={kS}
          dur={D} repeatCount="indefinite"/>
        <g transform="translate(-12,-18)">
          <FrameAnim base="/Graeae/tooth_frame" pad={0} w={24} h={36} fps={4}/>
        </g>
      </g>

      <rect width="700" height="260" fill="url(#c3-vig)"/>
      <rect x="1" y="1" width="698" height="258" fill="none" stroke="#606878" strokeWidth="0.8" strokeOpacity="0.45"/>
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
          <stop offset="100%" stopColor="#020810" stopOpacity="0.92"/>
        </radialGradient>
      </defs>

      {/* ── Styx underworld cave ── */}
      <rect width="700" height="260" fill="#030408"/>
      {[[0,20,"#060810"],[20,18,"#070912"],[38,16,"#080a0e"],[54,12,"#090b10"]].map(([y,h,c],i)=>
        <rect key={i} x={0} y={y as number} width={700} height={h as number} fill={c as string}/>)}
      <defs><style>{`@keyframes c4-tw{0%,100%{opacity:0.55}50%{opacity:0.08}} @keyframes c4-glow{0%,100%{opacity:0.06}50%{opacity:0.16}} @keyframes c4-mist{0%{transform:translateX(-220px);opacity:0}12%{opacity:0.45}88%{opacity:0.45}100%{transform:translateX(920px);opacity:0}}`}</style></defs>

      {/* ── Stalactites hanging from cave ceiling ── */}
      {([
        {x:10,  w:20, h:40}, {x:55,  w:10, h:26}, {x:105, w:16, h:34},
        {x:160, w:8,  h:20}, {x:205, w:22, h:46}, {x:268, w:12, h:30},
        {x:338, w:18, h:38}, {x:400, w:10, h:24}, {x:450, w:20, h:42},
        {x:508, w:14, h:30}, {x:562, w:8,  h:20}, {x:608, w:18, h:36},
        {x:660, w:12, h:26},
      ] as {x:number;w:number;h:number}[]).map(({x,w,h},i)=>(
        <g key={i}>
          <rect x={x} y={0} width={w} height={h} fill={i%2===0?"#0c0e18":"#0a0c16"}/>
          <rect x={x+Math.floor((w-Math.ceil(w/2))/2)} y={h} width={Math.ceil(w/2)} height={5} fill="#080a12"/>
          <rect x={x+Math.floor((w-Math.ceil(w/4))/2)} y={h+5} width={Math.ceil(w/4)} height={3} fill="#06080e"/>
        </g>
      ))}

      {/* ── Faint cave crystal drips ── */}
      {[[80,50],[215,54],[372,46],[524,52],[652,48]].map(([x,y],i)=>(
        <rect key={i} x={x} y={y} width={2} height={2} fill="#284860" opacity="0.45"
          style={{animation:`c4-tw ${2.2+i*0.4}s ease-in-out ${i*0.55}s infinite`}}/>
      ))}

      {/* ── Stone cave side walls ── */}
      <rect x={0}   y={0} width={46} height={260} fill="#0a0c16"/>
      <rect x={0}   y={0} width={6}  height={260} fill="#0e1018"/>
      <rect x={40}  y={0} width={6}  height={260} fill="#07090d"/>
      {[28,68,110,152,194].map((y,i)=><rect key={i} x={0} y={y} width={46} height={3} fill="#06080c" opacity="0.6"/>)}
      <rect x={654} y={0} width={46} height={260} fill="#0a0c16"/>
      <rect x={694} y={0} width={6}  height={260} fill="#0e1018"/>
      <rect x={654} y={0} width={6}  height={260} fill="#07090d"/>
      {[28,68,110,152,194].map((y,i)=><rect key={i} x={654} y={y} width={46} height={3} fill="#06080c" opacity="0.6"/>)}

      {/* ── Cavern rock formations (mid-ground) ── */}
      {[[70,114,76,48],[216,122,58,40],[452,110,68,52],[582,120,76,42]].map(([x,y,w,h],i)=>(
        <rect key={i} x={x as number} y={y as number} width={w as number} height={h as number} fill={i%2===0?"#0e1018":"#0c0e16"}/>
      ))}

      {/* ── River Styx — dark glowing underground pool ── */}
      <rect x={0} y={148} width={700} height={112} fill="#060c16"/>
      <rect x={0} y={148} width={700} height={8}   fill="#0c1e30">
        <animate attributeName="opacity" values="0.8;1.0;0.8" dur="3s" repeatCount="indefinite"/>
      </rect>
      {Array.from({length:7},(_,n)=>(
        <rect key={n} x={n*104} y={150} width={58} height={2} fill="#102030" opacity="0.9">
          <animate attributeName="opacity" values="0.9;0.3;0.9" dur={`${2.2+n*0.35}s`} begin={`${n*0.22}s`} repeatCount="indefinite"/>
        </rect>
      ))}
      {/* Otherworldly teal-blue glow rising from the Styx */}
      <rect x={0}   y={110} width={700} height={60} fill="#081e30" style={{animation:"c4-glow 3.5s ease-in-out 0s infinite"}}/>
      <rect x={80}  y={118} width={540} height={44} fill="#082828" style={{animation:"c4-glow 4.2s ease-in-out 0.9s infinite"}}/>

      {/* ── Stone riverbanks ── */}
      <rect x={0} y={168} width={700} height={92} fill="#07090e"/>
      {Array.from({length:4},(_,i)=><rect key={i} x={0} y={168+i*14} width={700} height={12} fill={i%2===0?"#0c0e14":"#090b12"}/>)}
      {[[28,170,50,8],[170,168,44,10],[318,172,54,8],[476,170,42,10],[596,168,52,10]].map(([x,y,w,h],i)=>(
        <rect key={i} x={x as number} y={y as number} width={w as number} height={h as number} fill="#10121a"/>
      ))}

      {/* ── Mist rising from the Styx ── */}
      {[{y:144,h:5,del:"0s",dur:"15s"},{y:140,h:4,del:"6s",dur:"19s"},{y:146,h:6,del:"11s",dur:"17s"}].map((m,i)=>(
        <rect key={i} x={-220} y={m.y} width={260} height={m.h} fill="#0e1c2c" opacity="0.5"
          style={{animation:`c4-mist ${m.dur} linear ${m.del} infinite`}}/>
      ))}

      {/* ── Nymph golden glow (right side) ── */}
      <rect x={430} y={50} width={200} height={120} fill="#2a8870" opacity="0.020">
        <animate attributeName="opacity" values="0.020;0.045;0.020" dur="3s" repeatCount="indefinite"/>
      </rect>

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
      <rect x="1" y="1" width="698" height="258" fill="none" stroke="#3a7868" strokeWidth="0.8" strokeOpacity="0.45"/>
    </svg>
  );
}

// ─── Chapter V: The Gorgon's Lair ─────────────────────────────────────────
function ChapterV({ className, style }: IllustrationProps) {
  const D = "14s";
  // 11 keyTimes: 4 sub-slots for one clean slash (0.55–0.60), fast death, long dead hold
  // 0–0.40 sneak | 0.40–0.55 hold | 0.55–0.60 slash (×4 sub-frames)
  // 0.60–0.65 struck | 0.65–0.69 severed | 0.69–0.73 falling | 0.73–1.0 dead
  const kT = "0; 0.40; 0.55; 0.5625; 0.575; 0.5875; 0.60; 0.65; 0.69; 0.73; 1";

  // Sleep: 36×44 native → rendered at 96×96 (same box as death sprites)
  // Death: 56×56 native → rendered at 96×96 — both appear at the same height
  const mW = 96, mH = 96;
  const gW = 96, gH = 128; // Stheno / Euryale
  const imgPx = { style: { imageRendering: "pixelated" as const } };

  return (
    <svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id="c5-vig" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="100%" stopColor="#020601" stopOpacity="0.93"/>
        </radialGradient>
        <radialGradient id="c5-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1e4808" stopOpacity="0.22"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
      </defs>

      {/* ── Void sky ── */}
      <rect width="700" height="260" fill="#040408"/>
      {[[0,60,"#030306"],[60,60,"#040408"],[120,40,"#060608"]].map(([y,h,c],i)=>
        <rect key={i} x={0} y={y as number} width={700} height={h as number} fill={c as string}/>)}

      {/* ── Sickly pale stars ── */}
      <defs><style>{`@keyframes c5-tw{0%,100%{opacity:0.35}50%{opacity:0.05}} @keyframes c5-gfx{0%,100%{opacity:0.018}40%{opacity:0.042}75%{opacity:0.010}} @keyframes c5-drip{0%{transform:translateY(0);opacity:0}10%{opacity:0.8}80%{opacity:0.8}100%{transform:translateY(40px);opacity:0}}`}</style></defs>
      {[[80,14],[210,8],[430,18],[610,12]].map(([x,y],i)=>(
        <rect key={i} x={x} y={y} width={2} height={2} fill="#8888a0" opacity="0.35"
          style={{animation:`c5-tw ${2.1+i*0.4}s ease-in-out ${i*0.7}s infinite`}}/>
      ))}

      {/* ── Jagged rock spires ── */}
      {[[0,80,60,80],[30,68,40,92],[50,76,30,84],[80,84,50,76],[560,72,50,88],[590,60,40,100],[620,78,80,82],[650,66,50,94]].map(([x,y,w,h],i)=>(
        <rect key={i} x={x as number} y={y as number} width={w as number} height={h as number} fill={i%2===0?"#0c0c10":"#0e0e12"}/>
      ))}

      {/* ── Dead trees ── */}
      {[[155,100,4,62],[145,104,14,2],[148,110,10,2],[152,118,6,2]].map(([x,y,w,h],i)=><rect key={`t1${i}`} x={x} y={y} width={w} height={h} fill="#0e0c10"/>)}
      {[[530,96,4,66],[520,100,14,2],[522,106,12,2],[526,114,8,2]].map(([x,y,w,h],i)=><rect key={`t2${i}`} x={x} y={y} width={w} height={h} fill="#0e0c10"/>)}

      {/* ── Stone statues (petrified victims) ── */}
      <rect x={196} y={136} width={14} height={30} fill="#1a1820"/>
      <rect x={200} y={128} width={10} height={12} fill="#1a1820"/>
      <rect x={208} y={130} width={12} height={4}  fill="#1a1820"/>
      <rect x={258} y={144} width={16} height={18} fill="#181620"/>
      <rect x={262} y={138} width={10} height={10} fill="#181620"/>
      <rect x={440} y={134} width={14} height={32} fill="#1a1820"/>
      <rect x={444} y={126} width={10} height={12} fill="#1a1820"/>
      <rect x={452} y={138} width={10} height={4}  fill="#1a1820"/>

      {/* ── Stone ground ── */}
      <rect x={0} y={162} width={700} height={98} fill="#0a0a0e"/>
      {[[162,12,"#0e0e12"],[174,10,"#0c0c10"],[184,12,"#0a0a0e"]].map(([y,h,c],i)=>
        <rect key={i} x={0} y={y as number} width={700} height={h as number} fill={c as string}/>)}
      {[[30,164,40,8],[130,166,50,8],[290,164,60,10],[420,168,40,8],[560,164,55,8]].map(([x,y,w,h],i)=>(
        <rect key={i} x={x as number} y={y as number} width={w as number} height={h as number} fill="#141418"/>
      ))}

      {/* ── Cave entrance (dark archway center) ── */}
      <rect x={300} y={130} width={100} height={34} fill="#060408"/>
      <rect x={310} y={124} width={80}  height={8}  fill="#080608"/>
      <rect x={320} y={120} width={60}  height={6}  fill="#0a080a"/>

      {/* ── Dripping water particles ── */}
      {[{x:185,y:60,del:"0s",dur:"2.8s"},{x:340,y:75,del:"1.2s",dur:"3.4s"},{x:510,y:58,del:"2.1s",dur:"2.6s"}].map((d,i)=>(
        <rect key={i} x={d.x} y={d.y} width={2} height={4} fill="#1a2840" opacity="0"
          style={{animation:`c5-drip ${d.dur} linear ${d.del} infinite`}}/>
      ))}

      {/* ── Eerie olive-green glow from Medusa's direction ── */}
      <rect x={0}   y={60}  width={200} height={110} fill="#1e4808" opacity="0.025"
        style={{animation:"c5-gfx 4s ease-in-out 0s infinite"}}/>
      <rect x={0}   y={80}  width={150} height={90}  fill="#284808" opacity="0.032"
        style={{animation:"c5-gfx 3.2s ease-in-out 1s infinite"}}/>

      <ellipse cx="350" cy="165" rx="220" ry="90" fill="url(#c5-glow)"/>

      {/* Stheno — left, sleeping */}
      <g transform="translate(50,80)">
        <Bob amp={3} dur="6s" delay="0s"/>
        <FrameAnim base="/Gorgons/gorgon_stheno_sleep_" w={gW} h={gH} fps={2}/>
      </g>

      {/* Medusa — center: sleep loop then death sequence, both at mW×mH */}
      <g transform="translate(302,96)">
        {/* Sleeping loop */}
        <g>
          <animate attributeName="opacity" values="1;1;0;0;0;0;0;0;0;0;1"
            keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
          <Bob amp={2} dur="5s" delay="1s"/>
          <FrameAnim base="/Gorgons/gorgon_medusa_sleep_" w={mW} h={mH} fps={2}/>
        </g>
        {/* death_00 — startled (entire slash window) */}
        <image href="/Gorgons/medusa_death_00_sleeping.png" x={0} y={0} width={mW} height={mH} opacity="0" {...imgPx}>
          <animate attributeName="opacity" values="0;0;1;1;1;1;0;0;0;0;0" keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
        </image>
        {/* death_01 — struck */}
        <image href="/Gorgons/medusa_death_01_struck.png" x={0} y={0} width={mW} height={mH} opacity="0" {...imgPx}>
          <animate attributeName="opacity" values="0;0;0;0;0;0;1;0;0;0;0" keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
        </image>
        {/* death_02 — severed */}
        <image href="/Gorgons/medusa_death_02_severed.png" x={0} y={0} width={mW} height={mH} opacity="0" {...imgPx}>
          <animate attributeName="opacity" values="0;0;0;0;0;0;0;1;0;0;0" keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
        </image>
        {/* death_03 — falling (fast: 0.56s) */}
        <image href="/Gorgons/medusa_death_03_falling.png" x={0} y={0} width={mW} height={mH} opacity="0" {...imgPx}>
          <animate attributeName="opacity" values="0;0;0;0;0;0;0;0;1;0;0" keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
        </image>
        {/* death_04 — dead (long hold: 3.78s) */}
        <image href="/Gorgons/medusa_death_04_dead.png" x={0} y={0} width={mW} height={mH} opacity="0" {...imgPx}>
          <animate attributeName="opacity" values="0;0;0;0;0;0;0;0;0;1;0" keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
        </image>
      </g>

      {/* Euryale — right, sleeping */}
      <g transform="translate(530,80)">
        <Bob amp={3} dur="7.5s" delay="2s"/>
        <FrameAnim base="/Gorgons/gorgon_euryale_sleep_" w={gW} h={gH} fps={2}/>
      </g>

      {/* Perseus — Cap of Hades, sneaks in, one slash, vanishes */}
      <g transform="translate(650,20) scale(-1,1)">
        <animateTransform attributeName="transform" type="translate"
          values="0,0; 210,5; 220,5; 220,5; 220,5; 220,5; 220,5; 0,0; 0,0; 0,0; 0,0"
          keyTimes={kT} calcMode="spline"
          keySplines="0.3,0,0.5,1; 0.3,0,0.7,1; 0.5,0,0.5,0; 0.5,0,0.5,0; 0.5,0,0.5,0; 0.5,0,0.5,0; 0.5,0,0.5,0; 0.5,0,0.5,0; 0.5,0,0.5,0; 0.5,0,0.5,0"
          dur={D} repeatCount="indefinite" additive="sum"/>
        {/* Cap of Hades: ghost-faint, solid at slash, vanishes after kill */}
        <animate attributeName="opacity"
          values="0.12; 0.15; 0.42; 0.42; 0.42; 0.42; 0; 0; 0; 0; 0.12"
          keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>

        {/* Sneak — walk-in only, reappears ghost-like at loop restart */}
        <g>
          <animate attributeName="opacity" values="1;1;0;0;0;0;0;0;0;0;1"
            keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
          <FrameAnim base="/Perseus/perseus_sneak_" w={96} h={128} fps={4}/>
        </g>

        {/* Slash — one clean motion: each frame in its own 0.175s sub-slot */}
        {[1,2,3,4].map((frame, i) => {
          const vals = Array.from({length:11}, (_,j) => j === i+2 ? "1" : "0").join(";");
          return (
            <image key={frame} href={`/Perseus/perseus_slash_${String(frame).padStart(2,"0")}.png`}
              x={0} y={0} width={96} height={128} opacity="0" {...imgPx}>
              <animate attributeName="opacity" values={vals} keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
            </image>
          );
        })}
      </g>

      <rect width="700" height="260" fill="url(#c5-vig)"/>
      <rect x="1" y="1" width="698" height="258" fill="none" stroke="#305018" strokeWidth="0.8" strokeOpacity="0.45"/>
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
          <stop offset="100%" stopColor="#020810" stopOpacity="0.92"/>
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

      <rect width="700" height="200" fill="#050c1e"/>
      <rect x="0" y="0"   width="700" height="50"  fill="#040c20"/>
      <rect x="0" y="50"  width="700" height="60"  fill="#061428"/>
      <rect x="0" y="110" width="700" height="60"  fill="#081c34"/>
      <rect x="0" y="170" width="700" height="30"  fill="#0a2040"/>

      {stars.map((s, i) => (
        <rect key={i} x={s.x} y={s.y}
          width={s.dim ? 1 : 2} height={s.dim ? 1 : 2}
          fill={s.gold ? "#a8c0e8" : s.dim ? "#506080" : "#c8d4f0"}
          style={{ animation:`c6-twinkle ${s.dur} ease-in-out ${s.del} infinite`, opacity:s.op }}
        />
      ))}

      <ellipse cx="610" cy="48" rx="58" ry="58" fill="url(#c6-moon)"
        style={{ animation:"c6-moonGlow 4s ease-in-out infinite" }}/>
      <rect x="580" y="18" width="60" height="60" fill="#040c20"/>
      <rect x="586" y="24" width="48" height="48" fill="#cfc478" opacity="0.16"/>
      <rect x="590" y="28" width="40" height="40" fill="#d0c87a" opacity="0.24"/>
      <rect x="594" y="32" width="32" height="32" fill="#cfc472" opacity="0.36"/>
      <rect x="598" y="36" width="24" height="24" fill="#c8be68" opacity="0.50"/>
      <rect x="604" y="28" width="24" height="40" fill="#040c20"/>
      <rect x="606" y="26" width="22" height="44" fill="#040c20"/>

      {windLines.map((w, i) => (
        <rect key={i} x={0} y={w.y} width={w.w} height={1}
          fill="#5090c8"
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
        <g transform="translate(-84,0)" opacity={0.08}>
          <FrameAnim base="/Perseus/perseus_flight_" w={96} h={128} fps={8}/>
        </g>
        <g transform="translate(-44,0)" opacity={0.20}>
          <FrameAnim base="/Perseus/perseus_flight_" w={96} h={128} fps={8}/>
        </g>
        <FrameAnim base="/Perseus/perseus_flight_" w={96} h={128} fps={8}/>
      </g>

      <rect x="0" y="198" width="700" height="62" fill="#050e20"/>
      <rect x="0" y="198" width="700" height="8"  fill="#071228"/>

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

      <rect width="700" height="260" fill="url(#c6-vig)"/>
      <rect x="1" y="1" width="698" height="258" fill="none" stroke="#184898" strokeWidth="0.8" strokeOpacity="0.45"/>
    </svg>
  );
}

// ─── Chapter VII: Andromeda ───────────────────────────────────────────────
function ChapterVII({ className, style }: IllustrationProps) {
  // 12s cycle:
  //   0–0.35  Cetus glides menacingly from right toward Andromeda; Perseus off-screen
  //   0.35–0.50  Cetus looms near Andromeda; Perseus swoops in from upper-right
  //   0.50–0.55  Perseus arrives at fight position (ready)
  //   0.55–0.60  Perseus windup
  //   0.60–0.65  Perseus STRIKE → Cetus STRUCK
  //   0.65–0.73  Perseus extend → Cetus slack
  //   0.73–0.82  Perseus recover → Cetus drooping
  //   0.82–0.88  Perseus backs off → Cetus falling
  //   0.88–0.93  Cetus fallen; Perseus retreats off-screen right
  //   0.93–1.00  Reset window: Cetus group invisible while it snaps back to start
  const D = "12s";
  const kT = "0; 0.35; 0.50; 0.55; 0.60; 0.65; 0.73; 0.82; 0.88; 0.93; 1";
  // 11 keyTimes → 10 spline segments

  // ── Cetus (native 40×72, rendered 2× = 80×144) ─────────────────────────
  // Water surface at y=148. Cetus at y=80: bottom at 224, so ~47% submerged below surface.
  // Starts off-screen right (620,80), glides to fight position (220,80).
  // Visual at fight: x=[220,300], y=[80,224] — 24px gap from Andromeda right edge (196)
  // Group invisible at index 9 (0.93→1.0) to hide the snap-back teleport
  const cTXY = "620,80; 220,80; 220,80; 220,80; 220,80; 220,80; 220,80; 220,80; 220,80; 620,80; 620,80";
  const cTKS = "0.5,0,0.8,1; 0.5,0,0.5,0; 0.5,0,0.5,0; 0.5,0,0.5,0; 0.5,0,0.5,0; 0.5,0,0.5,0; 0.5,0,0.5,0; 0.5,0,0.5,0; 0.5,0,0.5,0; 0.8,0,1,1";
  const cGOp = "1;1;1;1;1;1;1;1;0;0;1"; // invisible at 8-9 to hide snap-back (no slide)

  // Cetus frame sequences — 11 values, index i applies kT[i]→kT[i+1]
  const cAlive    = "1;1;1;1;0;0;0;0;0;0;1";
  const cStruck   = "0;0;0;0;1;0;0;0;0;0;0";
  const cSlack    = "0;0;0;0;0;1;0;0;0;0;0";
  const cDropping = "0;0;0;0;0;0;1;0;0;0;0";
  const cFalling  = "0;0;0;0;0;0;0;1;0;0;0";
  const cFallen   = "0;0;0;0;0;0;0;0;1;0;0";

  // ── Perseus (native 24×32, rendered 4× = 96×128) ───────────────────────
  // Off-screen upper-right (800,0), swoops to translate(400,20) + inner scale(-1,1)
  // At fight position: visual x=[304,400], y=[20,148]; sword arm hits Cetus right edge (~x=300)
  const pXY = "800,0; 800,0; 370,20; 365,18; 370,20; 375,22; 370,20; 370,20; 800,0; 800,0; 800,0";
  const pKS = "0.42,0,0.58,1; 0.2,0,0.5,1; 0.5,0,0.5,0; 0.3,0,0.5,1; 0.4,0,0.6,1; 0.4,0,0.6,1; 0.5,0,0.5,0; 0.42,0,0.58,1; 0.42,0,0.58,1; 0.42,0,0.58,1";
  const pGOp = "1;1;1;1;1;1;1;0;1;1;1"; // invisible at index 7 during snap-back (no slide)

  // Perseus slay frame sequences — 11 values
  const pReady   = "1;1;1;0;0;0;0;1;1;1;1";
  const pWindup  = "0;0;0;1;0;0;0;0;0;0;0";
  const pStrike  = "0;0;0;0;1;0;0;0;0;0;0";
  const pExtend  = "0;0;0;0;0;1;0;0;0;0;0";
  const pRecover = "0;0;0;0;0;0;1;0;0;0;0";

  const px = { style: { imageRendering: "pixelated" as const } };
  const cW = 80, cH = 144;
  const pW = 72, pH = 96;

  // Water surface y-coordinate (Cetus y=80, height=144 → bottom at 224; surface at 148 → 47% submerged)
  const WY = 148;

  return (
    <svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id="c7-vig" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="100%" stopColor="#010818" stopOpacity="0.93"/>
        </radialGradient>
      </defs>

      {/* ── Stormy night sky ── */}
      <rect width="700" height={WY} fill="#06080e"/>
      {[[0,40,"#040608"],[40,80,"#060810"],[120,60,"#08090e"]].map(([y,h,c],i)=>
        <rect key={i} x={0} y={y as number} width={700} height={h as number} fill={c as string}/>)}

      {/* ── Few twinkling stars ── */}
      <defs><style>{`@keyframes c7-tw{0%,100%{opacity:0.70}50%{opacity:0.08}} @keyframes c7-lgtn{0%,8%,100%{opacity:0}3%{opacity:0.22}5%{opacity:0.08}6%{opacity:0.18}}`}</style></defs>
      {[[80,12],[220,8],[380,16],[540,10],[640,20]].map(([x,y],i)=>(
        <rect key={i} x={x} y={y} width={2} height={2} fill="#d8d4b8" opacity="0.70"
          style={{animation:`c7-tw ${2+i*0.4}s ease-in-out ${i*0.6}s infinite`}}/>
      ))}

      {/* ── Heavy storm clouds ── */}
      {[{x:0,y:8,w:200,h:24},{x:160,y:4,w:180,h:28},{x:320,y:10,w:220,h:22},{x:500,y:6,w:200,h:26}].map((c,i)=>(
        <g key={i}>
          <animateTransform attributeName="transform" type="translate"
            values="0,0; -15,0; 0,0" keyTimes="0;0.5;1" calcMode="spline"
            keySplines="0.42,0,0.58,1;0.42,0,0.58,1" dur={`${18+i*4}s`} begin={`${i*3}s`} repeatCount="indefinite"/>
          <rect x={c.x} y={c.y} width={c.w} height={c.h} fill="#0e1020" opacity="0.85"/>
          <rect x={c.x+10} y={c.y+4} width={c.w-20} height={c.h-8} fill="#141826" opacity="0.6"/>
        </g>
      ))}

      {/* ── Lightning flash (repeating) ── */}
      <rect x={0} y={0} width={700} height={WY} fill="#a0b8d0" opacity="0"
        style={{animation:"c7-lgtn 8s ease-in-out 2s infinite"}}/>
      <rect x={340} y={20} width={4} height={80} fill="#c8d8e8" opacity="0"
        style={{animation:"c7-lgtn 8s ease-in-out 2s infinite"}}/>
      <rect x={342} y={30} width={3} height={60} fill="#e0ecf8" opacity="0"
        style={{animation:"c7-lgtn 8s ease-in-out 2.05s infinite"}}/>

      {/* ── Rocky sea cliff (left) ── */}
      <rect x={0} y={0} width={80} height={260} fill="#141020"/>
      <rect x={0} y={0} width={6}  height={260} fill="#1c1828"/>
      <rect x={60} y={0} width={8} height={260} fill="#0e0c18"/>
      {[60,90,120,150,180].map(y=><rect key={y} x={0} y={y} width={80} height={4} fill="#0e0c1a"/>)}
      {/* Chains */}
      <rect x={64} y={40} width={8} height={4} fill="#888078"/>
      <rect x={66} y={44} width={4} height={12} fill="#8a8278"/>
      <rect x={64} y={80} width={8} height={4} fill="#888078"/>
      <rect x={66} y={84} width={4} height={12} fill="#8a8278"/>

      {/* ── Right cliff wall ── */}
      <rect x={640} y={0} width={60}  height={260} fill="#14101e"/>
      <rect x={692} y={0} width={8}   height={260} fill="#1c1826"/>
      <rect x={640} y={0} width={6}   height={260} fill="#100e1a"/>

      {/* ── 8-bit ocean body (renders behind Cetus and Andromeda) ──────────── */}
      {/* Static deep-water fill — layered dark navy bands for depth */}
      <rect x={0} y={WY}    width={700} height={6}   fill="#16304e"/>
      <rect x={0} y={WY+6}  width={700} height={10}  fill="#112840"/>
      <rect x={0} y={WY+16} width={700} height={16}  fill="#0e2036"/>
      <rect x={0} y={WY+32} width={700} height={20}  fill="#0b1a2c"/>
      <rect x={0} y={WY+52} width={700} height={110} fill="#07101e"/>

      {/* Scrolling wave crests — fastest layer, tile=100, dur=3s */}
      {/* Bright pixel foam highlights on the water surface */}
      <g>
        <animateTransform attributeName="transform" type="translate"
          values="0,0; -100,0" keyTimes="0; 1" calcMode="linear" dur="3s" repeatCount="indefinite"/>
        {Array.from({length:10}, (_, n) => (
          <React.Fragment key={n}>
            <rect x={n*100}    y={WY-2} width={28} height={2} fill="#2e608a"/>
            <rect x={n*100+10} y={WY-4} width={10} height={2} fill="#3a6e8c" opacity="0.8"/>
            <rect x={n*100}    y={WY}   width={36} height={2} fill="#1e4868"/>
            <rect x={n*100+52} y={WY-2} width={22} height={2} fill="#285c80"/>
            <rect x={n*100+60} y={WY-4} width={8}  height={2} fill="#326878" opacity="0.7"/>
            <rect x={n*100+52} y={WY}   width={30} height={2} fill="#1c4464"/>
          </React.Fragment>
        ))}
      </g>

      {/* Scrolling mid-waves — medium layer, tile=120, dur=5.2s */}
      <g>
        <animateTransform attributeName="transform" type="translate"
          values="0,0; -120,0" keyTimes="0; 1" calcMode="linear" dur="5.2s" repeatCount="indefinite"/>
        {Array.from({length:9}, (_, n) => (
          <React.Fragment key={n}>
            <rect x={n*120}    y={WY+4} width={44} height={2} fill="#1a3c5c"/>
            <rect x={n*120+55} y={WY+4} width={34} height={2} fill="#183659"/>
            <rect x={n*120+20} y={WY+8} width={52} height={2} fill="#142e4a"/>
            <rect x={n*120+85} y={WY+8} width={24} height={2} fill="#122a46"/>
          </React.Fragment>
        ))}
      </g>

      {/* Scrolling deep swell — slow layer, tile=160, dur=9s */}
      <g>
        <animateTransform attributeName="transform" type="translate"
          values="0,0; -160,0" keyTimes="0; 1" calcMode="linear" dur="9s" repeatCount="indefinite"/>
        {Array.from({length:6}, (_, n) => (
          <React.Fragment key={n}>
            <rect x={n*160+8}  y={WY+14} width={70} height={2} fill="#102038"/>
            <rect x={n*160+95} y={WY+18} width={48} height={2} fill="#0e1c32"/>
            <rect x={n*160+40} y={WY+22} width={55} height={2} fill="#0c1a2e"/>
          </React.Fragment>
        ))}
      </g>

      {/* Andromeda — strained upward, then falls back (chained) */}
      <g transform="translate(100,15)">
        <animateTransform attributeName="transform" type="translate"
          values="0,0; 0,-10; 0,-2; 0,-10; 0,0"
          keyTimes="0; 0.3; 0.5; 0.7; 1"
          calcMode="spline" keySplines="0.42,0,0.58,1; 0.42,0,0.58,1; 0.42,0,0.58,1; 0.42,0,0.58,1"
          dur="2.0s" repeatCount="indefinite" additive="sum"/>
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
        <FrameAnim base="/Andromeda/andromeda_chained_" count={2} w={96} h={128} fps={2}/>
      </g>

      {/* Cetus — glides in from right, looms near Andromeda, then dies frame-by-frame */}
      <g>
        <animateTransform attributeName="transform" type="translate"
          values={cTXY} keyTimes={kT} calcMode="spline" keySplines={cTKS}
          dur={D} repeatCount="indefinite"/>
        <animate attributeName="opacity" values={cGOp} keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
        <Bob amp={3} dur="2.6s" delay="0.5s"/>
        <image href="/Cetus/cetus_00_alive.png"    x={0} y={0} width={cW} height={cH} {...px}>
          <animate attributeName="opacity" values={cAlive}    keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
        </image>
        <image href="/Cetus/cetus_01_struck.png"   x={0} y={0} width={cW} height={cH} opacity="0" {...px}>
          <animate attributeName="opacity" values={cStruck}   keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
        </image>
        <image href="/Cetus/cetus_02_slack.png"    x={0} y={0} width={cW} height={cH} opacity="0" {...px}>
          <animate attributeName="opacity" values={cSlack}    keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
        </image>
        <image href="/Cetus/cetus_03_drooping.png" x={0} y={0} width={cW} height={cH} opacity="0" {...px}>
          <animate attributeName="opacity" values={cDropping} keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
        </image>
        <image href="/Cetus/cetus_04_falling.png"  x={0} y={0} width={cW} height={cH} opacity="0" {...px}>
          <animate attributeName="opacity" values={cFalling}  keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
        </image>
        <image href="/Cetus/cetus_05_fallen.png"   x={0} y={0} width={cW} height={cH} opacity="0" {...px}>
          <animate attributeName="opacity" values={cFallen}   keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
        </image>
      </g>

      {/* Perseus — swoops in from upper-right, slay sequence, then pops back off-screen */}
      <g>
        <animateTransform attributeName="transform" type="translate"
          values={pXY} keyTimes={kT} calcMode="spline" keySplines={pKS}
          dur={D} repeatCount="indefinite"/>
        <animate attributeName="opacity" values={pGOp} keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
        <g transform="scale(-1,1)">
          <image href="/Perseus/perseus_slay_00_ready.png"   x={0} y={0} width={pW} height={pH} {...px}>
            <animate attributeName="opacity" values={pReady}   keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
          </image>
          <image href="/Perseus/perseus_slay_01_windup.png"  x={0} y={0} width={pW} height={pH} opacity="0" {...px}>
            <animate attributeName="opacity" values={pWindup}  keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
          </image>
          <image href="/Perseus/perseus_slay_02_strike.png"  x={0} y={0} width={pW} height={pH} opacity="0" {...px}>
            <animate attributeName="opacity" values={pStrike}  keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
          </image>
          <image href="/Perseus/perseus_slay_03_extend.png"  x={0} y={0} width={pW} height={pH} opacity="0" {...px}>
            <animate attributeName="opacity" values={pExtend}  keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
          </image>
          <image href="/Perseus/perseus_slay_04_recover.png" x={0} y={0} width={pW} height={pH} opacity="0" {...px}>
            <animate attributeName="opacity" values={pRecover} keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
          </image>
        </g>
      </g>

      {/* ── Water surface overlay — renders ON TOP of Cetus lower body ─────── */}
      {/* Semi-transparent so Cetus is still vaguely visible beneath the waves */}
      <rect x={0} y={WY}    width={700} height={12}  fill="#102030" opacity="0.78"/>
      <rect x={0} y={WY+12} width={700} height={12}  fill="#0c1828" opacity="0.70"/>
      <rect x={0} y={WY+24} width={700} height={110} fill="#07101e" opacity="0.82"/>
      {/* Surface shimmer strip (same scrolling wave crests, now over Cetus) */}
      <g>
        <animateTransform attributeName="transform" type="translate"
          values="0,0; -100,0" keyTimes="0; 1" calcMode="linear" dur="3s" repeatCount="indefinite"/>
        {Array.from({length:10}, (_, n) => (
          <React.Fragment key={n}>
            <rect x={n*100}    y={WY-2} width={28} height={2} fill="#2e608a" opacity="0.9"/>
            <rect x={n*100+10} y={WY-4} width={10} height={2} fill="#3a6e8c" opacity="0.7"/>
            <rect x={n*100}    y={WY}   width={36} height={2} fill="#1e4868" opacity="0.85"/>
            <rect x={n*100+52} y={WY-2} width={22} height={2} fill="#285c80" opacity="0.9"/>
            <rect x={n*100+60} y={WY-4} width={8}  height={2} fill="#326878" opacity="0.65"/>
            <rect x={n*100+52} y={WY}   width={30} height={2} fill="#1c4464" opacity="0.85"/>
          </React.Fragment>
        ))}
      </g>

      <rect width="700" height="260" fill="url(#c7-vig)"/>
      <rect x="1" y="1" width="698" height="258" fill="none" stroke="#4878a8" strokeWidth="0.8" strokeOpacity="0.45"/>
    </svg>
  );
}

// ─── Chapter VIII: Return to Seriphos ─────────────────────────────────────
function ChapterVIII({ className, style }: IllustrationProps) {
  const D = "6s";
  // 0–0.75s (0–0.125): both idle | 0.75–4.5s (0.125–0.625): pull+stone frames 01–05 (5×0.75s) | 4.5–6s (0.625–1): 1.5s hold then loop snap
  const kT = "0; 0.125; 0.225; 0.325; 0.425; 0.525; 0.625; 1";
  return (
    <svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id="c8-vig" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="100%" stopColor="#080808" stopOpacity="0.93"/>
        </radialGradient>
        <radialGradient id="c8-bag" cx="30%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#880808" stopOpacity="0.30"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
      </defs>

      {/* ── Stone back wall ── */}
      <defs><style>{`@keyframes c8-flame{0%,100%{opacity:1}28%{opacity:0.50}62%{opacity:0.92}82%{opacity:0.48}} @keyframes c8-glow{0%,100%{opacity:0.10}50%{opacity:0.20}}`}</style></defs>
      <rect width="700" height="215" fill="#0e0c1c"/>
      {Array.from({length:15},(_,i)=><rect key={i} x={0} y={i*14} width={700} height={12} fill={i%2===0?"#141226":"#181630"}/>)}
      {[0,90,180,270,360,450,540,630].map(x=><rect key={x} x={x} y={0} width={2} height={210} fill="#08061a" opacity="0.45"/>)}
      {[45,135,225,315,405,495,585].map(x=>Array.from({length:8},(_,i)=><rect key={`${x}${i}`} x={x} y={i*28} width={2} height={12} fill="#08061a" opacity="0.4"/>))}

      {/* ── Columns ── */}
      <rect x={0}   y={0} width={48}  height={215} fill="#1c1830"/>
      <rect x={0}   y={0} width={4}   height={215} fill="#26223a"/>
      <rect x={44}  y={0} width={4}   height={215} fill="#0e0c1c"/>
      <rect x={652} y={0} width={48}  height={215} fill="#1c1830"/>
      <rect x={652} y={0} width={4}   height={215} fill="#0e0c1c"/>
      <rect x={694} y={0} width={6}   height={215} fill="#26223a"/>

      {/* ── Throne dais (right side) ── */}
      <rect x={480} y={178} width={160} height={8}  fill="#1e1a2e"/>
      <rect x={480} y={186} width={160} height={30} fill="#241e38"/>
      <rect x={530} y={90}  width={80}  height={100} fill="#1a1630"/>
      <rect x={540} y={85}  width={60}  height={12}  fill="#201c38"/>
      <rect x={548} y={80}  width={44}  height={8}   fill="#28223e"/>
      <rect x={534} y={170} width={72}  height={10}  fill="#241e3c"/>

      {/* ── Floor ── */}
      <rect x={0} y={215} width={700} height={45} fill="#100e20"/>
      {Array.from({length:3},(_,i)=><rect key={i} x={0} y={216+i*14} width={700} height={12} fill={i%2===0?"#181428":"#141028"}/>)}
      {[0,80,160,240,320,400,480,560,640].map(x=><rect key={x} x={x} y={215} width={2} height={45} fill="#06041a" opacity="0.5"/>)}

      {/* ── Left torch ── */}
      <rect x={22} y={82} width={4} height={133} fill="#1c1828"/>
      <rect x={18} y={76} width={12} height={8}  fill="#382a10"/>
      <g style={{animation:"c8-flame 0.48s ease-in-out 0s infinite"}}>
        <rect x={16} y={46} width={12} height={32} fill="#a02408"/>
        <rect x={18} y={46} width={8}  height={26} fill="#c84010"/>
        <rect x={19} y={46} width={6}  height={18} fill="#d87018"/>
        <rect x={20} y={46} width={4}  height={12} fill="#e09828"/>
      </g>
      <rect x={0} y={32} width={72} height={140} fill="#a03010" style={{animation:"c8-glow 0.72s ease-in-out 0s infinite"}}/>

      {/* ── Right torch ── */}
      <rect x={674} y={82} width={4} height={133} fill="#1c1828"/>
      <rect x={670} y={76} width={12} height={8}  fill="#382a10"/>
      <g style={{animation:"c8-flame 0.48s ease-in-out 0.24s infinite"}}>
        <rect x={670} y={46} width={12} height={32} fill="#a02408"/>
        <rect x={672} y={46} width={8}  height={26} fill="#c84010"/>
        <rect x={673} y={46} width={6}  height={18} fill="#d87018"/>
        <rect x={674} y={46} width={4}  height={12} fill="#e09828"/>
      </g>
      <rect x={628} y={32} width={72} height={140} fill="#a03010" style={{animation:"c8-glow 0.72s ease-in-out 0.28s infinite"}}/>

      {/* ── Medusa glow (left side, pulsing — garnet red) ── */}
      <rect x={60} y={60} width={160} height={160} fill="#880808" opacity="0.022">
        <animate attributeName="opacity" values="0.022;0.050;0.022" dur="2.6s" repeatCount="indefinite"/>
      </rect>
      <rect x={80} y={80} width={120} height={140} fill="#880808" opacity="0.028">
        <animate attributeName="opacity" values="0.028;0.058;0.028" dur="3.0s" begin="0.5s" repeatCount="indefinite"/>
      </rect>

      <ellipse cx="164" cy="120" rx="130" ry="110" fill="url(#c8-bag)"/>

      {/* Perseus — idle then pulls out Medusa's head in sync with Polydectes turning stone */}
      <g transform="translate(50,20)">
        {/* Idle (0–0.75s at loop start only; snaps back simultaneously with Polydectes at loop restart) */}
        <g>
          <animate attributeName="opacity" values="1;0;0;0;0;0;0;0" keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
          <FrameAnim base="/Perseus/perseus_idle_all_" frames={[1,2,4]} w={96} h={128} fps={6}/>
        </g>
        {/* Pull head frames 01–05 — each 0.75s, synced with Polydectes stone frames */}
        {(["01","02","03","04","05"] as const).map((f, i) => {
          const v = Array(8).fill("0"); v[i + 1] = "1";
          return (
            <image key={f} href={`/Perseus/perseus_pull_head_${f}.png`}
              x={0} y={0} width={96} height={128} opacity="0" style={{imageRendering:"pixelated"}}>
              <animate attributeName="opacity" values={v.join(";")} keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
            </image>
          );
        })}
        {/* Pull head 05 held until loop end — snaps to idle simultaneously with Polydectes */}
        <image href="/Perseus/perseus_pull_head_05.png" x={0} y={0} width={96} height={128} opacity="0" style={{imageRendering:"pixelated"}}>
          <animate attributeName="opacity" values="0;0;0;0;0;0;1;1" keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
        </image>
      </g>

      {/* Polydectes — synced with Perseus: idle → stone frames 01–05 → stone held until loop snap */}
      <g transform="translate(650,20) scale(-1,1)">
        {/* Idle (0–0.75s at loop start only; snaps back simultaneously with Perseus at loop restart) */}
        <g>
          <animate attributeName="opacity" values="1;0;0;0;0;0;0;0" keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
          <FrameAnim base="/Polydectes/polydectes_idle_" w={96} h={128} fps={6}/>
        </g>
        {/* Stone frames 01–05 — each 0.75s, synced with Perseus pull frames */}
        {(["01","02","03","04","05"] as const).map((f, i) => {
          const v = Array(8).fill("0"); v[i + 1] = "1";
          return (
            <image key={f} href={`/Polydectes/polydectes_stone_${f}.png`}
              x={0} y={0} width={96} height={128} opacity="0" style={{imageRendering:"pixelated"}}>
              <animate attributeName="opacity" values={v.join(";")} keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
            </image>
          );
        })}
        {/* Stone 05 held until loop end — snaps to idle simultaneously with Perseus */}
        <image href="/Polydectes/polydectes_stone_05.png" x={0} y={0} width={96} height={128} opacity="0" style={{imageRendering:"pixelated"}}>
          <animate attributeName="opacity" values="0;0;0;0;0;0;1;1" keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
        </image>
      </g>

      <rect width="700" height="260" fill="url(#c8-vig)"/>
      <rect x="1" y="1" width="698" height="258" fill="none" stroke="#787068" strokeWidth="0.8" strokeOpacity="0.45"/>
    </svg>
  );
}

// ─── Chapter IX: Endings ──────────────────────────────────────────────────
function ChapterIX({ className, style }: IllustrationProps) {
  const D = "7s";
  // 10 segments — flying segs compressed to ~0.28s each for a snappy throw
  // seg 0  (0→0.13):  ready        — discus still in hand, Acrisius alive
  // seg 1  (0.13→0.20): windup     — discus still in hand, Acrisius alive
  // seg 2  (0.20→0.24): release    — discus pos A (just left hand), shocked
  // seg 3  (0.24→0.28): followthr  — discus pos B (1/4 arc), shocked
  // seg 4  (0.28→0.32): followthr  — discus pos C (mid arc, peak), shocked
  // seg 5  (0.32→0.36): followthr  — discus pos D (3/4 arc), shocked
  // seg 6  (0.36→0.40): followthr  — discus pos E (near Acrisius), struck
  // seg 7  (0.40→0.50): —          — Acrisius falling
  // seg 8  (0.50→0.60): —          — Acrisius falling
  // seg 9  (0.60→1.0):  —          — Acrisius dead (hold ~2.8s)
  const kT = "0; 0.13; 0.20; 0.24; 0.28; 0.32; 0.36; 0.40; 0.50; 0.60; 1.0";
  // Discus arc: starts tight to Perseus's hand, arcs across to Acrisius
  const discusArc = [
    { x: 130, y: 100 }, // A — just left hand
    { x: 225, y: 78  }, // B — rising
    { x: 330, y: 60  }, // C — peak
    { x: 435, y: 75  }, // D — descending
    { x: 525, y: 95  }, // E — arriving at Acrisius
  ];
  // values for each flying position (visible in segs 2–6 respectively)
  const flyingVals = [
    "0;0;1;0;0;0;0;0;0;0;0", // A
    "0;0;0;1;0;0;0;0;0;0;0", // B
    "0;0;0;0;1;0;0;0;0;0;0", // C
    "0;0;0;0;0;1;0;0;0;0;0", // D
    "0;0;0;0;0;0;1;0;0;0;0", // E
  ];
  return (
    <svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id="c9-vig" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="100%" stopColor="#0e0404" stopOpacity="0.92"/>
        </radialGradient>
      </defs>

      {/* ── Arena background ── */}
      <rect width="700" height="260" fill="#120808"/>
      <rect x={0} y={0} width={700} height={140} fill="#1a0808"/>
      <rect x={0} y={0} width={700} height={55} fill="#220c0c"/>
      <rect x={0} y={80} width={700} height={80} fill="#1c1010"/>
      {[0,80,160,240,320,400,480,560,640].map(x => (
        <rect key={x} x={x} y={80} width={2} height={80} fill="#0e0606" opacity="0.5"/>
      ))}
      <rect x={0} y={157} width={700} height={5} fill="#100808" opacity="0.6"/>
      <rect x={0} y={195} width={700} height={65} fill="#201010"/>
      {Array.from({length:4},(_,i) => (
        <rect key={i} x={0} y={195+i*16} width={700} height={14} fill={i%2===0?"#221212":"#1c1010"}/>
      ))}
      {[0,100,200,300,400,500,600].map(x => (
        <rect key={x} x={x} y={195} width={2} height={65} fill="#120808" opacity="0.4"/>
      ))}

      {/* ── Blood glow blooms on strike, fades as Acrisius dies ── */}
      <rect x={380} y={0} width={320} height={260} fill="#901010" opacity="0">
        <animate attributeName="opacity"
          values="0;0;0;0;0;0;0.04;0.03;0.018;0;0"
          keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
      </rect>

      {/* ── Perseus — left side ── */}
      <g transform="translate(50,67)">
        <image href="/Perseus/perseus_discus_ready.png"
          x={0} y={0} width={96} height={128} opacity="1"
          style={{imageRendering:"pixelated"}}>
          <animate attributeName="opacity" values="1;0;0;0;0;0;0;0;0;0;1"
            keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
        </image>
        <image href="/Perseus/perseus_discus_windup.png"
          x={0} y={0} width={96} height={128} opacity="0"
          style={{imageRendering:"pixelated"}}>
          <animate attributeName="opacity" values="0;1;0;0;0;0;0;0;0;0;0"
            keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
        </image>
        <image href="/Perseus/perseus_discus_release.png"
          x={0} y={0} width={96} height={128} opacity="0"
          style={{imageRendering:"pixelated"}}>
          <animate attributeName="opacity" values="0;0;1;0;0;0;0;0;0;0;0"
            keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
        </image>
        <image href="/Perseus/perseus_discus_followthrough.png"
          x={0} y={0} width={96} height={128} opacity="0"
          style={{imageRendering:"pixelated"}}>
          <animate attributeName="opacity" values="0;0;0;1;1;1;1;1;1;1;0"
            keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
        </image>
      </g>

      {/* ── Discus — resting in hand (segs 0–1) ── */}
      <image href="/Acrisius/discus_still.png"
        x={105} y={105} width={28} height={28} opacity="1"
        style={{imageRendering:"pixelated"}}>
        <animate attributeName="opacity" values="1;1;0;0;0;0;0;0;0;0;1"
          keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
      </image>

      {/* ── Discus — 5-position arc across the arena (segs 2–6) ── */}
      {discusArc.map((pos, i) => (
        <image key={i} href="/Acrisius/discus_flying.png"
          x={pos.x} y={pos.y} width={28} height={28} opacity="0"
          style={{imageRendering:"pixelated"}}>
          <animate attributeName="opacity" values={flyingVals[i]}
            keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
        </image>
      ))}

      {/* ── Acrisius — right side, flipped to face Perseus ── */}
      {/* preserveAspectRatio="xMidYMax meet" anchors all sprites to the same baseline */}
      <g transform="translate(654,67) scale(-1,1)">
        <image href="/Acrisius/acrisius_alive.png"
          x={0} y={0} width={96} height={128} opacity="1"
          preserveAspectRatio="xMidYMax meet"
          style={{imageRendering:"pixelated"}}>
          <animate attributeName="opacity" values="1;1;0;0;0;0;0;0;0;0;1"
            keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
        </image>
        <image href="/Acrisius/acrisius_shocked.png"
          x={0} y={0} width={96} height={128} opacity="0"
          preserveAspectRatio="xMidYMax meet"
          style={{imageRendering:"pixelated"}}>
          <animate attributeName="opacity" values="0;0;1;1;1;1;0;0;0;0;0"
            keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
        </image>
        <image href="/Acrisius/acrisius_struck.png"
          x={0} y={0} width={96} height={128} opacity="0"
          preserveAspectRatio="xMidYMax meet"
          style={{imageRendering:"pixelated"}}>
          <animate attributeName="opacity" values="0;0;0;0;0;0;1;0;0;0;0"
            keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
        </image>
        <image href="/Acrisius/acrisius_falling.png"
          x={0} y={0} width={96} height={128} opacity="0"
          preserveAspectRatio="xMidYMax meet"
          style={{imageRendering:"pixelated"}}>
          <animate attributeName="opacity" values="0;0;0;0;0;0;0;1;1;0;0"
            keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
        </image>
        <image href="/Acrisius/acrisius_dead.png"
          x={0} y={0} width={96} height={128} opacity="0"
          preserveAspectRatio="xMidYMax meet"
          style={{imageRendering:"pixelated"}}>
          <animate attributeName="opacity" values="0;0;0;0;0;0;0;0;0;1;0"
            keyTimes={kT} calcMode="discrete" dur={D} repeatCount="indefinite"/>
        </image>
      </g>

      {/* ── Vignette + border ── */}
      <rect width="700" height="260" fill="url(#c9-vig)"/>
      <rect x="1" y="1" width="698" height="258" fill="none" stroke="#901818" strokeWidth="0.8" strokeOpacity="0.45"/>
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
