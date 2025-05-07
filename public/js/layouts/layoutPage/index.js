import { navbarElement } from './navbarConfig.js';
import { createSidebar } from './sidebarConfig.js';
import { createContent } from './contentConfig.js';
import { footerElement } from './footerConfig.js';

export const createLayoutPage = (routes, routeHandler, currentPath) => {


  return {
    role: 'page',
    layout: {
      type: 'grid',
      areas: [
        ['navbar', 'navbar'],
        ['sidebar', 'content'],
        ['sidebar', 'footer']
      ],
      columns: ['250px', '1fr'],
      rows: ['auto', '1fr', 'auto'],
      styles: {
        height: '100vh',
        margin:'0px',
        padding:'0px',
        gridGap: '0px',
        border: '1px solid white'
      }
    },
    elements: [
      navbarElement,
      createSidebar(routes, routeHandler, currentPath),
      createContent(routes, routeHandler,currentPath),
      footerElement
    ]
  };
};
