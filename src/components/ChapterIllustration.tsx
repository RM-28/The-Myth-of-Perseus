"use client";

import React from "react";

interface IllustrationProps {
  className?: string;
  style?: React.CSSProperties;
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
        <style>{`
          @keyframes spF0 { 0%,24.9%{opacity:1} 25%,100%{opacity:0} }
          @keyframes spF1 { 0%,24.9%{opacity:0} 25%,49.9%{opacity:1} 50%,100%{opacity:0} }
          @keyframes spF2 { 0%,49.9%{opacity:0} 50%,74.9%{opacity:1} 75%,100%{opacity:0} }
          @keyframes spF3 { 0%,74.9%{opacity:0} 75%,100%{opacity:1} }
        `}</style>
      </defs>
      <image href="/illustrations/chapter1/bg.svg" x="0" y="0" width="700" height="260"/>
      <image href="/Perseus/Idle_East_0.png" x="50" y="20" width="144" height="192" style={{imageRendering:'pixelated', animation:'spF0 0.6s steps(1,end) infinite'}}/>
      <image href="/Perseus/Idle_East_1.png" x="50" y="20" width="144" height="192" style={{imageRendering:'pixelated', animation:'spF1 0.6s steps(1,end) infinite', opacity:0}}/>
      <image href="/Perseus/Idle_East_2.png" x="50" y="20" width="144" height="192" style={{imageRendering:'pixelated', animation:'spF2 0.6s steps(1,end) infinite', opacity:0}}/>
      <image href="/Perseus/Idle_East_3.png" x="50" y="20" width="144" height="192" style={{imageRendering:'pixelated', animation:'spF3 0.6s steps(1,end) infinite', opacity:0}}/>
      <image href="/Polyedectes/Idle_West_0.png" x="506" y="20" width="144" height="192" style={{imageRendering:'pixelated', animation:'spF0 0.6s steps(1,end) infinite'}}/>
      <image href="/Polyedectes/Idle_West_1.png" x="506" y="20" width="144" height="192" style={{imageRendering:'pixelated', animation:'spF1 0.6s steps(1,end) infinite', opacity:0}}/>
      <image href="/Polyedectes/Idle_West_2.png" x="506" y="20" width="144" height="192" style={{imageRendering:'pixelated', animation:'spF2 0.6s steps(1,end) infinite', opacity:0}}/>
      <image href="/Polyedectes/Idle_West_3.png" x="506" y="20" width="144" height="192" style={{imageRendering:'pixelated', animation:'spF3 0.6s steps(1,end) infinite', opacity:0}}/>
      <rect width="700" height="260" fill="url(#c1-vig)"/>
      <rect x="1" y="1" width="698" height="258" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.3"/>
    </svg>
  );
}


// ─── Chapter II: The Gods Take Interest ──────────────────────────────────────
function ChapterII({ className, style }: IllustrationProps) {
  return (
    <svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id="c2-vig" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="100%" stopColor="#020208" stopOpacity="0.9"/>
        </radialGradient>
      </defs>
      <rect width="700" height="260" fill="#060810"/>
      {/* Caduceus — staff of Hermes, symbol of divine aid */}
      <line x1="350" y1="50" x2="350" y2="205" stroke="#c9a84c" strokeWidth="2.5" strokeOpacity="0.75"/>
      {/* left snake */}
      <path d="M350,72 Q322,88 350,108 Q378,128 350,148 Q322,168 350,185" fill="none" stroke="#c9a84c" strokeWidth="1.8" strokeOpacity="0.6"/>
      {/* right snake */}
      <path d="M350,72 Q378,88 350,108 Q322,128 350,148 Q378,168 350,185" fill="none" stroke="#c9a84c" strokeWidth="1.8" strokeOpacity="0.6"/>
      {/* wings left */}
      <path d="M338,65 Q308,46 298,32 Q316,50 336,68" fill="#c9a84c" fillOpacity="0.55"/>
      <path d="M338,65 Q312,44 316,26 Q326,48 338,65" fill="#c9a84c" fillOpacity="0.35"/>
      {/* wings right */}
      <path d="M362,65 Q392,46 402,32 Q384,50 364,68" fill="#c9a84c" fillOpacity="0.55"/>
      <path d="M362,65 Q388,44 384,26 Q374,48 362,65" fill="#c9a84c" fillOpacity="0.35"/>
      {/* orb at tip */}
      <circle cx="350" cy="52" r="7" fill="#c9a84c" fillOpacity="0.45"/>
      <circle cx="350" cy="52" r="12" fill="#c9a84c" fillOpacity="0.08"/>
      <ellipse cx="350" cy="130" rx="90" ry="100" fill="#c9a84c" fillOpacity="0.03"/>
      <rect width="700" height="260" fill="url(#c2-vig)"/>
      <rect x="1" y="1" width="698" height="258" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.3"/>
    </svg>
  );
}

