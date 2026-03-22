import React from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch, searchInput, setSearchInput }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(searchInput);
    }
  };

  return (
    <div className="search-container">
      <label htmlFor="movie-search-input" className="sr-only">
        Search for a movie
      </label>
      <input
        id="movie-search-input"
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="search-input"
        placeholder="Search for a movie..."
      />
      <button className="search-button" aria-label="Search movies" onClick={() => onSearch(searchInput)}>
        🔍 Search
      </button>
    </div>
  );
};

export default SearchBar;
