import { setupFreeDrag } from './setupFreeDrag.js'

export function createDraggableElement (config, id, globalDraggable = true) {
  const element = document.createElement('div')
  element.id = `appbar-element-${id}`
  element.className = 'app-bar-element'

  // Configurar contenido según tipo
  switch (config.type) {
    case 'text':
      element.textContent = config.content
      break
    case 'button':
      const button = document.createElement('button')
      button.textContent = config.content
      if (config.action) button.addEventListener('click', config.action)
      element.appendChild(button)
      break
    case 'icon':
      const icon = document.createElement('i')
      icon.className = config.className || ''
      icon.textContent = config.content || ''
      if (config.action) icon.addEventListener('click', config.action)
      element.appendChild(icon)
      break
    case 'custom':
      if (config.render) element.appendChild(config.render())
      break
  }

  // Estilos base del elemento
  Object.assign(element.style, {
    cursor: 'grab',
    userSelect: 'none',
    transition: 'all 0.2s ease',
    position: 'absolute', // Posicionamiento absoluto por defecto
    zIndex: '10',
    ...config.styles
  })

  // 🔹 Evaluar si este elemento debe ser draggable
  const isDraggable =
    config.draggable !== undefined ? config.draggable : globalDraggable

  if (isDraggable) {
    setupFreeDrag(element)
  } else {
    element.style.cursor = 'default'
  }

  return element
}
