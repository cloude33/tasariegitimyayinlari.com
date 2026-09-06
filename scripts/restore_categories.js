const fs = require('fs');
const jsonPath = 'C:\\Users\\HUSEYIN\\Desktop\\Tasari_Web\\tasariegitimyayinlari.com\\src\\data\\solutions.json';
const solutionsData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

// KPSS
solutionsData['kpss'] = {
  title: "KPSS Kitap ve Deneme Çözümleri",
  sections: [
    {
      name: "KPSS Çözümleri",
      items: [
        { title: "Matematik 30'da 30 Net", image: "/images/kpss/KPSS MATEMATİK VİDEO ÇÖZÜMLÜ 30'DA 30 NET_JPG.jpg", badge: "Soru Bankası", subtitle: "KPSS Çözümleri", link: "/dosyalar/cozumler/kpss-cozumleri/30da-30-net-matematik-cozum.pdf" },
        { title: "Matematik 20 Deneme", image: "/images/kpss/MATEMATİK 20 DENEME_JPG.jpg", badge: "20 Deneme", subtitle: "KPSS Çözümleri", link: "/cozumler/kpss-matematik-20-deneme" },
        { title: "Matematik Soru Bankası", image: "/images/kpss/KPSS ÇÖZ_MAT_SB_.jpg", badge: "Soru Bankası", subtitle: "KPSS Çözümleri", link: "/cozumler/kpss-matematik-soru-bankasi" },
        { title: "Tarih Soru Bankası", image: "/images/kpss/KPSS TARİH SORU BANKASI.jpg", badge: "Soru Bankası", subtitle: "KPSS Çözümleri", link: "/dosyalar/cozumler/kpss-cozumleri/kpss-tarih-soru-bankasi-cozum.pdf" },
        { title: "Coğrafya Soru Bankası", image: "/images/kpss/KPSS COĞRAFYA S_B 3D.jpg", badge: "Soru Bankası", subtitle: "KPSS Çözümleri", link: "/dosyalar/cozumler/kpss-cozumleri/cografya-soru-bankasi-cozum-son.pdf" },
        { title: "Türkçe Soru Bankası", image: "/images/kpss/KPSS TÜRKÇE SORU BANKASI.jpg", badge: "Soru Bankası", subtitle: "KPSS Çözümleri", link: "/dosyalar/cozumler/kpss-cozumleri/kpss-turkce-soru-bankasi-cozumleri.pdf" },
        { title: "27'de 27 Net Tarih", image: "/images/kpss/2727_PNG.png", badge: "Soru Bankası", subtitle: "KPSS Çözümleri", link: "/dosyalar/cozumler/kpss-cozumleri/kpss-27de-27-net-tarih-cozumleri.pdf" },
        { title: "Türkçe 30'da 30 Net", image: "/images/kpss/_3D KPSS 30'DA 30 NET TÜRKÇE SORU BANKASI.jpg", badge: "Soru Bankası", subtitle: "KPSS Çözümleri", link: "/dosyalar/cozumler/kpss-cozumleri/30da-30-net-kpss-turkce-cozum.pdf" },
        { title: "Problemlerin İlacı", image: "/images/kpss/problemlerin ilacı.jpg", badge: "Soru Bankası", subtitle: "KPSS Çözümleri", link: "/cozumler/problemlerin-ilaci-cozum" },
        { title: "888 Sözel Yetenek", image: "/images/kpss/888 SÖZEL_JPG.jpg", badge: "Soru Bankası", subtitle: "KPSS Çözümleri", link: "/dosyalar/cozumler/kpss-cozumleri/888-sozel-cozum-kitapcigi-son.pdf" },
        { title: "888 Sayısal Yetenek", image: "/images/kpss/888 sayısal yetenek.jpg", badge: "Soru Bankası", subtitle: "KPSS Çözümleri", link: "/dosyalar/cozumler/kpss-cozumleri/888-sayisal-cozumler.pdf" },
        { title: "Türkçe 20 Deneme", image: "/images/kpss/3D KPSS TÜRKÇE 20 DENEME.jpg", badge: "20 Deneme", subtitle: "KPSS Çözümleri", link: "/dosyalar/cozumler/kpss-cozumleri/turkiye-karmasi-turkce-20--deneme-sinavi.pdf" },
        { title: "Net Coğrafya", image: "/images/kpss/NET COĞRAFYA 3D.jpg", badge: "Soru Bankası", subtitle: "KPSS Çözümleri", link: "/dosyalar/cozumler/kpss-cozumleri/cografya-18de-18-net-cozum.pdf" },
        { title: "Eğitim Bilimleri 5'li Deneme", image: "/images/kpss/KPSS EĞİTİM BİLİMLERİ 5'Lİ DENEME.jpg", badge: "5'li Deneme", subtitle: "KPSS Çözümleri", link: "/dosyalar/cozumler/kpss-cozumleri/egitim-bilimleri-5li-deneme-cozum-2024.pdf" },
        { title: "Komple Paragraf", image: "/images/kpss/KOMPLE PARAGRAF 3D.jpg", badge: "Soru Bankası", subtitle: "KPSS Çözümleri", link: "/cozumler/komple-paragraf-cozumleri" },
        { title: "Tüm Dersler Soru Bankası", image: "/images/kpss/DERSLER.jpg", badge: "Soru Bankası", subtitle: "KPSS Çözümleri", link: "/cozumler/kpss-cozumlu-tum-dersler" },
        { title: "GY-GK 6 Muhteşem Deneme", image: "/images/kpss/KPSS GY-GK 6 MUHTEŞEM 3D.jpg", badge: "6 Deneme", subtitle: "KPSS Çözümleri", link: "/cozumler/kpss-6-muhtesem-deneme-cozumleri" },
        { title: "EKPSS Son Prova 5'li Deneme", image: "/images/kpss/3D EKPSS SON PROVA 5Lİ DENEME.jpg", badge: "5'li Deneme", subtitle: "KPSS Çözümleri", link: "/cozumler/ekpss-son-prova-5-deneme-cozumleri" },
        { title: "Artı Dilbilgisi", image: "/images/kpss/3D ARTI DİLBİLGİSİ SB_.jpg", badge: "Soru Bankası", subtitle: "KPSS Çözümleri", link: "/cozumler/kpss-arti-dil-bilgisi-cozumleri" },
        { title: "5 Süper Deneme", image: "/images/kpss/3D KPSS 5 SÜPER DENEME.jpg", badge: "5 Deneme", subtitle: "KPSS Çözümleri", link: "/cozumler/kpss-5-super-deneme-cozumleri" }
      ]
    }
  ]
};

