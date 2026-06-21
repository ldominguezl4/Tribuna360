// src/routes.js
import SignTranslator from './pages/SignTranslator';
import Home from './pages/Home';
import Multimedia from './pages/Multimedia';
import Alert from './pages/Alert';
import Tickets from './pages/Tickets';
import MapPage from './pages/MapPage';
import Profile from './pages/Profile';

import Stadium3D from './pages/Stadium3D';

import RankingModal from './components/RankingModal'; // Modal de puntos (por si lo usas como página también)

export const routes = [
  {
    path: '/',
    element: <Home />,
    name: 'Inicio',
  },
  {
    path: '/multimedia',
    element: <Multimedia />,
    name: 'Comunidad',
  },
  {
    path: '/alert',
    element: <Alert />,
    name: 'Alertas',
  },
  {
    path: '/tickets',
    element: <Tickets />,
    name: 'Entradas',
  },
  {
    path: '/map',
    element: <MapPage />,
    name: 'Mapa del Estadio',
  },
  {
    path: '/profile',
    element: <Profile />,
    name: 'Perfil',
  },
  {
    path: '/ranking',
    element: <RankingModal />,
    name: 'Ranking',
  },
  {
  path: '/translator',
  element: <SignTranslator />,
  name: 'Traductor IA',
},

{
  path: '/stadium3d',
  element: <Stadium3D />,
  name: 'Estadio 3D',
},

];

