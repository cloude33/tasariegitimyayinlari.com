const fs = require('fs');
const path = require('path');

const jsonPath = 'src/data/solutions.json';
const publicDir = path.join(process.cwd(), 'public');
const baseDir = path.join(publicDir, 'dosyalar');

const solutionsData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      if (file.toLowerCase().endsWith('.pdf')) {
        arrayOfFiles.push(fullPath);
      }
    }
  });
  return arrayOfFiles;
}

const allPdfFiles = getAllFiles(baseDir);

function normalize(str) {
  if (!str) return '';
  return str
    .replace(/İ/g, 'i')
    .replace(/I/g, 'i')
    .replace(/ç/gi, 'c')
    .replace(/ğ/gi, 'g')
    .replace(/ö/gi, 'o')
    .replace(/ş/gi, 's')
    .replace(/ü/gi, 'u')
    .toLowerCase()
    .normalize('NFC')
    .replace(/cozumleri/g, 'cozum') 
    .replace(/denemeleri/g, 'deneme')
    .replace(/[^a-z0-9]/g, '');
}

let updateCount = 0;

const tgSlugs = [
    'tg-deneme-cozumleri',
    'tasari-yos-denemeleri',
    'kpss-tg-cozumleri',
    'ales-deneme-cozumleri',
    'meb-ags-deneme-sinav-cozumleri',
    'tyt-ayt-deneme-cozumleri',
    'kts-deneme-sinavi',
    'msu-cozumleri',
    '2026-e-kpss-denemeleri',
    '2026-kpss-lisans-denemeleri',
    'on-lisans-2026-kpss-lisans-denemeleri'
];

for (const slug in solutionsData) {
  const category = solutionsData[slug];
  if (!category.sections) continue;

  const isTG = tgSlugs.includes(slug) || slug.startsWith('tg-') || slug.includes('denemeleri');

  category.sections.forEach(section => {
    if (!section.items) return;
    section.items.forEach(item => {
      if (item.image) return;

      const itemTitleNorm = normalize(item.title);

      let bestMatch = null;
      let maxScore = -1;

      for (const filePath of allPdfFiles) {
        const fileName = path.basename(filePath, '.pdf');
        const fileNameNorm = normalize(fileName);
        const relPath = path.relative(publicDir, filePath).replace(/\\/g, '/');
        const isFileInTG = relPath.includes('/tg') || relPath.includes('tg/');

        // Isolation
        if (isTG && !isFileInTG) continue;
        if (!isTG && isFileInTG) continue;

        let score = 0;

        if (fileNameNorm === itemTitleNorm) score += 100;
        else if (fileNameNorm.includes(itemTitleNorm) || itemTitleNorm.includes(fileNameNorm)) score += 80;

        // Parent folder match
        const parentDirNorm = normalize(path.basename(path.dirname(filePath)));
        const sectionNameNorm = normalize(section.name);
        const slugNorm = normalize(slug);
        
        if (parentDirNorm === sectionNameNorm || sectionNameNorm.includes(parentDirNorm)) score += 30;
        if (parentDirNorm === slugNorm || slugNorm.includes(parentDirNorm)) score += 20;

        if (score > maxScore && score >= 80) {
            maxScore = score;
            bestMatch = filePath;
        }
      }

      if (bestMatch) {
        const newLink = '/' + path.relative(publicDir, bestMatch).replace(/\\/g, '/');
        if (item.link !== newLink) {
          console.log(`Matching "${item.title}" (${slug}) -> ${newLink}`);
          item.link = newLink;
          updateCount++;
        }
      }
    });
  });
}

fs.writeFileSync(jsonPath, JSON.stringify(solutionsData, null, 2));
console.log(`\nSuccessfully updated ${updateCount} links.`);
