#!/usr/bin/env node
'use strict';
const zlib = require('zlib');
const fs   = require('fs');
const path = require('path');

// ─── PNG encoder (same as generate-sprites-full.js) ─────────────────────────
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let i=0;i<256;i++){let c=i;for(let k=0;k<8;k++)c=(c&1)?0xEDB88320^(c>>>1):(c>>>1);t[i]=c;}
  return t;
})();
function crc32(buf){let c=0xFFFFFFFF;for(const b of buf)c=CRC_TABLE[(c^b)&0xFF]^(c>>>8);return(c^0xFFFFFFFF)>>>0;}
function u32(n){const b=Buffer.alloc(4);b.writeUInt32BE(n>>>0);return b;}
function pngChunk(type,data){const t=Buffer.from(type,'ascii');const d=Buffer.isBuffer(data)?data:Buffer.from(data);return Buffer.concat([u32(d.length),t,d,u32(crc32(Buffer.concat([t,d])))]);}
const PNG_SIG=Buffer.from([137,80,78,71,13,10,26,10]);

function writePNG(filePath,rows){
  const H=rows.length,W=rows[0].length;
  const raw=Buffer.alloc(H*(1+W*4),0);
  for(let y=0;y<H;y++){raw[y*(1+W*4)]=0;for(let x=0;x<W;x++){const px=rows[y][x]||[0,0,0,0];const i=y*(1+W*4)+1+x*4;raw[i]=px[0];raw[i+1]=px[1];raw[i+2]=px[2];raw[i+3]=px[3];}}
  fs.writeFileSync(filePath,Buffer.concat([PNG_SIG,pngChunk('IHDR',Buffer.concat([u32(W),u32(H),Buffer.from([8,6,0,0,0])])),pngChunk('IDAT',zlib.deflateSync(raw)),pngChunk('IEND',Buffer.alloc(0))]));
  console.log('✓', path.relative(process.cwd(), filePath));
}

// ─── Grid helpers ─────────────────────────────────────────────────────────────
const GW = 24, GH = 32;
const T = [0,0,0,0];
function mkGrid(){ return Array.from({length:GH}, ()=>new Array(GW).fill(T)); }
function set(g,y,x,c){ if(y>=0&&y<GH&&x>=0&&x<GW) g[y][x]=c; }
function fill(g,y1,x1,y2,x2,c){ for(let y=y1;y<=y2;y++) for(let x=x1;x<=x2;x++) set(g,y,x,c); }
function shiftV(g,dy){
  const o=mkGrid();
  for(let y=0;y<GH;y++){ const ty=y+dy; if(ty>=0&&ty<GH) o[ty]=[...g[y]]; }
  return o;
}
function writeFrames(dir,prefix,frames){
  fs.mkdirSync(dir,{recursive:true});
  frames.forEach((f,i)=>writePNG(path.join(dir,`${prefix}_${i}.png`),f));
}

// ─── Shared palette ───────────────────────────────────────────────────────────
const GPH  = [80, 48,160,255];   // purple snake-crown base
const GSK  = [240,168,112,255];  // peach gorgon skin
const GPK  = [224, 88,136,255];  // pink cheek blush
const GGR  = [ 56,160, 56,255];  // green bra / top
const GEY  = [ 26,  8, 32,255];  // dark closed-eye mark
const GPHD = [ 50, 28,120,255];  // dark purple shadow on crown

