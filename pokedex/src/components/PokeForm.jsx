import React, { useState } from 'react';
import './PokeForm.css';

function PokeForm({ onAddPokemon }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPokemon(inputValue);
    setInputValue('');
  };

  return (
    <div className="pokeform-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ingresa un Pokémon"
          className="pokeform-input"
        />
        <button type="submit" className="pokeform-button">Add Pokémon</button>
      </form>
    </div>
  );
}

export default PokeForm;
