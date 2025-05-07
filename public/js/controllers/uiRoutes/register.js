// controllers/uiRoutes/dashboard.js
import { debugLog } from "../../debug.js";

// Estado persistente (fuera del componente)
let globalCount = 0;

const RegisterController = ({ refresh, state = {} }) => {
  debugLog(`Renderizando RegisterController con contador: ${globalCount}`);

  const handleClick = () => {
    globalCount++;
    debugLog(`Contador incrementado a: ${globalCount}`);
    
    // FORZAR re-render con nuevo estado
    refresh({ clickCount: globalCount });
  };

  const handleReset = () => {
    debugLog(`Reiniciando contador desde: ${globalCount}`);
    globalCount = 0;

    refresh({ clickCount: globalCount }); // Re-render con contador 0
  };

  return {
    type: 'container',
    attributes: { 'data-content': 'true' },
    styles: {
      padding: '20px',
      backgroundColor: '#2c3e50',
      borderRadius: '8px',
      color: 'white'
    },
    children: [
      {
        type: 'text',
        content: `Clicks: ${state.clickCount ?? globalCount}`,
        id: 'click-counter',
        styles: {
          fontSize: '1.2rem',
          marginBottom: '15px'
        }
      },
      {
        type: 'button',
        label: 'Haz clic',
        styles: {
          padding: '10px 20px',
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginRight: '10px'
        },
        onClick: handleClick
      },
      {
        type: 'button',
        label: 'Reiniciar',
        styles: {
          padding: '10px 20px',
          backgroundColor: '#e74c3c',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        },
        onClick: handleReset
      }
    ]
  };
};

export default RegisterController;