// ─── Gorgon sleeping sprite builder ───────────────────────────────────────────
// tip   = RGBA for snake hair tips
// bod   = RGBA for upper snake body
// bodD  = RGBA for lower body / tail (darker)
function buildGorgonSleep(tip, bod, bodD, breathUp = false) {
  const g = mkGrid();
  const dy = breathUp ? -1 : 0; // subtle breath offset for frame alternation

  // ── Snake-crown purple base ────────────────────────────────────────────────
  fill(g,  3+dy,  8, 5+dy, 15, GPH);
  fill(g,  4+dy,  6, 6+dy, 17, GPH);
  fill(g,  5+dy,  5, 7+dy, 18, GPH);
  fill(g,  6+dy,  6, 7+dy, 17, GPHD); // subtle shadow row

  // ── Snake hair tips radiating outward ─────────────────────────────────────
  // top center
  fill(g,  0+dy,  9, 2+dy, 10, tip);
  // upper cluster left / right
  fill(g,  1+dy,  6, 2+dy,  7, tip);
  fill(g,  1+dy, 13, 2+dy, 14, tip);
  // wide sides
  fill(g,  3+dy,  2, 4+dy,  3, tip);
  fill(g,  3+dy, 19, 4+dy, 20, tip);
  // lower sides (drooping — sleeping)
  fill(g,  5+dy,  1, 6+dy,  2, tip);
  fill(g,  5+dy, 20, 6+dy, 21, tip);
  fill(g,  6+dy,  2, 7+dy,  3, tip);
  fill(g,  6+dy, 19, 7+dy, 20, tip);
  // bottom droop pair
  fill(g,  7+dy,  4, 8+dy,  5, tip);
  fill(g,  7+dy, 17, 8+dy, 18, tip);

  // ── Face ─────────────────────────────────────────────────────────────────
  fill(g,  7+dy,  8, 12+dy, 15, GSK);
  // closed eyes (horizontal dark marks)
  fill(g,  9+dy,  9,  9+dy, 10, GEY);
  fill(g,  9+dy, 13,  9+dy, 14, GEY);
  // pink cheek blush
  fill(g, 11+dy,  9, 11+dy, 10, GPK);
  fill(g, 11+dy, 13, 11+dy, 14, GPK);

  // ── Torso ─────────────────────────────────────────────────────────────────
  fill(g, 12+dy,  8, 16+dy, 15, GSK);
  fill(g, 14+dy,  9, 15+dy, 14, GGR); // green bra/top

  // ── Arms relaxed outward (sleeping) ──────────────────────────────────────
  fill(g, 14+dy,  4, 17+dy,  7, GSK);  // left arm
  fill(g, 14+dy, 16, 17+dy, 19, GSK);  // right arm
  // slight shading at arm tips
  fill(g, 17+dy,  4, 17+dy,  7, [GSK[0]-20, GSK[1]-20, GSK[2]-20, 255]);
  fill(g, 17+dy, 16, 17+dy, 19, [GSK[0]-20, GSK[1]-20, GSK[2]-20, 255]);

  // ── Snake body tapering into coiled tail ─────────────────────────────────
  fill(g, 17+dy,  7, 21+dy, 16, bod);
  fill(g, 21+dy,  8, 24+dy, 15, bod);
  fill(g, 24+dy,  9, 26+dy, 14, bodD);
  fill(g, 26+dy, 10, 27+dy, 13, bodD);
  // tail curl
  fill(g, 27+dy,  7, 28+dy, 12, bodD);
  fill(g, 28+dy,  5, 29+dy, 10, bodD);
  fill(g, 29+dy,  4, 30+dy,  7, bodD);
  // slight highlight on body
  fill(g, 18+dy,  9, 20+dy, 10, [Math.min(bod[0]+30,255), Math.min(bod[1]+30,255), Math.min(bod[2]+30,255), 255]);

  return g;
}

