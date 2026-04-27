#!/usr/bin/env node
'use strict';

const zlib = require('zlib');
const fs   = require('fs');
const path = require('path');

// ─── PNG encoder ─────────────────────────────────────────────────────────────

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = (c & 1) ? 0xEDB88320 ^ (c >>> 1) : (c >>> 1);
    t[i] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (const b of buf) c = CRC_TABLE[(c ^ b) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}

function u32(n) {
  const b = Buffer.alloc(4);
  b.writeUInt32BE(n >>> 0);
  return b;
}

function pngChunk(type, data) {
  const typeBytes  = Buffer.from(type, 'ascii');
  const dataBuffer = Buffer.isBuffer(data) ? data : Buffer.from(data);
  return Buffer.concat([
    u32(dataBuffer.length),
    typeBytes,
    dataBuffer,
    u32(crc32(Buffer.concat([typeBytes, dataBuffer]))),
  ]);
}

const PNG_SIG = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

/** Write a 24×32 RGBA PNG from a 2-D rows array: rows[y][x] = [R,G,B,A] */
function writePNG(filePath, rows) {
  const H = rows.length, W = rows[0].length;
  const ihdr = pngChunk('IHDR',
    Buffer.concat([u32(W), u32(H), Buffer.from([8, 6, 0, 0, 0])]));

  const raw = Buffer.alloc(H * (1 + W * 4), 0);
  for (let y = 0; y < H; y++) {
    const base = y * (1 + W * 4);
    raw[base] = 0; // filter None
    for (let x = 0; x < W; x++) {
      const px = rows[y][x] || [0,0,0,0];
      const i  = base + 1 + x * 4;
      raw[i] = px[0]; raw[i+1] = px[1]; raw[i+2] = px[2]; raw[i+3] = px[3];
    }
  }

  fs.writeFileSync(filePath, Buffer.concat([
    PNG_SIG,
    ihdr,
    pngChunk('IDAT', zlib.deflateSync(raw)),
    pngChunk('IEND', Buffer.alloc(0)),
  ]));
  console.log('✓', path.relative(process.cwd(), filePath));
}

// ─── Pixel-art palette ───────────────────────────────────────────────────────
const T  = [0,0,0,0];           // transparent
const G  = [201,168,76,255];    // gold
const D  = [120,88,22,255];     // dark gold (shadow)
const L  = [238,208,118,255];   // light gold (highlight)
const S  = [208,168,126,255];   // skin
const LS = [228,192,156,255];   // light skin
const DS = [158,120,90,255];    // dark skin (shadow)
const W  = [228,222,210,255];   // white/cream
const LW = [245,242,235,255];   // bright white
const N  = [30,22,14,255];      // near-black (outline / eyes)
const BL = [88,108,138,255];    // blue-gray (Athena armor)
const LB = [148,172,204,255];   // light blue
const DB = [48,62,88,255];      // dark blue
const R  = [178,58,58,255];     // red (plume)
const LR = [210,92,92,255];     // light red
const SL = [198,208,218,255];   // silver

// ─── Grid helpers ────────────────────────────────────────────────────────────
const W24 = 24, H32 = 32;

function mkGrid() {
  return Array.from({ length: H32 }, () => new Array(W24).fill(T));
}

function set(g, y, x, c) {
  if (y >= 0 && y < H32 && x >= 0 && x < W24) g[y][x] = c;
}

function fill(g, y1, x1, y2, x2, c) {
  for (let y = y1; y <= y2; y++)
    for (let x = x1; x <= x2; x++)
      set(g, y, x, c);
}

/** Shift every row vertically by dy (+ = down, - = up). Rows that fall off are lost. */
function shiftGrid(g, dy) {
  const out = mkGrid();
  for (let y = 0; y < H32; y++) {
    const ty = y + dy;
    if (ty >= 0 && ty < H32) out[ty] = [...g[y]];
  }
  return out;
}

// ─── HERMES ──────────────────────────────────────────────────────────────────
// Facing East (right) — gold tunic, winged petasus, harpe.
// Character spans y=1..26, x=4..22.

