# Humanités numériques — cours de master

Support local, autonome et déployable sur Railway. Interface de musée numérique en français. Le parcours comprend neuf séquences, dont deux synthèses courtes.

Les chapitres 1 à 6 sont rédigés et interactifs. Les chapitres 7 et 8 sont des synthèses courtes sur l’accessibilité et la transparence des contenus générés par IA, avec exercices de vérification. Le chapitre 9, « LLM et agents IA », aborde la connaissance paramétrique et le raisonnement, la coordination entre agents et la recherche documentaire avec un LLM.

## Démarrer localement

Prérequis : Node.js 22 ou version ultérieure. Aucune dépendance à installer.

```sh
npm start
```

Ouvrir http://localhost:3000. Le serveur écoute par défaut sur toutes les interfaces pour permettre un usage en salle. Pour limiter l’accès à cet ordinateur :

```sh
HOST=127.0.0.1 npm start
```

Choisir un autre port : `PORT=3100 npm start`. Arrêter avec Ctrl+C. `npm run dev` redémarre le serveur lors d’une modification de son code ; recharger le navigateur après une modification des fichiers du site.

Les pages, images, schémas et expériences intégrées fonctionnent sans Internet lorsque le serveur local est lancé. Les démonstrations et l’atelier du chapitre 3 utilisent Marawa en direct et demandent une connexion ; les fonctions accessibles dépendent du compte. La publication et le test de lecture de l’atelier 6, les références externes et le lecteur Internet Archive demandent également une connexion. Ce lecteur ne contacte Internet Archive qu’après activation ; aucune vidéo n’est copiée dans le chapitre 6. Ce site n’installe pas de cache hors ligne : une URL Railway nécessite une connexion pour charger le cours.

## Contenu disponible

