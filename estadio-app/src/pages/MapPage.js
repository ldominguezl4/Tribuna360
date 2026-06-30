import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  ImageOverlay,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import estadioImg from "../assets/estadio_mapa.png";
import "leaflet/dist/leaflet.css";

const MapPage = () => {
  const navigate = useNavigate();

  const bounds = [
    [0, 0],
    [800, 1000],
  ];

  const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
    iconSize: [32, 32],
  });

  return (
    <div className="flex flex-col items-center justify-start w-full h-full bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-extrabold mb-4 text-yellow-400">
        Mapa Interactivo del Estadio
      </h1>

      <div className="w-full max-w-xl h-[60vh] rounded-xl overflow-hidden shadow-2xl border-2 border-yellow-500">
        <MapContainer
          crs={L.CRS.Simple}
          bounds={bounds}
          zoom={0}
          minZoom={-1}
          maxZoom={3}
          zoomControl={false}
          style={{ width: "100%", height: "100%" }}
        >
          <ImageOverlay url={estadioImg} bounds={bounds} />

          <ZoomControl position="bottomright" />

          <Marker position={[400, 500]} icon={customIcon}>
            <Popup>
              🎫 Entrada Principal Norte <br />
              Av. Pablo Olivas
            </Popup>
          </Marker>

          <Marker position={[700, 200]} icon={customIcon}>
            <Popup>
              🚑 Zona de Emergencias <br />
              Salida rápida y ambulancia
            </Popup>
          </Marker>

          <Marker position={[100, 800]} icon={customIcon}>
            <Popup>
              🍔 Zona de Restaurantes <br />
              Capitanes & Poniente
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <p className="text-gray-400 text-sm text-center mt-4">
        Haz zoom o mueve el mapa para explorar el estadio.
      </p>

      {/* BOTÓN PARA ABRIR UNITY */}
      <button
        onClick={() => navigate("/stadium3d")}
        className="mt-6 w-full max-w-sm bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-300"
      >
        🏟️ Explorar estadio en 3D
      </button>
    </div>
  );
};

export default MapPage;