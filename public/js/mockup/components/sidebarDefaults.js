// src/layouts/layoutPage/sidebarDefaults.js
export const defaultSidebarItems = [
    { 
      path: '/home', 
      title: 'Inicio',
      icon: '🏠',
      children: [
        {
          path: '/specialties',
          title: 'Especialidades',
          icon: '🏥',
          children: [
            { 
              path: '/dental', 
              title: 'Dental',
              icon: '🦷'
            },
            { 
              path: '/medical', 
              title: 'Medical',
              icon: '💉',
              children: [
                { 
                  path: '/radiology', 
                  title: 'Radiología',
                  icon: '📡'
                }
              ]
            }
          ]
        }
      ]
    },
    { 
      path: '/about', 
      title: 'Sobre Nosotros',
      icon: '📝'
    },
    {
      path: '/login',
      title: 'Iniciar Sesión',
      icon: '🔐',
      private: false
    },
    {
      path: '/register',
      title: 'Registrarse',
      icon: '📋',
      private: false
    }
  ];