 // En tu elementTypes.js (JSON type)
  const Json ={
    create: (config) => {
    const element = document.createElement('pre');
    element.dataset.type = 'json';
    
    // Guardar configuración API en el elemento
    if (config.apiConfig) {
      element.apiConfig = config.apiConfig;
    }
    
    // Método para actualizar contenido
    element.updateContent = () => {
      element.textContent = JSON.stringify(element.data || config.data || {}, null, 2);
    };
    
    // Cargar datos iniciales
    const loadData = async () => {
      if (config.apiConfig) {
        try {
          const response = await fetch(config.apiConfig.endpoint);
          element.data = await response.json();
        } catch (error) {
          element.data = { error: error.message };
        }
        element.updateContent();
        
        // Actualizar periódicamente si está configurado
        if (config.apiConfig.refreshInterval) {
          setInterval(loadData, config.apiConfig.refreshInterval);
        }
      } else {
        element.data = config.data;
        element.updateContent();
      }
    };
    
    loadData();
    
    Object.assign(element.style, {
      fontFamily: 'monospace',
      backgroundColor: 'greenYellow',
      padding: '10px',
      borderRadius: '4px',
      overflow: 'auto',
      margin: '0',
      ...config.styles
    });
    
    return element;
  }
  }

  export default Json