import { applyPrototypeStyle } from './helpers/applyPrototypeStyle.js';
import { setupFreeDrag } from './helpers/setupFreeDrag.js';

export function createDraggableElement(config, id, draggable = false) {
  const element = document.createElement('div');
  element.id = `element-${id}`;
  element.className = `layout-element ${config.className || ''}`;
  element.dataset.type = config.type;

  // Estilo base
  const baseStyles = {
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
  };

  Object.assign(element.style, baseStyles);

  // Contenido
  switch (config.type) {
    case 'text':
      element.textContent = config.content;
      break;
    case 'button':
      const button = document.createElement('button');
      button.textContent = config.content;
      button.dataset.clickable = 'true'; // Marcar como clickable
      if (config.action) {
        button.addEventListener('click', (e) => {
          e.stopPropagation(); // Prevenir que el evento llegue al elemento draggable
          config.action(e);
        });
      }
      element.appendChild(button);
      break;
    case 'icon':
      const icon = document.createElement('i');
      icon.className = config.className || '';
      icon.textContent = config.content || '';
      icon.dataset.clickable = 'true'; // Marcar como clickable
      if (config.action) {
        icon.addEventListener('click', (e) => {
          e.stopPropagation();
          config.action(e);
        });
      }
      element.appendChild(icon);
      break;
    case 'custom':
      if (config.render) element.appendChild(config.render());
      break;
  }

  // Children anidados
  if (Array.isArray(config.children)) {
    config.children.forEach((child, index) => {
      const childElement = createDraggableElement(child, `${id}-${index}`, draggable);
      element.appendChild(childElement);
    });
  }

  // Si es draggable, aplicar estilos de prototipo + drag libre
  if (draggable) {
    const label = config.children?.length ? 'Child' : 'Elemento';
    applyPrototypeStyle(element, label);
    setupFreeDrag(element);
  }

  return element;
}