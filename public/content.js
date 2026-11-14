export const course = {
  title: 'Humanités numériques',
  subtitle: 'Documenter, explorer, transmettre',
  author: 'Sébastien Christian', institution: 'Université de la Polynésie française', master: 'Master MEEF PIF',
  year: '2026-2027',
  updated: '13 novembre 2026'
};

export const chapters = [
  { id: 1, name: 'Comprendre', title: 'Des humanités aux humanités numériques', desc: 'Une histoire de traces, de représentations et de nouvelles façons de lire.', tag: 'Fondations', objectives: ['Distinguer source, donnée, métadonnée et interprétation.', 'Expliquer ce que change une représentation numérique.', 'Situer les grandes transformations historiques.', 'Justifier les premiers choix de description d’un fonds.'] },
  { id: 2, name: 'Numériser la parole', title: 'De la parole au corpus annoté', desc: 'Enregistrer les productions linguistiques humaines : diarisation, transcription, gloses et traduction, avec un récit réel en iaai.', tag: 'Parole et annotations', objectives: ['Distinguer numérisation du signal et annotation linguistique.', 'Repérer qui parle quand, transcrire, segmenter, gloser et traduire.', 'Examiner le son et les annotations d’un récit réel du corpus iaai de Pangloss.'] },
  { id: 3, name: 'Explorer de grands corpus', title: 'Explorer de grands corpus', desc: 'Avec Marawa : documents, annotations, recherche dans les résumés, tropes, cartes et travail collectif.', tag: 'Corpus / Marawa', objectives: ['Distinguer les documents originaux, leurs annotations et leurs licences.', 'Comprendre la recherche formelle et la vectorisation des thèmes, tropes et mots-clés.', 'Lire une carte géographique et un graphe de similarité.', 'Comprendre les fonctions du logiciel selon les rôles invité, contributeur et administrateur.'] },
  { id: 4, name: 'Images et objets', title: 'De l’observation à l’analyse', desc: 'Décrire, comparer et rendre accessibles les collections visuelles.', tag: 'Médias · 1/3', objectives: ['Distinguer image, objet représenté et notice.', 'Évaluer le résultat d’une reconnaissance automatique de texte.', 'Découvrir l’interopérabilité avec IIIF.'] },
  { id: 5, name: 'Archives sonores', title: 'Gérer des ressources audio numériques', desc: 'Te Hua Riirii : numérisation, compression, licences et extrait Web.', tag: 'Médias · 2/3', objectives: ['Comprendre les choix de numérisation et d’encodage du son.', 'Vérifier les droits de téléchargement, de transformation et de diffusion.', 'Trouver une piste autorisée et préparer ses extraits WAV et MP3.'] },
  { id: 6, name: 'Archives vidéo, VR et AR', title: 'Gérer des archives vidéo.', desc: 'Opunohu : droits, compression, sous-titres, streaming et médiations immersives.', tag: 'Médias · 3/3', objectives: ['Lire une notice vidéo et distinguer téléchargement, partage et adaptation.', 'Estimer le volume et produire des sous-titres synchronisés.', 'Comparer les plateformes de diffusion et les usages de la VR et de l’AR.'] },
  { id: 7, name: 'Accessibilité et handicap', title: 'Rendre les contenus accessibles', desc: 'Images, sons, sous-titres, audiodescription, contrastes et navigation : les bonnes pratiques à retenir.', tag: 'Synthèse · Accessibilité', objectives: ['Choisir une alternative adaptée à chaque média.', 'Rendre la lecture et les commandes accessibles.', 'Repérer et corriger les obstacles avant diffusion.'] },
  { id: 8, name: 'Génération et transparence', title: 'Créer avec l’IA, rendre l’origine explicite', desc: 'EU AI Act, mentions sur les contenus et métadonnées : documenter toute génération par IA.', tag: 'Synthèse · IA et provenance', objectives: ['Distinguer les obligations de l’AI Act et la règle du cours.', 'Signaler la génération sur le contenu et dans ses métadonnées.', 'Vérifier sources, droits et conservation du marquage.'] },
  { id: 9, name: 'LLM et agents IA', title: 'LLM et agents IA', desc: 'Comprendre comment un LLM raisonne, comment des agents se répartissent le travail et comment le RAG mobilise un corpus.', tag: 'Intelligence artificielle', objectives: ['Distinguer les connaissances apprises du raisonnement sur un contexte.', 'Expliquer comment un agent peut coordonner plusieurs LLM.', 'Décrire le RAG et son usage dans DIG4EL pour choisir des exemples de grammaire.'] }
];

