import {
  getJapaneseName,
  getJapaneseType,
  getTypeColor,
} from "../../api/pokemonAPI";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const addShadow = keyframes`
  0% {
    box-shadow: none;
  }
  100% {
    box-shadow: 2px 8px 21px -2px #777;  
  }
`;

const StyledCard = styled.div`
  width: var(--card-width);
  /* box-shadow: 2px 8px 21px -2px #777; */
  height: var(--card-height);
  border-radius: 10px;
  position: relative;
  animation: ${addShadow} 2s linear forwards;
  margin: 0 auto;
`;

const ToLeftBottom = keyframes`
  0% {
    height: 0;
  }
  100% {
    height: 100%;
  }
`;

const ToRightTop = keyframes`
  0% {transform: skewY(45deg) scaleY(0);}
  100% {transform: skewY(45deg) scaleY(1);}
`;

const StyledCardBack = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.7;
  z-index: -1;
  border-radius: 10px;
  overflow: hidden;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* z-index: 1; */
    border-radius: 5px;
  }

  &::before {
    background-color: ${({ type1 }) => type1};
    transform: skewY(45deg);
    transform-origin: bottom left;
    animation: ${ToRightTop} 1.5s linear forwards;
  }

  &::after {
    background-color: ${({ type2 }) => type2};
    transform: skewY(45deg);
    transform-origin: top right;
    animation: ${ToLeftBottom} 1.5s linear forwards;
  }
`;

const StyledCardName = styled.div`
  padding: 0;
  font-size: 24px;
  margin-top: 14px;
`;

export const Pokemon = ({ pokemon }) => {
  // console.log("pokemon is", pokemon);
  const [japaneseName, setJapaneseName] = useState("");
  const [twoTypeColor, setTwoTypeColor] = useState({
    type1: "",
    type2: "",
  });

  useEffect(() => {
    const fetchJapaneseName = async () => {
      const name = await getJapaneseName(pokemon.name);
      setJapaneseName(name);
    };
    fetchJapaneseName();
  }, [pokemon.name]);

  useEffect(() => {
    const type1 = getTypeColor(pokemon.types[0].type.name);
    const type2 = pokemon.types[1]
      ? getTypeColor(pokemon.types[1].type.name)
      : type1;
    const newTypes = {
      type1,
      type2,
    };
    setTwoTypeColor(newTypes);
  }, [pokemon]);

  return (
    <>
      {/* {pokemonData.map((pokemon) => {
            return <Card key={pokemon.name} pokemon={pokemon}></Card>;
          })} */}
      <StyledCard>
        <StyledCardBack
          type1={twoTypeColor.type1}
          type2={twoTypeColor.type2}
        ></StyledCardBack>
        <div className="carImg">
          <img
            src={pokemon.sprites.front_default}
            alt="ポケモンのフロント画像"
          />
          <StyledCardName>{japaneseName}</StyledCardName>
          <div className="cardType">
            <div>タイプ</div>
            {pokemon.types.map((type) => {
              const { japanese_name } = getJapaneseType(type);
              return (
                <span key={pokemon.name + type.type.name}>{japanese_name}</span>
              );
            })}
          </div>
          <div className="carInfo">
            <div className="cardData">
              <p className="title">
                重さ: {(pokemon.weight / 10).toFixed(1)}kg
              </p>
            </div>
            <div className="cardData">
              <p className="title">高さ: {(pokemon.height / 10).toFixed(1)}m</p>
            </div>
            <div className="cardData">
              <p className="title">
                {/* アビリティ: {pokemon.abilities[0].ability.name} */}
              </p>
            </div>
          </div>
        </div>
      </StyledCard>
    </>
  );
};

//  <img
//       src={pokemon.sprites.other["official-artwork"].front_default}
//       alt="ポケモンのフロント画像"
//     />
