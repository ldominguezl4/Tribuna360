import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AlertsPanel = ({ alerts }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-start w-full h-full bg-gray-900 text-white p-4 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-lg font-bold text-red-400 mb-4">🚨 Alertas del Estadio</h2>

      {alerts.length === 0 ? (
        <p className="text-gray-400">No hay alertas en este momento.</p>
      ) : (
        alerts.map((alert, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="w-full bg-red-900/40 border border-red-500/40 rounded-xl p-3 mb-3 shadow-md"
          >
            <p className="font-semibold">{alert.message}</p>
            <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
          </motion.div>
        ))
      )}
    </motion.div>
  );
};

export default AlertsPanel;
