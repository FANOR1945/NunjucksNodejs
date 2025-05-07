const initialState = {
  data: null,
  loading: true,
  error: null,
  isEditing: false
}

export function profileReducer (state = initialState, action) {
  switch (action.type) {
    case 'LOAD_PROFILE_SUCCESS':
      return { ...state, data: action.payload, loading: false }
    case 'LOAD_PROFILE_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'ENABLE_EDIT':
      return { ...state, isEditing: true }
    case 'DISABLE_EDIT':
      return { ...state, isEditing: false }
    case 'UPDATE_PROFILE_SUCCESS':
      return { ...state, data: action.payload, isEditing: false }
    default:
      return state
  }
}
