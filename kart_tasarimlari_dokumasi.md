# Kart Tasarımları Dokümantasyonu
## TG DGS Sayfası Kart Tasarım Analizi

### Genel Kart Yapısı

#### 1. Kategori Kartları (.cat-card)
- **CSS Sınıfları**: `cat-card`, `card-color-{0-5}`, `fade-in`
- **Temel Özellikler**:
  - Arka plan: `#ffffff` (beyaz)
  - Kenar: `1.5px solid rgba(25, 71, 80, 0.12)` (yarı şeffaf lacivert)
  - Border radius: `16px` (yuvarlatılmış köşeler)
  - Padding: `12px 25px`
  - Display: `flex`, `align-items: center`
  - Min yükseklik: `85px`
  - Box shadow: `0 10px 25px rgba(0,0,0,0.05)`
  - Sol border: `6px solid #eee` (renkli versiyonlar var)

#### 2. Çözüm Kartları (.sol-card)
- **CSS Sınıfları**: `sol-card`, `card-color-{0-5}`, `fade-in`
- **Temel Özellikler**: Kategori kartları ile aynı temel yapı

### Renk Şemaları

#### Card Color Classes (6 farklı renk):
1. **card-color-0**: Mavi tonu
   - Border-left: `#3b82f6`
   - Icon-box background: `#eff6ff`
   - Icon-box color: `#3b82f6`

2. **card-color-1**: Yeşil tonu
   - Border-left: `#10b981`
   - Icon-box background: `#ecfdf5`
   - Icon-box color: `#10b981`

3. **card-color-2**: Mor tonu
   - Border-left: `#8b5cf6`
   - Icon-box background: `#f5f3ff`
   - Icon-box color: `#8b5cf6`

4. **card-color-3**: Turuncu tonu
   - Border-left: `#f59e0b`
   - Icon-box background: `#fffbeb`
   - Icon-box color: `#f59e0b`

5. **card-color-4**: Kırmızı tonu
   - Border-left: `#ef4444`
   - Icon-box background: `#fef2f2`
   - Icon-box color: `#ef4444`

6. **card-color-5**: Cyan tonu
   - Border-left: `#06b6d4`
   - Icon-box background: `#ecfeff`
   - Icon-box color: `#06b6d4`

### İç Elemanlar

#### Icon Box (.icon-box)
- **Boyut**: `50px x 50px`
- **Border radius**: `12px`
- **Display**: `flex`, `align-items: center`, `justify-content: center`
- **Font size**: `22px`
- **Transition**: `0.3s`
- **Flex-shrink**: `0`
- **Margin-right**: `20px`

#### Kategori Bilgisi (.cat-info) / Çözüm Detayları (.sol-details)
- **Flex**: `1`
- **Display**: `flex`, `flex-direction: column`, `justify-content: center`

#### Başlık (h3/h4)
- **Font size**: `18px`
- **Font weight**: `800`
- **Color**: `var(--text)` (`#1a1a1a`)
- **Margin**: `0`
- **Line height**: `1.2`
- **Text transform**: `uppercase`

#### Açıklama (p)
- **Color**: `var(--text-dim)` (`#4a5568`)
- **Font size**: `13px`
- **Margin**: `4px 0 0 0`
- **Opacity**: `0.7`

#### Ok/İndirme İkonları (.cat-arrow, .sol-download)
- **Boyut**: `42px x 42px`
- **Background**: `#f1f5f9`
- **Color**: `var(--primary)` (`#194750`)
- **Border radius**: `10px`
- **Display**: `flex`, `align-items: center`, `justify-content: center`
- **Transition**: `0.3s`
- **Flex-shrink**: `0`
- **Margin-left**: `20px`

### Hover Efektleri

#### Kart Hover (.cat-card:hover, .sol-card:hover)
- **Transform**: `translateY(-3px) translateX(8px)`
- **Border-color**: `var(--accent)` (`#cd7e3b`)
- **Box shadow**: `0 15px 35px rgba(25, 71, 80, 0.12)`

#### İkon Hover (.cat-card:hover .cat-arrow, .sol-card:hover .sol-download)
- **Background**: `var(--accent)` (`#cd7e3b`)
- **Color**: `#fff`

### Animasyonlar

#### Fade-in Animasyonu
- **Başlangıç**: `opacity: 0`, `transform: translateY(15px)`
- **Bitiş**: `opacity: 1`, `transform: translateY(0)`
- **Süre**: `0.5s`
- **Easing**: `ease-out`
- **Delay**: Her kart için `index * 0.1s` (kategori) veya `index * 0.05s` (çözüm)

### Responsive Tasarım

#### Mobil (max-width: 768px)
- **Max-width**: `100%`
- **Padding**: `15px`
- **Min-height**: `70px`
- **Icon-box**: `40px x 40px`, `font-size: 18px`, `margin-right: 12px`
- **Başlık font-size**: `15px`

### Container Yapısı

#### Category List / Solution List
- **Display**: `flex`, `flex-direction: column`
- **Gap**: `14px`
- **Max-width**: `800px`
- **Margin**: `40px auto 100px`
- **Padding**: `0 20px`

### CSS Değişkenleri
```css
:root {
  --primary: #194750;
  --accent: #cd7e3b;
  --text: #1a1a1a;
  --text-dim: #4a5568;
  --nav-bg: #143b42;
}
```

### JavaScript Dinamik Yapı

#### Kart Oluşturma Mantığı
1. **Kategori Kartları**: `data.sections.forEach((section, index) => {...})`
2. **Renk Ataması**: `const colorIdx = index % 6;`
3. **Animasyon Gecikmesi**: `card.style.animationDelay = \`${index * 0.1}s\`;`
4. **İçerik Yapısı**: Icon + Bilgi + Ok ikonu

#### Çözüm Kartları
1. **Çözüm Listesi**: `section.items.forEach((item, index) => {...})`
2. **Renk Ataması**: `const colorIdx = index % 6;`
3. **Animasyon Gecikmesi**: `card.style.animationDelay = \`${index * 0.05}s\`;`
4. **İçerik Yapısı**: Icon + Detaylar + İndirme ikonu

### İkonlar

#### Kategori Kartları İkonu
```html
<svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

#### Çözüm Kartları İkonu
```html
<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" stroke-width="2"/>
</svg>
```

#### Ok İkonu
```html
<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path d="M9 5l7 7-7 7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

#### İndirme İkonu
```html
<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

### Örnek Kullanım

#### Kategori Kartı HTML Yapısı
```html
<div class="cat-card card-color-0 fade-in">
  <div class="icon-box">
    <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
  <div class="cat-info">
    <h3>Kategori Adı</h3>
    <p>X Dosya Mevcut</p>
  </div>
  <div class="cat-arrow">
    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M9 5l7 7-7 7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
</div>
```

#### Çözüm Kartı HTML Yapısı
```html
<div class="sol-card card-color-0 fade-in">
  <div class="icon-box">
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" stroke-width="2"/>
    </svg>
  </div>
  <div class="sol-details">
    <h4>Dosya Adı</h4>
    <p>Dosya açıklaması</p>
  </div>
  <a href="#" target="_blank" class="sol-download">
    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </a>
</div>
```

---
*Dokümantasyon oluşturulma tarihi: 08.05.2026*
*Kaynak dosya: tg-dgs.html*
