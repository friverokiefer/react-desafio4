import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';


function PokeForm({ onAddPokemon }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPokemon(inputValue);
    setInputValue('');
  };

  return (
    <Container className="pokeform-container">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="pokemonInput">
          <Form.Control
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ingresa un Pokémon"
          />
        </Form.Group>
        <Button variant="primary" type="submit">Add Pokémon</Button>
      </Form>
    </Container>
  );
}

export default PokeForm;
