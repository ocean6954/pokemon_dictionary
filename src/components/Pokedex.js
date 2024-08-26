import React, { useEffect, useState, useRef, useCallback } from "react";
import { getAllPokemon, getTypeColor, MonsterBall } from "../api/pokemonAPI";
// import Skeleton from "react-loading-skeleton";
import { useDebounce } from "use-debounce";
import "./css/pokedex.css";
import "react-loading-skeleton/dist/skeleton.css";
import PokemonList from "./Card/PokemonList";
import PokeInfo from "./Card/PokeInfo";
import styled, { keyframes } from "styled-components";
import { Pokemon } from "./Card/Pokemon";
import uniqueImageContainerId, { uniqueSideBarId } from "../utils/uniqueId";

const StyledMainWrapper = styled.div`
  text-align: center;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-between;
`;

const ToRight = keyframes`
  0% {
    right: 100%; 
  }
  100% {
    right: 0%;
  }
`;

const ToLeft = keyframes`
 0% {
    left: 100%; 
  }
  100% {
    left: 0%;
  }
`;

const StyledImageContainer = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    background-color: ${({ $type1 }) => $type1};
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    animation: ${ToRight} 0.5s linear forwards;
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    z-index: -1;
    transform: translateX(100%);
    border-top: 100vh solid ${({ $type1 }) => $type1};
    border-left: 0px solid transparent;
    border-right: var(--inclination) solid transparent;
    border-bottom: 0px solid transparent;
    animation: ${ToRight} 0.5s linear forwards;
    transform-origin: left center;
  }
`;
const StyledSidebar = styled.div`
  width: 45%;
  height: 100vh;
  position: relative;
  float: right;

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -1;
    transform: translateX(-100%);
    border-top: 100px solid transparent;
    border-left: var(--inclination) solid transparent;
    border-right: 0px solid transparent;
    border-bottom: 100vh solid ${({ $type2 }) => $type2};
    animation: ${ToLeft} 0.5s linear forwards;
    transform-origin: right center;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background-color: ${({ $type2 }) => $type2};
    animation: ${ToLeft} 0.5s linear forwards;
    transform-origin: right center;
  }
`;

const StyledUnorderedList = styled.ul`
  width: 100%;
  height: 85%;
  margin: 5% 0;
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
  const ImageContainerKey = useRef("");
  const SidebarKey = useRef("");

  console.log(" ");

  let color1;
  let color2;
  if (featuredPokemon && Object.keys(featuredPokemon).length > 0) {
    color1 = getTypeColor(featuredPokemon.types[0].type.name);
    color2 = color1;
    if (featuredPokemon.types.length > 1) {
      color2 = getTypeColor(featuredPokemon.types[1].type.name);
    }
  }

  ImageContainerKey.current = featuredPokemon.name + uniqueImageContainerId();
  SidebarKey.current = featuredPokemon.name + uniqueSideBarId();

  const [isDefault, setIsDefault] = useState(true);

  const scrollableDiv = useRef(null);

  // const [debouncedScrollableDiv] = useDebounce(scrollableDiv, 1000);

  const fetchPokemonData = useCallback(
    async (url = initialURL, isPrev = false) => {
      console.log("fetchPokemonData関数 の呼び出し");
      try {
        setLoading(true);
        let res = await getAllPokemon(url);
        let initialData = res.pokemons[0];
        let lastData = res.pokemons[res.pokemons.length - 1];
        setPokemonsData(res.pokemons);
        if (isPrev) {
          setFeaturedPokemon(lastData);
        } else {
          setFeaturedPokemon(initialData);
        }
        console.log("res", res);

        setPrevUrl(res.previous || null);
        setNextUrl(res.next || null);
        setPreLoad(false);
        setLoading(false);
        console.log("fetchPokemonData関数 おわり");
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
        setLoading(false);
      }
      return () => {
        console.log("clean up with fetchPokemonData関数");
      };
    },
    []
  );

  useEffect(() => {
    fetchPokemonData();
    return () => {
      console.log("clean up with useEffect");
    };
  }, [fetchPokemonData]);

  const toggleFeaturedPokemon = (index) => {
    setFeaturedPokemon(pokemonsData[index]);
  };

  const toggleSidebar = () => {
    setIsDefault((prev) => !prev);
  };

  const handleScroll = useCallback(() => {
    const scrollHeight = scrollableDiv.current.scrollHeight;
    const scrollTop = scrollableDiv.current.scrollTop;
    const clientHeight = scrollableDiv.current.clientHeight;
    const next = nextUrl;
    if (scrollHeight - scrollTop <= clientHeight + 1) {
      fetchPokemonData(next);
      if (scrollableDiv.current) {
        scrollableDiv.current.scrollTop = 3;
      }
    }
    if (scrollTop === 0 && prevUrl) {
      fetchPokemonData(prevUrl, true);
      if (scrollableDiv.current) {
        scrollableDiv.current.scrollTop = scrollHeight - clientHeight - 2;
      }
    }
  }, [fetchPokemonData, nextUrl, prevUrl]);

  // const [debouncedHandleScroll] = useDebounce(handleScroll, 1000);

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
  };

  const togglePrevPokemon = (id = 1) => {
    if (id === 0) {
      return;
    }
    setFeaturedPokemon(pokemonsData[id - 1]);
  };

  return (
    <StyledMainWrapper>
      {console.log("PokeDexレンダリング")}
      {preLoad ? (
        <>
          {/* <div>
            {[...Array(20)].map((_, index) => (
              <Skeleton key={index} className="skeleton-card" />
            ))}
          </div> */}
          <StyledLoadingOverlay>
            <MonsterBall />
          </StyledLoadingOverlay>
        </>
      ) : (
        <>
          {loading && (
            <StyledLoadingOverlay>
              {console.log("読み込みLoadなう")}
              <MonsterBall />
            </StyledLoadingOverlay>
          )}
          <StyledImageContainer
            $type1={color1}
            // key={ImageContainerKey.current}
          >
            <Pokemon pokemon={featuredPokemon} />
          </StyledImageContainer>
          <StyledSidebar
            $type2={color2}
            // key={SidebarKey.current}
          >
            {isDefault ? (
              <StyledUnorderedList ref={scrollableDiv} onScroll={handleScroll}>
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
              </StyledUnorderedList>
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
        </>
      )}
    </StyledMainWrapper>
  );
};

export default Pokedex;
