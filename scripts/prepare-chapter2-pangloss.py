"""Prépare la vue du cours depuis les fichiers Pangloss inchangés, sans réseau.
Python standard + afinfo (macOS) pour relever les paramètres du MP3.
"""
from pathlib import Path
import hashlib, json, re, subprocess
import xml.etree.ElementTree as ET

root = Path(__file__).resolve().parents[1]
folder = root / 'public/assets/chapitre2/pangloss'
xml = ET.parse(folder / 'crdo-IAI_HULUP.xml').getroot()
segments = []
for i, s in enumerate(xml.findall('S'), 1):
    a = s.find('AUDIO')
    segments.append(dict(id=s.attrib['id'], label=f'S{i}', start=float(a.attrib['start']), end=float(a.attrib['end']),
        form=s.findtext('FORM'), translation=s.findtext('TRANSL'),
        words=[dict(form=w.findtext('FORM'), gloss=w.findtext('TRANSL')) for w in s.findall('W')]))
info = subprocess.check_output(['afinfo', str(folder / '144254_HULUP_44k.mp3')], text=True)
channels, rate = map(int, re.search(r'(\d+) ch,\s+(\d+) Hz', info).groups())
count = int(re.search(r'audio (\d+) valid frames', info).group(1))
files = ['144254_HULUP_44k.mp3', 'crdo-IAI_HULUP.xml', 'media-olac.xml', 'annotation-olac.xml']
data = dict(source='pangloss-hulup', duration=count/rate, sampleRate=rate, channels=channels, segments=segments,
    hashes={name:hashlib.sha256((folder/name).read_bytes()).hexdigest() for name in files})
(folder / 'data.json').write_text(json.dumps(data, ensure_ascii=False, indent=2)+'\n')
(root / 'public/pangloss-data.js').write_text('// Généré depuis le XML Pangloss par scripts/prepare-chapter2-pangloss.py.\n// Annotations : © Françoise Ozanne-Rivierre, CC BY-NC-SA 2.5. Voir NOTICE.txt.\nexport const panglossData = '+json.dumps(data, ensure_ascii=False, indent=2)+';\n')
print(f'{len(segments)} segments, {sum(len(s["words"]) for s in segments)} mots, {data["duration"]:.3f} s ; sources préservées.')
