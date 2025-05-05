import { setupContainerDrag } from './drag/setupContainerDrag.js';
import { createDraggableElement } from './createDraggableElement.js';
import { applyPrototypeStyle } from './helpers/applyPrototypeStyle.js';

export function createContainerElement(index, options = {}) {
  const {
    nested = true,
    role = '',
    containerClass = '',
    draggable = false,
    flex, // Flex del contenedor actual
    children = [],
    isRootContainer = false
  } = options;

  const container = document.createElement('div');
  container.className = `layout-container ${containerClass}`;
  container.dataset.index = index;
  container.dataset.role = role;

  // Buscar flex en los hijos si no está definido en el contenedor actual
  const containerFlex = flex !== undefined ? flex : 
    (children.find(child => child.flex !== undefined)?.flex);

  // Aplicar estilos flex solo si está definido
  const flexStyles = containerFlex !== undefined ? {
    display: 'flex',
    flexDirection: 'column',
    flex: typeof containerFlex === 'boolean' ? (containerFlex ? '1' : '0') : containerFlex
  } : {};

  Object.assign(container.style, {
    margin: '1px',
    padding: '12px',
    backgroundColor: draggable ? 'transparent' : 'rgba(255,255,255,0.1)',
    border: draggable ? '1px dashed #ADFF2F' : 'none',
    borderRadius: '1px',
    position: 'relative',
    ...flexStyles // Aplicamos los estilos flex condicionalmente
  });

  // Badge indicador
  const badge = document.createElement('div');
  badge.textContent = `Pos ${index}`;
  Object.assign(badge.style, {
    position: 'absolute',
    top: '4px',
    right: '4px',
    fontSize: '10px',
    backgroundColor: 'rgba(0,0,0,0.05)',
    padding: '2px 6px',
    borderRadius: '8px',
    cursor: draggable ? 'grab' : 'default'
  });

  container.appendChild(badge);

  if (draggable) {
    setupContainerDrag(container, badge);
    applyPrototypeStyle(container, 'Contenedor');
  }

  if (nested) {
    container.addEventListener('dblclick', (e) => {
      if (e.target === container) {
        const sub = createContainerElement(0, { 
          nested: true, 
          role, 
          containerClass: 'nested', 
          isRootContainer: false,
          flex: containerFlex // Heredamos el flex encontrado
        });
        if (draggable) applyPrototypeStyle(sub, 'Contenedor');
        container.appendChild(sub);
      }
    });
  }

  // Procesar hijos pasando el flex encontrado
  children.forEach((child, i) => {
    // Usamos el flex del child si está definido, sino el del contenedor
    const childOptions = {
      ...child,
      flex: child.flex !== undefined ? child.flex : containerFlex
    };
    const el = createDraggableElement(childOptions, `${index}-${i}`, draggable);
    container.appendChild(el);
  });

  return container;
}