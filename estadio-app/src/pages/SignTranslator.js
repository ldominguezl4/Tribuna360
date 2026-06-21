import React, { useEffect, useRef, useState } from "react";
import { Hands } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";

const GESTURES = [
  { id: "thumbup", label: "🚨 NECESITO AYUDA", emoji: "👍" },
  { id: "peace",   label: "✌️ PAZ / DOS",      emoji: "✌️" },
  { id: "ok",      label: "👌 OKAY",            emoji: "👌" },
  { id: "point",   label: "☝️ UNO / SEÑALAR",   emoji: "☝️" },
  { id: "fist",    label: "✊ PUÑO / STOP",     emoji: "✊" },
  { id: "open",    label: "✋ HOLA / PARA",     emoji: "✋" },
  { id: "rock",    label: "🤘 ROCK",            emoji: "🤘" },
  { id: "call",    label: "🤙 LLAMAR",          emoji: "🤙" },
];

function dist(a, b) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2);
}

function isExtended(lm, tip, pip) {
  return dist(lm[tip], lm[0]) > dist(lm[pip], lm[0]) * 1.05;
}

function isThumbExtended(lm) {
  return dist(lm[4], lm[0]) > dist(lm[3], lm[0]) * 1.1;
}

function detectGesture(lm) {
  const thumb  = isThumbExtended(lm);
  const index  = isExtended(lm, 8, 6);
  const middle = isExtended(lm, 12, 10);
  const ring   = isExtended(lm, 16, 14);
  const pinky  = isExtended(lm, 20, 18);
  const thumbUp = lm[4].y < lm[2].y - 0.04;
  const handSize = dist(lm[0], lm[9]);
  const isOK   = dist(lm[4], lm[8]) < handSize * 0.35 && middle && ring && pinky;
  const isCall = thumb && !index && !middle && !ring && pinky;
  const isRock = index && !middle && !ring && pinky && thumb;

  if (isOK)   return "ok";
  if (isCall) return "call";
  if (isRock) return "rock";
  if (!thumb && !index && !middle && !ring && !pinky) return "fist";
  if (thumb && index && middle && ring && pinky)      return "open";
  if (thumbUp && !index && !middle && !ring && !pinky) return "thumbup";
  if (!thumb && index && !middle && !ring && !pinky)  return "point";
  if (!thumb && index && middle && !ring && !pinky)   return "peace";
  return null;
}

const CONNECTIONS = [
  [0,1],[1,2],[2,3],[3,4],
  [0,5],[5,6],[6,7],[7,8],
  [5,9],[9,10],[10,11],[11,12],
  [9,13],[13,14],[14,15],[15,16],
  [13,17],[0,17],[17,18],[18,19],[19,20],
];

function drawLandmarks(ctx, lm, W, H) {
  ctx.clearRect(0, 0, W, H);
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#33ccff";
  for (const [a, b] of CONNECTIONS) {
    ctx.beginPath();
    ctx.moveTo(lm[a].x * W, lm[a].y * H);
    ctx.lineTo(lm[b].x * W, lm[b].y * H);
    ctx.stroke();
  }
  for (let i = 0; i < lm.length; i++) {
    const p = lm[i];
    const r = i === 0 ? 8 : i % 4 === 0 ? 7 : 5;
    ctx.beginPath();
    ctx.arc(p.x * W, p.y * H, r, 0, 2 * Math.PI);
    ctx.fillStyle = i % 4 === 0 ? "#ff4444" : "#ffcc00";
    ctx.fill();
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

function SignTranslator() {
  const videoRef  = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [handDetected, setHandDetected] = useState(false);
  const [gestureId, setGestureId]       = useState(null);
  const [videoDims, setVideoDims]        = useState({ w: 1, h: 1 });

  // Calcula dimensiones reales del contenedor para eliminar barras negras
  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const cw = containerRef.current.clientWidth;
        // Mantener aspect ratio 4:3 de la cámara
        const ch = Math.round(cw * (480 / 640));
        setVideoDims({ w: cw, h: ch });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    let isMounted = true;

    const hands = new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });
    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.6,
      minTrackingConfidence: 0.6,
    });
