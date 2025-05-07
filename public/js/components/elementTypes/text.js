 const Text= {
    create: (config) => {
      const element = document.createElement('div');
      element.textContent = config.content || '';
      Object.assign(element.style, {
        fontFamily: 'monospace',
        whiteSpace: 'pre',
        padding: '8px',
        ...config.styles
      });
      return element;
    },
    prototypeStyle: {
      border: '1px dashed #4CAF50',
      backgroundColor: 'rgba(76, 175, 80, 0.1)'
    }
  }

  export default Text