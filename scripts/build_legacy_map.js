/**
 * legacy-redirects.js -> disk klasör yolu eşleme tablosu üretir.
 *
 * Çıktı: { [slug]: "dosyalar/<relatif disk yolu>" }
 *  - Yalnızca hedefi /cozumler/dizin/ ile başlayan (dizin listeleme) girdiler eşlenir.
 *  - Geri kalanlar skip objesinde listelenir (eşlenmeden).
 */
const fs = require('fs');
const path = require('path');
const legacyRedirects = require('./legacy-redirects.js');

const ROOT = __dirname;
const DOSYALAR = path.join(ROOT, 'public', 'dosyalar');
const DIZIN_PREFIX = '/cozumler/dizin/';

const map = {};
const skip = [];
const missing = [];

for (const { source, destination } of legacyRedirects) {
  if (!destination || !destination.startsWith(DIZIN_PREFIX)) {
    skip.push({ source, destination, reason: 'dizin-hedefli-degil' });
    continue;
  }

  const relative = destination.slice(DIZIN_PREFIX.length);
  const diskRel = path.posix.join('dosyalar', relative);
  const diskFull = path.join(DOSYALAR, ...relative.split('/'));

  if (!fs.existsSync(diskFull)) {
    missing.push({ source, destination, diskRel });
    continue;
  }

  // Kaynak slug'i (baştaki / kaldırılmış hali) -> dosyalar/... yolu
  const slug = source.replace(/^\//, '');

  // URL-kodlu kaynaklar catch-all ile eşleşmez (params decode edilir); redirect'te kalır
  if (/%/.test(slug)) {
    skip.push({ source, destination, reason: 'url-kodlu-kaynak' });
    continue;
  }

  map[slug] = diskRel;
}

const out = {
  generated: new Date().toISOString(),
  count: Object.keys(map).length,
  map,
  skip,
  missing,
};

const outPath = 'C:/Users/BULUT/AppData/Local/Temp/opencode/legacy_map.json';
const projectPath = path.join(ROOT, 'src', 'data', 'legacy-map.json');

// Sadece eşleme tablosu (page.js'te import edilir)
fs.writeFileSync(projectPath, JSON.stringify(map, null, 2), 'utf8');
fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf8');

console.log(`Eşlenen: ${Object.keys(map).length}`);
console.log(`Atlanan: ${skip.length}`);
console.log(`Eksik: ${missing.length}`);
console.log('Proje çıktısı:', projectPath);
console.log('Temp çıktı:', outPath);