#!/usr/bin/env node
'use strict';
const zlib = require('zlib');
const fs   = require('fs');
const path = require('path');

// ─── PNG encoder ─────────────────────────────────────────────────────────────
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
  console.log('✓',path.relative(process.cwd(),filePath));
}

// ─── Palette ─────────────────────────────────────────────────────────────────
const T  =[0,0,0,0];
// Perseus / hero
const PR =[160,60,50,255];   // Perseus red-brown
const PD =[100,35,28,255];   // Perseus dark red
const PL =[210,100,80,255];  // Perseus light red
const PB =[50,40,30,255];    // Perseus belt/dark brown
// Gold / divine
const G  =[201,168,76,255];
const D  =[120,88,22,255];
const L  =[238,208,118,255];
// Skin tones
const S  =[208,168,126,255];
const LS =[228,192,156,255];
const DS =[158,120,90,255];
// White / cream
const W  =[228,222,210,255];
const LW =[245,242,235,255];
// Near black
const N  =[30,22,14,255];
// Blue-gray (Athena armor)
const BL =[88,108,138,255];
const LB =[148,172,204,255];
const DB =[48,62,88,255];
// Red (plume / Athena)
const R  =[178,58,58,255];
const LR =[210,92,92,255];
// Silver
const SL =[198,208,218,255];
// Graeae – grey palette
const GrS=[132,128,124,255]; // grey skin
const DGr=[72,70,68,255];    // dark grey
const LGr=[178,174,170,255]; // light grey
const DrR=[48,44,56,255];    // dark robe
const MrR=[70,65,80,255];    // mid robe
const Eye=[220,210,195,255]; // shared eye orb
// Nymph – pale ethereal
const NyS=[238,215,196,255];
const NyH=[242,228,185,255]; // golden hair
const NyR=[205,218,240,255]; // pale blue robe
const NyL=[232,240,252,255]; // very light robe
// Medusa – gorgon
const MdS=[148,130,90,255];  // sickly skin
const MdD=[90,75,50,255];    // dark skin shadow
const SnG=[58,108,48,255];   // snake dark green
const SnL=[88,148,68,255];   // snake light green
const MdR=[85,72,58,255];    // robe/scale
// Andromeda – princess
const AnS=[228,195,168,255];
const AnH=[100,68,32,255];   // dark hair
const AnD=[148,98,178,255];  // royal purple dress
const AnL=[180,130,210,255]; // lighter purple
const ChA=[138,128,112,255]; // chain (bronze-iron)
// Polydectes stone
const StM=[118,115,112,255];
const StD=[88,86,84,255];
const StL=[158,155,152,255];
// Acrisius
const AcS=[195,162,128,255]; // aged skin
const AcH=[175,172,168,255]; // grey hair
const AcR=[68,62,78,255];    // dark robe
const AcL=[95,88,108,255];   // lighter robe

// ─── Grid helpers ────────────────────────────────────────────────────────────
const W24=24,H32=32;
function mkGrid(){return Array.from({length:H32},()=>new Array(W24).fill(T));}
function set(g,y,x,c){if(y>=0&&y<H32&&x>=0&&x<W24)g[y][x]=c;}
function fill(g,y1,x1,y2,x2,c){for(let y=y1;y<=y2;y++)for(let x=x1;x<=x2;x++)set(g,y,x,c);}
function cloneGrid(g){return g.map(r=>[...r]);}
function shiftV(g,dy){const o=mkGrid();for(let y=0;y<H32;y++){const ty=y+dy;if(ty>=0&&ty<H32)o[ty]=[...g[y]];}return o;}
function shiftH(g,dx){const o=mkGrid();for(let y=0;y<H32;y++)for(let x=0;x<W24;x++){const tx=x+dx;if(tx>=0&&tx<W24)o[y][tx]=g[y][x];}return o;}
function mirrorH(g){return g.map(r=>[...r].reverse());}
function writeFrames(dir,prefix,frames){fs.mkdirSync(dir,{recursive:true});frames.forEach((f,i)=>writePNG(path.join(dir,`${prefix}_${i}.png`),f));}

