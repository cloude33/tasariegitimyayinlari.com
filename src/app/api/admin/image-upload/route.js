import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { checkAuth } from '@/lib/auth';
import { getClientIp, rateLimit, rateLimitResponse } from '@/lib/rateLimit';
import {
  PUBLIC_DIR,
  MAX_FILE_BYTES,
  sanitizeFileName,
  ensureSafeFolder,
  detectMagicType,
  writeUniqueFile,
} from '@/lib/upload';

const UPLOAD_LIMIT = 30;
const UPLOAD_WINDOW_MS = 10 * 60 * 1000;
const ALLOWED_IMG_EXT = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif']);

export async function POST(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }

  const ip = getClientIp(request);
  const rl = rateLimit({ key: `imgUpload:${ip}`, limit: UPLOAD_LIMIT, windowMs: UPLOAD_WINDOW_MS });
  if (!rl.allowed) return rateLimitResponse(rl.retryAfter);

  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const folderRaw = (formData.get('folder') || 'images/uploads').toString().trim();

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'Dosya seçilmedi' }, { status: 400 });
    }

    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json(
        { error: `Dosya çok büyük (max ${Math.round(MAX_FILE_BYTES / 1024 / 1024)} MB)` },
        { status: 400 }
      );
    }

    const safeName = sanitizeFileName(file.name);
    if (!safeName) {
      return NextResponse.json({ error: 'Geçersiz dosya adı' }, { status: 400 });
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const detected = detectMagicType(bytes);
    if (!detected || !ALLOWED_IMG_EXT.has(detected.ext)) {
      return NextResponse.json(
        { error: 'Yalnızca JPG, PNG, GIF veya WebP yüklenebilir' },
        { status: 400 }
      );
    }

    const safe = ensureSafeFolder(PUBLIC_DIR, folderRaw);
    if (!safe.ok) {
      return NextResponse.json({ error: safe.error }, { status: 400 });
    }

    await fs.mkdir(safe.uploadDir, { recursive: true });

    const baseNoExt = safeName.replace(/\.[^.]+$/, '');
    const desired = `${baseNoExt}.${detected.ext}`;
    const { finalName, renamed } = await writeUniqueFile(safe.uploadDir, desired);
    await fs.writeFile(path.join(safe.uploadDir, finalName), bytes);

    const publicPath = `/dosyalar/${folderRaw}/${finalName}`;
    return NextResponse.json({
      success: true,
      path: publicPath,
      fileName: finalName,
      renamed,
      mime: detected.mime,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Görsel yükleme hatası: ' + error.message },
      { status: 500 }
    );
  }
}
