import React, { useState, useEffect, useRef } from "react";
import styles from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "/") {
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  return (
    <input
      ref={searchInputRef}
      type="text"
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        onSearch(query);
      }}
      className={styles.searchBox}
      placeholder="Search places"
    />
  );
};

export default SearchBox;
