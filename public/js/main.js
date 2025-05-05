import { domReady } from './utils/dom.js';
import { initLayout } from './init/initLayout.js';
import { layoutPage } from './layouts/pageConfig.js';

// Esperar a que el DOM esté listo antes de inicializar
domReady.then(() => {
  initLayout([layoutPage], '#app');
  
  // Opcional: Mensaje de confirmación
  console.log('Sistema de arrastre inicializado');
});