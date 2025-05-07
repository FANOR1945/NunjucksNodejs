
const Button= {
    create: (config) => {
      const button = document.createElement('button');
      button.textContent = config.label || 'Click';
      Object.assign(button.style, {
        padding: '10px 16px',
        backgroundColor: '#6200EE',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        ...config.styles
      });

      if (config.onClick && typeof config.onClick === 'function') {
        button.addEventListener('click', config.onClick);
      }

      return button;
    },
    prototypeStyle: {
      border: '1px dashed #E91E63',
      backgroundColor: 'rgba(233, 30, 99, 0.1)'
    }
  }
  export default Button