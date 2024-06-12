// src/middleware/envTokenAuth.ts

import { Request, Response, NextFunction } from 'express';

const envTokenAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token !== process.env.jwt_secret) {
    return res.status(403).json({ message: 'Unauthorized' });
  }
  next();
};

export default envTokenAuth;
