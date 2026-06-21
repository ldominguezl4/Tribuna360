// src/services/api.js
// Archivo de simulación (Mock) de llamadas a la API (AHORA INCLUYE GETPOSTS)

const MOCK_TICKETS = [
  { id: 1, section: 'VIP Central', seat: 'A1', price: 150, event: 'Final de Copa' },
  { id: 2, section: 'Norte Alta', seat: 'C15', price: 50, event: 'Partido de Liga' },
];

const MOCK_POSTS = [
    { id: 1, user: 'Hincha_10', content: '¡Vamos a ganar hoy!', likes: 45, comments: 5, image: 'https://via.placeholder.com/300x150?text=Gol' },
    { id: 2, user: 'Fanaticos_EC', content: 'Listo para la final. ¡El estadio a reventar!', likes: 120, comments: 15, image: 'https://via.placeholder.com/300x150?text=Estadio+Lleno' },
];

/**
 * Simula la obtención de publicaciones de usuarios.
 */
export const getPosts = async () => {
  console.log('Obteniendo posts (MOCK)...');
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_POSTS;
};

/**
 * Simula el envío de una alerta al servidor.
 * @param {object} alertData - Datos de la alerta a enviar.
 */
export const sendAlert = async (alertData) => {
  console.log('Alerta enviada (MOCK):', alertData);
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { success: true, message: "Alerta enviada con éxito. ¡Gracias!" };
};

/**
 * Simula la obtención de boletos.
 */
export const getTickets = async () => {
  console.log('Obteniendo tickets (MOCK)...');
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_TICKETS;
};

export default {
    getPosts, // <--- AÑADIDO
    sendAlert,
    getTickets
};