import DirectoryListing from '@/components/DirectoryListing';
import SolutionPortal from '@/components/SolutionPortal';
import solutionsData from '@/data/solutions.json';
import legacyMap from '@/data/legacy-map.json';
import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';

const toReadableTitle = (slug) => {
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

// Bu Next.js sürümü catch-all params'ı URL-encoded geliyor; Türkçe karakterler için decode gerekli
const decodeKey = (segs) => {
  try {
    return (segs || []).map((s) => decodeURIComponent(s)).join('/');
  } catch {
    return (segs || []).join('/');
  }
};

const legacyFolderExists = (rel) => {
  try {
    return fs.existsSync(path.join(process.cwd(), 'public', ...rel.split('/')));
  } catch {
    return false;
  }
};

// URL alias'ları: eski slug -> çözülmesi gereken asıl slug
const solutionAliases = {
  'dgs-eski-yayinlari': 'dgs-eski-yayinlari',
};

// Legacy sayfalar için eski site ile birebir başlıklar
const legacyPageTitles = {
  'ales-50-50cozumler': "ALES 50'de 50 NET ÇÖZÜMLER",
};

const findSolution = (key) => {
  const real = solutionAliases[key] || key;
  if (solutionsData[real]) return { data: solutionsData[real], slug: real };
  for (const catKey in solutionsData) {
    const section = solutionsData[catKey].sections?.find(s => s.slug === real);
    if (section) {
      return {
        data: { ...solutionsData[catKey], title: section.name, sections: [section] },
        slug: catKey,
      };
    }
  }
  return null;
};

export async function generateMetadata({ params }) {
  const { segs } = await params;
  const key = decodeKey(segs);
  const rel = legacyMap[key] || null;
  if (rel && legacyFolderExists(rel)) {
    const title = legacyPageTitles[key] || toReadableTitle(key);
    return {
      title: `${title} | Tasarı Eğitim Yayınları`,
    };
  }

  const found = findSolution(key);
  if (found) {
    const title = found.data.title || toReadableTitle(key);
    return { title: `${title} | Tasarı Eğitim Yayınları` };
  }

  return { title: 'İçerik Bulunamadı | Tasarı Eğitim Yayınları' };
}

export default async function LegacyShortPathPage({ params }) {
  const { segs } = await params;
  const key = decodeKey(segs);
  const rel = legacyMap[key] || null;
  if (rel && legacyFolderExists(rel)) {
    return <DirectoryListing initialPath={rel} title={legacyPageTitles[key]} />;
  }

  const found = findSolution(key);
  if (found) {
    return <SolutionPortal data={found.data} slug={found.slug} />;
  }

  notFound();
}