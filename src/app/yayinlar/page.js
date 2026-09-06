import PubCard from '@/components/PubCard';
import YayinlarClient from './YayinlarClient';

export const metadata = {
  title: 'Yayınlar | Tasarı Eğitim Yayınları',
  description: 'Tasarı Eğitim Yayınları – DGS, YÖS, ALES, KPSS, TYT-AYT ve SPK sınav hazırlık kitapları.',
};

export default function Yayinlar() {
  const categories = [
    {
      id: 'dgs',
      name: 'DGS Yayınları',
      desc: "Son 23 yılda 14 Türkiye 1.si çıkaran tek kurum olarak DGS'de liderliğimizi yayınlarımızla pekiştiriyoruz.",
      items: [
        
        
        
        
        { 
          title: 'DGS Sayısal Yetenek 888 Soru Bankası', 
          category: 'dgs', 
          desc: 'Seçkin sorulardan derlenmiş, pratik çözüm yolları içeren 888 soruda Sayısal Yetenek kılavuzu.', 
          features: ['888 adet özgün soru', 'Soru tipi analizleri', 'Hızlı çözüm stratejileri'], 
          buyLink: 'https://kitap.tasariegitim.com/dgs',
          image: '/images/dgs/dgs-ales-video-cozumlu-888-sayisal-soru.avif'
        },
        { 
          title: 'DGS Altı Şapka 6\'lı Deneme', 
          category: 'dgs', 
          desc: 'Farklı bakış açıları kazandıran özgün sorulardan oluşan, konu analizli DGS 6\'lı deneme seti.', 
          features: ['6 adet genel deneme', 'Detaylı konu analizi', '3D video çözümleri'], 
          buyLink: 'https://kitap.tasariegitim.com/dgs',
          image: '/images/dgs/3d-dgs-alti-sapka-6li-deneme-843f08d.avif'
        },
        
        
        { 
          title: '41 Günde DGS Soru Kitabı', 
          category: 'dgs', 
          desc: 'DGS hazırlığını 41 günlük planlı bir kampa dönüştüren, aşama aşama konu tarama kitabı.', 
          features: ['41 günlük çalışma planı', 'Hergün için özel hedefler', 'Kapsamlı konu tekrarları'], 
          buyLink: 'https://kitap.tasariegitim.com/dgs',
          image: '/images/dgs/41-gunde-dgs-13.05.2022-d93626d.avif'
        },
        { 
          title: 'DGS 6 Harika Deneme', 
          category: 'dgs', 
          desc: 'Konu analiz tabloları ile eksiklerinizi görmenizi sağlayan, ÖSYM standartlarında 6 harika deneme.', 
          features: ['6 adet konu analizli deneme', 'Sınav provası formatı', 'Görüntülü çözümler'], 
          buyLink: 'https://kitap.tasariegitim.com/dgs&pages=2',
          image: '/images/dgs/dgs-6-harika-deneme-konu-analizli.avif'
        },
        { 
          title: 'DGS Türkçe Sözel Yetenek Çek Kopart Test', 
          category: 'dgs', 
          desc: 'Pratik soru çözümü ve hızlı test imkanı sunan çek-kopart yaprak testler.', 
          features: ['Çek-kopart yaprak testler', 'Pratik soru tekrarları', 'Mobil uyumlu çözümler'], 
          buyLink: 'https://kitap.tasariegitim.com/dgs&pages=2',
          image: '/images/dgs/dgs-turkce-sozel-yetenek-cek-kopart-yaprak-test.avif'
        },
        { 
          title: 'DGS Son Prova Denemesi', 
          category: 'dgs', 
          desc: 'Gerçek sınav provasını en yakın formatta gerçekleştiren, son hazırlık ve motivasyon denemesi.', 
          features: ['Son prova denemesi', 'Gerçekçi sınav soruları', 'Ayrıntılı çözümleri'], 
          buyLink: 'https://kitap.tasariegitim.com/dgs&pages=2',
          image: '/images/dgs/dgs-son-prova-4-cozumlu-deneme.avif'
        }
      ]
    },
    {
      id: 'yos',
      name: 'YÖS Yayınları',
      desc: "Türkiye'nin YÖS konusunda en nitelikli ve en yoğun eğitim programı. Uzmanlaşmış özel öğretmen kadrosu.",
      items: [
        { 
          title: 'TR-YÖS Matematik Soru Bankası (3D)', 
          category: 'yos', 
          desc: 'TR-YÖS sınavına hazırlık için 3D çözümlü, güncel müfredatla uyumlu Matematik Soru Bankası.', 
          features: ['Detaylı 3D video çözümler', 'Konu özetli soru grupları', 'Özgün ve yeni nesil sorular'], 
          buyLink: 'https://kitap.tasariegitim.com/yos',
          image: '/images/yos/tr-yos-mat-soru-bankasi-3d_20092024_7c8c1f6.avif'
        },
        { 
          title: 'TR-YÖS IQ Soru Bankası (3D)', 
          category: 'yos', 
          desc: 'TR-YÖS mantık, IQ ve genel yetenek bölümüne yönelik özgün sorulardan oluşan kapsamlı 3D video çözümlü soru bankası.', 
          features: ['Şekil ve sayı örüntüleri', 'Zeka ve mantık soruları', 'Pratik çözüm metotları'], 
          buyLink: 'https://kitap.tasariegitim.com/yos',
          image: '/images/yos/tr-yos-iq-soru-bankasi-3d-006-_20092024_27de862.avif'
        },
        { 
          title: 'TR-YÖS Geometri Soru Bankası (3D)', 
          category: 'yos', 
          desc: 'TR-YÖS Geometri konuları için hazırlanan, zengin görsel içerikli ve 3D video çözümlü soru bankası.', 
          features: ['Açılar ve çokgenler', 'Uzay geometri ve katı cisimler', 'Adım adım video anlatımlı çözümler'], 
          buyLink: 'https://kitap.tasariegitim.com/yos',
          image: '/images/yos/tr-yos-geo-soru-bankasi-3d_20.09.2024_ae0b6a9.avif'
        },
        { 
          title: '3D TR-YÖS Matematik Denemeleri', 
          category: 'yos', 
          desc: 'TR-YÖS Matematik sınav formatına tam uyumlu, süre yönetimi ve sınav provası sağlayan deneme sınavları.', 
          features: ['Özgün deneme sınavları', 'Gerçek sınav zorluk derecesi', 'Ayrıntılı video çözümleri'], 
          buyLink: 'https://kitap.tasariegitim.com/yos',
          image: '/images/yos/tr-yos-mat.avif'
        },
        { 
          title: '3D TR-YÖS IQ Denemeleri', 
          category: 'yos', 
          desc: 'YÖS Genel Yetenek (IQ) testlerine yönelik hız ve pratiklik kazandıran deneme serisi.', 
          features: ['Zaman yönetimi teknikleri', 'Farklı soru tipleri', 'Tamamı 3D çözümlü'], 
          buyLink: 'https://kitap.tasariegitim.com/yos',
          image: '/images/yos/tr-yos-gy.avif'
        },
        { 
          title: 'TR-YÖS Sınav Soruları', 
          category: 'yos', 
          desc: 'TR-YÖS sınavlarında çıkmış soruları ve benzer soru tarzlarını içeren kılavuz soru kitabı.', 
          features: ['Çıkmış ve benzer sorular', 'Konulara göre sınıflandırılmış', 'Açıklamalı çözümler'], 
          buyLink: 'https://kitap.tasariegitim.com/yos',
          image: '/images/yos/tr-yos-6.avif'
        },
        { 
          title: 'TR-YÖS 6 Genel Deneme', 
          category: 'yos', 
          desc: 'TR-YÖS müfredatını tümüyle tarayan ve gerçek sınav deneyimi sunan 6 genel deneme seti.', 
          features: ['6 adet genel deneme', 'ÖSYM soru formatında', 'Cevap anahtarlı ve çözümlü'], 
          buyLink: 'https://kitap.tasariegitim.com/yos',
          image: '/images/yos/yos6_08.03.2024_8389f9b.avif'
        }
      ]
    },
    {
      id: 'ales',
      name: 'ALES Yayınları',
      desc: "Türkiye'nin ilk ALES kursu. 1997'den bu yana ALES eğitiminde daima öncü kurum.",
      items: [
        { 
          title: 'ALES Matematik Çözümlü Soru Bankası', 
          category: 'ales', 
          desc: 'ALES sayısal yetenek bölümüne yönelik, tüm konuları kapsayan detaylı çözümlü matematik soru bankası.', 
          features: ['Konu bazlı soru grupları', 'Detaylı çözümler', 'Yeni nesil soru tipleri'], 
          buyLink: 'https://kitap.tasariegitim.com/ales',
          image: '/images/ales/s3d-4014003.avif'
        },
        { 
          title: 'ALES Türkçe Sözel Yetenek Çözümlü Soru Bankası', 
          category: 'ales', 
          desc: 'ALES sözel yetenek bölümü için Türkçe, sözel mantık ve paragraf konularını kapsayan çözümlü soru bankası.', 
          features: ['Türkçe dil bilgisi', 'Sözel mantık soruları', 'Açıklamalı çözümler'], 
          buyLink: 'https://kitap.tasariegitim.com/ales',
          image: '/images/ales/3d-ales-turkce-sozel-yetenek-coz.soru-.b_23.09.2022_13e58fb.avif'
        },
        { 
          title: 'ALES Altı Şapka 6\'lı Deneme', 
          category: 'ales', 
          desc: 'Farklı bakış açıları kazandıran özgün sorulardan oluşan, konu analizli ALES 6\'lı deneme seti.', 
          features: ['6 adet genel deneme', 'Detaylı konu analizi', '3D video çözümleri'], 
          buyLink: 'https://kitap.tasariegitim.com/ales',
          image: '/images/ales/3d-ales-6-sapka-6-deneme-bdea1e5.avif'
        },
        { 
          title: 'ALES 50\'de 50 Net Matematik', 
          category: 'ales', 
          desc: 'ALES matematik bölümünde 50 soruda 50 net hedefleyenler için özel hazırlanmış, aşama aşama çözümlü kaynak.', 
          features: ['50 soruda 50 net hedefi', 'Çıkmış sınav soruları', 'Adım adım çözüm yolları'], 
          buyLink: 'https://kitap.tasariegitim.com/ales',
          image: '/images/ales/ales-50-de-50_28.05.2021_1df57ab.avif'
        },
        { 
          title: 'ALES Son Prova Denemesi', 
          category: 'ales', 
          desc: 'ALES sınavı öncesi gerçek sınav provasını en yakın formatta gerçekleştiren son hazırlık denemesi.', 
          features: ['Son prova formatında', 'Gerçekçi sınav soruları', 'Ayrıntılı çözümler'], 
          buyLink: 'https://kitap.tasariegitim.com/ales',
          image: '/images/ales/ales-son-prova_20.10.2023_9c6db62.avif'
        },
        { 
          title: 'ALES Türkçe Sözel Yetenek Çek Kopart Test', 
          category: 'ales', 
          desc: 'Pratik soru çözümü ve hızlı test imkanı sunan ALES Türkçe çek-kopart yaprak testler.', 
          features: ['Çek-kopart yaprak testler', 'Pratik soru tekrarları', 'Mobil uyumlu çözümler'], 
          buyLink: 'https://kitap.tasariegitim.com/ales',
          image: '/images/ales/ales-turkce-sozel-yetenek-cek-kopart-yaprak-test_23.09.2022_cb56c0c.avif'
        },
        { 
          title: 'ALES All Star Soru Bankası (3D)', 
          category: 'ales', 
          desc: 'ALES hazırlığının en kapsamlı ve yıldız kaynağı. 3D video çözümlü, tüm konuları kapsayan All Star soru bankası.', 
          features: ['Tüm konular tek pakette', '3D video çözümler', 'Ekonomik fiyat avantajı'], 
          buyLink: 'https://kitap.tasariegitim.com/ales',
          image: '/images/ales/d3d-fdf797d.avif'
        },
        { 
          title: 'ALES Komple Paragraf (3D)', 
          category: 'ales', 
          desc: 'ALES sözel bölümünün vazgeçilmez konusu paragraf soruları için özel hazırlanmış, 3D çözümlü komple kaynak.', 
          features: ['Paragraf tipleri analizi', 'Anlam bilgisi soruları', '3D video çözümler'], 
          buyLink: 'https://kitap.tasariegitim.com/ales',
          image: '/images/ales/k3d-f3d5f16.avif'
        },
        { 
          title: 'ALES Sayısal Sözel Yetenek Seti', 
          category: 'ales', 
          desc: 'ALES hazırlığında sayısal ve sözel yetenek bölümlerini birlikte kapsayan, avantajlı set.', 
          features: ['Sayısal + Sözel tek set', 'Video çözüm desteği', 'Hızlı çözüm stratejileri'], 
          buyLink: 'https://kitap.tasariegitim.com/ales',
          image: '/images/ales/2-4b3b682.avif'
        }
      ]
    },
    {
      id: 'kpss',
      name: 'KPSS Yayınları',
      desc: "Kamu personel seçme sınavında başarıya ulaşmak için kapsamlı kaynak kitaplar.",
      items: [
        { 
          title: 'KPSS Genel Yetenek', 
          category: 'kpss', 
          desc: 'KPSS genel yetenek bölümü için matematik ve Türkçe konularını kapsayan kaynak.', 
          features: ['Matematik konu anlatımı', 'Türkçe dil bilgisi', 'Çözümlü soru bankası'], 
          buyLink: 'https://kitap.tasariegitim.com',
          image: "/images/kpss/kpss-matematik-video-cozumlu-30da-30-net_jpg.jpg"
        },
        { 
          title: 'KPSS Genel Kültür', 
          category: 'kpss', 
          desc: 'Tarih, coğrafya, vatandaşlık ve güncel bilgiler konularını kapsayan genel kültür kaynağı.', 
          features: ['Tarih ve coğrafya', 'Vatandaşlık bilgisi', 'Güncel bilgiler'], 
          buyLink: 'https://kitap.tasariegitim.com',
          image: '/images/kpss/kpss-gy-gk-6-muhtesem-3d.jpg'
        }
      ]
    },
    {
      id: 'tyt',
      name: 'TYT-AYT Yayınları',
      desc: "Üniversite sınavına hazırlık için güncel müfredata uygun yayın setleri.",
      items: [
        { 
          title: 'Paragraf Soru Bankası', 
          category: 'tyt', 
          desc: 'Tüm sınavlar için ortak ve en önemli konu olan paragrafı kökten çözen ana kaynak.', 
          features: ['ÖSYM soru tarzı', 'Yeni nesil paragraf', 'Detaylı çözümler'], 
          buyLink: 'https://kitap.tasariegitim.com/tyt',
          image: '/images/tyt/paragraf-soru-bankasi.avif'
        },
        { 
          title: 'TYT 6 Plus Türkçe Çözümlü Deneme', 
          category: 'tyt', 
          desc: 'TYT Türkçe testine yönelik, tamamı video çözümlü 6 adet genel deneme sınavı.', 
          features: ['6 adet genel deneme', 'ÖSYM formatına uygun', 'Video çözümlü'], 
          buyLink: 'https://kitap.tasariegitim.com/tyt',
          image: '/images/tyt/tyt-6-plus-turkce-cozumlu-deneme.avif'
        },
        { 
          title: 'TYT Matematik 40\'ta 40 Net Soru Bankası', 
          category: 'tyt', 
          desc: 'TYT Matematik testinde eksiksiz başarı hedefleyenler için tamamı video çözümlü soru bankası.', 
          features: ['40 net hedefi', 'Yeni nesil problemler', 'Video çözümlü'], 
          buyLink: 'https://kitap.tasariegitim.com/tyt',
          image: '/images/tyt/tyt-matematik-40-ta-40-net-video-coz.soru-bankasi.avif'
        }
      ]
    },
    {
      id: 'spk',
      name: 'SPK Yayınları',
      desc: "Sermaye piyasası lisanslama sınavlarına yönelik özel hazırlanmış kaynak kitaplar.",
      items: [
        { 
          title: 'SPK Lisanslama Sınavları', 
          category: 'spk', 
          desc: 'Sermaye piyasası lisanslama sınavlarına yönelik kapsamlı kaynak ve test kitapları.', 
          features: ['Temel düzey lisanslama', 'İleri düzey lisanslama', 'Türev araçlar'], 
          buyLink: 'https://kitap.tasariegitim.com',
          image: '/images/3d-egitimin-temelleri.jpg'
        }
      ]
    }
  ];

  return <YayinlarClient categories={categories} />;
}
