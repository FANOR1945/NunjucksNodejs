// Navbar con elementos
export const layoutAppBar = {
    role: 'appbar',
    styles:{
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '15px'
    },
    elements: [
      { 
        type: 'text', 
        content: 'Mi Aplicación',
        initialPosition: 1,
        styles: { 
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginLeft: '10px'
        }
      },
      {
        type: 'button',
        content: 'Menú',
        initialPosition: 1,
        styles: {
          marginLeft: 'auto',
          marginRight: '10px'
        }
      },
      {
        type: 'button',
        content: 'Menú',
        initialPosition: 2,
        styles: {
          marginLeft: 'auto',
          marginRight: '10px'
        }
      }
    ]
  };