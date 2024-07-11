import React, { useEffect, useState, useCallback } from "react";
import {
  getAllPokemon,
  getPokemon,
  getJapaneseName,
  getTypeColor,
} from "../api/pokemonAPI";
import Skeleton from "react-loading-skeleton";
import "./css/pokedex.css";
import "react-loading-skeleton/dist/skeleton.css";
import PokemonList from "./Card/PokemonList";
import PokeInfo from "./Card/PokeInfo";
import styled, { keyframes } from "styled-components";
import { Pokemon } from "./Card/Pokemon";

const StyledMainWrapper = styled.div`
  text-align: center;
  width: 100%;
  height: 100vh;
  display: flex;
`;

const StyledImageContainer = styled.div`
  width: 45%;
  background-color: ${({ type1 }) => type1};

  display: flex;
  align-items: center;
`;
const StyledSidebar = styled.div`
  width: 55%;
  height: 100vh;
  background-color: ${({ type2 }) => type2};
  overflow: auto;
`;

const StyledListContainer = styled.ul`
  width: 100%;
  height: 90%;
`;

const StyledInfoContainer = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  align-items: center;
`;

const StyledLoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const spin = keyframes` 
  0% {transform: rotate(0deg);}
  100% { transform: rotate(360deg);}
`;

const StyledLoader = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.6);
  border-left: 4px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
`;

const Pokedex = () => {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(false);
  const [preLoad, setPreLoad] = useState(true);
  const [pokemonsData, setPokemonsData] = useState([]);

  const [nextUrl, setNextUrl] = useState("");
  const [previousUrl, setPreviousUrl] = useState("");
  const [featuredPokemon, setFeaturedPokemon] = useState({});
  let color1;
  let color2;
  if (featuredPokemon && Object.keys(featuredPokemon).length > 0) {
    color1 = getTypeColor(featuredPokemon.types[0].type.name);
    color2 = color1;
    if (featuredPokemon.types.length > 1) {
      color2 = getTypeColor(featuredPokemon.types[1].type.name);
    }
  }
  const [isDefault, setIsDefault] = useState(true);
  const [scrollableDiv, setScrollableDiv] = useState(null);

  const fetchPokemonData = useCallback(
    async (url) => {
      setLoading(true);
      let res = await getAllPokemon(url);
      let _pokemonData = await Promise.all(
        res.results.map((pokemon) => {
          let pokemonRecord = getPokemon(pokemon.url);
          return pokemonRecord;
        })
      );
      let initialData = _pokemonData[0];
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setPokemonsData(_pokemonData);
      setFeaturedPokemon(initialData);
      if (!res.previous) {
        setPreviousUrl(res.previous);
      }
      setNextUrl(res.next);
      setPreLoad(false);
      setLoading(false);

      if (scrollableDiv) {
        scrollableDiv.scrollTop = 0;
      }
      getJapaneseName();
    },
    [scrollableDiv]
  );

  useEffect(() => {
    fetchPokemonData(initialURL);
  }, [fetchPokemonData]);

  // const handlePrevPage = async () => {
  //   if (previousUrl === null) {
  //     return;
  //   }
  //   setLoading(true);
  //   let data = await getAllPokemon(previousUrl);
  //   await loadPokemon(data.results);
  //   setNextUrl(data.next);
  //   setPreviousUrl(data.previous);
  //   setLoading(false);
  // };

  const toggleFeaturedPokemon = (index) => {
    setFeaturedPokemon(pokemonsData[index]);
  };

  const toggleSidebar = () => {
    setIsDefault((prev) => !prev);
  };

  const handleScroll = () => {
    const scrollHeight = scrollableDiv.scrollHeight;
    const scrollTop = scrollableDiv.scrollTop;
    const clientHeight = scrollableDiv.clientHeight;
    if (scrollHeight - scrollTop === clientHeight) {
      fetchPokemonData(nextUrl);
    }
  };

  return (
    <>
      {preLoad ? (
        <StyledMainWrapper>
          <div>
            {[...Array(20)].map((_, index) => (
              <Skeleton key={index} className="skeleton-card" />
            ))}
          </div>
          <StyledLoadingOverlay>
            <StyledLoader></StyledLoader>
          </StyledLoadingOverlay>
        </StyledMainWrapper>
      ) : (
        <StyledMainWrapper>
          {loading && (
            <StyledLoadingOverlay>
              <StyledLoader></StyledLoader>
            </StyledLoadingOverlay>
          )}
          <StyledImageContainer type1={color1}>
            <Pokemon pokemon={featuredPokemon} />
          </StyledImageContainer>
          <StyledSidebar
            type2={color2}
            ref={(div) => setScrollableDiv(div)}
            onScroll={handleScroll}
          >
            {isDefault ? (
              <StyledListContainer>
                {pokemonsData.map((pokemonData, index) => {
                  return (
                    <PokemonList
                      key={pokemonData.id}
                      pokemonData={pokemonData}
                      isFeatured={pokemonData.id === featuredPokemon.id}
                      onMouseEnter={toggleFeaturedPokemon.bind(null, index)}
                      onClick={toggleSidebar}
                    />
                  );
                })}
              </StyledListContainer>
            ) : (
              <StyledInfoContainer>
                <PokeInfo
                  featuredPokemon={featuredPokemon}
                  onClick={toggleSidebar}
                />
              </StyledInfoContainer>
            )}
          </StyledSidebar>
        </StyledMainWrapper>
      )}
    </>
  );
};

export default Pokedex;
