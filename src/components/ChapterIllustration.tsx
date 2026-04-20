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
        <radialGradient id="c1-gl" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e07830" stopOpacity="0.32"/>
          <stop offset="100%" stopColor="#e07830" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="c1-gr" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e07830" stopOpacity="0.28"/>
          <stop offset="100%" stopColor="#e07830" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="c1-vig" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="100%" stopColor="#030208" stopOpacity="0.88"/>
        </radialGradient>
        <radialGradient id="c1-pg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.07"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
      </defs>

      {/* Hall background */}
      <rect width="700" height="260" fill="#09070f"/>

      {/* Ceiling arch */}
      <path d="M0,18 Q350,-8 700,18" fill="#110e1a" stroke="#c9a84c" strokeWidth="0.5" strokeOpacity="0.18"/>

      {/* Perspective vault lines */}
      <line x1="350" y1="8" x2="0" y2="260" stroke="#c9a84c" strokeWidth="0.4" strokeOpacity="0.1"/>
      <line x1="350" y1="8" x2="700" y2="260" stroke="#c9a84c" strokeWidth="0.4" strokeOpacity="0.1"/>
      <line x1="350" y1="8" x2="130" y2="260" stroke="#c9a84c" strokeWidth="0.3" strokeOpacity="0.07"/>
      <line x1="350" y1="8" x2="570" y2="260" stroke="#c9a84c" strokeWidth="0.3" strokeOpacity="0.07"/>

      {/* Stone floor */}
      <rect x="0" y="205" width="700" height="55" fill="#0e0b16"/>
      <line x1="0" y1="220" x2="700" y2="220" stroke="#c9a84c" strokeWidth="0.3" strokeOpacity="0.1"/>
      <line x1="0" y1="240" x2="700" y2="240" stroke="#c9a84c" strokeWidth="0.3" strokeOpacity="0.1"/>
      {[0,100,200,300,400,500,600,700].map((x,i)=>(
        <line key={i} x1={x} y1="205" x2={x} y2="260" stroke="#c9a84c" strokeWidth="0.3" strokeOpacity="0.1"/>
      ))}

      {/* Torch glow radiants */}
      <ellipse cx="62" cy="115" rx="95" ry="85" fill="url(#c1-gl)">
        <animate attributeName="rx" values="95;115;78;100;95" dur="1.6s" repeatCount="indefinite"/>
        <animate attributeName="ry" values="85;68;95;75;85" dur="1.6s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="638" cy="115" rx="95" ry="85" fill="url(#c1-gr)">
        <animate attributeName="rx" values="95;72;110;82;95" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="ry" values="85;98;70;88;85" dur="2s" repeatCount="indefinite"/>
      </ellipse>

      {/* Left torch */}
      <rect x="56" y="132" width="12" height="48" rx="2" fill="#2a1a08"/>
      <rect x="53" y="126" width="18" height="11" rx="2" fill="#3a2510"/>
      <ellipse cx="62" cy="115" rx="10" ry="17" fill="#c84c10" opacity="0.85">
        <animate attributeName="ry" values="17;21;13;18;14;17" dur="0.85s" repeatCount="indefinite"/>
        <animate attributeName="cx" values="62;63;61;62;64;62" dur="0.85s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="62" cy="106" rx="7" ry="12" fill="#e07830" opacity="0.9">
        <animate attributeName="ry" values="12;15;9;13;10;12" dur="0.85s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="62" cy="99" rx="4" ry="8" fill="#f5c050" opacity="0.8">
        <animate attributeName="ry" values="8;10;6;9;7;8" dur="0.85s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="62" cy="93" rx="2" ry="5" fill="#fff8e0" opacity="0.5">
        <animate attributeName="ry" values="5;6;4;5;4;5" dur="0.85s" repeatCount="indefinite"/>
      </ellipse>

      {/* Right torch */}
      <rect x="632" y="132" width="12" height="48" rx="2" fill="#2a1a08"/>
      <rect x="629" y="126" width="18" height="11" rx="2" fill="#3a2510"/>
      <ellipse cx="638" cy="115" rx="10" ry="17" fill="#c84c10" opacity="0.85">
        <animate attributeName="ry" values="17;13;22;14;19;17" dur="1.1s" repeatCount="indefinite"/>
        <animate attributeName="cx" values="638;637;639;638;637;638" dur="1.1s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="638" cy="106" rx="7" ry="12" fill="#e07830" opacity="0.9">
        <animate attributeName="ry" values="12;9;15;10;13;12" dur="1.1s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="638" cy="99" rx="4" ry="8" fill="#f5c050" opacity="0.8">
        <animate attributeName="ry" values="8;6;10;7;9;8" dur="1.1s" repeatCount="indefinite"/>
      </ellipse>

      {/* Second left torch */}
      <rect x="142" y="108" width="10" height="38" rx="1" fill="#2a1a08"/>
      <rect x="139" y="102" width="16" height="10" rx="2" fill="#3a2510"/>
      <ellipse cx="147" cy="93" rx="8" ry="13" fill="#c84c10" opacity="0.72">
        <animate attributeName="ry" values="13;16;10;14;11;13" dur="1.3s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="147" cy="85" rx="5" ry="9" fill="#e07830" opacity="0.78">
        <animate attributeName="ry" values="9;11;7;10;8;9" dur="1.3s" repeatCount="indefinite"/>
      </ellipse>

      {/* Second right torch */}
      <rect x="548" y="108" width="10" height="38" rx="1" fill="#2a1a08"/>
      <rect x="545" y="102" width="16" height="10" rx="2" fill="#3a2510"/>
      <ellipse cx="553" cy="93" rx="8" ry="13" fill="#c84c10" opacity="0.72">
        <animate attributeName="ry" values="13;10;17;12;14;13" dur="1.0s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="553" cy="85" rx="5" ry="9" fill="#e07830" opacity="0.78">
        <animate attributeName="ry" values="9;7;12;8;10;9" dur="1.0s" repeatCount="indefinite"/>
      </ellipse>

      {/* Banquet table */}
      <rect x="175" y="148" width="350" height="18" rx="2" fill="#352012"/>
      <rect x="175" y="148" width="350" height="4" rx="1" fill="#4a3018" opacity="0.8"/>
      <path d="M180,166 L520,166 L520,185 L180,185 Z" fill="#251a0a"/>
      <rect x="198" y="166" width="14" height="24" rx="1" fill="#1a1006"/>
      <rect x="488" y="166" width="14" height="24" rx="1" fill="#1a1006"/>

      {/* Goblets */}
      {[230,295,350,405,470].map((x,i)=>(
        <g key={i}>
          <path d={`M${x-6},145 L${x+6},145 L${x+4},157 L${x-4},157 Z`} fill="#3a2810"/>
          <rect x={x-9} y="156" width="18" height="3" rx="1" fill="#3a2810"/>
          <ellipse cx={x} cy="144" rx="7" ry="3" fill="#c9a84c" opacity="0.4"/>
        </g>
      ))}

      {/* Table candles */}
      {[268,350,432].map((x,i)=>(
        <g key={i}>
          <rect x={x-3} y="136" width="6" height="14" fill="#d4c4a0"/>
          <ellipse cx={x} cy="134" rx="4" ry="6" fill="#e07830" opacity="0.78">
            <animate attributeName="ry" values="6;8;4;7;5;6" dur={`${0.68+i*0.22}s`} repeatCount="indefinite"/>
          </ellipse>
          <ellipse cx={x} cy="130" rx="3" ry="4" fill="#f5c050" opacity="0.68">
            <animate attributeName="ry" values="4;5;3;4;5;4" dur={`${0.68+i*0.22}s`} repeatCount="indefinite"/>
          </ellipse>
        </g>
      ))}

      {/* Guests far side */}
      {[240,300,350,400,460].map((x,i)=>(
        <g key={i} opacity="0.58">
          <ellipse cx={x} cy="132" rx="16" ry="20" fill="#080610"/>
          <circle cx={x} cy="110" r="12" fill="#080610"/>
        </g>
      ))}
      {/* Guests near side */}
      {[225,290,350,420,480].map((x,i)=>(
        <g key={i} opacity="0.42">
          <ellipse cx={x} cy="192" rx="14" ry="17" fill="#060410"/>
          <circle cx={x} cy="173" r="10" fill="#060410"/>
        </g>
      ))}

      {/* Polydectes on throne — right */}
      <rect x="560" y="98" width="52" height="100" rx="3" fill="#1a1525"/>
      <rect x="556" y="93" width="60" height="14" rx="3" fill="#221730"/>
      <rect x="559" y="138" width="13" height="6" rx="1" fill="#2a1f35"/>
      <rect x="608" y="138" width="13" height="6" rx="1" fill="#2a1f35"/>
      {/* Crown */}
      <path d="M570,90 L573,75 L580,87 L587,68 L594,87 L601,75 L604,90 Z" fill="#c9a84c" opacity="0.85"/>
      {/* Polydectes silhouette */}
      <ellipse cx="586" cy="152" rx="22" ry="30" fill="#0c0a14"/>
      <circle cx="586" cy="116" r="16" fill="#0c0a14"/>
      <circle cx="586" cy="116" r="16" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.4"/>
      {/* Pointing arm */}
      <line x1="565" y1="142" x2="525" y2="152" stroke="#0c0a14" strokeWidth="9" strokeLinecap="round"/>
      <line x1="525" y1="152" x2="498" y2="140" stroke="#0c0a14" strokeWidth="7" strokeLinecap="round"/>

      {/* Perseus — left, standing apart, empty-handed */}
      <ellipse cx="108" cy="168" rx="55" ry="52" fill="url(#c1-pg)"/>
      <ellipse cx="108" cy="178" rx="14" ry="28" fill="#0f1020"/>
      <circle cx="108" cy="144" r="13" fill="#0f1020"/>
      <circle cx="108" cy="144" r="13" fill="none" stroke="#c9a84c" strokeWidth="1.1" strokeOpacity="0.55"/>
      <line x1="95" y1="163" x2="74" y2="178" stroke="#0f1020" strokeWidth="8" strokeLinecap="round"/>
      <line x1="121" y1="163" x2="142" y2="178" stroke="#0f1020" strokeWidth="8" strokeLinecap="round"/>
      <circle cx="72" cy="179" r="5" fill="#0f1020"/>
      <circle cx="144" cy="179" r="5" fill="#0f1020"/>
      <circle cx="108" cy="168" r="46" fill="none" stroke="#c9a84c" strokeWidth="0.6" strokeOpacity="0.14" strokeDasharray="5,8"/>

      {/* Vignette + frame */}
      <rect width="700" height="260" fill="url(#c1-vig)"/>
      <rect x="1" y="1" width="698" height="258" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.28"/>
    </svg>
  );
}

