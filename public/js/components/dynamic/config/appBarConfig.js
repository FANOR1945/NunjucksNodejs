import { initLayout } from '../../../init/initLayout.js'

// Configuración
export const appBarConfig = {
  columns: 4,
  styles: {
    backgroundColor: 'linear-gradient(180deg, #241c34 0%, #3600b4 100%)',
    borderBottom: '1px solid #e0e0e0'
  },
  // dragable: false,
  elements: [
    // Columna 1 (2 elementos)
    {
      type: 'icon',
      content: '≡',
      className: 'material-icons',
      initialPosition: 1,
      position: 'left',
      styles: {
        fontSize: '24px',
        padding: '8px',
        cursor: 'pointer'
      }
    },
    {
      type: 'text',
      content: 'Menú',
      initialPosition: 1,
      position: { x: 40, y: 10 },
      styles: {
        fontWeight: 'bold'
      }
    },

    // // Columna 2 (1 elemento)
    {
      type: 'text',
      content: 'Búsqueda',
      initialPosition: 2,
      position: 'bottom',
      styles: {
        fontStyle: 'italic',
        color: '#666'
      }
    }

    // // Columna 3 (2 elementos)
    // {
    //   type: 'button',
    //   content: 'Notificaciones',
    //   initialPosition: 3,
    //   position: 'left top',
    //   styles: {
    //     backgroundColor: '#ffeb3b',
    //     border: 'none',
    //     borderRadius: '4px'
    //   }
    // },
    // {
    //   type: 'button',
    //   content: 'Perfil',
    //   initialPosition: 4,
    //   position: 'right bottom',
    //   styles: {
    //     backgroundColor: '#4caf50',
    //     color: 'white',
    //     border: 'none'
    //   }
    // },

    // // Columna 4 (1 elemento)
    // {
    //   type: 'custom',
    //   initialPosition: 5,
    //   position: 'right',
    //   render: () => {
    //     const div = document.createElement('div')
    //     div.innerHTML = `
    //       <svg width="24" height="24" viewBox="0 0 24 24">
    //         <circle cx="12" cy="12" r="10" fill="#2196f3"/>
    //         <text x="12" y="16" font-size="12" text-anchor="middle" fill="white">A</text>
    //       </svg>
    //     `
    //     return div
    //   }
    // },
    // {
    //   type: 'custom',
    //   initialPosition: 6,
    //   position: 'right',
    //   render: () => {
    //     const div = document.createElement('div')
    //     div.innerHTML = `
    //       <svg width="24" height="24" viewBox="0 0 24 24">
    //         <circle cx="12" cy="12" r="10" fill="#2196f3"/>
    //         <text x="12" y="16" font-size="12" text-anchor="middle" fill="white">A</text>
    //       </svg>
    //     `
    //     return div
    //   }
    // },
    // {
    //   type: 'custom',
    //   initialPosition: 7,
    //   position: 'right',
    //   render: () => {
    //     const div = document.createElement('div')
    //     div.innerHTML = `
    //       <svg width="24" height="24" viewBox="0 0 24 24">
    //         <circle cx="12" cy="12" r="10" fill="#2196f3"/>
    //         <text x="12" y="16" font-size="12" text-anchor="middle" fill="white">A</text>
    //       </svg>
    //     `
    //     return div
    //   }
    // },
    // {
    //   type: 'custom',
    //   initialPosition: 8,
    //   position: 'right',
    //   render: () => {
    //     const div = document.createElement('div')
    //     div.innerHTML = `
    //       <svg width="24" height="24" viewBox="0 0 24 24">
    //         <circle cx="12" cy="12" r="10" fill="#2196f3"/>
    //         <text x="12" y="16" font-size="12" text-anchor="middle" fill="white">A</text>
    //       </svg>
    //     `
    //     return div
    //   }
    // },
    // {
    //   type: 'custom',
    //   initialPosition: 9,
    //   position: 'right',
    //   render: () => {
    //     const div = document.createElement('div')
    //     div.innerHTML = `
    //       <svg width="24" height="24" viewBox="0 0 24 24">
    //         <circle cx="12" cy="12" r="10" fill="#2196f3"/>
    //         <text x="12" y="16" font-size="12" text-anchor="middle" fill="white">A</text>
    //       </svg>
    //     `
    //     return div
    //   }
    // },
    // {
    //   type: 'custom',
    //   initialPosition: 10,
    //   position: 'right',
    //   render: () => {
    //     const div = document.createElement('div')
    //     div.innerHTML = `
    //       <svg width="24" height="24" viewBox="0 0 24 24">
    //         <circle cx="12" cy="12" r="10" fill="#2196f3"/>
    //         <text x="12" y="16" font-size="12" text-anchor="middle" fill="white">A</text>
    //       </svg>
    //     `
    //     return div
    //   }
    // }
  ]
}
// Ejemplo 1: Usando ID
export const layoutContent = initLayout('main-content', {
  role: 'content',
  columns: 2,
  elements: [
    {
      type: 'text',
      content: 'Bienvenido al sistema',
      initialPosition: 0
    }
  ]
})

// Ejemplo 2: Usando clase

export const layoutSidebar = {
  role: 'sidebar',
  styles: {
    flexDirection: 'column',
    display: 'flex',

    height: '100vh'
  },
  draggable: false,
  elements: [
    {
      type: 'custom',
      content: 'logo.png',
      initialPosition: 0,
      flex: false,
      className: 'image-custom',
      styles: {
        top: 0,
        width: '100%',

        height: '20px',
        backgroundColor: 'red'
      }
    },
    {
      type: 'icon',
      content: '☰',
      initialPosition: 1,
      className: 'hamburger-icon',
      position: 'left',
      flex: 1,
      styles: {
        fontSize: '24px',

        cursor: 'pointer',
        marginLeft: 'auto',
        border: '1px solid green'
      },
      onClick: () => {
        console.log('hola homi')
      }
    },
    {
      type: 'icon',
      content: '☰',
      initialPosition: 2,
      className: 'hamburger-icon',
      flex: false,
      styles: {
        fontSize: '24px',
        cursor: 'pointer',
        marginLeft: 'auto'
      },
      onClick: () => {
        console.log('hola homi')
      }
    }
  ]
}

// Ejemplo 3: Usando elemento DOM directamente
const container = document.querySelector('.custom-layout-area')
const layout3 = initLayout(container, {
  role: 'custom',
  nestedContainers: false,
  styles: {
    backgroundColor: '#f0f0f0'
  }
})
