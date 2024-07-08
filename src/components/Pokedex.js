import React, { useEffect, useState } from "react";
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
import styled from "styled-components";
import { Pokemon } from "./Card/Pokemon";

const StyledImageContainer = styled.div`
  width: 45%;
  background-color: ${({ type1 }) => type1};
  display: flex;
  align-items: center;
`;
const StyledSidebar = styled.div`
  width: 55%;
  background-color: ${({ type2 }) => type2};
  overflow: auto;
`;

const StyledInfoContainer = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  align-items: center;
`;

const PokemonListMemo = React.memo(PokemonList);

const Pokedex = () => {
  const styles = {
    textAlign: "center",
    width: "100%",
    height: "100vh",
    display: "flex",
  };

  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonsData, setPokemonsData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [previousUrl, setPreviousUrl] = useState("");
  const [featuredIndex, setFeaturedIndex] = useState(1); // 初期状態は最初のliがフィーチャー
  const [featuredPokemon, setFeaturedPokemon] = useState({});
  const typeColor1 =
    Object.keys(featuredPokemon).length > 0
      ? getTypeColor(featuredPokemon.types[0].type.name)
      : "#00000000";
  const typeColor2 =
    Object.keys(featuredPokemon).length > 0 && featuredPokemon.types.length > 1
      ? getTypeColor(featuredPokemon.types[1].type.name)
      : typeColor1;
  const [isDefault, setIsDefault] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      let res = await getAllPokemon(initialURL);
      let _pokemonData = await Promise.all(
        res.results.map((pokemon) => {
          let pokemonRecord = getPokemon(pokemon.url);
          return pokemonRecord;
        })
      );
      let initialData = _pokemonData[0];
      setPokemonsData(_pokemonData);
      setFeaturedPokemon(initialData);
      setNextUrl(res.next);
      setLoading(false);
      getJapaneseName();
    };
    fetchPokemonData();
  }, []);

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

  // const handleNextPage = async () => {
  //   setLoading(true);
  //   let data = await getAllPokemon(nextUrl);
  //   await loadPokemon(data.results);
  //   setNextUrl(data.next);
  //   setPreviousUrl(data.previous);
  //   setLoading(false);
  // };

  const toggleFeaturedPokemon = (index) => {
    setFeaturedIndex(index);
    setFeaturedPokemon(pokemonsData[index - 1]);
  };

  const toggleSidebar = () => {
    setIsDefault((prev) => !prev);
  };

  return (
    <>
      {loading ? (
        <div className="pokemonCardContainer">
          {[...Array(20)].map((_, index) => (
            <Skeleton key={index} className="skeleton-card" />
          ))}
        </div>
      ) : (
        <div style={styles}>
          <StyledImageContainer type1={typeColor1}>
            <Pokemon pokemon={featuredPokemon} />
            {/* <HoverExample /> */}
          </StyledImageContainer>
          <StyledSidebar type2={typeColor2}>
            {isDefault ? (
              <ul>
                {pokemonsData.map((pokemonData) => {
                  return (
                    <PokemonListMemo
                      key={pokemonData.id}
                      pokemonData={pokemonData}
                      isFeatured={pokemonData.id === featuredIndex}
                      onMouseEnter={toggleFeaturedPokemon.bind(
                        null,
                        pokemonData.id
                      )}
                      onClick={toggleSidebar}
                    />
                  );
                })}
              </ul>
            ) : (
              <StyledInfoContainer>
                <PokeInfo
                  featuredPokemon={featuredPokemon}
                  onClick={toggleSidebar}
                />
              </StyledInfoContainer>
            )}
          </StyledSidebar>
        </div>
      )}
    </>
  );
};

export default Pokedex;
