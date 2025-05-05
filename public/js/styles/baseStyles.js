// ======================
// 1. ESTILOS BASE SEGÚN ROL
// ======================
export const createRoleBaseStyles = (role = 'content', styles = {}) => {
  const baseStyles = {
    appbar: {
      position: 'sticky',
      top: '0',
      zIndex: '1000',
      minHeight: '64px',
      gridAutoRows: 'minmax(64px, auto)',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    sidebar: {
      position: 'fixed',
      right: '0',
      top: '0',
      height: '100vh',
      zIndex:2500,
      
      gridTemplateColumns: '1fr',
      gridAutoRows: 'minmax(50px, auto)',
      backgroundColor: 'blue',
      borderLeft: '1px solid #e0e0e0',
      overflowY: 'auto',
      flexDirection: 'column',
      display: 'flex'
    },
    content: {
      backgroundColor: '#f5f5f5',
      padding: '16px',
      minHeight: '200px'
    },
    footer: {
      position: 'fixed',
      bottom: '0',
      width: '100%',
      minHeight: '60px',
      gridAutoRows: 'minmax(60px, auto)',
      backgroundColor: '#2c3e50',
      color: 'white'
    },
    page: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridAutoRows: 'minmax(50px, auto)',
      padding: '10px',
      backgroundColor: 'green',
      minHeight: '100vh',
      boxSizing: 'border-box',
    },
    
    custom: {}
  }

  return {
    ...baseStyles[role],
    ...(styles || {})
  }
}
