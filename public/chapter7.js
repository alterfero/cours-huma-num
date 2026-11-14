import { escapeHtml as esc } from './labs.js';

export const chapter7Sources = [
  ['images', 'W3C WAI', 'Images : choisir une alternative textuelle', 'https://www.w3.org/WAI/tutorials/images/', 'Images informatives, décoratives, fonctionnelles et complexes.'],
  ['media', 'W3C WAI', 'Rendre les médias audio et vidéo accessibles', 'https://www.w3.org/WAI/media/av/', 'Transcription, sous-titres, description des informations visuelles et lecteur accessible.'],
  ['captions', 'W3C WAI', 'Sous-titres : paroles et sons utiles', 'https://www.w3.org/WAI/media/av/captions/', 'Synchronisation, identification des locuteurs et révision des sous-titres automatiques.'],
  ['contrast', 'W3C — WCAG 2.2', 'Comprendre le contraste minimum, critère 1.4.3', 'https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html', 'Niveau AA : 4,5:1 pour le texte courant ; 3:1 pour le grand texte, avec les exceptions du critère.'],
  ['design', 'W3C WAI', 'Concevoir pour l’accessibilité', 'https://www.w3.org/WAI/tips/designing/', 'Couleurs, navigation, adaptation de l’affichage et contrôle des animations.'],
  ['writing', 'W3C WAI', 'Rédiger pour l’accessibilité', 'https://www.w3.org/WAI/tips/writing/', 'Titres structurés, liens explicites, consignes et langage clair.']
].map(([id, org, title, url, note]) => ({ id: 'p7-' + id, org, title, url, note }));

const ref = id => {
  const source = chapter7Sources.find(s => s.id === 'p7-' + id);
  return `<a href="${source.url}" target="_blank" rel="noopener">${source.org} · ${source.title} ↗</a>`;
};
const section = (id, number, title, body) => `<section class="lesson-section" id="c7-${id}"><div class="section-kicker">${number}</div><h2>${title}</h2>${body}</section>`;