// ─── Dead Medusa — severed head lying on a misty cloud pool ──────────────────
// Matches reference: compact head shape, hair spread radially, light mist below.
function buildMedusaDead(tip, bod, bodD) {
  const g = mkGrid();

  // ── Misty cloud / ground pool (cream-white, semitransparent) ────────────────
  const MIST  = [240,235,225,220];
  const MIST2 = [220,215,205,180];
  fill(g, 15,  4, 20, 19, MIST);
  fill(g, 13,  6, 16, 17, MIST2);
  fill(g, 20,  6, 22, 18, MIST2);  // fade out below

  // ── Snake hair tips splayed in all directions (limp/fallen) ─────────────────
  const tipD = [Math.max(tip[0]-30,0), Math.max(tip[1]-30,0), Math.max(tip[2]-30,0), 255];
  fill(g,  7,  9,  9, 10, tip);   // top center snake
  fill(g,  8,  6,  9,  7, tip);   // upper left snake
  fill(g,  8, 13, 10, 14, tip);   // upper right snake
  fill(g, 10,  3, 11,  4, tip);   // far left snake
  fill(g, 10, 17, 11, 18, tip);   // far right snake
  fill(g, 12,  2, 13,  3, tipD);  // lower left (limp, darker)
  fill(g, 12, 18, 13, 19, tipD);  // lower right (limp)
  fill(g, 14,  4, 15,  5, tipD);  // bottom left droop
  fill(g, 14, 16, 15, 17, tipD);  // bottom right droop

  // ── Purple crown / head base ─────────────────────────────────────────────────
  fill(g,  9,  8, 10, 15, GPH);
  fill(g, 10,  7, 13, 16, GPH);
  fill(g, 13,  8, 14, 15, GPHD);  // shadow row at bottom of crown

  // ── Face — lying still, eyes closed ─────────────────────────────────────────
  fill(g, 10,  8, 15, 15, GSK);
  fill(g, 12,  9, 12, 10, GEY);   // left eye closed
  fill(g, 12, 13, 12, 14, GEY);   // right eye closed
  fill(g, 14,  9, 14, 10, GPK);   // left cheek (visible in death)
  fill(g, 14, 13, 14, 14, GPK);   // right cheek

  return g;
}

// ─── Generate all three gorgon sisters ────────────────────────────────────────

// Medusa — green snake tips, violet body (matches reference image)
const MED_TIP  = [ 72,192, 64,255];
const MED_BOD  = [ 88, 72,176,255];
const MED_BODD = [ 40, 40,160,255];

// Stheno — teal tips, blue-purple body
const STH_TIP  = [ 24,192,192,255];
const STH_BOD  = [ 48, 96,168,255];
const STH_BODD = [ 24, 40,128,255];

// Euryale — crimson tips, dark violet body
const EUR_TIP  = [192, 56, 56,255];
const EUR_BOD  = [128, 48,104,255];
const EUR_BODD = [ 80,  8, 64,255];

const OUT = path.join(__dirname, '..', 'public', 'Gorgons');

// Each gorgon: 4 frames alternating breath-up/down for the bob effect
function makeGorgonFrames(tip, bod, bodD) {
  const f0 = buildGorgonSleep(tip, bod, bodD, false);
  const f1 = buildGorgonSleep(tip, bod, bodD, true);
  const f2 = shiftV(f0, -1);  // slightly shifted for variety
  const f3 = buildGorgonSleep(tip, bod, bodD, false);
  return [f0, f1, f2, f3];
}

writeFrames(OUT, 'Medusa_Sleep',  makeGorgonFrames(MED_TIP,  MED_BOD,  MED_BODD));
writeFrames(OUT, 'Stheno_Sleep',  makeGorgonFrames(STH_TIP,  STH_BOD,  STH_BODD));
writeFrames(OUT, 'Euryale_Sleep', makeGorgonFrames(EUR_TIP,  EUR_BOD,  EUR_BODD));

// Dead Medusa — single frame repeated
const deadFrame = buildMedusaDead(MED_TIP, MED_BOD, MED_BODD);
writeFrames(OUT, 'Medusa_Dead', [deadFrame, deadFrame, deadFrame, deadFrame]);

console.log('\nDone — gorgon sprites written to public/Gorgons/');

// ═══════════════════════════════════════════════════════════════════════════════
// ─── PERSEUS SPRITES ──────────────────────────────────────────────────────────
// Side-profile pixel art, 24×32 grid, same P=4 scale (96×128 SVG units).
// High-x = front of character (faces left in world after SVG scale(-1,1)).
// Cap of Hades makes him invisible — sprites rendered at low opacity in SVG.
// ═══════════════════════════════════════════════════════════════════════════════

