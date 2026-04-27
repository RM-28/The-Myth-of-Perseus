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

// ─── Chapter I: The Feast of Polydectes ───────────────────────────────────
function ChapterI({ className, style }: IllustrationProps) {
  const vr = mkVr(4);
  const SK="#d49060",SK2="#b07848",EY="#18101e";
  const BR="#b87832",BH="#d4a450";
  const TN="#dcd4a4",BL="#7a5028",LT="#5a3c22";
  const CP="#c41818",CD="#8a1010",PL="#700c0c";
  const WH="#e8e8f8",GD="#d4a428",PP="#7030b0",PD="#501890",GR="#908880";

  const perseus: PR[] = [
    vr(0,0,5,2,PL),
    vr(3,0,8,2,BH), vr(2,1,10,3,BR), vr(2,4,2,5,BR),
    vr(4,1,6,7,SK), vr(8,3,1,1,EY), vr(9,5,1,2,SK),
    vr(5,8,4,2,SK),
    vr(0,4,2,22,CP), vr(0,26,2,3,CD),
    vr(3,10,8,9,TN), vr(3,16,8,2,BL),
    vr(1,10,2,8,SK), vr(11,10,2,8,TN),
    vr(4,19,2,9,SK), vr(8,19,2,9,SK),
    vr(3,28,3,2,LT), vr(7,28,3,2,LT),
    vr(2,25,2,3,WH), vr(10,25,2,3,WH),
  ];

  const polydectes: PR[] = [
    vr(3,0,8,1,GD), vr(3,0,2,3,GD), vr(6,0,2,3,GD), vr(10,0,2,3,GD),
    vr(4,2,6,6,SK2), vr(8,4,1,1,EY), vr(9,5,1,2,SK2),
    vr(4,7,5,2,GR),
    vr(5,9,4,2,SK2),
    vr(2,11,10,10,PP), vr(2,11,10,1,PD),
    vr(2,18,10,2,GD),
    vr(0,11,2,9,PP), vr(12,11,2,9,PP),
    vr(12,7,2,5,PP),
    vr(4,21,2,8,PP), vr(8,21,2,8,PP),
    vr(3,29,4,2,LT), vr(7,29,4,2,LT),
  ];

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
        <Rects rs={perseus}/>
      </g>
      {/* Polydectes — strides forward toward Perseus demanding the quest */}
      <g transform="translate(650,25) scale(-1,1)">
        <animateTransform attributeName="transform" type="translate"
          values="0,0; 30,-5; 0,0" keyTimes="0; 0.45; 1"
          calcMode="spline" keySplines="0.3,0,0.5,1; 0.5,0,0.7,1"
          dur="3.0s" repeatCount="indefinite" additive="sum"/>
        <Rects rs={polydectes}/>
      </g>
      <rect width="700" height="260" fill="url(#c1-vig)"/>
      <rect x="1" y="1" width="698" height="258" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.3"/>
    </svg>
  );
}

