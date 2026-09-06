import Link from 'next/link';

export const metadata = {
  title: 'MEB-AGS Kitap Çözümleri | Tasarı Eğitim Yayınları',
  description: 'MEB-AGS kitap çözümleri. Sayısal-Sözel Yetenek, 5\'li Deneme, Tarih & Türkiye Coğrafyası, Mevzuat, Eğitim Temelleri ve Dil Bilgisi soru bankası çözümleri ücretsiz.',
};

const books = [
  {
    label: 'MEB-AGS Sayısal-Sözel Yetenek',
    subtitle: 'Soru Bankası Çözümleri',
    image: '/images/meb-ags/meb-ags-sayisal-sozel-yetenek-soru-bankasi.avif',
    href: '/ags-sayisal-sozel-yetenek-cozumleri',
    external: false,
  },
  {
    label: 'MEB-AGS 5\'li Deneme',
    subtitle: 'Deneme Çözümleri',
    image: '/images/meb-ags/meb-ags-5-cozumlu-guncel-deneme.avif',
    href: '/ags-5-li-deneme',
    external: false,
  },
  {
    label: 'MEB-AGS Tarih & Türkiye Coğrafyası',
    subtitle: 'Soru Bankası Çözümleri',
    image: '/images/meb-ags/meb-ags-tarih-turkiye-cografyasi-soru-bankasi.avif',
    href: '/ags-tarih-turkiye-cografyasi',
    external: false,
  },
  {
    label: 'MEB-AGS Mevzuat Soru Bankası',
    subtitle: 'Soru Bankası Çözümleri',
    image: '/images/meb-ags/meb-ags-konu-anlatimli-mevzuat-bilgisi-soru-bankasi.avif',
    href: '/ags-mevzuat-soru-bankasi',
    external: false,
  },
  {
    label: 'MEB-AGS Eğitim Temelleri Soru Bankası',
    subtitle: 'Soru Bankası Çözümleri',
    image: '/images/meb-ags/meb-ags-egitimin-temelleri-turk-egt.sistemi-soru-bankasi.avif',
    href: '/ags-egitim-temelleri-soru-bankasi',
    external: false,
  },
  {
    label: 'MEB-AGS Konu Anlatımlı',
    subtitle: 'Eğitimin Temelleri • Türk Milli Eğitim Sistemi • Mevzuat Bilgisi',
    image: '/images/meb-ags/meb-ags-egitimin-temelleri-turk-egitim-sis.-ve-mevzuat-bilgisi-soru-bankasi.avif',
    href: '/pdf-goster?file=/dosyalar/ags-konu-anlatimli/meb-ags-konu-anlatimli-soru-bankasi-egitimin-temelleri-turk-milli-egitim-sistemi-mevzuat-bilgisi-cozumleri.pdf',
    external: true,
  },
  {
    label: 'Dil Bilgisi Soru Bankası',
    subtitle: 'Soru Bankası Çözümleri',
    image: '/images/meb-ags/meb-ags-turkce-konu-anlatimi-kitap.avif',
    href: '/ags-dil-bilgisi-soru-bankasi',
    external: false,
  },
];

export default function MebAgsCozumlerPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>MEB-AGS Çözümleri</h1>
          <p>MEB-AGS kitap ve soru bankası çözümleri</p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2 style={{textAlign: 'center', marginBottom: '40px'}}>
            AGS KİTAP ÇÖZÜMLERİ
          </h2>
          <div className="book-showcase">
            {books.map((book, index) => (
              <div
                key={index}
                className="fade-in"
                style={{animationDelay: `${index * 0.05}s`}}
              >
                {book.external ? (
                  <a
                    href={book.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="book-card"
                  >
                    <div className="book-cover">
                      <img src={book.image} alt={book.label} className="book-cover-img" loading="lazy" />
                    </div>
                    <div className="book-info">
                      <h4>{book.label}</h4>
                      <span>{book.subtitle}</span>
                      <span className="premium-btn">Çözümü Görüntüle</span>
                    </div>
                  </a>
                ) : (
                  <Link href={book.href} className="book-card">
                    <div className="book-cover">
                      <img src={book.image} alt={book.label} className="book-cover-img" loading="lazy" />
                    </div>
                    <div className="book-info">
                      <h4>{book.label}</h4>
                      <span>{book.subtitle}</span>
                      <span className="premium-btn">Kitap Çözümleri</span>
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}