// ─── HERMES OFFER ────────────────────────────────────────────────────────────
// Hermes leans forward and sets the harpe on the ground. Arm extends each frame.
function buildHermesOfferFrame(armExtend){
  const g=mkGrid();
  // Wings on petasus
  set(g,1,4,L);set(g,1,5,L);set(g,2,4,L);set(g,2,5,G);
  set(g,1,18,L);set(g,1,19,L);set(g,2,18,G);set(g,2,19,L);
  // Helmet dome
  fill(g,2,6,4,17,G);
  set(g,2,9,L);set(g,2,10,L);set(g,2,11,L);
  set(g,2,6,D);set(g,2,17,D);set(g,3,6,D);set(g,3,17,D);set(g,4,6,D);set(g,4,17,D);
  // Brim shadow + face
  fill(g,5,7,5,16,D);
  fill(g,6,7,9,16,S);
  set(g,6,7,G);set(g,7,7,G);set(g,8,7,G);set(g,9,7,G);
  set(g,6,16,G);set(g,7,16,G);set(g,8,16,G);set(g,9,16,G);
  set(g,7,9,N);set(g,7,14,N);set(g,7,8,LS);set(g,7,13,LS);
  set(g,8,11,DS);set(g,8,12,DS);
  set(g,9,9,N);set(g,9,10,N);set(g,9,11,N);
  // Neck
  fill(g,10,11,10,13,S);
  // Shoulders
  fill(g,11,5,11,18,W);set(g,11,5,G);set(g,11,18,G);
  // Torso
  fill(g,12,6,16,17,W);
  for(let y=12;y<=16;y++){set(g,y,5,G);set(g,y,18,G);}
  fill(g,12,7,16,8,LW);
  // Belt
  fill(g,17,5,18,18,G);fill(g,17,6,18,17,D);set(g,17,11,L);set(g,17,12,L);
  // Lower tunic
  fill(g,19,6,20,17,W);set(g,19,5,G);set(g,19,18,G);set(g,20,5,G);set(g,20,18,G);
  // Left arm
  fill(g,12,3,14,4,S);
  // Legs
  fill(g,21,7,25,10,S);fill(g,21,13,25,16,S);
  set(g,20,11,N);set(g,20,12,N);
  // Sandal straps+sole
  fill(g,24,7,24,10,G);fill(g,24,13,24,16,G);
  fill(g,26,6,26,11,D);fill(g,26,12,26,17,D);
  // Sandal wing nubs
  set(g,25,5,L);set(g,25,6,G);set(g,25,17,G);set(g,25,18,L);

  // === VARIABLE: right arm extending down-forward, harpe position ===
  // armExtend 0=rest,1=mid,2=full,3=mid
  const armX=[17,18,19,18][armExtend];
  const armY=[14,16,18,16][armExtend];
  const harpeY=[16,18,21,18][armExtend];
  const harpeX=[19,20,21,20][armExtend];
  // Arm
  fill(g,12,17,armY,armX,S);
  // Harpe (curved gold blade)
  set(g,armY,armX+1,G);set(g,harpeY,harpeX,G);set(g,harpeY,harpeX+1,L);
  set(g,harpeY+1,harpeX,D);
  return g;
}
const hermesOfferFrames=[0,1,2,3].map(i=>buildHermesOfferFrame(i));

