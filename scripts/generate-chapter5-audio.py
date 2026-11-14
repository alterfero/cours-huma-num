"""Sons pédagogiques et visualisations calculées. Aucun média externe.
macOS : voix Thomas, say et afconvert. Python standard ; pas de dépendance.
"""
import subprocess, tempfile, wave, struct, math, cmath, random, json, hashlib, zlib
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'public/assets/chapitre5'; OUT.mkdir(parents=True,exist_ok=True)
records=json.loads(subprocess.check_output(['node','--input-type=module','-e',"import {recordings5} from './public/chapter5-content.js'; console.log(JSON.stringify(recordings5));"],cwd=ROOT))
RATE=22050

def fft(a):
 n=len(a); j=0
 for i in range(1,n):
  bit=n>>1
  while j&bit: j^=bit; bit>>=1
  j^=bit
  if i<j:a[i],a[j]=a[j],a[i]
 size=2
 while size<=n:
  step=cmath.exp(-2j*math.pi/size)
  for start in range(0,n,size):
   w=1
   for k in range(size//2):
    u=a[start+k]; v=a[start+k+size//2]*w
    a[start+k]=u+v;a[start+k+size//2]=u-v;w*=step
  size*=2
 return a

def png(path,rows):
 h=len(rows);w=len(rows[0])//3
 def chunk(kind,b):return struct.pack('>I',len(b))+kind+b+struct.pack('>I',zlib.crc32(kind+b)&0xffffffff)
 path.write_bytes(b'\x89PNG\r\n\x1a\n'+chunk(b'IHDR',struct.pack('>IIBBBBB',w,h,8,2,0,0,0))+chunk(b'IDAT',zlib.compress(b''.join(b'\0'+r for r in rows)))+chunk(b'IEND',b''))

def analyze(samples,stem):
 width=256;height=128;n=1024;window=[.5-.5*math.cos(2*math.pi*i/(n-1)) for i in range(n)]
 peaks=[]; spectra=[]
 for col in range(width):
  start=col*len(samples)//width;end=(col+1)*len(samples)//width
  peaks.append(round(max(abs(v) for v in samples[start:end]),5))
  center=(start+end)//2
  f=fft([complex((samples[center+i-n//2] if 0<=center+i-n//2<len(samples) else 0)*window[i]) for i in range(n)])
  spectra.append([max(abs(f[k]) for k in range(int(b*8000/height*n/RATE),max(int(b*8000/height*n/RATE)+1,int((b+1)*8000/height*n/RATE)))) for b in range(height)])
 peak=max(max(s) for s in spectra) or 1
 rows=[]
 for b in reversed(range(height)):
  row=bytearray()
  for s in spectra:
   level=max(0,min(1,(20*math.log10(max(s[b]/peak,1e-8))+70)/70))
   stops=[(15,28,32),(36,76,80),(103,169,160),(226,181,128),(245,232,202)]
   pos=level*4;lo=min(3,int(pos));mix=pos-lo
   row.extend(round(stops[lo][k]*(1-mix)+stops[lo+1][k]*mix) for k in range(3))
  rows.append(bytes(row))
 png(OUT/(stem+'-spectre.png'),rows)
 return peaks

meta={'edition':'archives-sonores-v1','created':'2026-11-06','sampleRate':RATE,'bits':16,'channels':1,'provenance':'Voix de synthèse Thomas (macOS) ou signaux calculés ; créations fictives pour le cours.','spectrogram':{'fft':1024,'window':'Hann','columns':256,'bands':128,'maxHz':8000,'floorDb':-70,'reference':'Maximum spectral propre à chaque fichier ; niveaux relatifs, non comparables entre fichiers.'},'items':{}}
for r in records:
 stem=r['id'].lower();path=OUT/(stem+'.wav')
 if r['text']:
  with tempfile.TemporaryDirectory() as tmp:
   aiff=Path(tmp)/'voice.aiff'; wav=Path(tmp)/'voice.wav'
   subprocess.run(['/usr/bin/say','-v','Thomas','-r','157','-o',str(aiff),r['text']],check=True)
   subprocess.run(['/usr/bin/afconvert','-f','WAVE','-d','LEI16@22050','-c','1',str(aiff),str(wav)],check=True)
   with wave.open(str(wav),'rb') as f:
    assert f.getframerate()==RATE and f.getsampwidth()==2 and f.getnchannels()==1
    data=f.readframes(f.getnframes())
   if len(data)<RATE*2: raise RuntimeError('La voix locale n’a pas produit de son ; vérifier les autorisations de synthèse vocale.')
   values=[0]*int(.4*RATE)+list(struct.unpack('<'+'h'*(len(data)//2),data))+[0]*int(.5*RATE)
 else:
  rng=random.Random(51 if r['scope']=='demo' else 52);values=[]
  for i in range(12*RATE):
   t=i/RATE;v=0
   if r['scope']=='demo':
    if 1<t<4:v=.22*math.sin(2*math.pi*440*t)
    if 5<t<8:v=.22*math.sin(2*math.pi*1760*t)
    if 9<t<11:v=.12*rng.uniform(-1,1)
   else:
    if 1<t<5:v=.25*math.sin(2*math.pi*660*t)*max(0,1-((t-1)%.8)/.12)
    if 7<t<11:v=.20*math.sin(2*math.pi*(300*(t-7)+220*(t-7)**2))
   v*=min(1,t/.02,(12-t)/.02);values.append(round(v*32767))
 with wave.open(str(path),'wb') as f:f.setnchannels(1);f.setsampwidth(2);f.setframerate(RATE);f.writeframes(struct.pack('<'+'h'*len(values),*values))
 samples=[v/32768 for v in values]
 peaks=analyze(samples,stem)
 meta['items'][r['id']]={'file':stem+'.wav','duration':len(values)/RATE,'bytes':path.stat().st_size,'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'peaks':peaks,'spectrogram':stem+'-spectre.png'}
 print(r['id'],round(len(values)/RATE,2),'s')
(OUT/'audio-data.json').write_text(json.dumps(meta,ensure_ascii=False),encoding='utf8')
