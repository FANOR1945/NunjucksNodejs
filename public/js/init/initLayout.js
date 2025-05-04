import { renderDynamicLayout } from '../render/renderDynamicLayout.js'

/**
 * Verifica el contenedor y renderiza el Layout dinámico
 * @param {string|HTMLElement} container - Selector CSS (ID o clase) o elemento DOM
 * @param {Object} config - Configuración del Layout
 * @param {string} [config.role='content'] - Rol del layout
 * @param {Array} [config.elements=[]] - Elementos a renderizar
 * @param {number} [config.columns=3] - Número de columnas
 * @param {Object} [config.styles={}] - Estilos CSS adicionales
 * @param {boolean} [config.nestedContainers=true] - Permite anidamiento
 * @param {boolean} [config.draggable=true] - Hace elementos arrastrables
 * @param {string} [config.containerClass=''] - Clase CSS adicional
 * @returns {HTMLElement|null} El Layout creado o null si falla
 */
export function initLayout (container, config = {}) {
  // Obtener el elemento contenedor
  let containerElement

  if (typeof container === 'string') {
    // Eliminar caracteres no válidos (seguridad básica)
    const sanitizedSelector = container.replace(/[^a-zA-Z0-9-_.]/g, '')

    // Buscar por ID primero
    containerElement = document.getElementById(sanitizedSelector)

    // Si no se encuentra por ID, buscar por clase (primera coincidencia)
    if (!containerElement) {
      containerElement = document.querySelector(`.${sanitizedSelector}`)
    }
  } else if (container instanceof HTMLElement) {
    containerElement = container
  }

  // Verificar si se encontró el contenedor
  if (!containerElement) {
    console.error('No se encontró el contenedor para el layout:', container)
    return null
  }

  // Renderizar el Layout dinámico
  return renderDynamicLayout(containerElement, config)
}