export function chapterSeven() {
  return `<article class="course-article short-chapter" data-content-origin="ai-assisted" data-provenance="/assets/chapitres-7-8-provenance.json">
    <div class="chapter-hero"><span class="eyebrow">Chapitre 07 / Accessibilité / Synthèse</span><h1>Rendre les contenus accessibles</h1><p class="lead">Rendre les ressources utilisables par les personnes en situation de handicap : voir, entendre, comprendre et agir par plusieurs moyens.</p><p>Prévoir l’accessibilité dès la collecte et la conception. Une même personne peut rencontrer plusieurs obstacles ; les besoins visuels, auditifs, moteurs et cognitifs ne se résument pas à un seul réglage.</p></div>
    <nav class="on-this-page" aria-label="Dans ce chapitre"><span>Les repères</span>${[['alternatives', 'Images et sons'], ['lecture', 'Lecture et navigation'], ['verification', 'Vérifier'], ['sources', 'Sources']].map(([id, title]) => `<a href="#c7-${id}" data-scroll="c7-${id}">${title}</a>`).join('')}</nav>
    ${section('alternatives', '01 / PROPOSER DES ALTERNATIVES', 'La même information,<br><em>plusieurs accès.</em>', `
      <dl class="short-practices">
        <div><dt>Images et graphiques</dt><dd>Rédiger un <strong>texte alternatif</strong> adapté au rôle de l’image : décrire l’information utile, sans inventer ce qu’elle ne montre pas. Pour une carte ou un graphique complexe, ajouter une description détaillée et les données utiles. Une image purement décorative reçoit un attribut <code>alt=""</code> ; une image servant de bouton doit annoncer l’action.</dd></div>
        <div><dt>Enregistrements sonores</dt><dd>Fournir une <strong>transcription</strong> avec les locuteurs, les paroles et les sons nécessaires à la compréhension : « [cloche] », « [applaudissements] ». Signaler les passages inaudibles. Pour une pièce musicale ou un paysage sonore, décrire aussi les événements et l’ambiance utiles à l’activité.</dd></div>
        <div><dt>Vidéos</dt><dd>Ajouter des <strong>sous-titres synchronisés</strong> : paroles, changements de locuteur et sons significatifs. Une traduction des dialogues ne suffit pas toujours. Relire toute sortie automatique, notamment les noms propres et les langues peu représentées dans les outils.</dd></div>
        <div><dt>Informations visuelles en mouvement</dt><dd>Prévoir une <strong>audiodescription</strong> des gestes, textes ou actions indispensables que la bande-son ne donne pas. Ajouter une transcription descriptive consultable séparément ; elle permet aussi l’accès par une plage braille. En direct, verbaliser les éléments que l’on montre.</dd></div>
      </dl>
      <p class="small">${ref('images')} · ${ref('media')} · ${ref('captions')}</p>`)}
    ${section('lecture', '02 / PERMETTRE LA LECTURE ET L’ACTION', 'Lisible, compréhensible,<br><em>utilisable.</em>', `
      <ul class="short-checklist">
        <li><strong>Contrastes et couleurs.</strong> Viser les repères WCAG 2.2 AA : au moins <strong>4,5:1</strong> pour le texte courant et <strong>3:1</strong> pour le grand texte (18 points, ou 14 points en gras). Accompagner la couleur d’un mot, symbole ou motif : « autorisé / interdit » reste compréhensible en niveaux de gris. ${ref('contrast')}</li>
        <li><strong>Texte et structure.</strong> Employer de vrais titres hiérarchisés, des paragraphes courts, des liens explicites et des consignes simples. Développer les sigles. Dans un document, définir la langue et l’ordre de lecture ; éviter le PDF constitué seulement d’images scannées. ${ref('writing')}</li>
        <li><strong>Clavier et affichage.</strong> Permettre de parcourir liens, boutons et champs au clavier, avec un focus visible et sans piège. Vérifier l’agrandissement du texte et l’affichage mobile. Étiqueter les champs et expliquer les erreurs en texte.</li>
        <li><strong>Rythme et mouvement.</strong> Laisser contrôler lecture, pause et volume ; éviter les démarrages sonores automatiques et les clignotements. Respecter la réduction des animations. Prévoir une alternative à un parcours imposant casque VR, gestes précis ou temps limité. ${ref('design')}</li>
      </ul>`)}
    ${section('verification', '03 / CONTRÔLE RAPIDE / 8 MINUTES', 'Tester une ressource<br><em>avant de la transmettre.</em>', `
      <p>En binômes, reprenez une image, un extrait sonore ou la vidéo de l’atelier précédent.</p>
      <ol><li>Sans le son, peut-on comprendre les paroles et événements importants ? Sans regarder l’image, quelles informations manquent ? Rédigez l’alternative correspondante.</li><li>Parcourez les commandes avec Tab, Maj + Tab, Entrée et Espace. Agrandissez le texte à 200 % et mesurez les contrastes avec un outil adapté.</li><li>Relisez titres, descriptions, langues et ordre de lecture avec un lecteur d’écran si disponible. Faites essayer la ressource par des personnes concernées lorsque c’est possible.</li><li>Notez deux obstacles, les corrections effectuées et ce qui reste à tester. Rouvrez aussi la version exportée : sous-titres et structure ont-ils été conservés ?</li></ol>
      <p class="lesson-takeaway">Un contrôle automatique repère certains défauts. Il ne remplace pas l’essai des usages ni un audit complet d’accessibilité.</p>
      <div class="actions"><a class="button secondary" href="#/atelier/6">Reprendre l’atelier vidéo →</a></div>`)}
    ${section('sources', 'POUR APPROFONDIR', 'Des repères vérifiables.', `
      <p class="small">Références consultées le 13 novembre 2026. Les WCAG servent ici de repères techniques ; cette synthèse ne constitue pas une déclaration de conformité.</p>
      <ul class="short-source-list">${chapter7Sources.map(s => `<li><a href="${s.url}" target="_blank" rel="noopener">${esc(s.org)} · ${esc(s.title)} ↗</a></li>`).join('')}</ul>
      <p class="small">Texte rédigé avec l’aide d’une IA pour ce cours. <a href="/assets/chapitres-7-8-provenance.json">Métadonnées de rédaction des chapitres 7 et 8</a>.</p>`)}
  </article>`;
}
