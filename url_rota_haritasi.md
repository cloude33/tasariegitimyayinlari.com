# URL Eşleştirme ve Rota Haritası

Bu dosya, orijinal site (`tasariegitimyayinlari.com`) üzerindeki yolların yeni sistemde hangi dinamik rotalara veya dosyalara karşılık geldiğini takip etmek için oluşturulmuştur.

## Dinamik Çözüm Sayfaları (Ana Kategoriler)

| Orijinal Yol | Yeni Sistem Anahtar (Slug) | Durum | Not |
| :--- | :--- | :--- | :--- |
| `/kpss-tg-cozumleri` | `kpss-tg-cozumleri` | ✅ Aktif | KPSS Türkiye Geneli |
| `/tasari-yos-denemeleri` | `tasari-yos-denemeleri` | ✅ Aktif | YÖS Denemeleri |
| `/ales-deneme-cozumleri` | `ales-deneme-cozumleri` | ✅ Aktif | ALES Denemeleri |
| `/meb-ags-deneme-sinav-cozumleri` | `meb-ags-deneme-sinav-cozumleri` | ✅ Aktif | MEB AGS Denemeleri |
| `/kts-deneme-sinavi` | `kts-deneme-sinavi` | ✅ Aktif | KTS Denemeleri |
| `/tg-deneme-cozumleri` | `tg-deneme-cozumleri` | ✅ Aktif | DGS Denemeleri |

## Alt Bölüm Sayfaları (Buton Tıklamasıyla Açılanlar)

Orijinal sitede bu bölümler genellikle bağımsız `.html` dosyalarıdır. Yeni sistemde bunları daha temiz yollara çekiyoruz.

| Orijinal Yol | Mevcut Hatalı Yol | Hedef Yeni Yol | Durum |
| :--- | :--- | :--- | :--- |
| `/yos-tarama-ara-deneme` | `/cozumler/tasari-yos-denemeleri-0` | `/yos-tarama-ara-deneme` | ✅ Düzenlendi |
| `/tr-yos-mayis-denemeleri` | `/cozumler/tasari-yos-denemeleri-1` | `/tr-yos-mayis-denemeleri` | ✅ Düzenlendi |
| `/kpss-lisans-tg-denemeleri` | `/cozumler/kpss-tg-cozumleri-2` | `/kpss-lisans-tg-denemeleri` | ✅ Düzenlendi |
| `/kpss-ortaogretim-onlisans-denemeleri` | `/cozumler/kpss-tg-cozumleri-3` | `/kpss-ortaogretim-onlisans-denemeleri` | ✅ Düzenlendi |
| `/e-kpss-denemeleri` | `/cozumler/kpss-tg-cozumleri-4` | `/e-kpss-denemeleri` | ✅ Düzenlendi |

## Uygulama Stratejisi (Güncellendi)

1.  **solutions.json**: Her bölüm (section) için bir `slug` alanı eklendi.
2.  **Next.js Routes**: `/cozumler/[slug]/page.js` dosyası hem kategori anahtarlarını hem de bölümlerdeki özel slugları arayacak şekilde güncellendi.
3.  **Redirects**: `next.config.mjs` dosyasına orijinal URL'lerden `/cozumler/...` yollarına kalıcı (301) yönlendirmeler eklendi. QR kodlar artık doğrudan çalışacaktır.
4.  **Linkleme**: `SolutionPortal` içindeki butonlar artık varsa `section.slug` değerini kullanıyor, yoksa eski index yapısına (fallback) dönüyor.