// ─── Chapter III: The Grey Sisters ────────────────────────────────────────────
function ChapterIII({ className, style }: IllustrationProps) {
  return (
    <svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id="c3-vig" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="100%" stopColor="#020208" stopOpacity="0.92"/>
        </radialGradient>
        <radialGradient id="c3-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
      </defs>
      <rect width="700" height="260" fill="#060810"/>
      {/* Eye outline */}
      <path d="M195,130 Q258,78 350,76 Q442,78 505,130 Q442,182 350,184 Q258,182 195,130 Z" fill="none" stroke="#c9a84c" strokeWidth="1.8" strokeOpacity="0.7"/>
      <path d="M195,130 Q258,78 350,76 Q442,78 505,130 Q442,182 350,184 Q258,182 195,130 Z" fill="#c9a84c" fillOpacity="0.02"/>
      {/* iris */}
      <circle cx="350" cy="130" r="38" fill="none" stroke="#c9a84c" strokeWidth="1.4" strokeOpacity="0.6"/>
      <circle cx="350" cy="130" r="32" fill="#c9a84c" fillOpacity="0.05"/>
      {/* pupil */}
      <circle cx="350" cy="130" r="18" fill="#c9a84c" fillOpacity="0.3"/>
      <circle cx="350" cy="130" r="9" fill="#c9a84c" fillOpacity="0.65"/>
      <ellipse cx="350" cy="130" rx="70" ry="65" fill="url(#c3-glow)"/>
      <line x1="350" y1="76" x2="350" y2="60" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.28"/>
      <line x1="350" y1="184" x2="350" y2="200" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.28"/>
      <rect width="700" height="260" fill="url(#c3-vig)"/>
      <rect x="1" y="1" width="698" height="258" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.3"/>
    </svg>
  );
}

// ─── Chapter IV: The Nymphs' Gifts ────────────────────────────────────────────
function ChapterIV({ className, style }: IllustrationProps) {
  return (
    <svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id="c4-vig" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="100%" stopColor="#020208" stopOpacity="0.9"/>
        </radialGradient>
      </defs>
      <rect width="700" height="260" fill="#060810"/>
      {/* Winged sandal — gift of the nymphs */}
      <ellipse cx="350" cy="158" rx="68" ry="22" fill="none" stroke="#c9a84c" strokeWidth="1.8" strokeOpacity="0.75"/>
      <path d="M306,142 Q350,124 394,142" fill="none" stroke="#c9a84c" strokeWidth="1.4" strokeOpacity="0.6"/>
      <path d="M322,132 Q350,118 378,132" fill="none" stroke="#c9a84c" strokeWidth="1.1" strokeOpacity="0.45"/>
      {/* left wing */}
      <path d="M286,153 Q252,130 242,102 Q264,130 284,153" fill="#c9a84c" fillOpacity="0.55"/>
      <path d="M286,153 Q248,124 254,92 Q268,124 284,153" fill="#c9a84c" fillOpacity="0.35"/>
      <path d="M286,153 Q256,138 256,112 Q270,136 284,153" fill="#c9a84c" fillOpacity="0.22"/>
      {/* right wing */}
      <path d="M414,153 Q448,130 458,102 Q436,130 416,153" fill="#c9a84c" fillOpacity="0.55"/>
      <path d="M414,153 Q452,124 446,92 Q432,124 416,153" fill="#c9a84c" fillOpacity="0.35"/>
      <path d="M414,153 Q444,138 444,112 Q430,136 416,153" fill="#c9a84c" fillOpacity="0.22"/>
      <ellipse cx="350" cy="140" rx="110" ry="60" fill="#c9a84c" fillOpacity="0.03"/>
      <rect width="700" height="260" fill="url(#c4-vig)"/>
      <rect x="1" y="1" width="698" height="258" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.3"/>
    </svg>
  );
}

