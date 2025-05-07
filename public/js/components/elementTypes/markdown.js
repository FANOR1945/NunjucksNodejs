import { marked } from 'marked'; // Necesitarás instalar esta dependencia
const Markdown={
    create: (config) => {
      const element = document.createElement('div');
      element.innerHTML = marked.parse(config.content || '');
      Object.assign(element.style, {
        fontFamily: 'Arial, sans-serif',
        lineHeight: '1.6',
        padding: '12px',
        ...config.styles
      });
      return element;
    },
    prototypeStyle: {
      border: '1px dashed #FF9800',
      backgroundColor: 'rgba(255, 152, 0, 0.1)'
    }
  }

  export default Markdown