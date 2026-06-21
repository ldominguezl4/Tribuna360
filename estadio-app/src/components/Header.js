import React from "react";
import { Link } from "react-router-dom";
import { Trophy } from "lucide-react"; // Icono de Copa/Trofeo

// 🔹 Ahora recibe la función onOpenRanking desde App.js
const Header = ({ onOpenRanking }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white shadow-lg sticky top-0 z-20 border-b border-gray-700">
      {/* Logo / Título */}
      <Link
        to="/"
        className="text-xl font-extrabold text-yellow-500 tracking-wider"
      >
        Tribuna360
      </Link>

      {/* BOTÓN DE RANKING (Copa) */}
      <button
        onClick={onOpenRanking} // 👈 Ahora abre el modal, no redirige
        className="p-2 bg-yellow-500 rounded-full shadow-lg hover:bg-yellow-400 transition-all duration-200 transform hover:scale-110"
        aria-label="Ver Ranking de Hincha"
      >
        <Trophy size={24} className="text-gray-900" />
      </button>
    </header>
  );
};

export default Header;
