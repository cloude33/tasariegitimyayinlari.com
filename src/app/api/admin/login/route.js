import { NextResponse } from 'next/server';
import crypto from 'crypto';
import {
  hashPassword,
  generateToken,
  AUTH_COOKIE_NAME,
  AUTH_COOKIE_OPTIONS,
} from '@/lib/auth';
import { getClientIp, rateLimit, rateLimitResponse } from '@/lib/rateLimit';

const LOGIN_LIMIT = 5;
const LOGIN_WINDOW_MS = 5 * 60 * 1000;

function safeEqual(a, b) {
  const ab = Buffer.from(a, 'utf8');
  const bb = Buffer.from(b, 'utf8');
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

export async function POST(request) {
  const ip = getClientIp(request);
  const rl = rateLimit({ key: `login:${ip}`, limit: LOGIN_LIMIT, windowMs: LOGIN_WINDOW_MS });
  if (!rl.allowed) return rateLimitResponse(rl.retryAfter);

  try {
    const { username, password } = await request.json();

    const validUser = process.env.ADMIN_USER;
    const validHash = process.env.ADMIN_PASSWORD_HASH;

    if (!validUser || !validHash) {
      return NextResponse.json(
        { success: false, message: 'Sunucu yapılandırma hatası' },
        { status: 500 }
      );
    }

    const inputHash = hashPassword(password);
    const userMatch = safeEqual(username || '', validUser);
    const passMatch = safeEqual(inputHash, validHash);

    if (userMatch && passMatch) {
      const token = generateToken(validUser);
      const response = NextResponse.json({ success: true });
      response.cookies.set(AUTH_COOKIE_NAME, token, AUTH_COOKIE_OPTIONS);
      return response;
    }

    await new Promise((r) => setTimeout(r, 300 + Math.random() * 200));
    return NextResponse.json(
      { success: false, message: 'Geçersiz kullanıcı adı veya şifre' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}
