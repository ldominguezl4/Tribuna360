// src/services/pointsService.js

const POINTS_KEY = 'hinchaPoints';
const BADGES_KEY = 'hinchaBadges';

// Definición de las reglas para otorgar insignias
const BADGE_THRESHOLDS = [
  { name: "Hincha Novato", minPoints: 10, description: "Primeros 10 puntos ganados." },
  { name: "Explorador del Estadio", minPoints: 50, description: "Ha explorado varias secciones." },
  { name: "Comunitario Activo", minPoints: 100, description: "Ha publicado en la comunidad." },
  { name: "Leyenda UCV", minPoints: 200, description: "Demuestra ser un hincha top." },
  // ¡Puedes agregar más reglas después!
];


// Obtiene el puntaje actual del localStorage
export const getPoints = () => {
  const points = localStorage.getItem(POINTS_KEY);
  return points ? parseInt(points, 10) : 0;
};


// Obtiene la lista de insignias otorgadas
export const getBadges = () => {
  const badges = localStorage.getItem(BADGES_KEY);
  return badges ? JSON.parse(badges) : [];
};


// Verifica si se debe otorgar una nueva insignia basado en el puntaje
const checkAndAwardBadges = (currentPoints) => {
  const awardedBadges = getBadges();
  let updatedBadges = [...awardedBadges];
  let newBadgeAwarded = false;

  BADGE_THRESHOLDS.forEach(badge => {
    // Si ya tiene la insignia O no alcanza el umbral, se salta.
    if (awardedBadges.includes(badge.name) || currentPoints < badge.minPoints) {
      return;
    }
    
    // Otorga la nueva insignia
    updatedBadges.push(badge.name);
    newBadgeAwarded = true;
    console.log(`[GAMIFICACION] ¡NUEVA INSIGNIA! ${badge.name}`);
  });

  if (newBadgeAwarded) {
    localStorage.setItem(BADGES_KEY, JSON.stringify(updatedBadges));
  }
};


// Función principal para agregar puntos y verificar insignias
export const addPoints = (amount, action) => {
  const currentPoints = getPoints();
  const newPoints = currentPoints + amount;
  localStorage.setItem(POINTS_KEY, newPoints.toString());
  console.log(`[GAMIFICACION] Puntos agregados: +${amount} por ${action}. Total: ${newPoints}`);
  
  // Después de sumar puntos, revisamos si gana insignias
  checkAndAwardBadges(newPoints); 

  return newPoints;
};


// Inicializa los puntos en 0 y las insignias como array vacío si es la primera vez
export const initializePoints = () => {
    if (localStorage.getItem(POINTS_KEY) === null) {
        localStorage.setItem(POINTS_KEY, '0');
        localStorage.setItem(BADGES_KEY, JSON.stringify([]));
        console.log('[GAMIFICACION] Puntos inicializados.');
    }
}