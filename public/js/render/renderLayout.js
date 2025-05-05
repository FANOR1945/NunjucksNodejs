// /js/render/renderLayout.js
// import { DynamicLayout } from '../components/dynamic/dynamicLayout.js';

import { DynamicLayout } from "../components/dynamic/dynamic-layout/DynamicLayout.js";

export function renderLayout(container, config = {}) {
  if (!container || !(container instanceof HTMLElement)) {
    console.error('Contenedor no válido');
    return null;
  }

  try {
    const layout = DynamicLayout(config); // Este debe devolver directamente un tag HTML (ej: header, aside, main, etc.)
    container.appendChild(layout);        // Directo al #app
    return layout;
  } catch (error) {
    console.error('Error al renderizar el layout:', error);
    return null;
  }
}
