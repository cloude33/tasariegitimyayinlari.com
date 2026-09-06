import crypto from 'crypto';

const TOKEN_TTL_MS = 8 * 60 * 60 * 1000;

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not set');
  }
  return secret;
}

function getAdminUser() {
  const user = process.env.ADMIN_USER;
  if (!user) {
    throw new Error('ADMIN_USER environment variable is not set');
  }
  return user;
}

export function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export function generateToken(username) {
  const payload = JSON.stringify({ user: username, ts: Date.now() });
  const sig = crypto.createHmac('sha256', getSecret()).update(payload).digest('hex');
  return Buffer.from(payload).toString('base64') + '.' + sig;
}

const REVOKED_KEY = '__adminTokenRevoked__';
function getRevoked() {
  if (!globalThis[REVOKED_KEY]) {
    globalThis[REVOKED_KEY] = new Map();
  }
  return globalThis[REVOKED_KEY];
}

function pruneRevoked() {
  const revoked = getRevoked();
  const cutoff = Date.now() - TOKEN_TTL_MS;
  for (const [token, exp] of revoked) {
    if (exp < cutoff) revoked.delete(token);
  }
  if (revoked.size > 1000) {
    const entries = [...revoked.entries()].sort((a, b) => a[1] - b[1]);
    const toRemove = entries.slice(0, entries.length - 1000);
    for (const [token] of toRemove) revoked.delete(token);
  }
}

export function revokeToken(token) {
  if (!token || typeof token !== 'string') return;
  try {
    const dotIdx = token.indexOf('.');
    if (dotIdx === -1) return;
    const payloadB64 = token.slice(0, dotIdx);
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64').toString('utf8'));
    const exp = payload.ts + TOKEN_TTL_MS;
    if (typeof exp !== 'number') return;
    getRevoked().set(token, exp);
  } catch {
    // ignore malformed
  }
}

export function verifyToken(token) {
  if (!token || typeof token !== 'string') return false;
  try {
    const dotIdx = token.indexOf('.');
    if (dotIdx === -1) return false;
    const payloadB64 = token.slice(0, dotIdx);
    const sig = token.slice(dotIdx + 1);
    if (!payloadB64 || !sig) return false;

    const payload = Buffer.from(payloadB64, 'base64').toString('utf8');
    const expectedSig = crypto.createHmac('sha256', getSecret()).update(payload).digest('hex');

    const sigBuf = Buffer.from(sig, 'utf8');
    const expectedBuf = Buffer.from(expectedSig, 'utf8');
    if (sigBuf.length !== expectedBuf.length) return false;
    if (!crypto.timingSafeEqual(sigBuf, expectedBuf)) return false;

    const { user, ts } = JSON.parse(payload);
    if (typeof ts !== 'number' || Date.now() - ts > TOKEN_TTL_MS) return false;
    if (typeof user !== 'string' || user !== getAdminUser()) return false;
    const revoked = getRevoked();
    if (revoked.size > 0) {
      pruneRevoked();
      if (revoked.has(token)) return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function checkAuth(request) {
  const token = request.cookies.get('admin_token')?.value;
  if (!token) return false;
  return verifyToken(token);
}

export const AUTH_COOKIE_NAME = 'admin_token';
export const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 8 * 60 * 60,
  path: '/',
};
