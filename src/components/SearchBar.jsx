import React, { useState, useEffect, useCallback } from "react";

import { useDebounce } from "../hooks/useDebounce";

const SearchBar = ({ setQuery }) => {
  const [value, setValue] = useState("");
  const term = useDebounce(value, 400);

  const onSearch = useCallback(
    (query) => setQuery(query),
    [setQuery]
  );

  useEffect(() => {
    // if (value) {

    // }
    // return () => {
    //   setQuery("");
    // };
    onSearch(term);
  }, [onSearch, term]);

  return (
    <section className="search">
      <form className="search-form" onSubmit={(e) => e.preventDefault()}>
        <input
          className="search-input"
          spellCheck="false"
          placeholder="search products"
          name="search"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
    </section>
  );
};

export default SearchBar;