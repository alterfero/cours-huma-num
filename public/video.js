import {workbook6Fields} from './chapter6-content.js';

export function storage6({hours,width,height,fps,bpp,videoMbps,losslessPercent}) {
  const ranges={hours:[.001,100000],width:[1,16384],height:[1,16384],fps:[1,240],bpp:[8,96],videoMbps:[.05,1000],losslessPercent:[1,150]};
  const p={hours,width,height,fps,bpp,videoMbps,losslessPercent};
  for(const [k,[min,max]] of Object.entries(ranges)) if(!Number.isFinite(p[k])||p[k]<min||p[k]>max)throw new Error('Paramètres de volume invalides.');
  const seconds=hours*3600, images=seconds*width*height*fps*bpp/8, pcm=seconds*48000*16*2/8;
  return {images,pcm,raw:images+pcm,lossless:images*losslessPercent/100+pcm,web:seconds*(videoMbps*1e6+128000)/8,totalMbps:videoMbps+.128};
}
export function size6(bytes) {
  if(!Number.isFinite(bytes)||bytes<0)return '—';
  const [unit,scale]=bytes>=1e12?['To',1e12]:bytes>=1e9?['Go',1e9]:bytes>=1e6?['Mo',1e6]:['ko',1000];
  return (bytes/scale).toLocaleString('fr-FR',{maximumFractionDigits:2})+' '+unit;
}
export const blankBook6=()=>({version:1,chapter:6,edition:'video-vr-ar-2026',media:null,notes:{},cues:[]});
const ms=n=>Math.round(n*1000);
export function validateCues6(cues,duration=86400) {
  if(!Array.isArray(cues)||cues.length>500)throw new Error('Au plus 500 sous-titres.');
  const clean=cues.map(c=>{
    if(!c||!Number.isFinite(c.start)||!Number.isFinite(c.end)||c.start<0||ms(c.end)<=ms(c.start)||c.end>duration+.001||c.end>86400)throw new Error('Chaque fin doit suivre son début et rester dans la durée de la vidéo.');
    if(typeof c.text!=='string'||!c.text.trim()||c.text.length>1000||/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(c.text))throw new Error('Le texte doit contenir de 1 à 1 000 caractères lisibles.');
    return {start:ms(c.start)/1000,end:ms(c.end)/1000,text:c.text.trim().replace(/\r\n?/g,'\n').replace(/\n[ \t]*\n+/g,'\n')};
  }).sort((a,b)=>a.start-b.start||a.end-b.end);
  for(let i=1;i<clean.length;i++)if(ms(clean[i].start)<ms(clean[i-1].end))throw new Error('Deux sous-titres se chevauchent dans cette sauvegarde.');
  return clean;
}
export function validateBook6(value) {
  if(!value||value.version!==1||value.chapter!==6||value.edition!=='video-vr-ar-2026'||!value.notes||typeof value.notes!=='object'||Array.isArray(value.notes))throw new Error('Cette sauvegarde ne correspond pas à l’atelier 6.');
  let media=null;
  if(value.media!==null) {
    const m=value.media;
    if(!m||typeof m.name!=='string'||m.name.length>255||!Number.isSafeInteger(m.bytes)||m.bytes<0||!Number.isFinite(m.duration)||m.duration<=0||m.duration>86400)throw new Error('Description de vidéo invalide.');
    media={name:m.name,bytes:m.bytes,duration:m.duration};
  }
  const notes={};
  for(const [k] of workbook6Fields)if(value.notes[k]!==undefined){if(typeof value.notes[k]!=='string'||value.notes[k].length>15000)throw new Error('Texte du carnet invalide.');notes[k]=value.notes[k];}
  return {...blankBook6(),media,notes,cues:validateCues6(value.cues,media?.duration??86400)};
}
export function timecode6(seconds,separator='.') {
  if(!Number.isFinite(seconds)||seconds<0||seconds>86400)throw new Error('Temps invalide.');
  const t=ms(seconds), pad=(n,w=2)=>String(n).padStart(w,'0');
  return `${pad(Math.floor(t/3600000))}:${pad(Math.floor(t/60000)%60)}:${pad(Math.floor(t/1000)%60)}${separator}${pad(t%1000,3)}`;
}
export function subtitles6(cues,format='vtt') {
  if(!['srt','vtt'].includes(format))throw new Error('Format inconnu.');
  const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
  return (format==='vtt'?'WEBVTT\n\n':'')+validateCues6(cues).map((c,i)=>`${i+1}\n${timecode6(c.start,format==='srt'?',':'.')} --> ${timecode6(c.end,format==='srt'?',':'.')}\n${escape(c.text)}\n`).join('\n');
}
export function cueReading6(cue) {
  const cps=Array.from(cue.text.replace(/\s/g,' ')).length/(cue.end-cue.start);
  return {cps,tooFast:cps>17,tooManyLines:cue.text.split('\n').length>2};
}
export function bookMarkdown6(value) {
  const b=validateBook6(value);
  return '# Atelier 6 — notice du micro-documentaire\n\n'+(b.media?`Fichier local : ${b.media.name} ; ${size6(b.media.bytes)} ; ${timecode6(b.media.duration)}.\n\n`:'')+workbook6Fields.map(([id,title])=>`## ${title}\n\n${b.notes[id]||'(À compléter)'}\n`).join('\n')+(b.cues.length?'\n## Sous-titres révisés\n\n'+b.cues.map(c=>`${timecode6(c.start)} → ${timecode6(c.end)}\n${c.text}\n`).join('\n'):'');
}
