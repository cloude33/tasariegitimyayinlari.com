export const metadata = {
  title: 'MEB-AGS Deneme Sınav Çözümleri | Tasarı Eğitim Yayınları',
  description: 'MEB-AGS deneme sınavı çözümleri. 1-10 numaralı deneme çözümleri ücretsiz olarak sunulmaktadır.',
};

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function MebAgsDenemeSinavCozumleriPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero-strip" aria-hidden="true" />
        <div className="container">
          <h1>MEB-AGS Deneme Sınav <span className="hero-title-accent">Çözümleri</span></h1>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2 style={{textAlign: 'center', marginBottom: '40px'}}>
            MEB-AGS DENEME SINAV ÇÖZÜMLERİ
          </h2>
          <div style={{maxWidth: '800px', margin: '0 auto'}}>
            {items.map((n, index) => {
              const href = `/pdf-goster?file=/dosyalar/turkiye-geneli-denemeleri/ags/meb-ags-deneme-${n}-cozum.pdf`;
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
                    <h4>MEB-AGS DENEME SINAV ÇÖZÜMLERİ-{n}</h4>
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