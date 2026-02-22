import express from 'express';
import webhookRoutes from './routes/webhook';
import { logger } from './utils/logger';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', webhookRoutes); // Webhook will be at /api/webhook

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

export default app;