hands.onResults((results) => {
    if (!isMounted) return;

  if (!canvasRef.current || !ctx) return;

  const currentCanvas = canvasRef.current;

  ctx.clearRect(
    0,
    0,
    currentCanvas.width,
    currentCanvas.height
  );

  if (results.multiHandLandmarks?.length > 0) {

    const lm = results.multiHandLandmarks[0];

    drawLandmarks(
      ctx,
      lm,
      currentCanvas.width,
      currentCanvas.height
    );

    setHandDetected(true);
    setGestureId(detectGesture(lm));

  } else {

    setHandDetected(false);
    setGestureId(null);

  }
});
   const camera = new Camera(videoRef.current, {
  onFrame: async () => {

    if (!isMounted) return;
    if (!videoRef.current) return;

    await hands.send({
      image: videoRef.current
    });

  },
  width: 640,
  height: 480,
});
    camera.start();

   return () => {

  isMounted = false;

  try {
    camera.stop();
  } catch (e) {}

  try {
    hands.close();
  } catch (e) {}
};
  }, []);

  const detectedGesture = GESTURES.find((g) => g.id === gestureId);

  return (
    <div className="bg-gray-900 text-white flex flex-col" style={{ height: "100dvh", overflow: "hidden" }}>

      {/* ── Título compacto ── */}
      <div className="text-center py-2 flex-shrink-0">
        <h1 className="text-xl font-bold text-yellow-400">🤟 Traductor de Señas</h1>
      </div>

      {/* ── Video sin barras negras ── */}
      <div
        ref={containerRef}
        className="relative flex-shrink-0 border-4 border-yellow-400 rounded-xl overflow-hidden mx-3"
        style={{ width: "calc(100% - 1.5rem)" }}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            aspectRatio: "4/3",
            objectFit: "cover",   // ← elimina las barras negras
            transform: "scaleX(-1)",
          }}
        />
        <canvas
          ref={canvasRef}
          width={640}
          height={480}
          style={{
            position: "absolute",
            top: 0, left: 0,
            width: "100%",
            height: "100%",
            transform: "scaleX(-1)",
          }}
        />

        {/* ── Estado superpuesto sobre el video (esquina superior) ── */}
        <div
          className="absolute top-2 left-2 px-2 py-1 rounded-lg text-xs font-bold"
          style={{ background: "rgba(0,0,0,0.6)" }}
        >
          {handDetected
            ? <span className="text-green-400">✋ Mano detectada</span>
            : <span className="text-red-400">❌ Sin mano</span>}
        </div>
      </div>

      {/* ── Resultado traducción ── */}
      <div className="flex-shrink-0 mx-3 mt-2">
        {detectedGesture ? (
          <div className="bg-red-600 rounded-xl px-4 py-3 text-center">
            <div className="text-xs text-red-200 mb-1 uppercase tracking-wide">Gesto detectado</div>
            <div className="text-2xl font-bold">{detectedGesture.label}</div>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-xl px-4 py-3 text-center">
            <div className="text-xs text-gray-400 mb-1 uppercase tracking-wide">Gesto detectado</div>
            <div className="text-gray-500 text-lg">Muestra tu mano...</div>
          </div>
        )}
      </div>

{/* ── Señas soportadas ── */}
<div className="mx-3 mt-2 mb-2 flex-shrink-0">
  <div className="bg-gray-800 rounded-xl px-3 py-2">

    <div className="text-center text-[10px] text-gray-400 uppercase mb-2">
      Señas soportadas
    </div>

    <div className="flex justify-center flex-wrap gap-2">
      {GESTURES.map((g) => (
        <div
          key={g.id}
          className={`
            w-10 h-10 rounded-full flex items-center justify-center
            text-xl transition-all duration-300
            ${
              gestureId === g.id
                ? "bg-yellow-400 text-gray-900 scale-125 shadow-lg"
                : "bg-gray-700 text-white"
            }
          `}
        >
          {g.emoji}
        </div>
      ))}
    </div>

  </div>
</div>

    </div>
  );
}

export default SignTranslator;