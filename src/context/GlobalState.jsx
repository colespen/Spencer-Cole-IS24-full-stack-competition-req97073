import { createContext, useState } from 'react';

const GlobalContext = createContext(null);

const GlobalState = ({ children }) => {
  // useReducer???
  const [products, setProducts] = useState([]);

  // this searchBar stuff can go somewhere else 
  const [query, setQuery] = useState("");
  const [filterKey, setFilterKey] = useState("");

  return (
    <GlobalContext.Provider
      value={{
        productsContext: [products, setProducts],
        queryContext: [query, setQuery],
        filterKeyContext: [filterKey, setFilterKey]
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalState };