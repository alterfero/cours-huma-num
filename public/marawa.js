// The workbook stores observations only. All corpus exploration takes place in Marawa.
export const blankMarawaBook=version=>({chapter:3,version:2,courseVersion:version,notes:{}});
export function validateMarawaBook(book,version,fields) {
 const obj=x=>x&&typeof x==='object'&&!Array.isArray(x);
 if(!obj(book)||book.chapter!==3||book.version!==2||book.courseVersion!==version||!obj(book.notes))throw new Error('Cette sauvegarde ne correspond pas au carnet Marawa en direct.');
 const notes={};
 for(const [key] of fields)if(book.notes[key]!==undefined){
  if(typeof book.notes[key]!=='string'||book.notes[key].length>15000)throw new Error('Une note est invalide ou trop longue.');
  notes[key]=book.notes[key];
 }
 return {chapter:3,version:2,courseVersion:version,notes};
}
export function marawaBookMarkdown(book,fields) {
 return '# Une carte d’histoires — Carnet individuel Marawa\n\nChapitre 3 · Exploration publique sans connexion.\nVersion du support : '+book.courseVersion+'\n\nCe carnet conserve les notes, pas les images ni l’état de Marawa.\n\n'+fields.map(([id,title,prompt])=>`## ${title}\n\n> ${prompt}\n\n${book.notes[id]||'(Non renseigné)'}\n`).join('\n')+'\nAnnotations Marawa : CC BY-NC-SA, version non précisée selon l’information du responsable du cours. Droits du fond de carte, des tuiles et des documents originaux à vérifier séparément.\n';
}
