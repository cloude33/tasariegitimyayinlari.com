"use client";
import Link from 'next/link';

export default function Satis() {
  const handleKurumsalSubmit = (e) => {
    e.preventDefault();
    alert('Talebiniz alınmıştır. En kısa sürede sizinle iletişime geçilecektir.');
  };

  return (
    <div className="satis-page">
      <div className="breadcrumb">
        <div className="breadcrumb-inner">
          <Link href="/">Ana Sayfa</Link>
          <span>/</span>
          <span>Bireysel ve Kurumsal Satış</span>
        </div>
      </div>

      <section className="page-hero">
        <div className="container">
          <div className="section-tag">SATIŞ KANALLARI</div>
          <h1>Bireysel ve Kurumsal Satış</h1>
          <p>Tasarı Eğitim Yayınları kitaplarına bireysel veya kurumsal olarak ulaşın. Türkiye'nin her yerine hızlı ve güvenilir gönderim.</p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="satis-grid" style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(350px, 1fr))', gap:'40px'}}>
            {/* BİREYSEL */}
            <div className="card fade-in" style={{
              background:'white',
              borderRadius:'24px',
              padding:'40px',
              borderTop:'6px solid var(--primary)',
              boxShadow:'0 20px 40px rgba(0,0,0,0.05)',
              display:'flex',
              flexDirection:'column',
              gap:'20px'
            }}>
              <div style={{fontSize:'3rem', background:'rgba(25, 71, 80, 0.05)', width:'80px', height:'80px', borderRadius:'20px', display:'flex', alignItems:'center', justifyContent:'center'}}>🛒</div>
              <h2 style={{color:'var(--primary)', fontSize:'2rem'}}>Bireysel Satış</h2>
              <p style={{color:'var(--text-dim)', lineHeight:'1.7'}}>Yayınlarımızın bireysel satışı için <strong>kitap.tasariegitim.com</strong> adresimizi kullanabilirsiniz. Hızlı, yeni ve güvenilir altyapısı ile alışverişte doğru adrestesiniz.</p>
              <ul style={{listStyle:'none', padding:0, display:'flex', flexDirection:'column', gap:'12px'}}>
                {['Güvenli ödeme altyapısı', 'Hızlı kargo seçenekleri', 'Tüm branşlarda güncel baskılar', 'Kolay iade ve değişim', '7/24 sipariş imkânı'].map((item, i) => (
                  <li key={i} style={{display:'flex', alignItems:'center', gap:'10px'}}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a href="https://kitap.tasariegitim.com" target="_blank" className="btn btn-primary" style={{marginTop:'auto', padding:'16px', textAlign:'center', borderRadius:'12px', fontWeight:'700'}}>Kitap Mağazasına Git →</a>
            </div>

            {/* KURUMSAL */}
            <div className="card fade-in" style={{
              background:'white',
              borderRadius:'24px',
              padding:'40px',
              borderTop:'6px solid var(--accent)',
              boxShadow:'0 20px 40px rgba(0,0,0,0.05)',
              display:'flex',
              flexDirection:'column',
              gap:'20px'
            }}>
              <div style={{fontSize:'3rem', background:'rgba(205, 126, 59, 0.05)', width:'80px', height:'80px', borderRadius:'20px', display:'flex', alignItems:'center', justifyContent:'center'}}>🏢</div>
              <h2 style={{color:'var(--primary)', fontSize:'2rem'}}>Kurumsal Satış</h2>
              <p style={{color:'var(--text-dim)', lineHeight:'1.7'}}>Kurumsal satış kanalımız ile iletişime geçerek yayınlarımızın güncel baskılarına erişebilir, toplu satın alma işlemini gerçekleştirebilirsiniz.</p>
              
              <div style={{background:'var(--bg)', borderRadius:'20px', padding:'30px', border:'1px solid var(--border)'}}>
                <h4 style={{marginBottom:'20px', color:'var(--primary)', fontWeight:'800'}}>Kurumsal Teklif Formu</h4>
                <form onSubmit={handleKurumsalSubmit} style={{display:'grid', gap:'15px'}}>
                  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'15px'}}>
                    <input type="text" placeholder="Ad Soyad" required style={{padding:'12px', borderRadius:'10px', border:'1px solid var(--border)', outline:'none'}} />
                    <input type="text" placeholder="Kurum Adı" required style={{padding:'12px', borderRadius:'10px', border:'1px solid var(--border)', outline:'none'}} />
                  </div>
                  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'15px'}}>
                    <input type="tel" placeholder="Telefon" required style={{padding:'12px', borderRadius:'10px', border:'1px solid var(--border)', outline:'none'}} />
                    <input type="email" placeholder="E-posta" required style={{padding:'12px', borderRadius:'10px', border:'1px solid var(--border)', outline:'none'}} />
                  </div>
                  <select style={{padding:'12px', borderRadius:'10px', border:'1px solid var(--border)', outline:'none', background:'white'}}>
                    <option value="">Branş Seçiniz...</option>
                    <option>DGS Yayınları</option>
                    <option>YÖS Yayınları</option>
                    <option>ALES Yayınları</option>
                    <option>KPSS Yayınları</option>
                    <option>TYT-AYT Yayınları</option>
                    <option>MEB-AGS Yayınları</option>
                  </select>
                  <textarea placeholder="Ek bilgi veya talepleriniz..." style={{padding:'12px', borderRadius:'10px', border:'1px solid var(--border)', outline:'none', minHeight:'100px', resize:'vertical'}}></textarea>
                  <button type="submit" className="btn btn-primary" style={{padding:'14px', borderRadius:'10px', fontWeight:'700'}}>Kurumsal Teklif Al →</button>
                </form>
              </div>
            </div>
          </div>

          {/* WhatsApp Section */}
          <div style={{
            background:'linear-gradient(135deg, #25D366, #128C7E)',
            borderRadius:'24px',
            padding:'40px',
            marginTop:'60px',
            color:'white',
            display:'flex',
            alignItems:'center',
            justifyContent:'space-between',
            flexWrap:'wrap',
            gap:'30px',
            boxShadow:'0 20px 40px rgba(18, 140, 126, 0.2)'
          }}>
            <div style={{display:'flex', alignItems:'center', gap:'24px'}}>
              <div style={{fontSize:'4rem'}}>📱</div>
              <div>
                <h3 style={{fontSize:'1.5rem', fontWeight:'800', marginBottom:'8px'}}>WhatsApp ile Hızlı Sipariş</h3>
                <p style={{opacity:0.9}}>Kitap siparişleriniz için WhatsApp hattımızdan bize ulaşabilirsiniz. Hızlı yanıt garantisi.</p>
              </div>
            </div>
            <div style={{display:'flex', gap:'15px', flexWrap:'wrap'}}>
              <a href="https://api.whatsapp.com/send?phone=905327628560" target="_blank" style={{background:'white', color:'#128C7E', padding:'15px 30px', borderRadius:'14px', fontWeight:'800', textDecoration:'none', boxShadow:'0 10px 20px rgba(0,0,0,0.1)'}}>0 532 762 85 60</a>
              <a href="https://api.whatsapp.com/send?phone=905330414797" target="_blank" style={{background:'white', color:'#128C7E', padding:'15px 30px', borderRadius:'14px', fontWeight:'800', textDecoration:'none', boxShadow:'0 10px 20px rgba(0,0,0,0.1)'}}>0 533 041 47 97</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