function buildHermes() {
  const g = mkGrid();

  // == Winged petasus (helmet with wings) ==
  // Left wing feathers
  set(g,1,4,L); set(g,1,5,L);
  set(g,2,4,L); set(g,2,5,G);
  // Right wing feathers
  set(g,1,18,L); set(g,1,19,L);
  set(g,2,18,G); set(g,2,19,L);
  // Helmet dome (gold, x=6..17, y=2..4)
  fill(g,2,6,4,17,G);
  // Dome highlight top-center
  set(g,2,10,L); set(g,2,11,L); set(g,2,12,L);
  // Dome shadow edges
  set(g,2,6,D); set(g,2,17,D);
  set(g,3,6,D); set(g,4,6,D);
  set(g,3,17,D); set(g,4,17,D);

  // == Helmet brim / visor shadow ==
  fill(g,5,7,5,16,D);

  // == Face (skin under helmet brim) ==
  fill(g,6,7,9,16,S);
  // Helmet cheek guards (gold)
  set(g,6,7,G); set(g,7,7,G); set(g,8,7,G); set(g,9,7,G);
  set(g,6,16,G); set(g,7,16,G); set(g,8,16,G); set(g,9,16,G);
  // Eyes
  set(g,7,9,N); set(g,7,14,N);
  // Eye whites / highlights
  set(g,7,8,LS); set(g,7,13,LS);
  // Nose
  set(g,8,11,DS); set(g,8,12,DS);
  // Mouth
  set(g,9,9,N); set(g,9,10,N); set(g,9,11,N);

  // == Neck ==
  fill(g,10,11,10,13,S);

  // == Shoulders ==
  fill(g,11,5,11,18,W);
  set(g,11,5,G); set(g,11,18,G); // shoulder edge

  // == Torso (white tunic) ==
  fill(g,12,6,16,17,W);
  for (let y=12; y<=16; y++) {
    set(g,y,5,G); set(g,y,18,G); // torso sides
  }
  // Tunic fold highlights
  fill(g,12,7,16,8,LW);

  // == Gold belt ==
  fill(g,17,5,18,18,G);
  fill(g,17,6,18,17,D);
  set(g,17,11,L); set(g,17,12,L); // buckle

  // == Lower tunic ==
  fill(g,19,6,20,17,W);
  set(g,19,5,G); set(g,19,18,G);
  set(g,20,5,G); set(g,20,18,G);

  // == Right arm + harpe (extends right from body) ==
  fill(g,12,19,13,20,S); // upper arm
  fill(g,14,19,15,21,S); // forearm/hand
  // Harpe — curved gold blade pointing up-right
  set(g,14,21,G); set(g,13,22,G); set(g,12,22,G); set(g,11,22,G);
  set(g,14,22,L); set(g,13,23,L); set(g,12,23,L);
  set(g,15,21,D); // shadow at grip

  // == Left arm ==
  fill(g,12,3,14,4,S);

  // == Legs (skin) ==
  fill(g,21,7,25,10,S); // left leg
  fill(g,21,13,25,16,S); // right leg
  // Gap between legs
  set(g,20,11,N); set(g,20,12,N); // hip dark gap
  // Leg shadows
  set(g,21,7,DS); set(g,21,16,DS);

  // == Sandal straps (gold) ==
  fill(g,24,7,24,10,G);
  fill(g,24,13,24,16,G);

  // == Sandal soles ==
  fill(g,26,6,26,11,D); // left sole
  fill(g,26,12,26,17,D); // right sole

  // == Tiny sandal wing nubs (winged sandals!) ==
  set(g,25,5,L); set(g,25,6,G); // left ankle wing
  set(g,25,17,G); set(g,25,18,L); // right ankle wing

  return g;
}

// ─── ATHENA ──────────────────────────────────────────────────────────────────
// Facing West (left) — blue-gray armor, Corinthian helmet + red plume, spear, shield.
// Character spans y=0..26, x=3..22.

