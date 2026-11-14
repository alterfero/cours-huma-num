import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {inflateSync} from 'node:zlib';
import {recordings5,chapter5Sources,dossier5} from '../public/chapter5-content.js';
import {filterRecordings5,groupPlaces5,pcmBytes5,compressedBytes5,blankBook5,validateBook5,segmentError5,segmentsCsv5,bookMarkdown5} from '../public/sound.js';
import {chapterFive,workshopFive,labFivePage,projectionFive} from '../public/chapter5.js';
const folder=new URL('../public/assets/chapitre5/',import.meta.url);
const data=JSON.parse(await readFile(new URL('audio-data.json',folder),'utf8'));
const segment={id:'s5-test-1',recording:'A5-01',start:1,end:4,kind:'Commentaire de contexte',text:'Repère « test »\nDeuxième ligne',author:'Binôme'};
test('le catalogue filtre les notices sans chercher dans les textes ni mélanger les dossiers',()=>{
 assert.deepEqual(filterRecordings5('demo','preparer musee').map(d=>d.id),['D5-01']);
 assert.equal(filterRecordings5('demo','Internet').length,0);
 assert.deepEqual(filterRecordings5('atelier','','Son sans paroles').map(d=>d.id),['A5-03']);
 assert.equal(filterRecordings5('atelier','xyz').length,0);
});
test('la carte distingue lieu de capture, lieu évoqué et absence de localisation',()=>{
 const a=dossier5('atelier'),capture=groupPlaces5(a,'recorded'),story=groupPlaces5(a,'mentioned');
 assert.deepEqual(capture.unknown,['A5-02']);assert.deepEqual(story.atelier,['A5-02']);assert.deepEqual(story.unknown,['A5-03']);assert.equal(Object.values(capture).flat().length,3);
 assert.throws(()=>groupPlaces5(a,'inventé'));
});
test('les volumes PCM et de consultation utilisent bits, canaux, secondes et copies',()=>{
 assert.equal(pcmBytes5(36000,48000,24,2),10368000000);
 assert.equal(compressedBytes5(36000,128),576000000);
 assert.equal(pcmBytes5(60,48000,24,2,3),51840000);
 assert.throws(()=>pcmBytes5(NaN,48000,24,2));assert.throws(()=>compressedBytes5(-1,128));
});
test('les repères et les sauvegardes refusent les intervalles impossibles et les autres dossiers',()=>{
 assert.equal(segmentError5(segment,'atelier',data),'');
 const b=blankBook5();b.notes.public='Musée';b.segments=[segment];assert.deepEqual(validateBook5(JSON.parse(JSON.stringify(b)),data),b);
 for(const s of [{...segment,end:1000},{...segment,start:-1},{...segment,end:1},{...segment,start:NaN},{...segment,recording:'D5-01'},{...segment,text:''},{...segment,kind:'autre'}])assert.throws(()=>validateBook5({...b,segments:[s]},data));
 for(const patch of [{chapter:2},{edition:'autre'},{notes:[]},{notes:{public:2}},{segments:[segment,segment]}])assert.throws(()=>validateBook5({...b,...patch},data));
});
test('les exports conservent les liens, accents et limites de passage',()=>{
 const b=blankBook5();b.segments=[segment];const csv=segmentsCsv5([{...segment,text:'=1+1'}]);assert.match(csv,/'=1\+1/);assert.match(csv,/a5-01.wav/);assert.match(bookMarkdown5(b),/1,00 s à 4,00 s/);assert.match(bookMarkdown5(b),/« test »/);
});
test('les six sons contiennent du PCM audible et leurs enveloppes correspondent aux fichiers fournis',async()=>{
 for(const d of recordings5){const m=data.items[d.id],wav=await readFile(new URL(m.file,folder));assert.equal(createHash('sha256').update(wav).digest('hex'),m.sha256);assert.equal(wav.toString('ascii',0,4),'RIFF');assert.equal(wav.readUInt32LE(24),22050);assert.equal(wav.readUInt16LE(22),1);assert.equal(wav.readUInt16LE(34),16);const count=wav.readUInt32LE(40)/2;assert.equal(m.duration,count/22050);assert.ok(m.duration>10);assert.equal(m.peaks.length,256);let audible=0;for(let c=0;c<256;c++){let peak=0;for(let i=Math.floor(c*count/256);i<Math.floor((c+1)*count/256);i++)peak=Math.max(peak,Math.abs(wav.readInt16LE(44+i*2)/32768));assert.ok(Math.abs(peak-m.peaks[c])<.00001);if(peak>.01)audible++;}assert.ok(audible>50);}
});
test('le spectrogramme des signaux montre les fréquences calculées, et non une image décorative',async()=>{
 const png=await readFile(new URL('d5-02-spectre.png',folder));assert.equal(png.readUInt32BE(16),256);assert.equal(png.readUInt32BE(20),128);const idat=[];let offset=8;while(offset<png.length){const n=png.readUInt32BE(offset),kind=png.toString('ascii',offset+4,offset+8);if(kind==='IDAT')idat.push(png.subarray(offset+8,offset+8+n));offset+=12+n;}const pixels=inflateSync(Buffer.concat(idat));
 const brightest=col=>{let best=-1,index=-1;for(let row=0;row<128;row++){const at=row*(256*3+1)+1+col*3,light=pixels[at]+pixels[at+1]+pixels[at+2];if(light>best){best=light;index=row;}}return (127-index+.5)*8000/128;};
 assert.ok(Math.abs(brightest(Math.floor(2/12*256))-440)<100);assert.ok(Math.abs(brightest(Math.floor(6/12*256))-1760)<100);
});
test('le cours, le laboratoire, l’atelier et la projection se rendent sans référence manquante',()=>{
 assert.equal(new Set(chapter5Sources.map(s=>s.id)).size,chapter5Sources.length);
 for(const render of [chapterFive,labFivePage,workshopFive,projectionFive]){const html=render();assert.ok(!html.includes('undefined'));assert.match(html,/Chapitre 05|CHAPITRE 05|chapitre 5/);}
});
