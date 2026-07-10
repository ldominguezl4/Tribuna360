import React from "react";
import { motion, AnimatePresence } from "framer-motion";

function TribiModal({
  visible,
  gesture,
  currentStatus,  // "waiting" | "confirmed" | "cancelled"
  customMessage,
  customEmoji
}) {
  if (!gesture) return null;

  const actions = {
    thumbup: {
      emoji: "👍",
      title: "Entradas",
      message: "Puedo abrir el módulo de Entradas para ti.",
    },
    point: {
      emoji: "☝️",
      title: "Mapa",
      message: "Puedo abrir el mapa del estadio.",
    },
    open: {
      emoji: "✋",
      title: "Inicio",
      message: "Puedo regresar al menú principal.",
    },
    call: {
      emoji: "🤙",
      title: "Alertas",
      message: "Puedo abrir el módulo de Alertas para contactar al personal de seguridad.",
    },
    peace: {
      emoji: "✌️",
      title: "Mensajes",
      message: "Puedo abrir el chat para comunicarte con otros hinchas.",
    }
  };

  const info = actions[gesture] || { emoji: "🤖", title: "Acción", message: "" };

  // Definición dinámica del contenido según el estado de la máquina
  let displayEmoji = customEmoji || info.emoji;
  let displayTitle = "Asistente Tribi";
  let displayMessage = customMessage || `¿Deseas ir a ${info.title}?`;

  if (currentStatus === "waiting") {
    displayTitle = `Seña detectada: ${info.title}`;
  } else if (currentStatus === "confirmed") {
    displayTitle = "¡Acción Confirmada!";
  } else if (currentStatus === "cancelled") {
    displayTitle = "Operación Cancelada";
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ y: 400 }}
            animate={{ y: 0 }}
            exit={{ y: 400 }}
            transition={{
              type: "spring",
              damping: 22,
              stiffness: 190,
            }}
            className="w-full max-w-md bg-[#182235] rounded-t-3xl p-6 shadow-2xl border-t-2 border-blue-500 pb-8 flex flex-col items-center"
          >
            {/* Contenedor del Avatar de Tribi */}
            <div className="relative mb-3">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-700 to-blue-500 flex items-center justify-center text-4xl shadow-xl z-10 relative">
                🤖
              </div>
              {currentStatus === "waiting" && (
                <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-20" />
              )}
            </div>

            <h2 className="text-center text-2xl font-black text-white tracking-wide">
              {displayTitle}
            </h2>

            <p className="text-center text-blue-300 text-sm mt-1 font-medium">
              Asistente de Navegación IA
            </p>

            <div className="mt-6 text-center w-full">
              <motion.div 
                key={displayEmoji}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-6xl mb-3"
              >
                {displayEmoji}
              </motion.div>

              <p className="text-gray-200 text-base px-4 font-normal min-h-[48px]">
                {displayMessage}
              </p>
            </div>

            {/* Panel de instrucciones en tiempo real por gestos */}
            {currentStatus === "waiting" && (
              <div className="w-full bg-slate-800/80 border border-slate-700 rounded-2xl p-4 mt-6 text-center shadow-inner">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Responde con una seña:
                </p>
                <div className="flex justify-around items-center text-sm font-semibold">
                  <div className="flex flex-col items-center gap-1 text-green-400">
                    <span className="text-2xl">👍</span>
                    <span>Confirmar</span>
                  </div>
                  <div className="h-8 w-px bg-slate-700" />
                  <div className="flex flex-col items-center gap-1 text-red-400">
                    <span className="text-2xl">✋</span>
                    <span>Cancelar</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TribiModal;