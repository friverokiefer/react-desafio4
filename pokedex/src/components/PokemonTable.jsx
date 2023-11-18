import React from 'react';

function PokemonTable({ pokemons }) {
  return (
    <div className="container mt-4">
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Imagen</th>
            <th>ID</th>
            <th>Nombre</th>
            <th>Habilidades</th>
          </tr>
        </thead>
        <tbody>
          {pokemons.map((pokemon) => (
            <tr key={pokemon.id}>
              <td>
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  className="img-fluid pokemon-image"
                />
              </td>
              <td>{pokemon.id}</td>
              <td>{pokemon.name}</td>
              <td>{pokemon.abilities}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PokemonTable;