// ─── Chapter II: Divine Aid ───────────────────────────────────────────────
function ChapterII({ className, style }: IllustrationProps) {
  return (
    <svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id="c2-herm" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <radialGradient id="c2-ath" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8ab4e8" stopOpacity="0.28"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <radialGradient id="c2-vig" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="100%" stopColor="#030208" stopOpacity="0.85"/>
        </radialGradient>
        <linearGradient id="c2-beamL" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="#c9a84c" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="c2-beamR" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8ab4e8" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="#8ab4e8" stopOpacity="0"/>
        </linearGradient>
      </defs>

      <rect width="700" height="260" fill="#060810"/>

      {/* Stars twinkling */}
      {[[40,20],[80,12],[130,28],[180,8],[240,18],[320,6],[420,14],[500,22],[560,10],[620,18],[660,30],[30,55],[680,48],[200,40],[450,35]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r={i%3===0?1.3:0.8} fill="#c9a84c" fillOpacity={0.15+(i%5)*0.07}>
          <animate attributeName="opacity" values={`${0.15+(i%5)*0.07};${0.5+(i%4)*0.1};${0.1+(i%3)*0.08};${0.15+(i%5)*0.07}`} dur={`${1.5+i*0.3}s`} repeatCount="indefinite"/>
        </circle>
      ))}

      {/* Hill silhouette */}
      <path d="M0,230 Q175,170 350,195 Q525,220 700,180 L700,260 L0,260 Z" fill="#0d0b16"/>

      {/* Hermes glow aura (upper-left) */}
      <ellipse cx="180" cy="80" rx="90" ry="75" fill="url(#c2-herm)">
        <animate attributeName="rx" values="90;110;80;95;90" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="ry" values="75;60;85;70;75" dur="2s" repeatCount="indefinite"/>
      </ellipse>

      {/* Athena glow aura (upper-right) */}
      <ellipse cx="520" cy="80" rx="90" ry="75" fill="url(#c2-ath)">
        <animate attributeName="rx" values="90;75;105;82;90" dur="2.4s" repeatCount="indefinite"/>
        <animate attributeName="ry" values="75;88;65;78;75" dur="2.4s" repeatCount="indefinite"/>
      </ellipse>

      {/* Hermes light beam */}
      <polygon points="155,35 205,35 360,210 310,210" fill="url(#c2-beamL)" opacity="0.7">
        <animate attributeName="opacity" values="0.7;0.9;0.5;0.75;0.7" dur="2s" repeatCount="indefinite"/>
      </polygon>

      {/* Athena light beam */}
      <polygon points="495,35 545,35 390,210 340,210" fill="url(#c2-beamR)" opacity="0.6">
        <animate attributeName="opacity" values="0.6;0.8;0.45;0.65;0.6" dur="2.4s" repeatCount="indefinite"/>
      </polygon>

      {/* HERMES — upper-left, descending */}
      <g>
        {/* body */}
        <ellipse cx="180" cy="95" rx="14" ry="22" fill="#1a1830"/>
        {/* head */}
        <circle cx="180" cy="70" r="13" fill="#1a1830"/>
        {/* winged helmet */}
        <path d="M170,62 Q162,52 156,55 Q162,64 170,65" fill="#c9a84c" opacity="0.7"/>
        <path d="M190,62 Q198,52 204,55 Q198,64 190,65" fill="#c9a84c" opacity="0.7"/>
        {/* caduceus staff */}
        <line x1="194" y1="68" x2="250" y2="145" stroke="#c9a84c" strokeWidth="2" strokeOpacity="0.75"/>
        {/* caduceus snakes */}
        <path d="M202,80 Q215,88 210,100 Q205,112 218,120 Q230,128 225,140" fill="none" stroke="#c9a84c" strokeWidth="1.2" strokeOpacity="0.5"/>
        <path d="M210,82 Q197,92 204,104 Q211,116 198,124 Q185,132 192,144" fill="none" stroke="#c9a84c" strokeWidth="1.2" strokeOpacity="0.5"/>
        {/* caduceus wings top */}
        <path d="M204,78 Q195,66 200,58 Q208,70 204,78" fill="#c9a84c" opacity="0.6"/>
        <path d="M208,78 Q217,66 212,58 Q204,70 208,78" fill="#c9a84c" opacity="0.6"/>
        {/* arm reaching down with harpe */}
        <line x1="193" y1="105" x2="245" y2="150" stroke="#1a1830" strokeWidth="9" strokeLinecap="round"/>
        {/* harpe blade */}
        <path d="M245,150 Q258,145 255,158 Q248,165 238,158 Z" fill="#c9a84c" opacity="0.8"/>
        {/* sandal wings on feet */}
        <path d="M172,117 Q160,108 158,98 Q168,108 172,117" fill="#c9a84c" opacity="0.55"/>
        <path d="M188,117 Q200,108 202,98 Q192,108 188,117" fill="#c9a84c" opacity="0.55"/>
      </g>

      {/* ATHENA — upper-right, descending */}
      <g>
        <ellipse cx="520" cy="95" rx="14" ry="22" fill="#1a1c2e"/>
        <circle cx="520" cy="70" r="13" fill="#1a1c2e"/>
        {/* helmet crest */}
        <path d="M513,60 Q516,45 520,40 Q524,45 527,60" fill="#8ab4e8" opacity="0.6"/>
        {/* shield (circular, held out) */}
        <circle cx="472" cy="108" r="28" fill="none" stroke="#8ab4e8" strokeWidth="2" strokeOpacity="0.65"/>
        <circle cx="472" cy="108" r="22" fill="#1a1c2e" fillOpacity="0.8" stroke="#8ab4e8" strokeWidth="1" strokeOpacity="0.4"/>
        {/* shield center emblem */}
        <circle cx="472" cy="108" r="8" fill="none" stroke="#c9a84c" strokeWidth="1.2" strokeOpacity="0.6"/>
        <line x1="472" y1="100" x2="472" y2="116" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.5"/>
        <line x1="464" y1="108" x2="480" y2="108" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.5"/>
        {/* shield glow */}
        <circle cx="472" cy="108" r="36" fill="#8ab4e8" fillOpacity="0.06">
          <animate attributeName="r" values="36;44;30;38;36" dur="2.4s" repeatCount="indefinite"/>
          <animate attributeName="fillOpacity" values="0.06;0.1;0.04;0.07;0.06" dur="2.4s" repeatCount="indefinite"/>
        </circle>
        {/* arm holding shield */}
        <line x1="507" y1="105" x2="495" y2="108" stroke="#1a1c2e" strokeWidth="9" strokeLinecap="round"/>
        {/* spear */}
        <line x1="534" y1="50" x2="540" y2="180" stroke="#c9a84c" strokeWidth="1.8" strokeOpacity="0.65"/>
        <polygon points="534,50 530,62 538,62" fill="#c9a84c" fillOpacity="0.7"/>
      </g>

      {/* PERSEUS small silhouette at bottom, receiving */}
      <g>
        <ellipse cx="350" cy="205" rx="13" ry="20" fill="#0f101e"/>
        <circle cx="350" cy="182" r="11" fill="#0f101e"/>
        <circle cx="350" cy="182" r="11" fill="none" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.5"/>
        {/* arm raised to receive harpe */}
        <line x1="361" y1="198" x2="378" y2="185" stroke="#0f101e" strokeWidth="7" strokeLinecap="round"/>
        {/* other arm raised toward shield */}
        <line x1="339" y1="198" x2="322" y2="190" stroke="#0f101e" strokeWidth="7" strokeLinecap="round"/>
      </g>

      <rect width="700" height="260" fill="url(#c2-vig)"/>
      <rect x="1" y="1" width="698" height="258" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.28"/>
    </svg>
  );
}

