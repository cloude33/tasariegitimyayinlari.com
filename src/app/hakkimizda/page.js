import Link from 'next/link';

export const metadata = {
  title: 'Hakkımızda | Tasarı Eğitim Yayınları',
  description: 'Tasarı Eğitim Yayınları hakkında – 1984\'ten bu yana eğitimde öncü kurum.',
};

export default function Hakkimizda() {
  const stats = [
    { 
      label: 'Yıllık Deneyim', 
      val: '40', 
      suffix: '+', 
      accent: '#FDCB08', 
      icon: (
        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
          <path d="M4 22h16"></path>
          <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34"></path>
          <path d="M12 2a5 5 0 0 0-5 5v3c0 2.2 1.8 4 4 4h2c2.2 0 4-1.8 4-4V7a5 5 0 0 0-5-5z"></path>
        </svg>
      )
    },
    { 
      label: 'Türkiye Şampiyonu', 
      val: '14', 
      suffix: '', 
      accent: '#1877F2', 
      icon: (
        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="6"></circle>
          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
        </svg>
      )
    },
    { 
      label: 'Sınav Branşı', 
      val: '5', 
      suffix: '', 
      accent: '#10B981', 
      icon: (
        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path>
          <path d="M6 6h10"></path>
          <path d="M6 10h10"></path>
        </svg>
      )
    },
    { 
      label: 'Kuruluş Yılı', 
      val: '1984', 
      suffix: '', 
      accent: '#8B5CF6', 
      icon: (
        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <path d="M9 22V12h6v10"></path>
        </svg>
      )
    },
  ];

  return (
    <div className="hakkimizda-page" style={{background: 'var(--bg)'}}>
      {/* Premium Hero Section */}
      <section style={{
        backgroundImage: "url('/images/hakkimizda_bg.avif')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '520px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div className="container" style={{position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 20px'}}>
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
            <div className="section-tag" style={{
              background: '#FDCB08', 
              color: '#0d1e36', 
              border: 'none', 
              padding: '6px 18px',
              borderRadius: '100px',
              fontSize: '11px',
              fontWeight: 800,
              textTransform: 'uppercase',
              marginBottom: '20px', 
              display: 'inline-block',
              letterSpacing: '0.8px'
            }}>
              BİZ KİMİZ?
            </div>
            <h1 style={{
              fontSize: 'clamp(28px, 4vw, 46px)', 
              fontWeight: 900, 
              color: 'var(--text)',
              marginBottom: '20px', 
              letterSpacing: '-0.5px',
              lineHeight: 1.15
            }}>
              Eğitimin Geleceğini<br/>
              <span style={{color: 'var(--accent)'}}>Bugünden Tasarlıyoruz</span>
            </h1>
            <p style={{
              fontSize: '1.05rem', 
              color: 'var(--text-dim)', 
              fontWeight: 600, 
              maxWidth: '650px', 
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              1984'ten bu yana, binlerce öğrencinin hayallerine dokunarak Türkiye'nin eğitim standartlarını yükseltiyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* Corporate Content */}
      <section className="section" style={{marginTop: '-80px', position: 'relative', zIndex: 10, paddingBottom: '100px'}}>
        <div className="container">
          <div style={{
            background: 'var(--bg-card)',
            padding: '60px',
            borderRadius: '40px',
            boxShadow: '0 40px 100px rgba(25, 71, 80, 0.1)',
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '60px',
            alignItems: 'center'
          }}>
            <div>
              <div className="section-tag">Kurumsal Kimlik</div>
              <h2 style={{fontSize: '42px', color: 'var(--primary)', margin: '20px 0', lineHeight: '1.2'}}>40 Yıllık Şampiyonlar<br/>Yolculuğu</h2>
              <div style={{fontSize: '17px', color: 'var(--text-dim)', lineHeight: '1.9'}}>
                <p style={{marginBottom: '20px'}}>
                  Kurucumuz <strong>Hülya Ersina</strong> tarafından temelleri <strong>1984 yılında</strong> atılan T.C. M.E.B Özel Tasarı Kursları, her zaman öğrenci memnuniyetini ön planda tutarak başarılarını günümüze taşımıştır.
                </p>
                <p style={{marginBottom: '20px'}}>
                  Türkiye'de DGS, YÖS, ALES, KPSS ve SPK gibi kritik branşlarda hizmet veren kuruluşumuz, "Eğitimde Kalite" vizyonuyla pek çok şampiyonu bu kurslardan çıkarmıştır.
                </p>
                <div style={{
                  padding: '25px',
                  background: 'rgba(205, 126, 59, 0.05)',
                  borderLeft: '4px solid var(--accent)',
                  borderRadius: '0 16px 16px 0',
                  fontStyle: 'italic',
                  color: 'var(--primary)',
                  fontWeight: '500'
                }}>
                  "Son 23 yılda 14 DGS Türkiye 1.si çıkaran tek kurum olma unvanını taşıyan Tasarı, başarının tesadüf olmadığını her yıl kanıtlamaktadır."
                </div>
              </div>
            </div>

             <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px'
            }}>
              {stats.map((stat, i) => (
                <div key={i} style={{
                  background: 'var(--bg-card)',
                  padding: '30px 20px',
                  borderRadius: '24px',
                  textAlign: 'center',
                  border: '1px solid var(--border)',
                  boxShadow: '0 8px 24px rgba(13, 30, 54, 0.02)',
                  transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
                  position: 'relative',
                  overflow: 'hidden'
                }} className="hover-lift">
                  {/* Glowing background accent circle */}
                  <div style={{
                    position: 'absolute',
                    top: '-40px',
                    right: '-40px',
                    width: '100px',
                    height: '100px',
                    background: `${stat.accent}08`,
                    borderRadius: '50%',
                    filter: 'blur(10px)',
                    pointerEvents: 'none'
                  }}></div>

                  {/* Icon Wrapper Bubble */}
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: `${stat.accent}12`,
                    borderRadius: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: stat.accent,
                    margin: '0 auto 16px auto',
                    boxShadow: `0 4px 12px ${stat.accent}10`
                  }}>
                    {stat.icon}
                  </div>

                  <div style={{fontSize: '34px', fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.5px'}}>{stat.val}{stat.suffix}</div>
                  <div style={{fontSize: '13px', color: 'var(--text-dim)', fontWeight: '600', marginTop: '6px'}}>{stat.label}</div>
                </div>
              ))}
              <div style={{
                gridColumn: 'span 2',
                background: '#0d1e36',
                color: '#fff',
                padding: '30px',
                borderRadius: '24px',
                textAlign: 'center',
                boxShadow: '0 10px 30px rgba(13, 30, 54, 0.15)',
                border: '1px solid rgba(255,255,255,0.05)',
                position: 'relative',
                overflow: 'hidden'
              }} className="hover-lift">
                <div style={{
                  position: 'absolute',
                  top: '-50px',
                  left: '-50px',
                  width: '120px',
                  height: '120px',
                  background: 'rgba(253, 203, 8, 0.05)',
                  borderRadius: '50%',
                  filter: 'blur(20px)',
                  pointerEvents: 'none'
                }}></div>
                <h4 style={{fontSize: '22px', fontWeight: 800, margin: 0, letterSpacing: '-0.5px'}}>Binlerce Mutlu Mezun</h4>
                <p style={{fontSize: '14px', opacity: 0.8, marginTop: '6px', fontWeight: 500}}>Siz de bu başarı hikayesinin bir parçası olun.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section" style={{background: 'var(--bg-card)', padding: '100px 0'}}>
        <div className="container">
          <div className="section-header" style={{textAlign: 'center', marginBottom: '80px'}}>
            <div className="section-tag">Zaman Çizelgesi</div>
            <h2 style={{fontSize: '40px'}}>Başarılarla Dolu Tarihimiz</h2>
          </div>

          <div style={{maxWidth: '900px', margin: '0 auto', position: 'relative'}}>
            {/* Timeline Line */}
            <div style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'linear-gradient(to bottom, var(--primary), var(--accent), var(--primary-light))',
              opacity: 0.2
            }}></div>

            {[
              { year: '1984', title: 'Kuruluş', desc: 'Bakırköy\'de eğitime ilk adım atıldı.', bg: 'rgba(205, 126, 59, 0.08)', color: 'var(--accent)' },
              { year: '1997', title: 'Türkiye\'nin İlk ALES Kursu', desc: 'ALES alanında öncü olarak bir ilke imza atıldı.', bg: 'rgba(24, 119, 242, 0.08)', color: '#1877F2' },
              { year: '2001+', title: 'DGS Şampiyonlukları', desc: 'Türkiye birincileriyle dolu şampiyonluk serisi başladı.', bg: 'rgba(16, 185, 129, 0.08)', color: '#10B981' },
              { year: 'Bugün', title: 'Türkiye\'nin Eğitim Devlerinden', desc: 'Hibrit eğitim modelleri ve modern yayıncılıkla zirvede.', bg: 'rgba(139, 92, 246, 0.08)', color: '#8B5CF6' }
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: i % 2 === 0 ? 'flex-end' : 'flex-start',
                marginBottom: '60px',
                width: '100%',
                position: 'relative'
              }}>
                <div style={{
                  width: '45%',
                  background: item.bg,
                  padding: '30px',
                  borderRadius: '24px',
                  border: `2px solid ${item.color}40`, // Yarı saydam kenarlık
                  boxShadow: `0 15px 35px ${item.color}15`, // Renkli gölge
                  textAlign: i % 2 === 0 ? 'right' : 'left',
                  transition: 'transform 0.3s ease',
                }} className="hover-lift">
                  <div style={{
                    fontSize: '28px',
                    fontWeight: 900,
                    color: item.color,
                    marginBottom: '10px'
                  }}>{item.year}</div>
                  <h4 style={{fontSize: '19px', color: 'var(--primary)', marginBottom: '8px', fontWeight: 800}}>{item.title}</h4>
                  <p style={{fontSize: '15px', color: 'var(--text-dim)', lineHeight: '1.6', fontWeight: 500}}>{item.desc}</p>
                </div>
                {/* Dot */}
                <div style={{
                  position: 'absolute',
                  left: '50%',
                  top: '40px',
                  transform: 'translateX(-50%)',
                  width: '18px',
                  height: '18px',
                  background: 'var(--bg-card)',
                  border: `5px solid ${item.color}`,
                  borderRadius: '50%',
                  zIndex: 2,
                  boxShadow: `0 0 15px ${item.color}80`
                }}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section" style={{padding: '100px 0'}}>
        <div className="container">
          <div className="vm-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px'
          }}>
            {[
              { 
                accent: '#FDCB08',
                title: 'Vizyonumuz', 
                desc: 'Eğitimde öncü, yenilikçi ve dijital dönüşüme liderlik eden bir model oluşturmak.',
                icon: (
                  <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    <path d="M2 12h20"></path>
                  </svg>
                )
              },
              { 
                accent: '#EF4444',
                title: 'Misyonumuz', 
                desc: 'Gençleri meslek sahibi yaparak geleceklerini en sağlam temeller üzerine inşa etmek.',
                icon: (
                  <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="6"></circle>
                    <circle cx="12" cy="12" r="2"></circle>
                  </svg>
                )
              },
              { 
                accent: '#1877F2',
                title: 'Değerlerimiz', 
                desc: 'Atatürk ilkelerine bağlı, çağdaş ve demokratik değerleri özümsemiş bireyler yetiştirmek.',
                icon: (
                  <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                )
              },
              { 
                accent: '#8B5CF6',
                title: 'Kalite Anlayışımız', 
                desc: 'Hatasız yayıncılık ve öğrenci odaklı eğitim yaklaşımıyla mükemmeli hedeflemek.',
                icon: (
                  <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                )
              }
            ].map((card, i) => (
              <div key={i} style={{
                background: 'var(--bg-card)',
                padding: '40px',
                borderRadius: '32px',
                boxShadow: '0 10px 40px rgba(13, 30, 54, 0.04)',
                border: '1px solid var(--border)',
                transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
                position: 'relative',
                overflow: 'hidden'
              }} className="hover-lift">
                <div style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '-40px',
                  width: '100px',
                  height: '100px',
                  background: `${card.accent}08`,
                  borderRadius: '50%',
                  filter: 'blur(10px)',
                  pointerEvents: 'none'
                }}></div>
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: `${card.accent}12`,
                  borderRadius: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: card.accent,
                  marginBottom: '24px',
                  boxShadow: `0 4px 12px ${card.accent}10`
                }}>
                  {card.icon}
                </div>
                <h3 style={{fontSize: '22px', color: 'var(--text)', fontWeight: 800, marginBottom: '15px'}}>{card.title}</h3>
                <p style={{fontSize: '15px', color: 'var(--text-dim)', fontWeight: 500, lineHeight: '1.7'}}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
