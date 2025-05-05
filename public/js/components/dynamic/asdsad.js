import { createRoleBaseStyles } from '../../styles/baseStyles.js'
import { setupContainerDrag } from './config/setupContainerDraggable.js'

export function DynamicLayout(config = {}) {
  // Configuración con valores por defecto
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

  // ======================
  // 2. CREACIÓN DEL LAYOUT PRINCIPAL
  // ======================
  const layoutContainer = document.createElement('div');
  layoutContainer.className = `dynamic-layout ${role} ${containerClass}`;
  layoutContainer.dataset.role = role;

  // Aplicar estilos base según el rol
  const baseStyles = createRoleBaseStyles(role, styles);
  
  // Estilos condicionales basados en si hay un layout definido
  const layoutStyles = layout ? {
    display: 'grid',
    gridTemplateColumns: layout.columns.join(' '),
    gridTemplateRows: layout.rows.join(' '),
    gridTemplateAreas: layout.areas.map(row => `"${row.join(' ')}"`).join(' ')
  } : {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: '8px'
  };

  // Combinar todos los estilos
  Object.assign(layoutContainer.style, {
    border: draggable ? '1px dashed #ccc' : 'none',
    // boxSizing: 'border-box',
    ...baseStyles,
    ...layoutStyles,
    ...styles
  });

  // ======================
  // 3. SISTEMA DE ORGANIZACIÓN DE ELEMENTOS
  // ======================
  const positionMap = new Map();

  // Función para agrupar elementos - difiere según si hay layout
  const groupElements = () => {
    positionMap.clear();
    
    elements.forEach((element, index) => {
      // Si hay layout definido, agrupar por área
      if (layout) {
        const area = element.area || layout.areas[0][0]; // Usar primera área como default
        if (!positionMap.has(area)) positionMap.set(area, []);
        positionMap.get(area).push({ ...element, originalIndex: index });
      } 
      // Si no hay layout, agrupar por posición
      else {
        const pos = element.initialPosition !== undefined ? element.initialPosition : 0;
        if (!positionMap.has(pos)) positionMap.set(pos, []);
        positionMap.get(pos).push({ ...element, originalIndex: index });
      }
    });
  };

  // Función para crear estructura - difiere según si hay layout
  const createLayoutStructure = () => {
    while (layoutContainer.firstChild) {
      layoutContainer.removeChild(layoutContainer.firstChild);
    }

    if (layout) {
      // Crear estructura basada en áreas del layout
      layout.areas.forEach(row => {
        row.forEach(area => {
          const elementsInArea = positionMap.get(area) || [];
          const container = createContainerElement(area, {
            nested: nestedContainers,
            role,
            containerClass,
            isRootContainer,
            draggable,
            flex: elementsInArea.find(el => el.flex !== undefined)?.flex,
            gridArea: area // Asegurar que el área se aplica
          });

          elementsInArea.forEach(element => {
            const elementNode = createDraggableElement(element, element.originalIndex, draggable);
            container.appendChild(elementNode);
            setupElementPosition(elementNode, element.position);
          });

          layoutContainer.appendChild(container);
        });
      });
    } else {
      // Crear estructura basada en columnas
      Array.from(positionMap.keys())
        .sort((a, b) => a - b)
        .forEach(pos => {
          const elementsInPosition = positionMap.get(pos);
          const containerFlex = elementsInPosition.find(el => el.flex !== undefined)?.flex;

          const container = createContainerElement(pos, {
            nested: nestedContainers,
            role,
            containerClass,
            isRootContainer,
            draggable,
            flex: containerFlex
          });

          positionMap.get(pos).forEach(element => {
            const elementNode = createDraggableElement(element, element.originalIndex, draggable);
            container.appendChild(elementNode);
            setupElementPosition(elementNode, element.position);
          });

          layoutContainer.appendChild(container);
        });

      // Ajustar columnas visibles solo para el modo no-layout
      const visibleColumns = Math.min(columns, positionMap.size);
      layoutContainer.style.gridTemplateColumns = `repeat(${visibleColumns}, 1fr)`;
    }
  };

  // Inicializar estructura
  groupElements();
  createLayoutStructure();

  // ======================
  // 4. API PÚBLICA (igual que antes)
  // ======================
  layoutContainer.addElement = elementConfig => {
    const newIndex = elements.length;
    elements.push(elementConfig);
    groupElements();
    createLayoutStructure();
    return `element-${newIndex}`;
  };

  layoutContainer.removeElement = elementId => {
    const index = elements.findIndex((_, i) => `element-${i}` === elementId);
    if (index !== -1) {
      elements.splice(index, 1);
      groupElements();
      createLayoutStructure();
      return true;
    }
    return false;
  };

  layoutContainer.updateLayout = newConfig => {
    Object.assign(config, newConfig);
    groupElements();
    createLayoutStructure();
  };

  layoutContainer.getElements = () => [...elements];
  layoutContainer.getContainer = () => layoutContainer;

  return layoutContainer;
}


