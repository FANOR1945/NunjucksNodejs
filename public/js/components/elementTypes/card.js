import { getElementType } from "./index.js";

const Card= { create: (config) => {
    const card = document.createElement('div');
    Object.assign(card.style, {
      display: 'flex',                  /* flex container */  
      flexDirection: 'column',          /* hijos en columna */  
      alignItems: 'stretch',            /* estirar hijos al ancho */  
      backgroundColor: '#2c3e50',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      padding: '16px',
      margin: '10px 0',
      color: '#ecf0f1',
      ...config.styles
    });

    config.children?.forEach(child => {
      const elementType = getElementType(child.type);
      const element = elementType.create(child);
      card.appendChild(element);
    });

    return card;
  }

}
  export default Card;
  