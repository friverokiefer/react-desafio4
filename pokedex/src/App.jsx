// App.jsx
import React, { useState, useEffect } from 'react';

// Importacion de Componentes funcionales
import PokemonTable from './components/PokemonTable';
import PokeForm from './components/PokeForm';
import SearchPokemon from './components/SearchPokemon';
import ScoreDisplay from './components/ScoreDisplay';
import SortPokemon from './components/SortPokemon';

// Importacion de Componentes Estructura Web
import Header from './components/Header';
import Footer from './components/Footer';
import useMiApi from './components/MiApi';

// Importación de Estilo y Bootstrap
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [score, setScore] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const { fetchPokemonData } = useMiApi();

  const handleAddPokemon = async (pokemonName) => {
    await fetchPokemonData(pokemonName, setPokemons, setScore, setStrikes);
  };

  const handleSearch = (searchTerm) => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(lowercasedTerm) ||
      pokemon.abilities.toLowerCase().includes(lowercasedTerm) ||
      pokemon.description.toLowerCase().includes(lowercasedTerm) ||
      String(pokemon.id).includes(lowercasedTerm)
    );
    setFilteredPokemons(filtered);
  };

  const handleSortAscending = () => {
    const sortedPokemons = [...pokemons].sort((a, b) => a.id - b.id);
    setFilteredPokemons(sortedPokemons);
  };

  const handleSortDescending = () => {
    const sortedPokemons = [...pokemons].sort((a, b) => b.id - a.id);
    setFilteredPokemons(sortedPokemons);
  };

  useEffect(() => {
    if (score === 10) {
      alert("Vas muy bien");
    } else if (score === 25) {
      alert("¡Sí que sabes de esto!");
    } else if (score === 50) {
      alert("¡QUÉ? ¡Eres impresionante!");
    } else if (score === 100) {
      alert("¡ERES TODO UN MAESTRO POKÉMON!");
    }
  }, [score]);
  

  useEffect(() => {
    if (strikes >= 3) {
      alert("Has alcanzado 3 strikes. ¡Inténtalo de nuevo!");
      setStrikes(0);
      setScore(0);
      setPokemons([]);
      setFilteredPokemons([]);
    }
  }, [strikes]);

  useEffect(() => {
    setFilteredPokemons(pokemons);
  }, [pokemons]);

  return (
    <div className="App">
      <Header />
      <div className="game-description">
        <p>Bienvenido al Juego de Pokedex...</p>
      </div>
      <ScoreDisplay score={score} strikes={strikes} />
      <PokeForm onAddPokemon={handleAddPokemon} />
      <SearchPokemon onSearch={handleSearch} />
      <SortPokemon onSortAscending={handleSortAscending} onSortDescending={handleSortDescending} />
      <PokemonTable pokemons={filteredPokemons} />
      <Footer />
    </div>
  );
}

export default App;
