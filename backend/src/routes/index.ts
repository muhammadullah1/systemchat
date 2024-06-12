// src/routes/index.ts

import { Router } from 'express';
import UserRoutes from './UserRoutes';
import ChatRoutes from "./ChatRoutes";

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello from Express server');
});

router.use('/users', UserRoutes);
router.use('/chat', ChatRoutes);

export default router;