// ─── Chapter V: The Gorgon's Lair ─────────────────────────────────────────────
function ChapterV({ className, style }: IllustrationProps) {
  return (
    <svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id="c5-vig" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="100%" stopColor="#020106" stopOpacity="0.92"/>
        </radialGradient>
      </defs>
      <rect width="700" height="260" fill="#060810"/>
      {/* Shield — polished mirror showing Medusa's reflection */}
      <circle cx="350" cy="128" r="82" fill="none" stroke="#c9a84c" strokeWidth="2" strokeOpacity="0.7"/>
      <circle cx="350" cy="128" r="74" fill="#090818" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.35"/>
      <circle cx="350" cy="128" r="66" fill="none" stroke="#c9a84c" strokeWidth="0.4" strokeOpacity="0.22"/>
      {/* reflected eyes */}
      <ellipse cx="334" cy="116" rx="8" ry="6" fill="#6a3080" fillOpacity="0.7" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.55"/>
      <ellipse cx="366" cy="116" rx="8" ry="6" fill="#6a3080" fillOpacity="0.7" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.55"/>
      <circle cx="334" cy="116" r="3" fill="#c9a84c" fillOpacity="0.6"/>
      <circle cx="366" cy="116" r="3" fill="#c9a84c" fillOpacity="0.6"/>
      {/* snake hair */}
      {([-55,-35,-15,5,25,45,-72,68] as number[]).map((angle, i) => {
        const rad = (angle - 90) * Math.PI / 180;
        return <path key={i} d={`M350,106 Q${350+Math.cos(rad)*24},${106+Math.sin(rad)*24} ${350+Math.cos(rad)*44},${106+Math.sin(rad)*44}`} fill="none" stroke="#6a3080" strokeWidth="1.5" strokeOpacity="0.6" strokeLinecap="round"/>;
      })}
      {/* mouth */}
      <path d="M334,136 Q350,147 366,136" fill="none" stroke="#6a3080" strokeWidth="1.5" strokeOpacity="0.7"/>
      <path d="M322,100 Q338,93 356,100" fill="none" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.35"/>
      <circle cx="350" cy="128" r="96" fill="#c9a84c" fillOpacity="0.025"/>
      <rect width="700" height="260" fill="url(#c5-vig)"/>
      <rect x="1" y="1" width="698" height="258" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.3"/>
    </svg>
  );
}