export const sources = [
  { id: 'carte-tahiti', title: '98. — Tahiti. — Coucher de Soleil sur Moorea', org: 'SPAA / Ana’ite — Université de la Polynésie française', url: 'https://anaite.upf.pf/s/anaite/item/49989', note: 'Carte postale Z14-003-00770, fonds GUTZWILLER (Fi14), Edition G. Spitz. Édition estimée vers 1914–1920 ; message daté du 19 janvier 1929. Recto et verso reproduits sous CC BY-NC-SA (version non précisée par la source).' },
  { id: 'hollerith', title: 'Le recensement de 1890 et les cartes perforées', org: 'U.S. Census Bureau', url: 'https://www.census.gov/programs-surveys/decennial-census/decade/1890/about-1890.html', note: 'Source institutionnelle sur la tabulation et les catégories du recensement.' },
  { id: 'pcm', title: 'Pulse-code modulation, 1937', org: 'IEEE Communications Society', url: 'https://www.comsoc.org/node/19016', note: 'Repère historique sur le codage numérique du signal.' },
  { id: 'busa', title: 'The Annals of Humanities Computing: The Index Thomisticus', org: 'Roberto Busa, 1980', url: 'https://www.alice.id.tue.nl/references/busa-1980.pdf', note: 'Récit rétrospectif d’un acteur du projet ; à lire comme un témoignage situé.' },
  { id: 'tape', title: 'Timeline of Computer History: 1951', org: 'Computer History Museum', url: 'https://www.computerhistory.org/timeline/1951/', note: 'UNIVAC et le stockage de données sur bande magnétique.' },
  { id: 'kirsch', title: 'First Digital Image', org: 'NIST — Russell Kirsch, 1957', url: 'https://www.nist.gov/mathematics-statistics/first-digital-image', note: 'Portrait numérisé de Walden Kirsch, 176 × 176 pixels. Crédit : R. Kirsch / NIST.' },
  { id: 'word', title: 'IBM Word Processing Developments', org: 'F. T. May, IBM Journal of Research and Development, 1981', url: 'https://bitsavers.org/pdf/ibm/IBM_Journal_of_Research_and_Development/255/ibmrd2505ZI.pdf', note: 'Histoire des systèmes IBM, dont le MT/ST annoncé en 1964.' },
  { id: 'engelbart', title: 'La démonstration de 1968', org: 'Doug Engelbart Institute', url: 'https://www.dougengelbart.org/mousesite/1968Demo.html', note: 'Édition de texte, hypertexte et collaboration. Les vidéos restent consultables sur leur site.' },
  { id: 'gutenberg', title: 'Background, History and Philosophy', org: 'Project Gutenberg', url: 'https://www.gutenberg.org/about/background/', note: 'Histoire d’un projet de diffusion de textes électroniques commencé en 1971.' },
  { id: 'video', title: 'Sony DVR-1000, Digital Video Recorder', org: 'Powerhouse Collection, Australie', url: 'https://collection.powerhouse.com.au/object/400280', note: 'Notice d’objet : enregistreur vidéo numérique professionnel, 1987.' },
  { id: 'tei', title: 'History of the Text Encoding Initiative', org: 'TEI Consortium', url: 'https://tei-c.org/about/history/', note: 'L’initiative de 1987 répond aux problèmes de représentation et d’échange des textes.' },
  { id: 'internet', title: 'How It Works', org: 'Internet Society', url: 'https://www.internetsociety.org/internet/how-it-works/', note: 'Internet comme réseau de réseaux interconnectés, fondé sur des standards ouverts.' },
  { id: 'web', title: 'The birth of the Web', org: 'CERN', url: 'https://home.cern/science/computing/the-birth-of-the-web', note: 'Proposition de 1989 et mise à disposition publique du logiciel en 1993.' },
  { id: 'gallica', title: 'Gallica et les différents dispositifs', org: 'Bibliothèque nationale de France', url: 'https://www.bnf.fr/fr/gallica-et-les-differents-dispositifs', note: 'Bibliothèque numérique lancée en 1997 et dispositifs de médiation.' },
  { id: 'paradisec', title: 'Our Collections', org: 'PARADISEC', url: 'https://www.paradisec.org.au/collections/', note: 'Archivage de langues et de musiques ; accès à la carte Soundscape.' },
  { id: 'transformer', title: 'Attention Is All You Need', org: 'Vaswani et al., 2017', url: 'https://arxiv.org/abs/1706.03762', note: 'Article introduisant l’architecture Transformer.' },
  { id: 'react', title: 'ReAct: Synergizing Reasoning and Acting in Language Models', org: 'Yao et al., 2022', url: 'https://arxiv.org/abs/2210.03629', note: 'Exemple de recherche articulant modèle de langage et actions sur des outils.' },
  { id: 'care', title: 'CARE Principles for Indigenous Data Governance', org: 'Global Indigenous Data Alliance', url: 'https://www.gida-global.org/careprinciples', note: 'Bénéfice collectif, autorité de contrôle, responsabilité et éthique.' }
];

