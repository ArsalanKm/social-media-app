const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        token: '',
        user: null,
        isFetching: true,
        error: false,
      };
    case 'LOGIN_SUCCESS':
      return {
        user: action.payload.user,
        token: action.payload.token,
        isFetching: false,
        error: false,
      };
    case 'LOGIN_FAILURE':
      return {
        token: '',
        user: null,
        isFetching: false,
        error: true,
      };
    case 'LOGOUT':
      return {
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

    default:
      return state;
  }
};

export default AuthReducer;
