// Ancien fonds-école : conservé pour relire les anciens exports et régénérer ses médias.
export const edition5='archives-sonores-v1';
export const notice5='Fonds-école entièrement fictif. Les voix sont des synthèses en français et les sons sans paroles sont calculés. Aucun témoignage, enregistrement de terrain, chant ou pratique culturelle réelle n’est reproduit. Les lieux du scénario sont inventés ; la carte est un schéma sans coordonnées géographiques.';
export const places5=[
 {id:'salle',name:'Maison des récits',x:29,y:53},
 {id:'quai',name:'Jetée',x:73,y:69},
 {id:'atelier',name:'Atelier du fonds',x:45,y:30},
 {id:'belvedere',name:'Belvédère',x:78,y:24}
];
export const recordings5=[
 {id:'D5-01',scope:'demo',title:'Préparer une écoute au musée',genre:'Parole',language:'Français',recorded:'salle',mentioned:'quai',tags:['accueil','médiation'],speaker:'Voix de synthèse Thomas',context:'Dans le scénario, une personne prépare un point d’écoute sur les déplacements entre la jetée et la salle.',access:'Scénario : accord pour une écoute dans la salle ; mise en ligne non précisée.',text:'À la jetée, les visiteurs demandent souvent où se trouve la salle. Nous pourrions leur proposer un point d’écoute. Ici, à la maison des récits, il faudrait garder la notice près du casque. Pour une diffusion sur Internet, nous n’avons encore rien décidé.'},
 {id:'D5-02',scope:'demo',title:'Suite de signaux',genre:'Son sans paroles',language:'Sans paroles',recorded:'atelier',mentioned:null,tags:['signal','écoute'],speaker:'Générateur numérique',context:'Dans le scénario, un essai sonore est réalisé à l’atelier du fonds. Les signaux ne représentent aucun instrument ou milieu naturel.',access:'Scénario : essai technique disponible pour préparer une installation.',text:null,description:'Son calculé : deux séquences de tonalités à fréquences différentes, une pause, puis une brève séquence de bruit. Aucune parole.'},
 {id:'D5-03',scope:'demo',title:'Se souvenir d’un déplacement',genre:'Parole',language:'Français',recorded:'salle',mentioned:'belvedere',tags:['mémoire','déplacement'],speaker:'Voix de synthèse Thomas',context:'Dans le scénario, un souvenir est évoqué à la maison des récits, loin du lieu dont il est question.',access:'Scénario : conditions de diffusion non renseignées.',text:'Je me souviens du chemin vers le belvédère. Nous avions emporté les carnets dans une boîte. C’était avant les travaux, mais je ne sais plus quelle année. Le lieu dont je parle n’est pas celui où nous sommes aujourd’hui.'},
 {id:'A5-01',scope:'atelier',title:'Projet de point d’écoute',genre:'Parole',language:'Français',recorded:'salle',mentioned:'quai',tags:['accueil','déplacement'],speaker:'Voix de synthèse Thomas',context:'Pièce du scénario : message préparatoire concernant un parcours entre la jetée et la maison des récits. Auteur et date du message non renseignés.',access:'Pièce du scénario : une note jointe mentionne « écoute dans la salle ». Aucun document joint ne précise les usages en ligne.',text:'Autrefois, nous attendions les visiteurs près de la jetée. Depuis les travaux, nous nous retrouvons dans la salle. Enfin, je parle de notre groupe, pas de tout le village. Si vous gardez un extrait, il faut que cette précision reste audible. Pour le parcours de dimanche, nous pourrions placer le casque à côté du plan.'},
 {id:'A5-02',scope:'atelier',title:'Une boîte pour les documents',genre:'Parole',language:'Français',recorded:null,mentioned:'atelier',tags:['documents','mémoire'],speaker:'Voix de synthèse Thomas',context:'Pièce du scénario : message reçu avec une liste de documents. Le lieu de l’enregistrement n’est pas indiqué ; le texte évoque l’atelier du fonds.',access:'Pièce du scénario : aucune indication relative à la diffusion n’accompagne le message.',text:'La boîte était à l’atelier du fonds quand nous avons retrouvé les copies. Je crois que les photographies venaient d’une autre personne. Nous avions séparé les copies des originaux. Il faudrait retrouver la liste pour savoir ce que cette boîte contenait au départ.'},
 {id:'A5-03',scope:'atelier',title:'Essai pour une installation',genre:'Son sans paroles',language:'Sans paroles',recorded:'atelier',mentioned:null,tags:['signal','installation'],speaker:'Générateur numérique',context:'Pièce du scénario : essai sonore associé au projet d’installation. Aucun lieu naturel n’a été enregistré.',access:'Pièce du scénario : essai technique prévu pour la préparation de l’installation.',text:null,description:'Son calculé : impulsions espacées, une pause, puis un son dont la fréquence évolue. Aucune parole ni source patrimoniale.'}
];
export const recording5=id=>recordings5.find(d=>d.id===id);
export const dossier5=scope=>recordings5.filter(d=>d.scope===scope);
export const workbook5Fields=[
 ['public','Votre public et votre objectif','Choisissez une mairie, un musée, une bibliothèque ou un portail universitaire. Définissez ce que le public doit pouvoir retrouver et comprendre.'],
 ['notice','Votre notice de consultation','Choisissez une pièce. Rédigez un titre de médiation et une courte notice ; citez l’identifiant, le statut fictif, le contexte et les informations manquantes.'],
 ['carte','Votre choix de localisation','Expliquez ce que vos points représenteraient : lieu d’enregistrement, lieu évoqué ou autre relation documentée. Comment représenter une localisation inconnue ?'],
 ['diffusion','Votre proposition d’écoute et de diffusion','Précisez l’extrait retenu, son contexte, une alternative textuelle et les conditions à clarifier avant une diffusion. Appuyez-vous sur les pièces du scénario.'],
 ['conservation','Votre organisation des fichiers','Distinguez fichier de référence et copie d’écoute. Proposez un nommage, une organisation des versions et des copies, puis estimez le volume d’un fonds de 10 heures avec les paramètres de votre choix.']
];

