const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        user: null,
        isFetching: true,
        error: false,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        isFetching: false,
        error: false,
      };

    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      };

    case 'LOGIN_FAILURE':
      return {
        ...state,
        token: '',
        user: null,
        isFetching: false,
        error: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        token: '',
        user: null,
        isFetching: false,
        error: true,
      };
    case 'FOLLOW':
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user.followings, action.payload],
        },
      };
    case 'UNFOLLOW':
      return {
        ...state,
        user: {
          ...state.user,
          followings: state.user.followings.filter(
            (following) => following !== action.payload
          ),
        },
      };
    case 'SIDEBAR':
      return {
        ...state,
        sidebar: !state.sidebar,
      };
    case 'CONTACTS':
      return {
        ...state,
        contacts: !state.contacts,
      };
    case 'SNACKBAR':
      return { ...state, snackbar: !state.snackbar };

    default:
      return state;
  }
};

export default AuthReducer;
