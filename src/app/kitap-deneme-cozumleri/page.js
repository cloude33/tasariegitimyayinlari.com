import Link from 'next/link';

export const metadata = {
  title: 'Kitap ve Deneme Çözümleri | Tasarı Eğitim Yayınları',
  description: 'DGS, YÖS, ALES, KPSS, TYT-AYT ve LGS sınavları için tüm kitap ve deneme sınavlarının detaylı çözümleri.',
};

const solutionTypes = [
  { 
    title: "DGS Çözümleri", 
    desc: "Dikey Geçiş Sınavı için tüm kitap ve deneme çözümleri.", 
    icon: "📚", 
    count: "17+ Çözüm", 
    link: "/dgs-deneme-sinav-cozumleri",
    color: "#1877F2"
  },
  { 
    title: "YÖS Çözümleri", 
    desc: "Yabancı Uyruklu Öğrenci Sınavı için matematik ve IQ soruları.", 
    icon: "🌍", 
    count: "5+ Çözüm", 
    link: "/yos",
    color: "#E1306C"
  },
  { 
    title: "ALES Çözümleri", 
    desc: "Akademik Personel ve Lisansüstü Eğitimi Sınavı çözümleri.", 
    icon: "🎓", 
    count: "8+ Çözüm", 
    link: "/ales",
    color: "#10B981"
  },
  { 
    title: "KPSS Çözümleri", 
    desc: "Kamu Personel Seçme Sınavı için genel yetenek çözümleri.", 
    icon: "💼", 
    count: "10+ Çözüm", 
    link: "/kpss",
    color: "#F59E0B"
  },
  { 
    title: "TYT-AYT Çözümleri", 
    desc: "Temel Yeterlilik ve Alan Yeterlilik Testleri çözümleri.", 
    icon: "📖", 
    count: "15+ Çözüm", 
    link: "/ayt-tyt",
    color: "#8B5CF6"
  },
  { 
    title: "LGS Çözümleri", 
    desc: "Lise Geçiş Sınavı için tüm derslerin çözümleri.", 
    icon: "🏫", 
    count: "8+ Çözüm", 
    link: "/lgs",
    color: "#EF4444"
  },
  { 
    title: "MEB-AGS Çözümleri", 
    desc: "Milli Eğitim Bakanlığı Alan Geçiş Sınavları çözümleri.", 
    icon: "📋", 
    count: "6+ Çözüm", 
    link: "/meb-ags-cozumler",
    color: "#06B6D4"
  },
  { 
    title: "Altı Şapka Yayınları", 
    desc: "Altı Şapka Yayınları kitap ve deneme çözümleri.", 
    icon: "🎩", 
    count: "4+ Çözüm", 
    link: "/alti-sapka",
    color: "#374151"
  },
];

