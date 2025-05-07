const initialState = {
  routes: [],
  currentPath: localStorage.getItem('currentPath') || window.location.pathname,
};

const routerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ROUTES':
      return { ...state, routes: action.payload };
    case 'SET_CURRENT_PATH':
      return { ...state, currentPath: action.payload };
    default:
      return state;
  }
};
export default routerReducer;
