// Content.js
import { getElementType } from "./index.js";

const Container = {
  create: (config) => {
    const content = document.createElement('div');
    Object.assign(content.style, {
      display: 'flex',
      flexDirection: 'column',
     
      backgroundColor: '#ecf0f1',  // Color de fondo más claro
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',  // Sombra suave
      padding: '16px',
      margin: '10px 0',
      color: '#2c3e50',  // Color de texto más oscuro
      ...config.styles
    });

    // Agregar los elementos hijos si existen
    config.children?.forEach(child => {
      const elementType = getElementType(child.type);
      const element = elementType.create(child);
      content.appendChild(element);
    });

    return container;
  },

  prototypeStyle: {
    border: '1px dashed #795548',
    backgroundColor: 'rgba(121, 85, 72, 0.1)'
  }
};

export default Container;
