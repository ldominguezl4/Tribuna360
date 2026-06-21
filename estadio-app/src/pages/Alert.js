import React, { useState, useEffect } from 'react';
import { socket } from "../services/socket";
import api from "../services/apiClient";
import { AlertCircle, Send, XCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MAX_CHARACTERS = 50;

// 🚀 Conexión a Socket.IO (una sola vez)

function Alert() {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const [incomingAlerts, setIncomingAlerts] = useState([]); // 💬 Mensajes recibidos desde seguridad

  const LOCATIONS = [
    'Sector General',
    'Tribuna Norte',
    'Tribuna Sur',
    'Zona VIP',
    'Entrada Principal'
  ];

  const displayLocation = location || 'Selecciona tu ubicación';

  // 🎧 Escuchar mensajes desde el backend
  useEffect(() => {
    socket.on("alertMessage", (msg) => {
      setIncomingAlerts((prev) => [
        { message: msg, time: new Date().toLocaleTimeString() },
        ...prev
      ]);
    });

    return () => {
      socket.off("alertMessage");
    };
  }, []);

  const handleSend = async () => {
    if (message.length === 0 || location === null) {
      setStatus('error');
      setStatusMessage('¡Error! Debes escribir un mensaje y seleccionar una ubicación.');
      return;
    }

    setIsSending(true);
    setStatus(null);

    try {
      const response = await api.post("/send-whatsapp", {
  location: location,
  description: message,
  timestamp: new Date().toISOString(),
      });

      if (response.data.success) {
        setStatus('success');
        setStatusMessage('Alerta verificada. El equipo de seguridad ha sido notificado.');
      } else {
        setStatus('error');
        setStatusMessage('Error del Servidor: ' + response.data.message);
      }

      setMessage('');
      setLocation(null);
    } catch (error) {
      console.error('Error de conexión o red:', error);
      setStatus('error');
      setStatusMessage('Error de conexión con el servidor (Puerto 3001). ¿Está el servidor Express activo?');
    } finally {
      setIsSending(false);
      setTimeout(() => setStatus(null), 8000);
    }
  };

  const remaining = MAX_CHARACTERS - message.length;

  return (
    <div className="p-6 h-full bg-gray-900 text-white flex flex-col items-center">
      <AlertCircle className="w-12 h-12 text-yellow-400 mb-2" />
      <h1
        className="text-3xl font-extrabold mb-1 text-center"
        style={{ color: '#FFD700' }}
      >
        CENTRO DE ALERTAS
      </h1>

      <p className="text-sm text-gray-400 mb-6 text-center max-w-xs">
        Usa este canal solo para emergencias o reportes críticos. Máximo 40 palabras.
      </p>

      {/* Selector de Ubicación */}
      <div className="w-full max-w-md mb-4 relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`w-full p-3 flex justify-between items-center border rounded-lg bg-gray-800 text-white focus:ring-blue-500 focus:border-blue-500 transition duration-150 ${location === null ? 'border-red-500' : 'border-gray-600'}`}
        >
          <span>Ubicación: {displayLocation}</span>
          <motion.div
            animate={{ rotate: isDropdownOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </button>

        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-xl overflow-hidden"
            >
              {LOCATIONS.map(loc => (
                <div
                  key={loc}
                  onClick={() => {
                    setLocation(loc);
                    setIsDropdownOpen(false);
                  }}
                  className={`p-3 cursor-pointer ${location === loc ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                >
                  {loc}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Área de texto */}
      <div className="w-full max-w-md mb-4">
        <textarea
          value={message}
          onChange={(e) => {
            if (e.target.value.length <= MAX_CHARACTERS) {
              setMessage(e.target.value);
            }
          }}
          placeholder={`Describe el problema aquí (máx. ${MAX_CHARACTERS} caracteres)`}
          rows="3"
          className="w-full p-3 border border-red-500 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-red-500 focus:border-red-500"
          disabled={isSending}
        />
        <div className={`text-sm mt-1 text-right ${remaining < 10 ? 'text-red-400' : 'text-gray-400'}`}>
          {remaining} caracteres restantes
        </div>
      </div>

      {/* Mensaje de estado */}
      {status && (
        <div className={`p-3 rounded-lg w-full max-w-md mb-4 flex items-center font-semibold ${status === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {status === 'success' ? <Send className="w-5 h-5 mr-2" /> : <XCircle className="w-5 h-5 mr-2" />}
          {statusMessage}
        </div>
      )}

      {/* Botón */}
      <button
        onClick={handleSend}
        disabled={isSending || message.length === 0 || location === null}
        className={`w-full max-w-md py-3 rounded-lg font-bold transition duration-300 ${
          isSending || message.length === 0 || location === null
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-red-600 hover:bg-red-700'
        }`}
      >
        {isSending ? 'Enviando...' : 'Enviar Alerta'}
      </button>

      {/* 💬 Panel de mensajes desde seguridad */}
      <div className="w-full max-w-md mt-6 bg-gray-800 rounded-lg p-3">
        <h3 className="text-lg font-bold text-yellow-400 mb-2">📢 Mensajes de Seguridad</h3>
        {incomingAlerts.length === 0 ? (
          <p className="text-gray-400 text-sm">No hay alertas nuevas.</p>
        ) : (
          incomingAlerts.map((a, i) => (
            <div
              key={i}
              className="border border-yellow-500/40 bg-yellow-900/20 rounded-lg p-2 mb-2"
            >
              <p className="text-sm text-white">{a.message}</p>
              <p className="text-xs text-gray-400">{a.time}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Alert;
