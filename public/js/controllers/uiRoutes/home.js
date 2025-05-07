export default function home() {
  return {
    type: 'container',
    children: [
      {
        type: 'json',
        data: null,
        styles: {
         
          marginBottom: '1rem'
        },
        apiConfig: {
          endpoint: '/api/routes',
          refreshInterval: 30000
        }
      },
      {
        type: 'button',
        label: 'Actualizar Rutas API',
        styles: {
          backgroundColor: '#4CAF50'
        },
        onClick: async function() {
          const jsonElement = this.parentElement.querySelector('[data-type="json"]');
          try {
            const response = await fetch(jsonElement.apiConfig.endpoint);
            jsonElement.data = await response.json();
            jsonElement.updateContent();
          } catch (error) {
            jsonElement.data = { error: "No se pudo cargar las rutas API" };
            jsonElement.updateContent();
          }
        }
      },
    ]
  };
}
