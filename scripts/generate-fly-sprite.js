#!/usr/bin/env node
'use strict';

// ─── Perseus / Fly_East — 48×32 landscape sprite ─────────────────────────────
//  Side-profile flying pose. Rendered in SVG at 4× scale = 192×128 px.
//  Figure reads left-to-right: cape ← legs ← body ← helmet ← punching fist
//
//  Canvas x=0..47, y=0..31  (0 = left/top, 47/31 = right/bottom)
//
//  Regions (approximate x ranges):
//   x 0-13  : cape (large red billow)
//   x 6-20  : legs, feet, winged sandals
//  x 12-36  : torso / tunic
//  x 22-25  : plume crest (streams left from helmet top)
//  x 34-47  : helmet (bronze dome, cheek guards, face opening)
//  x 38-47  : face (skin, eye, jaw)
//  x 40-47  : leading arm / fist (upper, above helmet line)

const zlib = require('zlib');
const fs   = require('fs');
const path = require('path');

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let i=0;i<256;i++){let c=i;for(let k=0;k<8;k++)c=(c&1)?0xEDB88320^(c>>>1):(c>>>1);t[i]=c;}
  return t;
})();
function crc32(buf){let c=0xFFFFFFFF;for(const b of buf)c=CRC_TABLE[(c^b)&0xFF]^(c>>>8);return(c^0xFFFFFFFF)>>>0;}
function u32(n){const b=Buffer.alloc(4);b.writeUInt32BE(n>>>0);return b;}
function pngChunk(type,data){const tb=Buffer.from(type,'ascii');const db=Buffer.isBuffer(data)?data:Buffer.from(data);return Buffer.concat([u32(db.length),tb,db,u32(crc32(Buffer.concat([tb,db])))]);}
const PNG_SIG=Buffer.from([137,80,78,71,13,10,26,10]);

function writePNG(filePath, rows) {
  const H=rows.length, W=rows[0].length;
  const ihdr=pngChunk('IHDR',Buffer.concat([u32(W),u32(H),Buffer.from([8,6,0,0,0])]));
  const raw=Buffer.alloc(H*(1+W*4),0);
  for(let y=0;y<H;y++){
    const base=y*(1+W*4); raw[base]=0;
    for(let x=0;x<W;x++){const px=rows[y][x]||[0,0,0,0];const i=base+1+x*4;raw[i]=px[0];raw[i+1]=px[1];raw[i+2]=px[2];raw[i+3]=px[3];}
  }
  fs.writeFileSync(filePath,Buffer.concat([PNG_SIG,ihdr,pngChunk('IDAT',zlib.deflateSync(raw)),pngChunk('IEND',Buffer.alloc(0))]));
  console.log('✓',path.relative(process.cwd(),filePath));
}

// ─── Colour palette ───────────────────────────────────────────────────────────
const _ = [0,0,0,0];

// Skin
const SK  = [212,172,122,255];
const SKL = [238,204,158,255];
const SKD = [158,116,72,255];

// Cape (rich red — the hero's most recognisable feature)
const CR  = [182,28,18,255];
const CRL = [222,58,38,255];
const CRI = [148,20,12,255];
const CRD = [102,12,8,255];

// Helmet bronze
const HM  = [188,142,44,255];
const HML = [222,180,82,255];
const HMD = [124,86,18,255];

// Helmet plume / crest (dark red, darker than cape so it reads separately)
const PL  = [156,22,14,255];
const PLL = [196,48,28,255];

// Hair
const HR  = [44,26,10,255];

// Tunic (off-white cream)
const TU  = [222,214,184,255];
const TUL = [242,238,216,255];
const TUD = [172,164,136,255];

// Belt / leather strap
const BT  = [116,78,26,255];
const BTL = [148,108,46,255];

// Sandal leather
const LD  = [130,92,36,255];
const LDL = [162,122,58,255];

// Wing feathers (winged sandals of Hermes)
const WF  = [232,228,210,255];
const WFD = [182,178,160,255];

// Outlines / eye
const NK  = [18,10,4,255];
const EY  = [20,10,4,255];

// ─── Grid helpers ─────────────────────────────────────────────────────────────
const GW=48, GH=32;
function mkGrid(){return Array.from({length:GH},()=>new Array(GW).fill(_));}
function set(g,y,x,c){if(y>=0&&y<GH&&x>=0&&x<GW)g[y][x]=c;}
function fill(g,y1,x1,y2,x2,c){for(let y=y1;y<=y2;y++)for(let x=x1;x<=x2;x++)set(g,y,x,c);}
function clone(g){return g.map(r=>r.map(c=>c));}

