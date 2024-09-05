import React, { useEffect, useState } from "react";
import { getJapaneseType, getPokemonInfo } from "../../api/pokemonAPI";
import { FaArrowsRotate } from "react-icons/fa6";
import { styled } from "styled-components";
import { IconContext } from "react-icons";
import { VscTriangleUp } from "react-icons/vsc";
import { VscTriangleDown } from "react-icons/vsc";
import "react-loading-skeleton/dist/skeleton.css";
import {
  StyledInfoContainer,
  StyledInfoNav,
  StyledNavLeft,
  StyledNavRight,
  StyledNavIcon,
  StyledArrowUp,
  StyledArrowDown,
  StyledInformation,
  StyledInfoHead,
  StyledTable,
  StyledDescriptionContainer,
  StyledDescription,
  StyledButton,
  StyledTypeIcon,
} from "./PokeInfo.styles";

const colorBrightnessValue = -60;
const adjustColorBrightness = (hex, amount) => {
  // HEXコードを3桁または6桁に正規化
  if (hex.length === 4) {
    hex = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
  }

  // HEXコードをRGBに変換
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);

  // 明るさを調整
  r = Math.min(255, Math.max(0, r + amount));
  g = Math.min(255, Math.max(0, g + amount));
  b = Math.min(255, Math.max(0, b + amount));

  // 再度HEXコードに変換
  const newHex = `#${((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16)
    .slice(1)
    .toUpperCase()}`;
  return newHex;
};

const FlexContainer = styled.div`
  display: inline-flex;
`;

const PokeInfo = ({
  featuredPokemon,
  onClick,
  toggleNext,
  togglePrev,
  color1,
  color2,
}) => {
  const [desIndex, setDesIndex] = useState(0);
  const [pokeInfo, setPokeInfo] = useState({});

  useEffect(() => {
    const fetchPokemonInfo = async () => {
      const res = await getPokemonInfo(featuredPokemon.name);
      setPokeInfo(res);
    };
    fetchPokemonInfo();
  }, [featuredPokemon]);

  const toggleDescriptions = (index) => {
    setDesIndex(index === 0 ? 1 : 0);
  };

  const SplitByFullWidthSpace = (text) => {
    const modifiedText = text.replace(/\n/g, "　");
    const parts = modifiedText.split(/(?<=　)/g);
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
          <StyledNavIcon>
            <IconContext.Provider
              value={{ color: "var(--white)", size: "2.0rem" }}
            >
              <StyledArrowUp
                onClick={() => {
                  togglePrev(featuredPokemon.id - 1);
                }}
              >
                <VscTriangleUp />
              </StyledArrowUp>
            </IconContext.Provider>

            <IconContext.Provider
              value={{ color: "var(--white)", size: "2.0rem" }}
            >
              <StyledArrowDown
                onClick={() => {
                  toggleNext(featuredPokemon.id);
                }}
              >
                <VscTriangleDown />
              </StyledArrowDown>
            </IconContext.Provider>
          </StyledNavIcon>
          <StyledNavLeft
            $color1={adjustColorBrightness(color1, colorBrightnessValue)}
          >
            <img
              src={featuredPokemon.sprites.front_default}
              alt="ポケモン画像"
              height="80px"
              width="80px"
            ></img>
            <p>No.{featuredPokemon.id.toString().padStart(3, "0")}</p>
          </StyledNavLeft>
          <StyledNavRight
            $color2={adjustColorBrightness(color2, colorBrightnessValue)}
          >
            <p>{pokeInfo.name}</p>
          </StyledNavRight>
        </StyledInfoNav>
        <StyledInformation>
          <StyledInfoHead>
            <p>{pokeInfo.genus}</p>
          </StyledInfoHead>
          <StyledTable>
            <tbody>
              <tr>
                <th>タイプ</th>
                {featuredPokemon.types.map((type) => {
                  const { japanese_name } = getJapaneseType(type);
                  return (
                    <td key={featuredPokemon.name + type.type.name}>
                      <FlexContainer>
                        {japanese_name}
                        <StyledTypeIcon
                          src={`${process.env.PUBLIC_URL}/water.png`}
                        ></StyledTypeIcon>
                      </FlexContainer>
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
          {Object.keys(pokeInfo).length > 0 && (
            <>
              <StyledDescriptionContainer>
                <StyledDescription>
                  {SplitByFullWidthSpace(
                    pokeInfo.descriptions[desIndex].flavor_text
                  )}
                </StyledDescription>
              </StyledDescriptionContainer>
              <p>
                {pokeInfo.descriptions[desIndex]?.version === undefined
                  ? "???"
                  : pokeInfo.descriptions[desIndex].version}
                より
                <span onClick={() => toggleDescriptions(desIndex)}>
                  <FaArrowsRotate color={"white"} />
                </span>
              </p>
            </>
          )}
        </StyledInformation>
        <StyledButton onClick={onClick}>戻る</StyledButton>
      </StyledInfoContainer>
    </>
  );
};

export default PokeInfo;