// ─── Chapter VI: The Flight Home ──────────────────────────────────────────────
function ChapterVI({ className, style }: IllustrationProps) {
  return (
    <svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id="c6-vig" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="100%" stopColor="#020308" stopOpacity="0.9"/>
        </radialGradient>
      </defs>
      <rect width="700" height="260" fill="#060810"/>
      {/* Stars */}
      {([[80,28],[150,18],[420,16],[510,38],[625,22],[185,52],[455,50],[560,14],[300,10]] as number[][]).map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r={i%2===0?1.2:0.7} fill="#c9a84c" fillOpacity={0.2+(i%4)*0.09}/>
      ))}
      {/* Moon */}
      <circle cx="572" cy="68" r="38" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.38"/>
      <circle cx="572" cy="68" r="32" fill="#c9a84c" fillOpacity="0.04"/>
      {/* Perseus silhouette flying */}
      <ellipse cx="300" cy="132" rx="13" ry="25" fill="#c9a84c" fillOpacity="0.72" transform="rotate(-18,300,132)"/>
      <circle cx="313" cy="108" r="12" fill="#c9a84c" fillOpacity="0.72"/>
      {/* sandal wings */}
      <path d="M292,156 Q270,138 265,114 Q278,136 292,156" fill="#c9a84c" fillOpacity="0.62"/>
      <path d="M292,156 Q268,132 272,106 Q282,132 292,156" fill="#c9a84c" fillOpacity="0.42"/>
      <path d="M310,157 Q332,140 336,116 Q322,138 310,157" fill="#c9a84c" fillOpacity="0.62"/>
      <path d="M310,157 Q334,128 332,102 Q320,130 310,157" fill="#c9a84c" fillOpacity="0.42"/>
      {/* cape */}
      <path d="M294,122 Q265,115 240,105 Q262,118 290,133" fill="#c9a84c" fillOpacity="0.32"/>
      {/* motion trail */}
      <path d="M286,136 Q238,142 192,135" fill="none" stroke="#c9a84c" strokeWidth="1.2" strokeOpacity="0.16" strokeDasharray="8,7"/>
      <path d="M290,144 Q242,150 196,145" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.1" strokeDasharray="6,9"/>
      <rect width="700" height="260" fill="url(#c6-vig)"/>
      <rect x="1" y="1" width="698" height="258" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.3"/>
    </svg>
  );
}

// ─── Chapter VII: Andromeda ────────────────────────────────────────────────────
function ChapterVII({ className, style }: IllustrationProps) {
  return (
    <svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id="c7-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a1828"/>
          <stop offset="100%" stopColor="#06101e"/>
        </linearGradient>
        <radialGradient id="c7-vig" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="100%" stopColor="#020308" stopOpacity="0.92"/>
        </radialGradient>
      </defs>
      <rect width="700" height="260" fill="#07090f"/>
      <rect x="0" y="178" width="700" height="82" fill="url(#c7-sea)"/>
      <path d="M0,182 Q88,170 175,182 Q263,194 350,182 Q438,170 525,182 Q613,194 700,182" fill="none" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.2"/>
      <path d="M0,196 Q100,184 200,196 Q300,208 400,196 Q500,184 600,196 Q655,202 700,196" fill="none" stroke="#c9a84c" strokeWidth="0.7" strokeOpacity="0.14"/>
      {/* Cliff */}
      <path d="M0,260 L0,48 Q22,42 40,56 L52,260 Z" fill="#151220"/>
      {/* Andromeda chained */}
      <ellipse cx="105" cy="132" rx="13" ry="28" fill="#1a1830"/>
      <circle cx="105" cy="100" r="13" fill="#1a1830"/>
      <circle cx="105" cy="100" r="13" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.52"/>
      <line x1="93" y1="120" x2="52" y2="114" stroke="#1a1830" strokeWidth="9" strokeLinecap="round"/>
      <line x1="117" y1="120" x2="158" y2="114" stroke="#1a1830" strokeWidth="9" strokeLinecap="round"/>
      {([0,1,2] as number[]).map(i=>(
        <ellipse key={i} cx={74-i*7} cy={114} rx="4" ry="2.5" fill="none" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.45" transform={`rotate(${i*20},${74-i*7},114)`}/>
      ))}
      {/* Cetus */}
      <path d="M405,260 Q395,228 414,205 Q433,182 422,158" fill="none" stroke="#1a3040" strokeWidth="30" strokeLinecap="round"/>
      <path d="M405,260 Q395,228 414,205 Q433,182 422,158" fill="none" stroke="#0f2030" strokeWidth="22" strokeLinecap="round"/>
      <ellipse cx="420" cy="146" rx="44" ry="28" fill="#1a3040" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.38"/>
      <path d="M382,160 Q420,178 458,160" fill="#0a1828" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.48"/>
      {([390,408,426,444] as number[]).map((x,i)=>(
        <polygon key={i} points={`${x},160 ${x-4},173 ${x+4},173`} fill="#c9a84c" fillOpacity="0.52"/>
      ))}
      <circle cx="402" cy="136" r="8" fill="#6a3010" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.6"/>
      <circle cx="402" cy="136" r="3.5" fill="#c9a84c" fillOpacity="0.65"/>
      <rect width="700" height="260" fill="url(#c7-vig)"/>
      <rect x="1" y="1" width="698" height="258" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.3"/>
    </svg>
  );
}

