import { domReady } from './utils/dom.js';
import { initLayout } from './init/initLayout.js';
import { createLayoutPage } from './layouts/layoutPage/index.js';

import { fetchRoutes } from './services/api.js';
import { createDebugUI } from './debug.js';
import '../css/styles.css';

import { store } from './store/index.js';

// Utils
const getCurrentPath = () => window.location.pathname;
const updateBrowserPath = path => window.history.pushState({}, '', path);

// Manejo de rutas
const handleRouteChange = async (path) => {
  updateBrowserPath(path);
  store.dispatch({ type: 'SET_CURRENT_PATH', payload: path });

  try {
    const { router } = store.getState();
    const layout = createLayoutPage(router.routes, handleRouteChange, path);
    initLayout([layout], '#app');
  } catch (error) {
    console.error('Error al cambiar de ruta:', error);
    initLayout([{
      role: 'error',
      elements: [{
        type: 'text',
        content: `Error al cargar ${path}`,
        styles: { color: 'red' }
      }]
    }], '#app');
  }
};

// Inicializar app
const initializeApp = async () => {
  try {
    createDebugUI();

    const routes = await fetchRoutes();
    const currentPath = getCurrentPath();

    store.dispatch({ type: 'SET_ROUTES', payload: routes });
    store.dispatch({ type: 'SET_CURRENT_PATH', payload: currentPath });

    await handleRouteChange(currentPath);

    window.addEventListener('popstate', () => {
      handleRouteChange(getCurrentPath());
    });

  } catch (error) {
    console.error('Error al inicializar la app:', error);
    initLayout([{
      role: 'error',
      elements: [{
        type: 'text',
        content: 'Error al cargar la aplicación',
        styles: { color: 'red' }
      }]
    }], '#app');
  }
};

// Esperar al DOM y arrancar
domReady.then(initializeApp);
