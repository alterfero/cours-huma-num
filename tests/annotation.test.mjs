import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { validateSegment, segmentsCsv, segmentsEaf, validateWorkbook, tokenize } from '../public/annotation.js';
const segment={id:'s1',start:.25,end:2.5,tier:'Transcription',text:'Une parole, avec « accents » & <incertitude>.',author:'Équipe A'};
test('les intervalles sont utilisables en millisecondes et contenus dans le média',()=>{
  assert.equal(validateSegment(segment,10),'');
  for(const patch of [{start:-1},{end:.25},{end:12},{start:NaN},{end:Infinity},{text:'  '},{start:1.0001,end:1.0002}])assert.notEqual(validateSegment({...segment,...patch},10),'');
});
test('la sauvegarde conserve le travail et rejette un autre atelier ou des annotations incohérentes',()=>{
  const saved={version:2,chapter:2,source:'pangloss-hulup',notes:{mission:'Musée',written:'« quai » : lieu'},segments:[segment]};
  assert.deepEqual(validateWorkbook(JSON.parse(JSON.stringify(saved)),10),saved);
  for(const bad of [{...saved,version:1},{...saved,source:'autre-media'},{...saved,chapter:1},{...saved,notes:{mission:42}},{...saved,segments:[segment,segment]},{...saved,segments:[segment,{...segment,id:'s2',start:1,end:3}]},{...saved,segments:[{...segment,tier:'Autre'}]}])assert.throws(()=>validateWorkbook(bad,10));
  assert.equal(validateWorkbook({...saved,segments:[segment,{...segment,id:'s2',tier:'Commentaire'}]},10).segments.length,2);
});
test('CSV et EAF préservent accents, texte, liens temporels et échappement',()=>{
  const csv=segmentsCsv([segment,{...segment,id:'s2',text:'=HYPERLINK("x")'}]);
  assert.ok(csv.startsWith('\uFEFF'));assert.match(csv,/Équipe A/);assert.ok(csv.includes('"\'=HYPERLINK(""x"")"'));
  const eaf=segmentsEaf([segment,{...segment,id:'s2',tier:'Commentaire',text:'À discuter'}],'atelier-voix.wav','2026-11-06T12:00:00.000Z');
  assert.match(eaf,/TIME_VALUE="250"/);assert.match(eaf,/TIME_VALUE="2500"/);
  assert.equal((eaf.match(/<TIME_SLOT /g)||[]).length,2);assert.equal((eaf.match(/<TIER /g)||[]).length,2);
  assert.match(eaf,/&amp; &lt;incertitude&gt;/);assert.match(eaf,/RELATIVE_MEDIA_URL="\.\/atelier-voix.wav"/);
});
test('les positions du texte sélectionné préservent espaces et accents',()=>{
  const text='Au  quai,\nles récits.';const tokens=tokenize(text);
  assert.equal(text.slice(tokens[1].start,tokens[2].end),'quai,\nles');
  assert.equal(text.slice(tokens[3].start,tokens[3].end),'récits.');
});
test('les fichiers sonores contiennent une voix et les annotations de démonstration restent dans le média',async()=>{
  for(const name of ['demo','atelier']){
    const base=new URL('../public/assets/chapitre2/',import.meta.url);
    const data=JSON.parse(await readFile(new URL(name+'-voix.json',base),'utf8'));
    const audio=await readFile(new URL(name+'-voix.wav',base));
    assert.equal(audio.toString('ascii',0,4),'RIFF');assert.ok(data.duration>5);assert.ok(data.peaks.some(v=>v>.01));assert.ok(audio.length>200000);
    for(const s of data.segments||[])assert.equal(validateSegment(s,data.duration),'');
    if(name==='atelier')assert.equal(data.segments,undefined);
  }
});

test('l’EAF référence le média MP3 de l’atelier réel et conserve les couches',()=>{
  const rows=[segment,{...segment,id:'loc',tier:'Locuteur',text:'LOC_01'},{...segment,id:'trad',tier:'Traduction',text:'Traduction citée'}];
  const saved={version:2,chapter:2,source:'pangloss-hulup',notes:{},segments:rows};
  assert.deepEqual(validateWorkbook(saved,90),saved);
  const eaf=segmentsEaf(rows,'144254_HULUP_44k.mp3');
  assert.match(eaf,/MIME_TYPE="audio\/mpeg"/);
  assert.match(eaf,/RELATIVE_MEDIA_URL="\.\/144254_HULUP_44k.mp3"/);
  assert.equal((eaf.match(/<TIER /g)||[]).length,3);
});