// ─── Chapter VIII: Return to Seriphus ─────────────────────────────────────────
function ChapterVIII({ className, style }: IllustrationProps) {
  return (
    <svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id="c8-kibisis" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.9"/>
          <stop offset="40%" stopColor="#c9a84c" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <radialGradient id="c8-vig" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="100%" stopColor="#020208" stopOpacity="0.92"/>
        </radialGradient>
      </defs>
      <rect width="700" height="260" fill="#08070e"/>
      <rect x="0" y="215" width="700" height="45" fill="#0d0b16"/>
      <rect x="50" y="28" width="30" height="190" rx="3" fill="#13111e"/>
      <rect x="48" y="26" width="34" height="12" rx="2" fill="#1a1828"/>
      <rect x="620" y="28" width="30" height="190" rx="3" fill="#13111e"/>
      <rect x="618" y="26" width="34" height="12" rx="2" fill="#1a1828"/>
      <rect x="310" y="95" width="80" height="125" rx="3" fill="#1a1530"/>
      <path d="M318,95 L322,78 L330,89 L350,68 L370,89 L378,78 L382,95 Z" fill="#c9a84c" opacity="0.72"/>
      {/* Polydectes stone */}
      <ellipse cx="350" cy="165" rx="28" ry="38" fill="#3a4050"/>
      <circle cx="350" cy="123" r="20" fill="#3a4050"/>
      <circle cx="350" cy="123" r="20" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.3"/>
      <path d="M340,115 Q348,126 342,138" fill="none" stroke="#c9a84c" strokeWidth="0.7" strokeOpacity="0.38"/>
      <path d="M358,120 Q362,133 360,148" fill="none" stroke="#c9a84c" strokeWidth="0.5" strokeOpacity="0.28"/>
      {/* Perseus in doorway */}
      <path d="M100,260 L100,180 Q120,155 140,180 L140,260" fill="#0f0d1a" stroke="#c9a84c" strokeWidth="0.6" strokeOpacity="0.3"/>
      <ellipse cx="120" cy="205" rx="13" ry="22" fill="#0f1020"/>
      <circle cx="120" cy="180" r="11" fill="#0f1020"/>
      <circle cx="120" cy="180" r="11" fill="none" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.55"/>
      <line x1="132" y1="195" x2="164" y2="188" stroke="#0f1020" strokeWidth="8" strokeLinecap="round"/>
      {/* Glowing kibisis */}
      <path d="M152,176 Q145,193 147,210 Q151,222 165,222 Q179,222 183,210 Q185,193 178,176 Z" fill="none" stroke="#c9a84c" strokeWidth="1.4" strokeOpacity="0.7"/>
      <path d="M154,176 Q165,166 178,176" fill="none" stroke="#c9a84c" strokeWidth="1.2" strokeOpacity="0.7"/>
      <ellipse cx="165" cy="200" rx="22" ry="26" fill="url(#c8-kibisis)" opacity="0.55"/>
      <rect width="700" height="260" fill="url(#c8-vig)"/>
      <rect x="1" y="1" width="698" height="258" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.3"/>
    </svg>
  );
}

