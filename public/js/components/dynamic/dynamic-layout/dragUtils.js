let currentDraggedElement = null;
let dragOffsetX = 0;
let dragOffsetY = 0;
let originalParent = null;
let originalNextSibling = null;
let originalRect = null;

export function setupUniversalDrag(element, handle = element, options = {}) {
  const {
    isContainer = false,
    onDragStart = () => {},
    onDragEnd = () => {},
    onDrop = () => {}
  } = options;

  handle.addEventListener('mousedown', startDrag);

  function startDrag(e) {
    if (e.button !== 0) return;
    e.stopPropagation();
    e.preventDefault();

    currentDraggedElement = element;
    originalRect = element.getBoundingClientRect();
    originalParent = element.parentNode;
    originalNextSibling = element.nextSibling;
    dragOffsetX = e.clientX - originalRect.left;
    dragOffsetY = e.clientY - originalRect.top;

    // Estilos durante arrastre
    element.style.position = 'fixed';
    element.style.zIndex = '1000';
    element.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
    element.style.opacity = '0.9';
    element.style.width = `${originalRect.width}px`;
    element.style.pointerEvents = 'none';
    element.style.cursor = 'grabbing';

    // Posición inicial
    element.style.left = `${e.clientX - dragOffsetX}px`;
    element.style.top = `${e.clientY - dragOffsetY}px`;

    highlightDropZones(true);
    document.addEventListener('mousemove', dragElement);
    document.addEventListener('mouseup', stopDrag);

    onDragStart(element);
  }

  function dragElement(e) {
    if (!currentDraggedElement) return;
    e.preventDefault();

    currentDraggedElement.style.left = `${e.clientX - dragOffsetX}px`;
    currentDraggedElement.style.top = `${e.clientY - dragOffsetY}px`;
    updateDropZoneHighlight(e.clientX, e.clientY);
  }

  function stopDrag(e) {
    if (!currentDraggedElement) return;
    e.preventDefault();

    processDrop(e.clientX, e.clientY);
    cleanupDrag();

    onDragEnd(currentDraggedElement);
    currentDraggedElement = null;
  }

  function processDrop(clientX, clientY) {
    const dropZones = document.querySelectorAll(isContainer ? '.layout-container' : '.drop-zone');
    let dropTarget = null;
    let insertPosition = null;

    dropZones.forEach(zone => {
      if (zone === element || zone.contains(element)) return;
      
      const rect = zone.getBoundingClientRect();
      if (clientX >= rect.left && clientX <= rect.right &&
          clientY >= rect.top && clientY <= rect.bottom) {
        dropTarget = zone;
        
        const children = Array.from(zone.children);
        for (let i = 0; i < children.length; i++) {
          const childRect = children[i].getBoundingClientRect();
          if (clientY < childRect.top + childRect.height / 2) {
            insertPosition = children[i];
            break;
          }
        }
      }
    });

    if (dropTarget) {
      if (insertPosition) {
        dropTarget.insertBefore(element, insertPosition);
      } else {
        dropTarget.appendChild(element);
      }
      onDrop(element, dropTarget);
    } else {
      resetPosition();
    }
  }

  function resetPosition() {
    if (originalParent) {
      if (originalNextSibling) {
        originalParent.insertBefore(element, originalNextSibling);
      } else {
        originalParent.appendChild(element);
      }
    }
    element.style.position = 'absolute';
    element.style.left = '0';
    element.style.top = '0';
  }

  function cleanupDrag() {
    element.style.position = '';
    element.style.zIndex = '';
    element.style.boxShadow = '';
    element.style.opacity = '';
    element.style.width = '';
    element.style.pointerEvents = '';
    element.style.cursor = '';
    highlightDropZones(false);
    document.removeEventListener('mousemove', dragElement);
    document.removeEventListener('mouseup', stopDrag);
  }

  function highlightDropZones(enable) {
    const zones = document.querySelectorAll(isContainer ? '.layout-container' : '.drop-zone');
    zones.forEach(zone => {
      zone.style.transition = 'all 0.2s ease';
      zone.style.border = enable ? '2px dashed rgba(98, 0, 234, 0.3)' : '';
    });
  }

  function updateDropZoneHighlight(x, y) {
    const zones = document.querySelectorAll(isContainer ? '.layout-container' : '.drop-zone');
    zones.forEach(zone => {
      const rect = zone.getBoundingClientRect();
      const isOver = (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom);
      zone.style.backgroundColor = isOver ? 'rgba(98, 0, 234, 0.05)' : '';
      zone.style.borderColor = isOver ? '#6200ea' : 'rgba(98, 0, 234, 0.3)';
    });
  }
}

export function initDragSystem() {
  document.addEventListener('dragover', (e) => e.preventDefault());
}