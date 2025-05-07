const ICON_SVGS = {
    login: `<path d="M10 17l5-5-5-5v3H0v4h10v3zm9-14H5c-1.1 0-2 .9-2 2v4h2V5h14v14H5v-6H3v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>`,
    user: `<path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>`
  };
  
  const Icon= {
    create: (config) => {
      const wrapper = document.createElement('span');
      Object.assign(wrapper.style, {
        display: 'inline-block',
        width: config.size || '24px',
        height: config.size || '24px',
        ...config.styles
      });
  
      const svgNS = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '100%');
  
      const pathData = ICON_SVGS[config.name];
      const path = document.createElementNS(svgNS, 'path');
      if (!pathData) {
        console.warn(`ICON: no existe el icono "${config.name}"`);
      } else {
        path.setAttribute('d', pathData.match(/d="([^"]+)"/)?.[1] || '');
      }
      path.setAttribute('fill', 'currentColor');
  
      svg.appendChild(path);
      wrapper.appendChild(svg);
      return wrapper;
    }
  };
  
  export default Icon
  