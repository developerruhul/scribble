import { type User } from '@prisma/client';
import { type NextFunction, type Request, type Response } from 'express';
import { expressjwt } from 'express-jwt';
import jwt from 'jsonwebtoken';

export const JWT_SECRET = process.env.JWT_SECRET || 'secret';

/**
 * Checks for a jwt token, parses it if found and adds it to req.auth
 */
export const jwtAuth = (req: Request, res: Response, next: NextFunction) => {
  return expressjwt({
    algorithms: ['HS256'],
    secret: JWT_SECRET,
  })(req, res, next);
};

export const signJWT = (userData: Partial<User>, expiryDate?: string) => {
  return jwt.sign(userData, JWT_SECRET, { expiresIn: expiryDate || '24h' });
};
