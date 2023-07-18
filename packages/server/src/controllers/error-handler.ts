import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

export default function syntaxErrHandler(
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof SyntaxError) {
    res.status(400).json({ message: 'Invalid request body!' });
  } else next(err);
}

export function customErrHandler(
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let error;

    if (err instanceof Error) {
      const stringErr = err.toString();
      // if the string is a parsable object
      if (['[', '{'].includes(stringErr[0])) {
        error = JSON.parse(stringErr);
      } else {
        error = { message: stringErr, statusCode: 500 };
      }
    } else if (err instanceof Object) {
      error = err;
    }

    // we know zod errors when parsed is an array
    const isZodErr = Array.isArray(error);
    const statusCode = isZodErr ? 400 : error?.statusCode || 500;
    if (statusCode === 500) {
      error.message = error.message || 'Internal server error';
    }

    res.status(statusCode).json(error);
  } catch (error) {
    console.log('🚀 ~ file: error-handler.ts:34 ~ error:', error);
    res.status(500).json({ message: 'Internal server error!' });
  }
}
