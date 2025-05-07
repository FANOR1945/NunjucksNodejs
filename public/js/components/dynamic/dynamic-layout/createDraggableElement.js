import { setupUniversalDrag } from './dragUtils.js';
import { getElementType } from '../../elementTypes/index.js';

export function createDraggableElement(config, id, draggable = true) {
  const elementCreator = getElementType(config.type);
  const element = elementCreator.create(config);

  // Configuración básica del elemento
  element.id = `element-${id}`;
  element.className = `layout-element ${config.className || ''}`;
  element.dataset.type = config.type;

  const baseStyles = {
    position: 'relative',
    cursor: draggable ? 'grab' : config.type,
    userSelect: 'none',
    transition: 'all 0.2s ease',
    zIndex: '1',
    boxSizing: 'border-box',
    display: 'flex',
    flex:config.type,
        minHeight: 'min-content',
  };

  Object.assign(element.style, baseStyles);

  // Habilitar arrastre
  if (draggable) {
    setupUniversalDrag(element, element, {
      isContainer: false,
      onDragStart: (el) => {
        el.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
      },
      onDragEnd: (el) => {
        el.style.boxShadow = '';
      }
    });
  }

  return element;
}
