import React, { memo } from "react";
import styled from "styled-components";
import PokemonBar from "./PokemonBar";

const StyledUnorderedList = styled.ul`
  width: 100%;
  height: 85%;
  margin: 5% 0;
  overflow: ${({ $value }) => ($value ? "visible" : "auto")};
  z-index: 1;
`;

const PokemonList = memo(
  ({
    scrollableDiv,
    handleScroll,
    loading,
    pokemonsData,
    featuredPokemon,
    toggleFeaturedPokemon,
    toggleSidebar,
    japaneseNames,
  }) => {
    console.log("Listレンダリング");

    return (
      <StyledUnorderedList
        ref={scrollableDiv}
        onScroll={handleScroll}
        $value={loading}
      >
        {pokemonsData.map((p, index) => {
          return (
            <PokemonBar
              key={p.id}
              pokemonData={p}
              id={p.id}
              isFeatured={p.id === featuredPokemon.id}
              onMouseEnter={toggleFeaturedPokemon.bind(null, index)}
              onClick={toggleSidebar}
              japaneseName={japaneseNames[index]}
            />
          );
        })}
      </StyledUnorderedList>
    );
  }
);

export default PokemonList;
