export function createRoleBaseStyles(role, styles = {}) {
  const baseStyles = {
    content: {
      backgroundColor: '#f5f5f5',
      padding: '16px',
      minHeight: '200px'
    },
    header: {
      backgroundColor: '#333',
      color: 'white',
      padding: '12px',
      height: '60px'
    },
    sidebar: {
      backgroundColor: '#e0e0e0',
      width: '250px'
    },
    footer: {
      backgroundColor: '#333',
      color: 'white',
      padding: '12px',
      height: '40px'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '16px'
    },
    page: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridAutoRows: 'minmax(0px, auto)',
      padding: '10px',
      backgroundColor: 'green',
      minHeight: '100vh',
      boxSizing: 'border-box',
    
  }
  };

  return { ...(baseStyles[role] || {}), ...styles };
}