export default function KitapDenemeCozumleri() {
  return (
    <div className="kitap-cozum-page" style={{ background: '#F8FAFC', minHeight: '100vh' }}>
      {/* Premium Hero Section */}
      <section style={{
        backgroundImage: "url('/images/kitap_cozumleri_bg.avif')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '80px 20px 140px 20px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(20px)',
            padding: '40px 60px',
            borderRadius: '32px',
            display: 'inline-block',
            maxWidth: '820px',
            width: '100%',
            boxShadow: '0 20px 50px rgba(13, 30, 54, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.7)'
          }}>
            <div className="breadcrumb" style={{ 
              justifyContent: 'center', 
              marginBottom: '24px',
              background: 'rgba(13, 30, 54, 0.04)',
              padding: '6px 18px',
              borderRadius: '50px',
              display: 'inline-flex',
              border: '1px solid rgba(13, 30, 54, 0.05)'
            }}>
              <Link href="/" style={{ color: '#4b5563', fontSize: '13px', fontWeight: 600 }}>Ana Sayfa</Link>
              <span style={{ margin: '0 8px', color: '#9ca3af' }}>/</span>
              <span style={{ color: '#0d1e36', fontSize: '13px', fontWeight: 700 }}>Çözümler</span>
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
              TASARI EĞİTİM AKADEMİ
            </div>
            
            <h1 style={{ 
              fontSize: 'clamp(28px, 5vw, 48px)', 
              fontWeight: 900, 
              lineHeight: 1.15, 
              color: '#0d1e36',
              marginBottom: '16px',
              letterSpacing: '-0.5px'
            }}>
              Kitap ve Deneme <br/>
              <span style={{ color: 'var(--accent)' }}>Video Çözümleri</span>
            </h1>
            
            <p style={{ 
              fontSize: '1.05rem', 
              color: '#4b5563', 
              fontWeight: 600, 
              maxWidth: '620px', 
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              Uzman eğitmenlerimiz tarafından hazırlanan, her seviyeye uygun detaylı ve açıklamalı video çözümlerle sınavlara eksiksiz hazırlanın.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Grid Section */}
      <section style={{ marginTop: '-80px', paddingBottom: '100px', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '25px'
          }}>
            {solutionTypes.map((type, i) => (
              <Link 
                key={i} 
                href={type.link} 
                className="hover-lift"
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: '28px',
                  padding: '35px',
                  boxShadow: '0 15px 40px rgba(25, 71, 80, 0.06)',
                  border: '1px solid rgba(25, 71, 80, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  height: '100%'
                }}
              >
                {/* Decorative Background Icon */}
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-10px',
                  fontSize: '80px',
                  opacity: 0.03,
                  transform: 'rotate(-15deg)',
                  pointerEvents: 'none'
                }}>
                  {type.icon}
                </div>

                <div style={{
                  width: '64px',
                  height: '64px',
                  background: `${type.color}10`,
                  borderRadius: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  color: type.color
                }}>
                  {type.icon}
                </div>

                <div>
                  <h3 style={{ 
                    fontSize: '22px', 
                    color: 'var(--primary)', 
                    marginBottom: '10px',
                    fontWeight: 800 
                  }}>
                    {type.title}
                  </h3>
                  <p style={{ 
                    fontSize: '15px', 
                    color: 'var(--text-dim)', 
                    lineHeight: 1.5,
                    marginBottom: '20px'
                  }}>
                    {type.desc}
                  </p>
                </div>

                <div style={{ 
                  marginTop: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '20px',
                  borderTop: '1px solid rgba(0,0,0,0.05)'
                }}>
                  <span style={{ 
                    fontSize: '13px', 
                    fontWeight: 700, 
                    color: type.color,
                    background: `${type.color}10`,
                    padding: '6px 12px',
                    borderRadius: '50px'
                  }}>
                    {type.count}
                  </span>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'var(--bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary)',
                    fontSize: '14px',
                    transition: 'all 0.3s ease'
                  }}>
                    →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section style={{ padding: '60px 0 100px 0', background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '32px', color: 'var(--primary)', marginBottom: '20px' }}>Neden Tasarı Çözümleri?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', marginTop: '40px' }}>
              <div>
                <div style={{ fontSize: '32px', marginBottom: '15px' }}>⚡</div>
                <h4 style={{ color: 'var(--primary)', marginBottom: '10px' }}>Hızlı Erişim</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-dim)' }}>Tüm kitaplarımızın çözümlerine anında ulaşın.</p>
              </div>
              <div>
                <div style={{ fontSize: '32px', marginBottom: '15px' }}>🎯</div>
                <h4 style={{ color: 'var(--primary)', marginBottom: '10px' }}>Nokta Atışı</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-dim)' }}>Soruların mantığını kavratan detaylı anlatımlar.</p>
              </div>
              <div>
                <div style={{ fontSize: '32px', marginBottom: '15px' }}>💎</div>
                <h4 style={{ color: 'var(--primary)', marginBottom: '10px' }}>Ücretsiz</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-dim)' }}>Tasarı öğrencileri ve kitap sahipleri için tamamen ücretsiz.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

