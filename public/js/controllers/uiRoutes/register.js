// controllers/uiRoutes/register.js
import { debugLog } from "../../debug.js";

// Función factory para crear instancias independientes
export const RegisterController = () => {
  let instanceCount = 0;
  
  return ({ refresh, state = {} }) => {
    instanceCount = state.clickCount ?? instanceCount;
    debugLog(`Renderizando RegisterController. Contador: ${instanceCount}`);

    const handleClick = () => {
      instanceCount++;
      debugLog(`Contador incrementado a: ${instanceCount}`);
      refresh({ clickCount: instanceCount });
    };

    const handleReset = () => {
      debugLog(`Reiniciando contador desde: ${instanceCount}`);
      instanceCount = 0;
      refresh({ clickCount: instanceCount });
    };

    return {
      type: 'container',
      // attributes: { 'data-content': 'true' },
      styles: {
        padding: '20px',
        backgroundColor: '#2c3e50',
        borderRadius: '8px',
        color: 'white'
      },
      children: [
        {
          type: 'text',
          content: `Clicks: ${instanceCount}`,
          styles: { fontSize: '1.2rem', marginBottom: '15px' }
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
};

// Exportamos una instancia por defecto
export default RegisterController();