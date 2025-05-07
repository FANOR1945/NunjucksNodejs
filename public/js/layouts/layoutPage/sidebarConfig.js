// src/layouts/layoutPage/sidebarConfig.js
import { debugLog } from '../../debug.js';
import { defaultSidebarItems } from '../../mockup/components/sidebarDefaults.js';

const generateIcon = (title) => {
  if (!title) return '•';
  
  const iconMap = {
    dashboard: '🏠', inicio: '🏠', home: '🏠',
    usuarios: '👥', users: '👥',
    productos: '📦', products: '📦',
    ajustes: '⚙️', settings: '⚙️',
    perfil: '👤', profile: '👤',
    reportes: '📊', reports: '📊',
    ventas: '💰', sales: '💰',
    especialidades: '🏥', specialties: '🏥',
    dental: '🦷',
    medical: '💉',
    radiología: '📡', radiology: '📡',
    sobre: '📝', about: '📝',
    login: '🔐',
    register: '📋',
    configuración: '⚙️'
  };
  
  return iconMap[title.toLowerCase()] || '🔹';
};

const buildNestedMenu = (items, onRouteClick, currentPath, level = 0) => {
  return items
    .filter(item => !item.private)
    .map(item => {
      const isActive = currentPath === item.path;
      const hasChildren = item.children && item.children.length > 0;
      
      const buttonItem = {
        type: 'button',
        label: `${item.icon || generateIcon(item.title)} ${item.title}`,
        styles: {
          background: isActive ? 'rgba(255,255,255,0.2)' : 'none',
          border: 'none',
          color: 'white',
          fontSize: level > 0 ? '0.9rem' : '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 12px',
          borderRadius: '4px',
          marginBottom: '4px',
          cursor: 'pointer',
          textAlign: 'left',
          ':hover': { 
            backgroundColor: 'rgba(255,255,255,0.1)',
            transition: 'background-color 0.2s ease'
          },
          marginLeft: `${level * 12}px`,
          fontWeight: isActive ? 'bold' : 'normal',
          transition: 'all 0.2s ease'
        },
        onClick: () => {
          if (!isActive) {
            debugLog(`Navegando a: ${item.path}`);
            onRouteClick?.(item.path);
          }
        }
      };

      if (!hasChildren) return buttonItem;

      return {
        type: 'container',
        styles: {
          display: 'flex',
          flexDirection: 'column'
        },
        children: [
          buttonItem,
          ...buildNestedMenu(item.children, onRouteClick, currentPath, level + 1)
        ]
      };
    });
};

export const createSidebar = (menuItems = [], onRouteClick, currentPath = '/') => {
  const itemsToUse = menuItems.length ? menuItems : defaultSidebarItems;

  return {
    area: 'sidebar',
    type: 'container',
    tag: 'aside',
    styles: {
      backgroundColor: '#34495e',
      color: 'white',
      overflowY: 'auto',
      padding: '10px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    children: [
      {
        type: 'container',
        styles: {
          backgroundColor: '#2c3e50',
          color: 'white',
          padding: '10px 0',
          display: 'flex',
          flex:1,
        
          flexDirection: 'column',
          flexShrink: '0'
        },
        children: buildNestedMenu(itemsToUse, onRouteClick, currentPath)
      },
      {
        type: 'container',
        styles: {
          backgroundColor: '#1a2634',
          color: 'white',
          padding: '10px',
          borderTop: '1px solid #34495e',
          flexShrink: '0'
        },
        children: [
          { 
            type: 'button', 
            label: '⚙️ Configuración',
            styles: {
              background: currentPath === '/settings' ? 'rgba(255,255,255,0.2)' : 'none',
              border: 'none',
              color: 'white',
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 12px',
              borderRadius: '4px',
              width: '100%',
              textAlign: 'left',
              ':hover': {
                backgroundColor: 'rgba(255,255,255,0.1)'
              }
            },
            onClick: () => {
              if (currentPath !== '/settings') {
                debugLog('Configuración clickeada');
                onRouteClick?.('/settings');
              }
            }
          }
        ]
      }
    ]
  };
};