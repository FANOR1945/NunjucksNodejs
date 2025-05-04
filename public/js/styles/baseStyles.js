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
      width: '280px',
      gridTemplateColumns: '1fr',
      gridAutoRows: 'minmax(50px, auto)',
      backgroundColor: 'blue',
      borderLeft: '1px solid #e0e0e0',
      overflowY: 'auto',
      flexDirection: 'column',
      display: 'flex'
    },
    content: {
      flex: '1',
      padding: '20px',
      gridAutoRows: 'minmax(100px, auto)',
      overflow: 'auto',
      backgroundColor: '#f5f5f5'
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
    custom: {}
  }

  return {
    ...baseStyles[role],
    ...(styles || {})
  }
}
