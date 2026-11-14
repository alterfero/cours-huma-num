import { panglossPage } from './pangloss.js';
export const chapter2Sources = [
  {id:'paradisec-formats',title:'Standard Formats for Data Collection and Archiving',org:'PARADISEC · guide mis à jour le 13 mai 2026',url:'https://paradisec-archive.github.io/PARADISEC_workflows/04_standard_formats.html',note:'Réglages de capture, distinction entre originaux et copies de consultation, formats d’annotations et de lexiques.'},
  {id:'paradisec-data',title:'Metadata & Data Management',org:'PARADISEC · guide mis à jour le 13 mai 2026',url:'https://paradisec-archive.github.io/PARADISEC_workflows/03_data_management.html',note:'Métadonnées de terrain, identifiants, nommage et organisation de la conservation dès la collecte.'},
  {id:'cnil-consent',title:'Comment recueillir le consentement des personnes ?',org:'CNIL',url:'https://www.cnil.fr/fr/les-bases-legales/consentement',note:'Choix libre, finalités distinctes, information préalable, preuve et retrait du consentement.'},
  {id:'johnson-archive',title:'Language documentation and archiving, or how to build a better corpus',org:'Heidi Johnson · Language Documentation and Description, 2004',url:'https://www.elpublishing.org/sites/default/files/attachments/ldd02_11.pdf',note:'Accords écrits ou enregistrés, conditions d’accès, copies et relations entre les ressources d’un corpus ; notamment section 3.2.'},
  {id:'care',title:'CARE Principles for Indigenous Data Governance',org:'Global Indigenous Data Alliance',url:'https://www.gida-global.org/careprinciples',note:'Bénéfice collectif, autorité de contrôle, responsabilité et éthique ; gouvernance avec les peuples autochtones concernés.'},
  {id:'cc-licences',title:'Licences, droits et réutilisations — FAQ',org:'Creative Commons',url:'https://creativecommons.org/faq/',note:'Droits nécessaires pour accorder une licence, irrévocabilité et articulation avec les autres droits.'},
  {id:'backup',title:'Storing and backing up your research data',org:'Université de Cambridge · Research Data Management',url:'https://www.data.cam.ac.uk/organising-storing/storage-backup',note:'Copies séparées, règle 3–2–1 et stockage adapté à la sensibilité des données.'},
  {id:'corinte',title:'Anonymiser les corpus oraux',org:'CORINTE · laboratoire ICAR, CNRS',url:'https://icar.cnrs.fr/corinte/anonymiser/',note:'Protection des personnes dans les enregistrements, transcriptions et données associées ; identification possible par le contexte.'},
  {id:'ipa',title:'Alphabet phonétique international — tableau officiel',org:'International Phonetic Association',url:'https://www.internationalphoneticassociation.org/content/ipa-chart',note:'Tableau officiel de l’API et liens vers ses différentes présentations.'},
  {id:'pangloss',title:'L’origine du kong Hulup — son et annotations en iaai',org:'Pangloss · CNRS / LACITO · COCOON',url:panglossPage,note:'Taï Waheo ; Françoise Ozanne-Rivierre ; Wadawa Hnyigootr. Enregistrement réel, 23 segments alignés et annotations mot à mot. Notices et fichiers consultés le 9 novembre 2026.'},
  {id:'pangloss-xml',title:'Annotations originales — XML',org:'Archive COCOON',url:'https://cocoon.huma-num.fr/data/ozanne-rivierre/masters/crdo-IAI_HULUP.xml',note:'Formes, traductions françaises, unités W et bornes temporelles des segments S. Aucun minutage des mots ni piste de diarisation dans ce fichier.'},
  {id:'diarisation',title:'Segmentation et regroupement en locuteurs',org:'Théo Mariotte · LIUM · présentation de recherche',url:'https://cv.hal.science/theo-mariotte',note:'Terminologie française de speaker diarization : regrouper les intervalles attribués à un même locuteur.'},
  {id:'pyannote',title:'pyannote.audio — boîte à outils pour la diarisation',org:'Équipe pyannote · dépôt officiel',url:'https://github.com/pyannote/pyannote-audio',note:'Modèles préentraînés de segmentation et de représentation des voix, regroupement en locuteurs et adaptation aux données. Consulté le 12 novembre 2026.'},
  {id:'pyannote-community',title:'Community-1 — chaîne de diarisation préentraînée',org:'Équipe pyannote · fiche du modèle',url:'https://huggingface.co/pyannote/speaker-diarization-community-1',note:'Intervalles de parole par locuteur, évaluation sur plusieurs corpus et exécution locale après téléchargement des modèles. Consultée le 12 novembre 2026.'},
  {id:'wav2vec2',title:'wav2vec 2.0: A Framework for Self-Supervised Learning of Speech Representations',org:'Alexei Baevski, Henry Zhou, Abdelrahman Mohamed et Michael Auli · 2020',url:'https://arxiv.org/abs/2006.11477',note:'Préentraînement sur de l’audio puis ajustement fin sur des enregistrements transcrits ; principe utile lorsque les données annotées sont peu nombreuses. Consulté le 12 novembre 2026.'},
  {id:'teikitohe-2026',title:'Speech Recognition to Accelerate Documentation of Marquesan and Cook Islands Māori',org:'Marie Teikitohe, Rolando Coto-Solano et Sally Akevai Nicholas · Interspeech 2026',url:'https://www.isca-archive.org/interspeech_2026/teikitohe26_interspeech.html',note:'Pages 1677–1682 · DOI : 10.21437/Interspeech.2026-3276. Adaptation de modèles au marquisien et au māori des îles Cook, essais de transfert et correction humaine des transcriptions. Article consulté le 12 novembre 2026.'},
  {id:'leipzig',title:'Leipzig Glossing Rules',org:'Max Planck Institute / Université de Leipzig',url:'https://www.eva.mpg.de/lingua/resources/glossing-rules.php',note:'Conventions pour aligner les morphèmes et les gloses ; les conventions de l’archive restent distinctes de celles de Leipzig.'},
  {id:'audacity',title:'Audacity',org:'Audacity',url:'https://www.audacityteam.org/',note:'Enregistrement et édition audio. Site officiel consulté le 9 novembre 2026.'},
  {id:'praat',title:'Praat — doing phonetics by computer',org:'Université d’Amsterdam',url:'https://www.fon.hum.uva.nl/praat/',note:'Analyse du signal de parole, phonétique, hauteur et annotation. Site officiel consulté le 9 novembre 2026.'},
  {id:'elan',title:'ELAN — présentation et documentation',org:'The Language Archive · Max Planck Institute',url:'https://archive.mpi.nl/tla/elan',note:'Annotations temporelles, pistes, hiérarchies et fichiers EAF.'},
  {id:'elan-export',title:'ELAN — Import and Export options',org:'Manuel ELAN',url:'https://www.mpi.nl/corpus/html/elan/ch01s04.html',note:'Exports de pistes, texte tabulé et échanges avec FLEx.'},
  {id:'flex',title:'FieldWorks Language Explorer',org:'SIL Global',url:'https://software.sil.org/fieldworks/',note:'Développement lexical, textes interlinéaires et description grammaticale.'},
  {id:'flex-exchange',title:'Import and Export',org:'Documentation FieldWorks',url:'https://software.sil.org/fieldworks/features/orientation-to-fieldworks/lexicon/import-export/',note:'Distinguer les échanges lexicaux des exports de textes interlinéaires.'},
  {id:'plaid',title:'Plaid — plateforme d’annotation linguistique',org:'Language and Cognition Lab · Indiana University',url:'https://larc-iu.github.io/plaid/',note:'Plateforme web, modèle de données configurable et applications d’annotation.'},
  {id:'plaid-igt',title:'Plaid IGT Guide',org:'Documentation Plaid',url:'https://larc-iu.github.io/plaid/igt-guide.html',note:'Transcription, analyse interlinéaire, lexique partagé, conventions et échanges.'},
  {id:'dig4el',title:'DIG4EL — documentation du projet',org:'Sébastien Christian · dépôt du projet',url:'https://github.com/alterfero/dig4el',note:'Questionnaires contextualisés, annotation de concepts, sources et examen des inférences.'},
  {id:'dig4el-archive',title:'DIG4EL — dépôt logiciel',org:'Zenodo',url:'https://zenodo.org/records/19465517',note:'Notice du prototype de recherche et référence de la méthode d’inférence.'},
  {id:'dig4el-oceanie',title:'Transposition didactique et DIG4EL',org:'Jacques Vernaudon · RIICLAS / Université de la Polynésie française, 2026',url:'https://inspe.upf.pf/riiclas/wp-content/uploads/2026/03/TSdR-11-Jacques-Vernaudon-SeminaireRiiclas_TranspositionDidactique_2026_v2.pdf',note:'Articulation entre documentation grammaticale, langues océaniennes et ressources pédagogiques.'}
];
export const toolObjectives2 = [
  {id:'transcrire',title:'Segmenter, diariser, transcrire',tools:[
    {name:'Audacity',ref:'audacity',description:'Limité mais simple'},
    {name:'PRAAT',ref:'praat',description:'Orienté vers l’analyse du signal pour étudier la phonétique, les tons ou l’intonation par exemple'},
    {name:'ELAN',ref:'elan',description:'Le classique des linguistes.'}
  ]},
  {id:'annoter',title:'Annoter les transcriptions : lexique et gloses',tools:[
    {name:'FLEX',ref:'flex',description:'Complexe mais très utilisé'},
    {name:'PLAID',ref:'plaid',description:'Le renouveau de l’annotation linguistique'}
  ]},
  {id:'interpreter',title:'Interpréter les transcriptions et annotations',tools:[
    {name:'DIG4EL',ref:'dig4el',description:'Deviner la grammaire au travers des productions'}
  ]}
];
export const writtenDemo = 'Le lundi, nous ouvrons la maison des associations près du port. Le port accueille aussi les visiteurs.';
export const workshopLetter = 'Bonjour,\nLa salle sera disponible vendredi après le marché. Nous pouvons recevoir les copies des lettres et les photographies. Merci de noter le nom de la personne qui apporte chaque document.\nPour les récits enregistrés, prévoyons un temps d’écoute avec les personnes concernées avant toute diffusion.\nÀ bientôt.';
export const workshopNotice = 'Document A2-02 · Message fictif créé pour l’exercice. Date, expéditeur et destinataire non indiqués. Aucun courrier réel n’est reproduit.';
export const workshopContext = 'Dossier : préparation d’une collecte autour du quai.\nObjectif annoncé : réunir des récits et des documents pour un projet culturel.\nLangue du dossier : français.\nDate de la collecte : à convenir.\nResponsable du dépôt : non désigné.';
export const workshopAccess = 'Dossier : préparation d’une collecte autour du quai.\nConsultation des documents : travail préparatoire au sein de l’équipe.\nModalités de diffusion publique : à convenir avec les personnes concernées.\nDate de réexamen des conditions d’accès : non fixée.';
export const workbookFields = [
 ['mission','La source et ses contributeurs','Identifiez le récit, la langue, le locuteur, la chercheuse, le traducteur et les identifiants du son et des annotations.'],
 ['question','Votre question sur la parole','Que souhaitez-vous observer dans cet enregistrement ? Distinguez écoute et lecture des annotations.'],
 ['collecte','Votre protocole d’enregistrement','Pour une nouvelle collecte comparable : situation, accords, microphone, niveau, format, métadonnées et sauvegardes. Distinguez ce protocole des informations réellement disponibles sur l’archive.'],
 ['conventions','Vos conventions de segmentation et de transcription','Définissez vos unités, vos pistes, votre identifiant de locuteur et le traitement des silences et des incertitudes.'],
 ['written','Votre lecture des annotations Pangloss','Choisissez un segment hors S1 et S2. Relevez son identifiant XML, ses temps, sa transcription et sa traduction ; signalez les éléments repris de l’archive.'],
 ['lexicon','Vos observations sur deux gloses','Relevez deux couples forme–glose du segment choisi. Distinguez glose lexicale, indication grammaticale et traduction libre, sans inventer une analyse du iaai.'],
 ['tools','Vos outils et formats','Reliez chaque opération à un outil utile. Quels liens devez-vous conserver entre média, segments, mots et gloses ?'],
 ['uncertainty','Votre comparaison des frontières','Comparez votre découpage à celui de l’archive. Décrivez une différence ou une incertitude et la vérification nécessaire avec une personne compétente.'],
 ['access','La provenance et les conditions de réutilisation','Relevez séparément les licences du son et des annotations. Que permet de savoir la date affichée ? Que manque-t-il sur la collecte et la numérisation ?'],
 ['decision','Votre restitution','Présentez un segment, les différentes couches, une limite de votre analyse et la prochaine vérification.']
];
