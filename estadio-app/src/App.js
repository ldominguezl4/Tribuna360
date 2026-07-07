// src/App.js

import ScrollToTop from "./components/ScrollToTop";

import React, { useEffect, useState } from "react";
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

  const [alerts, setAlerts] = useState([]);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    initializePoints();

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
    <Router basename="/Tribuna360">
      <ScrollToTop />

      {/* Fondo */}
      <div className="min-h-screen bg-black flex justify-center items-center p-5">

        {/* Simulación de iPhone */}
        <div
          className="
            relative
            w-[390px]
            h-[844px]
            bg-[#0B1020]
            rounded-[32px]
            shadow-2xl
            border-2
            border-gray-700
            overflow-hidden
          "
        >

          <Header onOpenRanking={() => setIsRankingOpen(true)} />

          <main className="flex-1 overflow-y-auto pb-24 h-full">

            <Routes>

              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={route.element}
                />
              ))}

              <Route
                path="/alert"
                element={
                  <Alerts
                    alerts={alerts}
                    onRead={() => setUnread(0)}
                  />
                }
              />

              <Route
                path="/"
                element={<Home unread={unread} />}
              />

            </Routes>

          </main>

          {isRankingOpen && (
            <RankingModal
              onClose={() => setIsRankingOpen(false)}
            />
          )}

          <BottomNav
            unreadAlerts={unread}
            onOpenAlerts={() => setUnread(0)}
          />

        </div>

      </div>

    </Router>
  );
}

export default App;