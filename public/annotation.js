import { escapeHtml } from './labs.js';

export function validateSegment(segment, duration) {
  if (!Number.isFinite(segment.start) || !Number.isFinite(segment.end)) return 'Indiquez deux temps en secondes.';
  if (segment.start < 0 || Math.round(segment.end*1000) <= Math.round(segment.start*1000) || segment.end > duration + .001) return `L’intervalle doit être compris entre 0 et ${duration.toFixed(2)} secondes, avec une fin après le début.`;
  if (!segment.text.trim()) return 'Saisissez le contenu de l’annotation.';
  return '';
}
export function toCsv(headers, rows) {
  // Évite de transformer les textes saisis en formules lorsqu’un tableur ouvre le CSV.
  const cell = value => { let text = String(value ?? ''); if (/^[=+@\-\t\r]/.test(text)) text = "'" + text; return '"' + text.replaceAll('"', '""') + '"'; };
  return '\uFEFF' + [headers,...rows].map(row=>row.map(cell).join(',')).join('\r\n');
}
export function segmentsCsv(segments) {
  return toCsv(['Identifiant','Début (s)','Fin (s)','Piste','Annotation','Auteur'], segments.map(s=>[s.id,s.start,s.end,s.tier,s.text,s.author]));
}
export function segmentsEaf(segments, media, date = new Date().toISOString()) {
  const xml = value => escapeHtml(value).replaceAll('&#39;', '&apos;').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '');
  const times = [...new Set(segments.flatMap(s=>[Math.round(s.start*1000),Math.round(s.end*1000)]))].sort((a,b)=>a-b);
  const slot = seconds => 'ts'+(times.indexOf(Math.round(seconds*1000))+1);
  const tiers = [...new Set(segments.map(s=>s.tier))];
  return `<?xml version="1.0" encoding="UTF-8"?>
<ANNOTATION_DOCUMENT AUTHOR="Export du cours — annotations étudiantes" DATE="${xml(date)}" FORMAT="3.0" VERSION="3.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://www.mpi.nl/tools/elan/EAFv3.0.xsd">
  <HEADER MEDIA_FILE="" TIME_UNITS="milliseconds"><MEDIA_DESCRIPTOR MEDIA_URL="${xml(media)}" MIME_TYPE="${media.toLowerCase().endsWith('.mp3')?'audio/mpeg':'audio/x-wav'}" RELATIVE_MEDIA_URL="./${xml(media)}"/></HEADER>
  <TIME_ORDER>${times.map((time,i)=>`<TIME_SLOT TIME_SLOT_ID="ts${i+1}" TIME_VALUE="${time}"/>`).join('')}</TIME_ORDER>
  ${tiers.map(tier=>`<TIER TIER_ID="${xml(tier)}" LINGUISTIC_TYPE_REF="default-lt">${segments.filter(s=>s.tier===tier).sort((a,b)=>a.start-b.start).map(s=>`<ANNOTATION><ALIGNABLE_ANNOTATION ANNOTATION_ID="a${segments.indexOf(s)+1}" TIME_SLOT_REF1="${slot(s.start)}" TIME_SLOT_REF2="${slot(s.end)}"><ANNOTATION_VALUE>${xml(s.text)}</ANNOTATION_VALUE></ALIGNABLE_ANNOTATION></ANNOTATION>`).join('')}</TIER>`).join('\n  ')}
  <LINGUISTIC_TYPE LINGUISTIC_TYPE_ID="default-lt" TIME_ALIGNABLE="true" GRAPHIC_REFERENCES="false"/>
</ANNOTATION_DOCUMENT>`;
}
export function validateWorkbook(value, duration) {
  if (value?.version!==2 || value?.chapter!==2 || value?.source!=='pangloss-hulup' || !value.notes || typeof value.notes!=='object' || Array.isArray(value.notes) || !Array.isArray(value.segments)) throw new Error('Format de sauvegarde invalide.');
  const fields=['mission','question','collecte','conventions','written','lexicon','tools','uncertainty','access','decision'];
  const notes={};
  for(const key of fields) if(value.notes[key]!==undefined) {
    if(typeof value.notes[key]!=='string'||value.notes[key].length>20000) throw new Error('Champ de carnet invalide.');
    notes[key]=value.notes[key];
  }
  if(value.segments.length>200) throw new Error('Trop d’annotations.');
  const ids=new Set();
  const segments=value.segments.map(s=>{
    if(!s||['id','tier','text','author'].some(k=>typeof s[k]!=='string'||s[k].length>20000)||!['Transcription','Locuteur','Traduction','Glose','Reformulation','Commentaire'].includes(s.tier)||ids.has(s.id)||validateSegment(s,duration)) throw new Error('Annotation invalide.');
    ids.add(s.id);return {id:s.id,start:s.start,end:s.end,tier:s.tier,text:s.text,author:s.author};
  });
  for(let i=0;i<segments.length;i++) for(let j=i+1;j<segments.length;j++) {
    const a=segments[i],b=segments[j];
    if(a.tier===b.tier && a.start<b.end && a.end>b.start) throw new Error('Chevauchement sur une même piste.');
  }
  return {version:2,chapter:2,source:'pangloss-hulup',notes,segments};
}
export function tokenize(text) {
  return [...text.matchAll(/\S+/gu)].map((match,i)=>({id:i,start:match.index,end:match.index+match[0].length,text:match[0]}));
}