// ─── Chapter III: The Grey Sisters ────────────────────────────────────────
function ChapterIII({ className, style }: IllustrationProps) {
  return (
    <svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id="c3-eye" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.9"/>
          <stop offset="50%" stopColor="#c9a84c" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <radialGradient id="c3-vig" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="100%" stopColor="#020208" stopOpacity="0.9"/>
        </radialGradient>
        <linearGradient id="c3-mist" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a2030" stopOpacity="0"/>
          <stop offset="100%" stopColor="#1a2030" stopOpacity="0.4"/>
        </linearGradient>
      </defs>

      <rect width="700" height="260" fill="#060810"/>

      {/* Cold mountain silhouettes */}
      <path d="M0,200 L80,100 L150,160 L230,80 L310,150 L400,60 L480,130 L560,85 L640,140 L700,100 L700,260 L0,260 Z" fill="#0c0d18"/>
      <path d="M0,220 L60,150 L120,190 L200,120 L280,170 L380,90 L460,155 L540,100 L620,160 L700,120 L700,260 L0,260 Z" fill="#10111e"/>

      {/* Ground mist */}
      <rect x="0" y="200" width="700" height="60" fill="url(#c3-mist)"/>

      {/* Cold atmosphere particles */}
      {[[100,180],[200,200],[300,190],[450,185],[550,195],[600,175]].map(([x,y],i)=>(
        <ellipse key={i} cx={x} cy={y} rx={8+i*3} ry="4" fill="#8ab4e8" fillOpacity="0.04"/>
      ))}

      {/* GRAEAE LEFT — hunched, robed figure */}
      <g>
        {/* robe */}
        <path d="M160,230 Q148,195 152,165 Q155,138 168,125 Q175,118 180,125 Q185,135 182,165 Q178,195 168,230 Z" fill="#18192a" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.3"/>
        {/* hood/head */}
        <ellipse cx="172" cy="118" rx="18" ry="22" fill="#18192a" stroke="#c9a84c" strokeWidth="0.7" strokeOpacity="0.3"/>
        {/* face in shadow (no eye) */}
        <path d="M163,114 Q172,108 181,114" fill="#0c0d14" stroke="#c9a84c" strokeWidth="0.5" strokeOpacity="0.2"/>
        {/* arm reaching RIGHT toward the eye, grasping empty air */}
        <path d="M182,140 Q210,135 250,140" fill="none" stroke="#18192a" strokeWidth="10" strokeLinecap="round"/>
        <path d="M182,140 Q210,135 250,140" fill="none" stroke="#c9a84c" strokeWidth="0.6" strokeOpacity="0.2"/>
        {/* bony hand open */}
        <circle cx="252" cy="140" r="6" fill="#18192a" stroke="#c9a84c" strokeWidth="0.5" strokeOpacity="0.25"/>
      </g>

      {/* GRAEAE RIGHT — hunched, reaching LEFT */}
      <g>
        <path d="M540,230 Q528,195 532,165 Q535,138 548,125 Q555,118 560,125 Q565,135 562,165 Q558,195 548,230 Z" fill="#18192a" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.3"/>
        <ellipse cx="548" cy="118" rx="18" ry="22" fill="#18192a" stroke="#c9a84c" strokeWidth="0.7" strokeOpacity="0.3"/>
        {/* face with the eye socket visible but empty — eye has been intercepted */}
        <path d="M539,114 Q548,108 557,114" fill="#0c0d14" stroke="#c9a84c" strokeWidth="0.5" strokeOpacity="0.2"/>
        <ellipse cx="545" cy="112" rx="5" ry="4" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.45"/>
        {/* arm reaching LEFT */}
        <path d="M532,140 Q500,135 460,140" fill="none" stroke="#18192a" strokeWidth="10" strokeLinecap="round"/>
        <circle cx="458" cy="140" r="6" fill="#18192a" stroke="#c9a84c" strokeWidth="0.5" strokeOpacity="0.25"/>
      </g>

      {/* THE EYE — glowing orb floating mid-air, moving between hands */}
      <g>
        <circle r="22" fill="url(#c3-eye)" fillOpacity="0.3">
          <animate attributeName="cx" values="350;270;350;440;350" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1"/>
          <animate attributeName="cy" values="138;140;136;140;138" dur="4s" repeatCount="indefinite"/>
          <animateTransform attributeName="transform" type="translate" values="350,138;270,140;350,136;440,140;350,138" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1" additive="replace"/>
        </circle>
        <circle r="10" fill="#c9a84c" fillOpacity="0.7">
          <animateTransform attributeName="transform" type="translate" values="350,138;270,140;350,136;440,140;350,138" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1" additive="replace"/>
          <animate attributeName="r" values="10;13;9;11;10" dur="1.5s" repeatCount="indefinite"/>
        </circle>
        {/* pupil */}
        <circle r="4" fill="#3a2800">
          <animateTransform attributeName="transform" type="translate" values="350,138;270,140;350,136;440,140;350,138" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1" additive="replace"/>
        </circle>
      </g>

      {/* PERSEUS silhouette — right edge, reaching in to snatch the eye */}
      <g opacity="0.75">
        <ellipse cx="620" cy="195" rx="12" ry="18" fill="#0f1020"/>
        <circle cx="620" cy="174" r="10" fill="#0f1020"/>
        <circle cx="620" cy="174" r="10" fill="none" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.4"/>
        {/* arm reaching left toward the eye */}
        <line x1="609" y1="186" x2="480" y2="142" stroke="#0f1020" strokeWidth="7" strokeLinecap="round"/>
        {/* hand near the eye */}
        <circle cx="476" cy="140" r="6" fill="#0f1020" stroke="#c9a84c" strokeWidth="0.7" strokeOpacity="0.4"/>
      </g>

      <rect width="700" height="260" fill="url(#c3-vig)"/>
      <rect x="1" y="1" width="698" height="258" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.28"/>
    </svg>
  );
}

