import rootReducer from '../reducers/index.js';

export function createStore(reducer) {
  // Establecer el estado inicial como el valor retornado por el reducer cuando se pasa undefined
  let state = reducer(undefined, {});

  const listeners = [];

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
 
  }

  function subscribe(listener) {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) listeners.splice(index, 1);
    };
  }

  return {
    getState,
    dispatch,
    subscribe,
  };
}

export const store = createStore(rootReducer);