// Perseus palette
const PSK  = [212,144, 96,255];  // hero skin
const PSH  = [180,110, 68,255];  // skin shadow
const PBR  = [184,120, 50,255];  // bronze armour
const PBRH = [212,164, 80,255];  // bronze highlight
const PTN  = [220,212,164,255];  // linen tunic
const PBL  = [122, 80, 40,255];  // leather belt
const PCR  = [194, 24, 24,255];  // crimson cape
const PCRD = [138, 16, 16,255];  // cape dark
const PLT  = [ 90, 60, 34,255];  // sandal leather
const PWH  = [232,228,212,255];  // white leg wrap
const PEY  = [ 24, 16, 14,255];  // eye dark
const PCAP = [ 26, 16, 24,255];  // Cap of Hades (dark)
const PCAPD= [ 14,  8, 14,255];  // Cap deep shadow

// Aegis / shield
const PAE  = [212,164, 80,255];  // aegis gold face
const PAED = [184,120, 50,255];  // aegis rim
const PAES = [240,224,144,255];  // aegis sheen

// Harpe
const PHP  = [212,164, 80,255];  // harpe blade gold
const PHPD = [184,120, 50,255];  // harpe dark

// ── Sneak pose: low crouch, cap on, side profile facing HIGH x (world-left = toward gorgons)
// After SVG scale(-1,1): high local x → world left. So face/shield must be at HIGH x.
function buildPerseusSneak() {
  const g = mkGrid();

  // CAP OF HADES — dark dome sitting on head; face is at HIGH x
  fill(g,  0, 11,  0, 20, PCAPD);  // crown peak
  fill(g,  1, 10,  2, 21, PCAP);   // dome
  fill(g,  3, 11,  3, 21, PCAP);   // lower dome
  fill(g,  4, 12,  4, 20, PCAP);   // brim

  // HEAD — side profile, crouching lean, face at high x
  fill(g,  4, 14,  8, 21, PSK);    // main head
  fill(g,  5, 13,  7, 14, PSK);    // nape / back of skull
  set( g,  6, 20, PEY);            // single-pixel eye (side profile)
  fill(g,  7, 18,  7, 20, PSH);    // jaw shadow
  fill(g,  8, 18,  8, 20, PSK);    // chin

  // NECK
  fill(g,  8, 13,  9, 17, PSK);

  // CAPE — at LOW x (streams behind Perseus as he walks left)
  fill(g,  9,  0,  9,  5, PCR);
  fill(g, 10,  0, 14,  6, PCR);
  fill(g, 14,  0, 18,  5, PCRD);
  fill(g, 18,  0, 22,  4, PCRD);

  // BRONZE BREASTPLATE + LINEN TUNIC
  fill(g,  9,  7, 15, 18, PBR);    // bronze chest plate
  fill(g,  9, 17, 14, 19, PBRH);   // highlight along forward edge
  fill(g, 10,  8, 12, 16, PTN);    // linen tunic inset
  fill(g, 14,  7, 15, 17, PBL);    // leather belt

  // SHIELD ARM — forearm extending forward
  fill(g, 10, 19, 14, 20, PSK);

  // AEGIS (shield) — oval shape at highest x (most forward element)
  fill(g,  7, 20, 16, 23, PAE);    // gold face
  fill(g,  6, 19, 16, 20, PAED);   // left rim
  fill(g,  7, 22, 15, 23, PAES);   // sheen stripe

  // HARPE ARM — back arm resting at low x
  fill(g, 11,  5, 15,  8, PSK);

  // FRONT LEG (high x) — crouched forward
  fill(g, 15, 12, 19, 17, PSK);    // thigh
  fill(g, 19, 14, 23, 18, PSK);    // shin
  fill(g, 23, 13, 24, 18, PLT);    // sandal
  fill(g, 22, 13, 22, 17, PWH);    // white wrap

  // BACK LEG (low x) — trailing
  fill(g, 15,  7, 19, 12, PSK);    // thigh
  fill(g, 19,  5, 23, 10, PSK);    // shin
  fill(g, 23,  4, 24,  9, PLT);    // sandal
  fill(g, 22,  5, 22,  9, PWH);    // white wrap

  return g;
}

