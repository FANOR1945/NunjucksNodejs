// src/layouts/layoutPage/sidebarConfig.js
import { debugLog } from '../../debug.js';
import { defaultSidebarItems } from '../../mockup/components/sidebarDefaults.js';
import { buildNestedMenu } from '../../build/buildNestedMenu.js';

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
          flex: 1,
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