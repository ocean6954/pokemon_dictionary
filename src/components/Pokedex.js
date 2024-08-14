import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  getAllPokemon,
  getPokemon,
  getJapaneseName,
  getTypeColor,
  MonsterBall,
} from "../api/pokemonAPI";
import Skeleton from "react-loading-skeleton";
import "./css/pokedex.css";
import "react-loading-skeleton/dist/skeleton.css";
import PokemonList from "./Card/PokemonList";
import PokeInfo from "./Card/PokeInfo";
import styled from "styled-components";
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

const Pokedex = () => {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [preLoad, setPreLoad] = useState(true);
  const [pokemonsData, setPokemonsData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [featuredPokemon, setFeaturedPokemon] = useState({});
  const adjustmentRef = useRef(0);
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
      try {
        setLoading(true);

        // 1秒の遅延を追加
        await new Promise((resolve) => setTimeout(resolve, 1000));

        let res = await getAllPokemon(url);
        let _pokemonData = await Promise.all(
          res.results.map((pokemon) => {
            let pokemonRecord = getPokemon(pokemon.url);
            return pokemonRecord;
          })
        );
        let initialData = _pokemonData[0];
        setPokemonsData(_pokemonData);
        setFeaturedPokemon(initialData);

        setPrevUrl(res.previous || null);
        setNextUrl(res.next || null);
        setPreLoad(false);
        setLoading(false);

        if (scrollableDiv) {
          scrollableDiv.scrollTop = 1;
        }

        getJapaneseName();
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
        setLoading(false);
      }
    },
    [scrollableDiv]
  );

  useEffect(() => {
    fetchPokemonData(initialURL);
  }, [fetchPokemonData]);

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
    if (scrollTop === 0 && prevUrl) {
      fetchPokemonData(prevUrl);
    }
  };

  const toggleNextPokemon = (id = 1) => {
    if (id < 20) {
      setFeaturedPokemon(pokemonsData[id]);
    } else {
      if (id % 20 === 0) {
        fetchPokemonData(nextUrl);
        adjustmentRef.current = id;
      }
      setFeaturedPokemon(pokemonsData[id - adjustmentRef.current]);
    }
    console.log(`渡ってきたidは:${id}`);
    console.log(`adjustmentRefは:${adjustmentRef.current}`);
    console.log(`indexは:${id - adjustmentRef.current}`);
    console.log(`    `);
  };

  const togglePrevPokemon = (id = 1) => {
    if (id === 0) {
      return;
    }

    setFeaturedPokemon(pokemonsData[id - 1]);
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
            <MonsterBall />
          </StyledLoadingOverlay>
        </StyledMainWrapper>
      ) : (
        <StyledMainWrapper>
          {loading && (
            <StyledLoadingOverlay>
              <MonsterBall />
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
                      id={pokemonData.id}
                      isFeatured={pokemonData.id === featuredPokemon.id}
                      onMouseEnter={toggleFeaturedPokemon.bind(null, index)}
                      onClick={toggleSidebar}
                      colors={{ color1, color2 }}
                    />
                  );
                })}
              </StyledListContainer>
            ) : (
              <StyledInfoContainer>
                <PokeInfo
                  featuredPokemon={featuredPokemon}
                  onClick={toggleSidebar}
                  toggleNext={toggleNextPokemon}
                  togglePrev={togglePrevPokemon}
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