export const timeline = [
  { year: '1890', family: 'Encoder', title: 'Compter des personnes avec des cartes', object: 'La carte perforée', text: 'Le recensement des États-Unis utilise le système de tabulation de Herman Hollerith. Des informations sont transcrites en perforations, puis comptées par des dispositifs électriques.', change: 'Une information devient manipulable à grande échelle dès qu’elle est ramenée à des catégories codées.', question: 'Qui choisit les catégories ? Quelles expériences humaines disparaissent dans les cases ?', source: 'hollerith', visual: 'punch' },
  { year: '1937', family: 'Encoder', title: 'Représenter le son par des nombres', object: 'Le codage PCM', text: 'Alec Reeves propose la modulation par impulsions codées. Ce principe associe échantillonnage et codage de l’amplitude, bien avant la diffusion des fichiers audio.', change: 'Un signal continu peut être représenté par une suite de valeurs discrètes.', question: 'Un premier enregistrement sonore est-il nécessairement numérique ? Non : les supports analogiques le précèdent.', source: 'pcm', visual: 'wave' },
  { year: '1949', family: 'Analyser', title: 'Faire des mots un corpus interrogeable', object: 'L’Index Thomisticus', text: 'La collaboration entre Roberto Busa et IBM donne une nouvelle échelle au projet de concordance des œuvres de Thomas d’Aquin et de textes associés. Les cartes sont préparées par un travail humain de saisie et d’analyse.', change: 'Retrouver systématiquement les occurrences d’un mot ouvre de nouvelles possibilités de lecture.', question: 'Une concordance fournit des occurrences. Fournit-elle leur interprétation ?', source: 'busa', visual: 'text' },
  { year: '1951', family: 'Conserver', title: 'Des cartes aux bandes magnétiques', object: 'UNIVAC et UNISERVO', text: 'Le système UNIVAC utilise un stockage sur bande magnétique. La bande permet de conserver des données sur un support compact, mais nécessite des lecteurs et des procédures d’accès adaptés.', change: 'La conservation dépend désormais de toute une chaîne matérielle et logicielle.', question: 'Conserver un support suffit-il lorsque son lecteur a disparu ?', source: 'tape', visual: 'univac' },
  { year: '1957', family: 'Encoder', title: 'Une photographie devient une matrice', object: 'Le portrait de Walden Kirsch', text: 'Au National Bureau of Standards (NBS), devenu le NIST, Russell Kirsch et son équipe numérisent une photographie. Le portrait de son fils est représenté sur une grille de 176 × 176 pixels.', change: 'Une image peut être stockée, mesurée et transformée par calcul.', question: 'Quelles informations restent reconnaissables lorsque l’on réduit la résolution ?', source: 'kirsch', visual: 'portrait' },
  { year: '1964–68', family: 'Créer', title: 'Réviser, réorganiser, relier le texte', object: 'Du MT/ST au système NLS', text: 'Le MT/ST d’IBM associe machine à écrire et stockage du texte. En 1968, l’équipe de Douglas Engelbart démontre l’édition à l’écran, les liens et la collaboration avec NLS.', change: 'L’écriture devient un processus de transformation de structures révisables.', question: 'Comment le copier-coller ou l’hypertexte changent-ils une pratique d’écriture ?', source: 'engelbart', extra: 'word', visual: 'text-history' },
  { year: '1971', family: 'Partager', title: 'Diffuser des livres électroniques', object: 'Project Gutenberg', text: 'Michael Hart lance le projet qui deviendra Project Gutenberg. La mise à disposition de textes électroniques fait de la copie et de la circulation des enjeux centraux.', change: 'Le texte peut circuler indépendamment de son exemplaire imprimé.', question: 'Une transcription en texte brut conserve-t-elle la mise en page et les annotations d’un exemplaire ?', source: 'gutenberg', visual: 'gutenberg-logo' },
  { year: '1987', family: 'Encoder', title: 'La vidéo devient aussi numérisable.', object: 'Un enregistreur D-1', text: 'Le DVR-1000 de Sony, conservé dans les collections du Powerhouse, illustre l’enregistrement vidéo numérique professionnel de cette période. Une vidéo associe images successives, temporalité et parfois plusieurs pistes sonores.', change: 'L’image animée devient elle aussi une suite de données à traiter et à préserver.', question: 'Comment citer un geste de trois secondes dans une archive d’une heure ?', source: 'video', visual: 'dvr1000' },
  { year: '1987', family: 'Organiser', title: 'Décrire la structure des textes', object: 'La Text Encoding Initiative', text: 'La Text Encoding Initiative (TEI) naît d’une volonté de partager des méthodes d’encodage des textes indépendantes des matériels et des logiciels. Un nom de personne, une variante ou une note peuvent être explicitement décrits.', change: 'La structure intellectuelle du document devient une donnée échangeable.', question: 'Deux équipes peuvent-elles interpréter de la même façon une balise dont la définition reste implicite ?', source: 'tei', visual: 'tei-example' },
  { year: '1989–97', family: 'Partager', title: 'Relier et ouvrir les collections', object: 'Le Web et Gallica', text: 'Le Web est proposé au CERN en 1989 ; son logiciel est rendu public en 1993. Gallica ouvre en 1997. Des collections peuvent désormais être consultées à distance et reliées par des liens.', change: 'L’accès dépasse les murs de l’institution, sans supprimer les choix de sélection.', question: 'Ce qui n’a pas été numérisé devient-il moins visible dans les recherches ?', source: 'web', extra: 'gallica', visual: 'network', contextTitle: 'Internet et le Web : quelle différence ?', context: [
    'Internet est un réseau mondial de réseaux interconnectés. Des ordinateurs et des serveurs y échangent des données grâce à des protocoles communs, notamment IP. Cette infrastructure associe des câbles, des fibres optiques, des liaisons radio, des routeurs et le travail de nombreux opérateurs. Internet existait avant le Web.',
    'Le Web, ou World Wide Web, est l’un des services qui utilisent Internet : il permet de consulter et de relier des pages et des ressources par des hyperliens, généralement avec un navigateur. Le courrier électronique et le transfert de fichiers utilisent eux aussi Internet, sans nécessairement passer par le Web. Consulter une page de Gallica relève donc du Web ; le réseau qui transporte les données relève d’Internet.'
  ], contextSource: 'internet' },
  { year: 'Années 2000–2010', family: 'Explorer', title: 'Écouter et parcourir les archives', object: 'Des collections aux interfaces', text: 'Des archives telles que PARADISEC documentent langues et musiques. Catalogue, carte d’écoute et visualisation proposent des portes d’entrée différentes dans les ressources.', change: 'L’interface devient une forme de médiation qui oriente la découverte.', question: 'Une carte représente-t-elle la répartition des langues, les lieux de collecte ou les choix de l’archive ?', source: 'paradisec', visual: 'network' },
  { year: '2017', family: 'Analyser', title: 'Apprendre des représentations', object: 'L’architecture Transformer', text: 'L’article Attention Is All You Need propose une architecture fondée sur des mécanismes d’attention. Cette famille de modèles joue un rôle majeur dans les développements ultérieurs des modèles de langage.', change: 'Des régularités apprises dans des données peuvent servir à proposer des classements, des traductions ou des textes.', question: 'Les performances sont-elles les mêmes pour les langues et les genres bien représentés dans les données d’entraînement et pour ceux qui le sont peu ?', source: 'transformer', visual: 'network' },
];