// ─── ATHENA COMMAND ──────────────────────────────────────────────────────────
// Athena (facing west) raises her right arm to point/command.
function buildAthenaCommandFrame(armLift){
  const g=mkGrid();
  // Plume
  fill(g,0,10,3,13,R);set(g,0,9,LR);set(g,0,14,LR);set(g,1,9,R);set(g,1,14,R);set(g,2,9,R);set(g,2,14,R);
  set(g,0,11,LR);set(g,1,11,LR);set(g,2,11,LR);
  // Helmet dome
  fill(g,3,7,5,16,BL);fill(g,4,6,5,17,BL);
  set(g,3,9,LB);set(g,3,10,LB);set(g,4,9,LB);
  set(g,3,7,DB);set(g,3,16,DB);set(g,4,6,DB);set(g,4,17,DB);set(g,5,6,DB);set(g,5,17,DB);
  // Cheek guards + nose guard
  set(g,6,6,DB);set(g,6,7,BL);set(g,7,6,DB);set(g,7,7,BL);set(g,8,7,DB);
  set(g,6,17,DB);set(g,6,16,BL);set(g,7,17,DB);set(g,7,16,BL);set(g,8,16,DB);
  set(g,6,11,DB);set(g,7,11,DB);set(g,8,11,DB);
  // Face
  fill(g,5,8,8,15,S);fill(g,5,8,5,15,D);
  fill(g,6,8,8,10,S);fill(g,6,12,8,15,S);
  set(g,6,9,N);set(g,6,14,N);set(g,6,13,LS);
  set(g,8,9,N);set(g,8,10,N);
  // Neck
  fill(g,9,11,9,13,S);
  // Gorget
  fill(g,10,9,10,14,LB);
  // Breastplate
  fill(g,11,7,16,16,BL);
  for(let y=11;y<=16;y++){set(g,y,6,DB);set(g,y,17,DB);}
  fill(g,11,8,11,15,LB);fill(g,13,8,13,15,LB);
  set(g,14,11,G);set(g,14,12,G);set(g,15,11,G);set(g,15,12,G);set(g,14,10,D);set(g,15,13,D);
  // Pteruges
  for(let x=7;x<=16;x+=2){set(g,17,x,DB);set(g,18,x,DB);if(x+1<=16){set(g,17,x+1,BL);set(g,18,x+1,BL);}}
  // Shield (left arm side, right of sprite)
  fill(g,11,19,16,22,BL);
  fill(g,11,19,11,22,DB);fill(g,16,19,16,22,DB);
  set(g,12,19,DB);set(g,13,19,DB);set(g,14,19,DB);set(g,15,19,DB);
  set(g,12,22,DB);set(g,13,22,DB);set(g,14,22,DB);set(g,15,22,DB);
  set(g,13,20,SL);set(g,13,21,SL);set(g,14,20,SL);set(g,14,21,SL);
  set(g,12,20,LB);set(g,12,21,LB);
  // Legs + greaves
  fill(g,19,8,24,10,BL);fill(g,19,13,24,15,BL);
  set(g,20,9,LB);set(g,21,9,LB);set(g,22,9,LB);
  set(g,20,14,LB);set(g,21,14,LB);set(g,22,14,LB);
  set(g,19,8,DB);set(g,19,10,DB);set(g,19,13,DB);set(g,19,15,DB);
  set(g,24,8,DB);set(g,24,10,DB);set(g,24,13,DB);set(g,24,15,DB);
  fill(g,25,7,25,11,D);fill(g,25,12,25,16,D);

  // === VARIABLE: pointing arm (her right arm = left side of west-facing sprite) ===
  // armLift 0=down,1=mid,2=raised,3=mid
  const ay=[15,12,8,12][armLift];  // arm tip y position
  const ax=[5,4,3,4][armLift];     // arm tip x
  // Draw arm from body to tip
  const bodyArmX=5;const bodyArmY=14;
  for(let y=Math.min(bodyArmY,ay);y<=Math.max(bodyArmY,ay);y++){
    const frac=(y-Math.min(bodyArmY,ay))/Math.max(1,Math.abs(bodyArmY-ay));
    const x=Math.round(bodyArmX+(ax-bodyArmX)*frac);
    set(g,y,x,S);if(y===ay){set(g,y,x-1,S);}  // slightly wider hand
  }
  // Spear extending upward from raised arm
  if(armLift>=1){
    for(let y=ay-1;y>=Math.max(0,ay-5);y--){set(g,y,ax,SL);}
    set(g,Math.max(0,ay-5),ax-1,LB);
  }
  return g;
}
const athenaCommandFrames=[0,1,2,3].map(i=>buildAthenaCommandFrame(i));

// ─── GRAEAE ──────────────────────────────────────────────────────────────────
// Ancient grey sisters sharing one eye. "Reach" animation passes the eye.
function buildGraeaeFrame(armExtend){
  const g=mkGrid();
  // Wispy grey hair
  set(g,3,9,LGr);set(g,3,10,LGr);set(g,3,14,LGr);set(g,3,15,LGr);
  set(g,4,8,LGr);set(g,4,9,LGr);set(g,4,15,LGr);set(g,4,16,LGr);
  // Head (hunched forward, slightly lower)
  fill(g,4,9,8,15,GrS);
  set(g,4,9,DGr);set(g,4,15,DGr); // head sides dark
  // Prominent nose
  set(g,6,12,DGr);set(g,6,13,DGr);set(g,7,13,DGr);
  // Eyes (deep-set, one empty socket)
  set(g,5,10,N);   // empty socket (left)
  set(g,5,11,DGr);
  set(g,5,13,N);   // eye socket (will have eye in hand)
  // Mouth (toothless)
  set(g,7,10,N);set(g,7,11,N);
  // Chin
  set(g,8,11,GrS);set(g,8,12,GrS);
  // Neck (very short, hunched)
  set(g,9,11,GrS);set(g,9,12,GrS);
  // Dark robe body (hunched silhouette)
  fill(g,9,8,10,16,DrR);
  fill(g,10,7,11,17,DrR);
  fill(g,11,7,18,16,MrR);
  fill(g,12,6,18,7,DrR); // left robe edge darker
  fill(g,12,16,18,17,DrR);// right robe edge darker
  // Lower robe / feet barely visible
  fill(g,19,8,22,15,DrR);
  fill(g,22,9,24,14,DGr);
  // Left arm (at body side, gnarled)
  fill(g,10,5,14,6,GrS);
  set(g,14,5,DGr);set(g,14,6,DGr); // gnarled hand

  // === VARIABLE: right arm extending, holding eye orb ===
  // armExtend 0=close,1=mid,2=full,3=mid
  const handX=[14,16,19,16][armExtend];
  const handY=[13,14,15,14][armExtend];
  // Draw arm from body to hand
  for(let x=13;x<=handX;x++){set(g,Math.min(H32-1,handY+(x-13)/3|0),x,GrS);}
  // Eye orb in hand
  set(g,handY,handX,Eye);
  set(g,handY,handX+1,LGr); // rim
  set(g,handY-1,handX,LGr);
  return g;
}
const graeaeFrames=[0,1,2,3].map(i=>buildGraeaeFrame(i));
// Mirror for right sister
const graeaeWestFrames=graeaeFrames.map(mirrorH);

