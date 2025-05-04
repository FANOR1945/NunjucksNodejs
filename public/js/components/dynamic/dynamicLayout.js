import { createRoleBaseStyles } from '../../styles/baseStyles.js'
import { setupContainerDrag } from './config/setupContainerDraggable.js'

/**
 * DynamicLayout - Sistema de layout flexible para múltiples propósitos
 * @param {Object} config - Configuración del layout
 * @param {string} [config.role='content'] - 'appbar'|'sidebar'|'content'|'footer'|'custom'
 * @param {Array} [config.elements=[]] - Elementos a renderizar
 * @param {number} [config.columns=3] - Columnas base
 * @param {Object} [config.styles={}] - Estilos CSS adicionales
 * @param {boolean} [config.nestedContainers=true] - Permite anidamiento
 * @param {boolean} [config.draggable=true] - Hace elementos arrastrables
 * @param {string} [config.containerClass=''] - Clase CSS adicional para contenedores
 */
export function DynamicLayout (config = {}) {
  // Configuración con valores por defecto
  const {
    role = 'content',
    elements = [],
    columns = 3,
    styles = {},
    nestedContainers = true,
    draggable = true,
    containerClass = '',
    isRootContainer0 = true,
    flex = false,
    ...otherProps
  } = config

  // ======================
  // 2. CREACIÓN DEL LAYOUT PRINCIPAL
  // ======================
  const layoutContainer = document.createElement('div')
  layoutContainer.className = `dynamic-layout ${role} ${containerClass}`
  layoutContainer.dataset.role = role

  // Aplicar estilos combinados
  Object.assign(layoutContainer.style, {
    //     display: 'grid',
    //     gridTemplateColumns: `repeat(${columns}, 1fr)`,
    //     gap: '8px',
    boxSizing: 'border-box',
    backgroundColor: 'green',
    border: '1px solid red',
    padding: '5px ',
    ...createRoleBaseStyles(role, styles),

    ...styles
  })

  // ======================
  // 3. SISTEMA DE ORGANIZACIÓN DE ELEMENTOS
  // ======================
  const positionMap = new Map() // Mapa de posiciones => elementos

  // Función para agrupar elementos por posición
  const groupElements = () => {
    positionMap.clear()
    elements.forEach((element, index) => {
      const pos =
        element.initialPosition !== undefined ? element.initialPosition : 0
      if (!positionMap.has(pos)) positionMap.set(pos, [])
      positionMap.get(pos).push({ ...element, originalIndex: index })
    })
  }

  // Función para crear contenedores organizados
  const createLayoutStructure = () => {
    // Limpiar contenedor existente
    while (layoutContainer.firstChild) {
      layoutContainer.removeChild(layoutContainer.firstChild)
    }

    // Crear contenedores solo para posiciones usadas
    Array.from(positionMap.keys())
      .sort((a, b) => a - b)
      .forEach(pos => {
        const elementsInPosition = positionMap.get(pos)
        // Buscamos el primer elemento que defina flex para el contenedor
        const containerFlex = elementsInPosition.find(
          el => el.flex !== undefined
        )?.flex

        const container = createContainerElement(pos, {
          nested: nestedContainers,
          role,
          containerClass,
          isRootContainer: true,
          draggable,
          flex: containerFlex
          // Ejemplo: posición 1 será flexible
        })

        // Agregar elementos a su contenedor
        positionMap.get(pos).forEach(element => {
          const elementNode = createDraggableElement(
            element,
            element.originalIndex,
            draggable
          )
          container.appendChild(elementNode)
          setupElementPosition(elementNode, element.position)
        })

        layoutContainer.appendChild(container)
      })

    // Ajustar columnas visibles
    const visibleColumns = Math.min(columns, positionMap.size)
    layoutContainer.style.gridTemplateColumns = `repeat(${visibleColumns}, 1fr)`
  }

  // Inicializar estructura
  groupElements()
  createLayoutStructure()

  // ======================
  // 4. API PÚBLICA
  // ======================
  layoutContainer.addElement = elementConfig => {
    const newIndex = elements.length
    elements.push(elementConfig)
    groupElements()
    createLayoutStructure()
    return `element-${newIndex}`
  }

  layoutContainer.removeElement = elementId => {
    const index = elements.findIndex((_, i) => `element-${i}` === elementId)
    if (index !== -1) {
      elements.splice(index, 1)
      groupElements()
      createLayoutStructure()
      return true
    }
    return false
  }

  layoutContainer.updateLayout = newConfig => {
    Object.assign(config, newConfig)
    groupElements()
    createLayoutStructure()
  }

  layoutContainer.getElements = () => [...elements]
  layoutContainer.getContainer = () => layoutContainer

  return layoutContainer
}