// ─── Base frame ───────────────────────────────────────────────────────────────
function buildBase() {
  const g = mkGrid();

  // ── CAPE ────────────────────────────────────────────────────────────────────
  // Flows left/upward from the back of Perseus's shoulders (attach ≈ x=14,y=13)
  // It billows into a large wing-like shape in the upper-left of the frame
  fill(g,  4,  2,  4,  7, CR);
  fill(g,  5,  0,  5,  9, CR);
  fill(g,  6,  0,  6, 11, CR);
  fill(g,  7,  0,  7, 13, CR);
  fill(g,  8,  0,  8, 14, CR);
  fill(g,  9,  0,  9, 14, CR);
  fill(g, 10,  0, 10, 13, CR);
  fill(g, 11,  0, 11, 12, CR);
  fill(g, 12,  0, 12, 11, CR);
  fill(g, 13,  0, 13,  9, CRI);
  fill(g, 14,  0, 14,  7, CRI);
  fill(g, 15,  0, 15,  5, CRD);
  fill(g, 16,  0, 16,  3, CRD);
  // Highlights — top edge of billow catches light
  set(g, 4, 2,CRL);set(g,4,3,CRL);set(g,4,4,CRL);
  set(g, 5, 0,CRL);set(g,5,1,CRL);set(g,5,2,CRL);set(g,5,3,CRL);
  set(g, 6, 0,CRL);set(g,6,1,CRL);set(g,6,2,CRL);
  set(g, 7, 0,CRL);set(g,7,1,CRL);
  // Deep shadow — lower inner fold of cape
  set(g,14,0,CRD);set(g,15,0,CRD);set(g,16,0,CRD);
  set(g,13,0,CRD);set(g,13,1,CRD);

  // ── PLUME / CREST ───────────────────────────────────────────────────────────
  // Red crest on top of helmet streams backward (left), above/behind the body
  fill(g,  4,  8,  4, 17, PL);
  fill(g,  5, 10,  5, 21, PL);
  fill(g,  6, 12,  6, 24, PL);
  fill(g,  7, 14,  7, 26, PL);
  fill(g,  8, 16,  8, 28, PL);
  fill(g,  9, 18,  9, 29, PL);
  // Plume highlights
  set(g,4,8,PLL);set(g,4,9,PLL);set(g,5,10,PLL);set(g,5,11,PLL);
  set(g,6,12,PLL);set(g,7,14,PLL);set(g,8,16,PLL);

  // ── BODY / TUNIC ────────────────────────────────────────────────────────────
  // Horizontal cream slab — the torso of Perseus in flight
  fill(g, 12, 14, 12, 36, TU);
  fill(g, 13, 13, 13, 37, TU);
  fill(g, 14, 12, 14, 38, TU);
  fill(g, 15, 12, 15, 38, TU);
  fill(g, 16, 12, 16, 37, TU);
  fill(g, 17, 12, 17, 36, TU);
  fill(g, 18, 12, 18, 32, TU);
  fill(g, 19, 12, 19, 26, TU);
  // Tunic highlights (top edge)
  for(let x=15;x<=35;x++)set(g,12,x,TUL);
  // Tunic shadow (bottom edge)
  for(let x=12;x<=25;x++)set(g,19,x,TUD);
  set(g,18,12,TUD);set(g,18,13,TUD);

  // ── BELT ────────────────────────────────────────────────────────────────────
  fill(g, 16, 13, 16, 32, BT);
  fill(g, 17, 12, 17, 30, BT);
  set(g,16,13,BTL);set(g,16,14,BTL);set(g,17,12,BTL);

  // ── TRAILING ARM (hangs slightly behind/below body) ──────────────────────────
  fill(g, 14, 36, 14, 40, SK);
  fill(g, 15, 37, 15, 42, SK);
  set(g,14,36,SKL);set(g,14,37,SKL);
  set(g,15,41,SKD);set(g,15,42,SKD);

  // ── LEGS (trailing left, two side by side) ───────────────────────────────────
  // Upper thighs — skin
  fill(g, 18, 8, 18, 18, SK);
  fill(g, 19, 6, 19, 16, SK);
  fill(g, 20, 5, 20, 14, SK);
  // Gap between the two legs
  set(g,18,13,_);set(g,19,11,_);set(g,19,12,_);set(g,20,9,_);set(g,20,10,_);
  // Knee / lower leg — leather sandal
  fill(g, 21, 3, 21, 12, LD);
  fill(g, 22, 2, 22, 10, LD);
  fill(g, 23, 1, 23,  8, LD);
  fill(g, 24, 0, 24,  6, LDL);
  fill(g, 25, 0, 25,  4, LD);
  // Sandal gap
  set(g,21,8,_);set(g,22,6,_);set(g,23,5,_);
  // Sandal highlights
  set(g,22,2,LDL);set(g,23,1,LDL);set(g,24,0,LDL);

  // ── WINGED SANDALS ───────────────────────────────────────────────────────────
  // Hermes gifted Perseus winged sandals — white feathers on both ankles
  // Left sandal wing
  set(g,22,0,WF);set(g,23,0,WF);set(g,24,0,WF);
  set(g,25,0,WF);set(g,25,1,WFD);
  set(g,26,0,WFD);
  // Right sandal wing (slightly different position)
  set(g,23,7,WF);set(g,24,7,WF);set(g,24,8,WFD);
  set(g,25,6,WFD);

  // ── HELMET ──────────────────────────────────────────────────────────────────
  // Corinthian-style bronze dome, profile facing RIGHT
  // The dome has a flared cheek-guard and nasal piece characteristic of Corinthian helmets
  // Dome top (x=34-47, y=8-10)
  fill(g,  8, 34,  8, 47, HM);
  fill(g,  9, 33,  9, 47, HM);
  fill(g, 10, 33, 10, 47, HM);
  // Dome mid (cheek guards narrow the opening, x=33-47, y=11-14)
  fill(g, 11, 33, 11, 47, HM);
  fill(g, 12, 33, 12, 47, HM);
  fill(g, 13, 33, 13, 47, HM);
  // Nasal piece: a narrow strip down the centre of the face opening
  fill(g, 11, 43, 13, 44, HMD);  // nasal strip
  // Cheek guards cut into face-opening area (leave face visible)
  // Face opening: right side x=38-47, y=11-17
  fill(g, 11, 38, 11, 42, _);  // face opening top
  fill(g, 12, 37, 12, 42, _);  // face opening mid
  fill(g, 13, 37, 13, 42, _);  // face opening lower
  fill(g, 14, 33, 14, 47, HMD); // lower helm / brim
  fill(g, 15, 33, 15, 46, HMD);
  // Helmet highlights
  set(g, 8,34,HML);set(g,8,35,HML);set(g,8,36,HML);set(g,8,37,HML);
  set(g, 9,34,HML);set(g,9,35,HML);set(g,9,36,HML);
  set(g,10,34,HML);set(g,10,35,HML);
  // Helmet right-edge shadows
  for(let y=8;y<=15;y++){set(g,y,46,HMD);set(g,y,47,HMD);}
  // Neck guard (small extension at y=13-15 connecting to neck)
  fill(g, 13, 33, 15, 36, HMD);

  // ── HAIR ────────────────────────────────────────────────────────────────────
  // Peeks out at the back of the helmet
  set(g, 9,32,HR);set(g,10,32,HR);set(g,11,32,HR);
  set(g,10,33,HR);set(g,11,33,HR);

  // ── NECK ────────────────────────────────────────────────────────────────────
  fill(g, 13, 37, 15, 40, SK);
  set(g,13,37,SKL);

  // ── FACE ────────────────────────────────────────────────────────────────────
  // Fills the face-opening of the Corinthian helmet (right profile)
  fill(g, 10, 38, 10, 45, SK);  // forehead
  fill(g, 11, 38, 11, 42, SK);  // upper face
  fill(g, 12, 37, 12, 42, SK);  // mid face
  fill(g, 13, 37, 13, 42, SK);  // lower face
  fill(g, 14, 37, 14, 41, SK);  // jaw
  fill(g, 15, 37, 15, 40, SK);  // chin
  // Face details
  set(g,10,42,SKL);set(g,10,41,SKL);  // forehead highlight
  set(g,11,41,SKL);                    // cheek highlight
  set(g,12,42,EY);                     // eye — single pixel, sharp and determined
  set(g,13,43,SKD);                    // nose ridge shadow
  set(g,14,41,SKD);set(g,14,42,SKD);  // jaw shadow / chin line
  set(g,15,40,SKD);set(g,15,39,SKD);  // chin contour

  // ── LEADING ARM / FIST (one arm punched forward — the signature flying pose) ─
  // Arm angled upward-right from shoulder, fist at rightmost point
  // This is the most critical element: clear, bold, easy to read
  //
  // Upper arm (from shoulder at x≈38,y≈13 angling to x=47,y=8)
  set(g,13,38,SKL);set(g,13,39,SK);set(g,13,40,SK);  // shoulder
  set(g,12,39,SKL);set(g,12,40,SK);set(g,12,41,SK);set(g,12,42,SK);  // upper arm upper edge
  set(g,13,41,SK); set(g,13,42,SK);set(g,13,43,SK);                   // upper arm lower edge
  set(g,11,41,SKL);set(g,11,42,SK);set(g,11,43,SK);set(g,11,44,SK);  // forearm upper
  set(g,12,43,SK); set(g,12,44,SK);set(g,12,45,SK);                   // forearm lower
  set(g,10,43,SKL);set(g,10,44,SK);set(g,10,45,SK);set(g,10,46,SK);  // forearm extends
  set(g,11,45,SKD);set(g,11,46,SK);                                    // near fist
  // FIST — slightly larger, slightly darker (clenched hand)
  fill(g,  9, 44,  9, 47, SKD);  // fist top
  fill(g, 10, 46, 10, 47, SKD);  // fist knuckles
  fill(g, 11, 46, 11, 47, SKD);  // fist bottom
  set(g, 9,44,SK);set(g,9,45,SK);  // fist highlight (top of knuckles)
  // Arm outline shadows
  set(g,13,44,SKD);set(g,12,46,SKD);

  return g;
}

