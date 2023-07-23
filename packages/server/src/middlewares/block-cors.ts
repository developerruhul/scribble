import { NextFunction, Request, Response } from 'express';

const blockCors = (req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === 'development') return next();

  const allowedOrigins = [process.env.FRONTEND_URL];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    // If the origin is in the allowed list, proceed with the request
    next();
  } else {
    // If the origin is not allowed, block the request
    return res.status(403).json({ error: 'Origin not allowed.' });
  }
};

export default blockCors;
