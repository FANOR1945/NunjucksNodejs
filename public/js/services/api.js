export async function fetchRoutes() {
  try {
    const apiUrl = new URL('/api/routes', window.location.origin);
    const response = await fetch(apiUrl, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    
    if (!Array.isArray(data)) {
      console.warn('La respuesta no es un array:', data);
      return getFallbackRoutes();
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching routes:', error);
    return getFallbackRoutes();
  }
}

function getFallbackRoutes() {
  return [
    {
      path: '/',
      view: 'home',
      private: false,
      title: 'Inicio'
    },
    {
      path: '/error',
      view: 'error',
      private: false,
      title: 'Error de conexión'
    }
  ];
}