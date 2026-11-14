import { escapeHtml as esc } from './labs.js';
import { panglossData } from './pangloss-data.js';
export const panglossPage = 'https://pangloss.cnrs.fr/corpus/show?oai_primary=cocoon-e3f8c82b-7513-3687-a8e0-ffad68a365fa&corpus=Iaai&oai_secondary=cocoon-12d6759f-7892-3050-a42f-1aaad448b8d2&filter=%7B%22form-s%22%3A%7B%22phono%22%3A1%7D%2C%22transl-s%22%3A%7B%22fr%22%3A1%7D%2C%22form-w%22%3A%7B%22phono%22%3A1%7D%2C%22transl-w%22%3A%7B%22fr%22%3A1%7D%2C%22transl-t%22%3A%7B%22fr%22%3A0%7D%2C%22form-t%22%3A%7B%22phono%22%3A0%7D%7D';
export const panglossAsset = '/assets/chapitre2/pangloss/';
const time = value => value.toLocaleString('fr-FR', {maximumFractionDigits:4});
const external = (title, url) => `<a href="${url}" target="_blank" rel="noopener">${title} ↗</a>`;
export function panglossCredit() {
 return `« L’origine du kong Hulup », iaai · voix : Taï Waheo · recherche et dépôt : Françoise Ozanne-Rivierre · traduction : Wadawa Hnyigootr (notices COCOON). © Françoise Ozanne-Rivierre, LACITO / Pangloss. Son : ${external('CC BY-NC-ND 2.5','https://creativecommons.org/licenses/by-nc-nd/2.5/')} ; annotations : ${external('CC BY-NC-SA 2.5','https://creativecommons.org/licenses/by-nc-sa/2.5/')}. <a href="${panglossAsset}NOTICE.txt">Provenance et fichiers</a>.`;
}
function segmentMarkup(s) {
 return `<p class="mini-label">${s.label} · XML : ${s.id} · ${time(s.start)}–${time(s.end)} s</p>
 <div data-pangloss-layer="form"><span class="field-label">Transcription de l’énoncé · phono</span><p class="pangloss-form" lang="iai">${esc(s.form)}</p></div>
 <div data-pangloss-layer="gloss"><span class="field-label">Unités W et gloses françaises de la source</span><div class="pangloss-words">${s.words.map(w=>`<dl><dt lang="iai">${esc(w.form)}</dt><dd>${esc(w.gloss)}</dd></dl>`).join('')}</div></div>
 <div data-pangloss-layer="translation"><span class="field-label">Traduction française de l’énoncé</span><blockquote>${esc(s.translation)}</blockquote></div>
 <p class="small">${external('Voir '+s.label+' dans Pangloss','https://doi.org/10.24397/pangloss-0000282#'+s.label)}</p>`;
}
export function panglossReader(compact=false) {
 return `<div class="pangloss-reader${compact?' pangloss-compact':''}" data-pangloss-reader><div class="lab-intro"><span class="eyebrow">Corpus réel / Iaai · Ouvéa</span><h3>L’origine du kong Hulup</h3><p>Écoutez un segment, puis masquez une couche pour voir ce que chacune apporte. Les formes, les gloses et les temps viennent du XML de l’archive.</p></div>
 <audio data-pangloss-audio controls preload="metadata" aria-label="Enregistrement intégral de Taï Waheo" src="${panglossAsset}144254_HULUP_44k.mp3">Audio indisponible : <a href="${panglossAsset}144254_HULUP_44k.mp3">télécharger le MP3</a>.</audio>
 <div class="pangloss-controls"><label>Segment de la source<select data-pangloss-select aria-label="Segment de la source">${panglossData.segments.map((s,i)=>`<option value="${i}">${s.label} · ${time(s.start)}–${time(s.end)} s</option>`).join('')}</select></label><button type="button" class="button" data-pangloss-play>Écouter ce segment</button></div>
 <fieldset class="pangloss-layers"><legend>Couches affichées</legend><label><input type="checkbox" data-pangloss-toggle="form" checked> Transcription</label><label><input type="checkbox" data-pangloss-toggle="gloss" checked> Mots et gloses</label><label><input type="checkbox" data-pangloss-toggle="translation" checked> Traduction</label></fieldset>
 <div class="source-frame pangloss-segment" data-pangloss-segment>${segmentMarkup(panglossData.segments[0])}</div><p data-pangloss-status class="small" role="status">23 segments ; les mots n’ont pas de bornes temporelles propres.</p>
 <details><summary>Lire les annotations dans leur format XML</summary><p>S contient un segment ; AUDIO donne son début et sa fin en secondes. FORM porte la transcription, TRANSL la traduction. Chaque W relie une forme à sa glose. Le libellé « phono » est celui de la source : il ne suffit pas à conclure à une transcription phonétique en API.</p><pre class="pangloss-xml"><code>${esc('<S id="HULUPs1">\n  <AUDIO start="0.0200" end="2.4200"/>\n  <FORM kindOf="phono">Bongon kong Hulup </FORM>\n  <TRANSL xml:lang="fr">Histoire du Kong Hulup.</TRANSL>\n  …\n</S>')}</code></pre><p class="small">Extrait abrégé du XML ; les unités W sont omises ici. <a href="${panglossAsset}crdo-IAI_HULUP.xml" download>Télécharger le XML complet inchangé ↓</a></p></details>
 <p class="small pangloss-credit">${panglossCredit()}</p><p>${external('Ouvrir l’enregistrement et ses annotations dans Pangloss',panglossPage)}</p></div>`;
}
export function bindPanglossReader(signal) {
 const root=document.querySelector('[data-pangloss-reader]'); if(!root)return;
 const audio=root.querySelector('audio'), select=root.querySelector('select'), status=root.querySelector('[role="status"]');
 let stopAt=null;
 const options={signal};
 const layers=()=>root.querySelectorAll('[data-pangloss-toggle]').forEach(input=>{root.querySelector(`[data-pangloss-layer="${input.dataset.panglossToggle}"]`).hidden=!input.checked;});
 select.addEventListener('change',()=>{audio.pause();stopAt=null;const s=panglossData.segments[Number(select.value)];root.querySelector('[data-pangloss-segment]').innerHTML=segmentMarkup(s);layers();status.textContent=`${s.label} sélectionné : ${time(s.start)}–${time(s.end)} s.`;},options);
 root.querySelectorAll('[data-pangloss-toggle]').forEach(input=>input.addEventListener('change',layers,options));
 root.querySelector('[data-pangloss-play]').addEventListener('click',async()=>{const s=panglossData.segments[Number(select.value)];audio.currentTime=s.start;stopAt=s.end;try{await audio.play();status.textContent=`Écoute de ${s.label} : ${time(s.start)}–${time(s.end)} s.`;}catch{stopAt=null;status.textContent='Lecture indisponible. Utilisez le lecteur ou le lien vers Pangloss.';}},options);
 audio.addEventListener('timeupdate',()=>{if(stopAt!==null&&audio.currentTime>=stopAt){const end=stopAt;stopAt=null;audio.pause();audio.currentTime=end;status.textContent='Fin du segment sélectionné.';}},options);
 audio.addEventListener('seeking',()=>{const s=panglossData.segments[Number(select.value)];if(audio.currentTime<s.start||audio.currentTime>s.end+.05)stopAt=null;},options);
 audio.addEventListener('ended',()=>stopAt=null,options);
 audio.addEventListener('error',()=>status.textContent='Le fichier local ne peut pas être lu. Le XML et le lien vers Pangloss restent disponibles.',options);
 signal.addEventListener('abort',()=>audio.pause(),{once:true});
}
