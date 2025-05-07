import authReducer from './authReducer.js';
import { combineReducers } from './combineReducer.js'; // Importamos el combineReducers personalizado

import routerReducer from './routerReducer.js';
import uiReducer from './uiReducer.js';

// Crear el rootReducer combinando el itemsReducer
const rootReducer = combineReducers({
  routesUi: routerReducer,

  auth: authReducer,
  ui: uiReducer,

  // drawer: drawerReducer,
});

export default rootReducer;
