import React, { memo } from "react";
import styled from "styled-components";
import PokemonBar from "./PokemonBar";

const StyledUnorderedList = styled.ul`
  width: 100%;
  height: 85%;
  margin: 5% 0;
  overflow: ${({ $value }) => $value};
  overflow: auto;
`;

const PokemonList = memo(
  ({
    scrollableDiv,
    handleScroll,
    // valueOfOverflow,
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
        // $value={valueOfOverflow}
      >
        {/* {console.log("pokemonsData    ", pokemonsData)}
        {console.log("featuredPokemon ", featuredPokemon)}
        {console.log("japaneseNames   ", japaneseNames)} */}

        {console.log(" ")}

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
