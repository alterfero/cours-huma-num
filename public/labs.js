export const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const encodeBytes = value => Array.from(new TextEncoder().encode(value));
export const byteBits = value => value.toString(2).padStart(8, '0');
export const imageBytes = (width, bits) => Math.ceil(width * width * bits / 8);
export const quantize = (value, bits) => Math.round(value / 255 * (2 ** bits - 1)) * 255 / (2 ** bits - 1);
export const aliasFrequency = (frequency, sampleRate) => Math.abs(((frequency + sampleRate / 2) % sampleRate + sampleRate) % sampleRate - sampleRate / 2);
export function signalSamples(frequency, sampleRate, duration = .02) {
  return Array.from({ length: Math.ceil(sampleRate * duration) }, (_, i) => ({ time: i / sampleRate, value: Math.sin(2 * Math.PI * frequency * i / sampleRate) }));
}
export function loadSaved(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
}
export function saveLocal(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; }
}

// Lecture sans transformation du PCM mono 16 bits du fichier de l’expérience.
export function readMonoPCM16Wav(buffer) {
  const v = new DataView(buffer);
  const tag = offset => String.fromCharCode(...new Uint8Array(buffer, offset, 4));
  if (v.byteLength < 12 || tag(0) !== 'RIFF' || tag(8) !== 'WAVE') throw new Error('Fichier WAV invalide.');
  let rate, dataOffset, dataSize;
  for (let offset = 12; offset + 8 <= v.byteLength;) {
    const size = v.getUint32(offset + 4, true), start = offset + 8;
    if (start + size > v.byteLength) throw new Error('Fichier WAV tronqué.');
    if (tag(offset) === 'fmt ') {
      if (size < 16 || v.getUint16(start, true) !== 1 || v.getUint16(start + 2, true) !== 1 || v.getUint16(start + 14, true) !== 16) throw new Error('Format attendu : WAV PCM mono 16 bits.');
      rate = v.getUint32(start + 4, true);
    }
    if (tag(offset) === 'data') { dataOffset = start; dataSize = size; }
    offset = start + size + (size % 2);
  }
  if (!rate || dataOffset === undefined || !dataSize || dataSize % 2) throw new Error('Données PCM invalides.');
  const samples = new Float32Array(dataSize / 2);
  for (let i = 0; i < samples.length; i++) samples[i] = v.getInt16(dataOffset + i * 2, true) / 32768;
  return { samples, sampleRate: rate, duration: samples.length / rate };
}

// Sous-échantillonnage sans filtre, puis maintien de chaque valeur jusqu’à la
// suivante. La sortie garde la durée et la cadence du fichier pour l’écoute.
export function holdResample(samples, sourceRate, targetRate) {
  if (!Number.isFinite(sourceRate) || !Number.isFinite(targetRate) || targetRate <= 0 || targetRate > sourceRate) throw new Error('Fréquence d’échantillonnage invalide.');
  const out = new Float32Array(samples.length);
  for (let i = 0; i < out.length; i++) {
    const measurement = Math.floor(i * targetRate / sourceRate);
    out[i] = samples[Math.floor(measurement * sourceRate / targetRate)];
  }
  return out;
}