// ─── NYMPH ───────────────────────────────────────────────────────────────────
// Northern nymph (facing west) presenting gifts with outstretched arms.
function buildNymphFrame(armOut){
  const g=mkGrid();
  // Hair (golden, flowing)
  fill(g,2,9,4,14,NyH);
  set(g,3,8,NyH);set(g,3,15,NyH);
  set(g,5,7,NyH);set(g,6,7,NyH);   // hair trailing right
  // Head
  fill(g,4,9,8,14,NyS);
  set(g,4,9,DS);set(g,4,14,DS);
  // Eyes
  set(g,5,10,N);set(g,5,13,N);
  set(g,5,9,LS);set(g,5,12,LS);
  // Mouth (gentle smile)
  set(g,7,10,N);set(g,7,11,N);set(g,7,12,N);
  // Neck
  fill(g,9,11,9,13,NyS);
  // Robe body
  fill(g,10,8,20,15,NyR);
  set(g,10,7,NyL);set(g,10,16,NyL);
  for(let y=11;y<=20;y++){set(g,y,7,NyL);set(g,y,16,NyL);}
  // Robe fold highlight
  fill(g,10,9,20,10,NyL);
  // Lower robe (flowing)
  fill(g,21,7,26,16,NyR);
  for(let x=8;x<=15;x+=3){set(g,22,x,NyL);set(g,23,x,NyL);}
  // Feet
  fill(g,27,8,27,14,DS);

  // === VARIABLE: both arms extending forward (west = toward left/x=0) ===
  // armOut 0=chest,1=mid,2=full,3=mid
  const handX=[7,5,3,5][armOut];
  const handY=[14,14,14,14][armOut];
  // Upper arm
  fill(g,12,Math.min(7,handX),13,7,NyS);
  // Forearm + hand
  fill(g,13,handX,handY,Math.min(7,handX+1),NyS);
  // Lower arm
  fill(g,16,Math.min(7,handX),17,7,NyS);
  fill(g,17,handX,18,Math.min(7,handX+1),NyS);
  // Gift (small kibisis-like bag in hands)
  if(armOut>=1){
    fill(g,13,handX-2,16,handX-1,G); // gold bag
    set(g,12,handX-1,D); // bag knot
  }
  return g;
}
const nymphFrames=[0,1,2,3].map(i=>buildNymphFrame(i));

