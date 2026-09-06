/**
 * Geliştirilmiş slug doldurucu:
 * - public/dosyalar altındaki TÜM dizinleri indeksler
 * - Her eksik slug için en iyi eşleşen dizini fuzzy matching ile bulur
 * - İçindeki PDF'leri otomatik listeler
 */

const fs = require('fs');
const path = require('path');

const solutionsPath = path.join(__dirname, '../src/data/solutions.json');
const publicDir = path.join(__dirname, '../public');
const dosyalarDir = path.join(publicDir, 'dosyalar');
const solutions = JSON.parse(fs.readFileSync(solutionsPath, 'utf-8'));

// ===== Build a flat map of all directories under dosyalar =====
function getAllDirs(baseDir) {
  const dirs = [];
  function walk(dir) {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const e of entries) {
        if (e.isDirectory()) {
          const full = path.join(dir, e.name);
          dirs.push(full);
          walk(full);
        }
      }
    } catch {}
  }
  walk(baseDir);
  return dirs;
}

function findPdfsInDir(dirPath) {
  const pdfs = [];
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dirPath, e.name);
      if (e.isFile() && e.name.toLowerCase().endsWith('.pdf')) pdfs.push(full);
      else if (e.isDirectory()) pdfs.push(...findPdfsInDir(full));
    }
  } catch {}
  return pdfs;
}

function relPath(absPath) {
  return '/' + path.relative(publicDir, absPath).replace(/\\/g, '/');
}

// Score: how many slug tokens appear in dir name
function matchScore(slug, dirName) {
  const slugParts = slug.toLowerCase().split('-').filter(p => p.length > 2);
  const dirLower = dirName.toLowerCase();
  let score = 0;
  for (const part of slugParts) {
    if (dirLower.includes(part)) score++;
  }
  return score;
}

// ===== Collect all missing slugs =====
const missing = {};
Object.keys(solutions).forEach(k => {
  const s = solutions[k];
  if (!s.sections) return;
  s.sections.forEach(sec => {
    if (!sec.items) return;
    sec.items.forEach(item => {
      if (item.link && item.link.startsWith('/cozumler/')) {
        const slug = item.link.replace('/cozumler/', '');
        if (!missing[slug]) {
          missing[slug] = { title: item.title, image: item.image || null };
        }
      }
    });
  });
});

console.log(`\n📋 Total missing slugs: ${Object.keys(missing).length}\n`);

const allDirs = getAllDirs(dosyalarDir);
console.log(`📂 Total directories in dosyalar: ${allDirs.length}\n`);

// ===== Map each slug to best matching dir =====
const slugMap = {}; // slug -> {dir, score, pdfs}

for (const [slug, meta] of Object.entries(missing)) {
  let bestDir = null;
  let bestScore = 0;

  for (const dir of allDirs) {
    const dirName = path.basename(dir);
    const score = matchScore(slug, dirName);
    if (score > bestScore) {
      bestScore = score;
      bestDir = dir;
    }
  }

  const pdfs = bestDir && bestScore >= 2 ? findPdfsInDir(bestDir) : [];

  slugMap[slug] = { dir: bestDir, score: bestScore, pdfs, ...meta };
}

// ===== Generate entries and update solutions.json =====
let filled = 0, empty = 0;
const newEntries = {};

for (const [slug, data] of Object.entries(slugMap)) {
  const { pdfs, title, score, dir, image } = data;

  if (pdfs.length > 0) {
    filled++;
    console.log(`✅ ${slug}`);
    console.log(`   Dir: ${path.relative(dosyalarDir, dir)} (score: ${score})`);
    console.log(`   PDFs: ${pdfs.length}`);
  } else {
    empty++;
    console.log(`⚠️  ${slug} — no PDFs found (best dir: ${dir ? path.relative(dosyalarDir, dir) : 'none'}, score: ${score})`);
  }

  // Build items from PDFs
  const items = pdfs
    .map(pdfPath => {
      const filename = path.basename(pdfPath, '.pdf');
      // Try to extract leading number
      const numMatch = filename.match(/^[^\d]*(\d+)/);
      const num = numMatch ? parseInt(numMatch[1]) : null;
      const itemTitle = num ? `${title} - ${num}. Çözüm` : filename.replace(/-/g, ' ').replace(/_/g, ' ');
      return {
        title: itemTitle,
        link: relPath(pdfPath),
        _sort: num || 9999
      };
    })
    .sort((a, b) => a._sort - b._sort)
    .map(({ _sort, ...rest }) => rest);

  newEntries[slug] = {
    title,
    ...(image ? { image } : {}),
    sections: [{ name: title, items }]
  };
}

// Merge: don't overwrite keys that already have items
for (const [slug, entry] of Object.entries(newEntries)) {
  const existing = solutions[slug];
  const existingItems = existing?.sections?.reduce((a, s) => a + (s.items?.length || 0), 0) || 0;
  if (existingItems === 0) {
    solutions[slug] = entry;
  }
}

fs.writeFileSync(solutionsPath, JSON.stringify(solutions, null, 2), 'utf-8');

console.log(`\n${'='.repeat(50)}`);
console.log(`✅ Updated solutions.json`);
console.log(`   With PDFs: ${filled}`);
console.log(`   Empty (no PDFs): ${empty}`);
