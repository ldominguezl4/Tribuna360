// src/components/RankingModal.js
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { X, Clock, Medal } from "lucide-react";
import { getPoints, getBadges } from "../services/pointsService";

const generateMockUsers = (currentName = "Eric Davis (tú)") => {
  const base = [
    "Hincha Supremo", "UCVPower", "FuerzaPoeta", "La12Poeta", "BarreraNorte", "SombraAzul",
    "TribunaRuge", "LaOla", "GolazoFan", "BarrioRojo", "Capitanes", "AficionReal",
    "OleOle", "Hincha24", "VozDelSur", "PasiónPoeta", "UltraPoeta", "LaHinchada",
    "TribunaViva", "EternoPoeta", "PuertaDiez", "AlientoTotal", "VientoNorte", "MarDeGente"
  ];

  const users = base.slice(0, 24).map((n, i) => ({
    name: n,
    points: Math.max(1000, 14000 - i * 350),
  }));

  // Insertar al usuario con un puntaje medio
  const userIndex = 7;
  users.splice(userIndex, 0, {
    name: currentName,
    points: 9200,
    isUser: true,
  });

  // Ordenar por puntos de mayor a menor
  users.sort((a, b) => b.points - a.points);

  // Reindexar posiciones
  return users.map((u, i) => ({ ...u, position: i + 1 }));
};

const TopCard = ({ user }) => {
  const isFirst = user.position === 1;
  const isSecond = user.position === 2;
  const isThird = user.position === 3;

  const glowVariants = {
    idle: { boxShadow: "0 6px 18px rgba(0,0,0,0.3)" },
    glow: isFirst
      ? { boxShadow: "0 10px 40px rgba(255,213,79,0.45)" }
      : isSecond
      ? { boxShadow: "0 10px 40px rgba(192,192,192,0.35)" }
      : { boxShadow: "0 10px 40px rgba(205,127,50,0.32)" },
  };

  const bg = isFirst
    ? "bg-gradient-to-r from-yellow-400 to-yellow-300 text-gray-900"
    : isSecond
    ? "bg-gradient-to-r from-slate-300 to-slate-100 text-gray-900"
    : "bg-gradient-to-r from-amber-700 to-amber-500 text-white";

  return (
    <motion.div
      initial="idle"
      animate="glow"
      variants={glowVariants}
      transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse" }}
      className={`flex items-center justify-between p-3 rounded-xl mb-2 ${bg}`}
      style={{
        border: isFirst
          ? "2px solid rgba(255,215,79,0.9)"
          : isSecond
          ? "2px solid rgba(192,192,192,0.8)"
          : "2px solid rgba(205,127,50,0.85)",
      }}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold">
          <Medal size={18} />
        </div>
        <div>
          <div className="text-sm font-semibold">{user.name}</div>
          <div className="text-xs text-gray-700">En el podio</div>
        </div>
      </div>
      <div className="text-right font-extrabold">{user.points.toLocaleString()} XP</div>
    </motion.div>
  );
};

const PrizeCard = ({ rank, title, description, borderColor }) => {
  const glow = {
    initial: { boxShadow: "0 0 0 rgba(0,0,0,0)" },
    pulse: { boxShadow: `${borderColor} 0px 0px 25px` },
  };

  return (
    <motion.div
      initial="initial"
      animate="pulse"
      variants={glow}
      transition={{
        duration: 1.8,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      className="rounded-2xl p-5 text-center shadow-lg"
      style={{
        border: `3px solid ${borderColor}`,
        background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.2))",
      }}
    >
      <div className="text-sm font-semibold text-gray-300 mb-1">#{rank}</div>

      {/* Título más grande e imponente */}
      <div
        className={`text-2xl font-extrabold mb-1 tracking-wide ${
          rank === 1
            ? "text-yellow-300"
            : rank === 2
            ? "text-gray-200"
            : "text-amber-500"
        }`}
        style={{
          fontFamily: "'Bebas Neue', 'Oswald', sans-serif",
          letterSpacing: "0.5px",
        }}
      >
        {title}
      </div>

      <div className="text-sm text-gray-400 mb-3 font-medium italic">
        {description}
      </div>

      {/* Imagen más grande y destacada */}
      <div className="h-32 w-full bg-white/5 rounded-lg flex items-center justify-center">
        <img
          src={`/assets/${
            rank === 1 ? "camiseta.png" : rank === 2 ? "pelota.png" : "gorra.png"
          }`}
          alt={`Premio ${rank}`}
          className="h-36 object-contain drop-shadow-[0_6px_20px_rgba(255,255,255,0.25)]"
        />
      </div>
    </motion.div>
  );
};

const PremiosModal = ({ onClose }) => (
  <motion.div
    className="fixed inset-0 z-60 flex items-center justify-center bg-black/60"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <motion.div
      className="bg-gray-900 rounded-2xl w-[90%] max-w-md p-5 flex flex-col"
      initial={{ y: 30 }}
      animate={{ y: 0 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-yellow-400">🏆 Premios del Torneo</h3>
        <button
          onClick={onClose}
          className="text-gray-300 px-2 py-1 rounded hover:bg-gray-800"
        >
          <X size={18} />
        </button>
      </div>

      {/* Contenido scrollable */}
      <div className="grid grid-cols-1 gap-4 overflow-y-auto pr-2" style={{ maxHeight: "60vh" }}>
        <PrizeCard
          rank={1}
          title="Camiseta Oficial"
          description="Camiseta autografiada - Primer puesto"
          borderColor="rgba(255,215,79,0.95)"
        />
        <PrizeCard
          rank={2}
          title="Pelota Personalizada"
          description="Pelota oficial - Segundo puesto"
          borderColor="rgba(192,192,192,0.95)"
        />
        <PrizeCard
          rank={3}
          title="Gorra Oficial"
          description="Gorra exclusiva - Tercer puesto"
          borderColor="rgba(205,127,50,0.95)"
        />
      </div>

      {/* Botón de cierre visible */}
      <div className="mt-5 flex justify-center">
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.05 }}
          className="px-6 py-2 rounded-lg font-bold bg-yellow-500 text-black shadow-md hover:bg-yellow-400"
        >
          Cerrar
        </motion.button>
      </div>
    </motion.div>
  </motion.div>
);


