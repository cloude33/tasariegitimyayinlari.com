import { NextResponse } from 'next/server';
import { revokeToken, AUTH_COOKIE_NAME } from '@/lib/auth';

export async function POST(request) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (token) {
    revokeToken(token);
  }
  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });
  return response;
}
