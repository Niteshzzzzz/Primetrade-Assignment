import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import User from '../models/User.js';

export default async (req, res, next) => {
  // Get token from cookie
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
  
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};