// ======================
// FUNCIONES AUXILIARES
// ======================

function createContainerElement (index, options = {}) {
  const {
    nested = true,
    role = '',
    isRootContainer = false,
    containerClass = '',
    draggable = true,
    flex
    // Nuevo parámetro para controlar flex-grow
  } = options
  const container = document.createElement('div')
  container.className = `layout-container ${containerClass}`
  container.dataset.index = index
  container.dataset.role = role
  container.dataset.draggable = draggable
  container.dataset.draggable = draggable

  // Estilos base del contenedor
  const baseStyles = {
    position: 'relative',
    display: 'flex',
    margin: '5px',
    flexDirection: 'column',
    flex: flex, // Flex-grow controlado
    //     alignItems: 'stretch',
    justifyContent: 'flex-start',
    minHeight: isRootContainer,
    //     minWidth: '120px',
    padding: '12px',
    borderRadius: '4px',
    transition: 'all 0.3s ease',
    overflow: 'visible',
    backgroundColor: 'rgba(255,255,255,0.1)',
    border: '1px dashed #e0e0e0',
    cursor: draggable ? 'move' : 'default'
  }

  Object.assign(container.style, baseStyles)

  // Badge identificador
  const badge = document.createElement('div')
  badge.textContent = `Pos ${index}`
  badge.style.position = 'absolute'
  badge.style.top = '4px'
  badge.style.right = '4px'
  badge.style.fontSize = '10px'
  badge.style.padding = '2px 6px'
  badge.style.backgroundColor =
    role === 'footer' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.05)'
  badge.style.borderRadius = '8px'
  badge.style.cursor = `${draggable ? 'grab' : 'default'}`

  container.appendChild(badge)
  if (draggable) {
    setupContainerDrag(container, badge)
  }

  // Permitir anidamiento
  if (nested) {
    container.addEventListener('dblclick', e => {
      if (e.target === container) {
        const subContainer = createContainerElement(0, {
          nested: true,
          role,
          containerClass: 'nested-container',
          isRootContainer: false,
          flex: false // Por defecto los anidados no son flex
        })
        container.appendChild(subContainer)
      }
    })
  }

  return container
}
function createDraggableElement (config, id, draggable = true) {
  const element = document.createElement('div')
  element.id = `element-${id}`
  element.className = `layout-element ${config.className || ''}`
  element.dataset.type = config.type

  // Configuración del contenido
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

  const elementStyles = {
    position: 'relative',
    cursor: draggable ? 'grab' : 'default',
    userSelect: 'none',
    transition: 'all 0.2s ease',
    zIndex: '1',
    boxSizing: 'border-box',
    display: 'flex',
    flex: config.flex ? '1' : '0 1 auto',
    minHeight: 'min-content',
    ...config.styles
  }

  Object.assign(element.style, elementStyles)

  if (draggable) {
    setupFreeDrag(element)
  }

  return element
}

