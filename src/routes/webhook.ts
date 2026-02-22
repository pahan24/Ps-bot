import express from 'express';
import { verifyWebhook, handleMessage } from '../controllers/messageController';

const router = express.Router();

// Webhook Verification
router.get('/webhook', verifyWebhook);

// Incoming Messages
router.post('/webhook', handleMessage);

export default router;
