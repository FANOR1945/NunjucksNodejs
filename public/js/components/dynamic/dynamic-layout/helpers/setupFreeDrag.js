export function setupFreeDrag(element, isDraggable) {
    if (!isDraggable) return;
  
    let isDragging = false;
    let startX = 0, startY = 0;
    let offsetX = 0, offsetY = 0;
    const dragThreshold = 3;
    const originalParent = element.parentElement;
    const originalStyles = {
      position: element.style.position,
      zIndex: element.style.zIndex,
    };
  
    element.style.cursor = 'grab';
    element.onmousedown = (e) => {
      if (e.target.dataset.clickable === 'true') return;
  
      e.preventDefault();
      startX = e.clientX;
      startY = e.clientY;
  
      const rect = element.getBoundingClientRect();
      offsetX = startX - rect.left;
      offsetY = startY - rect.top;
  
      requestAnimationFrame(() => {
        element.style.position = 'fixed';
        element.style.left = `${rect.left}px`;
        element.style.top = `${rect.top}px`;
        element.style.zIndex = '9999';
        element.style.cursor = 'grabbing';
        element.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
      });
  
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };
  
    function onMouseMove(e) {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
  
      if (!isDragging && (Math.abs(dx) > dragThreshold || Math.abs(dy) > dragThreshold)) {
        isDragging = true;
      }
  
      if (isDragging) {
        element.style.left = `${e.clientX - offsetX}px`;
        element.style.top = `${e.clientY - offsetY}px`;
      }
    }
  
    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
  
      element.style.cursor = 'grab';
      element.style.boxShadow = '';
  
      if (!isDragging) {
        // Solo fue click
        originalParent.appendChild(element);
        Object.assign(element.style, originalStyles);
      }
  
      isDragging = false;
    }
  }
  