// ─── PERSEUS BASE BODY ───────────────────────────────────────────────────────
// Shared body builder for Perseus variants. Returns grid with body drawn,
// no arms added yet. armSide: 'E' = facing east, 'W' = mirrored.
function buildPerseusBody(opts){
  opts=opts||{};
  const crouchY=opts.crouch||0;  // extra downward offset for crouching
  const g=mkGrid();
  const cy=crouchY;
  // Helmet / cap
  if(opts.cap){
    // Cap of Hades — simple round cap, dark
    fill(g,2+cy,9,4+cy,14,PB);
    set(g,2+cy,10,N);set(g,2+cy,11,N);set(g,2+cy,12,N);
  } else {
    // Standard helmet
    fill(g,2+cy,8,4+cy,15,PD);
    set(g,3+cy,7,PD);set(g,3+cy,16,PD);
    set(g,2+cy,10,PR);set(g,2+cy,11,PR);set(g,2+cy,12,PR);
  }
  // Face
  fill(g,4+cy,8,8+cy,15,S);
  set(g,4+cy,7,PD);set(g,4+cy,16,PD);
  set(g,5+cy,7,PD);set(g,5+cy,16,PD);
  set(g,6+cy,7,PD);set(g,6+cy,16,PD);
  set(g,7+cy,7,PD);set(g,7+cy,16,PD);
  set(g,8+cy,7,PD);set(g,8+cy,16,PD);
  set(g,5+cy,9,N);set(g,5+cy,13,N);
  set(g,5+cy,8,LS);set(g,5+cy,12,LS);
  set(g,6+cy,11,DS);set(g,6+cy,12,DS);
  set(g,7+cy,9,N);set(g,7+cy,10,N);set(g,7+cy,11,N);
  // Neck
  fill(g,9+cy,11,9+cy,12,S);
  // Shoulders + torso
  fill(g,10+cy,5,10+cy,18,PR);set(g,10+cy,5,PD);set(g,10+cy,18,PD);
  fill(g,11+cy,6,16+cy,17,PR);
  for(let y=11+cy;y<=16+cy;y++){set(g,y,5,PD);set(g,y,18,PD);}
  fill(g,11+cy,7,16+cy,8,PL);
  // Belt
  fill(g,17+cy,5,18+cy,18,PB);fill(g,17+cy,6,18+cy,17,N);set(g,17+cy,11,G);set(g,17+cy,12,G);
  // Lower tunic
  fill(g,19+cy,6,20+cy,17,PR);set(g,19+cy,5,PD);set(g,19+cy,18,PD);set(g,20+cy,5,PD);set(g,20+cy,18,PD);
  // Legs
  fill(g,21+cy,7,25+cy,10,S);fill(g,21+cy,13+cy,25+cy,16,S);
  set(g,20+cy,11,N);set(g,20+cy,12,N);
  // Sandals
  fill(g,24+cy,7,24+cy,10,G);fill(g,24+cy,13,24+cy,16,G);
  fill(g,26+cy,6,26+cy,11,PD);fill(g,26+cy,12,26+cy,17,PD);
  return g;
}

// ─── PERSEUS FLOAT (Ch IV) ───────────────────────────────────────────────────
// Perseus rising with winged sandals — larger wing nubs, asymmetric upward bob.
function buildPerseusFloat(){
  const g=buildPerseusBody({});
  // Left arm holds kibisis bag
  fill(g,12,3,14,4,S);
  fill(g,14,2,16,4,G);   // kibisis bag (gold)
  set(g,13,2,D);          // knot
  // Right arm slightly raised (euphoric)
  fill(g,11,19,12,20,S);
  set(g,10,20,S);
  // Large sandal wings (spread wide — winged sandals active)
  // Left foot wings
  set(g,25,3,L);set(g,25,4,G);set(g,25,5,G);set(g,24,3,L);
  set(g,25,22,G);set(g,25,23,L);set(g,24,22,L);  // wrong, fix:
  // Left sandal wings
  set(g,25,3,L);set(g,25,4,G);set(g,24,4,G);
  set(g,23,4,L);set(g,24,3,L);
  // Right sandal wings
  set(g,25,19,G);set(g,25,20,L);set(g,24,19,G);
  set(g,23,19,L);
  return g;
}
{
  const base=buildPerseusFloat();
  // Ascending float: goes up more than it comes down
  const floatFrames=[base,shiftV(base,-1),shiftV(base,-2),shiftV(base,-1)];
  writeFrames(path.join(__dirname,'..','public','Perseus'),'Float_East',floatFrames);
}

// ─── PERSEUS SOAR (Ch VI, Ch VII) ────────────────────────────────────────────
// Perseus in flight — cap of Hades, arm forward, sandal wings beating.
function buildPerseusSoarFrame(wingUp){
  const g=buildPerseusBody({cap:true});
  // Cape trailing behind (left side, flowing upward)
  fill(g,11,2,14,4,PD);
  fill(g,10,3,12,4,PR);
  set(g,9,4,PR);
  // Right arm extended forward (direction of flight)
  fill(g,10,19,11,21,S);
  set(g,9,21,S);set(g,9,22,S);
  // Large spread sandal wings
  if(wingUp){
    // Wings UP position
    set(g,22,4,L);set(g,21,4,G);set(g,21,5,G);set(g,20,5,L);
    set(g,22,19,L);set(g,21,18,G);set(g,21,19,G);set(g,20,18,L);
  } else {
    // Wings DOWN position
    set(g,26,4,L);set(g,26,5,G);set(g,27,5,G);set(g,27,4,L);
    set(g,26,18,G);set(g,26,19,L);set(g,27,18,L);set(g,27,19,G);
  }
  return g;
}
{
  const s0=buildPerseusSoarFrame(true);
  const s1=shiftV(buildPerseusSoarFrame(true),-1);
  const s2=buildPerseusSoarFrame(false);
  const s3=shiftV(buildPerseusSoarFrame(false),-1);
  const soarEast=[s0,s1,s2,s3];
  const soarWest=soarEast.map(mirrorH);
  writeFrames(path.join(__dirname,'..','public','Perseus'),'Soar_East',soarEast);
  writeFrames(path.join(__dirname,'..','public','Perseus'),'Soar_West',soarWest);
}

