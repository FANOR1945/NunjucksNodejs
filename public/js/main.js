import { domReady } from './utils/dom.js';
import { fetchRoutes } from './services/api.js';
import { createDebugUI } from './debug.js';
import '../css/styles.css';

import { store } from './store/index.js';
import { getCurrentPath, handleRouteChange } from './router/routerSingle.js';

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
  }
};

domReady.then(initializeApp);
