import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {panglossData} from '../public/pangloss-data.js';
import {chapterTwo, workshopTwo, labTwoPage, projectionTwo} from '../public/chapter2.js';
const folder=new URL('../public/assets/chapitre2/pangloss/',import.meta.url);
test('les ressources Pangloss distribuées sont intactes et la vue suit tous les éléments du XML',async()=>{
 for(const [file,hash] of Object.entries(panglossData.hashes))assert.equal(createHash('sha256').update(await readFile(new URL(file,folder))).digest('hex'),hash,file);
 assert.deepEqual(JSON.parse(await readFile(new URL('data.json',folder),'utf8')),panglossData);
 const parsed=spawnSync('python3',['-c',`import xml.etree.ElementTree as E,json,sys
root=E.parse(sys.argv[1]).getroot()
rows=[]
for i,s in enumerate(root.findall('S'),1):
 a=s.find('AUDIO')
 rows.append(dict(id=s.get('id'),label='S'+str(i),start=float(a.get('start')),end=float(a.get('end')),form=s.findtext('FORM'),translation=s.findtext('TRANSL'),words=[dict(form=w.findtext('FORM'),gloss=w.findtext('TRANSL')) for w in s.findall('W')]))
assert not root.findall('.//W/AUDIO')
assert not root.findall('.//M')
print(json.dumps(rows,ensure_ascii=False))`,fileURLToPath(new URL('crdo-IAI_HULUP.xml',folder))],{encoding:'utf8'});
 assert.equal(parsed.status,0,parsed.stderr);
 assert.deepEqual(JSON.parse(parsed.stdout),panglossData.segments);
 assert.equal(panglossData.segments.length,23);
 assert.equal(panglossData.segments.flatMap(s=>s.words).length,229);
 for(const s of panglossData.segments)assert.ok(s.start>=0&&s.end>s.start&&s.end<=panglossData.duration);
 assert.deepEqual([panglossData.segments[1].start,panglossData.segments[1].end],[2.42,5.64]);
});
test('le cours renvoie vers Pangloss ; le laboratoire et la projection conservent leurs ressources',()=>{
 for(const html of [labTwoPage(),projectionTwo(5)]){
  assert.ok(!html.includes('undefined'));
  assert.match(html,/144254_HULUP_44k\.mp3/);
  assert.match(html,/Taï Waheo/);
 }
 const course=chapterTwo();assert.match(course,/Diarisation/);assert.match(course,/Transcrire, segmenter/);
 assert.ok(course.includes('https://pangloss.cnrs.fr/corpus/show?'));
 assert.doesNotMatch(course,/id="c2-lab"|data-pangloss-reader/);
 assert.doesNotMatch(workshopTwo(),/144254_HULUP_44k\.mp3|atelier-chapitre-2\.zip|id="c2-workbook"/);
});
test('l’ancien dossier Pangloss conserve les sources inchangées et le carnet vierge',()=>{
 const check=spawnSync('python3',['-c',`from pathlib import Path
import zipfile,sys
folder=Path(sys.argv[1])
with zipfile.ZipFile(folder/'atelier-chapitre-2.zip') as z:
 assert len(z.namelist())==10
 assert 'atelier-voix.wav' not in z.namelist()
 for name in z.namelist(): assert z.read(name)==(folder/name).read_bytes(),name
 assert z.read('annotations-vierges.csv').decode().count('\\n')==1`,fileURLToPath(new URL('../public/assets/chapitre2/',import.meta.url))],{encoding:'utf8'});
 assert.equal(check.status,0,check.stderr);
});