- Accueil et plan des neuf chapitres.
- Chapitre 1 : notions, chaîne documentaire à partir d’une carte postale réelle de Tahiti (SPAA / Ana’ite, Z14-003-00770, correspondance du 19 janvier 1929), 12 repères historiques sourcés, regard critique. Recto et verso locaux sous CC BY-NC-SA ; provenance et conventions dans `public/assets/chapitre1/NOTICE.txt`.
- Laboratoire : UTF-8 et ruban pédagogique ; résolution et quantification ; échantillonnage du fichier `audio/tahiti_que_tu_es_belle.wav`, comparaison à cadence constante et zoom sur 20 ms. Une copie identique est servie dans `public/assets/chapitre1/audio/` ; le sous-échantillonnage sans filtre et le maintien des valeurs sont calculés dans le navigateur.
- Projection : 13 écrans, flèches du clavier, plein écran sans notes d’animation.
- Atelier 1 : une seule photographie réelle, `Takurua_Parent_2025_Rapa_1.jpg`, affichée et téléchargeable avec ses métadonnées d’origine ; tableau d’enquête, carnet et critères de restitution.
- Export Markdown et sauvegarde/reprise JSON du carnet.
- Cinq questions de révision avec export des réponses, sans corrigé ni notation automatique.
- Chapitre 2 : numérisation des productions linguistiques humaines, prise de son, diarisation, transcription, alignement, segmentation, gloses et traduction ; logiciels présentés par objectif : segmenter, diariser et transcrire (Audacity, PRAAT, ELAN), annoter le lexique et les gloses (FLEX, PLAID), interpréter les productions (DIG4EL).
- Exemple réel : « L’origine du kong Hulup », corpus iaai de Pangloss, voix de Taï Waheo. La section du cours renvoie directement vers Pangloss. Le laboratoire et la projection conservent le lecteur local du MP3 intégral, 23 segments et 229 unités W tirés du XML ; couches transcription, gloses et traduction masquables. Quatre manipulations françaises fictives complémentaires sont accessibles dans le laboratoire.
- Atelier 2 : mise en situation collective en neuf étapes, de l’enregistrement du résumé de la matinée à l’analyse dans PLAID ; consentement oral, licence, réglages, métadonnées, contrôle qualité, diarisation, transcription et traduction. Démonstration de DIG4EL séparée. Consignes imprimables.
- Le démonstrateur temporel du laboratoire 2 conserve ses exports CSV et EAF.
- Projection du chapitre 2 : 11 écrans, incluant le récit réel et une manipulation temporelle.
- Chapitre 3 : « Explorer de grands corpus », entièrement construit autour de Marawa : documents et annotations, licences, recherche formelle, vectorisation des termes, représentations et rôles.
- Laboratoire 3 : guide d’observation dans Marawa en direct, en six étapes. Aucun exemple ni corpus embarqué.
- Atelier 3 : travail individuel dans Marawa sans identification ; carte autour d’un trope librement choisi, comparaison des formulations, des seuils et des cadrages, six décisions de réutilisation et analyse des représentations. Carnet local, exports Markdown/JSON, reprise validée et dossier ZIP de consignes.
- Projection du chapitre 3 : 12 écrans conceptuels avec liens vers les écrans Marawa pour les démonstrations en direct.
- Chapitre 4 : images, objets, numérisation, OCR, IIIF et annotations spatiales.
- Trois démonstrations : sorties OCR brutes, visionneuse IIIF et annotation de zones.
- Atelier 4 : page de Te Vea no Tahiti du 10 janvier 1856 et deux faces d’une carte de Moorea (SPAA / Ana’ite), carnet, annotations et dossier ZIP sans corrigé.
- Projection du chapitre 4 : 8 écrans.
- Chapitre 5 : archives sonores, PARADISEC Soundscape, Glossopticon, index temporel et conservation.
- Trois démonstrations : lecteur avec enveloppe et spectrogramme calculés, carte et catalogue filtrables, calculateur de volume PCM et compressé.
- Atelier 5 : trois sons fictifs distincts, alternatives textuelles, repères vierges, carnet, exports et reprise JSON. Projection de 8 écrans.
- Chapitre 6 : archive vidéo d’Opunohu, droits, volume et compression, sous-titres, streaming, VR et AR ; photographies et figure scientifique sous licences ouvertes.
- Laboratoire 6 : calculateur de volume vidéo. Atelier collectif d’une heure : micro-documentaire de 30 secondes, voix off, copie compressée, sous-titres SRT et publication sous licence sur Internet Archive. Projection de 9 écrans.
- Chapitre 7 : accessibilité aux personnes en situation de handicap — alternatives textuelles, transcription, sous-titres, audiodescription, contrastes, structure et clavier ; vérification en binômes.
- Chapitre 8 : génération de contenus — article 50 de l’EU AI Act, distinction des acteurs et exceptions, règle pédagogique de double marquage, métadonnées IPTC/XMP, C2PA et contrôle des exports. Références vérifiées le 13 novembre 2026.
- Les deux synthèses signalent leur rédaction assistée par IA et renvoient à `public/assets/chapitres-7-8-provenance.json`.
- Le chapitre 9 illustre le RAG avec DIG4EL, qui sélectionne dans un corpus des exemples pertinents pour le point de grammaire choisi.
- Glossaire filtrable, références et crédits.

Les brouillons et les repères de lecture sont locaux au navigateur et à l’origine du site. Ils ne sont pas synchronisés. Exporter le JSON pour passer d’un ordinateur ou d’une URL à l’autre. Aucun compte, service d’IA ou analyse d’audience.

## Personnaliser et poursuivre

- `public/content.js` : paramètres du cours, programme, frise, sources, quiz, glossaire.
- `public/app.js` : navigation, pages du chapitre 1 et projection.
- `public/chapter2.js`, `public/chapter2-content.js` : chapitre 2, atelier, démonstrations et références.
- `public/chapter7.js`, `public/chapter8.js` : synthèses, exemples, exercices courts et références.
- `public/annotation.js` : validation des annotations et exports CSV/EAF.
- `public/style.css` : identité visuelle, responsive et impression.
- `public/assets/chapitre1/` : carte postale du cours et JPEG original de l’atelier 1 ; `atelier/` contient les consignes et le tableau vierge. `public/assets/fonds/` conserve les anciens exercices fictifs, qui ne sont plus utilisés dans l’atelier 1.
- `public/assets/NOTICE-NIST.txt` : provenance et conditions de l’image historique.

L’en-tête présente le logo de l’Université de la Polynésie française fourni pour le cours, le nom Sébastien Christian et l’année universitaire 2026-2027. Ces informations sont définies dans `public/content.js` ; le logo est conservé dans `public/assets/logo_UPF.png`. L’intitulé du master est « Master MEEF PIF ».

## Vérifier

