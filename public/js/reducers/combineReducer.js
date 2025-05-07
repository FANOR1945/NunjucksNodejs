export function combineReducers(reducers) {
  return (state = {}, action) => {
    const nextState = {};

    // Iteramos sobre cada reducer y lo aplicamos a la parte correspondiente del estado
    for (const key in reducers) {
      if (Object.prototype.hasOwnProperty.call(reducers, key)) {
        // Si el estado para esta parte no existe, lo inicializamos vacío
        nextState[key] = reducers[key](state[key], action);
      }
    }

    return nextState;
  };
}
