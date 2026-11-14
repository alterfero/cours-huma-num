import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {storage6,blankBook6,validateBook6,validateCues6,subtitles6,timecode6,cueReading6,bookMarkdown6} from '../public/video.js';
import {chapterSix,workshopSix,labSixPage,projectionSix} from '../public/chapter6.js';
import {chapter6Sources} from '../public/chapter6-content.js';

test('volume vidéo : dimensions, cadence, PCM et débit global restent distincts',()=>{
  const p={hours:1,width:1920,height:1080,fps:25,bpp:24,videoMbps:5,losslessPercent:50},v=storage6(p);
  assert.equal(v.images,559872000000);assert.equal(v.pcm,691200000);assert.equal(v.raw,560563200000);assert.equal(v.web,2307600000);
  const uhd=storage6({...p,width:3840,height:2160});assert.equal(uhd.images,v.images*4);assert.equal(uhd.web,v.web);
  assert.equal(storage6({...p,fps:50}).images,v.images*2);assert.equal(storage6({...p,videoMbps:2}).web,957600000);
  assert.equal(storage6({...p,losslessPercent:100}).lossless,v.raw);
  for(const patch of [{hours:0},{videoMbps:NaN},{fps:Infinity},{losslessPercent:-1},{width:17000}])assert.throws(()=>storage6({...p,...patch}));
});
test('les temps sont triés et arrondis à la milliseconde sans créer de segments impossibles',()=>{
  const cues=validateCues6([{start:3,end:4,text:'Fin'},{start:0,end:2.9996,text:'Début\r\n\r\nSuite'}],4);
  assert.equal(cues[0].end,3);assert.equal(cues[0].text,'Début\nSuite');assert.equal(timecode6(59.9996),'00:01:00.000');
  for(const bad of [[{start:-1,end:2,text:'x'}],[{start:1,end:1.0001,text:'x'}],[{start:0,end:3,text:'x'},{start:2,end:4,text:'y'}],[{start:0,end:5,text:'x'}],[{start:0,end:2,text:''}]])assert.throws(()=>validateCues6(bad,4));
});
test('SRT et WebVTT conservent accents et retours à la ligne sans interpréter le balisage saisi',()=>{
  const cues=[{start:1.234,end:4.567,text:'Ia ora na, Moorea.\n<voix> & écho'}];
  assert.match(subtitles6(cues,'srt'),/^1\n00:00:01,234 --> 00:00:04,567\n/);
  assert.match(subtitles6(cues,'vtt'),/^WEBVTT\n\n1\n00:00:01.234 --> 00:00:04.567\n/);
  assert.match(subtitles6(cues),/&lt;voix&gt; &amp; écho/);assert.throws(()=>subtitles6(cues,'html'));
  assert.equal(cueReading6({start:0,end:1,text:'x'.repeat(18)}).tooFast,true);
});
test('reprise : médias décrits mais non inclus, données étrangères et segments hors vidéo refusés',()=>{
  const b=blankBook6();b.media={name:'capsule.mp4',bytes:400000,duration:60};b.cues=[{start:2,end:4,text:'Une capsule.'}];b.notes.source='Source étudiante';
  assert.deepEqual(validateBook6(JSON.parse(JSON.stringify(b))),b);assert.match(bookMarkdown6(b),/Source étudiante/);
  for(const patch of [{chapter:5},{notes:[]},{notes:{source:45}},{media:{...b.media,duration:1}},{cues:'texte'},{media:{...b.media,name:'x'.repeat(256)}}])assert.throws(()=>validateBook6({...b,...patch}));
});
test('les vues restent reliées aux ressources et le lecteur tiers est chargé à la demande',async()=>{
  assert.equal(new Set(chapter6Sources.map(s=>s.id)).size,chapter6Sources.length);
  for(const html of [chapterSix(),labSixPage(),workshopSix(),...Array.from({length:9},(_,i)=>projectionSix(i)),projectionSix(Infinity)]){
    assert.doesNotMatch(html,/undefined|NaN/);assert.doesNotMatch(html,/<iframe/);
    const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length);
    for(const [,url] of html.matchAll(/(?:src|href)="(\/assets\/chapitre6\/[^"#]+)"/g))await access(new URL('../public'+url,import.meta.url));
  }
  const notice=JSON.parse(await readFile(new URL('../public/assets/chapitre6/sources/archive-notice.json',import.meta.url)));
  assert.equal(notice.metadata.licenseurl,'http://creativecommons.org/licenses/by-nc-nd/3.0/fr/');assert.equal(notice.metadata.date,'2015');
  assert.equal(notice.metadata.uploader,undefined);assert.equal(notice.files[0].size,'611909954');
});
test('illustrations traçables et atelier distribué sans film ni réponses',async()=>{
  const root=new URL('../public/assets/chapitre6/',import.meta.url),provenance=JSON.parse(await readFile(new URL('provenance.json',root)));
  for(const im of provenance.illustrations){const b=await readFile(new URL(im.file,root));assert.equal(createHash('sha256').update(b).digest('hex'),im.sha256);assert.ok(im.license.startsWith('CC BY'));}
  const names=JSON.parse(execFileSync('python3',['-c','import zipfile,json,sys; print(json.dumps(zipfile.ZipFile(sys.argv[1]).namelist()))',new URL('atelier-chapitre-6.zip',root).pathname],{encoding:'utf8'}));
  assert.equal(names.length,7);assert.ok(names.includes('carnet-vierge.json'));assert.ok(!names.some(n=>/\.(mp4|srt|vtt)$/i.test(n)));
});
