const fs = require('fs');
const path = require('path');

const jsonPath = 'C:\\Users\\HUSEYIN\\Desktop\\Tasari_Web\\tasariegitimyayinlari.com\\src\\data\\solutions.json';
const publicPath = 'C:\\Users\\HUSEYIN\\Desktop\\Tasari_Web\\tasariegitimyayinlari.com\\public';
const solutionsData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

let fixedCount = 0;

function checkAndFix(link) {
  if (!link || !link.endsWith('.pdf')) return link;
  
  const fullPath = path.join(publicPath, decodeURIComponent(link).replace(/\//g, '\\'));
  if (fs.existsSync(fullPath)) return link;

  // Try replacing things like "1-4-soru" with "1-4.-soru"
  const dirName = path.dirname(link);
  const baseName = path.basename(link);
  
  // Try adding dot before -soru
  let newBase = baseName.replace('-soru-cozumleri', '.-soru-cozumleri');
  let newPath = path.join(publicPath, decodeURIComponent(dirName + '/' + newBase).replace(/\//g, '\\'));
  if (fs.existsSync(newPath)) return dirName + '/' + newBase;

  // Try adding dot before -cozum
  newBase = baseName.replace('-cozum', '.-cozum');
  newPath = path.join(publicPath, decodeURIComponent(dirName + '/' + newBase).replace(/\//g, '\\'));
  if (fs.existsSync(newPath)) return dirName + '/' + newBase;

  // Search dir for closest match
  const fullDir = path.join(publicPath, decodeURIComponent(dirName).replace(/\//g, '\\'));
  if (fs.existsSync(fullDir)) {
    const files = fs.readdirSync(fullDir);
    // Remove dots and dashes to compare
    const strippedTarget = baseName.replace(/[\.\-]/g, '');
    for (const file of files) {
      if (file.replace(/[\.\-]/g, '') === strippedTarget) {
        return dirName + '/' + encodeURIComponent(file);
      }
    }
  }

  return link;
}

for (const slug in solutionsData) {
  const data = solutionsData[slug];
  if (data.sections) {
    data.sections.forEach(section => {
      if (section.items) {
        section.items.forEach(item => {
          const oldLink = item.link;
          item.link = checkAndFix(item.link);
          if (oldLink !== item.link) {
            fixedCount++;
            console.log(`Fixed: ${oldLink} -> ${item.link}`);
          }
        });
      }
    });
  }
}

fs.writeFileSync(jsonPath, JSON.stringify(solutionsData, null, 2), 'utf-8');
console.log(`\nFixed ${fixedCount} links in solutions.json`);