// ======================
// FUNCIONES AUXILIARES
// ======================

function createContainerElement(index, options = {}) {
  const {
    nested = true,
    role = '',
    isRootContainer = false,
    containerClass = '',
    draggable = false,
    flex,
    children = [] // <--- Ahora sí lo tomamos de una vez
  } = options

  const container = document.createElement('div')
  container.className = `layout-container ${containerClass}`
  container.dataset.index = index
  container.dataset.role = role
  container.dataset.draggable = draggable

  // Estilos base del contenedor
  const baseStyles = {
    position: 'relative',
    display: 'flex',
    margin: '5px',
    flexDirection: 'column',
    flex: flex,
    justifyContent: 'flex-start',
    minHeight: isRootContainer,
    padding: '12px',
    borderRadius: '4px',
    transition: 'all 0.3s ease',
    overflow: 'visible',
    backgroundColor: 'rgba(255,255,255,0.1)',
    border: draggable ? '1px dashed #999' : 'none',
    cursor: draggable ? 'move' : 'default'
  }

  Object.assign(container.style, baseStyles)

  // Badge identificador
  const badge = document.createElement('div')
  badge.textContent = `Pos ${index}`
  badge.style.position = 'absolute'
  badge.style.top = '4px'
  badge.style.right = '4px'
  badge.style.fontSize = '10px'
  badge.style.padding = '2px 6px'
  badge.style.backgroundColor = role === 'footer' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.05)'
  badge.style.borderRadius = '8px'
  badge.style.cursor = draggable ? 'grab' : 'default'

  container.appendChild(badge)

  // Si es draggable, le seteamos los eventos
  if (draggable) {
    setupContainerDrag(container, badge)
  }

  // Permitir anidamiento (doble clic crea sub contenedor)
  if (nested) {
    container.addEventListener('dblclick', (e) => {
      if (e.target === container) {
        const subContainer = createContainerElement(0, {
          nested: true,
          role,
          containerClass: 'nested-container',
          isRootContainer: false,
          flex: false
        })
        container.appendChild(subContainer)
      }
    })
  }

  // Agregar los hijos si vienen en options
  if (children && Array.isArray(children)) {
    children.forEach((child, childIndex) => {
      const childNode = createDraggableElement(child, `${index}-${childIndex}`, true)
      container.appendChild(childNode)
    })
  }

  return container
}

