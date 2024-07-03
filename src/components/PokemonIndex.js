import React from "react";
import PokemonList from "./Card/PokemonList.js";
const PokemonIndex = ({ pokemonsData }) => {
  return (
    <>
      <ul>
        {pokemonsData.map((pokemonData) => {
          return <PokemonList pokemonData={pokemonData} />;
        })}
      </ul>
    </>
  );
};

export default PokemonIndex;
