import test from 'node:test';
import assert from 'node:assert/strict';
import {blankMarawaBook,validateMarawaBook,marawaBookMarkdown} from '../public/marawa.js';
import {chapter3Version,workbook3Fields} from '../public/chapter3-content.js';

test('carnet Marawa : reprise fidèle des notes, sans importer d’anciens corpus ou champs inconnus',()=>{
 const book=blankMarawaBook(chapter3Version);book.notes.question='Ma question\nMes observations';book.notes.vues='Seuils et liens observés';
 const validate=x=>validateMarawaBook(x,chapter3Version,workbook3Fields);
 assert.deepEqual(validate(JSON.parse(JSON.stringify(book))),book);
 assert.deepEqual(validate({...book,notes:{...book.notes,inconnu:'ignoré'}}),book);
 for(const patch of [{chapter:2},{version:1},{courseVersion:'ancien'},{notes:[]},{notes:{question:42}},{notes:{question:'x'.repeat(15001)}}])assert.throws(()=>validate({...book,...patch}));
 assert.throws(()=>validate(null));
 assert.throws(()=>validate({chapter:3,version:1,corpusVersion:'corpus-ecole-3-v1',notes:{},runs:[]}));
 const md=marawaBookMarkdown(book,workbook3Fields);assert.ok(md.includes(book.notes.question));assert.ok(md.includes(book.notes.vues));assert.ok(md.includes('CC BY-NC-SA'));assert.ok(md.includes(chapter3Version));
});
