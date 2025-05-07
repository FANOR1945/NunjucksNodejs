import { routeControllers } from '../../controllers/uiRoutes/index.js';
import { debugLog } from '../../debug.js';

export const createContent = (routes, routeHandler, currentPath,) => {
  const defaultContent = { 
    type: 'text', 
    content: 'Contenido no disponible', 
    styles: { fontSize: '1.2rem', color: '#999' } 
  };

  // Validación básica de ruta
  if (!currentPath || !routes?.length) {
    debugLog('Error: Ruta o lista de rutas inválida');
    return {
      area: 'content',
      type: 'container',
      children: [defaultContent]
    };
  }

  const currentRoute = routes.find(route => route.path === currentPath) || routes[0];
  debugLog(`Ruta actual: ${currentPath}`, `Ruta configurada: ${currentRoute?.path}`);

  // Función mejorada de refresh
  const refreshContent = (newState = {}) => {
    debugLog('Iniciando refresh', { path: currentPath, state: newState });
    
    const contentContainer = document.querySelector('main[data-content]') || 
                           document.querySelector('[data-content-area]');
    
    if (!contentContainer) {
      debugLog('Error: Contenedor no encontrado, recargando layout completo');
      return routeHandler(currentPath, true); // Fuerza recarga completa
    }

    try {
      const controller = routeControllers[currentPath];
      if (!controller) {
        throw new Error(`Controlador no encontrado para ${currentPath}`);
      }

      const content = typeof controller === 'function' 
        ? controller({ refresh: refreshContent, state: newState })
        : controller;

      const contentConfig = {
        area: 'content',
        type: 'container',
        tag: 'main',
        attributes: { 'data-content': 'true' },
        styles: {
          overflowY: 'auto',
          padding: '20px',
          backgroundColor: '#2c3e50'
        },
        children: Array.isArray(content) ? [content] : [content || defaultContent]
      };

      initLayout([contentConfig], contentContainer);
      debugLog('Contenido actualizado exitosamente');
    } catch (error) {
      console.error('Error en refreshContent:', error);
      debugLog('Fallback a contenido por defecto');
      initLayout([defaultContent], contentContainer);
    }
  };

  // Obtener contenido inicial
  try {
    const controller = routeControllers[currentPath];
    const content = typeof controller === 'function'
      ? controller({ refresh: refreshContent })
      : controller || defaultContent;

    return {
      area: 'content',
      type: 'container',
      tag: 'main',
      attributes: { 'data-content': 'true' },
      styles: {
        overflowY: 'auto',
        padding: '20px',
        backgroundColor: '#2c3e50'
      },
      children: Array.isArray(content) ? content : [content]
    };
  } catch (error) {
    console.error('Error en createContent:', error);
    return {
      area: 'content',
      type: 'container',
      children: [{
        ...defaultContent,
        content: 'Error al cargar contenido'
      }]
    };
  }
};