function setupElementPosition (element, position = 'center') {
  // Resetear estilos primero
  element.style.left = ''
  element.style.right = ''
  element.style.top = ''
  element.style.bottom = ''
  element.style.transform = ''
  element.style.margin = ''

  // Si es string (posición predefinida)
  if (typeof position === 'string') {
    const positions = position.split(' ') // Soporta combinaciones como "left top"

    positions.forEach(pos => {
      switch (pos) {
        case 'left':
          element.style.left = '8px'
          element.style.right = 'auto'
          break
        case 'right':
          element.style.right = '8px'
          element.style.left = 'auto'
          break
        case 'center':
          element.style.left = '50%'
          element.style.right = 'auto'
          element.style.transform = 'translateX(-50%)'
          break
        case 'top':
          element.style.top = '8px'
          element.style.bottom = 'auto'
          break
        case 'bottom':
          element.style.bottom = '8px'
          element.style.top = 'auto'
          break
        case 'middle':
          element.style.top = '50%'
          element.style.bottom = 'auto'
          element.style.transform =
            (element.style.transform || '') + ' translateY(-50%)'
          break
      }
    })
  }
  // Si es objeto (coordenadas exactas)
  else if (typeof position === 'object') {
    if (position.x !== undefined) {
      element.style.left = `${position.x}px`
      element.style.right = 'auto'
    }
    if (position.y !== undefined) {
      element.style.top = `${position.y}px`
      element.style.bottom = 'auto'
    }
  }
}
// Modificamos principalmente la función setupFreeDrag para permitir movimiento entre contenedores
function setupFreeDrag (element) {
  let offsetX, offsetY
  let isDragging = false
  let originalContainer = null

  element.addEventListener('mousedown', e => {
    if (e.button !== 0) return // Solo botón izquierdo

    isDragging = true
    originalContainer = element.parentElement
    const rect = element.getBoundingClientRect()
    offsetX = e.clientX - rect.left
    offsetY = e.clientY - rect.top

    // Estilo durante el arrastre
    element.style.cursor = 'grabbing'
    element.style.zIndex = '100'
    element.style.transition = 'none'
    element.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)'
    element.style.position = 'fixed' // Cambiamos a fixed para mover libremente
    element.style.pointerEvents = 'none' // Evita interferencias durante el arrastre

    // Posición inicial
    element.style.left = `${e.clientX - offsetX}px`
    element.style.top = `${e.clientY - offsetY}px`

    document.addEventListener('mousemove', moveElement)
    document.addEventListener('mouseup', stopDrag)
  })

  function moveElement (e) {
    if (!isDragging) return

    // Mover el elemento con el cursor
    element.style.left = `${e.clientX - offsetX}px`
    element.style.top = `${e.clientY - offsetY}px`

    // Resaltar contenedores potenciales
    const containers = document.querySelectorAll('.app-bar-container')
    containers.forEach(container => {
      const rect = container.getBoundingClientRect()
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        container.style.borderColor = '#6200ea'
        container.style.backgroundColor = 'rgba(98,0,234,0.05)'
      } else {
        container.style.borderColor = 'rgba(0,0,0,0.2)'
        container.style.backgroundColor = 'rgba(0,0,0,0.03)'
      }
    })
  }

  function stopDrag (e) {
    if (!isDragging) return
    isDragging = false

    // Restaurar estilos
    element.style.cursor = 'grab'
    element.style.zIndex = '10'
    element.style.transition = 'all 0.2s ease'
    element.style.boxShadow = ''
    element.style.position = 'absolute'
    element.style.pointerEvents = 'auto'

    // Encontrar el contenedor de destino
    let targetContainer = null
    const containers = document.querySelectorAll('.app-bar-container')
    containers.forEach(container => {
      const rect = container.getBoundingClientRect()
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        targetContainer = container
      }
      // Restaurar estilos de todos los contenedores
      container.style.borderColor = 'rgba(0,0,0,0.2)'
      container.style.backgroundColor = 'rgba(0,0,0,0.03)'
    })

    // Si encontramos un contenedor de destino, mover el elemento allí
    if (targetContainer) {
      targetContainer.appendChild(element)

      // Calcular posición relativa al nuevo contenedor
      const containerRect = targetContainer.getBoundingClientRect()
      const relativeX = e.clientX - containerRect.left - offsetX
      const relativeY = e.clientY - containerRect.top - offsetY

      // Posicionar el elemento en el nuevo contenedor
      element.style.left = `${Math.max(0, relativeX)}px`
      element.style.top = `${Math.max(0, relativeY)}px`
    } else {
      // Si no hay contenedor de destino, volver al original
      originalContainer.appendChild(element)
    }

    document.removeEventListener('mousemove', moveElement)
    document.removeEventListener('mouseup', stopDrag)
  }
}