const MisionesModal = ({ onClose }) => {
  const missions = [
    { title: "Comprar boleto VIP", pts: 500 },
    { title: "Comprar entrada - Tribuna General", pts: 300 },
    { title: "Comprar producto en tienda oficial", pts: 150 },
    { title: "Publicar en Comunidad (mensajes)", pts: 50 },
    { title: "Visitar punto en el Mapa", pts: 120 },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/60"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div className="bg-gray-900 rounded-2xl w-[90%] max-w-md p-5" initial={{ y: 30 }} animate={{ y: 0 }}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-blue-400">Cómo ganar puntos</h3>
          <button onClick={onClose} className="text-gray-300 px-2 py-1 rounded hover:bg-gray-800">
            <X size={18} />
          </button>
        </div>
        <ul className="space-y-3">
          {missions.map((m, i) => (
            <li key={i} className="flex items-center justify-between bg-gray-800 p-3 rounded">
              <div>
                <div className="text-sm font-semibold text-blue-300">{m.title}</div>
                <div className="text-xs text-gray-400">Realiza esta acción para ganar XP</div>
              </div>
              <div className="text-yellow-400 font-bold">+{m.pts} XP</div>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

const RankingModal = ({ onClose }) => {
  const points = getPoints ? getPoints() : 0;
  const mock = useMemo(() => generateMockUsers(), []);
  const [showPremios, setShowPremios] = useState(false);
  const [showMisiones, setShowMisiones] = useState(false);

  return (
    <motion.div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <motion.div className="relative bg-gradient-to-b from-gray-900 to-gray-800 w-full max-w-[420px] h-[90vh] rounded-2xl overflow-hidden border border-yellow-400/20 shadow-2xl" initial={{ scale: 0.96, y: 30 }} animate={{ scale: 1, y: 0 }}>
        {/* Header */}
        <div className="px-5 pt-6 pb-3 border-b border-yellow-400/10 text-center">
          <div className="flex items-center justify-center gap-2">
            <Clock size={18} className="text-red-400" />
            <h2 className="text-yellow-400 font-extrabold text-lg">TORNEO SEMANAL UCV</h2>
          </div>
          <p className="text-sm text-gray-300 mt-1">Fin de la jornada: 4D 15H 32M</p>
          <p className="text-xs text-gray-400 mt-1">El Top 10 asciende y participa en el sorteo de la camiseta.</p>
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-300 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Ranking */}
        <div className="px-4 py-3 h-[56%] overflow-y-auto">
          {mock.map((u) => {
            if (u.position <= 3) return <TopCard key={u.position} user={u} />;

            return (
              <motion.div
                key={u.position}
                whileHover={{ scale: 1.01 }}
                className="flex items-center justify-between p-3 rounded-xl mb-2 bg-gray-800 border border-gray-700"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 text-gray-400">{u.position}</span>
                  <div>
                    <div className="text-sm font-semibold text-blue-300">{u.name}</div>
                    <div className="text-xs text-gray-500">{u.isUser ? "Tú" : "Hincha"}</div>
                  </div>
                </div>
                <div className="font-semibold text-yellow-400">{u.points.toLocaleString()} XP</div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-yellow-400/10 bg-gradient-to-t from-black/20">
          <div className="mb-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-400">Tu Liga Actual</div>
                <div className="text-sm font-bold text-yellow-400">BRONCE 🥉</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold">{points.toLocaleString()} XP</div>
                <div className="text-xs text-gray-400">Total de Puntos</div>
              </div>
            </div>
            <div className="w-full bg-gray-700 h-2 rounded-full mt-3">
              <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${Math.min(100, (points / 3500) * 100)}%` }}></div>
            </div>
            <div className="text-xs text-gray-400 mt-1">Necesitas 3,500 XP para ascender a la Liga de Plata</div>
          </div>

          <div className="flex gap-3">
            <motion.button onClick={() => setShowPremios(true)} whileHover={{ scale: 1.03 }} className="flex-1 py-2 rounded-lg text-black font-bold" style={{ background: "linear-gradient(90deg,#FFD54A,#FFC107)" }}>
              <motion.span animate={{ scale: [1, 1.03, 1] }} transition={{ repeat: Infinity, duration: 1.2 }}>
                Ver Premios
              </motion.span>
            </motion.button>
            <motion.button onClick={() => setShowMisiones(true)} whileHover={{ scale: 1.03 }} className="flex-1 py-2 rounded-lg text-white font-bold bg-blue-600">
              <motion.span animate={{ scale: [1, 1.03, 1] }} transition={{ repeat: Infinity, duration: 1.2 }}>
                Cómo ganar puntos
              </motion.span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {showPremios && <PremiosModal onClose={() => setShowPremios(false)} />}
      {showMisiones && <MisionesModal onClose={() => setShowMisiones(false)} />}
    </motion.div>
  );
};

export default RankingModal;