```sh
npm run check
npm test
```

Les tests couvrent l’UTF-8, la quantification, le repliement spectral, la cohérence des références et le serveur (dont la restriction des fichiers servis au répertoire public).

## Déployer sur Railway

La mise en ligne n’a pas été effectuée. Le projet contient un Dockerfile sans dépendance applicative et `railway.json`.

1. Placer ce dossier dans un dépôt Git et le connecter à un service Railway, ou le déployer avec le CLI Railway depuis ce dossier (`railway up` après sélection du projet/service).
2. Railway utilise le Dockerfile et lance `node server.mjs`.
3. L’application écoute sur `0.0.0.0` et utilise la variable `PORT` fournie par Railway.
4. Générer un domaine dans les paramètres réseau du service pour rendre le cours accessible.
5. Le contrôle de santé appelle `/healthz` ; il doit répondre `200` avec `ok`.

Aucun volume ni base de données ne sont nécessaires. Les carnets restent sur les appareils des étudiants. Ne pas utiliser le stockage local du navigateur comme remise institutionnelle de devoir : demander les exports.

Documentation vérifiée le 6 novembre 2026 :
- https://docs.railway.com/builds/dockerfiles
- https://docs.railway.com/deployments/healthchecks

## Recréer le ZIP du fonds après modification

Cette commande nécessite Python 3, en complément de Node.js. Python n’est pas nécessaire pour consulter ou héberger le site.

```sh
npm run package:workshop
```

## Principes de réalisation

HTML, CSS et modules JavaScript natifs. Pas de bibliothèque externe, de police distante, de clé API ni de processus de compilation. Le serveur Node sert uniquement les fichiers publics. Les schémas originaux ne sont pas des reproductions d’objets historiques ; les textes le précisent.

## Séparation des contenus

Le site public est exclusivement destiné aux étudiants. Il ne contient ni guide enseignant, ni notes d’animation, ni corrigé d’atelier ou de questionnaire.

L’atelier 1 utilise uniquement `public/assets/chapitre1/Takurua_Parent_2025_Rapa_1.jpg`. Le site sert directement ce fichier, sans réencodage, afin de préserver ses métadonnées EXIF/IPTC/XMP et sa mention visible. `npm run package:workshop` crée un ZIP contenant ce même JPEG, les consignes et le tableau vierge, sans les anciennes pièces fictives. Les champs du tableau sont définis dans `public/content.js`. Le brouillon et les sauvegardes de cette enquête sont séparés de l’ancien atelier fictif (`hn-atelier-photo-v1`, sauvegarde version 2 liée à l’identifiant de l’image).

`npm run package:workshop` régénère les documents textuels, l’inventaire et les notices à partir de ces mêmes données, puis reconstruit le ZIP. Les fichiers texte comportent des délimiteurs explicites autour du document ; les consignes figurent dans la fiche de travail et dans le fichier LISEZ-MOI.

## Chapitre 2 — numériser la parole

Pages : `#/chapitre/2`, `#/laboratoire/2`, `#/atelier/2`, `#/projection-chapitre-2/0`.

Le fil conducteur est « L’origine du kong Hulup », corpus iaai de Pangloss. La voix est celle de Taï Waheo ; les notices créditent Françoise Ozanne-Rivierre pour la recherche et le dépôt, Wadawa Hnyigootr pour la traduction. Les fichiers téléchargés le 9 novembre 2026 sont conservés sans modification sous `public/assets/chapitre2/pangloss/`. La notice distingue la licence du son (CC BY-NC-ND 2.5) de celle des annotations (CC BY-NC-SA 2.5). Voir `NOTICE.txt` et les notices OLAC originales. Les commentaires du cours restent séparés des annotations archivées.

`public/pangloss.js` fournit le lecteur à couches masquables du laboratoire et de la projection. La section « Examiner une ressource réelle » du cours conserve son titre et un lien vers Pangloss ; son lecteur intégré et ses commentaires ont été retirés. Les boutons d’écoute utilisent les temps du XML dans le MP3 intégral, sans créer de clips. `public/pangloss-data.js` et `pangloss/data.json` contiennent les données préparées et les empreintes des sources. Le XML fournit 23 éléments S et 229 W, sans minutage des mots ni piste de locuteurs. La durée du MP3 est calculée à partir du nombre de trames valides indiqué par `afinfo`.

