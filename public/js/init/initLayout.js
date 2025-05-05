import { renderLayout } from "../render/renderLayout.js";

/**
 * Inicializa uno o varios layouts directamente dentro del contenedor base.
 * @param {Object|Object[]} configs - Config o lista de configs de layout.
 * @param {string|HTMLElement} container - Selector o nodo base como "#app"
 * @returns {Object[]} APIs de control para cada layout
 */
export function initLayout(configs, container) {
  const layouts = Array.isArray(configs) ? configs : [configs];
  const containerElement = resolveContainer(container);

  if (!containerElement) {
    throw new Error(`Contenedor no encontrado: ${container}`);
  }

  // Limpiar el contenedor antes de renderizar nuevos layouts
  containerElement.innerHTML = '';

  return layouts.map(config => {
    const layoutEl = renderLayout(containerElement, config);
    return {
      element: layoutEl,
      unmount: () => layoutEl?.remove(),
      getConfig: () => ({ ...config })
    };
  });
}

function resolveContainer(container) {
  if (typeof container === 'string') {
    return document.querySelector(container) ||
           document.getElementById(container.replace('#', '')) ||
           document.querySelector(`.${container}`);
  } else if (container instanceof HTMLElement) {
    return container;
  }
  return null;
}
