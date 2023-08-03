const SearchReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TAG':
      return {
        ...state,
        tag: action.payload,
      };
    case 'SET_SEARCH':

      return {
        ...state,
        search: action.payload,
      };
    case 'SET_MAKE_SEARCH':

      return {
        ...state,
        makeSearch: !state.makeSearch,
      };
    default:
      return state;
  }
};

export default SearchReducer;
