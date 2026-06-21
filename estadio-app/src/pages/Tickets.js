// src/pages/Tickets.js

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, Clock, CheckCircle } from 'lucide-react';
import TicketCard from '../components/TicketCard'; 

// Función SIMULADA para generar un código QR y una fecha límite
const generateReservationDetails = (price) => {
  const qrCode = 'QR' + Math.random().toString(36).substring(2, 10).toUpperCase();
  const deadline = new Date();
  deadline.setDate(deadline.getDate() + 1); // Fecha límite: 24 horas después
  
  return {
    qrCode,
    deadline: deadline.toLocaleString('es-PE', { 
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' 
    }),
    paymentNumber: 'Billetera Digital: +51 987 654 321', 
    totalPrice: price,
  };
};

const TICKET_OPTIONS = [
  { section: 'Tribuna Norte', price: 50, color: 'bg-yellow-100 border-yellow-500' },
  { section: 'Tribuna Sur', price: 60, color: 'bg-red-100 border-red-500' },
  { section: 'Sector General', price: 85, color: 'bg-green-100 border-green-500' },
  { section: 'Palco', price: 150, color: 'bg-blue-100 border-blue-500' },
];

function Tickets() {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [reservationDetails, setReservationDetails] = useState(null);
  const [step, setStep] = useState('list'); 

  const handleSelectTicket = (ticket) => {
    setSelectedTicket(ticket);
    setStep('details');
  };

  const handleReserve = () => {
    const details = generateReservationDetails(selectedTicket.price);
    setReservationDetails(details);
    setStep('qr');
  };

  // 1. Vista de la Lista de Entradas
  if (step === 'list') {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="p-6 h-full bg-gray-900 text-white"
      >
        <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-400">
          COMPRA TUS ENTRADAS
        </h1>
        <p className="text-gray-400 mb-6 text-center">
          Selecciona la sección y reserva tu asiento para el próximo partido.
        </p>
        <div className="w-full max-w-lg mx-auto">
          {TICKET_OPTIONS.map((ticket) => (
            <TicketCard 
              key={ticket.section}
              {...ticket}
              onSelect={handleSelectTicket}
            />
          ))}
        </div>
      </motion.div>
    );
  }

  // 2. Vista de Detalles y Pago
  if (step === 'details' && selectedTicket) {
    return (
      <motion.div 
        initial={{ x: 300, opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }}
        className="p-6 h-full bg-gray-900 text-white flex flex-col items-center"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-green-400">
          Detalles de tu Reserva
        </h2>
        <div className="w-full max-w-sm p-5 bg-gray-800 rounded-lg shadow-xl mb-6">
          <p className="text-lg font-semibold mb-2">Sección: {selectedTicket.section}</p>
          {/* CLAVE: Moneda cambiada a Soles */}
          <p className="text-3xl font-extrabold text-red-500">Total: S/{selectedTicket.price}.00</p> 
          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-gray-400 mb-2">Método de Pago:</p>
            <select className="w-full p-2 rounded bg-gray-700 text-white">
              <option>Billetera Digital (Yape/Plin) - Recomendado</option>
              <option>Transferencia Bancaria</option>
            </select>
          </div>
        </div>

        <button 
          onClick={handleReserve}
          className="w-full max-w-sm py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition duration-150"
        >
          Confirmar Reserva y Generar QR
        </button>
        <button 
          onClick={() => setStep('list')}
          className="mt-4 text-gray-400 hover:text-white"
        >
          &larr; Volver
        </button>
      </motion.div>
    );
  }

  // 3. Vista del QR de Reserva (Simulación de Pago)
  if (step === 'qr' && reservationDetails) {
    return (
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }}
        className="p-6 h-full bg-gray-900 text-white flex flex-col items-center text-center"
      >
        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
        <h2 className="text-3xl font-extrabold text-green-400 mb-2">
          ¡RESERVA EXITOSA!
        </h2>
        <p className="text-gray-400 mb-6 max-w-sm">
          Tienes hasta la fecha límite para completar el pago y validar tu entrada.
        </p>

        {/* CÓDIGO QR SIMULADO */}
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-2xl mb-6 flex justify-center items-center">
          <div className="w-32 h-32 bg-gray-300 flex items-center justify-center border-4 border-gray-900">
            <span className="text-xs text-gray-900 font-mono break-all font-bold p-1">{reservationDetails.qrCode}</span>
          </div>
        </div>

        <div className="w-full max-w-sm text-left p-4 bg-gray-800 rounded-lg">
          <p className="flex items-center text-lg font-semibold mb-2">
             {/* CLAVE: Moneda cambiada a Soles */}
            <DollarSign className="w-5 h-5 mr-2 text-yellow-400" /> Total: S/{reservationDetails.totalPrice}.00
          </p>
          <p className="flex items-center text-sm text-gray-300 mb-2">
            Pagar a: {reservationDetails.paymentNumber}
          </p>
          <p className="flex items-center text-sm text-red-400">
            <Clock className="w-4 h-4 mr-2" /> Pagar antes de: {reservationDetails.deadline}
          </p>
          <p className="mt-3 text-xs text-gray-500">
            *Muestra este código al pagar y en la entrada del estadio.
          </p>
        </div>
        
        <button 
          onClick={() => setStep('list')}
          className="mt-6 py-3 px-8 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition duration-150"
        >
          Volver a Entradas
        </button>
      </motion.div>
    );
  }

  return null; 
}

export default Tickets;