`python3 scripts/prepare-chapter2-pangloss.py` reconstruit ces données depuis les fichiers locaux (Python standard et `afinfo` de macOS requis seulement à la préparation). `npm run package:workshop2` conserve la possibilité de reconstruire l’ancien dossier Pangloss (Python 3 requis pour l’archive) ; ce ZIP n’est plus proposé dans l’atelier collectif.

L’atelier 2 porte désormais sur un enregistrement réalisé en classe : un étudiant résume sa matinée en une minute, un autre l’enregistre. La page accompagne les neuf étapes jusqu’aux exemples de gloses IGT, de lexique et d’analyse dans PLAID, puis propose une démonstration séparée de DIG4EL. Les annotations sont réalisées dans les logiciels indiqués. L’ancien éditeur Pangloss et son carnet ne sont plus affichés dans l’atelier ; leurs sauvegardes locales ne sont ni effacées ni réutilisées pour ce nouveau travail. La dernière diapositive du chapitre et le lien vers l’atelier suivent ce déroulé.

Le chapitre et l’atelier ont été confrontés le 9 novembre 2026 aux guides PARADISEC (formats et gestion des données, édition de mai 2026), CNIL, CORINTE/ICAR, GIDA/CARE, Creative Commons, Cambridge et à la documentation linguistique de Heidi Johnson. Les références sont intégrées au cours. Les compléments portent sur le consentement documenté et révocable, la gouvernance collective, les originaux et dérivés, les sauvegardes, la révision linguistique et la restitution avant diffusion. Le réglage WAV PCM 48 kHz / 24 bits est présenté comme un choix pour l’atelier, distinct des exigences d’une archive.

Les quatre manipulations complémentaires utilisent des exemples français fictifs, sans service distant. Le démonstrateur temporel conserve sa voix de synthèse et son WAV. Les anciens fichiers de l’atelier fictif sont conservés sur disque mais ne sont plus utilisés dans l’atelier ni son ZIP.

## Chapitre 3 — Explorer de grands corpus

Pages : `#/chapitre/3`, `#/laboratoire/3`, `#/atelier/3` et `#/projection-chapitre-3/0`.

Tout le chapitre s’appuie sur Marawa. Les exemples et manipulations se font dans le logiciel en direct : aucun récit, résumé, catalogue d’annotations, vecteur ou démonstrateur local n’est intégré au cours. Le guide de séance ouvre les écrans utiles et précise les accès requis.

Le contenu a été vérifié le 10 novembre 2026 dans le projet Marawa : `docs/csv_contract.md`, `frontend/src/pages/StoriesPage.tsx`, `backend/app/services/search_service.py`, `backend/app/compute/embeddings.py`, `backend/app/services/visualizations.py`, les routes API et `frontend/src/App.tsx`. Le code actuel a priorité sur certaines spécifications historiques : il vectorise les thèmes, tropes et mots-clés et applique les rôles et les territoires. Le cours distingue les notions générales d’index inversé et de recherche booléenne du test de présence d’une chaîne actuellement utilisé dans Stories. Le modèle par défaut est `sentence-transformers/paraphrase-multilingual-mpnet-base-v2` (768 dimensions) ; aucune affirmation n’est faite sur une configuration de production non vérifiée.

Les annotations sont sous **CC BY-NC-SA**, selon l’indication du responsable du cours ; la version n’a pas été précisée. Les droits des documents originaux sont distincts. Aucune copie des données Marawa n’est distribuée.

`public/chapter3-content.js` contient les références, étapes du guide, rôles, consignes de l’atelier et champs du carnet ; `public/chapter3.js` porte le cours, la projection et les interfaces ; `public/marawa.js` valide et exporte les notes. L’atelier individuel utilise la clé locale `hn-atelier3-marawa-carte-v2` et l’édition `marawa-carte-2026-11-11-v2`. Les anciens carnets de sélection d’histoires et de corpus fictif restent intacts ; leurs sauvegardes ne sont pas réinterprétées. Le JSON contient uniquement les notes de l’étudiant. Les captures et l’état de la carte ne sont pas sauvegardés par le cours.

