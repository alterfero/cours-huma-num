import { escapeHtml as esc } from './labs.js';

export const chapter8Sources = [
  ['act', 'Commission européenne — AI Act Service Desk', 'AI Act : article 50, obligations de transparence', 'https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-50', 'Distinguer marquage par les fournisseurs et information du public par les déployeurs ; exceptions et accessibilité.'],
  ['faq', 'Commission européenne', 'Questions et réponses sur l’article 50', 'https://digital-strategy.ec.europa.eu/en/faqs/transparency-obligations-under-article-50-ai-act', 'Champ des obligations, contrôle éditorial et calendrier d’application.'],
  ['iptc', 'IPTC', 'Identifier les contenus créés ou modifiés par IA', 'https://iptc.org/news/google-ai-transparency-based-on-iptc-standards/', 'Champ Digital Source Type : création générative et modification générative.'],
  ['c2pa', 'C2PA', 'Comprendre les Content Credentials', 'https://spec.c2pa.org/specifications/specifications/2.2/explainer/Explainer.html', 'Provenance liée au fichier et signée ; intégrité de l’historique, sans garantie de vérité du contenu.']
].map(([id, org, title, url, note]) => ({ id: 'p8-' + id, org, title, url, note }));

const ref = id => {
  const source = chapter8Sources.find(s => s.id === 'p8-' + id);
  return `<a href="${source.url}" target="_blank" rel="noopener">${source.org} · ${source.title} ↗</a>`;
};
const section = (id, number, title, body) => `<section class="lesson-section" id="c8-${id}"><div class="section-kicker">${number}</div><h2>${title}</h2>${body}</section>`;
const metadataExample = {
  fichier: 'reconstitution-port.jpg',
  nature: 'image entièrement générée par IA',
  mention: 'Reconstitution générée par IA — illustration hypothétique',
  outil_modele_version: 'à renseigner ; indiquer si inconnu',
  date_generation: 'AAAA-MM-JJ',
  sources_de_reference: ['identifiants et provenance à renseigner'],
  transformations: ['génération', 'retouches à décrire'],
  responsable_et_verification: 'à renseigner',
  droits_et_limites: 'à vérifier avant diffusion'
};

