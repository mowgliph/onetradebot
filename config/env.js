// Configuración de variables de entorno
import { config } from 'dotenv';

config( {path: `.env.${process.env.NODE_ENV || 'development'}.local`} )

export const { 
    NODE_ENV,
    TELEGRAM_BOT_TOKEN, TELEGRAM_CHANNEL_ID,
    COINEX_ACCESS_ID, COINEX_SECRET_KEY
    
} = process.env;