`npm run package:workshop3` régénère les consignes, le carnet vierge avec tableaux de travail, la notice et le ZIP de trois fichiers. Les consignes du site et du dossier proviennent des mêmes données. L’atelier se déroule entièrement dans l’exploration publique, sans login ni jeton, avec une connexion Internet. L’accès public, la recherche de candidats et la génération d’une carte ont été vérifiés le 11 novembre 2026. « Guest » désigne ici le visiteur sans connexion ; le rôle Invité avec compte est distinct. Les notices complètes et les graphes de la démonstration du laboratoire conservent leurs conditions d’accès propres.

L’étudiant produit une carte de référence, compare deux seuils pour le même trope puis explore une autre vue en conservant le trope et le seuil choisis initialement. Il documente deux formulations de sa requête, les lacunes du corpus, six décisions de réutilisation (capture, résumé et source, en contextes commercial et non commercial), les crédits et les effets du fond de carte et des symboles. Les décisions restent à argumenter, sans corrigé prérempli. Les références Creative Commons et OpenStreetMap ont été consultées le 11 novembre 2026 ; la version de licence des annotations Marawa demeure non précisée. Les images se remettent séparément selon les droits établis, avec une alternative documentée lorsqu’une reproduction n’est pas possible.

## Chapitre 4 — images, objets et IIIF

Pages : `#/chapitre/4`, `#/laboratoire/4`, `#/atelier/4` et `#/projection-chapitre-4/0`. Le chapitre partage une séquence avec les chapitres 5 et 6.

`public/chapter4-content.js` contient les notices et les références ; `public/chapter4.js` le cours et ses interfaces ; `public/images.js` les structures IIIF, les validations et les exports Web Annotation. Le carnet est enregistré sous `hn-atelier4-pacifique-v2`, avec l’édition `archives-pacifique-v2`. Les sauvegardes fictives antérieures restent intactes et ne sont pas réinterprétées. Les nouveaux identifiants de Canvas D4-P01 à D4-P03 et A4-P01 à A4-P03 évitent de réaffecter les anciennes annotations à d’autres images. Les annotations doivent être enregistrées avant une sauvegarde JSON ; les brouillons du formulaire d’annotation ne sont pas conservés. Les notes du carnet sont enregistrées au fil de la saisie.

Le chapitre utilise des archives réelles du SPAA diffusées par Ana’ite (UPF) : la carte « 41. – Tahiti. – Papeete », Z14-003-00846, les premières vues des PDF de Te Vea no Tahiti des 3 et 10 janvier 1856, et la carte « Coucher de Soleil sur Moorea », Z14-003-00770, déjà présentée au chapitre 1. Les notices annoncent CC BY-NC-SA sans version précisée. Les JPEG des cartes sont conservés à l’identique, marques comprises ; les pages de journal sont rendues en JPEG à largeur 1 600 pixels. Les sources et leurs notices publiques sont dans `public/assets/chapitre4/sources/` ; `NOTICE.txt` et `provenance.json` documentent les transformations et empreintes. Journal et carte sont rapprochés pour l’exercice, sans lien historique établi. Le manifeste IIIF est produit par le cours et ne provient pas d’Ana’ite.

L’OCR est réellement calculé par Tesseract, modèle français `tessdata_fast`, moteur LSTM et segmentation automatique. Son application au tahitien est explicitement présentée comme une limite : aucune mesure de précision linguistique n’est fournie. Les variantes de la page du 3 janvier sont une réduction à 240 pixels et une rotation antihoraire de 9° avec canevas agrandi. `ocr.json` conserve les sorties brutes non révisées, les positions, les paramètres et les empreintes des entrées et du modèle. La faible définition ne produit aucun mot ; cet échec est conservé. Les anciennes pièces fictives restent sur disque mais ne sont plus utilisées par le cours ni incluses dans le ZIP.

Les sorties OCR sont précalculées pour fonctionner hors ligne. Le curseur de confiance et la sélection des mots modifient uniquement leur visualisation. Aucun moteur OCR ni modèle d’IA n’est exécuté dans le navigateur ou sur Railway.

Le serveur fournit réellement :
- `/iiif/4/demo/manifest.json` et `/iiif/4/atelier/manifest.json` : Presentation 3 ;
- les Canvas, AnnotationPage et annotations painting référencés ;
- `/iiif/image/<ID>/info.json` : Image 3, niveau 0 ;
- les images entières en JPEG, taille native (`full/max/0/default.jpg`) et largeur de 600 pixels lorsque la source est plus grande (`full/600,/0/default.jpg`).

