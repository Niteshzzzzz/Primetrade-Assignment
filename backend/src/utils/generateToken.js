import jwt from 'jsonwebtoken';
import env from '../config/env.js';

export default function generateToken(id) {
  return jwt.sign({ id }, env.JWT_SECRET, { expiresIn: '7d' });
}
