import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

function isPlainObject(v) {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

export function validateSolutionsShape(data) {
  if (!isPlainObject(data)) {
    return 'Kök object olmalı';
  }
  for (const [slug, entry] of Object.entries(data)) {
    if (!isPlainObject(entry)) return `Geçersiz kategori: ${slug}`;
    if (typeof entry.title !== 'string' || !entry.title.trim()) {
      return `Kategori başlığı eksik: ${slug}`;
    }
    if (!Array.isArray(entry.sections)) {
      return `Kategori bölümleri dizi olmalı: ${slug}`;
    }
    for (let i = 0; i < entry.sections.length; i++) {
      const sec = entry.sections[i];
      if (!isPlainObject(sec)) return `Bölüm object olmalı: ${slug}[${i}]`;
      if (typeof sec.name !== 'string' || !sec.name.trim()) {
        return `Bölüm adı eksik: ${slug}[${i}]`;
      }
      if (sec.items !== undefined && !Array.isArray(sec.items)) {
        return `Bölüm öğeleri dizi olmalı: ${slug}[${i}]`;
      }
      if (Array.isArray(sec.items)) {
        for (let j = 0; j < sec.items.length; j++) {
          const item = sec.items[j];
          if (!isPlainObject(item)) return `Öğe object olmalı: ${slug}[${i}][${j}]`;
          if (typeof item.title !== 'string' || !item.title.trim()) {
            return `Öğe başlığı eksik: ${slug}[${i}][${j}]`;
          }
          if (typeof item.link !== 'string' || !item.link.trim()) {
            return `Öğe linki eksik: ${slug}[${i}][${j}]`;
          }
        }
      }
    }
  }
  return null;
}

export async function readSolutions(filePath) {
  const raw = await fs.readFile(filePath, 'utf8');
  return JSON.parse(raw);
}

export async function writeSolutionsAtomic(filePath, data) {
  const validationError = validateSolutionsShape(data);
  if (validationError) {
    throw new Error(`Şema doğrulama hatası: ${validationError}`);
  }

  const json = JSON.stringify(data, null, 2);
  const dir = path.dirname(filePath);
  const baseName = path.basename(filePath);

  const bakPath = path.join(dir, `${baseName}.bak`);
  const tmpPath = path.join(dir, `.${baseName}.${process.pid}.${crypto.randomBytes(6).toString('hex')}.tmp`);

  let existing = null;
  try {
    existing = await fs.readFile(filePath, 'utf8');
  } catch {
    // ilk kez yazılıyor
  }

  if (existing !== null) {
    try {
      await fs.writeFile(bakPath, existing, 'utf8');
    } catch (err) {
      // yedek yazılamazsa yazma işlemini durdur
      throw new Error(`Yedek oluşturulamadı: ${err.message}`);
    }
  }

  try {
    await fs.writeFile(tmpPath, json, 'utf8');
    await fs.rename(tmpPath, filePath);
  } catch (err) {
    try { await fs.unlink(tmpPath); } catch {}
    throw err;
  }
}