// ─── Chapter IX: Endings ──────────────────────────────────────────────────────
function ChapterIX({ className, style }: IllustrationProps) {
  return (
    <svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id="c9-vig" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="100%" stopColor="#020208" stopOpacity="0.9"/>
        </radialGradient>
      </defs>
      <rect width="700" height="260" fill="#060810"/>
      {/* Perseus constellation */}
      {([[80,30],[120,55],[155,35],[190,60],[145,90],[175,110],[200,80],[230,45]] as number[][]).map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r={i%2===0?2:1.4} fill="#c9a84c" fillOpacity={0.4+(i%4)*0.12}/>
      ))}
      <polyline points="80,30 120,55 155,35 190,60 145,90 175,110" fill="none" stroke="#c9a84c" strokeWidth="0.7" strokeOpacity="0.22" strokeDasharray="4,5"/>
      <polyline points="120,55 200,80 230,45 190,60" fill="none" stroke="#c9a84c" strokeWidth="0.7" strokeOpacity="0.22" strokeDasharray="4,5"/>
      <line x1="145" y1="90" x2="200" y2="80" stroke="#c9a84c" strokeWidth="0.7" strokeOpacity="0.22" strokeDasharray="4,5"/>
      {([[300,18],[380,8],[450,22],[520,12],[600,28],[660,18],[400,38],[560,40]] as number[][]).map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="0.9" fill="#c9a84c" fillOpacity={0.18+(i%3)*0.07}/>
      ))}
      <path d="M0,222 Q350,202 700,218 L700,260 L0,260 Z" fill="#0d0b18"/>
      <path d="M180,195 Q280,80 490,192" fill="none" stroke="#c9a84c" strokeWidth="0.9" strokeOpacity="0.22" strokeDasharray="8,6"/>
      <ellipse cx="335" cy="136" rx="14" ry="5" fill="#c9a84c" fillOpacity="0.15" stroke="#c9a84c" strokeWidth="1.4" strokeOpacity="0.75" transform="rotate(-35,335,136)"/>
      <ellipse cx="335" cy="136" rx="9" ry="3" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.5" transform="rotate(-35,335,136)"/>
      {/* Perseus throwing */}
      <ellipse cx="140" cy="200" rx="14" ry="22" fill="#c9a84c" fillOpacity="0.65" transform="rotate(8,140,200)"/>
      <circle cx="148" cy="175" r="13" fill="#c9a84c" fillOpacity="0.65"/>
      <line x1="152" y1="187" x2="185" y2="170" stroke="#c9a84c" strokeWidth="8" strokeOpacity="0.6" strokeLinecap="round"/>
      <line x1="128" y1="194" x2="108" y2="210" stroke="#c9a84c" strokeWidth="7" strokeOpacity="0.55" strokeLinecap="round"/>
      <line x1="136" y1="220" x2="120" y2="245" stroke="#c9a84c" strokeWidth="8" strokeOpacity="0.6" strokeLinecap="round"/>
      <line x1="148" y1="218" x2="165" y2="242" stroke="#c9a84c" strokeWidth="8" strokeOpacity="0.6" strokeLinecap="round"/>
      {/* Acrisius struck */}
      <ellipse cx="500" cy="205" rx="25" ry="10" fill="#1a1830" transform="rotate(-20,500,205)"/>
      <circle cx="478" cy="196" r="12" fill="#1a1830"/>
      <circle cx="478" cy="196" r="12" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.4"/>
      <line x1="488" y1="202" x2="510" y2="215" stroke="#1a1830" strokeWidth="7" strokeLinecap="round"/>
      <line x1="472" y1="202" x2="455" y2="218" stroke="#1a1830" strokeWidth="7" strokeLinecap="round"/>
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
