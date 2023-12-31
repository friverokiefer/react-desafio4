import React from 'react';

const SortPokemon = ({ onSortAscending, onSortDescending }) => {
  return (
    <div className="sort-buttons-container">
      <button onClick={onSortAscending}>Ordenar Ascendente</button>
      <button onClick={onSortDescending}>Ordenar Descendente</button>
    </div>
  );
};

export default SortPokemon;
