export const metadata = {
  title: '2026 E-KPSS Denemeleri | Tasarı Eğitim Yayınları',
  description: '2026 E-KPSS deneme sınavları çözümleri ücretsiz olarak sunulmaktadır.',
};

const files = [
  { label: '2026 E-KPSS DENEME ÇÖZÜMLERİ-1', file: 'ekpss-deneme-tg-1-cozum.pdf' },
  { label: '2026 E-KPSS DENEME ÇÖZÜMLERİ-2', file: 'ekpss-deneme-tg-2-cozum.pdf' },
  { label: '2026 E-KPSS DENEME ÇÖZÜMLERİ-3', file: 'e-kpss-deneme-tg-3-cozum.pdf' },
  { label: '2026 E-KPSS DENEME ÇÖZÜMLERİ-4', file: 'e-kpss-deneme-tg-4-cozum.pdf' },
  { label: '2026 E-KPSS DENEME ÇÖZÜMLERİ-5', file: 'e-kpss-deneme-tg-5-cozum.pdf' },
];

export default function KpssEKpssDenemeleriPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>2026 E-KPSS DENEMELERİ</h1>
          <p>E-KPSS deneme sınavı çözümleri</p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div style={{maxWidth: '800px', margin: '0 auto'}}>
            {files.map((item, index) => (
              <a
                key={index}
                href={`/pdf-goster?file=/dosyalar/turkiye-geneli-denemeleri/kpss/2026-e-kpss-denemeleri/${item.file}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`sol-card card-color-${index % 6} fade-in`}
                style={{animationDelay: `${index * 0.05}s`}}
              >
                <div className="icon-box">
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="sol-details">
                  <h4>{item.label}</h4>
                  <p>PDF Dosyası • Çözümü görüntüle</p>
                </div>
                <div className="sol-download">
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}