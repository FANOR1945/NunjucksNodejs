// src/layouts/layoutPage/sidebarHelpers/buildNestedMenu.js
import { debugLog } from '../debug.js';
import { generateIcon } from '../generate/generateIcons.js'

export const buildNestedMenu = (items, onRouteClick, currentPath, level = 0) => {
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