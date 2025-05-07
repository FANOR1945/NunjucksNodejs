export const navbarElement = {
  type: 'container',
  area: 'navbar',
  tag: 'header',
  styles: {
    position: 'sticky',
    top: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 2rem',
    height: '4rem',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
    zIndex: '1000',
    transition: 'all 0.3s ease'
  },
  children: [
    { 
      type: 'container',
      styles: {
        display: 'flex',
        alignItems: 'center',
        gap: '2rem'
      },
      children: [
        { 
          type: 'text', 
          content: 'MiAplicación', 
          styles: { 
            fontSize: '1.5rem', 
            fontWeight: '700',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.5px'
          } 
        },
        {
          type: 'container',
          styles: {
            display: 'flex',
            gap: '1.5rem'
          },
          children: [
            {
              type: 'link',
              content: 'Inicio',
              href: '#',
              styles: {
                color: '#4a5568',
                fontWeight: '500',
                transition: 'color 0.2s',
                ':hover': {
                  color: '#667eea'
                }
              }
            },
            {
              type: 'link',
              content: 'Productos',
              href: '#',
              styles: {
                color: '#4a5568',
                fontWeight: '500',
                transition: 'color 0.2s',
                ':hover': {
                  color: '#667eea'
                }
              }
            },
            {
              type: 'link',
              content: 'Contacto',
              href: '#',
              styles: {
                color: '#4a5568',
                fontWeight: '500',
                transition: 'color 0.2s',
                ':hover': {
                  color: '#667eea'
                }
              }
            }
          ]
        }
      ]
    },
    { 
      type: 'container',
      styles: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      },
      children: [
        { 
          type: 'button', 
          content: 'Menú',
          styles: { 
            padding: '0.5rem 1.25rem',
            backgroundColor: 'transparent',
            color: '#667eea',
            border: '1px solid #667eea',
            borderRadius: '0.375rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s',
            ':hover': {
              backgroundColor: '#667eea',
              color: 'white',
              transform: 'translateY(-1px)'
            },
            ':active': {
              transform: 'translateY(0)'
            }
          },
          onClick: (e) => {
            console.log('Menú desplegable activado', e);
            // Aquí podrías añadir lógica para mostrar/ocultar un menú
          }
        },
        {
          type: 'avatar',
          image: 'https://randomuser.me/api/portraits/men/1.jpg',
          size: '2.5rem',
          styles: {
            borderRadius: '50%',
            border: '2px solid #edf2f7',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            ':hover': {
              transform: 'scale(1.05)'
            }
          }
        }
      ]
    }
  ]
};