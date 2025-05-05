export const layoutSidebar = {
  role: 'sidebar',
  // Cambiamos a grid y definimos áreas
  layout: {
    areas: [
      ['header'],
      ['menu'],
      ['settings']
    ],
    rows: '60px 1fr auto', // Alturas de las filas
    columns: '280px' // Ancho fijo para sidebar
  },
  styles: {
    height: '100vh',
    backgroundColor: 'green'
  },
  elements: [
    {
      type: 'container',
      area: 'header', // Asignamos área
      styles: {
        backgroundColor: 'red',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      children: [
        {
          type: 'custom',
          content: 'logo.png',
          className: 'image-custom',
          styles: {
            height: '40px',
            width: '40px',
            backgroundColor: 'white'
          }
        }
      ]
    },
    {
      type: 'container',
      area: 'menu', // Asignamos área
      styles: {
        padding: '10px'
      },
      children: [
        {
          type: 'button',
          content: '☰ Menú',
          styles: {
            width: '100%',
            padding: '10px',
            backgroundColor: '#444',
            color: 'white',
            border: 'none',
            marginBottom: '5px'
          },
          onClick: () => console.log('Menú clickeado')
        }
      ]
    },
    {
      type: 'container',
      area: 'settings', // Asignamos área
      styles: {
        padding: '10px'
      },
      children: [
        {
          type: 'button',
          content: '⚙️ Configuración',
          styles: {
            width: '100%',
            padding: '10px',
            backgroundColor: '#444',
            color: 'white',
            border: 'none'
          },
          onClick: () => console.log('Configuración clickeada')
        }
      ]
    }
  ]
};