// ─── Chapter II: The Gods Take Interest ───────────────────────────────────
function ChapterII({ className, style }: IllustrationProps) {
  const vr = mkVr(4);
  const SK3="#dab07a",EY="#18101e";
  const BR="#b87832",BH="#d4a450";
  const GD="#d4a428",GS="#c89c20",GL="#e8c848";
  const LT="#5a3c22";
  const GR="#7a8090",GR2="#9aa0b0";
  const WH="#e8e8f8";

  const hermes: PR[] = [
    vr(2,0,10,2,GD), vr(2,1,10,3,GS),
    vr(0,0,3,3,WH), vr(11,0,3,3,WH),
    vr(4,1,6,6,SK3), vr(8,3,1,1,EY), vr(9,4,1,2,SK3),
    vr(5,7,4,2,SK3),
    vr(1,2,1,22,BR),
    vr(0,2,3,1,GD), vr(0,4,2,1,GD), vr(2,6,2,1,GD), vr(0,8,2,1,GD), vr(2,10,2,1,GD),
    vr(3,9,8,10,GD), vr(3,9,8,1,GS),
    vr(3,16,8,2,GL),
    vr(1,9,2,8,SK3), vr(11,9,2,8,GD),
    vr(4,19,2,9,SK3), vr(8,19,2,9,SK3),
    vr(3,28,3,2,GD), vr(7,28,3,2,GD),
    vr(2,25,2,3,WH), vr(10,25,2,3,WH),
  ];

  const athena: PR[] = [
    vr(3,0,8,1,BR), vr(8,0,4,3,GD),
    vr(2,1,10,3,GR), vr(2,4,2,5,GR),
    vr(4,1,6,7,SK3), vr(8,3,1,1,EY), vr(9,4,1,2,SK3),
    vr(5,8,4,2,SK3),
    vr(13,0,1,24,BR), vr(12,0,3,3,BH),
    vr(3,10,8,10,GR), vr(3,10,8,1,GR2),
    vr(3,17,8,2,BR),
    vr(1,10,2,8,GR), vr(11,10,2,8,GR),
    vr(4,20,2,9,SK3), vr(8,20,2,9,SK3),
    vr(3,29,3,2,BR), vr(7,29,3,2,BR),
  ];

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
        <Rects rs={hermes}/>
      </g>
      {/* Athena — moves forward pointing at Perseus (her local +x = world left = toward center) */}
      <g transform="translate(650,20) scale(-1,1)">
        <animateTransform attributeName="transform" type="translate"
          values="0,0; 35,-8; 35,-8; 0,0"
          keyTimes="0; 0.35; 0.6; 1"
          calcMode="spline" keySplines="0.3,0,0.5,1; 0.42,0,0.58,1; 0.5,0,0.8,1"
          dur="3.2s" begin="0.4s" repeatCount="indefinite" additive="sum"/>
        <Rects rs={athena}/>
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

  return (
    <svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id="c3-vig" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="100%" stopColor="#020208" stopOpacity="0.92"/>
        </radialGradient>
        <radialGradient id="c3-eye" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ddd2ae" stopOpacity="0.22"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
      </defs>
      <image href="/illustrations/chapter3/bg.svg" x="0" y="0" width="700" height="260"/>
      {/* Left graeae — reaches right (positive x) toward center */}
      <g transform="translate(50,40)">
        <animateTransform attributeName="transform" type="translate"
          values="0,0; 8,0; 0,0"
          keyTimes="0; 0.5; 1"
          calcMode="spline" keySplines="0.42,0,0.58,1; 0.42,0,0.58,1"
          dur="2.6s" repeatCount="indefinite" additive="sum"/>
        <Rects rs={graeae}/>
      </g>
      {/* Right graeae — mirrored; local +x = world -x, so reaches left toward center */}
      <g transform="translate(650,40) scale(-1,1)">
        <animateTransform attributeName="transform" type="translate"
          values="0,0; 8,0; 0,0"
          keyTimes="0; 0.5; 1"
          calcMode="spline" keySplines="0.42,0,0.58,1; 0.42,0,0.58,1"
          dur="2.6s" begin="1.3s" repeatCount="indefinite" additive="sum"/>
        <Rects rs={graeae}/>
      </g>
      {/* Shared eye hovering between them */}
      <ellipse cx="350" cy="148" rx="60" ry="40" fill="url(#c3-eye)">
        <animate attributeName="opacity" values="0.5;1;0.5" keyTimes="0;0.5;1" dur="3s" repeatCount="indefinite"/>
      </ellipse>
      <rect x="347" y="144" width="6" height="6" fill="#ddd2ae" opacity="0.7">
        <animate attributeName="opacity" values="0.4;1;0.4" keyTimes="0;0.5;1" dur="3s" repeatCount="indefinite"/>
      </rect>
      <rect width="700" height="260" fill="url(#c3-vig)"/>
      <rect x="1" y="1" width="698" height="258" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.3"/>
    </svg>
  );
}

