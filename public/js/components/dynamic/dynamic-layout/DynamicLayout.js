import { createRoleBaseStyles } from '../../../styles/baseStyles.js';
import { createDraggableElement } from './createDraggableElement.js';
import { setupElementPosition } from './helpers/setupElementPosition.js';
import { applyPrototypeStyle } from './helpers/applyPrototypeStyle.js';
import { setupFreeDrag } from './helpers/setupFreeDrag.js';

export function DynamicLayout(config = {}) {
  const {
    role = 'content',
    layout = null,
    elements = [],
    columns = 3,
    styles = {},
    
    draggable = true,
    containerClass = '',
    
    flex,
  } = config;

  const areaMap = new Map();

  const createInternalContainer = (area, options = {}) => {
    const container = document.createElement('div');
    container.className = `layout-container ${options.containerClass || ''}`.trim();
    container.dataset.area = area;
    container.dataset.role = options.role || '';
    Object.assign(container.style, {
      position: 'relative',
      margin: '0',
      padding: '0',
      ...(options.flex !== undefined
        ? {
            display: 'flex',
            flexDirection: 'column',
            flex: typeof options.flex === 'boolean' ? (options.flex ? '1' : '0') : options.flex,
          }
        : {}),
    });
    return container;
  };

  const layoutContainer = createInternalContainer('layout', {
    containerClass,
    role,
    flex,
  });

  const baseStyles = createRoleBaseStyles(role, styles);
  Object.assign(layoutContainer.style, {
    boxSizing: 'border-box',
    ...baseStyles,
    ...styles,
  });

  const isSimpleLayout = !layout && !config.columns;

  const groupElements = () => {
    areaMap.clear();
    if (layout?.areas) {
      elements.forEach((element, index) => {
        const area = element.area || (layout.areas[0]?.[0] || 'main');
        if (!areaMap.has(area)) areaMap.set(area, []);
        areaMap.get(area).push({ ...element, originalIndex: index });
      });
    }
  };

  const processElement = (elementConfig, parentElement) => {
    let element;

    const isDraggable = elementConfig.draggable ?? draggable;

    if (elementConfig.type === 'container') {
      element = document.createElement(elementConfig.tag || 'div');
      Object.assign(element.style, elementConfig.styles || {});
      if (elementConfig.area) {
        element.style.gridArea = elementConfig.area;
      }

      if (elementConfig.children) {
        elementConfig.children.forEach(child => {
          processElement(child, element);
        });
      }
    } else {
      const elementId = elementConfig.id || `element-${Math.random().toString(36).substr(2, 9)}`;
      element = createDraggableElement(elementConfig, elementId, isDraggable);

      if (elementConfig.position) {
        setupElementPosition(element, elementConfig.position);
      }

      if (isDraggable) {
        applyPrototypeStyle(element, elementConfig.type || 'element');
        setupFreeDrag(element, isDraggable);
        element.style.setProperty('border', '1px dashed #ADFF2F', 'important');
        element.style.setProperty('background-color', 'transparent', 'important');
      }

      element.id = elementId; // Asignar ID real
    }

    parentElement.appendChild(element);
    return element;
  };

  const buildLayoutStructure = () => {
    layoutContainer.innerHTML = '';

    if (isSimpleLayout) {
      layoutContainer.style.display = 'flex';
      layoutContainer.style.flexDirection = 'column';

      elements.forEach(el => {
        processElement(el, layoutContainer);
      });
    } else {
      const gridStyles = layout
        ? {
            display: 'grid',
            gridTemplateColumns: Array.isArray(layout.columns)
              ? layout.columns.join(' ')
              : `repeat(${layout.columns || columns}, 1fr)`,
            gridTemplateRows: Array.isArray(layout.rows)
              ? layout.rows.join(' ')
              : layout.rows || 'auto',
            ...(layout.areas
              ? {
                  gridTemplateAreas: layout.areas.map(row => `"${row.join(' ')}"`).join(' '),
                }
              : {}),
            ...(layout.styles || {}),
          }
        : {
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: '8px',
          };

      Object.assign(layoutContainer.style, gridStyles);

      if (layout?.areas) {
        groupElements();

        const uniqueAreas = [...new Set(layout.areas.flat())];
        uniqueAreas.forEach(area => {
          const areaContainer = createInternalContainer(area, {
            role,
            containerClass,
            flex,
          });
          areaContainer.style.gridArea = area;

          const areaElements = areaMap.get(area) || [];
          areaElements.forEach(el => processElement(el, areaContainer));

          layoutContainer.appendChild(areaContainer);
        });
      } else {
        elements.forEach(el => {
          const element = processElement(el, layoutContainer);
          if (el.area) element.style.gridArea = el.area;
        });
      }
    }
  };

  buildLayoutStructure();

  layoutContainer.addElement = (elementConfig, parentSelector = null) => {
    const parent = parentSelector
      ? layoutContainer.querySelector(parentSelector)
      : layoutContainer;

    if (parent) {
      const elementId = `element-${Math.random().toString(36).substr(2, 9)}`;
      const elementWithId = { ...elementConfig, id: elementId };
      elements.push(elementWithId);
      buildLayoutStructure();
      return elementId;
    }
    return null;
  };

  layoutContainer.removeElement = (elementId) => {
    const index = elements.findIndex(el => el.id === elementId);
    if (index !== -1) {
      elements.splice(index, 1);
      buildLayoutStructure();
      return true;
    }
    return false;
  };

  layoutContainer.updateLayout = (newConfig) => {
    Object.assign(config, newConfig);
    buildLayoutStructure();
  };

  layoutContainer.getAreaMap = () => new Map(areaMap);
  layoutContainer.getElements = () => [...elements];
  layoutContainer.getContainer = () => layoutContainer;

  return layoutContainer;
}
