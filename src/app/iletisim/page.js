import Link from 'next/link';

export const metadata = {
  title: 'İletişim | Tasarı Eğitim Yayınları',
  description: 'Tasarı Eğitim Yayınları iletişim bilgileri ve iletişim formu.',
};

export default function Iletisim() {
  const contactItems = [
    {
      icon: '📞', title: 'Telefon', desc: 'Size bir telefon uzağındayız.', content: (
        <>
          <a href="tel:05327628560" style={{ color: 'var(--primary)', fontWeight: 700, display: 'block' }}>0 532 762 85 60</a>
          <a href="tel:02125701082" style={{ color: 'var(--primary)', fontWeight: 700, display: 'block' }}>0 212 570 10 82</a>
        </>
      )
    },
    {
      icon: '📍', title: 'Merkez Adres', desc: 'Bakırköy\'ün kalbindeyiz.', content: (
        <a href="https://maps.google.com/?q=Cevizlik+Mah.+Allale+Sokak+Baştürk+Apt.+14/B+D:8+Bakırköy+/+İstanbul" target="_blank" style={{ color: 'var(--text-dim)', lineHeight: '1.5' }}>
          Cevizlik Mah. Allale Sokak Baştürk Apt. 14/B D:8 Bakırköy / İstanbul
        </a>
      )
    },
    {
      icon: '🌐', title: 'Kitap Mağazası', desc: 'Online alışveriş için.', content: (
        <a href="https://kitap.tasariegitim.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', fontWeight: 700 }}>kitap.tasariegitim.com</a>
      )
    },
    {
      icon: '⏰', title: 'Çalışma Saatleri', desc: 'Bizi ziyaret edin.', content: (
        <span style={{ color: 'var(--text-dim)', fontSize: '14px' }}>
          Hafta içi: 09:00 – 18:00<br />Cumartesi: 09:00 – 14:00
        </span>
      )
    }
  ];

  return (
    <div className="iletisim-page" style={{ background: 'var(--bg)' }}>
      {/* Premium Hero Section */}
      <section style={{
        backgroundImage: "url('/images/iletisim_bg.avif')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '420px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 20px' }}>
          <div style={{
            background: 'var(--bg-card)',
            backdropFilter: 'blur(20px)',
            padding: '35px 50px',
            borderRadius: '32px',
            display: 'inline-block',
            maxWidth: '760px',
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
              marginBottom: '16px', 
              display: 'inline-block',
              letterSpacing: '0.8px'
            }}>
              BİZE ULAŞIN
            </div>
            <h1 style={{ 
              fontSize: 'clamp(28px, 4vw, 42px)', 
              fontWeight: 900, 
              color: 'var(--text)', 
              marginBottom: '12px',
              letterSpacing: '-0.5px',
              lineHeight: 1.2
            }}>
              Sorularınız İçin<br />
              <span style={{ color: 'var(--accent)' }}>Sizi Dinliyoruz</span>
            </h1>
            <p style={{ 
              fontSize: '1.05rem', 
              color: 'var(--text-dim)', 
              fontWeight: 600, 
              maxWidth: '580px', 
              margin: '0 auto',
              lineHeight: 1.5
            }}>
              Eğitim yolculuğunuzda size rehberlik etmek için buradayız. Her türlü görüş ve öneriniz bizim için değerlidir.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ marginTop: '-60px', position: 'relative', zIndex: 10, paddingBottom: '100px' }}>
        <div className="container">
          <div className="contact-grid-layout">
            {/* Contact Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
              {contactItems.map((item, i) => (
                <div key={i} className="contact-item-card hover-lift">
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: 'var(--border)',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    flexShrink: 0
                  }}>{item.icon}</div>
                  <div>
                    <h4 style={{ fontSize: '18px', color: 'var(--primary)', margin: '0 0 5px 0' }}>{item.title}</h4>
                    <p style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: '600', margin: '0 0 10px 0' }}>{item.desc}</p>
                    <div style={{ fontSize: '15px' }}>{item.content}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modern Contact Form */}
            <div className="contact-form-container">
              <h3 style={{ fontSize: '28px', color: 'var(--primary)', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                ✉️ Bir Mesaj Bırakın
              </h3>
              <form action="https://formsubmit.co/tasariegitimkurumlari@gmail.com" method="POST" style={{ display: 'grid', gap: '20px' }}>
                <input type="hidden" name="_subject" value="Tasarı Eğitim Web Sitesinden Yeni Mesaj!" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <div className="form-grid-2col">
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Adınız *</label>
                    <input type="text" name="Ad" placeholder="Ad" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} required />
                  </div>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Soyadınız *</label>
                    <input type="text" name="Soyad" placeholder="Soyad" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} required />
                  </div>
                </div>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>E-posta Adresiniz *</label>
                  <input type="email" name="Email" placeholder="ornek@email.com" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} required />
                </div>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Konu *</label>
                  <select name="Konu" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', cursor: 'pointer' }} required>
                    <option value="">Konu seçiniz...</option>
                    <option value="Bireysel Kitap Satışı">Bireysel Kitap Satışı</option>
                    <option value="Kurumsal Satış / Bayilik">Kurumsal Satış / Bayilik</option>
                    <option value="Genel Sorular">Genel Sorular</option>
                  </select>
                </div>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Mesajınız *</label>
                  <textarea name="Mesaj" placeholder="Size nasıl yardımcı olabiliriz?" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', minHeight: '150px' }} required></textarea>
                </div>
                <button type="submit" className="btn-submit-premium">
                  Mesajı Gönder 🚀
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section style={{ padding: '0 0 100px 0' }}>
        <div className="container">
          <div style={{
            borderRadius: '40px',
            overflow: 'hidden',
            boxShadow: '0 40px 100px rgba(0,0,0,0.1)',
            border: '8px solid var(--border)'
          }}>
            <iframe
              src="https://maps.google.com/maps?q=Cevizlik+Mah.+Allale+Sokak+Baştürk+Apt.+14/B+D:8+Bakırköy+/+İstanbul&output=embed&hl=tr&z=17"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Harita"
              style={{ border: 0, width: '100%', height: '500px' }}
            ></iframe>
          </div>
        </div>
      </section>

    </div>
  );
}
