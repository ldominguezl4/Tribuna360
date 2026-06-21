// src/App.js
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import Header from "./components/Header";
import RankingModal from "./components/RankingModal";
import BottomNav from "./components/BottomNav";
import Home from "./pages/Home";
import Alerts from "./pages/Alert";
import { initializePoints } from "./services/pointsService";

function App() {
  const [isRankingOpen, setIsRankingOpen] = useState(false);

  // 🔹 Sistema de alertas
  const [alerts, setAlerts] = useState([]);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    initializePoints();

    // Permite enviar alertas desde la consola:
    window.sendAlert = (msg) => {
      const newAlert = {
        message: msg,
        time: new Date().toLocaleTimeString(),
      };
      setAlerts((prev) => [newAlert, ...prev]);
      setUnread((prev) => prev + 1);
      console.log(`✅ Alerta enviada: "${msg}"`);
    };
  }, []);

  return (
    <Router>
      <div className="flex justify-center bg-black min-h-screen w-full overflow-hidden font-sans">
        <div className="relative flex flex-col bg-gray-900 w-full max-w-[490px] h-screen shadow-2xl overflow-hidden rounded-3xl">
          {/* 🔹 Encabezado con botón de Ranking */}
          <Header onOpenRanking={() => setIsRankingOpen(true)} />

          {/* 🔹 Contenido principal */}
          <main className="flex-grow overflow-y-auto pb-20">
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}

              {/* Página de Alertas con función para limpiar notificaciones */}
              <Route
                path="/alert"
                element={<Alerts alerts={alerts} onRead={() => setUnread(0)} />}
              />

              {/* Home con contador de notificaciones */}
              <Route path="/" element={<Home unread={unread} />} />
            </Routes>
          </main>

          {/* 🔹 Modal de Ranking */}
          {isRankingOpen && (
            <RankingModal onClose={() => setIsRankingOpen(false)} />
          )}

          {/* 🔹 Barra inferior (sin tocar) */}
          <BottomNav unreadAlerts={unread} onOpenAlerts={() => setUnread(0)} />
        </div>
      </div>
    </Router>
  );
}

export default App;
