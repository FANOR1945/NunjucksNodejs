// Modificamos principalmente la función setupFreeDrag para permitir movimiento entre contenedores
export function setupFreeDrag (element) {
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
