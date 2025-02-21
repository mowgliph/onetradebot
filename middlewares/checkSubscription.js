import axios from 'axios';
import { TELEGRAM_BOT_TOKEN, TELEGRAM_CHANNEL_ID } from '../config/env.js';

export async function isUserSubscribed(userId) {
    try {
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getChatMember?chat_id=${TELEGRAM_CHANNEL_ID}&user_id=${userId}`;
        const response = await axios.get(url);
        const status = response.data.result.status;
        
        return ['member', 'administrator', 'creator'].includes(status);
    } catch (error) {
        console.error('Error verificando suscripción:', error.message);
        return false;
    }
}
