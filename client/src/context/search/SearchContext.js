import { createContext, useEffect, useReducer } from 'react';

import SearchReducer from './SearchReducer';

const INITIAL_STATE = {
  tag: '',
  search: '',
  makeSearch: false,
};
export const SearchContext = createContext(INITIAL_STATE);

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);
  const searchParams = new URLSearchParams(window.location.search);
  const searchedTag = searchParams.get('tag');
  const searchedText = searchParams.get('s');
  useEffect(() => {
    dispatch({ type: 'SET_TAG', payload: searchedTag });
    dispatch({ type: 'SET_SEARCH', payload: searchedText });
  }, [searchedTag, searchedText]);

  return (
    <SearchContext.Provider
      value={{
        tag: state.tag,
        search: state.search,
        makeSearch: state.makeSearch,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
