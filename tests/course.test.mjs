import test from 'node:test';
import assert from 'node:assert/strict';
import { encodeBytes, byteBits, quantize, imageBytes, aliasFrequency, signalSamples, escapeHtml } from '../public/labs.js';
import { timeline, sources, quiz } from '../public/content.js';
import { server } from '../server.mjs';

test('UTF-8 distingue les octets, points de code et caractères visibles',()=>{
  assert.deepEqual(encodeBytes('e'),[101]);
  assert.deepEqual(encodeBytes('é'),[195,169]);
  assert.equal(encodeBytes('🌊').length,4);
  assert.equal(encodeBytes('e\u0301').length,3);
  assert.equal(byteBits(169),'10101001');
  assert.deepEqual(encodeBytes(''),[]);
});
test('la quantification respecte les niveaux et les bornes',()=>{
  assert.equal(quantize(0,1),0);assert.equal(quantize(255,1),255);
  assert.equal(quantize(127,1),0);assert.equal(quantize(128,1),255);
  assert.equal(quantize(128,2),170);
  assert.equal(imageBytes(176,8),30976);assert.equal(imageBytes(8,1),8);
});
test('le repliement et les cas limites du signal sont cohérents',()=>{
  assert.equal(aliasFrequency(600,4000),600);
  assert.equal(aliasFrequency(600,800),200);
  assert.equal(aliasFrequency(800,800),0);
  assert.equal(aliasFrequency(1200,800),400);
  assert.ok(signalSamples(400,800).every(x=>Math.abs(x.value)<1e-12));
});
test('les contenus historiques référencent des sources identifiables',()=>{
  const ids=new Set(sources.map(s=>s.id));assert.equal(ids.size,sources.length);
  for(const item of timeline){assert.ok(ids.has(item.source));if(item.extra)assert.ok(ids.has(item.extra));}
  for(const q of quiz)assert.ok(q.answers.length>=2);
});
test('les notes utilisateur ne peuvent injecter du HTML',()=>{
  assert.equal(escapeHtml('<img onerror="bad()">'), '&lt;img onerror=&quot;bad()&quot;&gt;');
});
test('serveur local et Railway : ressources, santé, chemins et méthodes',async t=>{
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  t.after(()=>new Promise(resolve=>server.close(resolve)));
  const base=`http://127.0.0.1:${server.address().port}`;
  const home=await fetch(base);assert.equal(home.status,200);assert.match(await home.text(),/lang="fr"/);
  const health=await fetch(base+'/healthz');assert.equal(await health.text(),'ok');
  const image=await fetch(base+'/assets/kirsch-1957.webp');assert.equal(image.status,200);assert.equal(image.headers.get('content-type'),'image/webp');
  const audio=await fetch(base+'/assets/chapitre2/atelier-voix.wav',{headers:{Range:'bytes=0-43'}});assert.equal(audio.status,206);assert.equal(audio.headers.get('content-type'),'audio/wav');assert.equal((await audio.arrayBuffer()).byteLength,44);
  const mp3=await fetch(base+'/assets/chapitre2/pangloss/144254_HULUP_44k.mp3',{headers:{Range:'bytes=0-99'}});assert.equal(mp3.status,206);assert.equal(mp3.headers.get('content-type'),'audio/mpeg');assert.equal((await mp3.arrayBuffer()).byteLength,100);
  const xml=await fetch(base+'/assets/chapitre2/pangloss/crdo-IAI_HULUP.xml');assert.match(xml.headers.get('content-type'),/application\/xml/);assert.match(await xml.text(),/HULUPs2/);
  const suffix=await fetch(base+'/assets/chapitre2/atelier-voix.wav',{headers:{Range:'bytes=-10'}});assert.equal(suffix.status,206);assert.equal((await suffix.arrayBuffer()).byteLength,10);
  assert.equal((await fetch(base+'/assets/chapitre2/atelier-voix.wav',{headers:{Range:'bytes=20-10'}})).status,416);
  const head=await fetch(base+'/app.js',{method:'HEAD'});assert.equal(head.status,200);assert.equal(await head.text(),'');
  assert.equal((await fetch(base+'/absent')).status,404);
  assert.equal((await fetch(base+'/..%2Fpackage.json')).status,403);
  assert.equal((await fetch(base+'/%ZZ')).status,400);
  assert.equal((await fetch(base+'/.env')).status,404);
  assert.equal((await fetch(base+'/',{method:'POST'})).status,405);
});
