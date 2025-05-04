import { createContainerElement } from './config/createContainerElement.js'
import { createDraggableElement } from './config/createDraggableElement.js'
import { setupElementPosition } from './config/setupElementPosition.js'

export function dynamicAppBar (config = {}) {
  const {
    elements = [],
    columns = 3,
    styles = {},
    nestedContainers = true,
    draggable = true,
    ...otherProps
  } = config

  // 1. Analizar distribución real de elementos
  const positionMap = elements.reduce((map, element, index) => {
    const pos =
      element.initialPosition !== undefined ? element.initialPosition : 0
    if (!map.has(pos)) map.set(pos, [])
    map.get(pos).push({ ...element, originalIndex: index })
    return map
  }, new Map())

  // 2. Determinar las posiciones realmente usadas
  const usedPositions = Array.from(positionMap.keys()).sort((a, b) => a - b)
  const totalUsedPositions = usedPositions.length

  // 3. Crear AppBar principal
  const appBar = document.createElement('header')
  appBar.className = 'dynamic-app-bar'

  // 4. Función para calcular el layout de columnas
  const calculateLayout = () => {
    const visibleColumns = Math.min(columns, totalUsedPositions)

    return {
      gridTemplateColumns: `repeat(${visibleColumns}, 1fr)`,
      // Expandir el ancho si hay menos columnas que las configuradas
      width:
        visibleColumns < columns
          ? `${(visibleColumns / columns) * 100}%`
          : '100%'
    }
  }

  // 5. Crear SOLO contenedores necesarios
  const containers = new Map()
  usedPositions.forEach(pos => {
    const container = createContainerElement(pos, {
      nested: nestedContainers,
      isRootContainer: true
    })

    // Agregar todos los elementos de esta posición
    positionMap.get(pos).forEach(element => {
      const elementNode = createDraggableElement(
        element,
        element.originalIndex,
        draggable
      )
      container.appendChild(elementNode)
      setupElementPosition(elementNode, element.position)
    })

    containers.set(pos, container)
    appBar.appendChild(container)
  })

  // 6. Configurar estilos dinámicos
  const layout = calculateLayout()
  Object.assign(appBar.style, {
    display: 'grid',
    gridTemplateColumns: layout.gridTemplateColumns,
    width: '100%', // Cambiado a 100% para ocupar todo el ancho
    justifyContent: 'flex-start', // Asegura alineación a la izquierda
    gridAutoRows: 'minmax(64px, auto)',
    alignItems: 'stretch',
    backgroundColor: '#ffffff',
    zIndex: 999,
    padding: '8px',
    boxSizing: 'border-box',
    position: 'sticky',
    top: 0,
    left: 0, // Asegura posición en la izquierda
    gap: '8px',
    margin: '0', // Eliminado el auto que centraba
    ...styles
  })

  // 7. API pública que mantiene la integridad de posiciones
  appBar.addElement = elementConfig => {
    const newIndex = elements.length
    elements.push(elementConfig)
    const pos =
      elementConfig.initialPosition !== undefined
        ? elementConfig.initialPosition
        : 0

    // Actualizar el mapa de posiciones
    if (!positionMap.has(pos)) positionMap.set(pos, [])
    positionMap.get(pos).push({ ...elementConfig, originalIndex: newIndex })

    if (containers.has(pos)) {
      // Agregar a contenedor existente
      const elementNode = createDraggableElement(
        elementConfig,
        newIndex,
        draggable
      )
      containers.get(pos).appendChild(elementNode)
      setupElementPosition(elementNode, elementConfig.position)
    } else {
      // Crear nuevo contenedor solo si la posición es necesaria
      const newContainer = createContainerElement(pos, {
        nested: nestedContainers,
        isRootContainer: true
      })
      const elementNode = createDraggableElement(
        elementConfig,
        newIndex,
        draggable
      )
      newContainer.appendChild(elementNode)
      setupElementPosition(elementNode, elementConfig.position)

      containers.set(pos, newContainer)
      appBar.appendChild(newContainer)

      // Recalcular layout
      const newLayout = calculateLayout()
      appBar.style.gridTemplateColumns = newLayout.gridTemplateColumns
      appBar.style.width = newLayout.width
    }
  }

  return appBar
}
