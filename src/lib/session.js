import { SignJWT, jwtVerify } from 'jose';

// Edge-safe JWT helpers (used by middleware and route handlers).
export const SESSION_COOKIE = 'ss_admin';
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

const secret = () => {
  const s = process.env.JWT_SECRET;
  if (!s) throw new Error('JWT_SECRET is not set');
  return new TextEncoder().encode(s);
};

export async function signSession(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(secret());
}

export async function verifySession(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    return payload;
  } catch {
    return null;
  }
}