export function chapterEight() {
  return `<article class="course-article short-chapter" data-content-origin="ai-assisted" data-provenance="/assets/chapitres-7-8-provenance.json">
    <div class="chapter-hero"><span class="eyebrow">Chapitre 08 / Génération de contenus / Synthèse</span><h1>Créer avec l’IA.<br><em>Rendre l’origine explicite.</em></h1><p class="lead">Texte, image, voix, musique ou vidéo : un contenu généré peut servir la médiation, à condition que son statut reste identifiable.</p><div class="callout"><span class="callout-label">Règle du cours</span><p><strong>Tout contenu généré par IA doit en porter explicitement la marque : sur le contenu et dans ses métadonnées.</strong> Indiquer aussi les parties modifiées. Cette règle pédagogique s’applique même lorsqu’une exception juridique existe.</p></div></div>
    <nav class="on-this-page" aria-label="Dans ce chapitre"><span>Les repères</span>${[['cadre', 'AI Act'], ['marquage', 'Deux niveaux de marquage'], ['verification', 'Avant diffusion'], ['sources', 'Sources']].map(([id, title]) => `<a href="#c8-${id}" data-scroll="c8-${id}">${title}</a>`).join('')}</nav>
    ${section('cadre', '01 / LE CADRE EUROPÉEN', 'AI Act : qui doit<br><em>signaler quoi ?</em>', `
      <p>Le règlement européen sur l’intelligence artificielle (EU AI Act), notamment son <strong>article 50</strong>, organise la transparence selon les acteurs et les usages :</p>
      <ul>
        <li><strong>Fournisseur du système :</strong> rendre les sorties synthétiques (texte, image, audio, vidéo) détectables et marquées dans un format lisible par machine, dans les limites techniques prévues. Des exceptions concernent notamment l’assistance à l’édition standard ou l’absence de modification substantielle.</li>
        <li><strong>Déployeur, qui utilise le système :</strong> signaler les hypertrucages (<em>deepfakes</em>) et les textes générés publiés pour informer le public sur des questions d’intérêt public. Pour ces textes, une exception existe avec examen humain ou contrôle éditorial et responsabilité éditoriale identifiée. Pour les œuvres manifestement artistiques ou fictives, l’information peut être adaptée.</li>
        <li><strong>Information du public :</strong> claire, distincte et accessible dès la première exposition au contenu concerné.</li>
      </ul><p class="small">${ref('act')}</p>
      <p>Ces obligations s’appliquent depuis le <strong>2 août 2026</strong>. La Commission précise une transition jusqu’au <strong>2 décembre 2026</strong> pour le seul marquage technique de l’article 50(2) des systèmes déjà commercialisés avant le 2 août. Une simple correction orthographique ne constitue pas le contrôle éditorial de fond évoqué ci-dessus. ${ref('faq')}</p>
      <p><strong>À retenir :</strong> le droit européen ne prescrit pas une étiquette identique sur toute utilisation d’IA. Notre règle de cours généralise le double marquage pour préserver la provenance ; elle ne préjuge pas du champ territorial applicable à chaque projet.</p>`)}
    ${section('marquage', '02 / SUR LE CONTENU + DANS LES MÉTADONNÉES', 'Indiquer la provenance artificielle n’est pas une option.', `
      <h3>1. Informer directement le public</h3>
      <dl class="short-practices">
        <div><dt>Texte</dt><dd>Placer une mention au début ou auprès du passage : « Texte généré avec une IA ; révisé par [nom] ». Ne déclarer une révision que si elle a réellement eu lieu ; préciser ce que l’IA a produit.</dd></div>
        <div><dt>Image et vidéo</dt><dd>Inscrire sur le visuel ou dans la vidéo : « Image générée par IA », « Séquence modifiée par IA » ou « Reconstitution hypothétique générée par IA ». Garder le marquage dans les extraits et versions diffusées ; le reprendre dans la légende et l’alternative textuelle utile.</dd></div>
        <div><dt>Audio et voix</dt><dd>Prévoir une annonce audible, par exemple « Voix de synthèse générée par IA », et une mention écrite dans le lecteur et la transcription. Ne pas laisser croire à un témoignage réellement enregistré.</dd></div>
      </dl>
      <h3>2. Décrire la fabrication dans le fichier</h3>
      <p>Renseigner la nature de la génération, l’outil et le modèle/version s’ils sont connus, la date, les sources utilisées, les transformations, la personne responsable et les vérifications. Intégrer ces informations aux métadonnées du format ; conserver aussi une notice liée par un identifiant stable. Une notice seule peut être séparée du fichier.</p>
      <p>Pour les images, le champ IPTC/XMP <strong>Digital Source Type</strong> distingue notamment <code>trainedAlgorithmicMedia</code> (création par IA générative) et <code>compositeWithTrainedAlgorithmicMedia</code> (modification par IA générative). Choisir la valeur qui correspond au traitement. ${ref('iptc')}</p>
      <details><summary>Exemple de notice à adapter</summary><p>Exemple pédagogique fictif, sans image associée. Ce JSON aide à documenter le travail ; il ne constitue ni un marquage intégré au fichier ni un standard de conformité.</p><pre class="short-metadata"><code>${esc(JSON.stringify(metadataExample, null, 2))}</code></pre></details>
      <p>Les <strong>Content Credentials / C2PA</strong> peuvent associer au fichier un historique signé de création et de modification. Elles aident à vérifier sa provenance et son intégrité, pas la vérité d’une scène. Des métadonnées ordinaires peuvent être effacées ; leur absence ne prouve donc pas une origine humaine. ${ref('c2pa')}</p>`)}
    ${section('verification', '03 / CONTRÔLE AVANT DIFFUSION / 8 MINUTES', 'Garder la source,<br><em>assumer les transformations.</em>', `
      <ol><li><strong>Vérifier le fond.</strong> Contrôler faits, citations, noms et traductions dans des sources identifiables. Une reconstitution plausible d’un lieu n’est pas une archive ; un remplissage génératif peut inventer des détails.</li><li><strong>Examiner les droits et les personnes.</strong> Vérifier les permissions sur les sources, les voix et les visages, ainsi que les accords avec les personnes et communautés concernées. Éviter de transmettre des données confidentielles à un service sans autorisation. La mention « IA » ne règle pas ces questions.</li><li><strong>Conserver et tracer.</strong> Garder séparément l’original, la version générée et la version publiée. Documenter la consigne utile sans exposer de données personnelles ; distinguer les apports humains des apports automatiques.</li><li><strong>Contrôler l’export.</strong> Rouvrir le fichier destiné au public et inspecter ses métadonnées. La mention reste-t-elle lisible ou audible ? Le recadrage, la compression ou la plateforme ont-ils supprimé le marquage ? Vérifier chaque version distribuée.</li></ol>
      <div class="callout"><span class="callout-label">Application / Une reconstitution de port ancien</span><p>Préparez sa mention visible et sa notice de provenance. Indiquez ce qui vient de documents et ce qui relève d’une hypothèse. Un second binôme doit pouvoir reconnaître immédiatement qu’il s’agit d’une génération et retrouver les sources qui l’ont inspirée.</p></div>
      <div class="actions"><a class="button" href="#/accueil">Revenir au parcours →</a></div>`)}
    ${section('sources', 'POUR APPROFONDIR', 'Revenir aux textes<br><em>et aux standards.</em>', `
      <p class="small">Références consultées le 13 novembre 2026. Relire le texte applicable et ses précisions lors d’une diffusion ultérieure.</p>
      <ul class="short-source-list">${chapter8Sources.map(s => `<li><a href="${s.url}" target="_blank" rel="noopener">${esc(s.org)} · ${esc(s.title)} ↗</a></li>`).join('')}</ul>
      <p class="small">Texte rédigé avec l’aide d’une IA pour ce cours. <a href="/assets/chapitres-7-8-provenance.json">Métadonnées de rédaction des chapitres 7 et 8</a>.</p>`)}
  </article>`;
}
