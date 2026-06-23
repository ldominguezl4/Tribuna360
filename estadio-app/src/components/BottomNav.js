import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  MapPin,
  MessageSquare,
  User,
  Hand
} from "lucide-react";

function BottomNav() {
  const location = useLocation();

  const navItems = [
    {
      path: "/",
      icon: Home,
      label: "Inicio",
    },
    {
      path: "/map",
      icon: MapPin,
      label: "Mapa",
    },
    {
      path: "/translator",
      icon: Hand,
      label: "Señas IA",
    },
    {
      path: "/multimedia",
      icon: MessageSquare,
      label: "Mensajes",
    },
    {
      path: "/profile",
      icon: User,
      label: "Perfil",
    },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 shadow-2xl z-50">
      <nav className="flex h-16 bg-gray-800 border-t border-gray-700 rounded-t-lg overflow-hidden">

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              aria-label={item.label}
              className={`flex-1 flex flex-col items-center justify-center transition-colors ${
                isActive
                  ? "text-yellow-400"
                  : "text-gray-400 hover:text-yellow-200"
              }`}
            >
              <Icon size={20} />

              <span className="text-[10px] mt-1 text-center leading-none">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default BottomNav;