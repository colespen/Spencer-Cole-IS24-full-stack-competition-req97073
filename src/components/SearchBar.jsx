import React, { useState, useEffect, useCallback } from "react";

import { useDebounce } from "../hooks/useDebounce";

import styles from "../styles/Home.module.scss";

const SearchBar = ({ setQuery, filterKey }) => {
  const [value, setValue] = useState("");
  const term = useDebounce(value, 400);

  const onSearch = useCallback(
    (query) => setQuery(query),
    [setQuery]
  );

  useEffect(() => {
    onSearch(term);
  }, [onSearch, term]);

  return (
    <section className={styles.searchBar}>
      <form className="search-form" onSubmit={(e) => e.preventDefault()}>
        <input
          className="search-input"
          spellCheck="false"
          placeholder={
            !filterKey ?
              "click column title to filter" : "enter " + filterKey
          }
          name="search"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!filterKey}
        />
      </form>
    </section>
  );
};

export default SearchBar;
