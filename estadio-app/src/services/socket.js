// src/services/socket.js
import { io } from "socket.io-client";

// 🔍 Verificar qué está leyendo React del .env
console.log("API_BASE =", process.env.REACT_APP_API_BASE);
console.log("SOCKET_URL ENV =", process.env.REACT_APP_SOCKET_URL);

// URL final
const SOCKET_URL =
  process.env.REACT_APP_SOCKET_URL ||
  process.env.REACT_APP_API_BASE ||
  "http://localhost:3001";

console.log("SOCKET_URL FINAL =", SOCKET_URL);

// 🚀 Socket.IO
export const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  autoConnect: true,
});

socket.on("connect", () => {
  console.log("✅ Conectado a Socket.IO:", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("❌ Error de conexión Socket.IO:", err);
});

socket.on("disconnect", (reason) => {
  console.warn("⚠️ Socket.IO desconectado:", reason);
});