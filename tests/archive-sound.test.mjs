import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {media5} from '../public/chapter5-media.js';
import {archiveStorage5,blankArchiveBook5,validateArchiveBook5,archiveBookMarkdown5} from '../public/sound.js';
import {chapterFive,workshopFive,projectionFive} from '../public/chapter5.js';
import {server} from '../server.mjs';

const mediaFolder=new URL('../public/assets/chapitre5/te-hua-riirii/',import.meta.url);
test('les copies pédagogiques correspondent aux fichiers fournis et au signal FLAC mesuré',async()=>{
 for(const m of Object.values(media5.files)){
  const copy=await readFile(new URL(m.file,mediaFolder)),source=await readFile(new URL('../audio/archive/'+m.file,import.meta.url));
  assert.deepEqual(copy,source);assert.equal(copy.length,m.bytes);assert.equal(createHash('sha256').update(copy).digest('hex'),m.sha256);
 }
 const flac=await readFile(new URL(media5.files.flac.file,mediaFolder));assert.equal(flac.toString('ascii',0,4),'fLaC');assert.equal(flac[4]&127,0);
 const packed=flac.readBigUInt64BE(18),rate=Number(packed>>44n),channels=Number((packed>>41n)&7n)+1,bits=Number((packed>>36n)&31n)+1,samples=Number(packed&0xfffffffffn);
 assert.equal(rate,44100);assert.equal(channels,2);assert.equal(bits,16);assert.equal(media5.files.flac.duration,samples/rate);
 for(const name of ['flac.png','8kbps.png'])assert.deepEqual(await readFile(new URL(name,mediaFolder)),await readFile(new URL('../audio/archive/'+name,import.meta.url)));
});
test('stockage : valeurs pour une heure, canaux, profondeur et cas invalides',()=>{
 const params={hours:1,rate:44100,bits:16,channels:2,kbps:256,flacPercent:49.57},v=archiveStorage5(params);
 assert.equal(v.wav,635040000);assert.equal(v.mp3,115200000);assert.ok(Math.abs(v.flac-314800000)<100000);assert.equal(v.wavKbps,1411.2);
 assert.equal(archiveStorage5({...params,channels:1}).wav,v.wav/2);
 assert.equal(archiveStorage5({...params,bits:24}).wav,v.wav*1.5);
 assert.equal(archiveStorage5({...params,kbps:128}).mp3,v.mp3/2);
 for(const patch of [{hours:0},{hours:NaN},{channels:3},{flacPercent:0},{kbps:199}])assert.throws(()=>archiveStorage5({...params,...patch}));
});
test('le nouveau carnet accepte ses notes et refuse les anciennes sauvegardes ou valeurs mal formées',()=>{
 const b=blankArchiveBook5();b.notes.source='Une piste choisie par les étudiants';b.notes.credit='<script>alert(1)</script>';
 assert.deepEqual(validateArchiveBook5(JSON.parse(JSON.stringify(b))),b);assert.match(archiveBookMarkdown5(b),/Une piste choisie/);
 for(const patch of [{version:1},{chapter:2},{edition:'archives-sonores-v1'},{notes:[]},{notes:{source:42}},{notes:{source:'x'.repeat(15001)}}])assert.throws(()=>validateArchiveBook5({...b,...patch}));
});
test('les vues et le dossier atelier respectent la recherche autonome et les trois fichiers',()=>{
 const html=chapterFive();for(const id of ['c5-decouvrir','c5-numeriser','c5-droits','c5-atelier'])assert.ok(html.includes(`id="${id}"`));
 assert.match(html,/flac\.png/);assert.match(html,/8kbps\.png/);assert.match(html,/115,2 Mo/);
 const workshop=workshopFive();assert.match(workshop,/Aucune piste n’est présélectionnée/);assert.doesNotMatch(workshop,/<audio|Cylinder One|Cylinders-15736|a5-01\.wav/);
 for(let i=0;i<8;i++)assert.doesNotMatch(projectionFive(i),/undefined|NaN/);
 assert.doesNotMatch(projectionFive(Infinity),/undefined/);
 const names=JSON.parse(execFileSync('python3',['-c','import zipfile,json,sys; print(json.dumps(zipfile.ZipFile(sys.argv[1]).namelist()))',new URL('../public/assets/chapitre5/atelier-chapitre-5.zip',import.meta.url).pathname],{encoding:'utf8'}));
 assert.deepEqual(names.sort(),['01-original/','02-extrait-wav/','03-extrait-web/','LISEZ-MOI.txt','NOTICE.md'].sort());
});
test('le FLAC est servi avec son type et les plages nécessaires à la navigation audio',async t=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));t.after(()=>new Promise(resolve=>server.close(resolve)));
 const url=`http://127.0.0.1:${server.address().port}/assets/chapitre5/te-hua-riirii/${encodeURIComponent(media5.files.flac.file)}`;
 const partial=await fetch(url,{headers:{Range:'bytes=0-41'}});assert.equal(partial.status,206);assert.equal(partial.headers.get('content-type'),'audio/flac');assert.equal(partial.headers.get('content-range'),`bytes 0-41/${media5.files.flac.bytes}`);assert.equal((await partial.arrayBuffer()).byteLength,42);
 const head=await fetch(url,{method:'HEAD'});assert.equal(head.status,200);assert.equal(head.headers.get('content-length'),String(media5.files.flac.bytes));assert.equal(await head.text(),'');
 assert.equal((await fetch(url,{headers:{Range:'bytes=99999999-'}})).status,416);
});
