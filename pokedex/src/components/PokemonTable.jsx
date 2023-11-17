// PokemonTable.jsx
import React from 'react';
import './PokemonTable.css';

function PokemonTable({ pokemons }) {
  return (
    <div className="pokemontable-container">
      <table className="pokemon-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>ID</th>
            <th>Nombre</th>
            <th>Habilidades</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {pokemons.map(pokemon => (
            <tr key={pokemon.id}>
              <td><img src={pokemon.image} alt={pokemon.name} className="pokemon-image" /></td>
              <td>{pokemon.id}</td>
              <td>{pokemon.name}</td>
              <td>{pokemon.abilities}</td>
              <td>{pokemon.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PokemonTable;
