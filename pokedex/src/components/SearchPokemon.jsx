// SearchPokemon.jsx
import React, { useState } from 'react';
import './SearchPokemon.css';

const SearchPokemon = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="search-container">
      <input 
        type="text" 
        placeholder="Search Pokémon..." 
        value={inputValue}
        onChange={handleInputChange}
        className="search-input"
      />
    </div>
  );
};

export default SearchPokemon;
