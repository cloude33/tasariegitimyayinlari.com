export const metadata = {
  title: 'Tasarı YÖS Mayıs Denemeleri | Tasarı Eğitim Yayınları',
  description: 'TR-YÖS 2024-2025 Mayıs dönemi deneme çözümleri. 20 denemenin tamamı ücretsiz olarak sunulmaktadır.',
};

const items = Array.from({ length: 20 }, (_, i) => i + 1);

export default function YosMayisDenemeleriPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>YÖS MAYIS DENEMELERİ</h1>
          <p>TR-YÖS 2024-2025 Mayıs dönemi deneme çözümleri</p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div style={{maxWidth: '800px', margin: '0 auto'}}>
            {items.map((n, index) => {
              const href = `/pdf-goster?file=/dosyalar/turkiye-geneli-denemeleri/yos/yos-mayis-denemeleri/yos-tg-m${n}-deneme.-cozum.pdf`;
              return (
                <a
                  key={n}
                  href={href}
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
                    <h4>YÖS TG M{n} ÇÖZÜMLERİ</h4>
                    <p>PDF Dosyası • Çözümü görüntüle</p>
                  </div>
                  <div className="sol-download">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}