// ─── PERSEUS STALK (Ch V) ────────────────────────────────────────────────────
// Perseus in Gorgon's lair — crouched, shield raised to face level as mirror.
function buildPerseusStalkFrame(step){
  const g=buildPerseusBody({crouch:2});
  // Shield raised to face (right arm of west-facing sprite = left side)
  // Since we'll mirror this to face West, build as East then mirror.
  // Shield arm raised high on right side of sprite
  fill(g,8,19,10,21,S); // upper arm
  fill(g,6,19,8,22,BL); // shield (Athena's aegis)
  fill(g,6,19,6,22,DB); // shield rim
  fill(g,9,19,9,22,DB);
  set(g,7,19,DB);set(g,8,19,DB);set(g,7,22,DB);set(g,8,22,DB);
  set(g,7,20,SL);set(g,7,21,SL); // shield boss
  set(g,6,20,LB);set(g,6,21,LB);
  // Left arm (harpe)
  fill(g,12,3,14,4,S);
  set(g,11,3,G);set(g,10,3,G);set(g,10,2,L);set(g,11,2,D);
  // Stepping: alternate horizontal shift
  return step?shiftH(g,1):g;
}
{
  const stalkBase=buildPerseusStalkFrame(false);
  const stalkStep=buildPerseusStalkFrame(true);
  const stalkFrames=[stalkBase,stalkStep,stalkBase,stalkStep].map(mirrorH);
  writeFrames(path.join(__dirname,'..','public','Perseus'),'Stalk_West',stalkFrames);
}

// ─── PERSEUS TRIUMPH (Ch VIII) ───────────────────────────────────────────────
// Perseus holds the kibisis (Medusa's head bag) aloft — arm raises each frame.
function buildPerseusTriumphFrame(lift){
  const g=buildPerseusBody({});
  // Left arm extended forward (pointing at Polydectes)
  fill(g,13,3,15,5,S);
  // Right arm raising with kibisis
  const armY=[16,13,10,13][lift];
  const armX=[19,19,18,19][lift];
  fill(g,armY,armX,16,19,S);
  // Kibisis (glowing bag) at tip of raised arm
  fill(g,armY-2,armX-1,armY,armX+1,G); // gold bag
  set(g,armY-3,armX,D); // knot at top
  set(g,armY-2,armX-2,L);set(g,armY-1,armX-2,L); // glow edge
  return g;
}
{
  const triFrames=[0,1,2,3].map(i=>buildPerseusTriumphFrame(i));
  writeFrames(path.join(__dirname,'..','public','Perseus'),'Triumph_East',triFrames);
}

// ─── PERSEUS THROW (Ch IX) ───────────────────────────────────────────────────
// Perseus throwing the discus that strikes Acrisius.
function buildPerseusThrowFrame(phase){
  const g=buildPerseusBody({});
  // phase 0=windup(arm back+up), 1=peak, 2=release(arm forward), 3=followthrough
  if(phase===0){
    // Wind-up: right arm drawn back and up-right
    fill(g,9,19,11,22,S);
    set(g,8,22,S);set(g,8,23,S); // arm raised back
    // Left arm balances
    fill(g,12,3,14,5,S);
    // Discus (small circle) held back
    set(g,7,22,SL);set(g,7,23,SL);set(g,8,23,SL);
  } else if(phase===1){
    // Peak: arm at highest point
    fill(g,8,19,10,21,S);
    set(g,7,20,S);set(g,7,21,S);set(g,6,21,S);
    fill(g,12,3,14,5,S);
    set(g,5,21,SL);set(g,5,22,SL);set(g,6,22,SL);
  } else if(phase===2){
    // Release: arm sweeps forward
    fill(g,10,18,12,21,S);
    set(g,9,21,S);set(g,9,22,S);
    fill(g,12,3,15,5,S);
    // Discus in flight
    set(g,8,22,SL);set(g,8,23,SL);set(g,9,23,SL);
  } else {
    // Follow-through: arm forward-down
    fill(g,11,18,14,20,S);
    set(g,10,20,S);
    fill(g,13,3,16,5,S);
  }
  return g;
}
{
  const throwFrames=[0,1,2,3].map(i=>buildPerseusThrowFrame(i));
  writeFrames(path.join(__dirname,'..','public','Perseus'),'Throw_East',throwFrames);
}

