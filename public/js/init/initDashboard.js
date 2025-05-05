import { DynamicLayout } from "../components/dynamic/asdsad.js";
import { layoutPage } from "../layouts/pageConfig.js";


export function initDashboard(containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Contenedor #${containerId} no encontrado`);
    return null;
  }

  // Crear el layout de página
  const page = DynamicLayout(layoutPage);
  
  // Aplicar estilos adicionales al contenedor
  container.style.display = 'grid';
  container.style.height = '100vh';
  container.style.width = '100vw';
  container.style.overflow = 'hidden';
  container.style.backgroundColor='red'
  
  // Limpiar y añadir al contenedor
  container.innerHTML = '';
  container.appendChild(page);

  return page;
}