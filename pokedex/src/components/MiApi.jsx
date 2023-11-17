// MiApi.jsx
import { useState } from 'react';

const useMiApi = () => {
  const fetchPokemonData = async (pokemonName, setPokemons, setScore, setStrikes) => {
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;
      const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonName.toLowerCase()}`;
      const response = await fetch(url);
      const speciesResponse = await fetch(speciesUrl);

      if (!response.ok || !speciesResponse.ok) {
        throw new Error('Pokémon no encontrado');
      }
      const pokemonData = await response.json();
      const speciesData = await speciesResponse.json();

      const abilities = await Promise.all(pokemonData.abilities.map(async (abilityInfo) => {
        const abilityResponse = await fetch(abilityInfo.ability.url);
        const abilityData = await abilityResponse.json();
        const spanish = abilityData.names.find(name => name.language.name === 'es');
        return spanish ? spanish.name : abilityInfo.ability.name;
      }));

      const spanishFlavorText = speciesData.flavor_text_entries.find(flavor => flavor.language.name === 'es');
      const description = spanishFlavorText ? spanishFlavorText.flavor_text : 'Descripción no disponible';

      const newPokemon = {
        id: pokemonData.id,
        name: pokemonData.name,
        abilities: abilities.join(', '),
        image: pokemonData.sprites.front_default,
        description: description.replace(/[\n\f]/g, ' ')
      };

      setPokemons(prev => [...prev, newPokemon]);
      setScore(prevScore => prevScore + 1);
    } catch (error) {
      console.error(error);
      setStrikes(prevStrikes => prevStrikes + 1);
    }
  };

  return { fetchPokemonData };
};

export default useMiApi;
