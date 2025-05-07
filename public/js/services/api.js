// src/services/routesService.js
import { debugLog } from '../debug.js';

export async function fetchRoutes() {
  debugLog('Iniciando fetchRoutes...');
  
  try {
    const startTime = performance.now();
    const response = await fetch('/api/routes');
    const fetchDuration = performance.now() - startTime;

    debugLog(`Fetch completado en ${fetchDuration.toFixed(2)}ms`, {
      status: response.status,
      ok: response.ok
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Validación robusta del array de rutas
    if (!Array.isArray(data?.routes)) {
      debugLog('Respuesta no contiene array válido de rutas:', data);
      throw new TypeError('La respuesta no contiene un array de rutas válido');
    }

    // Validación adicional de cada ruta
    const validRoutes = data.routes.filter(route => 
      route && typeof route === 'object' && route.path && typeof route.path === 'string'
    );

    if (validRoutes.length !== data.routes.length) {
      debugLog('Algunas rutas no son válidas:', {
        total: data.routes.length,
        validas: validRoutes.length,
        invalidas: data.routes.length - validRoutes.length
      });
    }

    debugLog('Rutas obtenidas:', {
      count: validRoutes.length,
      sample: validRoutes.slice(0, 3)
    });

    return validRoutes;
  } catch (error) {
    debugLog('Error en fetchRoutes:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    console.error('❌ Error en fetchRoutes:', error);
    return []; // Devuelve array vacío como fallback seguro
  }
}