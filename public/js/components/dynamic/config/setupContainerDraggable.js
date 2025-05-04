export function setupContainerDrag (container, handle) {
  let offsetX, offsetY
  let isDragging = false
  let originalParent = container.parentNode
  let originalNextSibling = container.nextSibling

  handle.addEventListener('mousedown', startDrag)

  function startDrag (e) {
    if (e.button !== 0) return
    e.stopPropagation()

    isDragging = true
    const rect = container.getBoundingClientRect()
    offsetX = e.clientX - rect.left
    offsetY = e.clientY - rect.top

    // Estilos durante arrastre
    container.style.position = 'absolute'
    container.style.zIndex = '1000'
    container.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)'
    container.style.opacity = '0.9'
    handle.style.cursor = 'grabbing'

    // Posición inicial
    container.style.left = `${e.clientX - offsetX}px`
    container.style.top = `${e.clientY - offsetY}px`

    document.addEventListener('mousemove', drag)
    document.addEventListener('mouseup', endDrag)
  }

  function drag (e) {
    if (!isDragging) return

    container.style.left = `${e.clientX - offsetX}px`
    container.style.top = `${e.clientY - offsetY}px`

    // Resaltar posibles contenedores de destino
    document.querySelectorAll('.layout-container').forEach(target => {
      if (target === container) return

      const rect = target.getBoundingClientRect()
      const isOver =
        e.clientX > rect.left &&
        e.clientX < rect.right &&
        e.clientY > rect.top &&
        e.clientY < rect.bottom

      target.style.borderColor = isOver ? '#6200ea' : ''
    })
  }

  function endDrag (e) {
    if (!isDragging) return
    isDragging = false

    // Restaurar estilos
    container.style.position = ''
    container.style.zIndex = ''
    container.style.boxShadow = ''
    container.style.opacity = ''
    container.style.left = ''
    container.style.top = ''
    handle.style.cursor = 'grab'

    // Encontrar nuevo padre
    let newParent = originalParent
    let insertBefore = originalNextSibling

    document.querySelectorAll('.layout-container').forEach(target => {
      if (target === container) return

      const rect = target.getBoundingClientRect()
      if (
        e.clientX > rect.left &&
        e.clientX < rect.right &&
        e.clientY > rect.top &&
        e.clientY < rect.bottom
      ) {
        newParent = target
      }
    })

    // Mover el contenedor
    if (newParent !== container) {
      // Evitar auto-anidamiento
      newParent.insertBefore(container, insertBefore)
    }

    // Restaurar bordes
    document.querySelectorAll('.layout-container').forEach(el => {
      el.style.borderColor = ''
    })

    document.removeEventListener('mousemove', drag)
    document.removeEventListener('mouseup', endDrag)
  }
}
