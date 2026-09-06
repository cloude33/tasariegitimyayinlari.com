import SolutionPortal from '@/components/SolutionPortal';
import DirectoryListing from '@/components/DirectoryListing';
import solutionsData from '@/data/solutions.json';
import legacyMap from '@/data/legacy-map.json';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';

const toReadableTitle = (slug) => {
  if (slug === '3dales-all-star') return 'All Star Soru Bankası Çözümleri';
  if (slug === 'tryos-genel-yetenek-cozumleri') return 'TR-YÖS 40X10 Genel Yetenek Çözümleri';
  const tokens = {
    dgs: 'DGS', ales: 'ALES', kpss: 'KPSS', lgs: 'LGS', yos: 'YÖS',
    ayt: 'AYT', tyt: 'TYT', tg: 'TG', kts: 'KTS', msu: 'MSÜ',
  };
  return slug
    .split('-')
    .map((t) => {
      const l = t.toLowerCase();
      if (tokens[l]) return tokens[l];
      return t.charAt(0).toUpperCase() + t.slice(1);
    })
    .join(' ')
    .replace(/cozumleri/i, 'Çözümleri')
    .replace(/cozum/i, 'Çözüm')
    .replace(/soru/i, 'Soru')
    .replace(/bankasi/i, 'Bankası')
    .replace(/sinav/i, 'Sınav')
    .trim();
};

const legacyDiskPath = (slug) => legacyMap[slug] || null;

const legacyFolderExists = (rel) => {
  try {
    return fs.existsSync(path.join(process.cwd(), 'public', ...rel.split('/')));
  } catch {
    return false;
  }
};

export async function generateMetadata({ params }) {
  const { slug } = await params;

  let title = null;
  let data = solutionsData[slug];

  if (data) {
    title = data.title;
  } else {
    for (const catKey in solutionsData) {
      const section = solutionsData[catKey].sections?.find(s => s.slug === slug);
      if (section) {
        title = section.name;
        break;
      }
    }
  }

  if (!title && slug.includes('-')) {
    const parts = slug.split('-');
    const lastPart = parts[parts.length - 1];
    if (!isNaN(lastPart)) {
      const base = solutionsData[parts.slice(0, -1).join('-')];
      if (base && base.sections[parseInt(lastPart)]) {
        title = base.sections[parseInt(lastPart)].name;
      }
    }
  }

  // Legacy map'e dayalı dizin listeleme başlığı
  if (!title) {
    const rel = legacyDiskPath(slug);
    if (rel && legacyFolderExists(rel)) {
      title = toReadableTitle(slug);
    }
  }

  return {
    title: title
      ? `${title} | Tasarı Eğitim Yayınları`
      : 'İçerik Bulunamadı | Tasarı Eğitim Yayınları',
  };
}

export default async function SolutionDetailPage({ params }) {
  const { slug } = await params;
  
  let data = solutionsData[slug];
  let actualSlug = slug;
  let sectionIndex = null;
  let customTitle = null;
  let customSections = null;
  
  // Eğer doğrudan kategori slug'ı değilse, bölümler içinde ara
  if (!data) {
    for (const catKey in solutionsData) {
      const section = solutionsData[catKey].sections?.find(s => s.slug === slug);
      if (section) {
        data = solutionsData[catKey];
        actualSlug = catKey;
        customTitle = section.name;
        customSections = [section];
        break;
      }
    }
  }

  // Eski yöntem: Alt sayfa kontrolü (örn: kpss-tg-cozumleri-0) - Geriye dönük uyumluluk için
  if (!data && slug.includes('-')) {
    const parts = slug.split('-');
    const lastPart = parts[parts.length - 1];
    if (!isNaN(lastPart)) {
      sectionIndex = parseInt(lastPart);
      actualSlug = parts.slice(0, -1).join('-');
      data = solutionsData[actualSlug];
      if (data && data.sections[sectionIndex]) {
        customTitle = data.sections[sectionIndex].name;
        customSections = [data.sections[sectionIndex]];
      }
    }
  }
  
  // Legacy map'e dayalı dizin listeleme (kısa yol: /cozumler/<slug>)
  if (!data) {
    const rel = legacyDiskPath(slug);
    if (rel && legacyFolderExists(rel)) {
      return <DirectoryListing initialPath={rel} title={toReadableTitle(slug)} />;
    }
  }

  if (!data) {
    return (
      <div className="container" style={{padding: '100px 20px', textAlign: 'center'}}>
        <h1>İçerik Bulunamadı</h1>
        <p>İstediğiniz kategoriye ait veriler henüz sisteme tanımlanmamış.</p>
        <Link href="/" className="btn btn-primary" style={{marginTop:'20px', display:'inline-block'}}>Ana Sayfaya Dön</Link>
      </div>
    );
  }

  // Eğer alt sayfa ise sadece o bölümü göster
  const displayData = customSections ? {
    ...data,
    title: customTitle,
    sections: customSections
  } : data;

  return <SolutionPortal data={displayData} slug={actualSlug} />;
}
