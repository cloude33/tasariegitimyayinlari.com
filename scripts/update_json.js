const fs = require('fs');
const path = require('path');

const htmlDir = 'C:\\Users\\HUSEYIN\\Desktop\\Tasari_Web\\Yeni klasör';
const jsonPath = 'C:\\Users\\HUSEYIN\\Desktop\\Tasari_Web\\tasariegitimyayinlari.com\\src\\data\\solutions.json';

const solutionsData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

function trSlugify(text) {
  if (!text) return '';
  const trMap = {
    'ç': 'c', 'ğ': 'g', 'ş': 's', 'ü': 'u', 'ö': 'o', 'ı': 'i',
    'Ç': 'c', 'Ğ': 'g', 'Ş': 's', 'Ü': 'u', 'Ö': 'o', 'İ': 'i'
  };
  let slug = text.toString();
  for (let key in trMap) {
    slug = slug.replace(new RegExp(key, 'g'), trMap[key]);
  }
  return slug
    .toLowerCase()
    .trim()
    .replace(/[^-a-zA-Z0-9.\s]/g, '') // Keep alphanumeric, dots, and hyphens
    .replace(/\s+/g, '-')             // Replace spaces with -
    .replace(/-+/g, '-')              // Replace multiple - with single -
    .replace(/^-+/, '')               // Trim - from start
    .replace(/-+$/, '');              // Trim - from end
}

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

const missingSlugs = [
  'dgs-matematik-soru-bankasi',
  'ales-50de50-matematik',
  'dgs-sozel-sayisal-mantik-cozumleri',
  'dgs-sozel-mantik-konu-anlatimli-cozumleri',
  'dgs-soru-kampi-1-15-cozumleri',
  'dgs-super-ikili-deneme-cozumleri',
  'dgs-son-prova-4-deneme-cozumleri',
  'dgs-soru-kampi-16-30-cozumleri',
  'dgs-pandemisi-deneme-cozumleri',
  'dgs-soru-kampi-31-45-cozumleri',
  'dgs-6-muhtesem-deneme-cozumleri',
  'dgs-sayisal-5-deneme-cozumleri',
  'dgs-checkup-deneme-cozumleri',
  'dgs-7li-deneme-cozumleri',
  'dgs-son-prova-6-deneme-cozumleri',
  'dgs-son-15-soru-cozumleri',
  'dgs-60-60-net-cozumleri',
  'dgs-kurumsal-4-deneme-cozumleri',
  'ales-all-star-matematik-mantik',
  'yos-11-deneme'
];

let addedCount = 0;

for (const slug of missingSlugs) {
  const filePath = path.join(htmlDir, slug + '.html');
  if (!fs.existsSync(filePath)) continue;
  
  const content = fs.readFileSync(filePath, 'utf-8');
  const titleMatch = content.match(/<h1>([^<]+)<\/h1>/);
  const pageTitle = titleMatch ? titleMatch[1].trim() : "Çözüm Detayları";
  
  const h2Match = content.match(/<h2>([^<]+)<\/h2>/);
  const sectionName = h2Match ? h2Match[1].trim() : "Çözüm Dosyaları";

  const newEntry = {
    title: pageTitle,
    sections: [{ name: sectionName, items: [] }]
  };

  let baseMatch = content.match(/const\s+(?:basePath|base)\s*=\s*['"]([^'"]+)['"]/);
  let base = baseMatch ? baseMatch[1] : '';
  if (base && !base.startsWith('/')) base = '/' + base;

  // Case 3: for loop "for (let i = 1; i <= 15; i++)"
  const loopMatch = content.match(/for\s*\(\s*let\s+i\s*=\s*(\d+);\s*i\s*<=\s*(\d+);\s*i\+\+\s*\)/);
  if (loopMatch && base) {
    const start = parseInt(loopMatch[1]);
    const end = parseInt(loopMatch[2]);
    
    // Look inside the loop for slugify pattern
    const pdfPathMatch = content.match(/pdfPath\s*=\s*base\s*\+\s*slugify\(['"]([^'"]+)['"]\s*\+\s*i(?:\s*\+\s*['"]([^'"]+)['"])?\)\s*\+\s*['"]\.pdf['"]/);
    
    let prefix = "deneme-";
    let suffix = "-cozum";
    
    // Fallbacks based on manual inspection of similar files
    if (slug.includes('kamp')) { prefix = "kamp-"; suffix = " cozum"; }
    else if (slug.includes('deneme')) { prefix = "deneme-"; suffix = "-cozum"; }
    else if (slug.includes('soru')) { prefix = "test-"; suffix = ""; }

    // If we matched the exact string format
    if (pdfPathMatch) {
      prefix = pdfPathMatch[1];
      suffix = pdfPathMatch[2] || "";
    }

    for (let i = start; i <= end; i++) {
      let fileName = slugify(prefix + i + suffix) + '.pdf';
      
      // Some special cases seen in original JS
      if (!pdfPathMatch) {
        if (slug.includes('dgs-super-ikili-deneme')) fileName = `deneme-${i}-cozum.pdf`;
        else if (slug.includes('dgs-son-prova-4-deneme')) fileName = `deneme-${i}-cozum.pdf`;
        else if (slug.includes('dgs-soru-kampi')) fileName = slugify(`kamp-${i} cozum`) + '.pdf';
        else if (slug.includes('dgs-pandemisi')) fileName = `deneme-${i}-cozum.pdf`;
        else if (slug.includes('dgs-6-muhtesem-deneme')) fileName = `deneme-${i}-cozum.pdf`;
        else if (slug.includes('dgs-sayisal-5-deneme')) fileName = `deneme-${i}-cozum.pdf`;
        else if (slug.includes('dgs-checkup-deneme')) fileName = `deneme-${i}-cozum.pdf`;
        else if (slug.includes('dgs-7li-deneme')) fileName = `deneme-${i}-cozum.pdf`;
        else if (slug.includes('dgs-son-prova-6-deneme')) fileName = `deneme-${i}-cozum.pdf`;
        else if (slug.includes('dgs-son-15-soru')) fileName = slugify(`kamp-${i} cozum`) + '.pdf';
        else if (slug.includes('dgs-60-60-net')) fileName = slugify(`${i}. cozum`) + '.pdf';
        else if (slug.includes('dgs-kurumsal-4-deneme')) fileName = `deneme-${i}-cozum.pdf`;
      }

      newEntry.sections[0].items.push({
        title: `Çözüm - ${i}`,
        info: "PDF Dosyası",
        link: base + fileName
      });
    }
  }

  if (newEntry.sections[0].items.length > 0) {
    solutionsData[slug] = newEntry;
    addedCount++;
    console.log(`Resolved slug: ${slug} with ${newEntry.sections[0].items.length} items`);
  }
}

fs.writeFileSync(jsonPath, JSON.stringify(solutionsData, null, 2), 'utf-8');
console.log(`\nSuccessfully added ${addedCount} missing sections.`);
