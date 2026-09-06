const fs = require('fs');
const jsonPath = 'src/data/solutions.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const kpss = data['kpss-tg-cozumleri'];

// Update slugs
kpss.sections[2].slug = '2026-kpss-lisans-denemeleri';
kpss.sections[3].slug = 'on-lisans-2026-kpss-lisans-denemeleri';
kpss.sections[4].slug = '2026-e-kpss-denemeleri';

// 2026-kpss-lisans-denemeleri
kpss.sections[2].items = [
  { "title": "KPSS LİSANS TG-1 DENEME", "info": "PDF Çözümü Görüntüle", "link": "/dosyalar/tg/kpss-tg-cozumleri/2026-kpss-lisans-denemeleri/kpss-lisans-tg-1-deneme-cozum.pdf" },
  { "title": "KPSS LİSANS TG-2 DENEME", "info": "PDF Çözümü Görüntüle", "link": "/dosyalar/tg/kpss-tg-cozumleri/2026-kpss-lisans-denemeleri/kpss-lisans-tg-2-deneme-cozum.pdf" },
  { "title": "KPSS LİSANS TG-3 DENEME", "info": "PDF Çözümü Görüntüle", "link": "/dosyalar/tg/kpss-tg-cozumleri/2026-kpss-lisans-denemeleri/kpss-lisans-tg-3-deneme-cozum.pdf" },
  { "title": "KPSS LİSANS TG-4 DENEME", "info": "PDF Çözümü Görüntüle", "link": "/dosyalar/tg/kpss-tg-cozumleri/2026-kpss-lisans-denemeleri/kpss-lisans-tg-4-deneme-cozum.pdf" },
  { "title": "KPSS LİSANS TG-5 DENEME", "info": "PDF Çözümü Görüntüle", "link": "/dosyalar/tg/kpss-tg-cozumleri/2026-kpss-lisans-denemeleri/kpss-lisans-tg-5-deneme-cozum.pdf" },
  { "title": "KPSS LİSANS TG-6 DENEME", "info": "PDF Çözümü Görüntüle", "link": "/dosyalar/tg/kpss-tg-cozumleri/2026-kpss-lisans-denemeleri/kpss-lisans-tg-6-deneme-cozum.pdf" }
];

// on-lisans-2026-kpss-lisans-denemeleri
kpss.sections[3].items = [
  { "title": "KPSS ÖNLİSANS TG-1 DENEME", "info": "PDF Çözümü Görüntüle", "link": "/dosyalar/tg/kpss-tg-cozumleri/on-lisans-2026-kpss-lisans-denemeleri/kpss-ortaogretim-onlisans-tg-1-deneme-cozum.pdf" },
  { "title": "KPSS ÖNLİSANS TG-2 DENEME", "info": "PDF Çözümü Görüntüle", "link": "/dosyalar/tg/kpss-tg-cozumleri/on-lisans-2026-kpss-lisans-denemeleri/kpss-ortaogretim-onlisans-tg-2-deneme-cozum.pdf" },
  { "title": "KPSS ÖNLİSANS TG-3 DENEME", "info": "PDF Çözümü Görüntüle", "link": "/dosyalar/tg/kpss-tg-cozumleri/on-lisans-2026-kpss-lisans-denemeleri/kpss-ortaogretim-onlisans-tg-3-deneme-cozum.pdf" },
  { "title": "KPSS ÖNLİSANS TG-4 DENEME", "info": "PDF Çözümü Görüntüle", "link": "/dosyalar/tg/kpss-tg-cozumleri/on-lisans-2026-kpss-lisans-denemeleri/kpss-ortaogretim-onlisans-tg-4-cozum.pdf" },
  { "title": "KPSS ÖNLİSANS TG-5 DENEME", "info": "PDF Çözümü Görüntüle", "link": "/dosyalar/tg/kpss-tg-cozumleri/on-lisans-2026-kpss-lisans-denemeleri/kpss-ortaogretim-onlisans-tg-5-cozum.pdf" },
  { "title": "KPSS ÖNLİSANS TG-6 DENEME", "info": "PDF Çözümü Görüntüle", "link": "/dosyalar/tg/kpss-tg-cozumleri/on-lisans-2026-kpss-lisans-denemeleri/kpss-ortaogretim-onlisans-tg-6-cozum.pdf" }
];

// 2026-e-kpss-denemeleri (from user's specific path)
kpss.sections[4].items = [
  { "title": "EKPSS TG-1 DENEME", "info": "PDF Çözümü Görüntüle", "link": "/dosyalar/tg/2026-e-kpss-denemeleri/EKPSS deneme TG-1 ÇÖZÜM.pdf" },
  { "title": "EKPSS TG-2 DENEME", "info": "PDF Çözümü Görüntüle", "link": "/dosyalar/tg/2026-e-kpss-denemeleri/EKPSS deneme TG-2 ÇÖZÜM.pdf" },
  { "title": "EKPSS TG-3 DENEME", "info": "PDF Çözümü Görüntüle", "link": "/dosyalar/tg/2026-e-kpss-denemeleri/E-KPSS deneme TG-3 ÇÖZÜM.pdf" },
  { "title": "EKPSS TG-4 DENEME", "info": "PDF Çözümü Görüntüle", "link": "/dosyalar/tg/2026-e-kpss-denemeleri/E-KPSS deneme TG-4 ÇÖZÜM.pdf" },
  { "title": "EKPSS TG-5 DENEME", "info": "PDF Çözümü Görüntüle", "link": "/dosyalar/tg/2026-e-kpss-denemeleri/E-KPSS deneme TG-5 ÇÖZÜM.pdf" }
];

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
console.log('Finalized KPSS TG links and slugs.');