export const quiz = [
  { question: 'Une photographie numérisée est…', answers: ['une copie qui conserve toutes les propriétés de l’objet.', 'une représentation issue de choix techniques et documentaires.', 'une interprétation nécessairement produite par une IA.'] },
  { question: 'Dans une notice, « langue : français » est…', answers: ['une métadonnée.', 'le document source.', 'une preuve de l’identité du locuteur.'] },
  { question: 'Une carte perforée nous rappelle que…', answers: ['le numérique commence avec le Web.', 'tout support papier est analogique.', 'un codage discret peut exister sur un support matériel en papier.'] },
  { question: 'Un mot apparaît deux fois plus souvent dans le corpus A que dans le corpus B. Peut-on conclure qu’il est plus caractéristique du corpus A ?', answers: ['Oui, le comptage suffit.', 'Il faut notamment comparer la taille et la composition des corpus.', 'Non, aucune comparaison de corpus n’est possible.'] },
  { question: 'Un assistant cite une source à l’appui de sa réponse. Que faire ?', answers: ['Ouvrir la source et vérifier qu’elle étaye effectivement l’affirmation.', 'Accepter la réponse, puisque la référence existe.', 'Supprimer toutes les références pour simplifier.'] }
];

// Une seule pièce documentaire ; le JPEG original conserve ses métadonnées intégrées.
export const documents = [{
  id: 'Takurua_Parent_2025_Rapa_1', title: 'Takurua_Parent_2025_Rapa_1.jpg',
  type: 'Photographie JPEG', file: 'Takurua_Parent_2025_Rapa_1.jpg',
  url: '/assets/chapitre1/Takurua_Parent_2025_Rapa_1.jpg'
}];

