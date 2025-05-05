export const layoutPage = {
  role: 'page',
  
  layout: {
    type: 'grid',
    areas: [
      ['navbar', 'navbar'],
      ['sidebar', 'content'],
      ['sidebar', 'footer']
    ],
    columns: ['250px', '1fr'],
    rows: ['auto', '1fr', 'auto'],
    styles: {
    
    }
  },
  elements: [
    {
      type: 'container',
      area: 'navbar',
      tag: 'header',
      styles: {
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '15px',
        display: 'flex'
      },
      children: [
        { 
          type: 'text', 
          content: 'Mi Aplicación', 
          styles: { 
            fontSize: '1.5rem', 
            fontWeight: 'bold' 
          } 
        },
        { 
          type: 'button', 
          content: 'Menú', 
          styles: { 
            marginLeft: 'auto' 
          },
          action: (e) => {
            console.log('Botón Menú clickeado');
          }
        }
      ]
    },
    {
      type: 'container',
      area: 'sidebar',
      tag: 'aside',
      styles: {
        backgroundColor: '#34495e',
        
     
        overflowY: 'auto',
        display: 'flex',
        
        flexDirection: 'column',
        height: '100%' // Asegura que el sidebar ocupe toda la altura disponible
      },
      children: [
        // Contenedor principal para los botones de navegación
        {
          type: 'container',
          styles: {
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            flex: '1', // Ocupa todo el espacio disponible
            overflowY: 'auto' // Permite scroll si hay muchos elementos
          },
          children: [
            { 
              type: 'button', 
              content: 'Inicio', 
              styles: { 
                padding: '12px', 
                backgroundColor: 'transparent', 
                color: 'white', 
                border: 'none',
     
                textAlign: 'left',
                ':hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              } 
            },
            { 
              type: 'button', 
              content: 'Perfil', 
              styles: { 
                padding: '12px', 
                backgroundColor: 'transparent', 
                color: 'white', 
                border: 'none',
              
                textAlign: 'left',
                ':hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              } 
            }
            // Puedes añadir más botones aquí
          ]
        },
        // Contenedor para el botón de configuración (se mantiene abajo)
        {
          type: 'container',
          styles: {
            backgroundColor: '#1a2634',
            color: 'white',
            padding: '10px',
            borderTop: '1px solid #34495e',
            display: 'flex',
            justifyContent: 'flex-start',
            flexShrink: '0' // Evita que se reduzca
          },
          children: [
            { 
              type: 'button', 
              content: '⚙️ Configuración', 
              styles: { 
                background: 'none', 
                border: 'none', 
                color: 'white',
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                borderRadius: '4px',
                ':hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              },
              action: () => {
                console.log('Configuración clickeada');
                // Lógica para mostrar opciones de configuración
              }
            }
          ]
        }
      ]
    },
    {
      area: 'content',
      type: 'container',
      tag: 'main',
      styles: {
        backgroundColor: '#1a2634',
        overflowY: 'auto',
        padding: '20px',
        height:'100%'
      },
      children: [
        { type: 'text', content: 'Bienvenido al Dashboard', styles: { fontSize: '2rem' } },
        {
          type: 'custom',
          render: () => {
            const card = document.createElement('div');
            card.innerHTML = `<div style="background: blue; border-radius: 8px; padding: 20px;">Tarjeta de Ejemplo</div>`;
            return card;
          }
        }
      ]
    },
    {
      type: 'container',
      area: 'footer',
      tag: 'footer',
      styles: {
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '15px',
        textAlign: 'center'
      },
      children: [
        { 
          type: 'text', 
          content: '© 2023 Mi Aplicación', 
          styles: { 
            fontSize: '1.5rem' 
          } 
        }
      ]
    }
  ]
};