// YOS
solutionsData['yos'] = {
  title: "YÖS Kitap ve Deneme Çözümleri",
  sections: [
    {
      name: "Kitap & Deneme Çözümleri",
      items: [
        { title: "YÖS 11 Deneme Sınavı", image: "/images/yos 11 deneme.jpg", badge: "11 Deneme", subtitle: "Deneme Çözümleri", link: "/cozumler/yos-11-deneme" },
        { title: "YÖS 12 Deneme Sınavı", image: "/images/yos12-deneme.jpg", badge: "12 Deneme", subtitle: "Deneme Çözümleri", link: "/cozumler/yos-12-deneme" },
        { title: "YÖS IQ Çözümlü Soru Bankası", image: "/images/yos-iq-cozumlü .jpg", badge: "Soru Bankası", subtitle: "Soru Bankası Çözümleri", link: "/cozumler/yos-iq-soru-bankasi" },
        { title: "YÖS 80'de 80 Net", image: "/images/yos 80'DE 80 NET.jpg", badge: "80 Soru", subtitle: "Soru Çözümleri", link: "/cozumler/yos-80den-80" },
        { title: "TR-YÖS 6 Türkiye Geneli Deneme", image: "/images/yos 6 TÜRKİYE GENELİ DENEME.jpg", badge: "6 Deneme", subtitle: "Deneme Çözümleri", link: "/cozumler/yos-tr-yos-deneme" },
        { title: "TR-YÖS Matematik 40x10 Deneme", image: "/images/yos MAT_DENEME.jpeg", badge: "10 Deneme", subtitle: "Deneme Çözümleri", link: "/cozumler/yos-tr-yos-matematik" }
      ]
    }
  ]
};

