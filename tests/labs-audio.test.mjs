import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { readMonoPCM16Wav, holdResample } from '../public/labs.js';
const bytes=readFileSync(new URL('../audio/tahiti_que_tu_es_belle.wav',import.meta.url));
const arrayBuffer=b=>b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength);

test('le fichier sonore du chapitre 1 est distribué intact et lu à sa cadence réelle',()=>{
  const served=readFileSync(new URL('../public/assets/chapitre1/audio/tahiti_que_tu_es_belle.wav',import.meta.url));
  assert.deepEqual(served,bytes);
  const data=readMonoPCM16Wav(arrayBuffer(bytes));
  assert.equal(data.sampleRate,48000);
  assert.equal(data.samples.length,703455);
  assert.equal(data.duration,14.6553125);
  let energy=0;for(const x of data.samples){assert.ok(Number.isFinite(x)&&x>=-1&&x<=1);energy+=x*x;}
  assert.ok(energy/data.samples.length>.0001);
});
test('la restitution préserve la durée, les valeurs retenues et le signal à 48 kHz',()=>{
  const {samples,sampleRate}=readMonoPCM16Wav(arrayBuffer(bytes));
  assert.deepEqual(holdResample(samples,sampleRate,sampleRate),samples);
  const before=samples.slice();
  for(const rate of [800,1600,4000,8000,16000]){
    const out=holdResample(samples,sampleRate,rate),stride=sampleRate/rate;
    assert.equal(out.length,samples.length);
    for(let i=0;i<samples.length;i+=stride*113){assert.equal(out[i],samples[i]);assert.equal(out[Math.min(i+stride-1,out.length-1)],samples[i]);}
  }
  assert.deepEqual(samples,before);
});
test('sans filtre, un signal de 600 Hz échantillonné à 800 Hz se replie à 200 Hz',()=>{
  const original=Float32Array.from({length:48000},(_,i)=>Math.sin(2*Math.PI*600*i/48000));
  const out=holdResample(original,48000,800);
  for(let k=0;k<800;k++)assert.ok(Math.abs(out[k*60]+Math.sin(2*Math.PI*200*k/800))<1e-6);
  assert.throws(()=>holdResample(original,48000,0));
  assert.throws(()=>holdResample(original,48000,96000));
});
test('un WAV tronqué ou de format incompatible est signalé',()=>{
  assert.throws(()=>readMonoPCM16Wav(new ArrayBuffer(3)));
  assert.throws(()=>readMonoPCM16Wav(arrayBuffer(bytes.subarray(0,80))));
  const bad=Buffer.from(bytes);bad.writeUInt16LE(2,22);
  assert.throws(()=>readMonoPCM16Wav(arrayBuffer(bad)),/mono/);
});
