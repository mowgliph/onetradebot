// Funciones para interactuar con CoinEx
import crypto from "crypto";
import fetch from "node-fetch";
import { COINEX_ACCESS_ID, COINEX_SECRET_KEY } from "../config/env.js";


// 🔑 Configuración de la API
const API_URL = "https://api.coinex.com/v2";
const ACCESS_ID = COINEX_ACCESS_ID;
const API_SECRET = COINEX_SECRET_KEY;

// 📌 Función para generar la firma de autenticación
function signParams(params) {
    const sortedKeys = Object.keys(params).sort();
    const queryString = sortedKeys.map(key => `${key}=${params[key]}`).join("&");
    const signStr = queryString + `&secret_key=${API_SECRET}`;
    return crypto.createHash("md5").update(signStr).digest("hex").toUpperCase();
}

// 📌 Función para hacer una solicitud GET a CoinEx
async function apiGet(endpoint, params = {}) {
    params["access_id"] = ACCESS_ID;
    params["tonce"] = Date.now();
    params["sign"] = signParams(params);

    const url = `${API_URL}${endpoint}?${new URLSearchParams(params)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("❌ Error en API GET:", error);
        return null;
    }
}

// 📌 Función para obtener el balance de la cuenta
export async function getBalance() {
    const response = await apiGet("/account/balance");

    if (response && response.code === 0) {
        return response.data;
    } else {
        return "Error al obtener balance";
    }
}

// 📌 Función para obtener el precio de una moneda
export async function getPrice(symbol) {
    const market = symbol.toUpperCase() + "USDT";
    const response = await apiGet("/market/ticker", { market });

    if (response && response.code === 0) {
        return response.data.ticker.last;
    } else {
        return "Error al obtener precio";
    }
}
