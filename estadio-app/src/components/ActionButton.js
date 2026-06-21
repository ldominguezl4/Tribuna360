// src/components/ActionButton.js

import React from 'react';
import { motion } from 'framer-motion';

// CLAVE: Se desestructura 'icon' como 'Icon' con mayúscula para usarlo como componente.
function ActionButton({ icon: Icon, label, onClick, pulse = false }) { 
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      // Estilos estéticos del botón (fondo blanco/oscuro, sombra)
      className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform"
    >
      {/* Lógica para la animación 'pulse' en el botón de Alertas */}
      {pulse ? (
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Icon className="w-8 h-8 text-red-600 dark:text-red-400 mb-2" />
        </motion.div>
      ) : (
        <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
      )}
      <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{label}</span>
    </motion.button>
  );
}

export default ActionButton;