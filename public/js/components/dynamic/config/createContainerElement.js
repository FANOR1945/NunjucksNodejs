export function createContainerElement (index, options = {}) {
  const { nested = true, isRootContainer = false } = options
  const container = document.createElement('div')
  container.className = 'app-bar-container'
  container.dataset.index = index
  container.dataset.isRoot = isRootContainer

  // Paleta de colores para los IDs (puedes personalizarla)
  const colorPalette = [
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#FFA07A',
    '#98D8C8',
    '#F06292',
    '#7986CB',
    '#9575CD'
  ]
  const bgColor = colorPalette[index % colorPalette.length]
  const textColor = getContrastColor(bgColor) // Función auxiliar para contraste

  // Estilos base del contenedor con borde del color asignado
  Object.assign(container.style, {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    minHeight: isRootContainer ? '48px' : '32px',
    minWidth: '120px',
    padding: '8px',
    border: `2px dashed ${bgColor}`,
    borderRadius: '4px',
    transition: 'all 0.3s ease',
    overflow: 'visible',
    backgroundColor: 'rgba(0,0,0,0.03)',
    gap: '8px'
  })

  // Badge con ID visible en esquina superior derecha
  const idBadge = document.createElement('div')
  idBadge.textContent = `Col ${index}`
  Object.assign(idBadge.style, {
    position: 'absolute',
    right: '4px',
    top: '4px',
    fontSize: '10px',
    fontWeight: 'bold',
    color: textColor,
    backgroundColor: bgColor,
    padding: '2px 6px',
    borderRadius: '10px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    pointerEvents: 'none',
    userSelect: 'none',
    zIndex: '10'
  })
  container.appendChild(idBadge)

  // Función auxiliar para determinar color de texto contrastante
  function getContrastColor (hexColor) {
    const r = parseInt(hexColor.substr(1, 2), 16)
    const g = parseInt(hexColor.substr(3, 2), 16)
    const b = parseInt(hexColor.substr(5, 2), 16)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000
    return brightness > 128 ? '#000000' : '#FFFFFF'
  }

  // Permitir crear sub-contenedores con doble click
  if (nested) {
    container.addEventListener('dblclick', e => {
      if (e.target === container) {
        const newSubContainer = createContainerElement(0, {
          nested: true,
          isRootContainer: false
        })
        container.appendChild(newSubContainer)
      }
    })
  }

  return container
}
