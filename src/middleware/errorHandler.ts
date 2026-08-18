import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err);

  if (err.code === 'P2025') {
    return res.status(404).json({ error: 'Resource not found' });
  }

  res.status(500).json({ error: 'Something went wrong' });
}