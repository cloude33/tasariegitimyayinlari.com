import Link from 'next/link';

export const metadata = {
  title: 'AGS Sayısal-Sözel Yetenek Çözümleri | Tasarı Eğitim Yayınları',
  description: 'MEB-AGS Sayısal-Sözel Yetenek Soru Bankası çözümleri. Sözel yetenek ve sayısal yetenek konu çözümleri ücretsiz.',
};

const sozelItems = [
  { n: 1, label: "Sözün Anlamı", file: '1-sozel-yetenek-1-sozun-anlami.pdf' },
  { n: 2, label: "Cümlenin Anlamı ve Yorumu", file: '1-sozel-yetenek-2-cumlenin-anlami-ve-yorumu.pdf' },
  { n: 3, label: "Boşluk Tamamlama Doldurma", file: '1-sozel-yetenek-3-bosluk-tamamlama-doldurma.pdf' },
  { n: 4, label: "Kesin Yargı", file: '1-sozel-yetenek-4-kesin-yargi.pdf' },
  { n: 5, label: "Cümle Kurma", file: '1-sozel-yetenek-5-cumle-kurma.pdf' },
  { n: 6, label: "Akışı Bozan Cümle", file: '1-sozel-yetenek-6-akisi-bozan-cumle.pdf' },
  { n: 7, label: "Yer Değiştirme", file: '1-sozel-yetenek-7-yer-degistirme.pdf' },
  { n: 8, label: "Paragraf Oluşturma", file: '1-sozel-yetenek-8-paragraf-olusturma.pdf' },
  { n: 9, label: "Anlatım Biçimleri", file: '1-sozel-yetenek-9-anlatim-bicimleri.pdf' },
  { n: 10, label: "Paragraf", file: '1-sozel-yetenek-10-paragraf.pdf' },
  { n: 11, label: "Mantık", file: '1-sozel-yetenek-11-mantik.pdf' },
];

