// src/middleware/isAuth.ts

import { Request, Response, NextFunction } from 'express';

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  // Add your authentication logic here, for example:
  if (!req.headers.authorization) {
    return res.status(403).json({ message: 'Unauthorized' });
  }
  next();
};

export default isAuth;