// ─── MEDUSA (Ch V) ──────────────────────────────────────────────────────────
// Sleeping Gorgon — writhing snakes alternate positions each frame.
function buildMedusaFrame(snakeAlt){
  const g=mkGrid();
  // Snake hair (snakes writhe — alternate up/down each frame)
  const snakePositions=snakeAlt?
    [[2,8],[1,10],[2,12],[1,14],[3,16],[2,9],[3,11],[1,13]]:
    [[3,8],[2,10],[3,12],[2,14],[2,16],[3,9],[2,11],[2,13]];
  for(const[sy,sx] of snakePositions){
    set(g,sy,sx,SnG);set(g,sy+1,sx,SnG);set(g,sy,sx+1,SnL);
  }
  // Head (slightly turned, face partially shown — sickly)
  fill(g,4,8,9,15,MdS);
  set(g,4,8,MdD);set(g,4,15,MdD);
  // Closed eyes (sleeping)
  fill(g,5,9,5,11,MdD);
  fill(g,5,13,5,15,MdD);
  // Snake scales on face edges
  set(g,6,8,SnG);set(g,7,8,SnG);set(g,6,15,SnG);set(g,7,15,SnG);
  // Open mouth slightly (snores? or just slightly open)
  set(g,8,11,N);set(g,8,12,N);set(g,8,13,N);
  // Neck
  fill(g,10,11,10,13,MdS);
  // Body (slumped, wrapped in dark scales/robe)
  fill(g,11,7,20,16,MdR);
  for(let y=11;y<=20;y++){set(g,y,6,MdD);set(g,y,17,MdD);}
  fill(g,12,8,14,9,MdD); // shadow fold
  // Arms folded (sleeping)
  fill(g,12,5,14,6,MdS); // left arm
  fill(g,12,17,14,18,MdS);// right arm
  set(g,14,5,MdD);set(g,14,6,MdD);set(g,14,17,MdD);set(g,14,18,MdD);
  // Lower body/tail coiled
  fill(g,21,7,24,16,MdR);
  fill(g,24,8,25,15,MdD);
  fill(g,25,9,26,14,SnG); // green tail tip
  return g;
}
{
  const m0=buildMedusaFrame(false);const m1=shiftV(m0,-1);
  const m2=buildMedusaFrame(true); const m3=shiftV(m2,-1);
  writeFrames(path.join(__dirname,'..','public','Medusa'),'Sleep_East',[m0,m1,m2,m3]);
}

// ─── ANDROMEDA (Ch VII) ──────────────────────────────────────────────────────
// Princess chained to rock — arms raised, body sways with strain.
function buildAndromedaBase(){
  const g=mkGrid();
  // Chain links above head
  for(let y=0;y<=3;y++){
    const cy=(y%2===0)?[ChA,ChA,ChA]:[N,ChA,N];
    set(g,y,10,cy[0]);set(g,y,11,cy[1]);set(g,y,12,cy[2]);
    set(g,y,14,cy[0]);set(g,y,15,cy[1]);set(g,y,16,cy[2]);
  }
  // Wrists (manacled)
  fill(g,4,9,5,12,ChA);fill(g,4,14,5,17,ChA);
  // Arms raised
  fill(g,5,10,9,11,AnS); // left arm
  fill(g,5,15,9,16,AnS); // right arm
  // Head
  fill(g,9,10,14,17,AnS);
  set(g,9,10,DS);set(g,9,17,DS);
  // Hair
  fill(g,9,10,10,17,AnH);
  set(g,11,10,AnH);set(g,12,10,AnH); // hair falling left
  // Eyes
  set(g,11,12,N);set(g,11,15,N);set(g,11,11,LS);set(g,11,14,LS);
  // Nose/mouth
  set(g,12,13,DS);set(g,13,12,N);set(g,13,13,N);set(g,13,14,N);
  // Neck
  fill(g,15,12,15,15,AnS);
  // Dress body (royal purple)
  fill(g,16,9,24,18,AnD);
  for(let y=16;y<=24;y++){set(g,y,8,DS);set(g,y,19,DS);}
  fill(g,16,10,24,11,AnL); // dress highlight
  // Dress flowing lower
  fill(g,25,8,28,19,AnD);
  for(let x=9;x<=18;x+=3){set(g,26,x,AnL);set(g,27,x,AnL);}
  // Feet
  fill(g,29,9,29,17,DS);
  return g;
}
{
  const base=buildAndromedaBase();
  const andFrames=[base,shiftH(base,-1),base,shiftH(base,1)];
  writeFrames(path.join(__dirname,'..','public','Andromeda'),'Strain_East',andFrames);
}

