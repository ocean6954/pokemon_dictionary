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
  height: 90%;
`;

const StyledInfoNav = styled.div`
  height: 60px;
  background-color: blue;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledInformation = styled.div`
  margin: 0 auto;
  height: 85%;
  width: 90%;
`;

const StyledInfoHead = styled.div`
  display: flex;
  background-color: green;

  justify-content: center;
  align-items: center;
  height: 10%;
`;

const StyledTable = styled.table`
  background-color: orange;
  width: 100%;
  margin: 2% 0;
  height: 46%;

  & th {
    background-color: aqua;
    width: 45%;
  }
`;

const StyledDescription = styled.p`
  font-family: "DotGothic16", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 28px;
  width: 85%;
  height: 37%;
  background-color: purple;
`;

const StyledButton = styled.button`
  position: absolute;
  right: 10%;
  bottom: -10;
`;

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

  const SplitByFullWidthSpace = (text) => {
    // 全角スペースで文字列を分割
    const parts = text.split(/(　)/);
    return (
      <div>
        {parts.map((part, index) => (
          <span key={index}>{part}</span>
        ))}
      </div>
    );
  };
  return (
    <>
      <StyledInfoContainer>
        <StyledInfoNav>
          <div>{japaneseName}</div>
        </StyledInfoNav>
        <StyledInformation>
          <StyledInfoHead>
            <p>〇〇ポケモン</p>
          </StyledInfoHead>
          <StyledTable>
            <tbody>
              <tr>
                <th>タイプ</th>
                {featuredPokemon.types.map((type) => {
                  const { japanese_name } = getJapaneseType(type);
                  return (
                    <td key={featuredPokemon.name + type.type.name}>
                      {japanese_name}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <th>高さ</th>
                <td>{(featuredPokemon.height / 10).toFixed(1)}m</td>
              </tr>
              <tr>
                <th>重さ</th>
                <td>{(featuredPokemon.weight / 10).toFixed(1)}kg</td>
              </tr>
              {/* <tr>
                <th>アビリティ: {featuredPokemon.abilities[0].ability.name}</th>
              </tr> */}
            </tbody>
          </StyledTable>
          {descriptions.length > 0 && (
            <StyledDescription>
              {SplitByFullWidthSpace(descriptions[desIndex].flavor_text)}
              {/* {descriptions[desIndex].flavor_text} */}
            </StyledDescription>
          )}
          <p>
            {descriptions[desIndex]?.version === undefined
              ? "???"
              : descriptions[desIndex].version}
            より
            <span onClick={() => toggleDescriptions(desIndex)}>
              <FaArrowsRotate color={"white"} />
            </span>
          </p>
        </StyledInformation>
        <StyledButton onClick={onClick}>戻る</StyledButton>
      </StyledInfoContainer>
    </>
  );
};

export default PokeInfo;
