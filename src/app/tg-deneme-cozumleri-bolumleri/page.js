import Link from 'next/link';

export const metadata = {
  title: 'TG Deneme Çözümleri | Tasarı Eğitim Yayınları',
  description: 'Türkiye Geneli deneme sınavları için uzman eğitmenler tarafından hazırlanan video ve PDF çözümleri.',
};

const tgCategories = [
  { title: "TG DGS Çözümleri", desc: "Türkiye Geneli DGS deneme sınavları video ve PDF çözümleri.", code: "DGS", color: "#1877F2", link: "/tg-deneme-cozumleri" },
  { title: "TG YÖS Çözümleri", desc: "Türkiye Geneli YÖS deneme sınavları video ve PDF çözümleri.", code: "YÖS", color: "#E1306C", link: "/tasari-yos-denemeleri" },
  { title: "TG KPSS Çözümleri", desc: "Türkiye Geneli KPSS deneme sınavları video ve PDF çözümleri.", code: "KPSS", color: "#F59E0B", link: "/kpss-tg-cozumleri" },
  { title: "TG ALES Çözümleri", desc: "Türkiye Geneli ALES deneme sınavları video ve PDF çözümleri.", code: "ALES", color: "#10B981", link: "/ales-deneme-cozumleri" },
  { title: "TG MEB-AGS Çözümleri", desc: "Türkiye Geneli MEB-AGS deneme sınavları video ve PDF çözümleri.", code: "AGS", color: "#06B6D4", link: "/meb-ags-deneme-sinav-cozumleri" },
  { title: "TG TYT-AYT Çözümleri", desc: "Türkiye Geneli TYT ve AYT deneme sınavları video ve PDF çözümleri.", code: "TYT", color: "#8B5CF6", link: "/tyt-ayt-deneme-cozumleri" },
  { title: "TG KTS Çözümleri", desc: "Kurumsal Takip Sınavları video ve PDF çözümleri.", code: "KTS", color: "#6366F1", link: "/kts-deneme-sinavi" },
  { title: "TG MSÜ Çözümleri", desc: "Milli Savunma Üniversitesi deneme sınavları video ve PDF çözümleri.", code: "MSÜ", color: "#EF4444", link: "/msu-cozumleri" },
];

export default function TgDenemeCozumleriBolumleri() {
  return (
    <div className="tg-portal-page" style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Premium Hero Section */}
      <section style={{
        backgroundImage: "url('/images/tg_cozumleri_bg.avif')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '80px 20px 140px 20px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            background: 'var(--bg-card)',
            backdropFilter: 'blur(20px)',
            padding: '40px 60px',
            borderRadius: '32px',
            display: 'inline-block',
            maxWidth: '800px',
            width: '100%',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid var(--border)'
          }}>
            <div className="breadcrumb" style={{
              justifyContent: 'center',
              marginBottom: '24px',
              background: 'var(--border)',
              padding: '6px 18px',
              borderRadius: '50px',
              display: 'inline-flex',
              border: '1px solid var(--border)'
            }}>
              <Link href="/" style={{ color: 'var(--text-dim)', fontSize: '13px', fontWeight: 600 }}>Ana Sayfa</Link>
              <span style={{ margin: '0 8px', color: '#9ca3af' }}>/</span>
              <span style={{ color: 'var(--text)', fontSize: '13px', fontWeight: 700 }}>TG Çözümleri</span>
            </div>
            <br />
            <div className="section-tag" style={{
              background: '#FDCB08',
              color: '#0d1e36',
              border: 'none',
              padding: '6px 18px',
              borderRadius: '100px',
              fontSize: '11px',
              fontWeight: 800,
              textTransform: 'uppercase',
              marginBottom: '16px',
              display: 'inline-block',
              letterSpacing: '0.8px'
            }}>
              TÜRKİYE GENELİ DENEMELER
            </div>

            <h1 style={{
              fontSize: 'clamp(28px, 5vw, 42px)',
              fontWeight: 900,
              lineHeight: 1.2,
              color: 'var(--text)',
              marginBottom: '16px',
              letterSpacing: '-0.5px'
            }}>
              Sınav Kategorinizi <br />
              <span style={{ color: 'var(--accent)' }}>Belirleyin</span>
            </h1>

            <p style={{
              fontSize: '1.05rem',
              color: 'var(--text-dim)',
              fontWeight: 600,
              maxWidth: '580px',
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              Hazırlık yaptığınız sınav türünü seçerek güncel TG deneme sınavı çözümlerine ve analizlerine ulaşın.
            </p>
          </div>
        </div>
      </section>

      <section className="container" style={{ marginTop: '-70px', paddingBottom: '100px', position: 'relative', zIndex: 10 }}>
        <div style={{
          maxWidth: '850px',
          margin: '0 auto',
          display: 'grid',
          gap: '16px'
        }}>
          {tgCategories.map((cat, i) => (
            <Link
              key={i}
              href={cat.link}
              className="hover-lift"
              style={{
                background: 'var(--bg-card)',
                borderRadius: '24px',
                padding: '24px 30px',
                boxShadow: '0 10px 30px rgba(25, 71, 80, 0.04)',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
                textDecoration: 'none'
              }}
            >
              <div style={{
                width: '64px',
                height: '64px',
                background: `${cat.color}10`,
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '15px',
                fontWeight: 900,
                color: cat.color,
                flexShrink: 0,
                boxShadow: `inset 0 0 0 1px ${cat.color}20`
              }}>
                {cat.code}
              </div>

              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '20px',
                  color: 'var(--primary)',
                  margin: '0 0 4px 0',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.01em'
                }}>
                  {cat.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: 'var(--text-dim)',
                  margin: 0,
                  opacity: 0.8
                }}>
                  {cat.desc}
                </p>
              </div>

              <div style={{
                width: '44px',
                height: '44px',
                background: 'var(--border)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)',
                transition: 'all 0.3s ease'
              }} className="arrow-box">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer Info */}
      <section style={{ padding: '40px 0 80px 0', textAlign: 'center' }}>
        <div className="container">
          <p style={{ color: 'var(--text-dim)', fontSize: '14px', opacity: 0.6 }}>
            * Çözümler her sınavdan hemen sonra sisteme yüklenmektedir.
          </p>
        </div>
      </section>

    </div>
  );
}

