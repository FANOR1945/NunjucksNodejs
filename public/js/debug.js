// debug.js
const APP_CONFIG = {
  debugMode: true,
};

// Tipos de log soportados y sus colores
const LOG_TYPES = {
  log: { color: 'lime', consoleMethod: 'log' },
  info: { color: 'cyan', consoleMethod: 'info' },
  warn: { color: 'yellow', consoleMethod: 'warn' },
  error: { color: 'red', consoleMethod: 'error' },
  debug: { color: 'magenta', consoleMethod: 'debug' }
};

const debugLog = (message, type = 'log') => {
  if (!APP_CONFIG.debugMode) return;

  // Validar el tipo de log
  const logType = LOG_TYPES[type] || LOG_TYPES.log;
  const consoleMethod = console[logType.consoleMethod] ? logType.consoleMethod : 'log';

  // Mostrar en consola del navegador
  console[consoleMethod](`[DEBUG] ${message}`);

  // Mostrar en la UI de debug
  const debugConsole = document.getElementById('debugConsole');
  if (!debugConsole) return;

  const now = new Date().toLocaleTimeString();
  const msgElement = document.createElement('div');
  msgElement.innerHTML = `[${now}] ${message}`;
  msgElement.style.color = logType.color;
  msgElement.style.margin = '2px 0';
  msgElement.style.padding = '2px 5px';

  debugConsole.appendChild(msgElement);
  debugConsole.scrollTop = debugConsole.scrollHeight;
};

const createDebugUI = () => {
  // Crear botón de toggle si no existe
  if (!document.getElementById('toggleDebug')) {
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'toggleDebug';
    toggleBtn.textContent = APP_CONFIG.debugMode ? 'Debug ON' : 'Debug OFF';
    toggleBtn.style.position = 'fixed';
    toggleBtn.style.top = '60px';
    toggleBtn.style.right = '10px';
    toggleBtn.style.padding = '10px 15px';
    toggleBtn.style.backgroundColor = APP_CONFIG.debugMode ? '#4CAF50' : '#F44336';
    toggleBtn.style.color = 'white';
    toggleBtn.style.border = 'none';
    toggleBtn.style.borderRadius = '4px';
    toggleBtn.style.cursor = 'pointer';
    toggleBtn.style.zIndex = '9999';
    document.body.appendChild(toggleBtn);

    // Crear consola de debug si no existe
    if (!document.getElementById('debugConsole')) {
      const debugConsole = document.createElement('div');
      debugConsole.id = 'debugConsole';
      debugConsole.style.display = APP_CONFIG.debugMode ? 'block' : 'none';
      debugConsole.style.position = 'fixed';
      debugConsole.style.bottom = '0';
      debugConsole.style.left = '0';
      debugConsole.style.width = '100%';
      debugConsole.style.maxHeight = '200px';
      debugConsole.style.overflowY = 'auto';
      debugConsole.style.backgroundColor = '#111';
      debugConsole.style.color = '#0f0';
      debugConsole.style.padding = '10px';
      debugConsole.style.fontFamily = 'monospace';
      debugConsole.style.zIndex = '9998';
      debugConsole.style.borderTop = '2px solid #333';
      document.body.appendChild(debugConsole);
    }

    // Event listener para el botón
    toggleBtn.addEventListener('click', () => {
      APP_CONFIG.debugMode = !APP_CONFIG.debugMode;
      const debugConsole = document.getElementById('debugConsole');
      if (debugConsole) {
        debugConsole.style.display = APP_CONFIG.debugMode ? 'block' : 'none';
      }
      toggleBtn.textContent = APP_CONFIG.debugMode ? 'Debug ON' : 'Debug OFF';
      toggleBtn.style.backgroundColor = APP_CONFIG.debugMode ? '#4CAF50' : '#F44336';
      debugLog(`Debug ${APP_CONFIG.debugMode ? 'activado' : 'desactivado'}`, 'info');
    });
  }
};

export { debugLog, createDebugUI };