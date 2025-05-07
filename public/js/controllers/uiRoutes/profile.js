export default function dashboardProfile() {
    return {
      type: 'container',
      children: [
        {
          type: 'text',
          content: 'Perfil de Usuario',
          styles: {
            fontSize: '1.5rem',
            marginBottom: '1rem'
          }
        },
        {
          type: 'table',
          headers: ['Campo', 'Valor'],
          rows: [
            ['Nombre', 'Dr. Juan Pérez'],
            ['Especialidad', 'Cardiología'],
            ['Horario', 'L-V 8am-4pm']
          ],
          styles: {
            maxWidth: '600px'
          }
        }
      ]
    };
  }
  