const Logo = {
    create: (config) => {
      const logo = document.createElement('img');
      logo.src = config.src || '';
      logo.alt = config.alt || 'logo';
      Object.assign(logo.style, {
        maxWidth: '150px',
        height: 'auto',
        display: 'block',
        margin: '0 auto',
        ...config.styles
      });
  
      return logo;
    }
  };
  
  export default Logo;
  