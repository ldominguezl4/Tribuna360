// 📦 Dependencias principales
const express = require('express');
const cors = require('cors');
const twilio = require('twilio');
const http = require('http');
const { Server } = require('socket.io');
const readline = require('readline');

const app = express();
const server = http.createServer(app);

const PORT = 3001;

// 🌐 URLs permitidas (frontend local + túnel remoto)
const allowedOrigins = [
  'http://localhost:3000',
  'https://39524f31-3000.brs.devtunnels.ms'
];
// ⚙️ Configurar Socket.IO
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// --- 🔐 TWILIO CONFIG ---
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = new twilio(accountSid, authToken);

// --- NÚMEROS DE WHATSAPP ---
const twilioWhatsappNumber = 'whatsapp:+14155238886';
const securityRecipient = 'whatsapp:+51998613650';

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.get('/test', (req, res) => {
  res.json({
    ok: true,
    message: 'Servidor funcionando'
  });
});

// 🧭 Ruta para enviar alerta desde el frontend a seguridad (WhatsApp)
app.post('/send-whatsapp', async (req, res) => {
  const { location, description } = req.body;
  const alertBody = `🚨 ALERTA (Estadio App) 🚨\nUbicación: ${location}\nDescripción: ${description}`;

  try {
    const message = await twilioClient.messages.create({
      body: alertBody,
      from: twilioWhatsappNumber,
      to: securityRecipient
    });

    console.log(`📤 WhatsApp enviado con SID: ${message.sid}`);

    // Emitimos la alerta en tiempo real al frontend
    io.emit('alertMessage', alertBody);

    res.status(200).send({
      success: true,
      message: 'Alerta enviada a seguridad.',
      sid: message.sid
    });
  } catch (error) {
    console.error('❌ Error al enviar WhatsApp:', error.message);
    res.status(500).send({
      success: false,
      message: 'Fallo al contactar la API de WhatsApp.',
      error: error.message
    });
  }
});

// 🧠 Socket.IO - Conexión en tiempo real
io.on('connection', (socket) => {
  console.log(`🟢 Usuario conectado: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`🔴 Usuario desconectado: ${socket.id}`);
  });
});

// 💬 Interfaz de consola (para escribir mensajes manuales)
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log(`🚀 Servidor de alertas corriendo en http://localhost:${PORT}`);
console.log('💬 Escribe un mensaje aquí para enviarlo a todos los usuarios conectados:\n');

rl.on('line', (input) => {
  if (input.trim() !== '') {
    const message = `📢 Mensaje de seguridad:\n${input.trim()}`;
    io.emit('alertMessage', message);
    console.log(`✅ Mensaje emitido a usuarios: "${input.trim()}"`);
  }
});

// 🏁 Iniciar el servidor
server.listen(PORT, () => {
  console.log(`✅ Backend escuchando en el puerto ${PORT}`);
});

