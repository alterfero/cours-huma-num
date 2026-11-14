import {writeFile,mkdir,rm} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {workshop6Prep,workshop6Steps,workshop6Links,workshop6Files,workbook6Fields} from '../public/chapter6-content.js';
import {blankBook6} from '../public/video.js';

const folder=new URL('../public/assets/chapitre6/',import.meta.url),templates=new URL('atelier/',folder);
await mkdir(templates,{recursive:true});
const instructions=`HUMANITÉS NUMÉRIQUES — CHAPITRE 6
ATELIER COLLECTIF — LE MICRO-DOCUMENTAIRE D’UN OBJET

Une heure pour réaliser et publier un film de 30 secondes avec une voix off et des sous-titres.
${workshop6Prep((label,url)=>`${label} (${url})`)}

${workshop6Steps.map(([title,...paragraphs],i)=>`${i+1}. ${title.toUpperCase()}\n${paragraphs.join('\n\n')}`).join('\n\n')}

OUTILS ET DÉPÔT
${workshop6Links.map(([title,url])=>`${title} : ${url}`).join('\n')}

DOSSIER À CONSERVER
${workshop6Files}

Publiez sur Internet Archive le MP4 de diffusion et son SRT. Conservez l’original et les notes de travail dans le dossier du groupe. Le carnet JSON permet de reprendre les notes dans l’atelier.
`;
const notice='# Atelier 6 — NOTICE\n\n'+workbook6Fields.map(([,title,prompt])=>`## ${title}\n\n${prompt}\n\n[À compléter]\n`).join('\n');
await writeFile(new URL('LISEZ-MOI.txt',templates),instructions);
await writeFile(new URL('NOTICE.md',templates),notice);
await writeFile(new URL('carnet-vierge.json',templates),JSON.stringify(blankBook6(),null,2)+'\n');
await writeFile(new URL('transcription.txt',templates),'TRANSCRIPTION À PRODUIRE\n\nLangue :\nLocuteurs :\nTexte révisé :\nSons utiles :\nDescription des éléments visuels :\nIncertitudes :\n');
await writeFile(new URL('LISEZ-MOI.txt',folder),instructions);
for(const dir of ['01-original','02-diffusion','03-sous-titres'])await mkdir(new URL(dir+'/',templates),{recursive:true});
await rm(new URL('atelier-chapitre-6.zip',folder),{force:true});
const r=spawnSync('python3',['-m','zipfile','-c','../atelier-chapitre-6.zip','LISEZ-MOI.txt','NOTICE.md','carnet-vierge.json','transcription.txt','01-original','02-diffusion','03-sous-titres'],{cwd:fileURLToPath(templates),stdio:'inherit'});
if(r.error)throw r.error;if(r.status!==0)process.exit(r.status||1);
console.log('Atelier 6 : consignes, modèles vierges et dossiers, sans média ni corrigé.');
