import cron from 'node-cron';
import { sendEventReminders } from '../controllers/eventController.js';

cron.schedule('0 8 * * *', () => { // Runs every day at 8 AM
  sendEventReminders();
});