Les tailles natives annoncées dans `sizes` sont aussi acceptées sous la forme `full/<largeur>,/0/default.jpg`. Les requêtes non prises en charge renvoient 404. Aucun recadrage arbitraire, rotation ou tuilage n’est annoncé. Les routes IIIF ajoutent CORS. Les manifestes et images utilisent l’origine du serveur ; le protocole transmis par le proxy Railway est pris en compte. La variable facultative `PUBLIC_ORIGIN=https://votre-domaine` permet de fixer les identifiants canoniques. Une exportation de manifeste ne copie pas les images : leurs URL doivent rester accessibles. Les annotations étudiantes sont exportées séparément et ne sont pas publiées par le serveur.

`npm run package:workshop4` reconstruit le ZIP de 12 fichiers : trois images, OCR TXT/TSV, notices, carnet, consignes, PDF original du journal et instantanés des notices. Pour recréer les dérivés et l’OCR sur macOS : `node scripts/generate-chapter4-assets.mjs`, avec Poppler (`pdftoppm`), Python/Pillow, `sips`, Tesseract et un modèle `fra.traineddata` dans `HN_OCR_DIR` (par défaut `/private/tmp/hn-c4-ocr-model`). Ce script fonctionne à partir des sources archivées, sans téléchargement. Ensuite, reconstruire le ZIP et lancer les tests. Ces outils de préparation ne sont pas nécessaires pour consulter ou héberger le site.

## Chapitre 5 — Te Hua Riirii : numérisation et réutilisation

Pages : `#/chapitre/5`, `#/laboratoire/5`, `#/atelier/5`, `#/projection-chapitre-5/0`.

Le cours suit quatre étapes : découverte de la chanson et de sa notice ; paramètres de numérisation, encodage et stockage ; droits de téléchargement, diffusion et transformation ; atelier de recherche et de production d’un extrait. Le mode projection reprend ce parcours en sept vues. Le laboratoire regroupe la comparaison audio et le calculateur.

Les fichiers fournis dans `audio/archive` sont copiés sans modification sous `public/assets/chapitre5/te-hua-riirii/`. Le FLAC contient 44,1 kHz / 16 bits / stéréo. Le MP3 8 kbit/s contient 24 kHz / mono : il ne permet pas d’isoler le seul effet du codec. Les captures `flac.png` et `8kbps.png` ont des axes différents ; leurs limites sont expliquées. Le MP3 VBR de l’archive (~199 kbit/s) reste distinct du MP3 théorique à 256 kbit/s.

`public/chapter5-media.js` et `media.json` consignent les mesures Core Audio (`afinfo`), tailles et SHA-256. Les relevés bruts sont conservés à côté des fichiers. Le serveur gère le type `audio/flac` et les requêtes Range pour l’écoute et le déplacement dans le son.

Pour une heure en 44,1 kHz / 16 bits / stéréo : WAV PCM 635,04 Mo ; FLAC environ 314,8 Mo par extrapolation de cette piste (aucune taille universelle) ; MP3 256 kbit/s environ 115,2 Mo. Le calculateur emploie des unités décimales, un rapport FLAC ajustable et n’estime pas la qualité sonore.

La notice Internet Archive a été consultée le 13 novembre 2026 : aucun champ de licence ou de droits, ni permission dans la description. Le relevé utile est conservé dans `archive-notice.json`, sans coordonnées du déposant. Cette préparation locale ne vaut pas autorisation de mise en ligne publique des sons : établir les droits avant de publier le support avec ces médias, ou retirer les copies audio et conserver le lien vers la notice. Les sources juridiques distinguent le guide polynésien et les textes nationaux.

L’atelier ne présélectionne aucune piste. Les étudiants trouvent un audio sur archive.org, justifient la permission, découpent 15–30 secondes (consigne pédagogique, pas une exception légale), exportent un WAV PCM et un MP3 à 256 kbit/s, puis remettent l’original intact, les deux extraits et `NOTICE.md`. Les consignes précisent qu’un WAV issu d’un MP3 ne restaure pas les pertes.

