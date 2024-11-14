import express from 'express';


import { protectRoute } from '../middlewares/protectRoute.js';
import { getMessage, sendMessage } from '../controllers/message-controller.js';

const router = express.Router();

router.get(
  '/:id',
  protectRoute,
  getMessage
);
router.post('/send/:id', protectRoute,sendMessage)

export default router