function buildAthena() {
  const g = mkGrid();

  // == Helmet plume (red, tall) ==
  fill(g,0,10,3,13,R);
  set(g,0,9,LR); set(g,0,14,LR);
  set(g,1,9,R); set(g,1,14,R);
  set(g,2,9,R); set(g,2,14,R);
  // Plume highlight
  set(g,0,11,LR); set(g,1,11,LR); set(g,2,11,LR);

  // == Corinthian helmet dome ==
  fill(g,3,7,5,16,BL);
  fill(g,4,6,5,17,BL);
  // Highlight
  set(g,3,9,LB); set(g,3,10,LB); set(g,4,9,LB);
  // Shadow edges
  set(g,3,7,DB); set(g,3,16,DB);
  set(g,4,6,DB); set(g,4,17,DB);
  set(g,5,6,DB); set(g,5,17,DB);

  // == Cheek guards ==
  set(g,6,6,DB); set(g,6,7,BL);
  set(g,7,6,DB); set(g,7,7,BL);
  set(g,8,7,DB);
  set(g,6,17,DB); set(g,6,16,BL);
  set(g,7,17,DB); set(g,7,16,BL);
  set(g,8,16,DB);
  // Nose guard (faces LEFT so nose guard on left-center)
  set(g,6,11,DB); set(g,7,11,DB); set(g,8,11,DB);

  // == Face (skin visible through helmet) ==
  fill(g,5,8,8,15,S);
  fill(g,5,8,5,15,D); // brim shadow
  fill(g,6,8,8,10,S); // left cheek
  fill(g,6,12,8,15,S); // right cheek
  // Eyes (facing left — right eye is more visible / outward)
  set(g,6,9,N); // nearer eye
  set(g,6,14,N); // far eye
  set(g,6,13,LS); // right eye white
  // Mouth
  set(g,8,9,N); set(g,8,10,N);

  // == Neck ==
  fill(g,9,11,9,13,S);

  // == Gorget (neck armor) ==
  fill(g,10,9,10,14,LB);

  // == Breastplate (aegis) ==
  fill(g,11,7,16,16,BL);
  for (let y=11; y<=16; y++) {
    set(g,y,6,DB); set(g,y,17,DB); // armor sides
  }
  // Armor highlight strip (top)
  fill(g,11,8,11,15,LB);
  // Horizontal armor detail
  fill(g,13,8,13,15,LB);
  // Gorgoneion emblem (small gold feature at center of aegis)
  set(g,14,11,G); set(g,14,12,G);
  set(g,15,11,G); set(g,15,12,G);
  set(g,14,10,D); set(g,15,13,D);

  // == Pteruges (armor tabs at waist) ==
  for (let x = 7; x <= 16; x += 2) {
    set(g,17,x,DB); set(g,18,x,DB);
    if (x+1 <= 16) { set(g,17,x+1,BL); set(g,18,x+1,BL); }
  }

  // == Shield (left arm = right side of sprite since facing left) ==
  fill(g,11,19,16,22,BL);
  // Shield rim
  fill(g,11,19,11,22,DB);
  fill(g,16,19,16,22,DB);
  set(g,12,19,DB); set(g,13,19,DB); set(g,14,19,DB); set(g,15,19,DB);
  set(g,12,22,DB); set(g,13,22,DB); set(g,14,22,DB); set(g,15,22,DB);
  // Shield boss
  set(g,13,20,SL); set(g,13,21,SL);
  set(g,14,20,SL); set(g,14,21,SL);
  // Shield highlight
  set(g,12,20,LB); set(g,12,21,LB);

  // == Spear (right arm = left side of sprite since facing left) ==
  // Spear tip (upper left)
  set(g,0,5,SL); set(g,0,4,LB);
  // Shaft angled slightly
  set(g,1,5,SL); set(g,2,5,SL); set(g,3,5,SL);
  set(g,4,6,SL); set(g,5,6,SL);
  fill(g,6,6,19,6,SL); // vertical shaft
  // Butt end
  set(g,20,6,DB); set(g,21,6,DB);
  // Right arm holding spear
  fill(g,12,4,14,5,S);

  // == Legs with greaves ==
  fill(g,19,8,24,10,BL); // left leg greave
  fill(g,19,13,24,15,BL); // right leg greave
  // Greave shin highlights
  set(g,20,9,LB); set(g,21,9,LB); set(g,22,9,LB);
  set(g,20,14,LB); set(g,21,14,LB); set(g,22,14,LB);
  // Greave outlines
  set(g,19,8,DB); set(g,19,10,DB);
  set(g,19,13,DB); set(g,19,15,DB);
  set(g,24,8,DB); set(g,24,10,DB);
  set(g,24,13,DB); set(g,24,15,DB);

  // == Sandals ==
  fill(g,25,7,25,11,D);
  fill(g,25,12,25,16,D);

  return g;
}

// ─── Write sprite sheets ──────────────────────────────────────────────────────

const PUBLIC = path.join(__dirname, '..', 'public');

// Hermes — Idle East (facing right)
const hermesDir = path.join(PUBLIC, 'Hermes');
fs.mkdirSync(hermesDir, { recursive: true });
const hermesBase = buildHermes();
writePNG(path.join(hermesDir, 'Idle_East_0.png'), hermesBase);
writePNG(path.join(hermesDir, 'Idle_East_1.png'), shiftGrid(hermesBase, -1));
writePNG(path.join(hermesDir, 'Idle_East_2.png'), hermesBase);
writePNG(path.join(hermesDir, 'Idle_East_3.png'), shiftGrid(hermesBase,  1));

// Athena — Idle West (facing left)
const athenaDir = path.join(PUBLIC, 'Athena');
fs.mkdirSync(athenaDir, { recursive: true });
const athenaBase = buildAthena();
writePNG(path.join(athenaDir, 'Idle_West_0.png'), athenaBase);
writePNG(path.join(athenaDir, 'Idle_West_1.png'), shiftGrid(athenaBase, -1));
writePNG(path.join(athenaDir, 'Idle_West_2.png'), athenaBase);
writePNG(path.join(athenaDir, 'Idle_West_3.png'), shiftGrid(athenaBase,  1));

console.log('\nDone — 8 sprite frames generated.');
