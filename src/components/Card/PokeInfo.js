import React, { useEffect, useState } from "react";
import {
  // getJapaneseName,
  getJapaneseType,
  // getPokemonDescription,
  getPokemonInfo,
} from "../../api/pokemonAPI";
import { FaArrowsRotate } from "react-icons/fa6";
import { styled } from "styled-components";
import { IconContext } from "react-icons";
import { VscTriangleUp } from "react-icons/vsc";
import { VscTriangleDown } from "react-icons/vsc";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const StyledInfoContainer = styled.div`
  /* background-color: red; */
  width: 90%;
  margin: 0 auto;
  height: 550px;
`;

const StyledInfoNav = styled.div`
  height: 60px;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const StyledNavLeft = styled.div`
  width: 40%;
  position: relative;
  display: flex;
  align-items: center;

  &::after {
    content: "";
    position: absolute;
    background-color: #f2501e;
    width: 100%;
    height: 100%;
  }

  & img {
    margin-left: 5%;
    z-index: 2;
  }

  & p {
    color: var(--white);
    z-index: 2;
    font-size: 20px;
    font-weight: 600;
    line-height: 1;
  }
`;

const StyledNavRight = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  align-items: center;

  &::after {
    content: "";
    position: absolute;
    background-color: var(--black);
    width: 100%;
    height: 100%;
    transform-origin: bottom right;
    transform: skew(-30deg) scale(1.1);
  }

  & p {
    color: var(--white);
    font-size: 30px;
    line-height: 1;
    margin-left: 5%;
    font-weight: 600;
    z-index: 2;
  }
`;

const StyledNavIcon = styled.div`
  position: fixed;
  z-index: 10;
`;

const StyledArrowUp = styled.div`
  top: 0;
  transform: translateY(-60%);
`;

const StyledArrowDown = styled.div`
  bottom: 0;
  transform: translateY(70%);
`;

const StyledInformation = styled.div`
  margin: 0 auto;
  height: 450px;
  width: 90%;
`;

const StyledInfoHead = styled.div`
  display: flex;
  background-color: green;
  justify-content: center;
  align-items: center;
  height: 50px;
`;

const StyledTable = styled.table`
  background-color: orange;
  width: 100%;
  margin: 10px 0;
  height: 200px;

  & tbody {
    width: 100%;
  }

  & th,
  td {
    vertical-align: middle; /* 垂直方向の中央揃え */
  }

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
  height: 180px;
  background-color: purple;
  text-align: left;

  & span {
    display: inline-block;
  }
`;

const StyledSkelton = styled.div`
  width: 80px;
  height: 80px;
  background-color: purple;
`;

const StyledButton = styled.button`
  position: absolute;
  right: 10%;
  bottom: -10;
`;

const StyledImg = styled.img`
  /* position: absolute; */
  /* display: inline-block; */
  /* top: 00%; */
  /* left: 0; */
`;

const StyledTypeIcon = styled.img`
  background-color: #4e8ed3;
  border-radius: 50%;
  width: 25px;
  height: 25px;
`;

const FlexContainer = styled.div`
  display: inline-flex;
  /* align-items: center; */
  /* gap: 8px; */
  /* margin-left: 5%; */
  /* width: 90%; */
  /* margin: 0 auto; */
  /* justify-content: space-between;  */
`;

const PokeInfo = ({ featuredPokemon, onClick, toggleNext, togglePrev }) => {
  const [desIndex, setDesIndex] = useState(0);
  const [pokeInfo, setPokeInfo] = useState({});
  const [loading, setLoading] = useState(true);
  console.log(" ");
  console.log("PokeInfoレンダリング");
  console.log("今のフラグ", loading);

  useEffect(() => {
    setLoading(true);

    const fetchPokemonInfo = async () => {
      const res = await getPokemonInfo(featuredPokemon.name);
      setPokeInfo(res);

      setLoading(false);
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
          <StyledNavLeft>
            <StyledImg
              src={featuredPokemon.sprites.front_default}
              alt="ポケモン画像"
              height="80px"
              width="80px"
            ></StyledImg>

            <p>No.{featuredPokemon.id.toString().padStart(3, "0")}</p>
          </StyledNavLeft>
          <StyledNavRight>
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
              <StyledDescription>
                {SplitByFullWidthSpace(
                  pokeInfo.descriptions[desIndex].flavor_text
                )}
                {/* {console.log(descriptions[desIndex].flavor_text.includes("\n"))} */}
                {/* {descriptions[desIndex].flavor_text} */}
              </StyledDescription>
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
