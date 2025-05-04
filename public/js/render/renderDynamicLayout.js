import { DynamicLayout } from '../components/dynamic/dynamicLayout.js'

export function renderDynamicLayout (container, config = {}) {
  if (!container || !(container instanceof HTMLElement)) {
    console.error('Contenedor no válido o no proporcionado')
    return null
  }

  try {
    // Crear el layout dinámico
    const layout = DynamicLayout(config)

    // Limpiar el contenedor y añadir el layout
    container.innerHTML = ''
    container.appendChild(layout)

    return layout
  } catch (error) {
    console.error('Error al renderizar el layout dinámico:', error)
    return null
  }
}
