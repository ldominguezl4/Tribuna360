// src/components/TicketCard.js
import React from 'react';
import { motion } from 'framer-motion';

function TicketCard({ section, price, color, onSelect }) {
  return (
    <motion.div
      onClick={() => onSelect({ section, price })}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`p-5 mb-4 rounded-lg shadow-xl cursor-pointer transition-all duration-300 transform border-b-4 ${color}`}
    >
      <h3 className="text-xl font-bold text-gray-900">{section}</h3>
      <p className="text-sm text-gray-700 mt-1">Acceso a la mejor vista y ambiente.</p>
      <div className="mt-3 text-right">
        {/* CLAVE: Símbolo de Soles (S/) */}
        <span className="text-2xl font-extrabold text-red-600">S/{price}.00</span> 
        <span className="text-xs text-gray-600 ml-1">/ UNIDAD</span>
      </div>
      <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition duration-150">
        Comprar Ahora
      </button>
    </motion.div>
  );
}

export default TicketCard;