// DGS
solutionsData['dgs-kitap'] = {
  title: "DGS Çözüm Portalı",
  hasTabs: true,
  sections: [
    {
      name: "Güncel Yayınlar",
      items: [
        { title: "Türkçe 50'de 50 Net", image: "/images/dgs-soru-bankalari/tÜRKÇE SORU_JPG.jpg", badge: "Soru Bankası", subtitle: "DGS-ALES Ortak", link: "/cozumler/dgs-ales-50-50-turkce-cozumleri" },
        { title: "Problemlerin İlacı", image: "/images/dgs-soru-bankalari/problemlerin ilacı.jpg", badge: "Soru Bankası", subtitle: "Temel Seviye", link: "/cozumler/problemlerin-ilaci-cozum" },
        { title: "Türkçe Soru Bankası", image: "/images/dgs-soru-bankalari/DGS TÜRKÇE SORU .jpg", badge: "Soru Bankası", subtitle: "Çözümlü", link: "/dosyalar/cozumler/ales-cozumleri/alesturkce.pdf" },
        { title: "Ekstra Matematik Soru Bankası", image: "/images/dgs-soru-bankalari/DGS EKSTRA SORU .jpg", badge: "Soru Bankası", subtitle: "DGS Hazırlık", link: "/cozumler/dgs-matematik-soru-bankasi-cozumleri" },
        { title: "888 Soru Sözel Yetenek", image: "/images/dgs-soru-bankalari/888 SÖZEL_JPG.jpg", badge: "Soru Bankası", subtitle: "DGS-ALES Ortak", link: "/dosyalar/cozumler/ales-cozumleri/888-sozel-cozum-kitapcigi-son.pdf" },
        { title: "888 Soru Sayısal Yetenek", image: "/images/dgs-soru-bankalari/888 sayısal yetenek.jpg", badge: "Soru Bankası", subtitle: "DGS-ALES Ortak", link: "/dosyalar/cozumler/ales-cozumleri/888-sayisal-cozumler.pdf" }
      ]
    },
    {
      name: "Arşiv Yayınlar",
      items: [
        { title: "DGS 20 Günde Tekrar", image: "/images/dgs-soru-bankalari/DGS 20 GÜNDE.jpg", badge: "Tekrar Kampı", subtitle: "Hızlandırılmış", link: "/cozumler/dgs-20-gunde-tekrar" },
        { title: "Garanti Serisi - 1", image: "/images/dgs-soru-bankalari/DGS SORU KAMPI 1.jpg", badge: "Soru Kampı", subtitle: "İlk 15 Test", link: "/cozumler/dgs-soru-kampi-1-15-cozumleri" }
      ]
    }
  ]
};

// ALES
solutionsData['ales'] = {
  title: "ALES Kitap ve Deneme Çözümleri",
  sections: [
    {
      name: "ALES Çözümleri",
      items: [
        { title: "Türkçe 50'de 50 Net", image: "/images/dgs-soru-bankalari/tÜRKÇE SORU_JPG.jpg", badge: "Soru Bankası", subtitle: "DGS-ALES Ortak", link: "/cozumler/dgs-ales-50-50-turkce-cozumleri" },
        { title: "Matematik 50'de 50 Net", image: "/images/dgs-soru-bankalari/MATEMATİK 50_JPG.jpg", badge: "Soru Bankası", subtitle: "DGS-ALES Ortak", link: "/cozumler/ales-50de50-matematik" }
      ]
    }
  ]
};

// MEB-AGS
solutionsData['meb-ags'] = {
  title: "MEB-AGS Kitap Çözümleri",
  sections: [
    {
      name: "AGS Kitapları",
      items: [
        { title: "Sayısal & Sözel Yetenek", image: "/images/3D MEB-AGS SAYISAL SÖZEL S_B.jpg", badge: "Soru Bankası", subtitle: "MEB-AGS Çözümleri", link: "/cozumler/ags-sayisal-sozel-yetenek-cozumleri" },
        { title: "Tarih & Türkiye Coğrafyası", image: "/images/WhatsApp Image 2024-12-19 at 15_38_28.jpeg", badge: "Soru Bankası", subtitle: "MEB-AGS Çözümleri", link: "/cozumler/ags-tarih-turkiye-cografyasi" },
        { title: "Mevzuat Bilgisi", image: "/images/WhatsApp Image 2025-01-02 at 15_29_05.jpeg", badge: "Soru Bankası", subtitle: "MEB-AGS Çözümleri", link: "/cozumler/ags-mevzuat-soru-bankasi" },
        { title: "Eğitim Bilimleri", image: "/images/3D EĞİTİMİN TEMELLERİ.jpg", badge: "Soru Bankası", subtitle: "MEB-AGS Çözümleri", link: "/cozumler/ags-egitim-temelleri-soru-bankasi" },
        { title: "AGS 5'li Deneme Seti", image: "/images/3D-MEB-AGS ÇÖZÜMLÜ 5'Lİ DENEME.jpg", badge: "5'li Deneme", subtitle: "Deneme Çözümleri", link: "/cozumler/ags-5-li-deneme" },
        { title: "Artı Dilbilgisi", image: "/images/3D ARTI DİLBİLGİSİ SB_.jpg", badge: "Soru Bankası", subtitle: "Soru Bankası Çözümleri", link: "/cozumler/ags-dil-bilgisi-soru-bankasi" }
      ]
    }
  ]
};