// ─── 4 animation frames ───────────────────────────────────────────────────────
function buildFrames() {
  const base = buildBase();
  const f0 = clone(base);

  // Frame 1 — arm reaches 1px higher (straining forward), cape top edge lifts
  const f1 = clone(base);
  // Shift arm upward: clear arm pixels at bottom, repaint arm 1 row higher
  // Lower arm row cleanup
  for(let x=38;x<=47;x++)set(f1,13,x,_);
  // Repaint shoulder 1px higher
  set(f1,12,38,SKL);set(f1,12,39,SK);set(f1,12,40,SK);
  // Shift entire arm zone up
  for(let x=39;x<=47;x++){set(f1,11,x,_);set(f1,12,x,_);}
  set(f1,11,39,SKL);set(f1,11,40,SK);set(f1,11,41,SK);set(f1,11,42,SK);
  set(f1,10,41,SKL);set(f1,10,42,SK);set(f1,10,43,SK);set(f1,10,44,SK);
  set(f1, 9,43,SKL);set(f1, 9,44,SK);set(f1, 9,45,SK);set(f1, 9,46,SK);
  set(f1,10,45,SKD);set(f1,10,46,SK);
  // Fist now 1px higher
  fill(f1, 8, 44,  8, 47, SKD);
  fill(f1, 9, 46,  9, 47, SKD);
  set(f1,8,44,SK);set(f1,8,45,SK);
  // Cape upper edge lifts (extra row at top)
  set(f1,3,3,CRL);set(f1,3,4,CRL);set(f1,3,5,CRL);set(f1,3,6,CRL);

  // Frame 2 — arm at peak (highest point), cape surges wider
  const f2 = clone(f1);
  // Cape bulges more on the left
  set(f2, 8,15,CR);set(f2,9,15,CR);set(f2,10,14,CR);set(f2,10,15,CR);
  // Fist 1px higher still
  for(let x=44;x<=47;x++){set(f2,8,x,_);set(f2,9,x,_);}
  fill(f2, 7, 44,  7, 47, SKD);
  fill(f2, 8, 46,  8, 47, SKD);
  set(f2,7,44,SK);set(f2,7,45,SK);

  // Frame 3 — arm returns (mid-way back down), cape settles
  const f3 = clone(base);
  // Cape loses its top lift row (slightly less billowed)
  for(let x=0;x<GW;x++)set(f3,3,x,_);
  // Legs trail slightly (subtle)
  set(f3,19,15,_);set(f3,20,13,_);

  return [f0, f1, f2, f3];
}

// ─── Write output ─────────────────────────────────────────────────────────────
const outDir = path.join(__dirname,'..','public','Perseus');
fs.mkdirSync(outDir,{recursive:true});

buildFrames().forEach((f,i)=>{
  writePNG(path.join(outDir,`Fly_East_${i}.png`),f);
});
console.log('\n✓ Perseus/Fly_East_0-3.png  (48×32 landscape, renders at 192×128 @ 4×)');