// ─── Chapter IV: The Nymphs' Gifts ────────────────────────────────────────
function ChapterIV({ className, style }: IllustrationProps) {
  const vr = mkVr(4);
  const SK="#d49060",SK3="#dab07a",EY="#18101e";
  const BR="#b87832";
  const TN="#dcd4a4",BL="#7a5028",LT="#5a3c22";
  const CP="#c41818",CD="#8a1010",PL="#700c0c";
  const WH="#e8e8f8",GD="#d4a428",WG="#d4cce8";

  const perseusFloat: PR[] = [
    vr(0,0,5,2,PL),
    vr(3,0,8,2,"#d4a450"), vr(2,1,10,3,BR), vr(2,4,2,5,BR),
    vr(4,1,6,7,SK), vr(8,3,1,1,EY), vr(9,5,1,2,SK),
    vr(5,8,4,2,SK),
    vr(0,4,2,22,CP), vr(0,26,2,3,CD),
    vr(3,10,8,9,TN), vr(3,16,8,2,BL),
    vr(0,8,2,9,SK), vr(12,8,2,9,TN),
    vr(4,20,2,8,SK), vr(9,20,2,8,SK),
    vr(3,28,3,2,LT), vr(8,28,3,2,LT),
    vr(2,26,2,3,WH), vr(10,26,2,3,WH),
  ];

  const nymph: PR[] = [
    vr(3,0,8,3,GD), vr(2,1,4,4,GD),
    vr(4,2,6,5,SK3), vr(8,4,1,1,EY), vr(9,5,1,1,SK3),
    vr(5,7,4,2,SK3),
    vr(0,9,3,2,SK3), vr(11,9,3,2,SK3),
    vr(0,8,3,3,GD), vr(12,8,2,4,BR),
    vr(3,9,8,10,WG), vr(3,9,8,1,WH),
    vr(3,16,8,2,GD),
    vr(1,9,2,8,SK3), vr(11,9,2,8,SK3),
    vr(2,19,10,8,WG),
    vr(4,27,3,2,SK3), vr(8,27,3,2,SK3),
  ];

  return (
    <svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id="c4-vig" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="100%" stopColor="#020208" stopOpacity="0.9"/>
        </radialGradient>
      </defs>
      <image href="/illustrations/chapter4/bg.svg" x="0" y="0" width="700" height="260"/>
      {/* Perseus — floats toward nymph to receive gifts, then drifts back */}
      <g transform="translate(170,15)">
        <animateTransform attributeName="transform" type="translate"
          values="0,0; 110,-14; 110,-14; 0,0"
          keyTimes="0; 0.3; 0.6; 1"
          calcMode="spline" keySplines="0.3,0,0.5,1; 0.42,0,0.58,1; 0.5,0,0.8,1"
          dur="3.6s" repeatCount="indefinite" additive="sum"/>
        <Rects rs={perseusFloat}/>
      </g>
      {/* Nymph — leans forward extending gifts toward Perseus, then bows back */}
      <g transform="translate(536,25) scale(-1,1)">
        <animateTransform attributeName="transform" type="translate"
          values="0,0; 100,8; 100,8; 0,0"
          keyTimes="0; 0.3; 0.6; 1"
          calcMode="spline" keySplines="0.3,0,0.5,1; 0.42,0,0.58,1; 0.5,0,0.8,1"
          dur="3.6s" begin="0.2s" repeatCount="indefinite" additive="sum"/>
        <Rects rs={nymph}/>
      </g>
      {/* Kibisis — golden bag flies from nymph's hand to Perseus's hand */}
      <g>
        <animateTransform attributeName="transform" type="translate"
          values="450,90; 450,90; 340,72; 340,72; 450,90"
          keyTimes="0; 0.1; 0.4; 0.62; 1"
          calcMode="spline" keySplines="0.42,0,0.58,1; 0.3,0,0.5,1; 0.42,0,0.58,1; 0.5,0,0.8,1"
          dur="3.6s" repeatCount="indefinite"/>
        <rect x="-10" y="-14" width="20" height="22" fill="#d4a428" rx="2"/>
        <rect x="-7" y="-20" width="14" height="8" fill="#b87832"/>
        <rect x="-3" y="-24" width="6" height="6" fill="#d4a428"/>
        <rect x="-8" y="-12" width="16" height="2" fill="#c49020" opacity="0.7"/>
        <rect x="-8" y="-6" width="16" height="2" fill="#c49020" opacity="0.6"/>
      </g>
      {/* Cap of Hades — dark helm passes over */}
      <g>
        <animateTransform attributeName="transform" type="translate"
          values="456,118; 456,118; 346,100; 346,100; 456,118"
          keyTimes="0; 0.1; 0.4; 0.62; 1"
          calcMode="spline" keySplines="0.42,0,0.58,1; 0.3,0,0.5,1; 0.42,0,0.58,1; 0.5,0,0.8,1"
          dur="3.6s" begin="0.55s" repeatCount="indefinite"/>
        <rect x="-14" y="-8" width="28" height="12" fill="#2a2040"/>
        <rect x="-12" y="-16" width="24" height="10" fill="#3a3060"/>
        <rect x="-10" y="-20" width="20" height="6" fill="#4a4070"/>
        <rect x="-6" y="-24" width="12" height="6" fill="#3a3060"/>
        <rect x="-14" y="-6" width="4" height="10" fill="#241a38"/>
        <rect x="10" y="-6" width="4" height="10" fill="#241a38"/>
      </g>
      {/* Winged sandals — white-feathered, arc across last */}
      <g>
        <animateTransform attributeName="transform" type="translate"
          values="462,146; 462,146; 352,128; 352,128; 462,146"
          keyTimes="0; 0.1; 0.4; 0.62; 1"
          calcMode="spline" keySplines="0.42,0,0.58,1; 0.3,0,0.5,1; 0.42,0,0.58,1; 0.5,0,0.8,1"
          dur="3.6s" begin="1.1s" repeatCount="indefinite"/>
        <rect x="-12" y="-4" width="24" height="8" fill="#7a5028"/>
        <rect x="-10" y="-4" width="24" height="4" fill="#9a6838"/>
        <rect x="-14" y="-12" width="8" height="10" fill="#e8e8f8"/>
        <rect x="-16" y="-16" width="6" height="6" fill="#f0f0fc"/>
        <rect x="6" y="-12" width="8" height="10" fill="#e8e8f8"/>
        <rect x="10" y="-16" width="6" height="6" fill="#f0f0fc"/>
      </g>
      <rect width="700" height="260" fill="url(#c4-vig)"/>
      <rect x="1" y="1" width="698" height="258" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.3"/>
    </svg>
  );
}