// ─── Chapter IV: The Nymphs' Gifts ────────────────────────────────────────
function ChapterIV({ className, style }: IllustrationProps) {
  return (
    <svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id="c4-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <radialGradient id="c4-vig" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="100%" stopColor="#030208" stopOpacity="0.85"/>
        </radialGradient>
      </defs>

      <rect width="700" height="260" fill="#08080f"/>

      {/* Ethereal forest — triangle trees left & right */}
      {[[-10,0,60,200],[30,0,90,220],[60,10,110,230]].map(([x1,y1,x2,y2],i)=>(
        <polygon key={i} points={`${x1+40},${y1+30} ${x1},${y2} ${x2},${y2}`} fill="#0d0e18" stroke="#c9a84c" strokeWidth="0.4" strokeOpacity={0.12-i*0.02}/>
      ))}
      {[[560,30,620,220],[590,10,650,210],[620,0,680,230]].map(([x1,y1,x2,y2],i)=>(
        <polygon key={i} points={`${x1+30},${y1} ${x1},${y2} ${x2},${y2}`} fill="#0d0e18" stroke="#c9a84c" strokeWidth="0.4" strokeOpacity={0.12-i*0.02}/>
      ))}

      {/* Ground */}
      <path d="M0,235 Q350,220 700,235 L700,260 L0,260 Z" fill="#0d0e1a"/>

      {/* Magical light pool on ground */}
      <ellipse cx="350" cy="238" rx="120" ry="18" fill="#c9a84c" fillOpacity="0.06">
        <animate attributeName="rx" values="120;145;105;125;120" dur="3s" repeatCount="indefinite"/>
        <animate attributeName="fillOpacity" values="0.06;0.09;0.04;0.07;0.06" dur="3s" repeatCount="indefinite"/>
      </ellipse>

      {/* NYMPH figures — gossamer silhouettes */}
      {[[200,160],[350,148],[500,160]].map(([x,y],i)=>(
        <g key={i} opacity="0.38">
          <ellipse cx={x} cy={y+28} rx="10" ry="18" fill="#c9a84c"/>
          <circle cx={x} cy={y+6} r="9" fill="#c9a84c"/>
          {/* flowing dress */}
          <path d={`M${x-10},${y+28} Q${x-20},${y+55} ${x-5},${y+65} Q${x},${y+50} ${x+5},${y+65} Q${x+20},${y+55} ${x+10},${y+28}`} fill="#c9a84c" fillOpacity="0.3"/>
        </g>
      ))}

      {/* FLOATING ITEM 1 — Winged Sandals (left, lower) */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0;0,-12;0,0" dur="2.8s" repeatCount="indefinite" additive="sum"/>
        {/* sandal sole */}
        <ellipse cx="215" cy="148" rx="22" ry="8" fill="none" stroke="#c9a84c" strokeWidth="1.4" strokeOpacity="0.75"/>
        {/* straps */}
        <path d="M205,143 Q215,136 225,143" fill="none" stroke="#c9a84c" strokeWidth="1.1" strokeOpacity="0.65"/>
        {/* left wing */}
        <path d="M196,146 Q182,134 178,120 Q188,132 196,146" fill="#c9a84c" fillOpacity="0.55"/>
        <path d="M196,146 Q180,130 182,112 Q190,126 196,146" fill="#c9a84c" fillOpacity="0.35"/>
        {/* right wing */}
        <path d="M234,146 Q248,134 252,120 Q242,132 234,146" fill="#c9a84c" fillOpacity="0.55"/>
        <path d="M234,146 Q250,130 248,112 Q240,126 234,146" fill="#c9a84c" fillOpacity="0.35"/>
        {/* glow */}
        <ellipse cx="215" cy="148" rx="32" ry="16" fill="url(#c4-glow)"/>
      </g>

      {/* FLOATING ITEM 2 — Cap of Hades (center, higher) */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0;0,-16;0,0" dur="3.2s" repeatCount="indefinite" additive="sum"/>
        {/* helmet dome */}
        <path d="M318,72 Q318,42 350,40 Q382,42 382,72" fill="none" stroke="#c9a84c" strokeWidth="1.4" strokeOpacity="0.6"/>
        <line x1="314" y1="72" x2="386" y2="72" stroke="#c9a84c" strokeWidth="1.2" strokeOpacity="0.55"/>
        {/* helmet crest */}
        <path d="M334,42 Q350,28 366,42" fill="none" stroke="#c9a84c" strokeWidth="1.0" strokeOpacity="0.45"/>
        {/* ghostly fade — it makes wearer invisible */}
        <path d="M318,72 Q318,42 350,40 Q382,42 382,72" fill="#c9a84c" fillOpacity="0.04"/>
        <ellipse cx="350" cy="60" rx="40" ry="24" fill="url(#c4-glow)" fillOpacity="0.4"/>
      </g>

      {/* FLOATING ITEM 3 — Kibisis bag (right, mid) */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0;0,-10;0,0" dur="2.5s" repeatCount="indefinite" additive="sum"/>
        {/* bag body */}
        <path d="M458,100 Q452,115 454,138 Q456,158 480,162 Q504,158 506,138 Q508,115 502,100 Z" fill="none" stroke="#c9a84c" strokeWidth="1.4" strokeOpacity="0.65"/>
        {/* drawstring top */}
        <path d="M462,100 Q480,90 498,100" fill="none" stroke="#c9a84c" strokeWidth="1.1" strokeOpacity="0.6"/>
        <path d="M470,92 Q480,84 490,92" fill="none" stroke="#c9a84c" strokeWidth="0.9" strokeOpacity="0.5"/>
        {/* bag glow */}
        <ellipse cx="480" cy="132" rx="36" ry="32" fill="url(#c4-glow)" fillOpacity="0.5"/>
      </g>

      {/* HERMES right side — offering the harpe */}
      <g opacity="0.72">
        <ellipse cx="596" cy="188" rx="12" ry="20" fill="#1a1830"/>
        <circle cx="596" cy="164" r="11" fill="#1a1830"/>
        {/* winged helmet */}
        <path d="M587,158 Q580,148 576,150 Q582,160 587,160" fill="#c9a84c" opacity="0.65"/>
        <path d="M605,158 Q612,148 616,150 Q610,160 605,160" fill="#c9a84c" opacity="0.65"/>
        {/* arm extending harpe toward Perseus */}
        <line x1="584" y1="180" x2="540" y2="195" stroke="#1a1830" strokeWidth="8" strokeLinecap="round"/>
        {/* harpe — curved blade */}
        <path d="M538,195 Q525,188 522,200 Q525,212 538,208 Q548,202 538,195 Z" fill="#c9a84c" opacity="0.8"/>
        <line x1="538" y1="200" x2="510" y2="218" stroke="#c9a84c" strokeWidth="1.5" strokeOpacity="0.6"/>
      </g>

      {/* PERSEUS — center-bottom, reaching up */}
      <g>
        <ellipse cx="350" cy="218" rx="13" ry="20" fill="#0f1020"/>
        <circle cx="350" cy="194" r="11" fill="#0f1020"/>
        <circle cx="350" cy="194" r="11" fill="none" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.5"/>
        {/* arms raised upward */}
        <line x1="338" y1="207" x2="310" y2="185" stroke="#0f1020" strokeWidth="7" strokeLinecap="round"/>
        <line x1="362" y1="207" x2="390" y2="185" stroke="#0f1020" strokeWidth="7" strokeLinecap="round"/>
      </g>

      {/* Sparkle particles */}
      {[[280,90],[320,110],[370,80],[410,100],[450,75],[240,130],[490,120],[310,60]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="2" fill="#c9a84c">
          <animate attributeName="opacity" values={`${0.1};${0.8};${0.1}`} dur={`${1+i*0.4}s`} begin={`${i*0.3}s`} repeatCount="indefinite"/>
          <animate attributeName="r" values="2;3;1;2" dur={`${1+i*0.4}s`} begin={`${i*0.3}s`} repeatCount="indefinite"/>
        </circle>
      ))}

      <rect width="700" height="260" fill="url(#c4-vig)"/>
      <rect x="1" y="1" width="698" height="258" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.28"/>
    </svg>
  );
}

// ─── Chapter V: The Gorgon's Lair ─────────────────────────────────────────
function ChapterV({ className, style }: IllustrationProps) {
  return (
    <svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id="c5-shieldGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.55"/>
          <stop offset="40%" stopColor="#c9a84c" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <radialGradient id="c5-medusaGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6a3080" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <radialGradient id="c5-blood" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8B1515" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <radialGradient id="c5-vig" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="100%" stopColor="#020106" stopOpacity="0.9"/>
        </radialGradient>
        <radialGradient id="c5-pegasus" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e8dcc8" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
      </defs>

      <rect width="700" height="260" fill="#060508"/>

      {/* Cave ceiling rocks */}
      <path d="M0,0 L0,80 Q50,55 100,75 Q150,95 200,60 Q250,30 300,70 Q350,100 400,65 Q450,30 500,75 Q550,110 600,70 Q650,40 700,80 L700,0 Z" fill="#0e0c14"/>

      {/* Cave floor */}
      <path d="M0,220 Q100,210 200,225 Q300,240 400,218 Q500,200 600,222 Q650,230 700,218 L700,260 L0,260 Z" fill="#0c0a12"/>

      {/* Stone statue silhouettes — frozen figures around the edges */}
      {/* Left statue 1 — arm raised */}
      <g opacity="0.5" fill="#2a2835">
        <line x1="60" y1="220" x2="60" y2="145" stroke="#2a2835" strokeWidth="18" strokeLinecap="round"/>
        <circle cx="60" cy="132" r="14" fill="#2a2835"/>
        <line x1="60" y1="170" x2="30" y2="145" stroke="#2a2835" strokeWidth="12" strokeLinecap="round"/>
      </g>
      {/* Left statue 2 — crouching */}
      <g opacity="0.38" fill="#252330">
        <line x1="120" y1="220" x2="128" y2="175" stroke="#252330" strokeWidth="15" strokeLinecap="round"/>
        <circle cx="130" cy="162" r="12" fill="#252330"/>
        <line x1="128" y1="185" x2="105" y2="175" stroke="#252330" strokeWidth="10" strokeLinecap="round"/>
        <line x1="128" y1="185" x2="148" y2="170" stroke="#252330" strokeWidth="10" strokeLinecap="round"/>
      </g>
      {/* Right statue 1 */}
      <g opacity="0.45" fill="#2a2835">
        <line x1="640" y1="220" x2="640" y2="148" stroke="#2a2835" strokeWidth="18" strokeLinecap="round"/>
        <circle cx="640" cy="135" r="13" fill="#2a2835"/>
        <line x1="640" y1="172" x2="665" y2="150" stroke="#2a2835" strokeWidth="12" strokeLinecap="round"/>
      </g>
      {/* Right statue 2 */}
      <g opacity="0.35" fill="#222030">
        <line x1="575" y1="220" x2="568" y2="178" stroke="#222030" strokeWidth="14" strokeLinecap="round"/>
        <circle cx="566" cy="165" r="11" fill="#222030"/>
        <line x1="568" y1="190" x2="590" y2="178" stroke="#222030" strokeWidth="9" strokeLinecap="round"/>
      </g>

      {/* MEDUSA — sleeping figure center-background */}
      <g opacity="0.7">
        {/* body reclining */}
        <ellipse cx="390" cy="215" rx="55" ry="18" fill="#1a0d20"/>
        {/* head */}
        <circle cx="348" cy="208" r="20" fill="#1a0d20"/>
        {/* SNAKE HAIR — radiating from head, slowly rotating */}
        <g>
          <animateTransform attributeName="transform" type="rotate" values="0,348,208;8,348,208;-8,348,208;0,348,208" dur="3s" repeatCount="indefinite"/>
          {[-60,-40,-20,0,20,40,60,-80,80].map((angle,i)=>{
            const rad = (angle-90)*Math.PI/180;
            const ex = 348+Math.cos(rad)*38;
            const ey = 208+Math.sin(rad)*38;
            const mx = 348+Math.cos(rad)*22+Math.sin(rad)*8*(i%2?1:-1);
            const my = 208+Math.sin(rad)*22-Math.cos(rad)*8*(i%2?1:-1);
            return <path key={i} d={`M${348},${208} Q${mx},${my} ${ex},${ey}`} fill="none" stroke="#6a3080" strokeWidth="2" strokeOpacity={0.5+i*0.04} strokeLinecap="round"/>;
          })}
          {/* small snake heads */}
          {[-60,-20,20,60].map((angle,i)=>{
            const rad=(angle-90)*Math.PI/180;
            return <circle key={i} cx={348+Math.cos(rad)*40} cy={208+Math.sin(rad)*40} r="3" fill="#6a3080" fillOpacity="0.7"/>;
          })}
        </g>
        {/* medusa glow */}
        <ellipse cx="348" cy="208" rx="50" ry="40" fill="url(#c5-medusaGlow)"/>
      </g>

      {/* PERSEUS — crouching, BACK to Medusa, holding shield up as mirror */}
      <g>
        {/* body — crouching, turned away from Medusa */}
        <ellipse cx="220" cy="200" rx="20" ry="28" fill="#0f1020"/>
        {/* legs bent */}
        <path d="M210,220 Q195,238 188,250" fill="none" stroke="#0f1020" strokeWidth="12" strokeLinecap="round"/>
        <path d="M230,220 Q240,240 242,252" fill="none" stroke="#0f1020" strokeWidth="12" strokeLinecap="round"/>
        {/* head turned sideways, looking at shield */}
        <circle cx="208" cy="174" r="14" fill="#0f1020"/>
        <circle cx="208" cy="174" r="14" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.4"/>
        {/* arm holding SHIELD UP behind/above (shield faces Medusa) */}
        <line x1="226" y1="185" x2="270" y2="162" stroke="#0f1020" strokeWidth="10" strokeLinecap="round"/>
        {/* arm with HARPE raised, ready to strike toward Medusa */}
        <line x1="228" y1="195" x2="295" y2="175" stroke="#0f1020" strokeWidth="9" strokeLinecap="round"/>
      </g>

      {/* SHIELD — polished, facing Medusa, held by Perseus's extended arm */}
      <g>
        {/* shield body */}
        <ellipse cx="295" cy="155" rx="48" ry="52" fill="#1a1828" stroke="#c9a84c" strokeWidth="2" strokeOpacity="0.7"/>
        <ellipse cx="295" cy="155" rx="42" ry="46" fill="#12101e" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.4"/>
        {/* shield glow (it is polished, reflecting) */}
        <ellipse cx="295" cy="155" rx="60" ry="64" fill="url(#c5-shieldGlow)">
          <animate attributeName="rx" values="60;72;52;64;60" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="ry" values="64;55;70;60;64" dur="2s" repeatCount="indefinite"/>
        </ellipse>
        {/* REFLECTED MEDUSA FACE in the shield surface */}
        {/* reflected eyes — glowing */}
        <ellipse cx="287" cy="148" rx="6" ry="4" fill="#6a3080" fillOpacity="0.7" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.5"/>
        <ellipse cx="303" cy="148" rx="6" ry="4" fill="#6a3080" fillOpacity="0.7" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.5"/>
        <circle cx="287" cy="148" r="2.5" fill="#c9a84c" fillOpacity="0.6">
          <animate attributeName="r" values="2.5;3.5;2;3;2.5" dur="1.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="303" cy="148" r="2.5" fill="#c9a84c" fillOpacity="0.6">
          <animate attributeName="r" values="2.5;2;3.5;2.5;3;2.5" dur="1.8s" repeatCount="indefinite"/>
        </circle>
        {/* reflected snake hair in shield */}
        <g opacity="0.55">
          <animateTransform attributeName="transform" type="rotate" values="0,295,140;5,295,140;-5,295,140;0,295,140" dur="3s" repeatCount="indefinite"/>
          {[-35,-18,0,18,35,-50,50].map((angle,i)=>{
            const rad=(angle-90)*Math.PI/180;
            return <path key={i} d={`M${295},${140} Q${295+Math.cos(rad)*16},${140+Math.sin(rad)*16} ${295+Math.cos(rad)*28},${140+Math.sin(rad)*28}`} fill="none" stroke="#6a3080" strokeWidth="1.5" strokeLinecap="round"/>;
          })}
        </g>
        {/* reflected open screaming mouth */}
        <path d="M285,158 Q295,165 305,158" fill="none" stroke="#6a3080" strokeWidth="1.5" strokeOpacity="0.7"/>
        {/* highlight shimmer on shield surface */}
        <path d="M270,128 Q285,122 300,128" fill="none" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.4"/>
      </g>

      {/* HARPE — curved blade at end of Perseus's arm, aimed at Medusa */}
      <g>
        <path d="M297,177 Q318,168 330,182 Q338,196 322,205 Q308,210 297,200 Z" fill="#c9a84c" fillOpacity="0.85"/>
        <line x1="297" y1="177" x2="275" y2="192" stroke="#c9a84c" strokeWidth="2" strokeOpacity="0.7"/>
      </g>

      {/* PEGASUS — white silhouette rising in upper background (ethereal, barely visible) */}
      <g opacity="0.35">
        <animateTransform attributeName="transform" type="translate" values="0,0;0,-18;0,0" dur="4s" repeatCount="indefinite"/>
        {/* body */}
        <ellipse cx="545" cy="100" rx="40" ry="18" fill="#e8dcc8"/>
        {/* head & neck */}
        <path d="M510,95 Q500,75 508,60 Q518,68 520,85" fill="#e8dcc8"/>
        <circle cx="505" cy="58" r="12" fill="#e8dcc8"/>
        {/* wings spread */}
        <path d="M530,88 Q505,55 485,40 Q505,68 525,88" fill="#e8dcc8" fillOpacity="0.7"/>
        <path d="M530,88 Q520,48 510,28 Q515,55 528,88" fill="#e8dcc8" fillOpacity="0.5"/>
        <path d="M560,88 Q585,55 605,40 Q585,68 565,88" fill="#e8dcc8" fillOpacity="0.7"/>
        <path d="M560,88 Q570,48 580,28 Q575,55 562,88" fill="#e8dcc8" fillOpacity="0.5"/>
        {/* legs */}
        <line x1="525" y1="115" x2="518" y2="135" stroke="#e8dcc8" strokeWidth="6" strokeLinecap="round"/>
        <line x1="555" y1="115" x2="565" y2="132" stroke="#e8dcc8" strokeWidth="6" strokeLinecap="round"/>
        {/* ethereal glow around Pegasus */}
        <ellipse cx="545" cy="85" rx="70" ry="50" fill="url(#c5-pegasus)"/>
      </g>

      {/* Blood pool at Medusa's neck — anticipatory */}
      <ellipse cx="348" cy="225" rx="30" ry="8" fill="url(#c5-blood)" opacity="0.7"/>

      <rect width="700" height="260" fill="url(#c5-vig)"/>
      <rect x="1" y="1" width="698" height="258" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.28"/>
    </svg>
  );
}

// ─── Chapter VI: The Flight Home ──────────────────────────────────────────
function ChapterVI({ className, style }: IllustrationProps) {
  return (
    <svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id="c6-moon" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.12"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <linearGradient id="c6-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d1a2a"/>
          <stop offset="100%" stopColor="#080e18"/>
        </linearGradient>
        <radialGradient id="c6-vig" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="100%" stopColor="#020308" stopOpacity="0.88"/>
        </radialGradient>
        <linearGradient id="c6-stoneAtlas" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#3a4050"/>
          <stop offset="100%" stopColor="#1a1820"/>
        </linearGradient>
      </defs>

      <rect width="700" height="260" fill="#060810"/>

      {/* Moon */}
      <circle cx="580" cy="65" r="50" fill="url(#c6-moon)"/>
      <circle cx="580" cy="65" r="42" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.4"/>
      <circle cx="580" cy="65" r="38" fill="none" stroke="#c9a84c" strokeWidth="0.4" strokeOpacity="0.2"/>

      {/* Stars */}
      {[[40,20],[100,12],[180,30],[240,8],[300,18],[420,10],[480,28],[650,20],[30,55],[680,45],[200,45],[130,40]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r={i%3===0?1.2:0.7} fill="#c9a84c" fillOpacity={0.2+(i%5)*0.08}>
          <animate attributeName="opacity" values={`${0.2+(i%5)*0.08};${0.6+(i%4)*0.1};${0.15+(i%3)*0.06};${0.2+(i%5)*0.08}`} dur={`${2+i*0.35}s`} repeatCount="indefinite"/>
        </circle>
      ))}

      {/* Cloud streaks */}
      <path d="M80,75 Q150,65 220,75 Q280,83 340,70" fill="none" stroke="#c9a84c" strokeWidth="0.5" strokeOpacity="0.1"/>
      <path d="M400,55 Q460,45 520,58 Q560,65 610,52" fill="none" stroke="#c9a84c" strokeWidth="0.5" strokeOpacity="0.08"/>
      <path d="M50,100 Q120,88 190,102" fill="none" stroke="#c9a84c" strokeWidth="0.4" strokeOpacity="0.08"/>

      {/* Sea */}
      <rect x="0" y="190" width="700" height="70" fill="url(#c6-sea)"/>
      {/* Waves */}
      <g>
        <path d="M0,198 Q50,188 100,198 Q150,208 200,198 Q250,188 300,198 Q350,208 400,198 Q450,188 500,198 Q550,208 600,198 Q650,188 700,198" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.25">
          <animateTransform attributeName="transform" type="translate" values="0,0;-100,0;0,0" dur="6s" repeatCount="indefinite"/>
        </path>
        <path d="M0,210 Q60,200 120,210 Q180,220 240,210 Q300,200 360,210 Q420,220 480,210 Q540,200 600,210 Q660,220 700,210" fill="none" stroke="#c9a84c" strokeWidth="0.6" strokeOpacity="0.18">
          <animateTransform attributeName="transform" type="translate" values="0,0;80,0;0,0" dur="7s" repeatCount="indefinite"/>
        </path>
        <path d="M0,225 Q70,215 140,225 Q210,235 280,225 Q350,215 420,225 Q490,235 560,225 Q630,215 700,225" fill="none" stroke="#c9a84c" strokeWidth="0.5" strokeOpacity="0.14">
          <animateTransform attributeName="transform" type="translate" values="0,0;-60,0;0,0" dur="8s" repeatCount="indefinite"/>
        </path>
      </g>

      {/* Moonpath on sea */}
      <ellipse cx="580" cy="210" rx="45" ry="8" fill="#c9a84c" fillOpacity="0.05"/>

      {/* ATLAS — left side, being petrified into mountain */}
      <g>
        {/* Atlas body silhouette — arms raised holding sky */}
        <ellipse cx="120" cy="165" rx="28" ry="38" fill="#1a1820"/>
        <circle cx="120" cy="124" r="20" fill="#1a1820"/>
        {/* arms raised overhead holding weight */}
        <line x1="96" y1="140" x2="60" y2="100" stroke="#1a1820" strokeWidth="14" strokeLinecap="round"/>
        <line x1="144" y1="140" x2="180" y2="100" stroke="#1a1820" strokeWidth="14" strokeLinecap="round"/>
        {/* the sky/globe he carries */}
        <ellipse cx="120" cy="90" rx="55" ry="18" fill="none" stroke="#3a4050" strokeWidth="1.5" strokeOpacity="0.6"/>

        {/* STONE spreading up from feet — grey rectangle growing */}
        <rect x="94" y="170" width="52" height="30" fill="url(#c6-stoneAtlas)" rx="2" opacity="0.8"/>
        <rect x="94" y="155" width="52" height="20" fill="url(#c6-stoneAtlas)" rx="1" opacity="0.6">
          <animate attributeName="height" values="20;35;20" dur="3s" repeatCount="indefinite"/>
          <animate attributeName="y" values="155;140;155" dur="3s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.6;0.8;0.6" dur="3s" repeatCount="indefinite"/>
        </rect>
        {/* crack lines on atlas */}
        <line x1="105" y1="168" x2="118" y2="145" stroke="#c9a84c" strokeWidth="0.5" strokeOpacity="0.3"/>
        <line x1="130" y1="165" x2="140" y2="142" stroke="#c9a84c" strokeWidth="0.5" strokeOpacity="0.3"/>
        {/* stone texture */}
        <path d="M98,180 Q108,175 118,182 Q128,188 138,180" fill="none" stroke="#4a5060" strokeWidth="0.7" strokeOpacity="0.5"/>
      </g>

      {/* PERSEUS flying — center-upper */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0;0,-8;0,4;0,0" dur="3s" repeatCount="indefinite"/>
        {/* body */}
        <ellipse cx="400" cy="105" rx="12" ry="22" fill="#c9a84c" fillOpacity="0.85"/>
        {/* head */}
        <circle cx="400" cy="80" r="11" fill="#c9a84c" fillOpacity="0.85"/>
        {/* cape streaming behind */}
        <path d="M390,95 Q368,88 355,78 Q372,90 388,108" fill="#c9a84c" fillOpacity="0.4"/>
        {/* left sandal wing */}
        <path d="M393,124 Q378,112 372,98 Q384,112 393,124" fill="#c9a84c" fillOpacity="0.7"/>
        <path d="M393,124 Q376,108 376,90 Q386,108 393,124" fill="#c9a84c" fillOpacity="0.5"/>
        {/* right sandal wing */}
        <path d="M407,124 Q422,112 428,98 Q416,112 407,124" fill="#c9a84c" fillOpacity="0.7"/>
        <path d="M407,124 Q424,108 424,90 Q414,108 407,124" fill="#c9a84c" fillOpacity="0.5"/>
        {/* kibisis bag at side */}
        <path d="M412,108 Q420,114 418,124 Q414,132 408,128 Q404,120 408,110 Z" fill="#c9a84c" fillOpacity="0.6"/>
        {/* harpe in hand */}
        <path d="M388,95 Q375,88 372,98 Q375,108 388,105 Q396,100 388,95 Z" fill="#c9a84c" fillOpacity="0.75"/>
      </g>

      {/* Motion trail behind Perseus */}
      <path d="M390,108 Q360,112 330,108 Q310,106 290,110" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeOpacity="0.2" strokeDasharray="8,6"/>
      <path d="M393,115 Q362,120 330,118 Q305,116 280,122" fill="none" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.12" strokeDasharray="6,8"/>

      <rect width="700" height="260" fill="url(#c6-vig)"/>
      <rect x="1" y="1" width="698" height="258" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.28"/>
    </svg>
  );
}

// ─── Chapter VII: Andromeda ────────────────────────────────────────────────
function ChapterVII({ className, style }: IllustrationProps) {
  return (
    <svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id="c7-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a1828"/>
          <stop offset="100%" stopColor="#06101e"/>
        </linearGradient>
        <radialGradient id="c7-cetus" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1a3040" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <radialGradient id="c7-vig" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="100%" stopColor="#020308" stopOpacity="0.9"/>
        </radialGradient>
      </defs>

      <rect width="700" height="260" fill="#07090f"/>

      {/* Dark storm sky */}
      <path d="M0,0 Q175,40 350,20 Q525,0 700,30 L700,0 Z" fill="#0d1018"/>
      <path d="M0,30 Q200,55 400,35 Q550,20 700,45 L700,0 L0,0 Z" fill="#111520" fillOpacity="0.5"/>

      {/* Stars — faint through storm */}
      {[[50,18],[150,10],[280,22],[500,8],[620,15],[680,35]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="0.8" fill="#c9a84c" fillOpacity="0.2"/>
      ))}

      {/* SEA */}
      <rect x="0" y="165" width="700" height="95" fill="url(#c7-sea)"/>

      {/* Churning waves — animated */}
      <g>
        <path d="M0,170 Q40,158 80,170 Q120,182 160,170 Q200,158 240,170 Q280,182 320,170 Q360,158 400,170 Q440,182 480,170 Q520,158 560,170 Q600,182 640,170 Q670,162 700,170" fill="none" stroke="#c9a84c" strokeWidth="1.2" strokeOpacity="0.3">
          <animateTransform attributeName="transform" type="translate" values="0,0;-80,0;0,0" dur="4s" repeatCount="indefinite"/>
        </path>
        <path d="M0,182 Q50,170 100,182 Q150,194 200,182 Q250,170 300,182 Q350,194 400,182 Q450,170 500,182 Q550,194 600,182 Q650,170 700,182" fill="none" stroke="#c9a84c" strokeWidth="0.9" strokeOpacity="0.22">
          <animateTransform attributeName="transform" type="translate" values="0,0;60,0;0,0" dur="5s" repeatCount="indefinite"/>
        </path>
        <path d="M0,196 Q60,184 120,196 Q180,208 240,196 Q300,184 360,196 Q420,208 480,196 Q540,184 600,196 Q650,204 700,196" fill="none" stroke="#c9a84c" strokeWidth="0.7" strokeOpacity="0.16">
          <animateTransform attributeName="transform" type="translate" values="0,0;-40,0;0,0" dur="6s" repeatCount="indefinite"/>
        </path>
      </g>

      {/* CLIFF face — left side */}
      <path d="M0,260 L0,50 Q20,45 35,55 Q50,65 48,80 L50,260 Z" fill="#151220"/>
      <path d="M50,260 L48,80 Q52,60 65,50 Q78,42 80,60 L85,260 Z" fill="#1a1828"/>
      {/* cliff texture */}
      <line x1="40" y1="100" x2="55" y2="130" stroke="#c9a84c" strokeWidth="0.4" strokeOpacity="0.15"/>
      <line x1="42" y1="150" x2="58" y2="175" stroke="#c9a84c" strokeWidth="0.4" strokeOpacity="0.12"/>
      <line x1="35" y1="200" x2="50" y2="220" stroke="#c9a84c" strokeWidth="0.4" strokeOpacity="0.1"/>

      {/* ANDROMEDA chained to cliff */}
      <g>
        {/* body */}
        <ellipse cx="105" cy="130" rx="13" ry="28" fill="#1a1830"/>
        {/* head */}
        <circle cx="105" cy="98" r="13" fill="#1a1830"/>
        <circle cx="105" cy="98" r="13" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.5"/>
        {/* arms outstretched to either side, chained */}
        <line x1="93" y1="118" x2="62" y2="112" stroke="#1a1830" strokeWidth="9" strokeLinecap="round"/>
        <line x1="117" y1="118" x2="148" y2="112" stroke="#1a1830" strokeWidth="9" strokeLinecap="round"/>
        {/* chain links left */}
        {[0,1,2].map(i=>(
          <ellipse key={i} cx={80-i*7} cy={112} rx="4" ry="2.5" fill="none" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.5" transform={`rotate(${i*15},${80-i*7},112)`}/>
        ))}
        {/* chain anchor left */}
        <circle cx="62" cy="112" r="4" fill="#2a2030" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.5"/>
        {/* chain links right */}
        {[0,1,2].map(i=>(
          <ellipse key={i} cx={128+i*6} cy={112} rx="4" ry="2.5" fill="none" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.5" transform={`rotate(${-i*15},${128+i*6},112)`}/>
        ))}
        <circle cx="148" cy="112" r="4" fill="#2a2030" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.5"/>
        {/* legs */}
        <line x1="100" y1="155" x2="95" y2="180" stroke="#1a1830" strokeWidth="8" strokeLinecap="round"/>
        <line x1="110" y1="155" x2="115" y2="180" stroke="#1a1830" strokeWidth="8" strokeLinecap="round"/>
      </g>

      {/* CETUS — rising from water, center, serpentine */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0;0,-12;0,6;0,0" dur="3.5s" repeatCount="indefinite"/>
        {/* body coils */}
        <path d="M320,260 Q310,230 330,210 Q350,190 340,165 Q330,145 360,130 Q390,115 380,90" fill="none" stroke="#1a3040" strokeWidth="30" strokeLinecap="round"/>
        <path d="M320,260 Q310,230 330,210 Q350,190 340,165 Q330,145 360,130 Q390,115 380,90" fill="none" stroke="#0f2030" strokeWidth="22" strokeLinecap="round"/>
        {/* second coil */}
        <path d="M380,200 Q400,180 420,195 Q440,210 430,230" fill="none" stroke="#1a3040" strokeWidth="24" strokeLinecap="round"/>
        {/* head */}
        <ellipse cx="378" cy="78" rx="35" ry="25" fill="#1a3040" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.4"/>
        {/* jaw open */}
        <path d="M348,88 Q378,105 408,88" fill="#0a1828" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.5"/>
        {/* teeth */}
        {[358,370,382,394].map((x,i)=>(
          <polygon key={i} points={`${x},88 ${x-4},100 ${x+4},100`} fill="#c9a84c" fillOpacity="0.6"/>
        ))}
        {/* eye */}
        <circle cx="362" cy="72" r="7" fill="#6a3010" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.7"/>
        <circle cx="362" cy="72" r="3" fill="#c9a84c" fillOpacity="0.7"/>
        {/* fins */}
        <path d="M345,135 Q320,120 315,100 Q332,118 345,135" fill="#1a3040" fillOpacity="0.7"/>
        {/* spray */}
        <path d="M340,160 Q325,150 320,140 Q328,152 338,162" fill="none" stroke="#8ab4e8" strokeWidth="1.5" strokeOpacity="0.4"/>
        <path d="M360,150 Q375,140 380,128 Q372,142 362,152" fill="none" stroke="#8ab4e8" strokeWidth="1.5" strokeOpacity="0.35"/>
      </g>

      {/* PERSEUS — diving from upper right toward Cetus */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0;0,10;0,0" dur="2.5s" repeatCount="indefinite"/>
        {/* body angled downward */}
        <ellipse cx="570" cy="90" rx="12" ry="28" fill="#c9a84c" fillOpacity="0.85" transform="rotate(-40,570,90)"/>
        {/* head */}
        <circle cx="552" cy="72" r="12" fill="#c9a84c" fillOpacity="0.85"/>
        {/* harpe extended forward/downward */}
        <path d="M533,82 Q510,95 505,112 Q512,104 530,92 Z" fill="#c9a84c" fillOpacity="0.9"/>
        <line x1="545" y1="82" x2="508" y2="108" stroke="#c9a84c" strokeWidth="2.5" strokeOpacity="0.8"/>
        {/* cape streaming up-behind */}
        <path d="M578,78 Q600,60 620,55 Q600,70 582,90" fill="#c9a84c" fillOpacity="0.4"/>
        {/* sandal wings */}
        <path d="M582,102 Q598,90 600,76 Q592,90 582,102" fill="#c9a84c" fillOpacity="0.65"/>
        <path d="M582,102 Q600,86 605,70 Q595,86 582,102" fill="#c9a84c" fillOpacity="0.45"/>
        <path d="M572,108 Q555,98 552,82 Q560,96 572,108" fill="#c9a84c" fillOpacity="0.65"/>
      </g>

      <rect width="700" height="260" fill="url(#c7-vig)"/>
      <rect x="1" y="1" width="698" height="258" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.28"/>
    </svg>
  );
}

// ─── Chapter VIII: Return to Seriphus ────────────────────────────────────
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
          <stop offset="100%" stopColor="#020208" stopOpacity="0.9"/>
        </radialGradient>
        <radialGradient id="c8-stone" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4a5060" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
      </defs>

      <rect width="700" height="260" fill="#08070e"/>

      {/* Floor */}
      <rect x="0" y="215" width="700" height="45" fill="#0d0b16"/>
      {/* Floor perspective lines */}
      <line x1="350" y1="215" x2="0" y2="260" stroke="#c9a84c" strokeWidth="0.4" strokeOpacity="0.1"/>
      <line x1="350" y1="215" x2="700" y2="260" stroke="#c9a84c" strokeWidth="0.4" strokeOpacity="0.1"/>
      <line x1="350" y1="215" x2="150" y2="260" stroke="#c9a84c" strokeWidth="0.3" strokeOpacity="0.07"/>
      <line x1="350" y1="215" x2="550" y2="260" stroke="#c9a84c" strokeWidth="0.3" strokeOpacity="0.07"/>

      {/* Palace columns left */}
      <rect x="50" y="30" width="30" height="200" rx="3" fill="#13111e"/>
      <rect x="48" y="28" width="34" height="12" rx="2" fill="#1a1828"/>
      <rect x="48" y="215" width="34" height="12" rx="2" fill="#1a1828"/>
      <rect x="130" y="50" width="24" height="175" rx="2" fill="#111020"/>
      <rect x="128" y="48" width="28" height="10" rx="2" fill="#181628"/>

      {/* Palace columns right */}
      <rect x="620" y="30" width="30" height="200" rx="3" fill="#13111e"/>
      <rect x="618" y="28" width="34" height="12" rx="2" fill="#1a1828"/>
      <rect x="618" y="215" width="34" height="12" rx="2" fill="#1a1828"/>
      <rect x="546" y="50" width="24" height="175" rx="2" fill="#111020"/>
      <rect x="544" y="48" width="28" height="10" rx="2" fill="#181628"/>

      {/* Throne */}
      <rect x="310" y="95" width="80" height="125" rx="3" fill="#1a1530"/>
      <rect x="305" y="88" width="90" height="18" rx="3" fill="#221840"/>
      <rect x="308" y="148" width="18" height="8" rx="2" fill="#28204a"/>
      <rect x="374" y="148" width="18" height="8" rx="2" fill="#28204a"/>
      {/* Throne crown back */}
      <path d="M318,88 L322,72 L330,83 L350,62 L370,83 L378,72 L382,88 Z" fill="#c9a84c" opacity="0.8"/>

      {/* POLYDECTES — stone figure on throne, mid-gesture being petrified */}
      <g>
        {/* body — turning grey */}
        <ellipse cx="350" cy="168" rx="28" ry="38" fill="#3a4050"/>
        <circle cx="350" cy="126" r="20" fill="#3a4050"/>
        <circle cx="350" cy="126" r="20" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.3"/>
        {/* arm frozen mid-gesture */}
        <line x1="323" y1="148" x2="295" y2="138" stroke="#3a4050" strokeWidth="12" strokeLinecap="round"/>
        {/* crack lines on stone figure */}
        <path d="M340,118 Q348,128 342,138" fill="none" stroke="#c9a84c" strokeWidth="0.7" strokeOpacity="0.4"/>
        <path d="M355,122 Q360,135 358,148" fill="none" stroke="#c9a84c" strokeWidth="0.5" strokeOpacity="0.3"/>
        <path d="M336,155 Q345,162 340,175" fill="none" stroke="#c9a84c" strokeWidth="0.6" strokeOpacity="0.35"/>
        {/* stone texture radial */}
        <ellipse cx="350" cy="150" rx="35" ry="48" fill="url(#c8-stone)"/>
      </g>

      {/* Court figure left — stone */}
      <g opacity="0.5">
        <line x1="220" y1="215" x2="220" y2="148" stroke="#2a3040" strokeWidth="20" strokeLinecap="round"/>
        <circle cx="220" cy="134" r="15" fill="#2a3040"/>
        <line x1="220" y1="168" x2="195" y2="150" stroke="#2a3040" strokeWidth="14" strokeLinecap="round"/>
        {/* crack */}
        <line x1="215" y1="160" x2="225" y2="140" stroke="#c9a84c" strokeWidth="0.5" strokeOpacity="0.3"/>
      </g>
      {/* Court figure right — stone */}
      <g opacity="0.45">
        <line x1="480" y1="215" x2="480" y2="152" stroke="#2a3040" strokeWidth="20" strokeLinecap="round"/>
        <circle cx="480" cy="138" r="14" fill="#2a3040"/>
        <line x1="480" y1="172" x2="505" y2="155" stroke="#2a3040" strokeWidth="13" strokeLinecap="round"/>
        <line x1="480" y1="165" x2="472" y2="148" stroke="#c9a84c" strokeWidth="0.5" strokeOpacity="0.28"/>
      </g>

      {/* PETRIFICATION RINGS — expanding from kibisis */}
      {[0,1,2,3,4].map(i=>(
        <circle key={i} cx="155" cy="185" r="10" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeOpacity="0">
          <animate attributeName="r" values="10;180" dur="2.5s" begin={`${i*0.5}s`} repeatCount="indefinite"/>
          <animate attributeName="strokeOpacity" values="0.5;0" dur="2.5s" begin={`${i*0.5}s`} repeatCount="indefinite"/>
          <animate attributeName="strokeWidth" values="2;0.3" dur="2.5s" begin={`${i*0.5}s`} repeatCount="indefinite"/>
        </circle>
      ))}

      {/* PERSEUS in doorway left — holding kibisis open */}
      <g>
        {/* doorway arch */}
        <path d="M100,260 L100,180 Q120,155 140,180 L140,260" fill="#0f0d1a" stroke="#c9a84c" strokeWidth="0.6" strokeOpacity="0.3"/>
        {/* Perseus body in doorway */}
        <ellipse cx="120" cy="205" rx="13" ry="22" fill="#0f1020"/>
        <circle cx="120" cy="180" r="11" fill="#0f1020"/>
        <circle cx="120" cy="180" r="11" fill="none" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.55"/>
        {/* arm extended holding open kibisis */}
        <line x1="132" y1="195" x2="160" y2="188" stroke="#0f1020" strokeWidth="8" strokeLinecap="round"/>
        {/* KIBISIS open bag, radiating gorgon light */}
        <path d="M148,178 Q142,192 144,208 Q148,218 162,218 Q176,218 180,208 Q182,192 176,178 Z" fill="none" stroke="#c9a84c" strokeWidth="1.4" strokeOpacity="0.7"/>
        {/* open mouth of bag */}
        <path d="M150,178 Q162,168 174,178" fill="none" stroke="#c9a84c" strokeWidth="1.2" strokeOpacity="0.7"/>
        {/* glow from bag interior */}
        <ellipse cx="162" cy="198" rx="20" ry="24" fill="url(#c8-kibisis)">
          <animate attributeName="rx" values="20;28;18;24;20" dur="1.5s" repeatCount="indefinite"/>
          <animate attributeName="ry" values="24;18;28;20;24" dur="1.5s" repeatCount="indefinite"/>
        </ellipse>
      </g>

      <rect width="700" height="260" fill="url(#c8-vig)"/>
      <rect x="1" y="1" width="698" height="258" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.28"/>
    </svg>
  );
}

// ─── Chapter IX: Endings ──────────────────────────────────────────────────
function ChapterIX({ className, style }: IllustrationProps) {
  return (
    <svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id="c9-vig" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="100%" stopColor="#020208" stopOpacity="0.88"/>
        </radialGradient>
      </defs>

      <rect width="700" height="260" fill="#060810"/>

      {/* PERSEUS CONSTELLATION — background stars connected by lines */}
      {/* Constellation star positions */}
      {[[80,30],[120,55],[155,35],[190,60],[145,90],[175,110],[200,80],[230,45]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r={i%2===0?1.8:1.2} fill="#c9a84c" fillOpacity={0.35+(i%4)*0.1}>
          <animate attributeName="opacity" values={`${0.35+(i%4)*0.1};${0.7+(i%3)*0.1};${0.25+(i%4)*0.08};${0.35+(i%4)*0.1}`} dur={`${2.5+i*0.4}s`} repeatCount="indefinite"/>
        </circle>
      ))}
      {/* Constellation lines */}
      <polyline points="80,30 120,55 155,35 190,60 145,90 175,110" fill="none" stroke="#c9a84c" strokeWidth="0.6" strokeOpacity="0.18" strokeDasharray="4,5"/>
      <polyline points="120,55 200,80 230,45 190,60" fill="none" stroke="#c9a84c" strokeWidth="0.6" strokeOpacity="0.18" strokeDasharray="4,5"/>
      <line x1="145" y1="90" x2="200" y2="80" stroke="#c9a84c" strokeWidth="0.6" strokeOpacity="0.18" strokeDasharray="4,5"/>

      {/* Other stars scattered */}
      {[[300,18],[380,8],[450,22],[520,12],[600,28],[660,18],[400,38],[560,40],[650,48]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="0.8" fill="#c9a84c" fillOpacity={0.15+(i%4)*0.06}>
          <animate attributeName="opacity" values={`${0.15+(i%4)*0.06};${0.4+(i%3)*0.08};${0.1};${0.15+(i%4)*0.06}`} dur={`${3+i*0.5}s`} repeatCount="indefinite"/>
        </circle>
      ))}

      {/* Arena ground */}
      <path d="M0,220 Q350,200 700,215 L700,260 L0,260 Z" fill="#0d0b18"/>
      <line x1="0" y1="222" x2="700" y2="218" stroke="#c9a84c" strokeWidth="0.5" strokeOpacity="0.18"/>

      {/* Crowd silhouettes — right side */}
      {[460,490,518,544,568,592,614,636,658,678].map((x,i)=>(
        <g key={i} opacity={0.25+i*0.02}>
          <line x1={x} y1="222" x2={x} y2={188+i%3*8} stroke="#c9a84c" strokeWidth={4+i%2} strokeLinecap="round"/>
          <circle cx={x} cy={182+i%3*8} r={5+i%2} fill="#c9a84c" fillOpacity="0.3"/>
        </g>
      ))}

      {/* ACRISIUS — struck figure on right, falling */}
      <g opacity="0.7">
        {/* falling/bent body */}
        <ellipse cx="500" cy="205" rx="25" ry="10" fill="#1a1830" transform="rotate(-20,500,205)"/>
        <circle cx="478" cy="196" r="12" fill="#1a1830"/>
        <circle cx="478" cy="196" r="12" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.4"/>
        {/* impact point — discus hit mark */}
        <circle cx="490" cy="192" r="8" fill="none" stroke="#c9a84c" strokeWidth="1.2" strokeOpacity="0.5"/>
        <circle cx="490" cy="192" r="4" fill="#c9a84c" fillOpacity="0.2"/>
        {/* arms thrown out */}
        <line x1="488" y1="202" x2="510" y2="215" stroke="#1a1830" strokeWidth="7" strokeLinecap="round"/>
        <line x1="472" y1="202" x2="455" y2="218" stroke="#1a1830" strokeWidth="7" strokeLinecap="round"/>
      </g>

      {/* DISCUS — animated along arc */}
      <g>
        {/* flight arc path (dashed trail) */}
        <path id="c9-arc" d="M180,195 Q280,80 490,192" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.2" strokeDasharray="8,6"/>

        {/* discus ellipse traveling the arc */}
        <g>
          <ellipse rx="14" ry="5" fill="#c9a84c" fillOpacity="0.15" stroke="#c9a84c" strokeWidth="1.4" strokeOpacity="0.8" transform="rotate(-30)">
            <animateMotion dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1">
              <mpath href="#c9-arc"/>
            </animateMotion>
          </ellipse>
          <ellipse rx="9" ry="3" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.5" transform="rotate(-30)">
            <animateMotion dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1">
              <mpath href="#c9-arc"/>
            </animateMotion>
          </ellipse>
        </g>
      </g>

      {/* PERSEUS — throwing stance, left */}
      <g opacity="0.8">
        {/* body — twisted throwing pose */}
        <ellipse cx="140" cy="200" rx="14" ry="22" fill="#c9a84c" fillOpacity="0.75" transform="rotate(8,140,200)"/>
        {/* head */}
        <circle cx="148" cy="175" r="13" fill="#c9a84c" fillOpacity="0.75"/>
        {/* throwing arm extended high-right (follow-through) */}
        <line x1="152" y1="187" x2="183" y2="172" stroke="#c9a84c" strokeWidth="8" strokeOpacity="0.7" strokeLinecap="round"/>
        {/* other arm counterbalance left-low */}
        <line x1="128" y1="194" x2="108" y2="210" stroke="#c9a84c" strokeWidth="7" strokeOpacity="0.65" strokeLinecap="round"/>
        {/* legs — striding */}
        <line x1="136" y1="220" x2="120" y2="245" stroke="#c9a84c" strokeWidth="8" strokeOpacity="0.7" strokeLinecap="round"/>
        <line x1="148" y1="218" x2="165" y2="242" stroke="#c9a84c" strokeWidth="8" strokeOpacity="0.7" strokeLinecap="round"/>
      </g>

      {/* Prophecy / fate text suggestion — subtle */}
      <text x="350" y="252" textAnchor="middle" fill="#c9a84c" fillOpacity="0.1" fontSize="10" fontFamily="serif" letterSpacing="4">MOIRA</text>

      <rect width="700" height="260" fill="url(#c9-vig)"/>
      <rect x="1" y="1" width="698" height="258" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.28"/>
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
