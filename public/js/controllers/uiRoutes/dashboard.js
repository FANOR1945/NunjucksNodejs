export default function dashboard() {
  return {
    type: 'terminal',
    commands: [
      {
        command: 'init system',
        output: 'Sistema de dashboard inicializado',
        isError: false
      },
      {
        command: 'load user_data',
        output: 'Error: No autorizado',
        isError: true
      }
    ],
    styles: {
      backgroundColor: '#0a192f'
    }
  };
}