// LGS
solutionsData['lgs'] = {
  title: "LGS Çözüm Merkezi",
  sections: [
    {
      name: "LGS Soru Bankaları",
      items: [
        { title: "İnkılap Tarihi", image: "/images/3D INKILAP TARİHİ.jpg", badge: "Soru Bankası", subtitle: "LGS Soru Bankası Çözümleri", link: "/cozumler/lgs-tarih-soru-bankasi" },
        { title: "Din Kültürü", image: "/images/3D DİN KÜLTÜRÜ SB.jpg", badge: "Soru Bankası", subtitle: "LGS Soru Bankası Çözümleri", link: "/cozumler/lgs-din-kulturu-soru-bankasi" },
        { title: "Türkçe", image: "/images/3D TÜRKÇE SORU BANKASI.jpg", badge: "Soru Bankası", subtitle: "LGS Soru Bankası Çözümleri", link: "/cozumler/lgs-turkce-soru-bankasi" },
        { title: "Matematik", image: "/images/3D LGS GARANTİ SERİSİ MATEMATİK 3D.jpg", badge: "Soru Bankası", subtitle: "LGS Soru Bankası Çözümleri", link: "/cozumler/lgs-matematik-soru-bankasi" },
        { title: "Fen Bilimleri", image: "/images/3D MUTLAK DEĞER-FEN BİLİMLERİ SB.jpg", badge: "Soru Bankası", subtitle: "LGS Soru Bankası Çözümleri", link: "/cozumler/lgs-fen-bilgisi-soru-bankasi" }
      ]
    }
  ]
};

// AYT-TYT
solutionsData['ayt-tyt'] = {
  title: "TYT-AYT Kitap Çözümleri",
  sections: [
    {
      name: "TYT-AYT Kitap ve Deneme Çözümleri",
      items: [
        { title: "TYT Matematik Plus 6 Deneme", image: "/images/1-TYT MATEMATİK PLAS 6 DENEME.jpg", badge: "6 Deneme", subtitle: "TYT-AYT Çözümleri", link: "/cozumler/tyt-6-li-deneme-matematik" },
        { title: "TYT Türkçe Plus 6 Deneme", image: "/images/2-TYT TÜRKÇE PLAS 6 DENEME.jpg", badge: "6 Deneme", subtitle: "TYT-AYT Çözümleri", link: "/cozumler/tyt-6-li-deneme-turkce" },
        { title: "Problemlerin İlacı", image: "/images/3-PROBLEMLERİN İLACI.jpg", badge: "Soru Bankası", subtitle: "TYT-AYT Çözümleri", link: "/cozumler/problemlerin-ilaci-cozum" },
        { title: "TYT 5'li Deneme", image: "/images/4- TYT 5Lİ DENEME.jpg", badge: "5 Deneme", subtitle: "TYT-AYT Çözümleri", link: "/cozumler/tyt-ayt-5li-deneme" },
        { title: "TYT Bursluluk Deneme Sınavı", image: "/images/5-TYT BURSLULUK DENEME SINAVI.jpg", badge: "Deneme", subtitle: "TYT-AYT Çözümleri", link: "/dosyalar/cozumler/tyt-ayt-cozumleri/tyt-deneme-cozum.pdf" },
        { title: "TYT-1 Bursluluk", image: "/images/6-TYT-1 BURSLULUK.jpg", badge: "Deneme", subtitle: "TYT-AYT Çözümleri", link: "/dosyalar/cozumler/tyt-ayt-cozumleri/tyt-deneme-1-cozum.pdf" },
        { title: "Yeni Nesil Matematik", image: "/images/7-YENİ NESİL MATEMATİK.jpg", badge: "Soru Bankası", subtitle: "TYT-AYT Çözümleri", link: "/dosyalar/cozumler/tyt-ayt-cozumleri/YENİ NESİL MATEMATİK ÇÖZÜMÜ .pdf" },
        { title: "Komple Paragraf", image: "/images/8-KOMPLE PARAGRAF.jpg", badge: "Soru Bankası", subtitle: "TYT-AYT Çözümleri", link: "/cozumler/komple-paragraf-cozumleri" },
        { title: "Artı Türkçe 40'ta 40 Net", image: "/images/10-TYT ARTI TÜRKÇE 40TA 40 NET.jpg", badge: "Soru Bankası", subtitle: "TYT-AYT Çözümleri", link: "/dosyalar/cozumler/tyt-ayt-cozumleri/turkce-cozumler.pdf" },
        { title: "Artı Problemler", image: "/images/3D ARTI PROBLEMLER.jpg", badge: "Soru Bankası", subtitle: "TYT-AYT Çözümleri", link: "/cozumler/arti-problemler-soru-bankasi" },
        { title: "Artı Paragraf", image: "/images/ARTI PARAGRAF 3D.jpg", badge: "Soru Bankası", subtitle: "TYT-AYT Çözümleri", link: "/cozumler/arti-paragraf-kitabi-cozumleri" },
        { title: "Artı Dilbilgisi", image: "/images/3D ARTI DİLBİLGİSİ SB_.jpg", badge: "Soru Bankası", subtitle: "TYT-AYT Çözümleri", link: "/cozumler/ags-dil-bilgisi-soru-bankasi" }
      ]
    }
  ]
};

fs.writeFileSync(jsonPath, JSON.stringify(solutionsData, null, 2), 'utf-8');
console.log('Fully restored main category pages in solutions.json');
