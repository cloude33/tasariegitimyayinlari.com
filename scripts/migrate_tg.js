const fs = require('fs');

// Load original data
const SOLUTIONS_DATA = {
  "tg-dgs": {
    "title": "TG DGS Deneme Çözümleri",
    "sections": [
      {
        "name": "TÜRKİYE GENELİ DGS DENEMELERİ",
        "items": [
          { "title": "DGS SEVİYE BELİRLEME SINAVI", "info": "Başlangıç Seviye Çözümü", "link": "dosyalar/tg/tg-dgs/dgs-seviye-belirleme-sinavi-cozumler.pdf" },
          { "title": "TG DGS-1 DENEME ÇÖZÜMÜ", "info": "2024-2025 Dönemi", "link": "dosyalar/tg/tg-dgs/dgs-tg-1-cozum.pdf" },
          { "title": "TG DGS-2 DENEME ÇÖZÜMÜ", "info": "2024-2025 Dönemi", "link": "dosyalar/tg/tg-dgs/dgs-tg-2-cozum.pdf" },
          { "title": "TG DGS-3 DENEME ÇÖZÜMÜ", "info": "2024-2025 Dönemi", "link": "dosyalar/tg/tg-dgs/dgs-tg-3-cozum.pdf" },
          { "title": "TG DGS-4 DENEME ÇÖZÜMÜ", "info": "2024-2025 Dönemi", "link": "dosyalar/tg/tg-dgs/dgs-tg-4-cozum.pdf" },
          { "title": "TG DGS-5 DENEME ÇÖZÜMÜ", "info": "2024-2025 Dönemi", "link": "dosyalar/tg/tg-dgs/dgs-tg-5-cozum.pdf" },
          { "title": "TG DGS-6 DENEME ÇÖZÜMÜ", "info": "2025-2026 Dönemi", "link": "dosyalar/tg/DGS TG-6 ÇÖZÜM.pdf", "isNew": true },
          { "title": "TG DGS-7 DENEME ÇÖZÜMÜ", "info": "2025-2026 Dönemi", "link": "dosyalar/tg/DGS TG-7 ÇÖZÜM.pdf", "isNew": true }
        ]
      }
    ]
  },
  "tg-yos": {
    "title": "TG YÖS Deneme Çözümleri",
    "sections": [
      {
        "name": "YÖS TARAMA-ARA DENEME",
        "items": [
          { "title": "YÖS TARAMA 1 ÇÖZÜM", "info": "YÖS Deneme Sınavı Çözümleri", "link": "dosyalar/tg/tg-yos/yos-tarama-ara-deneme/yos-tarama-1-cozum.pdf" },
          { "title": "YÖS TARAMA 2 ÇÖZÜM", "info": "YÖS Deneme Sınavı Çözümleri", "link": "dosyalar/tg/tg-yos/yos-tarama-ara-deneme/yos-tarama-2-cozum.pdf" },
          { "title": "YÖS TARAMA 3 ÇÖZÜM", "info": "YÖS Deneme Sınavı Çözümleri", "link": "dosyalar/tg/tg-yos/yos-tarama-ara-deneme/yos-tarama-3-cozum.pdf" },
          { "title": "YÖS TARAMA 4 ÇÖZÜM", "info": "YÖS Deneme Sınavı Çözümleri", "link": "dosyalar/tg/tg-yos/yos-tarama-ara-deneme/yos-tarama-4-cozum.pdf" },
          { "title": "YÖS TARAMA 5 ÇÖZÜM", "info": "YÖS Deneme Sınavı Çözümleri", "link": "dosyalar/tg/tg-yos/yos-tarama-ara-deneme/yos-tarama-5-cozum.pdf" }
        ]
      },
      {
        "name": "TR-YÖS 2024-2025 (MAYIS) DENEMELERİ",
        "items": [
          { "title": "TR-YÖS MAYIS DENEME - M1", "info": "Mayıs Dönemi Deneme Çözümü", "link": "dosyalar/tg/tg-yos/yos-mayis-denemeleri/yos-tg-m1-deneme.-cozum.pdf" },
          { "title": "TR-YÖS MAYIS DENEME - M2", "info": "Mayıs Dönemi Deneme Çözümü", "link": "dosyalar/tg/tg-yos/yos-mayis-denemeleri/yos-deneme-m2-cozum.pdf" },
          { "title": "TR-YÖS MAYIS DENEME - M3", "info": "Mayıs Dönemi Deneme Çözümü", "link": "dosyalar/tg/tg-yos/yos-mayis-denemeleri/yos-deneme-m3-cozum.pdf" },
          { "title": "TR-YÖS MAYIS DENEME - M4", "info": "Mayıs Dönemi Deneme Çözümü", "link": "dosyalar/tg/tg-yos/yos-mayis-denemeleri/yos-deneme-m4-cozum.pdf" },
          { "title": "TR-YÖS MAYIS DENEME - M5", "info": "Mayıs Dönemi Deneme Çözümü", "link": "dosyalar/tg/tg-yos/yos-mayis-denemeleri/yos-tg-m5-cozum.pdf" },
          { "title": "TR-YÖS MAYIS DENEME - M6", "info": "Mayıs Dönemi Deneme Çözümü", "link": "dosyalar/tg/tg-yos/yos-mayis-denemeleri/yos-tg-m6-cozum.pdf" },
          { "title": "TR-YÖS MAYIS DENEME - M7", "info": "Mayıs Dönemi Deneme Çözümü", "link": "dosyalar/tg/tg-yos/yos-mayis-denemeleri/yos-deneme-m7-cozum.pdf" },
          { "title": "TR-YÖS MAYIS DENEME - M8", "info": "Mayıs Dönemi Deneme Çözümü", "link": "dosyalar/tg/tg-yos/yos-mayis-denemeleri/yos-deneme-m8-cozum.pdf" },
          { "title": "TR-YÖS MAYIS DENEME - M9", "info": "Mayıs Dönemi Deneme Çözümü", "link": "dosyalar/tg/tg-yos/yos-mayis-denemeleri/yos-deneme-m9-cozum.pdf" },
          { "title": "TR-YÖS MAYIS DENEME - M10", "info": "Mayıs Dönemi Deneme Çözümü", "link": "dosyalar/tg/tg-yos/yos-mayis-denemeleri/yos-deneme-m10-cozum.pdf" },
          { "title": "TR-YÖS MAYIS DENEME - M11", "info": "Mayıs Dönemi Deneme Çözümü", "link": "dosyalar/tg/tg-yos/yos-mayis-denemeleri/yos-deneme-m11-cozum.pdf" },
          { "title": "TR-YÖS MAYIS DENEME - M12", "info": "Mayıs Dönemi Deneme Çözümü", "link": "dosyalar/tg/tg-yos/yos-mayis-denemeleri/yos-tg-m12-cozum.pdf" },
          { "title": "TR-YÖS MAYIS DENEME - M13", "info": "Mayıs Dönemi Deneme Çözümü", "link": "dosyalar/tg/tg-yos/yos-mayis-denemeleri/yos-tg-m13-cozum.pdf" },
          { "title": "TR-YÖS MAYIS DENEME - M14", "info": "Mayıs Dönemi Deneme Çözümü", "link": "dosyalar/tg/tg-yos/yos-mayis-denemeleri/yos-tg-m14-cozum.pdf" },
          { "title": "TR-YÖS MAYIS DENEME - M15", "info": "Mayıs Dönemi Deneme Çözümü", "link": "dosyalar/tg/tg-yos/yos-mayis-denemeleri/yos-tg-m15-cozum.pdf" },
          { "title": "TR-YÖS MAYIS DENEME - M16", "info": "Mayıs Dönemi Deneme Çözümü", "link": "dosyalar/tg/tg-yos/yos-mayis-denemeleri/yos-deneme-m16-cozum.pdf" },
          { "title": "TR-YÖS MAYIS DENEME - M17", "info": "Mayıs Dönemi Deneme Çözümü", "link": "dosyalar/tg/tg-yos/yos-mayis-denemeleri/yos-tg-m17-cozum.pdf" },
          { "title": "TR-YÖS MAYIS DENEME - M18", "info": "Mayıs Dönemi Deneme Çözümü", "link": "dosyalar/tg/tg-yos/yos-mayis-denemeleri/yos-deneme-m18-cozum.pdf" },
          { "title": "TR-YÖS MAYIS DENEME - M19", "info": "Mayıs Dönemi Deneme Çözümü", "link": "dosyalar/tg/tg-yos/yos-mayis-denemeleri/yos-tg-m19-cozum.pdf" },
          { "title": "TR-YÖS MAYIS DENEME - M20", "info": "Mayıs Dönemi Deneme Çözümü", "link": "dosyalar/tg/tg-yos/yos-mayis-denemeleri/yos-deneme-m20-cozum.pdf" }
        ]
      }
    ]
  },
  "tg-kpss": {
    "title": "KPSS Türkiye Geneli Deneme Çözümleri",
    "sections": [
      {
        "name": "KPSS TG 00 DENEME ÇÖZÜMLERİ",
        "items": [
          { "title": "KPSS TG 00 Deneme Çözümü", "info": "Genel Yetenek + Genel Kültür", "link": "dosyalar/tg/tg-kpss/kpss-tg-deneme-00-cozum.pdf" }
        ]
      },
      {
        "name": "KPSS TG 01 DENEME ÇÖZÜMLERİ",
        "items": [
          { "title": "KPSS TG 01 Deneme Çözümü", "info": "Genel Yetenek + Genel Kültür", "link": "dosyalar/tg/tg-kpss/kpss-tg-deneme-01-cozum.pdf" }
        ]
      },
      {
        "name": "2026 KPSS LİSANS DENEMELERİ",
        "items": [
          { "title": "KPSS LİSANS TG-1 DENEME", "info": "PDF Çözümü Görüntüle - Türkiye Geneli", "link": "dosyalar/tg/tg-kpss/2026-kpss-lisans-denemeleri/kpss-lisans-tg-1-deneme-cozum.pdf" },
          { "title": "KPSS LİSANS TG-2 DENEME", "info": "PDF Çözümü Görüntüle - Türkiye Geneli", "link": "dosyalar/tg/tg-kpss/2026-kpss-lisans-denemeleri/kpss-lisans-tg-2-deneme-cozum.pdf" },
          { "title": "KPSS LİSANS TG-3 DENEME", "info": "PDF Çözümü Görüntüle - Türkiye Geneli", "link": "dosyalar/tg/tg-kpss/2026-kpss-lisans-denemeleri/kpss-lisans-deneme-tg-3-cozum-1.pdf" },
          { "title": "KPSS LİSANS TG-4 DENEME", "info": "PDF Çözümü Görüntüle - Türkiye Geneli", "link": "dosyalar/tg/tg-kpss/2026-kpss-lisans-denemeleri/kpss-lisans-deneme-tg-4-cozum.pdf" },
          { "title": "KPSS LİSANS TG-5 DENEME", "info": "PDF Çözümü Görüntüle - Türkiye Geneli", "link": "dosyalar/tg/tg-kpss/2026-kpss-lisans-denemeleri/kpss-lisans-deneme-tg-5-cozum.pdf" },
          { "title": "KPSS LİSANS TG-6 DENEME", "info": "Türkiye Geneli", "link": "dosyalar/tg/KPSS LİSANS TG-6 ÇÖZÜM.pdf", "isNew": true }
        ]
      },
      {
        "name": "2026 KPSS ORTAÖĞRETİM-ÖN LİSANS DEN.",
        "items": [
          { "title": "KPSS ÖNLİSANS TG-1 DENEME", "info": "PDF Çözümü Görüntüle - Türkiye Geneli", "link": "dosyalar/tg/tg-kpss/on-lisans-2026-kpss-lisans-denemeleri/kpss-ortaogretim-onlisans-tg-1-deneme-cozum.pdf" },
          { "title": "KPSS ÖNLİSANS TG-2 DENEME", "info": "PDF Çözümü Görüntüle - Türkiye Geneli", "link": "dosyalar/tg/tg-kpss/on-lisans-2026-kpss-lisans-denemeleri/kpss-ortaogretim-onlisans-tg-2-deneme-cozum.pdf" },
          { "title": "KPSS ÖNLİSANS TG-3 DENEME", "info": "PDF Çözümü Görüntüle - Türkiye Geneli", "link": "dosyalar/tg/tg-kpss/on-lisans-2026-kpss-lisans-denemeleri/kpss-deneme-tg-3-cozum-onlisans2.pdf" },
          { "title": "KPSS ÖNLİSANS TG-4 DENEME", "info": "PDF Çözümü Görüntüle - Türkiye Geneli", "link": "dosyalar/tg/tg-kpss/on-lisans-2026-kpss-lisans-denemeleri/kpss-ortaogretim-onlisans-deneme-tg-4-cozum.pdf" },
          { "title": "KPSS ÖNLİSANS TG-5 DENEME", "info": "PDF Çözümü Görüntüle - Türkiye Geneli", "link": "dosyalar/tg/tg-kpss/on-lisans-2026-kpss-lisans-denemeleri/kpss-lise-onlisans-tg-5-deneme-cozum.pdf" },
          { "title": "KPSS LİSE-ÖNLİSANS TG-6 DENEME", "info": "Genel Yetenek + Genel Kültür", "link": "dosyalar/tg/KPSS LİSE-ÖNLİSANS TG-6 DENEME ÇÖZÜM.pdf", "isNew": true }
        ]
      },
      {
        "name": "2026 E-KPSS DENEMELERİ",
        "items": [
          { "title": "EKPSS TG-1 DENEME", "info": "PDF Çözümü Görüntüle - Türkiye Geneli", "link": "dosyalar/tg/tg-kpss/2026-e-kpss-denemeleri/ekpss-deneme-tg-1-cozum.pdf" },
          { "title": "EKPSS TG-2 DENEME", "info": "PDF Çözümü Görüntüle - Türkiye Geneli", "link": "dosyalar/tg/tg-kpss/2026-e-kpss-denemeleri/ekpss-deneme-tg-2-cozum.pdf" },
          { "title": "EKPSS TG-3 DENEME", "info": "PDF Çözümü Görüntüle - Türkiye Geneli", "link": "dosyalar/tg/tg-kpss/2026-e-kpss-denemeleri/e-kpss-deneme-tg-3-cozum.pdf" }
        ]
      }
    ]
  },
  "tg-ales": {
    "title": "TG ALES Deneme Çözümleri",
    "sections": [
      {
        "name": "TÜRKİYE GENELİ DENEME ÇÖZÜMLERİ",
        "items": [
          { "title": "ALES TÜRKİYE GENELİ DENEME ÇÖZÜMÜ", "info": "Sayısal + Sözel Tam Çözüm", "link": "dosyalar/tg/tg-ales/ales-turkiye-geneli-deneme-cozum.pdf" }
        ]
      }
    ]
  },
  "tg-kts": {
    "title": "TG KTS Deneme Çözümleri",
    "sections": [
      {
        "name": "KURUMSAL TAKİP SINAVLARI (KTS)",
        "items": [
          { "title": "DGS ARA DENEME - 1 ÇÖZÜM", "info": "Dikey Geçiş Sınavı Ara Deneme", "link": "dosyalar/tg/tg-kts/dgs-ara-deneme-sinavi---1-cozum.pdf" },
          { "title": "DGS ARA DENEME - 2 ÇÖZÜM", "info": "Dikey Geçiş Sınavı Ara Deneme", "link": "dosyalar/tg/tg-kts/dgs-ara-deneme-2-cozum.pdf" },
          { "title": "KONU TARAMA - 3 ÇÖZÜM", "info": "Konu Tarama Testi Çözümü", "link": "dosyalar/tg/tg-kts/konu-tarama---3-cozum.pdf" },
          { "title": "KTS DENEME - 4 ÇÖZÜM", "info": "Kurumsal Takip Sınavı - 4", "link": "dosyalar/tg/tg-kts/kts-deneme-4-cozumler.pdf" },
          { "title": "KTS DENEME - 5 ÇÖZÜM", "info": "Kurumsal Takip Sınavı - 5", "link": "dosyalar/tg/tg-kts/kts-deneme-5-cozumler.pdf" }
        ]
      }
    ]
  },
  "tg-mebags": {
    "title": "TG MEB-AGS Deneme Çözümleri",
    "sections": [
      {
        "name": "MEB-AGS DENEME ÇÖZÜMLERİ",
        "items": [
          { "title": "MEB-AGS DENEME - 1 ÇÖZÜM", "info": "Millî Eğitim Bakanlığı AGS", "link": "dosyalar/tg/tg-meb-ags/meb-ags-deneme-1-cozum.pdf" },
          { "title": "MEB-AGS DENEME - 2 ÇÖZÜM", "info": "Millî Eğitim Bakanlığı AGS", "link": "dosyalar/tg/tg-meb-ags/meb-ags-deneme-2-cozum.pdf" },
          { "title": "MEB-AGS DENEME - 3 ÇÖZÜM", "info": "Millî Eğitim Bakanlığı AGS", "link": "dosyalar/tg/tg-meb-ags/meb-ags-deneme-3-cozum.pdf" },
          { "title": "MEB-AGS DENEME - 4 ÇÖZÜM", "info": "Millî Eğitim Bakanlığı AGS", "link": "dosyalar/tg/tg-meb-ags/meb-ags-deneme-4-cozum.pdf" },
          { "title": "MEB-AGS DENEME - 5 ÇÖZÜM", "info": "Millî Eğitim Bakanlığı AGS", "link": "dosyalar/tg/tg-meb-ags/meb-ags-deneme-5-cozum.pdf" },
          { "title": "MEB-AGS DENEME - 6 ÇÖZÜM", "info": "Millî Eğitim Bakanlığı AGS", "link": "dosyalar/tg/MEB-AGS DENEME-6 çözüm.pdf", "isNew": true }
        ]
      }
    ]
  },
  "tg-msu": {
    "title": "TG MSÜ Deneme Çözümleri",
    "sections": [
      {
        "name": "MSÜ DENEME ÇÖZÜMLERİ",
        "items": [
          { "title": "MSÜ DENEME - 1 ÇÖZÜM", "info": "Milli Savunma Üniversitesi Denemesi", "link": "dosyalar/tg/tg-msu/msu-deneme-1-cozum.pdf" }
        ]
      }
    ]
  }
};

const mapping = {
  "tg-dgs": "tg-deneme-cozumleri",
  "tg-yos": "tasari-yos-denemeleri",
  "tg-kpss": "kpss-tg-cozumleri",
  "tg-ales": "ales-deneme-cozumleri",
  "tg-mebags": "meb-ags-deneme-sinav-cozumleri",
  "tg-kts": "kts-deneme-sinavi",
  "tg-msu": "msu-cozumleri"
};

const jsonPath = 'src/data/solutions.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

for (const [oldKey, newKey] of Object.entries(mapping)) {
  if (SOLUTIONS_DATA[oldKey]) {
    const entry = SOLUTIONS_DATA[oldKey];
    // Fix links
    entry.sections.forEach(section => {
      section.items.forEach(item => {
        if (!item.link.startsWith('/')) {
          item.link = '/' + item.link;
        }
      });
    });
    data[newKey] = entry;
    console.log(`Updated ${newKey} from ${oldKey}`);
  }
}

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
console.log('Migration complete!');