export const song5={
 title:'Te Hua Riirii',creator:'Coco Hotahota & Temaeva',album:'Escale A Papeete',year:'1976',
 page:'https://archive.org/details/coco-hotahota-and-temaeva-escale-a-papeete/03-Te+Hua+Riirii.flac',
 metadata:'https://archive.org/metadata/coco-hotahota-and-temaeva-escale-a-papeete',
 checked:'13 novembre 2026'
};
export const workshopArchive5Fields=[
 ['source','1. Identifier la piste','Titre, auteur ou interprète, album, URL de la notice archive.org, nom du fichier téléchargé, date de consultation et informations manquantes.'],
 ['rights','2. Justifier le droit de publier un extrait','Nom et version de la licence, URL de la preuve (notice et, si nécessaire, site du titulaire), conditions applicables. Expliquez pourquoi découpe et écoute publique sont autorisées.'],
 ['excerpt','3. Décrire la sélection','Début et fin dans la piste originale, durée, raison du choix, description sonore ou transcription vérifiée. Signalez les fondus et toute autre modification.'],
 ['files','4. Comparer les trois fichiers','Nom, format, fréquence, canaux, profondeur PCM ou débit MP3, durée et taille de l’original, du WAV et du MP3. Calculez le rapport taille WAV / taille MP3.'],
 ['credit','5. Préparer le crédit pour le site','Titre, auteur, source, licence avec son lien, début et fin de l’extrait et transformations. Rédigez une description accessible près du lecteur.'],
 ['assessment','6. Évaluer le résultat','Réécoutez les exports : mêmes limites et contenu ? Artéfacts ? Quel compromis pour la diffusion ? Indiquez ce que le WAV conserve et ce qu’il ne peut pas restaurer si la source est déjà un MP3.']
];
export const rightsQuestions5=[
 ['La chanson est en ligne. Peut-on la télécharger ?',
  'Le téléchargement est proposé techniquement, mais la notice ne prouve pas que le déposant possède les droits. Sans licence ou autorisation identifiée, on ne peut pas conclure « téléchargement libre ». En droit français, la copie privée suppose notamment une source licite et un usage strictement privé ; elle n’autorise pas la mise en ligne.', ['p5-archive-rights','p5-exceptions']],
 ['Peut-on la faire écouter en cours ou sur un site public ?',
  'Ces usages ne sont pas équivalents. Pour le cours, vérifier le cadre et les accords de l’établissement : une classe n’est pas un cercle de famille. Pour un site ouvert, obtenir les droits de reproduction et de communication au public nécessaires. Le caractère gratuit ou pédagogique ne donne pas une autorisation générale.', ['p5-local-law','p5-copyright']],
 ['Peut-on la découper pour ne garder qu’un extrait ?',
  'Audacity permet cette opération ; cela ne règle pas les droits. La mise en ligne d’un extrait est une réutilisation partielle à autoriser, sauf exception réellement applicable. Une courte citation doit notamment servir un propos justifié et citer auteur et source : il n’existe pas de règle universelle « moins de 30 secondes = libre ».', ['p5-exceptions','p5-copyright']],
 ['Peut-on modifier l’extrait ?',
  'Changer le tempo, monter, filtrer ou transformer peut relever de l’adaptation et du respect de l’œuvre. La notice consultée n’accorde aucun droit de ce type. Décrire l’usage précis et rechercher l’autorisation des titulaires concernés ; convertir un fichier en MP3 ne crée pas de nouveaux droits.', ['p5-copyright','p5-local-law']],
 ['Peut-on créer une nouvelle chanson à partir de ses morceaux ?',
  'Un sample peut engager les droits sur la composition et sur l’enregistrement : auteurs, artistes-interprètes et producteur. Il faut une licence compatible ou les autorisations nécessaires. Créditer Coco Hotahota & Temaeva ne remplace pas ces permissions. Une origine traditionnelle éventuelle ne rend pas cet enregistrement libre.', ['p5-local-law']],
 ['Que faire quand la licence manque ?',
  'Noter « autorisation de réutilisation non établie », conserver la source et demander aux titulaires un accord couvrant découpe, transformations éventuelles et diffusion Web.', ['p5-archive','p5-archive-rights']]
];
export const chapter5Sources=[
 {id:'p5-archive',org:'Internet Archive',title:'Escale A Papeete — Coco Hotahota & Temaeva',url:song5.page,note:'Notice et piste 3 : Te Hua Riirii. Métadonnées consultées le 13 novembre 2026 ; aucun champ de licence ou de droits ni autorisation dans la description.'},
 {id:'p5-metadata',org:'Internet Archive',title:'Métadonnées de l’album',url:song5.metadata,note:'Source Vinyl LP ; date 1976 ; langue tah ; dépôt du 16 juillet 2026. Le FLAC est le fichier déposé, le MP3 une version dérivée.'},
 {id:'p5-archive-rights',org:'Internet Archive',title:'Rights — puis-je réutiliser ce contenu ?',url:'https://help.archive.org/help/rights/',note:'Internet Archive ne garantit pas le statut juridique des fichiers déposés ni les indications de droits des notices.'},
 {id:'p5-digital',org:'Audacity',title:'Digital Audio Fundamentals',url:'https://manual.audacityteam.org/man/digital_audio.html',note:'Échantillonnage, quantification et fréquences représentables.'},
 {id:'p5-flac',org:'Xiph.Org',title:'What is FLAC?',url:'https://xiph.org/flac/',note:'Compression sans perte : retrouver exactement les échantillons encodés.'},
 {id:'p5-spectrum',org:'Audacity',title:'Spectrogram View',url:'https://manual.audacityteam.org/man/spectrogram_view.html',note:'Temps, fréquences, intensité et influence des réglages de visualisation.'},
 {id:'p5-export',org:'Audacity',title:'Export Audio',url:'https://manual.audacityteam.org/man/file_export_dialog.html',note:'Exporter la sélection courante en choisissant format, fréquence, canaux et options d’encodage.'},
 {id:'p5-local-law',org:'Polynésie française · DGAE / DCP',title:'Guide de la propriété intellectuelle',url:'https://www.service-public.pf/dgae/wp-content/uploads/sites/44/2026/01/Guide-PI.pdf',note:'Pages 9–10 : droit d’auteur, droit moral et droits voisins ; page 15 : SACEM Polynésie. Repère local pour les droits, distinct des textes nationaux.'},
 {id:'p5-copyright',org:'Légifrance',title:'Code de la propriété intellectuelle — L122-4',url:'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006278911',note:'Texte national : reproduction, représentation et transformation. Pour une utilisation à l’UPF, vérifier le régime territorial et les accords applicables.'},
 {id:'p5-exceptions',org:'Légifrance',title:'Code de la propriété intellectuelle — L122-5',url:'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000048603495',note:'Texte national : copie privée, source licite, citation et exceptions ; aucune autorisation générale de publier un extrait sur Internet.'},
];
