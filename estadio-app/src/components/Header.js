import React from "react";
import { Trophy } from "lucide-react";
import { useLocation } from "react-router-dom";

const Header = ({ onOpenRanking }) => {
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return "👋 ¡Bienvenido!";

      case "/tickets":
        return "🎟️ Entradas";

      case "/map":
        return "🗺️ Mapa";

      case "/stadium3d":
        return "🏟️ Vista 360";

      case "/alert":
        return "🚨 Alertas";

      case "/multimedia":
        return "💬 Mensajes";

      case "/profile":
        return "👤 Mi Perfil";

      case "/translator":
        return "🤟 Traductor de Señas";

      default:
        return "Tribuna360";
    }
  };

  return (
    <header className="flex justify-between items-center px-5 py-4 bg-[#111827] border-b border-[#26364F] shadow-lg sticky top-0 z-20">

      <h1 className="text-xl font-bold text-white">
        {getTitle()}
      </h1>

      <button
        onClick={onOpenRanking}
        className="p-3 bg-yellow-500 rounded-full shadow-lg hover:bg-yellow-400 transition-all duration-200 hover:scale-110"
        aria-label="Ver Ranking de Hincha"
      >
        <Trophy size={24} className="text-black" />
      </button>

    </header>
  );
};

export default Header;