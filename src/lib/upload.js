import path from 'path';
import fs from 'fs/promises';

export const PUBLIC_DIR = path.join(process.cwd(), 'public', 'dosyalar');
export const MAX_FILE_BYTES = 50 * 1024 * 1024;
export const FOLDER_PATTERN = /^[a-z0-9\-_/]+$/;
export const SAFE_NAME_PATTERN = /[^a-zA-Z0-9._\-çğıöşüÇĞİÖŞÜ ]/g;

export function sanitizeFileName(name) {
  const base = path.basename(name || '').trim();
  if (!base) return null;
  const cleaned = base.replace(SAFE_NAME_PATTERN, '');
  return cleaned || null;
}

export function ensureSafeFolder(publicDir, folder) {
  if (!FOLDER_PATTERN.test(folder)) {
    return { ok: false, error: 'Geçersiz klasör' };
  }
  const uploadDir = path.resolve(publicDir, folder);
  if (!uploadDir.startsWith(publicDir)) {
    return { ok: false, error: 'Geçersiz klasör yolu' };
  }
  return { ok: true, uploadDir };
}

export function detectMagicType(bytes) {
  if (bytes.length < 12) return null;
  if (bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46) {
    return { ext: 'pdf', mime: 'application/pdf' };
  }
  if (bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF) {
    return { ext: 'jpg', mime: 'image/jpeg' };
  }
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47) {
    return { ext: 'png', mime: 'image/png' };
  }
  if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x38) {
    return { ext: 'gif', mime: 'image/gif' };
  }
  if (bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
      bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50) {
    return { ext: 'webp', mime: 'image/webp' };
  }
  return null;
}

export async function writeUniqueFile(uploadDir, desiredName) {
  const ext = path.extname(desiredName);
  const stem = desiredName.slice(0, -ext.length) || 'file';
  let finalName = desiredName;
  let counter = 1;
  while (true) {
    try {
      await fs.access(path.join(uploadDir, finalName));
      finalName = `${stem}-${counter}${ext}`;
      counter++;
    } catch {
      return { finalName, renamed: counter > 1 };
    }
  }
}
