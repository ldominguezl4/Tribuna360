// functions/index.js

const functions = require('firebase-functions');
const twilio = require('twilio');

// --- CONFIGURACIÓN DE TWILIO ---
// Es crucial usar las variables de entorno para las credenciales.
// Debes configurarlas usando 'firebase functions:config:set twilio.sid="..." twilio.token="..."'
const accountSid = functions.config().twilio.sid;
const authToken = functions.config().twilio.token;
// Asegúrate de instalar la librería 'twilio' en la carpeta 'functions'
const twilioClient = new twilio(accountSid, authToken);

// El número de Twilio que usarás para enviar mensajes de WhatsApp (p.ej., el sandbox).
// Formato: 'whatsapp:+14155238886'
const twilioWhatsappNumber = 'TU_NUMERO_TWILIO_WHATSAPP'; 

// El número de destino (Grupo de Seguridad o Jefe de Seguridad).
// Formato: 'whatsapp:+CODIGO_PAISNUMERO_SEGURIDAD'
const securityRecipient = 'EL_NUMERO_DESTINO_SEGURIDAD'; 

// --- FUNCIÓN PRINCIPAL DE ALERTA ---
exports.sendWhatsappAlert = functions.https.onRequest(async (req, res) => {
    // Configuración CORS para permitir la llamada desde tu app local o web
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');

    // Manejar la solicitud OPTIONS (preflight CORS)
    if (req.method === 'OPTIONS') {
        res.status(204).send('');
        return;
    }

    // Validación de la solicitud
    if (req.method !== 'POST' || !req.body.location || !req.body.description) {
        return res.status(400).send('Error: Datos incompletos (location y description son requeridos).');
    }

    const { location, description } = req.body;
    
    // Construir el mensaje
    const alertBody = `🚨 ALERTA CRÍTICA (Estadio App) 🚨\nUbicación: ${location}\nDescripción: ${description}\nFecha/Hora: ${new Date().toLocaleString()}`;

    try {
        // Enviar el mensaje usando Twilio
        const message = await twilioClient.messages.create({
            body: alertBody,
            from: twilioWhatsappNumber, 
            to: securityRecipient      
        });

        console.log(`Mensaje de alerta enviado con SID: ${message.sid}`);
        return res.status(200).send({ success: true, message: 'Alerta enviada a seguridad.', sid: message.sid });

    } catch (error) {
        console.error('Error al enviar la alerta por WhatsApp:', error);
        return res.status(500).send({ success: false, message: 'Fallo al contactar la API de WhatsApp.', error: error.message });
    }
});