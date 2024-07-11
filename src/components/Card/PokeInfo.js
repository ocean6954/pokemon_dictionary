import React, { useEffect, useState } from "react";
import {
  getJapaneseName,
  getJapaneseType,
  getPokemonDescription,
} from "../../api/pokemonAPI";
import { FaArrowsRotate } from "react-icons/fa6";
import { styled } from "styled-components";

const StyledInfoContainer = styled.div`
  background-color: red;
  width: 90%;
  margin: 0 auto;
  height: 100%;
  /* position: absolute; */
  /* top: 50%; */
`;

const StyledNavbar = styled.div``;

const StyledInformation = styled.div``;

const PokeInfo = ({ featuredPokemon, onClick }) => {
  const [japaneseName, setJapaneseName] = useState("");
  const [descriptions, setDescriptions] = useState([]);
  const [desIndex, setDesIndex] = useState(0);

  useEffect(() => {
    const fetchJapaneseName = async () => {
      const name = await getJapaneseName(featuredPokemon.name);
      setJapaneseName(name);
    };
    const fetchPokemonDescriptions = async () => {
      const des = await getPokemonDescription(featuredPokemon.id);
      setDescriptions(des);
    };
    fetchJapaneseName();
    fetchPokemonDescriptions();
  }, [featuredPokemon]);

  const toggleDescriptions = (index) => {
    setDesIndex(index === 0 ? 1 : 0);
  };

  return (
    <>
      <StyledInfoContainer>
        <StyledNavbar></StyledNavbar>
        <StyledInformation>
          <div>{japaneseName}</div>
          <div>
            <div>タイプ</div>
            {featuredPokemon.types.map((type) => {
              const { japanese_name } = getJapaneseType(type);
              return (
                <span key={featuredPokemon.name + type.type.name}>
                  {japanese_name}
                </span>
              );
            })}
          </div>
          <div>
            <div>
              <p>重さ: {(featuredPokemon.weight / 10).toFixed(1)}kg</p>
            </div>
            <div>
              <p>高さ: {(featuredPokemon.height / 10).toFixed(1)}m</p>
            </div>
            <div>
              <p>アビリティ: {featuredPokemon.abilities[0].ability.name}</p>
            </div>
            {descriptions.length > 0 && (
              <div>
                <p>{descriptions[desIndex].flavor_text}</p>
                <p>
                  {descriptions[desIndex]?.version === undefined
                    ? "???"
                    : descriptions[desIndex].version}
                  より
                </p>

                <span onClick={() => toggleDescriptions(desIndex)}>
                  <FaArrowsRotate color={"white"} />
                </span>
              </div>
            )}
          </div>
          <button onClick={onClick}>戻る</button>
        </StyledInformation>
      </StyledInfoContainer>
    </>
  );
};

export default PokeInfo;
