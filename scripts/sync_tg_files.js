const fs = require('fs');
const path = require('path');

const jsonPath = 'src/data/solutions.json';
const publicDir = path.join(process.cwd(), 'public');
const tgDir = path.join(publicDir, 'dosyalar', 'tg');

const solutionsData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.toLowerCase().endsWith('.pdf')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });
  return arrayOfFiles;
}

const allPdfFiles = getAllFiles(tgDir);

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
    .replace(/cozumleri/g, 'cozum') 
    .replace(/denemeleri/g, 'deneme')
    .replace(/[^a-z0-9]/g, '');
}

let updateCount = 0;

for (const slug in solutionsData) {
  const category = solutionsData[slug];
  if (!category.sections) continue;

  category.sections.forEach(section => {
    if (!section.items) return;
    section.items.forEach(item => {
      if (item.image) return;

      const itemTitleNorm = normalize(item.title);

      let bestMatch = null;
      let maxScore = 0;

      for (const filePath of allPdfFiles) {
        const fileName = path.basename(filePath, '.pdf');
        const fileNameNorm = normalize(fileName);
        const relPathNorm = normalize(path.relative(tgDir, filePath));

        let score = 0;

        if (fileNameNorm === itemTitleNorm) score += 100;
        else if (fileNameNorm.includes(itemTitleNorm) || itemTitleNorm.includes(fileNameNorm)) score += 80;
        
        // Check if slug or category title is in the path
        if (relPathNorm.includes(normalize(slug)) || relPathNorm.includes(normalize(category.title))) {
            score += 20;
        }

        if (score > maxScore && score >= 80) {
            maxScore = score;
            bestMatch = filePath;
        }
      }

      if (bestMatch) {
        const relativeLink = '/' + path.relative(publicDir, bestMatch).replace(/\\/g, '/');
        if (item.link !== relativeLink) {
          console.log(`Updated "${item.title}": ${item.link} -> ${relativeLink}`);
          item.link = relativeLink;
          updateCount++;
        }
      }
    });
  });
}

fs.writeFileSync(jsonPath, JSON.stringify(solutionsData, null, 2));
console.log(`\nSuccessfully updated ${updateCount} links.`);