export const metadataGuides = [
  {
    "title": "Sur Mac (macOS)",
    "steps": [
      {
        "text": "Téléchargez le JPEG original depuis cet atelier. Conservez-le, puis placez une copie dans le dossier Téléchargements, avec son nom inchangé : Takurua_Parent_2025_Rapa_1.jpg."
      },
      {
        "text": "Pour un premier examen sans installation : clic droit sur la copie → Ouvrir avec → Aperçu. Dans Aperçu, choisissez Outils → Afficher l’inspecteur (⌘I), puis parcourez les informations disponibles. Ce premier aperçu ne présente pas nécessairement tous les champs EXIF, IPTC et XMP."
      },
      {
        "text": "Pour l’examen complet, ouvrez le site officiel ExifTool (lien ci-dessus). Si l’outil n’est pas déjà installé, téléchargez le « MacOS Package » (.pkg), ouvrez-le et suivez l’installation. Si le poste bloque l’installation ou demande des droits que vous n’avez pas, consultez la notice officielle ou demandez l’aide de l’enseignant."
      },
      {
        "text": "Ouvrez Terminal depuis Applications → Utilitaires (ou recherchez « Terminal » avec Spotlight). Copiez cette commande et appuyez sur Entrée pour vérifier que l’outil répond.",
        "command": "exiftool -ver"
      },
      {
        "text": "Affichez les métadonnées de la copie. Cette commande lit le fichier sans le modifier.",
        "command": "exiftool -G1 -a -s ~/Downloads/Takurua_Parent_2025_Rapa_1.jpg"
      },
      {
        "text": "Pour garder un relevé, exécutez cette variante, puis ouvrez metadonnees.txt dans Téléchargements avec TextEdit.",
        "command": "exiftool -G1 -a -s ~/Downloads/Takurua_Parent_2025_Rapa_1.jpg > ~/Downloads/metadonnees.txt"
      }
    ]
  },
  {
    "title": "Sur PC (Windows)",
    "steps": [
      {
        "text": "Téléchargez le JPEG original, conservez-le et faites une copie pour l’enquête. Pour un premier examen sans installation : sélectionnez la copie dans l’Explorateur de fichiers, appuyez sur Alt+Entrée, puis ouvrez l’onglet Détails. Cette vue peut omettre certains champs."
      },
      {
        "text": "Ouvrez le site officiel ExifTool (lien ci-dessus). Téléchargez le « Windows Executable » adapté à votre système (64 bits dans la plupart des cas). Clic droit sur le ZIP téléchargé → Extraire tout. Ouvrez le dossier extrait ; ne lancez pas l’outil depuis le ZIP."
      },
      {
        "text": "Gardez l’exécutable et le dossier exiftool_files côte à côte. Pour une première lecture, faites glisser la copie du JPEG sur exiftool(-k).exe : les informations s’affichent dans une fenêtre qui reste ouverte."
      },
      {
        "text": "Pour obtenir un relevé détaillé et exportable : dans l’Explorateur, activez Afficher → Afficher → Extensions de noms de fichiers (ou cochez « Extensions de noms de fichiers » dans l’onglet Affichage). Renommez exiftool(-k).exe en exiftool.exe, sans ajouter une seconde extension .exe. Placez la copie du JPEG dans ce même dossier."
      },
      {
        "text": "Depuis ce dossier, cliquez dans la barre d’adresse de l’Explorateur, saisissez powershell et appuyez sur Entrée. Dans la fenêtre PowerShell, copiez la commande suivante, puis validez avec Entrée.",
        "command": ".\\exiftool.exe -G1 -a -s .\\Takurua_Parent_2025_Rapa_1.jpg"
      },
      {
        "text": "Pour garder un relevé, utilisez cette variante. Le fichier metadonnees.txt apparaît dans le même dossier ; ouvrez-le avec le Bloc-notes.",
        "command": ".\\exiftool.exe -G1 -a -s .\\Takurua_Parent_2025_Rapa_1.jpg | Out-File -Encoding utf8 .\\metadonnees.txt"
      }
    ]
  }
];

