import React from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch, searchInput, setSearchInput }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="search-input"
        placeholder="Search for a movie..."
      />
      <button className="search-button" onClick={() => onSearch(searchInput)}>
        🔍 Search
      </button>
    </div>
  );
};

export default SearchBar;