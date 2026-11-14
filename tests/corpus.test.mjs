import test from 'node:test';
import assert from 'node:assert/strict';
import {corpusTokens,invertedIndex,lexicalSearch,tfidfModel,cosine,pca2,termFrequency} from '../public/corpus.js';
test('index : accents, Unicode, positions et combinaisons ET/OU',()=>{
 const docs=[{id:'a',text:'La côte, le côté et une cote.'},{id:'b',text:'La côte est calme.'}];
 assert.equal(invertedIndex(docs).get('cote').length,4);
 assert.equal(invertedIndex(docs,true).get('côte').length,2);
 assert.equal(lexicalSearch(docs,'côte calme',{accents:true,mode:'and'}).length,1);
 assert.equal(lexicalSearch(docs,'côte calme',{accents:true,mode:'or'}).length,2);
 assert.equal(lexicalSearch(docs,' ',{}).length,0);
 const text='🌴 L’île e\u0301loignée.';
 for(const t of corpusTokens(text))assert.equal(text.slice(t.start,t.end),t.form);
 assert.ok(corpusTokens(text).some(t=>t.term==='eloignee'));
});
test('TF-IDF : rareté, cosinus, vecteur nul et vocabulaire fermé',()=>{
 const docs=[{id:'a',text:'bateau bateau quai'},{id:'b',text:'quai musée'}],m=tfidfModel(docs);
 assert.equal(m.idf[m.vocabulary.indexOf('quai')],1);
 assert.ok(m.idf[m.vocabulary.indexOf('bateau')]>1);
 assert.equal(m.vectors.a[m.vocabulary.indexOf('bateau')],2*(1+Math.log(3/2)));
 assert.ok(Math.abs(cosine(m.vectors.a,m.vectors.a)-1)<1e-12);
 assert.equal(cosine(m.encode('inconnu'),m.vectors.a),0);
 assert.equal(cosine([1,0],[0,1]),0);assert.equal(cosine([1,0],[-1,0]),-1);
 assert.throws(()=>cosine([1],[1,2]));
});
test('ACP : distances conservées en deux dimensions et variance expliquée',()=>{
 const docs=['a','b','c','d'].map(id=>({id})),vectors={a:[-2,0],b:[2,0],c:[0,1],d:[0,-1]},p=pca2(docs,vectors);
 assert.ok(Math.abs(p.explained[0]-.8)<1e-6);assert.ok(Math.abs(p.explained[1]-.2)<1e-6);
 for(let i=0;i<4;i++)for(let j=0;j<4;j++)assert.ok(Math.abs(Math.hypot(p.points[i].x-p.points[j].x,p.points[i].y-p.points[j].y)-Math.hypot(...vectors[docs[i].id].map((x,k)=>x-vectors[docs[j].id][k])))<1e-6);
 const identical=pca2(docs,Object.fromEntries(docs.map(d=>[d.id,[1,1]])));assert.deepEqual(identical.explained,[0,0]);
});
test('fréquence : dénominateur du genre, sans suppression des mots fréquents',()=>{
 const rows=termFrequency([{genre:'Récit',text:'Le quai le quai'},{genre:'Notice',text:'Le quai'}],'quai');
 assert.deepEqual(rows.map(r=>r.count),[2,1,0]);assert.equal(rows[0].per1000,500);assert.equal(rows[1].per1000,500);assert.equal(rows[2].per1000,0);
});
