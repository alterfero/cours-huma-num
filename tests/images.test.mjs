import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {imageInfo,imageRequestFile,manifest4,rectangle,regionError,annotationError,webAnnotations,blankBook4,validateBook4} from '../public/images.js';
import {image4,dossier4,images4} from '../public/chapter4-content.js';
import {chapterFour,labFourPage,workshopFour,projectionFour} from '../public/chapter4.js';
import {server} from '../server.mjs';
const base='https://cours.example.org';
const row={id:'a4-00000000-0000-4000-8000-000000000001',image:'A4-P02',x:100,y:200,w:300,h:150,kind:'Description visible',text:'Une zone à examiner, avec « accents » et <texte>.',author:'Binôme A',uncertain:true};
test('les sélections spatiales sont indépendantes du sens du tracé et bornées par l’image',()=>{
 assert.deepEqual(rectangle({x:800,y:600},{x:200,y:100},1200,900),{x:200,y:100,w:600,h:500});
 assert.deepEqual(rectangle({x:-50,y:-20},{x:1300,y:950},1200,900),{x:0,y:0,w:1200,h:900});
 assert.equal(regionError(row,image4(row.image)),'');
 for(const r of [{...row,w:0},{...row,x:-1},{...row,w:image4(row.image).width+1},{...row,h:NaN},{...row,x:.5}])assert.ok(regionError(r,image4(row.image)));
});
test('les manifestes relient chaque Canvas, image et service sans confondre les deux dossiers',()=>{
 for(const scope of ['demo','atelier']){const m=manifest4(scope,base);assert.equal(m.type,'Manifest');assert.equal(m.items.length,3);assert.deepEqual(m.items.map(c=>c.id.split('/').at(-1)),dossier4(scope));for(const c of m.items){const a=c.items[0].items[0],d=image4(c.id.split('/').at(-1));assert.equal(a.target,c.id);assert.equal(a.motivation,'painting');assert.equal(a.body.width,d.width);assert.equal(a.body.height,c.height);assert.equal(a.body.service[0].profile,'level0');assert.ok(a.body.id.endsWith('/full/max/0/default.jpg'));assert.equal(c.homepage[0].id,d.sourceUrl);assert.match(c.requiredStatement.value.fr[0],/CC BY-NC-SA/);}}
 assert.throws(()=>manifest4('inconnu',base));
});
test('Image API : seules les images et tailles annoncées sont servies',()=>{
 for(const d of images4){const info=imageInfo(d.id,base);assert.equal(info.profile,'level0');for(const size of info.sizes)assert.ok(imageRequestFile(`/iiif/image/${d.id}/full/${size.width},/0/default.jpg`));assert.ok(imageRequestFile(`/iiif/image/${d.id}/full/max/0/default.jpg`));}
 for(const path of ['/iiif/image/D4-P01/full/777,/0/default.jpg','/iiif/image/D4-P01/0,0,100,100/max/0/default.jpg','/iiif/image/D4-P01/full/max/90/default.jpg','/iiif/image/inconnu/full/max/0/default.jpg','/iiif/image/../../package.json/full/max/0/default.jpg'])assert.equal(imageRequestFile(path),null);
});
test('annotations : statut, auteur et zone sont conservés dans Web Annotation',()=>{
 assert.equal(annotationError(row,'atelier'),'');assert.ok(annotationError(row,'demo'));
 const [a]=webAnnotations([row],base,'atelier');assert.equal(a.target,base+'/iiif/4/atelier/canvas/A4-P02#xywh=100,200,300,150');assert.equal(a.body[0].value,row.text);assert.equal(a.body[0].format,'text/plain');assert.equal(a.creator.name,row.author);assert.ok(a.body.some(x=>x.value==='Incertitude signalée par l’auteur'));assert.match(a.id,/^urn:uuid:/);assert.equal(webAnnotations([row],base+'/iiif/4/atelier/manifest.json','atelier')[0].target,a.target);
});
test('la reprise du carnet refuse un autre chapitre, une zone hors image et des annotations du cours',()=>{
 const book=blankBook4();book.notes.public='Un musée';book.annotations=[row];assert.deepEqual(validateBook4(JSON.parse(JSON.stringify(book))),book);
 for(const patch of [{chapter:3},{edition:'autre'},{edition:'images-objets-v1'},{notes:[]},{notes:{public:3}},{annotations:[{...row,x:image4(row.image).width+1}]},{annotations:[{...row,image:'D4-P02'}]},{annotations:[row,row]},{annotations:[{...row,id:'a4-non-uuid'}]}])assert.throws(()=>validateBook4({...book,...patch}));
});
test('les sorties OCR proviennent des fichiers distribués et conservent leurs positions',async()=>{
 const folder=new URL('../public/assets/chapitre4/',import.meta.url),ocr=JSON.parse(await readFile(new URL('ocr.json',folder),'utf8'));
 assert.equal(ocr.documentLanguage,'tah');assert.match(ocr.engine,/tesseract 5/);assert.equal(ocr.language,'fra');assert.match(ocr.modelSha256,/^[a-f0-9]{64}$/);
 for(const [id,value] of Object.entries(ocr.items)){const d=image4(id),image=await readFile(new URL(value.image,folder));assert.equal(createHash('sha256').update(image).digest('hex'),value.imageSha256);assert.equal(image[0],255);assert.equal(image[1],216);for(const w of value.words){assert.equal(regionError(w,d),'');assert.ok(w.confidence>=0&&w.confidence<=100);}assert.equal(value.text,await readFile(new URL(d.file+'-ocr.txt',folder),'utf8'));}
 assert.ok(ocr.items['D4-P01'].words.length>ocr.items['D4-P01-petit'].words.length);
});
test('les quatre vues de cours se rendent avec des références connues et des sources séparées',()=>{
 for(const render of [chapterFour,labFourPage,workshopFour,projectionFour]){const html=render();assert.match(html,/Chapitre 04|CHAPITRE 04|Chapitre 4|chapitre 4/);assert.ok(!html.includes('undefined'));assert.doesNotMatch(html,/fictif|fictive|C-28|demo-boite|demo-affiche|atelier-fiche/);}
});
test('serveur IIIF : liens déréférençables, CORS, JPEG, HEAD et origine Railway',async t=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));t.after(()=>new Promise(r=>server.close(r)));const origin=`http://127.0.0.1:${server.address().port}`;
 const response=await fetch(origin+'/iiif/4/atelier/manifest.json');assert.equal(response.status,200);assert.equal(response.headers.get('access-control-allow-origin'),'*');const m=await response.json();assert.equal(m.id,origin+'/iiif/4/atelier/manifest.json');
 for(const c of m.items){assert.equal((await fetch(c.id)).status,200);assert.equal((await fetch(c.items[0].id)).status,200);const a=c.items[0].items[0];assert.equal((await fetch(a.id)).status,200);const info=await fetch(a.body.service[0].id+'/info.json');assert.equal(info.status,200);const image=await fetch(a.body.id);assert.equal(image.status,200);assert.equal(image.headers.get('content-type'),'image/jpeg');assert.ok((await image.arrayBuffer()).byteLength>1000);const head=await fetch(a.body.id,{method:'HEAD'});assert.equal(head.status,200);assert.equal((await head.text()).length,0);assert.ok(+head.headers.get('content-length')>1000);}
 const railway=await fetch(origin+'/iiif/4/demo/manifest.json',{headers:{'x-forwarded-proto':'https'}});assert.ok((await railway.json()).id.startsWith('https://'));
 const bad=await fetch(origin+'/iiif/image/D4-P01/full/777,/0/default.jpg');assert.equal(bad.status,404);assert.equal(bad.headers.get('access-control-allow-origin'),'*');
});

test('les JPEG des cartes restent identiques aux archives et les anciennes cibles ne sont pas réaffectées',async()=>{
 const folder=new URL('../public/assets/chapitre4/',import.meta.url);
 for(const d of images4.filter(d=>d.file.startsWith('Z14'))){assert.deepEqual(await readFile(new URL(d.file+'.jpg',folder)),await readFile(new URL('sources/'+d.file+'.jpg',folder)));}
 for(const id of ['D4-01','D4-02','A4-01','A4-02']){assert.equal(image4(id),undefined);assert.equal(imageRequestFile(`/iiif/image/${id}/full/max/0/default.jpg`),null);}
});
