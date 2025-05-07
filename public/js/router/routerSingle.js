import { initLayout } from '../init/initLayout.js';
import { createLayoutPage } from '../layouts/layoutPage/index.js';
import { store } from '../store/index.js';

export const getCurrentPath = () => window.location.pathname;

export const updateBrowserPath = (path) => {
  window.history.pushState({}, '', path);
  store.dispatch({ type: 'SET_CURRENT_PATH', payload: path });
};

export const handleRouteChange = async (path) => {
  updateBrowserPath(path);

  try {
    const { routesUi, auth } = store.getState();

    // Protección de rutas
    const route = routesUi.routes.find(r => r.path === path);
    const requiresAuth = route?.meta?.requiresAuth;

    if (requiresAuth && !auth.isAuthenticated) {
      return navigate('/auth/login');
    }

    const layout = createLayoutPage(routesUi.routes, handleRouteChange, path);
    initLayout([layout], '#app');
  } catch (error) {
    console.error('Error al cambiar ruta:', error);
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

export const navigate = (path) => handleRouteChange(path);
