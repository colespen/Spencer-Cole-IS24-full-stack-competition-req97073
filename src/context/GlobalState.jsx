import { createContext, useState } from 'react';
import { data } from '../lib/dummyData';

const GlobalContext = createContext(null);

const GlobalState = ({ children }) => {
  // use dummydata at default state temporarily!!!!!
  const [products, setProducts] = useState(data);

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