// ── Lunge / kill pose: body pitched forward, harpe swinging forward-down, shield raised ──
function buildPerseusLunge() {
  const g = mkGrid();

  // CAP — pitched further forward with the lunge
  fill(g,  0, 13,  0, 22, PCAPD);
  fill(g,  1, 12,  2, 23, PCAP);
  fill(g,  3, 13,  3, 23, PCAP);
  fill(g,  4, 14,  4, 22, PCAP);

  // HEAD — further forward (higher x) due to aggressive body lean
  fill(g,  3, 16,  7, 23, PSK);
  fill(g,  4, 15,  7, 16, PSK);    // nape
  set( g,  5, 22, PEY);            // eye
  fill(g,  7, 20,  7, 22, PSH);    // jaw shadow
  fill(g,  8, 19,  8, 21, PSK);    // chin

  // NECK
  fill(g,  8, 14,  9, 18, PSK);

  // CAPE — streams straight back
  fill(g,  9,  0,  9,  4, PCR);
  fill(g, 10,  0, 15,  5, PCR);
  fill(g, 15,  0, 19,  4, PCRD);

  // TORSO — pitched aggressively forward
  fill(g,  9,  7, 14, 19, PBR);    // bronze plate
  fill(g,  9, 18, 13, 20, PBRH);   // highlight
  fill(g, 10,  8, 12, 17, PTN);    // tunic
  fill(g, 13,  7, 14, 18, PBL);    // belt

  // SHIELD ARM + AEGIS — most forward element
  fill(g, 10, 20, 13, 21, PSK);    // forearm
  fill(g,  6, 21, 15, 23, PAE);    // shield face
  fill(g,  5, 20, 15, 21, PAED);   // rim
  fill(g,  6, 22, 14, 23, PAES);   // sheen

  // HARPE ARM — from shoulder, arcing down-forward to deliver the blow
  fill(g, 10,  7, 13, 10, PSK);    // upper arm at shoulder
  fill(g, 13,  9, 17, 13, PSK);    // mid arm (going down and forward)
  fill(g, 17, 12, 20, 15, PSK);    // forearm (further forward-down)

  // HARPE BLADE — curved sickle at end of arm, pointing forward (high x)
  fill(g, 18, 12, 19, 21, PHP);    // main blade shaft (2 rows wide)
  fill(g, 16, 18, 19, 20, PHP);    // upper curve at front
  fill(g, 19, 19, 20, 21, PHPD);   // hook tip
  set( g, 17, 12, PHPD);           // blade guard at base

  // FRONT LEG — long lunge stride toward high x
  fill(g, 13, 13, 17, 18, PSK);    // thigh (extended)
  fill(g, 17, 16, 22, 20, PSK);    // shin
  fill(g, 22, 17, 23, 22, PLT);    // sandal
  fill(g, 21, 16, 21, 19, PWH);    // wrap

  // BACK LEG — bent back and down
  fill(g, 13,  5, 16,  9, PSK);    // back thigh
  fill(g, 15,  2, 19,  7, PSK);    // shin (kicked back)
  fill(g, 18,  1, 19,  6, PLT);    // sandal
  fill(g, 17,  3, 17,  6, PWH);    // wrap

  return g;
}

const POUT = path.join(__dirname, '..', 'public', 'Perseus2');

// Sneak: 4 frames with subtle shoulder-bob for "breathing while crouched"
const sneak0 = buildPerseusSneak();
const sneak1 = shiftV(sneak0, -1);
const sneak2 = buildPerseusSneak();
const sneak3 = shiftV(sneak0,  1);
writeFrames(POUT, 'Sneak_Side', [sneak0, sneak1, sneak2, sneak3]);

// Lunge: single frame repeated (it's a held strike pose)
const lungeFrame = buildPerseusLunge();
writeFrames(POUT, 'Lunge_Side', [lungeFrame, lungeFrame, lungeFrame, lungeFrame]);

console.log('\nDone — Perseus sprites written to public/Perseus2/');
