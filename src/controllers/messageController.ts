import { Request, Response } from 'express';
import User from '../models/User';
import { sendMessage } from '../services/replyService';
import { logger } from '../utils/logger';
import { whatsappConfig } from '../config/whatsapp';

/**
 * Verify Webhook (GET)
 */
export const verifyWebhook = (req: Request, res: Response) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === whatsappConfig.verifyToken) {
      logger.info('Webhook Verified');
      res.status(200).send(challenge);
    } else {
      logger.warn('Webhook Verification Failed: Invalid Token');
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(400);
  }
};

/**
 * Handle Incoming Messages (POST)
 */
export const handleMessage = async (req: Request, res: Response) => {
  const body = req.body;

  // Check if this is an event from a WhatsApp subscription
  if (body.object === 'whatsapp_business_account') {
    // Iterate over each entry - there may be multiple if batched
    for (const entry of body.entry || []) {
      for (const change of entry.changes || []) {
        const value = change.value;

        if (value.messages && value.messages.length > 0) {
          const message = value.messages[0];
          const from = message.from; // Phone number
          const messageType = message.type;

          if (messageType === 'text') {
            const textBody = message.text.body;
            logger.info(`Received message from ${from}: ${textBody}`);

            await processMessage(from, textBody);
          } else {
            logger.info(`Received non-text message from ${from}`);
            await sendMessage(from, "Sorry, I only understand text messages for now.");
          }
        }
      }
    }
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
};

/**
 * Process the message logic
 */
const processMessage = async (from: string, text: string) => {
  try {
    // 1. Save/Update User
    await User.findOneAndUpdate(
      { phoneNumber: from },
      { 
        $set: { lastMessage: text },
        $inc: { interactionCount: 1 }
      },
      { upsert: true, new: true }
    );

    const cleanText = text.trim().toLowerCase();

    // 2. Auto-reply Logic
    switch (cleanText) {
      case 'hi':
      case 'hello':
        await sendMessage(from, "Hi there! Welcome to our WhatsApp Bot. \nType 'menu' to see options.");
        break;

      case 'menu':
        const menu = `*Main Menu* 📋\n\n1. Service Details 🛠️\n2. Contact Info 📞\n\nReply with a number.`;
        await sendMessage(from, menu);
        break;

      case '1':
        await sendMessage(from, "🛠️ *Service Details*\nWe provide top-notch WhatsApp automation solutions using Node.js and MongoDB.");
        break;

      case '2':
        await sendMessage(from, "📞 *Contact Info*\nEmail: support@example.com\nWebsite: www.example.com");
        break;

      case '/users':
        // Admin command
        const count = await User.countDocuments();
        await sendMessage(from, `👥 Total Users: ${count}`);
        break;

      default:
        await sendMessage(from, "I didn't understand that. Type 'menu' to see available options.");
        break;
    }
  } catch (error) {
    logger.error('Error processing message', error);
    await sendMessage(from, "Sorry, something went wrong on our end.");
  }
};
