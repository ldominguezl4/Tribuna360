// src/components/ActionButton.js

import React from "react";
import { motion } from "framer-motion";

function ActionButton({ icon: Icon, label, onClick, pulse = false }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{
        scale: 1.05,
        y: -3,
      }}
      whileTap={{ scale: 0.95 }}
      className="
        flex flex-col
        items-center
        justify-center
        p-6
        rounded-2xl
        bg-[#182235]
        border border-[#2A3B5A]
        shadow-lg
        hover:bg-[#22314D]
        hover:shadow-2xl
        transition-all
        duration-300
      "
    >
      {pulse ? (
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Icon className="w-9 h-9 text-red-500 mb-3" />
        </motion.div>
      ) : (
        <Icon className="w-9 h-9 text-blue-400 mb-3" />
      )}

      <span className="text-white font-semibold text-base">
        {label}
      </span>
    </motion.button>
  );
}

export default ActionButton;