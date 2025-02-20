# 🚀 OneTradeBot  

OneTradeBot es un bot de Telegram diseñado para interactuar con la API de CoinEx y realizar diversas acciones de trading directamente desde Telegram. Su objetivo es facilitar la gestión de operaciones y consultas de precios sin necesidad de acceder a un exchange manualmente.  

## 📌 Funcionalidades  
✅ **Obtener el precio actual de cualquier moneda.**  
```bash /p BTC```
✅ **Capturar imágenes de gráficos de TradingView.**
```bash /c BTC USDT [temporalidad]```
✅ Abrir operaciones en Long y Short con apalancamiento.
/long BTC USDT 10x 100
/short BTC USDT 10x 100
✅ Configurar toma de ganancias y stop loss.
/tp
/sl
✅ Consultar el balance de la cuenta en Spot y Futures.
/balance

## 🛠️ Tecnologías Utilizadas
Lenguaje: JavaScript
Framework: Node.js
Librerías: node-telegram-bot-api, axios
API: CoinEx
Hosting: Vercel

## 🚀 Instalación y Configuración
1️⃣ Clonar el repositorio
```bash git clone https://github.com/tu-usuario/OneTradeBot.git\ncd OneTradeBot```

2️⃣ Instalar las dependencias
````bash npm install```

3️⃣ Configurar las credenciales
Crea un archivo .env en la raíz del proyecto y agrega lo siguiente:
```env TELEGRAM_BOT_TOKEN=tu_token_de_telegram\nCOINEX_API_KEY=tu_api_key\nCOINEX_SECRET_KEY=tu_api_secret```

4️⃣ Ejecutar el bot
```bash node index.js```

## 📖 Desarrollo Paso a Paso
OneTradeBot se desarrolla bajo el concepto de Build in Public, documentando cada fase y publicando los avances en redes sociales y GitHub.

🔹 Fases del desarrollo:

Semana 1: Configuración inicial del bot.
Semana 2: Integración con la API de CoinEx.
Semana 3: Implementación de órdenes de trading.
Semana 4: Mejoras, optimización y despliegue en Vercel.

## 📜 Licencia
Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

## 📢 Contribuciones
Si deseas colaborar con el desarrollo de OneTradeBot, ¡las Pull Requests son bienvenidas! No dudes en abrir un issue si encuentras errores o tienes sugerencias para mejorar el bot.

💡 Proyecto en desarrollo por [mowgliph](https://github.com/mowgliph)


