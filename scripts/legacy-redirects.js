/**
 * Eski Wix sitesi (tasariegitimyayinlari.com) URL eşleştirme tablosu.
 *
 * Kitapların üzerindeki QR kodlar bu eski adreslere işaret ettiği için
 * her bir eski URL yeni sitenin ilgili sayfasına (301) yönlendirilir.
 *
 * Kaynak: https://www.tasariegitimyayinlari.com/pages-sitemap.xml (tarama: 2026-08)
 */

const r = (source, destination) => ({ source, destination, permanent: true });

module.exports = [
  // ============================================================
  // ANA / HUB SAYFALAR
  // ============================================================
  r('/bolumler', '/kitap-deneme-cozumleri'),
  r('/kitap-cozumleri', '/kitap-deneme-cozumleri'),
  r('/dgs-kitap-cozumleri', '/kitap-deneme-cozumleri'),
  r('/tasari-egitim-yayinlari-hakkimizda', '/hakkimizda'),
  r('/alti-sapka-yayinlari', '/alti-sapka'),
  r('/dgs-cozumleri', '/dgs-deneme-sinav-cozumleri'),

  // ============================================================
  // DGS MATEMATİK SORU BANKASI KONULARI
  // Her konu -> /cozumler/dgs-matematik/<konu> (dizin listeleme)
  // ============================================================

  // ============================================================
  // DGS DENEME / KİTAP ÇÖZÜMLERİ
  // ============================================================

  // Eski siteden taşınan (indirilen) içerikler

  // ============================================================
  // ALES
  // ============================================================

  // ============================================================
  // YÖS
  // ============================================================
  r('/tryos-2024-2025sinavlari', '/tasari-yos-denemeleri'),

  // ============================================================
  // KPSS
  // ============================================================

  // ============================================================
  // LGS
  // ============================================================
  r('/lgs-matematik-soru-bankasi', '/lgs'),

  // ============================================================
  // TYT-AYT
  // ============================================================
  r('/ayt-tyt-sorular', '/ayt-tyt'),

  // ============================================================
  // ÇÖZÜM PORTALI (solutions.json slug'ları)
  // ============================================================
  
];
