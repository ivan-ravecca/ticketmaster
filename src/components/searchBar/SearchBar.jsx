import { useState, useEffect, useCallback } from "react";

const SearchBar = ({ onSearch: onSearchProp, waitingTime, searchTerm }) => {
  waitingTime = waitingTime || 700;
  const [query, setQuery] = useState(searchTerm ? searchTerm : "");
  const onSearch = useCallback(onSearchProp, []);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, waitingTime);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.trim() === "") {
      return;
    }
    if (debouncedQuery) {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, onSearch]);

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search for events"
    />
  );
};

export default SearchBar;
