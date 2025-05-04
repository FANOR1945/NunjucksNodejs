// main.js

import { loadRoutes } from './api/index.js'
import {
  appBarConfig,
  layoutSidebar
} from './components/dynamic/config/appBarConfig.js'
import { loadPage } from './contentLoad.js'
import { createDebugUI } from './debug.js'
import { initAppBar } from './init/initAppBar.js'
import { initLayout } from './init/initLayout.js'

window.addEventListener('DOMContentLoaded', () => {
  createDebugUI()
  loadRoutes()
  // Configuración inicial
  // Configuración inicial

  // Inicialización (puede usar ID o clase)
  // Busca #appHeader o .appHeader
  // initAppBar('appHeader', appBarConfig) O también: initAppBar(document.querySelector('.header-container'), appBarConfig);
  initLayout('sidebar-container', layoutSidebar)
  document.getElementById('sidebar-links')?.addEventListener('click', e => {
    const target = e.target.closest('a')
    if (target && target.getAttribute('href')?.startsWith('/')) {
      e.preventDefault()
      const path = target.getAttribute('href')
      loadPage(path)
    }
  })

  window.addEventListener('popstate', e => {
    if (e.state?.path) loadPage(e.state.path)
  })
})