const sayisalItems = [
  { n: 1, label: "Temel Kavramlar", file: '2-sayisal-yetenek-1-temel-kavramlar.pdf' },
  { n: 2, label: "Ardışık Sayılar", file: '2-sayisal-yetenek-2-ardisik-sayilar.pdf' },
  { n: 3, label: "Sayı Basamakları", file: '2-sayisal-yetenek-3-sayi-basamaklari.pdf' },
  { n: 4, label: "Taban Aritmetiği", file: '2-sayisal-yetenek-4-taban-aritmetigi.pdf' },
  { n: 5, label: "Faktöriyel", file: '2-sayisal-yetenek-5-faktoriyel.pdf' },
  { n: 6, label: "Dört İşlem - Bölme - Bölünebilme", file: '2-sayisal-yetenek-6-dort-islem-bolme-bolunebilme.pdf' },
  { n: 7, label: "Asal Sayılar", file: '2-sayisal-yetenek-7-asal-sayila.pdf' },
  { n: 8, label: "OBEB - OKEK", file: '2-sayisal-yetenek-8-obeb-okek.pdf' },
  { n: 9, label: "Özel Sayılar", file: '2-sayisal-yetenek-9-ozel-sayilar.pdf' },
  { n: 10, label: "Rasyonel Sayılar", file: '2-sayisal-yetenek-10-rasyonel-sayilar.pdf' },
  { n: 11, label: "Üslü Sayılar", file: '2-sayisal-yetenek-11-uslu-sayilar.pdf' },
  { n: 12, label: "Köklü Sayılar", file: '2-sayisal-yetenek-12-koklu-sayilar.pdf' },
  { n: 13, label: "Çarpanlara Ayırma", file: '2-sayisal-yetenek-13-carpanlara-ayirma.pdf' },
  { n: 14, label: "Basit Eşitsizlikler", file: '2-sayisal-yetenek-14-basit-esitsizlikler.pdf' },
  { n: 15, label: "Mutlak Değer", file: '2-sayisal-yetenek-15-mutlak-deger.pdf' },
  { n: 16, label: "Oran - Orantı", file: '2-sayisal-yetenek-16-oran-oranti.pdf' },
  { n: 18, label: "Sayı - Kesir Problemleri", file: '2-sayisal-yetenek-18-sayi-kesir-problemleri.pdf' },
  { n: 19, label: "Yaş Problemleri", file: '2-sayisal-yetenek-19-yas-problemleri.pdf' },
  { n: 20, label: "İşçi - Havuz Problemleri", file: '2-sayisal-yetenek-20-isci-havuz-problemleri.pdf' },
  { n: 21, label: "Hareket Problemleri", file: '2-sayisal-yetenek-21-hareket-problemleri.pdf' },
  { n: 22, label: "Yüzde - Kâr - Zarar Problemleri", file: '2-sayisal-yetenek-22-yuzde-kr-zarar-problemleri.pdf' },
  { n: 23, label: "Karışım Problemleri", file: '2-sayisal-yetenek-23-karisim-problemleri.pdf' },
  { n: 24, label: "Kümeler", file: '2-sayisal-yetenek-24-kumeler.pdf' },
  { n: 25, label: "Permütasyon", file: '2-sayisal-yetenek-25-permutasyon.pdf' },
  { n: 26, label: "Kombinasyon", file: '2-sayisal-yetenek-26-kombinasyon.pdf' },
  { n: 27, label: "Olasılık", file: '2-sayisal-yetenek-27-olasilik.pdf' },
  { n: 28, label: "İşlem", file: '2-sayisal-yetenek-28-islem.pdf' },
  { n: 29, label: "Modüler Aritmetik", file: '2-sayisal-yetenek-29-moduler-aritmetik.pdf' },
  { n: 30, label: "Fonksiyonlar", file: '2-sayisal-yetenek-30-fonksiyonlar.pdf' },
  { n: 31, label: "Grafik - Tablo", file: '2-sayisal-yetenek-31-grafik-tablo.pdf' },
  { n: 32, label: "Sayısal Mantık", file: '2-sayisal-yetenek-32-sayisal-mantik.pdf' },
];

const pdfLink = (folder, file) =>
  `/pdf-goster?file=/dosyalar/${folder}/${file}`;

function Section({ title, items, folder, subtitle }) {
  return (
    <>
      <h3 style={{ textAlign: 'center', fontSize: '18px', fontWeight: 800, letterSpacing: '0.5px', margin: '50px 0 8px', color: 'var(--primary)' }}>
        {title}
      </h3>
      <p style={{ textAlign: 'center', fontSize: '14px', color: 'var(--text-dim)', margin: '0 0 28px' }}>
        {subtitle}
      </p>
      {items.map((item, index) => (
        <a
          key={item.file}
          href={pdfLink(folder, item.file)}
          target="_blank"
          rel="noopener noreferrer"
          className={`sol-card card-color-${index % 6} fade-in`}
          style={{ animationDelay: `${index * 0.04}s` }}
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
    </>
  );
}

export default function AgsSayisalSozelPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Sayısal-Sözel Yetenek</h1>
          <p>MEB-AGS Sayısal & Sözel Yetenek Soru Bankası çözümleri</p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>
            AGS SÖZEL-SAYISAL YETENEK SORU BANKASI ÇÖZÜMLERİ
          </h2>
          <p style={{ textAlign: 'center', fontSize: '15px', color: 'var(--text-dim)', maxWidth: '640px', margin: '0 auto 20px' }}>
            Konu başlıklarından çözüm PDF&apos;ine ulaşabilirsiniz.
          </p>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Section title="SÖZEL YETENEK" subtitle="Sözel yetenek konu çözümleri" items={sozelItems} folder="ags-sozel-soru-bankasi" />
            <Section title="SAYISAL YETENEK" subtitle="Sayısal yetenek konu çözümleri" items={sayisalItems} folder="ags-sayisal-soru-bankasi" />
          </div>
        </div>
      </section>
    </>
  );
}