export const workshopFields = [
  ['identifier', 'Identifiant et titre', 'Reprenez le nom du fichier et proposez un titre descriptif. Distinguez le titre proposé des mentions présentes dans la source.'],
  ['type', 'Type, langue et dates', 'Identifiez le type de document et la langue des mentions. Relevez les dates disponibles et le champ qui les fournit ; distinguez prise de vue, modification et téléchargement.'],
  ['description', 'Description factuelle', 'Décrivez ce que vous observez. Relevez la mention en bas à droite. Distinguez les éléments visibles des informations trouvées ailleurs.'],
  ['provenance', 'Provenance et transformations', 'Examinez les métadonnées intégrées au JPEG. Relevez les champs utiles à la provenance, à la localisation et aux transformations ; citez leur nom exact et leur valeur. Confrontez-les à l’image.'],
  ['uncertainty', 'Incertitudes et vérifications', 'Formulez au moins deux incertitudes. Pour chacune, proposez une vérification et consignez la source consultée et le résultat. Une métadonnée est un indice à examiner.'],
  ['access', 'Conditions d’accès et de réutilisation', 'Comparez la mention visible et les champs de droits intégrés. Que permettent-ils ? Que reste-t-il à clarifier pour l’usage envisagé et les personnes représentées ?'],
  ['interpretation', 'Hypothèse, appuis et limites', 'Proposez une hypothèse sur cette image et son contexte. Citez les indices précis qui l’appuient, les sources externes consultées et les autres explications possibles.'],
  ['decision', 'Prochaine action', 'Quelle opération est prioritaire pour poursuivre l’enquête ou documenter l’image ? Quel résultat attendez-vous et comment le vérifier ?']
];

