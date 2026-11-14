// All retrieval and layout calculations run locally, without remote services.
export function normalizeTerm(text, accents = false) {
 const lower = text.normalize('NFC').toLocaleLowerCase('fr');
 return accents ? lower : lower.normalize('NFD').replace(/\p{M}/gu, '');
}
export function corpusTokens(text, accents = false) {
 return [...text.matchAll(/[\p{L}\p{N}\p{M}]+/gu)].map(m => ({term:normalizeTerm(m[0],accents),form:m[0],start:m.index,end:m.index+m[0].length}));
}
export function invertedIndex(docs, accents = false) {
 const index = new Map();
 for (const doc of docs) for (const token of corpusTokens(doc.text,accents)) {
  if(!index.has(token.term))index.set(token.term,[]);
  index.get(token.term).push({id:doc.id,...token});
 }
 return index;
}
export function lexicalSearch(docs, query, {accents=false,mode='and'}={}) {
 const index=invertedIndex(docs,accents), terms=[...new Set(corpusTokens(query,accents).map(t=>t.term))];
 if(!terms.length)return [];
 return docs.flatMap(doc=>{
  const matches=terms.map(term=>(index.get(term)||[]).filter(m=>m.id===doc.id));
  const found=mode==='and'?matches.every(m=>m.length):matches.some(m=>m.length);
  return found?[{doc,hits:matches.flat().sort((a,b)=>a.start-b.start)}]:[];
 });
}
export const stopWords = new Set('a au aux avec ce ces cet cette comme dans de des du elle en est et il ils je la le les leur leurs lui ma mais me mes mon ne nos notre nous on ou par pas pour que qui sa se ses son sur un une vos votre vous y'.split(' '));
export function vectorTerms(text) {return corpusTokens(text).map(t=>t.term).filter(t=>!stopWords.has(t));}
export function norm(v) {return Math.hypot(...v);}
export function cosine(a,b) {
 if(a.length!==b.length)throw new Error('Dimensions incompatibles');
 const d=norm(a)*norm(b);return d?Math.max(-1,Math.min(1,a.reduce((s,x,i)=>s+x*b[i],0)/d)):0;
}
export function tfidfModel(docs) {
 const terms=docs.map(d=>vectorTerms(d.text)),vocabulary=[...new Set(terms.flat())].sort((a,b)=>a.localeCompare(b,'fr'));
 const df=vocabulary.map(t=>terms.filter(row=>row.includes(t)).length);
 const idf=df.map(n=>1+Math.log((1+docs.length)/(1+n)));
 const encode=text=>{const counts=new Map();for(const t of vectorTerms(text))counts.set(t,(counts.get(t)||0)+1);return vocabulary.map((t,i)=>(counts.get(t)||0)*idf[i]);};
 return {vocabulary,df,idf,encode,vectors:Object.fromEntries(docs.map(d=>[d.id,encode(d.text)]))};
}
export function rankCorpus(docs, {method='lexical',query='',queryId='',genre='all',k=5}, embeddings, queries) {
 const model=tfidfModel(docs), semantic=method==='semantic';
 const queryText=semantic?queries.find(q=>q.id===queryId)?.text:query;
 if(!queryText?.trim())return [];
 if(semantic&&!embeddings?.vectors[queryId])throw new Error('Vecteurs indisponibles');
 const q=semantic?embeddings.vectors[queryId]:model.encode(queryText);
 const vectors=semantic?embeddings.vectors:model.vectors;
 return docs.filter(d=>genre==='all'||d.genre===genre).map(doc=>({id:doc.id,score:cosine(q,vectors[doc.id])})).filter(r=>semantic||r.score>0).sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id)).slice(0,k);
}
export function similarityEdges(docs,vectors,threshold) {
 const edges=[];for(let i=0;i<docs.length;i++)for(let j=i+1;j<docs.length;j++){
  const score=cosine(vectors[docs[i].id],vectors[docs[j].id]);
  if(score>=threshold)edges.push({a:docs[i].id,b:docs[j].id,score});
 }return edges;
}
export function pca2(docs,vectors) {
 const rows=docs.map(d=>vectors[d.id]), n=rows.length, dims=rows[0]?.length||0;
 if(n<2||!dims)return {points:docs.map(d=>({id:d.id,x:0,y:0})),explained:[0,0]};
 const means=Array.from({length:dims},(_,j)=>rows.reduce((s,r)=>s+r[j],0)/n);
 const centered=rows.map(r=>r.map((v,j)=>v-means[j]));
 const gram=centered.map(a=>centered.map(b=>a.reduce((s,x,j)=>s+x*b[j],0)));
 const trace=gram.reduce((s,row,i)=>s+row[i],0), components=[],values=[];
 for(let axis=0;axis<2;axis++){
  let v=Array.from({length:n},(_,i)=>Math.sin((i+1)*(axis+1.37)));
  for(let step=0;step<160;step++){
   let w=gram.map(row=>row.reduce((s,x,j)=>s+x*v[j],0));
   for(const prev of components){const dot=w.reduce((s,x,i)=>s+x*prev[i],0);w=w.map((x,i)=>x-dot*prev[i]);}
   const length=norm(w);v=length>1e-12?w.map(x=>x/length):Array(n).fill(0);
  }
  const lambda=Math.max(0,v.reduce((s,x,i)=>s+x*gram[i].reduce((t,y,j)=>t+y*v[j],0),0));
  components.push(v);values.push(lambda);
 }
 return {points:docs.map((d,i)=>({id:d.id,x:components[0][i]*Math.sqrt(values[0]),y:components[1][i]*Math.sqrt(values[1])})),explained:values.map(v=>trace>1e-12?v/trace:0)};
}
export function termFrequency(docs,term) {
 const target=normalizeTerm(term);return ['Récit','Notice','Annonce'].map(genre=>{
  const tokens=docs.filter(d=>d.genre===genre).flatMap(d=>corpusTokens(d.text));
  const count=tokens.filter(t=>t.term===target).length;
  return {genre,count,total:tokens.length,per1000:tokens.length?count/tokens.length*1000:0};
 });
}
export function blankCorpusBook(version){return {chapter:3,version:1,corpusVersion:version,notes:{},runs:[]};}
export function validateCorpusBook(book,version,docs,fields,queries) {
 if(!book||book.chapter!==3||book.version!==1||book.corpusVersion!==version)throw new Error('Cette sauvegarde ne correspond pas au corpus du chapitre 3.');
 const object=x=>x&&typeof x==='object'&&!Array.isArray(x),text=x=>typeof x==='string'&&x.length<=15000;
 if(!object(book.notes)||!Array.isArray(book.runs)||book.runs.length>100)throw new Error('Structure du carnet invalide.');
 const notes={};for(const [id] of fields){if(book.notes[id]!==undefined){if(!text(book.notes[id]))throw new Error('Texte du carnet invalide.');notes[id]=book.notes[id];}}
 const runs=book.runs.map(r=>{
  if(!object(r)||!['lexical','semantic'].includes(r.method)||!text(r.query)||!text(r.date)||!text(r.comment)||!['all','Récit','Notice','Annonce'].includes(r.genre)||!Number.isInteger(r.k)||r.k<1||r.k>docs.length||!Array.isArray(r.results)||r.results.length>r.k)throw new Error('Recherche enregistrée invalide.');
  if(r.method==='semantic'&&!queries.some(q=>q.id===r.queryId&&q.text===r.query))throw new Error('Requête sémantique inconnue.');
  const seen=new Set();const results=r.results.map(x=>{
   if(!object(x)||!docs.some(d=>d.id===x.id)||seen.has(x.id)||!Number.isFinite(x.score)||Math.abs(x.score)>1.000001)throw new Error('Résultat de recherche invalide.');
   seen.add(x.id);return {id:x.id,score:x.score};
  });return {method:r.method,query:r.query,queryId:r.method==='semantic'?r.queryId:'',date:r.date,genre:r.genre,k:r.k,comment:r.comment,results};
 });return {chapter:3,version:1,corpusVersion:version,notes,runs};
}
