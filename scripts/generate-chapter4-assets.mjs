// Preparation only: Poppler, Python/Pillow and Tesseract. No network access.
// Archival source files are preserved; only documented consultation derivatives are made.
import {writeFile,readFile,copyFile,mkdir} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {images4,edition4,credit4} from '../public/chapter4-content.js';
const out=fileURLToPath(new URL('../public/assets/chapitre4/',import.meta.url));
const run=(cmd,args)=>{const p=spawnSync(cmd,args,{encoding:'utf8'});if(p.status!==0)throw new Error(p.stderr||p.error?.message||cmd);return p.stdout;};
await mkdir(out+'sources',{recursive:true});
for(const name of ['Z14-003-00770-v.jpg','Z14-003-00770-r.jpg','notice-anaite.json'])await copyFile(new URL('../public/assets/chapitre1/'+name,import.meta.url),out+'sources/'+(name==='notice-anaite.json'?'anaite-49989.json':name));
for(const date of ['03','10'])run('pdftoppm',['-f','1','-singlefile','-scale-to-x','1600','-scale-to-y','-1','-jpeg','-jpegopt','quality=92',out+`sources/vea-1856-01-${date}.pdf`,out+`vea-1856-01-${date}-p1`]);
for(const d of images4.filter(d=>d.file.startsWith('Z14')))await copyFile(out+'sources/'+d.file+'.jpg',out+d.file+'.jpg');
run('python3',['-c',`
from PIL import Image
from pathlib import Path
import json,sys
out=Path(sys.argv[1]); docs=json.loads(sys.argv[2])
source=Image.open(out/'vea-1856-01-03-p1.jpg')
source.resize((240,350),Image.Resampling.LANCZOS).save(out/'vea-1856-01-03-p1-petit.jpg',quality=92)
source.rotate(9,Image.Resampling.BICUBIC,expand=True,fillcolor='white').save(out/'vea-1856-01-03-p1-incline.png')
import subprocess
subprocess.run(['sips','-s','format','jpeg',str(out/'vea-1856-01-03-p1-incline.png'),'--out',str(out/'vea-1856-01-03-p1-incline.jpg')],check=True,stdout=subprocess.DEVNULL)
for d in docs:
 im=Image.open(out/(d['file']+'.jpg'))
 assert im.size==(d['width'],d['height']), (d['id'],im.size)
 if im.width>600:
  h=int(im.height*600/im.width+0.5)
  im.resize((600,h),Image.Resampling.LANCZOS).save(out/(d['file']+'-600.jpg'),quality=90)
`,out,JSON.stringify(images4)]);
const tessDir=process.env.HN_OCR_DIR||'/private/tmp/hn-c4-ocr-model';
const sha=async path=>createHash('sha256').update(await readFile(path)).digest('hex');
const ocr={edition:edition4,engine:run('tesseract',['--version']).split('\n')[0],language:'fra',documentLanguage:'tah',languageNote:'Modèle français appliqué à du tahitien : expérience critique, sans modèle adapté ni transcription de référence. Aucune mesure de précision linguistique.',oem:1,psm:3,generated:new Intl.DateTimeFormat('sv-SE',{timeZone:'Pacific/Tahiti'}).format(new Date()),modelSource:'https://github.com/tesseract-ocr/tessdata_fast/blob/main/fra.traineddata',modelSha256:await sha(tessDir+'/fra.traineddata'),items:{}};
for(const d of images4.filter(d=>d.id.startsWith('D4-P01')||d.id==='A4-P01')){
 const base=out+d.file+'-ocr';run('tesseract',[out+d.file+'.jpg',base,'--tessdata-dir',tessDir,'-l','fra','--oem','1','--psm','3','-c','tessedit_create_txt=1','-c','tessedit_create_tsv=1']);
 const raw=await readFile(base+'.txt','utf8'),tsv=await readFile(base+'.tsv','utf8');const lines=tsv.trimEnd().split('\n'),keys=lines.shift().split('\t');
 const words=lines.map(l=>Object.fromEntries(l.split('\t').map((v,i)=>[keys[i],v]))).filter(r=>r.level==='5'&&r.text?.trim()).map((r,i)=>({id:i+1,text:r.text,x:+r.left,y:+r.top,w:+r.width,h:+r.height,confidence:+r.conf,line:[r.block_num,r.par_num,r.line_num].join('-')}));
 ocr.items[d.id]={image:d.file+'.jpg',width:d.width,height:d.height,text:raw,words,imageSha256:await sha(out+d.file+'.jpg'),sourceUrl:d.sourceUrl,reference:d.reference,transformation:d.transformation};
 console.log(d.id+': '+words.length+' mots proposés.');
}
await writeFile(out+'ocr.json',JSON.stringify(ocr,null,2));
const files=['sources/vea-1856-01-03.pdf','sources/vea-1856-01-10.pdf',...images4.map(d=>d.file+'.jpg'),...images4.filter(d=>d.width>600).map(d=>d.file+'-600.jpg')];
const checksums=Object.fromEntries(await Promise.all(files.map(async name=>[name,await sha(out+name)])));
await writeFile(out+'provenance.json',JSON.stringify({edition:edition4,prepared:ocr.generated,credit:credit4,images:images4,sha256:checksums},null,2));
console.log('Archives, dérivés documentés et sorties OCR brutes préparés.');
