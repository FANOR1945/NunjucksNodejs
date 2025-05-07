const Input= {
    create: (config) => {
      const input = document.createElement('input');
      input.type = config.inputType || 'text';
      input.placeholder = config.placeholder || '';
      Object.assign(input.style, {
        flex: '1 1 auto',
        padding: '10px',
        fontSize: '1rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
        margin: '0 0 1rem 0',
        ...config.styles
      });
      config.onInput && input.addEventListener('input', config.onInput);
      return input;
    }
  };
  
  export default Input
  