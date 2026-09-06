import Link from 'next/link';

export const metadata = {
  title: 'KPSS TG Çözümleri | Tasarı Eğitim Yayınları',
  description: 'KPSS Türkiye Geneli deneme sınavı çözümleri. TG 00, TG 01 ve 2026 KPSS deneme çözümleri ücretsiz.',
};

const buttons = [
  {
    label: 'KPSS TG 00 DENEME ÇÖZÜMLERİ',
    href: '/pdf-goster?file=/dosyalar/turkiye-geneli-denemeleri/kpss/kpss-tg-deneme-00-cozum.pdf',
    external: true,
  },
  {
    label: 'KPSS TG 01 DENEME ÇÖZÜMLERİ',
    href: '/pdf-goster?file=/dosyalar/turkiye-geneli-denemeleri/kpss/kpss-tg-deneme-01-cozum.pdf',
    external: true,
  },
  {
    label: '2026 KPSS LİSANS DENEMELERİ',
    href: '/2026-kpss-lisans-denemeleri',
    external: false,
  },
  {
    label: '2026 KPSS ORTAÖĞRETİM-ÖN LİSANS DEN.',
    href: '/on-lisans-2026-kpss-lisans-denemeleri',
    external: false,
  },
  {
    label: '2026 E-KPSS DENEMELERİ',
    href: '/2026-e-kpss-denemeleri',
    external: false,
  },
];

export default function TgKpssPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero-strip" aria-hidden="true" />
        <div className="container">
          <h1>KPSS TG <span className="hero-title-accent">Çözümleri</span></h1>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2 style={{textAlign: 'center', marginBottom: '40px'}}>
            KPSS TÜRKİYE GENELİ DENEME ÇÖZÜMLERİ
          </h2>
          <div style={{maxWidth: '800px', margin: '0 auto'}}>
            {buttons.map((btn, index) => {
              const colorIdx = index % 6;
              return btn.external ? (
                <a
                  key={index}
                  href={btn.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`sol-card card-color-${colorIdx} fade-in`}
                  style={{animationDelay: `${index * 0.05}s`}}
                >
                  <div className="icon-box">
                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div className="sol-details">
                    <h4>{btn.label}</h4>
                    <p>PDF Dosyası • Çözümü görüntüle</p>
                  </div>
                  <div className="sol-download">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </a>
              ) : (
                <Link
                  key={index}
                  href={btn.href}
                  className={`cat-card card-color-${colorIdx} fade-in`}
                  style={{animationDelay: `${index * 0.05}s`}}
                >
                  <div className="icon-box">
                    <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="cat-info">
                    <h3>{btn.label}</h3>
                    <p>Deneme çözüm sayfası</p>
                  </div>
                  <div className="cat-arrow">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M9 5l7 7-7 7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}