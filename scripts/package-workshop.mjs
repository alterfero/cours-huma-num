import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { documents, workshopFields, metadataGuides } from '../public/content.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const folder = new URL('../public/assets/chapitre1/atelier/', import.meta.url);
await mkdir(folder, { recursive: true });
const photo = documents[0];
const image = new URL('../public' + photo.url, import.meta.url);
const original = await readFile(image);
const hash = createHash('sha256').update(original).digest('hex');
const instructions = `ATELIER 1 — ENQUÊTER SUR UNE IMAGE

Une seule pièce documentaire : ${photo.file}
Photo : Takurua Parent / DIG4EL · © 2025 · CC BY-NC-ND 4.0.

1. Conservez le JPEG original ; travaillez à partir d’une copie.
2. Observez l’image et relevez la mention en bas à droite.
3. Examinez les métadonnées EXIF, IPTC et XMP intégrées au fichier avec un
   lecteur adapté. Suivez le guide Mac ou Windows fourni ci-dessous.
4. Confrontez les indices de l’image, du nom de fichier et des métadonnées.
   Recherchez des sources complémentaires pour vérifier vos hypothèses.
5. Remplissez fiche-carnet.md. Pour chaque affirmation, citez le détail visible,
   le nom et la valeur du champ de métadonnées ou la source externe consultée
   (avec date de consultation). Signalez ce qui reste inconnu ou contradictoire.
6. Présentez vos résultats, une incertitude et la prochaine vérification proposée.

Le JPEG inclus est le fichier fourni pour le cours, sans modification.
Ses métadonnées restent intégrées ; aucune capture d’écran ou réexportation
n’est nécessaire. Les autres fichiers de ce dossier sont des consignes et
un carnet vierge, pas des pièces documentaires supplémentaires.

GUIDES DE LECTURE DES MÉTADONNÉES — MAC ET WINDOWS
Téléchargement officiel : https://exiftool.org/
Installation : https://exiftool.org/install.html

${metadataGuides.map(guide => guide.title + '\n' + guide.steps.map((step, i) => `${i + 1}. ${step.text}${step.command ? '\n   ' + step.command : ''}`).join('\n\n')).join('\n\n')}

Options : -G1 indique le groupe ; -a conserve les champs de même nom ;
-s affiche les noms techniques. Ces commandes lisent le JPEG sans le modifier.
Si un lecteur ne montre pas un champ, cela ne prouve pas son absence.

SHA-256 du JPEG original : ${hash}
`;
const notebook = `# Carnet — Humanités numériques

Atelier 1 · Enquête photographique · Travail en binômes

Pièce : ${photo.file}

## Usage envisagé, public et question

À quel public vous adressez-vous et pour quel usage ? Quelle question posez-vous ?

| Rubrique | Votre réponse, ses appuis et ses limites |
| --- | --- |
${workshopFields.map(([,label,prompt])=>`| **${label}** — ${prompt} | À renseigner |`).join('\n')}

Pour chaque réponse, citez un détail visible, un champ de métadonnées (nom et valeur) ou une référence externe (avec date de consultation). Distinguez observations, informations vérifiées et hypothèses.
`;
await writeFile(new URL('LISEZ-MOI.txt', folder), instructions);
await writeFile(new URL('fiche-carnet.md', folder), notebook);
// Archive explicite : une seule pièce, sans réencodage ni modification du JPEG.
const zip = spawnSync('python3', ['-c', `import sys,zipfile
with zipfile.ZipFile(sys.argv[1], 'w', zipfile.ZIP_DEFLATED) as z:
    for file in sys.argv[2:]:
        z.write(file, file.rsplit('/', 1)[-1])
`, 'public/assets/atelier-chapitre-1.zip', fileURLToPath(image), fileURLToPath(new URL('LISEZ-MOI.txt', folder)), fileURLToPath(new URL('fiche-carnet.md', folder))], { cwd: root, stdio: 'inherit' });
if (zip.error) throw zip.error;
if (zip.status !== 0) process.exit(zip.status || 1);
console.log('Atelier 1 : JPEG original, consignes et carnet vierge regroupés.');
