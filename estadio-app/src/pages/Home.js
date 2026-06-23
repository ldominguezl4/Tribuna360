// src/pages/Home.js

import React from "react";
import { useNavigate } from "react-router-dom";
import { Ticket, MapPin, Bell, MessageSquare } from "lucide-react";
import ActionButton from "../components/ActionButton";
import estadioImage from "../assets/estadio_principal.jpg";

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
    <div className="flex flex-col items-center p-4 pt-6 bg-gray-900 text-white min-h-full">
      
      <div className="w-full max-w-sm rounded-lg overflow-hidden shadow-2xl mb-6">
        <img
          src={estadioImage}
          alt="Vista principal del estadio"
          className="w-full h-48 object-cover opacity-80"
        />
      </div>

      <h1 className="text-3xl font-extrabold text-blue-400 mb-6 text-center">
        ¡VAMOS POR LA GLORIA!
      </h1>

      <button className="bg-accent text-white px-8 py-4 rounded-xl shadow-lg w-full max-w-sm mb-8 font-semibold">
        Próximo partido
      </button>

      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
        {buttons.map((btn) => (
          <ActionButton key={btn.label} {...btn} />
        ))}
      </div>

    </div>
  );
}

export default Home;