// ─── Chapter V: The Gorgon's Lair ─────────────────────────────────────────
function ChapterV({ className, style }: IllustrationProps) {
  const vr = mkVr(4);
  const SK="#d49060",SK4="#c89858",EY="#18101e";
  const BR="#b87832",BH="#d4a450";
  const TN="#dcd4a4",BL="#7a5028",LT="#5a3c22";
  const CP="#c41818",CD="#8a1010",PL="#700c0c";
  const WH="#e8e8f8",GN="#3a5030",SN="#5a7040",SL="#78905a";

  const vrM = mkVr(4);
  const medusa: PR[] = [
    vrM(4,0,12,3,SN), vrM(2,0,4,4,GN), vrM(14,0,4,4,GN),
    vrM(0,1,3,3,SL), vrM(17,1,3,3,SL),
    vrM(6,0,2,5,GN), vrM(12,0,2,5,GN), vrM(9,0,2,5,GN),
    vrM(0,2,2,1,SL), vrM(18,2,2,1,SL),
    vrM(6,2,8,6,SK4), vrM(12,4,1,1,EY), vrM(13,5,1,1,SK4),
    vrM(7,4,6,1,"#9a7850"),
    vrM(2,8,16,6,SN), vrM(2,8,2,4,GN), vrM(16,8,2,4,GN),
    vrM(4,10,4,2,SK4), vrM(12,10,4,2,SK4),
    vrM(0,12,4,3,GN), vrM(16,12,4,3,GN),
  ];

  const perseusSt: PR[] = [
    vr(0,0,5,2,PL),
    vr(3,0,8,2,BH), vr(2,1,10,3,BR), vr(2,4,2,5,BR),
    vr(4,1,6,7,SK), vr(8,3,1,1,EY), vr(9,5,1,2,SK),
    vr(5,8,4,2,SK),
    vr(0,4,2,22,CP), vr(0,26,2,3,CD),
    vr(3,10,8,9,TN), vr(3,16,8,2,BL),
    vr(11,4,4,8,BR), vr(12,4,4,7,BH),
    vr(1,10,2,8,SK), vr(11,8,2,10,SK),
    vr(0,6,2,6,BH),
    vr(4,20,2,9,SK), vr(8,20,2,9,SK),
    vr(3,29,3,2,LT), vr(7,29,3,2,LT),
    vr(2,26,2,3,WH), vr(10,26,2,3,WH),
  ];

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
      <ellipse cx="184" cy="155" rx="80" ry="60" fill="url(#c5-glow)"/>
      {/* Medusa — slow serpentine undulation */}
      <g transform="translate(40,130)">
        <animateTransform attributeName="transform" type="translate"
          values="0,0; 0,-4; 0,2; 0,-4; 0,0"
          keyTimes="0; 0.25; 0.5; 0.75; 1"
          calcMode="spline" keySplines="0.42,0,0.58,1; 0.42,0,0.58,1; 0.42,0,0.58,1; 0.42,0,0.58,1"
          dur="4.0s" repeatCount="indefinite" additive="sum"/>
        {medusa.map((r,i) => <rect key={i} x={r.x} y={r.y} width={r.width} height={r.height} fill={r.fill}/>)}
      </g>
      {/* Perseus — creeps toward Medusa, shield up, then freezes (holding breath) */}
      <g transform="translate(650,20) scale(-1,1)">
        <animateTransform attributeName="transform" type="translate"
          values="0,0; 30,-2; 60,-2; 60,-2; 60,-2; 30,-1; 0,0"
          keyTimes="0; 0.15; 0.3; 0.45; 0.6; 0.8; 1"
          calcMode="spline" keySplines="0.3,0,0.7,1; 0.3,0,0.7,1; 0.42,0,0.58,1; 0.42,0,0.58,1; 0.42,0,0.58,1; 0.5,0,0.8,1"
          dur="4.0s" repeatCount="indefinite" additive="sum"/>
        <Rects rs={perseusSt}/>
      </g>
      <rect width="700" height="260" fill="url(#c5-vig)"/>
      <rect x="1" y="1" width="698" height="258" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.3"/>
    </svg>
  );
}

