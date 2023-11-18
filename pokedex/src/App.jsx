import React, { useState, useEffect } from 'react';

// Importación de Componentes funcionales
import PokemonTable from './components/PokemonTable';
import PokeForm from './components/PokeForm';
import SearchPokemon from './components/SearchPokemon';
import ScoreDisplay from './components/ScoreDisplay';
import SortPokemon from './components/SortPokemon';

// Importación de Componentes Estructura Web
import Header from './components/Header';
import Footer from './components/Footer';
import useMiApi from './components/MiApi';

// Importación de Estilo y Bootstrap
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // Estados de la aplicación
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [score, setScore] = useState(0);
  const [strikes, setStrikes] = useState(0);

  // Hook personalizado para la API
  const { fetchPokemonData } = useMiApi();

  // Función para añadir un nuevo Pokémon
  const handleAddPokemon = async (pokemonName) => {
    await fetchPokemonData(pokemonName, setPokemons, setScore, setStrikes);
  };

  // Función para buscar Pokémon
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

  // Funciones para ordenar los Pokémon
  const handleSortAscending = () => {
    const sortedPokemons = [...pokemons].sort((a, b) => a.id - b.id);
    setFilteredPokemons(sortedPokemons);
  };

  const handleSortDescending = () => {
    const sortedPokemons = [...pokemons].sort((a, b) => b.id - a.id);
    setFilteredPokemons(sortedPokemons);
  };

  // Efectos para manejar cambios en el puntaje y strikes
  useEffect(() => {
    // Mensajes basados en el puntaje
    const scoreMessages = {
      10: "Vas muy bien",
      25: "¡Sí que sabes de esto!",
      50: "¡QUÉ? ¡Eres impresionante!",
      100: "¡ERES TODO UN MAESTRO POKÉMON!"
    };

    if (scoreMessages[score]) {
      alert(scoreMessages[score]);
    }
  }, [score]);

  useEffect(() => {
    // Resetear juego después de 3 strikes
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

  // Estructura JSX del componente App
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
