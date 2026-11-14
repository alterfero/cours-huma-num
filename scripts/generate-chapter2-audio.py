"""Génère deux enregistrements pédagogiques fictifs avec la voix locale Thomas (macOS).
Les textes de l'atelier ne sont pas distribués comme transcription ni comme corrigé.
Les fichiers WAV produits suffisent pour consulter le site sur tout système.
"""
import json, subprocess, tempfile, wave, struct
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'public/assets/chapitre2'
OUT.mkdir(parents=True,exist_ok=True)
texts={
 'demo-voix': [
  'Le matin, nous préparons la salle près du port.',
  'Les visiteurs arrivent après le bateau.',
  'Je crois que la rencontre commence à neuf heures.'
 ],
 'atelier-voix': [
  'Pour la collecte, nous nous retrouvons dans la salle près du quai.',
  'Apportez les carnets et les copies des lettres, mais gardez les originaux chez vous.',
  'La dernière fois, nous avions commencé le jeudi. Non, le vendredi, je crois.',
  'Les récits pourront être écoutés dans la salle. Pour les mettre en ligne, il faudra en reparler.'
 ]
}
for name, lines in texts.items():
 pcm=bytearray(); segments=[]; rate=22050
 with tempfile.TemporaryDirectory() as tmp:
  for i,line in enumerate(lines):
   aiff=Path(tmp)/f'{i}.aiff'; wav=Path(tmp)/f'{i}.wav'
   subprocess.run(['/usr/bin/say','-v','Thomas','-r','155','-o',str(aiff),line],check=True)
   subprocess.run(['/usr/bin/afconvert','-f','WAVE','-d','LEI16@22050','-c','1',str(aiff),str(wav)],check=True)
   with wave.open(str(wav),'rb') as f:
    assert f.getnchannels()==1 and f.getsampwidth()==2 and f.getframerate()==rate
    data=f.readframes(f.getnframes())
   if len(data)<rate: raise RuntimeError('La synthèse vocale n’a pas produit de son. Vérifiez l’accès à la voix locale.')
   pcm.extend(b'\x00\x00'*int(rate*.35))
   start=len(pcm)/2/rate
   pcm.extend(data)
   segments.append({'id':f'D{i+1}','start':round(start,3),'end':round(len(pcm)/2/rate,3),'tier':'Transcription','text':line,'author':'Exemple de cours'})
 pcm.extend(b'\x00\x00'*int(rate*.4))
 with wave.open(str(OUT/f'{name}.wav'),'wb') as f:
  f.setnchannels(1); f.setsampwidth(2); f.setframerate(rate); f.writeframes(pcm)
 values=struct.unpack('<'+'h'*(len(pcm)//2),pcm); step=max(1,len(values)//240)
 peaks=[round(max(abs(v) for v in values[i:i+step])/32768,4) for i in range(0,len(values),step)]
 meta={'duration':round(len(pcm)/2/rate,3),'peaks':peaks,'provenance':'Texte fictif, voix de synthèse Thomas (macOS), créé le 6 novembre 2026.'}
 if name=='demo-voix': meta['segments']=segments
 (OUT/f'{name}.json').write_text(json.dumps(meta,ensure_ascii=False),encoding='utf-8')
 print(name,meta['duration'],'secondes')
