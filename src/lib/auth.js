import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'bong99_ultra_secure_jwt_secret_token_2026_key';

export function signToken(payload, expiresIn = '7d') {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

export function getUserFromRequest(req) {
  try {
    const authHeader = req.headers.get ? req.headers.get('authorization') : req.headers?.authorization;
    let token = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else {
      const cookieHeader = req.headers.get ? req.headers.get('cookie') : req.headers?.cookie;
      if (cookieHeader) {
        const cookies = Object.fromEntries(
          cookieHeader.split(';').map(c => c.trim().split('='))
        );
        token = cookies['bong99_token'] || cookies['bong99_admin_token'];
      }
    }

    if (!token) return null;
    return verifyToken(token);
  } catch (e) {
    return null;
  }
}
