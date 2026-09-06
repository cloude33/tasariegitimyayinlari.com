import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'KPSS Kitap-Deneme Sınavı Çözümleri | Tasarı Eğitim Yayınları',
  description: 'KPSS kitap ve deneme sınavı çözümleri. Tarih, Matematik, Türkçe, Coğrafya soru bankaları ve deneme çözümleri ücretsiz.',
};

const buttons = [
  {
    label: 'KPSS 30\'da 30 Net Matematik',
    href: '/pdf-goster?file=/dosyalar/kitap-deneme-cozumleri/kpss-cozumleri/30da-30-net-matematik-cozum.pdf',
    external: true,
    image: '/images/kpss/kpss-matematik-video-cozumlu-30da-30-net_jpg.jpg'
  },
  {
    label: 'KPSS Dev Kadro Türkiye Karması Deneme',
    href: '/kpss-dev-kadro-turkiye-karmas%C4%B1-deneme',
    external: false,
    image: '/images/kpss/matematik-20-deneme_jpg.jpg'
  },
  {
    label: 'KPSS Matematik Çözümlü Soru Bankası',
    href: '/kpss-soru-bankasi-matematik',
    external: false,
    image: '/images/kpss/kpss-coz_mat_sb_.jpg'
  },
  {
    label: 'KPSS Tarih Soru Bankası',
    href: '/pdf-goster?file=/dosyalar/kitap-deneme-cozumleri/kpss-cozumleri/kpss-tarih-soru-bankasi-cozum.pdf',
    external: true,
    image: '/images/kpss/kpss-tarih-soru-bankasi.jpg'
  },
  {
    label: 'KPSS Coğrafya Soru Bankası',
    href: '/pdf-goster?file=/dosyalar/kitap-deneme-cozumleri/kpss-cozumleri/cografya-soru-bankasi-cozum-son.pdf',
    external: true,
    image: '/images/kpss/kpss-cografya-s_b-3d.jpg'
  },
  {
    label: 'KPSS Türkçe Çözümlü Soru Bankası',
    href: '/pdf-goster?file=/dosyalar/kitap-deneme-cozumleri/kpss-cozumleri/kpss-turkce-soru-bankasi-cozumleri.pdf',
    external: true,
    image: '/images/kpss/kpss-turkce-soru-bankasi.jpg'
  },
  {
    label: 'KPSS 27\'de 27 Net Tarih',
    href: '/pdf-goster?file=/dosyalar/kitap-deneme-cozumleri/kpss-cozumleri/kpss-27de-27-net-tarih-cozumleri.pdf',
    external: true,
    image: '/images/kpss/2727_png.png'
  },
  {
    label: 'KPSS 30\'da 30 Net Türkçe',
    href: '/pdf-goster?file=/dosyalar/kitap-deneme-cozumleri/kpss-cozumleri/30da-30-net-kpss-turkce-cozum.pdf',
    external: true,
    image: '/images/kpss/_3d-kpss-30da-30-net-turkce-soru-bankasi.jpg'
  },
  {
    label: 'DGS Problemlerin İlacı',
    href: '/problemlerin-ilaci-cozum',
    external: false,
    image: '/images/kpss/problemlerin-ilaci.jpg'
  },
  {
    label: 'Sınavdan Önce Çözülmesi Gereken 888 Türkçe Soru',
    href: '/pdf-goster?file=/dosyalar/kitap-deneme-cozumleri/kpss-cozumleri/888-sozel-cozum-kitapcigi-son.pdf',
    external: true,
    image: '/images/kpss/888-sozel_jpg.jpg'
  },
  {
    label: 'Sınavdan Önce Çözülmesi Gereken 888 Sayısal Soru',
    href: '/pdf-goster?file=/dosyalar/kitap-deneme-cozumleri/kpss-cozumleri/888-sayisal-cozumler.pdf',
    external: true,
    image: '/images/kpss/888-sayisal-yetenek.jpg'
  },
  {
    label: 'Türkiye Karması Türkçe 20 Deneme Sınavı',
    href: '/pdf-goster?file=/dosyalar/kitap-deneme-cozumleri/kpss-cozumleri/turkiye-karmasi-turkce-20-deneme-sinavi.pdf',
    external: true,
    image: '/images/kpss/3d-kpss-turkce-20-deneme.jpg'
  },
  {
    label: '\'18\'de 18 Net Coğrafya',
    href: '/pdf-goster?file=/dosyalar/kitap-deneme-cozumleri/kpss-cozumleri/cografya-18de-18-net-cozum.pdf',
    external: true,
    image: '/images/kpss/net-cografya-3d.jpg'
  },
  {
    label: 'KPSS GY-GK 6 Muhteşem Deneme',
    href: '/cozumler/kpss-genel-yetenek-kultu-6-muhtesem-deneme',
    external: false,
    image: '/images/kpss/kpss-gy-gk-6-muhtesem-3d.jpg'
  },
  {
    label: 'KPSS Eğitim Bilimleri 5\'li Deneme',
    href: '/pdf-goster?file=/dosyalar/kitap-deneme-cozumleri/kpss-cozumleri/egitim-bilimleri-5li-deneme-cozum-2024.pdf',
    external: true,
    image: '/images/kpss/kpss-egitim-bilimleri-5li-deneme.jpg'
  },
  {
    label: 'EKPSS Son Prova 5\'li Deneme',
    href: '/ekpss-son-prova-5-deneme-cozumleri',
    external: false,
    image: '/images/kpss/3d-ekpss-son-prova-5li-deneme.jpg'
  },
  {
    label: 'Komple Paragraf',
    href: '/komple-paragraf-cozumleri',
    external: false,
    image: '/images/kpss/komple-paragraf-3d.jpg'
  },
  {
    label: 'Dil Bilgisi Soru Bankası',
    href: '/cozumler/dizin/cozumler/kpss-cozumleri/kpss-dil-bilgisi-soru-bankasi-cozumleri',
    external: false,
    image: '/images/kpss/3d-arti-dilbilgisi-sb_.jpg'
  },
  {
    label: 'KPSS Çözümlü Tüm Dersler',
    href: '/kpss-cozumlu-tum-dersler',
    external: false,
    image: '/images/kpss/dersler.jpg'
  },
  {
    label: 'KPSS Lisans 5 Süper Deneme',
    href: '/cozumler/dizin/cozumler/kpss-cozumleri/kpss-lisans-5-super-deneme',
    external: false,
    image: '/images/kpss/3d-kpss-5-super-deneme.jpg'
  },
];