// ─── POLYDECTES STONE (Ch VIII) ──────────────────────────────────────────────
// Polydectes turning to stone — same pose but grey stone palette.
function buildPolydectesStoneBase(){
  const g=mkGrid();
  // Crown
  fill(g,2,8,3,15,StL);
  set(g,2,8,StM);set(g,2,15,StM);
  for(let x=9;x<=14;x+=2){set(g,1,x,StL);set(g,1,x+1,StM);}
  // Head
  fill(g,3,8,8,15,StM);
  set(g,3,8,StD);set(g,3,15,StD);
  // Eyes (wide with horror — now stone, frozen)
  fill(g,5,9,5,11,StL);fill(g,5,13,5,15,StL); // wide eyes
  set(g,5,10,StD);set(g,5,14,StD); // pupils
  // Mouth open
  fill(g,7,10,8,14,StD);
  // Neck
  fill(g,9,11,9,13,StM);
  // Robe/body
  fill(g,10,6,20,17,StM);
  for(let y=10;y<=20;y++){set(g,y,5,StD);set(g,y,18,StD);}
  fill(g,10,7,20,8,StL); // robe highlight
  // Arms (stiff, stone)
  fill(g,11,3,14,5,StM);
  fill(g,11,18,14,20,StM);
  // Legs
  fill(g,21,8,26,11,StM);fill(g,21,13,26,16,StM);
  set(g,20,12,StD);set(g,20,11,StD);
  // Sandals
  fill(g,27,7,27,17,StD);
  return g;
}
{
  const base=buildPolydectesStoneBase();
  // Subtle crack animation — one pixel changes position
  const crk0=cloneGrid(base);set(crk0,12,11,StD);set(crk0,13,11,StD);
  const crk1=cloneGrid(base);set(crk1,12,11,StD);set(crk1,13,10,StD);set(crk1,14,10,StD);
  const stoneFrames=[base,crk0,base,crk1].map(mirrorH);
  writeFrames(path.join(__dirname,'..','public','Polydectes'),'Stone_West',stoneFrames);
}

// ─── ACRISIUS (Ch IX) ───────────────────────────────────────────────────────
// Old man struck by discus — staggers then falls. Facing west.
function buildAcrisius(phase){
  const g=mkGrid();
  // Grey hair
  fill(g,2,9,4,15,AcH);
  set(g,4,8,AcH);set(g,4,16,AcH);
  // Head
  fill(g,4,9,9,15,AcS);
  set(g,4,9,DS);set(g,4,15,DS);
  // Eyes (old, heavy-browed)
  set(g,5,10,N);set(g,5,14,N);
  set(g,5,9,AcS);set(g,5,13,AcS);
  fill(g,5,9,5,10,DS);fill(g,5,13,5,14,DS); // heavy brows
  // Mouth
  set(g,8,10,N);set(g,8,11,N);
  // Beard
  fill(g,8,10,9,14,AcH);
  // Neck
  fill(g,10,11,10,13,AcS);
  // Robes
  fill(g,11,7,20,16,AcR);
  for(let y=11;y<=20;y++){set(g,y,6,N);set(g,y,17,N);}
  fill(g,11,8,20,9,AcL);
  // Arms
  fill(g,11,4,14,6,AcS);
  fill(g,11,17,14,19,AcS);
  // Legs
  fill(g,21,8,26,11,AcR);fill(g,21,13,26,16,AcR);
  set(g,20,12,N);set(g,20,11,N);
  fill(g,27,7,27,17,N);
  // Phase: 0=stand,1=stagger,2=fall,3=further fall
  // Apply horizontal stagger (falling back = toward x=0 for west-facing)
  if(phase===1) return shiftH(g,1);
  if(phase===2) return shiftH(g,2);
  if(phase===3){
    const f=shiftH(g,3);
    // Head droops
    set(f,3,14,AcH);set(f,4,14,AcS);
    return f;
  }
  return g;
}
{
  const fallFrames=[0,1,2,3].map(i=>buildAcrisius(i)).map(mirrorH);
  writeFrames(path.join(__dirname,'..','public','Acrisius'),'Fall_West',fallFrames);
}

// ─── WRITE Chapter II updated sprites ────────────────────────────────────────
writeFrames(path.join(__dirname,'..','public','Hermes'),'Offer_East',hermesOfferFrames);
writeFrames(path.join(__dirname,'..','public','Athena'),'Command_West',athenaCommandFrames);
writeFrames(path.join(__dirname,'..','public','Graeae'),'Reach_East',graeaeFrames);
writeFrames(path.join(__dirname,'..','public','Graeae'),'Reach_West',graeaeWestFrames);
writeFrames(path.join(__dirname,'..','public','Nymph'),'Gift_West',nymphFrames);

console.log('\nAll sprites generated.');
