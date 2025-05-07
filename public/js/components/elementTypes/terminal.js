 const Terminal={
    create: (config, { onRouteChange } = {}) => {
      const terminal = document.createElement('div');
      terminal.className = 'dynamic-terminal';
      Object.assign(terminal.style, {
        backgroundColor: '#0d0d0d',
        color: '#0f0',
        fontFamily: "'Courier New', monospace",
        padding: '10px',
        borderRadius: '4px',
        overflow: 'auto',
        maxHeight: '300px',
        whiteSpace: 'pre-wrap',
        ...config.styles
      });
  
      const initialPrompt = document.createElement('div');
      initialPrompt.textContent = '$ ';
      initialPrompt.style.color = '#4CAF50';
      terminal.appendChild(initialPrompt);
  
      const inputLine = document.createElement('div');
      inputLine.style.display = 'flex';
      const prompt = document.createElement('span');
      prompt.textContent = '$ ';
      prompt.style.color = '#4CAF50';
      prompt.style.marginRight = '8px';
      const input = document.createElement('input');
      input.type = 'text';
      Object.assign(input.style, {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#fff',
        fontFamily: "'Courier New', monospace",
        flexGrow: '1',
        outline: 'none'
      });
  
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const command = input.value;
          input.value = '';
          const commandDisplay = document.createElement('div');
          commandDisplay.style.display = 'flex';
          commandDisplay.innerHTML = `<span style="color:#4CAF50">$ </span><span style="font-weight:bold">${command}</span>`;
          terminal.appendChild(commandDisplay);
  
          const output = document.createElement('div');
          output.textContent = command.startsWith('navigate ') ? `Redirigiendo a: ${command.split(' ')[1]}` : `Comando no reconocido: ${command}`;
          output.style.marginLeft = '20px';
          output.style.color = '#aaa';
          terminal.appendChild(output);
          terminal.scrollTop = terminal.scrollHeight;
        }
      });
  
      inputLine.appendChild(prompt);
      inputLine.appendChild(input);
      terminal.appendChild(inputLine);
      terminal.addEventListener('click', () => input.focus());
  
      return terminal;
    }
  };
  export default Terminal