/** @type {import('next').NextConfig} */
const legacyRedirects = require('./scripts/legacy-redirects.js');
const legacyMap = require('./src/data/legacy-map.json');

// Legacy kısa yollar artık kök catch-all (src/app/[...segs]) ile doğrudan dizin
// listelendiği için bunlar için 301 redirect gerekmez (uzun dizin yoluna taşır).
const directoryShortPaths = new Set(Object.keys(legacyMap));

const nextConfig = {
  /**
   * URL Yönlendirmeleri (Redirects)
   *
   * Eski Wix sitesinde bulunan URL'leri yeni site URL'lerine yönlendirir.
   * QR kodlarla kitaplardan gelen ziyaretçiler doğru sayfaya ulaşır.
   *
   * Kaynak: pages-sitemap.xml (tarama: 2026-08) — detaylar legacy-redirects.js
   */
  async redirects() {
    return [
      // ===== Kategori hub sayfaları =====
      {
        source: '/kpss-tg-deneme-cozumleri',
        destination: '/kpss-tg-cozumleri',
        permanent: true,
      },
      {
        source: '/yos-denemeleri',
        destination: '/tasari-yos-denemeleri',
        permanent: true,
      },
      {
        source: '/tyt-ayt-cozumleri',
        destination: '/tyt-ayt-deneme-cozumleri',
        permanent: true,
      },
      {
        source: '/meb-ags',
        destination: '/meb-ags-cozumler',
        permanent: true,
      },
      {
        source: '/ales-cozumleri',
        destination: '/ales-deneme-cozumleri',
        permanent: true,
      },

      // ===== Sitemap'ten gelen tüm eski URL eşleştirmeleri =====
      ...legacyRedirects.filter(
        (r) => !directoryShortPaths.has(r.source.replace(/^\//, ''))
      ),
    ];
  },

  output: 'standalone',

  // Görsel optimizasyonu
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: true,
  },
  
  // Passenger (cPanel) statik dosyaları sıkıştırırken çakışma olmaması için Next.js sıkıştırmasını kapatıyoruz.
  // Bu genellikle statik dosyalarda (CSS/JS/Resim) 500 Internal Server Error hatasını çözer.
  compress: false,
  
  // cPanel performans optimizasyonları
  experimental: {
    // optimizeCss: true, // CSS optimizasyonu çalışma zamanında hataya yol açabiliyor, kapattık.
  },
};

module.exports = nextConfig;