export default function loginController() {
    return {
      type: 'card',
      styles: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',         // que llene todo el ancho interno
        width: '400px',                // MÁS ancho
        maxWidth: '90%',               // responsivo
        margin: '5rem auto',           // más espacio arriba
        padding: '2.5rem',             // más padding
        backgroundColor: '#f7f9fa',    // fondo muy claro
        borderRadius: '4px',           // menos redondeo
        border: '1px solid #ddd',      // borde ligero
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'  // sombra más suave
      },
      children: [
        {
          type: 'logo',
          src: '/assets/logo.png',
          alt: 'MiApp',
          styles: {
            width: '64px',
            height: '64px',
            margin: '0 auto 1.5rem'
          }
        },
        {
          type: 'text',
          content: 'Bienvenido de nuevo',
          styles: {
            fontSize: '1.75rem',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '2rem',
            color: '#222'
          }
        },
        {
          type: 'input',
          inputType: 'email',
          placeholder: 'Correo electrónico',
          styles: {
            marginBottom: '1rem',
            padding: '1rem',
            fontSize: '1rem'
          }
        },
        {
          type: 'input',
          inputType: 'password',
          placeholder: 'Contraseña',
          styles: {
            marginBottom: '1.5rem',
            padding: '1rem',
            fontSize: '1rem'
          }
        },
        {
          type: 'icon',
          name: 'login',
          size: '36px',
          styles: {
            color: '#4CAF50',
            margin: '0 auto 1rem'
          }
        },
        {
          type: 'button',
          label: 'Ingresar',
          styles: {
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#4CAF50',
            color: '#fff',
            borderRadius: '4px',
            alignSelf: 'center',
            minWidth: '160px'            // ancho mínimo
          },
          onClick: () => {
            alert('¡Login enviado!');
          }
        }
      ]
    };
  }
  