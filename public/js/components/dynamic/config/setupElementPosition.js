export function setupElementPosition (element, position = 'center') {
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
