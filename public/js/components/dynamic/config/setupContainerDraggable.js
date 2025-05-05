export function setupContainerDrag(container, handle) {
  let offsetX, offsetY;
  let originalParent = container.parentNode;

  handle.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    e.preventDefault();

    const rect = container.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    container.style.position = 'fixed';
    container.style.zIndex = '1000';
    container.style.pointerEvents = 'none';
    container.style.left = `${e.clientX - offsetX}px`;
    container.style.top = `${e.clientY - offsetY}px`;

    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
  });

  function drag(e) {
    container.style.left = `${e.clientX - offsetX}px`;
    container.style.top = `${e.clientY - offsetY}px`;
  }

  function stopDrag(e) {
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);

    container.style.position = '';
    container.style.zIndex = '';
    container.style.pointerEvents = '';

    // Lógica simple de colocación
    const elements = document.elementsFromPoint(e.clientX, e.clientY);
    const dropTarget = elements.find(el => el.classList.contains('layout-container'));
    
    if (dropTarget && dropTarget !== container) {
      dropTarget.appendChild(container);
    } else {
      originalParent.appendChild(container);
    }
  }
}