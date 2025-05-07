

export default function about() {
  return {
    type: 'container',  // Usamos el tipo 'content' aquí

  
    children: [
      {
        type: 'markdown',
        content: `# Sobre Nosotros\n\n**Sistema de Gestión Médica**\n\n- Fundado en 2023\n- Especializado en clínicas\n- Soporte 24/7\n\n[Contacto](mailto:info@clinica.com)`,
        styles: {
          backgroundColor: '#f9f9f9',
          padding: '1rem',
          borderRadius: '8px',
          fontSize: '1rem',
          lineHeight: '1.6',
          color: '#333'
        }
      }
,      
      ...Array.from({ length: 20 }, (_, i) => ({
        type: 'button',
        label: `Botón ${i + 1}`,  // Cambio 'label' por 'content' según la estructura
        styles: {
          display: 'block',
          width: '100%',
          margin: '8px 0',
          padding: '10px',
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
        }
      }))
    ]
  };
}
