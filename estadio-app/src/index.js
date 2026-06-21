// src/index.js (Versión Simplificada y Corregida)
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Esto importa los estilos CSS
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Hemos eliminado la importación y la llamada a reportWebVitals()
// para corregir el error: Can't resolve './reportWebVitals'