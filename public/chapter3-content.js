export const chapter3Title = 'Explorer de grands corpus';
export const marawaUrl = 'https://marawa-prototype-production-9a6b.up.railway.app/';
export const chapter3Version = 'marawa-carte-2026-11-11-v2';
export const chapter3Sources = [
 {id:'marawa',org:'Marawa',title:'Exploration des histoires par les tropes',url:marawaUrl+'#/exploration',note:'Support des démonstrations en direct. Le chapitre s’appuie sur le code du projet et son contrat de données examinés le 10 novembre 2026. Les écrans accessibles dépendent du compte.'},
 {id:'model3',org:'Sentence Transformers',title:'paraphrase-multilingual-mpnet-base-v2',url:'https://huggingface.co/sentence-transformers/paraphrase-multilingual-mpnet-base-v2',note:'Modèle par défaut du code Marawa examiné : 768 dimensions. Il sert à représenter les libellés des thèmes, tropes et mots-clés. La configuration du logiciel peut évoluer.'},
 {id:'sbert',org:'Sentence Transformers',title:'Semantic Search',url:'https://www.sbert.net/examples/sentence_transformer/applications/semantic-search/README.html',note:'Recherche de voisins dans un espace vectoriel commun aux textes et aux requêtes ; choix du modèle et de l’unité représentée.'},
 {id:'ir',org:'Manning, Raghavan et Schütze',title:'Introduction to Information Retrieval',url:'https://nlp.stanford.edu/IR-book/',note:'Index inversés, recherche booléenne, représentation vectorielle et évaluation de la recherche.'},
 {id:'cc',org:'Creative Commons',title:'Comprendre les licences Creative Commons',url:'https://creativecommons.org/share-your-work/cclicenses/',note:'Attribution, usage non commercial et partage des adaptations sous les mêmes conditions. Les annotations Marawa sont sous CC BY-NC-SA, selon l’indication du responsable du cours ; version non précisée.'},
 {id:'cc-nc-sa',org:'Creative Commons',title:'Lire les conditions BY-NC-SA',url:'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.fr',note:'Ressource pour comprendre les clauses, consultée le 11 novembre 2026. Cette page présente la version 4.0 ; elle ne permet pas d’attribuer cette version aux annotations Marawa.'},
 {id:'osm',org:'OpenStreetMap',title:'Droits, licence et attribution du fond de carte',url:'https://www.openstreetmap.org/copyright',note:'Conditions des données OpenStreetMap et liens vers les règles d’attribution, notamment pour les cartes imprimées et les images fixes. Consulter aussi les conditions du fournisseur des tuiles effectivement affichées. Consulté le 11 novembre 2026.'}
];
export const workbook3Fields = [
 ['question','Mon trope, ma question et ma carte','Date, accès public sans connexion, public visé, question, requête exacte et langue, libellé et identifiant du trope retenu, URL, seuil initial et nom de la capture. Expliquez votre choix.'],
 ['recherche','De ma requête aux tropes candidats','Comparez deux formulations de la même idée : requêtes exactes, ordre et nombre de candidats, tropes communs ou différents, scores s’ils sont visibles. Décrivez le rôle du modèle, des vecteurs et du classement. Distinguez ce qui est observé de ce qui reste à vérifier.'],
 ['tropes','Que signifie « similaire » dans mon cas ?','Pour le même trope, comparez deux seuils : tropes voisins, histoires portant le trope, histoires associées et histoires sans localisation. Discutez un rapprochement convaincant et un rapprochement discutable, ou l’absence de voisins. La liste est-elle exhaustive ? Examinez limites de résultats, index, langues, annotations et couverture du corpus.'],
 ['corpus','Des annotations aux documents','Choisissez une histoire repérable dans les résultats. Relevez son titre, son identifiant ou lien, ses tropes, son résumé accessible, sa référence d’origine, les personnes créditées et le sens de sa localisation. Distinguez source, résumé et interprétation. Notez les informations inaccessibles sans compte et une vérification à effectuer dans la source.'],
 ['droits_capture','Réutiliser ma capture : deux décisions','Capture dans un document non commercial, puis commercial : pour chaque cas, donnez votre décision, ses conditions et les preuves (URL, date, mention de droits). Distinguez annotations, fond de carte, tuiles et autres éléments visibles. Rédigez le crédit proposé sans inventer de licence manquante.'],
 ['droits_resume','Recopier un résumé : deux décisions','Identifiez le résumé exact par son histoire, sans devoir le reproduire intégralement. Pour un usage non commercial puis commercial : décision, licence et version connue ou inconnue, attribution, conditions, preuve et éventuelle autorisation à obtenir. Distinguez copie et adaptation.'],
 ['droits_source','Recopier le texte de la source : deux décisions','Identifiez l’édition, le passage et, le cas échéant, la traduction. Pour un usage non commercial puis commercial : décision, titulaire ou statut à vérifier, conditions et preuve. Si vous invoquez une exception de citation, précisez son fondement et ses limites. Une information manquante appelle une vérification nommée.'],
 ['fond','Le fond de carte et ses effets','Fournisseur et crédits ; projection documentée ou à vérifier ; centre, coupure du monde, place du Pacifique, échelle, relief, toponymes et frontières actuelles. Pour trois choix au moins, reliez une observation précise à un effet sur la lecture et proposez une alternative.'],
 ['vues','Les données représentées et leur interprétation','Décrivez points, tailles, couleurs, liens, regroupements et superpositions à l’aide de la légende. À trope et seuil constants, comparez deux vues en changeant le cadrage ou un réglage visuel. Expliquez ce qui change dans la perception, ce qui reste dans les données et le traitement des histoires non localisées.'],
 ['decision','Ma conclusion et mes limites','Rédigez la légende de votre carte : sujet, date, trope, requête, seuil, signification des symboles, sources et crédits vérifiés. Ajoutez une description accessible et une interprétation étayée en mettant en avant les conditions et limites de vos hypothèses.']
];
export const workshop3Title = 'Une carte d’histoires, des choix à expliquer';
export const workshop3Intro = 'Travail individuel. Chaque étudiant choisit un trope, génère sa carte d’histoires dans Marawa et analyse son propre résultat. La visualisation est le point de départ d’une enquête sur la recherche, les sources, les licences et la représentation.';
export const workshop3Access = 'Ouvrez Exploration sans vous identifier : c’est l’accès public utilisé ici comme visiteur (« guest »). Aucun compte ni jeton n’est demandé.';
export const workshop3Method = 'Pour chaque réponse, associez une observation de votre carte, une notion du cours et une conséquence pour votre interprétation. Séparez faits observés, informations documentées et hypothèses. Une limite d’accès ou une absence de résultat est à documenter.';
export const workshop3Steps = [
 {id:'carte',number:'01',duration:'10 min',title:'Choisir un trope et générer la carte',instructions:[
  'Dans Exploration, saisissez un mot ou une phrase puis lancez « Find candidates ». Examinez les propositions, cochez un seul trope et validez avec « Submit ».',
  'Notez la formulation saisie, sa langue, le libellé exact du trope retenu, son identifiant ou lien et la date. Relevez le seuil « Similarity threshold » et les nombres d’histoires indiqués.',
  'Conservez une vue de référence avec la légende et les crédits visibles. Notez son cadrage et son zoom. Une URL seule peut ne pas conserver tous les réglages : consignez-les dans le carnet.'
 ],trace:'Une carte de référence, sa question et ses paramètres.'},
 {id:'similarite',number:'02',duration:'20 min',title:'Enquêter sur les tropes « similaires »',instructions:[
  'Reformulez la même idée, éventuellement dans une autre langue que vous maîtrisez, et comparez les listes de candidats : nombre, ordre, propositions communes et différences. Distinguez la recherche de candidats à partir de votre saisie de la recherche de voisins du trope finalement sélectionné.',
  'Revenez au même trope et changez uniquement le seuil, par exemple de 0,62 à 0,80 si ces valeurs sont disponibles. Conservez le nouvel état et relevez les tropes voisins, les histoires portant le trope, les histoires associées et celles sans localisation. Un résultat vide est une observation valable.',
  'Expliquez avec vos mots le passage des libellés aux vecteurs, puis au classement par proximité. Que mesure le score ? Examinez un rapprochement pertinent et un rapprochement contestable si les résultats le permettent.',
  'Tous les tropes que vous jugeriez similaires sont-ils proposés ? Distinguez seuil, limite du nombre de candidats ou de voisins, contenu de l’index et couverture documentaire. Une courte liste prouve-t-elle l’exhaustivité ? Précisez ce que l’interface permet de vérifier et ce qui demanderait une documentation du logiciel.'
 ],trace:'Deux formulations comparées et deux seuils à trope identique.'},
 {id:'licences',number:'03',duration:'20 min',title:'Décider ce que l’on peut réutiliser',instructions:[
  'Choisissez une histoire de votre carte. Retrouvez les résumés et les références accessibles depuis l’exploration. Distinguez le récit source, son édition ou sa traduction, les annotations Marawa et votre commentaire.',
  "Que pouvez-vous partager de ces résultats en fonction de l'utilisation que vous voulez en faire ? Remplissez le tableau ci-dessous."
 ]},
 {id:'representation',number:'04',duration:'20 min',title:'Interroger le fond de carte et les symboles',instructions:[
  'Identifiez le fournisseur du fond de carte grâce aux crédits. Examinez projection, centre, coupure du planisphère, place du Pacifique, échelle, relief, frontières actuelles et noms de lieux. Distinguez ce qui est visible de ce qui est confirmé par une documentation. Quels espaces paraissent centraux, petits, éloignés ou séparés ?',
  'Lisez la légende : que désignent un point, sa taille, sa couleur et un lien ? Plusieurs histoires partagent-elles une localisation ou un symbole ? Les liens indiquent-ils une proximité de tropes, une distance, un trajet ou une chronologie ? Appuyez votre réponse sur les informations disponibles.',
  'Reprenez le trope et le seuil choisis initialement. Créez une autre vue en changeant uniquement le cadrage ou le zoom ; vous pouvez aussi tester un réglage visuel disponible. Comparez la visibilité des îles, des regroupements, des liens et des superpositions. Si une autre projection n’est pas proposée, décrivez une alternative sans prétendre l’avoir testée.',
  'Que localisent les coordonnées : lieu du récit, de collecte, de publication, territoire approximatif ? Recherchez ce sens pour vos histoires. Repérez les histoires sans localisation et les biais de couverture : une zone vide indique-t-elle une absence d’histoires ou une absence de données représentées ?'
 ],trace:'Deux vues comparées et trois choix reliés à leurs effets sur la lecture.'},
 {id:'conclusion',number:'05',duration:'20 min',title:'Présenter une carte que l’on peut discuter',instructions:[
  'Choisissez votre vue finale et rédigez une légende autonome : question, trope, requête, date, seuil, symboles, sources et crédits vérifiés. Ajoutez quelques phrases décrivant la carte pour une personne qui ne peut pas la voir.',
  'Formulez une interprétation appuyée sur les histoires consultées en mettant en avant les conditions et limites de vos hypothèses.'
 ],trace:'Le carnet argumenté, les vues documentées et une présentation de trois minutes.'}
];
export const workshop3RightsCases = [
 ['Une capture de ma visualisation','Fond de carte et tuiles, annotations Marawa, textes et autres éléments visibles.'],
 ['Le texte d’un résumé Marawa','Résumé identifié, auteur ou crédit disponible, licence des annotations, copie ou adaptation.'],
 ['Le texte de la source d’une histoire','Document et édition précis, auteur, traducteur éventuel, statut ou licence propres à cette source.']
];
export const workshop3Deliverables = [
 'Un carnet Markdown avec les observations, les six décisions de réutilisation, leurs preuves et la conclusion ; une sauvegarde JSON pour reprendre le travail.',
 'Vos vues légendées, dans les conditions établies par votre analyse des droits ; à défaut, les liens, réglages et descriptions motivant cette limite. Les images sont remises séparément : le carnet ne les enregistre pas.',
 'Une restitution orale de trois minutes : votre trope et votre carte, un rapprochement discuté, une décision sur les droits et un choix de représentation.'
];
export const workshop3Criteria = [
 ['Recherche traçable','Les requêtes, le trope, les paramètres et les comparaisons permettent de comprendre la sélection et ses limites.'],
 ['Droits argumentés','Les six décisions distinguent capture, résumé et source ; elles citent des preuves et signalent les informations manquantes.'],
 ['Lecture critique','Les choix du fond et des symboles sont reliés à des effets précis ; les lacunes et les limites d’interprétation sont explicites.']
];
export const liveSteps3 = [
 {id:'notice',number:'01',title:'Lire une notice',route:'stories',access:'Compte invité, contributeur ou administrateur',text:'Choisir une histoire dans Marawa. Repérer sa référence, ses personnes créditées, ses lieux, ses dates, ses deux niveaux de résumé et ses annotations. Identifier comment revenir au document original.',question:'Qu’est-ce qui vient du document et qu’est-ce qui résulte du travail d’annotation ?'},
 {id:'search',number:'02',title:'Rechercher dans les résumés',route:'stories',access:'Compte invité, contributeur ou administrateur',text:'Choisir une formulation à partir de la question du groupe. Observer les champs interrogés par la recherche textuelle, puis changer la formulation et les filtres. Lire les résultats et les notices écartées.',question:'La recherche a-t-elle retrouvé des formes présentes ou des histoires pertinentes pour la question ?'},
 {id:'tropes',number:'03',title:'Explorer à partir des tropes',route:'exploration',access:'Exploration simple accessible sans compte',text:'Formuler une recherche, examiner les tropes proposés et en sélectionner un. Comparer les histoires qui possèdent ce trope et celles reliées par des tropes similaires. Revenir aux annotations pour expliquer le rapprochement.',question:'Le lien repose-t-il sur une annotation identique ou sur une proximité calculée ?'},
 {id:'map',number:'04',title:'Lire la carte des histoires',route:'exploration',access:'Exploration simple accessible sans compte',text:'Examiner les localisations et la légende, puis comparer deux seuils de similarité. Consulter aussi la liste des histoires non localisées. Vérifier ce que désignent les coordonnées dans les notices.',question:'Ce qui manque sur la carte manque-t-il aussi dans le corpus ?'},
 {id:'graph',number:'05',title:'Lire le graphe des termes',route:'semantic-graphs',access:'Démonstration avec un compte administrateur',text:'Choisir le catalogue de termes à représenter. Examiner le sens des nœuds, les scores, le seuil et la limite de liens par nœud. Modifier un paramètre puis revenir aux histoires associées.',question:'Que mesure un lien, et que permet réellement de conclure le regroupement visuel ?'},
 {id:'roles',number:'06',title:'Observer les droits d’accès',route:'exploration',access:'Présentation des différents rôles par l’enseignant',text:'Comparer les fonctions disponibles sans compte, avec un compte invité, contributeur et administrateur. Repérer la portée des territoires attribués et les outils de validation des annotations.',question:'Qui peut consulter, modifier, valider et mettre la base à disposition ?'}
];
export const roles3 = [
 {id:'anonymous',label:'Sans compte',rights:'Exploration simple des tropes et des histoires sur la carte.',limits:'Pas d’accès aux écrans Dataset et Stories ; pas de modification.'},
 {id:'guest',label:'Invité',rights:'Exploration simple ; consultation de Dataset, des histoires et de leurs annotations en lecture seule.',limits:'Pas de création, de modification ni de gestion des catalogues.'},
 {id:'contributor',label:'Contributeur',rights:'Consultation et exploration de toutes les histoires ; mode Expert ; création et modification d’histoires dans les territoires attribués ; proposition de tropes et de mots-clés.',limits:'Sans territoire attribué : lecture seule des histoires. La création de thèmes et la gestion des catalogues sont réservées aux administrateurs.'},
 {id:'admin',label:'Administrateur',rights:'Gestion des comptes et des territoires ; import et export CSV ; reconstruction des index ; gestion des catalogues ; traitement des révisions ; graphes sémantiques.',limits:'Les décisions doivent rester traçables. L’application examinée ne propose pas de suppression individuelle des histoires.'}
];