// ─── Chapter VI: The Flight Home ──────────────────────────────────────────
function ChapterVI({ className, style }: IllustrationProps) {
  const P = 4;
  type R = { x:number; y:number; width:number; height:number; fill:string };
  const vr = (vx:number, vy:number, vw:number, vh:number, fill:string): R =>
    ({ x:vx*P, y:vy*P, width:vw*P, height:vh*P, fill });

  const CAPE="#c41818", CAPE_D="#8a1010", PLUME="#700c0c";
  const BRZ="#b87832", BRZ_H="#d4a450", BRZ_D="#7a5020";
  const SKIN="#d49060", SKIN_D="#a86030", EYE="#18101e";
  const TUN="#dcd4a4", BELT="#7a5028", LTHR="#5a3c22";
  const WING="#e8e8f8", WING_D="#a8b0c0";

  const sprite: R[] = [
    vr(0, 4,18,1,CAPE), vr(0, 5,20,1,CAPE), vr(0, 6,22,1,CAPE),
    vr(0, 7,24,1,CAPE), vr(0, 8,25,1,CAPE), vr(0, 9,26,1,CAPE),
    vr(0,10,26,1,CAPE), vr(0,11,24,1,CAPE), vr(0,12,21,1,CAPE),
    vr(0,13,17,1,CAPE_D), vr(0,14,12,1,CAPE_D),
    vr(0,15, 7,1,CAPE_D), vr(0,16, 3,1,CAPE_D),
    vr(6,0,28,1,PLUME), vr(8,1,24,1,PLUME), vr(10,2,20,1,PLUME), vr(12,3,14,1,PLUME),
    vr(0,11,6,1,WING), vr(0,12,5,1,WING), vr(0,13,4,1,WING), vr(1,14,3,1,WING_D),
    vr(4,10,14,2,SKIN),
    vr(3,12,12,3,LTHR),
    vr(8, 8,24,1,TUN), vr(8, 9,24,2,TUN), vr(8,11,20,1,TUN),
    vr(10,10,20,1,BELT),
    vr(33,3, 9,1,BRZ_H),
    vr(31,4,11,1,BRZ), vr(29,5,13,1,BRZ), vr(27,6,15,1,BRZ),
    vr(26,7,16,1,BRZ), vr(26,8,16,1,BRZ),
    vr(26, 9,7,1,BRZ), vr(26,10,7,1,BRZ), vr(26,11,7,1,BRZ),
    vr(26,12,7,1,BRZ), vr(26,13,5,1,BRZ_D), vr(27,14,3,1,BRZ_D),
    vr(33,3,8,1,BRZ), vr(33,4,8,1,BRZ), vr(33,5,8,1,BRZ),
    vr(33,6,8,1,BRZ), vr(33,7,8,1,BRZ), vr(33,8,8,1,BRZ),
    vr(33, 9,8,1,SKIN), vr(33,10,8,1,SKIN), vr(33,11,8,1,SKIN),
    vr(33,12,7,1,SKIN), vr(33,13,5,1,SKIN), vr(34,14,3,1,SKIN_D),
    vr(38,10,1,1,EYE),
    vr(40,11,1,1,SKIN), vr(40,12,1,1,SKIN),
    vr(41, 9,8,1,SKIN), vr(41,10,8,1,SKIN), vr(41,11,7,1,SKIN),
    vr(45, 8,4,1,SKIN_D), vr(45, 9,4,2,SKIN_D), vr(46,11,3,1,SKIN_D),
  ];

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
          values="-220,44; 40,58; 200,42; 360,26; 510,48; 650,34; 920,42"
          keyTimes="0; 0.15; 0.30; 0.45; 0.60; 0.75; 1"
          calcMode="spline"
          keySplines="0.42,0,0.58,1; 0.42,0,0.58,1; 0.42,0,0.58,1; 0.42,0,0.58,1; 0.42,0,0.58,1; 0.42,0,0.58,1"
          dur="9s" repeatCount="indefinite"
        />
        <rect x={-200} y={18} width={200} height={44} fill="#c9a84c" opacity="0.05"/>
        <rect x={-130} y={26} width={130} height={32} fill="#c9a84c" opacity="0.09"/>
        <rect x={-70}  y={30} width={70}  height={20} fill="#dbd060" opacity="0.15"/>
        <rect x={-30}  y={32} width={30}  height={14} fill="#dbd060" opacity="0.22"/>
        <g transform="translate(-44,0)" opacity={0.20}>
          {sprite.map((r,i) => <rect key={i} x={r.x} y={r.y} width={r.width} height={r.height} fill={r.fill}/>)}
        </g>
        <g transform="translate(-84,0)" opacity={0.08}>
          {sprite.map((r,i) => <rect key={i} x={r.x} y={r.y} width={r.width} height={r.height} fill={r.fill}/>)}
        </g>
        {sprite.map((r,i) => <rect key={i} x={r.x} y={r.y} width={r.width} height={r.height} fill={r.fill}/>)}
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
  const SK="#d49060",SK3="#dab07a",EY="#18101e";
  const BR="#b87832",BH="#d4a450";
  const TN="#dcd4a4",BL="#7a5028",LT="#5a3c22";
  const CP="#c41818",CD="#8a1010",PL="#700c0c";
  const WH="#e8e8f8",WG="#d8d0f0",GD="#d4a428",IR="#6a7080";

  const andromeda: PR[] = [
    vr(3,0,2,2,IR), vr(9,0,2,2,IR),
    vr(3,0,2,6,IR), vr(9,0,2,6,IR),
    vr(3,2,2,8,SK3), vr(9,2,2,8,SK3),
    vr(4,9,6,6,SK3), vr(7,11,1,1,EY), vr(8,12,1,1,SK3),
    vr(3,8,8,3,LT), vr(3,9,2,4,LT), vr(11,9,2,4,LT),
    vr(5,15,4,2,SK3),
    vr(3,17,8,10,WG), vr(3,17,8,1,WH),
    vr(4,24,6,2,GD),
    vr(2,27,10,6,WG),
    vr(4,33,3,2,SK3), vr(8,33,3,2,SK3),
  ];

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
        <Rects rs={andromeda}/>
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
  const vr = mkVr(4);
  const SK="#d49060",SK2="#b07848",EY="#18101e";
  const BR="#b87832",BH="#d4a450";
  const TN="#dcd4a4",BL="#7a5028",LT="#5a3c22";
  const CP="#c41818",CD="#8a1010",PL="#700c0c";
  const WH="#e8e8f8",GD="#d4a428",PP="#7030b0",GR="#908880",ST="#9aa8b0";

  const perseusTriumph: PR[] = [
    vr(0,0,5,2,PL),
    vr(3,0,8,2,BH), vr(2,1,10,3,BR), vr(2,4,2,5,BR),
    vr(4,1,6,7,SK), vr(8,3,1,1,EY), vr(9,5,1,2,SK),
    vr(5,8,4,2,SK),
    vr(0,4,2,22,CP), vr(0,26,2,3,CD),
    vr(3,10,8,9,TN), vr(3,16,8,2,BL),
    vr(1,2,2,10,SK),
    vr(0,0,4,4,GD), vr(0,0,4,1,BH), vr(1,4,2,1,GD),
    vr(11,10,2,8,TN),
    vr(4,20,2,9,SK), vr(8,20,2,9,SK),
    vr(3,29,3,2,LT), vr(7,29,3,2,LT),
    vr(2,26,2,3,WH), vr(10,26,2,3,WH),
  ];

  const polydectesStone: PR[] = [
    vr(3,0,8,1,ST), vr(3,0,2,3,ST), vr(6,0,2,3,ST), vr(10,0,2,3,ST),
    vr(4,2,6,6,ST), vr(8,4,1,1,EY), vr(9,5,1,2,ST),
    vr(4,7,5,2,GR),
    vr(5,9,4,2,ST),
    vr(2,11,10,10,PP), vr(2,11,10,1,ST),
    vr(2,18,10,2,ST),
    vr(0,11,2,9,ST), vr(12,11,2,9,ST),
    vr(12,7,2,5,ST),
    vr(4,21,2,8,ST), vr(8,21,2,8,ST),
    vr(3,29,4,2,ST), vr(7,29,4,2,ST),
  ];

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
      {/* Perseus — advances on Polydectes brandishing kibisis, then steps back */}
      <g transform="translate(50,20)">
        <animateTransform attributeName="transform" type="translate"
          values="0,0; 45,-10; 45,-10; 0,0"
          keyTimes="0; 0.3; 0.55; 1"
          calcMode="spline" keySplines="0.3,0,0.5,1; 0.42,0,0.58,1; 0.5,0,0.8,1"
          dur="2.8s" repeatCount="indefinite" additive="sum"/>
        <Rects rs={perseusTriumph}/>
      </g>
      {/* Polydectes — recoils backward as Perseus approaches, trembling and fading to stone */}
      <g transform="translate(650,20) scale(-1,1)">
        <animateTransform attributeName="transform" type="translate"
          values="0,0; -30,5; -30,5; 0,0"
          keyTimes="0; 0.3; 0.55; 1"
          calcMode="spline" keySplines="0.3,0,0.5,1; 0.42,0,0.58,1; 0.5,0,0.8,1"
          dur="2.8s" begin="0.1s" repeatCount="indefinite" additive="sum"/>
        <g>
          <animate attributeName="opacity" values="1;1;0.5;0.3;1" keyTimes="0;0.3;0.45;0.55;1" dur="2.8s" repeatCount="indefinite"/>
          <Rects rs={polydectesStone}/>
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
