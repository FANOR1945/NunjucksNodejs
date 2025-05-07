import { createRoleBaseStyles } from '../../../styles/baseStyles.js';
import { createDraggableElement } from './createDraggableElement.js';

export function DynamicLayout(config = {}) {
  const {
    role = 'content',
    layout = null,
    elements = [],
    columns = 3,
    styles = {},
    nestedContainers = true,
    draggable = false,
    containerClass = '',
    isRootContainer = true,
    flex = false,
    ...otherProps
  } = config;

  // Creación del layout principal
  const layoutContainer = document.createElement('div');
  layoutContainer.className = `dynamic-layout ${role} ${containerClass}`;
  layoutContainer.dataset.role = role;

  // Aplicar estilos
  const layoutStyles = layout ? {
    display: 'grid',
    gridTemplateColumns: layout.columns.join(' '),
    gridTemplateRows: layout.rows.join(' '),
    gridTemplateAreas: layout.areas.map(row => `"${row.join(' ')}"`).join(' '),
    ...(layout.styles || {})
  } : {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: '8px'
  };

  Object.assign(layoutContainer.style, {
    boxSizing: 'border-box',
    ...createRoleBaseStyles(role, styles),
    ...layoutStyles,
    ...styles
  });

  // Función para procesar elementos recursivamente
  const processElement = (elementConfig, parentElement) => {
    if (elementConfig.type === 'container') {
      const container = document.createElement(elementConfig.tag || 'div');
      Object.assign(container.style, elementConfig.styles || {});
      
      if (elementConfig.area) {
        container.style.gridArea = elementConfig.area;
      }

      // Procesar children recursivamente
      if (elementConfig.children) {
        elementConfig.children.forEach(childConfig => {
          processElement(childConfig, container);
        });
      }

      parentElement.appendChild(container);
    } else {
      const element = createDraggableElement(elementConfig, Math.random().toString(36).substr(2, 9), draggable);
      parentElement.appendChild(element);
    }
  };

  // Procesar elementos principales
  elements.forEach(elementConfig => {
    processElement(elementConfig, layoutContainer);
  });

  // API pública
  layoutContainer.addElement = (elementConfig, parentElement = layoutContainer) => {
    processElement(elementConfig, parentElement);
    return `element-${Math.random().toString(36).substr(2, 9)}`;
  };

  layoutContainer.removeElement = (elementId) => {
    const element = layoutContainer.querySelector(`#${elementId}`);
    if (element) {
      element.remove();
      return true;
    }
    return false;
  };

  layoutContainer.updateLayout = (newConfig) => {
    Object.assign(config, newConfig);
    // Aquí iría la lógica para actualizar el layout
  };

  return layoutContainer;
}