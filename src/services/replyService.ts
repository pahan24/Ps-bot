import axios from 'axios';
import { whatsappConfig } from '../config/whatsapp';
import { logger } from '../utils/logger';

/**
 * Service to handle sending messages to WhatsApp
 */
export const sendMessage = async (to: string, body: string) => {
  try {
    if (!whatsappConfig.token || !whatsappConfig.phoneNumberId) {
      logger.error('WhatsApp credentials missing. Cannot send message.');
      return;
    }

    const url = `${whatsappConfig.graphUrl}/${whatsappConfig.phoneNumberId}/messages`;
    
    const data = {
      messaging_product: 'whatsapp',
      to: to,
      text: { body: body }
    };

    const headers = {
      'Authorization': `Bearer ${whatsappConfig.token}`,
      'Content-Type': 'application/json'
    };

    await axios.post(url, data, { headers });
    logger.info(`Message sent to ${to}: ${body}`);
  } catch (error: any) {
    logger.error('Error sending WhatsApp message', error.response?.data || error.message);
  }
};
