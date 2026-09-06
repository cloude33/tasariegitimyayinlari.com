import { NextResponse } from 'next/server';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { hashPassword, checkAuth } from '@/lib/auth';
import { getClientIp, rateLimit, rateLimitResponse } from '@/lib/rateLimit';

const LIMIT = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 mins

function safeEqual(a, b) {
  const ab = Buffer.from(a, 'utf8');
  const bb = Buffer.from(b, 'utf8');
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

export async function POST(request) {
  const ip = getClientIp(request);
  const rl = rateLimit({ key: `cpwd:${ip}`, limit: LIMIT, windowMs: WINDOW_MS });
  if (!rl.allowed) return rateLimitResponse(rl.retryAfter);

  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }

  try {
    const { oldPassword, newPassword } = await request.json();

    if (!oldPassword || !newPassword) {
      return NextResponse.json({ error: 'Gerekli alanlar eksik' }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'Yeni şifre en az 6 karakter olmalıdır' }, { status: 400 });
    }

    const validHash = process.env.ADMIN_PASSWORD_HASH;
    if (!validHash) {
      return NextResponse.json({ error: 'Sunucu yapılandırma hatası' }, { status: 500 });
    }

    const oldInputHash = hashPassword(oldPassword);
    const passMatch = safeEqual(oldInputHash, validHash);

    if (!passMatch) {
      // Intentional delay to prevent brute force timing attacks
      await new Promise((r) => setTimeout(r, 300 + Math.random() * 200));
      return NextResponse.json({ error: 'Mevcut şifre yanlış' }, { status: 400 });
    }

    const newHash = hashPassword(newPassword);

    // Update in memory so it works without immediate restart
    process.env.ADMIN_PASSWORD_HASH = newHash;

    // Determine path to .env or .env.local
    const cwd = process.cwd();
    let envPath = path.join(cwd, '.env.local');
    if (!fs.existsSync(envPath)) {
      envPath = path.join(cwd, '.env');
    }

    if (fs.existsSync(envPath)) {
      let envContent = fs.readFileSync(envPath, 'utf8');
      
      // Replace the password hash in the file
      if (envContent.includes('ADMIN_PASSWORD_HASH=')) {
        envContent = envContent.replace(/^ADMIN_PASSWORD_HASH=.*$/m, `ADMIN_PASSWORD_HASH=${newHash}`);
      } else {
        envContent += `\nADMIN_PASSWORD_HASH=${newHash}\n`;
      }
      
      fs.writeFileSync(envPath, envContent, 'utf8');
    } else {
      // If neither exists, create .env.local
      const secret = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex');
      const user = process.env.ADMIN_USER || 'tasari_admin';
      const newEnvContent = `ADMIN_USER=${user}\nADMIN_PASSWORD_HASH=${newHash}\nJWT_SECRET=${secret}\n`;
      fs.writeFileSync(path.join(cwd, '.env.local'), newEnvContent, 'utf8');
    }

    // Try touching restart.txt for cPanel Passenger
    try {
      const restartPath = path.join(cwd, 'tmp', 'restart.txt');
      if (fs.existsSync(path.dirname(restartPath))) {
        fs.writeFileSync(restartPath, String(Date.now()), 'utf8');
      }
    } catch (e) {
      // ignore
    }

    return NextResponse.json({ success: true, message: 'Şifre başarıyla değiştirildi' });

  } catch (error) {
    console.error('Change password error:', error);
    return NextResponse.json(
      { error: 'Sunucu hatası oluştu' },
      { status: 500 }
    );
  }
}
