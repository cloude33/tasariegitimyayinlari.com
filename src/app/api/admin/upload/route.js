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

const UPLOAD_LIMIT = 20;
const UPLOAD_WINDOW_MS = 10 * 60 * 1000;

const TG_SLUGS = new Set([
  'tg-deneme-cozumleri',
  'tasari-yos-denemeleri',
  'kpss-tg-cozumleri',
  'ales-deneme-cozumleri',
  'meb-ags-deneme-sinav-cozumleri',
  'tyt-ayt-deneme-cozumleri',
  'kts-deneme-sinavi',
  'msu-cozumleri',
]);

const TG_SECTION_TO_DIR = {
  'tg-deneme-cozumleri': 'tg/tg-deneme-cozumleri',
  'tasari-yos-denemeleri': 'tg/tasari-yos-denemeleri',
  'kpss-tg-cozumleri': 'tg/kpss-tg-cozumleri',
  'ales-deneme-cozumleri': 'tg/ales-deneme-cozumleri',
  'meb-ags-deneme-sinav-cozumleri': 'tg/meb-ags-deneme-sinav-cozumleri',
  'tyt-ayt-deneme-cozumleri': 'tg/tyt-ayt-deneme-cozumleri',
  'kts-deneme-sinavi': 'tg/kts-deneme-sinavi',
  'msu-cozumleri': 'tg/msu-cozumleri',
};

function resolveFolder(slug) {
  if (TG_SLUGS.has(slug)) {
    return TG_SECTION_TO_DIR[slug] || `tg/${slug}`;
  }
  return `cozumler/${slug}`;
}

export async function POST(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }

  const ip = getClientIp(request);
  const rl = rateLimit({ key: `upload:${ip}`, limit: UPLOAD_LIMIT, windowMs: UPLOAD_WINDOW_MS });
  if (!rl.allowed) return rateLimitResponse(rl.retryAfter);

  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const slug = (formData.get('slug') || '').toString().trim();

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'Dosya seçilmedi' }, { status: 400 });
    }

    if (!slug || !/^[a-z0-9\-_]+$/.test(slug)) {
      return NextResponse.json({ error: 'Geçersiz kategori' }, { status: 400 });
    }

    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json(
        { error: `Dosya çok büyük (max ${Math.round(MAX_FILE_BYTES / 1024 / 1024)} MB)` },
        { status: 400 }
      );
    }

    const safeName = sanitizeFileName(file.name);
    if (!safeName || !safeName.toLowerCase().endsWith('.pdf')) {
      return NextResponse.json(
        { error: 'Geçersiz dosya adı veya uzantısı (yalnızca PDF)' },
        { status: 400 }
      );
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const detected = detectMagicType(bytes);
    if (!detected || detected.ext !== 'pdf') {
      return NextResponse.json(
        { error: 'Dosya içeriği geçerli bir PDF değil' },
        { status: 400 }
      );
    }

    const folder = resolveFolder(slug);
    const safe = ensureSafeFolder(PUBLIC_DIR, folder);
    if (!safe.ok) {
      return NextResponse.json({ error: safe.error }, { status: 400 });
    }

    await fs.mkdir(safe.uploadDir, { recursive: true });
    const { finalName, renamed } = await writeUniqueFile(safe.uploadDir, safeName);
    await fs.writeFile(path.join(safe.uploadDir, finalName), bytes);

    const publicPath = `/dosyalar/${folder}/${finalName}`;
    return NextResponse.json({
      success: true,
      path: publicPath,
      fileName: finalName,
      renamed,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Dosya yükleme hatası: ' + error.message },
      { status: 500 }
    );
  }
}
