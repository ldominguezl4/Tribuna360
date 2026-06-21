// src/firebase-config.js (VERSIÓN SIN STORAGE)

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";       
// Eliminada la importación de getStorage

const firebaseConfig = {
    // Tus claves reales aquí
    apiKey: "AIzaSyBA5bLAOGK0A2CVINCMONuU5P9BlU-5juzV", 
    authDomain: "apphinchaUCV.firebaseapp.com",
    projectId: "apphinchaUCV",
    storageBucket: "apphinchaUCV.appspot.com", // Lo dejamos, no hace daño
    messagingSenderId: "99807511363",
    appId: "1:99807511363:web:f1f325535648c775fe547e"
};

const app = initializeApp(firebaseConfig);

// Exportar solo Auth y Firestore
export const db = getFirestore(app);
// Eliminada la exportación de storage
export const auth = getAuth(app);