function createDraggableElement(config, id, draggable = false) {
  const element = document.createElement('div');
  element.id = `element-${id}`;
  element.className = `layout-element ${config.className || ''}`;
  element.dataset.type = config.type;

  // Estilo base para children (color verdeYellow)
  const baseStyles = {
    position: 'relative',
    cursor: draggable ? 'grab' : 'default',
    userSelect: 'none',
    transition: 'all 0.3s ease',
    zIndex: '1',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    flex: config.flex ? '1' : '0 1 auto',
    minHeight: 'min-content',
    backgroundColor: draggable ? 'transparent' : '', // Sin fondo cuando es draggable
    border: draggable ? '1px dashed #ADFF2F' : '', // Solo borde dashed
    ...config.styles
  };
  Object.assign(element.style, baseStyles);

  // Contenido del elemento
  switch (config.type) {
    case 'text':
      element.textContent = config.content;
      break;
    case 'button':
      const button = document.createElement('button');
      button.textContent = config.content;
      if (config.action) button.addEventListener('click', config.action);
      element.appendChild(button);
      break;
    case 'icon':
      const icon = document.createElement('i');
      icon.className = config.className || '';
      icon.textContent = config.content || '';
      if (config.action) icon.addEventListener('click', config.action);
      element.appendChild(icon);
      break;
    case 'custom':
      if (config.render) element.appendChild(config.render());
      break;
  }

  // Procesar children
  if (Array.isArray(config.children)) {
    config.children.forEach((child, index) => {
      const childElement = createDraggableElement(child, `${id}-${index}`, draggable);
      element.appendChild(childElement);
    });
  }

  if (draggable) {
    element.addEventListener('mousedown', () => {
      // Resaltar durante interacción (solo color amarillo para el borde y el fondo transparente)
      element.style.backgroundColor = 'transparent'; // Sin fondo
      element.style.border = '2px dashed #ADFF2F'; // Borde más grueso durante el arrastre
    });

    element.addEventListener('mouseup', () => {
      element.style.backgroundColor = 'transparent'; // Sin fondo
      element.style.border = '1px dashed #ADFF2F'; // Restaurar borde original
    });

    element.addEventListener('mouseleave', () => {
      element.style.backgroundColor = 'transparent'; // Sin fondo
      element.style.border = '1px dashed #ADFF2F'; // Restaurar borde original
    });

    setupFreeDrag(element);
  }

  return element;
}


function setupElementPosition (element, position = 'center') {
  // Resetear estilos primero
  element.style.left = ''
  element.style.right = ''
  element.style.top = ''
  element.style.bottom = ''
  element.style.transform = ''
  element.style.margin = ''

  // Si es string (posición predefinida)
  if (typeof position === 'string') {
    const positions = position.split(' ') // Soporta combinaciones como "left top"

    positions.forEach(pos => {
      switch (pos) {
        case 'left':
          element.style.left = '8px'
          element.style.right = 'auto'
          break
        case 'right':
          element.style.right = '8px'
          element.style.left = 'auto'
          break
        case 'center':
          element.style.left = '50%'
          element.style.right = 'auto'
          element.style.transform = 'translateX(-50%)'
          break
        case 'top':
          element.style.top = '8px'
          element.style.bottom = 'auto'
          break
        case 'bottom':
          element.style.bottom = '8px'
          element.style.top = 'auto'
          break
        case 'middle':
          element.style.top = '50%'
          element.style.bottom = 'auto'
          element.style.transform =
            (element.style.transform || '') + ' translateY(-50%)'
          break
      }
    })
  }
  // Si es objeto (coordenadas exactas)
  else if (typeof position === 'object') {
    if (position.x !== undefined) {
      element.style.left = `${position.x}px`
      element.style.right = 'auto'
    }
    if (position.y !== undefined) {
      element.style.top = `${position.y}px`
      element.style.bottom = 'auto'
    }
  }
}

function setupFreeDrag(element) {
  let offsetX, offsetY;

  element.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    e.preventDefault();

    const rect = element.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    element.style.position = 'fixed';
    element.style.zIndex = '1000';
    element.style.pointerEvents = 'none';
    element.style.left = `${e.clientX - offsetX}px`;
    element.style.top = `${e.clientY - offsetY}px`;

    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
  });

  function drag(e) {
    element.style.left = `${e.clientX - offsetX}px`;
    element.style.top = `${e.clientY - offsetY}px`;
  }

  function stopDrag(e) {
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);

    element.style.position = 'absolute';
    element.style.zIndex = '';
    element.style.pointerEvents = '';

    // Lógica simple de colocación
    const elements = document.elementsFromPoint(e.clientX, e.clientY);
    const dropTarget = elements.find(el => el.classList.contains('layout-container'));
    
    if (dropTarget) {
      dropTarget.appendChild(element);
    }
  }
}