`npm run package:workshop5` régénère un ZIP contenant uniquement les consignes, une notice vierge et trois dossiers vides. Le carnet du site sauvegarde les textes sous `hn-atelier5-archive-v2`, avec exports Markdown et JSON et reprise d’un JSON validé ; aucun audio étudiant n’est téléversé. Les anciennes sauvegardes `hn-atelier5-v1` sont préservées. Les anciens fichiers fictifs, fonctions de compatibilité et leur générateur restent disponibles pour les anciens travaux, mais ne figurent plus dans le parcours courant. L’ancienne interface et son ZIP sont conservés sous `artifacts/chapter5-before-te-hua-20261113/`.

## Chapitre 6 — archives vidéo, VR et AR

Pages : `#/chapitre/6`, `#/laboratoire/6`, `#/atelier/6`, `#/projection-chapitre-6/0`. Le chapitre est disponible dans le programme et la navigation.

Le fil conducteur est « Si je t’oublie Opunohu — Les chemins de la culture à Moorea », réalisé par Yannick Fer et Gwendoline Malogne-Fer (2015). La notice Internet Archive annonce CC BY-NC-ND 3.0 France. Le cours distingue téléchargement, partage intact non commercial, adaptation et contrats de plateformes ; il ne réutilise pas ce film pour le sous-titrage de l’atelier. Le relevé du 13 novembre 2026, sans coordonnées du déposant, se trouve dans `public/assets/chapitre6/sources/archive-notice.json`. Les dimensions, durées et tailles viennent de l’inventaire, pas d’une analyse indépendante du master. Le lecteur externe est activable explicitement, sans requête tierce préalable. Aucun film n’est inclus dans le site ni le ZIP.

Les acquis de l’audio sont repris : originaux et dérivés, métadonnées, droits, sauvegardes, compression avec ou sans perte. Le calculateur distingue images brutes, audio PCM 48 kHz/16 bits/stéréo, FFV1 selon un rapport hypothétique modifiable et copie de diffusion avec audio à 128 kbit/s. Les unités sont décimales. Le débit vidéo cible reste indépendant de la définition : changer les pixels à débit fixé affecte la qualité, pas la taille théorique. Les en-têtes et surcoûts réseau sont exclus.

Les illustrations locales sont : Cardboard (Runner1928, CC BY-SA 3.0), HTC Vive (Mauricio Pesce, CC BY 2.0), figure 1 de l’article de Burrell 2023 sur Glossopticon (CC BY 4.0, image extraite du PDF), visuel Augment (ChristinaC., CC BY-SA 4.0). Transformations, sources et empreintes figurent dans `NOTICE.txt` et `provenance.json`. Le chapitre distingue photographie, figure publiée et visuel promotionnel. Les exemples historiques incluent également Mona Lisa: Beyond the Glass et Skin & Bones, avec liens institutionnels ; leur disponibilité actuelle n’est pas présumée.

L’analyse YouTube repose sur les conditions consultées. Pour Facebook, la page courante était bloquée par un écran de connexion ; l’annexe A du rapport Meta déposé le 1er octobre 2025 sert d’appui daté, explicitement distingué des conditions à vérifier avant tout dépôt. Les alternatives proposées sont une instance PeerTube identifiée, un service institutionnel tel ESUP-Pod ou un serveur maîtrisé ; aucun service UPF particulier n’est supposé disponible.

L’atelier collectif d’une heure suit un seul film de 30 secondes, du tournage d’un objet avec voix off au test du lien public sur Internet Archive. La classe transfère l’original sur ordinateur, mesure le gain obtenu avec HandBrake et crée la piste SRT dans Subtitle Edit. Une personne publie le MP4 et le SRT avec la licence convenue. Une autre vérifie l’accès et la synchronisation hors du compte de dépôt. Le carnet garde la trace des réglages et du résultat du test.

Clé de stockage : `hn-atelier6-video-v1`, édition `video-vr-ar-2026`. Le carnet conserve les notes sur cet appareil et permet de les exporter en JSON ou en Markdown. Les anciennes sauvegardes JSON restent compatibles. Les fichiers JSON sont validés et l’interface échappe les textes saisis. Aucun corrigé ni contenu enseignant n’est publié.

`npm run package:workshop6` reconstruit les consignes, modèles vierges et ZIP, sans média. `public/chapter6-content.js` contient sources et consignes partagées ; `public/chapter6.js` les vues et interactions ; `public/video.js` les calculs, validations et exports.