export default function KpssCozumlerPage() {
  return (
    <>
      <style>{`
        .book-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 25px;
          padding: 20px 0;
        }
        
        .new-book-card {
          display: flex;
          flex-direction: column;
          background: var(--bg-card, #fff);
          border: 1.5px solid var(--border, #eaeaea);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: var(--shadow-sm, 0 4px 6px rgba(0,0,0,0.05));
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          color: inherit;
          height: 100%;
          position: relative;
        }
        
        .new-book-card:hover {
          transform: translateY(-3px) translateX(5px);
          border-color: var(--accent, #cd7e3b);
          box-shadow: 0 15px 35px rgba(25, 71, 80, 0.12);
        }

        .book-img-wrapper {
          position: relative;
          width: 100%;
          padding-top: 130%;
          background: var(--bg-secondary, #f8f9fa);
          border-bottom: 1.5px solid var(--border, #eaeaea);
        }

        .book-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 15px;
        }

        .book-info {
          padding: 16px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .book-info h3 {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary, #194750);
          line-height: 1.4;
          margin: 0 0 12px 0;
        }

        .book-action {
          margin-top: auto;
          display: inline-flex;
          align-items: center;
          align-self: flex-start;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          transition: all 0.2s;
        }

        .action-pdf {
          background: rgba(220, 53, 69, 0.1);
          color: #dc3545;
        }

        .action-menu {
          background: rgba(25, 71, 80, 0.1);
          color: var(--text-primary, #194750);
        }

        .new-book-card:hover .action-pdf,
        .new-book-card:hover .action-menu {
          background: var(--accent, #cd7e3b);
          color: #fff;
        }
      `}</style>

      <section className="page-hero">
        <div className="container">
          <h1>KPSS Çözümleri</h1>
          <p>KPSS kitap ve deneme sınavı çözümleri</p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2 style={{textAlign: 'center', marginBottom: '40px'}}>
            KPSS KİTAP-DENEME SINAVI ÇÖZÜMLERİ
          </h2>
          
          <div className="book-grid">
            {buttons.map((btn, index) => {
              const animationDelayStyle = { animationDelay: (index * 0.05) + 's' };
              const badgeClass = btn.external ? 'action-pdf' : 'action-menu';
              
              const CardContent = (
                <div className="new-book-card fade-in" style={animationDelayStyle}>
                  <div className="book-img-wrapper">
                    <Image 
                      src={btn.image} 
                      alt={btn.label}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="book-img"
                    />
                  </div>
                  <div className="book-info">
                    <h3>{btn.label}</h3>
                    <div className={"book-action " + badgeClass}>
                      {btn.external ? 'PDF Görüntüle' : 'Çözümleri Aç'}
                    </div>
                  </div>
                </div>
              );

              return btn.external ? (
                <a
                  key={index}
                  href={btn.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  {CardContent}
                </a>
              ) : (
                <Link
                  key={index}
                  href={btn.href}
                  style={{ textDecoration: 'none' }}
                >
                  {CardContent}
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}