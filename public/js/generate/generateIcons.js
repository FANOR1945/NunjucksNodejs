// src/layouts/layoutPage/sidebarHelpers/generateIcons.js
export const generateIcon = (title) => {
    if (!title) return '•';
    
    const iconMap = {
      dashboard: '🏠', inicio: '🏠', home: '🏠',
      usuarios: '👥', users: '👥',
      productos: '📦', products: '📦',
      ajustes: '⚙️', settings: '⚙️',
      perfil: '👤', profile: '👤',
      reportes: '📊', reports: '📊',
      ventas: '💰', sales: '💰',
      especialidades: '🏥', specialties: '🏥',
      dental: '🦷',
      medical: '💉',
      radiología: '📡', radiology: '📡',
      sobre: '📝', about: '📝',
      login: '🔐',
      register: '📋',
      configuración: '⚙️'
    };
    
    return iconMap[title.toLowerCase()] || '🔹';
  };