export const glossary = [
  ['Spectrogramme', 'Représentation du son selon le temps et les fréquences. La couleur indique un niveau dépendant des paramètres d’analyse.'],
  ['Forme d’onde', 'Représentation de l’amplitude du signal au fil du temps ; à petite échelle, on visualise souvent une enveloppe de valeurs.'],
  ['Index temporel', 'Ensemble de repères associant un passage audio ou vidéo à un début, une fin et une description ou un terme de recherche.'],
  ['PCM', 'Modulation par impulsions et codage : représentation numérique d’un signal par des échantillons quantifiés. Le calculateur du chapitre 5 utilise du PCM non compressé.'],
  ['Diarisation', 'Découpage d’un enregistrement en tours attribués à des locuteurs distingués par le système. Cela ne suffit pas à identifier ces personnes.'],
  ['Humanités', 'Disciplines et démarches qui étudient et interprètent les langues, les textes, les arts, les expériences et les sociétés humaines. Les périmètres varient selon les traditions universitaires.'],
  ['Humanités numériques', 'Pratiques associant des questions des humanités, des méthodes numériques et une réflexion critique sur la production des savoirs et leurs infrastructures.'],
  ['Numérisation', 'Production d’une représentation numérique à partir d’une source, par exemple la lecture d’un document par un scanner ou l’échantillonnage d’un son.'],
  ['Nativement numérique', 'Créé directement dans un environnement numérique : courriel, fichier de traitement de texte, photographie numérique.'],
  ['Donnée', 'Valeur, signe ou description construite pour un usage. Une donnée dépend d’un contexte et de choix de représentation.'],
  ['Métadonnée', 'Information décrivant une ressource : auteur, date, langue, provenance, conditions d’accès ou format.'],
  ['OCR', 'Reconnaissance optique de caractères : production automatique d’un texte à partir d’une image. La sortie doit être confrontée à l’image.'],
  ['HTR', 'Reconnaissance automatique d’écriture manuscrite, qui nécessite des modèles adaptés aux écritures et aux documents étudiés.'],
  ['IIIF', 'Ensemble de spécifications pour échanger et présenter des ressources numériques. Image API décrit des requêtes d’images ; Presentation API organise des vues.'],
  ['Manifest IIIF', 'Ressource qui décrit un objet numérique, ses informations de présentation et ses Canvas ordonnés.'],
  ['Canvas IIIF', 'Espace de repérage auquel des ressources sont associées par des annotations ; il peut représenter une page ou une face d’objet.'],
  ['ALTO', 'Format XML décrivant du texte et sa mise en page, notamment dans des chaînes de reconnaissance de caractères.'],
  ['Corpus', 'Ensemble de documents réunis selon des critères explicites pour répondre à un objectif.'],
  ['Trope', 'Situation ou configuration narrative récurrente, formulée explicitement pour annoter et comparer des histoires.'],
  ['Thème', 'Catégorie générale d’interprétation associée à une histoire. Elle se distingue d’une configuration narrative précise et d’un mot-clé descriptif.'],
  ['Recherche sémantique', 'Recherche de représentations proches dans un espace appris. Dans Marawa, elle porte sur les libellés des thèmes, tropes et mots-clés et donne accès aux histoires associées.'],
  ['Rôle utilisateur', 'Ensemble de fonctions autorisées dans un logiciel. Les permissions peuvent aussi dépendre d’un périmètre, comme les territoires attribués à un contributeur.'],
  ['Index inversé', 'Structure qui associe chaque terme aux documents qui le contiennent, et éventuellement aux positions de ses occurrences.'],
  ['Concordance', 'Présentation des occurrences d’une forme avec leur contexte pour comparer leurs usages.'],
  ['TF-IDF', 'Pondération combinant la fréquence d’un terme dans un document et sa rareté dans le corpus. Il en existe plusieurs variantes.'],
  ['Embedding', 'Représentation d’un élément, par exemple un passage, par un vecteur appris. Ses dimensions ne correspondent généralement pas à des catégories nommées.'],
  ['Similarité cosinus', 'Comparaison de la direction de deux vecteurs. Le score dépend de leur construction ; ce n’est pas une probabilité de pertinence.'],
  ['Précision et rappel', 'La précision rapporte les résultats pertinents aux résultats retournés ; le rappel rapporte les résultats pertinents retrouvés à tous les éléments pertinents du corpus.'],
  ['ACP', 'Analyse en composantes principales : projection linéaire qui résume la variance d’un ensemble de données sur de nouveaux axes. Deux axes ne conservent généralement qu’une partie de l’information.'],
  ['Fréquence relative', 'Nombre d’occurrences rapporté à la taille de l’ensemble étudié, par exemple pour 1 000 unités textuelles.'],
  ['Encodage', 'Convention qui associe des informations à des représentations manipulables : caractères, nombres, balises.'],
  ['Bit / octet', 'Un bit prend deux valeurs, 0 ou 1. Un octet contient huit bits. Le nombre d’octets d’un texte dépend de son encodage.'],
  ['Échantillonnage', 'Mesure d’un signal à intervalles réguliers. La fréquence d’échantillonnage s’exprime en échantillons par seconde (Hz).'],
  ['Quantification', 'Approximation d’une mesure par une valeur parmi un nombre fini de niveaux.'],
  ['Provenance', 'Informations sur l’origine d’une ressource et sur les opérations qui l’ont transformée.'],
  ['Interopérabilité', 'Capacité de systèmes et d’équipes à échanger des données et à les interpréter de façon suffisamment cohérente.'],
  ['Annotation', 'Information reliée à un passage d’une source, selon des conventions explicites : transcription, catégorie, traduction ou commentaire.'],
  ['Diarisation', 'Segmentation et regroupement en locuteurs : déterminer quelle voix parle à quels moments, sans nécessairement connaître son identité civile.'],
  ['Transcription', 'Représentation écrite d’une production orale, selon des conventions explicites ; elle se distingue de la traduction.'],
  ['Alignement temporel', 'Association d’une unité, par exemple un énoncé transcrit, à des bornes de début et de fin dans un média.'],
  ['Piste d’annotation', 'Couche qui regroupe des annotations ayant une fonction définie. Dans ELAN, une piste est appelée tier.'],
  ['Élicitation', 'Recueil de productions suscitées par une consigne ou un questionnaire, dont le contexte doit être conservé.'],
  ['Morphème', 'Unité associée à un sens ou à une fonction grammaticale ; elle ne correspond pas nécessairement à un mot écrit.'],
  ['Glose', 'Indication de sens ou de fonction associée à une unité du texte. Elle se distingue d’une traduction libre de l’énoncé.'],
  ['Texte interlinéaire', 'Présentation qui aligne plusieurs lignes d’information sur un même texte : formes, segmentation, gloses, traduction.'],
  ['LLM', 'Modèle de langage entraîné sur de grands ensembles de données pour produire des suites d’unités textuelles appelées « tokens ». Une réponse fluide peut être fausse.'],
  ['Agent IA', 'Système qui utilise notamment un modèle et des outils pour enchaîner des actions en fonction d’un objectif et des résultats observés.']
  ['Streaming', 'Lecture au fil de la réception des données, avec un tampon ; possible en direct ou à la demande.'],
  ['Codec et conteneur', 'Un codec encode et décode une piste ; un conteneur, tel MP4 ou Matroska, réunit les pistes et leurs métadonnées.'],
  ['WebVTT', 'Format texte de sous-titres et autres annotations temporelles destiné notamment au Web.'],
  ['Réalité virtuelle (VR)', 'Environnement numérique dont le point de vue réagit aux mouvements de l’utilisateur ; à distinguer d’une simple vidéo sur écran.'],
  ['Réalité augmentée (AR)', 'Éléments numériques ajoutés à une vue du monde réel et liés à un repère spatial, visuel ou géographique.'],
];
