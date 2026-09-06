import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const filePath = searchParams.get('file');
  const bypassIdm = searchParams.get('bypassIdm');

  if (!filePath) {
    return NextResponse.json({ error: 'file parametresi gerekli' }, { status: 400 });
  }

  // Güvenlik: sadece /dosyalar/ veya /cozumler/ altındaki .pdf dosyalarına izin ver
  const normalized = filePath.replace(/\\/g, '/');
  if (
    !normalized.endsWith('.pdf') ||
    normalized.includes('..') ||
    (!normalized.startsWith('/dosyalar/') && !normalized.startsWith('/cozumler/'))
  ) {
    return NextResponse.json({ error: 'Geçersiz dosya yolu' }, { status: 403 });
  }

  const fullPath = path.join(/*turbopackIgnore: true*/ process.cwd(), 'public', normalized);

  try {
    const fileBuffer = await fs.readFile(fullPath);

    if (bypassIdm === 'true') {
      // Return as base64 text to completely bypass IDM interception
      const base64Data = fileBuffer.toString('base64');
      return new Response(base64Data, {
        status: 200,
        headers: {
          'Content-Type': 'text/plain',
          'Cache-Control': 'public, max-age=86400',
        },
      });
    }

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        // inline: tarayıcıda aç, IDM'yi bypass et
        'Content-Disposition': 'inline',
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'public, max-age=86400',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (err) {
    // Yerelde dosya yoksa (Vercel'de gitignore edildiği için)
    // Tanımlı dosya sunucusuna veya ana siteye yönlendirme yapıyoruz
    const fileHost = process.env.NEXT_PUBLIC_FILE_HOST || 'https://tasariegitimyayinlari.com';
    return NextResponse.redirect(`${fileHost.replace(/\/+$/, '')}${normalized}`, 307);
  }
}
