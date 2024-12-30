import { useState, useEffect, useCallback } from "react";
import { TextField } from "@mui/material";

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
    <TextField
      label="Write any event name"
      type="search"
      variant="filled"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      fullWidth={true}
      data-testid="searchBox"
    />
  );
};

export default SearchBar;
