import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  getAllPokemon,
  getJapaneseName,
  getTypeColor,
  MonsterBall,
} from "../api/pokemonAPI";
import Skeleton from "react-loading-skeleton";
import { useDebounce } from "use-debounce";
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
  /* background: linear-gradient(
    120deg,
    ${({ type1 }) => type1} 0%,
    ${({ type1 }) => type1} 40%,
    ${({ type2 }) => type2} 50%,
    ${({ type2 }) => type2} 100%
  ); */
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
  /* background-color: ${({ type2 }) => type2}; */
  background-color: blue;
  /* padding: 2% 0; */
`;

const StyledListContainer = styled.ul`
  width: 100%;
  height: 85%;
  margin: 5% 0;
  background-color: red;
  overflow: auto;
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

  console.log("今のpokemons: ", pokemonsData);

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

  const [scrollableDiv, setScrollableDiv] = useState(
    document.createElement("div")
  );
  const [debouncedScrollableDiv] = useDebounce(scrollableDiv, 500);

  const fetchPokemonData = useCallback(async (url = initialURL) => {
    try {
      console.log("fetchPokemonDataが呼び出されました!");
      setLoading(true);
      let res = await getAllPokemon(url);
      let initialData = res.pokemons[0];
      setPokemonsData(res.pokemons);
      setFeaturedPokemon(initialData);
      setPrevUrl(res.previous || null);
      setNextUrl(res.next || null);
      setPreLoad(false);
      setLoading(false);
      getJapaneseName();
      // if (debouncedScrollableDiv) {
      //   debouncedScrollableDiv.scrollTop = 3;
      // }
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPokemonData();
  }, [fetchPokemonData]);

  const toggleFeaturedPokemon = (index) => {
    setFeaturedPokemon(pokemonsData[index]);
  };

  const toggleSidebar = () => {
    setIsDefault((prev) => !prev);
  };

  const handleScroll = () => {
    const scrollHeight = debouncedScrollableDiv.scrollHeight;
    const scrollTop = debouncedScrollableDiv.scrollTop;
    const clientHeight = debouncedScrollableDiv.clientHeight;
    if (scrollHeight - scrollTop <= clientHeight + 1) {
      fetchPokemonData(nextUrl);
      // scrollableDiv.current.scrollTo({
      //   top: 0, // スクロール位置を上部に設定
      //   behavior: "smooth", // スムーズにスクロール
      // });
      if (debouncedScrollableDiv) {
        debouncedScrollableDiv.scrollTop = 3;
      }
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
          <StyledSidebar type2={color2}>
            {isDefault ? (
              <StyledListContainer
                ref={(div) => setScrollableDiv(div)}
                onScroll={handleScroll}
              >
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
