import { useState } from 'react';

// Hook personalizado para interactuar con la PokeAPI
const useMiApi = () => {

  // Función para obtener datos básicos de un Pokémon por nombre
  const fetchBasicData = async (pokemonName) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Pokémon no encontrado');
    return response.json();
  };

  // Función para obtener y procesar los datos de un Pokémon
  // y actualizar el estado de la aplicación (pokemons, score, strikes)
  const fetchPokemonData = async (pokemonName, setPokemons, setScore, setStrikes) => {
    try {
      // Obtiene los datos básicos del Pokémon
      const pokemonData = await fetchBasicData(pokemonName);

      // Crea un nuevo objeto con los datos relevantes del Pokémon
      const newPokemon = {
        id: pokemonData.id,
        name: pokemonData.name,
        abilities: pokemonData.abilities.map(ability => ability.ability.name).join(', '),
        image: pokemonData.sprites.front_default,
      };

      // Actualiza el estado de los pokemons agregando el nuevo
      setPokemons(prev => [...prev, newPokemon]);

      // Incrementa el puntaje del jugador
      setScore(prevScore => prevScore + 1);
    } catch (error) {
      // Maneja los errores actualizando los strikes
      console.error(error);
      setStrikes(prevStrikes => prevStrikes + 1);
    }
  };
  return { fetchPokemonData };
};

export default useMiApi;
