
const Html= {
    create: (config) => {
      const element = document.createElement('div');
      element.innerHTML = config.content || '';
      Object.assign(element.style, {
        padding: '10px',
        ...config.styles
      });
      return element;
    },
    prototypeStyle: {
      border: '1px dashed #607D8B',
      backgroundColor: 'rgba(96, 125, 139, 0.1)'
    }
  }
  export default Html