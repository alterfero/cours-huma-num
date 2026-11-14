import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, extname, sep } from 'node:path';
import { manifest4, imageInfo, imageRequestFile } from './public/images.js';

const root = fileURLToPath(new URL('./public/', import.meta.url));
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.tsv': 'text/tab-separated-values; charset=utf-8', '.zip': 'application/zip', '.txt': 'text/plain; charset=utf-8', '.csv': 'text/csv; charset=utf-8', '.md': 'text/markdown; charset=utf-8', '.ico': 'image/x-icon', '.mp3': 'audio/mpeg', '.xml': 'application/xml; charset=utf-8', '.pdf': 'application/pdf', '.flac': 'audio/flac', '.wav': 'audio/wav', '.eaf': 'application/xml; charset=utf-8' };
export const server = createServer(async (req, res) => {
  const headers = { 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'strict-origin-when-cross-origin', 'Cache-Control': 'no-cache' };
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405, { ...headers, Allow: 'GET, HEAD' }); res.end(); return; }
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (pathname === '/healthz') { res.writeHead(200, { ...headers, 'Content-Type': 'text/plain' }); res.end(req.method === 'HEAD' ? undefined : 'ok'); return; }
    let resourcePath=pathname;
    if(pathname.startsWith('/iiif/')) {
      headers['Access-Control-Allow-Origin']='*';
      // Railway terminates TLS at its proxy. PUBLIC_ORIGIN can pin canonical IDs.
      const protocol=String(req.headers['x-forwarded-proto']||'http').split(',')[0].trim()==='https'?'https':'http';
      const base=process.env.PUBLIC_ORIGIN||`${protocol}://${req.headers.host||'localhost'}`;
      const info=/^\/iiif\/image\/([A-Za-z0-9-]+)\/info\.json$/.exec(pathname);
      const doc=/^\/iiif\/4\/(demo|atelier)\/(manifest\.json|canvas\/[A-Za-z0-9-]+(?:\/page|\/painting)?)$/.exec(pathname);
      let value;
      if(info)value=imageInfo(info[1],base);
      if(doc){const m=manifest4(doc[1],base);if(doc[2]==='manifest.json')value=m;else{const [,id,part]=doc[2].split('/'),canvas=m.items.find(c=>c.id.endsWith('/'+id));if(canvas)value=part==='page'?canvas.items[0]:part==='painting'?canvas.items[0].items[0]:canvas;if(value)value={'@context':m['@context'],...value};}}
      if(value){const body=Buffer.from(JSON.stringify(value,null,2));res.writeHead(200,{...headers,'Content-Type':'application/ld+json; charset=utf-8','Content-Length':body.length});res.end(req.method==='HEAD'?undefined:body);return;}
      const imageFile=imageRequestFile(pathname);if(!imageFile)throw new Error('unsupported-iiif-request');resourcePath='/assets/chapitre4/'+imageFile;
    }
    const path = resolve(root, '.' + (resourcePath === '/' ? '/index.html' : resourcePath));
    if (!(path.startsWith(root.endsWith(sep) ? root : root + sep))) { res.writeHead(403, headers); res.end('Forbidden'); return; }
    if (!(await stat(path)).isFile()) throw new Error('not-file');
    const body = await readFile(path);
    const contentType = types[extname(path)] || 'application/octet-stream';
    if (['.wav', '.mp3', '.flac'].includes(extname(path))) {
      headers['Accept-Ranges'] = 'bytes';
      if (req.method === 'GET' && req.headers.range) {
        const match = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
        let start = match?.[1] ? Number(match[1]) : Math.max(0, body.length - Number(match?.[2]));
        let end = match?.[1] && match[2] ? Math.min(Number(match[2]), body.length - 1) : body.length - 1;
        if (!match || !(match[1] || match[2]) || !Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start < 0 || start >= body.length || end < start) {
          res.writeHead(416, { ...headers, 'Content-Range': `bytes */${body.length}` }); res.end(); return;
        }
        res.writeHead(206, { ...headers, 'Content-Type': contentType, 'Content-Range': `bytes ${start}-${end}/${body.length}`, 'Content-Length': end - start + 1 });
        res.end(body.subarray(start, end + 1)); return;
      }
    }
    res.writeHead(200, { ...headers, 'Content-Type': contentType, 'Content-Length': body.length });
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch (error) {
    res.writeHead(error instanceof URIError ? 400 : 404, { ...headers, 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Ressource introuvable.');
  }
});
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 3000);
  server.listen(port, process.env.HOST || '0.0.0.0', () => console.log(`Cours disponible sur http://localhost:${port}`));
}
