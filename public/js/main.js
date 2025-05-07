// src/main.js
import { domReady } from './utils/dom.js';
import { initLayout } from './init/initLayout.js';
import { createLayoutPage } from './layouts/layoutPage/index.js';

import { fetchRoutes } from './services/api.js';
import { createDebugUI } from './debug.js';
import '../css/styles.css';

let currentPath = '';
let routes = [];

// Utilidades de rutas
const getCurrentPath = () => window.location.pathname;
const updateBrowserPath = path => window.history.pushState({}, '', path);

// Cambio de ruta sin spinner ni sockets
const handleRouteChange = async (path) => {
  updateBrowserPath(path);
  currentPath = path;

  try {
    const layout = createLayoutPage(routes, handleRouteChange, path);
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

// Inicializar la app
const initializeApp = async () => {
  try {
    createDebugUI();

    routes = await fetchRoutes();
    currentPath = getCurrentPath();

    await handleRouteChange(currentPath);

    window.addEventListener('popstate', () => {
      handleRouteChange(getCurrentPath());
    });

  } catch (error) {
    console.error('Error al inicializar:', error);
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

domReady.then(initializeApp);
