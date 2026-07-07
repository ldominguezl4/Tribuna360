import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Ticket,
  MapPin,
  Bell,
  MessageSquare,
} from "lucide-react";

import ActionButton from "../components/ActionButton";
import logo from "../assets/logo-header.jpeg";

function Home() {

  const navigate = useNavigate();

  const buttons = [
    {
      icon: Ticket,
      label: "Entradas",
      onClick: () => navigate("/tickets"),
    },
    {
      icon: MapPin,
      label: "Mapa",
      onClick: () => navigate("/map"),
    },
    {
      icon: Bell,
      label: "Alertas",
      onClick: () => navigate("/alert"),
      pulse: true,
    },
    {
      icon: MessageSquare,
      label: "Mensajes",
      onClick: () => navigate("/multimedia"),
    },
  ];

  return (

    <div className="flex flex-col items-center p-6 bg-gradient-to-b from-[#0B1020] to-[#111827] text-white min-h-full">

      {/* Logo */}

      <img
        src={logo}
        alt="Tribuna360"
        className="w-72 mb-8 object-contain"
      />

      {/* Título */}

      <h1 className="text-4xl font-extrabold text-center text-white leading-tight mb-3">

        Tu experiencia,
        <br />

        <span className="text-blue-400">
          todos los ángulos.
        </span>

      </h1>


      {/* Próximo partido */}

      <button className="w-full max-w-sm bg-gradient-to-r from-red-600 to-blue-600 rounded-2xl py-4 font-bold shadow-xl hover:scale-105 transition mb-10">

        Próximo partido

      </button>

      {/* Botones */}

      <div className="grid grid-cols-2 gap-5 w-full max-w-sm">

        {buttons.map((btn) => (

          <ActionButton
            key={btn.label}
            {...btn}
          />

        ))}

      </div>

    </div>

  );

}

export default Home;